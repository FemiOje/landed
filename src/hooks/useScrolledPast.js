import { useEffect, useState } from 'react'

// True once the page has scrolled further than `getThreshold()` pixels. Pass a stable (module-level) function;
// it's re-read on every scroll and resize, so thresholds based on the viewport stay correct.
export default function useScrolledPast(getThreshold) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const update = () => setPast(window.scrollY > getThreshold())
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [getThreshold])

  return past
}
