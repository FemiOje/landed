import { useState } from 'react'
import playIcon from '../assets/icons/play.svg'
import outfit1 from '../assets/images/outfit-1.png'
import outfit2 from '../assets/images/outfit-2.png'
import outfit3 from '../assets/images/outfit-3.png'
import rockyVideo from '../assets/images/rocky-video.png'
import { ROCKY_HELLO_VIDEO } from '../config'

const PREVIEW_COUNT = 3

const ROCKY = {
  name: 'Rocky',
  role: 'Head of Operations and Head Tailor, Lagos',
  intro:
    'Rocky runs everything on the ground: your host, your security, your outfit and your delivery. Watch his hello, and see outfits his team made recently, shared with the clients’ permission.',
}

// Rocky's hello, then outfits his team made. Rocky's details stay beside whichever slide is showing.
const SLIDES = [
  { id: 'rocky', label: 'Rocky', image: rockyVideo, video: ROCKY_HELLO_VIDEO, hello: true },
  ...[outfit1, outfit2, outfit3].map((image, i) => ({ id: `outfit-${i + 1}`, label: `outfit ${i + 1}`, image })),
]

const VIDEO_FRAME =
  'group/video relative grid h-[270px] w-[220px] shrink-0 place-items-center overflow-hidden rounded-[14px] motion-safe:animate-slide-in'

function HelloLabel() {
  return (
    <span className="pointer-events-none absolute top-[237px] left-2.5 rounded-[6px] bg-black/50 px-2 py-[5px] font-mono text-[10px] font-medium tracking-[0.04em] text-white uppercase">
      {ROCKY.name}’s 20-second hello
    </span>
  )
}

// Outfit slides are just the photo. Rocky's slide is his hello: the photo doubles as the video's poster and, once
// there's a video, the whole card is a play button that swaps itself for an inline player. The carousel re-keys
// this component per slide, so moving on stops playback.
function SlideFrame({ slide }) {
  const [playing, setPlaying] = useState(false)

  if (!slide.hello) {
    return (
      <div className={VIDEO_FRAME}>
        <img
          src={slide.image}
          alt={`An outfit made by ${ROCKY.name}’s team`}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    )
  }

  const tailor = { ...ROCKY, ...slide }
  if (tailor.video && playing) {
    return (
      <div className={`${VIDEO_FRAME} bg-ink`}>
        {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- no captions file has been supplied yet */}
        <video
          src={tailor.video}
          poster={tailor.image}
          aria-label={`${tailor.name}’s 20-second hello`}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    )
  }

  const poster = (
    <>
      <img
        src={tailor.image}
        alt={tailor.video ? '' : `${tailor.name}, ${tailor.role}`}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover/video:scale-[1.04]"
      />
      <img
        src={playIcon}
        width="46"
        height="46"
        alt=""
        className="relative transition-transform duration-500 ease-spring motion-safe:group-hover/video:scale-115"
      />
      <HelloLabel />
    </>
  )

  if (!tailor.video) return <div className={VIDEO_FRAME}>{poster}</div>

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${tailor.name}’s 20-second hello`}
      className={`${VIDEO_FRAME} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep`}
    >
      {poster}
    </button>
  )
}

function RockyDetails() {
  return (
    <div className="flex flex-col gap-3.5 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] xl:w-[380px] xl:shrink-0">
      <p className="text-[14px] font-medium text-gold-text">MEET {ROCKY.name.toUpperCase()}</p>
      <h3 className="text-[22px] font-medium tracking-[-0.01em]">{ROCKY.role}</h3>
      <p className="font-inter text-[15px] leading-6 text-body">{ROCKY.intro}</p>
    </div>
  )
}

export default function TailorCarousel() {
  const [active, setActive] = useState(0)
  const slide = SLIDES[active]
  const previews = Array.from(
    { length: Math.min(PREVIEW_COUNT, SLIDES.length - 1) },
    (_, i) => (active + i + 1) % SLIDES.length,
  )

  return (
    <article
      data-reveal="up"
      aria-roledescription="carousel"
      aria-label="Meet the Lagos team"
      className="flex flex-col gap-7 rounded-[20px] border border-ink/8 bg-white p-7 xl:flex-row xl:items-center"
    >
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
        {/* Only the frame changes between slides, so only it is announced. */}
        <div aria-live="polite" className="shrink-0">
          <SlideFrame key={slide.id} slide={slide} />
        </div>
        <RockyDetails />
      </div>
      <ul className="flex min-w-0 flex-1 gap-3">
        {previews.map((index, position) => {
          const next = SLIDES[index]
          return (
            <li key={next.id} className="h-[270px] min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${next.label}${position === 0 ? ' (next)' : ''}`}
                className="group size-full cursor-pointer overflow-hidden rounded-[14px] transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
              >
                <img
                  src={next.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 ease-out-expo motion-safe:animate-[reveal-fade_500ms_ease-out] motion-safe:group-hover:scale-[1.05]"
                />
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
