import { useEffect, useRef } from 'react'

function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width, height, bubbles = [], mouseX = 0, mouseY = 0, animationFrameId

    class Bubble {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * width
        this.y = height + Math.random() * 100
        this.radius = Math.random() * 3 + 1
        this.speedY = Math.random() * 0.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.15 + 0.05
        this.wobble = Math.random() * 0.02
        this.wobbleSpeed = Math.random() * 0.02 + 0.01
        this.wobbleOffset = Math.random() * Math.PI * 2
      }
      update(deltaTime) {
        this.y -= this.speedY * deltaTime * 0.06
        this.wobbleOffset += this.wobbleSpeed * deltaTime * 0.001
        this.x += Math.sin(this.wobbleOffset) * this.wobble * deltaTime * 0.06
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const minDistance = 120
        if (distance < minDistance) {
          const force = (minDistance - distance) / minDistance
          this.x += (dx / distance) * force * 0.5
          this.y += (dy / distance) * force * 0.5
        }
        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset()
        }
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(233, 208, 144, ${this.opacity})`
        ctx.fill()
      }
    }

    function resizeCanvas() {
      const heroSection = canvas.parentElement
      width = heroSection.offsetWidth
      height = heroSection.offsetHeight
      canvas.width = width
      canvas.height = height
    }

    function initBubbles() {
      bubbles = []
      const bubbleCount = Math.floor((width * height) / 8000)
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble())
      }
    }

    let lastTime = 0
    function animate(currentTime) {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      ctx.clearRect(0, 0, width, height)
      bubbles.forEach(bubble => {
        if (!prefersReducedMotion) {
          bubble.update(deltaTime)
        }
        bubble.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    resizeCanvas()
    initBubbles()
    animate(0)

    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        initBubbles()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="bubble-canvas" id="bubbleCanvas"></canvas>
      <div className="container">
        <div className="hero-content">
          <h1>Brand Creation & Growth Package</h1>
          <p className="hero-subtitle">Done-for-you brand building from idea to execution. We create the brand, build the content, run your social, and set up commerce that sells.</p>
          <ul className="proof-points">
            <li>We handle execution end-to-end</li>
            <li>Content-first brand building</li>
            <li>Social commerce ready (TikTok Shop + live shopping)</li>
          </ul>
          <div className="cta-group">
            <a href="#contact" className="btn">Book a Call</a>
            <a href="#work" className="btn btn-secondary">View Work</a>
          </div>
          <p className="cta-note">Limited spots monthly — we protect quality</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
