import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const quickLinks = ['About', 'Services', 'Blog', 'Contact']
const socialLinks = ['facebook', 'twitter', 'instagram', 'linkedin']

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { 
    margin: "-100px",
    amount: "some" 
  })

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-[#2A2A2A]/60 backdrop-blur-lg text-white py-12 
                 border-t border-white/10 z-40"
      initial={{ y: 100 }}
      animate={isInView ? { y: 0 } : { y: 100 }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-brand-orange">JH Personal Coaching</h3>
            <p className="text-lg text-white/90 mt-2">Transform your potential into success.</p>
          </div>
          
          <div className="flex justify-center">
            <div className="flex space-x-12">
              {quickLinks.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-lg text-white/70 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                <span className="sr-only">{social}</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
