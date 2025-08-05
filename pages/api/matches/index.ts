import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: 'Not logged in' })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const userId = decoded.userId

    // Găsim ce își dorește userul logat
    const wants = db.prepare(`SELECT * FROM wants WHERE user_id = ?`).all(userId)

    if (wants.length === 0) {
      return res.json({ matches: [] })
    }

    // Pentru fiecare preferință, căutăm obiecte din acea categorie
    const matches = []
    for (const want of wants) {
      const objs = db.prepare(`
        SELECT o.*, u.username, u.avatar_url
        FROM objects o
        JOIN users u ON o.user_id = u.id
        WHERE o.category = ? AND o.user_id != ?
      `).all(want.desired_category, userId)

      matches.push(...objs.map(obj => ({
        object: obj,
        matchesWant: want
      })))
    }

    res.json({ matches })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
