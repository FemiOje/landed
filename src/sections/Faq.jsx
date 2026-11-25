import chevronIcon from '../assets/icons/faq-chevron.svg'
import chevronOpenIcon from '../assets/icons/faq-chevron-open.svg'
import { Eyebrow, SectionTitle } from '../components/ui'

const QUESTIONS = [
  {
    question: 'How can a tailor in Lagos measure me in London?',
    answer:
      'On a free video call, before you pay anything. Your tailor takes your measurements and agrees the style with you.',
  },
  {
    question: 'Is my money safe?',
    answer:
      'You pay half by card to a UK company through Stripe, never into a personal account, so your bank’s card protections apply. You pay the rest before you land, once you’ve seen your outfit.',
  },
  {
    question: 'What if my outfit doesn’t fit?',
    answer: 'We remake it or refund it.',
  },
  {
    question: 'Is the security real security?',
    answer:
      'Yes. Guards are unarmed and come from a security company licensed by the NSCDC, and we check the company’s licence. They’re with you on your nights out. They don’t drive you.',
  },
  {
    question: 'Do you book flights, stays or airport pickups?',
    answer:
      'No. We don’t book flights, stays, cars or airport pickups. Your travel stays yours. Everything else, we take care of.',
  },
  {
    question: 'When do I need to book by?',
    answer:
      'At least 14 days before you land, so your outfit and your nights are ready. Agbada and lace by 6 December, everything else by 10 December.',
  },
]

// The chevron SVGs are 43×43 with their rotation baked in; negative margins keep them in a 30px slot.
const CHEVRON = 'm-[-6.5px] shrink-0'

function FaqItem({ question, answer, defaultOpen }) {
  return (
    <details name="faq" open={defaultOpen} className="group border-b border-ink/8 first:border-t">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[18px] leading-[24.3px] font-medium tracking-[-0.2px]">{question}</span>
        <img src={chevronIcon} width="43" height="43" alt="" className={`${CHEVRON} group-open:hidden`} />
        <img
          src={chevronOpenIcon}
          width="43"
          height="43"
          alt=""
          className={`${CHEVRON} hidden group-open:block`}
        />
      </summary>
      <p className="max-w-[640px] pr-11 pb-[22px] font-inter text-[16px] leading-[25.6px] text-body">
        {answer}
      </p>
    </details>
  )
}

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 lg:flex-row lg:gap-12 xl:gap-[137px] xl:pt-[86px] xl:pr-[88px] xl:pb-[123px] xl:pl-[79px]">
        <div className="flex flex-col lg:w-[320px] lg:shrink-0 xl:w-[413px]">
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle
            id="faq-title"
            tracking="tracking-normal"
            // Figma's box is 495px; "before you book" renders 3px wider in browsers, so allow 500px to keep two lines.
            className="mt-[15px] max-w-[500px] xl:w-[500px]"
          >
            Questions before you book
          </SectionTitle>
          <p className="mt-[14.5px] font-inter text-[18px] leading-[28.8px] text-body">
            Anything else, message us on WhatsApp.
          </p>
        </div>
        <div className="min-w-0 lg:max-w-[723px] lg:flex-1">
          {QUESTIONS.map((item, i) => (
            <FaqItem key={item.question} defaultOpen={i === 0} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
