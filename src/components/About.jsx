import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareLinkedin, faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed')
            }, 100)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    revealItems.forEach((item) => revealObserver.observe(item))
    return () => revealObserver.disconnect()
  }, [])

  const teamMembers = [
    { role: 'Founder & Managing Director', description: 'Strategic vision, client relationships, execution standards' },
    { role: 'Project Manager', description: 'Project coordination, timelines, client communication' },
    { role: 'Creative Director', description: 'Brand strategy, visual identity, creative direction' },
    { role: 'Developer (Shopify/Frontend)', description: 'Shopify builds, optimization, technical execution' },
    { role: 'Social Media Manager', description: 'Content creation, daily posting, community engagement' },
    { role: 'Search & GEO Specialist', description: 'SEO strategy, content discoverability, technical SEO' }
  ]

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-content reveal-item">
          <h2>About Ascent</h2>
          <p>
            We&apos;re a done-for-you creative agency built for small business founders who are tired of juggling
            freelancers and managing execution themselves.
          </p>
          <p>
            Our model is simple: you hire us so you don&apos;t have to think. We handle brand creation, content systems,
            social execution, and commerce infrastructure from start to finish.
          </p>
          <p>
            No fluff. No corporate buzzwords. Just consistent, high-quality execution designed to make your brand look
            premium and show up daily.
          </p>
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

              <a
                href="#"
                className="team-linkedin"
                aria-label="LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSquareLinkedin} />
              </a>
            </div>
          ))}
        </div>

        <div className="podcast-section reveal-item" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <h3>Podcast &amp; Links</h3>

          <div className="podcast-links">
            <a
              href="https://spotify.com"
              aria-label="Spotify"
              target="_blank"
              rel="noopener noreferrer"
              title="Spotify"
            >
              <FontAwesomeIcon icon={faSpotify} />
            </a>

            <a
              href="https://podcasts.apple.com"
              aria-label="Apple Podcasts"
              target="_blank"
              rel="noopener noreferrer"
              title="Apple Podcasts"
            >
              <FontAwesomeIcon icon={faApple} />
            </a>

            <a
              href="https://youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>

            <a href="/newsletter" aria-label="Newsletter" title="Newsletter">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
