import { useEffect, useRef } from 'react'

function Testimonials() {
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

  const testimonials = [
    {
      quote: "They took everything off my plate. I was juggling three freelancers and still stressed about consistency. Now I don't think about it — they just handle it.",
      author: "Sarah Chen",
      role: "Founder, Skincare Brand"
    },
    {
      quote: "Content is finally consistent. Our brand actually looks legit now. Before, it felt scattered and DIY. Ascent made it look premium without the BS agency fluff.",
      author: "Marcus Rivera",
      role: "Co-Founder, Home Goods"
    },
    {
      quote: "I hired them because I didn't want to think anymore. Best decision. They execute, keep me updated, and I can focus on running the business instead of chasing creatives.",
      author: "Jennifer Park",
      role: "Owner, Fashion Brand"
    }
  ]

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal-item">
          <h2>What Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card reveal-item">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-author">{testimonial.author}</p>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
