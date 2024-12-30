import { motion } from 'framer-motion'
import AnimatedText from '../AnimatedText'
import AnimatedButton from '../AnimatedButton'
import { ArrowRight } from 'lucide-react'

export default function ImageBreak() {
  return (
    <motion.div 
      className="w-full h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <img 
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        alt="Coaching Impact"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-24">
        <div className="max-w-3xl">
          <AnimatedText
            text="Transform Your Future"
            className="text-6xl md:text-7xl font-bold text-white mb-8"
          />
          <p className="text-2xl text-white/90 mb-12">
            Take the first step towards your goals
          </p>
          <AnimatedButton className="bg-brand-orange text-white px-12 py-6 rounded-lg flex items-center space-x-4 text-xl">
            <span>Start Now</span>
            <ArrowRight size={28} />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  )
}
