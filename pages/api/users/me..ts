import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Not logged in' })
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const userId = decoded.userId

    // 🟢 Aici obții instanța DB asincron!
    const database = await db();
    const user = database.prepare('SELECT id, username, email FROM users WHERE id = ?').get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.json({ user })
  } catch (err) {
    console.error('Error in /api/users/me:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
