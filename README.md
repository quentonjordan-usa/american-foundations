# American Foundations — Site & Publishing Guide

## Project Structure

```
american-foundations/
├── src/
│   ├── layouts/
│   │   ├── Base.astro          ← Nav + footer shell (all pages)
│   │   └── Article.astro       ← Individual article template
│   ├── pages/
│   │   ├── index.astro         ← Homepage
│   │   ├── rss.xml.js          ← RSS feed (Beehiiv watches this)
│   │   └── articles/
│   │       ├── index.astro     ← Full archive page
│   │       └── *.md            ← ★ ADD NEW ARTICLES HERE ★
│   └── styles/
│       └── global.css          ← Brand tokens + shared styles
├── public/                     ← Static assets (logo, images)
├── .github/
│   └── workflows/
│       └── daily-publish.yml   ← GitHub Action (auto-publishes at 6am CT)
├── astro.config.mjs
├── netlify.toml
└── package.json
```

---

## Writing a New Article

1. Create a new `.md` file in `src/pages/articles/`
2. Name it: `YYYY-MM-DD-short-slug.md` (e.g. `2026-03-10-what-is-conservatism.md`)
3. Copy this front matter template:

```yaml
---
title:       "Your Article Title Here"
date:        "2026-03-10"
pillar:      "principles"
pillarName:  "Principles & Philosophy"
day:         "tuesday"
column:      "The Foundation"
description: "One sentence that describes the article — used as the excerpt on cards."
readTime:    "8 min read"
nextTitle:   "Next Article Title"
nextSlug:    "2026-03-11-next-article-slug"
nextDate:    "Wednesday, March 11 · News & Commentary"
nextPillar:  "news"
layout: "../../layouts/Article.astro"
---

Your article body in Markdown here...
```

### Pillar values:
| pillar       | pillarName                  | column            |
|--------------|-----------------------------|-------------------|
| principles   | Principles & Philosophy     | The Foundation    |
| economy      | Economy & Fiscal Policy     | The Brief         |
| news         | News & Commentary           | News Day          |
| world        | America in the World        | The World View    |
| culture      | Family, Faith & Culture     | The Heartland     |
| govt         | Government & Elections      | The Foundation    |

---

## Publishing Workflow

### Manual publish (immediate):
```bash
git add .
git commit -m "Add Week X articles"
git push
```
Netlify detects the push and deploys automatically within ~60 seconds.

### Scheduled publish (automatic — no action needed):
- Articles with a future `date:` in front matter are hidden until that date
- The GitHub Action fires at **6:00 AM Central Time, Mon–Fri**
- It triggers a Netlify rebuild, which exposes that day's article
- Beehiiv detects the RSS update and sends the email to subscribers

**Workflow for a week's batch:**
1. Write all 5 articles (or ask Claude to generate them)
2. Set the correct date in each front matter
3. Push all 5 files to GitHub at once
4. They publish automatically, one per day, all week

---

## One-Time Setup Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
# Opens at http://localhost:4321
```

### 3. Connect Netlify build hook (for GitHub Action)
1. Netlify dashboard → Site Settings → Build & Deploy → Build hooks
2. Add hook → Name: "Daily Publish" → Copy the URL
3. GitHub repo → Settings → Secrets and variables → Actions
4. New secret: `NETLIFY_BUILD_HOOK` = paste the URL

### 4. Connect Beehiiv RSS-to-email
1. Create account at beehiiv.com
2. Settings → Integrations → RSS
3. Feed URL: `https://americanfoundations.com/rss.xml`
4. Set automation: "New RSS item → Send to all subscribers"
5. Style your email template to match brand colors

### 5. Update your domain in astro.config.mjs
```js
site: 'https://americanfoundations.com',  // ← your real domain
```

---

## Brand Reference

| Token       | Hex       | Usage                        |
|-------------|-----------|------------------------------|
| Navy        | `#002868` | Primary text, headers, nav   |
| Red         | `#B22234` | CTAs, accent, culture pillar |
| Gold        | `#C8A84B` | Rules, stars, dividers       |
| Cream       | `#FAF7F2` | Page background              |
| Ink         | `#1A1A1A` | Body text                    |

Fonts: **Playfair Display** (headlines) · **Source Serif 4** (body) · **Barlow Condensed** (labels/nav)
