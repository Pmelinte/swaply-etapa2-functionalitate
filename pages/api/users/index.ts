import type { NextApiRequest, NextApiResponse } from 'next';
import { getDBConnection } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDBConnection();

  if (req.method === 'GET') {
    const users = await db.all('SELECT id, username, email FROM users');
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}