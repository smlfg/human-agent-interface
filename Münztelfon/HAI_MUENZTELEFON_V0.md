# HAI Muenztelefon V0 Requirements

## 0. Eingesprochener Input vom 2026-05-18

Gespeicherter Sinn des Inputs:

- Der User soll fuer eine begrenzte Session zahlen: Zielbild 1 EUR fuer 10 Minuten, um API- und Whisper-Kosten zu decken.
- Denkbare Hotline-Mechanik: erste Minute kostenlos, danach 1 EUR "einwerfen" wie frueher bei Telefon-Hotlines.
- Zahlung online, zum Beispiel PayPal, Kreditkarte oder vergleichbarer Payment-Provider.
- Der Agent soll HAI erklaeren und zugleich ein Onboarding anbieten.
- Vor dem Gespraech gibt der User an, welchen Agenten oder welches Harness er nutzt, zum Beispiel Claude Code oder Codex.
- Der Agent ist ein Session-State-Agent: erste Kontaktinstanz zwischen Besucher und Samuel/HAI.
- Der Agent braucht gute Memory und einige Skills, aber keine maechtigen Ausfuehrungsfaehigkeiten.
- Der Agent ist ein Tutorial fuer das jeweilige Harness.
- Die Tutorial-Basis sollen die offiziellen Tutorials des jeweiligen Tools sein, aber immer mit Human-Agent-Interface-Hintergrund.
- Der Agent spricht mit dem User; gleichzeitig wird der Text angezeigt.
- Das System ist nicht nur fuer die Website relevant, sondern auch fuer Samuel selbst.
- Kernfunktion fuer Samuel: Live-Agent zum Konfigurieren und Finetunen des eigenen Harness.

## 1. Produktidee in 5 Saetzen

Das HAI Muenztelefon ist eine bezahlte, begrenzte Voice/Text-Erstklaerung fuer Menschen mit einem konkreten Agenten- oder Harness-Problem. Es ist kein allgemeiner Chatbot, sondern ein Session-State-Agent: Der User sagt vorher, ob er zum Beispiel Claude Code, Codex oder ein anderes Agenten-Harness nutzt, und der Agent bietet dazu HAI-orientiertes Onboarding an. Die Session verbindet offizielles Tool-Tutorial-Wissen mit der HAI-Frage: Wie wird daraus ein sicherer, kleiner und pruefbarer Arbeitsauftrag, den der Mensch weiter besitzen kann? Fuer Besucher ist es eine erste Hilfe bei agentischem Kopfweh; fuer Samuel ist es ein qualifizierter Lead und zugleich ein eigenes Werkzeug zum Harness-Finetuning. Das Produkt demonstriert HAI direkt: Es reduziert nicht nur Unklarheit, sondern zeigt live, wie ein Mensch ein Agentensystem bedienbarer macht.

## 2. User Journey

1. Besucher kommt auf die HAI-Webseite und erkennt: "Ich habe ein Agentenproblem, aber noch keinen klaren Auftrag."
2. Besucher waehlt oder beschreibt sein Harness: zum Beispiel Claude Code, Codex, Cursor, ChatGPT, Hermes oder eigenes Setup.
3. Besucher startet eine begrenzte Muenztelefon-Session: Zielbild 10 Minuten fuer 1 EUR oder erste Minute kostenlos, danach Zahlung.
4. Der Agent spricht mit dem User; parallel wird eine Textspur angezeigt.
5. Der Agent fragt gezielt nach Ziel, aktuellem Chaos, genutzten Tools, Risiko und gewuenschtem Ergebnis.
6. Der Agent erklaert HAI dort, wo es fuer dieses Harness relevant wird: Rollen, Rechte, Human Gates, Verifikation, Scope und naechster Arbeitsauftrag.
7. Der Agent orientiert sich am offiziellen Tutorial des jeweiligen Harness, uebersetzt es aber in HAI-Sprache.
8. Nach maximal 10 Minuten erzeugt der Agent eine Abschlusszusammenfassung.
9. Die Zusammenfassung enthaelt Problemtyp, wichtigste Reibung, menschliche Entscheidungspunkte, moegliches Next Action Packet und Empfehlung fuer Kontakt.
10. Besucher kann seine Mailadresse oder Nachricht hinterlassen, wenn er einen menschlichen HAI-Audit, Setup-Termin oder tieferes Harness-Onboarding will.

## 3. Was darf der Agent?

- Ein diffuses Agentenproblem strukturiert klaeren.
- Das ausgewaehlte Harness grob einordnen und erklaeren.
- Offizielle Tutorial-Inhalte des jeweiligen Harness in eine HAI-kompatible Bedienlogik uebersetzen.
- Nach aktuellen Tools, Rollen, Zielen, Risiken, Blockern und Konfiguration fragen.
- Zwischen Beratungs-, Triage- und Intake-Modus wechseln, solange die Session im HAI-Scope bleibt.
- Ein Problem in ein erstes Next Action Packet uebersetzen.
- Human Gates benennen: Was muss der Mensch entscheiden, bevor ein Agent loslaeuft?
- Verifikationsregeln vorschlagen: Woran waere ein Ergebnis wirklich brauchbar?
- Konfigurationsideen fuer das Harness vorschlagen, solange sie als Vorschlag und nicht als automatische Aenderung formuliert sind.
- Ein passendes Folgeangebot empfehlen, zum Beispiel Personal HAI Audit oder 4h HAI Setup.
- Kontaktdaten abfragen, wenn der Besucher freiwillig weitergehen will.

## 4. Was darf der Agent nicht?

- Keine Aufgaben im Projekt des Besuchers ausfuehren.
- Keine Dateien lesen, schreiben, analysieren oder hochladen lassen.
- Keine privaten Repos, Tokens, Secrets, Logins oder internen Daten anfordern.
- Keine autonomen Agenten starten.
- Keine Harness-Konfiguration automatisch veraendern.
- Keine technischen Garantien geben, dass ein fremder Agentenlauf funktionieren wird.
- Keine Rechts-, Finanz-, Medizin- oder Sicherheitsberatung als Expertenurteil ausgeben.
- Keine Payment-, Vertrags- oder Buchungszusage ausserhalb des angebundenen Payment-/Buchungsflusses als verbindlich abschliessen.
- Keine endlose Beratung fuehren; die Session muss hart enden.

## 5. Session-Limit

Zielbild ist ein echtes Muenztelefon-Limit:

- Dauer: maximal 10 Minuten.
- Preis: 1 EUR pro Session als API-/Whisper-Kostenbeitrag.
- Alternative Mechanik: erste Minute kostenlos, danach 1 EUR einwerfen.
- Zahlungswege: PayPal, Kreditkarte oder vergleichbarer Online-Payment-Provider.
- Voice plus Text: User spricht, Transkript ist sichtbar.
- Sichtbarer Timer ab Sessionstart.
- Kein Login.
- Kein Datei-Upload.
- Kein Zugriff auf externe Accounts.
- Am Ende immer Abschlusskarte statt offener Chat-Schleife.

Die Abschlusskarte enthaelt:

- 1-Satz-Problembeschreibung.
- Problemtyp oder Reibungsmuster.
- 1-3 Human Gates.
- 1 erste Verifikationsregel.
- 1 moegliches Next Action Packet.
- Kontaktoption fuer menschlichen Follow-up.
- Hinweis, welches Harness der Agent behandelt hat.
- 1 konkrete Harness-Konfigurationsidee oder Tutorial-Naechstschritt.

## 6. Sicherheitsregeln

- Der Agent muss bei Secrets, privaten Daten, Zugangsdaten oder Repo-Inhalten stoppen und den Besucher auffordern, diese nicht zu teilen.
- Der Agent darf nur mit freiwillig eingegebenem Text arbeiten.
- Session-Memory ist nur fuer die laufende Session gedacht; dauerhafte Memory braucht ausdruecklichen Opt-in.
- Der Agent muss klar bleiben: "Ich klaere deinen Arbeitsauftrag, ich fuehre ihn nicht aus."
- Der Agent darf keine erfundenen HAI-Angebote, Preise oder Termine behaupten.
- Der Agent darf keine offiziellen Tutorial-Inhalte behaupten, wenn seine Quelle fehlt oder unklar ist.
- Der Agent muss Unsicherheit markieren, wenn wichtige Informationen fehlen.
- Der Agent muss jede Empfehlung als Vorschlag formulieren, nicht als automatischen Entscheid.
- Der Agent muss bei hochriskanten Themen auf menschliche Klaerung verweisen.
- Der Agent darf maximal einen konkreten naechsten Schritt empfehlen, nicht eine Liste neuer Projekte oeffnen.

## 7. Lead-Qualifizierung

Der Agent qualifiziert keinen Lead durch Verkaufsdruck, sondern durch Klarheit.

Mindestdaten fuer einen guten Lead:

- Was will die Person mit Agenten erreichen?
- Welche Tools oder Agenten nutzt sie bereits?
- Welches Harness will sie verstehen oder konfigurieren?
- Wo entsteht aktuell Chaos, Scope Creep, Kontrollverlust oder falsches "Done"?
- Welche Entscheidung will sie nicht an Agenten abgeben?
- Was waere ein nuetzliches Ergebnis: besseres Tool-Verstaendnis, bessere Harness-Konfiguration, Next Action Packet oder HAI-Audit?
- Ist sie bereit fuer ein menschliches Gespraech oder erst fuer Material/Follow-up?

Lead-Stufen:

- Kalt: Neugierig, aber kein klares Problem.
- Warm: Konkretes Agentenproblem, aber noch kein Budget oder Terminwunsch.
- Heiss: Konkretes Problem, reale Dringlichkeit, Wunsch nach Audit/Setup.
- Self-use: Samuel nutzt den Agenten selbst, um das eigene Harness zu konfigurieren, Tutorials durchzugehen und HAI-Patterns praktisch zu schaerfen.

## 8. Technische V0 mit Muenztelefon-Schnitt

V0 darf technisch klein bleiben, muss aber das Zielbild korrekt abbilden.

- Frontend-Widget auf der HAI-Webseite.
- Muenztelefon-Frame: Timer, Payment-Status, Transkript, Abschlusskarte.
- Payment-Schnitt fuer 1 EUR oder Free-Minute-dann-Pay-Mechanik.
- Voice-Eingabe mit Transkription; Text muss parallel sichtbar sein.
- Optional Text-only-Fallback, falls Voice nicht funktioniert.
- Session-State: aktuelles Harness, Ziel, erklaerte Konzepte, offene Risiken und naechster Schritt.
- Skills: HAI-Erklaerung, Harness-Tutorial-Navigation, Next-Action-Packet, Sicherheits-/Human-Gate-Check.
- Quellenanforderung: offizielle Tutorials/Docs des jeweiligen Harness als primaere Grundlage.
- Kein echter Warteschlangenmodus.
- Kein Nutzerkonto.
- Kein Datei-Upload.
- Keine Tool-Ausfuehrung.
- Server- oder Edge-Endpunkt mit festem Systemprompt, Session-Limit und Kostenkontrolle.
- Optional: Kontaktformular oder Mailto-Link am Ende.
- Logging nur minimal und ohne sensible Inhalte; Session-Inhalte nur speichern, wenn der User aktiv zustimmt.

Definition of Done fuer V0:

- Besucher kann Harness auswaehlen oder beschreiben.
- Besucher kann eine bezahlte oder testweise freigeschaltete 10-Minuten-Session starten.
- Voice wird in Text transkribiert und sichtbar angezeigt.
- Session endet verlaesslich nach Limit.
- Abschlusskarte ist hilfreicher als ein normaler Chatverlauf.
- Agent bleibt im HAI- und Harness-Onboarding-Scope.
- Es gibt eine klare Kontaktmoeglichkeit.
- Der Agent fuehrt nichts aus und aendert keine User-Konfiguration.

## 9. Spaetere V1 nach erster Validierung

V1 wird relevant, wenn V0 zeigt, dass bezahlte oder testweise freigeschaltete Sessions fuer echte Besucher nuetzlich sind.

Moegliche V1-Elemente:

- Stabiler Stripe-/PayPal-/Kreditkartenfluss.
- Preisexperimente: 1 EUR, 3 EUR oder 5 EUR pro Session.
- Erste Minute kostenlos, danach Paywall.
- Oeffentliche oder sichtbare Warteschlange.
- Harte 10-Minuten-Grenze.
- Bessere Lead-Uebergabe an Samuel.
- Optionaler Terminbuchungsfluss.
- Missbrauchsschutz und Rate-Limits.
- Deutlichere Datenschutz- und Sicherheitskommunikation.
- Harness-spezifische Tutorial-Pfade fuer Claude Code, Codex, Cursor, ChatGPT und Hermes.
- Eigener Samuel-Modus fuer internes Harness-Finetuning.

V1 bleibt trotzdem kein autonomer Arbeitsagent. Auch mit Payment ist der Zweck Beratung, Triage und HAI-Intake.

## 10. Offene Fragen

1. Welche genaue Startfrage reduziert die meiste Ueberforderung: Ziel, Chaos, Tool-Liste oder konkreter letzter Agentenlauf?
2. Ist die erste testbare Version direkt paid, oder gibt es einen internen/testweisen Freischaltmodus ohne echte Zahlung?
3. Welche HAI-Angebotsbezeichnung soll der Agent am Ende nennen: Personal HAI Audit, 4h HAI Setup oder Human-Agent-Workflow-Audit?
4. Soll die Session in Deutsch, Englisch oder automatisch in der Sprache des Besuchers laufen?
5. Welche Form hat das Next Action Packet im V0: kurzer Textblock, Copy-Prompt oder strukturierte Karte?
6. Welche Themen muss der Agent sofort aus dem Chat herausrouten?
7. Welche minimalen Datenschutztexte braucht die Webseite, bevor echte Besucher das nutzen?
8. Wer prueft die erste Version gegen Scope Creep, bevor sie online geht?
9. Welche offiziellen Tutorial-Quellen duerfen fuer die ersten Harness-Pfade verwendet werden?
10. Was ist der Stop-Punkt, falls das Muenztelefon mehr Aufmerksamkeit frisst als es Leads klaert?
11. Welche Zahlungsmechanik passt besser zum Produktgefuehl: 1 EUR upfront oder erste Minute kostenlos, danach 1 EUR?
12. Soll die Session fuer Samuel selbst andere Regeln haben als fuer externe Besucher?
