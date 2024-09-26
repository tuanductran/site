import { booksApi } from '@db'
import { Books } from '@pages/Books'

const seoTitle = 'Books Collection'
const seoDescription = 'Explore our extensive collection of books'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function BooksPage() {
  const books = await booksApi.getBooks()
  const status = Array.from(new Set(books.flatMap(books => books.status.string)))
  return (
    <Books
      title={seoTitle}
      description={seoDescription}
      books={books}
      status={status}
    />
  )
}
