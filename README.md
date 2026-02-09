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
└── assets/                                
    ├── images/
    │   ├── hero-bg.webp                    # Custom hero background
    │   └── og-image.jpg                    
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

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Set source to `main` branch, root folder
4. Site will be live at `https://username.github.io/ja-online-coaching/`
5. Best bet is to setup a dedicated github account for jaoc

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
- **Email:** jaonlinecoaching@gmail.com

---

## Credits

- Images: [Unsplash](https://unsplash.com) (free license)
- CSS: [Tailwind CSS](https://tailwindcss.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson
