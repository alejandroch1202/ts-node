import type { ImgHTMLAttributes } from 'react'
import { useRef, useEffect, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  onLazyLoad?: (img: HTMLImageElement) => void
}

const IMAGE_PLACEHOLDER: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='

export const LazyImage = ({ src, onLazyLoad, ...imageProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null)
  const [isLazyLoaded, setIsLazyLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(IMAGE_PLACEHOLDER)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (isLazyLoaded) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src)

          observer.disconnect()
          setIsLazyLoaded(true)

          if (typeof onLazyLoad === 'function') {
            if (node.current !== null) onLazyLoad(node.current)
          }
        }
      })
    })

    if (node.current !== null) {
      observer.observe(node.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [src, onLazyLoad, isLazyLoaded])

  return (
    <img
      ref={node}
      src={currentSrc}
      alt='random fox'
      {...imageProps}
    />
  )
}
