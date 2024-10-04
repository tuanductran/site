import Link from '@components/Link'
import { notesApi } from '@db'

const seoTitle = 'Notes Collection'
const seoDescription = 'Explore all your notes in one place'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export const revalidate = 60

export default async function Notes() {
  const notes = await notesApi.getNotes()
  const isEmpty = notes.length === 0

  return (
    <section>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
      {isEmpty && <p className="prose prose-slate dark:prose-dark">Yay, no notes found.</p>}
      {notes.map((notes) => {
        return (
          <Link
            key={notes.id}
            href={`/notes/${notes.slug}`}
            className="flex flex-col space-y-1 mb-4"
            title={notes.title}
          >
            <div className="w-full flex flex-col">
              <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                {notes.title}
              </h3>
              <p className="text-sm leading-6 dark:text-slate-400">
                {notes.createdAt}
              </p>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
