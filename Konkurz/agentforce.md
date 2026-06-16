## 1. Name
Salesforce Agentforce (in Kooperation/Konkurrenz mit Microsoft Agentic AI / Copilot Studio).

## 2. Gründung
Agentforce wurde offiziell auf der Dreamforce im September 2024 vorgestellt und ist seit dem 29. Oktober 2024 allgemein verfügbar (General Availability). Es ist die konsequente Weiterentwicklung von Salesforce Einstein (gegründet 1999) hin zu autonomen Systemen.

## 3. Kapital
Agentforce ist ein Kernprodukt des börsennotierten Unternehmens Salesforce (NYSE: CRM). Salesforce investiert massiv in das „Agentic AI“-Ökosystem, unter anderem durch einen 15-Milliarden-Dollar-Fonds für KI-Innovationen und das Salesforce Ventures-Portfolio (Anthropic, Mistral etc.).

## 4. Mitarbeiter
Entwickelt von der Salesforce AI Research Abteilung und tausenden Ingenieuren weltweit. Salesforce hat zudem eine massive Umschulungsoffensive gestartet, um über 5 Millionen Menschen über die Plattform „Trailhead“ zu „Agentic Architects“ auszubilden.

## 5. Vision
Die Vision ist das „Agentic Enterprise“: Ein Unternehmen, in dem autonome digitale Mitarbeiter („Agents“) nahtlos mit menschlichen Mitarbeitern zusammenarbeiten, um Kundenerlebnisse zu skalieren, ohne die menschliche Kontrolle zu verlieren. Ziel ist es, bis 2025 über eine Milliarde Agenten zu befähigen.

## 6. Woran arbeiten sie
Der Fokus liegt auf der **Atlas Reasoning Engine**, die Agenten befähigt, über Aufgaben nachzudenken, Pläne zu erstellen und diese autonom auszuführen. Zudem wird an der Multi-Agenten-Orchestrierung und der Integration von Echtzeit-CRM-Daten über die **Data Cloud** gearbeitet.

## 7. Vermarktung
Agentforce wird als die „dritte Welle der KI“ vermarktet (nach prädiktiver und generativer KI). Das Preismodell ist verbrauchsabhängig („Flex Credits“), wobei Unternehmen pro erfolgreicher Interaktion zahlen, was den Fokus von „Software als Werkzeug“ hin zu „Software als Arbeitskraft“ verschiebt.

## 8. Produkt
Ein modulares Framework innerhalb der Salesforce-Plattform, bestehend aus:
*   **Agent Builder:** Low-Code-Umgebung zur Erstellung von Agenten.
*   **Model Context Protocol (MCP):** Ein offener Standard zur Anbindung externer Datenquellen.
*   **Vorgefertigte Agenten:** Für Service, Sales, Marketing und Commerce.

## 9. Framing
Salesforce grenzt sich scharf von „Copilots“ (reine Assistenten, die menschliche Prompts benötigen) ab. Agentforce-Agenten werden als **autonome digitale Mitarbeiter** geframt, die proaktiv handeln und nur bei Bedarf eskalieren.

## 10. Bezug des Menschen
Der Mensch steht bei Agentforce nicht mehr als „Tipper“ von Befehlen im Zentrum, sondern als **Coach** und **Guardrail-Manager**.

### Coaching & Guardrails
Enterprise-Admins programmieren nicht mehr, sie „coachen“. Dies geschieht über:
*   **Instructions:** Natursprachliche Anweisungen, die das Verhalten und die Tonalität festlegen.
*   **Topics:** Themenbereiche, die definieren, was ein Agent darf und was nicht (z. B. „Keine Rabatte über 20% gewähren“).
*   **Einstein Trust Layer:** Automatische Maskierung von PII (personenbezogenen Daten) und Toxizitätsprüfungen, um ethische Leitplanken zu garantieren.

### RequestPort & Human Escalation Pattern
Das **RequestPort-Pattern** (primär aus dem Microsoft Agent Framework bekannt, aber konzeptionell bei Salesforce adaptiert) ist der entscheidende Mechanismus für das „Human-in-the-Loop“-Prinzip:
*   **RequestPort:** Ein definierter Knotenpunkt im Workflow eines Agenten, der die autonome Ausführung pausiert. Der Agent „emittiert“ einen Zustand und wartet auf ein externes Signal (menschliche Freigabe oder Klärung).
*   **Autonomous Handoff:** Wenn der Agent an seine „Reasoning Boundary“ (Grenze der Urteilsfähigkeit) stößt oder eine explizite Regel (Escalation Trigger) verletzt wird, erfolgt die Übergabe an einen Menschen.
*   **Contextual Handoff:** Der Mensch erhält nicht nur den Chatverlauf, sondern eine **„Summary of Action“** – eine Zusammenfassung dessen, was der Agent bereits versucht hat, warum er eskaliert und welche Daten er genutzt hat.
*   **Escalation via Omni-Channel:** Die Übergabe erfolgt nahtlos in die bestehenden Service-Strukturen (Service Cloud), sodass der Kunde keinen Bruch in der Kommunikation erlebt, während der menschliche Mitarbeiter durch die Vorarbeit des Agenten sofort handlungsfähig ist.
