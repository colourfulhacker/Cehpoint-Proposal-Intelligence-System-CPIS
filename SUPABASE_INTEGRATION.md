# Supabase Backend Integration Guide

This guide provides step-by-step instructions for integrating Supabase as the backend database and authentication system for the Cehpoint application.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Database Schema](#database-schema)
4. [Authentication Setup](#authentication-setup)
5. [Code Integration](#code-integration)
6. [Environment Variables](#environment-variables)
7. [Migration Steps](#migration-steps)
8. [Testing](#testing)

---

## Overview

Currently, Cehpoint uses browser localStorage for:
- User authentication (fake user IDs)
- Session persistence
- Questionnaire data storage
- AI recommendations storage

**After Supabase integration, the app will have:**
- Real user authentication with email/password
- Persistent database storage for all user data
- Multi-device access
- Secure data storage with row-level security
- Historical data retention

---

## Prerequisites

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Note your project URL and API keys

2. **Install Supabase Client:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Add Environment Variables:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## Database Schema

Run this SQL in the Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questionnaire submissions table
CREATE TABLE public.questionnaire_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  
  -- Section 1: Business Information
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  custom_industry TEXT,
  business_model TEXT NOT NULL,
  year_established TEXT NOT NULL,
  team_size TEXT NOT NULL,
  operating_regions TEXT NOT NULL,
  
  -- Section 2: Current Operations & Processes
  core_operations TEXT NOT NULL,
  workflow_challenges TEXT NOT NULL,
  manual_tasks TEXT NOT NULL,
  current_tools TEXT NOT NULL,
  
  -- Section 3: Technology Status
  has_website BOOLEAN DEFAULT false,
  has_mobile_app BOOLEAN DEFAULT false,
  has_crm BOOLEAN DEFAULT false,
  has_erp BOOLEAN DEFAULT false,
  has_cloud_setup BOOLEAN DEFAULT false,
  has_admin_tools BOOLEAN DEFAULT false,
  technology_stack TEXT,
  cybersecurity_practices TEXT,
  api_integrations TEXT,
  
  -- Section 4: Business Goals & Vision
  short_term_goals TEXT NOT NULL,
  long_term_goals TEXT NOT NULL,
  upcoming_launches TEXT,
  automation_areas TEXT NOT NULL,
  
  -- Section 5: Challenges & Blockers
  revenue_challenges TEXT NOT NULL,
  sales_marketing_challenges TEXT NOT NULL,
  tech_bottlenecks TEXT NOT NULL,
  customer_support_challenges TEXT,
  compliance_concerns TEXT,
  
  -- Section 6: Industry-Specific Data
  target_customers TEXT NOT NULL,
  competitors TEXT,
  data_format TEXT,
  customer_acquisition_channels TEXT,
  
  -- Section 7: Project Requirements
  solution_type TEXT,
  budget_range TEXT,
  desired_deadline TEXT,
  special_requirements TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Recommendations table
CREATE TABLE public.ai_recommendations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  submission_id UUID REFERENCES questionnaire_submissions(id) NOT NULL,
  
  -- AI Analysis Results
  recommendations JSONB NOT NULL,
  project_blueprint JSONB,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document uploads table (for future use)
CREATE TABLE public.document_uploads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  extracted_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for questionnaire_submissions
CREATE POLICY "Users can view own submissions"
  ON public.questionnaire_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON public.questionnaire_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON public.questionnaire_submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_recommendations
CREATE POLICY "Users can view own recommendations"
  ON public.ai_recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own recommendations"
  ON public.ai_recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for document_uploads
CREATE POLICY "Users can view own uploads"
  ON public.document_uploads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own uploads"
  ON public.document_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questionnaire_submissions_updated_at
  BEFORE UPDATE ON public.questionnaire_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Authentication Setup

### 1. Configure Supabase Auth

In your Supabase dashboard:
- Go to **Authentication → Settings**
- Enable **Email Auth**
- Configure email templates (optional)
- Set Site URL to your deployment URL

### 2. Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations
export const getServiceSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};
```

---

## Code Integration

### Update `lib/storage.ts`

Replace localStorage-based functions with Supabase calls:

```typescript
import { supabase } from './supabase';
import type { User, Session, BusinessProfile } from '@/types';

// Authentication
export async function signUp(email: string, password: string, fullName: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error || !data.user) {
    console.error('Sign up error:', error);
    return null;
  }

  // Create profile
  await supabase.from('profiles').insert({
    id: data.user.id,
    email: data.user.email!,
    full_name: fullName,
  });

  return {
    id: data.user.id,
    email: data.user.email!,
    name: fullName,
  };
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    console.error('Sign in error:', error);
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata.full_name || '',
  };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export function isAuthenticated(): boolean {
  return supabase.auth.getSession() !== null;
}

export async function getUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata.full_name || '',
  };
}

// Session Management
export async function saveSession(session: Session): Promise<void> {
  const user = await getUser();
  if (!user) return;

  // Save questionnaire submission
  const { data: submission, error: submissionError } = await supabase
    .from('questionnaire_submissions')
    .upsert({
      user_id: user.id,
      ...session.businessProfile,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) {
    console.error('Error saving submission:', submissionError);
    return;
  }

  // Save AI recommendations if they exist
  if (session.recommendations) {
    await supabase.from('ai_recommendations').insert({
      user_id: user.id,
      submission_id: submission.id,
      recommendations: session.recommendations,
      project_blueprint: session.projectBlueprint,
    });
  }
}

export async function getSession(): Promise<Session | null> {
  const user = await getUser();
  if (!user) return null;

  // Get latest submission
  const { data: submission } = await supabase
    .from('questionnaire_submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!submission) return null;

  // Get latest recommendations
  const { data: recommendations } = await supabase
    .from('ai_recommendations')
    .select('*')
    .eq('submission_id', submission.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return {
    userId: user.id,
    businessProfile: submission,
    recommendations: recommendations?.recommendations,
    projectBlueprint: recommendations?.project_blueprint,
    lastUpdated: submission.updated_at,
  };
}

export async function clearSession(): Promise<void> {
  // Session data persists in database
  // This just clears any local cache if needed
}
```

### Update `pages/login.tsx`

Replace fake authentication with real Supabase auth (see commented code in file).

### Update `pages/questionnaire.tsx`

Replace localStorage autosave with Supabase upsert (see commented code in file).

### Update `pages/dashboard.tsx`

Fetch recommendations from Supabase instead of localStorage (see commented code in file).

---

## Environment Variables

Add these to your Vercel/Replit deployment:

```env
# Gemini AI (already configured)
GEMINI_API_KEY=your_gemini_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Security Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `SUPABASE_SERVICE_ROLE_KEY` should ONLY be used in API routes, never client-side
- Enable Row Level Security (RLS) policies to protect user data

---

## Migration Steps

### Step 1: Set Up Supabase
1. Create Supabase project
2. Run schema SQL
3. Configure authentication
4. Test database connection

### Step 2: Install Dependencies
```bash
npm install @supabase/supabase-js
```

### Step 3: Add Environment Variables
- Add to Vercel dashboard or Replit Secrets
- Verify variables are loaded correctly

### Step 4: Uncomment Backend Code
1. Uncomment `lib/supabase.ts` integration code
2. Uncomment Supabase calls in `lib/storage.ts`
3. Update authentication in `pages/login.tsx`
4. Update autosave in `pages/questionnaire.tsx`
5. Update data fetching in `pages/dashboard.tsx`

### Step 5: Test Authentication Flow
1. Test sign up
2. Test sign in
3. Test sign out
4. Verify profile creation

### Step 6: Test Data Persistence
1. Fill out questionnaire
2. Submit for AI analysis
3. View recommendations on dashboard
4. Log out and log back in
5. Verify data persists

### Step 7: Deploy to Production
1. Run `npm run build` locally
2. Fix any build errors
3. Deploy to Vercel
4. Test production environment

---

## Testing

### Unit Tests
```typescript
// test/supabase.test.ts
import { signUp, signIn, getUser } from '@/lib/storage';

describe('Supabase Authentication', () => {
  it('should sign up a new user', async () => {
    const user = await signUp('test@example.com', 'password123', 'Test User');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
  });

  it('should sign in existing user', async () => {
    const user = await signIn('test@example.com', 'password123');
    expect(user).not.toBeNull();
  });
});
```

### Manual Testing Checklist
- [ ] User can sign up with email/password
- [ ] User receives verification email (if enabled)
- [ ] User can sign in
- [ ] User can fill out questionnaire
- [ ] Questionnaire data autosaves to Supabase
- [ ] User can submit questionnaire for AI analysis
- [ ] AI recommendations are saved to database
- [ ] Dashboard displays recommendations from database
- [ ] User can log out and log back in
- [ ] Data persists across sessions
- [ ] Data persists across devices
- [ ] RLS policies prevent unauthorized access

---

## Troubleshooting

### Issue: "User is not authenticated"
**Solution:** Check that `auth.uid()` exists in Supabase session. Verify JWT token is valid.

### Issue: "Row Level Security policy violation"
**Solution:** Verify RLS policies are correctly set up. Check that user_id matches auth.uid().

### Issue: "Cannot read property 'id' of null"
**Solution:** Add null checks when accessing user data. Use optional chaining: `user?.id`.

### Issue: Build fails with Supabase errors
**Solution:** Ensure environment variables are set in build environment. Use `NEXT_PUBLIC_` prefix for client-side vars.

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime) - for live updates

---

## Support

If you encounter issues during integration:
1. Check Supabase logs in dashboard
2. Review browser console for errors
3. Verify environment variables are correct
4. Test database queries in Supabase SQL editor
5. Check RLS policies are not blocking queries

**Happy coding! 🚀**
