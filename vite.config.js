import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { handleSignup } from './api/insider-map.js'

const root = import.meta.dirname

// Link previews (og:image, og:url) need absolute URLs. Set VITE_SITE_URL (e.g. https://landed.example) for the
// production build; on Vercel it falls back to the project's production domain. Without either, the URLs stay
// relative, which WhatsApp won't show.
function siteUrl(env) {
  const url =
    env.VITE_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  return url.replace(/\/+$/, '')
}

// og:url is written as %SITE_URL%/… in the HTML pages; this fills it in.
function siteUrlPlugin(url) {
  let warned = false
  return {
    name: 'landed:site-url',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // No dev server means this is a build. (`ctx.bundle` isn't available yet in a 'pre' hook.)
        if (!url && !ctx.server && !warned) {
          warned = true
          console.warn('\n[landed] VITE_SITE_URL is not set, so link previews will use relative image URLs.\n')
        }
        return html.replaceAll('%SITE_URL%', url)
      },
    },
  }
}

// og:image is a hashed build asset (/assets/og-image-….jpg); give it the site URL in the HTML so it's absolute.
// Everything else keeps Vite's normal root-relative URLs.
function renderBuiltUrl(url) {
  return (filename, { hostType }) =>
    url && hostType === 'html' && /^assets\/og-image-[^/]+$/.test(filename) ? `${url}/${filename}` : undefined
}

// Icons and the link-preview image (src/assets/site) must be real files: Vite would otherwise inline anything
// under 4 KB as a data: URL, which iOS home-screen icons and link-preview scrapers don't read.
const SITE_ASSETS = `${resolve(root, 'src/assets/site')}/`
const assetsInlineLimit = (file) => (file.startsWith(SITE_ASSETS) ? false : undefined)

// Runs the Insider Map Vercel Function inside `vite` and `vite preview`, so the form works locally.
// Put the SMTP_* variables (see api/insider-map.js) in .env.local to send real test emails.
function apiPlugin(env) {
  function middleware(req, res, next) {
    if (req.url?.split('?')[0] !== '/api/insider-map') return next()

    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', async () => {
      try {
        const request = new Request(`http://localhost${req.url}`, {
          method: req.method,
          headers: req.headers,
          body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
        })
        const response = await handleSignup(request, { env })
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      } catch (error) {
        next(error)
      }
    })
  }

  return {
    name: 'landed:api',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  }
}

const PAGES = ['terms', 'privacy']

// Vercel serves /terms from terms/index.html; Vite's dev and preview servers only do that for /terms/ and send
// /terms to the home page. This rewrites the bare paths so local behaviour matches production.
function pagesPlugin() {
  function middleware(req, _res, next) {
    const [path, query] = req.url.split(/(?=\?)/)
    const page = path.replace(/^\/|\/$/g, '')
    if (PAGES.includes(page) && !path.endsWith('/')) req.url = `/${page}/${query ?? ''}`
    next()
  }

  return {
    name: 'landed:pages',
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')

  return {
    plugins: [react(), tailwindcss(), siteUrlPlugin(siteUrl(env)), pagesPlugin(), apiPlugin(env)],
    // Each page is its own HTML entry, built to dist/<page>/index.html so it's served at /<page> on any static host.
    build: { assetsInlineLimit },
    experimental: { renderBuiltUrl: renderBuiltUrl(siteUrl(env)) },
    input: {
      main: resolve(root, 'index.html'),
      ...Object.fromEntries(PAGES.map((page) => [page, resolve(root, page, 'index.html')])),
    },
  }
})
