import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import ResponsiveImage from '../ResponsiveImage'
import { ArrowUpRight } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface BlogPost {
  title: string
  image: string
  category: string
  description: string
  date: string
  featured?: boolean
}

const posts: BlogPost[] = [
  {
    title: "The Future of Leadership",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    category: "Featured",
    description: "Discover the emerging trends shaping tomorrow's leaders and learn how to adapt your leadership style for the challenges ahead. Master the art of modern leadership.",
    date: "March 15, 2024",
    featured: true
  },
  {
    title: "Building Resilience",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "Personal Growth",
    description: "Strategies for maintaining strength in challenging times",
    date: "March 10, 2024"
  },
  {
    title: "Team Dynamics",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    category: "Leadership",
    description: "Creating high-performing teams in the modern workplace",
    date: "March 5, 2024"
  },
  {
    title: "Work-Life Integration",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
    category: "Lifestyle",
    description: "Harmonizing professional success with personal fulfillment",
    date: "March 1, 2024"
  }
]

export default function Blog() {
  const isMobile = useMediaQuery('(max-width: 480px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <TransitionSection 
      id="blog"
      backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
      overlayOpacity={0.7}
    >
      <AnimatedSection className="section-padding min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32" direction="left">
        <div>
          <AnimatedTitle text="Latest Insights" />
          
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
            {/* Featured Post */}
            {featuredPost && (
              <motion.div 
                className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden group 
                          cursor-pointer touch-action-manipulation"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={!isMobile ? { scale: 1.02 } : undefined}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
              >
                <ResponsiveImage 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                              flex flex-col justify-end p-6 sm:p-8 md:p-12 group-hover:bg-black/70 
                              transition-all duration-500">
                  <span className="text-lg sm:text-xl text-brand-orange mb-3 sm:mb-4">{featuredPost.category}</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                    {featuredPost.title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl">
                    {featuredPost.description}
                  </p>
                  <motion.div 
                    className="flex items-center text-white/80 group-hover:text-white"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-lg sm:text-xl">Read Article</span>
                    <ArrowUpRight className="ml-2" size={isMobile ? 20 : 24} />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post, i) => (
                <motion.div 
                  key={i}
                  className="relative h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden 
                            group cursor-pointer touch-action-manipulation"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i + 2 }}
                  whileHover={!isMobile ? { scale: 1.02 } : undefined}
                  whileTap={isMobile ? { scale: 0.98 } : undefined}
                >
                  <ResponsiveImage 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                                flex flex-col justify-end p-6 sm:p-8 group-hover:bg-black/70 
                                transition-all duration-500">
                    <span className="text-base sm:text-lg text-brand-orange mb-2 sm:mb-3">{post.category}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{post.title}</h3>
                    <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6">{post.description}</p>
                    <motion.div 
                      className="flex items-center text-white/80 group-hover:text-white"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-base sm:text-lg">Read Article</span>
                      <ArrowUpRight className="ml-2" size={isMobile ? 18 : 20} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
