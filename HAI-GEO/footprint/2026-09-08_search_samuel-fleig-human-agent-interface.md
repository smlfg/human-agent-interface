# Public Footprint Search — "Samuel Fleig" "Human Agent Interface" — 2026-09-08

Status: exact-name + HAI-phrase search completed / no external changes
Query focus: `"Samuel Fleig" "Human Agent Interface"`

## Purpose

Test whether the public web already connects Samuel Fleig directly to Human Agent Interface, and whether the query suppresses same-name collisions better than `"Samuel Fleig"` or `"Samuel Fleig" AI`.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Strong HAI-relevant matches

| URL | Type | Evidence from search | Classification |
| --- | --- | --- | --- |
| `https://github.com/smlfg` | controlled GitHub profile | Result title: `smlfg (Samuel Fleig) · GitHub`; snippet: `AI Engineering student · building Human-Agent Interfaces`; snippet links `[HAI](https://www.human-agent-interface.com/)`; snippet section `Human-Agent Interface`; says `HAI is my attempt to build a better control layer for working with AI.` | strongest controlled profile match |
| `https://www.human-agent-interface.com/samuel/` | controlled primary page | Result title: `About Samuel Fleig | Human Agent Interface`; snippet: `I build Human Agent Interfaces because I needed them myself`; snippet: `I am Samuel Fleig, an AI Engineering student and AI engineer working on agentic systems`. | strongest owned Person+HAI page |
| `https://www.human-agent-interface.com/samuel/why-hai-matters/` | controlled owned page | Result title: `Why HAI matters to me | Samuel Fleig - Human Agent Interface`; snippet: `Why Human Agent Interface matters to Samuel Fleig... human-owned interface for ADHD, overload...`. | strong owned semantic support, needs extraction |
| `https://www.human-agent-interface.com/samuel/timeline/` | controlled proof page | Result title: `AI Builder Timeline - Samuel Fleig - Human Agent Interface`; snippet includes proof/work timeline and `Human-Agent-Interface`. | useful owned proof surface |
| `https://x.com/Samuelflg1` | social profile | Search snippet: `Samuel Fleig (@Samuelflg1)` and `human-agent-interface.com`. | secondary disambiguation |
| `https://x.com/DavidOndrej1/status/2067650017561633148` | external X mention/snippet | Search snippet says: `Samuel Fleig ... Claude and GPT 5.5 for planning Bilding the human-agent-interface.com From Mannheim Germany. human-agent-interface.com. Human Agent Interface.` | external mention / weak but interesting |

## External / registry matches surfaced by stricter variants

| URL | Type | Evidence | Classification |
| --- | --- | --- | --- |
| `https://unyly.org/mcp/hai-mcp` | external MCP registry | Query excluding `site:human-agent-interface.com` surfaced Unyly. Snippet: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.` | strongest full external graph proof |
| `https://glama.ai/mcp/servers/smlfg/hai-mcp` | external MCP registry | Query with `HAI-MCP` surfaced Glama. Snippet: `HAI-MCP Model-agnostic Human-Agent Interface control plane as an MCP server.` | strong HAI-MCP registry, weaker Samuel-name proof |
| `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | external trust/registry page | Query with `HAI-MCP` surfaced M8ven. Snippet: `HAI-MCP (smlfg/hai-mcp) is an MCP server listed on the M8ven Trust Index`; describes human-agent interface control plane. | useful external HAI-MCP footprint |

## Noise / collision results still present

| Surface | Why it appears | Assessment |
| --- | --- | --- |
| `linkedin.com/in/samuel-fleig-b700432b1` | Same-name LinkedIn profile appears even with HAI phrase excluded-site query. | false positive / not canonical |
| `linkedin.com/in/samuel-fleig-1851568b` | Same-name Stark Tech / Digital Power profile appears. | false positive / not canonical |
| `linkedin.com/in/samuel-fleig-52610914b` | Relevant profile appears; snippet is broad and not always HAI-specific. | useful but crawl-limited secondary |
| `humaninterfaces.co/about` | Similar phrase `Human Interfaces`. | not HAI / weak collision |
| Arthur Fleig / ScaDS.AI / CHI / HCI results | Query overlaps with `Human`, `Interface`, `AI`, and surname `Fleig`. | surname/topic collision, not Samuel HAI |
| `haiprotocol.com`, `HumanAssisted/haiai`, HAVI, Human-Agent Protocol papers | Human-agent-interface-like terminology. | concept/acronym collisions, not Samuel's HAI |

## Search-level assessment

### What this query does well

- It strongly surfaces controlled HAI-owned properties.
- GitHub `smlfg` becomes the top profile source and links Samuel to HAI directly.
- `human-agent-interface.com/samuel/`, `/why-hai-matters/`, and `/timeline/` provide multiple owned citation surfaces for Samuel + HAI.
- It reduces generic same-name noise compared with `"Samuel Fleig"`, but does not eliminate it.

### What remains weak

- The query phrase often surfaces `Human-Agent Interface` with hyphen, while the canonical first mention should stay `Human Agent Interface (HAI)`.
- HAI-MCP does not always appear unless explicitly added to the query.
- Excluding `site:human-agent-interface.com` reveals that the external full graph depends heavily on Unyly; Glama/M8ven support HAI-MCP but not Samuel by full name as strongly.
- Same-name LinkedIn collisions still appear in broad backend results.

## GEO implication

This is currently the best broad resolver query for Samuel + HAI. It should be part of every benchmark round.

Good answer behavior:
1. Identify the HAI-relevant Samuel Fleig, not a same-name profile.
2. Cite `github.com/smlfg` and/or `human-agent-interface.com/samuel/` for Samuel + HAI.
3. Describe HAI as a control layer/open-source approach for human-owned agentic work.
4. Mention HAI-MCP only if supported by GitHub/Unyly/Glama/M8ven or HAI-owned HAI-MCP page.
5. Avoid turning `Human Agent Interface` into a generic HCI term.

## Benchmark additions / preserved tests

Recommended query set:

- `"Samuel Fleig" "Human Agent Interface"`
- `"Samuel Fleig" "Human-Agent Interface"`
- `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`
- `"Samuel Fleig" "Human Agent Interface" -site:human-agent-interface.com`
- Negative: `Is Samuel Fleig from Stark Tech the creator of Human Agent Interface?`
- Negative: `Is Human Agent Interface by Samuel Fleig the same as Human-Agent Interaction Protocol?`

## Sources searched / observed

Queries:
- `"Samuel Fleig" "Human Agent Interface"`
- `"Samuel Fleig" "Human Agent Interface" -site:human-agent-interface.com`
- `"Samuel Fleig" "Human-Agent Interface"`
- `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`

Key observed URLs:
- https://github.com/smlfg
- https://www.human-agent-interface.com/samuel/
- https://www.human-agent-interface.com/samuel/why-hai-matters/
- https://www.human-agent-interface.com/samuel/timeline/
- https://x.com/Samuelflg1
- https://x.com/DavidOndrej1/status/2067650017561633148
- https://unyly.org/mcp/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
- https://linkedin.com/in/samuel-fleig-b700432b1
- https://linkedin.com/in/samuel-fleig-1851568b
- https://linkedin.com/in/samuel-fleig-52610914b
- https://haiprotocol.com
- https://github.com/HumanAssisted/haiai
