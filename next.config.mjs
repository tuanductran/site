import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/viewing',
        destination: 'https://tuanducdev.notion.site/83127584ff9040b18e8bcecbc8c0cc23?v=8cb62ccd290b45fda3c743795f5c5d09&pvs=4',
        permanent: true,
      },
    ]
  },
}

export default withPlaiceholder(nextConfig)
