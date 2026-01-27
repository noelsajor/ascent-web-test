import { useEffect, useRef } from 'react'

function Privacy() {
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
    <section className="privacy-section" id="privacy" ref={sectionRef}>
      <div className="container">
        <div className="privacy-content reveal-item">
          <h1>Privacy Policy</h1>
          <p style={{ marginBottom: 'var(--spacing-xl)' }}>Last updated: January 2026</p>

          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us when you fill out forms, book calls, or communicate with our team. This includes your name, email, business details, and any information you choose to share about your brand or challenges.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries, schedule consultations, provide estimates, and deliver our services. We may also use your information to send occasional updates about our services if you've opted in.</p>

          <h2>Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share information with service providers who assist us in operating our business (such as email services or scheduling tools), but only to the extent necessary to provide those services.</p>

          <h2>Data Security</h2>
          <p>We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>

          <h2>Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time. Contact us directly to exercise these rights.</p>

          <h2>Contact</h2>
          <p>If you have questions about this privacy policy or how we handle your information, please contact us through the contact form or at the email provided on our website.</p>
        </div>
      </div>
    </section>
  )
}

export default Privacy
