import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeBusinessProfile } from '@/lib/gemini';
import { requireEnv } from '@/lib/env-validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment
    requireEnv(process.env.GEMINI_API_KEY, 'GEMINI_API_KEY');

    const businessProfile = req.body;
    
    // TODO: When Supabase is integrated, uncomment authentication check
    // Step 1: Uncomment the import at the top of this file:
    // import { requireAuth } from '@/lib/auth-helpers';
    //
    // Step 2: Replace this comment block with:
    // const user = await requireAuth(req, res);
    // if (!user) return; // Response already sent by requireAuth
    //
    // Step 3: Use user.id to save data to database (see below)
    
    const result = await analyzeBusinessProfile(businessProfile);
    
    // TODO: When Supabase is integrated, save recommendations to database
    // Step 1: Uncomment the import at the top of this file:
    // import { getServiceSupabase } from '@/lib/supabase';
    //
    // Step 2: Save questionnaire submission first:
    // const supabase = getServiceSupabase();
    // const { data: submission } = await supabase
    //   .from('questionnaire_submissions')
    //   .insert({
    //     user_id: user.id,
    //     ...businessProfile,
    //   })
    //   .select()
    //   .single();
    //
    // Step 3: Save AI recommendations:
    // await supabase.from('ai_recommendations').insert({
    //   user_id: user.id,
    //   submission_id: submission.id,
    //   recommendations: result.recommendations,
    //   project_blueprint: result.projectBlueprint,
    // });
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error instanceof Error && error.message.includes('Environment variable')) {
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }
    
    res.status(500).json({ error: 'Failed to analyze business profile' });
  }
}
