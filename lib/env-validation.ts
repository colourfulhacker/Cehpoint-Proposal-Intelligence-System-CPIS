// Environment Variable Validation
// This ensures all required environment variables are present

export function validateEnv() {
  const requiredEnvVars = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  };

  const missing: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please add these to your .env.local file or deployment environment.`
    );
  }

  return true;
}

// Call this in API routes to ensure environment is configured
export function requireEnv<T>(value: T | undefined, name: string): T {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

// Optional: Add Supabase validation when ready
export function validateSupabaseEnv() {
  const supabaseVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  const missing: string[] = [];

  Object.entries(supabaseVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.warn(
      `Supabase not configured. Missing: ${missing.join(', ')}\n` +
      `The app will use localStorage for MVP. See SUPABASE_INTEGRATION.md for setup.`
    );
    return false;
  }

  return true;
}

// Export configuration object
export const env = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
