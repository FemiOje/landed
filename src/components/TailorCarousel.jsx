import { useRef, useState } from 'react'
import playIcon from '../assets/icons/play.svg'
import outfit1 from '../assets/images/outfit-1.png'
import outfit2 from '../assets/images/outfit-2.png'
import outfit3 from '../assets/images/outfit-3.png'
import rockyVideo from '../assets/images/rocky-video.png'
import { ROCKY_HELLO_VIDEO } from '../config'

const ROCKY = {
  name: 'Rocky',
  role: 'Head of Operations and Head Tailor, Lagos',
  intro:
    'Rocky runs everything on the ground: your host, your security, your outfit and your delivery. Watch his hello, and see outfits his team made recently, shared with the clients’ permission.',
  image: rockyVideo,
  video: ROCKY_HELLO_VIDEO,
}

// Outfits Rocky's team made. Tapping a thumbnail opens the viewer, which always shows the whole photo.
const OUTFITS = [outfit1, outfit2, outfit3].map((src, i, all) => ({
  src,
  alt: `An outfit made by ${ROCKY.name}’s team (${i + 1} of ${all.length})`,
}))

const VIDEO_FRAME =
  'group/video relative grid h-[270px] w-[220px] shrink-0 place-items-center overflow-hidden rounded-[14px]'

const ROUND_BUTTON =
  'grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white/12 text-white transition-[background-color,scale] duration-300 ease-out-expo hover:bg-white/22 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

function Icon({ path, className = 'size-5' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ICONS = {
  close: 'M5 5l10 10M15 5L5 15',
  prev: 'M12.5 4.5L7 10l5.5 5.5',
  next: 'M7.5 4.5L13 10l-5.5 5.5',
  expand: 'M11.5 3.5h5v5M8.5 16.5h-5v-5M16.5 3.5L11 9M3.5 16.5L9 11',
}

// Rocky's hello. The photo doubles as the video's poster; once there's a video, the whole frame is a play button
// that swaps itself for an inline player.
function RockyHello() {
  const [playing, setPlaying] = useState(false)

  if (ROCKY.video && playing) {
    return (
      <div className={`${VIDEO_FRAME} bg-ink`}>
        {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- no captions file has been supplied yet */}
        <video
          src={ROCKY.video}
          poster={ROCKY.image}
          aria-label={`${ROCKY.name}’s 20-second hello`}
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
        src={ROCKY.image}
        alt={ROCKY.video ? '' : `${ROCKY.name}, ${ROCKY.role}`}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover/video:scale-[1.04]"
      />
      <img
        src={playIcon}
        width="46"
        height="46"
        alt=""
        className="relative transition-transform duration-500 ease-spring motion-safe:group-hover/video:scale-115"
      />
      <span className="pointer-events-none absolute top-[237px] left-2.5 rounded-[6px] bg-black/50 px-2 py-[5px] font-mono text-[10px] font-medium tracking-[0.04em] text-white uppercase">
        {ROCKY.name}’s 20-second hello
      </span>
    </>
  )

  if (!ROCKY.video) return <div className={VIDEO_FRAME}>{poster}</div>

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${ROCKY.name}’s 20-second hello`}
      className={`${VIDEO_FRAME} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep`}
    >
      {poster}
    </button>
  )
}

// Full-screen viewer for one outfit at a time. A native modal <dialog> (like the mobile menu), so the browser traps
// focus, closes it on Escape, makes the page behind it inert and returns focus to the thumbnail on close.
// Arrow keys and left/right swipes move between photos; tapping the dark area outside the photo closes it.
function OutfitViewer({ dialogRef, index, onIndexChange }) {
  const swipeStart = useRef(null)
  const outfit = OUTFITS[index]
  const go = (step) => onIndexChange((index + step + OUTFITS.length) % OUTFITS.length)
  const close = () => dialogRef.current.close()

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') go(-1)
    if (event.key === 'ArrowRight') go(1)
  }

  function handlePointerUp(event) {
    if (swipeStart.current === null) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Outfits made by ${ROCKY.name}’s team`}
      onKeyDown={handleKeyDown}
      onClick={(event) => event.target === event.currentTarget && close()}
      className="outfit-viewer fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-ink/96 p-0 text-white backdrop-blur-md backdrop:bg-transparent"
    >
      <div
        onClick={(event) => event.target === event.currentTarget && close()}
        className="flex size-full flex-col items-center justify-center gap-4 px-4 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))] md:gap-6 md:px-8"
      >
        <div className="flex w-full max-w-[960px] items-center justify-between">
          <p aria-live="polite" className="font-mono text-[13px] tracking-[0.04em] text-white/70">
            {index + 1} / {OUTFITS.length}
          </p>
          <button type="button" aria-label="Close" onClick={close} className={ROUND_BUTTON}>
            <Icon path={ICONS.close} />
          </button>
        </div>

        <div
          onClick={(event) => event.target === event.currentTarget && close()}
          className="flex min-h-0 w-full max-w-[960px] flex-1 items-center justify-center gap-3 md:gap-6"
        >
          <button type="button" aria-label="Previous outfit" onClick={() => go(-1)} className={`${ROUND_BUTTON} max-sm:hidden`}>
            <Icon path={ICONS.prev} />
          </button>
          <img
            key={outfit.src}
            src={outfit.src}
            alt={outfit.alt}
            draggable="false"
            onPointerDown={(event) => (swipeStart.current = event.clientX)}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
            className="max-h-full min-w-0 touch-pan-y rounded-[14px] object-contain select-none motion-safe:animate-fade-up"
          />
          <button type="button" aria-label="Next outfit" onClick={() => go(1)} className={`${ROUND_BUTTON} max-sm:hidden`}>
            <Icon path={ICONS.next} />
          </button>
        </div>

        {/* Phones: previous/next sit under the photo, within thumb reach; swiping works too. */}
        <div className="flex gap-4 sm:hidden">
          <button type="button" aria-label="Previous outfit" onClick={() => go(-1)} className={ROUND_BUTTON}>
            <Icon path={ICONS.prev} />
          </button>
          <button type="button" aria-label="Next outfit" onClick={() => go(1)} className={ROUND_BUTTON}>
            <Icon path={ICONS.next} />
          </button>
        </div>
      </div>
    </dialog>
  )
}

function OutfitGallery() {
  const dialogRef = useRef(null)
  const [index, setIndex] = useState(0)

  function open(i) {
    setIndex(i)
    dialogRef.current.showModal()
  }

  return (
    <>
      <ul className="grid min-w-0 flex-1 grid-cols-3 gap-3">
        {OUTFITS.map((outfit, i) => (
          <li key={outfit.src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`View outfit ${i + 1} of ${OUTFITS.length}`}
              aria-haspopup="dialog"
              className="group relative block h-[270px] w-full cursor-zoom-in overflow-hidden rounded-[14px] bg-sand transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep sm:aspect-[4/5] sm:h-auto"
            >
              {/* Phones: tall 270px strips that fill the frame (sides cropped, outfit shown head to toe and large).
                  From sm up: 4:5 frames with object-contain, so the whole photo shows. */}
              <img
                src={outfit.src}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out-expo motion-safe:group-hover:scale-[1.04] sm:object-contain"
              />
              {/* Always visible, so it reads as tappable on touch screens too. */}
              <span className="absolute right-2 bottom-2 grid size-7 place-items-center rounded-full bg-black/55 text-white transition-[scale,background-color] duration-300 ease-out-expo group-hover:scale-110 group-hover:bg-black/70">
                <Icon path={ICONS.expand} className="size-3.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <OutfitViewer dialogRef={dialogRef} index={index} onIndexChange={setIndex} />
    </>
  )
}

function RockyDetails() {
  return (
    <div className="flex flex-col gap-3.5 xl:w-[380px] xl:shrink-0">
      <p className="text-[14px] font-medium text-gold-text">MEET {ROCKY.name.toUpperCase()}</p>
      <h3 className="text-[22px] font-medium tracking-[-0.01em]">{ROCKY.role}</h3>
      <p className="font-inter text-[15px] leading-6 text-body">{ROCKY.intro}</p>
    </div>
  )
}

// Rocky's card in Our Promise: his hello and details, then the outfits his team made. Opening an outfit never
// replaces his hello; it opens in the viewer.
export default function TailorCarousel() {
  return (
    <article
      data-reveal="up"
      aria-label={`Meet ${ROCKY.name}`}
      className="flex flex-col gap-7 rounded-[20px] border border-ink/8 bg-white p-7 xl:flex-row xl:items-center"
    >
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
        <RockyHello />
        <RockyDetails />
      </div>
      <OutfitGallery />
    </article>
  )
}
