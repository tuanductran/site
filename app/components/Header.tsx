'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Avatar } from './Avatar'
import { AvatarContainer } from './AvatarContainer'
import { Container } from './Container'
import { DesktopNavigation, MobileNavigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const headerRef = useRef<HTMLDivElement | null>(null)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: any, value: any) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: any) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      const { height, top } = headerRef.current!.getBoundingClientRect()
      const scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight)

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      }
      else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      }
      else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      }
      else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`)

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? 1 : 0)
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()

    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles, { passive: true } as any)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header className="pointer-events-none relative z-50 flex flex-col h-[var(--header-height)] mb-[var(--header-mb)]">
        {isHomePage && (
          <>
            <div ref={avatarRef} className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
            <Container className="top-0 order-last -mb-3 pt-3 [position:var(--header-position)]">
              <div className="top-[var(--avatar-top,theme(spacing.3))] w-full [position:var(--header-inner-position)]">
                <div className="relative">
                  <AvatarContainer className="absolute left-0 top-3 origin-left transition-opacity opacity-[var(--avatar-border-opacity,0)] [transform:var(--avatar-border-transform)]" />
                  <Avatar
                    large
                    className="block size-16 origin-left [transform:var(--avatar-image-transform)]"
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div ref={headerRef} className="top-0 z-10 h-16 pt-6 [position:var(--header-position)]">
          <Container className="top-[var(--header-top,theme(spacing.6))] w-full [position:var(--header-inner-position)]">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div className="h-[var(--content-offset)]" />}
    </>
  )
}
