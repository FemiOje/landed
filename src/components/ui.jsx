import whatsappIcon from '../assets/icons/whatsapp.svg'
import { LINKS } from '../config'

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

export function Eyebrow({ tone = 'deep', className = '', children }) {
  return <p className={`text-[18px] ${EYEBROW_TONES[tone]} ${className}`}>{children}</p>
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
      className={`text-[40px] leading-none font-medium md:text-[64px] ${tracking} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

const BUTTON_VARIANTS = {
  outline: 'border-[1.5px] border-gold-line bg-white',
  gold: 'bg-gold',
}

export function PillButton({ href = LINKS.bookCall, variant = 'outline', className = '', children }) {
  return (
    <a
      href={href}
      className={`inline-flex h-[52px] items-center justify-center rounded-full px-7 font-inter text-[15px] font-medium text-ink transition-opacity hover:opacity-85 ${BUTTON_VARIANTS[variant]} ${className}`}
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
      className={`inline-flex items-center gap-4 rounded-[62px] bg-ink-black text-[16px] text-mist transition-opacity hover:opacity-90 ${box} ${className}`}
    >
      Book your free december call
      <img src={whatsappIcon} width="24" height="24" alt="" />
    </a>
  )
}
