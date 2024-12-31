import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import AnimatedButton from '../AnimatedButton'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import ResponsiveImage from '../ResponsiveImage'
import { MessageCircle } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface FormField {
  type: 'text' | 'email' | 'select' | 'textarea'
  placeholder: string
  name: string
  options?: string[]
}

const formFields: FormField[] = [
  { 
    type: 'text', 
    placeholder: 'Your Name', 
    name: 'name' 
  },
  { 
    type: 'email', 
    placeholder: 'Your Email', 
    name: 'email' 
  },
  { 
    type: 'select', 
    placeholder: 'Select Service',
    name: 'service',
    options: [
      'Executive Coaching',
      'Life Transformation',
      'Business Growth',
      'Leadership Development'
    ]
  },
  { 
    type: 'textarea', 
    placeholder: 'Your Message', 
    name: 'message' 
  }
]

export default function Contact() {
  const isMobile = useMediaQuery('(max-width: 480px)')

  return (
    <TransitionSection 
      id="contact"
      backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
      overlayOpacity={0.7}
    >
      <div className="min-h-screen w-full flex items-center justify-center pb-[200px]">
        <AnimatedSection className="section-padding w-full py-16 sm:py-24 md:py-32" direction="up">
          <div className="max-w-7xl mx-auto">
            <AnimatedTitle text="Start Your Journey" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-24">
              {/* Left side - image and contact info */}
              <motion.div 
                className="relative h-[400px] sm:h-[600px] md:h-[800px] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={!isMobile ? { scale: 1.02 } : undefined}
              >
                <ResponsiveImage 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                  alt="Contact"
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                              flex flex-col justify-end p-6 sm:p-8 md:p-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                    Let's Connect
                  </h3>
                  <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
                    Transform your life with expert guidance
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div 
                      className="flex items-center text-white/80"
                      whileHover={{ x: 10 }}
                    >
                      <span className="text-lg sm:text-xl">contact@jhcoaching.com</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-white/80"
                      whileHover={{ x: 10 }}
                    >
                      <span className="text-lg sm:text-xl">+1 (555) 123-4567</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right side - contact form */}
              <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl h-[400px] sm:h-[600px] md:h-[800px] flex flex-col">
                <form className="space-y-6 sm:space-y-8 flex-1 flex flex-col">
                  {formFields.map((field, i) => (
                    <motion.div
                      key={field.name}
                      className={field.type === 'textarea' ? 'flex-1' : ''}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * i + 1.7 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {field.type === 'select' ? (
                        <select 
                          name={field.name}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/20 border-2 
                                   border-white/10 focus:border-brand-orange focus:outline-none 
                                   text-base sm:text-xl text-white min-h-[44px]"
                        >
                          <option value="" className="bg-black">{field.placeholder}</option>
                          {field.options?.map((option) => (
                            <option 
                              key={option} 
                              value={option.toLowerCase().replace(/\s+/g, '-')}
                              className="bg-black"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea 
                          name={field.name}
                          placeholder={field.placeholder}
                          className="w-full h-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/20 
                                   border-2 border-white/10 focus:border-brand-orange focus:outline-none 
                                   text-base sm:text-xl text-white placeholder-white/50 resize-none"
                        />
                      ) : (
                        <input 
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/20 border-2 
                                   border-white/10 focus:border-brand-orange focus:outline-none 
                                   text-base sm:text-xl text-white placeholder-white/50 min-h-[44px]"
                        />
                      )}
                    </motion.div>
                  ))}
                  
                  <AnimatedButton className="w-full bg-brand-orange text-white px-6 sm:px-8 py-4 sm:py-6 
                                          rounded-lg flex items-center justify-center space-x-3 sm:space-x-4 
                                          text-base sm:text-xl min-h-[44px]">
                    <MessageCircle size={isMobile ? 20 : 24} />
                    <span>Schedule Free Consultation</span>
                  </AnimatedButton>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </TransitionSection>
  )
}
