import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'
import jwt from 'jsonwebtoken'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token
    if (!token) {
      console.log('No token found')
      return res.status(401).json({ error: 'Not logged in' })
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const userId = decoded.userId

    console.log('Fetching messages for user:', userId)

    if (req.method === 'GET') {
      const messages = db.prepare(`
        SELECT m.*, u.username as from_username
        FROM messages m
        JOIN users u ON m.from_user_id = u.id
        WHERE (m.from_user_id = ? OR m.to_user_id = ?)
        ORDER BY m.created_at ASC
      `).all(userId, userId)

      console.log('Results:', messages)

      return res.json({ messages })
    }

    if (req.method === 'POST') {
      const { to_user_id, content, status } = req.body

      db.prepare(`
        INSERT INTO messages (from_user_id, to_user_id, content, status)
        VALUES (?, ?, ?, ?)
      `).run(userId, to_user_id, content, status || 'pending')

      console.log(`Inserted message from ${userId} to ${to_user_id} with status ${status}`)

      return res.json({ success: true })
    }

    res.status(405).end()
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}
