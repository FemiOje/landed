import { useEffect } from 'react'

const STAGGER_MS = 90
const MAX_STAGGER_STEPS = 6

function byDocumentOrder(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
}

// Reveals each [data-reveal] element once, the first time it scrolls into view (styles live in index.css).
// Elements entering in the same frame are staggered in document order, so a row of cards cascades at any
// column count without per-breakpoint delays.
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not([data-revealed])')

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort(byDocumentOrder)
          .forEach((element, i) => {
            element.style.setProperty('--reveal-stagger', `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`)
            element.setAttribute('data-revealed', '')
            observer.unobserve(element)
          })
      },
      // Trigger a little before the element is fully on screen, so it settles as it arrives.
      { rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
