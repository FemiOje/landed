import useScrollReveal from './hooks/useScrollReveal'
import Comparison from './sections/Comparison'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import InsiderMap from './sections/InsiderMap'
import KeyDates from './sections/KeyDates'
import OurPromise from './sections/OurPromise'
import Prices from './sections/Prices'
import Problem from './sections/Problem'
import Team from './sections/Team'
import WhyLanded from './sections/WhyLanded'

function App() {
  useScrollReveal()

  return (
    // Figma's page frame is a vertical auto layout with 18px between sections (white page background shows through),
    // except the footer, which sits flush against the final CTA.
    // overflow-x-clip stops sideways reveals and hover lifts from ever adding a horizontal scrollbar.
    <div className="flex flex-col overflow-x-clip">
      <Hero />
      <main className="mt-[18px] flex flex-col gap-[18px]">
        <Problem />
        <WhyLanded />
        <HowItWorks />
        <Prices />
        <OurPromise />
        <Comparison />
        <KeyDates />
        <Team />
        <InsiderMap />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default App
