import CalendlyPopupButton from "./CalendlyPopupButton";

function FinalCTA() {
  return (
    <section>
      <div className="container">
        <div className="final-cta">
          <h2>Ready to Stop Thinking and Start Executing?</h2>
          <p>Fill out the short form, book a call, and we'll review your needs. Pricing estimate shared after the call.</p>
          <CalendlyPopupButton label="Book a Call" className="btn" />
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
