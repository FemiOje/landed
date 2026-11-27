import { COMPANY, LINKS } from '../config'
import externalLinkProps from '../utils/externalLinkProps'
import LegalPage, { Lead, LegalLink, LegalList, LegalSection } from './LegalPage'

// The /terms page: the client's "Terms of booking" text, word for word. Don't reword it here; changes go through
// the client.
//
// TODO (before go-live): a solicitor needs to check these terms. The client's document says they're drafts written
// from the promises on the site, are not legal advice, and should be checked by a solicitor before they go live,
// especially the cancellation rules in section 5.
//
// The supplied text's bracketed items are filled in: "[Landed email address]" is COMPANY.email (the current contact
// address until the Landed one is set up), "[7]" days is 7, and the "[solicitor to check]" note on section 5 is left
// off the page (see the TODO above and the one on section 5).
export default function Terms() {
  return (
    <LegalPage eyebrow="TERMS" title="Terms of booking">
      <p>
        These terms apply to every Landed booking. When you pay a deposit, you agree to them. Last updated 27 November
        2026.
      </p>

      <LegalSection id="who-we-are" title="1. Who we are">
        <p>
          Landed is a trading name of Okpe Cipher Ltd, a company registered in England and Wales, company number
          17168061. Our registered office is 8 Shaw Road, Bromley, BR1 5NN. You can reach us on WhatsApp at{' '}
          <LegalLink href={LINKS.whatsapp} {...externalLinkProps(LINKS.whatsapp)}>
            +44 7948 750605
          </LegalLink>{' '}
          or by email at <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="what-youre-booking" title="2. What you're booking">
        <p>
          You book the package we agree on your free call. We confirm it in writing on WhatsApp before you pay.
          Depending on your package, we provide:
        </p>
        <LegalList>
          <li>a Lagos host who plans your nights out and comes with you</li>
          <li>planning of your December events</li>
          <li>photo shoots</li>
          <li>house help, laundry and home-cooked meals</li>
          <li>outfits made to your measurements</li>
          <li>licensed security on agreed nights</li>
        </LegalList>
        <p>
          We don't sell or book flights, accommodation, cars, drivers or airport pickups. You arrange your own travel.
        </p>
      </LegalSection>

      <LegalSection id="prices-and-payment" title="3. Prices and payment">
        <LegalList>
          <li>
            <Lead>Prices are fixed in pounds.</Lead> We agree them on your call. Nobody in Lagos will ask you for money
            or tips for anything in your package.
          </li>
          <li>
            <Lead>You pay half to book.</Lead> You pay by card through Stripe, to Okpe Cipher Ltd, never to a personal
            account. The charge shows as <Lead>OKPE CIPHER</Lead> on your statement.
          </li>
          <li>
            <Lead>You pay the rest before you land.</Lead> If your booking includes an outfit, you pay the rest after
            you've seen it finished on video. For everything else, you pay the rest at least 7 days before your first
            booked date.
          </li>
          <li>
            <Lead>Not included unless we agree it in writing:</Lead> drinks, transport, event tickets and
            accommodation.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="your-outfit" title="4. Your outfit">
        <LegalList>
          <li>We measure you on a video call and agree the style and fabric with you.</li>
          <li>Before you pay the rest, we show you the finished outfit on video.</li>
          <li>We deliver it to your Lagos address at least 48 hours before your first event.</li>
          <li>If it doesn't fit, or isn't what we agreed, we remake it or refund what you paid for the outfit.</li>
          <li>
            <Lead>Order deadlines:</Lead> agbada and lace by 6 December, everything else by 10 December. Order at least
            14 days before you land.
          </li>
        </LegalList>
      </LegalSection>

      {/* TODO: solicitor to check. The client flagged this section's cancellation and refund rules for legal review
          before go-live. */}
      <LegalSection id="changes-and-cancellations" title="5. Changes and cancellations">
        <LegalList>
          <li>
            <Lead>Within 14 days of paying, before work has started:</Lead> you can cancel for a full refund.
          </li>
          <li>
            <Lead>Outfits:</Lead> once your fabric has been cut, we can't refund the outfit, because it's made to your
            measurements. The remake-or-refund promise in <LegalLink href="#your-outfit">section 4</LegalLink> still
            applies.
          </li>
          <li>
            <Lead>Booked dates:</Lead> if you cancel at least 14 days before your first booked date, we refund your
            deposit, minus anything we've already paid to suppliers for you. We'll show you the receipts. If you cancel
            later, we'll try to move your dates first.
          </li>
          <li>
            <Lead>Changing dates:</Lead> this is free as long as we can still staff the new dates.
          </li>
          <li>
            <Lead>If we cancel or miss a booked day:</Lead> we refund that day in full.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="security" title="6. Security">
        <LegalList>
          <li>
            Every guard comes from a security company licensed by the Nigeria Security and Civil Defence Corps (NSCDC).
            We check the company's licence, not just the guard.
          </li>
          <li>Guards are unarmed and stay with you on your booked nights out. They don't drive you.</li>
          <li>Please follow their instructions when they're there to keep you safe.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="what-we-ask-of-you" title="7. What we ask of you">
        <LegalList>
          <li>Give us accurate measurements, dates and addresses.</li>
          <li>Be ready at the times we agree.</li>
          <li>Treat our team with respect. A host or guard can end a night early if anyone's safety is at risk.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="your-photos" title="8. Your photos">
        <p>
          You get your edited photos on WhatsApp. We only use them on our website or social media if you agree in
          writing first.
        </p>
      </LegalSection>

      <LegalSection id="our-responsibility" title="9. Our responsibility to you">
        <LegalList>
          <li>We provide our services with reasonable care and skill.</li>
          <li>
            We're not responsible for things outside our control, such as flight delays, venues, events run by others,
            or losses we couldn't have foreseen.
          </li>
          <li>If something goes wrong because of us, our liability is limited to what you paid for that booking.</li>
          <li>
            Nothing in these terms limits our liability for death or personal injury caused by our negligence, or for
            fraud. Nothing in them affects your legal rights as a consumer.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="complaints" title="10. Complaints">
        <p>Message us on WhatsApp or email. We'll reply within 2 working days and aim to resolve it within 14 days.</p>
      </LegalSection>

      <LegalSection id="law" title="11. Law">
        <p>
          These terms are governed by the law of England and Wales, and the courts of England and Wales can hear any
          dispute. Our services are delivered in Lagos, Nigeria, by our team and local partners.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
