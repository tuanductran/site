import './global.css'
import { siteConfig } from '@data'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

import { Navbar } from './components/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteURL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.desc,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.desc,
    url: siteConfig.siteURL,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteConfig.name,
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <Toaster />
        <div className="max-w-3xl mb-20 sm:mb-32 md:mb-40 flex flex-col mx-auto">
          <main className="flex-1 max-w-7xl flex flex-col px-4 sm:px-6 md:px-8">
            <Navbar />
            {children}
          </main>
        </div>
        <SpeedInsights />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="965f3c0e-5020-4994-8926-fe09d69bb199"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
