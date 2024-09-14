import Link from '@components/Link'
import { NotionTags } from '@components/Tags'
import { siteConfig } from '@data'
import { booksApi } from '@db'
import { filterStatus } from '@lib/filterStatus'
import type { NotionBooks } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

const seoTitle = 'Books Collection'
const seoDescription = 'Explore our extensive collection of books'

interface BooksProps {
  books: NotionBooks[]
  status: string[]
}

const BooksPage: React.FC<BooksProps> = ({ books, status }) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const filteredBooks = filterStatus(books, selectedStatus)

  return (
    <>
      <NextSeo
        title={`${seoTitle} - ${siteConfig.name}`}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/books`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${`${seoTitle} - ${siteConfig.name}`}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        <NotionTags
          tags={status}
          selectedTag={selectedStatus}
          setSelectedTag={setSelectedStatus}
        />
        {filteredBooks.map((books: NotionBooks) => {
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
    </>
  )
}

export const getStaticProps: GetStaticProps<BooksProps> = async () => {
  const books = await booksApi.getBooks()
  const status = Array.from(new Set(books.flatMap(books => books.status.string)))

  return {
    props: {
      books,
      status,
    },
    revalidate: 10,
  }
}

export default BooksPage
