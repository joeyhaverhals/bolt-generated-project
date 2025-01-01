import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import AnimatedTitle from '../components/AnimatedTitle'
import { useMediaQuery } from '../hooks/useMediaQuery'

const team = [
  {
    name: 'John Henderson',
    role: 'Founder & Head Coach',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'With over 15 years of experience in personal development and coaching, John has helped thousands achieve their full potential.',
  },
  {
    name: 'Michael Chen',
    role: 'Life Coach',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Michael\'s holistic approach to life coaching has transformed countless lives through personalized strategies and unwavering support.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Career Development Coach',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Specializing in career transitions and professional growth, Sarah helps clients navigate their path to success.',
  },
]

export default function AboutPage() {
  const isMobile = useMediaQuery('(max-width: 480px)')

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="About Us"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <AnimatedTitle text="Over Ons" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Dedicated to transforming lives through personalized coaching and mentorship.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
