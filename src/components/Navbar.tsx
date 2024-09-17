import Link from 'next/link'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/articles': {
    name: 'Articles',
  },
  '/books': {
    name: 'Books',
  },
  '/notes': {
    name: 'Notes',
  },
  '/viewing': {
    name: 'Viewing',
  },
}

export function Navbar() {
  return (
    <header className="py-6 lg:py-8" role="banner">
      <nav className="flex flex-row items-start relative overflow-x-auto" role="navigation">
        <div className="flex flex-row space-x-4">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                title={name}
                className="text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200 flex align-middle relative hover:text-sky-500 dark:hover:text-sky-400"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
