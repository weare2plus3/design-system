# TWO+THREE design system — notes for Claude

## Where things come from

- The source of truth is the TWO+THREE design system on claude.ai: https://claude.ai/artifact/9T4bpDBJyXRARsYJ6iMkrf. This repo is its code copy. Don't change the design system's content here by hand (guidelines, tokens, components, assets); change it on claude.ai and re-export, so the two never drift. If you can read the artifact, check it for anything newer than this repo.
- A re-export maps the artifact's `project/` files like this:
  - `project/README.md` → `guidelines.md`
  - `project/tokens.json` → `tokens.json`. `tokens.css` and `tailwind-preset.js` are generated from it: regenerate them with the export, never edit them by hand.
  - `project/design-system.json` → `design-system.json` (the index; its `assetGroups` list each asset group's files in order)
  - `project/components/…` → `components/…` (each `<Name>/README.md` and `preview.html`, plus `bundle.js`, `bundle.css`, `index.d.ts`, and `Cover/preview.html`)
  - `project/assets/<Group>/README.md` → `assets/<group>/README.md`, lowercased. The files in each group are uploads named in `design-system.json`; download each one into the same folder under its name.
- This repo owns everything else: `README.md`, `CLAUDE.md`, `package.json`, `react/`, `site/`, `scripts/` and `.github/`.

## After a re-export

- `react/Logo.mjs` mirrors the Logo in `components/bundle.js`. If the logo geometry changed, update it to match.
- Bump `version` in `package.json` (patch for wording, minor for new tokens, components or assets, major for anything renamed or removed), update the tag in the `README.md` install snippets, commit, tag `vX.Y.Z` and push the tag. The site reads the version from `package.json` by itself.
- Projects install a tag (`github:weare2plus3/design-system#vX.Y.Z`), so they only change when their tag is bumped. The website (`weare2plus3/website`) is one of them.

## The GitHub Pages site

- `site/` is the page; `scripts/build-site.sh` copies it into `_site/` with the files it reads, and `.github/workflows/pages.yml` deploys `_site/` on every push to `main`. Preview locally with `npm run preview`.
- The page reads `guidelines.md`, `tokens.json`, `design-system.json`, `package.json` and each component's `README.md` and `preview.html` at load time, so new content needs no site changes. Each guidelines `## ` section becomes a numbered section; `SPECIMENS` in `site/site.js` picks the specimen shown under it by the section's slug.
- The site follows the design system itself: tokens only (no raw colours or off-scale spacing), Teko and Instrument Sans, the components from `bundle.js`, and the logo drawn by the Logo component, never retyped.
