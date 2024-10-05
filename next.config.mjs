import withPlaiceholder from '@plaiceholder/next'
import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: '**.amazonaws.com' },
      { hostname: '**.imagekit.io' },
      { hostname: '**.notion.so' },
      { hostname: '**.googleusercontent.com' },
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
        source: '/jobs',
      },
      {
        destination: 'https://tuanducdev.notion.site/c40aaaaf01c24479bb1313083b1c59ca',
        permanent: true,
        source: '/notes',
      },
      {
        destination: 'https://tuanducdev.notion.site/83127584ff9040b18e8bcecbc8c0cc23',
        permanent: true,
        source: '/viewing',
      },
    ]
  },
}

const millionConfig = {
  auto: { rsc: true },
  mute: true,
  rsc: true,
}

export default withPlaiceholder(
  million.next(nextConfig, millionConfig),
)
