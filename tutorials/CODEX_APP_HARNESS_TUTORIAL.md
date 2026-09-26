# Codex App Harness Tutorial

Ein komplettes, HAI-basiertes Tutorial fuer Codex App, CLI, IDE Extension und
Cloud.

## 0. Ziel

Dieses Tutorial erklaert nicht nur, welche Knoepfe Codex hat.

Es erklaert, wie du Codex so benutzt, dass die Mensch-Agent-Interaktion besser
wird:

- weniger diffuser Auftrag
- weniger Scope Creep
- weniger Rohlog im Chat
- weniger falsche Done-Meldungen
- mehr menschliche Ownership
- mehr pruefbare Artefakte
- klarerer naechster Schritt

Die Grundidee kommt aus dem Human-Agent-Interface:

> HAI uebersetzt menschliche Unklarheit in begrenzte, kontrollierbare,
> agentisch bearbeitbare Arbeit.

## 1. Was ist ein Codex-Harness?

Ein Harness ist die Arbeitsumgebung, die verhindert, dass ein Agent einfach
loslaeuft.

In diesem Tutorial besteht das Harness aus neun Teilen:

1. **Projektanker**: der echte Repo-Ordner, in dem Codex arbeiten darf.
2. **Repo-Regeln**: `AGENTS.md` mit lokalen Konventionen und Stop-Regeln.
3. **Thread-Grenze**: ein Thread pro zusammenhaengender Aufgabe.
4. **Owner Packet**: eine kurze menschliche Entscheidungsvorlage vor dem Lauf.
5. **Delegation Card**: ein klarer Arbeitsauftrag fuer Codex.
6. **Human Gates**: Stellen, an denen Codex stoppen und den Menschen fragen muss.
7. **Artifact Contract**: welche Datei, Diff, Log, Test oder Report entstehen muss.
8. **Verifier Loop**: Belege pruefen, bevor das Ergebnis akzeptiert wird.
9. **Next Action Packet**: am Ende ist klar, was als naechstes passieren soll.

Das Harness ist also nicht "mehr Automatisierung".

Das Harness ist:

> Richtung, Grenze, Beleg und Anschlussentscheidung.

## 2. HAI-Mentalmodell fuer Codex

Behandle Codex nicht als Alles-Assistent.

Behandle Codex als Worker in einem Mensch-Agent-System:

| Ebene | Aufgabe |
| --- | --- |
| Mensch | Ziel, Sinn, Risiko, Scope, Freigabe, Abbruch |
| Codex | Exploration, Planung, Umsetzung, Tests, Review, Handoff |
| Artefakte | Dateien, Diffs, Logs, Tests, Reports |
| Verifier | prueft, ob der behauptete Erfolg wirklich belegt ist |
| Harness | haelt diese Ebenen getrennt |

Der wichtigste Satz:

> Chat ist Steuerpult, nicht Arbeitsflaeche.

Lange Logs, umfangreiche Diffs, Rohnotizen und Audit-Ergebnisse gehoeren in
Dateien. Der Chat soll die Entscheidung ermoeglichen.

## 3. Codex-Oberflaechen

Codex gibt es als mehrere Oberflaechen. Das Harness-Prinzip bleibt gleich.

| Oberflaeche | Gut fuer | Harness-Hinweis |
| --- | --- | --- |
| Codex App | lokale Threads, Worktrees, Review-Pane, Automations | ideal fuer parallele, sichtbare Aufgaben |
| IDE Extension | Arbeiten direkt neben Code | gut fuer kleine bis mittlere Changes |
| CLI | Linux, Terminal, schnelle Repo-Arbeit | gut fuer Samuel/Pop!_OS |
| Cloud | GitHub-angebunden, Background-Aufgaben, PRs | gut fuer isolierte Tasks und Review |

Offizielle Codex-Dokumentation beschreibt fuer die App: Projekt auswaehlen,
lokal arbeiten, ersten Prompt senden, Diffs reviewen und bei Bedarf Git
Worktrees, Automations, MCP, Skills und Plugins verwenden.

Fuer Linux ist der praktische Weg aktuell Codex CLI, IDE Extension oder Cloud.
Das Tutorial nutzt deshalb die Codex-App-Begriffe, bleibt aber CLI-kompatibel.

### 3.1 Codex App in 10 Minuten

Wenn du die Desktop App nutzt, ist der HAI-kompatible Ablauf:

1. App installieren und anmelden.
2. Den konkreten Projektordner auswaehlen, nicht den Parent-Ordner.
3. Fuer lokale Arbeit **Local** auswaehlen.
4. Einen neuen Thread fuer genau eine Aufgabe starten.
5. Zuerst eine Delegation Card statt eines diffusen Wunsches senden.
6. Codex lesen und planen lassen, bevor es schreibt.
7. Bei Datei-Aenderungen die Diff-Ansicht als Human Gate nutzen.
8. Terminal-Ausgaben und Tests als Evidence Panel behandeln.
9. Vor Akzeptanz einen Verification Report verlangen.
10. Erst nach menschlicher Review committen, pushen oder deployen.

Mapping der App auf das Harness:

| Codex-App-Element | HAI-Funktion |
| --- | --- |
| Projektliste | Projektanker |
| Thread | Task-Grenze |
| Worktree | isolierter Schreibbereich |
| Diff Panel | Human Review Gate |
| Terminal/Actions | Evidence Collection |
| Browser/Preview | Smoke Check |
| Automations | wiederholbare, stabile Harness-Routine |
| Skills/Plugins/MCP | wiederverwendbare Methode und externer Kontext |

## 4. Der erste Harness-Aufbau

### 4.1 Projektanker waehlen

Oeffne immer den echten Projektordner.

Falsch:

```text
~/Projekte
```

Besser:

```text
~/Projekte/mein-konkretes-repo
```

Codex muss wissen:

- welches Repo gilt
- welche Dateien gelesen werden duerfen
- welche Dateien nicht beruehrt werden sollen
- welche Tests relevant sind
- ob der Worktree bereits dirty ist

### 4.2 `AGENTS.md` kurz halten

Ein gutes `AGENTS.md` ist kein Roman. Es enthaelt die Regeln, die Codex bei
jedem Lauf braucht.

Minimal:

```markdown
# AGENTS.md

## Projekt

Kurzbeschreibung des Repos.

## Befehle

- Tests: `...`
- Lint: `...`
- Dev Server: `...`

## Regeln

- Lies Dateien, bevor du sie editierst.
- Halte Aenderungen eng am Auftrag.
- Keine Commits ohne Freigabe.
- Keine neuen Dependencies ohne Begruendung.
- Done nur mit Tests, Smoke-Check oder konkretem Beleg.

## Human Gates

Frage vor:

- destruktiven Aktionen
- neuen Dependencies
- Scope-Erweiterung
- Secrets/Auth/Deployment
- Architekturwechseln
```

### 4.3 Checkpoint vor Arbeit

Bevor Codex schreibt:

```bash
git status --short
```

Bei einem dirty Worktree gilt:

- nicht aufraeumen
- nicht revertieren
- Ausgangszustand notieren
- nur eigene Aenderungen verantworten

## 5. Owner Packet

Vor jeder groesseren Aufgabe braucht der Mensch eine kurze Entscheidungsvorlage.

Nutze [templates/OWNER_PACKET.md](templates/OWNER_PACKET.md).

Ein gutes Owner Packet beantwortet:

1. Was will ich wirklich erreichen?
2. Warum ist das jetzt wichtig?
3. Welche Teile bleiben Human-only?
4. Was darf Codex tun?
5. Woran erkenne ich Erfolg?
6. Wann muss Codex stoppen?

Beispiel:

```markdown
# Owner Packet

## Wunsch

Ich will ein Tutorial bauen, das Codex als Harness erklaert.

## Human-only

- Zielgruppe festlegen
- Ton und Anspruch akzeptieren
- Scope-Erweiterung freigeben

## Codex darf

- lokale HAI-Artefakte lesen
- offizielles Codex-Docs-Material auswerten
- Markdown-Dateien erstellen
- Vollstaendigkeit pruefen

## Done when

- Tutorial existiert
- Templates existieren
- Beispiel existiert
- Quellen sind dokumentiert
- Abschlussaudit zeigt, dass jede Anforderung abgedeckt ist
```

## 6. Delegation Card

Die Delegation Card ist der eigentliche Codex-Prompt.

Nutze [templates/DELEGATION_CARD.md](templates/DELEGATION_CARD.md).

Struktur:

```markdown
Ziel:
Kontext:
Scope:
Nicht tun:
Erlaubte Aktionen:
Human Gates:
Artefakte:
Verifikation:
Abschlussformat:
```

Guter Prompt:

```text
Ziel:
Baue ein deutschsprachiges Codex-Harness-Tutorial fuer dieses Repo.

Kontext:
- Lies zuerst das HAI-Entwicklungspaket deines Projekts (z. B. `HAI_DEVELOPMENT_PACKET.md`).
- Lies danach die HAI-Audit- und Profilseiten.
- Nutze offizielle Codex-Dokumentation fuer App/Best Practices.

Scope:
- Markdown-Tutorial
- Templates
- ein durchgespieltes Beispiel
- Quellenliste

Nicht tun:
- keine Website
- keine Dependencies
- kein Commit
- kein Multi-Agent-Fanout

Human Gates:
- stoppen, wenn Zielgruppe oder Format unklar wird
- stoppen vor externem Deploy
- stoppen vor Commit

Verifikation:
- Pruefe, ob Ziel, HAI-Prinzipien, Codex-App-Bedienung, Harness-Workflow,
  Templates und Beispiel wirklich vorhanden sind.
```

## 7. Der Codex-Lauf als 6-Phasen-Protokoll

### Phase 1: Intake

Codex soll zuerst verstehen, nicht bauen.

Prompt:

```text
Lies die relevanten Dateien und fasse mir nur zusammen:
- Was ist das Ziel?
- Welche Quellen sind relevant?
- Was ist unklar?
- Welche Artefakte wuerdest du erstellen?
Noch keine Dateien aendern.
```

### Phase 2: Plan

Bei komplexen Aufgaben zuerst Plan Mode nutzen.

Prompt:

```text
Erstelle einen Plan mit maximal 6 Schritten.
Zu jedem Schritt:
- welches Artefakt entsteht
- welcher Beleg zeigt Erfolg
- wo ist ein Human Gate
Noch nicht implementieren.
```

### Phase 3: Bounded Build

Jetzt erst ausfuehren.

Prompt:

```text
Implementiere den Plan.
Halte den Scope auf die geplanten Artefakte begrenzt.
Wenn du einen neuen Ansatz brauchst, stoppe und melde den Grund.
```

### Phase 4: Evidence

Codex muss Belege erzeugen.

Prompt:

```text
Pruefe die entstandenen Artefakte gegen den Auftrag.
Liste jeden expliziten Auftragspunkt und den konkreten Datei-/Zeilenbeleg.
Wenn etwas fehlt, behebe es zuerst.
```

### Phase 5: Review

Codex soll die eigene Arbeit kritisch lesen.

Prompt:

```text
Reviewe deine Aenderungen wie ein strenger Maintainer:
- falsche Behauptungen
- fehlende Tests oder Belege
- Scope Drift
- unklare Anleitung
- riskante Empfehlungen
Fuehre notwendige Korrekturen aus.
```

### Phase 6: Handoff

Am Ende braucht der Mensch keinen Roman, sondern Anschluss.

Prompt:

```text
Gib mir:
- was wurde erstellt
- wo liegt es
- welche Verifikation lief
- was bleibt offen
- der kleinste sinnvolle naechste Schritt
```

## 8. Human Gates

Human Gates sind keine Bremse. Sie halten Ownership beim Menschen.

Codex muss stoppen bei:

- Zielwechsel
- Scope-Erweiterung
- neuen Dependencies
- destruktiven Shell-Aktionen
- Secrets/Auth/Deployment
- unklarem Repo oder falschem Arbeitsordner
- Konflikt mit bestehendem Code
- Tests, die aus unbekanntem Grund fehlschlagen
- allem, was irreversibel oder teuer ist

Eine gute Gate-Formulierung:

```text
Stoppe und frage mich, wenn du mehr als die vereinbarten Dateien anfassen
muesstest oder wenn die Aufgabe kein klares Done mehr hat.
```

## 9. Artefakte als Wahrheitsebene

Akzeptiere keine reine Erfolgsmeldung.

Schlechte Done-Meldung:

```text
Fertig, das Tutorial ist jetzt vollstaendig.
```

Gute Done-Meldung:

```text
Fertig mit Belegen:
- Tutorial: CODEX_APP_HARNESS_TUTORIAL.md
- Templates: templates/*.md
- Beispiel: examples/ONE_SESSION_WALKTHROUGH.md
- Quellen: SOURCES.md
- Checks: git diff --check, rg-Coverage fuer HAI/Codex/Harness/Verifier
```

Wahrheit liegt in:

- Dateien
- Diffs
- Tests
- Logs
- Review-Ergebnissen
- expliziten Checklisten

## 10. Verifier Loop

Nutze [templates/VERIFICATION_REPORT.md](templates/VERIFICATION_REPORT.md).

Die Verifikation fragt:

1. Wurde der Auftrag in konkrete Anforderungen zerlegt?
2. Gibt es fuer jede Anforderung ein Artefakt?
3. Gibt es fuer jedes Artefakt einen Beleg?
4. Deckt der Beleg die Anforderung wirklich ab?
5. Gibt es eine offene Unsicherheit?

Wenn ja:

> Nicht done.

## 11. Worktrees und parallele Arbeit

Codex App kann Worktrees nutzen. Der HAI-Grundsatz:

> Parallelitaet nur, wenn Ownership und Schreibbereiche getrennt sind.

Gute Worktree-Nutzung:

- ein Worktree fuer UI-Polish
- ein Worktree fuer Backend-Bugfix
- ein Worktree fuer Docs

Schlechte Worktree-Nutzung:

- drei Agenten schreiben dieselbe Datei
- unklare Hauptversion
- kein gemeinsamer Verifier
- mehrere Threads ohne Abschlussartefakt

Regel:

```text
Nur parallelisieren, wenn jeder Worker einen eindeutigen Write Scope und ein
eigenes Artefakt hat.
```

## 12. MCP, Skills und Automations

Nutze MCP nur, wenn Kontext ausserhalb des Repos wirklich gebraucht wird.

Gute MCP-Faelle:

- GitHub PR-Kommentare lesen
- Kalender/Meeting-Kontext fuer eine Entscheidung
- offizielle OpenAI-Dokumentation
- ein internes Ticketsystem

Schlechte MCP-Faelle:

- "mal alles verbinden"
- Tools ohne konkreten Workflow
- Live-Daten, die fuer den Auftrag egal sind

Skills sind fuer wiederholbare Methoden:

- Debug-Protokoll
- Review-Checkliste
- Release Notes
- Harness-Eval
- Meeting Prep

Automations sind fuer stabile wiederkehrende Laeufe:

- woechentlicher Repo-Health-Check
- CI-Failure-Triage
- offene PRs zusammenfassen
- wiederkehrende Doku-Aktualisierung

HAI-Regel:

> Erst Methode stabilisieren, dann automatisieren.

## 13. Copy-Paste-Prompts

### Repo kennenlernen

```text
Lies dieses Repo read-only.
Gib mir:
- Zweck des Projekts
- wichtigste Dateien
- vorhandene Befehle
- Risiken
- kleinster sinnvoller naechster Schritt
Keine Dateien aendern.
```

### Aufgabe in HAI-Form bringen

```text
Uebersetze meinen diffusen Wunsch in ein Owner Packet:
- Ziel
- Nicht-Ziel
- Human-only Entscheidungen
- was Codex tun darf
- Artefakte
- Verifikation
- Stop-Regeln
Noch nicht bauen.
```

### Bounded Build

```text
Arbeite nur an der beschriebenen Aufgabe.
Lies betroffene Dateien zuerst.
Mache minimale, zusammenhaengende Aenderungen.
Verifiziere mit vorhandenen Tests oder konkretem Smoke-Check.
Wenn der Scope waechst, stoppe.
```

### Verifikation

```text
Erstelle einen Verification Report:
- jede explizite Anforderung
- konkreter Beleg
- durchgefuehrter Check
- offene Risiken
- verdict: PASS / PASS_WITH_WARNINGS / BLOCKED
Wenn etwas fehlt, korrigiere es vor dem Verdict.
```

### Handoff

```text
Fasse fuer den Menschen zusammen:
- was geaendert wurde
- welche Dateien relevant sind
- welche Checks liefen
- was ich entscheiden muss
- was der kleinste naechste Schritt ist
Maximal 10 Bullet Points.
```

## 14. Typische Fehler und Gegenmittel

| Fehler | Symptom | Gegenmittel |
| --- | --- | --- |
| Zu grosser Auftrag | Codex liest ewig, schreibt breit | Owner Packet auf eine Aufgabe reduzieren |
| Kein Artifact Contract | Chat klingt fertig, nichts ist pruefbar | Datei/Test/Report vorab definieren |
| Kein Human Gate | Agent entscheidet Scope selbst | Gate fuer Risiko, Scope, Dependencies |
| Rohlog im Chat | Mensch verliert Ueberblick | Ergebnisse in Dateien, Chat als Cockpit |
| Done ohne Beleg | "Fertig" ohne Tests/Checks | Verification Report erzwingen |
| Agenten-Kaskade | viele Worker, kein Owner | ein Lead, klare Schreibbereiche, Stop-Regel |
| Falscher Ordner | Codex arbeitet im Parent-Repo | `pwd`, `git status`, Projektanker |
| Automatisierung zu frueh | wiederkehrender Unsinn | erst manueller stabiler Ablauf, dann Automation |

## 15. Mini-Uebung

Nimm ein kleines Repo und fuehre diesen Ablauf aus:

1. `git status --short`
2. Owner Packet schreiben
3. Delegation Card schreiben
4. Codex nur read-only scannen lassen
5. Plan mit Human Gates erstellen lassen
6. Bounded Build ausfuehren
7. Verification Report verlangen
8. Diff selbst reviewen
9. Next Action Packet schreiben lassen

Done ist erst, wenn du sagen kannst:

> Ich weiss, was Codex getan hat, warum es im Scope war, welche Belege
> existieren, was unsicher bleibt und was ich als naechstes entscheide.

## 16. Abschluss-Checkliste fuer ein gutes Codex-Harness

- [ ] Es gibt einen eindeutigen Projektanker.
- [ ] `AGENTS.md` beschreibt Befehle, Regeln und Human Gates.
- [ ] Der Thread hat genau eine Aufgabe.
- [ ] Ein Owner Packet existiert.
- [ ] Eine Delegation Card existiert.
- [ ] Human-only Entscheidungen sind markiert.
- [ ] Erlaubte und verbotene Aktionen sind klar.
- [ ] Das erwartete Artefakt ist vorab definiert.
- [ ] Codex muss bei Scope Drift stoppen.
- [ ] Verifikation ist Teil von Done.
- [ ] Der Mensch reviewt Diff oder Report.
- [ ] Am Ende gibt es ein Next Action Packet.

Wenn diese Liste zu schwer wirkt, ist der Auftrag zu gross.

Dann gilt:

> kleiner schneiden, nicht haerter pushen.
