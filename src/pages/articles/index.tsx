import Link from '@components/Link'
import { NotionTags } from '@components/Tags'
import { siteConfig } from '@data'
import { articlesApi } from '@db'
import { filterTags } from '@lib/filterTags'
import type { NotionArticle } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

const seoTitle = 'Articles Collection'
const seoDescription = 'Explore all your articles in one place'

interface ArticlesProps {
  articles: NotionArticle[]
  tags: string[]
}

const ArticlesPage: React.FC<ArticlesProps> = ({ articles, tags }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const filteredArticles = filterTags(articles, selectedTag)

  return (
    <>
      <NextSeo
        title={`${seoTitle} - ${siteConfig.name}`}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/articles`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${`${seoTitle} - ${siteConfig.name}`}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        {filteredArticles.map((articles: NotionArticle) => {
          return (
            <Link
              key={articles.id}
              href={`/articles/${articles.slug}`}
              className="flex flex-col space-y-1 mb-4"
              title={articles.title}
            >
              <div className="w-full flex flex-col">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                  {articles.title}
                </h3>
                <p className="text-sm leading-6 dark:text-slate-400">
                  {articles.createdAt}
                </p>
              </div>
            </Link>
          )
        })}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const articles = await articlesApi.getArticles()
  const tags = Array.from(new Set(articles.flatMap(articles => articles.tags)))

  return {
    props: {
      articles,
      tags,
    },
    revalidate: 10,
  }
}

export default ArticlesPage
