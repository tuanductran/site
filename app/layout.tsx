import './global.css'
import { siteConfig } from '@data'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

import LoadingBar from './components/LoadingBar'
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
    images: [
      {
        url: `${siteConfig.siteURL}/og?title=${siteConfig.name}`,
      },
    ],
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
    description: siteConfig.desc,
    images: [`${siteConfig.siteURL}/og?title=${siteConfig.name}`],
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
        <link rel="shortcut icon" href="/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg" />
      </head>
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <LoadingBar />
        <Toaster />
        <div className="container max-w-3xl mb-20 sm:mb-32 md:mb-40 flex flex-col mx-auto">
          <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8">
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
