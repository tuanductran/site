export default function Error({ statusCode }) {
  return (
    <section className="overflow-hidden">
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{statusCode}</h1>
      <p className="prose prose-slate dark:prose-dark">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </section>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
