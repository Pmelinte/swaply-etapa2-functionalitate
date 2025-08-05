import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Debug() {
  const [objects, setObjects] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch('/api/objects')
      .then(res => res.json())
      .then(data => setObjects(data))

    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [])

  return (
    <>
      <Head>
        <title>Debug | Swaply</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Objects</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(objects, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(messages, null, 2)}
        </pre>
      </div>
    </>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}