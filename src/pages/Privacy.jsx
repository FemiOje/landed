import { COMPANY, LINKS } from '../config'
import externalLinkProps from '../utils/externalLinkProps'
import LegalPage, { Lead, LegalLink, LegalList, LegalSection } from './LegalPage'

// The /privacy page: the client's privacy policy text, word for word.
// The footer's Cookies link targets id="cookies".

const COLUMNS = ['What', 'Why we need it', 'Legal basis']

const DATA_WE_COLLECT = [
  ['Name, phone number, WhatsApp, email', 'To talk to you and run your booking', 'Contract'],
  ['Travel dates and your Lagos address', 'To plan your nights and deliver your outfit', 'Contract'],
  ['Measurements and outfit choices', 'To make your outfit, and to remake it if needed', 'Contract'],
  ['Payment details', 'Stripe processes these, and we never see your full card number', 'Contract'],
  ['Insider Map form: name, email, travel dates', 'To send you the free guide for your dates', 'Consent'],
  [
    'Your shoot photos',
    'To send them to you, and to use them in our marketing only if you agree in writing',
    'Contract / consent',
  ],
  ['Booking and payment records', 'Tax and accounting', 'Legal obligation'],
]

// A table from sm up. On phones three columns don't fit, so each row stacks into a block and its cells are labelled
// with the column headings (from data-label), adding no words of our own.
function CollectTable() {
  return (
    <table className="w-full border-collapse text-left text-[15px] leading-[23px] max-sm:block">
      <thead className="max-sm:sr-only">
        <tr className="border-b border-ink/15">
          {COLUMNS.map((column) => (
            <th key={column} scope="col" className="py-3 pr-4 font-semibold text-ink last:pr-0">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-sm:flex max-sm:flex-col max-sm:gap-3">
        {DATA_WE_COLLECT.map(([what, why, basis]) => (
          <tr
            key={what}
            className="border-b border-ink/8 align-top max-sm:flex max-sm:flex-col max-sm:gap-1.5 max-sm:rounded-[14px] max-sm:border max-sm:bg-white max-sm:p-4"
          >
            <th scope="row" className="py-3 pr-4 font-medium text-ink max-sm:p-0 sm:w-[34%]">
              {what}
            </th>
            {[why, basis].map((value, i) => (
              <td
                key={COLUMNS[i + 1]}
                data-label={COLUMNS[i + 1]}
                className="py-3 pr-4 last:pr-0 max-sm:p-0 max-sm:before:block max-sm:before:text-[13px] max-sm:before:font-medium max-sm:before:text-muted max-sm:before:content-[attr(data-label)]"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Privacy() {
  return (
    <LegalPage eyebrow="PRIVACY" title="Privacy policy">
      <p>
        Okpe Cipher Ltd, trading as Landed, controls your personal data. We only collect what we need to plan and
        deliver your December. Last updated 27 November 2026.
      </p>

      <LegalSection id="who-we-are" title="Who we are">
        <p>
          Okpe Cipher Ltd, 8 Shaw Road, Bromley, BR1 5NN, company number 17168061. For anything about your data,
          contact us at <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink> or on WhatsApp at{' '}
          <LegalLink href={LINKS.whatsapp} {...externalLinkProps(LINKS.whatsapp)}>
            +44 7948 750605
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" title="What we collect, and why">
        <CollectTable />
        <p>We only send you marketing if you've agreed to it, and you can stop it at any time.</p>
      </LegalSection>

      <LegalSection id="who-we-share-it-with" title="Who we share it with">
        <LegalList>
          <li>
            <Lead>Our Lagos team and partners:</Lead> your host, tailor, photographer, house help and the security
            company. Each gets only what they need for your booking.
          </li>
          <li>
            <Lead>Services we use to run Landed:</Lead> Stripe (payments), WhatsApp (messages), Slack (our community),
            Google Workspace (email) and Vercel (our website).
          </li>
        </LegalList>
        <p>
          Some of these are outside the UK, in Nigeria and the US. We only send what's needed to deliver what you
          booked, and we use services with appropriate safeguards.
        </p>
      </LegalSection>

      <LegalSection id="how-long-we-keep-it" title="How long we keep it">
        <LegalList>
          <li>
            <Lead>Booking and payment records:</Lead> 6 years, as UK tax law requires.
          </li>
          <li>
            <Lead>Measurements:</Lead> 2 years so you can order again, unless you ask us to delete them sooner.
          </li>
          <li>
            <Lead>Insider Map details:</Lead> until you unsubscribe, or 12 months after your trip.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="your-rights" title="Your rights">
        <p>You can ask us to:</p>
        <LegalList>
          <li>show you the data we hold about you</li>
          <li>correct it</li>
          <li>delete it</li>
          <li>stop using it</li>
        </LegalList>
        <p>
          You can also withdraw your consent at any time. Message or email us and we'll reply within one month. If
          you're unhappy with how we handle your data, you can complain to the Information Commissioner's Office at{' '}
          <LegalLink href="https://ico.org.uk" {...externalLinkProps('https://ico.org.uk')}>
            ico.org.uk
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies">
        <p>Our site only uses cookies it needs to work.</p>
      </LegalSection>
    </LegalPage>
  )
}
