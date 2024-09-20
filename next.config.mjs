import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/jobs',
        destination: 'https://github.com/awesome-jobs/vietnam/issues',
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

export default million.next(nextConfig, millionConfig)
