import ChatPhone from '../components/ChatPhone'
import { Eyebrow, SectionTitle } from '../components/ui'

const STEPS = [
  {
    label: 'BEFORE YOU FLY',
    body: 'A free 15-minute video call. We plan your whole December with you: events, nights out, your shoot and your outfit. Pay half to book.',
  },
  {
    label: 'A WEEK BEFORE',
    body: 'You see your finished outfit on video and pay the rest. Your host, security, shoot and nights out are all booked.',
  },
  {
    label: 'THE DAY YOU LAND',
    body: 'Your host’s first message is waiting: welcome home. Your outfit is at your door, ready for your first event.',
  },
  {
    label: 'YOUR DECEMBER',
    body: 'Nights out with a host who knows the places, licensed security when you want it, and your photo shoot. On The Family: home-cooked dinners, house help and a day with your people.',
  },
  {
    label: 'CROSSOVER NIGHT',
    body: 'You see the new year in at home, dressed for it.',
  },
]

function TimelineStep({ label, body, isLast }) {
  return (
    <li
      data-reveal="left"
      className={`group relative flex flex-col gap-2.5 pl-9 ${isLast ? 'pb-[39px]' : 'border-l border-ink/12 pb-[67px]'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-px left-[-6.5px] size-[13px] rounded-full border-[1.5px] border-gold-deep transition-[scale,background-color] duration-300 ease-spring group-hover:scale-125 ${isLast ? 'bg-gold-deep' : 'bg-white group-hover:bg-gold'}`}
      />
      <h3 className="text-[16px] font-medium text-gold-text">{label}</h3>
      <p className="text-[18px] leading-[28px]">{body}</p>
    </li>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-5 py-16 md:px-10 md:py-20 lg:flex-row lg:gap-10 xl:gap-16 xl:px-[90px] xl:pt-[53px] xl:pb-[47px]">
        <div className="flex w-full min-w-0 flex-col gap-10 lg:w-auto lg:shrink lg:basis-[680px]">
          <div className="flex flex-col gap-[19px]">
            <Eyebrow tone="soft">HOW IT WORKS</Eyebrow>
            <SectionTitle id="how-it-works-title">How your December comes together.</SectionTitle>
          </div>
          <ol>
            {STEPS.map((step, i) => (
              <TimelineStep key={step.label} isLast={i === STEPS.length - 1} {...step} />
            ))}
          </ol>
        </div>
        <div data-reveal="right" className="flex justify-center pb-[25px] lg:min-w-[317.6px] lg:shrink lg:basis-[509.8px]">
          <ChatPhone />
        </div>
      </div>
    </section>
  )
}
