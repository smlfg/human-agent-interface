# Frontend-Performance-Audit — 2026-10-30

**Methode.** Byte- und Header-Analyse; Brotli q11 und gzip mit Node `zlib` gerechnet. Lighthouse 12.8.2, Mobile-Preset (Slow-4G simuliert), 2 Läufe je Variante gegen einen temporären lokalen Server. Lokal ohne CDN-Kompression und Produktions-Header: LCP/FCP sind Größenordnungen, keine Feldwerte. A/B-Kopien lagen in `/tmp`. kB = 1024 B.

## Messwerte (Erstbesuch)

| Seite | HTML kB (br) | CSS kB (br) | JS kB (br) | Fonts kB | Requests | blockierend |
|---|---|---|---|---|---|---|
| `/` | 20,4 (4,9) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |
| `/en/` | 19,8 (4,3) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |
| `/was-ist-hai/` | 22,4 (4,8) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |
| `/en/what-is-hai/` | 21,7 (4,2) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |
| `/beweis/` | 36,2 (7,3) | 15,4 (3,2) | 6,2 (1,7) | 152,0 | 9 | 2 CSS |
| `/en/proof/` | 35,5 (6,5) | 15,4 (3,2) | 6,2 (1,7) | 152,0 | 9 | 2 CSS |
| `/mesh/` | 19,0 (4,4) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |
| `/en/mesh/` | 18,5 (3,9) | 15,4 (3,2) | 6,2 (1,7) | 299,0 | 10 | 2 CSS |

CSS = `hai.css` 13.930 B + `fonts.css` 1.490 B. Requests = Dokument, 2 CSS, JS, 4 bzw. 3 Fonts, Favicon, `POST /api/site-event`. Woff2 ist schon komprimiert (Brotli bringt 0 B). Fonts sind 74 % des Transfers.

**Gemessen:** LCP 2,85–3,00 s, FCP 2,70–2,85 s, CLS 0,041, TBT 0 ms, Main-Thread 167 ms. LCP ist der Hero-`<h1>`; 84 % davon Render-Delay (2.401 ms). Desktop 100/100 auf vier Seiten.

## Top 8 nach Wirkung

1. **Fonts: 299 kB, davon 147 kB Italic für 1 `<em>`.** `/beweis/` hat kein `<em>` und lädt sie nicht. Fix: `pyftsubset` auf die 93 genutzten Zeichen, `wght` auf 300–500 begrenzen (CSS nutzt nur 300/400/500): normal 131.848 → 65.236 B, italic 147.060 → 74.524 B (gemessen, fontTools 4.66). Optional `opsz`=18: 26.012 / 29.116 B (−90 %), ohne optische Größenanpassung. Dateien: `assets/fonts/*.woff2`, `unicode-range` in `assets/fonts/fonts.css`.
2. **Kein Font-Preload.** FCP 2,70–2,85 → 1,35–1,80 s, CLS 0,041 → 0–0,006. Fix: zwei `<link rel="preload">` (unten) in alle 8 Köpfe, vor die Stylesheets.
3. **Caching.** Ohne `_headers` gilt `public, max-age=0, must-revalidate`: jede Navigation revalidiert 4 Fonts, 2 CSS und JS — sechs Roundtrips extra auf 4G. Fix: `_headers` (unten).
4. **`run_worker_first: ["/", "/index.html"]`.** Der Worker ruft dort nur `ASSETS.fetch` auf, kostet aber pro Aufruf; laut Cloudflare-Doku gibt es bei Free-Tier-Limit 429 statt Asset-Fallback, und `_headers` greift nicht. Fix: beide Einträge in `wrangler.jsonc` entfernen, `/intake*` und `/api/*` behalten.
5. **Favicon 94.859 B** (256×256), bei jedem Erstbesuch geladen. Fix: 32×32-PNG/ICO, geschätzt 2–5 kB.
6. **Zwei render-blockierende Stylesheets.** `fonts.css` (1.490 B) kostet 151 ms Blocking (gemessen). Fix: die vier `@font-face` in `assets/hai.css` verschieben, `fonts.css` löschen.
7. **`/beweis/`: 13.956 B Inline-SVG** (3 Figuren, 19 Pfade) = 38 % des HTML; dazu vier `<style>`-Blöcke (788–1.793 B), je DE/EN byte-identisch doppelt. Fix: SVGs als `assets/proof/*.svg` mit `width`/`height` und `loading="lazy"`, gemeinsame Regeln in `hai.css`.
8. **Analytics-POST pro View.** 680 B, ein zusätzlicher Worker-Invoke, kein Retry, kein DNT/GPC-Check, Bots zählen mit. Fix in `assets/hai.js`: einmal pro Session per `sendBeacon` bei `visibilitychange === "hidden"`; bei `doNotTrack === "1"` oder `globalPrivacyControl` nicht senden. Payload: Pfad, Variante, Sprache, Viewport-Klasse — keine Cookies, keine IDs.

## Fonts und Preload

```html
<link rel="preload" href="/assets/fonts/newsreader-300_700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/newsreader-300_700-italic.woff2" as="font" type="font/woff2" crossorigin>
```

`crossorigin` ist Pflicht, sonst Doppel-Download. IBM Plex Mono nicht preloaden (10 kB, lädt nach dem CSS, kein messbarer Gewinn). `font-display: swap` behalten; für Italic ist `optional` eine Alternative. Subset-Grenze beachten: `→` (6× in `/beweis/`) und `↩` (8×) fehlen in allen vier Dateien und kommen aus dem System-Fallback.

## Caching (nicht angewandt)

`wrangler.jsonc` hat kein Header-Feld; Header kommen über `_headers` im Asset-Root (hier Projektwurzel). Empfehlung — Font-Namen zuerst hashen:

```
/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/assets/hai.css
/assets/hai.js
  Cache-Control: public, max-age=0, must-revalidate
```

Ohne Hash: `max-age=604800`. HTML beim Default lassen. Nach dem Deploy per `curl -sI` prüfen, dass `/` die Regeln erbt — dafür muss Punkt 4 raus.

## Was schon gut ist

Keine Bilder, keine Third-Party-Requests. JS 6,2 kB (1,7 kB br), `defer`, TBT 0 ms. `font-display: swap` überall, echte woff2, `unicode-range` gesetzt. Scroll-Handler `passive` + `requestAnimationFrame`, nur Variante C; IntersectionObserver mit `unobserve`, nur Variante B; `prefers-reduced-motion` bedacht. Das Designsystem kostet 3,2 kB br.

## Checkliste vor dem Deploy

1. Font-Subsets erzeugen, hashen, `unicode-range` anpassen, h1 optisch prüfen.
2. Zwei Preload-Links in allen 8 Seiten (`grep -c 'rel="preload"'` = 2).
3. `_headers` anlegen, per `curl -sI` für Font, CSS und `/` verifizieren.
4. `run_worker_first` bereinigen; Homepage erzeugt keinen Worker-Invoke mehr.
5. Favicon ersetzen; ungenutzte 1,89-MB-`hai-interface-background.png` aus `assets/` entfernen.
6. Lighthouse mobil auf `/`, `/beweis/`, `/was-ist-hai/`: LCP < 2,0 s, CLS < 0,05, TBT < 50 ms.
7. `?v=B` und `?v=C` gegenprüfen (Reveal-Opacity, Sticky-Statuszeile).
8. Analytics einen Tag beobachten: kommen `page_view` und `gate_approve` noch an?
