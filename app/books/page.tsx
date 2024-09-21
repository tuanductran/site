import Link from '@components/Link'
import { booksApi } from '@db'

const seoTitle = 'Books Collection'
const seoDescription = 'Explore our extensive collection of books'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function Books() {
  const books = await booksApi.getBooks()
  const isEmpty = books.length === 0
  return (
    <section>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
      {isEmpty && <p className="prose prose-slate dark:prose-dark">Yay, no books found.</p>}
      {books.map((books) => {
        return (
          <Link
            key={books.id}
            href={books.public_url}
            className="flex flex-col space-y-1 mb-4"
            title={books.title}
          >
            <div className="w-full flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                {books.title}
              </h3>
              <p className="text-sm leading-6 dark:text-slate-400">
                {books.createdAt}
              </p>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
