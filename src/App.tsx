import { useEffect } from 'react'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Testimonials from './components/sections/Testimonials'
import Blog from './components/sections/Blog'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import FloatingMenu from './components/FloatingMenu'

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'black'
  }, [])

  return (
    <div className="relative bg-black">
      <FloatingMenu />
      <main className="relative z-0">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
