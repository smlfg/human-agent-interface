# Public Footprint Search — "HAI-MCP" — 2026-09-08

Status: exact HAI-MCP search completed / no external changes
Query focus: `"HAI-MCP"`

## Purpose

Test whether the exact software/entity name `HAI-MCP` resolves to Samuel Fleig's MCP control-plane implementation of Human Agent Interface, and identify package/registry collisions.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Strong canonical matches

| URL | Type | Evidence from search | Classification |
| --- | --- | --- | --- |
| `https://unyly.org/mcp/hai-mcp` | external MCP registry | Top result for `"HAI-MCP"`; snippet says HAI provides a human-agent interface control plane across MCP-compatible clients and links GitHub. Prior extraction gives full statement: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.` | strongest full external graph proof |
| `https://glama.ai/mcp/servers/smlfg/hai-mcp` | external MCP registry | Top/near-top result; title `HAI-MCP by smlfg`; snippet: `Model-agnostic Human-Agent Interface control plane as an MCP server`; notes server never calls an LLM. | strong HAI-MCP registry; Samuel resolved via `smlfg`, not full name |
| `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh` | external trust/registry page | Search result: `HAI-MCP (smlfg/hai-mcp) is an MCP server listed on the M8ven Trust Index`; describes human-agent interface control plane; links GitHub/Glama. | useful HAI-MCP footprint/trust surface |
| `https://github.com/smlfg/hai-mcp` | controlled repo | Appears in related HAI-MCP/smlfg searches; canonical code repository for Samuel's HAI-MCP. | primary controlled source, should be strengthened as top HAI-MCP citation |

## Related canonical-support surfaces

| URL | Type | Evidence | Assessment |
| --- | --- | --- |
| `https://glama.ai/mcp/servers?query=author%3Asmlfg` | external registry author view | Search result: `MCP Servers by smlfg`; lists HAI-MCP. | useful author/registry linkage |
| `https://www.human-agent-interface.com/samuel/` | controlled Samuel page | Query variant `"HAI-MCP" "Human Agent Interface" "Samuel Fleig"` surfaced Samuel page, but not necessarily HAI-MCP content. | useful for Samuel, insufficient HAI-MCP proof unless page text includes HAI-MCP |

## Major collision / false-positive results

| URL / surface | Evidence from search | Why not canonical HAI-MCP |
| --- | --- | --- |
| `https://docs.rs/hai-mcp/...` | Rust docs for a different `hai_mcp`; uses `haiai::{HaiClient...}` and HAI.AI/JACS context. | Different HAI.AI/haiai ecosystem, not Samuel's Python HAI-MCP. |
| `https://lib.rs/crates/hai-mcp` | `hai-mcp HAI.AI MCP server library`; maintainer/package around haiai/JACS; says standalone binary deprecated. | Strong name collision; not Samuel's `smlfg/hai-mcp`. |
| `https://crates.io/crates/haiai`, `https://docs.rs/crate/haiai/latest`, `https://lib.rs/crates/haiai` | HAI.AI Rust SDK / JACS / signed email / verified benchmarks. | Acronym/platform collision; not Human Agent Interface by Samuel. |
| `https://pypi.org/project/ha-mcp/` and version pages | Home Assistant MCP server; package name is `ha-mcp`, not `HAI-MCP`, but search can confuse it. | High-risk near-string collision, very established compared with HAI-MCP. |
| `https://benchgecko.ai/mcp/ha-mcp` | BenchGecko for Home Assistant `ha-mcp`, 2k+ stars. | Strong external collision; engines may select it if hyphen/I letter ignored. |
| `https://github.com/homeassistant-ai/ha-mcp-integration` | Home Assistant custom component mirror. | Home Assistant ecosystem, not HAI. |
| `https://mcp.so/server/hai-mcp-server/avacx` / `mcp.so/ja/server/hai-mcp-server/avacx` | Tencent Cloud HAI/Hunyuan AI MCP server. | Different HAI acronym; not Samuel/HAI. |
| `https://mcpobservatory.com/servers/mcpso:avacx/hai-mcp-server` | Observability entry for avacx/hai-mcp-server. | Different maintainer/project. |
| `https://npmjs.com/package/@2amtech/hai` / `https://hai.2am.tech/robots.txt` | Helper AI (HAI) CLI/MCP for Jira/Confluence specs. | Different `HAI` product; not Samuel's Human Agent Interface. |

## Search-level assessment

### What this query does well

- Exact `"HAI-MCP"` strongly surfaces the correct external registries: Unyly, Glama, M8ven.
- HAI-MCP is publicly discoverable as an MCP server/control plane.
- Glama and M8ven connect it to `smlfg/hai-mcp`; Unyly is the strongest source for the full Samuel -> HAI -> HAI-MCP graph.

### What remains weak

- The controlled GitHub repo is not always the first result in generic search snippets; external registries may outrank it.
- Samuel Fleig full-name association is not consistently present except through Unyly or broader variants.
- The string `hai-mcp` is collision-heavy across Rust/HAI.AI, Home Assistant `ha-mcp`, Tencent HAI, and other MCP directories.
- Some search backends failed for `"HAI-MCP" "smlfg"`; treat as measurement gap, not absence.

## GEO implication

For HAI-MCP, the core work is disambiguation and primary-source strengthening:

1. Controlled repo and HAI-owned page should start with: `HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
2. HAI-MCP should consistently link to `human-agent-interface.com`, `/samuel/`, GitHub `smlfg`, Glama and Unyly.
3. JSON-LD should type HAI-MCP as `SoftwareSourceCode` and bind `creator` to Samuel Fleig and `isPartOf` to Human Agent Interface (HAI).
4. Negative tests must penalize engines that confuse HAI-MCP with Home Assistant `ha-mcp`, HAI.AI/haiai, Tencent HAI, or 2amtech Helper AI.

## Benchmark additions / preserved tests

Recommended query set:

- `"HAI-MCP"`
- `"HAI-MCP" "smlfg"`
- `"HAI-MCP" "Human Agent Interface"`
- `"HAI-MCP" "Samuel Fleig"`
- `"HAI-MCP" "Human Agent Interface" "Samuel Fleig"`
- Negative: `Is HAI-MCP the same as ha-mcp Home Assistant?`
- Negative: `Is HAI-MCP the same as HAI.AI haiai?`
- Negative: `Is HAI-MCP the Tencent Cloud HAI MCP server?`
- Negative: `Is HAI-MCP the @2amtech/hai Helper AI MCP server?`

## Sources searched / observed

Queries:
- `"HAI-MCP"`
- `"HAI-MCP" -site:human-agent-interface.com`
- `"HAI-MCP" "smlfg"` — backend error in one run, not conclusive
- `"HAI-MCP" "Human Agent Interface" "Samuel Fleig"`

Key observed URLs:
- https://unyly.org/mcp/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp
- https://glama.ai/mcp/servers?query=author%3Asmlfg
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
- https://github.com/smlfg/hai-mcp
- https://docs.rs/hai-mcp/latest/src/hai_mcp/context.rs.html
- https://lib.rs/crates/hai-mcp
- https://crates.io/crates/haiai
- https://pypi.org/project/ha-mcp/
- https://benchgecko.ai/mcp/ha-mcp
- https://github.com/homeassistant-ai/ha-mcp-integration
- https://mcp.so/server/hai-mcp-server/avacx
- https://mcpobservatory.com/servers/mcpso:avacx/hai-mcp-server
- https://npmjs.com/package/@2amtech/hai
- https://hai.2am.tech/robots.txt
