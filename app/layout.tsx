import './global.css'
import 'focus-visible'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { siteConfig } from '@data'
import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import ThemeProvider from './theme-provider'

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
        url: `${siteConfig.apiURL}/og?title=${siteConfig.name}`,
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
  children: ReactNode
}) {
  return (
    <html className="h-full antialiased" lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg" />
      </head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-zinc-950">
        <ThemeProvider>
          <Toaster />
          <div className="fixed inset-0 flex justify-center">
            <div className="max-w-8xl flex w-full">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-[#0F0F0F] dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="965f3c0e-5020-4994-8926-fe09d69bb199"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
