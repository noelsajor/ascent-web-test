import { useEffect, useRef } from 'react'

export function BubbleBackground({ children, interactive = true }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    let width, height, bubbles = [], mouseX = width / 2, mouseY = height / 2, animationFrameId

    class Bubble {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = height + Math.random() * 200
        // MUCH LARGER bubbles (8-30px radius instead of 1-4px)
        this.radius = Math.random() * 22 + 8
        // SLOWER speed for smoother floating
        this.speedY = Math.random() * 0.4 + 0.15
        this.speedX = (Math.random() - 0.5) * 0.25
        // MORE VISIBLE opacity
        this.opacity = Math.random() * 0.3 + 0.15
        this.wobble = Math.random() * 0.03
        this.wobbleSpeed = Math.random() * 0.015 + 0.008
        this.wobbleOffset = Math.random() * Math.PI * 2
        // Add glow effect
        this.glowSize = this.radius * 1.5
      }

      update(deltaTime) {
        // Float upward
        this.y -= this.speedY * deltaTime * 0.05
        
        // Side-to-side wobble
        this.wobbleOffset += this.wobbleSpeed * deltaTime * 0.001
        this.x += Math.sin(this.wobbleOffset) * this.wobble * deltaTime * 0.05
        
        // Horizontal drift
        this.x += this.speedX * deltaTime * 0.05
        
        // Mouse interaction - bubbles move AWAY from cursor
        if (interactive) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = 200
          
          if (distance < minDistance) {
            const force = (minDistance - distance) / minDistance
            this.x += (dx / distance) * force * 1.2
            this.y += (dy / distance) * force * 1.2
          }
        }
        
        // Reset when out of bounds
        if (this.y < -100) {
          this.y = height + 100
          this.x = Math.random() * width
        }
        if (this.x < -100) this.x = width + 100
        if (this.x > width + 100) this.x = -100
      }

      draw() {
        // Draw glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize)
        gradient.addColorStop(0, `rgba(233, 208, 144, ${this.opacity * 0.6})`)
        gradient.addColorStop(0.5, `rgba(233, 208, 144, ${this.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(233, 208, 144, 0)')
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Draw main bubble
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(233, 208, 144, ${this.opacity})`
        ctx.fill()
        
        // Add subtle highlight
        const highlight = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.6
        )
        highlight.addColorStop(0, `rgba(243, 225, 181, ${this.opacity * 0.8})`)
        highlight.addColorStop(1, 'rgba(243, 225, 181, 0)')
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = highlight
        ctx.fill()
      }
    }

    function resizeCanvas() {
      width = container.offsetWidth
      height = container.offsetHeight
      canvas.width = width
      canvas.height = height
      mouseX = width / 2
      mouseY = height / 2
    }

    function initBubbles() {
      bubbles = []
      // FEWER bubbles but much more visible (was /8000, now /15000)
      const bubbleCount = Math.max(15, Math.floor((width * height) / 15000))
      console.log('🫧 Creating', bubbleCount, 'bubbles')
      
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble()
        // Spread bubbles throughout the screen initially
        bubble.y = Math.random() * height
        bubbles.push(bubble)
      }
    }

    let lastTime = 0
    function animate(currentTime) {
      const deltaTime = Math.min(currentTime - lastTime, 50) // Cap delta time
      lastTime = currentTime
      
      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(12, 13, 15, 0.05)'
      ctx.fillRect(0, 0, width, height)
      
      bubbles.forEach(bubble => {
        if (!prefersReducedMotion) {
          bubble.update(deltaTime)
        }
        bubble.draw()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = width / 2
      mouseY = height / 2
    }

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }
    
    // Initialize after a brief delay
    setTimeout(() => {
      resizeCanvas()
      initBubbles()
      animate(0)
    }, 50)

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
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [interactive])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--bg-0)'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
