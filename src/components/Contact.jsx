import { useState, useEffect, useRef } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    product: '',
    challenge: '',
    email: ''
  })
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
    alert('Thank you! Form submitted successfully.')
  }

  return (
    <section className="contact-form-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Book a Call</h2>
          <p>Fill out the form below and book your call directly. We'll review and send an estimate after.</p>
        </div>
        <div className="form-wrapper">
          <div className="calendly-inline-widget" data-url="https://calendly.com/YOUR_LINK/30min" style={{ minWidth: '320px', height: '700px' }}></div>
          <div className="calendly-placeholder reveal-item">
            <p><strong>Calendly Embed Here</strong></p>
            <p style={{ marginTop: 'var(--spacing-sm)' }}>After submitting, you'll be able to book your call directly on this page.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
