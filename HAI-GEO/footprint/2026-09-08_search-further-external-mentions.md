# Public Footprint Search — weitere relevante externe Erwähnungen — 2026-09-08

Status: completed / no external changes
Target: additional external mentions beyond controlled domain, GitHub, LinkedIn, X/Twitter and core MCP registry checks
Access time: 2026-09-08 23:58 CEST

## Scope

User focus:
- weitere relevante externe Erwähnungen

Canonical entity graph being checked:
- Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Question:
- Which additional external surfaces mention Samuel Fleig, HAI, HAI-MCP, `smlfg`, or adjacent Human-Agent Interface concepts?
- Which are usable evidence, which are weak secondary signals, and which are merely collisions/category context?

Boundary:
- No artificial backlinks, fake reviews, fake accounts or GEO-spam techniques.
- External mentions are inventoried only if they already exist in search/extraction surfaces.
- Category-neighbor pages are not treated as citations for Samuel/HAI/HAI-MCP unless they explicitly mention the target graph.

## Queries run

1. `"Human Agent Interface" "Samuel Fleig" -site:human-agent-interface.com -site:github.com -site:linkedin.com -site:glama.ai -site:unyly.org -site:m8ven.ai`
2. `"HAI-MCP" "Samuel Fleig" -site:human-agent-interface.com -site:github.com -site:glama.ai -site:unyly.org -site:m8ven.ai`
3. `"smlfg/hai-mcp" -site:github.com -site:glama.ai -site:unyly.org -site:m8ven.ai -site:getlulu.dev`
4. `"smlfg" "Human Agent Interface" -site:github.com -site:human-agent-interface.com`
5. `"Human Agent Interface" "created by Samuel Fleig"`
6. `"HAI-MCP" "created by Samuel Fleig"`
7. `"HAI-MCP" "mcp.so"`
8. `"HAI-MCP" "lobehub"`
9. `"HAI-MCP" "PulseMCP" OR "Smithery" OR "MCPHub"`
10. `"smlfg" "hai-mcp" "mcp.so" OR "lobehub" OR "smithery"`
11. `"github.com/smlfg/hai-mcp" -site:github.com -site:glama.ai -site:unyly.org -site:m8ven.ai -site:getlulu.dev`

Direct extraction targets:
- `https://exa.ai/library/person/rb46t73zdpq`
- `https://medium.com/@smlflg`
- `https://mcp.so/tags/hai`
- `https://getlulu.dev/mcps/hai-mcp`
- `https://assay.tools/categories/ai-ml`

## New / additionally relevant surfaces

### Exa person library — secondary identity resolver, not HAI proof

URL:
- `https://exa.ai/library/person/rb46t73zdpq`

Extracted claims:
- Title/person: `Samuel Fleig`.
- Role: `Student- Angewandte Informatik at Hochschule Worms`.
- Date shown: `August 3, 2026`.
- Location: `Worms, Rhineland-Palatinate, Germany`.
- Network: `31 connections • 33 followers`.
- Experience includes `Student- Angewandte Informatik`, `Hochschule Worms`, `Oct 2023 – Present`, and `Betriebliche Ausbildung`, `DB Netz AG`.

Search-visible context:
- Exa surfaced a Samuel Fleig person page that also aggregates LinkedIn post snippets, including the HAI/IPAI post and SelfAI posts.

Entity-graph value:
- Medium for identity disambiguation of Samuel Fleig in the Worms/Hochschule context.
- Weak for HAI as product/entity unless relying on aggregated LinkedIn snippets.
- Not a primary source and not controlled by Samuel.

Use:
- Treat as secondary identity/disambiguation surface only.
- Do not cite it as a primary claim that Samuel created HAI.

### Medium `@smlflg` — secondary creator/technical-writing surface, HAI weak so far

URL:
- `https://medium.com/@smlflg`

Extracted claims:
- Profile title: `Samuel Fleig – Medium`.
- Repeated author name: `Samuel Fleig`.
- Technical posts surfaced:
  - `How to: Lokales LLM auf Snapdragon NPU mit AnythingLLM auf Windows on ARM — Ein Erfahrungsbericht…`
  - `Dokumentation für LLMS auf der Snapdragon X Elite NPU`
  - `Positional Encoding in Attention is all you Need`
  - `Der Tag, an dem die Cron-Infrastruktur selbst zur Nachricht wurde`.
- Non-technical/personal posts also surfaced, e.g. festival/rave posts.

Entity-graph value:
- Medium for Samuel as technical/AI-writing person.
- Weak for HAI/HAI-MCP unless a future Medium article explicitly names HAI and HAI-MCP.
- Useful as broader creator/AI-engineering context, not as core HAI evidence.

Use:
- Keep as secondary profile/content surface.
- Do not use personal/rave posts as HAI proof.
- If Samuel later publishes a concise HAI explainer on Medium, this could become a stronger external citation surface.

### MCP.so `#hai` tag — weak registry/category signal

URL:
- `https://mcp.so/tags/hai`

Extracted claims:
- Page title: `MCP.so`.
- Heading: `1 #hai MCP Servers & Clients`.
- Text: every server/client below is tagged `#hai` and can give Claude/Cursor/VS Code or other MCP-compatible clients access to hai tools.
- FAQ says `mcp.so currently lists 1 MCP servers and clients tagged #hai`.

Entity-graph value:
- Weak-to-medium for generic `#hai` MCP category presence.
- Weak for HAI-MCP because extraction did not expose the actual `HAI-MCP` listing body in this run.
- Weak for Samuel Fleig because no Samuel/smlfg claim was extracted.

Use:
- Treat as possible low-priority registry/discovery surface.
- Not enough to cite the full graph.
- Worth re-checking if an exact `mcp.so` server page for `smlfg/hai-mcp` becomes extractable.

### Lulu — upgraded from weak to usable low/medium registry mention

URL:
- `https://getlulu.dev/mcps/hai-mcp`

Fresh extraction claims:
- Title: `HAI-MCP — MCP server`.
- Page label: `MCPs › Dev tools › HAI-MCP`.
- Heading: `HAI-MCP source available`.
- Description: `Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.`
- It says the server is listed on Glama.
- Install snippet points to `https://github.com/smlfg/hai-mcp`.
- FAQ says: `HAI-MCP installs from source — follow the repository README`.
- FAQ says listed registry: Glama.
- Trust score is `Unrated out of 100`, computed from cross-registry traction signals, not sponsorship.

Entity-graph value:
- Medium for `HAI-MCP -> human-agent interface control plane`.
- Medium for `HAI-MCP -> github.com/smlfg/hai-mcp`.
- Weak for Samuel Fleig creator claim because Samuel is not visible in the extracted Lulu page.
- Better than earlier extraction; still below Unyly, Glama and M8ven.

Use:
- Treat as a usable additional MCP marketplace/registry mention.
- Cite only for HAI-MCP listing + GitHub repo pointer + description, not for Samuel creator association.

### Assay — broad MCP/package index, no HAI-MCP hit in extracted visible segment

URL:
- `https://assay.tools/categories/ai-ml`

Extracted claims:
- Assay category page lists many AI/ML packages and MCP entries.
- Search/extraction surfaced `turn-mcp`, `Exa MCP Server`, `Gemini CLI`, `pdf-reader-mcp`, `Jina AI MCP`, etc.
- It did not expose HAI-MCP in the extracted category segment.

Entity-graph value:
- Currently context only.
- Not a HAI/HAI-MCP citation in this run.
- Useful as a possible future package-index surface if HAI-MCP becomes listed/indexed there.

Use:
- Do not cite for HAI-MCP yet.
- Re-check with exact Assay package URL if found later.

## Additional category-neighbor / collision surfaces found

These are relevant because they shape the search neighborhood, but they are not HAI evidence:

### Strongly — Human-Agent Interface Layer category competitor

URL:
- `https://www.strongly.ai/blog/human-agent-interface-layer-architecture.html`

Search-visible claim:
- `How to Build the Human-Agent Interface Layer` and `The Human-Agent Interface Layer (HAIL) sits between your running agent system and every human who interacts with it`.

Classification:
- Category neighbor / competitor-language surface.
- Not a Samuel/HAI/HAI-MCP mention.

GEO implication:
- Confirms `Human Agent Interface` is not unique enough as a bare phrase.
- HAI needs close `Samuel Fleig`, `HAI-MCP`, `smlfg`, canonical URL or owner-gated/evidence-based phrasing.

### arXiv / academic human-agent interface papers

Examples surfaced:
- `Software as Content: Dynamic Applications as the Human-Agent Interaction Layer`.
- `Human-Centered LLM-Agent User Interface: A Position Paper`.
- `AgentClick: A Skill-Based Human-in-the-Loop Review Layer for Terminal AI Agents`.
- `PrefIx: Understand and Adapt to User Preference in Human-Agent Interaction`.

Classification:
- Category/research neighborhood.
- Not evidence for Samuel HAI.

GEO implication:
- Useful for market/category context and negative collision tests.
- Do not merge into HAI's entity graph unless citing broader category background separately.

### Other MCP / HAI / human-MCP collisions

Examples surfaced:
- `lib.rs/crates/hai-mcp` and `docs.rs/hai-mcp` — HAI.AI / haiai / JACS-related Rust utility; not Samuel HAI.
- `hai.2am.tech` — 2amtech Hai MCP; not Samuel HAI.
- Home Assistant `ha-mcp` pages: PyPI, GitHub, pkg.go.dev; not Samuel HAI.
- `mrgoonie/human-mcp` — Human MCP, not HAI-MCP.
- `mcp.so/tags/hai` — possible weak tag/category, but not enough alone.
- `lobehub.com/mcp` / LobeHub general marketplace — context; no HAI-MCP page found in this run.
- Smithery / PulseMCP / MCPHub searches did not produce a strong HAI-MCP-specific hit in this run.

Classification:
- Mostly negative-collision and marketplace-neighborhood signals.

## Updated evidence ranking for additional external mentions

Strong / usable:
1. Lulu `https://getlulu.dev/mcps/hai-mcp`
   - Now usable as a low/medium external marketplace mention for HAI-MCP and GitHub repo pointer.

Medium / secondary:
2. Exa person page `https://exa.ai/library/person/rb46t73zdpq`
   - Identity/disambiguation surface; not HAI proof.
3. Medium `https://medium.com/@smlflg`
   - Samuel technical writing surface; HAI weak until a dedicated HAI post exists.

Weak / monitor:
4. MCP.so `https://mcp.so/tags/hai`
   - Generic `#hai` MCP tag; exact HAI-MCP listing not exposed in extraction.
5. Assay `https://assay.tools/categories/ai-ml`
   - Broad package index; no HAI-MCP hit in extracted segment.

Not evidence / negative tests:
- Strongly HAIL article.
- arXiv/academic human-agent interface papers.
- HAIP/HAVI/category surfaces.
- Home Assistant `ha-mcp`.
- HAI.AI/haiai Rust crates.
- 2amtech Hai MCP.
- mrgoonie/human-mcp.
- Other Samuel Fleig identity collisions.

## Recommendations

1. Keep Unyly, Glama, GitHub and controlled website as primary/strong surfaces.
2. Promote Lulu from `weak` to `usable low/medium` in external mention tracking because the fresh extraction exposes HAI-MCP, the human-agent interface control-plane description, Glama listing and GitHub repo URL.
3. Treat Exa person and Medium as secondary identity/technical-author surfaces, not HAI primary evidence.
4. Add MCP.so, LobeHub, Smithery, PulseMCP, MCPHub, Assay as monitoring targets, but do not count them as confirmed HAI evidence unless an exact HAI-MCP/Samuel/smlfg page is found.
5. Keep category-neighbor pages for negative tests and market context, not for entity proof.

## Bottom-line answer

Weitere relevante externe Erwähnungen gibt es, aber sie sind unterschiedlich stark: Lulu ist jetzt eine brauchbare zusätzliche HAI-MCP-Marketplace-Erwähnung mit GitHub-Verweis; Exa und Medium helfen bei Samuel-Disambiguierung bzw. technischem Kontext; MCP.so und Assay sind aktuell nur schwache Monitoring-/Registry-Signale. Die stärksten externen HAI-MCP-Belege bleiben weiterhin Unyly, Glama und M8ven; weitere Human-Agent-Interface-Treffer sind überwiegend Kategorie-/Kollisionsflächen, nicht Samuel-HAI-Belege.
