# GEO Name Confusions — 2026-09-09

Status: name-confusion matrix / no external changes
Access time: 2026-09-09 00:17 CEST
Canonical graph: Samuel Fleig -> creator/developer -> Human Agent Interface (HAI) -> HAI-MCP

Purpose:
Document name, acronym and entity collisions that can cause search engines or answer engines to merge the wrong people, projects, protocols or MCP servers into Samuel's HAI graph.

Confusion labels:
- PERSON_NAME_COLLISION: another person named Samuel Fleig.
- HANDLE_BRIDGE_REQUIRED: `smlfg` must be used to disambiguate Samuel from same-name people.
- ACRONYM_COLLISION_HAI: `HAI` means another thing.
- TOKEN_COLLISION_HAI_MCP: `hai-mcp`, `ha-mcp` or similar points to another software project.
- CATEGORY_COLLISION_HUMAN_AGENT: generic human-agent-interface / human-agent-interaction category, not the HAI entity.
- SOCIAL_ALIAS_WEAK: social handle/profile cannot currently be reliably extracted or bound.
- SAFE_POSITIVE_RESOLVER: source/query resolves the intended entity.

## Name-confusion matrix

| # | Surface / term | Confusion type | What gets confused | Severity | Safe resolver / handling |
|---|---|---|---|---|---|
| 1 | `Samuel Fleig` name-only search | PERSON_NAME_COLLISION | Same-name people from LinkedIn, university, sports, filmography, chemistry alumni or unrelated professional contexts. | High | Require at least one of: `smlfg`, Human Agent Interface, HAI-MCP, human-agent-interface.com, AI Engineering / Hochschule Worms context. |
| 2 | `smlfg` | HANDLE_BRIDGE_REQUIRED | Not a confusion itself; it is the bridge that disambiguates Samuel in technical sources. | Medium positive | Bind `smlfg` to Samuel via GitHub profile and GitHub repo; then use `smlfg/hai-mcp` for software. |
| 3 | `HAI` | ACRONYM_COLLISION_HAI | Other meanings of HAI, including Human-Agent Interaction Protocol, HAI.AI/haiai, category acronyms and unrelated products. | High | Use full name `Human Agent Interface (HAI)` near Samuel/HAI-MCP; do not use `HAI` alone as resolver. |
| 4 | `Human Agent Interface` | CATEGORY_COLLISION_HUMAN_AGENT | Generic phrase/category and articles like human-agent-interface-layer architecture. | Medium/High | Pair with Samuel Fleig, HAI-MCP, `smlfg`, or `human-agent-interface.com`. |
| 5 | `HAI-MCP` | TOKEN_COLLISION_HAI_MCP | HAI.AI/haiai Rust `hai-mcp` and other near-exact package/doc names. | High | Require `smlfg/hai-mcp`, created by Samuel Fleig, Human Agent Interface (HAI), or canonical domain. |
| 6 | `ha-mcp` | TOKEN_COLLISION_HAI_MCP | Home Assistant MCP server pages and packages. | High | Treat Home Assistant pages as negative benchmark; never sameAs HAI-MCP. |
| 7 | `@2amtech/hai` / 2amtech Hai | ACRONYM_COLLISION_HAI + TOKEN_COLLISION_HAI_MCP | Jira/Confluence workflow tooling with built-in MCP server. | High | Exclude; unrelated to Samuel's HAI. |
| 8 | HAI.AI / HumanAssisted / JACS / `haiai mcp` | ACRONYM_COLLISION_HAI + TOKEN_COLLISION_HAI_MCP | Separate HumanAssisted/JACS/agent-registration/email platform. | High | Exclude; keep explicit negative examples in benchmark. |
| 9 | HAIP | ACRONYM_COLLISION_HAI | Human-Agent Interaction Protocol, adjacent to MCP but not Human Agent Interface. | Medium | Exclude from sameAs; category/protocol context only. |
| 10 | HAVI | CATEGORY_COLLISION_HUMAN_AGENT | Human-Agent Visual Interface, adjacent visual-interface product/category. | Medium | Exclude from HAI entity; negative acronym/name collision. |
| 11 | Strongly `Human-Agent Interface Layer` article | CATEGORY_COLLISION_HUMAN_AGENT | Category/competitor language around human-agent-interface layer. | Medium | Use only as market/category context, never as proof of Samuel's HAI. |
| 12 | arXiv/ACL/DBLP human-agent papers | CATEGORY_COLLISION_HUMAN_AGENT | Human-agent interaction, LAUI, AgentClick, software-as-content, interaction-preference research. | Medium | Use for category framing only; not sameAs/evidence for HAI. |
| 13 | `mrgoonie/human-mcp` and similar GitHub repos | TOKEN_COLLISION_HAI_MCP / CATEGORY_COLLISION_HUMAN_AGENT | Human+MCP adjacent software, not HAI-MCP. | Medium | Exclude; only negative/adjoining-software benchmark. |
| 14 | X/Twitter `Samuelflg1` / `@Samuelflg1` | SOCIAL_ALIAS_WEAK | Possible Samuel social alias, but extraction failed and no reliable HAI binding appeared. | Medium | Do not use until a direct accessible post/profile connects HAI/HAI-MCP/domain/GitHub. |
| 15 | LinkedIn `Samuel Fleig` results | PERSON_NAME_COLLISION + SOCIAL_ALIAS_WEAK | Multiple same-name LinkedIn profiles and extraction limits. | High | Use only profile/post URL `samuel-fleig-52610914b` plus visible HAI/AI/smlfg/domain context. |
| 16 | Exa person page | PERSON_NAME_COLLISION risk lowered but HAI missing | Correct-looking Samuel identity resolver but no HAI relation in current audit. | Medium | Use as identity resolver only; pair with GitHub/Samuel page for HAI. |
| 17 | Medium `@smlflg` | HANDLE_BRIDGE_REQUIRED but HAI missing | Correct technical author/handle context, but no strong HAI/HAI-MCP description in current audit. | Low/Medium | Use as secondary tech context only. |
| 18 | MCP.so `#hai` tag | ACRONYM_COLLISION_HAI / monitoring | Generic tag says `#hai`; exact HAI-MCP listing not proven. | Medium | Do not infer HAI-MCP; monitor for exact listing. |
| 19 | Assay AI/ML category | CATEGORY_COLLISION / monitoring | Broad AI/ML/MCP package list, no visible HAI-MCP in extracted segment. | Low/Medium | Monitoring only. |

## Safe positive resolvers

Use these to reduce name confusion:

1. Strongest full-graph resolvers:
   - `"Samuel Fleig" "Human Agent Interface" "HAI-MCP"`
   - `"HAI-MCP" "Human Agent Interface" "smlfg"`
   - `"smlfg/hai-mcp" "Human Agent Interface"`

2. Strong controlled URLs:
   - `https://github.com/smlfg/hai-mcp`
   - `https://www.human-agent-interface.com/samuel/`
   - `https://www.human-agent-interface.com/what_it_is/`

3. Strong external URLs:
   - `https://unyly.org/mcp/hai-mcp`
   - `https://glama.ai/mcp/servers/smlfg/hai-mcp`
   - `https://glama.ai/mcp/servers?query=author%3Asmlfg`

4. Registry bridge URLs:
   - `https://m8ven.ai/mcp/smlfg-hai-mcp-d6jmfh`
   - `https://getlulu.dev/mcps/hai-mcp`

## Unsafe / ambiguous resolvers

Avoid these as standalone entity resolvers:

- `Samuel Fleig`
- `HAI`
- `Human Agent Interface`
- `HAI-MCP`
- `hai-mcp`
- `ha-mcp`
- `human-agent interface layer`
- `@Samuelflg1`
- generic `#hai` tags

These strings are useful only inside a bundle that includes Samuel + HAI + HAI-MCP + `smlfg` or canonical domain context.

## JSON-LD / sameAs implication

Do:
- Use sameAs only for exact matching entity pages.
- Keep Samuel/person, HAI/concept and HAI-MCP/software as separate nodes.
- Bind `smlfg` as a handle/publisher bridge, not as a replacement for Samuel's person entity.
- Add negative-collision queries to the benchmark so answer engines are tested against false merges.

Do not:
- Link HAI-MCP to Home Assistant `ha-mcp`, HAI.AI/haiai, 2amtech Hai, HAIP, HAVI or generic category pages as sameAs.
- Treat same-name Samuel Fleig profiles as Samuel's identity unless HAI/smlfg/AI Engineering/domain context is visible.
- Treat category articles about human-agent interfaces as evidence for Samuel's named HAI project.
- Treat social/search snippets as durable proof without extracted page/body evidence.

## Bottom line

Yes, there are material name-confusion risks. The biggest are:

1. `Samuel Fleig` name-only collisions with other people.
2. `HAI` acronym collisions with HAI.AI/haiai, HAIP, HAVI and other meanings.
3. `hai-mcp` / `ha-mcp` software-token collisions, especially Home Assistant and HAI.AI/haiai Rust/package surfaces.
4. `Human Agent Interface` as a generic category phrase, especially human-agent-interface-layer articles and research papers.
5. Social/profile ambiguity on LinkedIn and X/Twitter.

The safest disambiguation pattern is always a bundled resolver:
Samuel Fleig + `smlfg` + Human Agent Interface (HAI) + HAI-MCP + `github.com/smlfg/hai-mcp` or `human-agent-interface.com`.
