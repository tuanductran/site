import clsx from 'clsx'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { AllHTMLAttributes, ElementType, PropsWithChildren } from 'react'

function CardRoot({
  as: Component = 'div',
  className,
  children,
}: PropsWithChildren<{ as?: ElementType, className?: string }>) {
  return (
    <Component className={clsx(className, 'group relative flex flex-col items-start')}>
      {children}
    </Component>
  )
}

function CardLink({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <>
      <span className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

function CardTitle({
  as: Component = 'h2',
  href,
  children,
}: PropsWithChildren<{ as?: ElementType, href?: string }>) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 text-balance">
      {href ? <CardLink href={href}>{children}</CardLink> : children}
    </Component>
  )
}

function CardDescription({ children }: PropsWithChildren) {
  return <p className="relative z-10 mt-2 text-sm">{children}</p>
}

function CardCta({ children }: PropsWithChildren) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary"
    >
      {children}
      <span className="ml-1">→</span>
    </div>
  )
}

function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}: PropsWithChildren<
  {
    as?: ElementType
    decorate?: boolean
    className?: string
  } & AllHTMLAttributes<HTMLElement>
>) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}

export const Card = Object.assign(CardRoot, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
  Cta: CardCta,
  Eyebrow: CardEyebrow,
})
