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
        ctx.fillSty
