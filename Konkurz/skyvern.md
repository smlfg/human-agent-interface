## 1. Name
**Skyvern** (betrieben von Skyvern AI, Inc.)

## 2. Gründung
Skyvern wurde im Jahr **2023** in San Francisco gegründet. Die Gründer sind **Suchintan Singh** (CEO, ehemals ML-Plattform bei Faire und Gopuff), **Kerem Yilmaz** und **Shuchang Zheng** (CTO). Das Unternehmen war Teil der Y-Combinator-Kohorte **Summer 2023 (S23)**.

## 3. Kapital
Das Unternehmen hat insgesamt ca. **2,7 Millionen US-Dollar** an Seed-Kapital aufgenommen (offengelegt im Dezember 2025). Zu den Investoren zählen neben Y Combinator auch namhafte Business Angels und VCs aus dem Silicon Valley.

## 4. Mitarbeiter
Skyvern beschäftigt derzeit schätzungsweise **11 bis 16 Mitarbeiter** (Stand Anfang 2026), wobei das Team stark technikzentriert ist (ML-Ingenieure und Full-Stack-Entwickler).

## 5. Vision
Die Vision von Skyvern ist die Beseitigung der sogenannten **„Maintenance Tax“** (Wartungssteuer) bei der Browser-Automatisierung. Traditionelle Tools (wie Selenium oder Playwright) scheitern oft an kleinen UI-Änderungen. Skyvern strebt eine Automatisierung an, die wie ein Mensch „sieht“ und versteht, um robuste Workflows ohne spröde Selektoren zu ermöglichen.

## 6. Woran arbeiten sie
Aktuell liegt der Fokus auf **Skyvern 2.0** und der neuen **„Compile-to-Code“-Engine**. Hierbei analysiert die KI einen Workflow einmalig visuell (teurer Prozess) und „kompiliert“ diesen Pfad dann in ein deterministisches, schnelles Playwright-Skript. Wenn sich die Webseite ändert, erkennt die KI dies („Self-Healing“) und generiert das Skript automatisch neu.

## 7. Vermarktung
Skyvern verfolgt eine dreistufige Strategie:
*   **Open Source:** Der Kern ist auf GitHub (AGPL-3.0 Lizenz) frei verfügbar und hat bereits über 20.000 Stars gesammelt.
*   **Skyvern Cloud:** Eine verwaltete Version mit integrierter Anti-Bot-Umgehung, Proxy-Netzwerken und Infrastruktur-Hosting.
*   **Enterprise:** Maßgeschneiderte Lösungen für On-Prem-Hosting, Sicherheits-Features und Support.

## 8. Produkt
Das Produkt ist ein **KI-gesteuerter Browser-Agent**, der LLMs (Large Language Models) und Computer Vision nutzt. Es ermöglicht die Automatisierung von Prozessen auf Webseiten, die keine API besitzen (z.B. Versicherungsportale, Behördenseiten oder komplexe ERP-Systeme).

## 9. Framing
Skyvern wird geframed als die **„Open Source Alternative zu Playwright für die KI-Ära“**. Es positioniert sich als das Werkzeug, das dort weitermacht, wo klassisches RPA (Robotic Process Automation) aufgrund von Komplexität und Wartungsaufwand aufhört.

## 10. Bezug des Menschen
Der Mensch spielt bei Skyvern eine zentrale Rolle in der Definition und Überwachung des Agenten, wird jedoch durch Automatismen entlastet.

**A. Zieldefinition (Goal Definition):**
Der Mensch definiert das Ziel in **natürlicher Sprache** (z.B. „Gehe zu Geico und erstelle ein Versicherungsangebot für diesen Fahrer“). Skyvern empfiehlt dabei spezifische Muster:
*   **Fokus auf das „Was“, nicht das „Wie“:** Der Nutzer beschreibt den Endzustand, nicht die einzelnen Klicks.
*   **Steuerungs-Keywords:** Nutzer verwenden explizite Keywords wie `COMPLETE` (um zu definieren, wann die Aufgabe fertig ist) oder `TERMINATE` (um Abbruchbedingungen festzulegen, z.B. „Abbrechen, wenn das Produkt ausverkauft ist“).
*   **JSON-Schemas:** Entwickler können dem Agenten ein JSON-Schema vorgeben, um zu definieren, in welcher Struktur die extrahierten Daten ausgegeben werden sollen.

**B. Umgang mit 2FA und CAPTCHAs:**
Skyvern bietet hierfür ein hybrides Modell an:
*   **Automatisierte 2FA (TOTP):** Der Mensch kann den Secret Key (Seed) im System hinterlegen. Skyvern generiert den 6-stelligen Code bei Bedarf autonom und fügt ihn ein.
*   **Native CAPTCHA-Lösung:** Dank Computer Vision kann Skyvern viele CAPTCHAs (reCAPTCHA, hCaptcha) selbstständig „lösen“, indem es die Bildelemente wie ein Mensch interpretiert, ohne externe Dienste wie 2Captcha zu benötigen.
*   **Interaktive Live-Streams („Take Control“):** In der Cloud-UI sieht der Mensch einen Livestream des Browsers. Bei einer unvorhergesehenen Blockade kann der Nutzer auf **„Take Control“** klicken, das CAPTCHA oder den 2FA-Code manuell eingeben und die Kontrolle dann wieder an die KI übergeben.
*   **Human-Interaction-Blocks:** In komplexen Workflows kann der Mensch explizit Pausen einplanen, in denen der Agent auf eine menschliche Eingabe wartet, bevor er fortfährt.
