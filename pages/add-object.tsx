
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AddObject() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [exchangeMode, setExchangeMode] = useState("direct")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/objects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, category, exchange_mode: exchangeMode, image_url: "/uploads/placeholder.jpg" })
    })
    router.push('/objects')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Object</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Title" className="border p-2 w-full" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" className="border p-2 w-full" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Category" className="border p-2 w-full" value={category} onChange={e => setCategory(e.target.value)} />
        <select className="border p-2 w-full" value={exchangeMode} onChange={e => setExchangeMode(e.target.value)}>
          <option value="direct">Direct</option>
          <option value="courier">Through Couriers</option>
          <option value="vacation">In Vacation</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Object</button>
      </form>
    </div>
  )
}
