import { useEffect, useRef } from 'react'

export function HeroGeometric({ badge, title1, title2, description, onBookCall, onViewWork }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let width, height, shapes = [], mouseX = 0, mouseY = 0, animationFrameId

        class GeometricShape {
            constructor() {
                this.reset()
            }

            reset() {
                this.x = Math.random() * width
                this.y = height + Math.random() * 200
                this.size = Math.random() * 40 + 20
                this.speedY = Math.random() * 0.3 + 0.2
                this.speedX = (Math.random() - 0.5) * 0.2
                this.rotation = Math.random() * Math.PI * 2
                this.rotationSpeed = (Math.random() - 0.5) * 0.02
                this.opacity = Math.random() * 0.15 + 0.05
                this.type = Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: triangle
                this.wobble = Math.random() * 0.01
                this.wobbleOffset = Math.random() * Math.PI * 2
            }

            update(deltaTime) {
                this.y -= this.speedY * deltaTime * 0.06
                this.x += this.speedX * deltaTime * 0.06
                this.rotation += this.rotationSpeed * deltaTime * 0.001
                this.wobbleOffset += 0.02 * deltaTime * 0.001
                this.x += Math.sin(this.wobbleOffset) * this.wobble * deltaTime * 0.06

                // Mouse interaction
                const dx = this.x - mouseX
                const dy = this.y - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)
                const minDistance = 150

                if (distance < minDistance) {
                    const force = (minDistance - distance) / minDistance
                    this.x += (dx / distance) * force * 0.8
                    this.y += (dy / distance) * force * 0.8
                }

                if (this.y < -100 || this.x < -100 || this.x > width + 100) {
                    this.reset()
                }
            }

            draw() {
                ctx.save()
                ctx.translate(this.x, this.y)
                ctx.rotate(this.rotation)
                ctx.globalAlpha = this.opacity

                const gradient = ctx.createLinearGradient(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2)
                gradient.addColorStop(0, 'rgba(233, 208, 144, 0.8)')
                gradient.addColorStop(1, 'rgba(243, 225, 181, 0.6)')

                switch (this.type) {
                    case 0: // Circle
                        ctx.beginPath()
                        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
                        ctx.strokeStyle = gradient
                        ctx.lineWidth = 2
                        ctx.stroke()
                        break

                    case 1: // Square
                        ctx.strokeStyle = gradient
                        ctx.lineWidth = 2
                        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
                        break

                    case 2: // Triangle
                        ctx.beginPath()
                        ctx.moveTo(0, -this.size / 2)
                        ctx.lineTo(this.size / 2, this.size / 2)
                        ctx.lineTo(-this.size / 2, this.size / 2)
                        ctx.closePath()
                        ctx.strokeStyle = gradient
                        ctx.lineWidth = 2
                        ctx.stroke()
                        break
                }

                ctx.restore()
            }
        }

        function resizeCanvas() {
            const heroSection = canvas.parentElement
            width = heroSection.offsetWidth
            height = heroSection.offsetHeight
            canvas.width = width
            canvas.height = height
        }

        function initShapes() {
            shapes = []
            const shapeCount = Math.floor((width * height) / 12000)
            for (let i = 0; i < shapeCount; i++) {
                shapes.push(new GeometricShape())
            }
        }

        let lastTime = 0
        function animate(currentTime) {
            const deltaTime = currentTime - lastTime
            lastTime = currentTime
            ctx.clearRect(0, 0, width, height)

            shapes.forEach(shape => {
                if (!prefersReducedMotion) {
                    shape.update(deltaTime)
                }
                shape.draw()
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
        initShapes()
        animate(0)

        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                resizeCanvas()
                initShapes()
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
            <canvas ref={canvasRef} className="bubble-canvas"></canvas>
            <div className="container">
                <div className="hero-content">
                    {badge && (
                        <div className="hero-badge">
                            <span className="badge">{badge}</span>
                        </div>
                    )}
                    <h1>
                        {title1}
                        <br />
                        {title2}
                    </h1>
                    <p className="hero-subtitle">{description}</p>
                    <ul className="proof-points">
                        <li>We handle execution end-to-end</li>
                        <li>Content-first brand building</li>
                        <li>Social commerce ready (TikTok Shop + live shopping)</li>
                    </ul>
                    <div className="cta-group">
                        <a href="#contact" className="btn" onClick={onBookCall}>
                            Book a Call
                        </a>
                        <a href="#work" className="btn btn-secondary" onClick={onViewWork}>
                            View Work
                        </a>
                    </div>
                    <p className="cta-note">Limited spots monthly — we protect quality</p>
                </div>
            </div>
        </section>
    )
}