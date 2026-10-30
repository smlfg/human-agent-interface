# UX-/DE-EN-Konsistenzaudit — 30.10.2026

Read-only-Audit der acht Seiten, Canonicals, `llms.txt`, Brand-/UI-UX-Skill. UX-Queries: microcopy button label, error message, headline clarity, tone of voice (0 Treffer), CTA label, empty state, link text. Keine Seite geändert.

## Top 12 nach Wirkung

**1. Open Source fehlt DE** — `was-ist-hai/` L128/171, Meta/JSON-LD. DE: „…die Kontrollschicht…“; EN: „…an open-source control layer…“. DE → „…die Open-Source-Kontrollschicht…“; EN-Definition L171 bleibt; EN-Hero/Meta/JSON-LD angleichen. Canonical/`llms.txt` nennen open-source; ohne HAI-Repo/Lizenz Claim auf HAI-MCP begrenzen.

**2. „Beweis/Proof“ überclaimt** — `beweis/` L6/146, `en/proof/` L6/146. „Der Beweis.“ / „The Proof.“ → H1 „Belege und Lücken.“ / „Evidence and gaps.“; Nav „Belege“ / „Evidence“. Seite: L1 offen, kein Runtime-Verbund, keine Fallstudie, kein Audit; Canonical: evidence/Belege.

**3. Sechs Zeilen, acht Domains** — `index.html` L333–341, EN analog. Sechs Zeilen, Text: „Eine von acht Domains ist gebunden.“ → alle acht zeigen oder „Sechs gezeigt, acht gezählt: eine live.“ / „Six shown, eight counted: one live.“ `/mesh/` listet acht.

**4. Startseite streicht Beleg-Caveats** — `index.html` L237–257, Meta L7; EN analog. „23 Tools“, „223 Transkripte“, Status „L1 in Arbeit / Open Source / Praxis“. → „23 Tools (Glama, 08.09.2026)“, „223 Transkripte (eigene Zählung, 30.10.2026)“, Legende „L1 = DoD offen; Open Source = lesbar, nicht auditiert; Praxis = benutzt, nicht bewiesen“. EN analog. Proof hat sie.

**5. Plaud-Caveat nur EN im Fließtext** — `beweis/` L427 vs. `en/proof/` L426. DE: „…Docs-Vertrag mit Owner-Ack vom 19.08.2026.“ EN: „…— no stable, no runtime, no qualify.“ DE → Zusatz „— kein Stable, kein Runtime, kein Qualify.“; EN → „— no stable release, no runtime, no qualification.“ fn3 hat ihn.

**6. Falsche Freunde** — `was-ist-hai/` L232: DE „Abbruchkriterien“, EN „completion criteria“; `beweis/` L281/448: DE „Drei Wechsel“, EN „three switches“. → Bedeutung klären; bei „fertig“ DE „Fertigstellungskriterien“, sonst EN „abort criteria“. Ablauf: EN „three handovers“, DE „drei Übergaben“. „Switch“ = Schalter, nicht Übergang.

**7. „Anhalten/Hold“ ist kein Deny** — `index.html` L281/288, EN analog; `data-action="deny"`. „Anhalten“ / „Hold“, Status „angehalten“ / „held“ → „Ablehnen“ / „Deny“, „abgelehnt“ / „denied“. Sonst Pause statt Ablehnung; Fortsetzen fehlt.

**8. Gate ist Demo, sagt es nicht** — `index.html` L276–309, EN analog. „Drei Vorschläge, ein Gate“, „Nichts verlässt dieses Gerät“, Reset „Alles zurücksetzen“. → „Beispiel-Gate: drei Vorschläge“, Reset „Beispiel zurücksetzen“; EN „Example gate…“, „Reset example“.

**9. HAI-Gender: „Sie“ vs. „es“** — `was-ist-hai/` L128/171/221, `index.html` L140, JSON-LD L80/92, Fußnote L385. „Sie macht…“, aber Meta „Wie es arbeitet“; Canonical „Es macht…“; Seite duzt. → „HAI macht…“ statt Pronomen oder durchgehend „es“. „Sie“ ist als formelles „Sie“ lesbar.

**10. Varianten-Schalter ist Debug-UI** — Footer L387–392, Statusline L113, `assets/hai.js` L20–33. Öffentlich „Variante A/B/C“; Statusline statisch „Variante C · Instrument“, auch bei `?v=A`. → entfernen oder „Testvariante (intern)“; Statusline aus JS aktualisieren. EN „Variant“.

**11. Jargon-Wand HAI-MCP** — `index.html` L245, EN analog. „Missionen, Verträge, Leases, Owner-Gates und Audit.“ → DE „Missionen (Ziel/Limit), Verträge (Rahmen), Leases (befristete Erlaubnis), Owner-Gates (Freigabe), Audit (Entscheidungsspur).“ EN analog.

**12. EN klingt übersetzt** — `en/index.html` L260 „lived practice“; `en/proof/` L380 „an own count“, L425 „dock contract“, L197 „Maturity is not rank“, L290 „Abort criterion“. → „working practice“, „our own count“, „intake contract“, „Maturity is not a rank“, „Stop criterion“. DE korrekt.

## DE/EN-Parität

| Paar | Status | Drift |
|---|---|---|
| `/` ↔ `/en/` | teilweise | „Du entscheidest“ vs. „You keep the call“; „gelebte Praxis“ vs. „lived practice“; „Sprache als Eingang“ vs. „voice as input“. |
| `was-ist-hai` ↔ `what-is-hai` | kritisch | DE ohne open-source; „Abbruchkriterien“ vs. „completion criteria“; „nicht verantwortet“ vs. „not human-owned“; EN extra „The contract is the boundary…“. |
| `beweis` ↔ `proof` | teilweise | DE-Fließtext ohne „no stable/no runtime/no qualify“; DE „DoD“ vs. EN „L1/L2 DoD“; „Drei Wechsel“ vs. „three switches“; DoD: DE-Sätze/EN-Nomen. |
| `mesh` ↔ `mesh` | gut | „Ordnung“ vs. „order“; „eigene Domain“ vs. „own domain“; „Verantwortung“ vs. „Responsibility“, Abschnitt „Ownership“; „Abbruchkriterium“ vs. „Abort criterion“. |

## Glossar

| Term | DE | EN | Regel |
|---|---|---|---|
| HAI | Human Agent Interface (HAI) | same | Ausschreiben; nicht „Plattform“. |
| Kontrollschicht | Kontrollschicht | control layer | HAI-Konzept; nicht für HAI-MCP. |
| Control Plane | MCP-Control-Plane | MCP control plane | Nur HAI-MCP; einmal definieren. |
| agentisch | agentische Arbeit | agentic work | Nicht mit „Agentenarbeit“ mischen. |
| Owner-Gate | Owner-Gate | owner gate | DE Bindestrich; EN Common Noun; „Owner Gate“ nur Diagramm. |
| Mission | Mission | mission | HAI-Objekt; „Auftrag“ nur allgemein. |
| Lease | Lease | lease | Glossieren: befristete Arbeitserlaubnis. |
| Beleg | Beleg | evidence | Seitenlabel; nicht „Beweis/proof“. |
| Open Source | Open Source; Open-Source-… | open source; open-source | Nomen vs. Adjektiv trennen; Beleg nötig. |
| PenEcho/Plaud | PenEcho/Plaud | same | Ein Wort; Plaud ist externer Kanal, kein HAI-Teil. |

## Was bleiben muss

„Agenten arbeiten. Du entscheidest.“; „Eine Schicht, kein Chatfenster.“; „Aufnahme ist kein Auftrag.“; „Punkt 6 ist unbequem …“; „Reifegrad ist kein Rang“; „Beleg heißt …“; „Keine Behauptung ohne Beleg. Kein Beleg ohne Datum. Kein Datum ohne Verantwortlichen.“ Die Proof-Seite ist sprachlich am stärksten, weil sie Caveats nicht versteckt.

## Sprachqualität

DE: „Der Server trifft keine Freigabe“ → „erteilt keine Freigabe“; „Die Control Plane führt fünf Dinge“ → „verwaltet fünf Dinge“; „ein verbundenes Runtime“ → „eine verbundene Laufzeit“; „verengt das Ergebnis“ → „schärft/begrenzt“. EN: „Task and working as handwriting“ → „Task and working, handwritten“; „Only one is the deploy state“ → „Only one is current“; „without an error“ → „without an error message“; EN mischt britisch/US (`recognises`/`artifact`); Fachbegriffe ausgenommen.
