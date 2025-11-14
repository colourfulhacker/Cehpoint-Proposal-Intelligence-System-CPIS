import { ClientSession, User } from "@/types";

const SESSION_KEY = 'cehpoint_session';
const USER_KEY = 'cehpoint_user';

export function saveSession(session: ClientSession): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
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
  return getUser() !== null;
}
