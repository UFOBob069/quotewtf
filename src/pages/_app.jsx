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
        <title>Orlando Vacation Rentals Near Disney World | Luxury Family Homes</title>
        <meta name="title" content="Orlando Vacation Rentals Near Disney World | Luxury Family Homes" />
        <meta name="description" content="Spacious vacation homes just minutes from Disney World. Save 30-50% vs. Disney hotels. Private pools, game rooms, and full kitchens. Perfect for families!" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:title" content="Orlando Vacation Rentals Near Disney World | Luxury Family Homes" />
        <meta property="og:description" content="Spacious vacation homes just minutes from Disney World. Save 30-50% vs. Disney hotels. Private pools, game rooms, and full kitchens. Perfect for families!" />
        <meta property="og:image" content="https://yourwebsite.com/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/" />
        <meta property="twitter:title" content="Orlando Vacation Rentals Near Disney World | Luxury Family Homes" />
        <meta property="twitter:description" content="Spacious vacation homes just minutes from Disney World. Save 30-50% vs. Disney hotels. Private pools, game rooms, and full kitchens. Perfect for families!" />
        <meta property="twitter:image" content="https://yourwebsite.com/images/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional SEO Tags */}
        <meta name="keywords" content="disney world vacation rentals, orlando vacation homes, near disney world, family vacation rentals, disney area villas, universal studios nearby, orlando theme park accommodation" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Your Company Name" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/" />

        {/* Additional Meta Tags for Rich Results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Orlando Vacation Homes Near Disney",
              "description": "Luxury vacation rentals minutes from Disney World and Universal Studios Orlando.",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Orlando",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Private Pool",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free WiFi",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Kitchen",
                  "value": true
                }
              ]
            }
          `}
        </script>
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-7BPJ4PFTW5" />
    </>
  )
}