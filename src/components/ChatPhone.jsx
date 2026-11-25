import readIcon from '../assets/icons/chat-read.svg'
import sendIcon from '../assets/icons/chat-send.svg'
import statusIcons from '../assets/icons/phone-status.svg'
import shootPhoto from '../assets/images/chat-shoot.png'

const FRAME_SHADOW = [
  'inset 0 0.9px 1.9px 2.8px rgba(255,255,255,0.08)',
  'inset 0 0 0 2.8px #050505',
  'inset 0 0 0 0.9px rgba(255,255,255,0.22)',
  '0 28px 56.1px -18.7px rgba(12,12,10,0.28)',
  '0 1.9px 5.6px rgba(12,12,10,0.06)',
].join(', ')

const FRAME_GRADIENT =
  'linear-gradient(135deg, #4a4a4d 0%, #141415 18%, #2c2c2e 38%, #0a0a0b 55%, #232325 78%, #3e3e41 100%)'

const SIDE_BUTTONS = [
  { side: 'left', top: 100.9, height: 28 },
  { side: 'left', top: 149.5, height: 52.3 },
  { side: 'left', top: 213, height: 52.3 },
  { side: 'right', top: 173.8, height: 82.2 },
]

const TIME = 'font-mono text-[9.3px] leading-[9.3px] font-medium'
const MESSAGE = 'font-inter text-[12.6px] leading-[17.7px]'

function SideButton({ side, top, height }) {
  return (
    <span
      className={`absolute w-[3.7px] rounded-[1.9px] ${side === 'left' ? 'left-[-2.8px]' : 'left-[316.7px]'}`}
      style={{
        top,
        height,
        backgroundImage: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, #111112, #4a4a4d)`,
      }}
    />
  )
}

function IncomingBubble({ time, children }) {
  return (
    <div className="flex flex-col rounded-[5.6px_14.9px_14.9px_14.9px] bg-white px-[10.3px] pt-[8.4px] pb-[6.5px] shadow-[0_0.9px_1.9px_rgba(12,12,10,0.05)]">
      {children}
      <div className="flex justify-end pt-[2.8px] opacity-70">
        <span className={`${TIME} text-ink`}>{time}</span>
      </div>
    </div>
  )
}

function OutgoingBubble({ time, children }) {
  return (
    <div className="flex w-[178.5px] flex-col self-end rounded-[14.9px_5.6px_14.9px_14.9px] bg-white px-[10.3px] pt-[8.4px] pb-[6.5px] shadow-[0_0.9px_1.9px_rgba(12,12,10,0.05)]">
      <p className={`${MESSAGE} text-black`}>{children}</p>
      <div className="flex items-center justify-end gap-[3.7px] pt-[2.8px]">
        <span className={`${TIME} text-white/66`}>{time}</span>
        <img src={readIcon} width="14" height="14" alt="" />
      </div>
    </div>
  )
}

export default function ChatPhone() {
  return (
    <figure
      role="img"
      aria-label="Example WhatsApp conversation: Landed's Lagos team sends shoot photos and plans for the night."
      className="relative h-[661.3px] w-[317.6px] shrink-0 rounded-[54.2px] p-[11.2px]"
      style={{ backgroundImage: FRAME_GRADIENT, boxShadow: FRAME_SHADOW }}
    >
      {SIDE_BUTTONS.map((button) => (
        <SideButton key={`${button.side}-${button.top}`} {...button} />
      ))}

      <div aria-hidden="true" className="relative flex h-full flex-col overflow-hidden rounded-[43px] bg-white">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-[85.5px] h-[26.2px] w-[124.3px] rounded-b-[16.8px] bg-ink">
          <span className="absolute top-[8.4px] left-[88.4px] size-[8.4px] rounded-full bg-[#1e2430] shadow-[inset_0_0_0_1.9px_#14161c]" />
        </div>

        <div className="flex h-[41.1px] shrink-0 items-center justify-between pt-[5.6px] pr-[24.3px] pl-7">
          <span className="font-inter text-[13.1px] leading-[13.1px] font-semibold">9:41</span>
          <img src={statusIcons} width="63" height="12" alt="" />
        </div>

        <div className="flex h-[51.4px] shrink-0 items-center gap-[9.3px] border-b-[0.93px] border-ink/8 px-[14.9px] pt-[5.6px] pb-[11.2px]">
          <span className="grid size-[31.8px] place-items-center rounded-full bg-ink font-[Arial] text-[11.2px] leading-[11.2px] font-bold tracking-[1.3px] text-white">
            LD
          </span>
          <div className="flex flex-col">
            <span className="font-inter text-[13.1px] leading-[15.7px] font-semibold">Landed · Lagos</span>
            <span className="font-inter text-[11.2px] leading-[17.9px] text-muted">online</span>
          </div>
        </div>

        <div className="flex h-[479.1px] shrink-0 flex-col gap-[7.5px] overflow-hidden bg-[#f6f6f4] px-[11.2px] py-[13.1px]">
          <span className="self-center rounded-full bg-white px-[8.4px] py-[4.7px] font-mono text-[9.3px] leading-[9.3px] font-medium tracking-[0.6px] text-muted uppercase">
            Sat, 20 Dec
          </span>
          <IncomingBubble time="18:42">
            <p className={`${MESSAGE} w-[203.7px]`}>Evening Tolu! Your shoot photos are in.</p>
          </IncomingBubble>
          <IncomingBubble time="18:43">
            <div className="h-[141px]">
              <img
                src={shootPhoto}
                alt=""
                className="h-[135.6px] w-[203.4px] object-cover"
              />
            </div>
            <p className={`${MESSAGE} h-[35.3px] w-[203.7px] whitespace-pre-wrap`}>
              {' This one’s the cover, trust me.'}
            </p>
          </IncomingBubble>
          <OutgoingBubble time="18:51">Obsessed. Mum wants copies!</OutgoingBubble>
          <IncomingBubble time="18:53">
            <p className={`${MESSAGE} w-[203.7px]`}>
              Haha. Tonight: Chidi meets you at 9, security’s with him. Wear the green aso-oke.
            </p>
          </IncomingBubble>
        </div>

        <div className="flex h-[67.3px] shrink-0 flex-col border-t-[0.93px] border-ink/8">
          <div className="flex items-center gap-[7.5px] px-[11.2px] pt-[9.3px] pb-[11.2px]">
            <span className="flex h-[33.6px] flex-1 items-center rounded-full bg-[#f2f2f0] px-[13.1px] font-inter text-[12.1px] leading-[19.4px] text-muted">
              Message
            </span>
            <img src={sendIcon} width="34" height="34" alt="" />
          </div>
          <div className="flex justify-center pb-[7.5px]">
            <span className="h-[4.7px] w-[106.3px] rounded-[2.8px] bg-ink/90" />
          </div>
        </div>
      </div>
    </figure>
  )
}
