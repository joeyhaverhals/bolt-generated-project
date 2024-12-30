import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'
import { ArrowUpRight } from 'lucide-react'

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
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <TransitionSection 
      id="blog"
      backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
      overlayOpacity={0.7}
    >
      <AnimatedSection className="section-padding min-h-screen flex items-center justify-center py-32" direction="left">
        <div>
          <AnimatedTitle text="Latest Insights" />
          
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Featured Post */}
            {featuredPost && (
              <motion.div 
                className="relative h-[600px] rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                              flex flex-col justify-end p-12 group-hover:bg-black/70 transition-all duration-500">
                  <span className="text-brand-orange text-xl mb-4">{featuredPost.category}</span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">{featuredPost.title}</h3>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl">{featuredPost.description}</p>
                  <motion.div 
                    className="flex items-center text-white/80 group-hover:text-white"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xl">Read Article</span>
                    <ArrowUpRight className="ml-2" size={24} />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-3 gap-12">
              {regularPosts.map((post, i) => (
                <motion.div 
                  key={i}
                  className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i + 2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                                flex flex-col justify-end p-8 group-hover:bg-black/70 transition-all duration-500">
                    <span className="text-brand-orange text-lg mb-4">{post.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                    <p className="text-lg text-white/90 mb-6">{post.description}</p>
                    <motion.div 
                      className="flex items-center text-white/80 group-hover:text-white"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-lg">Read Article</span>
                      <ArrowUpRight className="ml-2" size={20} />
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
