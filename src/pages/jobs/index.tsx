import Link from '@components/Link'
import { siteConfig } from '@data'
import { cn } from '@lib/cn'
import { formatDate } from '@lib/date'
import { Octokit } from '@octokit/rest'
import type { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import type { FormEvent } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const seoTitle = 'Jobs Collection'
const seoDescription = 'Explore all your jobs in one place'

const octokit = new Octokit()

interface User {
  login: string
  name: string
  avatar_url: string
}

interface Issue {
  id: number
  html_url: string
  title: string
  user: User
  created_at: string
}

interface IssuesProps {
  initialJobs: Issue[]
}

async function fetchUser(username: string) {
  const { data } = await octokit.rest.users.getByUsername({ username })
  return {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
  }
}

async function formatJob(job: any): Promise<Issue> {
  const user = await fetchUser(job.user.login)
  return {
    id: job.id,
    html_url: job.html_url,
    title: job.title,
    user,
    created_at: formatDate(job.created_at),
  }
}

function JobsPage({ initialJobs }: IssuesProps) {
  const [jobs, setJobs] = useState<Issue[]>(initialJobs)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()

  const handleShareCV = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userInput = (e.currentTarget.cv.value as string)?.trim().toLowerCase()

    if (userInput === 'y') {
      router.push('/share-cv')
    }
    else if (userInput === 'n') {
      toast.success('No problem! You can share your CV anytime.')
    }
    else {
      toast.error('Please input "y" to share or "n" to stay.')
    }
  }

  const loadMoreJobs = async () => {
    if (loading || !hasMore)
      return

    setLoading(true)
    try {
      const { data: newJobs } = await octokit.rest.issues.listForRepo({
        owner: 'awesome-jobs',
        repo: 'vietnam',
        per_page: 10,
        page: page + 1,
      })

      if (newJobs.length > 0) {
        const formattedJobs = await Promise.all(newJobs.map(formatJob))
        setJobs(prevJobs => [...prevJobs, ...formattedJobs])
        setPage(prevPage => prevPage + 1)
      }
      else {
        setHasMore(false)
      }
    }
    catch (error) {
      toast.error('Error fetching more jobs:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/jobs`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${encodeURIComponent(seoTitle)}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        {jobs.length === 0 && <p className="prose prose-slate dark:prose-dark">Yay, no jobs found.</p>}
        <form className="mb-6 relative max-w-md w-full" onSubmit={handleShareCV}>
          <input
            placeholder="Do you want to share your CV? (y/n)"
            type="text"
            required
            autoComplete="off"
            className="pl-4 pr-32 py-2 focus:ring-sky-500 focus:border-sky-500 block w-full border-transparent rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            name="cv"
          />
          <button
            className="flex items-center justify-center absolute right-1 top-1 px-2 py-1 font-medium h-8 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg w-16"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="space-y-6">
          {jobs.map(i => (
            <Link
              key={i.id}
              href={i.html_url}
              className="flex space-x-4"
              title={i.title}
            >
              <div className="flex-shrink-0">
                <Image
                  src={i.user.avatar_url}
                  alt={i.user.name || i.user.login}
                  width={40}
                  height={40}
                  priority
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex space-x-2">
                  <b className="text-slate-900 dark:text-slate-200">
                    {i.user.name || i.user.login}
                  </b>
                  <time>{formatDate(i.created_at)}</time>
                </div>
                <p className="dark:text-slate-400">{i.title}</p>
              </div>
            </Link>
          ),
          )}
        </div>
        {hasMore && (
          <button
            type="button"
            onClick={loadMoreJobs}
            disabled={loading}
            className={
              cn('mt-6 py-2 px-4 bg-sky-500 flex-auto shadow text-white rounded-md text-sm font-semibold hover:bg-sky-600 dark:hover:bg-sky-400', loading && 'opacity-50 cursor-not-allowed')
            }
          >
            {loading
              ? (
                  <span className="flex items-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                  </span>
                )
              : (
                  'Load More'
                )}
          </button>
        )}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<IssuesProps> = async () => {
  try {
    const { data: jobs } = await octokit.rest.issues.listForRepo({
      owner: 'awesome-jobs',
      repo: 'vietnam',
      per_page: 10,
      page: 1,
    })

    const formattedJobs = await Promise.all(jobs.map(formatJob))

    return {
      props: {
        initialJobs: formattedJobs,
      },
      revalidate: 10,
    }
  }
  catch (error) {
    toast.error('Error fetching jobs:', error)
    return {
      props: {
        initialJobs: [],
      },
      revalidate: 10,
    }
  }
}

export default JobsPage
