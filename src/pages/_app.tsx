import { Navbar } from '@components/Navbar'
import '@styles/index.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import Script from 'next/script'
import NProgress from 'nprogress'
import { Toaster } from 'react-hot-toast'

if (typeof window !== 'undefined') {
  NProgress.start()
  NProgress.done()
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-3xl mb-20 sm:mb-32 md:mb-40 flex flex-col mx-auto">
      <Toaster />
      <main className="flex-1 max-w-7xl flex flex-col px-4 sm:px-6 md:px-8">
        <Navbar />
        <Component {...pageProps} />
      </main>
      <SpeedInsights />
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="965f3c0e-5020-4994-8926-fe09d69bb199"
        strategy="lazyOnload"
      />
    </div>
  )
}

export default MyApp
