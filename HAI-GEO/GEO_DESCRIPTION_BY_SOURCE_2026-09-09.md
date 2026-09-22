# GEO Description by Source — 2026-09-09

Status: source-by-source description matrix / no external changes
Access time: 2026-09-09 00:10 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document which description/wording is currently used or likely extracted per source. This is a wording boundary map: use it to keep semantic consistency while avoiding invented claims.

Canonical target description:
Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach for keeping agentic AI work observable, bounded, verifiable, and human-owned. HAI-MCP is its model-agnostic MCP control-plane implementation.

Description labels:
- CANONICAL_FULL: matches the full Samuel -> HAI -> HAI-MCP graph.
- HAI_CONTROL_LAYER: describes HAI as human-owned/observable/bounded/verifiable work/control layer.
- HAI_ORIGIN_NARRATIVE: explains why HAI exists from Samuel's operator experience.
- HAI_MCP_CONTROL_PLANE: describes HAI-MCP as a Human-Agent Interface / control-plane MCP server.
- HAI_MCP_REGISTRY_SHORT: registry/marketplace summary, usually shorter and software-first.
- PERSON_TECH_PROFILE: Samuel as AI/engineering/technical person, not full HAI graph.
- CRAWL_TECHNICAL: robots/sitemap/crawlability, no semantic description.
- SOCIAL_SNIPPET: social post/search-snippet wording; useful but not stable primary wording.
- CATEGORY_DESCRIPTION: generic human-agent interface/category wording, not Samuel's entity.
- COLLISION_DESCRIPTION: unrelated entity description that must stay separated.
- DESCRIPTION_NOT_AVAILABLE: no usable description from current audit.

## Description matrix

| # | Source / surface | Description used / visible wording | Label | Quality for canonical graph |
|---|---|---|---|---|
| 1 | `https://www.human-agent-interface.com/` | Human Agent Interface turns agent chaos into work a human can still own; inspect, stop, verify and own the work. | HAI_CONTROL_LAYER | Strong for HAI; incomplete for Samuel and HAI-MCP. |
| 2 | `https://www.human-agent-interface.com/samuel/` | Samuel Fleig is an AI Engineering student / AI engineer working on agentic systems, harnesses and human-owned AI workflows; he builds Human Agent Interfaces because he needed them himself. | PERSON_TECH_PROFILE + HAI_ORIGIN_NARRATIVE | Strong for Samuel -> HAI; incomplete for HAI-MCP. |
| 3 | `https://www.human-agent-interface.com/what_it_is/` | HAI is a layer/interface for keeping agentic work human-owned through scope, evidence, stop rules and next actions. | HAI_CONTROL_LAYER | Strong for HAI definition; incomplete for creator/software. |
| 4 | `https://www.human-agent-interface.com/proof/` | Internal proof is useful only when honest; it proves lived practice and method formation, not customer ROI data. | HAI_CONTROL_LAYER / evidence-boundary wording | Good for proof discipline; not a product/market description. |
| 5 | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | HAI is an interface Samuel built so he does not disappear inside systems he loves using; scope, evidence, stop rule and next action remain visible. | HAI_ORIGIN_NARRATIVE | Strong narrative; not technical HAI-MCP wording. |
| 6 | `https://www.human-agent-interface.com/samuel/timeline/` | Samuel learns to use, evaluate and improve agentic systems with visible artifacts. | PERSON_TECH_PROFILE | Supporting person trajectory only. |
| 7 | `https://www.human-agent-interface.com/robots.txt` | Crawl/access rules only. | CRAWL_TECHNICAL | No semantic description. |
| 8 | `https://www.human-agent-interface.com/hai-mcp/` | DESCRIPTION_NOT_AVAILABLE in current audit because `/hai-mcp/` returned `http_error`. | DESCRIPTION_NOT_AVAILABLE | Major gap: intended controlled HAI-MCP description not visible. |
| 9 | `https://www.human-agent-interface.com/sitemap.xml` | DESCRIPTION_NOT_AVAILABLE / crawl-discovery target returned `http_error`. | CRAWL_TECHNICAL | No semantic description. |
| 10 | `https://github.com/smlfg` | `Samuel Fleig (smlfg)` / AI-hungry student / AI Engineering student building Human-Agent Interfaces, depending snippet/profile area. | PERSON_TECH_PROFILE | Strong identity/handle resolver; not enough for full graph alone. |
| 11 | `https://github.com/smlfg/hai-mcp` | `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`; includes canonical website/Samuel links. | CANONICAL_FULL + HAI_MCP_CONTROL_PLANE | Best controlled canonical wording. |
| 12 | `https://unyly.org/mcp/hai-mcp` | Same propagated README wording: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`; includes canonical links. | CANONICAL_FULL + HAI_MCP_REGISTRY_SHORT | Best external canonical wording. |
| 13 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | `HAI-MCP by smlfg`; `Model-agnostic Human-Agent Interface control plane as an MCP server`; 23 tools/API reference. | HAI_MCP_CONTROL_PLANE + HAI_MCP_REGISTRY_SHORT | Strong HAI-MCP wording; Samuel name may be absent on listing. |
| 14 | `https://glama.ai/mcp/servers?query=author%3Asmlfg` | `MCP Servers by Samuel Fleig | Glama`; HAI-MCP listed as control-plane server under author query. | HAI_MCP_REGISTRY_SHORT + PERSON_TECH_PROFILE | Strong author/publisher bridge; short software description. |
| 15 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | `HAI-MCP (smlfg/hai-mcp)`; human-agent interface control plane; trust/security signals such as no credential exfiltration/sensitive file access/obfuscation; Emerging/C context. | HAI_MCP_REGISTRY_SHORT | Good trust-index description; not creator/market validation wording. |
| 16 | `https://getlulu.dev/mcps/hai-mcp` | `HAI-MCP — MCP server`; `HAI-MCP source available`; provides a human-agent interface control plane; install/source points to `github.com/smlfg/hai-mcp`; listed on Glama. | HAI_MCP_REGISTRY_SHORT | Useful external marketplace wording; weak for Samuel. |
| 17 | `https://exa.ai/library/person/rb46t73zdpq` | Samuel Fleig; Student-Angewandte Informatik at Hochschule Worms; Worms, Rhineland-Palatinate, Germany; DB Netz background. | PERSON_TECH_PROFILE | Identity description only; no HAI wording. |
| 18 | `https://medium.com/@smlflg` | Samuel Fleig technical posts about local LLM on Snapdragon NPU, LLM docs on Snapdragon X Elite NPU, positional encoding and cron/agent infrastructure reflection. | PERSON_TECH_PROFILE | Technical-author context; no strong HAI/HAI-MCP description in current audit. |
| 19 | `https://www.linkedin.com/in/samuel-fleig-52610914b` | Profile/search-snippet wording around Samuel identity, education/work context and public HAI/SelfAI snippets when visible. | PERSON_TECH_PROFILE / SOCIAL_SNIPPET | Medium and unstable due to extraction limits/collisions. |
| 20 | LinkedIn HAI/IPAI post | HAI leaving laptop/head at IPAI Foundation KI-Festival; human action/control/stop/correct framing; HAI-MCP as first technical building block with 23 tools. | SOCIAL_SNIPPET + HAI_ORIGIN_NARRATIVE + HAI_MCP_CONTROL_PLANE | Good social/event wording; not durable primary wording. |
| 21 | LinkedIn SelfAI post | SelfAI NPU-Accelerated AI Chatbot; three-phase pipeline, multi-backend support, agent-based task specialization, memory management. | PERSON_TECH_PROFILE / predecessor wording | Development history only; not HAI canonical wording. |
| 22 | `https://x.com/Samuelflg1` | DESCRIPTION_NOT_AVAILABLE; direct extraction failed with `SOURCE_NOT_AVAILABLE`; targeted searches gave no reliable HAI wording. | DESCRIPTION_NOT_AVAILABLE | Do not use. |
| 23 | `https://twitter.com/Samuelflg1` | DESCRIPTION_NOT_AVAILABLE; direct extraction failed with `SOURCE_NOT_AVAILABLE`. | DESCRIPTION_NOT_AVAILABLE | Do not use. |
| 24 | `https://mcp.so/tags/hai` | `1 #hai MCP Servers & Clients`; generic tag/category FAQ wording. | CATEGORY_DESCRIPTION / UNKNOWN_OR_MONITORING | Tag-level only; not HAI-MCP description. |
| 25 | `https://assay.tools/categories/ai-ml` | Broad AI/ML package/category descriptions; visible segment did not expose HAI-MCP. | CATEGORY_DESCRIPTION / UNKNOWN_OR_MONITORING | Monitoring only. |
| 26 | Search result bundle queries | Snippet-level descriptions vary; best bundle snippets combine HAI-MCP, Human Agent Interface, `smlfg`, Samuel Fleig and canonical domain. | SOCIAL_SNIPPET / benchmark wording | Measurement only; extract pages before using as claims. |

## Negative / collision descriptions

| ID | Source / surface | Description used there | Label | Required handling |
|---|---|---|---|---|
| A | Home Assistant `ha-mcp` pages | Home Assistant MCP server for smart-home automation, HA tokens and Home Assistant integration. | COLLISION_DESCRIPTION | Never merge with HAI-MCP. |
| B | HAI.AI / haiai / Rust `hai-mcp` | HAI platform / JACS / agent registration / email tools / HumanAssisted ecosystem / `haiai mcp`. | COLLISION_DESCRIPTION | Exact/near-exact token collision; keep separate. |
| C | 2amtech Hai / `@2amtech/hai` | Jira/Confluence workflow tooling with built-in MCP server. | COLLISION_DESCRIPTION | HAI acronym collision in MCP context. |
| D | Strongly Human-Agent Interface Layer article | `How to Build the Human-Agent Interface Layer`; HAIL between running agent systems and humans. | CATEGORY_DESCRIPTION | Category/competitor-language only; not Samuel HAI. |
| E | HAIP / Human-Agent Interaction Protocol | Protocol for multimodal exchange between user-facing applications and AI agents, complementing MCP. | COLLISION_DESCRIPTION | Adjacent protocol; not Human Agent Interface. |
| F | HAVI / Human-Agent Visual Interface | Visual feedback bridge / companion MCP server for AI coding agents. | COLLISION_DESCRIPTION | Name/acronym collision only. |
| G | arXiv/ACL/DBLP human-agent papers | Human-agent interaction, LAUI, review layers, interaction preferences and software/user-interface research. | CATEGORY_DESCRIPTION | Use for category framing only. |
| H | Other Samuel Fleig profiles/results | Unrelated professional/student/sports/film/chemistry descriptions. | COLLISION_DESCRIPTION | Name-only collision; require HAI/smlfg/domain/AI context. |
| I | `mrgoonie/human-mcp` and similar projects | Human+MCP adjacent software wording. | COLLISION_DESCRIPTION | Similar language; not HAI-MCP. |

## Description consistency assessment

Strongly aligned with canonical target:
- GitHub `smlfg/hai-mcp`
- Unyly `mcp/hai-mcp`

Mostly aligned but software/registry-short:
- Glama HAI-MCP listing
- Glama author search
- M8ven HAI-MCP trust/index page
- Lulu HAI-MCP marketplace page

Aligned for HAI concept but missing full graph:
- Homepage
- Samuel page
- What-it-is page
- Proof page
- Why HAI matters page

Identity/context only:
- GitHub profile
- Exa person page
- Medium profile
- LinkedIn profile/posts

Unusable as HAI description now:
- X/Twitter profile aliases
- MCP.so tag page
- Assay AI/ML category page

Must remain explicitly negative:
- Home Assistant `ha-mcp`
- HAI.AI/haiai Rust `hai-mcp`
- 2amtech Hai
- HAIP/HAVI
- generic human-agent research/category sources
- same-name Samuel Fleig results

## Normalization rule for future copy

Preferred visible wording should converge semantically to:

Human Agent Interface (HAI) is an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned. HAI-MCP is its model-agnostic MCP control-plane implementation, created by Samuel Fleig.

Use this exact role split:
- Samuel Fleig: person/creator/developer.
- HAI: concept/approach/control layer.
- HAI-MCP: software/MCP implementation.
- `smlfg`: handle/publisher bridge.
- External registries: corroboration/discovery, not primary truth.
