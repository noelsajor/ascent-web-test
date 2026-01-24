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
      id: 'clean-skincare',
      tags: ['Brand', 'Content', 'Shopify'],
      title: 'Skincare DTC Brand',
      description: 'Complete brand creation, packaging system, Shopify build, and content strategy. From zero to launch with consistent posting and product content systems.'
    },
    {
      id: 'wellness-launch',
      tags: ['Brand', 'Social', 'TikTok Shop'],
      title: 'Wellness Product Launch',
      description: 'Brand identity, TikTok Shop setup, live shopping content, and daily social execution. Built to sell through content from day one.'
    },
    {
      id: 'home-goods',
      tags: ['Content', 'Social', 'Creative'],
      title: 'Home Goods Brand',
      description: 'Visual refresh, product photography direction, ongoing content creation, and social media management. Consistent execution with brand clarity.'
    },
    {
      id: 'fashion-accessories',
      tags: ['Brand', 'Shopify', 'Content'],
      title: 'Fashion Accessories',
      description: 'Full brand system, Shopify Plus build, content templates, and creative strategy. Designed for scale with content infrastructure.'
    },
    {
      id: 'beverage-relaunch',
      tags: ['Brand', 'Social'],
      title: 'Beverage Brand Relaunch',
      description: 'Complete brand overhaul, packaging redesign, social content strategy, and daily execution across platforms. Premium positioning, consistent output.'
    },
    {
      id: 'tech-accessories',
      tags: ['TikTok Shop', 'Content', 'Social'],
      title: 'Tech Accessories Launch',
      description: 'TikTok Shop optimization, live shopping content creation, product demos, and ongoing social execution. Content built to convert.'
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
            <a key={item.id} href={`#project-${item.id}`} className="portfolio-item reveal-item">
              <div className="portfolio-image">Image Preview</div>
              <div className="portfolio-content">
                <div className="portfolio-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="portfolio-tag">{tag}</span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="portfolio-link">View Project →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
