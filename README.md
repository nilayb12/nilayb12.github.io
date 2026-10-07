# nilayb12.github.io

Personal portfolio, based on [GitProfile](https://github.com/arifszn/gitprofile) by Ariful Alam (MIT), ported from Vite to Next.js (static export) and restyled with [HeroUI v3](https://heroui.com) (Apache 2.0).

## Edit

Everything lives in **`gitprofile.config.ts`**: skills, experience, education, socials, the repos to feature, theme. Search it for `TODO`.

To add a résumé, put `resume.pdf` in `public/` and set `resume.fileUrl` to `'/resume.pdf'`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy

1. Push to a repo named **`nilayb12.github.io`** (keep `base: '/'` in the config).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` deploys. The site also rebuilds daily to refresh stars and descriptions.

## What changed from upstream GitProfile

- Vite → Next.js App Router with `output: 'export'`; meta tags via the Metadata API, Google Analytics via `next/script`.
- **GitHub data is fetched at build time** (`src/lib/github-data.ts`) using the workflow's `GITHUB_TOKEN`, so visitors never hit GitHub's 60-requests/hour limit. If the build-time fetch fails, the page falls back to fetching in the browser, as upstream does.
- The theme is applied by an inline script before first paint (no flash, no hydration mismatch).
- PWA support removed (`vite-plugin-pwa` has no drop-in Next.js equivalent).
- **UI rebuilt with HeroUI v3** instead of daisyUI: every card uses HeroUI's `Card`, `Chip`, `Avatar`, `Skeleton` and button styles. daisyUI's 36-theme dropdown is replaced by a Light / Dark / System switch (HeroUI's `useTheme`).
- Experience, education and certifications share one timeline component (`src/components/timeline`).

## Tech stack icons

Icons are found automatically when the site builds: each name in `skills` is matched against the 3,400+ logos in [Simple Icons](https://simpleicons.org), with official brand colours. Spell tools the way the brand does ('Terraform', 'Kubernetes', 'C++').

If the build log in GitHub Actions shows `[skills] No icon found for: …`, add the skill to `src/constants/skill-icons.ts`: under `SKILL_ALIASES` to point it at a different logo, or under `SKILL_GENERIC` to give it a generic icon. Icon style is set by `themeConfig.skillIcons`: `'brand'`, `'accent'` or `'none'`.

## Header

A fixed, transparent header in the top-right corner (`src/components/site-header`) holds:

- **Theme**: an accent-colour palette (presets in `src/constants/accents.ts`). The visitor's choice is saved in their browser.
- **Light / Dark / System** switch
- **GitHub** button, showing a number set by `header.githubCount` in the config: `'stars'` (total across your own non-fork repos, counted at build time), `'followers'`, or `'none'`

## Theme

In `gitprofile.config.ts` → `themeConfig`:

- `defaultTheme`: `'system'` (follows the visitor's OS), `'light'` or `'dark'`
- `accentColor`: any CSS colour for buttons, chips and links; empty keeps HeroUI's blue
- `disableSwitch`: hide the Theme palette and the Light / Dark / System switch

For deeper changes, HeroUI's theme builder (heroui.com/themes) exports CSS variables you can paste into `app/globals.css`.
