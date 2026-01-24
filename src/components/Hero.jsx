import { BubbleBackground } from './ui/bubble-background'

function Hero() {
  return (
    <BubbleBackground interactive={true}>
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge">Done-For-You Agency</span>
            </div>
            <h1>
              Brand Creation &
              <br />
              Growth Package
            </h1>
            <p className="hero-subtitle">
              Done-for-you brand building from idea to execution. We create the brand, 
              build the content, run your social, and set up commerce that sells.
            </p>
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
    </BubbleBackground>
  )
}

export default Hero
