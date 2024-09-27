'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'

export default function Pagination({ total }: { total: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(total / 5)
  const pages = searchParams.get('page') ? Number.parseInt(searchParams.get('page') as string) : 1

  return (
    <div className="flex justify-center">
      <ReactPaginate
        containerClassName="flex items-center space-x-1 h-8 text-sm"
        previousLabel={<span className="px-3 py-2 text-zinc-800 border border-gray-300 rounded-l-lg hover:bg-gray-100">Previous</span>}
        nextLabel={<span className="px-3 py-2 text-zinc-800 border border-gray-300 rounded-r-lg hover:bg-gray-100">Next</span>}
        breakLabel="..."
        breakLinkClassName="px-3 py-2 text-zinc-800 border border-gray-300 hover:bg-gray-100"
        pageLinkClassName="px-3 py-2 text-zinc-800 border border-gray-300 hover:bg-gray-100"
        activeLinkClassName="bg-blue-50 border-blue-400 text-blue-700"
        previousLinkClassName="hover:bg-gray-100 cursor-pointer disabled:opacity-50"
        nextLinkClassName="hover:bg-gray-100 cursor-pointer disabled:opacity-50"
        disabledLinkClassName="cursor-not-allowed opacity-50 pointer-events-none"
        initialPage={pages - 1}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => {
          const newPage = selected + 1
          router.push(`${pathname}?page=${newPage}`)
        }}
        disableInitialCallback
      />
    </div>
  )
}
