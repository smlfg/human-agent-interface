# GEO HAI-to-HAI-MCP Connection by Source — 2026-09-09

Status: source-by-source HAI -> HAI-MCP connection matrix / no external changes
Access time: 2026-09-09 00:13 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document whether each audited source connects Human Agent Interface (HAI) with HAI-MCP. This file answers only the HAI -> HAI-MCP relationship, not every Samuel/person relationship.

Connection labels:
- YES_FULL_GRAPH: source visibly connects Samuel Fleig -> HAI -> HAI-MCP.
- YES_STRONG: source visibly connects Human Agent Interface (HAI) with HAI-MCP.
- YES_MEDIUM: source connects HAI/HAI-MCP through weaker registry, social or snippet wording.
- INDIRECT_VIA_CONTROL_PLANE: source describes HAI-MCP as a human-agent-interface/control-plane MCP server without full canonical HAI wording.
- HAI_ONLY: source describes HAI but does not visibly connect HAI-MCP.
- HAI_MCP_ONLY: source describes/list HAI-MCP but not the parent HAI concept strongly.
- NO_WEAK_OR_BLOCKED: no reliable HAI -> HAI-MCP connection in current audit.
- NEGATIVE_COLLISION: similar HAI/MCP/human-agent entity that is not Samuel's HAI -> HAI-MCP graph.

## Connection matrix

| # | Source / surface | HAI connected with HAI-MCP? | Evidence / boundary | Use as HAI -> HAI-MCP proof? |
|---|---|---|---|---|
| 1 | `https://www.human-agent-interface.com/` | HAI_ONLY | Homepage strongly describes Human Agent Interface as work a human can still own; audit says full HAI-MCP implementation claim should not be used unless page visibly links/names HAI-MCP. | Not alone. |
| 2 | `https://www.human-agent-interface.com/samuel/` | HAI_ONLY / weak HAI-MCP | Samuel page connects Samuel to Human Agent Interfaces; HAI-MCP is weak unless it appears near top. | Not as current HAI -> HAI-MCP proof. |
| 3 | `https://www.human-agent-interface.com/what_it_is/` | HAI_ONLY | Defines HAI/control-layer semantics; creator/software relationship not visibly strong. | No, unless HAI-MCP bridge is added. |
| 4 | `https://www.human-agent-interface.com/proof/` | HAI_ONLY | Proof/evidence discipline and HAI method; not HAI-MCP. | No. |
| 5 | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | HAI_ONLY / weak HAI-MCP | Origin narrative for why HAI exists; not a technical HAI-MCP source. | No. |
| 6 | `https://www.human-agent-interface.com/samuel/timeline/` | NO_WEAK_OR_BLOCKED | Person/timeline support only. | No. |
| 7 | `https://www.human-agent-interface.com/robots.txt` | NO_WEAK_OR_BLOCKED | Crawl/access file only. | No. |
| 8 | `https://www.human-agent-interface.com/hai-mcp/` | NO_WEAK_OR_BLOCKED currently | Intended controlled HAI-MCP page returned `http_error` in audit. | No until live/extractable. |
| 9 | `https://www.human-agent-interface.com/sitemap.xml` | NO_WEAK_OR_BLOCKED | Sitemap returned `http_error`; no semantic content. | No. |
| 10 | `https://github.com/smlfg` | NO_WEAK_OR_BLOCKED / partial profile context | GitHub profile can mention Human-Agent Interfaces but does not by itself prove HAI-MCP relationship unless repo appears in context. | Supporting only. |
| 11 | `https://github.com/smlfg/hai-mcp` | YES_FULL_GRAPH | README/search-visible text states `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`; includes canonical website/Samuel links. | Yes, strongest controlled HAI -> HAI-MCP proof. |
| 12 | `https://unyly.org/mcp/hai-mcp` | YES_FULL_GRAPH | External registry repeats README wording: HAI-MCP is the open-source MCP control-plane implementation of HAI, created by Samuel Fleig; includes canonical links. | Yes, strongest external HAI -> HAI-MCP proof. |
| 13 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | YES_STRONG / INDIRECT_VIA_CONTROL_PLANE | Listing says `Model-agnostic Human-Agent Interface control plane as an MCP server`; `HAI-MCP by smlfg`; tool schema visible. | Yes for HAI-MCP as Human-Agent Interface control plane; less explicit for HAI acronym/parent project. |
| 14 | `https://glama.ai/mcp/servers?query=author%3Asmlfg` | YES_MEDIUM | Author/search view lists HAI-MCP and describes control-plane server under Samuel/smlfg context. | Bridge proof; registry/search-view not primary. |
| 15 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | YES_MEDIUM / INDIRECT_VIA_CONTROL_PLANE | Shows `HAI-MCP (smlfg/hai-mcp)` and human-agent interface control-plane description. | Yes as trust/index corroboration, not primary semantic source. |
| 16 | `https://getlulu.dev/mcps/hai-mcp` | YES_MEDIUM / INDIRECT_VIA_CONTROL_PLANE | Page says HAI-MCP provides a human-agent interface control plane; source points to `github.com/smlfg/hai-mcp`; Glama reference visible. | Yes as marketplace corroboration, not full graph. |
| 17 | `https://exa.ai/library/person/rb46t73zdpq` | NO_WEAK_OR_BLOCKED | Person identity page; HAI/HAI-MCP absent/weak. | No. |
| 18 | `https://medium.com/@smlflg` | NO_WEAK_OR_BLOCKED | Technical profile/articles; HAI/HAI-MCP not strong in current audit. | No. |
| 19 | `https://www.linkedin.com/in/samuel-fleig-52610914b` | YES_MEDIUM when HAI/IPAI snippets visible | Profile extraction limited; public snippets can expose HAI/IPAI/HAI-MCP context. | Only as secondary/social support. |
| 20 | LinkedIn HAI/IPAI post | YES_MEDIUM | Public post/snippet mentions HAI and HAI-MCP as first technical building block with 23 tools. | Secondary social/event proof only. |
| 21 | LinkedIn SelfAI post | NO_WEAK_OR_BLOCKED | SelfAI predecessor context; not HAI-MCP relation. | No. |
| 22 | `https://x.com/Samuelflg1` | NO_WEAK_OR_BLOCKED | Direct extraction failed; no reliable HAI/HAI-MCP connection. | No. |
| 23 | `https://twitter.com/Samuelflg1` | NO_WEAK_OR_BLOCKED | Direct extraction failed. | No. |
| 24 | `https://mcp.so/tags/hai` | NO_WEAK_OR_BLOCKED / monitor | Generic `#hai` tag; exact HAI-MCP listing not proven in current audit. | No. |
| 25 | `https://assay.tools/categories/ai-ml` | NO_WEAK_OR_BLOCKED | AI/ML package category; no HAI-MCP visible in segment. | No. |
| 26 | Search result bundle queries | YES_MEDIUM as measurement | Best bundle snippets combine `HAI-MCP`, `Human Agent Interface`, `smlfg`, Samuel Fleig and canonical domain. | Use as benchmark signal, not source-of-truth. |

## Negative / collision handling for HAI -> HAI-MCP

| ID | Source / surface | HAI-to-HAI-MCP connection? | Handling |
|---|---|---|---|
| A | Home Assistant `ha-mcp` pages | NEGATIVE_COLLISION | Home Assistant MCP server; do not merge with HAI-MCP. |
| B | HAI.AI / haiai / Rust `hai-mcp` | NEGATIVE_COLLISION | Exact/near-exact `hai-mcp` token collision from HAI.AI/HumanAssisted/JACS ecosystem; not Human Agent Interface (HAI). |
| C | 2amtech Hai / `@2amtech/hai` | NEGATIVE_COLLISION | HAI acronym plus MCP context, but Jira/Confluence workflow tooling, not Samuel's HAI. |
| D | Strongly Human-Agent Interface Layer article | CATEGORY_DESCRIPTION / NEGATIVE_COLLISION | Category phrase `human-agent interface layer`; not HAI-MCP. |
| E | HAIP / Human-Agent Interaction Protocol | NEGATIVE_COLLISION | Adjacent protocol, not Human Agent Interface (HAI), not HAI-MCP. |
| F | HAVI / Human-Agent Visual Interface | NEGATIVE_COLLISION | Adjacent visual-interface acronym; not HAI-MCP. |
| G | arXiv/ACL/DBLP human-agent papers | CATEGORY_DESCRIPTION | Category/research context only; no HAI-MCP implementation. |
| H | Other Samuel Fleig profiles/results | NEGATIVE_COLLISION | Person-name collisions; not relevant to HAI -> HAI-MCP unless HAI/smlfg/domain context exists. |
| I | `mrgoonie/human-mcp` and similar projects | NEGATIVE_COLLISION | Human+MCP adjacent software; not HAI-MCP. |

## Strength ranking for HAI -> HAI-MCP

1. Strong controlled proof:
   - `https://github.com/smlfg/hai-mcp`

2. Strong external proof:
   - `https://unyly.org/mcp/hai-mcp`

3. Strong/medium MCP-native registry proof:
   - `https://glama.ai/mcp/servers/smlfg/hai-mcp`
   - `https://glama.ai/mcp/servers?query=author%3Asmlfg`
   - `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
   - `https://getlulu.dev/mcps/hai-mcp`

4. Secondary/social proof:
   - LinkedIn HAI/IPAI post
   - LinkedIn profile snippets when they expose HAI/HAI-MCP context

5. HAI-only but missing HAI-MCP:
   - homepage
   - Samuel page
   - what-it-is page
   - proof page
   - why-hai-matters page

6. Not sufficient / blocked:
   - `/hai-mcp/` controlled domain page until `http_error` is fixed
   - sitemap until `http_error` is fixed
   - Exa
   - Medium
   - X/Twitter
   - MCP.so tag page
   - Assay category page

## Bottom line

Yes, HAI is connected with HAI-MCP in the public footprint, but the connection is currently strongest outside the controlled website pages:

- Best controlled proof: GitHub `smlfg/hai-mcp` because it explicitly says HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.
- Best external proof: Unyly because it repeats the full README/canonical relationship externally.
- Best MCP-native proof: Glama because it describes HAI-MCP as a model-agnostic Human-Agent Interface control plane MCP server and exposes tool/schema context.
- Secondary registry proof: M8ven and Lulu support HAI-MCP as human-agent-interface/control-plane software, but do not carry the full parent-HAI graph as strongly as GitHub/Unyly.
- Main gap: controlled domain pages describe HAI well, but the intended `/hai-mcp/` page and sitemap were not extractable in the audit; this weakens the controlled-domain HAI -> HAI-MCP relationship.

Recommended normalized statement for future visible copy:

HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI). HAI is an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.
