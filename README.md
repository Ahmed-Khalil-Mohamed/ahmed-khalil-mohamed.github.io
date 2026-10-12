# Ahmed Khalil - Portfolio

A bilingual, responsive portfolio hosted on GitHub Pages.

Live: https://ahmed-khalil-mohamed.github.io/

## Edit
- index.html: profile, project summaries, Arabic and English copy.
- app.js: project details, language and scroll reveals.
- styles.css: responsive layout, design tokens, reduced-motion support.
- resume.html: printable English resume. Add education dates and contact links when supplied.

## Preview
Run `python -m http.server 4173` in this folder, then open http://localhost:4173.
No build step or package installation is required. Fonts and images are served locally.

## Hosting
GitHub Pages: deploy from main, root folder. The repository name must be ahmed-khalil-mohamed.github.io. No custom domain or paid hosting is required.

## Content sources
Profile and portrait: https://github.com/Ahmed-Khalil-Mohamed
Clear Tool: https://github.com/Ahmed-Khalil-Mohamed/clear-tool
NEXUS: https://github.com/Ahmed-Khalil-Mohamed/NEXUS
Computer Science / AI studies and Flutter experience: owner-provided information.
No graduation date, employer, university, proficiency score, or contact address is invented.

## Assets
Portrait and application screenshots come from the owner's public GitHub profile and repositories. The product screenshots are actual interface captures. NEXUS remains proprietary; this site does not publish its application source.
Manrope by Mikhail Sharanda is distributed under the SIL Open Font License in FONT-LICENSE.txt.

## Visual system
White liquid-glass web styling, a typographic AK signature in Allura, Plus Jakarta Sans for English, IBM Plex Sans Arabic for Arabic, and Phosphor Light icons. Original square portrait preserved without image alteration. Native scrollbar styling and reduced-motion/reduced-transparency preferences are supported.

The glass-ribbon.jpg illustration was generated with the built-in image generation tool. Prompt: a clear optical-glass ribbon in an open flowing loop, pale ice blue refraction, bright white studio background, soft daylight, restrained highlights, no text or logos. It is decorative artwork, not a photograph of a physical product.

Font licenses: FONT-LICENSE.txt (Manrope used in the printable resume), SIGNATURE-LICENSE.txt (Allura), JAKARTA-LICENSE.txt (Plus Jakarta Sans), ARABIC-FONT-LICENSE.txt (IBM Plex Sans Arabic). Icon license: ICONS-LICENSE.txt.

## MIMARX client work
The owner confirmed full website design and development. The public website and the owner-provided Lite source were reviewed to describe the work. This is a static HTML/CSS/JavaScript public site with Node.js build tooling, not a claim of a Node.js backend or complete LMS.
The academy preview is an actual capture of https://www.mimarx-studio.com/academy. No client source code, configuration, or private files are included in this repository. Architectural imagery belongs to the client project and is displayed here only as part of the website screenshot.
The AK favicon is outlined from the existing Allura signature font, with ICO and Apple touch fallbacks. The portrait remains in the profile and resume.

## Additional projects
Ten secondary project cards link to the owner's public repositories: Recall, FairShare, Stockroom, WarrantyVault, FileNest, GiveTime, ScopeDesk, RescueTable, FixLane, and QueueWise. Names and descriptions were checked against GitHub repository metadata and READMEs on 2026-10-13. Their original public/app-icon.png assets are stored under project-icons/. Cards use staggered scroll reveals and hover/focus feedback; reduced-motion preferences disable animation.

## Project detail windows
All 13 projects open a shared native dialog. The desktop layout keeps the screenshot gallery on the left and bilingual project details on the right; mobile stacks them. Multiple screenshots crossfade every five seconds, with previous/next, position selectors, and pause/play. Keyboard interaction stops autoplay; hover and hidden tabs suspend it. Reduced-motion disables autoplay and transitions. Closing clears the timer and returns focus to the opening control. Original interface screenshots are sourced from the owner's public repositories; demonstration records inside screenshots are fictional.

## Signature motion
The original Allura AK outlines are revealed with sequential SVG centerline masks. The same mark appears in the header, portrait, mobile drawer, entrance, and pending project screenshots. The glass entrance lasts 2.8 seconds, supports immediate entry/Escape, and has a five-second failsafe if scripts fail. It never waits for lazy images. Main content is temporarily inert during the entrance; focus is restored if entry was activated by keyboard. Reduced-motion skips the entrance and disables handwriting/reveal animations. Back/forward cache restoration does not replay the entrance.

Text reveals use complete words to preserve Arabic shaping, with a single full-text equivalent for assistive technology. IntersectionObserver reveals each block once; language changes rebuild the visible words. The HTML stays readable with JavaScript disabled. Image loaders settle on load or error; project galleries show a localized unavailable state on image failure. No external animation dependency is required.

## Contact channels
The owner supplied the public email and WhatsApp number. Facebook and LinkedIn profile URLs were read from the signed-in browser on 2026-10-13. Contact shortcuts appear in the hero and the full contact section. The phone uses Egypt's +20 prefix for WhatsApp. No message is sent automatically.

contact-glass.png is a generated decorative image for the contact section only: two translucent frosted glass arcs on a pearl-white studio backdrop, suggesting conversation, with clear space for text. The hero retains glass-ribbon.jpg and the original portrait.
