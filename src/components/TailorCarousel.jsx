import { useState } from 'react'
import playIcon from '../assets/icons/play.svg'
import outfit1 from '../assets/images/outfit-1.png'
import outfit2 from '../assets/images/outfit-2.png'
import outfit3 from '../assets/images/outfit-3.png'
import rockyVideo from '../assets/images/rocky-video.png'
import { Placeholder } from './ui'

const PREVIEW_COUNT = 3

// Only Rocky's details exist in the design; the rest are placeholders until the copy is ready.
const TAILORS = [
  {
    id: 'rocky',
    name: 'Rocky',
    role: 'Head of Operations and Head Tailor, Lagos',
    intro:
      'Rocky runs everything on the ground: your host, your security, your outfit and your delivery. Watch his hello, and see outfits his team made recently, shared with the clients’ permission.',
    image: rockyVideo,
  },
  { id: 'tailor-2', image: outfit1 },
  { id: 'tailor-3', image: outfit2 },
  { id: 'tailor-4', image: outfit3 },
]

function TailorVideo({ tailor }) {
  return (
    <div className="group/video relative grid h-[270px] w-[220px] shrink-0 place-items-center overflow-hidden rounded-[14px] motion-safe:animate-slide-in">
      <img
        src={tailor.image}
        alt={tailor.name ? `${tailor.name}, ${tailor.role}` : ''}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover/video:scale-[1.04]"
      />
      <img
        src={playIcon}
        width="46"
        height="46"
        alt=""
        className="relative transition-transform duration-500 ease-spring motion-safe:group-hover/video:scale-115"
      />
      <span className="absolute top-[237px] left-2.5 rounded-[6px] bg-black/50 px-2 py-[5px] font-mono text-[10px] font-medium tracking-[0.04em] text-white uppercase">
        {tailor.name ?? '[name]'}’s 20-second hello
      </span>
    </div>
  )
}

function TailorDetails({ tailor }) {
  return (
    <div className="flex flex-col gap-3.5 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] xl:w-[380px] xl:shrink-0">
      <p className="text-[14px] font-medium text-gold-text">
        MEET {tailor.name ? tailor.name.toUpperCase() : <Placeholder>[NAME]</Placeholder>}
      </p>
      <h3 className="text-[22px] font-medium tracking-[-0.01em]">
        {tailor.role ?? (
          <>
            <Placeholder>[role]</Placeholder>, Lagos
          </>
        )}
      </h3>
      <p className="font-inter text-[15px] leading-6 text-body">
        {tailor.intro ?? <Placeholder>[Short intro to come.]</Placeholder>}
      </p>
    </div>
  )
}

export default function TailorCarousel() {
  const [active, setActive] = useState(0)
  const tailor = TAILORS[active]
  const previews = Array.from(
    { length: Math.min(PREVIEW_COUNT, TAILORS.length - 1) },
    (_, i) => (active + i + 1) % TAILORS.length,
  )

  return (
    <article
      data-reveal="up"
      aria-roledescription="carousel"
      aria-label="Meet the Lagos team"
      className="flex flex-col gap-7 rounded-[20px] border border-ink/8 bg-white p-7 xl:flex-row xl:items-center"
    >
      <div aria-live="polite" className="flex flex-col gap-7 sm:flex-row sm:items-center">
        <TailorVideo key={`video-${tailor.id}`} tailor={tailor} />
        <TailorDetails key={`details-${tailor.id}`} tailor={tailor} />
      </div>
      <ul className="flex min-w-0 flex-1 gap-3">
        {previews.map((index, position) => {
          const next = TAILORS[index]
          return (
            <li key={next.id} className="h-[270px] min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${next.name ?? `tailor ${index + 1}`}${position === 0 ? ' (next)' : ''}`}
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
