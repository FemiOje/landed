import cofounderPhoto from '../assets/images/team-cofounder.png'
import hostPhoto from '../assets/images/team-host.jpeg'
import seanPhoto from '../assets/images/team-sean.jpeg'
import tailorPhoto from '../assets/images/team-tailor.jpeg'
import { Eyebrow, SectionTitle } from '../components/ui'

const TEAM = [
  {
    name: 'Sean Okpe',
    role: 'Co-founder',
    photo: seanPhoto,
    // Figma crop (image fill transform): the visible region of the source image, as fractions.
    crop: { x: 0.15, y: 0.04, width: 0.6408, height: 0.6 },
  },
  { name: 'Name to come', role: 'Co-founder', photo: cofounderPhoto },
  { name: 'Name to come', role: 'Tailor', photo: tailorPhoto },
  { name: 'Name to come', role: 'Host', photo: hostPhoto },
]

function cropStyle({ x, y, width, height }) {
  return {
    width: `${100 / width}%`,
    height: `${100 / height}%`,
    left: `${(-x / width) * 100}%`,
    top: `${(-y / height) * 100}%`,
  }
}

function TeamMember({ name, role, photo, crop, isPlaceholder }) {
  return (
    <li>
      <figure className="flex flex-col gap-3">
        <div className="relative aspect-[289.5/361.9] overflow-hidden rounded-[20px] border border-ink/15">
          <img
            src={photo}
            alt={isPlaceholder ? `${role} at Landed` : `${name}, ${role}`}
            loading="lazy"
            style={crop && cropStyle(crop)}
            className={crop ? 'absolute max-w-none' : 'size-full object-cover'}
          />
        </div>
        <figcaption className="font-inter">
          <p className="text-[16px] leading-[25.6px] font-medium">{name}</p>
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
          {TEAM.map((member, i) => (
            <TeamMember key={i} isPlaceholder={member.name === 'Name to come'} {...member} />
          ))}
        </ul>
      </div>
    </section>
  )
}
