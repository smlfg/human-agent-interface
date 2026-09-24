# Public Footprint Search — relevant combinations and variants — 2026-09-08

Status: combination/variant search completed / no external changes
Scope: Samuel Fleig, `smlfg`, Human Agent Interface (HAI), HAI-MCP, controlled website, GitHub, external registries, collision surfaces

## Purpose

Test which query combinations produce the canonical entity graph reliably, and which variants drift into collisions.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Queries executed in this batch

Strong graph combinations:
- `"Samuel Fleig" "HAI-MCP"`
- `"Samuel Fleig" "smlfg" "HAI-MCP"`
- `"Human Agent Interface" "Samuel Fleig" "smlfg"`
- `"Human-Agent Interface" "Samuel Fleig"`
- `"Human Agent Interface" "owner-gated"`
- `"HAI-MCP" "owner-gated" "Samuel Fleig"`
- `"Human Agent Interface" "created by Samuel Fleig"`
- `"smlfg/hai-mcp" "Human Agent Interface"`
- `"human-agent-interface.com/samuel" "HAI"`
- `"Samuel Fleig" "owner-gated"`

## Strong canonical results

| Query | Strong result | What it proves | Classification |
| --- | --- | --- | --- |
| `"Samuel Fleig" "HAI-MCP"` | `https://github.com/smlfg/hai-mcp` | HAI-MCP repo surfaced directly; snippet describes model-agnostic MCP control plane and owner-gated/evidence-based completion. | strong primary source |
| `"Samuel Fleig" "HAI-MCP"` | `https://www.linkedin.com/in/samuel-fleig-52610914b` | Samuel's LinkedIn profile/post cluster mentions HAI leaving laptop/head at KI-Festival, humanagentinterface, AI agents, AI Engineering. | useful person/social proof |
| `"Samuel Fleig" "smlfg" "HAI-MCP"` | `https://unyly.org/mcp/hai-mcp` | Unyly snippet reconstructs HAI-MCP, `github.com/smlfg/hai-mcp`, Human Agent Interface, and created by Samuel Fleig. | strongest external full graph proof |
| `"smlfg/hai-mcp" "Human Agent Interface"` | `https://glama.ai/mcp/servers/smlfg/hai-mcp` | Glama describes HAI-MCP as model-agnostic Human-Agent Interface control plane and exposes `smlfg/hai-mcp`. | strong registry proof |
| `"smlfg/hai-mcp" "Human Agent Interface"` | `https://getlulu.dev/mcps/hai-mcp` | Lulu repeats `smlfg/hai-mcp` and human-agent interface control plane. | secondary registry proof |
| `"human-agent-interface.com/samuel" "HAI"` | `https://www.human-agent-interface.com/samuel/` | Controlled Samuel page states Samuel builds Human Agent Interfaces, is AI Engineering student/AI engineer, and connects HAI to bounded/verifiable human-owned agent work. | strong controlled identity + HAI proof |
| `"human-agent-interface.com/samuel" "HAI"` | `https://www.human-agent-interface.com/samuel/why-hai-matters/` | Controlled personal rationale page explains why HAI exists and ties it to agentic overload, owner decisions, evidence, stop/park/do-next decisions. | strong narrative/citation surface |
| `"human-agent-interface.com/samuel" "HAI"` | `https://www.human-agent-interface.com/samuel/timeline/` | Controlled builder timeline supports AI builder/process context. | supporting proof |
| `"Human Agent Interface" "owner-gated"` | `https://strongly.ai/blog/human-agent-interface-layer-architecture.html` and Augment/agent-interface-type pages | Confirms broader category language is crowded around HAI/HAIL/HITL/agent interface layers. | category context, not Samuel HAI |

## Weak or failed variants

| Query | Result | Assessment |
| --- | --- | --- |
| `"Human Agent Interface" "created by Samuel Fleig"` | Backend failure: Keyless Exa response-shape error. | Measurement gap, not evidence of absence. Direct GitHub extraction already confirms the exact semantic relation. |
| `"Human-Agent Interface" "Samuel Fleig"` | Returns Samuel-Fleig same-name LinkedIn collision first; Unyly second; humanagent.net and unrelated design pages also appear. | Hyphen variant is weaker than unhyphenated canonical phrase. |
| `"Samuel Fleig" "owner-gated"` | Mostly same-name LinkedIn collisions; relevant Samuel profile at position 3, but no clean HAI-MCP result in top positions. | `owner-gated` alone is not a useful Samuel resolver. |
| `"Human Agent Interface" "owner-gated"` | Strong category/theory results, but not necessarily Samuel/HAI. | Useful for market/category context, weak for entity resolution. |

## Collision surfaces observed

### Same-name Samuel Fleig collisions

- `linkedin.com/in/samuel-fleig-1851568b` — Sales Engineer / Digital Power, Stark Tech / building automation, USA.
- `linkedin.com/in/samuel-fleig-b700432b1` — Partnership Management, Perfect Match Agentur, Stuttgart.
- Other same-name LinkedIn variants and film/journalism surfaces from previous searches.

These must not be treated as HAI/Samuel unless connected to `smlfg`, `human-agent-interface.com`, HAI, HAI-MCP, AI Engineering, or agentic systems.

### HAI / human-agent category collisions

- Strongly.AI Human-Agent Interface Layer / HAIL.
- AugmentCode Agent Handoff / Human-Agent Interface Guide.
- agentinterface.app generic agent-interface category page.
- ACM Human-Agent Interaction / HAI conference.
- arXiv LAUI / SaC / human-agent interaction papers.
- HAI.AI / HumanAssisted `haiai`.
- H Company `hai-agents-python`.
- Home Assistant `ha-mcp`.
- Generic humanagent.net.

These are useful as market/category neighbors, not as evidence for Samuel's HAI unless they cite or link the canonical graph.

## Ranking of best resolver queries

1. `site:github.com/smlfg "hai-mcp"`
   - Best GitHub-owned resolver: profile + repo.
2. `"Samuel Fleig" "HAI-MCP"`
   - Good direct bridge from person name to software entity.
3. `"Samuel Fleig" "smlfg" "HAI-MCP"`
   - Good disambiguation bundle; Unyly likely appears strongly.
4. `"smlfg/hai-mcp" "Human Agent Interface"`
   - Strong repo/registry bundle.
5. `"human-agent-interface.com/samuel" "HAI"`
   - Strong controlled-source bundle.
6. `"Samuel Fleig" "Human Agent Interface"`
   - Strong broad resolver, but HAI-MCP may require extra term.
7. `"Human Agent Interface" "created by Samuel Fleig"`
   - Semantically ideal, but current backend failed in this run; keep for manual/engine benchmark.
8. `"Human-Agent Interface" "Samuel Fleig"`
   - Hyphen variant should be tracked, but currently weaker/noisier.
9. `"Human Agent Interface" AI`
   - Useful category-pressure test; not safe as entity proof.
10. `"smlfg" HAI`
   - Useful but noisy due to `SMFG` and Hindi `hai`; bundle with `HAI-MCP` or GitHub.

## GEO implications

### What engines can already learn

- GitHub repo and Unyly can teach the complete graph.
- Controlled Samuel pages can teach the person -> HAI relationship.
- Registry cluster can teach `smlfg/hai-mcp` as MCP server/control plane.
- LinkedIn/social posts can reinforce real-world/public Samuel + HAI activity.

### What engines may still get wrong

- Treat `Human Agent Interface` as a generic class rather than Samuel's named HAI entity.
- Treat `HAI-MCP` as a `ha-mcp` / HAI.AI / H Company / Home Assistant collision.
- Pick the wrong Samuel Fleig from LinkedIn/search results.
- Recognize `smlfg` but fail to bind it to full legal/person name and HAI.

## Recommended controlled-source reinforcement

No external action taken. Future content changes should make the following visible and crawlable on controlled pages and repos:

```text
Samuel Fleig is the creator/developer of Human Agent Interface (HAI).
Human Agent Interface (HAI) is an open-source approach/control layer for observable, bounded, verifiable, human-owned agentic AI work.
HAI-MCP is the model-agnostic MCP control-plane implementation of HAI.
The canonical implementation is github.com/smlfg/hai-mcp.
The GitHub handle smlfg identifies Samuel Fleig.
```

Recommended placement:
- HAI homepage first screen / about section.
- `/samuel/` first paragraph.
- `/hai-mcp/` first paragraph, title, meta description, JSON-LD.
- GitHub profile bio/readme if available.
- `github.com/smlfg/hai-mcp` README and repo description.

## Benchmark additions

Add/preserve these as repeatable combination tests:

Positive:
- `"Samuel Fleig" "HAI-MCP"`
- `"Samuel Fleig" "smlfg" "HAI-MCP"`
- `"smlfg/hai-mcp" "Human Agent Interface"`
- `site:github.com/smlfg "hai-mcp"`
- `"human-agent-interface.com/samuel" "HAI"`
- `"Human Agent Interface" "created by Samuel Fleig"`

Disambiguation:
- `"Human-Agent Interface" "Samuel Fleig"`
- `"smlfg" HAI`
- `"Samuel Fleig" "owner-gated"`

Negative/collision:
- `Is HAI-MCP the same as Home Assistant ha-mcp?`
- `Is HAI.AI/haiai the same as Human Agent Interface by Samuel Fleig?`
- `Is the ACM HAI conference the same as Samuel Fleig's HAI?`
- `Which Samuel Fleig created Human Agent Interface?`

## Sources observed in this batch

Canonical/positive:
- https://github.com/smlfg/hai-mcp
- https://github.com/smlfg
- https://unyly.org/mcp/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp
- https://getlulu.dev/mcps/hai-mcp
- https://www.human-agent-interface.com/samuel/
- https://www.human-agent-interface.com/samuel/why-hai-matters/
- https://www.human-agent-interface.com/samuel/timeline/
- https://www.linkedin.com/in/samuel-fleig-52610914b
- https://medium.com/@smlflg

Collision/context:
- https://strongly.ai/blog/human-agent-interface-layer-architecture.html
- https://www.augmentcode.com/guides/agent-handoff-patterns-human-agent-interface
- https://agentinterface.app/
- https://github.com/HumanAssisted/haiai
- https://github.com/hcompai/hai-agents-python
- https://pypi.org/project/ha-mcp/
- https://dl.acm.org/doi/proceedings/10.1145/3765766
- https://arxiv.org/html/2405.13050
- https://arxiv.org/html/2603.21334
- https://linkedin.com/in/samuel-fleig-1851568b
- https://linkedin.com/in/samuel-fleig-b700432b1
