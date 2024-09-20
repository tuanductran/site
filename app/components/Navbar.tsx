import { siteConfig } from '@data'

import Link from './Link'

export function Navbar() {
  return (
    <header className="py-6 lg:py-8" role="banner">
      <nav className="flex flex-row items-start relative overflow-x-auto" role="navigation">
        <div className="flex flex-row space-x-4">
          {siteConfig.navItems.map((i) => {
            return (
              <Link
                key={i.href}
                href={i.href}
                title={i.name}
                className="text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200 flex align-middle relative hover:text-sky-500 dark:hover:text-sky-400"
              >
                {i.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
