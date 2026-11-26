import { CARD_HOVER, Eyebrow, SectionTitle } from '../components/ui'

const DATES = [
  {
    date: 'Sun 6 Dec',
    title: 'Last orders: agbada and lace',
    body: 'The last day to order an agbada or anything in lace.',
  },
  {
    date: 'Thu 10 Dec',
    title: 'Last orders: everything else',
    body: 'So we can plan your shoot and nights out around 17–26 Dec, the busiest week of the season.',
  },
  {
    date: '18–31 Dec',
    title: 'Delivered in Lagos',
    body: "Your outfit arrives at your Lagos address, after you've seen it on video.",
    // The design sets this date slightly larger than the other two.
    dateClass: 'text-[31.8px] leading-[31.8px] tracking-[-1px]',
  },
]

function DateCard({ date, title, body, dateClass = 'text-[28px]' }) {
  return (
    <li
      data-reveal="up"
      className={`flex flex-col rounded-[21.2px] border-[1.1px] border-[#e5e5e5] bg-white p-[24.4px] lg:h-[240px] ${CARD_HOVER}`}
    >
      <span className="flex h-[29.7px] items-center self-start rounded-full bg-ink-black px-[12.7px] text-[14px] font-medium text-snow">
        UPCOMING
      </span>
      <p className={`mt-[14.6px] h-[31.8px] font-medium ${dateClass}`}>{date}</p>
      <h3 className="mt-[16.4px] h-[29px] text-[18px] font-medium">{title}</h3>
      <p className="mt-2.5 text-[14px] font-medium text-muted">{body}</p>
    </li>
  )
}

export default function KeyDates() {
  return (
    <section id="key-dates" aria-labelledby="key-dates-title" className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[46px] px-5 py-16 md:px-10 md:py-20 xl:pt-[66px] xl:pr-[87px] xl:pb-[90px] xl:pl-[81px]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <Eyebrow>KEY DATES</Eyebrow>
            <SectionTitle id="key-dates-title">Order early</SectionTitle>
          </div>
          <p data-reveal="up" className="max-w-[860px] text-[18px] text-body md:text-[22px]">
            Order at least 14 days before you land, because good tailoring takes time. Agbada and
            lace by 6 December, everything else by 10 December.
          </p>
        </div>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {DATES.map((item) => (
            <DateCard key={item.date} {...item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
