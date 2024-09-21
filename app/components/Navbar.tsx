'use client'

import { siteConfig } from '@data'
import { cn } from '@lib/cn'
import { usePathname } from 'next/navigation'

import Link from './Link'

export function Navbar() {
  const pathname = usePathname()
  return (
    <header className="py-6 lg:py-8" role="banner">
      <nav className="flex flex-row items-start relative overflow-x-auto" role="navigation">
        <div className="flex flex-row space-x-4">
          {siteConfig.navItems.map((i) => {
            const isActive = pathname === i.href
            return (
              <Link
                key={i.href}
                href={i.href}
                title={i.name}
                className={cn(
                  'text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200 flex align-middle relative',
                  isActive
                    ? 'text-sky-500 dark:text-sky-400'
                    : 'hover:text-sky-500 dark:hover:text-sky-400',
                )}
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
