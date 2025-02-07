// pages/_app.jsx
import '../styles/globals.css'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-7BPJ4PFTW5" />
    </>
  )
}