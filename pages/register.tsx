
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [sex, setSex] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password, phone, sex, avatar_url: avatarUrl })
    })
    router.push('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Username" className="border p-2 w-full" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full" value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Phone" className="border p-2 w-full" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Sex" className="border p-2 w-full" value={sex} onChange={e => setSex(e.target.value)} />
        <input placeholder="Avatar URL" className="border p-2 w-full" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}
