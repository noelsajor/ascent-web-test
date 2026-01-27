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
          <form className="contact-form reveal-item" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand / Website</label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="yourbrand.com or brand name"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product">What do you sell?</label>
              <input
                type="text"
                id="product"
                name="product"
                placeholder="Skincare, apparel, home goods, etc."
                value={formData.product}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="challenge">Biggest challenge right now</label>
              <textarea
                id="challenge"
                name="challenge"
                placeholder="What's overwhelming you or holding you back?"
                value={formData.challenge}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Submit & Book Call</button>
          </form>
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
