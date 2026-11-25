import dotIcon from '../assets/icons/dot-gold.svg'
import mapCard from '../assets/icons/insider-map-card.svg'
import backgroundPhoto from '../assets/images/insider-map-bg.png'
import InsiderMapForm from '../components/InsiderMapForm'
import { Eyebrow, SectionTitle } from '../components/ui'

const BADGES = ['Made for your dates', 'From people who live there', 'Free']

export default function InsiderMap() {
  return (
    <section
      id="insider-map"
      aria-labelledby="insider-map-title"
      className="relative isolate overflow-hidden bg-ink"
    >
      <img
        src={backgroundPhoto}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,11,0.95)_0%,rgba(12,12,11,0.86)_55%,rgba(12,12,11,0.55)_100%)]"
      />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-16 md:px-10 md:py-20 lg:flex-row lg:items-center xl:min-h-[831px] xl:gap-20 xl:px-[100px] xl:pt-[59px] xl:pb-[112px]">
        <div className="flex min-w-0 flex-col gap-6 lg:max-w-[560px] lg:flex-1">
          <div className="flex flex-col gap-[19px]">
            <Eyebrow tone="gold">FREE INSIDER MAP</Eyebrow>
            <SectionTitle id="insider-map-title" className="text-white">
              Our Lagos guide, for the dates you’re there.
            </SectionTitle>
          </div>
          <p className="font-inter text-[18px] leading-7 text-white/78">
            From our team on the ground. Free, in return for your name, email and travel dates.
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {BADGES.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3.5 py-[9px] font-inter text-[13px] font-medium text-white/90"
              >
                <img src={dotIcon} width="8" height="8" alt="" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        {/* The map card overhangs this block by ~108px on the right, as in Figma; the margin keeps it on screen below xl. */}
        <div className="relative w-full max-w-[440px] shrink-0 lg:mr-[clamp(0px,calc(100vw-1100px),88px)] lg:h-[600px] lg:w-[520px] lg:max-w-none xl:mr-[clamp(0px,calc(1440px-100vw),28px)]">
          <img
            src={mapCard}
            width="339"
            height="410"
            alt=""
            className="absolute top-[-10px] left-[290.3px] hidden lg:block"
          />
          <InsiderMapForm className="relative lg:absolute lg:top-[61px] lg:left-0 lg:w-[440px]" />
        </div>
      </div>
    </section>
  )
}
