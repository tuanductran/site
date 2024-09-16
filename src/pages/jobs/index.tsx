import Link from '@components/Link'
import { siteConfig } from '@data'
import { formatDate } from '@lib/date'
import { Octokit } from '@octokit/rest'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'

const seoTitle = 'Job'
const seoDescription = 'Find job'

const PAGE_SIZE = 6
const octokit = new Octokit()

async function fetcher(page: number) {
  const response = await octokit.issues.listForRepo({
    owner: 'awesome-jobs',
    repo: 'vietnam',
    page,
    per_page: PAGE_SIZE,
  })
  return response.data
}

export default function Jobs() {
  const {
    data,
    mutate,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(
    index => ['awesome-jobs/vietnam/issues', index + 1],
    fetcher,
  )

  const jobs = data ? [].concat(...data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    const interval = setInterval(() => {
      mutate()
    }, 60000)

    return () => clearInterval(interval)
  }, [mutate])

  return (
    <>
      <NextSeo
        title={`${seoTitle} - ${siteConfig.name}`}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/jobs`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${`${seoTitle} - ${siteConfig.name}`}` }],
        }}
      />
      <section className="overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
            All Job (Beta)
          </h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="px-3 rounded-md bg-sky-500 text-white text-sm py-2 font-semibold hover:bg-sky-600 dark:hover:bg-sky-400 disabled:opacity-75"
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more issues' : 'Load more'}
            </button>
          </div>
        </div>
        <div className="mb-6">
          {isEmpty
            ? <p className="prose prose-slate dark:prose-dark">Yay, no jobs found.</p>
            : (
                <p className="prose prose-slate dark:prose-dark">
                  <Link href="https://docs.github.com/en/rest" title="Github API">GitHub API</Link>
                  {' '}
                  is not always realtime, it might take a couple hours to update.
                </p>
              )}
        </div>
        {jobs.map(job => (
          <Link key={job.id} href={job.html_url} className="flex flex-col space-y-1 mb-4" title={job.title}>
            <div className="w-full flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm leading-6 dark:text-slate-400">
                {formatDate(job.created_at)}
                {' '}
                -
                {' '}
                {job.user.login}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
