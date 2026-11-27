import ScrollToTop from './components/ScrollToTop'
import useScrollReveal from './hooks/useScrollReveal'
import useScrollToHash from './hooks/useScrollToHash'
import Comparison from './sections/Comparison'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import InsiderMap from './sections/InsiderMap'
import KeyDates from './sections/KeyDates'
import LagosMoment from './sections/LagosMoment'
import OurPromise from './sections/OurPromise'
import Prices from './sections/Prices'
import Problem from './sections/Problem'
import SiteNav from './sections/SiteNav'
import Team from './sections/Team'
import WhyLanded from './sections/WhyLanded'

function App() {
  useScrollReveal()
  useScrollToHash()

  return (
    <div className="flex flex-col overflow-x-clip">
      <SiteNav />
      <Hero />
      <main className="flex flex-col">
        <Problem />
        <WhyLanded />
        <LagosMoment />
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
      <ScrollToTop />
    </div>
  )
}

export default App
