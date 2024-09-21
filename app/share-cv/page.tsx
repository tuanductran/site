import CVForm from '@components/cvForm'

const seoTitle = 'Share Your CV'
const seoDescription = 'Easily and quickly share your CV to stand out to potential employers.'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default function ShareCV() {
  return (
    <section>
      <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
      <p className="my-8 prose prose-slate dark:prose-dark">{seoDescription}</p>
      <CVForm />
    </section>
  )
}
