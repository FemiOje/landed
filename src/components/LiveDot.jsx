// "Live" beacon: a solid 8px green dot. On each beat it swells while one soft ring leaves it and fades, then
// rests (keyframes live-beat / live-ring in index.css). The ring and the dot share one grid cell, so the ring
// always grows from the dot's exact centre. With reduced motion there's no ring and the dot stays still.
export default function LiveDot() {
  return (
    <span aria-hidden="true" className="grid size-2 shrink-0">
      <span className="rounded-full bg-live [grid-area:1/1] motion-safe:animate-live-ring motion-reduce:hidden" />
      <span className="rounded-full bg-live [grid-area:1/1] motion-safe:animate-live-beat" />
    </span>
  )
}
