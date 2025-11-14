/**
 * Authentication Helper Functions
 * 
 * These helpers are for FUTURE Supabase integration.
 * Currently, the app uses localStorage for MVP.
 * 
 * When Supabase is integrated, uncomment these functions
 * and use them in API routes to get authenticated users.
 */

// TODO: Uncomment when Supabase is integrated
// import { NextApiRequest } from 'next';
// import { supabase } from './supabase';
// import type { User } from '@/types';

/**
 * Get authenticated user from API request
 * 
 * Usage in API routes:
 * 
 * ```typescript
 * import { getAuthenticatedUser } from '@/lib/auth-helpers';
 * 
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   const user = await getAuthenticatedUser(req);
 *   
 *   if (!user) {
 *     return res.status(401).json({ error: 'Unauthorized' });
 *   }
 *   
 *   // Use user.id to query database
 *   const { data } = await supabase
 *     .from('questionnaire_submissions')
 *     .select('*')
 *     .eq('user_id', user.id);
 *   
 *   res.status(200).json(data);
 * }
 * ```
 */
// export async function getAuthenticatedUser(req: NextApiRequest): Promise<User | null> {
//   // Extract JWT token from Authorization header
//   const authHeader = req.headers.authorization;
//   
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return null;
//   }
//   
//   const token = authHeader.substring(7);
//   
//   // Verify token with Supabase
//   const { data: { user }, error } = await supabase.auth.getUser(token);
//   
//   if (error || !user) {
//     return null;
//   }
//   
//   return {
//     id: user.id,
//     email: user.email!,
//     name: user.user_metadata.full_name || '',
//   };
// }

/**
 * Require authentication in API route
 * 
 * Usage in API routes:
 * 
 * ```typescript
 * import { requireAuth } from '@/lib/auth-helpers';
 * 
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   const user = await requireAuth(req, res);
 *   
 *   // If user is null, response has already been sent
 *   if (!user) return;
 *   
 *   // Continue with authenticated logic
 *   // ...
 * }
 * ```
 */
// export async function requireAuth(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<User | null> {
//   const user = await getAuthenticatedUser(req);
//   
//   if (!user) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return null;
//   }
//   
//   return user;
// }

/**
 * MVP PLACEHOLDER: No authentication in current version
 * 
 * This returns null to indicate no auth is available yet.
 * When Supabase is integrated, remove this and uncomment above functions.
 */
export async function getAuthenticatedUser(): Promise<null> {
  return null;
}

export async function requireAuth(): Promise<null> {
  return null;
}
