import { useEffect, useState } from 'react'
import logo from '../assets/ascent_logo.svg'
import CalendlyPopupButton from "./CalendlyPopupButton";


function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset >= 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ Sync active link with the current URL path
  useEffect(() => {
    const syncActive = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '') // trim slashes
      setActivePage(path === '' ? 'home' : path)
    }

    syncActive()
    window.addEventListener('popstate', syncActive) // back/forward
    return () => window.removeEventListener('popstate', syncActive)
  }, [])

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleBookCall = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/YOUR_LINK/30min'
      })
    }
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // ✅ Update active state immediately on click (so it highlights right away)
  const handleNavClick = (page) => () => {
    setActivePage(page)
    closeMobileMenu()
  }

  const isActive = (page) => (activePage === page ? 'active' : '')

  return (
    <header className={isScrolled ? 'is-scrolled' : ''}>
      <div className="header-inner">
        <a href="/" className="logo" aria-label="Ascent Mgnt" onClick={handleNavClick('home')}>
          <img src={logo} alt="Ascent Mgnt" className="logo-img" />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><a href="/" className={isActive('home')} onClick={handleNavClick('home')}>Home</a></li>
            <li><a href="/work" className={isActive('work')} onClick={handleNavClick('work')}>Work</a></li>
            <li><a href="/packages" className={isActive('packages')} onClick={handleNavClick('packages')}>Packages</a></li>
            <li><a href="/product" className={isActive('product')} onClick={handleNavClick('product')}>Product</a></li>
            <li><a href="/about" className={isActive('about')} onClick={handleNavClick('about')}>About</a></li>
            <li><a href="/contact" className={isActive('contact')} onClick={handleNavClick('contact')}>Contact</a></li>
            <li><CalendlyPopupButton label="Book a Call" className="btn" /></li>
          </ul>
        </nav>

        {/* Burger Menu Button */}
        <button
          className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <nav className="mobile-nav">
              <ul>
                <li><a href="/" className={isActive('home')} onClick={handleNavClick('home')}>Home</a></li>
                <li><a href="/work" className={isActive('work')} onClick={handleNavClick('work')}>Work</a></li>
                <li><a href="/packages" className={isActive('packages')} onClick={handleNavClick('packages')}>Packages</a></li>
                <li><a href="/product" className={isActive('product')} onClick={handleNavClick('product')}>Product</a></li>
                <li><a href="/about" className={isActive('about')} onClick={handleNavClick('about')}>About</a></li>
                <li><a href="/contact" className={isActive('contact')} onClick={handleNavClick('contact')}>Contact</a></li>
                <li><CalendlyPopupButton label="Book a Call" className="btn" /></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
