# iGEM Wiki integration

**Product:** Odor Pixel Suite (Game 1 Pattern Recognition · Game 2 Identity & Path Deduction · Game 3 Mixture Inference)  
**Constraint:** static Wiki deploy only — **no online backend**, **no Service Worker registration**.

## What `apps/wiki-client/dist` contains

After `npm run build:wiki`, Vite writes a multi-page static site with `base: './'` (relative URLs):

| Path (under `dist/`) | Role |
|----------------------|------|
| `index.html` | Suite hub + learning path + Explorer Level |
| `about/index.html` | Science / Model Limits / Media Credits / Privacy |
| `team/index.html` | Team roster (data-driven; empty until team fills catalog) |
| `attributions/index.html` | Official iGEM attributions iframe wrapper (`site.json`) |
| `human-practices/index.html` | Human Practices Integration Loop |
| `education/index.html` | Education activities with evaluation structure |
| `404.html` | Static not-found + asset-error guidance |
| `games/pixel/index.html` | Game 1 |
| `games/labyrinth/index.html` | Game 2 wiki solo |
| `games/spectrum/index.html` | Game 3 |
| `games/labyrinth-validator/index.html` | Dev map validator (optional to omit from public Wiki) |
| `games/spectrum-visualizer/index.html` | Dev visualizer (gated / optional omit) |
| `assets/*` | Hashed JS/CSS/images from Vite |
| `bundle-size-report.json` | Written by `npm run report:bundle-size` |

All game ↔ hub links use **relative** paths (`../../index.html`, `./games/...`). Do not rewrite them to absolute CDN hosts.

## Frozen-Flask / official iGEM Wiki repo

If the team Wiki uses the Frozen-Flask template:

1. Build this suite: `npm run build:wiki`.
2. Copy **contents** of `apps/wiki-client/dist/` into the Wiki repo’s static output tree (commonly `wiki/static/` or the folder Frozen-Flask already serves), preserving relative folders (`games/`, `about/`, `assets/`).
3. Add or link a Wiki page/template that points at the hub (`…/index.html`) via a normal site-relative link.
4. **Do not** modify the official `.gitlab-ci.yml`, `LICENSE`, `dependencies.txt`, or framework binaries solely to host this suite. Prefer copying static files into the existing static/templates layout the CI already publishes.

Online companion tools (if any) must open as **ordinary outbound links in a new tab**. Do **not** iframe them into the Wiki page, and do **not** make Wiki content depend on those remote apps loading.

## Service Worker

This suite **must not** register a Service Worker (`navigator.serviceWorker.register` is forbidden for this deliverable). Offline behavior is “download the static files once”; progress stays in `localStorage`.

## External / citation links

Plain `<a href="https://…">` citations are allowed. Runtime remote loads are not: no `@import` of remote CSS, no remote `script src` / `img src` / `font` / `fetch` of gameplay assets. Enforce with `npm run check:external-assets` after build.

## Credits gate

`assets-manifest.json` tracks media provenance. Unknown fields stay `TODO-VERIFY`.  
`npm run check:assets-manifest` warns in development;  
`npm run check:assets-manifest:release` **fails** production release until verified.
