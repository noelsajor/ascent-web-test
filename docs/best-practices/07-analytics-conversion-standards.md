# Analytics & Conversion Tracking Standards

Traffic without tracking is meaningless for a marketing website. While Google Analytics 4 (GA4) tracks base pageviews implicitly via the snippet in `BaseLayout.astro`, you must set up specific tracking events to measure actual business impact.

## 1. Global Event Tracking Convention

We utilize a simple `data-track` HTML attribute methodology to track user interactions natively, without relying heavily on bloated Google Tag Manager containers.

Any actionable component (e.g., CTA buttons, phone numbers, form submissions) should have identifiable `data-*` attributes that a global listener script can pick up and forward to GA4/Meta Pixels.

### Example: Booking a call
```html
<a 
  href="/contact" 
  class="btn btn-primary"
  data-track="cta_click"
  data-track-name="Hero Book Call"
>
  Book a Discovery Call
</a>
```

## 2. Tracking Form Submissions (Lead Generation)

Form submissions (`contact.astro`, newsletter signups) are macro-conversions. 
When a form submits successfully, you should trigger an explicit event to GA4 `generate_lead`.

```javascript
// Vanilla JS Event Dispatcher Example
document.querySelector('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  // ... Handle form logic ...
  
  if (success && typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'Contact Form Submission'
    });
  }
});
```

## 3. Social Media Pixel Rules (Meta, TikTok)

If a clone of this brand runs paid ads, you need to embed Facebook (Meta) or TikTok pixels.
- **Rule**: NEVER inject these scripts blindly into `BaseLayout.astro` `<head>` unless they are wrapped inside your **Cookiebot** consent logic. Running marketing pixels without explicit user consent violates GDPR/CCPA and can get ad accounts banned.

```html
<!-- Correct Implementation with Cookiebot -->
<script type="text/plain" data-cookieconsent="marketing">
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return; /* ... Meta Pixel Code ... */ }
</script>
```

## 4. UTM Parameter Persistence

Service websites often rely on traffic from diverse sources. Ensure that if a user lands on the website with UTM tags (e.g., `?utm_source=linkedin&utm_medium=post`), those parameters are preserved.

- **Best Practice**: Use a lightweight vanilla JS script in `BaseLayout.astro` that captures URL parameters on load and attaches them as hidden input fields onto any forms on the page. This guarantees that your agency knows exactly which ad/post generated the specific lead.
