# Profil: Anthropic (Claude Code / MCP)

## 1. Name
Anthropic PBC (Public Benefit Corporation) – im Kontext von Agenten-Schnittstellen insbesondere bekannt durch **Claude Code** und das **Model Context Protocol (MCP)**.

## 2. Gründung
Gegründet am 26. Januar 2021 von den Geschwistern Dario und Daniela Amodei sowie weiteren ehemaligen Führungskräften von OpenAI. Der Auslöser war eine strategische Differenz bezüglich der Sicherheit und Ausrichtung (Alignment) von KI-Systemen.

## 3. Kapital
Anthropic ist eines der am stärksten kapitalisierten KI-Unternehmen weltweit. Bis Ende 2024 wurden ca. 12,8 Milliarden USD eingesammelt, maßgeblich getrieben durch Amazon (8 Mrd. USD) und Google (4 Mrd. USD). Aktuelle Finanzierungsrunden Ende 2025 bewerten das Unternehmen mit bis zu 350 Milliarden USD (Term-Sheet-Phase).

## 4. Mitarbeiter
Das Unternehmen erlebte ein massives Wachstum: Von etwa 240 Mitarbeitern Anfang 2024 wuchs die Belegschaft auf ca. 1.376 Ende 2024 und erreichte bis Ende 2025 rund 3.673 Mitarbeiter.

## 5. Vision
Die Vision von Anthropic ist die Entwicklung von "Safety-first"-KI. Das Ziel sind Systeme, die "helpful, harmless, and honest" (hilfreich, harmlos, ehrlich) sind. Mit MCP verfolgt Anthropic zudem die Vision eines offenen, interoperablen Ökosystems, in dem KI-Modelle nahtlos und sicher mit jeglichen Datenquellen und Werkzeugen verbunden werden können – ohne proprietäre "Gartenmauern".

## 6. Woran arbeiten sie
*   **Claude LLM-Serie:** Kontinuierliche Weiterentwicklung der Modelle (Sonnet, Haiku, Opus).
*   **Claude Code:** Ein spezialisierter CLI-Agent für Software-Engineering.
*   **Model Context Protocol (MCP):** Ein offener Standard für die Verbindung von KI-Modellen mit Datenquellen.
*   **Computer Use:** APIs, die es Modellen ermöglichen, Computer wie ein Mensch über GUI-Interaktionen zu bedienen.

## 7. Vermarktung
Die Vermarktung erfolgt über drei Säulen:
1.  **Direct-to-Consumer:** Claude Pro und Team/Enterprise Abonnements.
2.  **API-Plattform:** Abrechnung nach Token-Verbrauch für Entwickler.
3.  **Cloud-Partnerschaften:** Integration in Amazon Bedrock und Google Vertex AI als primäre Distributionskanäle für Unternehmenskunden.

## 8. Produkt
*   **Claude (Web/App):** Chat-Interface für Endnutzer.
*   **Claude Code:** Agentisches Terminal-Werkzeug, das Code schreibt, Tests ausführt und Git-Workflows verwaltet.
*   **MCP SDKs:** Open-Source-Bibliotheken zur Implementierung von MCP-Servern (Connectors zu Slack, GitHub, Datenbanken etc.).

## 9. Framing
Anthropic framt sich als das "verantwortungsbewusste" KI-Labor. Durch Konzepte wie **Constitutional AI** (KI, die nach einer geschriebenen "Verfassung" trainiert wird) und eine Rechtsform als Public Benefit Corporation (PBC) betont das Unternehmen, dass Sicherheit und gesellschaftlicher Nutzen über reiner Profitmaximierung stehen.

## 10. Bezug des Menschen
Der Mensch steht bei Anthropic als ultimative Kontrollinstanz im Zentrum der Interaktion, was sich besonders in der Architektur von **Claude Code** und **MCP** widerspiegelt:

*   **Permission-at-each-turn vs. Auto Mode:**
    *   **Permission-at-each-turn:** In der Standardkonfiguration fragt Claude Code vor jeder "riskanten" Aktion (Schreiben von Dateien, Ausführen von Shell-Befehlen) explizit um Erlaubnis. Der Mensch bleibt Pilot; die KI ist der Copilot, der jeden Schritt validieren lässt.
    *   **Auto Mode:** Für flüssigere Workflows nutzt Anthropic einen KI-basierten Klassifizierer. Dieser entscheidet autonom, ob eine Aktion "sicher" ist (z. B. Bearbeiten einer Datei im Projektordner) oder "riskant" (z. B. Netzwerkzugriffe, Löschbefehle). Riskante Aktionen lösen weiterhin einen manuellen Prompt aus. Dies ermöglicht Effizienz, ohne die menschliche Aufsicht bei kritischen Pfaden aufzugeben.
    *   **MCP als Interoperabilitäts-Layer:** MCP fungiert als "USB-C für KI". Die Vision ist ein menschenzentriertes Design, bei dem der Nutzer entscheidet, welche Datenquellen (MCP Server) er seinem Agenten zur Verfügung stellt. MCP bricht die Silos der Modellanbieter auf: Der Mensch kontrolliert die Schnittstelle, nicht die Plattform. Es ist eine Infrastruktur der Souveränität, die Interoperabilität zwischen verschiedenen Modellen und privaten Datenbeständen ermöglicht, ohne dass sensible Informationen in den Trainingskorpus der Anbieter abfließen müssen.
