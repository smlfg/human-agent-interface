# CLAUDE CODE AGENT CONTEXT PACKET

## 1) What is Claude Code in this product?

Claude Code is the first-party coding agent we onboard to for users who say they use or want to use Claude Code. In this HAI shell, it is not the execution engine for visitors; it is the **onboarding subject**.

- Scope: explain what Claude Code can and should do.
- Goal: restore user control over scope, permissions, and verification before doing real work.
- Hard boundary for onboarding: no direct project execution for the user’s codebase; no file upload, no account linking, no payment.
- Positioning: “I help you configure and operate Claude Code safely” versus “I do your code for you.”

## 2) Official sources to study

Priority: official docs first.

- Product and capability:
  - https://code.claude.com/docs/en/overview
  - https://code.claude.com/docs/en/quickstart
- Configuration fundamentals:
  - https://code.claude.com/docs/en/settings
  - https://code.claude.com/docs/en/commands
  - https://code.claude.com/docs/en/claude-directory
  - https://code.claude.com/docs/en/memory
- Governance and safety:
  - https://code.claude.com/docs/en/permission-modes
  - https://code.claude.com/docs/en/hooks
  - https://code.claude.com/docs/en/hooks-guide
- Extensions:
  - https://code.claude.com/docs/en/skills
  - https://code.claude.com/docs/en/mcp
  - https://code.claude.com/docs/en/sub-agents
  - https://code.claude.com/docs/en/agent-sdk/slash-commands

## 3) Relevant GitHub/local repos/templates

Local and template references found in repository scan:

- `Münztelfon/HAI_LIVE_HARNESS_ONBOARDING_AGENT_V0.md`
  Product intent, constraints, and V0/V1 roadmap.
- `Münztelfon/CODEX_AGENT_CONTEXT_PACKET.md`
  Useful structure and risk-first framing for an onboarding packet.
- `Sidecar-Workspace/Sidecar-by-Codex/.claude/settings.template.json`
  Minimal permission/hook scaffold with hook command chaining.
- `Sidecar-Workspace/Sidecar-ng/.claude/settings.local.json`
  Per-project local hook enforcement baseline.
- `Sidecar-Workspace/Sidecar-by-Codex/knowledge/CLAUDE.md`
  Project-level delegation style and hard-rule precedence.
- `Sidecar-Workspace/Sidecar-by-Codex/knowledge/commands/*.md`
  Practical command/skill-style prompts for operations and verification.
- `anthropics/claude-plugins-official/plugins/mcp-server-dev`
  https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev
- `trailofbits/claude-code-config`
  https://github.com/trailofbits/claude-code-config
- `mculp settings reference gist`
  https://gist.github.com/mculp/c082bd1e5a439410158974de90c89db7
- `settings example gist`
  https://gist.github.com/pushkar96/4df627304cd625a08e03da4912af543a

## 4) Reusable patterns

- Intake-first routing:
  - Ask harness + objective first; only then shape onboarding depth.
- Deterministic V0 shape:
  - bounded chat/session windows, one packet at the end, explicit consent check.
- Pattern: **do not introduce new execution surface in V0**.
- Configuration stack:
  - Use `CLAUDE.md`, `settings.json`, and `hooks` only when needed.
  - Keep runtime or user-personal overrides in `.local` files where possible.
- Permission posture:
  - Prefer `defaultMode: plan` or `acceptEdits` over permissive modes.
  - Avoid `bypassPermissions` until explicitly approved.
- Hooks:
  - Use `UserPromptSubmit` for intake normalization.
  - Use `PreToolUse` for blocking destructive commands and unsafe tool calls.
  - Use `SessionEnd` for summary/debug logging (optional if user consent).
- MCP posture:
  - Keep MCP optional and user-visible in V0.
  - Connect only narrow-read tools first (e.g., read-only issue tracker or docs viewer), never sensitive write paths.
- Slash command hygiene:
  - Surface canonical commands (`/help`, `/init`, `/permissions`, `/skills`) and show they are optional.
  - Keep custom `/name` commands minimal and scoped to onboarding tasks.

## 5) Risks / security concerns

- Context leakage:
  - If hooks/commands write user data, redact and confirm consent before persistence.
- Permissions drift:
  - `defaultMode` and `permissions.allow/deny` mismatches can silently grant more than expected.
- Hook-based compromise risk:
  - Untrusted `.claude` files from third-party repos can include hooks that fire automatically.
- Network trust:
  - Claude Code can request external fetches; keep domains narrow.
- Overbroad auto modes:
  - `auto`/`bypassPermissions` can reduce prompting and amplify blast radius.
- MCP overreach:
  - Broad MCP tools can import data or actions outside user intent.
- State trust:
  - Persistent summaries should be explicit opt-in only.

## 6) HAI-specific onboarding guidance

- Make the session objective explicit in the first 60 seconds:
  1. what task,
  2. what boundary,
  3. what next action.
- Never promise guaranteed success for AI-generated outputs.
- Human stays merge/approval authority at every stage:
  - “proposed next action” not “executed action.”
- Start with a control baseline:
  - ask mode (`default`/`plan`),
  - list blocked categories,
  - define verification criterion.
- Keep the end state useful:
  - selected mode,
  - top 3 risk checks,
  - exact first next step,
  - one optional handoff action.
- Treat onboarding as a product: clear boundaries > broadness.

## 7) Recommended V0 scope

- Text-only Claude Code onboarding path.
- Bound session length via message cap and/or timer.
- Intake: harness chosen, skill level, recent issue, constraints.
- Produce a single structured session packet:
  - problem summary,
  - selected mode rationale,
  - 3-5 actionable setup points,
  - verification checks,
  - one recommended next step.
- Include optional command reference (`/help`, `/permissions`, `/hooks`, `/settings`, `/skills`).
- No payment, no voice, no file upload, no autonomous execution.

## 8) What not to build yet

- No payment flows.
- No voice capture/voice dictation.
- No autop-run tools against user repos.
- No persistent transcript storage without explicit user opt-in.
- No MCP write tools in V0 by default.
- No `bypassPermissions` / no `allow-all` network policies.
- No auto-generated PR/action loops.

## 9) Open questions

1. Should default onboarding use `plan` mode first, then switch, or start directly in `acceptEdits` with explicit instruction?
2. Which permission mode is acceptable for public beta, and how visible should we make permission state to users?
3. What is the minimum command set to expose (`/help`, `/permissions`, `/skills`) to avoid cognitive overload?
4. What should count as “high-confidence readiness” for ending a session?
5. Should we allow any MCP connectors in V0 (read-only only) or keep MCP off entirely?
6. Do we publish a fixed starter `settings.local.json` template for users, or generate one interactively?
7. What secrets / PII rules apply before even previewing logs to user?
8. Should the session packet include concrete code snippets, or remain control-only language?
9. How should we classify common beginner mistakes to keep onboarding useful in the first response?

## 10) Level 1 / 2 / 3 onboarding content

### Level 1 Orientation

- What is Claude Code for:
  - agentic coding assistant in terminal/IDE/web,
  - reads repo structure,
  - edits files and runs commands with approvals.
- Typical beginner mistakes:
  - skipping permissions setup,
  - delegating without a stop condition,
  - running broad commands with no guardrails,
  - expecting zero supervision in first tasks,
  - confusing local settings with global settings.
- Onboarding objective at this level:
  - one safe session blueprint, no execution commitment.

### Level 2 Setup / Configuration

- CLAUDE.md:
  - one file explains conventions, not credentials.
- Settings:
  - `permissions.allow / deny / ask`,
  - `defaultMode`,
  - `network.allow*` / `deny*`,
  - `hooks` placement and scope.
- Hooks:
  - what events exist (`UserPromptSubmit`, `PreToolUse`, `SessionEnd`),
  - matcher grammar,
  - exit/control behavior.
- Slash commands:
  - `/help`, `/permissions`, `/settings`, `/hooks`, `/skills`, `/plan`.
- MCP / subagents:
  - define when to add external tool access,
  - avoid enabling write-capable MCP in V0.

### Level 3 Workflow / HAI control

- Control rules:
  - user owns outcomes and approvals,
  - no implicit commits/PRs,
  - every session ends with verifiable checks.
- Bounded workflow:
  - one hypothesis → one constraint → one action path,
  - explicit stop and recap.
- Governance:
  - no secrets, no upload, no account linkage by default,
  - consent gate for any persistence.
- Merger authority:
  - the human decides acceptance, merge, and follow-up scope.
