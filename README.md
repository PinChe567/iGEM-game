# Odor Pixel Suite

iGEM education suite: pure-static wiki build (Vite multi-page), TypeScript workspaces.

## Quick start

```bash
npm install
npm run dev:wiki
```

Open the printed local URL. Hub → Game 1. Game 2 / Game 3 are disabled placeholders.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev:wiki` | Vite dev server |
| `npm run build:wiki` | Production static build → `apps/wiki-client/dist` |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright smoke (Pixel Lab) |
| `npm run typecheck` | TypeScript `--noEmit` across packages |
| `npm run check:external-assets` | Fail on runtime CDN/Google Fonts/etc. in dist |

Serve the build without the Vite dev server:

```bash
npm run build:wiki
npx --yes serve apps/wiki-client/dist
```

## Layout

- `apps/wiki-client` — hub + games
- `packages/core` — seeded RNG + version metadata
- `packages/content` — versioned odor content schema
- `packages/ui` — shared tokens / shell / components

Legacy `index.html` / `app.js` / `styles.css` remain at repo root until later cleanup (see `docs/01-migration-map.md`).
