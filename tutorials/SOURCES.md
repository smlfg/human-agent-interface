# Sources

Dieses Tutorial wurde aus lokalen HAI-Artefakten und offizieller OpenAI
Codex-Dokumentation abgeleitet.

## Lokale HAI-Quellen

Gelesen aus Samuels lokalen HAI-Arbeitsunterlagen (Entwicklungspaket, Audit-Angebot, Harness-Notizen zu Hermes, OpenClaw und OpenCode). Die öffentliche Kurzfassung steht auf [human-agent-interface.com](https://www.human-agent-interface.com/what_it_is/).

Verwendete HAI-Prinzipien:

- HAI uebersetzt diffuse menschliche Anliegen in agentisch bearbeitbare
  Arbeitsprozesse.
- Der Mensch bleibt Owner fuer Ziel, Sinn, Scope, Risiko, Freigabe und Abbruch.
- Agenten sind Rollen, nicht Magie.
- Bounded Work braucht Ziel, Scope, erlaubte/verbotene Aktionen und
  Artefaktpflicht.
- Verifier-Owned Success: Erfolg liegt in Checks, Dateien, Diffs, Logs und
  Reports, nicht in der Done-Behauptung.
- Chat ist Steuerpult, nicht Arbeitsflaeche.
- Owner Packet, Delegation Card, Evidence Panel, Stop Rules und Next Action
  machen Arbeit entscheidbar.

## Offizielle OpenAI Codex-Quellen

Gelesen ueber den OpenAI Developer Docs MCP:

- `https://developers.openai.com/codex/quickstart`
- `https://developers.openai.com/codex/app`
- `https://developers.openai.com/codex/learn/best-practices`

Verwendete Codex-Prinzipien:

- Codex App: Projekt auswaehlen, lokal arbeiten, ersten Prompt senden.
- Codex App: Worktrees, Review/Ship, Terminal/Actions, Browser, Automations,
  Skills, Plugins und MCP als App-Funktionen.
- Codex CLI ist unter Linux unterstuetzt.
- Gute Prompts enthalten Goal, Context, Constraints und Done when.
- `AGENTS.md` ist der durable Ort fuer Repo-Regeln, Befehle, Konventionen,
  Constraints und Done-Kriterien.
- Codex-Arbeit soll getestet, gecheckt und reviewed werden.
- MCP soll eingesetzt werden, wenn relevanter Kontext ausserhalb des Repos lebt.
- Skills sind fuer wiederholbare Methoden; Automations fuer stabile,
  wiederkehrende Workflows.

## Zusaetzliche Tool-Profile

Die interaktive Website enthaelt Profile fuer:

- `Claude Code`: aus lokalen HAI-/Claude-Code-Praxisnotizen abgeleitet, ohne
  Anspruch auf vollstaendige Engine-Interna.
- `Hermes`: aus `ZUSTAND_HERMES.md`; lokales Control-Plane/Profile/Verifier-
  Modell ist hier die Quelle.
- `OpenClaw`: aus lokalen OpenClaw-Befehls- und Architekturartefakten.
- `OpenCode`: aus lokalen OpenCode-Tutorials, Handoff-Docs und
  Integrationsnotizen.
- `Pi`: generisches HAI-Profil fuer Intake/Reflexion; im Workspace wurde keine
  eindeutige kanonische lokale Tool-Quelle gefunden.
- `Conductor`: generisches HAI-Profil fuer Orchestrierung; im Workspace wurde
  keine eindeutige kanonische lokale Tool-Quelle gefunden.

Bei `Pi` und `Conductor` sind deshalb nur Harness-Rollen beschrieben, keine
produkt- oder CLI-spezifischen Behauptungen.

## Abgrenzung

Dieses Repo enthaelt ein Tutorial-Paket und eine statische interaktive
Explainer-Website, keine laufende App und kein Deploy.

Kein Commit wurde erstellt.
