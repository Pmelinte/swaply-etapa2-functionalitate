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
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
    const user = stmt.get(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // generează JWT și îl setează în cookie
    const token = jwt.sign({ email }, 'super-secret-swaply', { expiresIn: '7d' })
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`)
    
    return res.status(200).json({ message: 'Login successful' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
