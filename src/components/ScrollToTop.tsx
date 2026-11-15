import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

/**
 * ScrollToTop Component
 * 
 * Automatically resets the scroll position to (0, 0) on every route pathname change.
 * Uses `behavior: 'instant'` to prevent sluggish or interrupted smooth scroll transitions.
 * Also handles anchor hashes and resets any inner scrollable containers.
 */
export function ScrollToTop() {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const hash = routerState.location.hash

  useEffect(() => {
    // If navigating to an anchor hash (e.g. #contact), scroll to it
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'instant' })
        return
      }
    }

    // Instantly reset standard window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })

    // Fallback for body and documentElement
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Reset inner scrollable container if layout uses one
    const mainEl = document.querySelector('main')
    if (mainEl && mainEl.scrollTop > 0) {
      mainEl.scrollTop = 0
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
