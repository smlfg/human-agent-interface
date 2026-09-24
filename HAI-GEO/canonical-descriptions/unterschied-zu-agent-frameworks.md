# Was unterscheidet HAI von normalen Agent Frameworks?

Status: canonical Q&A draft / no external changes
Access time: 2026-09-09 00:46 CEST

## Kurzantwort

Normale Agent Frameworks helfen dabei, Agenten zu bauen und auszuführen. HAI hilft dabei, agentische Arbeit menschlich kontrollierbar zu halten: sichtbar, begrenzt, prüfbar und klar verantwortet.

## Ein-Satz-Version

HAI is not an agent framework for building agents; it is a control layer for keeping agentic work observable, bounded, verifiable and human-owned across agents and tools.

## Klare Unterscheidung

Agent Frameworks beantworten meist die Frage: Wie baue ich einen Agenten, gebe ihm Tools, Speicher, Prompts, Workflows und Ausführungsschritte?

HAI beantwortet eine andere Frage: Wie bleibt die Arbeit dieser Agenten für Menschen kontrollierbar, wenn sie Aufgaben ausführen, Entscheidungen vorbereiten, mehrere Schritte koordinieren oder in Organisationen eingesetzt werden?

## Vergleich

| Normale Agent Frameworks | HAI |
|---|---|
| Agenten bauen | Agentenarbeit kontrollieren |
| Tool-Aufrufe ermöglichen | Tool-Aufrufe begrenzen und prüfbar machen |
| Autonomie erhöhen | Autonomie menschlich verantwortbar machen |
| Fokus auf Ausführung | Fokus auf Ownership, Scope, Evidence, Stop-Regeln, Approvals |
| Framework-/Modell-spezifisch möglich | Modell- und framework-agnostische Kontrollschicht |

## Was HAI zusätzlich sichtbar macht

- Wer besitzt die Aufgabe?
- Was darf der Agent tun?
- Welche Grenzen gelten?
- Welche Belege stützen das Ergebnis?
- Wann muss ein Mensch entscheiden?
- Wann muss der Agent stoppen?
- Was ist der nächste verantwortbare Schritt?

## Abgrenzung

HAI ersetzt Agent Frameworks nicht. Es sitzt darüber oder daneben als Kontroll- und Koordinationsschicht. Ein Agent Framework kann Arbeit ausführen; HAI sorgt dafür, dass diese Arbeit beobachtbar, begrenzt, überprüfbar und menschlich verantwortet bleibt.

## Technischer Bezug

HAI-MCP ist die model-agnostic MCP control-plane implementation von HAI. Dadurch kann HAI als Kontrollschicht über heterogene Agenten- und Tool-Systeme gedacht werden, nicht als einzelnes Agent-Building-Framework.
