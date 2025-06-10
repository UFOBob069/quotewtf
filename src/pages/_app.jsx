// pages/_app.jsx
import '../styles/globals.css'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Meta Tags */}
        <title>Finding Better University - Learn from Real Experiences</title>
        <meta name="title" content="Finding Better University - Learn from Real Experiences" />
        <meta name="description" content="A curated marketplace of life-changing courses taught by real people who have achieved the 'better' you're looking for—in careers, relationships, money, health, and life." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finding-better-university.vercel.app/" />
        <meta property="og:title" content="Finding Better University - Learn from Real Experiences" />
        <meta property="og:description" content="A curated marketplace of life-changing courses taught by real people who have achieved the 'better' you're looking for—in careers, relationships, money, health, and life." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://finding-better-university.vercel.app/" />
        <meta property="twitter:title" content="Finding Better University - Learn from Real Experiences" />
        <meta property="twitter:description" content="A curated marketplace of life-changing courses taught by real people who have achieved the 'better' you're looking for—in careers, relationships, money, health, and life." />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional SEO Tags */}
        <meta name="keywords" content="online courses, real experiences, personal development, career growth, finding better podcast, life improvement, success stories, learning platform" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Finding Better University" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://finding-better-university.vercel.app/" />

        {/* Additional Meta Tags for Rich Results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Finding Better University",
              "description": "A curated marketplace of life-changing courses taught by real people who have achieved success in various aspects of life.",
              "url": "https://finding-better-university.vercel.app",
              "sameAs": [
                "https://www.youtube.com/@FindingBetterPodcast"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "100"
              }
            }
          `}
        </script>
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-6N6W27YQQC" />
    </>
  )
}