import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      {/* Poți adăuga aici conținutul paginii de checkout */}
    </div>
  );
}

// Funcția corect tipizată pentru static props
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
