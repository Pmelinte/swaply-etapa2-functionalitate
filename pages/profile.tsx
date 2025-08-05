import { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/users/me')
      .then(res => {
        if (!res.ok) throw new Error('Not logged in')
        return res.json()
      })
      .then(data => setUser(data.user))
      .catch(err => setError(err.message))
  }, [])

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  if (!user) {
    return <div className="p-4">Loading profile...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}
