import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link href="/">Swaply</Link>
      </div>
      <div className="space-x-4">
        <Link href="/checkout" className="text-white hover:text-gray-300">Checkout</Link>
        <Link href="/debug" className="text-white hover:text-gray-300">Debug</Link>
        <Link href="/messages" className="text-white hover:text-gray-300">Messages</Link>
        <Link href="/objects" className="text-white hover:text-gray-300">Objects</Link>
        <Link href="/users" className="text-white hover:text-gray-300">Users</Link>       {/* ← adăugat */}
        <Link href="/matches" className="text-white hover:text-gray-300">Matches</Link>   {/* ← adăugat */}
        <Link href="/profile" className="text-white hover:text-gray-300">Profile</Link>
        <Link href="/add-object" className="text-white hover:text-gray-300">Add Object</Link>
      </div>
    </nav>
  )
}
