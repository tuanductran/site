import MillionLint from '@million/lint'
import withPlaiceholder from '@plaiceholder/next'
import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: '**.amazonaws.com' },
      { hostname: '**.imagekit.io' },
      { hostname: '**.notion.so' },
      { hostname: '**.googleusercontent.com' },
      { hostname: '**.tuanductran.site' },
    ],
  },
  async redirects() {
    return [
      {
        destination: '/articles',
        permanent: true,
        source: '/blog',
      },
      {
        destination: '/articles/:slug*',
        permanent: true,
        source: '/blog/:slug*',
      },
      {
        destination: 'https://github.com/awesome-jobs/vietnam/issues',
        permanent: true,
        source: '/careers',
      },
      {
        destination: 'https://tuanducdev.notion.site/83127584ff9040b18e8bcecbc8c0cc23',
        permanent: false,
        source: '/viewing',
      },
    ]
  },
}

export default MillionLint.next({ rsc: true })(withSentryConfig(
  withPlaiceholder(nextConfig),
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    dist: '1',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
  },
))
