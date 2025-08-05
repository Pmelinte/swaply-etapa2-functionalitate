import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const database = await db(); // Așteptăm conexiunea DB
    const stmt = await database.prepare('SELECT * FROM users WHERE email = ?');
    const user = await stmt.get(req.body.email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}