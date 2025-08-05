import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.query

    if (query && typeof query === 'string') {
      const stmt = db.prepare(`
        SELECT o.id, o.title, o.category, o.description, o.image, u.email AS owner
        FROM objects o
        LEFT JOIN users u ON o.userId = u.id
        WHERE o.title LIKE ? OR o.category LIKE ? OR o.description LIKE ?
        ORDER BY o.id DESC
      `)
      const wildcard = `%${query}%`
      const objects = stmt.all(wildcard, wildcard, wildcard)
      return res.status(200).json(objects)
    }

    // fallback toate obiectele
    const stmt = db.prepare(`
      SELECT o.id, o.title, o.category, o.description, o.image, u.email AS owner
      FROM objects o
      LEFT JOIN users u ON o.userId = u.id
      ORDER BY o.id DESC
    `)
    const objects = stmt.all()

    return res.status(200).json(objects)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
