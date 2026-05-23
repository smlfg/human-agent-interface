# Manual HAI Harness Check Protocol V0

Checked: 2026-05-18

Purpose: Prove whether the HAI Harness Operator idea works before building payment, voice, a course platform, or a bigger product.

Core rule:

```text
Do not prove this by building more infrastructure.
Prove it by helping 5 real people leave a short session with more control.
```

## 1. Success Definition

The proof loop succeeds if at least 3 of 5 sessions end with the participant able to answer:

1. What should I do next?
2. What must the agent not do?
3. What evidence would prove that the next step worked?

If fewer than 3 of 5 sessions reach this, do not build V1. Sharpen the method first.

## 2. V0 Scope

Allowed:

- Manual or text-only session.
- 10 minutes maximum.
- 8-12 user messages maximum.
- Harness selection.
- HAI explanation in context.
- Setup or workflow advice.
- One session packet at the end.
- Optional follow-up question.

Not allowed:

- Payment.
- Voice.
- User uploads.
- Repo access.
- Account access.
- Secrets.
- Agent execution inside the user's project.
- Generic "School of Agents" positioning.
- Course platform, certificate, or community features.

This is a validation protocol, not a product launch.

## 3. Participant Mix

Run exactly 5 sessions:

| Session | Participant type | Why |
| --- | --- | --- |
| 1 | Claude Code or Codex user | Direct harness-fit test |
| 2 | Claude Code or Codex user | Repeatability check |
| 3 | Beginner | Tests whether the framing is understandable |
| 4 | Unknown / unsure tool user | Tests General HAI Triage |
| 5 | Samuel dogfooding | Tests whether this helps Samuel's own harness control |

Do not recruit perfect users. The point is real confusion, not ideal demos.

## 4. Pre-Session Intake

Ask only these four things before the session:

```text
1. Which harness/tool do you use?
2. What happened recently that felt messy or unsafe?
3. What do you want to be clearer after 10 minutes?
4. What must the agent definitely not do?
```

Harness choices:

- Claude Code
- Codex
- Cursor
- Hermes
- OpenCode
- ChatGPT / custom setup
- I do not know

Level choices:

- Beginner
- Intermediate
- Power user

## 5. Session Opening Script

Use this script, adapted to the user's language:

```text
This is not a session where an agent does your work.
This is a 10-minute harness check.
The goal is to make your next agent step smaller, safer, and easier to verify.
Do not share secrets, tokens, private repo dumps, or account data.
At the end you get one session packet with your next safe step.
```

If the user asks for execution, say:

```text
I can help define the task and guardrails, but I will not run it here.
```

## 6. Classification

Classify the session into exactly one main level:

| Level | Use when | Main output |
| --- | --- | --- |
| Level 1 - Orientation | User does not understand the harness or when to use it | Explain what the harness is good for and one safe first use |
| Level 2 - Setup / Configuration | User has a tool but weak prompts, rules, files, permissions, or memory | Suggest a small setup improvement |
| Level 3 - Workflow / HAI Steering | User already uses agents but loses scope, ownership, or verification | Define control flow, gates, evidence, stop rule |

Do not teach all three levels in one session. Pick the dominant one.

## 7. The 10-Minute Flow

### Minute 0-1: Frame

- Confirm harness.
- Confirm no secrets/uploads/account access.
- State the session goal.

### Minute 1-3: Problem

Ask:

```text
What did the agent do that made you lose confidence or control?
```

Capture:

- main problem,
- concrete recent example,
- user level,
- risk.

### Minute 3-5: Boundary

Ask:

```text
What decision must stay with you, not the agent?
```

Capture:

- forbidden action,
- human gate,
- autonomy boundary.

### Minute 5-7: Next Step

Ask:

```text
What is the smallest useful next step the agent could prepare without taking ownership?
```

Convert vague goals into one bounded task.

### Minute 7-9: Verification

Ask:

```text
What evidence would make you trust the result?
```

Examples:

- test passes,
- diff is small,
- checklist completed,
- summary with sources,
- no file changes,
- manual review required.

### Minute 9-10: Session Packet

Produce the final packet. Do not open new topics.

## 8. Session Packet Template

Copy this at the end of every session:

````markdown
# HAI Harness Check Packet

## Current Problem
<one sentence>

## Harness
<Claude Code / Codex / Hermes / Cursor / OpenCode / Unknown>

## User Level
<Beginner / Intermediate / Power user>

## Main HAI Level
<Orientation / Setup / Workflow>

## Ownership Boundary
The human keeps ownership over:
- <decision>

The agent must not:
- <forbidden action>

## Next Safe Step
<one concrete next step>

## Verification Rule
This counts as done only if:
- <evidence>

## Suggested Prompt / Rule
```text
<short reusable prompt or rule for the user's harness>
```

## Follow-Up
<optional: no follow-up / send to Samuel / book deeper HAI setup>
````

## 9. Scoring After Each Session

Score each session immediately after it ends.

| Question | Score |
| --- | --- |
| Did the user understand their problem better? | 0 / 1 |
| Did the user leave with one smaller next step? | 0 / 1 |
| Did the user name a boundary the agent must not cross? | 0 / 1 |
| Did the user name evidence for "done"? | 0 / 1 |
| Did the session avoid scope creep? | 0 / 1 |

Session passes if score is 4/5 or 5/5.

Overall proof passes if at least 3 sessions pass.

## 10. Session Log Template

Create one short log per session:

```markdown
# Harness Check Session <1-5>

Date:
Participant:
Harness:
Level:
Main HAI Level:

## Starting Problem

## Key Confusion

## What Helped

## Final Packet

## Score
- Problem clearer: 0/1
- Smaller next step: 0/1
- Boundary named: 0/1
- Evidence named: 0/1
- Scope contained: 0/1

Total:
Pass: yes/no

## Method Note
What should change before the next session?
```

Suggested storage:

```text
manual-checks/session-01.md
manual-checks/session-02.md
manual-checks/session-03.md
manual-checks/session-04.md
manual-checks/session-05.md
```

Only store real participant details with consent. Otherwise anonymize.

## 11. Stop Rules

Stop or redirect the session if:

- the user shares secrets, tokens, passwords, private repo dumps, or account data,
- the user asks the agent to execute work in their repo,
- the conversation becomes legal, medical, financial, or high-risk security advice,
- the session turns into a broad course request,
- the user wants a full architecture plan instead of one next step,
- the user cannot name any concrete current problem.

Use this line:

```text
This is outside the 10-minute harness check. I can only help define a safer next step here.
```

## 12. What Samuel Should Practice

Before the first external session, practice the dogfooding session:

```text
Harness: Codex / Claude Code / Hermes
Problem: I create too many artifacts and lose the next owner decision.
Boundary: Do not spawn broad agent work or build a platform.
Next safe step: Run one 10-minute manual check protocol.
Evidence: A session packet exists and contains one next action and one stop rule.
```

This keeps the product honest: the method must work on Samuel's own failure modes first.

## 13. Decision After 5 Sessions

After all 5 sessions, fill this:

```markdown
# HAI Harness Check Proof Decision

Sessions passed:
Sessions failed:

## Strongest Evidence
<what repeatedly helped users>

## Weakest Point
<what confused users or did not work>

## Decision
Choose one:
- Continue V0 manually
- Improve protocol and run 5 more
- Build small website lead flow
- Build V1 voice/payment later
- Stop this product track

## Reason
<2-5 sentences>
```

Default decision rule:

```text
Do not build V1 unless 3/5 sessions pass and at least 2 people ask for a follow-up.
```

## 14. Final Operating Principle

The product is not:

```text
I teach agents because I never make mistakes.
```

The product is:

```text
I help you make agent mistakes smaller, earlier, and less dangerous.
```

That is the operator layer HAI can own.
