'use client'

import { siteConfig } from '@data'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Transition, TransitionChild } from '@headlessui/react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import { ChevronDownIcon, CloseIcon } from './icons'
import Link from './Link'

export function NavLink({ children, href, title }: PropsWithChildren<{ href: string, title: string }>) {
  return (
    <Link href={href} className="transition hover:text-primary dark:hover:text-light" title={title}>
      {children}
    </Link>
  )
}

function NavItem({ children, href, title }: PropsWithChildren<{ href: string, title: string }>) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive ? 'text-primary dark:text-light' : 'hover:text-primary dark:hover:text-light',
        )}
        title={title}
      >
        {children}
        {isActive && (
          <span className="via-primary0/40 absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 to-primary/0 dark:from-light/0 dark:via-light/40 dark:to-light/0" />
        )}
      </Link>
    </li>
  )
}

export function MobileNavItem({ children, href, title }: PropsWithChildren<{ href: string, title: string }>) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2" title={title}>
        {children}
      </PopoverButton>
    </li>
  )
}

export function DesktopNavigation(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 whitespace-nowrap">
        {siteConfig.navItems.map(item => (
          <NavItem key={item.href} href={item.href} title={item.name}>
            {item.name}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

export function MobileNavigation(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {siteConfig.navItems.map(item => (
                  <MobileNavItem key={item.href} href={item.href} title={item.name}>
                    {item.name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  )
}
