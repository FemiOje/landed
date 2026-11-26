import cameraIcon from '../assets/icons/why-camera.svg'
import homeIcon from '../assets/icons/why-home.svg'
import nightIcon from '../assets/icons/why-night.svg'
import outfitIcon from '../assets/icons/why-outfit.svg'
import poundIcon from '../assets/icons/why-pound.svg'
import ticketIcon from '../assets/icons/why-ticket.svg'
import { CARD_HOVER, Eyebrow, SectionTitle } from '../components/ui'

const FEATURES = [
  {
    icon: poundIcon,
    title: 'One price, fixed in pounds',
    body: 'Paid before you fly. In Lagos, nobody asks you for money or tips. One WhatsApp line to our team in London and Lagos.',
  },
  {
    icon: outfitIcon,
    title: 'Your outfit, done right',
    body: "Measured on video, shown to you on video before you pay the balance, and at your door 48 hours before your first event. If it doesn't fit, we remake it or refund it.",
  },
  {
    icon: nightIcon,
    title: 'Your nights out',
    body: 'A Lagos host who knows the places, plans the night and comes with you. Licensed, unarmed security on Private.',
  },
  {
    icon: ticketIcon,
    title: 'Your events, planned',
    body: 'We plan your December with you: which weddings, concerts and parties, when, and what to wear to each.',
  },
  {
    icon: cameraIcon,
    title: 'Your photos',
    body: 'A shoot with Lagos as your backdrop. Edited photos sent to your WhatsApp, ready to post.',
  },
  {
    icon: homeIcon,
    title: 'Home, with your family',
    body: "On Private: a day planned around your family, dinners from a private chef, and house help every day where you're staying.",
  },
]

function FeatureCard({ icon, index, title, body }) {
  return (
    <article
      data-reveal="up"
      className={`group flex flex-col gap-3.5 overflow-hidden rounded-[20px] border border-ink/8 bg-white p-[26px] hover:border-ink/14 min-[1440px]:h-[235px] ${CARD_HOVER}`}
    >
      <div className="flex items-center justify-between">
        <img
          src={icon}
          width="40"
          height="40"
          alt=""
          className="transition-transform duration-500 ease-spring motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
        />
        <span className="text-[14px] font-medium text-muted">{String(index).padStart(2, '0')}</span>
      </div>
      <h3 className="text-[22px] font-medium">{title}</h3>
      <p className="text-[16px] text-body">{body}</p>
    </article>
  )
}

export default function WhyLanded() {
  return (
    <section id="why-landed" aria-labelledby="why-landed-title" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 md:py-20 xl:pt-20 xl:pr-[120px] xl:pb-[70px] xl:pl-[90px]">
        <div className="flex flex-col gap-4 xl:h-[115px]">
          <Eyebrow>WHY LANDED</Eyebrow>
          <SectionTitle id="why-landed-title" tracking="tracking-[-0.02em]" className="optical-auto">
            Lagos in December, with no surprises
          </SectionTitle>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} index={i + 1} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
