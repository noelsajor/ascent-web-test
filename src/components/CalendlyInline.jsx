import { useEffect } from "react";

const CALENDLY_URL =
  "https://calendly.com/noelsajor/new-meeting?hide_gdpr_banner=1";

export default function CalendlyInline({
  className = "",
  height = 760, // adjust if you want taller/shorter
}) {
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className} style={{ width: "100%" }}>
      <div
        className="calendly-inline-widget"
        data-url={CALENDLY_URL}
        style={{ minWidth: 320, width: "100%", height }}
      />
    </div>
  );
}
