import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import { ChevronRight } from 'lucide-react'

interface Service {
  title: string
  description: string
  price: string
  image: string
}

const services: Service[] = [
  {
    title: "Executive Coaching",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    price: "From $300/session",
    description: "Strategic leadership development for senior executives"
  },
  {
    title: "Life Transformation",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
    price: "From $200/session",
    description: "Comprehensive personal development coaching"
  },
  {
    title: "Business Growth",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    price: "From $400/session",
    description: "Scaling strategies for business owners"
  },
  {
    title: "Career Acceleration",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    price: "From $250/session",
    description: "Fast-track your professional growth"
  }
]

export default function Services() {
  return (
    <TransitionSection 
      id="services"
      backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
      overlayOpacity={0.7}
    >
      <AnimatedSection className="section-padding min-h-screen flex items-center justify-center py-32" direction="right">
        <div>
          <AnimatedTitle text="Our Services" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                className="relative h-[800px] rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i + 1.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                              flex flex-col justify-end p-12 group-hover:bg-black/60 transition-all duration-500">
                  <h3 className="text-4xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-xl text-white/90 mb-6">{service.description}</p>
                  <p className="text-2xl text-brand-orange mb-8">{service.price}</p>
                  <motion.div 
                    className="flex items-center text-white/80 group-hover:text-white"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xl">Learn More</span>
                    <ChevronRight className="ml-2" size={28} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
