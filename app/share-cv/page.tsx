import CVForm from '@components/cvForm'
import { PageContainer } from '@components/PageContainer'
import { siteConfig } from '@data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.siteURL}/share-cv`,
  },
  description: 'Easily and quickly share your CV to stand out to potential employers.',
  openGraph: {
    title: 'Share Your CV',
    description: 'Easily and quickly share your CV to stand out to potential employers.',
    url: `${siteConfig.siteURL}/books`,
    siteName: 'Share Your CV',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=Share Your CV`,
        width: 1200,
        height: 630,
        alt: 'Share Your CV',
      },
    ],
  },
  title: 'Share Your CV',
  twitter: {
    title: 'Share Your CV',
    description: 'Easily and quickly share your CV to stand out to potential employers.',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=Share Your CV`,
        width: 1200,
        height: 630,
        alt: 'Share Your CV',
      },
    ],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

export default function ShareCV() {
  return (
    <PageContainer title="Share Your CV" intro="Easily and quickly share your CV to stand out to potential employers.">
      <CVForm />
    </PageContainer>
  )
}
