import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Drum relativ pentru compatibilitate CI/CD

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query.userId;

  try {
    const database = await db();
    const stmt = await database.prepare(`SELECT * FROM wants WHERE user_id = ?`);
    const wants = await stmt.all(userId);

    if (!wants || wants.length === 0) {
      return res.json({ matches: [] });
    }

    return res.json({ matches: wants });
  } catch (error) {
    console.error('Matches API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}