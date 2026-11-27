import facebookIcon from '../assets/icons/facebook.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import tiktokIcon from '../assets/icons/tiktok.svg'
import { Logo } from '../components/ui'
import { LINKS } from '../config'

const EXPLORE = [
  { label: 'Why Landed', href: '#why-landed' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Prices', href: '#prices' },
  { label: 'Our promise', href: '#our-promise' },
  { label: 'Key dates', href: '#key-dates' },
  { label: 'Team', href: '#team' },
  { label: 'Insider Map', href: '#insider-map' },
  { label: 'FAQ', href: '#faq' },
]

// `value` never splits (a phone number broken across lines is hard to read); the line wraps before it instead.
const CONTACT = [
  { label: 'WhatsApp UK', value: '[+44 number]' },
  { label: 'Email', value: '[to add]' },
  { label: 'London · Lagos' },
]

const SOCIAL = [
  { label: 'Instagram', href: LINKS.instagram, icon: instagramIcon },
  { label: 'TikTok', href: LINKS.tiktok, icon: tiktokIcon },
  { label: 'Facebook', href: LINKS.facebook, icon: facebookIcon },
]

const POLICIES = [
  { label: 'Terms', href: LINKS.terms },
  { label: 'Privacy', href: LINKS.privacy },
  { label: 'Cookies', href: LINKS.cookies },
]

const LINK =
  'font-inter text-[15px] text-white/85 transition-[color,translate] duration-300 ease-out-expo hover:text-white motion-safe:hover:translate-x-1'

function Gold({ children }) {
  return <span className="text-gold">{children}</span>
}

function Column({ title, className = '', children }) {
  return (
    <div data-reveal="up" className={`flex flex-col gap-3.5 lg:w-[200px] ${className}`}>
      {/* Figma: gold text with a 20% black fill layered on top. */}
      <h2 className="text-[14px] leading-[18px] font-medium text-[#aa8336]">{title}</h2>
      <ul className="flex flex-col gap-3 pt-1.5 font-inter text-[15px] leading-[18px]">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-16 md:px-10 xl:px-[100px] xl:pt-[88px]">
        {/* Desktop row: 420px brand + 3 × 200px columns, spread apart when there's room. Below ~1450px that
            doesn't fit, so the brand and columns shrink in proportion rather than pushing Follow off screen. */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
          <div data-reveal="up" className="flex flex-col gap-[18px] lg:w-[420px]">
            <Logo className="text-[34px]" />
            <p className="font-inter text-[16px] leading-[25px] text-white/62">
              Your December in Lagos, taken care of. Planned with you from London, handled by our
              team on the ground.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:contents">
            <Column title="EXPLORE">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`inline-block ${LINK}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </Column>
            {/* In the two-column phone grid, Contact drops below Explore and Follow at full width so its
                longer lines have room; from sm up it's back in its own column. */}
            <Column title="CONTACT" className="order-last col-span-2 sm:order-none sm:col-span-1">
              {CONTACT.map(({ label, value }) => (
                <li key={label} className="break-words text-white/85">
                  {label}
                  {value && (
                    <>
                      {' '}
                      <span className="whitespace-nowrap">{value}</span>
                    </>
                  )}
                </li>
              ))}
            </Column>
            <Column title="FOLLOW">
              {SOCIAL.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`flex items-center gap-2.5 ${LINK}`}>
                    <img src={link.icon} width="18" height="18" alt="" />
                    {link.label}
                  </a>
                </li>
              ))}
            </Column>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 pt-7 lg:flex-row lg:items-start lg:gap-12">
          <p className="font-inter text-[13px] leading-5 text-white/55 lg:flex-1">
            Landed is a trading name of <Gold>[company name]</Gold>, a company registered in
            England and Wales, number <Gold>[number]</Gold>. Registered office{' '}
            <Gold>[address]</Gold>. We don’t sell flights, accommodation or transport.
          </p>
          <ul className="flex gap-7">
            {POLICIES.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-inter text-[13px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-white/12" />
        <p className="mt-3.5 font-inter text-[13px] text-white/45">
          © 2026 Landed. All rights reserved.
        </p>

        {/* Wordmark: 360px "Landed" fading from 10% white at the top to transparent, cropped by a 290px box.
            Right padding offsets the trailing letter-spacing so the glyphs centre like Figma.
            The design sizes (150/250/360px) are capped at the container width ÷ 3.4 (the word is about 3.1em
            wide, plus headroom) so the whole word always fits, and the crop box and offset are in em so they
            scale with it (290/360 ≈ 0.805, 58/360 ≈ 0.16, the same ratios as the original breakpoints). */}
        <div aria-hidden="true" className="@container">
          <div className="relative h-[0.805em] overflow-hidden text-[length:min(150px,100cqw/3.4)] md:text-[length:min(250px,100cqw/3.4)] xl:text-[length:min(360px,100cqw/3.4)]">
            <span data-reveal="rise" className="absolute top-[-0.16em] left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0))] bg-clip-text font-medium tracking-[-0.06em] pr-[0.06em] whitespace-nowrap optical-auto text-transparent select-none">
              Landed
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
