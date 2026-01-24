import { useEffect, useRef } from 'react'

function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

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

  return (
    <section className="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>How It Works</h2>
          <p>Three steps. No friction.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card reveal-item">
            <div className="step-number">01</div>
            <h3>Fill Out Short Form</h3>
            <p>Tell us what you sell, your biggest challenge, and where you are. Takes 2 minutes.</p>
          </div>
          <div className="step-card reveal-item">
            <div className="step-number">02</div>
            <h3>Book a Call</h3>
            <p>After submitting, you'll book a Calendly call directly. We review your needs and discuss fit.</p>
          </div>
          <div className="step-card reveal-item">
            <div className="step-number">03</div>
            <h3>We Send Estimate & Start</h3>
            <p>After the call, we send a pricing estimate. Once approved, we start executing.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
