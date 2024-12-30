import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className = '', delay = 0 }: Props) {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.03 + delay }
    }))
  }, [controls, delay])

  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
