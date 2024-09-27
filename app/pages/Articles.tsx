'use client'

import { ArticleWithImage } from '@components/Article'
import { Container } from '@components/Container'
import { NotionTags } from '@components/Tags'
import { filterTags } from '@lib/filter'
import type { NotionArticle } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  articles: NotionArticle[]
  tags: Array<string>
}

export function Articles({ title, articles, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const filteredArticles = filterTags(articles, selectedTag)

  return (
    <div className="mx-auto">
      <Container className="mt-12 sm:mt-24">
        <header>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
        </header>
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <div className="mt-8 sm:mt-10">
          <div className="mt-16 space-y-20 lg:space-y-20">
            {filteredArticles.map((article: NotionArticle) => (
              <ArticleWithImage key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
