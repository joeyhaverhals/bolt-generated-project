import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  priority = false 
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setError(true)
  }, [src])

  if (error) {
    return <div className={`bg-gray-200 ${className}`} />
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      onError={() => setError(true)}
    />
  )
}
