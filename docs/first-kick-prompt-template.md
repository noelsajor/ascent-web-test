# First Kick Prompt Template

*Instructions for the User: Whenever you are ready to build a new website using this architecture, copy the text block below and paste it into your AI Agent's chat (Cursor, GitHub Copilot, Gemini, ChatGPT). Fill in the bracketed `[ ]` information before hitting send, and don't forget to upload your logo file to the chat!*

---

**✂️ [COPY EVERYTHING BELOW THIS LINE] ✂️**

You are an elite, expert AI software engineer and technical architect. Your task is to clone and re-brand this Astro + Sanity marketing repository to build a high-performance website for a new brand.

Before making any modifications or writing any code, you **MUST** read the root architecture guide: `SEO-first-marketing-website.md`. That document is your strict operating manual. Inside it, you will find a mandatory directive to read 7 specific best-practice S.O.P.s located inside the `docs/best-practices/` folder. They cover SEO, UI/UX, Astro guidelines, QA Testing, Sanity CMS Schema, Cybersecurity, and Analytics. You must enforce every single rule and standard inside those documents while executing this prompt.

Here are the specifics for the new website build:

**1. Brand Name:**
[Enter the new Brand Name here]

**2. Brand Overview & Value Proposition:**
[Write a 2-4 sentence overview of what the company does, their main product/service, who their target audience is, and what the general tone of voice should be (e.g., Professional and sharp, fun and quirky, luxurious and elegant).]

**3. Color Palette & Typography Guidelines:**
- **Primary Color:** [e.g., #FF5733 / Vibrant Orange]
- **Secondary/Background Color:** [e.g., #0B0B0C / Very Dark Charcoal]
- **Accent/Text Color:** [e.g., #F0F0F0 / Off White]
- **Typography Feel:** [e.g., Modern Sans-serif (Inter/Geist) OR High-end Serif (Playfair Display)]
*(Agent Instruction: You are required to update the variables in `src/styles/global.css` to match this palette)*

**4. Required Pages & Routing:**
I need the following pages active and linked in the navigation tree. Remove any pages from the old architecture that are not listed here:
- [e.g., Home Page (`/`)]
- [e.g., About the Team (`/about`)]
- [e.g., Services (`/services` - note: replace the old `/packages` route)]
- [e.g., Blog Layout (`/blog` and `/blog/[slug]`)]
- [e.g., Contact Form (`/contact`)]

**5. Logo Asset Injection:**
I have attached the new brand logo to this prompt.
*(Agent Instruction: Save this logo into `src/assets/`, replacing the old brand logo. You must update all references to the logo in `Header.astro`, `Footer.astro`, the Open Graph tags in `SEO.astro`, and the schema in `JSONLD.astro`)*

**🤖 REQUIRED EXECUTION ORDER:**
1. Acknowledge this prompt and read the `SEO-first-marketing-website.md` and all 7 files in `/docs/best-practices/`.
2. Follow the "Brand Customization Checklist (Find & Replace)" perfectly to strip out the old brand's URLs, Company names, GA4 IDs, and Cookiebot IDs.
3. Update the global CSS with the new colors and fonts.
4. Scaffold and route the new pages requested above, utilizing the `BaseLayout.astro`.
5. Rewrite the copy in the `Hero`, `About`, and feature components to match the newly provided Brand Overview.
6. Check your work against the `04-testing-qa-checklist.md` and `06-cybersecurity-standards.md` before confirming the build is complete.

Please confirm you understand these instructions and provide a high-level summary of your first 3 actions.
