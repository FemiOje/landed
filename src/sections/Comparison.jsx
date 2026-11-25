import checkIcon from '../assets/icons/check-table.svg'
import crossIcon from '../assets/icons/cross-table.svg'
import { Eyebrow, SectionTitle } from '../components/ui'

const ROWS = [
  {
    label: 'Your prices',
    landed: 'Fixed in pounds before you fly',
    diy: 'Doubles when they hear your accent',
  },
  {
    label: 'Nights out',
    landed: 'A host who knows the places comes with you',
    diy: 'Guessing from Instagram',
  },
  {
    label: 'Security',
    landed: 'Licensed guards from a registered company',
    diy: 'Whoever someone knows',
  },
  {
    label: 'Your outfit',
    landed: 'Seen on video before you pay the rest',
    diy: 'Paid upfront and hoped for',
  },
  {
    label: 'Laundry and house help',
    landed: 'Picked up and brought back folded',
    diy: 'Your first morning, gone',
  },
  {
    label: 'Photos',
    landed: 'A real shoot, edited and sent',
    diy: 'Whoever’s holding your phone',
  },
  {
    label: 'Who you message',
    landed: 'One WhatsApp line, London and Lagos',
    diy: 'Ten different numbers',
  },
]

const HEAD_CELL = 'px-7 py-[22px] text-left text-[22px] font-medium tracking-[-0.01em]'
const BODY_CELL = 'px-7 py-[26px] align-top font-inter text-[16px] leading-6'

function Verdict({ icon, children }) {
  return (
    <span className="flex gap-3">
      <img src={icon} width="20" height="20" alt="" className="shrink-0 self-start" />
      <span>{children}</span>
    </span>
  )
}

export default function Comparison() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 md:py-20 xl:px-20 xl:py-24">
        <div className="flex flex-col gap-[19px]">
          <Eyebrow tone="soft">LANDED VS DOING IT YOURSELF</Eyebrow>
          <SectionTitle id="compare-title">Why not just sort December yourself?</SectionTitle>
        </div>
        <div className="overflow-x-auto rounded-[20px] border border-ink/8 bg-white shadow-[0_1px_2px_rgba(12,12,10,0.05)]">
          <table className="w-full min-w-[760px] table-fixed border-collapse">
            <colgroup>
              <col className="w-[180px] md:w-[300px]" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <td className={HEAD_CELL}>
                  <span className="sr-only">Compare</span>
                </td>
                <th scope="col" className={`${HEAD_CELL} bg-sand-light`}>
                  Landed
                </th>
                <th scope="col" className={`${HEAD_CELL} text-muted`}>
                  Doing it yourself
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-ink/8">
                  <th scope="row" className={`${BODY_CELL} text-left font-medium`}>
                    {row.label}
                  </th>
                  <td className={`${BODY_CELL} bg-sand-light font-semibold`}>
                    <Verdict icon={checkIcon}>{row.landed}</Verdict>
                  </td>
                  <td className={`${BODY_CELL} text-muted`}>
                    <Verdict icon={crossIcon}>{row.diy}</Verdict>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
