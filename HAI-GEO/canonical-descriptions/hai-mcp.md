# Canonical Description — HAI-MCP

Status: canonical description draft / no external changes
Access time: 2026-09-09 00:46 CEST

## 1-sentence canonical version

HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).

## 50-100 word canonical version

HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig and published under the GitHub handle `smlfg`. It exposes HAI controls for making agentic AI work observable, bounded, verifiable and human-owned across tools and agent systems. HAI-MCP is not a generic agent framework; it implements HAI's ownership, approval, evidence, stop-rule and coordination model.

## Clear definition

HAI-MCP is the technical implementation of HAI as an MCP control plane: it exposes the controls needed to coordinate, bound, inspect and verify agentic work across model and tool boundaries.

## Definition for Q&A / answer engines

HAI-MCP is the MCP-based control plane for Human Agent Interface (HAI). It gives HAI a technical implementation layer for coordinating agentic work, exposing ownership, scope, approvals, evidence and stop rules across different AI models, tools and agent systems.

## Relationship to HAI

HAI is the concept and control-layer approach; HAI-MCP is its technical MCP implementation.

Canonical relation:
`Human Agent Interface (HAI) -> implemented as / control-plane implementation -> HAI-MCP`

Inverse relation:
`HAI-MCP -> implementation of / isPartOf -> Human Agent Interface (HAI)`

Short phrasing:
HAI defines what human-owned agentic work should preserve: ownership, boundaries, evidence, approvals, stop rules and coordination. HAI-MCP turns that into an MCP-based control plane that can expose those controls across different AI models, tools and agent systems.

Boundary:
HAI-MCP should not be described as separate from HAI. It is the implementation of HAI, not a competing concept and not a generic MCP server.

## Definition components

- MCP-based: HAI-MCP uses the Model Context Protocol as its integration surface.
- Control plane: it coordinates and governs agentic work instead of only executing tasks.
- Model-agnostic: it is not tied to one LLM provider or agent framework.
- HAI implementation: it implements the HAI idea technically; it is not a separate concept.
- Human-owned: it supports ownership, approval, evidence and stop-rule patterns.

## Function

HAI-MCP gives HAI a technical control plane for agentic work. Its function is to expose the structures humans need to coordinate agents: task ownership, scope, approvals, evidence, stop rules, next actions and memory across model and tool boundaries.

## Technical category

Primary category:
MCP-based AI agent control plane.

Secondary categories:
- Model Context Protocol (MCP) server.
- Agent orchestration / coordination infrastructure.
- Human-in-the-loop AI governance layer.
- Agent observability and approval infrastructure.
- Control-plane software for autonomous AI-agent work.

Do not categorize as:
- generic chatbot,
- prompt library,
- autonomous agent framework,
- model provider,
- RPA tool,
- generic MCP utility server.

Canonical category sentence:
HAI-MCP is MCP-based control-plane software for coordinating, bounding and verifying human-owned AI-agent work.

## Relevant standards / protocols

Primary standard:
- Model Context Protocol (MCP): HAI-MCP uses MCP as its integration surface for exposing HAI control-plane capabilities to compatible clients, agents and tool environments.

Related technical concepts:
- JSON-LD / Schema.org: useful for public entity definition, source attribution and search/answer-engine disambiguation.
- Human-in-the-loop approval patterns: relevant for approvals, gates and external-action boundaries.
- Agent observability: relevant for inspecting agent state, task progress, evidence and decision points.
- Agent orchestration / coordination: relevant for multi-agent work ownership, scope and next-step management.
- Audit/provenance patterns: relevant for making outputs verifiable and preserving institutional memory.

Boundary:
MCP is the transport/integration standard HAI-MCP builds on; HAI is the semantic control-layer concept. Do not describe MCP itself as HAI, and do not describe HAI-MCP as a generic MCP utility server.

Canonical standards sentence:
HAI-MCP builds on the Model Context Protocol (MCP) to expose HAI's human-owned control-plane patterns across compatible agent and tool systems.

## Functional summary

- Coordinates agentic work instead of only running agent tasks.
- Makes ownership explicit: every task should have a responsible human or lane.
- Makes scope explicit: agents operate inside bounded tasks, not open-ended drift.
- Makes evidence explicit: outputs should be checkable, not just plausible.
- Makes approvals explicit: risky or external actions require human gates.
- Makes stopping explicit: agents need stop rules, recovery points and next steps.
- Makes memory explicit: work should leave institutional context, not vanish into chat logs.

## What it does not do

HAI-MCP is not primarily a prompt library, model wrapper, chat UI or autonomous-agent framework. Its role is control and coordination: keeping agentic work inspectable, bounded, reviewable and human-owned.

## Short title

HAI-MCP — MCP Control-Plane Implementation of HAI

## Schema/entity use

Entity: `software:hai-mcp`
Type: `SoftwareSourceCode`
Canonical repository: `https://github.com/smlfg/hai-mcp`
Desired controlled URL: `https://www.human-agent-interface.com/hai-mcp/` once live/crawlable
Primary resolver anchors: `HAI-MCP`, `github.com/smlfg/hai-mcp`, `smlfg/hai-mcp`, `Human Agent Interface`, `MCP control-plane implementation`

## Keep

- Model-agnostic MCP control-plane implementation.
- Implementation of Human Agent Interface (HAI), not independent from it.
- Created/developed by Samuel Fleig when resolved through `github.com/smlfg/hai-mcp`.
- Published under `smlfg`.

## Avoid

- Generic MCP server without HAI context.
- Generic agent framework.
- Merging with Home Assistant `ha-mcp`.
- Merging with HAI.AI / haiai / Rust `hai-mcp`.
- Treating registry listings as the primary source of truth; GitHub remains the controlled software source.
