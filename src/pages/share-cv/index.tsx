import CVForm from '@components/cvForm'
import { siteConfig } from '@data'
import { NextSeo } from 'next-seo'

const seoTitle = 'Share Your CV - Impress Employers'
const seoDescription = 'Easily and quickly share your CV to stand out to potential employers.'

function ShareCV() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/share-cv`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${encodeURIComponent(seoTitle)}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        <p className="prose prose-slate dark:prose-dark">{seoDescription}</p>
        <div className="py-4 mx-auto">
          <CVForm />
        </div>
      </section>
    </>
  )
}

export default ShareCV
