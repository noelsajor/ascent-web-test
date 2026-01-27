import { useEffect, useRef } from 'react'

function PackagesDetail() {
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
    <section className="packages-detail-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Package Details</h2>
          <p>Full breakdown of what's included, timelines, and what to expect.</p>
        </div>

        <div className="package-detail reveal-item">
          <h2>Creation Package</h2>
          <p>Build your brand from zero or rebuild it completely. Full execution from strategy to daily content.</p>
          
          <h3>What's Included</h3>
          <ul>
            <li>Brand strategy and positioning workshop</li>
            <li>Competitive audit and market analysis</li>
            <li>Logo and visual identity system</li>
            <li>Typography, color palette, and design guidelines</li>
            <li>Packaging design (labels, boxes, inserts)</li>
            <li>Print-ready files and vendor coordination</li>
            <li>Shopify site design and custom build</li>
            <li>Product page templates and content architecture</li>
            <li>Content strategy and posting calendars</li>
            <li>Social media setup (Instagram, TikTok, etc.)</li>
            <li>TikTok Shop configuration and optimization</li>
            <li>Live shopping content creation and scripting</li>
            <li>Ongoing content creation (photos, videos, graphics)</li>
            <li>Daily posting and community management</li>
            <li>Monthly strategy reviews and optimization</li>
          </ul>

          <div className="timeline-info">
            <strong>Timeline:</strong> 8–12 weeks to launch, then ongoing execution. Exact timeline depends on scope and complexity.
          </div>

          <h3>What's Not Included</h3>
          <ul>
            <li>Ad spend (we create content, you manage paid ads if desired)</li>
            <li>Product photography shoots (we direct, you coordinate)</li>
            <li>PR and influencer outreach</li>
            <li>Physical product creation or manufacturing</li>
          </ul>

          <a href="#contact" className="btn" style={{ marginTop: 'var(--spacing-lg)' }}>Book a Call</a>
        </div>

        <div className="package-detail reveal-item">
          <h2>Enhancement Package</h2>
          <p>Elevate an existing brand with strategic refinement and consistent execution.</p>
          
          <h3>What's Included</h3>
          <ul>
            <li>Brand and content audit</li>
            <li>Strategic refinement and positioning review</li>
            <li>Visual identity upgrade (if needed)</li>
            <li>Content systems and templates</li>
            <li>Social media management and daily posting</li>
            <li>Shopify optimization (speed, UX, design tweaks)</li>
            <li>Creative execution and asset creation</li>
            <li>TikTok Shop setup (if not already configured)</li>
            <li>Ongoing management and optimization</li>
            <li>Monthly performance reviews</li>
          </ul>

          <div className="timeline-info">
            <strong>Timeline:</strong> 4–6 weeks to implement upgrades, then ongoing execution.
          </div>

          <h3>What's Not Included</h3>
          <ul>
            <li>Complete brand overhaul (use Creation Package for that)</li>
            <li>Ad spend or media buying</li>
            <li>Full site rebuilds (minor optimizations only)</li>
          </ul>

          <a href="#contact" className="btn" style={{ marginTop: 'var(--spacing-lg)' }}>Book a Call</a>
        </div>
      </div>
    </section>
  )
}

export default PackagesDetail
