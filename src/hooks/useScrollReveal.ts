import { useEffect, useRef, useState } from 'react'

export default function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, ...(options || {}) }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref.current])

  return { ref, inView }
}
