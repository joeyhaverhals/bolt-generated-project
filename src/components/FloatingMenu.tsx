import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blog', href: '#blog' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
]

export default function FloatingMenu() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
      if (isMenuOpen) setIsMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isMenuOpen])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 right-8 z-50 text-xl font-bold text-white hover:text-brand-orange transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            Menu
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '17.5vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 w-full bg-[#2A2A2A]/60 backdrop-blur-lg z-40 
                       border-b border-white/10 shadow-2xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-7xl mx-auto h-full flex flex-col justify-center px-8 relative"
              >
                {/* Close button positioned absolutely */}
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-2 right-8 text-base text-white/80 hover:text-white transition-colors"
                >
                  Close
                </button>

                {/* Navigation links aligned vertically on the right */}
                <nav className="flex flex-col items-end space-y-1"> {/* Changed to vertical flex */}
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-base text-white/80 hover:text-white transition-colors"
                      initial={{ opacity: 0, x: 20 }} // Changed to x offset for right-side animation
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.03 * (index + 1),
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: -3 }} // Reversed hover direction for right alignment
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
