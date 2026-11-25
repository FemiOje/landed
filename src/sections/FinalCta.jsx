import dotIcon from '../assets/icons/dot-green.svg'
import lockIcon from '../assets/icons/lock-light.svg'
import backgroundPhoto from '../assets/images/final-cta-bg.png'
import { BookCallButton } from '../components/ui'
import { LINKS } from '../config'

const NEXT_STEPS = [
  {
    title: 'Book a free 15-minute call',
    body: 'On WhatsApp or video, from wherever you are in the UK.',
  },
  {
    title: 'We plan your December',
    body: 'Your outfit, nights out, shoot and dates, agreed together.',
  },
  {
    title: 'Pay half to start',
    body: 'The rest only once you’ve seen your finished outfit.',
  },
]

function NextSteps() {
  return (
    <aside
      aria-labelledby="next-steps-title"
      className="flex flex-col gap-[22px] rounded-[26px] border border-white/14 bg-white/7 px-8 py-[34px] backdrop-blur-[12px] lg:w-[440px] lg:shrink-0"
    >
      <h3
        id="next-steps-title"
        className="font-mono text-[12px] font-medium tracking-[0.06em] text-gold"
      >
        WHAT HAPPENS NEXT
      </h3>
      <ol className="flex flex-col gap-[22px]">
        {NEXT_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 [&+&]:border-t [&+&]:border-white/12 [&+&]:pt-[22px]"
          >
            <span
              className={`grid size-[34px] shrink-0 place-items-center rounded-full font-inter text-[15px] font-semibold ${
                i === 0 ? 'bg-gold text-ink' : 'bg-white/10 text-white'
              }`}
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[19px] font-medium text-white">{step.title}</p>
              <p className="font-inter text-[15px] leading-[22px] text-white/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-2 font-inter text-[14px] text-white/70">
        <img src={lockIcon} width="18" height="18" alt="" />
        Nothing to pay on the call.
      </p>
    </aside>
  )
}

export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-ink">
      <img
        src={backgroundPhoto}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,11,0.96)_0%,rgba(12,12,11,0.88)_60%,rgba(12,12,11,0.7)_100%)]"
      />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 md:py-24 lg:flex-row lg:items-center xl:gap-[72px] xl:px-[100px] xl:py-[120px]">
        <div className="flex min-w-0 flex-col gap-[26px] lg:max-w-[640px] lg:flex-1">
          <p className="text-[16px] font-medium tracking-[0.04em] text-gold">
            ALREADY BOOKED YOUR FLIGHT?
          </p>
          <h2
            id="final-cta-title"
            className="text-[44px] leading-[1.05] font-medium tracking-[-0.05em] text-white md:text-[64px] xl:text-[80px]"
          >
            When you land,
            <br />
            <em className="text-gold">you’re home.</em>
          </h2>
          <p className="font-inter text-[19px] leading-[30px] text-white/82">
            Book your free 15-minute December call. We plan it with you, then take care of it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <BookCallButton outlined />
            <a
              href={LINKS.priceList}
              className="inline-flex h-[58px] items-center rounded-full border-[1.5px] border-white/35 px-[26px] font-inter text-[16px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Get the December price list
            </a>
          </div>
          <p className="flex items-center gap-2.5 self-start rounded-full border border-white/14 bg-white/8 px-4 py-[9px] font-inter text-[14px] font-medium text-white/90">
            <img src={dotIcon} width="8" height="8" alt="" />
            Last bookings 10 Dec · agbada and lace by 6 Dec
          </p>
        </div>
        <NextSteps />
      </div>
    </section>
  )
}
