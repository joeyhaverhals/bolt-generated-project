import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import AnimatedButton from '../AnimatedButton'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <TransitionSection 
      backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
      overlayOpacity={0.6}
    >
      <AnimatedSection className="min-h-screen flex items-center justify-center" direction="up">
        <div className="section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto">
            <AnimatedTitle text="Transformeer Je Leven" />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-2xl md:text-3xl text-white/90 mb-12 mt-8 max-w-3xl mx-auto"
            >
              Unlock your full potential with personalized coaching that empowers you to achieve your goals.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="flex justify-center"
            >
              <AnimatedButton className="bg-brand-orange text-white px-12 py-6 rounded-lg flex items-center space-x-4 text-xl">
                <span>Begin Your Journey</span>
                <ArrowRight size={24} />
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
