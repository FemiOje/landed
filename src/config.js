// WhatsApp chat with Landed, with the first message already typed out.
const WHATSAPP_CHAT =
  "https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20coming%20home%20this%20December%20and%20want%20to%20know%20more"

// Where links and buttons go. Any left as '#' aren't known yet; swap them for real URLs.
export const LINKS = {
  // The general "Book a call" link, used on the top banner, the menu and the footer. It starts the conversation
  // on WhatsApp, where the call gets arranged. Package buttons use their own links below instead.
  bookCall: WHATSAPP_CHAT,
  whatsapp: WHATSAPP_CHAT,
  priceList: '#prices',
  companiesHouse: 'https://find-and-update.company-information.service.gov.uk/company/17168061',
  terms: '/terms',
  privacy: '/privacy',
  // There's no separate cookies page; the privacy policy has a Cookies section.
  cookies: '/privacy#cookies',
  // Instagram, TikTok and Facebook are left off until those accounts exist.
  // Slack invite, used by the "Join our Slack" button in the footer's Contact column.
  slackJoin: 'https://join.slack.com/t/landedheadquarters/shared_invite/zt-4i9is5u6b-YPgLZNWLJ~EVxJSylzKV9A',
}

// The booking button under each package opens WhatsApp with a message naming that package.
// These are the exact links from the client's website changes document; don't rewrite them.
export const PACKAGE_LINKS = {
  welcome:
    'https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20interested%20in%20The%20Welcome.%20Can%20we%20book%20my%20free%20December%20call%3F',
  homecoming:
    'https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20interested%20in%20The%20Homecoming.%20Can%20we%20book%20my%20free%20December%20call%3F',
  family:
    'https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20interested%20in%20The%20Family%20for%20my%20group.%20Can%20we%20book%20my%20free%20December%20call%3F',
  outfit:
    'https://wa.me/447948750605?text=Hi%20Landed%2C%20I%20just%20want%20an%20outfit%20made%20for%20December.%20Can%20we%20book%20my%20free%20call%3F',
  weddingSquad:
    'https://wa.me/447948750605?text=Hi%20Landed%2C%20I%27m%20sorting%20matching%20outfits%20for%20a%20wedding%20group.%20Can%20we%20book%20a%20call%3F',
}

// Slack channels. These only open for people who've already joined via LINKS.slackJoin. Not used on the page yet.
export const SLACK_CHANNELS = {
  welcomeHome: 'https://landedheadquarters.slack.com/archives/C0CM9QWC25P',
  nightsAndEvents: 'https://landedheadquarters.slack.com/archives/C0CN29H13UG',
  requests: 'https://landedheadquarters.slack.com/archives/C0CLSJA11RD',
}

// Shown in the footer's contact list; the link above opens a chat with this number.
export const WHATSAPP_DISPLAY = '+44 7948 750605'

// The company Landed trades under, shown in the footer, the "A real company" promise card and the legal pages.
export const COMPANY = {
  name: 'Okpe Cipher Ltd',
  number: '17168061',
  address: '8 Shaw Road, Bromley, BR1 5NN',
  // TODO: swap for the official Landed address once it's set up. Every mention on the site reads from here: the
  // footer, the Terms and Privacy pages, and where Insider Map sign-ups are emailed.
  email: 'seaghan.okpe@gmail.com',
}

// TODO: Insider Map emails need SMTP_USER and SMTP_PASS (a Google App Password) set in Vercel before sign-ups
// are delivered; see api/insider-map.js and the README. Until then the form shows the WhatsApp fallback.
// Where the Insider Map form sends entries, as JSON. `api/insider-map.js` (a Vercel Function) emails each one to
// COMPANY.email; it needs SMTP_USER and SMTP_PASS set in the Vercel project. Leave empty to turn sign-ups off: the
// form then points people to WhatsApp instead of sending anything.
export const INSIDER_MAP_FORM_ACTION = '/api/insider-map'

// TODO: waiting on the video from the client. Rocky's 20-second hello in the Meet the Lagos team carousel. Put the file in `public/videos/` and set its path,
// e.g. '/videos/rocky-hello.mp4'. While it's empty the card shows his photo with no player behind it.
export const ROCKY_HELLO_VIDEO = ''
