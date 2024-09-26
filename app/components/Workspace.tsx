import type { ReactNode } from 'react'

import { Card } from './Card'

interface Props {
  href: string
  title: string
  icon: ReactNode
  desc: string
  name: string
}

export function Workspace({ href, title, icon, desc, name }: Props) {
  return (
    <Card as="article">
      <Card.Title href={href}>{title}</Card.Title>
      <Card.Eyebrow>{icon}</Card.Eyebrow>
      <Card.Description>{desc}</Card.Description>
      <Card.Cta>{name}</Card.Cta>
    </Card>
  )
}
