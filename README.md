# Landed

Landing page for **Landed**: your December in Lagos, taken care of. Before you land, we arrange your outfit, a photoshoot, nights out with a host who knows Lagos, security and home-cooked meals.

It's a React site built from the Figma file "Landed" (page frame `21:2453`): the landing page plus Terms (`/terms`) and Privacy (`/privacy`) pages, and one serverless function for the Insider Map form.

## Stack

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
- Fonts: DM Sans, Inter and Geist Mono, loaded from Google Fonts in `index.html`

## Getting started

Requires Node.js 20.19+ or 22.12+ (Vite 8).

```bash
npm install
npm run dev       # start the dev server with HMR
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the local dev server            |
| `npm run build`   | Build for production into `dist/`     |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | Lint the project with Oxlint          |

## Project structure

```
index.html             # Home page entry (and its link-preview meta tags)
terms/index.html       # /terms entry
privacy/index.html     # /privacy entry
api/
└── insider-map.js     # Vercel Function: Insider Map sign-ups → email
public/
└── favicon.ico        # Fixed-address icon for apps that request /favicon.ico directly
src/
├── App.jsx            # Home page composition: the sections in order
├── terms.jsx          # /terms React entry
├── privacy.jsx        # /privacy React entry
├── config.js          # Links, company details, form endpoint, video
├── pages/             # LegalPage layout, Terms, Privacy
├── index.css          # Tailwind import, design tokens, base styles
├── sections/          # One component per page section
│   ├── Hero.jsx
│   ├── Problem.jsx
│   ├── WhyLanded.jsx
│   ├── HowItWorks.jsx
│   ├── Prices.jsx
│   ├── OurPromise.jsx
│   ├── Comparison.jsx
│   ├── KeyDates.jsx
│   ├── Team.jsx
│   ├── InsiderMap.jsx
│   ├── Faq.jsx
│   ├── FinalCta.jsx
│   └── Footer.jsx
├── components/        # Shared and interactive pieces
│   ├── ui.jsx         # Logo, Eyebrow, SectionTitle, PillButton, NavCallButton, BookCallButton
│   ├── ChatPhone.jsx
│   ├── InsiderMapForm.jsx
│   ├── TailorCarousel.jsx
│   └── WeddingSquad.jsx
└── assets/
    ├── icons/         # SVG icons exported from Figma
    ├── images/        # Photography and backgrounds
    └── site/          # Favicons, home-screen icon and the 1200×630 link-preview image (og-image.jpg)
```

## Design tokens

Colours and font families are defined as Tailwind theme variables in the `@theme` block in `src/index.css`. This makes utilities like `bg-cream`, `text-gold-deep` and `font-mono` available. When you add a colour from the design, put it there rather than hardcoding hex values in components.

## Configuration

Site details live in `src/config.js`:

- **`LINKS`**: the general "Book a call" WhatsApp link (top banner, menu, footer), the price list, Companies House, the legal pages (`/terms`, `/privacy`, and `/privacy#cookies` for cookies) and social profiles. Any left as `'#'` aren't known yet.
- **`PACKAGE_LINKS`**: the WhatsApp link behind the booking button under each package (The Welcome, The Homecoming, The Family, Just here for the outfit, Wedding Squad). Each opens WhatsApp with a message naming the package. These are the client's exact links; don't rewrite them.
- **`COMPANY`**: trading company name, number, registered office and contact email. The email is still a personal address until the Landed one is set up. Insider Map sign-ups are emailed to it too.
- **`INSIDER_MAP_FORM_ACTION`**: where the Insider Map form sends entries as JSON (`/api/insider-map`). Set it to `''` to switch sign-ups off; the form then points people to WhatsApp.
- **`ROCKY_HELLO_VIDEO`**: path to Rocky's hello video. Put the file in `public/videos/` and set e.g. `'/videos/rocky-hello.mp4'`. While it's empty, the card shows his photo with no player.

Anything still waiting on the client (the Landed email, the Insider Map mail settings, the solicitor's review of the Terms, the Wedding Squad agbada/lace price, Rocky's video) is marked with a `TODO` comment. Search for `TODO` to find what's outstanding.

### Environment variables

| Variable | Where | What it does |
| --- | --- | --- |
| `SMTP_USER` | Vercel project, or `.env.local` for local testing | The Google account that sends Insider Map emails, for example the Landed mailbox. |
| `SMTP_PASS` | Same | A 16-character [Google App Password](https://myaccount.google.com/apppasswords) for that account (2-Step Verification must be on). Not the account's normal password. Without `SMTP_USER` and `SMTP_PASS`, the function answers 503 and the form asks people to use WhatsApp. |
| `INSIDER_MAP_TO` | Same (optional) | Who receives sign-ups. Defaults to `COMPANY.email`. |
| `SMTP_HOST`, `SMTP_PORT` | Same (optional) | Only needed if the mail isn't sent through Google. Defaults: `smtp.gmail.com`, `465`. |
| `VITE_SITE_URL` | Build environment | The site's public origin, e.g. `https://example.com`. It's used for the absolute `og:image`/`og:url` that WhatsApp needs for link previews. On Vercel it falls back to the production domain automatically. |

### Icons and the link-preview image

These live in `src/assets/site/`, not `public/`, so the build names each file by a hash of its content (for example `/assets/favicon-8lF1vW5z.svg`). When you replace a file, its address changes, so apps that cached the old one (link previews in WhatsApp or Snapchat, home-screen icons) fetch the new one. There's no version number to bump. Only `public/favicon.ico` keeps a fixed address, because some apps request `/favicon.ico` directly.

### Insider Map form

The form checks the fields in the browser, then POSTs `name`, `email`, `arriving` and `leaving` (dates as `DD/MM/YYYY`) to `api/insider-map.js`. The function checks them again, drops bot entries (a hidden `website` honeypot field), and emails the sign-up to `COMPANY.email`. The email's Reply-To is the visitor, so replying to it sends the guide straight to them. `npm run dev` and `npm run preview` run the same function locally.

## Deployment

`npm run build` outputs a static site to `dist/`, with each page at `dist/<page>/index.html`. It's set up for **Vercel**, which serves the static pages and deploys `api/insider-map.js` as a function. Any other static host works for the pages, but the Insider Map form needs that function, or `INSIDER_MAP_FORM_ACTION` pointed at another endpoint. If you serve it from a sub-path (for example GitHub Pages at `/landed/`), set `base` in `vite.config.js` to match.
