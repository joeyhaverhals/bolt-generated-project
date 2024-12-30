import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import AnimatedText from '../AnimatedText'

const features = [
  {
    title: "Career Excellence",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    description: "Reach new heights in your professional journey"
  },
  {
    title: "Life Balance",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5",
    description: "Find harmony in work and personal life"
  },
  {
    title: "Leadership Growth",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    description: "Develop your leadership potential"
  },
  {
    title: "Business Success",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Scale your business to new levels"
  }
]

export default function Features() {
  return (
    <section id="features" className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-32">
      <AnimatedSection className="section-padding" direction="up">
        <AnimatedText
          text="What We Offer"
          className="section-heading"
        />
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="relative h-[600px] rounded-2xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                            flex flex-col justify-end p-12 group-hover:bg-black/50 transition-all duration-500">
                <h3 className="text-4xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-xl text-white/90 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
