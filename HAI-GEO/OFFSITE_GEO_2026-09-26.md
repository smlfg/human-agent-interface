# Off-Site GEO Recherche — 2026-09-26

Auftraggeber: Claude Code (parallel zu On-Site-Patches an Sitemap, strukturierten Daten, FAQ).
Zweck: Welche Quellen zitieren ChatGPT/Perplexity für Anfragen wie „KI-Agenten Coaching 1:1",
„Claude Code Setup Hilfe", „KI-Agenten Workshop Team Deutschland", „Cursor/Codex einrichten lassen";
wo sind die Konkurrenten gelistet; Top-5-Maßnahmen nach Hebel/Aufwand.

## Status: NICHT durchgeführt — Begründung

Dieses Profil (`growth`) hat per Permissions-Definition **keinen Web-/HTTP-/Browser-Zugriff**.
Erlaubte Toolsets: `file`, `terminal`, `skills`, `session_search`, `todo`, `memory`, `clarify`.
Explizit ausgeschlossen: `web`, `browser`, `delegation`, `code_execution`, `mcp auf Vorrat`.

Damit sind die Auftragsteile 1 und 2 (zitierte URLs, Konkurrenz-Einträge mit Aufwand und Formular-Weg)
in diesem Profil **nicht ausführbar**. Beide verlangen reale Suchresultate oder Seitenextraktion;
beides ist ohne Web-Tool nicht möglich und mit curl im Terminal nur eingeschränkt (viele Quellen
blockieren Headless, einige verlangen JS, einige sind gegen Bots gehärtet — der Auftrag verbietet
explizit einen neuen Browser mit Remote-Debugging).

Guardrail-Konflikt:
- Auftrag verbietet erfundene Quellen.
- Auftrag verlangt URLs aus echten Suchergebnissen.
- Ohne Web-Tool wäre jede URL eine Erfindung.

Deshalb: keine URLs aufgeführt, die nicht aus einer realen Suche stammen. Kein Eintrag
„bonusai.de/agentur-X", kein „krynexlabs.de/services", keine erfundenen Top-Anbieter-Listen.

Was geht, ist Auftragsteil 3: Top-5-Maßnahmen nach Hebel/Aufwand mit konkretem ersten Schritt
für Samuel. Diese Maßnahmen kommen aus der bestehenden HAI-GEO-Vorarbeit (Phase-1-Audit,
Search-Engine-Weighting, Phase-3-Plan) und sind nicht von Web-Recherche abhängig. Sie sind
unten aufgeführt.

## Was die bestehende Vorarbeit für die 4 Anfragen indirekt liefert

Vollständige Off-Site-Discovery für „KI-Agenten-Coaching" als kommerzielle Anfrage ist nicht
dokumentiert. Was die Vorarbeit **für HAI-Discovery im AI-Agent-Tooling-Kontext** zeigt
(`PHASE_1_AUDIT_2026-09-08.md`, `GEO_SEARCH_ENGINE_SOURCE_WEIGHTING_2026-09-09.md`):

- **Glama** (`glama.ai/mcp/servers/smlfg/hai-mcp`) ist die gewichtigste externe Discovery-Fläche
  für HAI-MCP. Wenn jemand nach „Claude Code MCP Server" oder „Cursor MCP Control Plane" fragt,
  ist das die Fläche, die antwortet.
- **Unyly** (`unyly.org/mcp/hai-mcp`) ist der stärkste externe Vollgraph-Beleg
  (HAI-MCP -> HAI -> Samuel Fleig). Wenn die Query den ganzen Graphen verlangt, wird Unyly
  am ehesten zitiert.
- **M8ven** (`m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`) ist ein sekundärer Trust-/Registry-Beleg.
- **GitHub `smlfg/hai-mcp`** ist die kontrollierte Wahrheit, wird in Results aber oft hinter
  den Registries gerankt.
- **MCP-Verzeichnisse** allgemein (Glama, Unyly, M8ven, Lulu, MCP.so, Assay, mcp.so/tags/hai)
  sind die gewichtigsten externen Discovery-Flächen für HAI-MCP.

Indirekte Konsequenz für die 4 Anfragen des Auftrags:
HAI kann bei „Claude Code einrichten" / „Cursor einrichten" / „Codex Setup" realistisch **nur
über HAI-MCP-Discovery** auftauchen, weil HAI-MCP explizit für Claude Code, Codex, Cursor,
Grok, OpenCode, Hermes positioniert ist (`HAI-MCP` README: „Any client (Claude Code, Codex,
Cursor, Grok, OpenCode, Hermes, …) can use the same tools."). Bei „KI-Agenten Coaching 1:1"
und „Team-Workshop" ist das schwieriger: dort wird HAI nur dann zitiert, wenn die kontrollierte
Website den **kommerziellen Service-Aspekt** (Setup-Rettung 90 Min/190 €, Rechner agentenfähig
4 h/690 €, Team-Workshop 3 h/1.200 €, remote, Festpreis, § 19) **crawlbar** macht und wenn
externe Listings (Verzeichnisse, Foren, Vergleichsartikel) auf HAI verweisen.

Beide Achsen sind aktuell schwach: Listings wurden nicht recherchiert (kein Web-Zugriff),
und der kommerzielle Aspekt ist auf der kontrollierten Website (`/agentfaehig/`-Landingpage)
noch nicht in der GEO-Doku als Discovery-Surface erfasst.

## Lücke für Claude Code / nächsten Lauf

Diese Recherche muss in einem Profil mit Web-Zugriff nachgeholt werden. Konkret braucht es:

1. **Echte Suchresultate** für die 4 Anfragen in ChatGPT/Perplexity/Google AI Mode mit
   Inkognito-/Frisch-Session. Pro Anfrage: 5–10 zitierte URLs + Snippet + Datum.
2. **Listing-Audit**: Welche Verzeichnisse (Maltaco, Gulp, Freelancermap, t3n, Heise, Golem,
   LinkedIn Service Pages, Xing, Google Business Profile, Etsy/Coursehost-Plattformen,
   Udemy Skillshare, GitHub Sponsors, OpenCollective) listen die fünf im Auftrag genannten
   Anbieter (Gradually AI, BlackBelt KI, Krynex Labs, Dein Admin, High Intent Labs) plus
   bonusai.de, krynexlabs.de, cmt.de. Pro Eintrag: Aufnahme-Kriterien, Aufwand, kostenpflichtig.
3. **Empfehlung wo HAI realistisch reinkommt**: Welche der gelisteten Plattformen nehmen
   auch kleine § 19-Dienstleister ohne Form-Fit; welche verlangen Agenturstatus; welche
   sind reine Empfehlungs-/Review-Kanäle.

Diese drei Punkte sind hier nicht ausführbar. Sie sind dokumentiert, damit der nächste
Lauf / ein anderes Profil sie ohne Re-Recherche aufnehmen kann.

## Top-5-Maßnahmen — Hebel/Aufwand-sortiert, ohne Web-Zugang ausführbar

Maßstab: Was kann Samuel **selbst** heute/Morgen ohne externes Listing und ohne Drittseite tun,
und erhöht messbar die Chance, dass ChatGPT/Perplexity HAI bei den 4 Anfragen als Antwort zeigen.
Reihenfolge = Hebel-zu-Aufwand-Verhältnis.

### 1. On-Site: Kommerzielle Angebote sichtbar und crawlbar machen
Hintergrund: On-Site ist die einzige kontrollierte Discovery-Surface, die Samuel alleine
hochziehen kann, und der Anfrage-Kern des Auftrags („Coaching 1:1", „Team-Workshop",
„Setup Hilfe") spiegelt sich in den drei Festpreis-Angeboten (Setup-Rettung 90 Min/190 €,
Rechner agentenfähig 4 h/690 €, Team-Workshop 3 h/1.200 €). Aktuell ist die GEO-Doku der
Landingpage `/agentfaehig/` als Discovery-Surface **nicht erfasst** (siehe `Phase-1-Audit`,
Abschnitt „Aktueller Footprint nach Stärke" — Homepage trägt HAI-Definition, aber HAI-MCP
und kommerzielle Angebote sind untergewichtet).
Erster Schritt für Samuel:
- `human-agent-interface.com/agentfaehig/` öffnen, prüfen ob die drei Angebote mit Preis
  und „Festpreis / remote / § 19" crawlbar als sichtbarer Text stehen.
- Falls ja: bestätigen via View-Source, dass keine versteckten Accordions / JS-Renderings
  den Inhalt für Bots unsichtbar machen.
- Sitemap-Eintrag und JSON-LD-`Offer`-Markup ergänzen lassen (Auftrag an Claude Code läuft
  parallel) — das ist nicht mein Teil.

### 2. GitHub README: HAI-MCP an kommerzielle Use-Cases anbinden
Hintergrund: `smlfg/hai-mcp` README nennt die unterstützten Clients (Claude Code, Codex,
Cursor, Grok, OpenCode, Hermes), aber nicht explizit den Anwendungsfall „Claude Code Setup
Hilfe für Solo-Selbständige" oder „Team-Workshop". Bei Queries wie „Cursor einrichten lassen"
wird GitHub gewichtet, aber der kommerzielle Pfad fehlt.
Erster Schritt für Samuel:
- 3–5 Sätze in der README ergänzen, die HAI-MCP mit dem konkreten Use-Case verbinden
  („Wer Claude Code / Cursor / Codex produktiv nutzen will, ohne Ownership zu verlieren,
  kann HAI-MCP als Control Plane einsetzen. Kommerzielle Einrichtungshilfe: siehe
  human-agent-interface.com/agentfaehig/.")
- Kein Marketing-Sprech; Wording-Muster aus `canonical-descriptions/no-marketing-floskeln.md`
  beachten.

### 3. GitHub-Profil-README: kommerziellen Kontext hinzufügen
Hintergrund: Profil `github.com/smlfg` nennt `AI Engineering student · building
Human-Agent Interfaces`. Bei der Anfrage „KI-Agenten Coaching 1:1" fehlt der kommerzielle
Kontext komplett. Profile-READMEs werden in Search-Results für Person-Queries stark gewichtet
(`GEO_SEARCH_ENGINE_SOURCE_WEIGHTING_2026-09-09.md`, Rank 6).
Erster Schritt für Samuel:
- Eine Zeile in der Profil-README ergänzen, die das Festpreis-Angebot verlinkt. Z. B.:
  `Commercial: agent setup help (90 min / €190) and team workshops — see human-agent-interface.com/agentfaehig/`
- Auf kanonische Beschreibung achten (kein „KI-Coach", kein „AI-Berater", keine Floskeln
  aus `no-marketing-floskeln.md`).

### 4. LinkedIn-Post / Xing-Profil: einmaliges Event/Proof mit § 19-Angebot
Hintergrund: LinkedIn-Post zu HAI/IPAI ist laut `footprint/2026-09-08_search-linkedin.md`
der stärkste externe Social-Beleg. Wenn dieser Post zusätzlich das Festpreis-Angebot
nennt, entsteht eine externe Citation-Surface, die bei „KI-Agenten Coaching" / „Team-Workshop"
als secondary proof auftauchen kann. LinkedIn wird gewichtet (Rank 9 im Weighting-Dokument),
aber riskant wegen Same-name-Kollisionen (Stark Tech, Perfect Match Agentur u. a.).
Erster Schritt für Samuel:
- Einen LinkedIn-Post draften (in einer Datei, nicht senden), der HAI-MCP + das 3-h-Team-Workshop-
  Angebot verlinkt und mit den Hashtags aus dem IPAI-Post kombiniert.
- Self-Go abwarten vor Post. Same-name-Risiko in Caption explizit addressieren
  (Hochschule Worms / AI Engineering / human-agent-interface.com nennen).

### 5. Verzeichnis-Strategie: vorbereiten, nicht einreichen
Hintergrund: Welche Verzeichnisse HAI realistisch aufnehmen, ist nicht recherchiert (kein
Web-Zugriff). Die fünf im Auftrag genannten Konkurrenten + bonusai.de / krynexlabs.de /
cmt.de sind aber offensichtlich aufgenommen worden. HAI kann später dieselben Verzeichnisse
nutzen. Ohne Recherche ist der konkrete Aufnahme-Pfad unbekannt; er muss nachgeholt werden.
Erster Schritt für Samuel:
- Eine leere CSV anlegen: `HAI-GEO/listings/listing-candidates.csv` mit Spalten
  `Verzeichnis`, `URL`, `Aufnahme-Kriterien`, `Aufwand (Formular/Mail/Post)`,
  `kostenlos ja/nein`, `Notizen`. Diese Datei darf erst NACH der Web-Recherche befüllt
  werden; vorher ist jede Zeile Spekulation und gehört nicht in eine GEO-Akte.
- Parallelschritt: in der nächsten Session mit Web-Zugriff die fünf Konkurrenten-Domains
  durchsuchen (Bonus: per `site:`, falls das Tool es erlaubt) und prüfen, in welchen
  Verzeichnissen Backlinks auf sie zeigen. Das ist die belastbare Liste der
  realistischen HAI-Listings.

## Übergabe an nächsten Lauf / anderes Profil

Drei Aufgaben, die dieses Profil nicht erledigen konnte:

| # | Aufgabe | Profil-Anforderung | erwarteter Output |
|---|---|---|---|
| A | Zitierte URLs pro Anfrage (4 Anfragen × 5–10 URLs) | Web + ChatGPT/Perplexity-Zugang | Tabelle in diesem Markdown, Sektion „Teil 1" |
| B | Listing-Audit der 8 Konkurrenten + HAI-Potenzial | Web | Tabelle mit Aufnahme-Kriterien + Aufwand |
| C | Konkrete Empfehlung der 3–5 Verzeichnisse, in die HAI selbst einreicht | Web + On-Site-Strategie | Konkrete To-do-Liste mit Self-Schritten |

Diese Datei ist absichtlich **eine** Datei, wie der Auftrag verlangt. Keine weiteren
Side-Files in `HAI-GEO/` angelegt.

## Selbst geschafft
- Bestand aufgeführt, was im Profil nicht geht (Web-Tools fehlen) — kein stillschweigendes Erfinden.
- Vorhandene Vorarbeit gezielt ausgewertet (Phase 1, Search-Engine-Weighting, Phase 3,
  Canonical-Descriptions).
- Ehrliche Lücken-Doku statt erfundener URL-Liste.

## Verwendete Hilfe
- Bestehende HAI-GEO-Dateien als Sekundärquelle gelesen (read_file, search_files).
- Kein Web, kein curl, kein Browser.

## Nächster Einstieg
- Claude Code macht parallel On-Site (Sitemap, JSON-LD, FAQ). Diese Datei blockiert das nicht.
- Nächster GEO-Lauf: in einem Profil mit Web-Zugang Aufgaben A, B, C hier abarbeiten
  und Tabelle in diesem Markdown ergänzen (dann umbenennen in
  `OFFSITE_GEO_2026-09-26_RESULTS.md` und diese Notiz ersetzen).
- Samuel selbst: Top-5-Schritte 1–4 in dieser Woche, Maßnahme 5 wartet auf Recherche.
---

## Nachtrag Claude Code — echte Web-Recherche (2026-09-26, WebSearch, US-Index)

Stand: 1 Suchlauf pro Query, Ergebnis-URLs aus echten Suchtreffern. Punkt 1 der Top-5 ist erledigt (PR #8: FAQ, JSON-LD-Offers, Sitemap, IndexNow → Bing HTTP 202).

**Query "KI-Agenten Coaching 1:1 Claude Code Anbieter Deutschland"** → zitierte Anbieter/Quellen:
it-schulungen.com (Claude-Code-Schulung 1 Tag + Blog), hco.de (HECKER CONSULTING), akademie-ki.com (Claude Academy, 1:1-Coaching), heise.de (Claude Code in der Praxis), tech-insider.org, coursera.org.

**Query "KI-Agenten Workshop Team Anbieter Vergleich 2026"** → fast nur **Vergleichs-Listicles**:
xmethod.de/blog/besten-ki-agenturen, twigbit.ai/de/comparison/ki-agentur-vergleich, synapse-ki-agentur.de (8 beste KI-Strategie-Workshop-Anbieter), techsy.io/de (beste KI-Agenten-Entwickler), superchat.de, chatarmin.com, synclaro.de, changemy.ai.

**Query "Claude Code einrichten lassen Freelancer Hilfe Setup"** → **Anleitungen, hinter denen ein Angebot steht**:
nevercodealone.de (Setup inkl. CLAUDE.md + MCP), claude-os.de (Claude-Pro-Setup für Solopreneure), unitedcreation.de (Claude Code einrichten 2026), ostend.digital (Tutorial DE), skill-sprinters.de, lowcloud.io.

### Was das heißt
1. **Team-Workshop-Anfragen** werden aus Listicles beantwortet ("Die X besten … 2026"). Diese Seiten stammen oft von Agenturen, die sich selbst auf Platz 1 setzen. Weg rein: Autor:innen anschreiben (Samuel selbst, kein Agent-Versand).
2. **Setup-Hilfe-Anfragen** werden aus **deutschen Anleitungen** beantwortet, hinter denen ein Angebot steht (unitedcreation, nevercodealone, claude-os). Das ist der größte eigene Hebel: **eine ehrliche, tiefe Anleitung "Claude Code einrichten: CLAUDE.md, MCP, Berechtigungen, Kosten" auf human-agent-interface.com**, die auf /agentfaehig/ verlinkt. Samuel hat dafür echte Praxis (20.000+ Sessions).
3. 1:1-Coaching-Anfragen landen bei Akademien (akademie-ki, it-schulungen). HAI konkurriert dort über Format (90 Min, Festpreis) statt Masse.

### Nächste konkrete Schritte
- [ ] Anleitungsseite "Claude Code einrichten" planen (mit Samuel, Inhalte aus seiner Praxis — kein generischer KI-Text).
- [ ] 3 Listicles auswählen, deren Autor:innen Samuel anschreibt (xmethod, twigbit, synapse-ki-agentur prüfen, ob sie Einzelanbieter aufnehmen).
- [ ] Nach 7 Tagen: Inkognito-ChatGPT-Test wiederholen, gleiche Fragen, Ergebnis hier notieren.
