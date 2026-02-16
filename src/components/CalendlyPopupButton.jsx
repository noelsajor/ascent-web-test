import { useEffect } from "react";

const CALENDLY_URL =
  "https://calendly.com/noelsajor/new-meeting?hide_gdpr_banner=1&utm_source=website&utm_medium=cta&utm_campaign=booking";

export default function CalendlyPopupButton({ label = "Book a Call" }) {
  useEffect(() => {
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <button onClick={openCalendly} className="btn-primary">
      {label}
    </button>
  );
}
