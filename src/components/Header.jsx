import { useEffect, useState } from 'react'

function Header({ currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset >= 12)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (e) => {
    closeMobileMenu()
  }

  const isActive = (page) => {
    return currentPage === page ? 'active' : ''
  }

  return (
    <header className={isScrolled ? 'is-scrolled' : ''}>
      <div className="header-inner">
        <a href="#home" className="logo">Ascent Mgnt</a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><a href="#home" className={isActive('home')}>Home</a></li>
            <li><a href="#work" className={isActive('work')}>Work</a></li>
            <li><a href="#packages" className={isActive('packages')}>Packages</a></li>
            <li><a href="#product" className={isActive('product')}>Product</a></li>
            <li><a href="#about" className={isActive('about')}>About</a></li>
            <li><a href="#contact" className={isActive('contact')}>Contact</a></li>
            <li><a href="#contact" className="btn" onClick={handleBookCall}>Book a Call</a></li>
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
                <li><a href="#home" className={isActive('home')} onClick={handleNavClick}>Home</a></li>
                <li><a href="#work" className={isActive('work')} onClick={handleNavClick}>Work</a></li>
                <li><a href="#packages" className={isActive('packages')} onClick={handleNavClick}>Packages</a></li>
                <li><a href="#product" className={isActive('product')} onClick={handleNavClick}>Product</a></li>
                <li><a href="#about" className={isActive('about')} onClick={handleNavClick}>About</a></li>
                <li><a href="#contact" className={isActive('contact')} onClick={handleNavClick}>Contact</a></li>
                <li><a href="#contact" className="btn" onClick={handleBookCall}>Book a Call</a></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
