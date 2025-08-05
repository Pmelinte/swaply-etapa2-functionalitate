
import { useEffect, useState } from 'react'

export default function Objects() {
  const [objects, setObjects] = useState([])

  useEffect(() => {
    fetch('/api/objects')
      .then(res => res.json())
      .then(data => setObjects(data))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Objects for Swap</h1>
      <ul className="space-y-2">
        {objects.map(obj => (
          <li key={obj.id} className="border p-4 rounded">
            <strong>{obj.title}</strong> - {obj.description} ({obj.category})
          </li>
        ))}
      </ul>
    </div>
  )
}
