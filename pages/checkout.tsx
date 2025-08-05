import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function Checkout() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('checkout')} | Swaply</title>
        <meta property="og:title" content={`${t('checkout')} | Swaply`} />
      </Head>
      <h1 className="text-2xl font-bold mb-4">{t('checkout')}</h1>
      <p className="text-gray-700">Aceasta este o pagină de checkout demonstrativă.</p>
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