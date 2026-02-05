import { useState, useEffect, useRef, useId } from 'react'

function PackageIncludes({ items, defaultVisibleMobile = 4 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentId = useId()
  const listRef = useRef(null)

  const visible = items.slice(0, defaultVisibleMobile)
  const hidden = items.slice(defaultVisibleMobile)
  const total = items.length
  const hiddenCount = hidden.length

  const toggle = (e) => {
    // Prevent triggering the parent package-card onClick
    e.preventDefault()
    e.stopPropagation()
    setIsExpanded((v) => !v)
  }

  // Collapse if the package changes (new items list)
  useEffect(() => {
    setIsExpanded(false)
  }, [total])

  return (
    <div className="package-includes-wrap">
      {/* Desktop: show full list */}
      <ul className="package-includes package-includes--desktop">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      {/* Mobile: show first N + expand */}
      <div className="package-includes--mobile">
        <ul className="package-includes">
          {visible.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <>
            <div
              id={contentId}
              className={`package-includes-collapsible ${isExpanded ? 'is-expanded' : ''}`}
              style={{
                '--target-height':
                  isExpanded && listRef.current ? `${listRef.current.scrollHeight}px` : '0px'
              }}
            >
              <ul className="package-includes" ref={listRef}>
                {hidden.map((item, idx) => (
                  <li key={`${defaultVisibleMobile + idx}`}>{item}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="package-includes-toggle"
              onClick={toggle}
              aria-expanded={isExpanded}
              aria-controls={contentId}
            >
              {isExpanded ? 'Show less' : `Show all included (${total})`}
              <span className="package-includes-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('creation')
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current.querySelectorAll('.reveal-item')

    // Immediately reveal items that are already in viewport to prevent disappearing on re-render
    revealItems.forEach(item => {
      const rect = item.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (isInViewport) {
        item.classList.add('revealed')
      }
    })

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
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

    revealItems.forEach(item => {
      if (!item.classList.contains('revealed')) {
        revealObserver.observe(item)
      }
    })

    return () => revealObserver.disconnect()
  }, [selectedPackage])

  const handlePackageClick = (packageType) => {
    setSelectedPackage(packageType)
  }

  const handleKeyDown = (e, packageType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePackageClick(packageType)
    }
  }

  const creationItems = [
    'Brand foundation and strategy',
    'Visual identity and packaging design',
    'Shopify site design and build',
    'Content strategy and templates',
    'Social media setup and execution',
    'TikTok Shop and live shopping setup',
    'Ongoing content creation and posting',
    'Creative direction and optimization'
  ]

  const enhancementItems = [
    'Visual and content audit',
    'Strategic refinement and positioning',
    'Content upgrade and systems',
    'Social media management and posting',
    'Shopify optimization (if applicable)',
    'Creative execution and asset creation',
    'Ongoing management and optimization'
  ]

  return (
    <section className="packages-section" id="packages" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>Choose Your Package</h2>
          <p>Two packages designed for different stages. Both focused on execution and clarity.</p>
        </div>

        <div className="packages-grid">
          <div
            className={`package-card featured reveal-item ${selectedPackage === 'creation' ? 'selected' : ''}`}
            onClick={() => handlePackageClick('creation')}
            onKeyDown={(e) => handleKeyDown(e, 'creation')}
            tabIndex="0"
            role="button"
            aria-pressed={selectedPackage === 'creation'}
          >
            <h3>Creation Package</h3>
            <p className="package-subtitle">Build your brand from zero or rebuild it right</p>
            <p className="package-for">For: New brands or complete rebuilds</p>

            <PackageIncludes items={creationItems} defaultVisibleMobile={4} />

            <div className="package-outcome">
              <strong>Outcome:</strong> A complete brand system that looks premium, consistent content across platforms,
              and commerce infrastructure ready to sell.
            </div>
            <a href="#contact" className="btn" style={{ width: '100%' }}>Book a Call</a>
          </div>

          <div
            className={`package-card reveal-item ${selectedPackage === 'enhancement' ? 'selected' : ''}`}
            onClick={() => handlePackageClick('enhancement')}
            onKeyDown={(e) => handleKeyDown(e, 'enhancement')}
            tabIndex="0"
            role="button"
            aria-pressed={selectedPackage === 'enhancement'}
          >
            <h3>Enhancement Package</h3>
            <p className="package-subtitle">Elevate an existing brand with execution and optimization</p>
            <p className="package-for">For: Existing brands needing elevation</p>

            <PackageIncludes items={enhancementItems} defaultVisibleMobile={4} />

            <div className="package-outcome">
              <strong>Outcome:</strong> Your brand looks more premium, content is consistent, and you stop worrying about
              execution. Clarity and momentum.
            </div>
            <a href="#contact" className="btn" style={{ width: '100%' }}>Book a Call</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Packages
