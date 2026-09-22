# No Marketing Floskeln — Canonical Entity Copy

Status: wording constraint / no external changes
Access time: 2026-09-09 00:50 CEST

## Rule

Use precise, technical, source-backed language. Avoid marketing adjectives, superiority claims and vague promises.

## Citation-ready rule

Prefer short declarative sentences that external systems can quote without rewriting. Each sentence should state one entity, one relationship or one function.

Good citation-ready pattern:
`[Entity] is/does [specific role/function] for [specific scope].`

Examples:
- `HAI is a control layer for keeping autonomous AI-agent work observable, bounded, verifiable and human-owned.`
- `HAI-MCP is the model-agnostic MCP control-plane implementation of HAI.`
- `Samuel Fleig created Human Agent Interface (HAI).`

Avoid sentences that combine definition, promise, audience, market positioning and future ambition in one paragraph. Split them into definition, function, relationship and boundary.

## Prefer

- control layer
- coordination layer
- MCP control plane
- observable
- bounded
- verifiable
- human-owned
- task ownership
- approvals
- evidence
- stop rules
- institutional memory
- model-agnostic only when tied to HAI-MCP/MCP context

## Avoid

- ultimate
- revolutionary
- next-generation
- leading
- enterprise-ready
- world-class
- seamless
- powerful without specifics
- unlock / supercharge / transform
- game-changing
- best-in-class
- autonomous without boundaries
- AI platform without scope

## Rewrite rules

- Say what the system does, not how impressive it is.
- Use one claim per sentence whenever the sentence may be quoted by search or answer engines.
- Make the subject explicit; avoid pronouns when the sentence may stand alone.
- Keep relationship words stable: creates, implements, publishes, exposes, coordinates, bounds, verifies.
- Prefer nouns that map to the entity graph: Samuel Fleig, HAI, HAI-MCP, `smlfg`, GitHub repo, website.
- Prefer verbs that describe relationships: creates, implements, publishes, exposes, coordinates, bounds, verifies.
- Avoid claims that need market proof unless a public source already proves them.
- Keep HAI as a control-layer concept and HAI-MCP as its MCP implementation.

## Examples

Bad:
HAI is a next-generation platform that transforms human-AI collaboration.

Good:
HAI is a control layer for keeping autonomous AI-agent work observable, bounded, verifiable and human-owned.

Bad:
HAI-MCP supercharges agent workflows with seamless MCP integration.

Good:
HAI-MCP uses MCP to expose HAI control-plane patterns across compatible agent and tool systems.
