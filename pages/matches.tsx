// pages/matches.tsx
import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

type MatchType = {
  id: number
  object1_id: number
  object2_id: number
  created_at: string
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true)
      const { data, error } = await supabase.from('matches').select('*')
      if (!error && data) setMatches(data)
      setLoading(false)
    }
    fetchMatches()
  }, [])

  return (
    <div>
      <h1>Potriviri (Matches)</h1>
      {loading ? (
        <p>Se încarcă...</p>
      ) : matches.length === 0 ? (
        <p>Nu există potriviri.</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              Obiect 1 ID: {match.object1_id} — Obiect 2 ID: {match.object2_id} <br />
              <small>Creat la: {new Date(match.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
