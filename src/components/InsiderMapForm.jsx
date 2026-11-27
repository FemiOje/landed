import { useId, useRef, useState } from 'react'
import arrowIcon from '../assets/icons/arrow-right.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import lockIcon from '../assets/icons/lock.svg'
import { INSIDER_MAP_FORM_ACTION, LINKS } from '../config'
import { PRESSABLE } from './ui'
import externalLinkProps from '../utils/externalLinkProps'

const DATE_PATTERN = '\\d{2}/\\d{2}/\\d{4}'

function parseDate(value) {
  const [day, month, year] = value.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Fields sharing a row stretch to the same height; `justify-end` pins each input to the bottom, so inputs stay
// level even when one label wraps (e.g. "Arriving in Lagos" beside "Leaving" on a phone).
function Field({ label, icon, ref, ...inputProps }) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-end gap-2">
      <label htmlFor={id} className="font-inter text-[13px] font-medium text-body">
        {label}
      </label>
      <div className="flex h-[50px] items-center gap-2.5 rounded-[12px] border border-ink/12 bg-cream px-3.5 transition-[border-color,box-shadow,background-color] duration-300 hover:border-ink/24 focus-within:border-gold-deep focus-within:bg-white focus-within:ring-2 focus-within:ring-gold/30">
        {icon && <img src={icon} width="20" height="20" alt="" className="shrink-0" />}
        <input
          ref={ref}
          id={id}
          className="h-full w-full min-w-0 bg-transparent font-inter text-[15px] text-ink outline-none placeholder:text-stone"
          {...inputProps}
        />
      </div>
    </div>
  )
}

function WhatsAppLink({ children }) {
  return (
    <a href={LINKS.whatsapp} {...externalLinkProps(LINKS.whatsapp)} className="font-medium underline underline-offset-2">
      {children}
    </a>
  )
}

// status: 'idle' | 'sending' | 'sent' | 'failed' | 'off' (no endpoint configured).
export default function InsiderMapForm({ className = '' }) {
  const leavingRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [sentTo, setSentTo] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const arriving = parseDate(form.elements.arriving.value)
    const leaving = parseDate(form.elements.leaving.value)

    if (leaving < arriving) {
      leavingRef.current.setCustomValidity('Your leaving date must be after your arrival date.')
      form.reportValidity()
      return
    }

    if (!INSIDER_MAP_FORM_ACTION) {
      setStatus('off')
      return
    }

    const entry = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const response = await fetch(INSIDER_MAP_FORM_ACTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(entry),
      })
      if (!response.ok) throw new Error(`Insider Map sign-up failed with ${response.status}`)
      setSentTo(entry.email)
      setStatus('sent')
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus('failed')
    }
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={sending}
      className={`flex flex-col gap-[18px] rounded-[15px] bg-white px-8 py-[34px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[28px] font-medium tracking-[-0.02em]">Get your free map</h3>
        <p className="font-inter text-[15px] leading-[22px] text-muted">
          Sent to your inbox, built around your dates.
        </p>
      </div>
      <Field label="Your name" name="name" autoComplete="name" placeholder="First and last name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      {/* Side by side, each date input is too narrow for "18/12/2026" on phones, so the dates stack until sm. */}
      <div className="flex flex-col gap-[18px] sm:flex-row sm:gap-3">
        <Field
          label="Arriving in Lagos"
          name="arriving"
          icon={calendarIcon}
          inputMode="numeric"
          pattern={DATE_PATTERN}
          title="Use the format DD/MM/YYYY"
          placeholder="18/12/2026"
          required
        />
        <Field
          ref={leavingRef}
          label="Leaving"
          name="leaving"
          icon={calendarIcon}
          inputMode="numeric"
          pattern={DATE_PATTERN}
          title="Use the format DD/MM/YYYY"
          placeholder="02/01/2027"
          onInput={(event) => event.currentTarget.setCustomValidity('')}
          required
        />
      </div>
      {/* Honeypot: hidden from people and screen readers, but bots fill it in. The server drops any entry that has it. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <button
        type="submit"
        disabled={sending}
        className={`group/submit flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gold text-[14px] font-medium text-ink hover:opacity-90 hover:shadow-[0_10px_24px_-10px_rgba(212,164,67,0.8)] disabled:cursor-wait disabled:opacity-70 ${PRESSABLE}`}
      >
        {sending ? 'Sending…' : 'Send me the Insider Map'}
        <img
          src={arrowIcon}
          width="20"
          height="20"
          alt=""
          className="transition-transform duration-300 ease-out-expo motion-safe:group-hover/submit:translate-x-1"
        />
      </button>
      <p className="flex items-center gap-2 font-inter text-[13px] text-muted">
        <img src={lockIcon} width="18" height="18" alt="" />
        Free. No payment details needed.
      </p>
      {/* Grouped so the empty status region adds no gap; its messages bring their own spacing. */}
      <div className="-mt-2.5 font-inter text-[13px] leading-5">
        <p className="text-muted">
          We’ll only use this to send your guide. See our{' '}
          <a
            href={LINKS.privacy}
            className="font-medium text-body underline underline-offset-2 transition-colors hover:text-ink"
          >
            Privacy policy
          </a>
          .
        </p>
        {/* Always mounted, so screen readers announce each change of state. */}
        <div role="status">
          {status === 'sent' && (
            <p className="mt-2.5 text-gold-text motion-safe:animate-fade-up">
              Thanks. We’ll send your Insider Map to <strong className="font-semibold break-all">{sentTo}</strong>.
            </p>
          )}
          {status === 'failed' && (
            <p className="mt-2.5 text-alert motion-safe:animate-fade-up">
              Sorry, your details didn’t send. Please try again, or{' '}
              <WhatsAppLink>message us on WhatsApp</WhatsAppLink> for your map.
            </p>
          )}
          {status === 'off' && (
            <p className="mt-2.5 text-alert motion-safe:animate-fade-up">
              Sign-ups aren’t connected yet. Please <WhatsAppLink>message us on WhatsApp</WhatsAppLink> for your
              map.
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
