import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLink from './AnimatedLink'
import AnimatedButton from './AnimatedButton'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-brand-orange"
          >
            JH Personal Coaching
          </motion.a>
          
          <div className="hidden md:flex items-center space-x-8">
            <AnimatedLink href="#about" className="text-gray-600">About</AnimatedLink>
            <AnimatedLink href="#features" className="text-gray-600">Features</AnimatedLink>
            <AnimatedLink href="#services" className="text-gray-600">Services</AnimatedLink>
            <AnimatedLink href="#contact" className="text-gray-600">Contact</AnimatedLink>
            <AnimatedButton className="flex items-center space-x-2 bg-brand-orange text-white px-4 py-2 rounded-lg">
              <User size={18} />
              <span>Sign In</span>
            </AnimatedButton>
          </div>

          <motion.button 
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <AnimatedLink href="#about" className="text-gray-600">About</AnimatedLink>
                <AnimatedLink href="#features" className="text-gray-600">Features</AnimatedLink>
                <AnimatedLink href="#services" className="text-gray-600">Services</AnimatedLink>
                <AnimatedLink href="#contact" className="text-gray-600">Contact</AnimatedLink>
                <AnimatedButton className="flex items-center space-x-2 bg-brand-orange text-white px-4 py-2 rounded-lg">
                  <User size={18} />
                  <span>Sign In</span>
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
