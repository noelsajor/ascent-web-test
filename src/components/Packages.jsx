import { useState, useEffect, useRef } from 'react'

function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('creation')
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current.querySelectorAll('.reveal-item')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target.parentElement
          const siblings = Array.from(container.querySelectorAll('.reveal-item'))
          const itemIndex = siblings.indexOf(entry.target)
          const delay = Math.min(itemIndex * 75, 240)
          setTimeout(() => {
            entry.target.classList.add('revealed')
          }, delay)
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

  const handlePackageClick = (packageType) => {
    setSelectedPackage(packageType)
  }

  const handleKeyDown = (e, packageType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePackageClick(packageType)
    }
  }

  return (
    <section className="packages-section" id="packages" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Choose Your Package</h2>
          <p>Two packages designed for different stages. Both focused on execution and clarity.</p>
        </div>
        <div className="packages-grid">
          <div 
            className={`package-card featured reveal-item ${selectedPackage === 'creation' ? 'selected' : ''}`}
            onClick={() => handlePackageClick('creation')}
            onKeyDown={(e) => handleKeyDown(e, 'creation')}
            tabIndex="0"
            role="button"
            aria-pressed={selectedPackage === 'creation'}
          >
            <h3>Creation Package</h3>
            <p className="package-subtitle">Build your brand from zero or rebuild it right</p>
            <p className="package-for">For: New brands or complete rebuilds</p>
            <ul className="package-includes">
              <li>Brand foundation and strategy</li>
              <li>Visual identity and packaging design</li>
              <li>Shopify site design and build</li>
              <li>Content strategy and templates</li>
              <li>Social media setup and execution</li>
              <li>TikTok Shop and live shopping setup</li>
              <li>Ongoing content creation and posting</li>
              <li>Creative direction and optimization</li>
            </ul>
            <div className="package-outcome">
              <strong>Outcome:</strong> A complete brand system that looks premium, consistent content across platforms, and commerce infrastructure ready to sell.
            </div>
            <a href="#contact" className="btn" style={{ width: '100%' }}>Book a Call</a>
          </div>
          <div 
            className={`package-card reveal-item ${selectedPackage === 'enhancement' ? 'selected' : ''}`}
            onClick={() => handlePackageClick('enhancement')}
            onKeyDown={(e) => handleKeyDown(e, 'enhancement')}
            tabIndex="0"
            role="button"
            aria-pressed={selectedPackage === 'enhancement'}
          >
            <h3>Enhancement Package</h3>
            <p className="package-subtitle">Elevate an existing brand with execution and optimization</p>
            <p className="package-for">For: Existing brands needing elevation</p>
            <ul className="package-includes">
              <li>Visual and content audit</li>
              <li>Strategic refinement and positioning</li>
              <li>Content upgrade and systems</li>
              <li>Social media management and posting</li>
              <li>Shopify optimization (if applicable)</li>
              <li>Creative execution and asset creation</li>
              <li>Ongoing management and optimization</li>
            </ul>
            <div className="package-outcome">
              <strong>Outcome:</strong> Your brand looks more premium, content is consistent, and you stop worrying about execution. Clarity and momentum.
            </div>
            <a href="#contact" className="btn" style={{ width: '100%' }}>Book a Call</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Packages
