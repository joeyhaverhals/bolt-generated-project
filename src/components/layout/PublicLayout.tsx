import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../../lib/auth/AuthProvider'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

interface Props {
  children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-brand-orange">
                JH Personal Coaching
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-brand-orange'
                      : 'text-gray-700 hover:text-brand-orange'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center rounded-md bg-brand-orange px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-orange/90 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center rounded-md bg-brand-orange px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-orange/90 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-50 bg-white"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="text-2xl font-bold text-brand-orange">
                  JH Personal Coaching
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="px-4 pt-8 pb-16">
                <div className="space-y-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-medium ${
                        pathname === item.href
                          ? 'text-brand-orange'
                          : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-medium text-brand-orange"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-medium text-brand-orange"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-brand-orange mb-4">
                JH Personal Coaching
              </h3>
              <p className="text-gray-400">
                Transform your life with expert guidance and personalized coaching.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@jhcoaching.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Coaching Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JH Personal Coaching. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
