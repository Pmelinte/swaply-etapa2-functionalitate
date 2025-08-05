import { useState, useEffect } from 'react'

export default function Messages() {
  const [messages, setMessages] = useState([] as any[])
  const [input, setInput] = useState('')
  const [toUserId, setToUserId] = useState(2)

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(Array.isArray(data.messages) ? data.messages : []))
  }, [])

  const sendMessage = async () => {
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to_user_id: toUserId, content: input })
    })
    setInput('')
    const res = await fetch('/api/messages')
    const data = await res.json()
    setMessages(Array.isArray(data.messages) ? data.messages : [])
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Messages with User {toUserId}</h1>
      <div className="space-y-2 mb-4">
        {Array.isArray(messages) && messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.from_username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        className="border p-2 mr-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  )
}
