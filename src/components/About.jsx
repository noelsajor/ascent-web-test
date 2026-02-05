import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareLinkedin, faSpotify, faApple, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// ✅ Import local images so Vite/Vercel can bundle them correctly
import ethanAvatar from '../assets/ethan.webp'
import andreaSAvatar from '../assets/andrea_s.webp'
import albertoAvatar from '../assets/alberto.webp'
import joseAvatar from '../assets/jose.webp'
import kimAvatar from '../assets/kim.webp'
import lourdesAvatar from '../assets/lourdes.webp'
import andreaMAvatar from '../assets/andrea_m.webp'

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

  // ✅ Use imported avatars here (NOT "src/assets/...")
  const teamMembers = [
    {
      role: 'Founder & Managing Director',
      description: 'Strategic vision, client relationships, execution standards',
      name: 'Ethan Barak',
      avatar: ethanAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/ethan-barak-40305aa1/'
    },
    {
      role: 'Project Manager',
      description: 'Project coordination, timelines, client communication',
      name: 'Andrea Del Sol',
      avatar: andreaSAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/andreadelsol/'
    },
    {
      role: 'Creative Director',
      description: 'Brand strategy, visual identity, creative direction',
      name: 'Alberto Olivero',
      avatar: albertoAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/ajolivero/'
    },
    {
      role: 'Developer (Shopify/Frontend)',
      description: 'Shopify builds, optimization, technical execution',
      name: 'Jose Leon',
      avatar: joseAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/noelsajor/'
    },
    {
      role: 'Social Media Manager',
      description: 'Content creation, daily posting, community engagement',
      name: 'Kimberly Salamanca',
      avatar: kimAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/kimberly-salamanca-gonzalez-560708a7/?locale=en_US'
    },
    {
      role: 'Search & GEO Specialist',
      description: 'SEO strategy, content discoverability, technical SEO',
      name: 'Lourdes Uzcategui',
      avatar: lourdesAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/lourdes-m-uzc%C3%A1tegui-brice%C3%B1o/'
    },
    {
      role: 'Content Producer',
      description: 'shoots, edits, delivers short-form + long-form content',
      name: 'Andrea Mikaty',
      avatar: andreaMAvatar,
      linkedinUrl: 'https://www.linkedin.com/in/andrea-mikaty-142654306/'
    }
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
              <div className="team-avatar">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={`${member.name || member.role} profile photo`}
                    loading="lazy"
                    width="120"
                    height="120"
                  />
                ) : (
                  'Photo'
                )}
              </div>

              <h3>{member.name}</h3>
              <p>{member.role}</p>

              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  className="team-linkedin"
                  aria-label={`${member.name || member.role} LinkedIn profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <FontAwesomeIcon icon={faSquareLinkedin} />
                </a>
              ) : null}
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
