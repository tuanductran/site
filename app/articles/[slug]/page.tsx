import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { PrismHightler } from '@components/PrismHightler'
import { siteConfig } from '@data'
import { getArticle, getArticles } from '@db'
import { ArticlesLayout } from '@layout/ArticlesLayout'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const articles = await getArticles()
  const post = articles.find(p => p.slug === params.slug)
  if (!post) {
    return
  }

  const {
    createdAt,
    editedAt,
    slug,
    title,
  } = post

  const canonicalUrl = `${siteConfig.siteURL}/articles/${slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${encodeURIComponent(title)}`

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description: title,
    openGraph: {
      title,
      description: title,
      type: 'article',
      publishedTime: createdAt,
      modifiedTime: editedAt,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    title,
    twitter: {
      card: 'summary_large_image',
      title,
      description: title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      site: '@tuanducdesigner',
      creator: '@tuanducdesigner',
    },
  }
}

export default async function Article({ params }) {
  const articles = await getArticles()
  const article = articles.find(article => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  const articleContent = await getArticle(article.id)

  const canonicalUrl = `${siteConfig.siteURL}/articles/${article.slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${article.title}`

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': article.title,
            'datePublished': article.createdAt,
            'dateModified': article.editedAt,
            'description': article.title,
            'image': ogImageUrl,
            'url': canonicalUrl,
            'author': {
              '@type': 'Person',
              'name': siteConfig.name,
            },
          }),
        }}
      />
      <ArticlesLayout article={article}>
        {articleContent.map((block: BlockObjectResponse) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </ArticlesLayout>
      <Suspense>
        <PrismHightler />
      </Suspense>
    </>
  )
}
