// WhatsApp chat with Landed, with the first message already typed out.
const WHATSAPP_CHAT =
  "https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20coming%20home%20this%20December%20and%20want%20to%20know%20more"

// Where links and buttons go. Any left as '#' aren't known yet; swap them for real URLs.
export const LINKS = {
  // Every "Book a call" button starts the conversation on WhatsApp, where the call gets arranged.
  bookCall: WHATSAPP_CHAT,
  whatsapp: WHATSAPP_CHAT,
  priceList: '#prices',
  companiesHouse: 'https://find-and-update.company-information.service.gov.uk/company/17168061',
  terms: '#',
  privacy: '#',
  cookies: '#',
  instagram: '#',
  tiktok: '#',
  facebook: '#',
  // Slack invite, used by the "Join our Slack" button in the footer's Follow column.
  slackJoin: 'https://join.slack.com/t/landedheadquarters/shared_invite/zt-4i9is5u6b-YPgLZNWLJ~EVxJSylzKV9A',
}

// Slack channels. These only open for people who've already joined via LINKS.slackJoin. Not used on the page yet.
export const SLACK_CHANNELS = {
  welcomeHome: 'https://landedheadquarters.slack.com/archives/C0CM9QWC25P',
  nightsAndEvents: 'https://landedheadquarters.slack.com/archives/C0CN29H13UG',
  requests: 'https://landedheadquarters.slack.com/archives/C0CLSJA11RD',
}

// Shown in the footer's contact list; the link above opens a chat with this number.
export const WHATSAPP_DISPLAY = '+44 7948 750605'

// The company Landed trades under, shown in the footer and the "A real company" promise card.
export const COMPANY = {
  name: 'Okpe Cipher Ltd',
  number: '17168061',
  email: 'seaghan.okpe@gmail.com',
}

// Where the Insider Map form posts. Leave empty until a form endpoint exists.
export const INSIDER_MAP_FORM_ACTION = ''
