import { useEffect, useRef, useState } from 'react'

export function BubbleBackground({ children, interactive = true }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateDimensions = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--bg-0)',
        overflow: 'hidden'
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      <AnimatedBubbles 
        width={dimensions.width} 
        height={dimensions.height}
        interactive={interactive}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

function AnimatedBubbles({ width, height, interactive }) {
  const [bubbles, setBubbles] = useState([])
  const [mousePos, setMousePos] = useState({ x: width / 2, y: height / 2 })
  const rafRef = useRef()

  useEffect(() => {
    if (!width || !height) return

    // Initialize bubbles
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 40 + 20,
      targetX: Math.random() * width,
      targetY: Math.random() * height
    }))

    setBubbles(initialBubbles)

    // Animation loop
    const animate = () => {
      setBubbles(prev => prev.map(bubble => {
        let { x, y, vx, vy, targetX, targetY, radius } = bubble

        // Spring physics towards target
        const dx = targetX - x
        const dy = targetY - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 5) {
          vx += dx * 0.0001
          vy += dy * 0.0001
        } else {
          // New random target
          targetX = Math.random() * width
          targetY = Math.random() * height
        }

        // Mouse interaction
        if (interactive) {
          const mouseDistance = Math.sqrt(
            Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2)
          )
          const minDistance = 150

          if (mouseDistance < minDistance) {
            const angle = Math.atan2(y - mousePos.y, x - mousePos.x)
            const force = (minDistance - mouseDistance) / minDistance
            vx += Math.cos(angle) * force * 0.5
            vy += Math.sin(angle) * force * 0.5
          }
        }

        // Apply velocity with damping
        vx *= 0.95
        vy *= 0.95
        x += vx
        y += vy

        // Bounce off walls
        if (x < radius) {
          x = radius
          vx = Math.abs(vx)
        }
        if (x > width - radius) {
          x = width - radius
          vx = -Math.abs(vx)
        }
        if (y < radius) {
          y = radius
          vy = Math.abs(vy)
        }
        if (y > height - radius) {
          y = height - radius
          vy = -Math.abs(vy)
        }

        return { ...bubble, x, y, vx, vy, targetX, targetY }
      }))

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [width, height, mousePos, interactive])

  const handleMouseMove = (e) => {
    if (!interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  if (!width || !height) return null

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactive ? 'auto' : 'none'
      }}
    >
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          filter: 'url(#goo)'
        }}
      >
        {bubbles.map(bubble => (
          <circle
            key={bubble.id}
            cx={bubble.x}
            cy={bubble.y}
            r={bubble.radius}
            fill="rgba(233, 208, 144, 0.6)"
            style={{
              transition: 'cx 0.1s, cy 0.1s'
            }}
          />
        ))}
      </svg>
    </div>
  )
}
