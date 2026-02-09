Instagram scraper

This project includes a small Playwright-based scraper to fetch recent public posts from an Instagram handle and write them to `instagram-posts.json`.

Quick start

1. Install dependencies:

```bash
npm install
# or, to install Playwright browsers as well:
# npx playwright install
```

2. Run the scraper (example):

```bash
node instagram-scrap.js jaonlinecoaching 12
```

Output: `instagram-posts.json` will be created in the repository root.

Notes

- The script scrapes public profiles only. If a profile is private or the layout changes, the scraper may fail.
- Respect Instagram's terms of service and rate limits.
- If you want the scraper to run in CI (GitHub Actions), consider using the official Instagram Graph API instead (requires access token).