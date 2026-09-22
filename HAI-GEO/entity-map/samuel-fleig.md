# Entity Card — Samuel Fleig

Status: entity-card draft / no external changes
Access time: 2026-09-09 00:22 CEST

## Entity

Name: Samuel Fleig
Type: Person
Canonical ID: `person:samuel-fleig`
Primary role: AI engineer; creator/developer of Human Agent Interface (HAI)
Bridge handle: `smlfg`
Controlled person URL: `https://www.human-agent-interface.com/samuel/`
Controlled source repo: `https://github.com/smlfg/hai-mcp`

## Canonical description

Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach for keeping agentic AI work observable, bounded, verifiable, and human-owned. HAI-MCP is its model-agnostic MCP control-plane implementation.

## Outgoing relations

| Relation | Target entity | Confidence | Strongest sources | Notes |
|---|---|---|---|---|
| `creator/developer of` | Human Agent Interface (HAI) | strong | `/samuel/`, `/samuel/why-hai-matters/`, GitHub repo, Unyly | Strong controlled + external relation. |
| `uses/publishes as` | `smlfg` | strong | GitHub profile, GitHub repo, Glama author view | Handle is bridge, not replacement for person. |
| `created/maintains` | HAI-MCP | strong when paired with HAI | GitHub repo, Unyly | Full relation should be phrased as HAI-MCP implementing HAI. |
| `has controlled domain context` | human-agent-interface.com | strong | `/samuel/`, homepage, what-it-is | Domain supports HAI/Samuel, weaker for HAI-MCP until `/hai-mcp/` fixed. |

## Incoming relations

| Source entity | Relation | Confidence | Notes |
|---|---|---|---|
| GitHub `smlfg` | identifies / resolves | strong | Best technical identity resolver. |
| Unyly `mcp/hai-mcp` | names as creator | strong | Strongest external full-graph corroboration. |
| Glama author search | author bridge | medium/strong | Dynamic registry view; use as bridge, not sole proof. |
| LinkedIn HAI/IPAI post | social/event mention | medium | Secondary only; extraction can be unstable. |
| Exa person page | identity context | medium | Samuel-only, not HAI proof. |
| Medium `@smlflg` | technical author context | medium | No strong HAI wording in current audit. |

## Disambiguation rules

Safe positive resolver bundle:
`Samuel Fleig` + `smlfg` + `Human Agent Interface (HAI)` + `HAI-MCP` + `github.com/smlfg/hai-mcp` or `human-agent-interface.com`

Unsafe as standalone resolver:
`Samuel Fleig`

Why:
Name-only search produced same-name people in LinkedIn/professional, university, sports, filmography and alumni contexts. Do not merge those into this entity unless HAI, `smlfg`, AI Engineering, HAI-MCP or canonical domain context is visible.

## JSON-LD draft shape

```json
{
  "@type": "Person",
  "@id": "https://www.human-agent-interface.com/samuel/#samuel-fleig",
  "name": "Samuel Fleig",
  "description": "Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach for keeping agentic AI work observable, bounded, verifiable, and human-owned.",
  "url": "https://www.human-agent-interface.com/samuel/",
  "sameAs": [
    "https://github.com/smlfg",
    "https://medium.com/@smlflg",
    "https://www.linkedin.com/in/samuel-fleig-52610914b"
  ],
  "knowsAbout": [
    "Human Agent Interface (HAI)",
    "HAI-MCP",
    "agentic AI work",
    "MCP control planes"
  ]
}
```

## Do not link as sameAs

- Other Samuel Fleig profiles without HAI/AI/smlfg/domain context.
- Home Assistant `ha-mcp` pages.
- HAI.AI / haiai / Rust `hai-mcp` pages.
- HAIP / Human-Agent Interaction Protocol.
- HAVI / Human-Agent Visual Interface.
- Generic human-agent-interface category/research pages.

## Status

Samuel Fleig is a strong entity when resolved via `smlfg`, controlled Samuel page, GitHub repo and Unyly. He is weak/ambiguous when searched name-only.
