import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface Props {
  text: string
  className?: string
}

export default function AnimatedTitle({ text, className = '' }: Props) {
  const isTablet = useMediaQuery('(min-width: 768px)')
  const isMobile = useMediaQuery('(max-width: 480px)')

  const animationDelay = isMobile ? 0.03 : 0.05

  return (
    <div className="flex flex-wrap justify-center overflow-hidden mb-12 md:mb-24 px-4">
      {text.split("").map((char, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: index * animationDelay,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            display: 'inline-block',
            fontSize: isMobile ? '2.5rem' : isTablet ? '4rem' : '3rem',
            fontWeight: 'bold',
            color: '#ff6b35'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.div>
      ))}
    </div>
  )
}
