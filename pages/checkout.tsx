import Head from 'next/head'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Checkout | Swaply</title>
      </Head>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4">Implement your checkout page here.</p>
      </div>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}
