import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import type { AboutSection, Stat } from '../../types'

const aboutSections: AboutSection[] = [
  {
    title: "Who We Are",
    description: "Elite coaches dedicated to transforming lives through personalized guidance and proven methodologies."
  },
  {
    title: "What We Do",
    description: "Empower individuals and organizations to reach their highest potential through strategic coaching and mentorship."
  },
  {
    title: "Our Vision",
    description: "Create a world where everyone has the tools and support to achieve extraordinary success and fulfillment."
  }
]

const stats: Stat[] = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Clients Served" },
  { number: "95%", label: "Success Rate" },
  { number: "24/7", label: "Support" }
]

export default function About() {
  return (
    <TransitionSection 
      id="about"
      backgroundImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
    >
      <AnimatedSection className="min-h-screen flex flex-col justify-center py-32">
        <div className="section-padding">
          <AnimatedTitle text="Over Ons" />
          
          {/* Mission Statement */}
          <motion.div 
            className="max-w-4xl mx-auto mb-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-3xl md:text-4xl text-white/90 font-light leading-relaxed">
              "We believe in the transformative power of personal coaching to unlock human potential and create lasting change."
            </p>
          </motion.div>

          {/* About Sections - Tiles */}
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto mb-24">
            {aboutSections.map((section, i) => (
              <motion.div 
                key={i}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-12 hover:bg-black/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (i + 1) + 1.5 }}
                whileHover={{ y: -10 }}
              >
                <h3 className="text-3xl font-bold text-brand-orange mb-6">{section.title}</h3>
                <p className="text-xl text-white leading-relaxed">{section.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 * (i + 1) + 2 }}
              >
                <p className="text-5xl font-bold text-brand-orange mb-2">{stat.number}</p>
                <p className="text-xl text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
