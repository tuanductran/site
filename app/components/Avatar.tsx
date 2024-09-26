import { siteConfig } from '@data'
import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

import Image from './Image'
import Link from './Link'

type Props = {
  large?: boolean
} & HTMLAttributes<HTMLAnchorElement>

export function Avatar({ large = false, className, ...props }: Props) {
  return (
    <Link href="/" aria-label={siteConfig.name} className={clsx(className, 'pointer-events-auto')} {...props}>
      <Image
        src="/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg"
        alt={siteConfig.name}
        width={1200}
        height={600}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'size-16' : 'size-9',
        )}
        priority
      />
    </Link>
  )
}
