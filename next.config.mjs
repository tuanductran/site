import withPlaiceholder from '@plaiceholder/next'
import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    largePageDataBytes: 800 * 1000,
  },
  images: {
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: '**.amazonaws.com' },
      { hostname: '**.placeholder.com' },
      { hostname: '**.unsplash.com' },
      { hostname: '**.twimg.com' },
      { hostname: '**.cloudfront.net' },
      { hostname: '**.hashnode.com' },
      { hostname: '**.craft.do' },
      { hostname: '**.cloudinary.com' },
      { hostname: '**.imagekit.io' },
      { hostname: '**.notion.so' },
      { hostname: '**.googleusercontent.com' },
      { hostname: '**.githubusercontent.com' },
    ],
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
    ]
  },
}

const millionConfig = {
  mute: true,
  auto: { rsc: true },
  rsc: true,
}

export default withPlaiceholder(million.next(nextConfig, millionConfig))
