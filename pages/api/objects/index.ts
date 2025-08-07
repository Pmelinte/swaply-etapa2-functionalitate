import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Drum relativ pentru compatibilitate CI/CD

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  try {
    const database = await db();
    const stmt = await database.prepare(`
      SELECT o.id, o.title, o.category, o.description, o.image_url, u.email AS owner
      FROM objects o
      LEFT JOIN users u ON o.user_id = u.id
    `);

    const objects = await stmt.all();

    return res.json({ objects });
  } catch (error) {
    console.error('Objects API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
