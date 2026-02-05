import { useEffect, useRef } from 'react'

function TikTok() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const revealItems = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!revealItems) return

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = entry.target.parentElement
            const siblings = Array.from(container.querySelectorAll('.reveal-item'))
            const itemIndex = siblings.indexOf(entry.target)
            const delay = Math.min(itemIndex * 75, 240)

            setTimeout(() => entry.target.classList.add('revealed'), delay)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    revealItems.forEach((item) => revealObserver.observe(item))
    return () => revealObserver.disconnect()
  }, [])

  // ✅ Convert watch URLs to embed URLs
  const videos = {
    featured: {
      title: 'Featured: Ascent content system example',
      embed: 'https://www.youtube-nocookie.com/embed/wjmEjd4h64Q',
      watch: 'https://www.youtube.com/watch?v=wjmEjd4h64Q'
    },
    secondary1: {
      title: 'More: Live / commerce content',
      embed: 'https://www.youtube-nocookie.com/embed/H5aM1w7OX44',
      watch: 'https://www.youtube.com/watch?v=H5aM1w7OX44'
    },
    secondary2: {
      title: 'More: Product content / demo',
      embed: 'https://www.youtube-nocookie.com/embed/cifI20B01cc',
      watch: 'https://www.youtube.com/watch?v=cifI20B01cc'
    }
  }

  return (
    <section className="tiktok-section" ref={sectionRef} id="content">
      <div className="container">
        <div className="tiktok-content reveal-item">
          <h2>We Build Content to Sell, Not Just to Post</h2>
          <p>
            Most agencies post content and hope it works. We build content systems designed for commerce — TikTok Shop,
            live shopping, product demos, and content that converts.
          </p>
          <p>This is where brand-building meets actual revenue.</p>

          <div className="tiktok-links">
            <a className="btn btn-secondary" href="https://www.youtube.com/@AscentMgnt/shorts" target="_blank" rel="noreferrer">
              Watch Shorts
            </a>
            <a className="btn btn-secondary" href="https://www.youtube.com/@AscentMgnt/playlists" target="_blank" rel="noreferrer">
              View Playlists
            </a>
          </div>
        </div>

        {/* ✅ Featured + 2 more layout */}
        <div className="tiktok-media reveal-item">
          <div className="tiktok-media-grid">
            {/* Featured */}
            <article className="video-card video-card--featured">
              <div className="video-frame">
                <iframe
                  src={videos.featured.embed}
                  title={videos.featured.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="video-meta">
                <h3 className="video-title">Featured video</h3>
                <a className="video-link" href={videos.featured.watch} target="_blank" rel="noreferrer">
                  Watch on YouTube →
                </a>
              </div>
            </article>

            {/* Right column: two secondary videos */}
            <div className="video-stack">
              <article className="video-card">
                <div className="video-frame">
                  <iframe
                    src={videos.secondary1.embed}
                    title={videos.secondary1.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="video-meta">
                  <h3 className="video-title">More examples</h3>
                  <a className="video-link" href={videos.secondary1.watch} target="_blank" rel="noreferrer">
                    Watch on YouTube →
                  </a>
                </div>
              </article>

              <article className="video-card">
                <div className="video-frame">
                  <iframe
                    src={videos.secondary2.embed}
                    title={videos.secondary2.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="video-meta">
                  <h3 className="video-title">More examples</h3>
                  <a className="video-link" href={videos.secondary2.watch} target="_blank" rel="noreferrer">
                    Watch on YouTube →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Keep your existing feature cards if you want */}
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
