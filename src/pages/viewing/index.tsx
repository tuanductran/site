import Link from '@components/Link'
import { siteConfig } from '@data'
import { viewingApi } from '@db'
import type { NotionViewing } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

const seoTitle = 'Viewing Collection'
const seoDescription = 'Explore all your viewings here'

interface ViewingProps {
  viewing: NotionViewing[]
}

function ViewingPage({ viewing }: ViewingProps) {
  return (
    <>
      <NextSeo
        title={`${seoTitle} - ${siteConfig.name}`}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/viewing`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${`${seoTitle} - ${siteConfig.name}`}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-9 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
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
    </>
  )
}

export const getStaticProps: GetStaticProps<ViewingProps> = async () => {
  const viewing = await viewingApi.getViewing()

  return {
    props: {
      viewing,
    },
    revalidate: 10,
  }
}

export default ViewingPage
