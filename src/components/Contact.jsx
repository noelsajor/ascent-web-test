import { useEffect, useRef } from 'react'

function Contact() {
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
    <section className="contact-form-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Book a Call</h2>
          <p>Schedule a time directly on our calendar below.</p>
        </div>
        <div className="form-wrapper reveal-item">
          <div className="calendly-inline-widget" data-url="https://calendly.com/YOUR_LINK/30min" style={{ minWidth: '320px', height: '700px' }}></div>
        </div>
      </div>
    </section>
  )
}

export default Contact
