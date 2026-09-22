# GEO Source Documentation — 2026-09-09

Status: source-level documentation matrix / no external changes
Access time: 2026-09-09 00:01 CEST
Scope: every source currently listed in the Phase-1 GEO/public-footprint audit source block plus additional external mention surfaces.

Canonical graph:
Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document each source so later JSON-LD, citation surfaces, benchmark scoring and generative-engine answers can distinguish primary evidence, external corroboration, secondary disambiguation, monitoring surfaces and negative collisions.

Use rule:
A source may support only the claims explicitly visible in its extracted/search-visible text. Snippets count as snippet-level evidence only; page-body claims require extraction or controlled source review.

## Field legend

- Source: exact URL / surface.
- Class: controlled primary, controlled profile/repo, external registry, external marketplace, secondary profile, search-snippet surface, monitoring surface, collision/negative test.
- Supports: which part of the canonical graph this source can support.
- Evidence visible in current audit: short source-backed phrase or observed search/extraction signal.
- Strength: very strong / strong / medium / weak / monitor / negative.
- Do not use for: claims this source must not support.
- Next action: safe follow-up; no external action unless explicitly marked as Samuel-Go required.

## Source matrix

### 1. https://www.human-agent-interface.com/

Class: controlled primary source / homepage
Supports: HAI definition; HAI problem framing; partial Samuel/HAI context if nearby pages are discovered.
Evidence visible in current audit: homepage search/extraction describes Human Agent Interface as turning agent chaos into work a human can still own; mentions inspect, stop, verify and own the work.
Strength: strong for HAI; weak for Samuel -> HAI-MCP full graph.
Do not use for: full HAI-MCP implementation claim unless page visibly links/names HAI-MCP.
Next action: strengthen visible top-level graph on homepage after Samuel-Go: Samuel Fleig + Human Agent Interface (HAI) + HAI-MCP in one crawlable paragraph.

### 2. https://www.human-agent-interface.com/samuel/

Class: controlled primary source / person page
Supports: Samuel Fleig identity; Samuel -> HAI; AI Engineering / agentic systems context.
Evidence visible in current audit: page says Samuel Fleig is an AI Engineering student and AI engineer working on agentic systems, harnesses and human-owned AI workflows; says he builds Human Agent Interfaces because he needed them himself.
Strength: strong for Samuel -> HAI; weak for Samuel -> HAI-MCP unless HAI-MCP appears near top.
Do not use for: HAI-MCP implementation relationship unless visible on the page.
Next action: add near-top HAI-MCP sentence/link after Samuel-Go.

### 3. https://www.human-agent-interface.com/what_it_is/

Class: controlled primary source / HAI definition page
Supports: HAI concept/definition; observable/bounded/verifiable/human-owned semantics.
Evidence visible in current audit: HAI definition page explains the HAI layer and the need for human ownership, scope, evidence, stop rules and next actions.
Strength: strong for HAI definition; weak for Samuel and HAI-MCP association.
Do not use for: creator or implementation claims unless those are visibly added.
Next action: add creator and HAI-MCP implementation bridge after Samuel-Go.

### 4. https://www.human-agent-interface.com/proof/

Class: controlled primary source / proof boundary
Supports: proof/evidence discipline; lived-practice claim; HAI control pattern; limits of validation.
Evidence visible in current audit: page says internal proof is useful only when honest; proves lived practice and method formation, not customer ROI data.
Strength: strong for evidence boundary; medium for HAI method; weak for HAI-MCP full graph.
Do not use for: market validation, customer traction or external ROI.
Next action: keep as proof-boundary citation; do not overclaim.

### 5. https://www.human-agent-interface.com/samuel/why-hai-matters/

Class: controlled primary source / origin narrative
Supports: why HAI exists; human overload / agent systems origin; owner packet semantics.
Evidence visible in current audit: page describes HAI as an interface built so Samuel does not disappear inside systems he loves using; mentions scope, evidence, stop rule and next action.
Strength: strong for origin/problem narrative; weak for HAI-MCP unless linked explicitly.
Do not use for: product maturity or external validation.
Next action: use as narrative source; not as technical HAI-MCP source.

### 6. https://www.human-agent-interface.com/samuel/timeline/

Class: controlled primary source / timeline
Supports: Samuel's AI-builder timeline; build/process artifacts; learning trajectory.
Evidence visible in current audit: page frames Samuel as learning to use, evaluate and improve agentic systems with visible artifacts.
Strength: medium for Samuel technical trajectory; weak for HAI/HAI-MCP core proof.
Do not use for: HAI-MCP implementation relationship.
Next action: keep as supporting timeline only.

### 7. https://www.human-agent-interface.com/robots.txt

Class: controlled technical source
Supports: crawlability/access context only.
Evidence visible in current audit: robots.txt was extractable; sitemap was reported as http_error in earlier audit.
Strength: medium for crawlability check; not semantic evidence.
Do not use for: any entity/creator/product claim.
Next action: verify sitemap and robots alignment after controlled-source updates.

### 8. https://www.human-agent-interface.com/hai-mcp/

Class: controlled primary source target / currently problematic in audit
Supports: intended HAI-MCP controlled-domain page if live/extractable.
Evidence visible in current audit: `/hai-mcp/` returned `http_error` during domain audit.
Strength: currently weak/blocked.
Do not use for: current public HAI-MCP evidence until extractable.
Next action: highest controlled-domain gap; publish/fix crawlable HAI-MCP page only with Samuel-Go.

### 9. https://www.human-agent-interface.com/sitemap.xml

Class: controlled technical source target / currently problematic in audit
Supports: crawl discovery.
Evidence visible in current audit: sitemap returned `http_error` in domain audit.
Strength: currently weak/blocked.
Do not use for: semantic evidence.
Next action: fix sitemap only with Samuel-Go/deploy workflow.

### 10. https://github.com/smlfg

Class: controlled profile source
Supports: Samuel Fleig -> `smlfg`; technical/AI project identity; partial HAI context via profile and repositories.
Evidence visible in current audit: search/extraction surfaced `Samuel Fleig (smlfg)` / `AI Hungry student`; profile README snippet includes AI Engineering student building Human-Agent Interfaces in later GitHub-focused audit.
Strength: strong identity resolver; medium for HAI; weak for HAI-MCP unless repo is included.
Do not use for: full HAI-MCP implementation claim without `github.com/smlfg/hai-mcp`.
Next action: if edited later, put canonical HAI/HAI-MCP sentence near top; requires GitHub/profile change approval.

### 11. https://github.com/smlfg/hai-mcp

Class: controlled repository primary source
Supports: HAI-MCP; HAI-MCP -> Human Agent Interface; HAI-MCP -> Samuel Fleig; model-agnostic MCP implementation; tool surface.
Evidence visible in current audit: README/search-visible text states HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig; canonical website and Samuel page links are present.
Strength: very strong for software/implementation graph.
Do not use for: external third-party validation; it is controlled primary evidence.
Next action: preserve canonical README wording; no commit/push without Samuel-Go.

### 12. https://unyly.org/mcp/hai-mcp

Class: external MCP registry / third-party catalog
Supports: full graph Samuel Fleig -> HAI -> HAI-MCP; HAI-MCP install/discovery; GitHub and canonical website linkage.
Evidence visible in current audit: extracted README text says `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`; includes canonical website and Samuel page.
Strength: very strong external full-graph citation.
Do not use for: security endorsement; listing says not checked/community-style verification.
Next action: preserve source README so Unyly ingestion stays aligned.

### 13. https://glama.ai/mcp/servers/smlfg/hai-mcp

Class: external MCP registry / tool-schema surface
Supports: HAI-MCP discovery; `HAI-MCP by smlfg`; Human-Agent Interface control-plane description; tool list and schema; MCP directory API context.
Evidence visible in current audit: listing says `HAI-MCP by smlfg`; `Model-agnostic Human-Agent Interface control plane as an MCP server`; exposes 23 tools and API reference.
Strength: strong for MCP-native discovery and tool schema; medium for full graph because Samuel Fleig name may not be visible on main listing.
Do not use for: Samuel creator claim unless the extracted page or author view names Samuel.
Next action: monitor Glama ingestion; if publisher edits/claiming needed, requires Samuel-Go.

### 14. https://glama.ai/mcp/servers?query=author%3Asmlfg

Class: external MCP registry / author search view
Supports: `smlfg` author/publisher association; HAI-MCP under author query; Glama search-result visibility.
Evidence visible in current audit: title/search result `MCP Servers by Samuel Fleig | Glama`; author query lists HAI-MCP and describes the control-plane server.
Strength: strong for `smlfg` -> HAI-MCP; medium/strong for Samuel association when title shows Samuel Fleig.
Do not use for: detailed implementation claims beyond visible listing fields.
Next action: keep as benchmark source for author/registry query.

### 15. https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh

Class: external trust/security index / registry derivative
Supports: HAI-MCP -> `smlfg/hai-mcp`; security/trust scanner context; Glama/GitHub linkage.
Evidence visible in current audit: listing says `HAI-MCP (smlfg/hai-mcp)`; description as human-agent interface control plane; no credential exfiltration/sensitive file access/obfuscation; Emerging/C score context.
Strength: medium/strong for trust-index context; medium for HAI-MCP; weak for Samuel creator claim.
Do not use for: product validation, customer validation, or unqualified security guarantee.
Next action: use findings as engineering backlog only after repo verification; claiming/connecting requires Samuel-Go.

### 16. https://getlulu.dev/mcps/hai-mcp

Class: external MCP marketplace / registry mention
Supports: HAI-MCP listing; HAI-MCP -> human-agent interface control-plane description; GitHub repo pointer; Glama listing pointer.
Evidence visible in current audit: page says `HAI-MCP — MCP server`, `HAI-MCP source available`; description says it provides a human-agent interface control plane; install snippet points to `https://github.com/smlfg/hai-mcp`; listed on Glama.
Strength: medium for HAI-MCP marketplace/discovery; weak for Samuel creator claim.
Do not use for: full Samuel -> HAI -> HAI-MCP graph.
Next action: monitor; no monetization/claiming/top-placement action without Samuel-Go.

### 17. https://exa.ai/library/person/rb46t73zdpq

Class: secondary identity resolver / aggregated person page
Supports: Samuel Fleig identity in Worms/Hochschule context; LinkedIn-derived identity context.
Evidence visible in current audit: extracted page says Samuel Fleig; Student-Angewandte Informatik at Hochschule Worms; Worms, Rhineland-Palatinate, Germany; DB Netz background.
Strength: medium for identity disambiguation; weak for HAI.
Do not use for: primary HAI creator claim or HAI-MCP implementation relationship.
Next action: keep as secondary resolver and collision contrast.

### 18. https://medium.com/@smlflg

Class: secondary profile/content source
Supports: Samuel Fleig as a technical/AI-writing person; NPU/LLM/agentic-operation context depending on article.
Evidence visible in current audit: Medium page title `Samuel Fleig – Medium`; posts include local LLM on Snapdragon NPU, documentation for LLMs on Snapdragon X Elite NPU, positional encoding, and cron/agent infrastructure reflection.
Strength: medium for technical-author context; weak for HAI/HAI-MCP.
Do not use for: HAI core graph unless a dedicated HAI article is published and extracted.
Next action: possible future HAI explainer article would improve this source; publishing requires Samuel-Go.

### 19. https://www.linkedin.com/in/samuel-fleig-52610914b

Class: secondary profile / social-professional surface
Supports: Samuel Fleig identity; education/work context; social proof; HAI/IPAI post snippets when visible.
Evidence visible in current audit: profile direct extraction was limited/blocked in some runs; search snippets expose HAI/IPAI and SelfAI post context.
Strength: medium but risk-prone because extraction is limited and same-name collisions are strong.
Do not use for: primary technical HAI-MCP evidence; do not infer full graph from profile alone.
Next action: use only when HAI, humanagentinterface, AI Engineering, `smlfg` or HAI-MCP appears in visible snippet/body.

### 20. LinkedIn HAI/IPAI post URL

Source: `https://www.linkedin.com/posts/samuel-fleig-52610914b_humanagentinterface-aiagents-aiengineering-activity-7486942157640011776-JZtT`
Class: secondary social/event proof
Supports: HAI social/event emergence; HAI-MCP mention in public post; AI Engineering hashtag context.
Evidence visible in current audit: prior LinkedIn audit found this strongest LinkedIn Beleg; mentions HAI leaving laptop/head at IPAI Foundation KI-Festival, human action/control/stop/correct framing and HAI-MCP as first technical building block with 23 tools.
Strength: medium for social/event proof; not primary because platform extraction can be blocked.
Do not use for: repository/tool-contract details.
Next action: keep as secondary corroboration, not primary source.

### 21. LinkedIn SelfAI post URL

Source: `https://www.linkedin.com/posts/samuel-fleig-52610914b_github-smlfgselfai-npu-agent-ai-powered-activity-7391485205594935296-IPwb`
Class: secondary development-history proof
Supports: Samuel as AI/agentic builder; SelfAI as predecessor/context.
Evidence visible in current audit: post snippet says SelfAI NPU-Accelerated AI Chatbot, three-phase pipeline, multi-backend support, agent-based task specialization, memory management.
Strength: medium for Samuel technical history; weak for HAI core graph.
Do not use for: making SelfAI a core HAI entity.
Next action: mention only as development context where useful.

### 22. https://x.com/Samuelflg1

Class: secondary social profile / currently weak
Supports: possible Samuel social handle if directly visible; currently weak for HAI.
Evidence visible in current audit: direct extraction of X/Twitter failed with `SOURCE_NOT_AVAILABLE`; targeted searches gave no reliable HAI source.
Strength: weak.
Do not use for: any HAI/HAI-MCP claim unless a direct post/profile becomes accessible and explicit.
Next action: monitor only.

### 23. https://twitter.com/Samuelflg1

Class: secondary social profile alias / currently weak
Supports: same as X alias if available.
Evidence visible in current audit: direct extraction failed with `SOURCE_NOT_AVAILABLE`.
Strength: weak.
Do not use for: HAI claims.
Next action: monitor only.

### 24. https://mcp.so/tags/hai

Class: monitoring/tag surface
Supports: generic `#hai` MCP tag/category presence.
Evidence visible in current audit: extraction says `1 #hai MCP Servers & Clients`; FAQ says mcp.so lists 1 MCP server/client tagged #hai.
Strength: weak/monitor.
Do not use for: HAI-MCP or Samuel claim unless exact listing exposes `smlfg/hai-mcp` or HAI-MCP body.
Next action: re-check for exact listing URL later.

### 25. https://assay.tools/categories/ai-ml

Class: monitoring/package-index surface
Supports: broad AI/ML/MCP ecosystem context.
Evidence visible in current audit: extraction lists many AI/ML packages and MCP entries but not HAI-MCP in visible segment.
Strength: monitor only.
Do not use for: HAI/HAI-MCP evidence.
Next action: only cite if exact HAI-MCP package URL is found later.

### 26. Search result bundle queries

Class: search-snippet evidence / benchmark surface
Supports: current search-engine interpretation of bundles and collisions.
Evidence visible in current audit: best positive bundle queries are `"HAI-MCP" "Human Agent Interface" "smlfg"`, `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`, `"smlfg/hai-mcp" "Human Agent Interface"`, `"human-agent-interface.com" "HAI-MCP" "Samuel Fleig"`.
Strength: strong as measurement, not as source-of-truth.
Do not use for: page-body claims unless the page is extracted.
Next action: run before/after benchmark after controlled-source changes.

## Negative / collision source documentation

### A. Home Assistant `ha-mcp` pages

Examples:
- `https://github.com/homeassistant-ai/ha-mcp`
- `https://pypi.org/project/ha-mcp/`
- `https://pkg.go.dev/github.com/zorak1103/ha-mcp`

Class: negative collision
Supports: not Samuel HAI; Home Assistant MCP only.
Evidence visible in current audit: pages describe Home Assistant MCP server for smart-home automation and HA tokens.
Strength: strong negative test.
Do not use for: HAI-MCP by Samuel Fleig.
Next action: keep in benchmark negative-collision set.

### B. HAI.AI / haiai / Rust `hai-mcp`

Examples:
- `https://lib.rs/crates/hai-mcp`
- `https://docs.rs/hai-mcp/latest/hai_mcp/server/struct.HaiMcpServer.html`
- `https://github.com/HumanAssisted/haiai`

Class: negative collision
Supports: HAI.AI/JACS/agent registration/email platform, not Samuel HAI.
Evidence visible in current audit: pages mention HAI platform tools, agent registration, email, JACS and `haiai mcp`.
Strength: strong negative test.
Do not use for: Samuel Fleig / Human Agent Interface / HAI-MCP.
Next action: add as negative-collision examples wherever `HAI-MCP` exact search is evaluated.

### C. https://hai.2am.tech/robots.txt

Class: negative collision / unrelated HAI product
Supports: 2amtech Hai / Jira-Confluence workflow MCP, not Samuel HAI.
Evidence visible in current audit: page describes npm package `@2amtech/hai`, `hai init`, Jira/Confluence workflow and built-in MCP server.
Strength: negative test.
Do not use for: Samuel HAI.
Next action: keep as acronym collision.

### D. Strongly Human-Agent Interface Layer

Source: `https://www.strongly.ai/blog/human-agent-interface-layer-architecture.html`
Class: category neighbor / competitor-language surface
Supports: broader category evidence that `human-agent interface layer` is a generic/market term.
Evidence visible in current audit: title `How to Build the Human-Agent Interface Layer`; describes HAIL between running agent systems and humans.
Strength: strong category/collision context; not HAI evidence.
Do not use for: Samuel/HAI/HAI-MCP claims.
Next action: use only in negative/category context.

### E. HAIP / Human-Agent Interaction Protocol

Source: `https://haiprotocol.com/`
Class: negative collision / adjacent protocol
Supports: unrelated Human-Agent Interaction Protocol.
Evidence visible in current audit: HAIP focuses on multimodal exchange between user-facing applications and AI agents, complementing MCP.
Strength: negative/category context.
Do not use for: Human Agent Interface (HAI) by Samuel Fleig.
Next action: keep in negative benchmark.

### F. HAVI / Human-Agent Visual Interface

Examples:
- Chrome Web Store / Extpose pages for HAVI.
Class: negative collision / adjacent product category
Supports: unrelated visual feedback bridge for AI coding agents.
Evidence visible in current audit: descriptions mention HAVI as Human-Agent Visual Interface and companion MCP server.
Strength: negative/category context.
Do not use for: Samuel HAI.
Next action: keep as acronym/name collision.

### G. Academic/category papers and pages

Examples:
- `https://arxiv.org/html/2603.21334` — Software as Content.
- `https://arxiv.org/html/2405.13050` — Human-Centered LLM-Agent User Interface.
- `https://arxiv.org/html/2604.16520v1` — AgentClick.
- ACL/PrefIx and other human-agent interaction papers.
- DBLP International Conference on Human-Agent Interaction.

Class: category/research neighborhood; negative for entity resolution.
Supports: broader human-agent interface / human-agent interaction category.
Evidence visible in current audit: pages discuss human-agent interaction layers, LAUI, dynamic applications, review layers and interaction preferences.
Strength: strong category context; not entity proof.
Do not use for: Samuel HAI graph.
Next action: use for market/category framing only if separately labeled.

### H. Other Samuel Fleig same-name profiles

Examples:
- LinkedIn Perfect Match Agentur / Stuttgart.
- LinkedIn Stark Tech / Sales Engineer.
- LinkedIn University of Oregon / US.
- Daily Lobo / UNM.
- Kinorium/IMDb filmography.
- Sportfreunde Neukirch.
- FAU Chemistry alumni.

Class: identity collision / negative tests
Supports: disambiguation requirement.
Evidence visible in current audit: same-name results appeared in name-only searches.
Strength: strong negative test.
Do not use for: Samuel Fleig HAI identity unless HAI/smlfg/AI Engineering/Hochschule Worms/human-agent-interface.com context is present.
Next action: keep as negative-collision benchmark.

## Canonical source priority order

1. Controlled source / implementation truth:
   - `https://github.com/smlfg/hai-mcp`
   - `https://www.human-agent-interface.com/`
   - `https://www.human-agent-interface.com/samuel/`
   - `https://www.human-agent-interface.com/what_it_is/`

2. Strong external corroboration:
   - `https://unyly.org/mcp/hai-mcp`
   - `https://glama.ai/mcp/servers/smlfg/hai-mcp`
   - `https://glama.ai/mcp/servers?query=author%3Asmlfg`
   - `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
   - `https://getlulu.dev/mcps/hai-mcp`

3. Secondary identity/context:
   - `https://github.com/smlfg`
   - `https://www.linkedin.com/in/samuel-fleig-52610914b`
   - LinkedIn HAI/IPAI post
   - `https://medium.com/@smlflg`
   - `https://exa.ai/library/person/rb46t73zdpq`

4. Monitoring only:
   - `https://mcp.so/tags/hai`
   - `https://assay.tools/categories/ai-ml`
   - LobeHub/Smithery/PulseMCP/MCPHub exact HAI-MCP searches when no exact page is found.

5. Negative/collision:
   - Home Assistant `ha-mcp`
   - HAI.AI/haiai Rust `hai-mcp`
   - 2amtech Hai
   - HAIP/HAVI
   - Generic human-agent interface academic/category surfaces
   - Same-name Samuel Fleig profiles

## Bottom line

The source set is now documented by claim boundary. The strongest source pair is controlled GitHub `smlfg/hai-mcp` plus external Unyly. Glama is the strongest MCP-native registry surface; M8ven and Lulu add secondary registry/trust/marketplace corroboration. The controlled website is strong for HAI and Samuel but still weak for HAI-MCP until `/hai-mcp/` and sitemap/crawlability are fixed. Secondary profiles and search snippets help disambiguation, but must not carry the core graph alone.
