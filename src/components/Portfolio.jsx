import { useEffect, useRef } from 'react'

function Portfolio() {
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

  const portfolioItems = [
    {
      id: 'nuud-pleasures',
      tags: ['Wellness', 'E-commerce', 'Brand'],
      title: 'NUUD Pleasures',
      description: 'Sexual enhancement and wellness products.',
      url: 'https://nuudpleasures.com/'
    },
    {
      id: 'strike',
      tags: ['Legal THC', 'E-commerce', 'Brand'],
      title: 'Strike',
      description: 'Legal THC products.',
      url: 'https://strikebrands.co/'
    },
    {
      id: 'sana-honey',
      tags: ['Supplements', 'Health', 'Brand'],
      title: 'SANA Honey',
      description: 'Honey-based supplements.',
      url: 'https://www.sanahoney.com/'
    }
  ]

  return (
    <section className="portfolio" id="work" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Selected Work</h2>
          <p>Brand systems and content execution designed to support growth and clarity.</p>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map(item => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-item reveal-item">
              <div className="portfolio-image">Image Preview</div>
              <div className="portfolio-content">
                <div className="portfolio-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="portfolio-tag">{tag}</span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="portfolio-link">Visit Website →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
