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
        <title>QuoteWTF - Is This Quote Legit… or Total BS?</title>
        <meta name="title" content="QuoteWTF - Is This Quote Legit… or Total BS?" />
        <meta name="description" content="Upload a contractor quote (PDF or image) and our AI will roast it — breaking down red flags, missing details, and overpriced fluff in plain English. No fluff. Just facts. Maybe some fire. 🔥" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quotewtf.vercel.app/" />
        <meta property="og:title" content="QuoteWTF - Is This Quote Legit… or Total BS?" />
        <meta property="og:description" content="Upload a contractor quote (PDF or image) and our AI will roast it — breaking down red flags, missing details, and overpriced fluff in plain English. No fluff. Just facts. Maybe some fire. 🔥" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:site_name" content="QuoteWTF" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QuoteWTF - Is This Quote Legit… or Total BS?" />
        <meta name="twitter:description" content="Upload a contractor quote (PDF or image) and our AI will roast it — breaking down red flags, missing details, and overpriced fluff in plain English. No fluff. Just facts. Maybe some fire. 🔥" />
        <meta name="twitter:image" content="/og-image.jpg" />

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
        <link rel="canonical" href="https://quotewtf.vercel.app/" />

        {/* Additional Meta Tags for Rich Results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Finding Better University",
              "description": "A curated marketplace of life-changing courses taught by real people who have achieved success in various aspects of life.",
              "url": "https://quotewtf.vercel.app",
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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </>
  )
}