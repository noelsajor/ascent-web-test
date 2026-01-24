import { useEffect, useRef } from 'react'

function TikTok() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

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
    <section className="tiktok-section" ref={sectionRef}>
      <div className="container">
        <div className="tiktok-content reveal-item">
          <h2>We Build Content to Sell, Not Just to Post</h2>
          <p>Most agencies post content and hope it works. We build content systems designed for commerce — TikTok Shop, live shopping, product demos, and content that converts.</p>
          <p>This is where brand-building meets actual revenue.</p>
        </div>
        <div className="tiktok-features">
          <div className="tiktok-feature reveal-item">
            <h3>TikTok Shop Setup</h3>
            <p>Full shop configuration, product listings, optimization for discoverability, and integration with your content strategy.</p>
          </div>
          <div className="tiktok-feature reveal-item">
            <h3>Live Shopping Content</h3>
            <p>Scripted live sessions, product demos, and real-time engagement designed to drive sales during streams.</p>
          </div>
          <div className="tiktok-feature reveal-item">
            <h3>Product Content Systems</h3>
            <p>Repeatable templates for demos, UGC-style content, and value-driven posts that sell without feeling salesy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TikTok
