import './global.css'
import 'focus-visible'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { siteConfig } from '@data'
import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  description: siteConfig.desc,
  icons: {
    icon: '/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg',
    shortcut: '/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg',
    apple: '/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg',
  },
  metadataBase: new URL(siteConfig.siteURL),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.desc,
    url: siteConfig.siteURL,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': 0,
      'max-image-preview': 'large',
      'max-snippet': 0,
    },
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.desc,
    images: [`${siteConfig.apiURL}/og?title=${siteConfig.name}`],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
  } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html className="h-full antialiased" lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-zinc-950">
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
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="965f3c0e-5020-4994-8926-fe09d69bb199"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
