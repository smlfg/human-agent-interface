# Public Footprint Search — "smlfg" HAI — 2026-09-08

Status: handle + HAI search completed / no external changes
Query focus: `"smlfg" HAI`

## Purpose

Test whether the GitHub handle `smlfg` already resolves to Samuel Fleig's HAI and HAI-MCP footprint, and whether the handle reduces same-name collisions.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Search reliability note

One backend run for exact `"smlfg" HAI` failed with:
`Keyless Exa search failed: Unrecognized MCP response shape.`

This is a measurement/backend gap, not evidence of absence. Broader/rephrased variants returned useful results.

## Strong canonical matches

| URL | Type | Evidence from search | Classification |
| --- | --- | --- | --- |
| `https://unyly.org/mcp/hai-mcp` | external MCP registry | Query `"smlfg" "HAI-MCP"` surfaces Unyly; snippet describes HAI-MCP as a human-agent interface control plane, links `github.com/smlfg/hai-mcp`, and prior extraction states it is created by Samuel Fleig. | strongest full external graph proof |
| `https://glama.ai/mcp/servers/smlfg/hai-mcp` | external MCP registry | Query `"smlfg" "HAI-MCP"` surfaces Glama; title/description includes `HAI-MCP by smlfg`, `Model-agnostic Human-Agent Interface control plane as an MCP server`, and Glama API path for `smlfg/hai-mcp`. | strong handle -> HAI-MCP registry proof |
| `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | external trust/registry page | Query `"smlfg" "HAI-MCP"` surfaces M8ven; snippet: `HAI-MCP (smlfg/hai-mcp)` and describes human-agent interface control plane. | useful handle -> HAI-MCP trust surface |
| `https://github.com/smlfg/hai-mcp` | controlled repo | Appears through registry snippets and previous direct extraction; canonical repo path is embedded in Unyly/Glama/M8ven. | primary controlled repo source |
| `https://github.com/smlfg` | controlled GitHub profile | Earlier `"smlfg" "Human Agent Interface"` searches surfaced `smlfg (Samuel Fleig)` and HAI profile text. | strong Samuel/handle resolver |

## Noise and collisions

| URL / surface | Why it appears | Assessment |
| --- | --- | --- |
| SMFG India Credit / finance pages | `smlfg` is close to `SMFG`, and Hindi `hai` appears as common word. | irrelevant lexical collision |
| archive.org / random OCR | Random strings containing `smlfg` and `hai`. | irrelevant OCR collision |
| Threads random URL containing `SmlFg` | URL slug collision. | irrelevant |
| `arxiv.org/html/2603.20300v1` and HAI conference pages | Query `"smlfg" "Human Agent Interface"` returned generic human/agent-interface content when handle was not strongly matched. | concept collision, not Samuel unless `smlfg`/HAI sources present |
| `humanagent.net`, ACM HAI conference, smolagents docs | Human-agent / HAI generic topic. | not Samuel HAI |

## Search-level assessment

### What this query does well

- `smlfg` is a strong disambiguator when combined with `HAI-MCP`.
- It suppresses most same-name Samuel Fleig collisions because the handle is specific.
- It surfaces the correct external registry cluster: Unyly, Glama, M8ven, GitHub.
- It is especially useful for HAI-MCP identity, repo ownership, and external registry mapping.

### What remains weak

- `"smlfg" HAI` can fail or drift because `HAI` is also a normal word in Hindi and a crowded acronym.
- Without `HAI-MCP` or `Human Agent Interface`, search may return SMFG/finance/OCR junk.
- `smlfg` is a handle, not the legal/person name; controlled sources must explicitly bind `smlfg` to `Samuel Fleig` and HAI.

## GEO implication

`smlfg` is an excellent resolver token, but only in a bundle:

```text
smlfg + Human Agent Interface + HAI-MCP + Samuel Fleig
```

Good answer behavior:
1. Treat `smlfg` as Samuel Fleig's GitHub handle only when connected to `github.com/smlfg`, `human-agent-interface.com`, or `smlfg/hai-mcp`.
2. Use `smlfg/hai-mcp` as a disambiguation anchor for HAI-MCP.
3. Do not treat `SMFG`, Hindi `hai`, OCR noise, or generic HAI conference/content as related.
4. Prefer Unyly/Glama/M8ven only as external registry surfaces; primary authority remains GitHub `smlfg/hai-mcp` and HAI-owned pages.

## Benchmark additions / preserved tests

Recommended query set:

- `"smlfg" HAI`
- `"smlfg" "Human Agent Interface"`
- `"smlfg" "HAI-MCP"`
- `"github.com/smlfg/hai-mcp"`
- `"smlfg" "Samuel Fleig" "Human Agent Interface"`
- Negative: `Is SMFG India Credit related to smlfg HAI?`
- Negative: `Is the ACM HAI conference the same as smlfg HAI?`
- Negative: `Is HAI in Hindi search snippets related to Human Agent Interface by Samuel Fleig?`

## Sources searched / observed

Queries:
- `"smlfg" HAI` — one backend failure
- `"smlfg" "HAI" -site:human-agent-interface.com`
- `"smlfg" "Human Agent Interface"`
- `"smlfg" "HAI-MCP"`

Key observed URLs:
- https://unyly.org/mcp/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp
- https://glama.ai/mcp/servers?query=author%3Asmlfg
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
- https://github.com/smlfg/hai-mcp
- https://github.com/smlfg
- SMFG India Credit result cluster (irrelevant lexical collision)
- https://arxiv.org/html/2603.20300v1
- https://dl.acm.org/doi/proceedings/10.1145/3765766
- http://humanagent.net/
