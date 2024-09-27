import { Author } from '@components/Author'
import { Container } from '@components/Container'
import { ArrowLeftIcon } from '@components/icons'
import Link from '@components/Link'
import { Prose } from '@components/Prose'
import type { NotionArticle } from '@schema'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  article: NotionArticle
}

export function ArticlesLayout({ children, article }: Props) {
  return (
    <Container className="mt-13 lg:mt-24">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            className="group mb-8 mt-12 flex items-center justify-center space-x-0.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 lg:absolute lg:-left-5 lg:mb-0 xl:-top-0.5 xl:left-0 xl:mt-0"
            href="/articles"
            title="Back to articles"
          >
            <ArrowLeftIcon className="size-5" />
            <span>Back to articles</span>
          </Link>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.createdAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span>
                  {article.createdAt}
                  {' '}
                  •
                  {' '}
                  {article.tags[0]}
                </span>
              </time>
              <div className="mt-7">
                <Author name="Tuan Duc Tran" />
              </div>
            </header>
            <Prose className="mt-4">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
