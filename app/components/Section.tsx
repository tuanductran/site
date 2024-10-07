import type { PropsWithChildren, ReactNode } from 'react'

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface TitleProps {
  as?: Heading
  action?: ReactNode
  children?: ReactNode
}

export function SectionTitle({ as: TitleComponent = 'h1', action, children }: TitleProps) {
  return (
    <header className="mt-16 flex flex-row items-center justify-between">
      <TitleComponent className="text-xl font-bold leading-none tracking-tight text-zinc-800 dark:text-zinc-100">
        {children}
      </TitleComponent>
      {action}
    </header>
  )
}

export function SectionContent({ children }: PropsWithChildren) {
  return <div className="mt-4 text-base text-wrap">{children}</div>
}

export function Section({ children }: PropsWithChildren) {
  return <section className="text-wrap">{children}</section>
}
