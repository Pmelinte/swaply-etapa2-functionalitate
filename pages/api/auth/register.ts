import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    stmt.run(email, hashedPassword)

    // generează JWT simplu (secret hardcodat pentru demo)
    const token = jwt.sign({ email }, 'super-secret-swaply', { expiresIn: '7d' })
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`)
    
    return res.status(200).json({ message: 'User registered' })
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
