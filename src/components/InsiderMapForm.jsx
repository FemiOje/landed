import { useId, useRef, useState } from 'react'
import arrowIcon from '../assets/icons/arrow-right.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import lockIcon from '../assets/icons/lock.svg'
import { INSIDER_MAP_FORM_ACTION } from '../config'

const DATE_PATTERN = '\\d{2}/\\d{2}/\\d{4}'

function parseDate(value) {
  const [day, month, year] = value.split('/').map(Number)
  return new Date(year, month - 1, day)
}

function Field({ label, icon, ref, ...inputProps }) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className="font-inter text-[13px] font-medium text-body">
        {label}
      </label>
      <div className="flex h-[50px] items-center gap-2.5 rounded-[12px] border border-ink/12 bg-cream px-3.5 focus-within:border-gold-deep focus-within:ring-2 focus-within:ring-gold/30">
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

export default function InsiderMapForm({ className = '' }) {
  const leavingRef = useRef(null)
  const [notConnected, setNotConnected] = useState(false)

  function handleSubmit(event) {
    const form = event.currentTarget
    const arriving = parseDate(form.elements.arriving.value)
    const leaving = parseDate(form.elements.leaving.value)

    if (leaving < arriving) {
      event.preventDefault()
      leavingRef.current.setCustomValidity('Your leaving date must be after your arrival date.')
      form.reportValidity()
      return
    }

    if (!INSIDER_MAP_FORM_ACTION) {
      event.preventDefault()
      setNotConnected(true)
    }
  }

  return (
    <form
      action={INSIDER_MAP_FORM_ACTION || undefined}
      method="post"
      onSubmit={handleSubmit}
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
      <div className="flex gap-3">
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
      <button
        type="submit"
        className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-gold text-[14px] font-medium text-ink transition-opacity hover:opacity-90"
      >
        Send me the Insider Map
        <img src={arrowIcon} width="20" height="20" alt="" />
      </button>
      <p className="flex items-center gap-2 font-inter text-[13px] text-muted">
        <img src={lockIcon} width="18" height="18" alt="" />
        Free. No payment details needed.
      </p>
      {notConnected && (
        <p role="status" className="font-inter text-[13px] text-alert">
          Sign-ups aren't connected yet. Please message us on WhatsApp for your map.
        </p>
      )}
    </form>
  )
}
