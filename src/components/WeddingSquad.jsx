import { useState } from 'react'
import minusIcon from '../assets/icons/stepper-minus.svg'
import plusIcon from '../assets/icons/stepper-plus.svg'
import { PillButton } from './ui'

const OUTFITS = [
  { id: 'senator', label: 'Senator or ankara', price: 185, initial: 6 },
  { id: 'agbada', label: 'Agbada or lace', price: 295, initial: 0 },
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

function Stepper({ label, price, count, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-cream px-3.5 py-2.5">
      <div className="flex flex-col gap-0.5 font-inter">
        <span className="text-[14px] font-semibold">{label}</span>
        <span className="text-[12px] text-muted">{gbp.format(price)} each</span>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label={`Remove one ${label} outfit`}
          disabled={count === 0}
          onClick={() => onChange(count - 1)}
          className="rounded-full transition-opacity disabled:opacity-40"
        >
          <img src={minusIcon} width="34" height="34" alt="" className="block" />
        </button>
        <output aria-live="polite" className="min-w-[11px] text-center font-inter text-[16px] font-semibold">
          {count}
        </output>
        <button
          type="button"
          aria-label={`Add one ${label} outfit`}
          onClick={() => onChange(count + 1)}
          className="rounded-full"
        >
          <img src={plusIcon} width="34" height="34" alt="" className="block" />
        </button>
      </div>
    </div>
  )
}

export default function WeddingSquad() {
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(OUTFITS.map((outfit) => [outfit.id, outfit.initial])),
  )

  const outfitCount = OUTFITS.reduce((sum, outfit) => sum + counts[outfit.id], 0)
  const total = OUTFITS.reduce((sum, outfit) => sum + counts[outfit.id] * outfit.price, 0)

  return (
    <div className="flex flex-col gap-3.5 rounded-[24px] bg-sand px-7 py-[30px]">
      <h3 className="text-[28px] font-medium tracking-[-0.02em]">Going to a wedding as a group?</h3>
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
      <div className="flex justify-between font-inter text-[15px] font-semibold">
        <span>
          {outfitCount} {outfitCount === 1 ? 'outfit' : 'outfits'} · {gbp.format(total)} total
        </span>
        <span>Half to start: {gbp.format(total / 2)}</span>
      </div>
      <div className="flex-1" />
      <PillButton className="self-start">Book your squad's call</PillButton>
    </div>
  )
}
