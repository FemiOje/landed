import mailIcon from '../assets/icons/mail.svg'
import pinIcon from '../assets/icons/pin.svg'
import slackIcon from '../assets/icons/slack.svg'
import whatsappIcon from '../assets/icons/whatsapp-light.svg'
import { Logo, PRESSABLE } from '../components/ui'
import externalLinkProps from '../utils/externalLinkProps'
import { COMPANY, LINKS, WHATSAPP_DISPLAY } from '../config'

// Root-relative, so they also work from the Terms and Privacy pages; on the home page they just scroll.
const EXPLORE = [
  { label: 'Why Landed', href: '/#why-landed' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Prices', href: '/#prices' },
  { label: 'Our promise', href: '/#our-promise' },
  { label: 'Key dates', href: '/#key-dates' },
  { label: 'Team', href: '/#team' },
  { label: 'Insider Map', href: '/#insider-map' },
  { label: 'FAQ', href: '/#faq' },
]

const CONTACT = [
  { label: 'WhatsApp UK', icon: whatsappIcon, value: WHATSAPP_DISPLAY, href: LINKS.whatsapp },
  { label: 'Email', icon: mailIcon, value: COMPANY.email, href: `mailto:${COMPANY.email}`, breakAnywhere: true },
  { label: 'London · Lagos', icon: pinIcon },
]

const POLICIES = [
  { label: 'Terms', href: LINKS.terms },
  { label: 'Privacy', href: LINKS.privacy },
  { label: 'Cookies', href: LINKS.cookies },
]

const LINK =
  'font-inter text-[15px] text-white/85 transition-[color,translate] duration-300 ease-out-expo hover:text-white motion-safe:hover:translate-x-1'

// Offers a line break straight after the "@", so a long address wraps as "name@" / "domain" rather than mid-word.
function EmailWithBreak({ address }) {
  const at = address.indexOf('@')
  if (at === -1) return address
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  )
}

function Column({ title, width = 'lg:w-[200px]', children }) {
  return (
    <div data-reveal="up" className={`flex flex-col gap-3.5 ${width}`}>
      <h2 className="text-[14px] leading-[18px] font-medium text-[#aa8336]">{title}</h2>
      <ul className="flex flex-col gap-3 pt-1.5 font-inter text-[15px] leading-[18px]">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-16 md:px-10 xl:px-[100px] xl:pt-[88px]">
        {/* Desktop row: 420px brand + 200px Explore + content-width Contact, spread apart when there's room; on narrower screens
            the brand and columns shrink in proportion rather than pushing Contact off screen. */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
          <div data-reveal="up" className="flex flex-col gap-[18px] lg:w-[420px]">
            <Logo className="text-[34px]" />
            <p className="font-inter text-[16px] leading-[25px] text-white/62">
              Your December in Lagos, taken care of. Planned with you from London, handled by our
              team on the ground.
            </p>
          </div>
          {/* Phones: Explore and Contact stack; from sm up they sit side by side. */}
          <nav aria-label="Footer" className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-10 lg:contents">
            <Column title="EXPLORE">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`inline-block ${LINK}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </Column>
            {/* Sized to its content rather than a fixed 200px, so the email stays on one line whenever the row
                has room; it only shrinks (and wraps after the "@") when space genuinely runs out. */}
            <Column title="CONTACT" width="lg:w-auto">
              {CONTACT.map(({ label, icon, value, href, breakAnywhere }) => (
                <li key={label} className="flex items-start gap-2.5 text-white/85">
                  <img src={icon} width="18" height="18" alt={href ? label : ''} className="shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      {...externalLinkProps(href)}
                      className={`min-w-0 ${breakAnywhere ? '[overflow-wrap:anywhere]' : 'whitespace-nowrap'} underline-offset-4 transition-colors duration-300 hover:text-white hover:underline`}
                    >
                      {breakAnywhere ? <EmailWithBreak address={value} /> : value}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
              {/* The community lives on Slack: a join button after the ways to reach us. */}
              <li className="pt-1.5">
                <a
                  href={LINKS.slackJoin}
                  {...externalLinkProps(LINKS.slackJoin)}
                  className={`inline-flex h-10 items-center gap-2.5 rounded-full border border-white/20 px-3 font-inter text-[15px] font-medium whitespace-nowrap text-white/90 hover:border-gold hover:bg-white/5 hover:text-white sm:px-3.5 ${PRESSABLE}`}
                >
                  <img src={slackIcon} width="18" height="18" alt="" className="shrink-0" />
                  Join our Slack
                </a>
              </li>
            </Column>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 pt-7 lg:flex-row lg:items-start lg:gap-12">
          <p className="font-inter text-[13px] leading-5 text-white/55 lg:flex-1">
            Landed is a trading name of {COMPANY.name}, a company registered in England and Wales,
            number{' '}
            <a
              href={LINKS.companiesHouse}
              {...externalLinkProps(LINKS.companiesHouse)}
              className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
            >
              {COMPANY.number}
            </a>
            . Registered office {COMPANY.address}. We don’t sell flights, accommodation or transport.
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
