# Multi-Tool Agent Harness Tutorial

Dieses Dokument erweitert das Codex-Harness auf Claude Code, Hermes, OpenClaw,
OpenCode, Pi und Conductor.

Der Kern bleibt gleich:

> Mensch = Owner. Tool = begrenzte Rolle. Artefakt = Wahrheitsebene.
> Verifikation = Done-Grenze.

## 1. Gemeinsames Harness

Jedes Tool bekommt dieselbe Grundstruktur:

1. Owner Packet
2. Tool-Rolle
3. Scope Boundary
4. Human Gates
5. Artifact Contract
6. Verification Report
7. Next Action

Der Unterschied liegt nicht in der Philosophie, sondern im Griff:

| Tool | Harness-Rolle | Beste Aufgabe | Harte Grenze |
| --- | --- | --- | --- |
| Codex | lokaler Coding-Agent | Repo-Diffs, Tests, Reviews, Docs | keine Commits/Deploys ohne Freigabe |
| Claude Code | tiefer Codebase-Arbeiter | komplexe Planung, Debugging, Refactor | Engine-Grenzen und breite Refactors markieren |
| Hermes | Control Plane | Profile, Skills, Memory, Verifier | Samuel bleibt Owner fuer Scope/Architektur |
| OpenClaw | Router/Gateway | Sessions, Agents, Gateway, Scout-Build-Verify | Config/Auth/Devices nur mit Human Gate |
| OpenCode | schneller Builder/Reality-Check | One-shot Drafts, Gegenentwurf, kleine Diffs | voller Kontext pro Run, kein Reparatur-Chat bei falschem Scope |
| Pi | Intake/Reflexion | Wunsch klaeren, Lage sortieren | keine Umsetzung, keine Done-Claims |
| Conductor | Orchestrierung | Worker schneiden, Reihenfolge, Integration | kein Fanout ohne getrennte Write Scopes |

## 2. Tool-spezifische Delegation

### Claude Code

```text
Tool:
Claude Code

Rolle:
Tiefer Codebase-Arbeiter fuer Planung, Implementierung und Review.

Harness:
- Lies Repo-Regeln und relevante Dateien zuerst.
- Arbeite in kleinem Scope.
- Markiere Annahmen ueber Engine-/Tool-Verhalten.
- Belege Erfolg mit Tests, Diff und Review.

Human Gate:
- breite Refactors
- neue Dependencies
- Architekturwechsel
- unsichere Engine-/Context-Annahmen
```

### Hermes

```text
Tool:
Hermes

Rolle:
Control Plane fuer Profile, Skills, Memory, Verifier und Owner-Schutz.

Harness:
- Waehle ein explizites Profil.
- Baue zuerst ein Owner Packet.
- Delegiere nur bounded an Worker.
- Verifier oder Decision-Control prueft Done.

Human Gate:
- neue Profile
- neue aktive Projekte
- irreversible Scope-/Architekturentscheidungen
```

### OpenClaw

```text
Tool:
OpenClaw

Rolle:
Router/Gateway fuer Agenten, Sessions und komplexe Pipeline-Flows.

Harness:
- Router bleibt Frontdoor.
- Komplexe Aufgaben gehen an Hermes oder Scout -> Build -> Verify.
- Gateway/Status/Logs sind Evidence, nicht Dekoration.
- Neue Spezialisten brauchen Zustimmung.

Human Gate:
- gateway/config/devices/auth
- neue Agents oder Bindings
- riskante technische Aenderungen
```

### OpenCode

```text
Tool:
OpenCode

Rolle:
Schneller Builder und Reality-Check-Agent.

Harness:
- Gib Kontext in jedem Run vollstaendig mit.
- Nenne Output-Pfad und Nicht-Ziele.
- Nutze OpenCode fuer kleine Diffs, Drafts oder Gegenentwuerfe.
- Wenn der Run falsch gescoped war: neue Session mit besserem Briefing.

Human Gate:
- mehr Dateien als geplant
- fehlender Output-Pfad
- Website statt Tool/Dashboard Drift
```

### Pi

```text
Tool:
Pi

Rolle:
Persoenlicher Intake- und Reflexionsdialog.

Harness:
- Klaere Wunsch, Zustand und Bedeutung.
- Erzeuge Problemklassifikation und Human-only Liste.
- Uebergib an ein Arbeits-Tool.
- Behaupte keine Umsetzung.

Human Gate:
- jede Entscheidung ueber Ziel, Sinn, Risiko und naechste reale Aktion
```

### Conductor

```text
Tool:
Conductor

Rolle:
Orchestrierung fuer mehrere begrenzte Worker.

Harness:
- Ein Lead.
- Disjunkte Write Scopes.
- Worker Contracts.
- Integration Checklist.
- Gemeinsamer Verifier.

Human Gate:
- Fanout
- parallele Schreibbereiche
- neue Worker
- unklarer Integrationspunkt
```

## 3. Gemeinsames Done

Ein Multi-Tool-Harness ist nur done, wenn:

- die Tool-Rolle sichtbar ist
- der Mensch die Human-only Entscheidungen kennt
- jeder Worker ein Artefakt liefern muss
- kein Tool seine eigene Done-Meldung als Beweis nutzt
- ein Verification Report existiert
- die naechste menschliche Entscheidung klar ist

Wenn das nicht gilt:

> kleiner schneiden, nicht breiter orchestrieren.

