import { useEffect, useRef } from 'react'

function About() {
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

  const teamMembers = [
    { role: "Founder & Managing Director", description: "Strategic vision, client relationships, execution standards" },
    { role: "Project Manager", description: "Project coordination, timelines, client communication" },
    { role: "Creative Director", description: "Brand strategy, visual identity, creative direction" },
    { role: "Developer (Shopify/Frontend)", description: "Shopify builds, optimization, technical execution" },
    { role: "Social Media Manager", description: "Content creation, daily posting, community engagement" },
    { role: "Search & GEO Specialist", description: "SEO strategy, content discoverability, technical SEO" }
  ]

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-content reveal-item">
          <h2>About Ascent</h2>
          <p>We're a done-for-you creative agency built for small business founders who are tired of juggling freelancers and managing execution themselves.</p>
          <p>Our model is simple: you hire us so you don't have to think. We handle brand creation, content systems, social execution, and commerce infrastructure from start to finish.</p>
          <p>No fluff. No corporate buzzwords. Just consistent, high-quality execution designed to make your brand look premium and show up daily.</p>
        </div>

        <div className="section-header reveal-item" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h2>Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member reveal-item">
              <div className="team-avatar">Photo</div>
              <h3>{member.role}</h3>
              <p>{member.description}</p>
              <a href="#" className="team-linkedin" aria-label="LinkedIn profile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="podcast-section reveal-item" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h3>Podcast & Links</h3>
          <div className="podcast-links">
            <a href="#">Spotify</a>
            <a href="#">Apple Podcasts</a>
            <a href="#">YouTube</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
