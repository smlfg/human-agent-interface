# Public Footprint Search — `site:github.com/smlfg` — 2026-09-08

Status: GitHub-site search completed / no external changes
Query focus: `site:github.com/smlfg`

## Purpose

Test how strongly GitHub-owned surfaces under `github.com/smlfg` identify Samuel Fleig, Human Agent Interface (HAI), and HAI-MCP.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Search variants

- `site:github.com/smlfg`
- `site:github.com/smlfg "Human Agent Interface" OR "HAI-MCP"`
- `site:github.com/smlfg "Samuel Fleig"`
- `site:github.com/smlfg "hai-mcp"`

## Directly extracted GitHub evidence

### GitHub profile

URL: `https://github.com/smlfg`

Extracted content:

```text
Samuel Fleig (smlfg)

AI Hungry student
```

Assessment:
- Strong controlled identity anchor for `smlfg -> Samuel Fleig`.
- Weak by itself for HAI unless paired with repository/profile snippets.
- Useful as disambiguator against same-name Samuel Fleig collisions.

### HAI-MCP repository

URL: `https://github.com/smlfg/hai-mcp`

Extracted title:

```text
GitHub - smlfg/hai-mcp: Open-source MCP control-plane implementation of Human Agent Interface (HAI) by Samuel Fleig — mission contracts, owner gates, evidence-based completion.
```

Extracted README lead:

```text
HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.

Human Agent Interface is an approach for keeping agentic AI work observable, bounded, owner-gated, and evidence-based so a human can still own the work. HAI-MCP implements that approach as a model-agnostic Model Context Protocol (MCP) server.
```

Extracted canonical links:

```text
Canonical website: https://www.human-agent-interface.com/
About Samuel Fleig: https://www.human-agent-interface.com/samuel/
```

Assessment:
- Very strong controlled primary-source proof for the full graph.
- This is currently one of the cleanest public machine-readable/crawlable sources for `Samuel Fleig -> Human Agent Interface (HAI) -> HAI-MCP`.
- Better than generic `Human Agent Interface` searches because repository path and owner handle reduce ambiguity.

## Search-result evidence

### `site:github.com/smlfg`

Observed result:

| Position | URL | Title | Description | Classification |
| --- | --- | --- | --- | --- |
| 1 | `https://github.com/smlfg` | `smlfg - Overview` | `Samuel Fleig (smlfg) — AI Hungry student` | strong identity anchor |

Assessment:
- Exact GitHub-site query currently surfaces the profile first.
- Good for identity, but too narrow to expose HAI-MCP unless the repo is queried explicitly.

### `site:github.com/smlfg "Human Agent Interface" OR "HAI-MCP"`

Observed relevant result:

| Position | URL | Title | Description | Classification |
| --- | --- | --- | --- | --- |
| 1 | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | `HAI-MCP by smlfg | Glama` | Includes `HAI-MCP`, `Model-agnostic Human-Agent Interface control plane as an MCP server`, and `by smlfg`. | external registry result despite site query syntax |
| 3 | `https://github.com/HumanAssisted/haiai` | HAI.AI SDK | Different HAI.AI project. | collision |
| 4 | `https://github.com/CoWork-Human-Agent-Protocol/cowork-protocol` | COWORK protocol | Human-Agent Interaction / HAI acronym context, not Samuel HAI. | concept collision |
| 6 | `https://github.com/mrgoonie/human-mcp` | Human MCP | Human capabilities for AI agents, not HAI-MCP. | adjacent collision |
| 7 | `https://github.com/hcompai/hai-agents-python` | H Company `hai` SDK | H Company's Computer-Use Agent API. | HAI acronym collision |

Assessment:
- Some search backends treat `site:github.com/smlfg` loosely and still return non-`github.com/smlfg` results.
- Registry pages can surface stronger than the GitHub repo in certain combinations.
- Collision handling remains required.

### `site:github.com/smlfg "Samuel Fleig"`

Observed result:

```text
no web results returned by backend
```

Assessment:
- Not evidence of absence; direct extraction confirms GitHub profile and repo include Samuel Fleig.
- This should be treated as search-backend weakness / indexing specificity issue.

### `site:github.com/smlfg "hai-mcp"`

Observed results:

| Position | URL | Title | Description | Classification |
| --- | --- | --- | --- | --- |
| 1 | `https://github.com/smlfg` | `smlfg (Samuel Fleig) · GitHub` | Includes top repositories and profile details. | strong identity + repo cluster anchor |
| 2 | `https://github.com/smlfg/hai-mcp` | `smlfg/hai-mcp` | `Model-agnostic Human-Agent Interface control plane as an MCP server.` | strong repo/entity anchor |

Assessment:
- This is the strongest GitHub-site query variant.
- `site:github.com/smlfg "hai-mcp"` reliably exposes both the profile and the HAI-MCP repo.

## GEO assessment

### Strengths

- GitHub profile provides controlled binding: `smlfg -> Samuel Fleig`.
- HAI-MCP repo provides controlled full graph: `HAI-MCP -> Human Agent Interface (HAI) -> Samuel Fleig`.
- Repo README contains canonical outbound links to the HAI website and Samuel profile page.
- GitHub is a high-authority primary source for software identity.

### Weaknesses

- Bare `site:github.com/smlfg` surfaces profile only; not enough to teach full HAI graph.
- `site:` behavior varies by backend; some results ignore strict domain/path intent.
- GitHub profile description `AI Hungry student` is weaker and less canonical than the HAI owner wording.
- Search backends may miss `site:github.com/smlfg "Samuel Fleig"` even though extraction proves the text exists.

## Recommended canonical resolver bundle

For measurement and future GEO checks, use:

```text
site:github.com/smlfg "hai-mcp"
site:github.com/smlfg "Human Agent Interface"
site:github.com/smlfg/hai-mcp "Samuel Fleig"
site:github.com/smlfg/hai-mcp "Human Agent Interface"
```

Expected good answer:

```text
The GitHub profile `smlfg` identifies Samuel Fleig. The repository `github.com/smlfg/hai-mcp` describes HAI-MCP as the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig, and links to the canonical HAI website and Samuel profile.
```

Expected bad answer:

```text
HAI means HAI.AI, Home Assistant MCP, the ACM Human-Agent Interaction conference, or H Company's HAI SDK.
```

## Sources

Directly extracted:
- https://github.com/smlfg
- https://github.com/smlfg/hai-mcp

Searched:
- `site:github.com/smlfg`
- `site:github.com/smlfg "Human Agent Interface" OR "HAI-MCP"`
- `site:github.com/smlfg "Samuel Fleig"`
- `site:github.com/smlfg "hai-mcp"`
