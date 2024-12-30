import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { useInViewSection } from '../hooks/useInViewSection'

interface Props {
  children: ReactNode
  className?: string
  backgroundImage?: string
  id?: string
  overlayOpacity?: number
}

export default function TransitionSection({ 
  children, 
  className = '', 
  backgroundImage, 
  id,
  overlayOpacity = 0.5 
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { isVisible, intersectionRatio, isScrollingDown } = useInViewSection(sectionRef)

  const calculateOpacity = () => {
    if (!isVisible) return 0
    return intersectionRatio
  }

  const dynamicOpacity = calculateOpacity()

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`relative min-h-screen w-full ${className}`}
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Enhanced Gradient Overlay */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ 
                opacity: 0,
                background: isScrollingDown 
                  ? 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)' 
                  : 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
              }}
              animate={{ 
                opacity: 1,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)'
              }}
              exit={{ 
                opacity: 1,
                background: isScrollingDown 
                  ? 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
                  : 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Background Layer */}
            {backgroundImage && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: dynamicOpacity }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                >
                  <img 
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0"
                    initial={{ 
                      background: isScrollingDown
                        ? 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, black 100%)'
                        : 'linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, black 100%)'
                    }}
                    animate={{ 
                      background: `linear-gradient(180deg, 
                        rgba(0,0,0,0.9) 0%, 
                        rgba(0,0,0,${overlayOpacity}) 50%, 
                        rgba(0,0,0,0.9) 100%)`
                    }}
                    exit={{ 
                      background: isScrollingDown
                        ? 'linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, black 100%)'
                        : 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, black 100%)'
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Content Layer */}
            <motion.div 
              className="relative z-20 min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
