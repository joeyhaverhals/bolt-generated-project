import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
}

export default function AnimatedTitle({ text, className = '' }: Props) {
  return (
    <div className="flex justify-center overflow-hidden mb-24">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-brand-orange ${className}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}
