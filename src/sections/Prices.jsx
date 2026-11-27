import checkIcon from '../assets/icons/check-gold.svg'
import checkLightIcon from '../assets/icons/check-gold-light.svg'
import WeddingSquad from '../components/WeddingSquad'
import { CARD_HOVER, Eyebrow, PillButton, SectionTitle } from '../components/ui'
import { PACKAGE_LINKS } from '../config'

const EVERY_OPTION = [
  'Your December planned with you on a free call',
  'Prices fixed in pounds, no IJGB prices',
  'Nobody in Lagos asks you for money',
  'Your own WhatsApp line, London and Lagos',
  'Outfits seen on video first, remake or refund',
]

const PLANS = [
  {
    pill: 'PER PERSON',
    name: 'The Welcome',
    tagline: 'Land, get dressed, go out.',
    price: '£445',
    unit: 'a person',
    includes: [
      'A night out with your Lagos host, who comes with you',
      '1-hour photo shoot in Lagos, 10 edited photos',
      'A welcome box of the snacks you grew up on, waiting when you arrive',
      'Senator, kaftan or ankara made to your measurements (agbada or lace +£80)',
    ],
    notIncluded: 'Not included: drinks, transport, event tickets',
    bookingHref: PACKAGE_LINKS.welcome,
  },
  {
    dark: true,
    pill: 'PER PERSON · THE WHOLE DECEMBER',
    name: 'The Homecoming',
    tagline: 'Every big night, planned and protected.',
    price: '£950',
    unit: 'a person',
    includes: [
      '2 nights out with your Lagos host',
      'A licensed security guard with you on both nights',
      'Your December planned with you: which events, when, what to wear',
      '2-hour photo shoot, 20 edited photos',
      'Your laundry picked up twice, and a welcome box waiting when you arrive',
      'Agbada or lace made to your measurements',
    ],
    notIncluded: 'Not included: drinks, transport, event tickets',
    bookingHref: PACKAGE_LINKS.homecoming,
  },
  {
    pill: 'UP TO 4 PEOPLE · 3 DAYS',
    name: 'The Family',
    tagline: 'Three days hosted, built around your people.',
    price: '£2,450',
    priceNote: 'for up to 4, about £612 each',
    includes: [
      'Your own host and guide for 3 days',
      'House help every day, laundry included',
      "2 home-cooked dinners where you're staying: the dishes you grew up on",
      'A family-visit day, with a gift hamper so you never arrive empty-handed',
      '2 licensed security guards on 2 nights out',
      '2-hour family photo shoot',
    ],
    notIncluded: 'Not included: outfits (add any from £195), transport, accommodation',
    bookingHref: PACKAGE_LINKS.family,
  },
]

const ADD_ONS = [
  'An extra night out with your host',
  'An extra security guard',
  'Barber or hairdresser at home, at a fair fixed price',
  'A gift hamper for your family',
  'A home-cooked dinner for up to 6',
  'Extra laundry',
  'A take-home pack of food and spices for your flight back',
  'An extra outfit',
]

function CheckItem({ icon = checkIcon, align = 'self-start', className = '', children }) {
  return (
    <li className={`flex gap-2.5 font-inter text-[15px] ${className}`}>
      <img src={icon} width="18" height="18" alt="" className={`shrink-0 ${align}`} />
      <span>{children}</span>
    </li>
  )
}

function PlanCard({ dark, pill, name, tagline, price, unit, priceNote, includes, notIncluded, bookingHref }) {
  const subtle = dark ? 'text-stone-light' : 'text-muted'

  return (
    <article
      data-reveal="up"
      className={`flex flex-col gap-5 rounded-[24px] px-7 py-[30px] ${CARD_HOVER} ${
        dark
          ? 'bg-ink text-white shadow-[0_12px_32px_rgba(12,12,10,0.18)]'
          : 'border border-ink/8 bg-white shadow-[0_1px_2px_rgba(12,12,10,0.05)]'
      }`}
    >
      <div className="flex flex-col gap-3">
        <span
          className={`self-start rounded-full px-3 py-[7px] text-[11px] leading-[14px] font-medium tracking-[0.04em] ${
            dark ? 'bg-gold text-ink' : 'bg-sand-light text-body'
          }`}
        >
          {pill}
        </span>
        <h3 className="text-[32px] leading-[42px] font-medium tracking-[-0.02em]">{name}</h3>
        <p className={`font-inter text-[16px] leading-6 ${subtle}`}>{tagline}</p>
      </div>
      <p className="flex items-baseline gap-2">
        <span className="text-[48px] leading-[62px] font-medium tracking-[-0.03em]">{price}</span>
        {unit && <span className={`font-inter text-[15px] leading-[18px] ${subtle}`}>{unit}</span>}
      </p>
      {priceNote && <p className={`font-inter text-[15px] leading-[18px] ${subtle}`}>{priceNote}</p>}
      <ul className="flex flex-1 flex-col gap-3">
        {includes.map((item) => (
          <CheckItem
            key={item}
            icon={dark ? checkLightIcon : checkIcon}
            className={`leading-[22px] ${dark ? 'text-stone-lighter' : 'text-body'}`}
          >
            {item}
          </CheckItem>
        ))}
      </ul>
      <p className={`font-inter text-[13px] leading-[19px] ${subtle}`}>{notIncluded}</p>
      <PillButton href={bookingHref} variant={dark ? 'gold' : 'outline'} className="w-full">
        Book your free December call
      </PillButton>
    </article>
  )
}

function OutfitCard() {
  return (
    <div
      data-reveal="left"
      className="flex flex-col gap-4 rounded-[24px] bg-sand px-7 py-[30px] min-[1440px]:h-[394px]"
    >
      <h3 className="text-[28px] leading-[36px] font-medium tracking-[-0.02em]">Just here for the outfit?</h3>
      <p className="font-inter text-[16px] leading-[25px] text-body">
        Senator, kaftan or ankara from <strong className="font-semibold text-ink">£195</strong>.
        Agbada or lace <strong className="font-semibold text-ink">£275</strong>. Measured on video,
        seen before you pay the rest, at your door before your first event.
      </p>
      <div className="flex-1" />
      <PillButton href={PACKAGE_LINKS.outfit} className="self-start">
        Book your free call
      </PillButton>
    </div>
  )
}

export default function Prices() {
  return (
    <section id="prices" aria-labelledby="prices-title" className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 xl:px-20 xl:pt-[88px] xl:pb-24">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-[19px]">
            <Eyebrow tone="soft">PRICES</Eyebrow>
            <SectionTitle id="prices-title">Pick your December.</SectionTitle>
          </div>
          <p
            data-reveal="up"
            className="text-[22px] leading-[30px] font-medium text-gold-text italic md:text-[26px] md:leading-[34px]">
            Half to start. The rest before you land, once you've seen your outfit.
          </p>
        </div>

        <div data-reveal="up" className="flex flex-col gap-4 rounded-[20px] bg-sand px-7 py-6">
          <h3 className="font-inter text-[16px] leading-[19px] font-semibold">Every option comes with</h3>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {EVERY_OPTION.map((item) => (
              <CheckItem key={item} align="self-center" className="leading-[18px] text-body">
                {item}
              </CheckItem>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <OutfitCard />
          <WeddingSquad />
        </div>

        <div data-reveal="up" className="dashed-border flex flex-col gap-[18px] rounded-[24px] px-7 py-[30px]">
          <h3 className="text-[28px] leading-[36px] font-medium tracking-[-0.02em]">Add to any option</h3>
          <ul className="flex flex-wrap gap-2.5">
            {ADD_ONS.map((item) => (
              <li
                key={item}
                data-reveal="pop"
                className="rounded-full bg-sand px-4 py-2.5 font-inter text-[15px] leading-[18px] text-body transition-[background-color,color,translate] duration-300 ease-out-expo hover:bg-sand-light hover:text-ink motion-safe:hover:-translate-y-0.5"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="font-inter text-[15px] leading-[22px] text-muted">
            Fixed prices in pounds, agreed on your free call. Nobody in Lagos asks you for money.
          </p>
        </div>
      </div>
    </section>
  )
}
