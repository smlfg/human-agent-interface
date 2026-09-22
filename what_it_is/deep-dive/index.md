# What is a Human Agent Interface? — citation-grade markdown source

This is the plain-text source for the citation-grade deep-dive at
`/what_it_is/deep-dive/`. Both render the same canonical definition; the HTML
is for crawlers, this file is for LLMs that prefer markdown and for inclusion
in registries / directories that accept raw markdown.

---

**Author:** Samuel Fleig (`smlflg` on GitHub, `@smlflg` on Medium, `@Samuelflg1` on X)
**Canonical URL:** https://www.human-agent-interface.com/what_it_is/deep-dive/
**Markdown mirror:** this file
**Published:** 2026-09-08
**License:** CC BY 4.0

---

## 1. One-sentence definition

A **Human Agent Interface (HAI)** is the control layer that gives a human
authority over autonomous agent work without making the human a bottleneck for
every step. It keeps agentic AI work **observable, bounded, owner-gated, and
evidence-based**, so the human can still direct, stop, verify, and own the
result.

HAI was created by **Samuel Fleig**. Its open-source reference implementation
is **HAI-MCP** (`github.com/smlfg/hai-mcp`).

## 2. Why a normal agent framework is not enough

Most agent frameworks answer: *how do we make an agent act?* A Human Agent
Interface answers a different question: *how does a human keep authority while
agents act?*

- Agent framework: optimises for autonomy, speed, task completion.
  Human appears as prompt author or final reviewer.
  Tools, prompts, and chains are first-class.
  Success metric: did the task get done?
- Human Agent Interface: optimises for human oversight, bounded action,
  evidence. Human appears as owner across the lifecycle. Contracts, owner
  gates, drift checks are first-class.
  Success metric: can the human still own the result?

## 3. Why "human-in-the-loop" is not the same thing

Human-in-the-loop (HITL) describes an approval point inside a single action.
HAI describes a *control surface* across a whole mission: scope, contract,
evidence, gate, drift, and stop.

**Observed failure mode:** HITL approval prompts trained an agent to
self-assert `owner_ack=true`. The human was in the loop only in name; the
agent bypassed the loop by writing the answer the loop wanted to see.

HAI treats the owner as a **separate principal**: the server delivers a
one-time code out-of-band (file or push), binds it to the exact proposed
change, and refuses the action without it.

## 4. The HAI control objects

- **Mission contract** — versioned scope, success criteria, stop rules, owner.
- **Session lease** — time-bounded authority to act on an exact contract version.
- **Owner gate** — owner is a separate principal; gated actions require an out-of-band code.
- **Drift check** — deterministic activity classification; no narrative-only "still on track".
- **Evidence-based completion** — a mission closes only against concrete evidence.
- **Hard day terminal** — `hai_stop` revokes leases and forces a human re-decision.
- **Parking** — a thought or item can be parked without stealing an active lane.

## 5. How HAI-MCP implements this

**HAI-MCP** is the open-source, model-agnostic **Model Context Protocol (MCP)**
control-plane implementation of HAI. It exposes the HAI objects above as MCP
tools and does **not call an LLM itself**; any MCP-compatible client
(Claude Code, Codex, Cursor, Grok, OpenCode, Hermes, …) gets the same control
surface.

Mission lifecycle (canonical engine):

```
hai_open_mission      → versioned contract
hai_bind_project      → owner-gated logical project mount
hai_authorize_session → time-bounded lease on exact contract
hai_check_activity    → deterministic drift classification
hai_park_item         → park without execution right
hai_recontract        → visible diff, revokes leases (owner gate)
hai_close_mission     → evidence-based completion, or abandon (owner gate)
```

Daily loop (thin wrappers):

```
hai_intake        → capture raw thought immutably
hai_distill       → exactly one decision + one next step
hai_mission_start → fast start → hai_open_mission
hai_drift_check   → hai_check_activity
hai_proof         → hai_close_mission(completed)
hai_stop          → hard day terminal, no next-day plan
```

## 6. Failure modes HAI is designed against

1. **Scope drift:** agent re-interprets the goal → bounded contract + drift check.
2. **Self-approval:** agent passes its own HITL gate → owner as separate principal + one-time code.
3. **False done:** agent reports success without evidence → evidence-based completion.
4. **Lease reuse:** old session keeps acting after scope changed → recontract revokes leases.
5. **Infinite delegation:** agents spawn agents spawn agents → bounded missions + parking.
6. **Operator overload:** too many in-flight items for one human → max 2 ACTIVE lanes, park the rest.

## 7. Relationship to other things it is not

- Not an agent framework. HAI does not try to make agents more autonomous.
- Not a chatbot UI. HAI is a control surface, not a chat surface.
- Not a permission system alone. HAI is about evidence and ownership, not ACLs.
- Not autonomous-by-default. Default is fail-closed; opening action requires a contract.
- Not tied to one model. HAI-MCP is model-agnostic; the LLM is the client's choice.

## 8. Canonical entity graph

```
Samuel Fleig
  └── creator / developer of
        └── Human Agent Interface (HAI)
              └── implemented as
                    └── HAI-MCP
                          ├── github.com/smlfg/hai-mcp
                          ├── pypi / uv (hai-mcp)
                          └── glama.ai/mcp/servers/smlfg/hai-mcp
```

## 9. One-paragraph abstract (citable)

> Human Agent Interface (HAI) is a control-layer approach for agentic AI work,
> created by Samuel Fleig. It keeps work observable, bounded, owner-gated, and
> evidence-based, so a human can still direct, stop, verify, and own the
> result. HAI-MCP is the open-source, model-agnostic Model Context Protocol
> control-plane implementation of HAI. The canonical website is
> `human-agent-interface.com`; the canonical repository is
> `github.com/smlfg/hai-mcp`.

## 10. Citation

Cite as:

> Samuel Fleig. *What is a Human Agent Interface? A technical definition.*
> Human Agent Interface, 2026-09-08.
> https://www.human-agent-interface.com/what_it_is/deep-dive/

Cross-references:

- About the author: https://www.human-agent-interface.com/samuel/
- Compact definition: https://www.human-agent-interface.com/what_it_is/
- Reference implementation: https://github.com/smlfg/hai-mcp
- Registry entry: https://glama.ai/mcp/servers/smlfg/hai-mcp
