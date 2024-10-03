'use client'

import { PageTitle } from '@components/PageTitle'

export default function Error() {
  return (
    <div className="flex min-h-full flex-col pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-primary">Error!</p>
            <PageTitle>Something went wrong.</PageTitle>
            <p className="mt-2 text-base text-gray-500">Oh no, something went wrong... maybe refresh?</p>
          </div>
        </div>
      </main>
    </div>
  )
}
