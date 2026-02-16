import { useEffect, useCallback } from "react";

const CALENDLY_URL =
  "https://calendly.com/noelsajor/new-meeting?hide_gdpr_banner=1";

export default function CalendlyPopupButton({
  label = "Book a Call",
  className = "btn",
}) {
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onClick = useCallback((e) => {
    e.preventDefault();
    if (!window.Calendly) return;
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }, []);

  return (
    <a
      href={CALENDLY_URL}
      onClick={onClick}
      className={className}
      role="button"
    >
      {label}
    </a>
  );
}
