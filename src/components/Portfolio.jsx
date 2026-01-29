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
      id: 'sana-honey',
      tags: ['Supplements', 'Health', 'Brand'],
      title: 'SANA Honey',
      description: 'Refreshed the e-commerce experience to highlight the unique honey-based form factor. Implemented a subscription-first approach and produced lifestyle content that positioned the brand as a daily wellness essential.',
      url: 'https://www.sanahoney.com/'
    },
    {
      id: 'nuud-pleasures',
      tags: ['Wellness', 'E-commerce', 'Brand'],
      title: 'NUUD Pleasures',
      description: 'End-to-end brand architecture and Shopify build. We developed a compliance-friendly content strategy that navigates sensitive ad policies while building community through education on intimacy and adaptogens.',
      url: 'https://nuudpleasures.com/'
    },
    {
      id: 'strike',
      tags: ['Legal THC', 'E-commerce', 'Brand'],
      title: 'Strike',
      description: 'Launched the digital flagship for this premium legal THC brand. Focused on high-impact visual storytelling and a conversion-optimized user flow that educates customers on product quality and safety.',
      url: 'https://strikebrands.co/'
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
