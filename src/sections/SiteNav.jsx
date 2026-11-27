import MobileMenu from '../components/MobileMenu'
import { Logo, NavCallButton } from '../components/ui'
import useScrolledPast from '../hooks/useScrolledPast'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Prices', href: '#prices' },
  { label: 'Our promise', href: '#our-promise' },
  { label: 'FAQ', href: '#faq' },
]

// Past this many pixels the bar gets its own background, so its white text stays readable over light sections.
const pastTop = () => 8

// Fixed rather than sticky: the hero clips its overflow and isolates its stacking context, so a nav inside it
// couldn't stay on screen past the hero or reliably sit above later sections. At the top of the page it's
// transparent over the hero photo, exactly where the design puts it (26px down); once scrolled it tightens
// into a dark, blurred bar. The hero reserves the nav's height in its own top padding.
export default function SiteNav() {
  const scrolled = useScrolledPast(pastTop)

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ease-out-expo ${
        scrolled
          ? 'bg-ink/80 py-3 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md'
          : 'bg-transparent pt-[26px] pb-0'
      }`}
    >
      <nav
        data-reveal="fade"
        aria-label="Main"
        className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-20"
      >
        <a href="#top" aria-label="Landed home">
          <Logo className="text-[26px]" />
        </a>
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-3 py-[9px] text-[14px] font-medium text-snow transition-colors duration-300 hover:bg-white/10 active:bg-white/20"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="hidden w-4 md:block" />
          {/* Below md, "Book a call" moves into the hamburger menu alongside every section. */}
          <MobileMenu />
          <NavCallButton className="hidden md:inline-flex" />
        </div>
      </nav>
    </div>
  )
}
