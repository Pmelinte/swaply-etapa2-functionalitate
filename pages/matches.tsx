import { useEffect, useState } from 'react'

export default function Matches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setMatches(Array.isArray(data.matches) ? data.matches : [])
      })
      .catch(() => setMatches([]))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Potential Matches</h1>
      {matches.length === 0 && <p>No matches found.</p>}
      <ul className="space-y-4">
        {matches.map((match, index) => (
          <li key={index} className="border p-4 rounded">
            <p><strong>Owner:</strong> {match.object.username}</p>
            <p><strong>Avatar:</strong> <img src={match.object.avatar_url} alt="avatar" width="50"/></p>
            <p><strong>Offers:</strong> {match.object.title} - {match.object.description} ({match.object.category})</p>
            <p><strong>You want:</strong> {match.matchesWant.desired_category} ({match.matchesWant.keywords})</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
