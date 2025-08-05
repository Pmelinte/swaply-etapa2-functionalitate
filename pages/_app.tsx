import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default appWithTranslation(MyApp)
