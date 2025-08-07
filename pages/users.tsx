// pages/users.tsx
import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

type UserType = {
  id: number
  name?: string
  email?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const { data, error } = await supabase.from('users').select('id, name, email')
      if (!error && data) setUsers(data)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Utilizatori</h1>
      {loading ? (
        <p>Se încarcă...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name || 'N/A'}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
