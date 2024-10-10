'use client'

import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from './icons'

// Currently not used
export function ThemeToggle() {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const isSystemDarkMode = darkModeMediaQuery.matches
    const savedDarkMode = window.localStorage.getItem('isDarkMode')

    const isDarkMode
      = savedDarkMode === 'true' || (savedDarkMode === null && isSystemDarkMode)

    setTheme(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (savedDarkMode === null) {
        document.documentElement.classList.toggle('dark', e.matches)
        setTheme(e.matches)
      }
    }

    darkModeMediaQuery.addEventListener('change', handleSystemChange)
    return () =>
      darkModeMediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  function toggleMode() {
    const isDarkMode = !theme
    setTheme(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    if (
      isDarkMode === window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      window.localStorage.removeItem('isDarkMode')
    }
    else {
      window.localStorage.setItem('isDarkMode', isDarkMode.toString())
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="size-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-primary [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-primary-dark" />
      <MoonIcon className="hidden size-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-primary" />
    </button>
  )
}
