import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Babysitter from './components/Babysitter'
import Packages from './components/Packages'
import TikTok from './components/TikTok'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Product from './components/Product'
import PackagesDetail from './components/PackagesDetail'
import About from './components/About'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'
      setCurrentPage(hash)
      window.scrollTo(0, 0)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <Header currentPage={currentPage} />
      <main id="main">
        {currentPage === 'home' && (
          <>
            <Hero />
            <Portfolio />
            <Babysitter />
            <Packages />
            <TikTok />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <FinalCTA />
          </>
        )}
        {currentPage === 'work' && <Portfolio />}
        {currentPage === 'packages' && <Packages />}
        {currentPage === 'product' && <Product />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'privacy' && <Privacy />}
      </main>
      <Footer />
    </>
  )
}

export default App
