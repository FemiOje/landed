import ScrollToTop from '../components/ScrollToTop'
import { Eyebrow, Logo, NavCallButton, SectionTitle } from '../components/ui'
import useScrollReveal from '../hooks/useScrollReveal'
import useScrollToHash from '../hooks/useScrollToHash'
import Footer from '../sections/Footer'

// Building blocks for the legal text. The wording itself comes from the client's document, word for word; these
// only set the type. Each section gets an id so other pages and sections can link to it.
export function LegalSection({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-6 flex-col gap-4">
      <h2 id={`${id}-title`} className="font-sans text-[24px] leading-[32px] font-medium tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function LegalList({ children }) {
  return <ul className="flex list-disc flex-col gap-2.5 pl-5 marker:text-gold-deep">{children}</ul>
}

// Bold lead-in at the start of a paragraph or list item, as in the supplied text.
export function Lead({ children }) {
  return <strong className="font-semibold text-ink">{children}</strong>
}

// Inline link inside the legal text.
export function LegalLink({ href, children, ...props }) {
  return (
    <a
      href={href}
      className="font-medium text-ink underline underline-offset-2 transition-colors hover:text-gold-text"
      {...props}
    >
      {children}
    </a>
  )
}

// Shared shell for the Terms and Privacy pages: a plain top bar back to the home page, a cream reading column in
// the home page's type scale, and the site footer.
export default function LegalPage({ eyebrow, title, children }) {
  useScrollReveal()
  useScrollToHash()

  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <header className="bg-ink">
        {/* "Main" matches the home page's nav, which ScrollToTop hands focus to. */}
        <nav
          aria-label="Main"
          className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10 xl:px-20"
        >
          <a href="/" aria-label="Landed home">
            <Logo className="text-[26px]" />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-full px-3 py-[9px] text-[14px] font-medium text-snow transition-colors duration-300 hover:bg-white/10 active:bg-white/20"
            >
              Back to Landed
            </a>
            <NavCallButton className="hidden sm:inline-flex" />
          </div>
        </nav>
      </header>

      <main className="flex-1 bg-cream">
        <article className="mx-auto flex max-w-[760px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 xl:pt-24 xl:pb-[120px]">
          <div className="flex flex-col gap-[19px]">
            <Eyebrow tone="soft">{eyebrow}</Eyebrow>
            <SectionTitle as="h1">{title}</SectionTitle>
          </div>
          <div className="flex flex-col gap-10 font-inter text-[16px] leading-[26px] text-body">
            {children}
          </div>
        </article>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
