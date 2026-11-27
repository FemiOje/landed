import photo from '../assets/images/lagos-beach-party.jpg'

// A full-width photo between Why Landed and How it works. Shown whole at its native 3:2 so no one in the
// group gets cropped; side padding matches Why Landed so it lines up with the card grid above.
export default function LagosMoment() {
  return (
    <section aria-label="December in Lagos" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:pr-[120px] xl:pl-[90px]">
        <figure data-reveal="up" className="overflow-hidden rounded-[20px] bg-ink/5">
          <img
            src={photo}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
            alt="Friends in aso-oke, gele and Ankara celebrating together at a beach party in Lagos at sunset."
            className="block aspect-[3/2] h-auto w-full object-cover"
          />
        </figure>
      </div>
    </section>
  )
}
