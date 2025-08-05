import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import db from '../../../lib/db'; // Drum relativ pentru compatibilitate CI/CD

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const database = await db();
    const stmt = await database.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    await stmt.run(email, hashedPassword);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}