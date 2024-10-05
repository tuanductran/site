import { siteConfig } from '@data'
import { getArticles } from '@db'
import { Articles } from '@pages/Articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.siteURL}/articles`,
  },
  description: 'Explore all your articles in one place',
  openGraph: {
    title: 'Articles',
    description: 'Explore all your articles in one place',
    url: `${siteConfig.siteURL}/articles`,
    siteName: 'Articles',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=Articles`,
        width: 1200,
        height: 630,
        alt: 'Articles',
      },
    ],
  },
  twitter: {
    title: 'Articles',
    description: 'Explore all your articles in one place',
    images: [`${siteConfig.apiURL}/og?title=Articles`],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

export default async function ArticlesPage() {
  const articles = await getArticles()
  const tags = Array.from(new Set(articles.flatMap(articles => articles.tags)))
  return (
    <Articles
      title="Articles"
      articles={articles}
      tags={tags}
    />
  )
}
