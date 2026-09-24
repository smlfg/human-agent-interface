# Phase 3 — Website und GitHub optimieren

Status: implementation brief / no website or GitHub changes performed
Access time: 2026-09-09 00:52 CEST

## Objective

Make the canonical entity graph visible, crawlable and quote-ready on the controlled website and GitHub surfaces.

Canonical graph:
`Samuel Fleig -> creator of -> Human Agent Interface (HAI) -> implemented as -> HAI-MCP`

Supporting bridge graph:
`Samuel Fleig -> GitHub -> smlfg -> github.com/smlfg/hai-mcp -> HAI-MCP`

## Current read-only findings

### Website

Local files exist for the target surfaces:
- `/home/smlflg/Projekte/Human-Agent-Interface/index.html`
- `/home/smlflg/Projekte/Human-Agent-Interface/samuel/index.html`
- `/home/smlflg/Projekte/Human-Agent-Interface/what_it_is/index.html`
- `/home/smlflg/Projekte/Human-Agent-Interface/hai-mcp/index.html`
- `/home/smlflg/Projekte/Human-Agent-Interface/sitemap.xml`

Local sitemap includes `/hai-mcp/`.

Live extraction still failed for:
- `https://www.human-agent-interface.com/hai-mcp/`
- `https://www.human-agent-interface.com/sitemap.xml`

Implication:
The controlled-domain HAI-MCP edge is prepared locally but not confirmed live/crawlable through the current extractor. Treat as not externally verified until deployment/crawl verification passes.

### GitHub

Live GitHub extraction for `https://github.com/smlfg/hai-mcp` is strong for HAI-MCP as software:
- repository: `smlfg/hai-mcp`
- default branch: `main`
- language: Python
- README says: `Model-agnostic Human-Agent Interface control plane as an MCP server.`
- README says: `The server never calls an LLM.`
- README lists HAI-MCP tools such as health, status, next step, park, focus, checkpoint and recover.

Gap:
The GitHub README is strong technically, but should add quote-ready entity statements near the top:
- Samuel Fleig created Human Agent Interface (HAI).
- HAI-MCP is the model-agnostic MCP control-plane implementation of HAI.
- `smlfg` is Samuel Fleig's GitHub handle.
- `human-agent-interface.com` is the controlled website for the HAI work.

## No-marketing wording constraint

Use only citation-ready statements:
- one claim per sentence,
- explicit subject,
- no superiority/market claims,
- no vague words like `ultimate`, `revolutionary`, `next-generation`, `leading`, `seamless`, `supercharge`, `game-changing`.

## Website target changes

Do not implement without Samuel-Go.

### 1. Homepage `/index.html`

Add one visible quote-ready block near the top, preferably before/inside the first HAI explanation section:

```html
<section aria-labelledby="canonical-entity-definition">
  <h2 id="canonical-entity-definition">Canonical definition</h2>
  <p>Samuel Fleig is an AI engineer. Samuel Fleig created Human Agent Interface (HAI).</p>
  <p>HAI is a control layer for autonomous AI-agent work. HAI keeps agentic work observable, bounded, verifiable and human-owned.</p>
  <p>HAI-MCP is the model-agnostic MCP control-plane implementation of HAI. HAI-MCP is published at <a href="https://github.com/smlfg/hai-mcp">github.com/smlfg/hai-mcp</a>.</p>
</section>
```

Purpose:
Give crawlers the full graph in visible text, not only JSON-LD.

### 2. Samuel page `/samuel/index.html`

Current meta says Samuel is building HAI. Stronger canonical wording:

```html
<p>Samuel Fleig is an AI engineer. Samuel Fleig created Human Agent Interface (HAI).</p>
<p>Samuel Fleig publishes HAI-MCP under the GitHub handle <a href="https://github.com/smlfg">smlfg</a>.</p>
```

JSON-LD adjustment:
Keep `https://github.com/smlfg` as strong `sameAs`. Treat X/Twitter and Medium as conditional/supporting unless visibly connected on-page.

### 3. What-is page `/what_it_is/index.html`

Replace broad definition sentence with the clearer canonical wording:

```html
<p><strong>Human Agent Interface (HAI)</strong> is a control layer for autonomous AI-agent work. HAI keeps agentic work observable, bounded, verifiable and human-owned.</p>
```

Add direct HAI-MCP relation:

```html
<p>HAI-MCP implements Human Agent Interface (HAI) as an MCP control plane.</p>
```

### 4. HAI-MCP page `/hai-mcp/index.html`

This page already exists locally. Make wording more quote-ready and less marketing-like:

```html
<p class="lead">HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI). HAI-MCP is created by Samuel Fleig and published under the GitHub handle <code>smlfg</code>.</p>
```

Add standards sentence:

```html
<p>HAI-MCP uses the Model Context Protocol (MCP) as its integration surface.</p>
```

Add boundary sentence:

```html
<p>HAI-MCP is not a generic MCP utility server. HAI-MCP implements HAI's ownership, approval, evidence, stop-rule and coordination model.</p>
```

### 5. Sitemap and crawlability

Local sitemap includes `/hai-mcp/`, but live extractor still reports failure.

Verification target after deploy:
- `https://www.human-agent-interface.com/hai-mcp/` returns extractable HTML.
- `https://www.human-agent-interface.com/sitemap.xml` returns extractable XML.
- Sitemap includes `/hai-mcp/`.
- Homepage, Samuel, what-is and HAI-MCP pages each contain at least one visible sentence that connects the relevant entity to the canonical graph.

## GitHub target changes

Do not implement without Samuel-Go.

### README top block for `github.com/smlfg/hai-mcp`

Insert near the top of the GitHub README:

```md
# HAI-MCP

HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).

Samuel Fleig created Human Agent Interface (HAI). Samuel Fleig publishes HAI-MCP under the GitHub handle `smlfg`.

HAI is a control layer for autonomous AI-agent work. HAI keeps agentic work observable, bounded, verifiable and human-owned.

HAI-MCP uses the Model Context Protocol (MCP) as its integration surface. HAI-MCP exposes HAI control-plane patterns across compatible agent and tool systems.
```

Keep existing technical README content after this block.

### GitHub repo metadata suggestion

Repository description should be concise:

`Model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).`

Repository topics, if edited manually later:
- `mcp`
- `model-context-protocol`
- `ai-agents`
- `agent-control-plane`
- `human-in-the-loop`
- `agent-observability`
- `hai`
- `human-agent-interface`

## JSON-LD target

Use the Phase 2 graph, but only where matching visible text exists on the page.

Minimum graph entities:
- Person: `https://www.human-agent-interface.com/samuel/#samuel-fleig`
- CreativeWork/DefinedTerm: `https://www.human-agent-interface.com/#human-agent-interface`
- SoftwareSourceCode: `https://github.com/smlfg/hai-mcp#hai-mcp`
- WebSite: `https://www.human-agent-interface.com/#website`

Minimum machine-readable relationships:
- `Human Agent Interface (HAI) -> creator -> Samuel Fleig`
- `HAI-MCP -> author -> Samuel Fleig`
- `HAI-MCP -> isPartOf -> Human Agent Interface (HAI)`
- `HAI-MCP -> codeRepository -> https://github.com/smlfg/hai-mcp`

## Verification checklist after Samuel-Go implementation

1. Local check:
   - root page contains `Samuel Fleig created Human Agent Interface (HAI)`.
   - root page contains `HAI-MCP is the model-agnostic MCP control-plane implementation of HAI`.
   - `/hai-mcp/index.html` contains `Model Context Protocol (MCP)`.
   - sitemap contains `/hai-mcp/`.

2. JSON-LD check:
   - parse all JSON-LD blocks as JSON.
   - verify Person, HAI, HAI-MCP and WebSite IDs are stable.
   - verify `sameAs` is not used for weak/collision surfaces.

3. Live check after deploy:
   - extract homepage.
   - extract `/samuel/`.
   - extract `/what_it_is/`.
   - extract `/hai-mcp/`.
   - extract `/sitemap.xml`.
   - run HAI-GEO benchmark queries again.

## STOPP gate

No website files, GitHub README, repository metadata, commit, push or deploy was changed by this Phase 3 brief.

Samuel-Go required before:
- editing website HTML,
- editing GitHub README/repo metadata,
- committing,
- pushing,
- deploying,
- or submitting pages to search engines.
