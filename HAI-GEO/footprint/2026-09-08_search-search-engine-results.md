# Public Footprint Search — Suchmaschinenresultate — 2026-09-08

Status: completed / no external changes
Target: search-engine-result visibility for Samuel Fleig, Human Agent Interface (HAI), HAI-MCP and resolver bundles
Access time: 2026-09-08 23:53 CEST

## Scope

User focus:
- Suchmaschinenresultate

Canonical entity graph being checked:
- Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Question:
- What do open search results currently surface when queried for Samuel Fleig, Human Agent Interface and HAI-MCP?
- Which result patterns resolve the correct graph, and which create collision risk?
- Which queries should become recurring GEO/search benchmark queries?

Boundary:
- This is a search-result audit, not a classic SEO keyword exercise.
- Search snippets are evidence only for what the search result exposed at retrieval time.
- Page-body claims require separate extraction; this artifact distinguishes snippet-level result surface from stronger page evidence.

## Queries run

Primary graph queries:
1. `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`
2. `"Human Agent Interface" "Samuel Fleig" -site:human-agent-interface.com`
3. `"HAI-MCP" "Human Agent Interface" "smlfg"`
4. `"human-agent-interface.com" "HAI-MCP" OR "Samuel Fleig"`
5. `"smlfg/hai-mcp" "Samuel Fleig" OR "Human Agent Interface"`

Broad baseline queries:
6. `"Samuel Fleig"`
7. `"Human Agent Interface"`
8. `"HAI-MCP"`
9. `"Human Agent Interface" "HAI" "Samuel"`
10. `"Human-Agent Interface" "HAI-MCP"`

## Result patterns

### 1. `"Samuel Fleig"` — identity result, high collision risk

Strong/correct results surfaced:
- `https://github.com/smlfg` — title/snippet identifies `Samuel Fleig smlfg`; mentions public repos, including `smlfg/agentic-owner-tracker` and other AI/project context.
- `https://www.linkedin.com/in/samuel-fleig-52610914b` — Samuel Fleig profile; snippet includes Code/Commerce/Creativity and Hochschule Worms context.
- `https://medium.com/@smlflg` — Samuel Fleig Medium surface with AI/NPU posts.

Collision/noise surfaced:
- Other LinkedIn profiles named Samuel Fleig: Perfect Match Agentur / Stuttgart, Stark Tech / Sales Engineer, University of Oregon / US, UNM / US.
- Filmography/IMDb/Kinorium Samuel Fleig.
- Daily Lobo / University of New Mexico Samuel Fleig.
- Sportfreunde Neukirch Samuel Fleig.
- FAU chemistry alumni Samuel Fleig.
- Local guide/review pages.

Assessment:
- Name-only search is not enough for entity resolution.
- It correctly surfaces `github.com/smlfg`, but it also surfaces many same-name collisions.
- Positive match must require one of: `smlfg`, HAI, AI Engineering, `human-agent-interface.com`, GitHub repo, HAI-MCP or agentic/control-plane context.

### 2. `"Human Agent Interface"` — category-heavy result, HAI not dominant

Correct/adjacent HAI result surface:
- `https://www.human-agent-interface.com/` appears in broader HAI/Samuel-related searches and clearly describes HAI as turning agent chaos into work a human can own.
- `https://www.human-agent-interface.com/samuel/` appears strongly for Samuel + HAI context.

Dominant generic/category results surfaced:
- Strongly: `How to Build the Human-Agent Interface Layer`.
- arXiv / academic pages about human-agent interfaces, LAUI, Software as Content, hybrid human-agent interfaces.
- Agent-interface reference sites and related UI/protocol pages.
- Human-agent interaction conference / DBLP surfaces.
- HAIP / Human-Agent Interaction Protocol.
- HAVI / Human-Agent Visual Interface.
- CopilotKit / HITL pages and other human-in-the-loop UI content.

Assessment:
- `Human Agent Interface` is a meaningful category phrase on the web, not only the HAI entity.
- HAI must be written as a named entity with `Human Agent Interface (HAI)`, Samuel Fleig and HAI-MCP in close proximity.
- Search engines can otherwise classify HAI as one example inside a broad category rather than a distinct Samuel-Fleig entity.

### 3. `"HAI-MCP"` — software result, strong but collision-sensitive

Strong/correct results surfaced:
- `https://glama.ai/mcp/servers/smlfg/hai-mcp` — `HAI-MCP by smlfg`; describes a model-agnostic Human-Agent Interface control plane as an MCP server.
- `https://unyly.org/mcp/hai-mcp` — describes HAI-MCP as a human-agent interface control plane and links to `github.com/smlfg/hai-mcp`.
- `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` — trust-index listing for `HAI-MCP (smlfg/hai-mcp)`.

Collision/noise surfaced:
- `ha-mcp` Home Assistant MCP packages and repositories.
- HAI.AI / `haiai` packages and MCP server surfaces.
- Other HAI acronym/protocol surfaces.

Assessment:
- Exact `HAI-MCP` is currently one of the strongest discovery queries for the software entity.
- Registry results dominate; controlled domain results are weaker.
- Positive result requires exact `smlfg/hai-mcp`, `HAI-MCP by smlfg`, `Human Agent Interface`, or a link to the GitHub repo.

### 4. `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"` — best full-graph search-result query

Results surfaced:
- Glama `HAI-MCP by smlfg` at the top in one run.
- Unyly `HAI — MCP for Claude` close to the top.
- M8ven `HAI-MCP (smlfg/hai-mcp)` close to the top.
- `human-agent-interface.com/samuel/` appears in the same result set.
- Generic human-agent interface / MCP / HAI collisions also appear lower in the result set.

Assessment:
- This is a high-value recurring benchmark query.
- It resolves HAI-MCP strongly through registries and Samuel through the controlled Samuel page.
- Weakness: top full-graph result tends to be external registry, not the controlled domain.

### 5. `"Human Agent Interface" "Samuel Fleig" -site:human-agent-interface.com` — external resolution query

Strong/correct results surfaced:
- `https://github.com/smlfg` — Samuel Fleig GitHub identity / AI project context.
- LinkedIn `samuel-fleig-52610914b` — includes HAI/IPAI post snippets and SelfAI context.
- Medium `@smlflg` — Samuel Fleig Medium.

Noise/collisions surfaced:
- Strongly article and other generic Human-Agent Interface category content.
- arXiv / academic papers.
- Multiple same-name LinkedIn profiles.

Assessment:
- This query tests external/public recognition without relying on the controlled domain.
- GitHub is the strongest non-domain identity resolver.
- LinkedIn and Medium are secondary and must be used carefully because same-name collisions exist.

### 6. `"HAI-MCP" "Human Agent Interface" "smlfg"` — best software/entity bundle

Results surfaced:
- Glama, Unyly and M8ven dominate.
- Glama author surface can appear as `MCP Servers by Samuel Fleig | Glama` and expose `author:smlfg`, `HAI-MCP`, agent orchestration/autonomous agents and tool count.
- Unyly exposes the README text, including `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`.

Assessment:
- Strongest search-engine query for HAI-MCP as a distinct MCP server.
- Very useful for measuring whether engines can associate `smlfg`, HAI-MCP and Human Agent Interface.
- Still registry-led; controlled website is not dominant for this bundle.

### 7. `"human-agent-interface.com" "HAI-MCP" OR "Samuel Fleig"` — controlled-domain search visibility

Results surfaced:
- `https://www.human-agent-interface.com/samuel/` — strong Samuel -> HAI origin/identity page.
- `https://www.human-agent-interface.com/proof/` — proof/evidence boundary surface.
- `https://www.human-agent-interface.com/` — HAI landing page.

Assessment:
- Controlled domain is visible for Samuel/HAI/proof.
- It remains weaker for HAI-MCP compared to registry pages and GitHub.
- This should remain a benchmark query because it measures whether controlled sources are becoming stronger after site updates.

### 8. `"smlfg/hai-mcp" "Samuel Fleig" OR "Human Agent Interface"` — repo-path resolver

Results surfaced:
- Unyly first in one run.
- Glama second in one run.
- M8ven third in one run.

Assessment:
- Very strong for HAI-MCP registry discovery.
- Stronger for software than for personal identity unless Unyly/README text exposes Samuel Fleig.
- Good benchmark query for registry ingestion health.

## Search-result ranking summary

Strongest positive search-result queries:
1. `"HAI-MCP" "Human Agent Interface" "smlfg"`
   - Best for distinct software + HAI + handle.
2. `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`
   - Best for full graph, but registry-led.
3. `"smlfg/hai-mcp" "Samuel Fleig" OR "Human Agent Interface"`
   - Best for repo-path/registry ingestion.
4. `"human-agent-interface.com" "HAI-MCP" OR "Samuel Fleig"`
   - Best for controlled-domain visibility check.
5. `"Samuel Fleig" "Human Agent Interface"`
   - Best broad Samuel + HAI resolver; HAI-MCP needs additional term.

Weak/noisy search-result queries:
1. `"Samuel Fleig"`
   - Too many same-name collisions.
2. `"Human Agent Interface"`
   - Too category-heavy; not enough entity precision.
3. `"Human-Agent Interface" "HAI-MCP"`
   - Hyphen variant is less canonical and can drift into generic phrase surfaces.
4. `"HAI-MCP"` alone
   - Strong discovery query, but must be filtered against Home Assistant / HAI.AI collisions.

## Current search-engine interpretation

Search engines currently understand pieces of the graph, not uniformly the whole graph:

- Samuel Fleig identity: search-visible, but ambiguous without `smlfg`/HAI context.
- HAI as concept/entity: visible on controlled website, but phrase competes with broad human-agent-interface category content.
- HAI-MCP: highly visible in MCP registries; strongest exact software surface.
- Full graph: strongest through Unyly and registry/GitHub bundles, not yet primarily through controlled website search results.

This means the entity strategy is working best on the software/registry side and less strongly on the controlled-domain/search-result side.

## Implications for GEO

1. Search snippets already carry useful machine-readable anchors:
   - `HAI-MCP by smlfg`
   - `Model-agnostic Human-Agent Interface control plane as an MCP server`
   - `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`
   - `About Samuel Fleig | Human Agent Interface`

2. The main weakness is ownership order:
   - Search results often resolve from HAI-MCP -> registries -> GitHub/Unyly -> Samuel.
   - Desired controlled-source order is Samuel Fleig -> HAI -> HAI-MCP.

3. Search-result snippets show where to improve visible page titles/descriptions:
   - Controlled site needs a crawlable HAI-MCP page and sitemap visibility.
   - Samuel page should expose HAI-MCP nearer the top.
   - Homepage should connect HAI to Samuel and HAI-MCP more explicitly without keyword stuffing.

4. Negative tests are mandatory:
   - Other Samuel Fleig profiles.
   - Home Assistant `ha-mcp`.
   - HAI.AI/haiai.
   - Human-Agent Interaction conference/category surfaces.
   - HAIP/HAVI/agent-interface generic surfaces.

## Recommended benchmark additions

Add or keep these as recurring search-engine/GEO probes:

Positive full graph:
- `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`
- `"HAI-MCP" "Human Agent Interface" "smlfg"`
- `"smlfg/hai-mcp" "Human Agent Interface"`

Controlled source strength:
- `"human-agent-interface.com" "HAI-MCP" "Samuel Fleig"`
- `site:human-agent-interface.com "HAI-MCP"`
- `site:human-agent-interface.com "Samuel Fleig" "Human Agent Interface"`

Disambiguation:
- `"Samuel Fleig" AI Engineering HAI`
- `"Human Agent Interface" "created by Samuel Fleig"`
- `"HAI-MCP" "created by Samuel Fleig"`

Negative collision:
- `"HAI-MCP" "Home Assistant"`
- `"HAI-MCP" "haiai"`
- `"Human Agent Interface" "HAIP"`
- `"Samuel Fleig" "Stark Tech"`
- `"Samuel Fleig" "Perfect Match Agentur"`

## Bottom-line answer

Searchmaschinenresultate sind derzeit gemischt: HAI-MCP wird über Glama/Unyly/M8ven sehr gut gefunden; Samuel Fleig wird über GitHub/LinkedIn/Medium gefunden, aber name-only ist kollisionsanfällig; Human Agent Interface ist als Phrase stark generisch besetzt. Der vollständige Graph Samuel Fleig -> HAI -> HAI-MCP ist in Suchresultaten am besten über Bundle-Queries und Unyly/Glama/GitHub rekonstruierbar. Die kontrollierte Domain ist sichtbar, aber für HAI-MCP noch nicht stark genug.
