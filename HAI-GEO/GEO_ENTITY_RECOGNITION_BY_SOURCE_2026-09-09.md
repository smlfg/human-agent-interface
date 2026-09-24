# GEO Entity Recognition by Source — 2026-09-09

Status: source-by-source entity-recognition matrix / no external changes
Access time: 2026-09-09 00:08 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
For each audited source, record which entity a search engine, answer engine or crawler is likely to recognize from that source alone. This is not a claim that the full canonical graph is proven everywhere; it is a boundary map for entity resolution.

Entity labels used:
- PERSON_SAMUEL_FLEIG: Samuel Fleig as the relevant AI/HAI person.
- HANDLE_SMLFG: `smlfg` as Samuel's technical handle/publisher identity.
- ORG_DOMAIN_HAI: `human-agent-interface.com` as controlled HAI domain/source.
- CONCEPT_HAI: Human Agent Interface (HAI) as approach/control layer/category instance.
- SOFTWARE_HAI_MCP: HAI-MCP as MCP server/control-plane implementation.
- SOCIAL_POST_HAI: public social post about HAI/HAI-MCP, not durable primary source.
- REGISTRY_LISTING_HAI_MCP: external MCP registry/marketplace listing for HAI-MCP.
- TECHNICAL_CRAWL_SURFACE: robots/sitemap/crawlability source, not semantic entity.
- CATEGORY_HUMAN_AGENT_INTERFACE: broader human-agent interface / human-agent interaction category.
- NEGATIVE_COLLISION: similar name/acronym/entity that is not Samuel's HAI graph.
- UNKNOWN_OR_MONITORING: surface is not yet enough to bind a useful HAI entity.

## Recognition matrix

| # | Source / surface | Entity recognized from this source alone | Entity relation quality | Notes |
|---|---|---|---|---|
| 1 | `https://www.human-agent-interface.com/` | CONCEPT_HAI; ORG_DOMAIN_HAI | HAI recognized strongly; Samuel/HAI-MCP only partial/nearby | Homepage resolves the HAI concept and domain, not the full software graph alone. |
| 2 | `https://www.human-agent-interface.com/samuel/` | PERSON_SAMUEL_FLEIG; CONCEPT_HAI | Samuel -> HAI recognized strongly; HAI-MCP weak unless visible | Best controlled person page. |
| 3 | `https://www.human-agent-interface.com/what_it_is/` | CONCEPT_HAI | HAI concept recognized strongly; creator/software weak | Use for HAI meaning and boundaries. |
| 4 | `https://www.human-agent-interface.com/proof/` | CONCEPT_HAI; evidence-method context | HAI method/proof discipline recognized; not product validation | Useful for proof-boundary entity semantics. |
| 5 | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | PERSON_SAMUEL_FLEIG; CONCEPT_HAI | Origin narrative; Samuel/HAI relationship medium/strong | Not a HAI-MCP technical source. |
| 6 | `https://www.human-agent-interface.com/samuel/timeline/` | PERSON_SAMUEL_FLEIG | Samuel technical trajectory recognized; HAI/HAI-MCP weak | Timeline/supporting identity only. |
| 7 | `https://www.human-agent-interface.com/robots.txt` | TECHNICAL_CRAWL_SURFACE; ORG_DOMAIN_HAI | Crawl surface only | No semantic entity claim. |
| 8 | `https://www.human-agent-interface.com/hai-mcp/` | currently UNKNOWN_OR_MONITORING | Intended SOFTWARE_HAI_MCP page, but blocked by http_error in audit | Do not use until live/extractable. |
| 9 | `https://www.human-agent-interface.com/sitemap.xml` | TECHNICAL_CRAWL_SURFACE, currently blocked | Crawl-discovery target; not semantic | Current audit saw http_error. |
| 10 | `https://github.com/smlfg` | PERSON_SAMUEL_FLEIG; HANDLE_SMLFG | Strong identity resolver; HAI medium; HAI-MCP weak without repo | Binds Samuel to GitHub handle. |
| 11 | `https://github.com/smlfg/hai-mcp` | SOFTWARE_HAI_MCP; CONCEPT_HAI; PERSON_SAMUEL_FLEIG; HANDLE_SMLFG; ORG_DOMAIN_HAI | Full graph recognized from controlled repo | Strongest controlled implementation source. |
| 12 | `https://unyly.org/mcp/hai-mcp` | REGISTRY_LISTING_HAI_MCP; SOFTWARE_HAI_MCP; CONCEPT_HAI; PERSON_SAMUEL_FLEIG; HANDLE_SMLFG; ORG_DOMAIN_HAI | Full graph recognized externally | Strongest external full-graph corroboration. |
| 13 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | REGISTRY_LISTING_HAI_MCP; SOFTWARE_HAI_MCP; HANDLE_SMLFG; CONCEPT_HAI | HAI-MCP recognized strongly; Samuel name not guaranteed on main listing | Strongest MCP-native tool/schema surface. |
| 14 | `https://glama.ai/mcp/servers?query=author%3Asmlfg` | HANDLE_SMLFG; PERSON_SAMUEL_FLEIG if title visible; SOFTWARE_HAI_MCP | Author/publisher recognition strong | Useful for `smlfg` -> HAI-MCP and sometimes Samuel -> HAI-MCP. |
| 15 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | REGISTRY_LISTING_HAI_MCP; SOFTWARE_HAI_MCP; HANDLE_SMLFG | HAI-MCP recognized as trust/security-index entry | Not Samuel creator proof. |
| 16 | `https://getlulu.dev/mcps/hai-mcp` | REGISTRY_LISTING_HAI_MCP; SOFTWARE_HAI_MCP; HANDLE_SMLFG via GitHub URL | HAI-MCP marketplace listing recognized; Samuel weak | Additional external marketplace/discovery surface. |
| 17 | `https://exa.ai/library/person/rb46t73zdpq` | PERSON_SAMUEL_FLEIG | Samuel identity recognized; HAI absent/weak | Secondary identity resolver, not HAI proof. |
| 18 | `https://medium.com/@smlflg` | PERSON_SAMUEL_FLEIG; HANDLE_SMLFG; AI/LLM technical-author context | Technical profile recognized; HAI absent/weak in current audit | Could become stronger only with a HAI article. |
| 19 | `https://www.linkedin.com/in/samuel-fleig-52610914b` | PERSON_SAMUEL_FLEIG; social/professional identity | Medium due to extraction limits and same-name collisions | Use only with visible HAI/AI/smlfg context. |
| 20 | LinkedIn HAI/IPAI post | SOCIAL_POST_HAI; PERSON_SAMUEL_FLEIG; CONCEPT_HAI; SOFTWARE_HAI_MCP | HAI/HAI-MCP recognized as social/event post if accessible | Secondary corroboration, not primary implementation truth. |
| 21 | LinkedIn SelfAI post | PERSON_SAMUEL_FLEIG; predecessor/project-history context | Samuel as AI builder recognized; HAI weak | Development-history only. |
| 22 | `https://x.com/Samuelflg1` | UNKNOWN_OR_MONITORING / possible social handle | Current audit cannot bind HAI | Direct extraction failed. |
| 23 | `https://twitter.com/Samuelflg1` | UNKNOWN_OR_MONITORING / possible social handle alias | Current audit cannot bind HAI | Direct extraction failed. |
| 24 | `https://mcp.so/tags/hai` | UNKNOWN_OR_MONITORING; possible tag `#hai` | Generic tag recognized, not HAI-MCP | Exact HAI-MCP listing not proven in current audit. |
| 25 | `https://assay.tools/categories/ai-ml` | UNKNOWN_OR_MONITORING; AI/ML package category | No HAI entity recognized in visible segment | Monitoring only. |
| 26 | Search result bundle queries | mixed: PERSON_SAMUEL_FLEIG, CONCEPT_HAI, SOFTWARE_HAI_MCP, HANDLE_SMLFG depending query | Measurement surface, not source-of-truth | Best resolver bundles combine HAI-MCP + Human Agent Interface + smlfg/Samuel. |

## Negative / collision recognition matrix

| ID | Source / surface | Entity recognized | Why it matters |
|---|---|---|---|
| A | Home Assistant `ha-mcp` pages: `github.com/homeassistant-ai/ha-mcp`, PyPI `ha-mcp`, Go package `zorak1103/ha-mcp` | NEGATIVE_COLLISION: Home Assistant MCP server | Same/similar `ha-mcp` string; must not merge with HAI-MCP. |
| B | HAI.AI / haiai / Rust `hai-mcp`: `lib.rs/crates/hai-mcp`, docs.rs `hai_mcp`, `github.com/HumanAssisted/haiai` | NEGATIVE_COLLISION: HAI.AI / JACS / HumanAssisted ecosystem | Exact or near-exact HAI-MCP token collision; not Samuel Fleig. |
| C | `https://hai.2am.tech/robots.txt` / `@2amtech/hai` | NEGATIVE_COLLISION: 2amtech Hai Jira/Confluence workflow MCP | HAI acronym collision with MCP context. |
| D | Strongly article `human-agent-interface-layer-architecture.html` | CATEGORY_HUMAN_AGENT_INTERFACE; NEGATIVE_COLLISION for HAI entity | Recognizes category phrase, not Samuel's named HAI project. |
| E | `https://haiprotocol.com/` | NEGATIVE_COLLISION: Human-Agent Interaction Protocol | Adjacent human-agent protocol, not Human Agent Interface. |
| F | HAVI / Human-Agent Visual Interface pages | NEGATIVE_COLLISION: visual interface product/category | Human-agent acronym collision; not HAI. |
| G | arXiv/ACL/DBLP human-agent papers and conference pages | CATEGORY_HUMAN_AGENT_INTERFACE | Useful market/category context; not Samuel/HAI proof. |
| H | Other Samuel Fleig profiles/results | NEGATIVE_COLLISION: other people named Samuel Fleig | Name-only query ambiguity; require HAI/smlfg/AI Engineering/domain context. |
| I | `mrgoonie/human-mcp` and similar GitHub human-MCP projects | NEGATIVE_COLLISION / adjacent software | Similar human+MCP language; not HAI-MCP. |

## Entity-level takeaway

1. The entity `SOFTWARE_HAI_MCP` is recognized most strongly by GitHub repo, Unyly, Glama, M8ven and Lulu.
2. The entity `CONCEPT_HAI` is recognized most strongly by the controlled website pages and by the README text propagated into Unyly/GitHub.
3. The entity `PERSON_SAMUEL_FLEIG` is recognized most strongly by the Samuel page, GitHub profile, GitHub repo README, Unyly, Exa, LinkedIn and Medium, but only GitHub repo/Unyly connect him directly to HAI-MCP.
4. The entity `HANDLE_SMLFG` is a crucial bridge entity: GitHub, Glama author search, M8ven and Lulu often expose `smlfg` more clearly than `Samuel Fleig`.
5. The controlled-domain entity `ORG_DOMAIN_HAI` is recognized, but it does not yet carry the HAI-MCP entity strongly because `/hai-mcp/` and sitemap extraction failed in the audit.
6. Category surfaces recognize the broad phrase `human-agent interface`; they are useful for disambiguation/market framing but dangerous as sameAs/evidence for Samuel's HAI.
7. Negative collisions are important benchmark entities: they show where answer engines may wrongly merge Home Assistant `ha-mcp`, HAI.AI/haiai, HAIP/HAVI or unrelated Samuel Fleig identities into the graph.

## JSON-LD implication

Safe `sameAs` candidates should be limited by recognized entity:

- Samuel/person identity: Samuel page, GitHub profile, LinkedIn profile, Exa, Medium only if visibly matching Samuel context.
- HAI concept/domain: homepage, what-it-is page, proof/origin pages.
- HAI-MCP software: GitHub repo, Unyly, Glama listing, Glama author search, M8ven, Lulu.
- Do not set `sameAs` from HAI-MCP to category/collision sources.
- Do not let search snippets or social profiles alone carry the full Samuel -> HAI -> HAI-MCP graph.
