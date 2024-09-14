import { Prose } from '@components/Prose'
import type { NotionArticle } from '@schema'
import type { ReactNode } from 'react'

interface ArticlesProps {
  article: NotionArticle
  children: ReactNode
}

export function ArticlesLayout({ article, children }: ArticlesProps) {
  return (
    <section className="overflow-hidden">
      <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
        {article.title}
      </h1>
      <div className="flex justify-between items-center my-6 text-sm text-slate-700 dark:text-slate-400">
        <p>
          {article.createdAt}
        </p>
      </div>
      <Prose>{children}</Prose>
    </section>
  )
}
