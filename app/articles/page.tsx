import Link from '@components/Link'
import { articlesApi, getViewsCount } from '@db'
import { Suspense } from 'react'

import ViewCounter from './view-counter'

const seoTitle = 'Articles Collection'
const seoDescription = 'Explore all your articles in one place'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function ArticlesPage() {
  const articles = await articlesApi.getArticles()
  const isEmpty = articles.length === 0
  return (
    <section>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
      {isEmpty && <p className="prose prose-slate dark:prose-dark">Yay, no articles found.</p>}
      {articles.map((articles) => {
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
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={articles.slug} />
              </Suspense>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount()

  return <ViewCounter allViews={views} slug={slug} />
}
