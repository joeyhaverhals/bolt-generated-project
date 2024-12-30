import { useState, useEffect } from 'react'

interface InViewState {
  isVisible: boolean
  intersectionRatio: number
  isScrollingDown: boolean
}

export function useInViewSection(ref: React.RefObject<HTMLElement>): InViewState {
  const [viewState, setViewState] = useState<InViewState>({
    isVisible: false,
    intersectionRatio: 0,
    isScrollingDown: true
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setViewState(state => ({
          ...state,
          isVisible: entry.isIntersecting || entry.intersectionRatio > 0.1, // Earlier visibility
          intersectionRatio: entry.intersectionRatio
        }))
      },
      {
        root: null,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px" // Adjusted margin for earlier triggers
      }
    )

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setViewState(state => ({
        ...state,
        isScrollingDown: currentScrollY > (window as any).lastScrollY || 0
      }))
      ;(window as any).lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return viewState
}
