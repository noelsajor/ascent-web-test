import { useEffect, useRef } from 'react'

function Babysitter() {
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

  return (
    <section className="babysitter" ref={sectionRef}>
      <div className="container">
        <div className="babysitter-content reveal-item">
          <h2>You don't need 50 freelancers. You need one team that executes.</h2>
          <p className="babysitter-subtitle">
            You hire us so you don’t have to think about brand, content, posting, site builds, or creative strategy. We handle it end-to-end.
          </p>
        </div>

        {/* 
        <div className="takeaway-grid">
          <div className="takeaway-card reveal-item">
            <h3>No More Vendor Juggling</h3>
            <p>Stop coordinating between designers, developers, social managers, and content creators. One partner handles everything.</p>
          </div>
          <div className="takeaway-card reveal-item">
            <h3>Execution Without Oversight</h3>
            <p>You shouldn't have to micromanage posting schedules, creative reviews, or campaign launches. We execute and keep you updated.</p>
          </div>
          <div className="takeaway-card reveal-item">
            <h3>Consistency You Can Trust</h3>
            <p>Your brand shows up daily with clarity and quality. No more gaps, no more scrambling for content, no more inconsistency.</p>
          </div>
        </div>
        */}
      </div>
    </section>
  )
}

export default Babysitter
