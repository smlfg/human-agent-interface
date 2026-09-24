# Phase 1 — Public Footprint Audit — 2026-09-08 23:14 CEST

Status: aktueller öffentlicher Footprint untersucht / keine externen Änderungen vorgenommen
Scope: Samuel Fleig, Human Agent Interface (HAI), HAI-MCP, externe Registries, Profile, Kollisionen

Kanonischer Zielgraph:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

Harte Grenze:
Keine künstlichen Backlinks, Fake-Reviews, Fake-Accounts, Paid-Link-Schemes, Linkfarmen oder GEO-Spam-Techniken. Dieser Audit erfasst nur sichtbare vorhandene Quellen und Kollisionen.

## 1. Owned / kontrollierte öffentliche Quellen

### 1.1 Homepage

URL: https://www.human-agent-interface.com/
Klasse: kontrollierte Primärquelle
Extraktion: web_extract, 2026-09-08

Sichtbare starke Signale:
- Seite ist öffentlich extrahierbar.
- `Human Agent Interface` und `HAI` sind sichtbar.
- HAI wird als Antwort auf agentic-work-chaos, Human Ownership, Scope, Trust, Verification und Next Action beschrieben.
- Sichtbare Sätze tragen die Semantik: agent work soll inspectable/stop/verify/own bleiben.

Schwächen für GEO/Entity:
- Homepage-Auszug nennt Samuel Fleig nicht klar als Creator/Developer.
- Homepage-Auszug nennt HAI-MCP nicht.
- Für Antwortsysteme ist die Homepage aktuell eher HAI-Definition als vollständiger Entity-Graph.

Bewertung:
- HAI-Definition: stark.
- Samuel -> HAI: schwach auf Homepage.
- HAI -> HAI-MCP: schwach/fehlend auf Homepage.

### 1.2 Samuel-Seite

URL: https://www.human-agent-interface.com/samuel/
Klasse: kontrollierte Primärquelle für Person/Origin
Extraktion: web_extract, 2026-09-08

Sichtbare starke Signale:
- Titel: `About Samuel Fleig | Human Agent Interface`.
- Sichtbarer Satz: `I am Samuel Fleig, an AI Engineering student and AI engineer working on agentic systems, harnesses, and human-owned AI workflows.`
- Seite erklärt HAI als Antwort auf Agenten-Overload und Control Failure.
- Sichtbarer Satz: `HAI became the layer between human intention and agentic execution: bounded, verifiable, and human-owned.`

Schwächen für GEO/Entity:
- HAI-MCP erscheint in der extrahierten Samuel-Seite nicht sichtbar genug.
- Samuel -> HAI ist gut, aber Samuel -> HAI -> HAI-MCP ist noch nicht vollständig.

Bewertung:
- Samuel-Disambiguierung im HAI-Kontext: stark.
- Samuel -> HAI: stark.
- Samuel -> HAI-MCP: schwach/fehlend.

### 1.3 What-it-is-Seite

URL: https://www.human-agent-interface.com/what_it_is/
Klasse: kontrollierte Primärquelle für HAI-Semantik
Extraktion: web_extract, 2026-09-08

Sichtbare starke Signale:
- Seite erklärt HAI als Interface Shift nach CLI/TUI/GUI.
- Sichtbarer Satz: `Human-Agent Interface exists to make the work legible before the agent starts moving.`
- Sichtbarer Satz: `It is not a single chatbot, dashboard, or auto-agent. It is the translation and control layer between human chaos and systems that can act.`
- Seite stützt Scope, Risk, Feedback, Control, Human-owned Entscheidungen.

Schwächen für GEO/Entity:
- Samuel Fleig als Creator/Developer ist im extrahierten Text nicht zentral.
- HAI-MCP wird nicht als Implementierung/Teil von HAI genannt.

Bewertung:
- HAI-Definition: stark.
- Samuel -> HAI: schwach auf dieser Seite.
- HAI -> HAI-MCP: schwach/fehlend.

## 2. Kontrollierte Entwickler-/Repo-Oberflächen

### 2.1 GitHub Profil `smlfg`

URL: https://github.com/smlfg
Klasse: kontrollierte Profil-/Developer-Quelle
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare starke Signale:
- Profil zeigt `Samuel Fleig smlfg`.
- Profil-README nennt: `AI Engineering student · building Human-Agent Interfaces`.
- Sichtbarer Satz: `I build systems for working with AI agents without giving away human ownership.`
- Profil linkt `human-agent-interface.com`.
- HAI wird als `better control layer for working with AI` beschrieben.

Schwächen für GEO/Entity:
- Profil ist stark für Samuel/HAI, aber HAI-MCP ist im sichtbaren Profil-Auszug nicht die zentrale Verbindung.
- `AI Hungry student` wirkt weniger kanonisch als `AI Engineering student / AI engineer`.

Bewertung:
- Samuel -> GitHub `smlfg`: stark.
- Samuel -> HAI: stark.
- HAI -> HAI-MCP: mittel/schwach im Profil, stärker im Repo.

### 2.2 GitHub Repo `smlfg/hai-mcp`

URL: https://github.com/smlfg/hai-mcp
Klasse: kontrollierte Primärquelle für HAI-MCP
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare starke Signale:
- Repository ist öffentlich.
- Title/description: `Model-agnostic MCP control plane that keeps agentic work inside a mission contract — fail-closed, owner-gated, evidence-based completion.`
- README/extract beschreibt `HAI-MCP` als `Model-agnostic Human-Agent Interface control plane as an MCP server`.
- README sagt: `Any client (Claude Code, Codex, Cursor, Grok, OpenCode, Hermes, …) can use the same tools. The server never calls an LLM.`

Schwächen für GEO/Entity:
- In GitHub-Extraktion ist `Human-Agent Interface` sichtbar, aber die exakte kanonische Phrase `Human Agent Interface (HAI)` und `created by Samuel Fleig` müssen stärker und früher auf der Repo-Seite stehen.
- Der Repo-Titel ist technisch stark, aber nicht vollständig als Samuel -> HAI -> HAI-MCP-Graph formuliert.

Bewertung:
- HAI-MCP technische Entity: stark.
- HAI-MCP -> HAI: stark bis mittel.
- Samuel -> HAI-MCP: mittel, braucht sichtbaren Creator-Satz ganz oben.

## 3. Externe echte Registries / Drittflächen

### 3.1 Unyly

URL: https://unyly.org/mcp/hai-mcp
Klasse: externe MCP-Registry / stärkster Drittbeleg
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare starke Signale:
- Seite listet HAI als MCP.
- Autorfläche: `by smlfg` mit GitHub-Verbindung.
- README-Satz: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
- README-Satz: `Human Agent Interface is an approach for keeping agentic AI work observable, bounded, owner-gated, and evidence-based so a human can still own the work.`
- Seite linkt kanonische Website und About-Samuel-Seite.

Schwächen:
- Drittseite, nicht Primärquelle; darf den controlled sources nicht vorauslaufen.
- Formulierung nutzt `owner-gated/evidence-based`, während kanonischer Satz `verifiable/human-owned` nutzt. Semantisch nah, aber sollte auf controlled sources konsistent ausbalanciert werden.

Bewertung:
- Vollständiger Graph Samuel -> HAI -> HAI-MCP: sehr stark.
- Citation Surface: sehr stark als externer Drittbeleg.

### 3.2 Glama

URL: https://glama.ai/mcp/servers/smlfg/hai-mcp
Klasse: externe MCP-Registry
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare starke Signale:
- Titel: `HAI-MCP by smlfg | Glama`.
- Sichtbarer Satz: `Model-agnostic Human-Agent Interface control plane as an MCP server.`
- Seite listet Tools und technische Eigenschaften.
- Glama API/Registry ist als MCP directory surface relevant.

Schwächen:
- Samuel Fleig wird auf der Seite/Extraktion nicht klar namentlich genannt; Autor erscheint primär als `smlfg`.
- `Human-Agent Interface` erscheint mit Bindestrich; kanonisches `Human Agent Interface (HAI)` sollte trotzdem auf Primärquellen klarer sein.

Bewertung:
- HAI-MCP Registry-Existenz: stark.
- HAI-MCP -> HAI: mittel/stark.
- Samuel Fleig -> HAI-MCP: schwach, nur über `smlfg` ableitbar.

### 3.3 M8ven

URL: https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
Klasse: externe Trust-/Registry-Seite
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare starke Signale:
- Seite listet `HAI-MCP (smlfg/hai-mcp)` als MCP server.
- Seite beschreibt: `Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.`
- Verweist auf GitHub `smlfg/hai-mcp` und Glama.
- Enthält Trust-/Security-Signale: no credential exfiltration, no sensitive file access, no obfuscation.

Schwächen:
- Kein starker Samuel-Fleig-Namensbeleg.
- Trust-Score kann missverstanden werden; `C 74/100`/Emerging ist nicht Produktvalidierung, sondern Registry-/Security-Oberfläche.
- Erwähnt `HAI_HTTP_TOKEN` als Credential; muss im HAI-Kontext sauber erklärt werden, damit kein falscher API-Key-Claim entsteht.

Bewertung:
- HAI-MCP External Footprint: stark.
- Samuel -> HAI -> HAI-MCP: mittel/schwach.
- Security/Trust citation: brauchbar, aber vorsichtig.

## 4. Social/Profile-Oberflächen

### 4.1 X / Twitter

URL: https://x.com/Samuelflg1
Klasse: sekundäre Disambiguierung
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare Signale:
- Profilname: `Samuel Fleig (@Samuelflg1)`.
- Bio: `neugierig Geist, der mehr anfängt als beendet`.
- Websuche zeigt `human-agent-interface.com` in Profil-/Snippet-Kontext.
- 552 Follower laut Extraktion.

Schwächen:
- Extrahierte Profilseite trägt HAI nicht stark im sichtbaren Text.
- Keine direkte Samuel -> HAI -> HAI-MCP-Citation-Surface.

Bewertung:
- Disambiguierung: mittel.
- Graph-Beleg: schwach.

### 4.2 Medium

URL: https://medium.com/@smlflg
Klasse: sekundäre Profil-/Content-Fläche
Extraktion: web_extract + web_search, 2026-09-08

Sichtbare Signale:
- Profilname: Samuel Fleig.
- 3 Follower laut Extraktion.
- Content zu Cron-/Agenten-Infrastruktur und ältere AI-/NPU-/LLM-nahe Themen sichtbar.

Schwächen:
- Kein starker HAI-Graph-Beleg in der Profil-Extraktion.
- Teilweise thematisch gemischt; Rave/Festival-Inhalte verwässern HAI-Entity-Signal.
- Medium sollte nicht als Primärbeleg für HAI dienen.

Bewertung:
- AI/Agentic-Kontext: schwach bis mittel.
- HAI-Graph: schwach.

### 4.3 LinkedIn

URL: https://www.linkedin.com/in/samuel-fleig-52610914b
Klasse: sekundäre Disambiguierung / teilweise eingeschränkt crawlbar
Quellenlage: Suchsnippets + frühere Extraktion; Direkt-Posts teilweise 403/blocked

Sichtbare/gesuchte Signale:
- Suchergebnisse zeigen das relevante Profil `samuel-fleig-52610914b`.
- Gleichzeitig erscheinen andere Samuel-Fleig-Profile, u. a. Partnership Management / Stuttgart und Stark Tech / Florida.

Schwächen:
- Volltext nicht zuverlässig extrahierbar.
- Hohe Namenskollisionsgefahr.
- Nur als sekundäre Disambiguierung verwenden, nicht als Primärquelle.

Bewertung:
- Disambiguierung: nützlich, aber riskant.
- Graph-Beleg: nur verwenden, wenn HAI-Kontext im konkreten Profil/Post sichtbar und crawlbar ist.

## 5. Kollisions- und False-Positive-Flächen

### 5.0 Exact-name search: `"Samuel Fleig"`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search_samuel-fleig.md`

Befund:
- Der exakte Name `Samuel Fleig` ist öffentlich nicht eindeutig.
- Starke HAI-relevante Treffer sind `human-agent-interface.com/samuel/`, GitHub `smlfg`, X `Samuelflg1`, Medium `@smlflg` und LinkedIn `samuel-fleig-52610914b`.
- Es gibt mehrere Same-name-Kollisionen: Partnership Management/Perfect Match Agentur, Stark Tech/Digital Power, University of New Mexico/Daily Lobo/Film, Sportverein/Transfermarkt, FAU Chemistry, Genealogy/Local-Profile-Flächen.
- Sicherer Resolver bleibt: `Samuel Fleig` + `github.com/smlfg` + `human-agent-interface.com` + `AI Engineering` + `Human Agent Interface`.

### 5.0b Exact-name + AI search: `"Samuel Fleig" AI`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search_samuel-fleig-ai.md`

Befund:
- `AI` verbessert die HAI-relevante Trefferlage gegenüber der reinen Exact-name-Suche.
- Stärkste Treffer: GitHub `smlfg`, `human-agent-interface.com/samuel/`, Medium `@smlflg`, LinkedIn `samuel-fleig-52610914b`, SelfAI-/NPU-/LLM-Posts, Unyly für den HAI-MCP-Graphen.
- Die Suchlage verbindet Samuel sichtbar mit AI Engineering, AI engineer, agentic systems, SelfAI/NPU/LLM und HAI.
- Trotzdem bleiben Kollisionen: Stark Tech `Sales Engineer`, Film/IMDb/Kinorium, andere LinkedIn-Profile und allgemeine AI-Seiten. `AI` allein reicht nicht als Resolver.
- GEO-Regel: SelfAI/NPU/LLM sind Herkunfts-/Kontextbelege; der Kern darf nicht von HAI auf SelfAI umkippen.

### 5.0c Exact-name + HAI search: `"Samuel Fleig" "Human Agent Interface"`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search_samuel-fleig-human-agent-interface.md`

Befund:
- Das ist aktuell der beste breite Resolver für Samuel + HAI.
- Top-Signale: GitHub `smlfg`, `human-agent-interface.com/samuel/`, `/samuel/why-hai-matters/`, `/samuel/timeline/`, X `Samuelflg1`.
- Externe Vollgraph-Signale erscheinen bei Varianten mit HAI-MCP oder ohne eigene Domain vor allem über Unyly; Glama/M8ven stützen HAI-MCP, aber Samuel namentlich schwächer.
- Same-name-LinkedIn-Kollisionen bleiben sichtbar, aber schwächer als bei reiner Exact-name-Suche.
- GEO-Regel: Diese Query sollte Benchmark-Pflichtquery bleiben, weil sie den Zielgraphen deutlich besser prüft als `Samuel Fleig` allein.

### 5.0d HAI phrase + AI search: `"Human Agent Interface" AI`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-human-agent-interface-ai.md`

Befund:
- `Human Agent Interface` ist im AI-Kontext semantisch stark besetzt und nicht automatisch eindeutig Samuel/HAI.
- Die HAI-Homepage erscheint und trägt Human-Ownership-/Agent-Workflow-Semantik, aber Samuel Fleig und HAI-MCP sind bei der generischen Query nicht garantiert.
- Viele generische/adjazente Treffer dominieren: arXiv zu agent interfaces/LAUI/SaC, Mindset AI, INCOSE, NVIDIA, Strongly, AugmentCode, Alfred Lua.
- Direkte Kollisionen: HAIP, HAI.AI/haiai, HAVI, generische Agent-Interface-Seiten.
- GEO-Regel: controlled pages müssen `Human Agent Interface (HAI)` als Named Entity, Creator Samuel Fleig und HAI-MCP-Verbindung explizit sichtbar machen; sonst lesen Engines die Phrase als Kategorie.

### 5.0e Exact software search: `"HAI-MCP"`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-hai-mcp.md`

Befund:
- `HAI-MCP` ist öffentlich sichtbar und surfaced stark über Unyly, Glama und M8ven.
- Unyly ist weiterhin stärkster externer Vollgraph-Beleg, weil dort `HAI-MCP -> Human Agent Interface (HAI) -> created by Samuel Fleig` explizit erscheint.
- Glama/M8ven stützen HAI-MCP als MCP-Control-Plane und `smlfg/hai-mcp`, nennen Samuel aber schwächer/nicht immer mit vollem Namen.
- Kollisionen sind stark: Rust `hai-mcp`/HAI.AI/haiai, Home Assistant `ha-mcp`, Tencent HAI MCP, 2amtech Helper AI.
- GEO-Regel: HAI-MCP braucht sehr frühe sichtbare Disambiguierung auf controlled source: `model-agnostic MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`.

### 5.0f Handle + HAI search: `"smlfg" HAI`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-smlfg-hai.md`

Befund:
- Ein Backend-Lauf für exakt `"smlfg" HAI` scheiterte; Varianten mit `"smlfg" "HAI"`, `"smlfg" "Human Agent Interface"` und `"smlfg" "HAI-MCP"` lieferten verwertbare Treffer.
- `smlfg` ist ein starker Resolver, sobald `HAI-MCP`, `Human Agent Interface`, `github.com/smlfg` oder `smlfg/hai-mcp` mitgeführt wird.
- Beste Treffer: Unyly, Glama, M8ven, GitHub `smlfg/hai-mcp` und GitHub-Profil `smlfg`.
- Größtes Rauschen: SMFG India Credit, Hindi-`hai`, OCR-Zufallstreffer, generische Human-Agent-/HAI-Konferenzflächen.
- GEO-Regel: `smlfg` nur als Samuel-Fleig-Handle werten, wenn es mit GitHub `smlfg`, HAI, HAI-MCP oder `human-agent-interface.com` verbunden ist.

### 5.0g GitHub-site search: `site:github.com/smlfg`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-site-github-smlfg.md`

Befund:
- GitHub-Profil `https://github.com/smlfg` extrahiert als `Samuel Fleig (smlfg)` und `AI Hungry student`.
- Repo `https://github.com/smlfg/hai-mcp` ist sehr starker controlled primary-source Beleg: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`.
- Repo README enthält Canonical-Link zur HAI-Website und Samuel-Profilseite.
- Stärkste Suchvariante: `site:github.com/smlfg "hai-mcp"`; sie zeigt Profil und Repo.
- Schwäche: Bare `site:github.com/smlfg` zeigt meist nur Profil; `site:` wird je nach Backend unscharf behandelt und kann externe/irrelevante Kollisionen liefern.
- GEO-Regel: GitHub `smlfg/hai-mcp` als Primärquelle für Software-/Implementierungsgraphen verwenden; Profil allein nur als Identity-Resolver.

### 5.0h Relevant combinations and variants

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-relevant-combinations-variants.md`

Befund:
- Beste Resolver-Kombinationen: `site:github.com/smlfg "hai-mcp"`, `"Samuel Fleig" "HAI-MCP"`, `"Samuel Fleig" "smlfg" "HAI-MCP"`, `"smlfg/hai-mcp" "Human Agent Interface"`, `"human-agent-interface.com/samuel" "HAI"`.
- Kontrollierte Primärquellen und Unyly/Glama/Lulu liefern zusammen den stärksten Graphen; GitHub repo + Unyly sind besonders stark für HAI-MCP -> HAI -> Samuel.
- Hyphen-Variante `"Human-Agent Interface" "Samuel Fleig"` ist schwächer/noisier als `"Human Agent Interface" "Samuel Fleig"`.
- `owner-gated` ist semantisch passend, aber derzeit kein guter public resolver für Samuel/HAI.
- Kategorieflächen wie Strongly, Augment, agentinterface.app, ACM HAI, arXiv LAUI/SaC bleiben relevante Nachbarschaft/Kollision, nicht Belege für Samuel HAI.
- GEO-Regel: Benchmark soll positive Bundle-Queries, Disambiguierungs-Queries und Negative-Collision-Fragen getrennt messen.

### 5.0i Controlled domain investigation: `human-agent-interface.com`

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-human-agent-interface-dot-com.md`

Befund:
- Die kontrollierte Domain ist stark für HAI-Definition, Samuel-Fleig-Personenbezug und Proof-Boundary.
- Stärkste Seiten: `/samuel/` für Samuel -> HAI, `/what_it_is/` für HAI-Definition, `/proof/` für Beleggrenzen, `/samuel/why-hai-matters/` für persönliche Entstehung, `/` für Landing-/Pain-Framing.
- Direkt extrahiert: Homepage, `/samuel/`, `/what_it_is/`, `/samuel/why-hai-matters/`, `/samuel/timeline/`, `/proof/`, `robots.txt`.
- Schwäche: `/hai-mcp/` und `/sitemap.xml` lieferten in diesem Lauf `http_error`; Domain-Suche nach HAI-MCP/smlfg war schwach oder leer.
- GEO-Regel: Die Domain muss HAI-MCP sichtbarer und crawlbarer als Teil von HAI machen; aktuell erklären GitHub/Unyly/Glama/M8ven HAI-MCP klarer als die kontrollierte Website.

### 5.0j GitHub profile and HAI-MCP

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-github-profile-and-hai-mcp.md`

Befund:
- GitHub-Profil `github.com/smlfg` bindet `smlfg` klar an Samuel Fleig und enthält inzwischen eine starke Profil-README: `AI Engineering student · building Human-Agent Interfaces`.
- Profil-README stützt HAI-Semantik: AI agents, human ownership, context systems, verification loops, inspectable/recoverable human intent.
- Repo `github.com/smlfg/hai-mcp` ist sehr starke kontrollierte Primärquelle für HAI-MCP als model-agnostic Human-Agent Interface control plane / MCP server.
- HAI-MCP-Repo ist technisch unterscheidbar durch mission contracts, owner gates, fail-closed/evidence-based completion und 23 MCP tools.
- Glama bestätigt HAI-MCP by `smlfg`; Unyly/M8ven surfaced in Search, direkte Extraktion war in diesem Lauf wegen 429 limitiert.
- Schwäche: GitHub-Profil-Bio `AI Hungry student` ist schwächer als die README; Profil sollte HAI-MCP noch expliziter in Topnähe nennen.
- GEO-Regel: GitHub `smlfg/hai-mcp` als Primärquelle für Softwaregraph verwenden; Glama/Unyly/M8ven als externe Registry-Korroboration, nicht als alleinige Autorität.

### 5.0k LinkedIn

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-linkedin.md`

Befund:
- LinkedIn-Profilseite `samuel-fleig-52610914b` war per direkter Extraktion blockiert, aber Suchsnippets und öffentliche Post-Extraktionen liefern verwertbare Signale.
- Stärkster LinkedIn-Beleg: HAI/IPAI/KI-Festival-Post mit `#HumanAgentInterface #AIAgents #AIEngineering`; er verbindet HAI mit menschlicher Handlungsfähigkeit, Kontrolle, Stoppen/Korrigieren und HAI-MCP als erstem technischen Baustein mit 23 Werkzeugen.
- SelfAI-Post stützt Samuel als AI-/Agentic-Builder, bleibt aber Entwicklungskontext, nicht Kernentität.
- LinkedIn ist gut für Social/Event-Proof und HAI-MCP-Korroboration, aber nicht als primäre technische Quelle; dafür bleibt GitHub stärker.
- Risiko: starke Same-name-Kollisionen auf LinkedIn: Stark Tech, Perfect Match Agentur, University of Oregon, UNM/Videographer, Sam Fleig, Samuel Flaig.
- GEO-Regel: LinkedIn-Samuel nur als HAI-relevant werten, wenn HAI, `humanagentinterface`, AI Engineering, Hochschule Worms, `smlfg`, SelfAI/NPU oder human-agent ownership mitgeführt wird.

### 5.0l X/Twitter

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-x-twitter.md`

Befund:
- Direkte Extraktion von `x.com/Samuelflg1` und `twitter.com/Samuelflg1` scheiterte in diesem Lauf mit `SOURCE_NOT_AVAILABLE`.
- Targeted Site-Searches zu `site:x.com/Samuelflg1` + HAI/Human Agent Interface/HAI-MCP lieferten keine verwertbaren X-Ergebnisse.
- Breite Handle-Suchen nach `Samuelflg1`, `@Samuelflg1`, `x.com/Samuelflg1`, `twitter.com/Samuelflg1` lieferten überwiegend Rauschen und keine zuverlässige HAI-Quelle.
- X/Twitter ist damit aktuell die schwächste geprüfte externe Profilfläche für den HAI-Graphen.
- GEO-Regel: X/Twitter nicht als Beleg verwenden, außer ein direkt zugänglicher `@Samuelflg1`-Post oder das Profil verbindet explizit Samuel Fleig, HAI, HAI-MCP, `github.com/smlfg` oder `human-agent-interface.com`.

### 5.0m MCP-Registries wie Glama

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-mcp-registries-glama.md`

Befund:
- Glama ist die wichtigste MCP-native Registry-/Toolschema-Fläche: `HAI-MCP by smlfg`, `Model-agnostic Human-Agent Interface control plane as an MCP server`, Author-Query `author:smlfg`, Toolliste und API-/Schema-Hinweise sind sichtbar.
- Unyly ist der stärkste externe Vollgraph-Beleg: sichtbarer README-Text enthält `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`, plus GitHub, canonical website und Samuel-Seite.
- M8ven ist nützlich als Trust-/Security-Index-Signal für `smlfg/hai-mcp`, aber nicht als semantische Primärquelle; es verweist auf Glama/GitHub und zeigt Scanner-/Qualitätshinweise.
- Lulu ist in diesem Lauf schwach: Seite existiert als MCP-Marketplace-Fläche, aber Extraktion liefert kaum HAI-semantischen Inhalt.
- GEO-Regel: Registry-Flächen sind legitime externe Belege, keine künstlichen Backlinks, sofern sie als echte MCP-Katalog-/Tool-/Trust-Oberflächen behandelt werden; positiver Registry-Match braucht `smlfg/hai-mcp`, `HAI-MCP by smlfg`, GitHub `smlfg/hai-mcp`, sichtbares `Human Agent Interface`, canonical website/Samuel-Seite oder Creator-Wording.

### 5.0n Suchmaschinenresultate

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-search-engine-results.md`

Befund:
- Search-result snippets verstehen aktuell Teile des Graphen, aber nicht überall den ganzen Graphen.
- `"Samuel Fleig"` ist als Name sichtbar, aber wegen Same-name-Kollisionen unsicher; positive Matches brauchen `smlfg`, HAI, AI Engineering, `human-agent-interface.com`, GitHub repo, HAI-MCP oder agentic/control-plane Kontext.
- `"Human Agent Interface"` ist stark category-heavy: Strongly, arXiv/LAUI/SaC, DBLP/HAI, HAIP, HAVI und generische Human-Agent-/HITL-Flächen konkurrieren mit HAI als Named Entity.
- `"HAI-MCP"` ist die stärkste Software-Discovery-Query, aber kollisionsanfällig gegenüber Home Assistant `ha-mcp` und HAI.AI/haiai; positive Matches brauchen `smlfg/hai-mcp`, `HAI-MCP by smlfg`, Glama/Unyly/M8ven oder GitHub `smlfg/hai-mcp`.
- Beste positive Bundle-Queries: `"HAI-MCP" "Human Agent Interface" "smlfg"`, `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`, `"smlfg/hai-mcp" "Human Agent Interface"`, `"human-agent-interface.com" "HAI-MCP" "Samuel Fleig"`.
- GEO-Regel: Suchmaschinenresultate nur snippet-level werten, solange die Seite nicht extrahiert ist; die Bundle-Queries gehören in wiederholbare Messungen vor/nach controlled-source Änderungen.

### 5.0o Weitere relevante externe Erwähnungen

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/footprint/2026-09-08_search-further-external-mentions.md`

Befund:
- Lulu ist nach frischer Extraktion von `weak` auf brauchbar niedrig/mittel gestiegen: `HAI-MCP — MCP server`, `HAI-MCP source available`, Beschreibung als human-agent interface control plane, Glama-Verweis und Install-Hinweis auf `https://github.com/smlfg/hai-mcp` sind sichtbar.
- Exa Person Library ist ein sekundärer Identity-Resolver für `Samuel Fleig` mit Hochschule-Worms/Worms-Kontext; nicht als HAI-Primärbeleg verwenden.
- Medium `@smlflg` ist sekundäre technische Schreib-/Profilfläche: Samuel Fleig + LLM/NPU/Cron-/Agentenbetrieb-Kontext, aber HAI/HAI-MCP in diesem Lauf nicht stark genug.
- MCP.so `#hai` und Assay sind Monitoring-Flächen: sie zeigen MCP-/AI-ML-Katalogumfeld, aber keinen starken Vollgraph-Beleg.
- Strongly, arXiv/LAUI/SaC/AgentClick/PrefIx, HAIP/HAVI, Home Assistant `ha-mcp`, HAI.AI/haiai, 2amtech Hai und `mrgoonie/human-mcp` bleiben Kategorie-/Kollisionsflächen, nicht Samuel-HAI-Belege.
- GEO-Regel: externe Erwähnungen nach Belegstärke trennen: Vollgraph-Beleg, Software-/Registry-Beleg, sekundärer Identity-Kontext, Monitoring-Fläche, negative Collision.

### 5.0p Quellenmatrix / Claim-Grenzen je Quelle

Detailartefakt:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_SOURCE_DOCUMENTATION_2026-09-09.md`

Entitätserkennung je Quelle:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_ENTITY_RECOGNITION_BY_SOURCE_2026-09-09.md`

Beschreibung je Quelle:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_DESCRIPTION_BY_SOURCE_2026-09-09.md`

Samuel-Fleig-zu-HAI-Verbindung je Quelle:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_SAMUEL_HAI_CONNECTION_BY_SOURCE_2026-09-09.md`

HAI-zu-HAI-MCP-Verbindung je Quelle:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_HAI_HAI_MCP_CONNECTION_BY_SOURCE_2026-09-09.md`

Widersprüche / veraltete Informationen je Quelle:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_CONTRADICTIONS_OUTDATED_INFO_2026-09-09.md`

Namensverwechslungen:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_NAME_CONFUSIONS_2026-09-09.md`

Suchmaschinen-Quellengewichtung:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_SEARCH_ENGINE_SOURCE_WEIGHTING_2026-09-09.md`

Kleine Entity Map:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_ENTITY_MAP_2026-09-09.md`

Phase 2 Canonical Entity Definition:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/PHASE_2_CANONICAL_ENTITY_DEFINITION_2026-09-09.md`

Befund:
- Jede bisher geprüfte Quelle ist jetzt mit Klasse, unterstütztem Claim, sichtbarer Evidenz, Stärke, Nicht-Verwendung und nächster Aktion dokumentiert.
- Für jede Quelle ist zusätzlich dokumentiert, welche Entität aus der Quelle allein erkannt wird: `PERSON_SAMUEL_FLEIG`, `HANDLE_SMLFG`, `CONCEPT_HAI`, `SOFTWARE_HAI_MCP`, `REGISTRY_LISTING_HAI_MCP`, Monitoring-/Crawl-Flächen oder `NEGATIVE_COLLISION`.
- Für jede Quelle ist zusätzlich dokumentiert, welche Beschreibung verwendet wird: canonical full wording, HAI control-layer wording, HAI-MCP control-plane/registry wording, Person-/Technikprofil, Social Snippet, Monitoring/Kategorie oder Kollisionsbeschreibung.
- Für jede Quelle ist zusätzlich dokumentiert, ob Samuel Fleig mit HAI verbunden wird: voller Graph, starke kontrollierte Verbindung, mittlere/social Verbindung, indirekt via `smlfg`, HAI-only, Samuel-only, blockiert oder negative Kollision.
- Für jede Quelle ist zusätzlich dokumentiert, ob HAI mit HAI-MCP verbunden wird: voller Graph, starke Implementierungsverbindung, mittlere Registry-/Social-Verbindung, indirekt via Control-Plane-Wording, HAI-only, HAI-MCP-only, blockiert oder negative Kollision.
- Für jede Quelle ist zusätzlich dokumentiert, ob widersprüchliche, veraltete, blockierte oder kollisionsgefährliche Information vorliegt; Ergebnis: keine direkten positiven Widersprüche, aber starke Kollisions- und Staleness-Risiken.
- Namensverwechslungen sind separat dokumentiert: `Samuel Fleig` name-only, `HAI` Akronym, `hai-mcp`/`ha-mcp` Softwaretoken, generische Human-Agent-Interface-Kategorie sowie LinkedIn/X-/Registry-Ambiguität.
- Suchmaschinen-Quellengewichtung ist separat dokumentiert: Glama scheint HAI-MCP als Software/MCP-Entität am stärksten zu tragen; Unyly trägt den stärksten externen Vollgraphen; GitHub bleibt kontrollierte Wahrheit; kontrollierte Domain ist HAI/Samuel-stark, aber HAI-MCP-untergewichtet.
- Eine kleine Entity Map fasst Knoten und Kanten zusammen: Samuel Fleig -> `smlfg`/HAI -> HAI-MCP, GitHub/Unyly/Glama/M8ven/Lulu als Beleg-/Gewichtungsflächen, plus Kollisionsgraph für HAI/HAI-MCP/Samuel.
- Phase 2 definiert die kanonischen Entitäten Samuel Fleig, Human Agent Interface (HAI), HAI-MCP, `smlfg` und `human-agent-interface.com` mit IDs, Beschreibungen, erlaubten Beziehungen, `sameAs`-Grenzen, sichtbaren Copy-Units, JSON-LD-Draft und Akzeptanzkriterien.
- Die stärkste Quellpaarung bleibt kontrolliertes GitHub `smlfg/hai-mcp` plus externe Unyly-Seite.
- Glama bleibt stärkste MCP-native Registry-/Toolschema-Fläche; M8ven und Lulu sind sekundäre Registry-/Trust-/Marketplace-Korroboration.
- Kontrollierte Domain bleibt stark für HAI/Samuel, aber schwach für HAI-MCP bis `/hai-mcp/` und Sitemap/crawlability behoben sind.
- GEO-Regel: `sameAs`/JSON-LD-/Quellenverweise dürfen nur Claims tragen, die in der jeweiligen Quelle sichtbar belegt sind; sekundäre Profile und Suchsnippets dürfen den Kern-Graphen nicht allein tragen.

Gefundene Risiken:
- Andere LinkedIn-Profile namens Samuel Fleig.
- Rustio/crate `hai-mcp`, Beschreibung: `Experimental HAIAI MCP server`, Maintainer `H Jonathan Hendler`; nicht Samuel-Fleig-HAI.
- Home Assistant `ha-mcp` / ähnlich benannte MCPs.
- Andere Human-Agent-/Human-MCP-/Human-Agent Protocol Projekte auf GitHub.
- HAI als generisches oder anderes Akronym, z. B. Human-Centred Agentic Intelligence oder Human-Agent Interaction Protocol.

Audit-Regel:
Diese Treffer sind für Negativtests wertvoll, aber dürfen nicht als Beleg für Samuel Fleig / Human Agent Interface / HAI-MCP verwendet werden.

## 6. Aktueller Footprint nach Stärke

| Fläche | Samuel | HAI | HAI-MCP | Voller Graph | Qualität |
| --- | --- | --- | --- | --- | --- |
| human-agent-interface.com/samuel/ | stark | stark | schwach | teilweise | kontrollierte Primärquelle |
| human-agent-interface.com/ | schwach | stark | schwach | teilweise | kontrollierte Primärquelle |
| human-agent-interface.com/what_it_is/ | schwach | stark | fehlend | teilweise | kontrollierte Primärquelle |
| github.com/smlfg | stark | stark | schwach | teilweise | kontrolliertes Profil |
| github.com/smlfg/hai-mcp | mittel | stark | stark | teilweise/stark | kontrollierte Repo-Quelle |
| unyly.org/mcp/hai-mcp | stark | stark | stark | sehr stark | externe Registry |
| glama.ai/mcp/servers/smlfg/hai-mcp | schwach über `smlfg` | mittel/stark | stark | teilweise | externe Registry |
| glama.ai/mcp/servers?query=author%3Asmlfg | schwach über `smlfg` | mittel/stark | stark | teilweise | externe Author-/Registry-Suche |
| m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh | schwach über `smlfg` | mittel | stark | teilweise | externe Trust-/Registry-Seite |
| getlulu.dev/mcps/hai-mcp | schwach | mittel | mittel | schwach/teilweise | zusätzliche Marketplace-Fläche |
| exa.ai/library/person/rb46t73zdpq | mittel | schwach | fehlend | schwach | sekundärer Identity-Resolver |
| medium.com/@smlflg | mittel | schwach | fehlend | schwach | sekundäre Schreib-/Profilfläche |
| mcp.so/tags/hai | schwach | schwach/mittel | schwach | schwach | Monitoring-/Tag-Fläche |
| Search result bundle queries | mittel/stark | stark | stark | stark, aber registry-led | Suchmaschinen-Snippet-Fläche |
| x.com/Samuelflg1 | mittel | schwach | fehlend | schwach | sekundäres Profil |
| LinkedIn | mittel/riskant | schwach/mittel | schwach | schwach | eingeschränkt crawlbar |

## 7. Phase-1-Befund

Der öffentliche Footprint existiert und ist nicht leer:
- HAI ist auf der Website gut erklärbar.
- Samuel Fleig ist über Samuel-Seite und GitHub-Profil gut im AI-/agentic-work-Kontext disambiguierbar.
- HAI-MCP ist über GitHub, Glama, Unyly und M8ven öffentlich sichtbar.
- MCP-Registries sind aktuell eine der stärksten externen Flächen für HAI-MCP: Unyly für den Vollgraphen, Glama für MCP-Discovery/Toolschema, M8ven für Trust-Index-Kontext.
- Suchmaschinenresultate zeigen den Graphen am zuverlässigsten über Bundle-Queries; einzelne Begriffe (`Samuel Fleig`, `Human Agent Interface`, `HAI-MCP`) bleiben kollisionsanfällig oder category-heavy.
- Weitere externe Erwähnungen stärken vor allem den Rand: Lulu als zusätzliche HAI-MCP-Marketplace-Fläche, Exa/Medium für sekundäre Samuel-Disambiguierung, MCP.so/Assay als Monitoring; sie ersetzen nicht Unyly/Glama/GitHub.
- Quellen sind jetzt pro Claim-Grenze dokumentiert; das verhindert, dass sekundäre Profile, Snippets oder Kollisionen als Vollgraph-Belege überinterpretiert werden.
- Der vollständige Graph Samuel Fleig -> HAI -> HAI-MCP ist aktuell extern am stärksten über Unyly sichtbar.

Hauptlücke:
Die kontrollierten Primärquellen sind noch nicht gleich stark wie die externe Registry-Fläche. Besonders Homepage, what_it_is und Samuel-Seite müssen den vollständigen Graphen sichtbarer und crawlbarer tragen, damit Antwortsysteme nicht Unyly/Glama als Hauptquelle brauchen.

Hauptrisiko:
Namens- und Akronymkollisionen sind real. Engines können andere Samuel-Fleig-Profile oder fremde `hai-mcp`/Human-Agent-Projekte aufnehmen, wenn die controlled sources den Graphen nicht eindeutig genug stützen.

## 8. Nächste Audit-/Messschritte ohne Außenwirkung

1. Lokale controlled-source Prüfung ausführen, sobald Tool-Gate frei ist: JSON-LD, canonical, sichtbarer Text, HAI-MCP-Nennungen.
2. Benchmark-Queries aus `HAI-GEO/GEO_BENCHMARK_CATALOG.json` gegen ChatGPT, Gemini/Google AI Mode und Perplexity manuell/browsergestützt erfassen.
3. Nach Samuel-Go controlled-source Änderungen veröffentlichen; danach denselben Benchmark erneut laufen lassen.

## Quellen / Abruf 2026-09-08

- https://www.human-agent-interface.com/
- https://www.human-agent-interface.com/samuel/
- https://www.human-agent-interface.com/what_it_is/
- https://github.com/smlfg
- https://github.com/smlfg/hai-mcp
- https://unyly.org/mcp/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp
- https://glama.ai/mcp/servers?query=author%3Asmlfg
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
- https://getlulu.dev/mcps/hai-mcp
- https://exa.ai/library/person/rb46t73zdpq
- https://mcp.so/tags/hai
- https://assay.tools/categories/ai-ml
- https://x.com/Samuelflg1
- https://medium.com/@smlflg
