import { motion } from 'framer-motion'
import { Users, Target, Award, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Clients Served', value: '500+' },
  { label: 'Success Rate', value: '95%' },
  { label: 'Client Retention', value: '90%' },
]

const team = [
  {
    name: 'John Harrison',
    role: 'Founder & Lead Coach',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'With over 15 years of experience in personal development and coaching, John has helped hundreds of individuals achieve their goals.',
  },
  {
    name: 'Sarah Chen',
    role: 'Executive Coach',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Specializing in leadership development and career transitions, Sarah brings a wealth of corporate experience to her coaching practice.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Life Coach',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Michael's holistic approach to life coaching has transformed countless lives through personalized strategies and unwavering support.',
  },
]

const values = [
  {
    icon: Users,
    title: 'Client-Centered',
    description: 'Your success is our priority. We tailor our approach to your unique needs and goals.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on achieving measurable outcomes through proven methodologies.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards of professionalism and continuous improvement.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'We believe in the unlimited potential for personal and professional development.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
            alt="About Us"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              About JH Personal Coaching
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90"
            >
              We're dedicated to helping individuals and organizations reach their full potential
              through personalized coaching and strategic guidance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-brand-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <value.icon className="w-12 h-12 text-brand-orange mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert coaches dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-brand-orange font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-brand-orange text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-8">
              To empower individuals and organizations to achieve extraordinary results through
              personalized coaching, actionable strategies, and unwavering support.
            </p>
            <p className="text-xl">
              We believe everyone has the potential for greatness, and we're here to help you
              unlock yours.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
