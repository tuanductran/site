'use client'

import { ThemeProvider as NextThemes } from 'next-themes'
import type { ReactNode } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <NextThemes enableSystem attribute="class">
      {children}
    </NextThemes>
  )
}
