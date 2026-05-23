# HERMES_AGENT_CONTEXT_PACKET

Status: **Research packet only** (no build, no config edits, no global install, no production file changes)

Purpose: reusable context for the HAI Live Harness Onboarding agent that routes website users choosing “Hermes” into a bounded onboarding flow.

## 1) What Hermes is in this product

In this HAI context, `Hermes` is a **personal control-plane** for agent workflows, not a single generic chatbot.

- It is profile-driven: roles are separated (HAI operator, verifier, project-manager, etc.).
- It carries project-specific memory, toolsets, and behavior through profile-local files.
- It already has a working “profile + SOUL + config + SKILL” pattern that matches this product’s human-owned workflow principle.
- Relevant implication for onboarding: the Hermes onboarding agent should mirror this same pattern—**small, role-scoped prompts**, explicit boundaries, and one clear next action at the end.

## 2) Official/local sources to study

### Local Hermes source-of-truth (mandatory first pass)

1. `~/.hermes/SOUL.md`
   Global identity + invariants (task-framed, direct communication, no guessing, no autonomous overreach).
2. `~/.hermes/config.yaml`
   Global non-secret defaults (provider/model/toolsets etc.) and profile inheritance behavior.
3. `~/.hermes/profiles/meta/AGENT_REGISTRY.md`
   Canonical profile inventory and governance pattern.
4. `~/.hermes/hermes-agent/AGENTS.md`
   Developer guidance and important rules (especially using `get_hermes_home()` for profile-safe pathing).
5. `~/.hermes/hermes-agent/website/docs/user-guide/profiles.md`
   Official profile semantics (profile dirs, aliases, `HERMES_HOME`, profile-specific `config.yaml`, `SOUL.md`, `~/.local/bin/<alias>` flow).
6. `~/.hermes/hermes-agent/website/docs/user-guide/profile-distributions.md`
   Distribution contract if later converting onboarding packet into installable profile distribution.
7. `~/.hermes/hermes-agent/agent/prompt_builder.py`
   Context loading order, context file priorities (`.hermes.md`/`AGENTS.md`/`CLAUDE.md`/`.cursorrules`), SOUL loading.
8. `~/.hermes/hermes-agent/hermes_constants.py`
   `get_hermes_home()` / profile-root semantics and why hardcoding `~/.hermes` is a risk.
9. `~/.hermes/profiles/hermes-harness-expert/*`
   Pattern for specialized Hermes-internal expert profile design.

### Local HAI sources (must-read for onboarding behavior)

1. `HAI_LIVE_HARNESS_ONBOARDING_AGENT_V0.md`
2. `HAI_MUENZTELEFON_V0.md`
3. `LIVE_AGENT_SHELL_CONTEXT_PACKET.md`
4. `Projek-Managment/CUSTOMER_INTAKE_CONCEPT.md`
5. `Projek-Managment/NEXT_STEP.md`
6. `Projek-Managment/DRIFT_LOG.md`
7. `Projek-Managment/FEATURE_HAI_LIVE_INTAKE_AGENT_2026-05-14_1719.md`
8. `setupinflow/index.html` (progressive disclosure and bounded intake pattern)
9. `src/worker.js` + `wrangler.jsonc` (for later routing/session boundaries)

No secrets should be printed: avoid `auth.json`, `.env`, API keys, tokens.

## 3) Relevant GitHub/local repos/templates

### Local/repo templates to reuse

- `~/.hermes/hermes-agent` (Hermes runtime, profiles, docs, tests)
- HAI project pages in `site/`, `samuel/`, `hermes/`, `proof/` for positioning copy patterns
- `setupinflow/index.html` as a working UI pattern for stepwise selection and low-overhead intake
- `Sidecar-Workspace` session-state patterns for timer/state caps (reusable conceptually, not copied code)

### GitHub/public prior art (only if helpful)

- `https://github.com/NousResearch/hermes-agent` (upstream runtime, CLI, profiles, gateway integrations)
- `https://github.com/openai/openai-realtime-agents` (for future V1 voice architecture only)
- `https://github.com/openai/openai-realtime-console` (voice/WebRTC integration reference; useful only if/when voice is implemented)

## 4) Reusable patterns for the Hermes onboarding agent

### Profile design pattern

- Keep profile scope tiny and explicit: one profile per stable function (e.g., onboarding specialist + triage support).
- In a profile, define:
  - `SOUL.md` = ownership, boundaries, tone, refusal rules
  - `config.yaml` = model/toolset policy
  - optional profile skills for helper commands
  - clear non-goals in SOUL (no autonomous edits, no file access, no secrets handling).
- Register/track profile intent in `~/.hermes/profiles/meta/AGENT_REGISTRY.md`.

### Context loading pattern (important for exactness)

- Global identity (`~/.hermes/SOUL.md`) is separate from project context.
- Project context is **single-source selected** in order: `.hermes.md`/`HERMES.md` (walk-to-git-root) then `AGENTS.md` then `CLAUDE.md`, else `.cursorrules`.
- Context source is loaded once and not duplicated; this should map to the onboarding system prompt strategy: fixed identity + bounded per-session state.

### Safety/ownership pattern

- Ask 1 question at a time when onboarding ambiguous users.
- Explicitly ban:
  - code execution
  - repo/file access
  - account actions
  - secrets collection.
- End every interaction with one concrete next action and optional opt-in handoff.

### Routing pattern (for live shell compatibility)

- Keep routing thin: user chooses harness → specialist prompt profile route.
- For Hermes onboarding this means:
  - `Hermes` → Hermes onboarding profile
  - `Unknown` → general HAI triage profile
  - no tool execution in any path.

## 5) Risks / security concerns

1. **Profile contamination**
   Wrong `HERMES_HOME` usage can write into wrong profile. Avoid hardcoded paths; prefer profile-aware helpers.

2. **Secret leakage**
   Never ask users for API keys, tokens, `.env`, bot tokens, or repository URLs with credentials.

3. **Scope creep / uncontrolled fanout**
   A few onboarding turns can become architecture advice, tool recommendation loops, or unsolicited execution proposals. Must cap to bounded guidance.

4. **Queue and abuse risk (future V1)**
   Without strict rate limiting and retention policy, queueing and public sessions become a misuse vector.

5. **Consent / retention**
   Session persistence only with explicit opt-in. No long-term memory unless explicitly requested.

6. **Privacy and safety framing**
   Don’t overclaim what the agent can do; no legal/financial/security advice as definitive.

## 6) HAI-specific onboarding guidance

- Start at user intent, not tooling:
  - What is currently broken or unclear?
  - Which harness stage are they at (tool user / agentic builder / workflow operator)?
  - What must remain exclusively human-owned?
- Position onboarding around bounded ownership:
  - define decision split (human vs agent),
  - define minimum verification rule,
  - define a finite next action.
- For unknown harnesses, route to triage before profile recommendation.
- Produce concise session packet fields:
  - problem summary
  - selected harness and level
  - top 1–3 risks
  - one concrete next action
  - explicit “I do not execute, I help you route and decide” boundary.

## 7) Recommended V0 scope

### V0 for implementation (minimal but useful)

- Text-only onboarding session, no voice, no file uploads.
- Inputs: harness choice + concise context.
- Bounded output: orientation summary + next action + consented contact.
- 1 routing path per selected harness, but can run in one combined profile surface at first.
- No payment, no queue, no persistence by default.
- Reuse existing static shell + short state object only.

### Suggested onboarding packet schema (session-only)

- `selected_harness`
- `user_level`
- `main_problem`
- `goal`
- `constraints` (e.g., no secrets, no execution, no uploads)
- `summary` (final)
- `handoff_status` (`none`, `interested`, `opt_in`)

## 8) What not to build yet

- No production code execution, shell tooling, account actions, or repo access.
- No auto-install of tooling, no new npm/pip dependencies.
- No global config edits in user profiles unless explicitly asked.
- No real payment, no public queue, no voice, no uploads in V0.
- No CRM/analytics writes or autonomous messaging/email.
- No broad site redesign from this packet alone.

## 9) Open questions

1. Should V0 be purely internal/public-test or immediately exposed publicly?
2. Should Hermes Onboarding start as:
   - a dedicated profile in `~/.hermes` only, or
   - a special frontend-only session profile first?
3. What exactly should the session summary template be (copy block, packet fields, checklist)?
4. Which harnesses first: Hermes only, or pair with Claude Code/Codex simultaneously?
5. Which intake source fields are strictly mandatory vs optional for minimal drift?
6. What default consent text should gate any saved summary?
7. What is the first lead qualification threshold (any completion vs confidence threshold)?
8. Should this follow full HAI `NEXT_STEP` governance artifacts from day 1?

## 10) Level 1 / 2 / 3 onboarding content for Hermes

### Level 1 — Orientation (first contact)

Goal: quickly answer “what is this and what is it good for?” for beginners.

Include:

- What Hermes is in plain terms:
  - “Profile-based control layer for agent workflows.”
  - “One role to plan, one to execute, one to verify.”
- What it helps with:
  - reducing confusion
  - separating decision rights
  - improving repeatable setup.
- Beginner mistakes to catch early:
  - one profile trying to do everything
  - no ownership split (human vs harness)
  - secrets and credentials in chat
  - expecting autonomous problem solving without explicit bounds.
- What “done for now” looks like:
  - clearer decision split
  - one next step identified.

### Level 2 — Setup / Configuration

Goal: reduce “I don’t know what to configure” friction.

- Explain profile model:
  - default profile vs project/use-case profile
  - each profile has own `config.yaml`, `SOUL.md`, `.env`, memory.
- Concrete guidance:
 1. Set profile with `hermes profile create` (or equivalent UI flow in your implementation).
 2. Put stable personality in profile `SOUL.md`.
 3. Keep only needed toolsets in `config.yaml`.
 4. Route harness-specific MCP plugins only where needed.
 5. Keep terminal cwd/capabilities explicit per profile.
- Common safe default:
  - no broad toolsets,
  - no sensitive default actions,
  - explicit human-confirmation surfaces.
- Show minimal command checklist (copy/paste):
  - `hermes profile create <name>`
  - `hermes <name> config set ...`
  - `hermes <name> chat`
  - `hermes doctor`
- Boundaries:
  - No file discovery, no edits, no secrets handling without explicit purpose.

### Level 3 — Workflow / HAI control

Goal: transition from setup to controlled operating model.

- Owner decisions:
  - scope, risk, and approval boundary per session
  - what must never be automated.
- Bounded project prep:
 1. Define problem + success signal.
 2. Define “verification that would prove this is useful.”
 3. Start with one small scope step.
- HAI integration:
  - use `NEXT_STEP.md` as the one active decision lock
  - `DRIFT_LOG.md` for parked side tracks
  - `Projek-Managment` state files as canonical decision artifacts.
- Fanout control:
  - never spawn a second agent without a single clear handoff reason.
- Verification:
  - each answer should end with “human-owned next action” and “rejected if no signal.”.
- No uncontrolled fanout:
  - if uncertainty > scope, pause and ask one concrete follow-up, not a full architecture pitch.
