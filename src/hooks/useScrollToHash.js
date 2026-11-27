import { useEffect } from 'react'

// Pages are drawn by React after the browser has already tried to jump to the URL's #fragment, so a link like
// /privacy#cookies or /#prices would land at the top. Once the page has rendered, scroll to the target ourselves.
// The target's scroll-margin (e.g. room for the fixed nav) still applies.
export default function useScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [])
}
