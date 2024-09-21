import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      { hostname: '**.amazonaws.com' },
      { hostname: '**.imagekit.io' },
      { hostname: '**.notion.so' },
      { hostname: '**.googleusercontent.com' },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/notes/:slug*',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: 'https://github.com/awesome-jobs/vietnam/issues',
        permanent: true,
      },
    ]
  },
}

export default withPlaiceholder(nextConfig)
