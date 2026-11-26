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

const CONTACT = ['WhatsApp UK [+44 number]', 'Email [to add]', 'London · Lagos']

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

function Column({ title, children }) {
  return (
    <div data-reveal="up" className="flex flex-col gap-3.5 lg:w-[200px] lg:shrink-0">
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
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div data-reveal="up" className="flex flex-col gap-[18px] lg:w-[420px] lg:shrink-0">
            <Logo className="text-[34px]" />
            <p className="font-inter text-[16px] leading-[25px] text-white/62">
              Your December in Lagos, taken care of. Planned with you from London, handled by our
              team on the ground.
            </p>
          </div>
          <div aria-hidden="true" className="hidden flex-1 lg:block" />
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
            <Column title="CONTACT">
              {CONTACT.map((item) => (
                <li key={item} className="whitespace-nowrap text-white/85">
                  {item}
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
            Right padding offsets the trailing letter-spacing so the glyphs centre like Figma. */}
        <div aria-hidden="true" className="relative h-[120px] overflow-hidden md:h-[200px] xl:h-[290px]">
          <span data-reveal="rise" className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0))] bg-clip-text text-[150px] font-medium tracking-[-0.06em] pr-[0.06em] whitespace-nowrap optical-auto text-transparent select-none md:top-[-40px] md:text-[250px] xl:top-[-58px] xl:text-[360px]">
            Landed
          </span>
        </div>
      </div>
    </footer>
  )
}
