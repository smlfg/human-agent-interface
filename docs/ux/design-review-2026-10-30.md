# Design-Review — HAI / Das Protokoll

Read-only: `hai.css`, `hai.js`, acht Seiten, scoped Styles; fünf Suchen der UI/UX-Wissensbasis.

## Verdict

Der Lesepfad Rail → H1 → Lede → Main ist klar; das Protokoll ist als System erkennbar: Papier, Tinte, eine Signalrolle, Newsreader/Plex, nummerierte Ränder, Gate tragen die Idee. Es verliert diese Identität dort, wo es Beweise zeigen soll: Die Diagramme sind generische Flowcharts mit doppelten Rahmen und Fallback-Schriften. Der Satz ist auf etwa 1280 px gebaut; bei 1440 bleibt die Lesespalte im zu breiten Main stehen, bei 1024 kippt die H1, bei 980 springt das Layout. Die acht Seiten teilen ein Gerüst, aber keine Komponentenbibliothek: Status, Tabellen, Fußnoten und Trefferflächen unterscheiden sich je Seite. Ohne Konsolidierung bleibt es ein starkes Template, kein fertiges Protokoll.

## Top 10

1. **H1 bricht aus dem Satz.** `.hero h1` + `--step-4` (index, en/index, was-ist-hai, mesh): Bei 1440 ist die erste Zeile breiter als der 760-px-Main, die zweite knapp darunter; bei 1024 (76,8 px/559 px) drei bis vier Zeilen; bei 980 zwei. Fix: H1 an die Spalte binden (`max-inline-size:14ch`), `--step-4` auf ~5.25rem deckeln, `html[lang="en"] .hero h1` entfernen.

2. **Tabelle verliert auf Mobil ihre Header.** `index.html` `.mesh-table` + global `@media(max-width:620px) thead{display:none}`: Die Home-Zellen haben kein `data-label`, gestapelte Zeilen werden zu „human-agent-interface.com / Herz. Diese Seite. / live“. Fix: `data-label` ergänzen und die Mesh-Lösung (thead visuell verstecken, `td::before`) global machen; nicht `display:none`.

3. **980er Klippe.** `@media(max-width:980px)` setzt `.rail/.main/.aside` auf `1/-1`; `.note` hat kein Measure. Bei 1024 ist der Main 559 px, bei 980 932 px; Notizen laufen bei 768–980 auf über 100 Zeichen. Fix: Zwischenraster (Rail inline, Main 62ch, Aside darunter) um 1180, `.note{max-width:52ch}`, Breakpoint staffeln.

4. **H3 ohne Anschluss.** Global `h3` hat `margin:0`; in `beweis` stehen „Der Loop“ und „Definition of Done L1“ direkt auf dem Folgeabsatz. Fix: `h3{margin-block:2rem .5rem}` global; Entry-H3 auf `--step-2` (28 px) statt 22 px.

5. **Zwei Status-Systeme.** `index.html` färbt `tr[data-state]` in der letzten Zelle; `mesh/` und `beweis/` nutzen `.status`-Badges; „geplant“, „Praxis“ und „Docs“ sind alle neutral. In `mesh/` steht der `Quelle`-Stempel in der H3, anderswo der Status außerhalb. Fix: ein Status-Token-Set (`live|wip|planned|practice`) und nur `.status`; Zeilenfarben entfernen.

6. **Figuren sind der schwächste Teil.** `.figure` + Inline-SVG: Papier-2-Panel, inneres `rect` mit `#f4f0e6`, Georgia und generisches `monospace`; dadurch Doppelrahmen und Bruch der Typografie. In `beweis/` setzt `@media(max-width:760px)` zudem `svg{min-width:640px}` für alle Figuren; die 480er-Diagramme werden auf 1,33× vergrößert und scrollen ohne Hinweis. Fix: nur ein Rahmen, SVG-Text über Token-Klassen, `min-width` = viewBox-Breite, Scroll-Kante.

7. **Label-Mikroskala.** `.meta` 10,9 px, `.status`/`.stamp` 9,6 px, `.note`/`.gate-head` 10,6 px, dazu sieben Größen zwischen 0,6 und 0,68 rem. Fix: zwei Label-Tokens (11/12 px) plus `--note` 13 px; `.aside .note` global auf 13 px wie in `was-ist-hai`.

8. **Trefferflächen und Fokus nur auf zwei Seiten.** `index`/`en/index` scoped 24/44 px; `beweis`, `mesh`, `was-ist-hai` haben ~17 px hohe Nav-Links. `#main:focus-visible{outline:none}` gibt es nur in `beweis/` und `en/proof/`; Home hat `tabindex="-1"`, also einen seitengroßen grünen Fokusrahmen nach dem Skip-Link. Fix: alles global; `#main:focus-visible` aus, ein `scroll-padding-top` für C.

9. **Fußnoten und Prosa driften auseinander.** Global `.footnotes` 0,8 rem/70ch, in `was-ist-hai` 13 px/54ch; Backlink-Ziel 1,75 rem nur dort. `.main > p + p`, `text-wrap` und `overflow-wrap` gelten nur auf einzelnen Seiten. Fix: Fußnoten-/Prosa-Regeln global, `li` 54ch, Backlink 1,75 rem.

10. **Gate-Hierarchie und B-Motion.** `.btn` behandelt „Freigeben“ und „Anhalten“ vor dem Klick gleich; Zeilentönung 0,06/0,07 ist kaum sichtbar, während Buttons 120 ms faden. Variante B animiert nur drei `.reveal`-Entries auf Home; `.ink-path` kommt auf keiner Seite vor, sechs Seiten sind identisch zu A. Fix: eine primäre/zweite Aktion, Zustands-Token mit ~0,12 Tönung + Textstatus, Row-Transition 160 ms; B entfernen oder auf Section-Heads/Figuren anwenden.

## Konsolidierung

Nach `assets/hai.css`; die vier Blöcke liegen DE/EN doppelt vor. Nur diagrammspezifische `min-width` bleibt lokal.

- **A11y/Sizing:** 24-px-Textlinks, 44 px bei `(pointer:coarse)`, `.gate .btn`, `.gate-actions`, `#main:focus-visible`, ein `scroll-padding-top` für Variante C, Fußnoten-Backlink als 1,75-rem-Ziel.
- **Typo/Prosa:** `text-wrap:balance` für h1–h3, `pretty` für p, `sup{line-height:0}`, `.main > p + p`, Fußnoten 13 px/54ch, `.aside .note` 13 px, `.components li > div > span{max-width:62ch}`, `overflow-wrap` für Gate-/Entry-/Tabellentext.
- **Tabellen:** `.mesh-table tbody th` (mono, 0,78 rem), First-/Last-Cell-Wrapping, eine mobile Stack-Regel mit `td::before`; drei Varianten ersetzen.
- **Figuren:** Scroller, SVG-Typografieklassen, ein Rahmen; kein Roh-Hex in SVGs.
- **Komponenten:** `.components code`, Gate-Button-Sizing, Status-Mapping.
- **Inline-Styles:** `figure`-Padding/-Margin, `note`-Margins 1,5/1,75 rem und `ol.entries`-Reset in Klassen überführen.

## Stark und unverändert

- Papier/Ink/Signal, keine Verläufe, kein Glas; Newsreader + IBM Plex Mono; die leise H1/H2-Stimme.
- Rhythmus aus Rules, nummerierten Rändern, großzügigen Sections.
- Das Gate: der einzige Ort, an dem die These Verhalten wird. Interaktion, Live-Region und `aria-pressed` nicht dekorativ überschreiben.
- Die Ehrlichkeitshierarchie (Status, Lücken, Belege) und der Skip-Link/Reduced-Motion-Pfad.

## Fehlende Tokens

Tokens sind semantisch, aber ungeschichtet; eine Primitive-Ebene wäre für acht Farben Zeremonie. `--step-2` ist unbenutzt, `--font-body` dupliziert `--font-display`. Ergänzen:

| Token | Wert | ersetzt |
|---|---|---|
| `--space-1 … --space-5` | 0,5 / 0,75 / 1 / 1,5 / 2 rem | 0,15–2 rem Einzelwerte |
| `--space-section` / `--space-foot` | `clamp(2.5rem,5vw,4.5rem)` / 3,5 rem | Section-Padding, Figuren-Abstand |
| `--label-s` / `--label-m` / `--note` | 0,6875 / 0,75 / 0,8125 rem | Labels und Notizen |
| `--measure-tight` | 54ch | Entry-/Fußnoten-Maß |
| `--state-live/-wip/-planned/-practice` / `--focus-ring` | Rollen auf `--verified`/`--signal`/`--muted`; Alias | Badges, Fokus |
| `--tint-live` / `--tint-held` | 12 % / 10 % | rgba(…,0.07/0.06) |
| `--z-sticky` / `--z-skip` | 30 / 100 | freie z-Werte |
| `--dur-fast` / `--dur-reveal` | 120 / 600 ms | freie Zeiten |

Radius nicht tokenisieren: 0 ist die Regel.
