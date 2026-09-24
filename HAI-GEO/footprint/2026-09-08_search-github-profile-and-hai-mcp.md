# Public Footprint Search — GitHub profile and HAI-MCP — 2026-09-08

Status: GitHub profile + HAI-MCP investigation completed / no external changes
Targets:
- `https://github.com/smlfg`
- `https://github.com/smlfg/hai-mcp`

## Purpose

Audit whether Samuel Fleig's GitHub profile and the HAI-MCP repository currently expose the canonical entity graph clearly enough for search engines and generative answer engines.

Canonical target:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Sources directly extracted

- https://github.com/smlfg
- https://github.com/smlfg/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp

Attempted but rate-limited in this run:
- https://unyly.org/mcp/hai-mcp — Firecrawl 429
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh — Firecrawl 429

Search snippets still surfaced Unyly and M8ven for the HAI-MCP cluster, so they remain valid search-observed registry surfaces in this run.

## Searches run

- `"github.com/smlfg" "HAI-MCP" "Samuel Fleig"`
- `"github.com/smlfg/hai-mcp" "Human Agent Interface" "Samuel Fleig"`
- `"smlfg/hai-mcp" "created by Samuel Fleig"`
- `"smlfg" "HAI-MCP" "Human Agent Interface"`

## GitHub profile evidence

URL: `https://github.com/smlfg`

Directly extracted profile identity:

```text
Samuel Fleig    smlfg
AI Hungry student
```

Directly extracted profile README lead:

```text
Samuel Fleig
AI Engineering student · building Human-Agent Interfaces
```

Directly extracted profile README summary:

```text
I build systems for working with AI agents without giving away human ownership.

My work sits between agent orchestration, context systems, verification loops,
and AI-native learning tools. I care less about making agents appear autonomous
and more about making human intent executable, inspectable, and recoverable.
```

Directly extracted HAI section:

```text
HAI is my attempt to build a better control layer for working with AI.

Explore the project at human-agent-interface.com.
```

Directly extracted build principles:

```text
Context before action.
Small scopes before broad refactors.
Evidence before confident claims.
A green tool output is not automatically a finished outcome.
Human approval matters when a decision has real consequences.
```

Assessment:
- Strong controlled binding of handle to person: `smlfg -> Samuel Fleig`.
- Strong controlled binding of person to AI Engineering and Human-Agent Interfaces.
- Strong semantic match with HAI values: human ownership, context, verification, scoped work, approval.
- Profile now functions as a good public resolver for same-name collisions.
- Profile could be stronger if it explicitly mentioned `HAI-MCP` in the top README area.

## HAI-MCP GitHub repository evidence

URL: `https://github.com/smlfg/hai-mcp`

Directly extracted repository title/about:

```text
Model-agnostic MCP control plane that keeps agentic work inside a mission contract — fail-closed, owner-gated, evidence-based completion.
```

Directly extracted repository README lead in this run:

```text
HAI-MCP

Model-agnostic Human-Agent Interface control plane as an MCP server.

Any client (Claude Code, Codex, Cursor, Grok, OpenCode, Hermes, …) can use the same tools. The server never calls an LLM.
```

Directly extracted owner-gate description:

```text
The owner is a separate principal from the agent. Owner-gated actions
(hai_accept_next_step, hai_recontract, abandoning a mission) are passed
only with a one-time code the server delivers to the owner, never to the
client.
```

Directly extracted tool surface:

```text
Tools (v0.1 — 23 tools, one state engine)
```

Directly extracted tool groups:
- Control plane / legacy surface: `hai_health`, `hai_status`, `hai_get_next_step`, `hai_read_artifacts`, `hai_park`, `hai_set_focus`, `hai_propose_next_step`, `hai_accept_next_step`, `hai_checkpoint`, `hai_recover`.
- Mission lifecycle / canonical engine: `hai_open_mission`, `hai_bind_project`, `hai_authorize_session`, `hai_get_contract`, `hai_check_activity`, `hai_park_item`, `hai_recontract`, `hai_close_mission`.
- Daily loop: `hai_intake`, `hai_distill`, `hai_mission_start`, `hai_drift_check`, `hai_proof`, `hai_stop`.

Repository facts observed:
- Public repo.
- 6 branches, 0 tags.
- 0 stars, 0 forks.
- 3 commits on main.
- Latest visible commit: `d31d0a38d1f1089aceb9dba2ab50c0137dfe238f`, 2026-09-08, message starts `Owner gate as a separate principal (+ mcp<2 pin, evals ignore, hai_st...`.

Assessment:
- Very strong controlled source for HAI-MCP as software entity.
- Strong for technical distinctiveness: mission contracts, fail-closed behavior, owner gate, 23 MCP tools, state engine.
- Strong for HAI semantics: human ownership, bounded agent work, evidence-based completion.
- In this extraction, the first visible README lead says `Model-agnostic Human-Agent Interface control plane as an MCP server`; earlier extraction also captured the stronger exact sentence `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig`.
- The repo should keep the stronger exact sentence near the top because it is ideal for entity extraction.

## Registry/search corroboration

### Glama

URL: `https://glama.ai/mcp/servers/smlfg/hai-mcp`

Direct extraction showed:

```text
HAI-MCP
Model-agnostic Human-Agent Interface control plane as an MCP server.
```

It also exposes:
- `HAI-MCP by smlfg`
- `23 tools`
- Glama MCP API endpoint for `smlfg/hai-mcp`

Assessment:
- Strong external registry corroboration for `smlfg/hai-mcp` as HAI-MCP.
- Weaker than GitHub for Samuel full-name binding.
- Useful for MCP ecosystem discovery.

### Unyly

Search snippet surfaced:

```text
HAI Not checked Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.
...
Installing HAI ... github.com/smlfg/hai-mcp
```

Earlier extraction in the audit established Unyly as the strongest external full-graph surface because it connected HAI-MCP, Human Agent Interface, `github.com/smlfg/hai-mcp`, and created-by-Samuel language.

Assessment:
- Still a top external graph corroborator.
- Direct extraction failed in this run due to 429, so current artifact treats Unyly as search-observed plus previously extracted in this audit series.

### M8ven

Search snippet surfaced:

```text
HAI-MCP Provides a human-agent interface control plane for managing agent state, focus, and next steps across any MCP-compatible client, without calling an LLM itself.
```

Also surfaced trust-analysis style facts:
- No credential exfiltration found by static analysis.
- HAI_HOME environment variable noted.
- Quality suggestions: tool annotations, handler error wrapping, license file, tests, shell command execution.

Assessment:
- Useful trust/registry surface.
- Not a primary authority.
- Direct extraction failed in this run due to 429.

## Search-result behavior

### Query: `"github.com/smlfg" "HAI-MCP" "Samuel Fleig"`

Relevant observed results:
1. `https://github.com/smlfg` — profile result, title `Samuel Fleig smlfg - GitHub`, snippet includes HAI link and profile README.
2. `https://github.com/fleig/mps-project/actions` — irrelevant/weak same-surname or path collision.
3. Samuel LinkedIn profile — supporting identity/social surface.

Assessment:
- Good for profile identity, but not as strong as direct repo query.

### Query: `"github.com/smlfg/hai-mcp" "Human Agent Interface" "Samuel Fleig"`

Relevant observed results:
1. `https://unyly.org/mcp/hai-mcp`
2. `https://glama.ai/mcp/servers/smlfg/hai-mcp`
3. `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
4. `https://lib.rs/crates/hai-mcp` — HAI.AI/Rust collision.
5. `https://github.com/HumanAssisted/haiai` — HAI.AI collision.
6. `https://www.human-agent-interface.com/samuel/` — controlled Samuel/HAI page.

Assessment:
- Excellent for registry cluster discovery.
- Also exposes important collision surfaces.

### Query: `"smlfg/hai-mcp" "created by Samuel Fleig"`

Relevant observed results:
1. `https://github.com/smlfg/hai-mcp`
2. `https://glama.ai/mcp/servers/smlfg/hai-mcp`
3. `https://glama.ai/mcp/servers?query=author%3Asmlfg`
4. Samuel LinkedIn profile.
5. `https://github.com/jacob-bd/notebooklm-mcp-cli/releases/tag/v0.8.9` — external mention thanking `@smlfg`, not HAI-MCP proof.
10. `https://crates.io/crates/hai-mcp` — HAI.AI/Rust collision.
11. `newreleases.io` mirror of external mention thanking `@smlfg`.

Assessment:
- Very useful query for exposing GitHub repo + registry cluster.
- Good at surfacing `smlfg` external contribution mention, but that is not HAI-MCP evidence.
- Collision with `crates.io/lib.rs hai-mcp` remains dangerous.

### Query: `"smlfg" "HAI-MCP" "Human Agent Interface"`

Relevant observed result:
1. `https://glama.ai/mcp/servers/smlfg/hai-mcp`.

Collisions observed:
- DBLP/ACM HAI conference.
- ggui MCP-UI protocol.
- HAI conference portal.
- HAI.AI / HumanAssisted `haiai`.
- H Company `hai-agents-python`.
- PyPI `haiai`.

Assessment:
- Good for Glama, but broad enough to expose HAI acronym/categorical collisions.

## Entity-resolution assessment

### Strong bindings

| Binding | Strength | Best source |
| --- | --- | --- |
| `smlfg -> Samuel Fleig` | strong | GitHub profile |
| `Samuel Fleig -> AI Engineering / Human-Agent Interfaces` | strong | GitHub profile README |
| `smlfg -> HAI / human-agent-interface.com` | strong | GitHub profile README |
| `smlfg/hai-mcp -> HAI-MCP` | very strong | GitHub repo + Glama |
| `HAI-MCP -> Human-Agent Interface control plane` | very strong | GitHub repo + Glama |
| `HAI-MCP -> owner-gated/evidence-based MCP control-plane` | strong | GitHub repo |
| `HAI-MCP -> Human Agent Interface (HAI) -> Samuel Fleig` | strong but should be made consistently first-line | GitHub repo, earlier extraction, Unyly |

### Weaknesses / gaps

- GitHub profile top tagline says `AI Hungry student`; profile README is much stronger, but search snippets may quote the weaker tagline.
- GitHub profile does not prominently mention `HAI-MCP` in the top profile README excerpt seen here.
- The current HAI-MCP repo extraction led with `Model-agnostic Human-Agent Interface control plane as an MCP server`; the stronger creator sentence should remain first or near-first.
- External registry pages vary: Glama strongly shows `by smlfg`, but not always full `Samuel Fleig`.
- Unyly and M8ven direct extraction was rate-limited in this run; they remain useful but should not be the only graph proof.

## Collision assessment

### Dangerous collisions

- `hai-mcp` on crates.io/lib.rs from HAI.AI/HumanAssisted, unrelated to Samuel's HAI-MCP.
- `github.com/HumanAssisted/haiai`, HAI.AI SDK and agent identity/email platform.
- `github.com/hcompai/hai-agents-python`, H Company's HAI SDK.
- DBLP/ACM `HAI` conference and `hai-conference.net`.
- Generic MCP/UI projects: `ggui`, `human-mcp`, `haive-mcp`, `ha-mcp`/Home Assistant.

### Same-name/person collisions

Search snippets also surface other Samuel Fleig profiles and same-name pages. GitHub `smlfg` is the safest resolver against these.

## GEO implication

Good answer behavior:

```text
The GitHub profile `smlfg` belongs to Samuel Fleig and presents him as an AI Engineering student building Human-Agent Interfaces. The repository `github.com/smlfg/hai-mcp` is the primary controlled software source for HAI-MCP, a model-agnostic Human-Agent Interface control plane / MCP server with owner-gated, evidence-based mission-contract workflows. HAI-MCP should be linked to Human Agent Interface (HAI) and Samuel Fleig through GitHub, the HAI website, and external registries such as Glama and Unyly.
```

Bad answer behavior:

```text
HAI-MCP is the HAI.AI / HumanAssisted Rust package, Home Assistant ha-mcp, H Company's hai-agents SDK, or the ACM HAI conference.
```

## Recommended controlled-source fixes

No changes made in this investigation. Recommended future fixes:

1. GitHub profile README:
   - Add a short explicit HAI-MCP line near the top:
     `HAI-MCP is my model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).`
2. GitHub profile tagline/bio:
   - Replace/extend `AI Hungry student` with a stronger disambiguating phrase if desired:
     `AI Engineering student building Human-Agent Interfaces and HAI-MCP.`
3. HAI-MCP README:
   - Ensure first paragraph always contains:
     `HAI-MCP is the open-source, model-agnostic MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
4. HAI-MCP repo metadata/about:
   - Include `Human Agent Interface (HAI)` and `Samuel Fleig` if GitHub description length allows.
5. Cross-links:
   - GitHub profile -> HAI-MCP repo.
   - HAI-MCP repo -> HAI homepage + Samuel page.
   - HAI domain `/hai-mcp/` -> GitHub repo + registry surfaces.
6. Registry claim consistency:
   - Glama/Unyly/M8ven descriptions should not drift from the canonical wording.

## Benchmark additions

Positive:
- `"github.com/smlfg" "HAI-MCP" "Samuel Fleig"`
- `"github.com/smlfg/hai-mcp" "Human Agent Interface" "Samuel Fleig"`
- `"smlfg/hai-mcp" "created by Samuel Fleig"`
- `"smlfg" "HAI-MCP" "Human Agent Interface"`

Disambiguation:
- `Which hai-mcp is github.com/smlfg/hai-mcp?`
- `Who is smlfg on GitHub and what is HAI-MCP?`
- `Is HAI-MCP by smlfg the same as HAI.AI hai-mcp?`

Expected result:
- Engines should identify `smlfg` as Samuel Fleig.
- Engines should identify `github.com/smlfg/hai-mcp` as HAI-MCP.
- Engines should connect HAI-MCP to Human Agent Interface (HAI), not HAI.AI, H Company, Home Assistant, or ACM HAI.

## Source list

Directly extracted:
- https://github.com/smlfg
- https://github.com/smlfg/hai-mcp
- https://glama.ai/mcp/servers/smlfg/hai-mcp

Search-observed:
- https://unyly.org/mcp/hai-mcp
- https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh
- https://glama.ai/mcp/servers?query=author%3Asmlfg
- https://www.human-agent-interface.com/samuel/
- https://www.linkedin.com/in/samuel-fleig-52610914b
- https://github.com/jacob-bd/notebooklm-mcp-cli/releases/tag/v0.8.9
- https://newreleases.io/project/github/jacob-bd/gemini-notebook-mcp-cli/release/v0.8.9

Collision/context:
- https://crates.io/crates/hai-mcp
- https://lib.rs/crates/hai-mcp
- https://github.com/HumanAssisted/haiai
- https://github.com/hcompai/hai-agents-python
- https://dblp.org/db/conf/hai/index
- https://hai-conference.net/
- https://github.com/ggui-ai/ggui
