'use client'

import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect } from 'react'

export default function LoadingBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    const handleComplete = () => NProgress.done()

    handleComplete()

    return () => {
      handleComplete()
    }
  }, [pathname])
  return null
}
