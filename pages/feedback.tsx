import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

type FeedbackType = {
  id: number
  rating: number | null
  comment: string | null
  created_at: string
  users?: { name: string | null }[]
  objects?: { title: string | null }[]
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true)
      const { data, error } = await supabase
        .from('feedback')
        .select('id, rating, comment, created_at, users(name), objects(title)')
        .order('created_at', { ascending: false })
      if (!error && data) setFeedbacks(data)
      setLoading(false)
    }
    fetchFeedbacks()
  }, [])

  return (
    <div>
      <h1>Feedback-uri</h1>
      {loading ? (
        <p>Se încarcă...</p>
      ) : feedbacks.length === 0 ? (
        <p>Nu există feedback-uri.</p>
      ) : (
        <ul>
          {feedbacks.map(fb => (
            <li key={fb.id}>
              <strong>{fb.users?.[0]?.name || "?"}</strong> — <b>{fb.objects?.[0]?.title || "?"}</b>
              <br />
              <strong>Rating:</strong> {fb.rating}
              <br />
              <strong>Comentariu:</strong> {fb.comment}
              <br />
              <small>Creat la: {new Date(fb.created_at).toLocaleString()}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
