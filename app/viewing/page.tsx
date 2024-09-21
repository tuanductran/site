import Link from '@components/Link'
import { viewingApi } from '@db'

const seoTitle = 'Viewing Collection'
const seoDescription = 'Explore all your viewings here'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function Viewing() {
  const viewing = await viewingApi.getViewing()
  const isEmpty = viewing.length === 0
  return (
    <section>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
      {isEmpty && <p className="prose prose-slate dark:prose-dark">Yay, no viewing found.</p>}
      {viewing.map((viewing) => {
        return (
          <Link
            key={viewing.id}
            href={viewing.url}
            className="flex flex-col space-y-1 mb-4"
            title={viewing.title}
          >
            <div className="w-full flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                {viewing.title}
              </h3>
              <p className="text-sm leading-6 dark:text-slate-400">
                {viewing.createdAt}
              </p>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
