import { useEffect, useState } from 'react'

function Header({ currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset >= 12)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={isScrolled ? 'is-scrolled' : ''}>
      <div className="header-inner">
        <a href="#home" className="logo">Ascent Mgnt</a>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#contact" className="btn">Book a Call</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
