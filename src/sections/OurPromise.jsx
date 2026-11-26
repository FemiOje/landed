import cardIcon from '../assets/icons/promise-card.svg'
import companyIcon from '../assets/icons/promise-company.svg'
import docIcon from '../assets/icons/promise-doc.svg'
import shieldIcon from '../assets/icons/promise-shield.svg'
import TailorCarousel from '../components/TailorCarousel'
import { Eyebrow, Placeholder, SectionTitle } from '../components/ui'
import { LINKS } from '../config'

const PROMISES = [
  {
    icon: companyIcon,
    title: 'A real company',
    body: (
      <>
        Landed is a trading name of <Placeholder>[company name]</Placeholder>, company number{' '}
        <Placeholder>[number]</Placeholder>. Look us up on the official UK register.
      </>
    ),
    link: { label: 'View on Companies House  →', href: LINKS.companiesHouse },
  },
  {
    icon: cardIcon,
    title: 'Card payments only',
    body: 'Your half and the rest go through Stripe to the company, never a personal account, so your bank’s card protections apply.',
  },
  {
    icon: shieldIcon,
    title: 'Security, checked',
    body: 'Every guard comes from a security company licensed by the NSCDC. We check the company’s licence, not just the guard.',
  },
  {
    icon: docIcon,
    title: 'Our promises, written down',
    body: 'Remake or refund on outfits, a missed day refunded, and what happens to your half. All in our terms.',
    link: { label: 'Read the terms  →', href: LINKS.terms },
    tight: true,
  },
]

function PromiseCard({ icon, title, body, link, tight }) {
  return (
    <article
      className={`flex flex-col rounded-[20px] border border-ink/8 bg-white p-7 min-[1440px]:h-[286px] ${tight ? 'gap-[9px]' : 'gap-3.5'}`}
    >
      <img src={icon} width="44" height="44" alt="" />
      <h3 className="text-[22px] font-medium tracking-[-0.01em]">{title}</h3>
      <p className="font-inter text-[15px] leading-6 text-body">{body}</p>
      {link && (
        <a
          href={link.href}
          className="self-start font-inter text-[14px] font-medium whitespace-pre hover:underline"
        >
          {link.label}
        </a>
      )}
    </article>
  )
}

export default function OurPromise() {
  return (
    <section id="our-promise" aria-labelledby="our-promise-title" className="bg-cream">
      {/* At design width Figma fixes the cards at 286px and the section at 1065px; content runs into the padding, as in the design. */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 md:py-20 xl:px-20 xl:pt-24 xl:pb-[172px] min-[1440px]:h-[1065px]">
        <div className="flex max-w-[760px] flex-col gap-[19px]">
          <Eyebrow tone="soft">OUR PROMISE</Eyebrow>
          <SectionTitle id="our-promise-title">Every promise, in writing.</SectionTitle>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((promise) => (
            <PromiseCard key={promise.title} {...promise} />
          ))}
        </div>
        <TailorCarousel />
      </div>
    </section>
  )
}
