# GEO Search-Engine Source Weighting — 2026-09-09

Status: source-weighting assessment / no external changes
Access time: 2026-09-09 00:19 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document which sources appear to be weighted most strongly in search-engine result surfaces for Samuel Fleig, Human Agent Interface (HAI), HAI-MCP and resolver bundles.

Boundary:
This is an observed search-result weighting assessment, not an SEO ranking guarantee. It is based on the current search-result audit and should be re-run after controlled-site or README changes.

## Weighting labels

- DOMINANT: repeatedly appears high / drives result interpretation for an entity or bundle.
- STRONG: appears prominently and helps resolve the correct entity.
- MEDIUM: useful but secondary, dynamic or snippet-limited.
- WEAK: present but not enough for reliable graph resolution.
- NOISY_COLLISION: appears or can appear, but points to another entity/category.
- CONTROLLED_GAP: should be strong but is missing/blocked/incomplete.

## Search-engine weighting matrix

| Rank | Source / surface | Apparent search weighting | Where it is strongest | Evidence from audit | Interpretation |
|---|---|---|---|---|---|
| 1 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | DOMINANT | `HAI-MCP`, `HAI-MCP + Human Agent Interface + smlfg`, full-graph bundle snippets | Appeared as `HAI-MCP by smlfg`; described model-agnostic Human-Agent Interface control plane as MCP server; surfaced at/near top in full-graph query runs. | Search engines weight Glama very strongly for the MCP/software entity. Strongest MCP-native discovery surface. |
| 2 | `https://unyly.org/mcp/hai-mcp` | DOMINANT / STRONG | full graph, `smlfg/hai-mcp`, HAI-MCP + Human Agent Interface | Appeared close to top / first in repo-path resolver; page repeats README wording: HAI-MCP is the open-source MCP control-plane implementation of HAI, created by Samuel Fleig. | Best external full-graph source. Search engines appear to use it heavily when the query contains HAI-MCP plus HAI/Samuel/smlfg. |
| 3 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | STRONG | HAI-MCP and repo-path registry bundles | Surfaced close to top for `HAI-MCP` and `smlfg/hai-mcp` queries; trust-index listing for `HAI-MCP (smlfg/hai-mcp)`. | Strong secondary registry/trust-index surface; less semantically complete than Unyly/GitHub. |
| 4 | `https://github.com/smlfg/hai-mcp` | STRONG but often behind registries in search results | canonical implementation truth, repo-path source, downstream registry source | Search-result body/citations show registry results often dominate; GitHub README is the controlled source from which Unyly/registry wording derives. | The most authoritative controlled source, but search result weighting appears less dominant than Glama/Unyly/M8ven for generic HAI-MCP queries. |
| 5 | `https://www.human-agent-interface.com/samuel/` | STRONG for Samuel + HAI, MEDIUM for full graph | `Samuel Fleig + Human Agent Interface`, controlled-domain query | Appears in controlled-domain and full graph result sets; strong Samuel -> HAI origin/identity page. | Weighted well for person/entity context, but not enough for HAI-MCP unless HAI-MCP is visible near top. |
| 6 | `https://github.com/smlfg` | STRONG for name/handle identity | `Samuel Fleig`, external Samuel + HAI query | Name-only search surfaced GitHub `Samuel Fleig smlfg`; external resolution query identified GitHub as strongest non-domain identity resolver. | Important identity/handle resolver; bridges Samuel -> `smlfg`, but not full graph by itself. |
| 7 | `https://www.human-agent-interface.com/` | MEDIUM / STRONG for HAI concept, weaker for search ranking | Human Agent Interface + controlled-domain queries | Appears in broader HAI/Samuel-related searches; homepage describes HAI well. | The domain is visible, but generic `Human Agent Interface` is category-heavy and the homepage is not dominant enough for full graph. |
| 8 | `https://www.human-agent-interface.com/proof/` | MEDIUM | controlled-domain query | Appears for `human-agent-interface.com` + HAI-MCP/Samuel visibility check. | Useful controlled proof/evidence boundary page; not a core resolver for HAI-MCP. |
| 9 | LinkedIn `samuel-fleig-52610914b` / HAI-IPAI post | MEDIUM | Samuel identity + social/event snippets | LinkedIn profile/posts appear in Samuel and external HAI/Samuel queries; extraction unstable. | Search engines may weight LinkedIn for identity/social proof, but same-name and extraction limits make it secondary. |
| 10 | `https://medium.com/@smlflg` | MEDIUM / WEAK | Samuel technical identity | Appears in name-only and external resolution searches; no strong HAI/HAI-MCP wording in current audit. | Useful for technical profile context, not for HAI graph resolution. |
| 11 | `https://getlulu.dev/mcps/hai-mcp` | WEAK / MEDIUM | additional HAI-MCP marketplace mention | Fresh extraction made Lulu usable as marketplace mention; not highlighted as dominant in search-result audit. | Secondary corroboration only; less weighted than Glama/Unyly/M8ven. |
| 12 | `https://exa.ai/library/person/rb46t73zdpq` | WEAK / MEDIUM | Samuel identity context | Extractable person page, but not prominent as HAI proof in search-result analysis. | Useful identity resolver, but not search-dominant for HAI. |
| 13 | `https://mcp.so/tags/hai` | WEAK / NOISY | generic `#hai` monitoring | Tag page exists; exact HAI-MCP listing not proven. | Not a strong source; can mislead if `HAI` tag is overinterpreted. |
| 14 | `https://assay.tools/categories/ai-ml` | WEAK / monitoring | broad AI/ML category | No visible HAI-MCP in extracted segment. | Not search-weighted for the HAI graph. |
| 15 | X/Twitter `Samuelflg1` aliases | WEAK / blocked | social handle only | Direct extraction failed; targeted searches gave no reliable HAI source. | Not materially weighted as HAI evidence now. |
| 16 | Strongly / arXiv / HAIP / HAVI / Home Assistant / HAI.AI etc. | NOISY_COLLISION | generic `Human Agent Interface`, `HAI`, `HAI-MCP`, `ha-mcp` | These appear in broad/generic queries and collisions. | Search engines weight category/collision surfaces strongly enough to create risk for ambiguous queries. |
| 17 | `https://www.human-agent-interface.com/hai-mcp/` | CONTROLLED_GAP | should be HAI-MCP controlled-domain resolver | Audit saw `http_error`. | Should become a top controlled source, but currently cannot be weighted properly. |
| 18 | `https://www.human-agent-interface.com/sitemap.xml` | CONTROLLED_GAP | crawl discovery | Audit saw `http_error`. | Weakens controlled-domain discovery/weighting. |

## Apparent ranking by query type

### Query type: `HAI-MCP` / HAI-MCP software discovery

Most weighted:
1. Glama
2. Unyly
3. M8ven
4. GitHub repo / derived repo-path surfaces
5. Lulu as weaker additional marketplace

Conclusion:
Search engines seem to treat MCP registries as high-authority discovery surfaces for HAI-MCP.

### Query type: full graph `Samuel Fleig + Human Agent Interface + HAI-MCP`

Most weighted:
1. Glama / registry surfaces
2. Unyly
3. M8ven
4. controlled Samuel page appears in same result set
5. GitHub/GitHub-derived evidence through repo path

Conclusion:
The full graph is reconstructable, but search engines currently approach it from HAI-MCP/registry first, not from the controlled website first.

### Query type: `Samuel Fleig`

Most weighted:
1. GitHub `smlfg`
2. LinkedIn profile/post surfaces
3. Medium `@smlflg`
4. same-name people/noise

Conclusion:
GitHub is strongest positive identity resolver, but name-only remains unsafe because same-name people are also visible.

### Query type: `Human Agent Interface`

Most weighted:
1. Generic/category surfaces: Strongly, academic papers, human-agent interaction pages, protocols/interfaces
2. Controlled HAI domain when bundled with Samuel/domain terms
3. HAI-MCP registries when bundled with HAI-MCP/smlfg

Conclusion:
The generic category phrase is strongly weighted by search engines; HAI must be disambiguated as `Human Agent Interface (HAI)` plus Samuel/HAI-MCP/smlfg/domain.

## Strongest source overall

For search-engine weighting, the strongest visible source is currently:

`https://glama.ai/mcp/servers/smlfg/hai-mcp`

Reason:
- It surfaces prominently for HAI-MCP/software queries.
- It uses the compact high-signal phrase `HAI-MCP by smlfg`.
- It describes the product as a model-agnostic Human-Agent Interface control plane as an MCP server.
- It exposes tool/API/schema context that search engines can treat as structured software evidence.

However, for canonical truth, the strongest source is not Glama:
- controlled truth: `https://github.com/smlfg/hai-mcp`
- strongest external full-graph truth: `https://unyly.org/mcp/hai-mcp`
- strongest MCP-native search weighting: `https://glama.ai/mcp/servers/smlfg/hai-mcp`

## Practical implication

Current search-engine weighting order is not ideal for the intended owned graph:

Observed weighting path:
HAI-MCP -> Glama/Unyly/M8ven -> `smlfg/hai-mcp` -> Samuel / HAI

Desired controlled-source path:
Samuel Fleig -> Human Agent Interface (HAI) -> HAI-MCP -> GitHub/registries

Main intervention later, if Samuel approves:
1. Make `/hai-mcp/` crawlable and semantically explicit.
2. Fix sitemap discovery.
3. Put one visible near-top paragraph on homepage/Samuel/what-it-is that connects Samuel + HAI + HAI-MCP without keyword spam.
4. Re-run the same benchmark queries and compare whether controlled-domain results move upward relative to Glama/Unyly/M8ven.

## Bottom line

Search engines appear to weight Glama most strongly for HAI-MCP as a software/MCP entity. Unyly is the strongest external full-graph source because it carries Samuel Fleig + HAI + HAI-MCP in one page. GitHub `smlfg/hai-mcp` remains the strongest authoritative source, but registries seem more visible in result ranking. The controlled domain is visible for HAI/Samuel, but currently underweighted for HAI-MCP because `/hai-mcp/` and sitemap were not extractable in the audit.
