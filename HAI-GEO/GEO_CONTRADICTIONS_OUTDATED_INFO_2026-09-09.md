# GEO Contradictions and Outdated Information — 2026-09-09

Status: contradiction / outdated-info matrix / no external changes
Access time: 2026-09-09 00:15 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document whether audited sources contain contradictory, stale, misleading or collision-prone information against the canonical HAI graph. This file distinguishes true contradictions from weak/incomplete evidence.

Assessment labels:
- NO_CONTRADICTION: source is aligned or merely incomplete.
- INCOMPLETE: source is not wrong, but does not carry the full graph.
- STALE_OR_WEAK: source may be outdated, thin, blocked, snippet-only or unstable.
- OUTDATED_CONTROLLED_GAP: controlled source/page is missing, not extractable or no longer aligned with desired graph.
- COLLISION_RISK: source can cause entity confusion but is not claiming to be Samuel's HAI.
- CONTRADICTORY_TO_HAI_GRAPH: source describes a different entity using overlapping HAI/HAI-MCP/human-agent terminology and must not be merged.

## Source matrix

| # | Source / surface | Contradictory or outdated? | Assessment | Action |
|---|---|---|---|---|
| 1 | `https://www.human-agent-interface.com/` | Not contradictory; incomplete | INCOMPLETE | Homepage describes HAI well but does not strongly expose HAI-MCP/full graph. Add visible Samuel + HAI-MCP bridge only with Samuel-Go. |
| 2 | `https://www.human-agent-interface.com/samuel/` | Not contradictory; incomplete for HAI-MCP | INCOMPLETE | Strong Samuel -> HAI source; add HAI-MCP near top only with Samuel-Go. |
| 3 | `https://www.human-agent-interface.com/what_it_is/` | Not contradictory; incomplete | INCOMPLETE | Strong HAI definition; lacks explicit creator/software bridge. Add bridge only with Samuel-Go. |
| 4 | `https://www.human-agent-interface.com/proof/` | Not contradictory | NO_CONTRADICTION / INCOMPLETE | Proof page correctly limits claims; do not turn it into ROI/customer proof. |
| 5 | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | Not contradictory; incomplete for HAI-MCP | INCOMPLETE | Good origin narrative; not a technical implementation source. |
| 6 | `https://www.human-agent-interface.com/samuel/timeline/` | Not contradictory; potentially broad/stale over time | STALE_OR_WEAK | Timeline should be periodically dated/kept current; use as support only. |
| 7 | `https://www.human-agent-interface.com/robots.txt` | Not semantic; crawl source only | NO_CONTRADICTION | No entity claim. Re-check after sitemap fix. |
| 8 | `https://www.human-agent-interface.com/hai-mcp/` | Yes: controlled-domain gap, not contradictory content | OUTDATED_CONTROLLED_GAP | Audit saw `http_error`; publish/fix crawlable HAI-MCP page only with Samuel-Go. |
| 9 | `https://www.human-agent-interface.com/sitemap.xml` | Yes: crawlability gap, not semantic contradiction | OUTDATED_CONTROLLED_GAP | Audit saw `http_error`; fix sitemap only with Samuel-Go/deploy workflow. |
| 10 | `https://github.com/smlfg` | Not contradictory; profile wording may be less canonical | INCOMPLETE / STALE_OR_WEAK | Profile supports Samuel/handle; keep wording aligned if profile is edited later. |
| 11 | `https://github.com/smlfg/hai-mcp` | Not contradictory | NO_CONTRADICTION | Strongest controlled canonical source; preserve wording. |
| 12 | `https://unyly.org/mcp/hai-mcp` | Not contradictory; external ingestion may lag | NO_CONTRADICTION / STALE_OR_WEAK | Strong external full-graph source; monitor for ingestion drift after README changes. |
| 13 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | Not contradictory; shorter/handle-first wording | INCOMPLETE | Strong HAI-MCP registry; Samuel creator claim not visible enough on main listing. Monitor. |
| 14 | `https://glama.ai/mcp/servers?query=author%3Asmlfg` | Not contradictory; search-view/title may vary | STALE_OR_WEAK | Useful bridge; treat as dynamic search view, not permanent primary evidence. |
| 15 | `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | Not contradictory; trust score/context may change | STALE_OR_WEAK | Security/trust findings are point-in-time and must not be treated as guarantee. Monitor after code changes. |
| 16 | `https://getlulu.dev/mcps/hai-mcp` | Not contradictory; marketplace copy is thin | INCOMPLETE / STALE_OR_WEAK | Useful secondary listing; not full graph or Samuel proof. |
| 17 | `https://exa.ai/library/person/rb46t73zdpq` | Not contradictory to known identity, but incomplete for HAI | SAMUEL_ONLY / STALE_OR_WEAK | Aggregated person page may lag; use only as identity resolver, not HAI source. |
| 18 | `https://medium.com/@smlflg` | Not contradictory; currently missing HAI | INCOMPLETE | Technical-author context only; future HAI article would need canonical wording. |
| 19 | `https://www.linkedin.com/in/samuel-fleig-52610914b` | Not proven contradictory; extraction unstable and same-name risk | STALE_OR_WEAK / COLLISION_RISK | Use only visible HAI/AI/smlfg snippets; not primary evidence. |
| 20 | LinkedIn HAI/IPAI post | Not contradictory; social/snippet source may age | STALE_OR_WEAK | Good secondary proof but platform extraction can fail; do not rely on it alone. |
| 21 | LinkedIn SelfAI post | Not contradictory if framed as predecessor/history | INCOMPLETE | Do not elevate SelfAI to HAI core entity; use only as development history. |
| 22 | `https://x.com/Samuelflg1` | No usable evidence; could become stale/noisy | STALE_OR_WEAK | Current audit: `SOURCE_NOT_AVAILABLE`; do not use for HAI. |
| 23 | `https://twitter.com/Samuelflg1` | No usable evidence; alias/source unavailable | STALE_OR_WEAK | Current audit: `SOURCE_NOT_AVAILABLE`; do not use for HAI. |
| 24 | `https://mcp.so/tags/hai` | Not contradictory; generic tag can mislead | COLLISION_RISK / STALE_OR_WEAK | Tag-level `#hai` only; do not infer HAI-MCP until exact listing is found. |
| 25 | `https://assay.tools/categories/ai-ml` | Not contradictory; no HAI in visible segment | STALE_OR_WEAK | Monitoring only. |
| 26 | Search result bundle queries | Not source-of-truth; snippets can be stale/noisy | STALE_OR_WEAK / COLLISION_RISK | Use only as measurement; extract pages before claims. |

## Actual contradictions / collision sources

| ID | Source / surface | Contradiction / conflict | Severity | Handling |
|---|---|---|---|---|
| A | Home Assistant `ha-mcp` pages: `github.com/homeassistant-ai/ha-mcp`, PyPI `ha-mcp`, Go package `zorak1103/ha-mcp` | Similar `ha-mcp` token but describes Home Assistant MCP server for smart-home automation, not HAI-MCP. | High collision risk | Negative benchmark; never sameAs. |
| B | HAI.AI / haiai / Rust `hai-mcp`: `lib.rs/crates/hai-mcp`, docs.rs `hai_mcp`, `github.com/HumanAssisted/haiai` | Exact/near-exact `hai-mcp` token but belongs to HAI.AI/HumanAssisted/JACS ecosystem. | High collision risk | Negative benchmark; explicit disambiguation required. |
| C | 2amtech Hai / `@2amtech/hai` | HAI acronym plus MCP context, but Jira/Confluence workflow tooling. | High collision risk | Negative benchmark; do not merge. |
| D | Strongly Human-Agent Interface Layer article | Uses human-agent-interface-layer category language, not Samuel's HAI entity. | Medium collision/category risk | Category framing only; no HAI proof. |
| E | HAIP / Human-Agent Interaction Protocol | Adjacent Human-Agent Interaction Protocol, not Human Agent Interface (HAI). | Medium collision risk | Keep as separate protocol. |
| F | HAVI / Human-Agent Visual Interface | Adjacent Human-Agent Visual Interface with companion MCP wording. | Medium collision risk | Keep separate. |
| G | arXiv/ACL/DBLP human-agent papers | Human-agent interaction/interface category content, not Samuel/HAI/HAI-MCP. | Medium category risk | Use only for category/market context. |
| H | Other Samuel Fleig profiles/results | Same-name people with unrelated roles/geographies/projects. | High identity risk | Require HAI/smlfg/AI Engineering/domain context before associating. |
| I | `mrgoonie/human-mcp` and similar projects | Similar human+MCP wording but unrelated software. | Medium collision risk | Negative/adjoining-software set only. |

## Stale / outdated / weak-information findings

1. Controlled `/hai-mcp/` page is the biggest outdated/incomplete gap.
   - Current audit result: `http_error`.
   - Effect: HAI -> HAI-MCP is strongest on GitHub/Unyly/registries, not on controlled domain.

2. Controlled `sitemap.xml` is a crawlability gap.
   - Current audit result: `http_error`.
   - Effect: discovery of controlled semantic pages is weaker than it should be.

3. Registry pages can lag behind source README changes.
   - Applies to Unyly, Glama, M8ven and Lulu.
   - Effect: after any README/canonical wording change, registries must be rechecked before claiming alignment.

4. M8ven trust/security wording is point-in-time.
   - Effect: do not cite it as permanent security endorsement or certification.

5. Social/profile pages are unstable.
   - Applies to LinkedIn, X/Twitter, Medium, Exa.
   - Effect: use as secondary identity/context only unless exact public body text is available.

6. GitHub profile wording may be less canonical than repo README.
   - Effect: GitHub profile is useful for Samuel -> `smlfg`, but the repo README is stronger for full graph.

7. SelfAI and older projects are development history, not HAI core entities.
   - Effect: mention only as predecessor/context; do not make them equal to HAI.

8. Search snippets are not stable descriptions.
   - Effect: use snippets for measurement/baseline only; extract page body before supporting claims.

## Contradiction summary

No strong source was found that directly contradicts the canonical graph by saying Samuel's HAI-MCP is something else or created by someone else.

The real risk is not direct contradiction; it is entity collision and incomplete propagation:
- `hai-mcp` collides with Home Assistant / HAI.AI / haiai-related software.
- `HAI` collides with other acronyms and human-agent categories.
- `Human Agent Interface` collides with generic category/competitor-language pages.
- `Samuel Fleig` collides with same-name people.
- Controlled website pages are semantically aligned for HAI/Samuel but incomplete for HAI-MCP.

## Required operating rule

Treat contradictions in three tiers:

1. Red / exclude:
   - Home Assistant `ha-mcp`, HAI.AI/haiai Rust `hai-mcp`, 2amtech Hai, HAIP/HAVI, same-name Samuel Fleig profiles without HAI context.

2. Yellow / monitor or pair with stronger proof:
   - LinkedIn, X/Twitter, Medium, Exa, MCP.so tags, Assay, search snippets, M8ven trust findings.

3. Green / aligned but maintain:
   - GitHub `smlfg/hai-mcp`, Unyly, Glama listing/author search, controlled HAI/Samuel/what-it-is/proof/origin pages.

## Bottom line

There are no verified direct contradictions to the canonical Samuel Fleig -> HAI -> HAI-MCP graph in the currently audited positive sources. The meaningful issues are:

- controlled-domain HAI-MCP page and sitemap are missing/not extractable;
- registry/social/search surfaces can be stale;
- several high-risk collisions use similar `HAI`, `ha-mcp`, `hai-mcp`, `human-agent interface` or `Samuel Fleig` language;
- category pages must not be used as sameAs/evidence for Samuel's HAI.

Recommended next controlled fix, if Samuel approves later:
Publish/fix a crawlable `/hai-mcp/` page and sitemap, then re-run the GEO benchmark and registry extraction to check whether external surfaces have converged.
