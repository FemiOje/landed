import rockyPhoto from '../assets/images/rocky-video.png'
import seanPhoto from '../assets/images/team-sean.jpeg'
import { Eyebrow, SectionTitle } from '../components/ui'

const TEAM = [
  {
    name: 'Sean Okpe',
    role: 'Co-founder',
    photo: seanPhoto,
    // Figma crop (image fill transform): the visible region of the source image, as fractions.
    crop: { x: 0.15, y: 0.04, width: 0.6408, height: 0.6 },
  },
  // Same photo as his card in the Meet the Lagos team carousel.
  { name: 'Rocky', role: 'Head of Operations and Head Tailor', photo: rockyPhoto },
  // Cards for the other co-founder and the host come back once their names are confirmed.
]

function cropStyle({ x, y, width, height }) {
  return {
    width: `${100 / width}%`,
    height: `${100 / height}%`,
    left: `${(-x / width) * 100}%`,
    top: `${(-y / height) * 100}%`,
  }
}

function TeamMember({ name, role, photo, crop }) {
  return (
    <li data-reveal="up">
      <figure className="group flex flex-col gap-3">
        <div className="relative aspect-[289.5/361.9] overflow-hidden rounded-[20px] border border-ink/15">
          {/* Zoom a full-size wrapper, not the image, so cropped photos scale around the visible centre. */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.05]">
            <img
              src={photo}
              alt={`${name}, ${role}`}
              loading="lazy"
              style={crop && cropStyle(crop)}
              className={crop ? 'absolute max-w-none' : 'size-full object-cover'}
            />
          </div>
        </div>
        <figcaption className="font-inter">
          <p className="text-[16px] leading-[25.6px] font-medium transition-colors duration-300 group-hover:text-gold-text">
            {name}
          </p>
          <p className="text-[14px] leading-[22.4px] text-muted">{role}</p>
        </figcaption>
      </figure>
    </li>
  )
}

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[50px] px-5 py-16 md:px-10 md:py-20 xl:px-[120px] xl:pt-[85px] xl:pb-[110px]">
        <div className="flex flex-col gap-5">
          <Eyebrow>MEET THE TEAM</Eyebrow>
          <SectionTitle id="team-title">
            One Team, In Lagos <br className="hidden md:block" />
            and in London.
          </SectionTitle>
        </div>
        <ul className="grid grid-cols-2 gap-x-3.5 gap-y-8 lg:grid-cols-4">
          {TEAM.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </ul>
      </div>
    </section>
  )
}
