import { useEffect, useRef, useState } from 'react'
import { LINKS } from '../config'
import { Logo, PRESSABLE } from './ui'

// Every section with an anchor, in page order.
const MENU_LINKS = [
  { label: 'Why Landed', href: '#why-landed' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Prices', href: '#prices' },
  { label: 'Our promise', href: '#our-promise' },
  { label: 'Landed vs DIY', href: '#compare' },
  { label: 'Key dates', href: '#key-dates' },
  { label: 'Meet the team', href: '#team' },
  { label: 'Insider map', href: '#insider-map' },
  { label: 'FAQ', href: '#faq' },
]

const ROUND_BUTTON =
  'grid size-9 place-items-center rounded-full bg-white/10 text-snow transition-colors duration-300 hover:bg-white/20 active:bg-white/30'

// Below md the nav collapses into this full-screen menu. It's a native modal <dialog>, so the browser traps
// focus, closes it on Escape, makes the page behind it inert and returns focus to the trigger on close.
// Open/close transitions and the body scroll lock live in index.css (.mobile-menu).
export default function MobileMenu() {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Widening past md hides the trigger, so don't leave the menu open over the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia('(width >= 48rem)')
    const closeOnDesktop = (event) => event.matches && dialogRef.current?.close()
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  function openMenu() {
    dialogRef.current.showModal()
    // showModal() focuses the first focusable element (the logo); the close button is the better start.
    closeRef.current.focus()
    setOpen(true)
  }

  // Links close the menu and then let the browser follow the anchor as usual.
  const closeMenu = () => dialogRef.current.close()

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={openMenu}
        className={`${ROUND_BUTTON} md:hidden`}
      >
        <span aria-hidden="true" className="flex w-4 flex-col gap-[4px]">
          <span className="h-[1.5px] rounded-full bg-current" />
          <span className="h-[1.5px] rounded-full bg-current" />
          <span className="h-[1.5px] rounded-full bg-current" />
        </span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-ink p-0 text-snow backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col px-5 pt-[26px] pb-8">
          <div className="flex h-9 items-center justify-between">
            <a href="#top" onClick={closeMenu} aria-label="Landed home">
              <Logo className="text-[26px]" />
            </a>
            <button ref={closeRef} type="button" aria-label="Close menu" onClick={closeMenu} className={ROUND_BUTTON}>
              <span aria-hidden="true" className="relative size-4">
                <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rotate-45 rounded-full bg-current" />
                <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 -rotate-45 rounded-full bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Sections" className="mt-8">
            <ul>
              {MENU_LINKS.map((link, i) => (
                <li key={link.href} className="mobile-menu-item border-b border-white/10" style={{ '--item': i }}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between py-3 text-[22px] font-medium tracking-[-0.03em] text-snow transition-colors duration-300 hover:text-gold active:text-gold"
                  >
                    {link.label}
                    <span aria-hidden="true" className="font-mono text-[12px] tracking-normal text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-item mt-auto pt-8" style={{ '--item': MENU_LINKS.length }}>
            <a
              href={LINKS.bookCall}
              onClick={closeMenu}
              className={`flex h-[52px] w-full items-center justify-center rounded-full bg-gold font-inter text-[15px] font-semibold text-ink shadow-[0_2px_6px_rgba(168,122,31,0.22)] hover:opacity-90 ${PRESSABLE}`}
            >
              Book a call
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}
