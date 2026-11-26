import heroImage from '../assets/images/hero.png'
import { BookCallButton, Logo, MaskedLines, PRESSABLE } from '../components/ui'
import { LINKS } from '../config'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Prices', href: '#prices' },
  { label: 'Our promise', href: '#our-promise' },
  { label: 'FAQ', href: '#faq' },
]

function HeroNav() {
  return (
    <nav data-reveal="fade" aria-label="Main" className="flex h-9 items-center justify-between">
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
        <a
          href={LINKS.bookCall}
          className={`inline-flex h-9 items-center rounded-full bg-gold px-4 font-inter text-[14px] font-semibold text-ink shadow-[0_2px_6px_rgba(168,122,31,0.22)] hover:opacity-90 hover:shadow-[0_8px_18px_-6px_rgba(168,122,31,0.6)] ${PRESSABLE}`}
        >
          Book a call
        </a>
      </div>
    </nav>
  )
}

function LastOrdersChip() {
  return (
    <p
      data-reveal="up"
      className="inline-flex h-7 items-center gap-2 self-start rounded-full bg-white/24 px-3 text-[14px] font-medium text-snow">
      <span aria-hidden="true" className="grid size-3 place-items-center rounded-full bg-[#22c55e]/32">
        <span className="size-1.5 rounded-full bg-[#22c55e] motion-safe:animate-pulse" />
      </span>
      LAST ORDERS, THURSDAY 10TH DEC
    </p>
  )
}

export default function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden bg-[#60a5fa] xl:h-[865px]">
      {/* Figma crop: 1482.5×988.3 image at (-3.5, -24) inside the 1440×865 frame. */}
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        className="hero-photo absolute top-[-2.77%] left-[-0.24%] -z-10 h-[114.25%] w-[102.95%] max-w-none object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/54" />

      <div className="mx-auto max-w-[1440px] px-5 pt-[26px] pb-20 md:px-10 xl:px-20 xl:pb-0">
        <HeroNav />

        <div className="mt-24 flex max-w-[782px] flex-col gap-[15px] md:mt-32 xl:mt-[152px] xl:-ml-[3px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <LastOrdersChip />
              <h1
                data-reveal="lines"
                className="text-[44px] leading-[0.976] font-medium tracking-[-0.045em] text-snow md:text-[64px] xl:text-[80px]">
                <MaskedLines lines={['Welcome home.', "December's already planned."]} />
              </h1>
            </div>
            <p data-reveal="up" className="text-[18px] text-snow md:text-[22px]">
              Your outfit, your photoshoot, nights out with a host who knows Lagos, security when you
              want it, and home-cooked meals. Everything arranged before you land.
            </p>
            <div data-reveal="up" className="self-start">
              <BookCallButton />
            </div>
          </div>
          <p data-reveal="fade" className="text-[14px] font-medium whitespace-pre-wrap text-snow">
            {'Prices fixed in pounds  ·  No IJGB prices  ·  Licensced Security  ·  UK company'}
          </p>
        </div>
      </div>
    </header>
  )
}
