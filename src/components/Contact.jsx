import { useState, useEffect, useRef } from 'react'

const CALENDLY_URL = 'https://calendly.com/https://calendly.com/noelsajor/30min' //

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    product: '',
    challenge: '',
    email: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const sectionRef = useRef(null)
  const calendlyWrapRef = useRef(null)

  // Reveal animation (your existing code)
  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), 100)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    revealItems.forEach((item) => revealObserver.observe(item))
    return () => revealObserver.disconnect()
  }, [])

  // Load Calendly script once
  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js'
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)

    // optional: scroll user to the calendly widget area after submit
    setTimeout(() => {
      calendlyWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  // Build prefill + extra info (UTM-like) for Calendly
  const calendlyUrl = (() => {
    const url = new URL(CALENDLY_URL)

    // Prefill fields
    if (formData.name) url.searchParams.set('name', formData.name)
    if (formData.email) url.searchParams.set('email', formData.email)

    // Put your extra context into a single text field Calendly supports:
    // "a1" is a custom "answer" slot Calendly can map to questions (depending on setup),
    // but even if not mapped, it’s still handy as a single blob you can capture via your event workflows.
    const notes = [
      formData.brand ? `Brand/Website: ${formData.brand}` : '',
      formData.product ? `Sells: ${formData.product}` : '',
      formData.challenge ? `Challenge: ${formData.challenge}` : ''
    ]
      .filter(Boolean)
      .join('\n')

    if (notes) url.searchParams.set('a1', notes)

    return url.toString()
  })()

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
              />
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

            <button type="submit" className="btn" style={{ width: '100%' }}>
              Submit &amp; Book Call
            </button>
          </form>

          <div className="calendly-placeholder reveal-item" ref={calendlyWrapRef}>
            {!isSubmitted && (
              <>
                <p><strong>Book your call (step 2)</strong></p>
                <p style={{ marginTop: 'var(--spacing-sm)' }}>
                  Submit the form first — then you can book your call right here.
                </p>
              </>
            )}

            {/* Inline Calendly */}
            <div
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              style={{
                minWidth: 320,
                height: 700,
                marginTop: 'var(--spacing-md)',
                opacity: isSubmitted ? 1 : 0.35,
                pointerEvents: isSubmitted ? 'auto' : 'none',
                transition: 'opacity 0.25s ease'
              }}
            />

            {/* Optional small helper when locked */}
            {!isSubmitted && (
              <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.95em', opacity: 0.8 }}>
                Tip: once you submit, the calendar unlocks and your name/email will be prefilled.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
