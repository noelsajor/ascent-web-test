import { useEffect, useRef } from 'react'

function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const revealItems = footerRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed')
          }, 100)
          revealObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    revealItems.forEach(item => revealObserver.observe(item))
    return () => revealObserver.disconnect()
  }, [])

  return (
    <footer ref={footerRef}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand reveal-item">
            <h3>Ascent Mgnt</h3>
            <p>Done-for-you brand creation and growth. We build brands, create content, manage social, and handle execution so you can focus on your business.</p>
          </div>
          <div className="footer-nav reveal-item">
            <h4>Pages</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#product">Product</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-nav reveal-item">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#contact">Book a Call</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ascent Mgnt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
