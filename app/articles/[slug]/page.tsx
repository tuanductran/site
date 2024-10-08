import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { PrismHightler } from '@components/PrismHightler'
import { Prose } from '@components/Prose'
import { siteConfig } from '@data'
import { articlesApi } from '@db'
import { formatDate } from '@lib/date'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Redis } from '@upstash/redis'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { ReportView } from './view'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const articles = await articlesApi.getArticles()
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
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${title}`

  return {
    title,
    description: title,
    openGraph: {
      title,
      description: title,
      type: 'article',
      publishedTime: createdAt,
      modifiedTime: editedAt,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: title,
      images: [ogImageUrl],
    },
  }
}

const redis = Redis.fromEnv()

export const revalidate = 60

export default async function Article({ params }) {
  const articles = await articlesApi.getArticles()
  const article = articles.find(article => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  const articleContent = await articlesApi.getArticle(article.id)

  const views
    = (await redis.get<number>(['pageviews', 'articles', article.slug].join(':'))) ?? 0

  const canonicalUrl = `${siteConfig.siteURL}/articles/${article.slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${article.title}`

  return (
    <section>
      <ReportView slug={article.slug} />
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
      <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
        {article.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8">
        <p className="text-sm text-slate-700 dark:text-slate-400">
          {formatDate(article.createdAt)}
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          {`${Intl.NumberFormat('en-US', { notation: 'compact' }).format(
            views ?? 0,
          )} views`}
        </p>
      </div>
      <Prose>
        {articleContent.map((block: BlockObjectResponse) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </Prose>
      <Suspense>
        <PrismHightler />
      </Suspense>
    </section>
  )
}
