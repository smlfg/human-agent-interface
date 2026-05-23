# HAI Live Harness Onboarding Agent V0

## 1. Produktidee

Ein zeitbegrenzter Live-Agent auf der HAI-Webseite, der Nutzern hilft, ihr Agenten-/Coding-Harness zu verstehen und HAI-konform einzusetzen.

Der Nutzer waehlt vor der Session sein Harness, zum Beispiel Claude Code, Codex, Cursor, Hermes, OpenCode oder ein anderes Tool. Der Agent erklaert HAI nicht abstrakt, sondern am konkreten Arbeitsproblem des Nutzers. Am Ende entsteht ein kleines Session-Paket mit Problemverstaendnis, Harness-Empfehlung, naechsten Schritten und optionalem Kontakt zu Samuel.

Das Produkt ist nicht "Chatte mit einer KI". Es ist gefuehrtes agentisches Onboarding fuer ein konkretes Tool.

## 2. Zielgruppe

Menschen, die Claude Code, Codex, Cursor, Hermes, OpenCode oder aehnliche Agenten-/Coding-Harnesses nutzen wollen, aber unsicher sind, wie sie diese kontrolliert und produktiv einsetzen.

Typische Nutzer:

- Einsteiger, die ein Tool ausprobieren, aber nicht wissen, wie sie gute Aufgaben formulieren.
- Fortgeschrittene, die merken, dass Agenten zu breit bauen, Kontext verlieren oder falsches "Done" melden.
- Power User, die ihr Setup sicherer, kleiner und besser verifizierbar machen wollen.
- Menschen mit agentischem Kopfweh: viel Output, aber wenig Owner-Kontrolle.
- Samuel selbst als Dogfooding-Nutzer, um Harnesses besser zu verstehen und HAI-Patterns praktisch zu schaerfen.

## 3. Kernversprechen

In 10 Minuten wird aus einem diffusen Agentenproblem ein konkreter, sicherer naechster Harness-Schritt.

Der Agent verspricht nicht, das Projekt des Nutzers zu loesen. Er verspricht, das Problem so zu klaeren, dass der Mensch danach kontrollierter mit seinem Harness weiterarbeiten kann.

Kernsatz:

```text
Konfiguriere dein Agenten-Harness so, dass es dich nicht ueberfordert, sondern kontrolliert unterstuetzt.
```

## 4. User Journey

1. Nutzer kommt auf die HAI-Webseite.
2. Nutzer klickt "Live Harness Check starten".
3. Nutzer waehlt ein Harness:
   - Claude Code
   - Codex
   - Cursor
   - Hermes
   - OpenCode
   - Ich weiss nicht / anderes Tool
4. Nutzer gibt optional Kontext ein:
   - Was willst du mit Agenten besser machen?
   - Wo haengst du gerade?
   - Anfaenger / Fortgeschritten / Power User
5. Nutzer startet V0 als kostenlose oder testweise freigeschaltete Text-Session.
6. Session laeuft mit Timer und Nachrichtenlimit.
7. Agent fragt nach Ziel, aktuellem Problem, Risiko, Kontrollbedarf und gewuenschtem naechsten Schritt.
8. Agent erklaert HAI anhand des konkreten Harness-Problems.
9. Agent macht konkrete, nicht-ausfuehrende Setup- oder Arbeitsweise-Vorschlaege.
10. Am Ende bekommt der Nutzer ein kompaktes Session-Paket:
    - Problemverstaendnis
    - ausgewaehltes Harness
    - Harness-Empfehlung
    - 1-3 naechste Schritte
    - relevante HAI-Prinzipien
    - optionaler Kontakt zu Samuel

## 5. Agentenfaehigkeiten

Der Agent darf:

- HAI in Bezug auf das konkrete Nutzerproblem erklaeren.
- Das ausgewaehlte Harness grob einordnen.
- Offizielle Tutorials und Docs des Harness zusammenfassen, wenn sie als Quelle eingebunden sind.
- Tutorial-Inhalte in HAI-Sprache uebersetzen: Scope, Human Gates, Rechte, Risiken, Verifikation.
- Nach Ziel, aktueller Reibung, Nutzerlevel und Tool-Kontext fragen.
- Typische Harness-Fehler sichtbar machen.
- Setup-Vorschlaege machen, ohne sie selbst auszufuehren.
- Prompts, Rules oder Arbeitsprotokolle entwerfen.
- Einen sicheren naechsten Schritt formulieren.
- Ein Session-Paket erzeugen.
- Einen menschlichen Follow-up mit Samuel anbieten.

Die drei Rollen:

1. HAI erklaeren.
2. Harness-Onboarding machen.
3. Ein verwertbares Session-Paket erzeugen.

## 6. Nicht-Faehigkeiten / Sicherheitsgrenzen

Der Agent darf nicht:

- Repos veraendern.
- Dateien im Projekt des Nutzers bearbeiten.
- Secrets, API Keys, Tokens oder Passwoerter entgegennehmen oder speichern.
- Direkt auf Nutzerkonten zugreifen.
- Zahlungen ausserhalb des Payment-Flows annehmen.
- Lange private Projektdateien unkontrolliert verarbeiten.
- Autonom Agenten starten.
- Harness-Konfigurationen automatisch aendern.
- Erfolgsgarantien fuer fremde Agentenlaeufe geben.
- Rechts-, Finanz-, Medizin- oder Sicherheitsberatung als Expertenurteil ausgeben.

HAI-konforme Grenze:

```text
Beratung und Onboarding, keine unkontrollierte Ausfuehrung.
```

## 7. Session State

Der Agent braucht Session State, aber keine dauerhafte "krasse Memory".

V0-Memory ist session-lokal:

```json
{
  "selected_harness": "Claude Code",
  "user_level": "fortgeschritten",
  "main_problem": "Agent verliert Kontext und baut zu breit",
  "goal": "bessere Projektsteuerung",
  "constraints": ["keine Secrets", "kleine Schritte", "menschliche Kontrolle"],
  "recommendations": [],
  "session_summary": ""
}
```

Regeln:

- Session State dient nur der laufenden Beratung.
- Keine langfristige Speicherung ohne aktives Opt-in.
- Am Ende kann der Nutzer zustimmen:

```text
Darf Samuel diese Zusammenfassung fuer eine moegliche Beratung sehen?
```

Ohne Zustimmung wird keine Lead-Zusammenfassung dauerhaft gespeichert.

## 8. Payment Modell

Zielbild:

```text
1 EUR = 10 Minuten Session
```

Alternative spaeter:

```text
Erste Minute kostenlos
danach: 1 EUR fuer 10 Minuten
```

Produktentscheidung:

- V0 sollte technisch nicht mit Payment starten.
- V0 validiert zuerst Harness-Auswahl, Chat-Flow, Timer, Summary und Lead Capture.
- V1 fuegt Payment hinzu: bezahlen, 10 Minuten freischalten, Timer laeuft, Session endet automatisch.
- Das alte "nachwerfen wie Muenztelefon" bleibt V2, weil es technisch und UX-seitig komplexer ist.

Moegliche Payment-Anbieter fuer V1:

- Stripe
- PayPal
- Kreditkarte ueber Payment-Provider

## 9. Voice + Text

Zielbild:

```text
Agent spricht.
Text wird parallel angezeigt.
Session Summary wird schriftlich angeboten.
```

Warum:

- Voice ist emotional niedrigschwellig fuer den Einstieg.
- Text schafft Vertrauen und Nachvollziehbarkeit.
- Text erlaubt Copy/Paste fuer Prompts, Rules und naechste Schritte.
- Summary macht die Session verwertbar.

Scope:

- V0: Text-only Chat mit Timer und Session-Paket.
- V1: Voice Input via Whisper oder vergleichbare Transkription.
- V1: Voice Output via TTS.
- Immer: sichtbares Transkript und schriftliche Abschlusskarte.

## 10. Harness Skill Packs

Systemaufteilung:

```text
HAI Live System
├── Claude-Code-Onboarding-Agent
├── Codex-Onboarding-Agent
├── Hermes-Onboarding-Agent
└── Router / Intake / Payment / Session Shell
```

Das ist die wichtigere Architektur als ein einzelner grosser "Muenztelefon-Agent". Die Session Shell macht Intake, Payment-Status, Timer, Session State, Transkript und Abschlusskarte. Der Router entscheidet, welcher Onboarding-Agent die Session fuehrt. Die spezialisierten Onboarding-Agenten tragen jeweils nur ihr Harness-Wissen plus HAI-Bedienlogik.

V0 muss diese Trennung konzeptionell bereits respektieren, auch wenn technisch noch ein einzelner Prompt/Service dahintersteht.

Routing-Regel:

```text
Intake fragt:
"Welches Harness nutzt du?"

Dann Routing:
Claude Code -> Claude-Code-Agent
Codex       -> Codex-Agent
Hermes      -> Hermes-Agent
Unknown     -> General HAI Triage Agent
```

Der General HAI Triage Agent ist der Fallback fuer "Ich weiss nicht", "anderes Tool" oder unklare Antworten. Er klaert zuerst Tool-Kontext, Nutzerlevel und Problemtyp, bevor er ein Harness empfiehlt oder die Session allgemein HAI-triagiert.

V0-Harness-Auswahl:

- Claude Code
- Codex
- Cursor
- Hermes
- OpenCode
- Ich weiss nicht / anderes Tool

Jedes Harness Skill Pack braucht:

- Was ist das Tool?
- Wofuer ist es gut?
- Typische Fehler.
- HAI-konforme Nutzung.
- Minimal-Setup.
- Sichere Arbeitsweise.
- Naechster Schritt.

Skill-Pack-Level:

```text
Level 1 - Orientierung
Was ist das Harness? Wofuer ist es gut? Was sind typische Anfaengerfehler?

Level 2 - Setup / Konfiguration
Welche Dateien, Prompts, Rules, Skills, Hooks, Projektstruktur braucht der Nutzer?

Level 3 - Workflow / HAI-Steuerung
Wie arbeitet der Nutzer kontrolliert mit dem Harness, ohne Ownership, Kontext oder Scope zu verlieren?
```

Der Agent muss erkennen, welches Level gerade gebraucht wird. Ein Anfaenger braucht zuerst Orientierung, ein fortgeschrittener Nutzer oft Setup/Konfiguration, und ein Power User meist Workflow- und Scope-Kontrolle.

Beispiel Claude Code:

```text
Claude Code ist stark fuer projektnahe Codearbeit, Debugging und kontextreiches Arbeiten.
HAI-konform heisst:
- vorher Scope definieren
- Plan pruefen lassen
- kleine Diffs
- keine Secrets
- Tests/Evidence verlangen
- Mensch bleibt Merge Authority
```

Beispiel Codex:

```text
Codex ist gut als bounded Worker fuer klar definierte Aufgaben.
HAI-konform heisst:
- Aufgabe eng formulieren
- gewuenschte Dateien nennen
- Akzeptanzkriterien geben
- Output als Patch/Report verlangen
- nicht mehrere unverbundene Ziele gleichzeitig geben
```

Quellenregel:

Offizielle Tutorials und Docs sind die Primaerquelle fuer Tool-Verhalten. HAI liefert die Bedienlogik darueber: Was darf der Agent tun, was bleibt beim Menschen, wie wird Erfolg geprueft?

## 11. V0 / V1 / V2

V0:

- Website-Widget.
- Harness-Auswahl.
- Chat-Session mit Timer.
- Text-only.
- 8-12 Nachrichten Limit.
- Session Summary am Ende.
- Kontaktformular / Lead Capture.
- Keine Zahlung.
- Keine Voice.
- Kein Datei-Upload.
- Keine Tool-Ausfuehrung.

V1:

- Voice Input via Whisper oder vergleichbarer Transkription.
- Voice Output via TTS.
- 1 EUR Payment.
- 10-Minuten Timer.
- Session-Speicherung nur mit Consent.
- Stabilerer Harness-spezifischer Skill-Unterbau.

V2:

- Pay-as-you-go / Muenztelefon-Nachwurf.
- Oeffentliche Warteschlange.
- Unterschiedliche Agenten-Skills pro Harness.
- Upload von kleinen Kontextdateien mit Warnung und engen Grenzen.
- Samuel-Dashboard fuer Leads.
- Interner Samuel-Modus fuer Harness-Finetuning.

## 12. Offene Fragen

1. Soll V0 zuerst auf der Website sichtbar sein oder nur intern/testweise fuer bekannte Nutzer?
2. Welche Harnesses bekommen zuerst echte Skill Packs: Claude Code und Codex, oder direkt alle sechs Optionen?
3. Welche offiziellen Tutorial-Quellen werden pro Harness eingebunden?
4. Welche Startfrage klaert am schnellsten: Ziel, konkretes Problem, Harness oder Nutzerlevel?
5. Ist der beste CTA "Live Harness Check starten" oder ein anderer Begriff?
6. Wie sieht das Session-Paket genau aus: Textblock, Karte, Copy-Prompt oder Markdown?
7. Welche Daten duerfen ohne Consent gar nicht persistiert werden?
8. Ab wann ist ein Lead qualifiziert genug fuer Samuel?
9. Welche HAI-Angebotsbezeichnung soll am Ende empfohlen werden: Personal HAI Audit, 4h HAI Setup oder Human-Agent-Workflow-Audit?
10. Wann wird Payment eingebaut: nach erstem erfolgreichen Test, nach mehreren Leads oder erst nach echter Nachfrage?
11. Welche Voice-Qualitaet ist fuer V1 gut genug?
12. Welche Regeln unterscheiden den externen Website-Agenten vom internen Samuel-Dogfooding-Modus?

## 13. Research Sparks / Kontext-Artefakte

Diese Sparks sind die naechsten Recherche- und Kontextpakete. Sie sind nicht Teil des V0-Builds selbst, sondern schaffen die Grundlage fuer belastbare Onboarding-Agenten und die Live-Agent-Shell.

### Spark 1 - Claude Code Agent Prior Art

Ziel: Offizielle Claude-Code-Doku plus gute GitHub-Patterns sammeln.

Output:

```text
CLAUDE_CODE_AGENT_CONTEXT_PACKET.md
```

### Spark 2 - Codex Agent Prior Art

Ziel: Offizielle Codex-Doku plus Codex CLI-/Harness-Patterns sammeln.

Output:

```text
CODEX_AGENT_CONTEXT_PACKET.md
```

### Spark 3 - Hermes Agent Context

Ziel: Bestehende Hermes-/HAI-Dokumente und Erfahrungen verdichten.

Output:

```text
HERMES_AGENT_CONTEXT_PACKET.md
```

### Spark 4 - Website Shell / Payment / Voice Prior Art

Ziel: Vorhandene Repos fuer Chat-UI, Voice, Stripe/PayPal und Session State pruefen.

Output:

```text
LIVE_AGENT_SHELL_CONTEXT_PACKET.md
```
