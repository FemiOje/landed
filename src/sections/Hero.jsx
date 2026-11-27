import heroImage from '../assets/images/hero.png'
import LiveDot from '../components/LiveDot'
import { BookCallButton, MaskedLines } from '../components/ui'

function LastOrdersChip() {
  return (
    <p
      data-reveal="up"
      className="inline-flex h-7 items-center gap-2 self-start rounded-full bg-white/24 px-3 text-[14px] font-medium text-snow">
      <LiveDot />
      LAST ORDERS, THURSDAY 10TH DEC
    </p>
  )
}

export default function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden bg-[#60a5fa] xl:h-[865px]">
      {/* Figma crop: 1482.5×988.3 image at (-3.5, -24) inside the 1440×865 frame. */}
      <img
        src={heroImage}
        alt=""
        fetchPriority="high"
        className="hero-photo absolute top-[-2.77%] left-[-0.24%] -z-10 h-[114.25%] w-[102.95%] max-w-none object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/54" />

      {/* The fixed SiteNav overlays the top: 62px = its 26px offset + 36px height, so the copy sits where it did. */}
      <div className="mx-auto max-w-[1440px] px-5 pt-[62px] pb-20 md:px-10 xl:px-20 xl:pb-0">

        <div className="mt-24 flex max-w-[782px] flex-col gap-[15px] md:mt-32 xl:mt-[152px] xl:-ml-[3px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <LastOrdersChip />
              <h1
                data-reveal="lines"
                className="text-[44px] leading-[0.976] font-medium tracking-[-0.045em] text-snow md:text-[64px] xl:text-[80px]">
                <MaskedLines lines={['Welcome home.', "December's already planned."]} />
              </h1>
            </div>
            <p data-reveal="up" className="text-[18px] text-snow md:text-[22px]">
              Your outfit, your photoshoot, nights out with a host who knows Lagos, security when you
              want it, and home-cooked meals. Everything arranged before you land.
            </p>
            <div data-reveal="up" className="self-start">
              <BookCallButton />
            </div>
          </div>
          <p data-reveal="fade" className="text-[14px] font-medium whitespace-pre-wrap text-snow">
            {'Prices fixed in pounds  ·  No IJGB prices  ·  Licensed security  ·  UK company'}
          </p>
        </div>
      </div>
    </header>
  )
}
