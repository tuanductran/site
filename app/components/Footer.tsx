import { siteConfig } from '@data'
import type { ElementType } from 'react'

import { Container } from './Container'
import Link from './Link'

interface Props {
  href: string
  title: string
  icon: ElementType
}

function FooterSocial({ href, title, icon: Icon }: Props) {
  return (
    <Link href={href} title={title} className="group -m-1 p-1">
      <span className="sr-only">{title}</span>
      <Icon className="size-5 text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6">
                {siteConfig.socialMedia.map(social => (
                  <FooterSocial
                    key={social.name}
                    href={social.link}
                    title={social.name}
                    icon={social.icon}
                  />
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy;
                {' '}
                {new Date().getFullYear()}
                {' '}
                {siteConfig.name}
                . All rights reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
