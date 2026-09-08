# GEO Entity Audit — Samuel Fleig / Human Agent Interface / HAI-MCP

Date: 2026-09-08
Scope: first public-footprint audit and canonical entity patch.

## Target graph

Samuel Fleig
→ creator/developer of → Human Agent Interface (HAI)
→ implemented as → HAI-MCP
→ hosted at → human-agent-interface.com and github.com/smlfg/hai-mcp

## Current public findings

### 1. Samuel Fleig

Search query: `"Samuel Fleig"`

Observed issue: name ambiguity is real. Search results include at least three unrelated/competing entities:

- Samuel Fleig, Sales Engineer / Digital Power, Florida, United States — LinkedIn result.
- Samuel Fleig, Perfect Match Agentur / Partnership Management, Stuttgart — LinkedIn result.
- Samuel Fleig, Hochschule Worms / Applied Computer Science — LinkedIn result matching the target person, but not yet strongly centered on HAI.

Entity risk: a generic query for `Samuel Fleig` can select the wrong person unless the AI/HAI context is present.

Search query: `"Samuel Fleig" AI`

Observed strength: target sources appear. GitHub `smlfg (Samuel Fleig)` and `About Samuel Fleig | Human Agent Interface` both appear in the top results. This means the AI modifier already helps disambiguate.

### 2. Human Agent Interface

Source: https://www.human-agent-interface.com/

Observed strength: the homepage already defines the problem space clearly: agent work creates confusion, HAI turns agent chaos into work a human can still own, and the method focuses on scope, trust, verification, ownership, and human control.

Observed gap before patch: the homepage title and top metadata did not bind the entity strongly enough to the full name `Samuel Fleig`. Samuel was present mostly as navigation/contact context, not as a canonical creator/developer edge above the fold.

### 3. About Samuel page

Source: https://www.human-agent-interface.com/samuel/

Observed strength: this is currently the strongest Samuel ↔ HAI source. It says: `I am Samuel Fleig, an AI Engineering student and AI engineer working on agentic systems, harnesses, and human-owned AI workflows.` It also explains the origin path from SelfAI, agentic systems, harnesses, Sidecar, and HAI.

Observed gap before patch: the page did not mention HAI-MCP in the hero copy and had no machine-readable Person graph connecting Samuel Fleig to HAI and HAI-MCP.

### 4. HAI-MCP GitHub

Source: https://github.com/smlfg/hai-mcp

Observed strength: GitHub describes the repository as a model-agnostic MCP control plane that keeps agentic work inside a mission contract — fail-closed, owner-gated, evidence-based completion. This is technically clear.

Observed gap before patch: the README opening did not say that HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface, and did not identify Samuel Fleig in the first paragraphs. GitHub repo metadata had no homepage and no topics.

### 5. Glama

Source: https://glama.ai/mcp/servers/smlfg/hai-mcp

Observed strength: Glama is already an external crawled registry node for HAI-MCP. It describes HAI-MCP as a model-agnostic Human-Agent Interface control plane as an MCP server and lists available MCP tools.

Observed gap: Glama currently mirrors the older README language. It should improve after GitHub README/metadata changes are pushed and Glama recrawls.

### 6. Collision risk: `HAI-MCP` vs `ha-mcp`

Search query: `"HAI-MCP"`

Observed issue: search results currently return Home Assistant `ha-mcp` packages and repositories above/around target HAI-MCP results. The target needs the full phrase `HAI-MCP Human Agent Interface Samuel Fleig` repeated consistently on GitHub, website, registry entries, and future package metadata.

## Entity map after patch

Samuel Fleig
- `sameAs`: GitHub `smlfg`, X `Samuelflg1`, LinkedIn target profile, Medium `@smlflg`
- knowsAbout: AI agents, agentic systems, AI harnesses, Model Context Protocol, human-agent interaction
- creatorOf: Human Agent Interface, HAI-MCP

Human Agent Interface (HAI)
- canonical URL: https://www.human-agent-interface.com/
- creator: Samuel Fleig
- definition: approach for keeping agentic AI work observable, bounded, verifiable, and human-owned
- implementation: HAI-MCP

HAI-MCP
- repository: https://github.com/smlfg/hai-mcp
- category: model-agnostic Model Context Protocol control-plane server
- creator: Samuel Fleig
- isPartOf: Human Agent Interface

## Canonical descriptions

### Samuel Fleig — 1 sentence

Samuel Fleig is an AI Engineering student and AI engineer building Human Agent Interface (HAI), an approach for keeping agentic AI work observable, bounded, verifiable, and human-owned.

### Samuel Fleig — 50–100 words

Samuel Fleig is an AI Engineering student and AI engineer working on agentic systems, AI harnesses, and human-owned AI workflows. He builds Human Agent Interface (HAI), an approach for turning messy agent work into bounded, observable, verifiable work that a human can still own. His work connects terminal agents, coding agents, mission contracts, owner gates, and evidence-based completion. HAI-MCP is the open-source, model-agnostic MCP control-plane implementation of that approach.

### Human Agent Interface

Human Agent Interface (HAI) is an approach for keeping agentic AI work observable, bounded, verifiable, and human-owned. It focuses on the control layer between human intention and agentic execution: clarifying scope, preserving owner decisions, requiring evidence, and returning one usable next action. Unlike a normal agent framework, HAI is not primarily a system for making agents more autonomous. It is a method for making agent work legible and controllable enough that a human can safely direct, stop, verify, and own it.

### HAI-MCP

HAI-MCP is the open-source, model-agnostic MCP control-plane implementation of Human Agent Interface (HAI). It exposes mission contracts, owner gates, drift checks, evidence-based completion, and related workflow controls through the Model Context Protocol. HAI-MCP does not call an LLM itself; it gives MCP-compatible clients such as Claude Code, Codex, Cursor, Grok, OpenCode, and Hermes a shared control surface for bounded agentic work.

## Implemented changes in this iteration

### Website: homepage

File: `index.html`

- Updated `<title>` to include `Human Agent Interface (HAI) by Samuel Fleig`.
- Updated meta description to bind HAI to Samuel Fleig and the canonical definition.
- Added canonical URL.
- Added OpenGraph URL/title/description.
- Added JSON-LD graph with Person → CreativeWork → SoftwareSourceCode relationships.
- Updated visible hero copy to say HAI was created by Samuel Fleig.
- Updated authority section to explicitly connect Samuel Fleig, HAI, and HAI-MCP.
- Updated footer to include `Human Agent Interface (HAI) by Samuel Fleig`.

### Website: Samuel page

File: `samuel/index.html`

- Updated title to `Samuel Fleig — Creator of Human Agent Interface (HAI)`.
- Updated meta description and OpenGraph metadata.
- Added canonical URL.
- Added JSON-LD Person entity with `creatorOf` links to Human Agent Interface and HAI-MCP.
- Updated visible hero copy to mention HAI-MCP as the open-source MCP control-plane implementation.
- Added visible GitHub link to HAI-MCP.

### Website: crawler basics

Files: `robots.txt`, `sitemap.xml`

- Added permissive robots file.
- Explicitly allowed `OAI-SearchBot`.
- Added sitemap entries for homepage, Samuel page, Proof, Product, Sidecar, and Tripwire Map.

### GitHub README

Repo: `/home/smlflg/Projekte/hai-mcp-installed`
File: `README.md`

- Updated opening paragraphs to define HAI-MCP as the open-source MCP control-plane implementation of Human Agent Interface.
- Added Samuel Fleig as creator in the first paragraph.
- Added canonical website and About Samuel links.

### GitHub repository metadata

Repo: `smlfg/hai-mcp`

- Set homepage URL to `https://www.human-agent-interface.com/`.
- Updated repo description to bind HAI-MCP, Human Agent Interface, and Samuel Fleig.
- Added topics: `agent-control`, `agentic-ai`, `ai-agents`, `mcp-server`, `model-context-protocol`, `human-agent-interface`, `owner-gates`.

### Citation asset seed

File: `what_it_is/index.html`

- Created a compact canonical page answering `What is Human Agent Interface (HAI)?`.
- Repaired the existing homepage navigation target `./what_it_is/`.
- Linked the page to Samuel, Proof, and HAI-MCP GitHub.

### Benchmark catalog

File: `GEO_BENCHMARK_CATALOG.json`

- Added 20 fixed English/German GEO queries.
- Added score fields for entity resolution, association, citations, wrong-person selection, and hallucination.

## Verification performed

- Parsed homepage and Samuel page HTML with Python `HTMLParser`.
- Parsed JSON-LD blocks with `json.loads`.
- Parsed `sitemap.xml` with `xml.etree.ElementTree`.
- Verified benchmark JSON loads and contains 20 queries.
- Verified GitHub repo metadata via `gh repo view smlfg/hai-mcp --json ...` after the update.

## Remaining gaps

1. Local website changes are not committed or pushed yet.
2. HAI-MCP README changes are local only; GitHub public README will not update until commit/push.
3. Glama will likely keep older README wording until GitHub changes are public and Glama recrawls.
4. LinkedIn and X still need manual/public profile edits to align headline/bio with the canonical definition.
5. The previously missing `./what_it_is/` nav target has been created as a compact canonical definition page. It still needs deployment and later expansion with stronger evidence/examples.
6. HAI still needs a deeper long-form version of `What is a Human Agent Interface?` with examples, diagrams, and failure cases.

## Next highest-leverage action

Push the local Website + README entity patches through the normal Git workflow, then request recrawl/indexing for the homepage, `/samuel/`, and GitHub/Glama surfaces.


## Independent validator follow-up

Validator verdict: partially passed. Local patches strengthen the target graph, but public GEO effect is blocked until website and README changes are committed, pushed, and deployed.

Follow-up fixes applied locally after validation:

- Replaced non-standard `creatorOf` in `samuel/index.html` JSON-LD with `@reverse.creator`.
- Reworked `GEO_BENCHMARK_CATALOG.json` queries from plain strings into objects with `id`, `language`, `query_type`, `query`, `expected_entities`, and `expected_graph`.

Still blocked on explicit owner approval for commit/push/deploy.
