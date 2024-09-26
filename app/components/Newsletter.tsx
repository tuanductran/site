import { Button } from './Button'
import { FolderIcon } from './icons'

export function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <FolderIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Create your CV</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Start building your CV
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-primary-light focus:outline-none focus:ring-4 focus:ring-primary-light/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-primary-light dark:focus:ring-primary-light/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none" href="/create-cv">
          Get Started
        </Button>
      </div>
    </form>
  )
}
