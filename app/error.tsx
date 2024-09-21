'use client'

export default function Error() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
        Error!
      </h1>
      <p className="prose prose-slate dark:prose-dark">
        Oh no, something went wrong... maybe refresh?
      </p>
    </section>
  )
}
