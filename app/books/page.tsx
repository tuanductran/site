import { siteConfig } from '@data'
import { getBooks } from '@db'
import { Books } from '@pages/Books'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.siteURL}/books`,
  },
  description: 'Explore our extensive collection of books',
  openGraph: {
    title: 'Books',
    description: 'Explore our extensive collection of books',
    url: `${siteConfig.siteURL}/books`,
    siteName: 'Books',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=${encodeURIComponent('Books')}`,
        width: 1200,
        height: 630,
        alt: 'Books',
      },
    ],
  },
  title: 'Books',
  twitter: {
    title: 'Books',
    description: 'Explore our extensive collection of books',
    images: [`${siteConfig.apiURL}/og?title=${encodeURIComponent('Books')}`],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

export default async function BooksPage() {
  const books = await getBooks()
  const status = Array.from(new Set(books.flatMap(books => books.status.string)))
  return (
    <Books
      title="Books"
      description="Explore our extensive collection of books"
      books={books}
      status={status}
    />
  )
}
