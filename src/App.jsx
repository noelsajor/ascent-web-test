import { Routes, Route } from 'react-router-dom'

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
import About from './components/About'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import Footer from './components/Footer'

function Home() {
  return (
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
  )
}

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
