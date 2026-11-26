# Landed

Landing page for **Landed**: your December in Lagos, taken care of. Before you land, we arrange your outfit, a photoshoot, nights out with a host who knows Lagos, security and home-cooked meals.

It's a single-page React site built from the Figma file "Landed" (page frame `21:2453`).

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
src/
├── App.jsx            # Page composition: the sections in order
├── config.js          # External links and the form endpoint
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
│   ├── ui.jsx         # Logo, Eyebrow, SectionTitle, PillButton, BookCallButton, Placeholder
│   ├── ChatPhone.jsx
│   ├── InsiderMapForm.jsx
│   ├── TailorCarousel.jsx
│   └── WeddingSquad.jsx
└── assets/
    ├── icons/         # SVG icons exported from Figma
    └── images/        # Photography and backgrounds
```

## Design tokens

Colours and font families are defined as Tailwind theme variables in the `@theme` block in `src/index.css`. This makes utilities like `bg-cream`, `text-gold-deep` and `font-mono` available. When you add a colour from the design, put it there rather than hardcoding hex values in components.

## Configuration

Some destinations aren't in the design yet, so they're placeholders in `src/config.js`:

- **`LINKS`**: "Book a call", the price list, Companies House, legal pages (terms, privacy, cookies) and social profiles (Instagram, TikTok, Facebook). Replace each `'#'` with the real URL.
- **`INSIDER_MAP_FORM_ACTION`**: the URL the Insider Map form POSTs to. While it's empty, submitting shows a "not connected" notice instead of sending anything. The form sends `name`, `email`, `arriving` and `leaving`, with dates as `DD/MM/YYYY`, and the browser checks that the leaving date isn't before the arrival date before it submits.

Copy that hasn't been finalised is wrapped in the `<Placeholder>` component, which renders it in the alert colour so it stands out. Search for `Placeholder` to find what's still outstanding.

## Deployment

`npm run build` outputs a static site to `dist/`. You can deploy it to any static host, such as Netlify, Vercel, Cloudflare Pages or GitHub Pages. If you serve it from a sub-path (for example GitHub Pages at `/landed/`), set `base` in `vite.config.js` to match.
