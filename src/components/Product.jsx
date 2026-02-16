import { useEffect, useRef } from 'react'
import CalendlyPopupButton from "./CalendlyPopupButton";


function Product() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
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
    <section className="product-section" id="product" ref={sectionRef}>
      <div className="container">
        <div className="product-hero reveal-item">
          <h1>Brand Creation & Growth Package</h1>
          <p className="subtitle">The flagship done-for-you solution for building and scaling your brand</p>
        </div>
        <div className="product-grid">
          <div className="product-block reveal-item">
            <h2>What It Is</h2>
            <p>A complete brand-building system that takes you from idea to execution. We create your brand identity, build your site, set up content systems, manage your social, and integrate commerce infrastructure like TikTok Shop.</p>
            <p>You get a team that handles everything so you can focus on running your business.</p>
          </div>
          <div className="product-block reveal-item">
            <h2>Who It's For</h2>
            <p><strong>Perfect for:</strong></p>
            <ul>
              <li>New brands starting from zero</li>
              <li>Existing brands needing a complete rebuild</li>
              <li>Founders overwhelmed by managing multiple freelancers</li>
              <li>Brands ready to show up consistently with quality</li>
            </ul>
            <p style={{ marginTop: 'var(--spacing-md)' }}><strong>Not for:</strong></p>
            <ul>
              <li>DIY founders who want to manage parts themselves</li>
              <li>Large companies with internal teams</li>
              <li>Brands looking for quick fixes or shortcuts</li>
            </ul>
          </div>
        </div>
        <div className="product-grid">
          <div className="product-block reveal-item">
            <h2>What You Get</h2>
            <ul>
              <li>Brand foundation: strategy, positioning, messaging</li>
              <li>Visual identity: logo, typography, color systems</li>
              <li>Packaging design and print-ready files</li>
              <li>Shopify site: design, build, and optimization</li>
              <li>Content strategy and templates</li>
              <li>Social media setup and daily execution</li>
              <li>TikTok Shop configuration and live shopping content</li>
              <li>Ongoing creative direction and optimization</li>
              <li>Monthly performance reviews and strategic adjustments</li>
            </ul>
          </div>
          <div className="product-block reveal-item">
            <h2>The Process</h2>
            <p><strong>Week 1–2:</strong> Discovery, brand strategy, competitive audit</p>
            <p><strong>Week 3–6:</strong> Visual identity creation, site build, content systems</p>
            <p><strong>Week 7–8:</strong> Refinement, launch prep, social setup</p>
            <p><strong>Week 9+:</strong> Launch, ongoing execution, content creation, optimization</p>
            <p style={{ marginTop: 'var(--spacing-md)' }}>Timeline varies based on scope. Most projects are 8–12 weeks to launch, then ongoing execution as needed.</p>
          </div>
        </div>
        <div className="product-cta reveal-item">
          <h2>Let's Talk</h2>
          <p>Fill out the short form and book a call. We'll review your needs and send a pricing estimate after the call.</p>
          <CalendlyPopupButton label="Book a Call" className="btn" />
          <p className="product-note">Pricing shared after reviewing your specific needs</p>
        </div>
      </div>
    </section>
  )
}

export default Product
