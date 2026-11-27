import whatsappIcon from '../assets/icons/whatsapp.svg'
import { LINKS } from '../config'
import externalLinkProps from '../utils/externalLinkProps'

export function Logo({ className = '' }) {
  return (
    <span className={`font-medium tracking-[-0.02em] text-white ${className}`}>
      Landed<span className="text-gold">.</span>
    </span>
  )
}

// Bracketed placeholders are highlighted in the design until the real details are known.
export function Placeholder({ children }) {
  return <span className="font-medium text-alert">{children}</span>
}

const EYEBROW_TONES = {
  soft: 'font-semibold text-gold-soft',
  deep: 'font-medium text-gold-text',
  gold: 'font-semibold text-gold',
}

// Section headings reveal on scroll by default (see useScrollReveal).
export function Eyebrow({ tone = 'deep', className = '', children }) {
  return (
    <p data-reveal="up" className={`text-[18px] ${EYEBROW_TONES[tone]} ${className}`}>
      {children}
    </p>
  )
}

export function SectionTitle({
  as: Tag = 'h2',
  tracking = 'tracking-[-0.05em]',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      data-reveal="up"
      className={`text-[40px] leading-none font-medium md:text-[64px] ${tracking} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Wraps each line in a mask so it can slide up into place; pair with data-reveal="lines" on the heading.
export function MaskedLines({ lines }) {
  return lines.map((line, i) => (
    // The padding/negative-margin pair keeps descenders inside the mask without changing the line box.
    <span key={i} className="reveal-line -mb-[0.12em] block overflow-hidden pb-[0.12em]" style={{ '--line': i }}>
      <span className="block">{line}</span>
    </span>
  ))
}

// Shared press feedback: a small lift on hover, a squeeze on click.
export const PRESSABLE =
  'transition-[opacity,translate,scale,box-shadow,background-color] duration-300 ease-out-expo motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] motion-safe:active:duration-100'

// Cards lift and deepen their shadow on hover; pair with `group` to animate children too.
export const CARD_HOVER =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out-expo motion-safe:hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(12,12,10,0.28)]'

const BUTTON_VARIANTS = {
  outline: 'border-[1.5px] border-gold-line bg-white',
  gold: 'bg-gold',
}

export function PillButton({ href = LINKS.bookCall, variant = 'outline', className = '', children }) {
  return (
    <a
      href={href}
      {...externalLinkProps(href)}
      className={`inline-flex h-[52px] items-center justify-center rounded-full px-7 font-inter text-[15px] font-medium text-ink hover:opacity-85 hover:shadow-[0_8px_20px_-8px_rgba(168,122,31,0.45)] ${PRESSABLE} ${BUTTON_VARIANTS[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

export function BookCallButton({ outlined = false, className = '' }) {
  // The outlined variant draws its 2px border inside the same 298×52 box, so padding shrinks by 2px.
  const box = outlined ? 'border-2 border-gold-ring py-3 pr-3.5 pl-[22px]' : 'py-3.5 pr-4 pl-6'
  return (
    <a
      href={LINKS.bookCall}
      {...externalLinkProps(LINKS.bookCall)}
      className={`group/call inline-flex items-center gap-4 rounded-[62px] bg-ink-black text-[16px] text-mist hover:opacity-90 hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] ${PRESSABLE} ${box} ${className}`}
    >
      Book your free december call
      <img
        src={whatsappIcon}
        width="24"
        height="24"
        alt=""
        className="transition-transform duration-500 ease-spring motion-safe:group-hover/call:-rotate-12 motion-safe:group-hover/call:scale-110"
      />
    </a>
  )
}
