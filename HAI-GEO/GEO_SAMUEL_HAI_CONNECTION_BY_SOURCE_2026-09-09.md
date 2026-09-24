# GEO Samuel-Fleig-to-HAI Connection by Source — 2026-09-09

Status: source-by-source Samuel -> HAI connection matrix / no external changes
Access time: 2026-09-09 00:11 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document whether each audited source connects Samuel Fleig with Human Agent Interface (HAI). This file answers only the Samuel -> HAI relationship, not every HAI-MCP software relationship.

Connection labels:
- YES_STRONG: source visibly connects Samuel Fleig to HAI or Human Agent Interface.
- YES_FULL_GRAPH: source visibly connects Samuel Fleig -> HAI -> HAI-MCP.
- YES_MEDIUM: source connects Samuel to HAI context, but with weaker/snippet/social/profile evidence.
- INDIRECT_VIA_HANDLE: source connects `smlfg` to HAI/HAI-MCP; Samuel is inferred only through separate handle evidence.
- HAI_ONLY: source describes HAI but does not name/connect Samuel.
- SAMUEL_ONLY: source identifies Samuel but does not connect him to HAI.
- NO_WEAK_OR_BLOCKED: no reliable connection in current audit.
- NEGATIVE_COLLISION: unrelated Samuel, HAI, MCP or human-agent entity; must not be merged.

## Connection matrix

| # | Source / surface | Samuel Fleig connected with HAI? | Evidence / boundary | Use as Samuel -> HAI proof? |
|---|---|---|---|---|
| 1 | `https://www.human-agent-interface.com/` | HAI_ONLY / partial nearby | Homepage strongly describes HAI; current audit notes Samuel/HAI context only if nearby pages are discovered. | Not alone. Use with Samuel page. |
| 2 | `https://www.human-agent-interface.com/samuel/` | YES_STRONG | Page says Samuel Fleig is an AI Engineering student / AI engineer working on agentic systems and human-owned AI workflows; says he builds Human Agent Interfaces because he needed them himself. | Yes, strong controlled proof for Samuel -> HAI. |
| 3 | `https://www.human-agent-interface.com/what_it_is/` | HAI_ONLY | Defines HAI/control-layer semantics; current audit says creator association is weak unless visibly added. | No, unless paired with Samuel page. |
| 4 | `https://www.human-agent-interface.com/proof/` | HAI_ONLY / method context | Proof page supports HAI method/evidence discipline, not the person relationship. | No, not as Samuel -> HAI proof. |
| 5 | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | YES_STRONG | Origin page says HAI is an interface Samuel built so he does not disappear inside systems he loves using. | Yes, strong narrative proof. |
| 6 | `https://www.human-agent-interface.com/samuel/timeline/` | YES_MEDIUM | Timeline supports Samuel technical trajectory; HAI relation weaker than Samuel page/origin page. | Supporting only. |
| 7 | `https://www.human-agent-interface.com/robots.txt` | NO_WEAK_OR_BLOCKED | Crawl/access file only. | No. |
| 8 | `https://www.human-agent-interface.com/hai-mcp/` | NO_WEAK_OR_BLOCKED currently | Intended page returned `http_error` in audit. | No until live/extractable. |
| 9 | `https://www.human-agent-interface.com/sitemap.xml` | NO_WEAK_OR_BLOCKED | Sitemap returned `http_error`; no semantic content. | No. |
| 10 | `https://github.com/smlfg` | YES_MEDIUM | GitHub profile binds Samuel Fleig to `smlfg`; audit notes profile README/snippet includes AI Engineering student building Human-Agent Interfaces. | Yes as identity/handle support; not strongest full claim. |
| 11 | `https://github.com/smlfg/hai-mcp` | YES_FULL_GRAPH | README/search-visible text states HAI-MCP is the open-source MCP control-plane implementation of HAI, created by Samuel Fleig; includes canonical website/Samuel links. | Yes, strongest controlled full-graph proof. |
| 12 | `https://unyly.org/mcp/hai-mcp` | YES_FULL_GRAPH | Extracted registry page repeats README wording: HAI-MCP is the open-source MCP control-plane implementation of HAI, created by Samuel Fleig. | Yes, strongest external full-graph proof. |
| 13 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | INDIRECT_VIA_HANDLE | Listing says `HAI-MCP by smlfg` and describes Human-Agent Interface control plane; Samuel name may not be visible on main listing. | Not alone for Samuel -> HAI; yes when paired with GitHub profile/author search. |
| 14 | `https://glama.ai/mcp/servers?query=author%3Asmlfg` | YES_MEDIUM / INDIRECT_VIA_HANDLE | Author/search view title can show `MCP Servers by Samuel Fleig`; HAI-MCP listed under author query. | Useful bridge, but page is registry/search-view not primary proof. |
| 15 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | INDIRECT_VIA_HANDLE | Shows HAI-MCP as `smlfg/hai-mcp` and human-agent interface control plane; weak for Samuel creator claim. | Not alone. Use as HAI-MCP/handle corroboration. |
| 16 | `https://getlulu.dev/mcps/hai-mcp` | INDIRECT_VIA_HANDLE | Shows HAI-MCP marketplace/source with GitHub `smlfg/hai-mcp`; weak for Samuel name. | Not alone. Use as marketplace corroboration. |
| 17 | `https://exa.ai/library/person/rb46t73zdpq` | SAMUEL_ONLY | Identifies Samuel Fleig with Worms/Hochschule/DB Netz context; HAI absent/weak. | No, identity resolver only. |
| 18 | `https://medium.com/@smlflg` | SAMUEL_ONLY / technical context | Samuel Fleig technical articles visible; HAI/HAI-MCP not strong in current audit. | No, unless a HAI article is published/extracted later. |
| 19 | `https://www.linkedin.com/in/samuel-fleig-52610914b` | YES_MEDIUM when HAI snippets visible | Profile extraction limited; search snippets can expose HAI/IPAI and SelfAI context. Same-name collisions exist. | Only with visible HAI/AI/smlfg context; not primary. |
| 20 | LinkedIn HAI/IPAI post | YES_MEDIUM | Public post/snippet links Samuel profile to HAI/IPAI and mentions HAI-MCP as technical building block. | Secondary/social corroboration; not durable primary proof. |
| 21 | LinkedIn SelfAI post | SAMUEL_ONLY / predecessor context | Shows Samuel as AI builder via SelfAI; does not make SelfAI a HAI proof. | No for Samuel -> HAI; development history only. |
| 22 | `https://x.com/Samuelflg1` | NO_WEAK_OR_BLOCKED | Direct extraction failed with `SOURCE_NOT_AVAILABLE`; no reliable HAI source. | No. |
| 23 | `https://twitter.com/Samuelflg1` | NO_WEAK_OR_BLOCKED | Direct extraction failed with `SOURCE_NOT_AVAILABLE`. | No. |
| 24 | `https://mcp.so/tags/hai` | NO_WEAK_OR_BLOCKED / HAI tag only | Generic `#hai` tag/category, no proven Samuel/HAI-MCP binding. | No. |
| 25 | `https://assay.tools/categories/ai-ml` | NO_WEAK_OR_BLOCKED | AI/ML package category; no HAI-MCP visible in segment. | No. |
| 26 | Search result bundle queries | YES_MEDIUM as measurement | Bundle snippets can combine Samuel Fleig + Human Agent Interface + HAI-MCP + `smlfg`; measurement only. | Use as benchmark evidence, not source-of-truth. |

## Negative / collision handling for Samuel -> HAI

| ID | Source / surface | Samuel-Fleig-to-HAI connection? | Handling |
|---|---|---|---|
| A | Home Assistant `ha-mcp` pages | NEGATIVE_COLLISION | No Samuel/HAI relationship; Home Assistant only. |
| B | HAI.AI / haiai / Rust `hai-mcp` | NEGATIVE_COLLISION | No Samuel/HAI relationship; separate HAI.AI/HumanAssisted ecosystem. |
| C | 2amtech Hai / `@2amtech/hai` | NEGATIVE_COLLISION | No Samuel/HAI relationship; Jira/Confluence workflow MCP. |
| D | Strongly Human-Agent Interface Layer article | NEGATIVE_COLLISION / category only | No Samuel relationship; generic/category competitor wording. |
| E | HAIP / Human-Agent Interaction Protocol | NEGATIVE_COLLISION | No Samuel relationship; adjacent protocol. |
| F | HAVI / Human-Agent Visual Interface | NEGATIVE_COLLISION | No Samuel relationship; visual interface category/product. |
| G | arXiv/ACL/DBLP human-agent papers | NEGATIVE_COLLISION / category only | No Samuel relationship; category/research context only. |
| H | Other Samuel Fleig profiles/results | NEGATIVE_COLLISION | Same-name people; no HAI/smlfg/AI Engineering/domain context. |
| I | `mrgoonie/human-mcp` and similar projects | NEGATIVE_COLLISION | Similar human+MCP wording; no Samuel/HAI relationship. |

## Strength ranking for Samuel -> HAI

1. Strong controlled proof:
   - `https://www.human-agent-interface.com/samuel/`
   - `https://www.human-agent-interface.com/samuel/why-hai-matters/`
   - `https://github.com/smlfg/hai-mcp`

2. Strong external proof:
   - `https://unyly.org/mcp/hai-mcp`

3. Medium/bridge proof:
   - `https://github.com/smlfg`
   - `https://glama.ai/mcp/servers?query=author%3Asmlfg`
   - LinkedIn HAI/IPAI post
   - LinkedIn profile when visible snippets include HAI/AI/smlfg context

4. Indirect via handle/software only:
   - `https://glama.ai/mcp/servers/smlfg/hai-mcp`
   - `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
   - `https://getlulu.dev/mcps/hai-mcp`

5. Not sufficient for Samuel -> HAI:
   - homepage alone
   - what-it-is alone
   - proof page alone
   - Exa person page
   - Medium profile
   - X/Twitter aliases
   - MCP.so tag page
   - Assay category page

## Bottom line

Yes, Samuel Fleig is connected with HAI in the public footprint, but the connection is uneven:

- Best controlled connection: Samuel page and `github.com/smlfg/hai-mcp`.
- Best external connection: Unyly, because it carries the full `created by Samuel Fleig` + HAI + HAI-MCP wording.
- Weakest gap: controlled homepage/what-it-is describe HAI well but do not by themselves carry the full Samuel -> HAI -> HAI-MCP graph.
- Important bridge: `smlfg` is often the machine-visible author identity in registries, so Samuel -> `smlfg` -> HAI-MCP must stay visibly documented on GitHub/profile sources.
- Do not treat category pages, `ha-mcp` collisions, HAI.AI/haiai, HAIP/HAVI, or same-name Samuel Fleig profiles as Samuel -> HAI evidence.
