# Migration brief — legacy pages into the HAI redesign

Goal: every original page keeps its URL and all of its content, but adopts the new design system.

## Reference files (read these first)
- `mesh/index.html` — chrome, table, sections, footer
- `was-ist-hai/index.html` — long-form reading page
- `beweis/index.html` — figures, status table, footnotes
- `assets/hai.css` — the only stylesheet
- `assets/hai.js` — the only script (defer)

## Hard rules
1. Keep the page's URL, `<title>`, meta description, canonical, `lang`, and all visible text.
2. Preserve every fact, number, caveat, price, CTA link, and image. Do not invent, shorten away, or "improve" claims.
3. Replace the old `<head>` styles, inline `<style>`, and old scripts with:
   - `<link rel="stylesheet" href="/assets/hai.css">`
   - `<script src="/assets/hai.js" defer></script>` before `</body>`
   Keep functional page scripts only if the page needs them (calculator, timeline, filter). Keep their `<script>` but remove presentational CSS.
4. Copy the header/nav/statusline/footer from `mesh/index.html` exactly, including the `/archiv/` link. Remove `aria-current` from all nav items (or set it only on a matching item).
5. `<main id="main" tabindex="-1">`. One `<h1>`.
6. Use only existing classes: `wrap grid rail main aside section section-head meta lede components entries entry status note stamp figure footnotes actions mesh-table`.
7. `<body data-page="legacy">` (the analytics target is allow-listed).
8. Keep images and their paths. Add `alt` only when missing; do not invent descriptions of people.
9. No emoji, no external assets, no new dependencies, no stock images, no new claims.
10. Do not modify any file outside your assignment.

## Recommended shape
- Hero section: `.section` or `.hero` with rail meta, `h1`, `.lede`, `.actions` (links to `/` and `/archiv/`).
- Body: 2–5 `.section` blocks with `.grid` → `.rail` (section label) + `.main` (content) + `.aside` (one `.note` with context).
- Long lists → `.components` (numbered) or `.entries` (articles).
- Tables → `.mesh-table` with `data-label` on every `td`.
- Footnotes → `.footnotes` with `id="fn1"` and backlinks.

## Mandatory validation
- Parse with `python3 html.parser` (no exceptions).
- Exactly one `h1`; no duplicate ids; all internal links and fragments resolve.
- Every `td` in `.mesh-table` has `data-label`.
- No `http://` asset links, no old stylesheet, no inline `<style>` unless functional.
- Report: files, word count before/after, kept functional scripts, anything you could not migrate.
