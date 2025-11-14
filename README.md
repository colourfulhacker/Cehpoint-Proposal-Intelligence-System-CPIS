# Cehpoint - AI-Powered Client Onboarding System

Transform business consulting with AI-driven service recommendations.

## Overview

Cehpoint uses Google Gemini AI to analyze business profiles and generate personalized recommendations for IT services, cybersecurity solutions, process automation, and custom software development.

**Key Features:**
- 7-section comprehensive business questionnaire
- AI-powered analysis with Google Gemini
- 6-12 personalized recommendations per submission
- Project blueprints with phases, timelines, and costs
- Session persistence (auto-saves progress)
- Professional corporate design

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local` file in project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key at [Google AI Studio](https://ai.google.dev)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000)

### 4. Build for Production

```bash
npm run lint     # Check code quality
npm run build    # Build production bundle
npm start        # Start production server
```

---

## MVP Status

### ✅ Production-Ready Features

- Professional landing page with corporate design
- Email-based "authentication" (localStorage for MVP)
- Complete 7-section questionnaire with dropdown selects
- Session persistence (auto-saves every change)
- Google Gemini AI analysis
- AI-generated recommendations (6-12 per submission)
- Project blueprint with phases and costs
- Responsive design (mobile, tablet, desktop)
- Error handling and loading states

### ⚠️ MVP Limitations

**This is a functional MVP using localStorage for demonstration.**

1. **Authentication**: Browser-only (not production-ready)
   - Data stored in browser localStorage
   - No multi-device access
   - Data lost if browser cache cleared

2. **No Backend Database**: 
   - Recommendations not persisted across devices
   - No historical data retention

3. **Document Upload**: Temporarily disabled
   - Requires production file storage setup

**For production use, integrate Supabase backend (see below).**

---

## Backend Integration (For Production)

Follow these guides to migrate to Supabase backend:

1. **[SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)**
   - Complete database schema
   - Step-by-step migration guide
   - Authentication setup

2. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Vercel deployment checklist
   - Environment variable setup
   - Production testing guide

### Quick Migration Steps

```bash
# 1. Install Supabase client
npm install @supabase/supabase-js

# 2. Rename example file
mv lib/supabase.ts.example lib/supabase.ts

# 3. Add environment variables
# NEXT_PUBLIC_SUPABASE_URL=your-project-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-key

# 4. Run database schema (see SUPABASE_INTEGRATION.md)

# 5. Uncomment Supabase code in lib/storage.ts

# 6. Deploy to Vercel
```

---

## Environment Variables

### Required

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Optional (For Supabase)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Security:**
- `NEXT_PUBLIC_*` variables are exposed to browser
- `SUPABASE_SERVICE_ROLE_KEY` is server-only
- Never commit API keys to Git

---

## Project Structure

```
cehpoint/
├── pages/                   # Next.js pages
│   ├── index.tsx           # Landing page
│   ├── login.tsx           # Authentication
│   ├── questionnaire.tsx   # 7-section questionnaire
│   ├── dashboard.tsx       # AI recommendations
│   └── api/                # API routes
│       ├── analyze-profile.ts     # AI analysis
│       └── analyze-document.ts    # Document parsing
├── lib/                    # Core utilities
│   ├── gemini.ts          # Gemini API integration
│   ├── storage.ts         # Data persistence
│   └── env-validation.ts  # Environment checks
├── SUPABASE_INTEGRATION.md # Backend integration guide
├── DEPLOYMENT.md          # Deployment guide
└── replit.md              # Technical docs
```

---

## Deployment to Vercel

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add `GEMINI_API_KEY` in Vercel dashboard
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

---

## Documentation

- **README.md** (this file) - Quick start guide
- **SUPABASE_INTEGRATION.md** - Backend integration
- **DEPLOYMENT.md** - Production deployment
- **replit.md** - Technical architecture

---

## Support

For issues during integration:
1. Check documentation files above
2. Review browser console for errors
3. Verify environment variables
4. Check Gemini API quota

---

**Built with Next.js, TypeScript, Tailwind CSS, and Google Gemini AI**
