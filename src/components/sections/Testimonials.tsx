import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import ResponsiveImage from '../ResponsiveImage'
import { Star } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface Testimonial {
  name: string
  role: string
  image: string
  quote: string
  background: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote: "The transformation in my leadership approach was remarkable.",
    background: "https://images.unsplash.com/photo-1497366216548-37526070297c"
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    quote: "JH Coaching helped me scale my business beyond expectations.",
    background: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    name: "Emma Williams",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    quote: "Found the perfect balance between creativity and leadership.",
    background: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  }
]

export default function Testimonials() {
  const isMobile = useMediaQuery('(max-width: 480px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  return (
    <TransitionSection 
      id="testimonials"
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      overlayOpacity={0.7}
    >
      <AnimatedSection className="section-padding min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32" direction="up">
        <div>
          <AnimatedTitle text="Success Stories" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                className="relative h-[500px] sm:h-[600px] md:h-[700px] rounded-2xl overflow-hidden group 
                          touch-action-manipulation"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i + 1.5 }}
                whileHover={!isMobile ? { scale: 1.02 } : undefined}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
              >
                <ResponsiveImage 
                  src={testimonial.background}
                  alt="Background"
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                              flex flex-col justify-end p-6 sm:p-8 md:p-12">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <ResponsiveImage 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-brand-orange object-cover"
                    />
                    <div className="ml-4 sm:ml-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-brand-orange">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="text-brand-amber" 
                        size={isMobile ? 20 : 24} 
                        fill="currentColor" 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
