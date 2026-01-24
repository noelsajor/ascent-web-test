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
        
        if (interactive) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = 120
          
          if (distance < minDistance) {
            const force = (minDistance - distance) / minDistance
            this.x += (dx / distance) * force * 0.5
            this.y += (dy / distance) * force * 0.5
          }
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
      width = container.offsetWidth
      height = container.offsetHeight
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
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }
    
    setTimeout(() => {
      resizeCanvas()
      initBubbles()
      animate(0)
    }, 100)

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
