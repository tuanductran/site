'use client'

import { Article } from '@components/Article'
import { PageContainer } from '@components/PageContainer'
import { NotionTags } from '@components/Tags'
import { filterTags } from '@lib/filter'
import type { NotionArticle } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  description: string
  articles: NotionArticle[]
  tags: string[]
}

export function Articles({ title, description, articles, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const filteredArticles = filterTags(articles, selectedTag)

  return (
    <PageContainer title={title} intro={description}>
      <div className="relative max-w-3xl mb-12 sm:mb-16">
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredArticles.map((article: NotionArticle) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
