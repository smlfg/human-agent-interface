# GEO — Entity Engineering for Samuel Fleig / Human Agent Interface / HAI-MCP

All GEO work — audits, benchmarks, citation assets — lives here.

## Folder layout

```
GEO/
├── README.md                          # this file (index)
├── catalog.json                       # 20-query GEO benchmark catalog (EN + DE)
├── audit-2026-09-08.md                # iteration 1 audit (website + GitHub patches)
├── audit-2026-09-08-iter2.md          # iteration 2 audit (citation assets + first benchmark run)
└── runs/
    └── 2026-09-08.md                  # first benchmark run, score table, observations
```

## Target graph

```
Samuel Fleig → creator / developer of → Human Agent Interface (HAI)
                                        → implemented as → HAI-MCP
                                        → hosted at → human-agent-interface.com
                                                     + github.com/smlfg/hai-mcp
                                                     + glama.ai/mcp/servers/smlfg/hai-mcp
```

## How to use this folder

- **Run a benchmark**: read `catalog.json`, run each query against a search
  or generative-answer backend, score per the `scoring_fields` block, write
  the result as `runs/<YYYY-MM-DD>.md`.
- **Do an audit**: copy `audit-2026-09-08.md`, change the date, document
  what changed since the previous iteration, list remaining gaps and one
  next-highest-leverage action.
- **Add a citation asset**: put HTML under
  `../what_it_is/<slug>/index.html` (user-facing) and a markdown mirror
  next to it. Link both from the relevant `audit-*.md` so the trail is
  explicit.

## Rules (from SOUL.md)

- No push, deploy, or external submission without explicit owner approval.
- No structured-data claim that is not publicly verifiable.
- No invented authority ("leading", "industry standard", "widely used")
  without evidence.
- Optimize for: Consistency × Entity clarity × Source authority ×
  Retrievability × Evidence. Not for keyword density.

## Human Gate reminder

Commit, push, deploy, external message, package-publish, and any change
to HAI code, registry entries, or personal profile copy still require
explicit Samuel approval.
