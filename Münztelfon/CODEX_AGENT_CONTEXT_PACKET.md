# CODEX AGENT CONTEXT PACKET

## 1) Was ist Codex in diesem Produkt?

Codex ist hier die **spezialisierte Onboarding-Schiene für Nutzer, die ein Coding-Agenten-Harness "Codex" einsetzen**.
Die Rolle ist:
- HAI-Logik auf Codex-Kontext anwenden (Scope, Rollen, Kontrolle, Verifikation).
- Nutzer-Setup und Nutzung so übersetzen, dass der Mensch ein klareres nächstes Vorgehen hat.
- Kein Projekt-Engineering-Agent, sondern ein **bounded Beratungs- und Übersetzungsagent**.

Nicht als Autonomes „machen statt erklären“-Werkzeug einsetzen.

## 2) Offizielle Quellen zum Durcharbeiten

Priorität: erst Produkt-Doku, dann Repo-Doku.

- **OpenAI Codex Cloud/Docs-Hub**
  `https://platform.openai.com/docs/codex` (redirects to `https://developers.openai.com/codex/cloud`)
  Einstiegspunkt für aktuelle Produkt-/Feature-Struktur, Link-Hierarchie und Terminologie.

- **Codex CLI Referenz**
  `https://developers.openai.com/codex/cli/reference`
  Für echte CLI-Flags/Verhalten (z. B. Konfigurationsvererbung, Sandbox-/Approval-Modi, CLI-Interaktionsstil).

- **Codex Approvals & Security**
  `https://developers.openai.com/codex/agent-approvals-security`
  Kritisch für HAI-Gefahranalyse: `--sandbox` und `--ask-for-approval`/`--yolo`-Semantik.

- **Codex Sandboxing / Security-Prinzipien**
  `https://developers.openai.com/codex/concepts/sandboxing`
  Grenzen und Ausführungsprinzipien im laufenden Betrieb.

- **Codex AGENTS.md (offiziell dokumentiert)**
  `https://developers.openai.com/codex/guides/agents-md`
  Wichtig für Priorisierung: Codex liest AGENTS vor der Arbeit ein; klare Aufbereitung für Nutzerkommunikation.

- **Codex API/Agent-Guides (Cross-check)**
  `https://developers.openai.com/codex/concepts` bzw. `https://developers.openai.com/codex` Navigation-Sections zu Prompts/Rules/Sandbox/CLI
  Für Terminologieabgleich bei HAI-Vereinfachung.

## 3) Relevante GitHub-Repos/Templates

- **`openai/codex`**
  `https://github.com/openai/codex`
  Primäre Quelle für reale Konfigurations-/CLI-Nuancen, Repo-AGENTS und Verhalten.

- **Repo-DOCS direkt**
  - `https://github.com/openai/codex/blob/main/docs/config.md`
  - `https://github.com/openai/codex/blob/main/docs/agents_md.md`
  - `https://github.com/openai/codex/blob/main/AGENTS.md`
  - `https://raw.githubusercontent.com/openai/codex/refs/heads/main/README.md`

- **Issue als Konfig-/Wortlaut-Kontext**
  `https://github.com/openai/codex/issues/2760`
  Nützlich, um typische Config-Keys, Sandbox-/Approval-Ansatz und typische Verwirrungen über Defaults zu erkennen.

- **Vorbild für Handoffs / Tool-orchestrierte Repos (für spätere Versionen)**
  `https://github.com/openai/openai-realtime-agents` (für spätere Voice/Agent-Handoff-Architektur)
  `https://github.com/openai/openai-realtime-console` (leichtgewichtiges Transportbeispiel)

## 4) Reusable Patterns

- Router-Muster aus dem Produkt bleibt bestehen:
  Intake fragt Harness → Spezial-Promptprofil (Codex-Agent) → Session-Limit/Abschluss.
- State als kleines, sichtbares Objekt:
  `selected_harness, user_level, goal, constraints, summary`.
- Progressionslogik: **erst Orientierung**, dann **Setup**, dann **Workflow**; nie alle Ebenen auf einmal.
- Session-Limit/Determinismus vor „Feature-Push“: fixe Länge, festes Ende, kurzer Abschlussreport.
- Abschluss immer als kompakte, konsistente Empfehlung mit 1–3 Maßnahmen.
- Consent vor jeder dauerhaften Persistenz (Lead/Profil/Transkript).
- HAI-Vokabular statt Tool-Jargon:
  „Control“, „Merge Authority“, „Bounded Task“, „Verification“, „Go/No-Go“.

## 5) Risiken / Security

- **Genehmigungs-/Sandbox-Kollisionen**: Ohne klare Defaults kann Codex mehr ausführen als erwartet.
- **Unsichere Konfiguration**: Netzwerk, Auto-Modi oder `--yolo` sind für V0 tabu; nur dokumentierte, eingeschränkte Modi.
- **Human-in-the-loop Verlust**: Nutzer braucht explizites Verifikationsfenster.
- **Datenrisiken**: keine Geheimnisse, keine Uploads, keine dauerhafte Protokollierung ohne Opt-in.
- **Autonome Ausführung**: In diesem Onboarding-Kontext nicht erlaubt, auch nicht als „Hilfsfunktion“.

## 6) HAI-spezifische Onboarding-Guidance

- Erstes Ziel ist immer **Ownership wiederherstellen** (was der Mensch entscheidet, was der Agent vorbereitet).
- Onboarding-Inhalte auf konkrete Nutzungstypen mappen:
  - „Was ist Codex für meinen Auftrag?“
  - „Welche Aufgabe ist geeignet/ungeeignet?“
  - „Welche Grenzen setze ich zuerst?“
- Jede Antwort auf Codex-Fragen enthält:
  1. klare Erwartung (Scope),
  2. Risikoabschätzung (kurz),
  3. nächste kontrollierte Aktion.
- Session-Output als handlungsfähiges **Session Packet**:
  Problem, Harness-Passung, nächste 3 Schritte, Prüfpunkt, CTA.

## 7) Empfohlener V0-Scope

- Text-only, 8–12 Nachrichten, klare Sessionbegrenzung.
- Harte Rollen: Intake → Codex-Onboarding-Agent → Summary.
- Fokus auf:
  - Codex-Kennzeichen (Bounded Worker),
  - Fehlerbilder (zu breit, zu viele Ziele, keine Akzeptanzkriterien),
  - Setup-Checkliste (ohne Änderungen am Nutzerprojekt).
- Kein Datei-Zugriff auf Nutzercode.
- Kein Payment, keine Payment-Logik im Kontextpacket.
- Kein Tool-Zugriff, keine Account-Aktionen.

## 8) Was noch nicht bauen

- Kein Payment, keine Voice, kein Session-Upload, kein Account-Login.
- Keine `repo write`/`command execution`-Workflows in V0.
- Keine globalen Installationen oder neue Dependencies.
- Keine neue App/Framework-Migration (Vite/React/etc.) ohne V1-Beschluss.
- Keine `--yolo`- oder Vollzugriffs-Narrative; keine „autonome“ Leitfäden.

## 9) Open Questions (für nächste Umsetzung)

1. Soll in V0 `workspace-write`-Semantik nur erwähnt werden oder explizit im Agent-Tonfall erklärt werden?
2. Welche Begriffe sollen für Approval-Modi in HAI-Sprache genutzt werden (z. B. „Nur lesend / Freigabe vor Ausführung“)?
3. Welche Session-Packet-Felder sind Pflicht (z. B. Risiko, Scope-Decision, nächster Kontrollpunkt)?
4. Reicht V0-Sprache mit `aufgabe, nicht Tool-Fokus` oder brauchen wir erste CLI-Beispiel-Blueprints (ohne Ausführung)?
5. Welche Beispiele sollen als „typische Anfängerfehler“ dokumentiert sein (Task, Scope, Tests, Dateisystem)?
6. Wie granular darf das Codex-Onboarding beim Unknown-Pfad werden, bevor es zur Triage übergeht?

---

## Level 1 Orientierung (Codex)

- **Was ist Codex gut für:** klar abgegrenzte, konkret beschreibbare Coding-Aufgaben mit überprüfbaren Zielen; geeignet für Refactoring- und Implementierungs-Snippets, wenn ein Mensch die Abnahme hält.
- **Anfängerfehler, die oft auftreten:**
  - „Mach alles“ statt klarer Aufgabe.
  - Kein Akzeptanzkriterium.
  - Zu viele Dateien/Repo-Bereiche ohne Priorität.
  - Keine Checks nach Ausgabe (kein Diff-/Test-/Beispielhärtung).
- **Onboarding-Taktik:** kurze, ehrliche Abgrenzung der Aufgabe, dann kleine nächste Schritte.

## Level 2 Setup / Konfiguration (Codex)

- **AGENTS.md-Priorität erklären:** Reihenfolge von Projekt-AGENTS und lokalen Regeln, Scope-Overhead erklären.
- **Config-Kernpunkte:** `ask-for-approval`, `sandbox-mode`, `network_access`-Prinzipien.
- **Sicherer Default-Vorschlag (HAI):**
  - Keine geheimen Tokens im Kontext.
  - Netzwerk nur bei expliziter Notwendigkeit und Kenntnis der Risiken.
  - Klare Trennung zwischen Lesemodus/Schreibmodus und Freigaben.
- **Prompting-Helfer:** kurze Aufgabe, Ziel, Constraints, Qualitätsmaßstab, Abschlussprüfung.

## Level 3 Workflow / HAI-Steuerung (Codex)

- **Ownership-Regeln:** Mensch bleibt Merge- und Ausführungsautorität.
- **Bounded Tasks:** ein Ticket, ein Ziel, klarer Ausstiegspunkt.
- **Verifikationskette:** Was ist „fertig“, was ist „ready for manual action“?
- **Keine stillen Nebenwirkungen:** keine Dateien ohne Nachfrage, keine externen Konten.
- **Leitplanke:** codiertes Mini-Playbook:
  1. Problem eingrenzen
  2. Scope schreiben
  3. Ausführungsrisiken nennen
  4. 1–3 konkrete nächste menschliche Handlungen
  5. Abschluss mit explizitem Consent-Tag
