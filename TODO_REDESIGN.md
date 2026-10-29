# TODO: Website-Redesign (Brief)

Status: offen, kein Termin. Kein Redesign, bevor Schritt 1 erledigt ist.
Anlass: Feedback einer Marketing-Person, 29.10.2026.
Notion: https://app.notion.com/p/4084bf3cf60e81aa975cfe160681abfe („Website-Redesign – Brief", unter human-agent-interface.com)

## Feedback

- Gut, aber weit unter Potenzial.
- Zu statisch.
- Zu unklar, was angeboten wird.

## Diagnose

1. **Angebot unklar – das Kernproblem.** Die Hero-Headline („KI-Arbeit sollte Schwung
   geben. Oft macht sie erst mehr Chaos.") benennt ein Problem, nicht das Angebot.
   Unklar bleibt: was bekomme ich, in welcher Form, zu welchem Preis.
2. **Zu viele Angebote nebeneinander.** Navigation: Produkte, Lösungen, Ressourcen,
   Samuel; darunter HAI-MCP, Münztelefon, Sidecar, Tripwire, Versions, Audit,
   Deep-Dive u. a. Wirkt wie ein Labor, nicht wie ein Angebot.
3. **Botschaft nicht entschieden.** Drei Hero-Varianten laufen parallel
   (`A_control`, `B_offer_first`, `C_proof_first`, Experiment
   `homepage-hero-2026-05-23`).
4. **„Statisch" ist ein Symptom.** Mehr Bewegung macht die Seite lebendiger, aber
   nicht klarer. Gestaltung kommt nach der Klarheit.

## Schritte (in dieser Reihenfolge)

- [ ] **Angebotssatz festlegen:** „Ich helfe [wem] bei [was], in [Form], für [Preis/Aufwand]."
- [ ] **Hero-Experiment auswerten:** Analytics Engine Dataset `hai_site_events`
      (Binding `HAI_SITE_EVENTS`, siehe `src/worker.js`). Pro Variante
      `hero_impression` gegen `hero_cta_click`/`cta_click` vergleichen,
      Gewinner festlegen, Experiment beenden.
- [ ] **Startseite auf ein Hauptangebot + einen CTA reduzieren.** Übrige Produkte eine
      Ebene tiefer (Produktseite / Navigation).
- [ ] **Danach erst Design und Bewegung** (Redesign, Animation, Bildsprache).
