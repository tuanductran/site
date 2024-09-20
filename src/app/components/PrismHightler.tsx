'use client'

import prism from 'prismjs'
import { useEffect } from 'react'

export function PrismHightler() {
  useEffect(() => {
    prism.highlightAll()
  }, [])
  return null
}
