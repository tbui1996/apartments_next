// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout'; // Replace with your Layout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;