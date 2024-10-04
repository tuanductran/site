import Link from '@components/Link'
import { articlesApi } from '@db'
import { Redis } from '@upstash/redis'

const seoTitle = 'Articles Collection'
const seoDescription = 'Explore all your articles in one place'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

const redis = Redis.fromEnv()

export const revalidate = 60

export default async function ArticlesPage() {
  const articles = await articlesApi.getArticles()
  const isEmpty = articles.length === 0

  const views = (
    await redis.mget<number[]>(
      ...articles.map(p => ['pageviews', 'articles', p.slug].join(':')),
    )
  ).reduce((acc, v, i) => {
    acc[articles[i].slug] = v ?? 0
    return acc
  }, {} as Record<string, number>)

  return (
    <section>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
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
              <p className="text-neutral-600 dark:text-neutral-400">
                {`${Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                  views[articles.slug] ?? 0,
                )} views`}
              </p>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
