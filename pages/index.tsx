
import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Swaply - The smart way to swap things</h1>
      <p className="mb-4">
        Scopul site-ului este schimbul liber de obiecte între oameni de oriunde în lume,
        înscriși pe site. Modul de schimb poate fi direct, prin curieri locali sau internaționali,
        sau prin întâlniri în vacanță.
      </p>
      <div className="space-x-4 mb-8">
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
        <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded">Login</Link>
        <Link href="/add-object" className="bg-purple-600 text-white px-4 py-2 rounded">Let's Change</Link>
      </div>
      <div className="border p-4 text-center">
        <p>Harta va fi afișată aici, cu poziția ta și a altor utilizatori (feature coming soon)</p>
      </div>
    </div>
  )
}
