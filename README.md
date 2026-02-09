# JA Online Coaching

**Just Adapt. Find A Way.**

Premium one-page website for JA Online Coaching — a bespoke, data-driven fitness coaching brand.

---

## Quick Start

Open `index.html` in any browser. No build tools, no dependencies to install — everything loads via CDN.

```bash
# macOS
open index.html

# Or use a local server for best results
npx serve .
```

---

## File Structure

```
jaot/
├── index.html                              # The entire website (single file)
├── instagram-posts.json                    # Instagram feed data (auto-updated by GitHub Actions)
├── README.md
├── .github/
│   └── workflows/
│       └── instagram-feed.yml              # Daily Instagram post fetcher
└── assets/                                 # (Create when ready)
    ├── images/
    │   ├── hero-bg.webp                    # Custom hero background
    │   └── og-image.jpg                    # Social share image (1200x630)
    └── favicon/
        ├── favicon.ico
        └── apple-touch-icon.png
```

---

## Tech Stack

| Technology | Purpose | CDN |
|---|---|---|
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS | `@tailwindcss/browser@4` |
| [Font Awesome 6](https://fontawesome.com) | Icons | `cdnjs` |
| [Inter](https://rsms.me/inter/) | Typography | Google Fonts |

No build pipeline. No `node_modules`. Pure HTML/CSS/JS.

---

## Customisation

### Replacing Images

All images currently use [Unsplash](https://unsplash.com) CDN URLs. To use your own:

1. **Hero background** — Replace the `<img>` src in the hero section (line ~289)
2. **About section image** — Replace the `<img>` src in the about section (line ~380)
3. **Blog card images** — Replace the 3 `<img>` srcs in the insights section (lines ~588, ~610, ~632)
4. **Instagram grid** — Replace the 6 `<img>` srcs in the social section (lines ~771-805)

Recommended image sizes:
- Hero: 1920px wide, WEBP format
- About: 800px wide
- Blog cards: 600px wide
- Instagram tiles: 300px square

### Changing Colors

Edit the `@theme` block in the `<style>` tag (line ~50):

```css
--color-brand: #ea580c;        /* Primary orange — change this */
--color-brand-light: #f97316;  /* Hover state */
--color-surface-primary: #0a0a0a; /* Background */
```

### Updating Content

All text content is directly in the HTML. Search for section comments like `<!-- HERO SECTION -->` to find each area.

### Adding a Favicon

1. Generate favicons at [favicon.io](https://favicon.io)
2. Place files in `assets/favicon/`
3. The `<link>` tags in `<head>` already point to the right paths

---

## Instagram Feed Integration

Three options for displaying real Instagram posts:

### Option A: Elfsight Widget (Easiest)

1. Go to [elfsight.com](https://elfsight.com/instagram-feed-instashow/)
2. Create a free widget for `@jaonlinecoaching`
3. Copy the embed code
4. Replace the Instagram grid `<div id="instagram-grid">` in `index.html`

### Option B: GitHub Actions (Self-hosted)

Automatically fetches posts daily and commits to `instagram-posts.json`.

**Setup:**

1. Create a [Facebook Developer](https://developers.facebook.com) account
2. Create an app with Instagram Basic Display API
3. Generate a long-lived access token
4. Add `INSTAGRAM_ACCESS_TOKEN` to GitHub repo secrets
5. In `index.html`, uncomment the `loadInstagramFeed()` function at the bottom of the `<script>` block (line ~1094)
6. Push to GitHub — the workflow runs daily at 6 AM UTC

The token auto-refreshes each run, so it stays valid indefinitely as long as the workflow runs at least once every 60 days.

### Option C: Static Placeholders (Current)

The grid currently shows Unsplash fitness imagery. Replace with screenshots of actual Instagram posts when ready.

---

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Set source to `main` branch, root folder
4. Site will be live at `https://username.github.io/jaot/`

### Netlify

1. Connect your GitHub repo to [Netlify](https://netlify.com)
2. Build command: (leave empty)
3. Publish directory: `.`
4. Deploy

### Vercel

1. Import repo at [Vercel](https://vercel.com)
2. Framework preset: Other
3. Output directory: `.`
4. Deploy

### Custom Domain

Add a `CNAME` file with your domain (e.g., `jaonlinecoaching.com`) and configure DNS.

---

## Key Features

- Dark mode design (`#0a0a0a` background, orange-600 accent)
- Fully responsive (mobile-first)
- Smooth scroll navigation
- Sticky navbar with glass blur effect
- Staggered scroll-reveal animations
- Animated stat counters
- Service cards with hover lift + glow effects
- Gradient text on key headings
- Instagram DM integration (all CTAs open `ig.me/m/jaonlinecoaching`)
- Back-to-top button
- SEO meta tags + Open Graph + Twitter Card
- Accessibility (skip link, ARIA labels, reduced motion support)
- Custom scrollbar

---

## Links

- **Instagram:** [@jaonlinecoaching](https://www.instagram.com/jaonlinecoaching)
- **Substack:** [@jaonlinecoaching](https://substack.com/@jaonlinecoaching)
- **Email:** hello@jaonlinecoaching.com

---

## Credits

- Images: [Unsplash](https://unsplash.com) (free license)
- CSS: [Tailwind CSS](https://tailwindcss.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson
