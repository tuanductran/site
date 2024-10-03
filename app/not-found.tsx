import { PageTitle } from '@components/PageTitle'

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-primary">Not found!</p>
            <PageTitle>Oh no! This page doesn't exist.</PageTitle>
            <p className="mt-2 text-base text-gray-500">
              If you expected to see something here, let me know (tuanductran.dev@gmail.com).
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
