import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const database = await db(); // Așteptăm conexiunea DB
      const stmt = database.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(req.body.email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Alte verificări (parolă etc.) pot fi adăugate aici

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
