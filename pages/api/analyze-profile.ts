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
    
    // TODO: When Supabase is integrated, add authentication check here
    // const user = await getUser(req);
    // if (!user) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    
    const result = await analyzeBusinessProfile(businessProfile);
    
    // TODO: When Supabase is integrated, save recommendations to database
    // const { data, error } = await supabase
    //   .from('ai_recommendations')
    //   .insert({
    //     user_id: user.id,
    //     submission_id: businessProfile.submissionId,
    //     recommendations: result.recommendations,
    //     project_blueprint: result.projectBlueprint,
    //   });
    
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
