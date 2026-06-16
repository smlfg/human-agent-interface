# APP — Subproject Rules

> **Rule:** Online work lives in `/APP`.

## Layer hierarchy

```
Human-Agent-Interface/          ← Website repo (landing, worker, marketing)
├── Projek-Managment/           ← HAI control plane (ONE LEVEL UP — do not touch from APP work)
└── APP/                        ← Deployable product slices (THIS is where you build)
    ├── AGENTS.md               ← This file
    ├── Projek-Managment/       ← Slice PM only (intake MVP, future apps)
    └── intake/                 ← Example: /intake/ on live site
```

## What belongs in APP

| In APP | Not in APP |
|---|---|
| Deployable UI (`intake/`, future apps) | Homepage copy (`index.html` at repo root) |
| APP-scoped JS/CSS/assets | Repo-wide HAI artifact chain |
| `APP/Projek-Managment/*` | `Projek-Managment/NEXT_STEP.md`, `BRIEFING.md`, `PROJECT_STATE.md` |
| Integration hooks in `src/worker.js` (Lane B, minimal diff) | Full website refactors |

## PM boundary (hard)

When working on an APP slice:

- **Write** slice state to `APP/Projek-Managment/` (PROJECT_STATE, BRIEFING, PAIR_PLAN, reports).
- **Never overwrite** repo-root `Projek-Managment/` canonical surfaces unless Samuel explicitly runs a repo-level HAI session.
- **Drift at repo level** → one append to `Projek-Managment/DRIFT_LOG.md`, not a silent replace.

Repo `Projek-Managment/` tracks the **whole website project**. APP `Projek-Managment/` tracks **one product slice**.

## Deploy path

- Source: `APP/<slice>/` (e.g. `APP/intake/`)
- Public URL: worker alias (e.g. `/intake/` → `APP/intake/*` in `src/worker.js`)
- Deploy: same Cloudflare worker as the main site; APP folders are static assets in the worker bundle.

## Verify before “done”

1. E2E on the public path (`/intake/`), not only file existence.
2. No backend persistence unless explicitly scoped (client-side v0 = DSGVO-safe default).
3. Slice PM updated under `APP/Projek-Managment/`, repo PM untouched.
