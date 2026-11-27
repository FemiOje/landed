import { useState } from 'react'
import minusIcon from '../assets/icons/stepper-minus.svg'
import plusIcon from '../assets/icons/stepper-plus.svg'
import { PACKAGE_LINKS } from '../config'
import { PillButton } from './ui'

const OUTFITS = [
  { id: 'senator', label: 'Senator or ankara', price: 185, initial: 6 },
  // TODO: price held until Sean confirms it (£295 was above the £275 single-outfit price). A null price shows
  // "Price to be confirmed" with no stepper, and keeps the row out of the totals.
  { id: 'agbada', label: 'Agbada or lace', price: null, initial: 0 },
]

const wholePounds = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})
const poundsAndPence = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

const gbp = {
  format: (amount) =>
    (Number.isInteger(amount) ? wholePounds : poundsAndPence).format(amount),
}

const STEPPER_BUTTON =
  'cursor-pointer rounded-full transition-[scale] duration-300 ease-spring motion-safe:enabled:hover:scale-110 motion-safe:enabled:active:scale-90 motion-safe:enabled:active:duration-75'

function Stepper({ label, price, count, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-cream px-3.5 py-2.5">
      <div className="flex flex-col gap-0.5 font-inter">
        <span className="text-[14px] leading-[17px] font-semibold">{label}</span>
        <span className="text-[12px] leading-[15px] text-muted">
          {price == null ? 'Price to be confirmed' : `${gbp.format(price)} each`}
        </span>
      </div>
      {price != null && (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label={`Remove one ${label} outfit`}
            disabled={count === 0}
            onClick={() => onChange(count - 1)}
            className={`${STEPPER_BUTTON} disabled:cursor-not-allowed`}
          >
            <img src={minusIcon} width="34" height="34" alt="" className="block" />
          </button>
          <output aria-live="polite" className="min-w-[11px] text-center font-inter text-[16px] font-semibold">
            {/* Re-keyed so the number bumps on every change; the live region itself stays mounted. */}
            <span key={count} className="inline-block motion-safe:animate-bump">
              {count}
            </span>
          </output>
          <button
            type="button"
            aria-label={`Add one ${label} outfit`}
            onClick={() => onChange(count + 1)}
            className={STEPPER_BUTTON}
          >
            <img src={plusIcon} width="34" height="34" alt="" className="block" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function WeddingSquad() {
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(OUTFITS.map((outfit) => [outfit.id, outfit.initial])),
  )

  const priced = OUTFITS.filter((outfit) => outfit.price != null)
  const outfitCount = priced.reduce((sum, outfit) => sum + counts[outfit.id], 0)
  const total = priced.reduce((sum, outfit) => sum + counts[outfit.id] * outfit.price, 0)

  // At design width Figma fixes this card at 394px; its content runs 15px into the bottom padding.
  return (
    <div data-reveal="right" className="flex flex-col gap-3.5 rounded-[24px] bg-sand px-7 py-[30px] min-[1440px]:h-[394px]">
      <h3 className="text-[28px] leading-[36px] font-medium tracking-[-0.02em]">Going to a wedding as a group?</h3>
      <p className="font-inter text-[16px] leading-[25px] text-body">
        Wedding Squad: matching outfits for 6 or more, one person organises, all delivered to one
        Lagos address.
      </p>
      {OUTFITS.map((outfit) => (
        <Stepper
          key={outfit.id}
          label={outfit.label}
          price={outfit.price}
          count={counts[outfit.id]}
          onChange={(next) => setCounts((prev) => ({ ...prev, [outfit.id]: Math.max(0, next) }))}
        />
      ))}
      <div className="flex justify-between font-inter text-[15px] leading-[18px] font-semibold">
        <span>
          {outfitCount} {outfitCount === 1 ? 'outfit' : 'outfits'} ·{' '}
          <span key={total} className="inline-block motion-safe:animate-bump">
            {gbp.format(total)}
          </span>{' '}
          total
        </span>
        <span>
          Half to start:{' '}
          <span key={total} className="inline-block motion-safe:animate-bump">
            {gbp.format(total / 2)}
          </span>
        </span>
      </div>
      <div className="flex-1" />
      <PillButton href={PACKAGE_LINKS.weddingSquad} className="self-start">
        Book your squad's call
      </PillButton>
    </div>
  )
}
