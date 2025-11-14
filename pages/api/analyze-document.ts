import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeUploadedDocument } from '@/lib/gemini';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, fileName } = req.body;
    
    if (!content || !fileName) {
      return res.status(400).json({ error: 'Missing content or fileName' });
    }
    
    const profile = await analyzeUploadedDocument(content, fileName);
    
    res.status(200).json(profile);
  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
}
