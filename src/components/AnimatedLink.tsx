import { motion } from 'framer-motion'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export default function AnimatedLink({ href, children, className = '' }: Props) {
  return (
    <motion.a
      href={href}
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-0.5 bg-brand-orange"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  )
}
