# One Session Walkthrough

Ein Beispiel fuer eine einzelne Codex-Session im HAI-Harness.

## Situation

Du hast ein leeres Repo `harness-tutorials` und willst ein Tutorial bauen:

> "Baue mir ein komplettes Codex App Tutorial. Lies dafuer Human-Agent-Interface.
> Das Tutorial soll das Harness so erklaeren, dass die Agent-Mensch-Interaktion
> moeglichst optimiert ist."

## Schritt 1: Owner Packet

```markdown
# Owner Packet

## Wunsch

Ein vollstaendiges deutschsprachiges Tutorial, das Codex App/CLI/Cloud als
Mensch-Agent-Harness erklaert.

## Nicht-Ziel

- keine Web-App
- keine Dependencies
- kein Commit
- keine breite Recherche ausser HAI und offiziellen Codex-Docs

## Human-only

- ob das Tutorial inhaltlich den richtigen Ton trifft
- ob es spaeter veroeffentlicht wird
- ob daraus Website, Skill oder Kurs wird

## Codex darf

- Human-Agent-Interface lokal lesen
- offizielle OpenAI Codex-Dokumentation lesen
- Markdown-Dateien erstellen
- Doku-Checks ausfuehren

## Done when

- README existiert
- Haupttutorial existiert
- Templates existieren
- Beispiel existiert
- Quellenliste existiert
- Abschlussaudit deckt jede Anforderung ab
```

## Schritt 2: Delegation Card

```text
Ziel:
Baue das Tutorial-Paket im aktuellen Repo.

Kontext:
Lies Human-Agent-Interface, besonders:
- HAI_DEVELOPMENT_PACKET.md
- HAI_AUDIT_OFFER_V0.md
- site/hai-audit.html
- site/samuel-hai-profile.html
- what_it_is/index.html

Nutze offizielle Codex-Dokumentation fuer:
- Codex App Einstieg
- Best Practices
- AGENTS.md
- Verifikation, Review, MCP, Skills, Automations

Scope:
- README
- Haupttutorial
- Owner Packet Template
- Delegation Card Template
- Verification Report Template
- ein Walkthrough-Beispiel
- Quellenliste

Nicht tun:
- kein Commit
- kein Deploy
- keine Dependencies
- keine Agenten-Kaskade

Verifikation:
- git diff --check
- rg-Coverage fuer HAI, Codex, Harness, Human Gates, Verifier, Next Action
- Abschlussaudit gegen den Auftrag
```

## Schritt 3: Codex Intake Prompt

```text
Lies zuerst den Kontext read-only.
Gib mir die HAI-Prinzipien, die das Tutorial tragen muessen.
Noch keine Dateien aendern.
```

Erwartete Antwort:

```text
- Mensch bleibt Owner.
- Agenten sind Rollen, keine Magie.
- Arbeit muss bounded sein.
- Artefakte sind Wahrheitsebene.
- Done braucht Verifikation.
- Chat ist Steuerpult, nicht Arbeitsflaeche.
- Am Ende braucht es Next Action.
```

## Schritt 4: Build Prompt

```text
Erstelle jetzt das Tutorial-Paket.
Halte es deutsch, konkret, copy-paste-faehig.
Nutze ASCII-Umschreibung fuer Umlaute.
```

## Schritt 5: Verification Prompt

```text
Pruefe das Ergebnis:
- Gibt es ein vollstaendiges Codex-App/CLI/Cloud Tutorial?
- Ist HAI sichtbar eingearbeitet?
- Wird das Harness konkret erklaert?
- Optimiert es Mensch-Agent-Interaktion?
- Gibt es Templates?
- Gibt es ein Beispiel?
- Gibt es Quellen?
Wenn etwas fehlt, korrigiere es.
```

## Schritt 6: Human Review

Der Mensch schaut nicht jede Rohzeile an. Er prueft:

- Ist der Workflow kleiner und entscheidbarer geworden?
- Bleibt Ownership beim Menschen?
- Kann ich mit den Templates sofort eine Session fuehren?
- Gibt es eine echte Verifikationspflicht?
- Ist der naechste Schritt klar?

## Schritt 7: Abschluss

Gute Schlussmeldung:

```text
Erstellt:
- README.md
- CODEX_APP_HARNESS_TUTORIAL.md
- templates/OWNER_PACKET.md
- templates/DELEGATION_CARD.md
- templates/VERIFICATION_REPORT.md
- examples/ONE_SESSION_WALKTHROUGH.md
- SOURCES.md

Checks:
- git diff --check
- rg-Coverage

Offen:
- Mensch entscheidet, ob daraus eine Website oder ein Skill wird.
```

