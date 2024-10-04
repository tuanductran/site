'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

export const ReportView: FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    fetch('/api/incr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }, [slug])

  return null
}
