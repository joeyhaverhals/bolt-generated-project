import { motion } from 'framer-motion'
import AnimatedSection from '../AnimatedSection'
import TransitionSection from '../TransitionSection'
import AnimatedTitle from '../AnimatedTitle'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How long are the sessions?",
    answer: "60-90 minutes of focused transformation"
  },
  {
    question: "What's the coaching process?",
    answer: "Personalized strategy tailored to your goals"
  },
  {
    question: "How often do we meet?",
    answer: "Weekly or bi-weekly, based on your needs"
  },
  {
    question: "Virtual or in-person?",
    answer: "Both options available worldwide"
  }
]

export default function FAQ() {
  return (
    <TransitionSection 
      id="faq"
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978"
      overlayOpacity={0.7}
    >
      <AnimatedSection className="section-padding min-h-screen flex items-center justify-center py-32" direction="right">
        <div>
          <AnimatedTitle text="Common Questions" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="bg-black/40 backdrop-blur-md p-12 rounded-2xl shadow-lg hover:bg-black/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i + 1.5 }}
                whileHover={{ y: -10 }}
              >
                <h3 className="text-3xl font-bold mb-6 text-white">{faq.question}</h3>
                <p className="text-xl text-white/90">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </TransitionSection>
  )
}
