# Phase 2 — Canonical Entity Definition

Status: draft canonical entity definitions / no external changes
Access time: 2026-09-09 00:37 CEST
Source basis: Phase 1 source documentation, canonical interpretation lock and tiny entity map.

## Purpose

Define the canonical entity set that search engines, answer engines and future JSON-LD/crawlable copy should learn.

This is not keyword SEO. It is a source-backed entity definition layer:
- separate the entities,
- state the allowed relationships,
- define disambiguation anchors,
- forbid unsafe merges,
- and keep public visible copy and machine-readable data semantically aligned.

## Canonical graph

```text
Samuel Fleig
  -> creator of
    -> Human Agent Interface (HAI)
      -> implemented as / control-plane implementation
        -> HAI-MCP

Samuel Fleig
  -> GitHub identity / publishes as
    -> smlfg
      -> owns/publishes repo
        -> github.com/smlfg/hai-mcp
          -> source for
            -> HAI-MCP

Samuel Fleig
  -> website / controlled domain
    -> human-agent-interface.com
      -> controlled source cluster for
        -> Samuel Fleig + Human Agent Interface (HAI)
```

## Entity 1 — Samuel Fleig

Canonical ID: `person:samuel-fleig`
Schema target: `Person`
Canonical URL: `https://www.human-agent-interface.com/samuel/`
Primary resolver anchors:
- `Samuel Fleig`
- `smlfg`
- `github.com/smlfg`
- `github.com/smlfg/hai-mcp`
- `human-agent-interface.com/samuel/`

Canonical description:
Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.

Short description:
Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI).

Allowed relationships:
- `Samuel Fleig -> creator of -> Human Agent Interface (HAI)`
- `Samuel Fleig -> develops -> HAI-MCP` as an operational shortcut only when HAI-MCP resolves to `github.com/smlfg/hai-mcp`
- `Samuel Fleig -> GitHub identity / publishes as -> smlfg`
- `Samuel Fleig -> website / controlled domain -> human-agent-interface.com`

Strong sources:
- `https://www.human-agent-interface.com/samuel/`
- `https://www.human-agent-interface.com/samuel/why-hai-matters/`
- `https://github.com/smlfg`
- `https://github.com/smlfg/hai-mcp`
- `https://unyly.org/mcp/hai-mcp`

Do not merge with:
- other Samuel Fleig profiles without HAI/AI/`smlfg`/domain context,
- `Samuelflg1` aliases unless tied to HAI/AI/`smlfg`/domain context,
- any same-name professional/sports/university/filmography/alumni result.

## Entity 2 — Human Agent Interface (HAI)

Canonical ID: `concept:human-agent-interface-hai`
Schema target: `CreativeWork` or `DefinedTerm` depending page context; for product-like pages, `SoftwareApplication` only if the page is specifically about an implementation.
Canonical URL: `https://www.human-agent-interface.com/`
Primary resolver anchors:
- `Human Agent Interface`
- `Human Agent Interface (HAI)`
- `human-agent-interface.com`
- `Samuel Fleig`
- `HAI-MCP`
- `smlfg/hai-mcp`

Canonical description:
Human Agent Interface (HAI) is an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.

Short description:
HAI is an open-source approach/control layer for human-owned agentic AI work.

Allowed relationships:
- `Human Agent Interface (HAI) -> creator -> Samuel Fleig`
- `Human Agent Interface (HAI) -> implemented as / control-plane implementation -> HAI-MCP`
- `Human Agent Interface (HAI) -> controlled source -> human-agent-interface.com`

Strong sources:
- `https://www.human-agent-interface.com/`
- `https://www.human-agent-interface.com/what_it_is/`
- `https://www.human-agent-interface.com/proof/`
- `https://www.human-agent-interface.com/samuel/`
- `https://github.com/smlfg/hai-mcp`
- `https://unyly.org/mcp/hai-mcp`

Do not merge with:
- generic human-agent interface category pages,
- HAIP / Human-Agent Interaction Protocol,
- HAVI / Human-Agent Visual Interface,
- HAI.AI / haiai,
- random `HAI` acronym uses.

## Entity 3 — HAI-MCP

Canonical ID: `software:hai-mcp`
Schema target: `SoftwareSourceCode`
Canonical repository: `https://github.com/smlfg/hai-mcp`
Desired controlled URL: `https://www.human-agent-interface.com/hai-mcp/` once live/crawlable
Primary resolver anchors:
- `HAI-MCP`
- `github.com/smlfg/hai-mcp`
- `smlfg/hai-mcp`
- `Human Agent Interface`
- `MCP control-plane implementation`

Canonical description:
HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).

Short description:
HAI-MCP is the MCP control-plane implementation of HAI.

Allowed relationships:
- `HAI-MCP -> implementation of / isPartOf -> Human Agent Interface (HAI)`
- `HAI-MCP -> author/developer -> Samuel Fleig` when resolved through `github.com/smlfg/hai-mcp`
- `HAI-MCP -> repository -> github.com/smlfg/hai-mcp`
- `HAI-MCP -> registry listing -> Glama / Unyly / M8ven / Lulu` as external discovery/corroboration, not primary truth.

Strong sources:
- `https://github.com/smlfg/hai-mcp`
- `https://unyly.org/mcp/hai-mcp`
- `https://glama.ai/mcp/servers/smlfg/hai-mcp`
- `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
- `https://getlulu.dev/mcps/hai-mcp`

Do not merge with:
- Home Assistant `ha-mcp`,
- HAI.AI / haiai / Rust `hai-mcp`,
- 2amtech Hai,
- `mrgoonie/human-mcp`,
- generic human+MCP projects.

## Entity 4 — smlfg

Canonical ID: `handle:github-smlfg`
Schema target: `PropertyValue` identifier on `Person`, not a standalone organization.
Canonical URL: `https://github.com/smlfg`
Primary resolver anchors:
- `smlfg`
- `github.com/smlfg`
- `github.com/smlfg/hai-mcp`

Canonical description:
`smlfg` is Samuel Fleig's GitHub handle / technical publishing identity. It connects Samuel Fleig to the HAI-MCP repository and to registry-visible HAI-MCP listings.

Allowed relationships:
- `Samuel Fleig -> GitHub identity / publishes as -> smlfg`
- `smlfg -> owns/publishes repo -> github.com/smlfg/hai-mcp`
- `registry listing -> author/publisher -> smlfg`

Strong sources:
- `https://github.com/smlfg`
- `https://github.com/smlfg/hai-mcp`
- `https://glama.ai/mcp/servers?query=author%3Asmlfg`
- `https://glama.ai/mcp/servers/smlfg/hai-mcp`
- `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
- `https://getlulu.dev/mcps/hai-mcp`

Do not merge with:
- `smlflg` typo-like variants unless a controlled profile links them,
- `@smlflg` / Medium as GitHub proof by itself,
- `Samuelflg1` X/Twitter as GitHub proof by itself.

## Entity 5 — human-agent-interface.com

Canonical ID: `website:human-agent-interface-com`
Schema target: `WebSite`
Canonical URL: `https://www.human-agent-interface.com/`
Primary resolver anchors:
- `human-agent-interface.com`
- `www.human-agent-interface.com`
- `https://www.human-agent-interface.com/samuel/`
- `https://www.human-agent-interface.com/what_it_is/`

Canonical description:
`human-agent-interface.com` is the controlled website/source cluster for Samuel Fleig's Human Agent Interface (HAI) work.

Allowed relationships:
- `human-agent-interface.com -> main entity -> Human Agent Interface (HAI)`
- `human-agent-interface.com/samuel/ -> main entity -> Samuel Fleig`
- `human-agent-interface.com -> controlled source cluster for -> Samuel Fleig + HAI`
- future: `human-agent-interface.com/hai-mcp/ -> main entity -> HAI-MCP` once live/crawlable.

Strong sources:
- `https://www.human-agent-interface.com/`
- `https://www.human-agent-interface.com/samuel/`
- `https://www.human-agent-interface.com/samuel/why-hai-matters/`
- `https://www.human-agent-interface.com/what_it_is/`
- `https://www.human-agent-interface.com/proof/`

Current gap:
- `https://www.human-agent-interface.com/hai-mcp/` returned `http_error` in the audit.
- `https://www.human-agent-interface.com/sitemap.xml` returned `http_error` in the audit.
- Therefore the controlled domain is strong for Samuel/HAI, but currently weaker than GitHub/Unyly/Glama for HAI-MCP.

## Canonical one-paragraph definition

Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned. HAI-MCP is the model-agnostic MCP control-plane implementation of HAI, developed and published by Samuel Fleig under the GitHub handle `smlfg` at `github.com/smlfg/hai-mcp`. The controlled source cluster for the work is `human-agent-interface.com`.

## Minimal visible copy set

Very short canonical descriptions:
`/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/PHASE_2_SHORT_CANONICAL_DESCRIPTIONS_2026-09-09.md`

Use these exact semantic units across homepage, Samuel page, HAI page, HAI-MCP page, GitHub README and JSON-LD.

1. Person sentence:
Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI).

2. HAI sentence:
Human Agent Interface (HAI) is an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.

3. HAI-MCP sentence:
HAI-MCP is the model-agnostic MCP control-plane implementation of HAI.

4. GitHub sentence:
Samuel Fleig publishes HAI-MCP on GitHub under the handle `smlfg` at `github.com/smlfg/hai-mcp`.

5. Website sentence:
`human-agent-interface.com` is the controlled website/source cluster for Samuel Fleig's Human Agent Interface work.

## JSON-LD canonical graph draft

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://www.human-agent-interface.com/samuel/#samuel-fleig",
      "@type": "Person",
      "name": "Samuel Fleig",
      "description": "Samuel Fleig is an AI engineer and the creator of Human Agent Interface (HAI), an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.",
      "url": "https://www.human-agent-interface.com/samuel/",
      "sameAs": [
        "https://github.com/smlfg"
      ],
      "identifier": [
        {
          "@type": "PropertyValue",
          "propertyID": "GitHub username",
          "value": "smlfg",
          "url": "https://github.com/smlfg"
        }
      ]
    },
    {
      "@id": "https://www.human-agent-interface.com/#human-agent-interface",
      "@type": "CreativeWork",
      "name": "Human Agent Interface (HAI)",
      "description": "Human Agent Interface (HAI) is an open-source approach/control layer for keeping agentic AI work observable, bounded, verifiable and human-owned.",
      "url": "https://www.human-agent-interface.com/",
      "creator": {
        "@id": "https://www.human-agent-interface.com/samuel/#samuel-fleig"
      }
    },
    {
      "@id": "https://github.com/smlfg/hai-mcp#hai-mcp",
      "@type": "SoftwareSourceCode",
      "name": "HAI-MCP",
      "description": "HAI-MCP is the model-agnostic MCP control-plane implementation of Human Agent Interface (HAI).",
      "codeRepository": "https://github.com/smlfg/hai-mcp",
      "author": {
        "@id": "https://www.human-agent-interface.com/samuel/#samuel-fleig"
      },
      "isPartOf": {
        "@id": "https://www.human-agent-interface.com/#human-agent-interface"
      }
    },
    {
      "@id": "https://www.human-agent-interface.com/#website",
      "@type": "WebSite",
      "name": "Human Agent Interface",
      "url": "https://www.human-agent-interface.com/",
      "mainEntity": {
        "@id": "https://www.human-agent-interface.com/#human-agent-interface"
      }
    }
  ]
}
```

## `sameAs` policy

Allowed `sameAs` for Samuel Fleig:
- `https://github.com/smlfg` — strong controlled technical identity.

Candidate/conditional `sameAs` for Samuel Fleig:
- LinkedIn profile only if the visible page/snippet ties it to AI/HAI/`smlfg`/canonical domain.
- Medium only as technical-author context, not HAI proof, unless a HAI article exists and is extractable.

Do not set `sameAs`:
- from HAI-MCP to registry pages unless the target is clearly the same software entity and points to `github.com/smlfg/hai-mcp`; prefer `subjectOf`/citation/source list for registries.
- from HAI to generic category pages.
- from Samuel to same-name profiles without HAI/AI/`smlfg`/domain context.

## Phase 2 acceptance criteria

A page/source is aligned with the canonical entity definition if it visibly answers all relevant items for its scope:

1. Which entity is this page about?
2. Is Samuel Fleig clearly the relevant person, not a same-name collision?
3. Is HAI defined as the approach/control layer, not a generic keyword?
4. Is HAI-MCP defined as the model-agnostic MCP control-plane implementation of HAI?
5. Is `smlfg` used as the GitHub handle bridge, not as a person replacement?
6. Does the source avoid fake validation, SEO stuffing and unsupported market/enterprise claims?
7. Does every machine-readable relationship also appear in visible crawlable text?

## Next safe implementation target

No external action was performed.

Highest-value controlled fix after Samuel-Go:
- make `/hai-mcp/` live and crawlable,
- ensure `sitemap.xml` includes `/hai-mcp/`,
- add the minimal visible copy set to homepage/Samuel/what-it-is/HAI-MCP pages,
- then align JSON-LD with the visible text.
