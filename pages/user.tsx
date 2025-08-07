import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Users() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [minRating, setMinRating] = useState('')
  const [category, setCategory] = useState('')
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      if (query) params.append('query', query)
      if (location) params.append('location', location)
      if (minRating) params.append('minRating', minRating)
      if (category) params.append('category', category)

      fetch(`/api/users?${params.toString()}`)
        .then(res => res.json())
        .then(data => setUsers(data))
    }, 300)
    return () => clearTimeout(timeout)
  }, [query, location, minRating, category])

  return (
    <>
      <Head>
        <title>Users | Swaply</title>
        <meta name="description" content="Search users on Swaply" />
      </Head>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Find Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by email or name"
            className="border rounded p-2 w-full"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="border rounded p-2 w-full"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Rating"
            className="border rounded p-2 w-full"
            value={minRating}
            onChange={e => setMinRating(e.target.value)}
          />
          <input
            type="text"
            placeholder="Object Category"
            className="border rounded p-2 w-full"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user: any) => (
            <Link 
              key={user.id} 
              href={`/messages?to=${user.id}`}
              className="border rounded shadow p-3 hover:bg-gray-50 transition"
            >
              <h2 className="text-lg font-semibold">{user.name || user.email}</h2>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Location: {user.location}</p>
              <p className="text-sm text-gray-600 flex items-center">
                Rating:
                <span className="ml-2 flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(user.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46 1.286 3.966c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.385 2.461c-.784.57-1.838-.196-1.539-1.118l1.285-3.966-3.384-2.46c-.784-.57-.38-1.81.588-1.81h4.18l1.285-3.967z" />
                    </svg>
                  ))}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

// IMPORTANT: Nu șterge asta, e pentru i18n/Next.js
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
