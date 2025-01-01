import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../lib/auth/AuthProvider'
import { Link } from 'react-router-dom'

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-8 right-8 z-50 text-white text-xl hover:text-brand-orange transition-colors"
      >
        Menu
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 right-0 w-full bg-[#2A2A2A]/60 backdrop-blur-lg z-50"
              style={{ height: '17.5vh' }}
            >
              <div className="container mx-auto px-8 py-6 h-full flex flex-col justify-between">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-brand-orange transition-colors"
                  >
                    Close
                  </button>
                </div>

                <nav className="flex flex-col items-end space-y-2">
                  <Link 
                    to="/" 
                    className="text-white hover:text-brand-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-white hover:text-brand-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/services" 
                    className="text-white hover:text-brand-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-white hover:text-brand-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-white hover:text-brand-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {user ? (
                    <>
                      {profile?.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="text-brand-orange hover:text-brand-orange/80 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link 
                        to="/profile" 
                        className="text-white hover:text-brand-orange transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="text-white hover:text-brand-orange transition-colors text-right"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/signin" 
                        className="text-white hover:text-brand-orange transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        className="text-brand-orange hover:text-brand-orange/80 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
