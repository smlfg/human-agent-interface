# Public Footprint Search — MCP-Registries wie Glama — 2026-09-08

Status: completed / no external changes
Target: MCP registry surfaces for HAI-MCP, especially Glama, Unyly, M8ven, Lulu and adjacent registry search results
Access time: 2026-09-08 23:53 CEST

## Scope

User focus:
- MCP-Registries wie Glama

Canonical entity graph being checked:
- Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Registry-specific question:
- Do MCP registry surfaces help generative systems resolve HAI-MCP as the MCP control-plane implementation of Human Agent Interface?
- Do they connect HAI-MCP to `smlfg`, Samuel Fleig, GitHub and/or the canonical HAI website?
- Are they evidence-grade external registry surfaces or just weak backlink-like noise?

Boundary:
- These are legitimate registry/catalog surfaces created by indexing or listing MCP servers.
- They are not fake backlinks, fake reviews, paid review spam, or artificial GEO-spam techniques.
- Registry claims are used as external corroboration only when they expose the repo, author/publisher, description, install context, tools, or trust/audit metadata.

## Queries run

Search queries:
1. `"smlfg/hai-mcp" MCP registry Glama Unyly M8ven Lulu`
2. `"HAI-MCP" "MCP server" "smlfg" -site:github.com`
3. `"HAI-MCP by smlfg"`
4. `"github.com/smlfg/hai-mcp" "MCP" registry`

Direct extraction targets:
1. `https://glama.ai/mcp/servers/smlfg/hai-mcp`
2. `https://glama.ai/mcp/servers?query=author%3Asmlfg`
3. `https://unyly.org/mcp/hai-mcp`
4. `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
5. `https://getlulu.dev/mcps/hai-mcp`

## Registry findings

### Glama — strongest MCP registry surface for discovery + tool schema

URLs:
- `https://glama.ai/mcp/servers/smlfg/hai-mcp`
- `https://glama.ai/mcp/servers?query=author%3Asmlfg`

Extracted / search-visible claims:
- Title: `HAI-MCP by smlfg | Glama` / `HAI-MCP by smlfg`
- Author/query surface: `smlfg`
- Category/context: `Agent Orchestration`, `Autonomous Agents`
- Language/hosting labels: `Python`, `Local`
- Description: `Model-agnostic Human-Agent Interface control plane as an MCP server.`
- Client compatibility: Claude Code, Codex, Cursor, Grok, OpenCode, Hermes, and other MCP-compatible clients.
- The server never calls an LLM.
- Install instructions expose source-based local run: `cd HAI-MCP`, `uv sync --all-extras`, `uv run hai-mcp`.
- Directory API reference is visible: `curl -X GET 'https://glama.ai/api/mcp/v1/servers/smlfg/hai-mcp'`.
- Author listing extracted as: `"author:smlfg" matching MCP servers`, containing `HAI-MCP`.
- Author listing says: `Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.`
- Updated timestamp on author listing: `2026-09-03 00:06 UTC`.
- Tool surface: 23 tools visible in Glama extraction, including `hai_health`, `hai_status`, `hai_get_next_step`, `hai_read_artifacts`, `hai_propose_next_step`, `hai_accept_next_step`, `hai_recover`.

Entity-graph value:
- Strong for `HAI-MCP -> Human-Agent Interface control plane`.
- Strong for `HAI-MCP -> author/namespace smlfg`.
- Strong for machine-readable tool/schema surface because Glama exposes tools and a directory API.
- Medium for `Samuel Fleig -> HAI-MCP`, because Glama itself exposes `smlfg` but not necessarily full human-name ownership on the main listing.
- Strong as MCP-ecosystem citation surface, because Glama is an MCP registry/inspector/gateway with indexed server metadata and tool schemas.

Weakness / gap:
- Glama listing should ideally surface the full canonical sentence or ingest it from README:
  `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
- Current Glama extraction strongly says `Human-Agent Interface control plane`, but in this run it does not expose Samuel Fleig as clearly as Unyly.
- Maintenance/quality scores are only registry evaluations, not product truth; do not overclaim them as endorsement.

Recommended use:
- Treat Glama as the primary MCP-registry citation for HAI-MCP discovery, schema, tools and `smlfg` namespace.
- Use Glama in GEO benchmark queries for `HAI-MCP`, `smlfg HAI-MCP`, and `MCP control plane Human Agent Interface`.
- Do not use Glama as the only source for the Samuel-Fleig creator claim unless the extracted listing explicitly shows that claim.

### Unyly — strongest third-party full-graph citation in this run

URL:
- `https://unyly.org/mcp/hai-mcp`

Extracted / search-visible claims:
- Title: `HAI MCP server — install in Claude & Cursor — Unyly` / `HAI — MCP for Claude`.
- Author: `smlfg by smlfg`.
- GitHub link: `https://github.com/smlfg/hai-mcp`.
- Description: `Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.`
- README extract includes the full canonical graph:
  `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
- README extract also says:
  `Human Agent Interface is an approach for keeping agentic AI work observable, bounded, owner-gated, and evidence-based so a human can still own the work.`
- README extract says HAI-MCP implements the approach as a model-agnostic MCP server.
- Canonical website is visible: `https://www.human-agent-interface.com/`.
- About Samuel Fleig is visible: `https://www.human-agent-interface.com/samuel/`.
- Tool section exposes HAI tools and owner-gate behavior.
- FAQ says no API key and self-hosted/local source installation.

Entity-graph value:
- Very strong for the full graph: `Samuel Fleig -> Human Agent Interface (HAI) -> HAI-MCP`.
- Strong for external corroboration because it is a third-party MCP catalog page and links back to GitHub and controlled website pages.
- Strong for LLM citation because it contains the exact canonical wording in visible text.

Weakness / gap:
- Listing state says `Not checked` / community-style verification, so it is a catalog/citation surface, not a formal security endorsement.
- Registry page title shortens to `HAI`, which may create weaker name precision than `HAI-MCP`; use with exact URL and quote the README text when citing.

Recommended use:
- Treat Unyly as strongest external full-graph citation found so far.
- Preserve the canonical README wording, because Unyly is ingesting it and making it visible.
- If updating controlled sources, ensure they mirror the same phrase so registry ingestion stays consistent.

### M8ven — useful trust/security registry signal, not strongest semantic source

URL:
- `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`

Extracted / search-visible claims:
- Title: `smlfg/hai-mcp · C 74/100 | M8ven` and search title `HAI-MCP (smlfg/hai-mcp) · MCP Trust Score · M8ven`.
- The page lists `HAI-MCP` and `smlfg/hai-mcp`.
- Description: `Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.`
- Source: `Glama`.
- GitHub link: `https://github.com/smlfg/hai-mcp`.
- Registry link: listed on Glama.
- Score / trust framing: `C`, `Emerging`, `74/100`, `No concerning findings`, `New projects cap at C until adoption is earned`.
- Key finding: `No credential exfiltration, no sensitive file access, no obfuscation`.
- Environment variables include `HAI_TRANSPORT`, `HAI_HTTP_HOST`, `HAI_HTTP_PORT`, `HAI_HOME`, `HAI_HTTP_TOKEN`.
- Quality suggestions include tool annotations, all four hints, license file, and tool test coverage.
- Verification metadata includes commit and code hash.

Entity-graph value:
- Strong for `HAI-MCP -> smlfg/hai-mcp`.
- Medium for `HAI-MCP -> human-agent interface control plane`.
- Strong for security/trust-index metadata, but this is a scanner/crawler view and should not be used as a product-quality claim beyond what it states.
- Weak for Samuel-Fleig creator association unless paired with GitHub/Unyly/controlled domain.

Weakness / gap:
- M8ven explicitly says no publisher has claimed the listing / live monitoring not connected.
- It pulls source from Glama, so it is a downstream registry signal, not an independent semantic origin.
- Some findings may be scanner artifacts; do not treat suggestions as ground truth without checking the repo.

Recommended use:
- Treat M8ven as trust-index corroboration and a useful improvement backlog source.
- Do not use M8ven as the primary citation for the HAI semantic graph.
- If Samuel wants next action later: claim/connect listing only after deciding whether external scanner access is acceptable.

### Lulu — weak / low-content registry surface in this run

URL:
- `https://getlulu.dev/mcps/hai-mcp`

Extracted claims:
- Page title/content: `Hai Mcp` and `HAI-MCP — MCP server: install, tools & trust score | Lulu`.
- The extraction mostly exposes Lulu commercial infrastructure/navigation.
- It does not expose enough HAI-MCP semantic content in this run to support the full graph.

Entity-graph value:
- Weak as a citation surface.
- Potentially useful as a discoverability surface if its page becomes richer/indexed, but not currently a strong evidence source.

Recommended use:
- Keep as low-priority registry mention.
- Do not cite for Samuel Fleig, Human Agent Interface semantics, or HAI-MCP implementation relationship unless later extraction exposes those claims.

### Adjacent registry ecosystem — context only

Search also found registry/platform context:
- Glama describes itself as an MCP server registry/inspector/gateway and a superset of the official MCP Registry.
- Glama methodology says it ingests official metadata and layers sandbox-derived data / schema captures / scores / drift history / quality annotations.
- `mcp-glama-registry` exists as a PyPI package exposing a tool to search Glama's MCP registry.
- Unyly describes itself in search snippets as a large MCP catalog aggregating entries from Official MCP Registry, Smithery, PulseMCP, Glama and npm.

Entity-graph value:
- This supports why Glama/Unyly pages matter for MCP discovery.
- It does not by itself prove HAI semantics; use only as context for registry importance.

## Comparative ranking for GEO/entity evidence

1. Unyly — strongest full-graph external citation
   - Best for: `HAI-MCP is implementation of Human Agent Interface (HAI), created by Samuel Fleig`.
   - Reason: visible README extract contains full canonical graph and links GitHub, canonical website, Samuel page.

2. Glama — strongest MCP registry/tool-schema surface
   - Best for: `HAI-MCP by smlfg`, MCP server discovery, tool list, API/schema, category and install context.
   - Reason: direct listing, author query surface, tools, API reference and active registry positioning.

3. M8ven — strongest trust/security-index surface
   - Best for: external trust/audit metadata, no-obvious-danger scan, improvement suggestions.
   - Reason: trust page maps to `smlfg/hai-mcp`, points to Glama/GitHub, exposes verification metadata.

4. Lulu — weak current citation surface
   - Best for: low-priority discovery only.
   - Reason: extraction lacks substantive HAI-MCP semantic text.

## Collision / false-positive handling

Potential false positives remain:
- `ha-mcp` / Home Assistant MCP surfaces.
- `HAI.AI` / `haiai` Rust package surfaces.
- Tencent HAI MCP or other unrelated HAI acronym pages.
- Generic MCP registry pages with `HAI` as substring or unrelated acronym.

Positive registry match requires at least one of:
- exact `smlfg/hai-mcp`,
- exact `HAI-MCP by smlfg`,
- GitHub URL `https://github.com/smlfg/hai-mcp`,
- visible phrase `Human Agent Interface`,
- visible canonical website `https://www.human-agent-interface.com/`,
- visible Samuel page `https://www.human-agent-interface.com/samuel/`,
- visible creator wording naming Samuel Fleig.

## Registry-specific recommendations

Immediate no-code / no-external-action recommendations:
1. Preserve canonical README wording in `smlfg/hai-mcp` because Unyly and Glama ingest README text.
2. Ensure every registry-ingested text begins with the unambiguous phrase:
   `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
3. Keep `Canonical website` and `About Samuel Fleig` links in README because Unyly already exposes them and they strengthen the full graph.
4. Treat Glama's API/schema page as benchmarkable machine-readable evidence; add `glama` as a named registry surface in future GEO measurements.
5. Use M8ven's suggestions as engineering backlog only after repo-level verification, not as funding/GEO truth.

Possible later actions that require Samuel decision / external account action:
- Claim or maintain registry listings where the registry supports owner verification.
- Add or update registry metadata manually if Glama/Unyly support publisher edits.
- Connect M8ven/GitHub app for live monitoring if Samuel accepts the read-only external scanner relationship.

## Bottom-line answer

MCP registries are currently one of the strongest external surfaces for HAI-MCP. Glama is the most important MCP-native registry/tool-schema surface; Unyly is currently the strongest external full-graph citation because it visibly carries `HAI-MCP -> Human Agent Interface (HAI) -> created by Samuel Fleig`; M8ven adds trust-index/security-scanner corroboration but should not be used as the semantic source of truth. Lulu is currently too thin to matter much.
