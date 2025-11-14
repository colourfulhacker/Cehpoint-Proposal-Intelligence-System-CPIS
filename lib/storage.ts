import { ClientSession, User } from "@/types";

// TODO: When Supabase is integrated, uncomment this import and remove localStorage code
// import { supabase } from './supabase';

const SESSION_KEY = 'cehpoint_session';
const USER_KEY = 'cehpoint_user';

/**
 * BACKEND INTEGRATION GUIDE:
 * 
 * This file currently uses localStorage for MVP demonstration.
 * To integrate with Supabase backend:
 * 
 * 1. Rename lib/supabase.ts.example to lib/supabase.ts
 * 2. Uncomment the supabase import above
 * 3. Replace each localStorage function with Supabase calls
 * 4. See SUPABASE_INTEGRATION.md for complete guide
 * 
 * Example Supabase replacement for saveSession:
 * 
 * export async function saveSession(session: ClientSession): Promise<void> {
 *   const { data: { user } } = await supabase.auth.getUser();
 *   if (!user) throw new Error('Not authenticated');
 *   
 *   await supabase.from('questionnaire_submissions').upsert({
 *     user_id: user.id,
 *     ...session.businessProfile,
 *   });
 * }
 */

export function saveSession(session: ClientSession): void {
  // MVP: Using localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  
  // TODO: Supabase implementation (uncomment when ready):
  // const saveSessionToSupabase = async () => {
  //   const { data: { user } } = await supabase.auth.getUser();
  //   if (!user) return;
  //   
  //   await supabase.from('questionnaire_submissions').upsert({
  //     user_id: user.id,
  //     ...session.businessProfile,
  //   });
  // };
  // saveSessionToSupabase();
}

export function getSession(): ClientSession | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  // MVP: Using localStorage
  return getUser() !== null;
  
  // TODO: Supabase implementation (uncomment when ready):
  // const checkAuth = async () => {
  //   const { data: { session } } = await supabase.auth.getSession();
  //   return session !== null;
  // };
  // return checkAuth();
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('cehpoint_questionnaire_draft');
  }
}

const QUESTIONNAIRE_DRAFT_KEY = 'cehpoint_questionnaire_draft';

export function saveQuestionnaireDraft(data: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(QUESTIONNAIRE_DRAFT_KEY, JSON.stringify({
      ...data,
      lastSaved: new Date().toISOString(),
    }));
  }
}

export function getQuestionnaireDraft(): any | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(QUESTIONNAIRE_DRAFT_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearQuestionnaireDraft(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(QUESTIONNAIRE_DRAFT_KEY);
  }
}
