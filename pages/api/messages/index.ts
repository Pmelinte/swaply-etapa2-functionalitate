import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db'; // Drum relativ pentru compatibilitate CI/CD

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const database = await db();
    const stmt = await database.prepare(`
      SELECT m.*, u.username as from_username
      FROM messages m
      JOIN users u ON m.from_user_id = u.id
    `);
    const messages = await stmt.all();

    return res.json({ messages });
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}