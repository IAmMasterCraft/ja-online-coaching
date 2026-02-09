#!/usr/bin/env node

/**
 * instagram-scrap.js
 *
 * Simple Playwright-based scraper for a public Instagram profile.
 * Usage:
 *   node instagram-scrap.js <handle> [maxPosts]
 * Example:
 *   node instagram-scrap.js jaonlinecoaching 12
 *
 * Output: `instagram-posts.json` (in repository root)
 *
 * Notes:
 * - Scrapes public profile posts by opening the profile page and visiting individual post pages.
 * - For reliability prefer running in an environment with a real network connection.
 * - This is intended for personal use to build a static feed; respect Instagram's terms of service.
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function scrapeProfile(handle, maxPosts = 6) {
	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();

	const profileUrl = `https://www.instagram.com/${handle}/`;
	console.log(`Navigating to ${profileUrl}`);
	await page.goto(profileUrl, { waitUntil: 'networkidle' });

	// Small auto-scroll to load additional posts if necessary
	for (let i = 0; i < 3; i++) {
		await page.evaluate(() => window.scrollBy(0, window.innerHeight));
		await page.waitForTimeout(500);
	}

	// Try to collect posts directly from the profile grid (faster and more robust).
	// Select any anchor that contains `/p/` in the href and has an img child.
	const gridPosts = await page.$$eval('a[href*="/p/"]', (els) =>
		els
			.map((a) => {
				const img = a.querySelector('img');
				return {
					href: a.getAttribute('href'),
					media_url: img ? img.src : null,
					alt: img ? img.alt : null,
				};
			})
			.filter((p) => p.href && p.href.includes('/p/'))
	).catch(() => []);

	// Deduplicate by href and limit
	const seen = new Set();
	const uniqueGrid = [];
	for (const p of (gridPosts || [])) {
		if (!seen.has(p.href)) {
			seen.add(p.href);
			uniqueGrid.push(p);
		}
		if (uniqueGrid.length >= maxPosts) break;
	}

	console.log(`Found ${uniqueGrid.length} posts in-grid, scraping up to ${maxPosts} posts...`);

	const results = [];

	// Ensure download directory exists (caller may create but be safe)
	const imagesDir = path.resolve(process.cwd(), 'assets/instagram');
	try { fs.mkdirSync(imagesDir, { recursive: true }); } catch (e) {}

	// For entries missing media_url, fall back to visiting the post page.
	let index = 0;
	for (const item of uniqueGrid) {
		const href = item.href;
		const postUrl = new URL(href, 'https://www.instagram.com').toString();
		let media_url = item.media_url;
		let caption = item.alt || null;

		if (!media_url) {
			console.log(`Visiting post page to extract media: ${postUrl}`);
			const postPage = await context.newPage();
			try {
				await postPage.goto(postUrl, { waitUntil: 'networkidle' });
				media_url = await postPage.$eval('meta[property="og:video"]', (el) => el.content).catch(() => null);
				if (!media_url) {
					media_url = await postPage.$eval('meta[property="og:image"]', (el) => el.content).catch(() => null);
				}
				caption = caption || (await postPage.$eval('meta[property="og:description"]', (el) => el.content).catch(() => null));
			} catch (err) {
				console.warn(`  failed to extract from ${postUrl}: ${err.message}`);
			} finally {
				await postPage.close();
			}
		}

		// If we have a media URL, download it locally to avoid CORS/embed blocking
		let localPath = null;
		if (media_url) {
			try {
				const urlObj = new URL(media_url);
				// derive extension from pathname, fallback to .jpg
				const ext = path.extname(urlObj.pathname) || '.jpg';
				// derive a stable filename from the post shortcode in the href (/p/SHORTCODE/)
				const scMatch = href.match(/\/p\/([^\/]+)/);
				const shortcode = (scMatch && scMatch[1]) ? scMatch[1] : String(index);
				const filename = `${handle.replace(/[^a-z0-9_-]/gi, '')}-${shortcode}${ext}`;
				const outPath = path.join(imagesDir, filename);

				console.log(`  downloading media to ${outPath}`);
				const resp = await context.request.get(media_url);
				if (resp.ok()) {
					const buffer = await resp.body();
					fs.writeFileSync(outPath, buffer);
					// Use site-relative path for web consumption
					localPath = `./assets/instagram/${filename}`;
				} else {
					console.warn(`  failed to download ${media_url} — status ${resp.status()}`);
				}
			} catch (err) {
				console.warn(`  error downloading media: ${err.message}`);
			}
		}

		results.push({ permalink: postUrl, media_url: localPath || media_url, caption });
		index += 1;
	}

	await browser.close();
	return results;
}

async function main() {
	const argv = process.argv.slice(2);
	if (argv.length === 0) {
		console.error('Usage: node instagram-scrap.js <handle> [maxPosts]');
		process.exit(2);
	}

	const handle = argv[0].replace(/^@/, '');
	const maxPosts = parseInt(argv[1], 10) || 6;

	try {
		const posts = await scrapeProfile(handle, maxPosts);
		const outPath = path.resolve(process.cwd(), 'instagram-posts.json');
		fs.writeFileSync(outPath, JSON.stringify(posts, null, 2));
		console.log(`Wrote ${posts.length} posts to ${outPath}`);
	} catch (err) {
		console.error('Fatal error:', err);
		process.exit(1);
	}
}

if (require.main === module) main();
