import useScrolledPast from '../hooks/useScrolledPast'
import { PRESSABLE } from './ui'

const pastFirstScreen = () => window.innerHeight

// Floating "back to top" button, shown once the visitor has scrolled past the first screen (100vh).
// While hidden it's `inert`, so it can't be tabbed to or clicked.
export default function ScrollToTop() {
  const visible = useScrolledPast(pastFirstScreen)

  function scrollToTop() {
    // No `behavior` here: the html `scroll-behavior` rule makes it smooth, unless the visitor prefers reduced motion.
    window.scrollTo({ top: 0 })
    // The button goes inert as it hides, so hand keyboard focus to the start of the page (the nav logo).
    document.querySelector('nav[aria-label="Main"] a')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      inert={!visible}
      onClick={scrollToTop}
      className={`fixed right-5 bottom-[max(20px,env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full bg-gold text-ink shadow-[0_8px_20px_-6px_rgba(12,12,10,0.45)] hover:opacity-90 hover:shadow-[0_12px_26px_-8px_rgba(168,122,31,0.7)] md:right-8 md:bottom-8 ${PRESSABLE} ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      }`}
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 16V4M5 9l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
