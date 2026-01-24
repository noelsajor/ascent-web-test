import { useEffect, useRef, useState } from 'react'

export function BubbleBackground({ children, interactive = true }) {
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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

    const initialBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 50 + 30,
      targetX: Math.random() * width,
      targetY: Math.random() * height
    }))

    setBubbles(initialBubbles)

    const animate = () => {
      setBubbles(prev => prev.map(bubble => {
        let { x, y, vx, vy, targetX, targetY, radius } = bubble

        const dx = targetX - x
        const dy = targetY - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 5) {
          vx += dx * 0.0002
          vy += dy * 0.0002
        } else {
          targetX = Math.random() * width
          targetY = Math.random() * height
        }

        if (interactive) {
          const mouseDistance = Math.sqrt(
            Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2)
          )
          const minDistance = 200

          if (mouseDistance < minDistance) {
            const angle = Math.atan2(y - mousePos.y, x - mousePos.x)
            const force = (minDistance - mouseDistance) / minDistance
            vx += Math.cos(angle) * force * 0.8
            vy += Math.sin(angle) * force * 0.8
          }
        }

        vx *= 0.98
        vy *= 0.98
        x += vx
        y += vy

        if (x < radius) { x = radius; vx = Math.abs(vx) }
        if (x > width - radius) { x = width - radius; vx = -Math.abs(vx) }
        if (y < radius) { y = radius; vy = Math.abs(vy) }
        if (y > height - radius) { y = height - radius; vy = -Math.abs(vy) }

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
            fill="rgba(255, 255, 255, 0.15)"
            style={{
              transition: 'cx 0.05s, cy 0.05s'
            }}
          />
        ))}
      </svg>
    </div>
  )
}
