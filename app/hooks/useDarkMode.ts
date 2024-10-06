'use client'

import { useEffect } from 'react'

function useDarkMode() {
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateMode = () => {
      const systemDark = darkModeQuery.matches
      const userDark = localStorage.getItem('isDarkMode') === 'true' || (!('isDarkMode' in localStorage) && systemDark)

      document.documentElement.classList.toggle('dark', userDark)

      if (userDark === systemDark) {
        localStorage.removeItem('isDarkMode')
      }
    }

    darkModeQuery.addEventListener('change', updateMode)
    window.addEventListener('storage', updateMode)

    // Initial mode update
    updateMode()

    // Cleanup listeners on component unmount
    return () => {
      darkModeQuery.removeEventListener('change', updateMode)
      window.removeEventListener('storage', updateMode)
    }
  }, [])
}

export default useDarkMode
