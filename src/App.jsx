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
  return (
    <>
      <Hero />
      <main>
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
    </>
  )
}

export default App
