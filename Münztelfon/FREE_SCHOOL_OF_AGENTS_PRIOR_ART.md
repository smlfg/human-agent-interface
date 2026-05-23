# Free School Of Agents Prior Art

Checked: 2026-05-18

Purpose: Capture what free or mostly free "learn agents" offers already provide, so HAI does not accidentally become another generic agent course.

Core verdict:

```text
The free web is already strong for "how to build agents".
The open gap is "how humans operate agent harnesses without losing ownership, scope, and verification".
```

## 1. What Free Offers Already Teach

| Offer | Provider | What it offers | Strength | HAI relevance |
| --- | --- | --- | --- | --- |
| [AI Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) | Hugging Face | Agent fundamentals, tools/actions/observations, smolagents, LlamaIndex, LangGraph, agentic RAG, final project, observability/evaluation bonus | Best broad free curriculum for building agents | Good source for technical foundations, but not a human-ownership curriculum |
| [AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners) | Microsoft | Beginner lessons, videos, Python samples, Microsoft Agent Framework, Azure AI Foundry, multi-language material | Strong beginner path and code samples | Useful for "agent concepts", less focused on personal harness operation |
| [LangSmith Fleet Course: Build No-Code Agents](https://academy.langchain.com/courses/quickstart-agent-builder/) | LangChain Academy | No-code agent builder, triggers, agent inbox, templates, subagents, MCP, skills | Quick product-builder onboarding | Shows current market language: agent builder, triggers, inbox, subagents |
| [Building Reliable Agents](https://academy.langchain.com/courses/building-reliable-agents) | LangChain Academy | Agent engineering lifecycle, observability, tracing, evaluating agents, datasets, experiments, production readiness | Strong on reliability and evaluation tooling | Close to HAI technically, but platform/tool-centered rather than human-owner-centered |
| [AI Agents in LangGraph](https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/information) | DeepLearning.AI / LangChain | Build an agent from scratch, LangGraph components, persistence, streaming, human-in-the-loop, agentic search | Good intermediate course for controllable workflow graphs | Useful HAI source for state, control flow, and human-in-the-loop vocabulary |
| [Claude Code: A Highly Agentic Coding Assistant](https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/information) | DeepLearning.AI / Anthropic | Claude Code workflow, codebase exploration, testing, refactoring, debugging, MCP, `CLAUDE.md` | Strong direct overlap with harness onboarding | Direct competitor/source for Claude Code onboarding; HAI must add ownership and scope discipline |
| [OpenAI Agents SDK docs](https://developers.openai.com/api/docs/guides/agents) | OpenAI | Agents, tools, handoffs, state, approvals, guardrails, tracing, evaluation, voice agents | Strong official implementation reference | Good for V1 architecture and vocabulary, not a course for overwhelmed users |
| [OpenAI Human-in-the-loop guide](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/) | OpenAI | Tool approval interruptions, approve/reject flow, resumable run state | Concrete approval-gate pattern | Technically validates HAI's human gate idea |
| [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices?curius=1527) | Anthropic | Context management, course-correcting, subagents, checkpoints, resume, common failure patterns | Best official Claude Code operator source | Must be primary source for Claude-Code-Onboarding-Agent |
| [Google Agent Development Kit](https://adk.dev/) | Google | Build, debug, deploy production agents; tools, sessions, memory, routing, multi-agent systems, evaluation, safety/security | Broad production agent framework | Useful for understanding current framework breadth; too broad for HAI V0 |
| [AI Agent Workflows Using LangGraph](https://www.mygreatlearning.com/academy/learn-for-free/courses/ai-agent-workflows-using-langgraph) | Great Learning | Agent fundamentals, graph workflow design, setup, implementation, multi-agent patterns | Beginner-friendly free course with certificate upsell | Confirms generic beginner agent education is crowded |
| [Agentic AI: LangChain and LangGraph](https://truescho.com/en/courses/agentic-ai-with-langchain-and-langgraph) | IBM / edX listing | Agentic systems with LangChain/LangGraph, reflection, ReAct, RAG, multi-agent orchestration | Free-to-audit style academic/course market signal | Another sign that "agentic AI course" is not differentiated |

## 2. Pattern Across The Free Web

Most free material clusters around these themes:

- Agent fundamentals: tools, reasoning loops, actions, observations, ReAct.
- Framework onboarding: LangGraph, smolagents, AutoGen/Microsoft Agent Framework, OpenAI Agents SDK, Google ADK.
- Multi-agent orchestration: routing, handoffs, subagents, graph workflows.
- Technical reliability: tracing, observability, evaluation datasets, experiments.
- Coding-agent use: Claude Code workflows, MCP, memory files, project exploration.
- Production deployment: sessions, memory, hosted tools, safety, monitoring.

This means information access is not scarce. The user can already find a lot of good material for free.

## 3. What These Offers Do Not Really Solve

The missing layer is not "what is an agent?".

The missing layer is:

- When should I not use an agent?
- What exactly may the agent do?
- What must remain my decision?
- How small should the task be?
- How do I stop scope drift?
- How do I know the result is actually done?
- How do I avoid being buried under outputs?
- Which harness fits my current cognitive load?
- What should I write into `AGENTS.md`, `CLAUDE.md`, rules, prompts, or skills?
- How do I recover when the agent went too broad?

That is the HAI gap.

## 4. Implication For "School Of Agents"

Generic positioning:

```text
Learn AI agents.
Build agents.
Use agent frameworks.
Become an agent developer.
```

Verdict: crowded, late, and hard to defend.

HAI positioning:

```text
Learn to operate your agent harness without losing ownership.
Turn vague agent work into bounded, verifiable human-owned workflows.
```

Verdict: more defensible.

The product should not compete with Hugging Face, Microsoft, LangChain, OpenAI, Anthropic, Google, or DeepLearning.AI as a generic course provider. It should curate and translate their material into an operator discipline.

## 5. Useful Curriculum Shape For HAI

HAI should use three levels:

### Level 1 - Orientation

Goal: the user understands what their harness is and when it is useful.

Questions:

- What is this harness?
- What is it good at?
- What are typical beginner mistakes?
- What should the user not expect from it?

Free-web sources:

- Hugging Face for agent basics.
- Microsoft for beginner-friendly concepts.
- Claude Code docs for coding-agent-specific behavior.
- OpenAI Agents SDK for general agent vocabulary.

### Level 2 - Setup / Configuration

Goal: the user can configure the harness in a small, safe way.

Questions:

- Which local instruction file matters?
- Which rules or skills should exist?
- What context should be provided?
- What permissions should remain blocked?
- What should be excluded from memory or logs?

Free-web sources:

- Claude Code best practices for `CLAUDE.md`, context, checkpoints, and subagents.
- OpenAI Agents SDK for handoffs, guardrails, sessions, and human review.
- Google ADK for sessions, memory, routing, and evaluation vocabulary.
- LangChain Academy for observability and evaluation patterns.

### Level 3 - Workflow / HAI Steering

Goal: the user can work with agents without losing ownership.

Questions:

- What is the bounded task?
- What is the human gate?
- What evidence proves done?
- What is the stop condition?
- What is the next safe step?

Free-web sources:

- OpenAI human-in-the-loop approval flow.
- LangGraph human-in-the-loop and persistence examples.
- LangChain reliability/evaluation course.
- Claude Code failure-pattern and context-management guidance.

This is where HAI should be strongest.

## 6. HAI Differentiation

HAI should not claim:

```text
We have the best agent course.
We know agents better than the official docs.
We teach everything about agent frameworks.
```

HAI can credibly claim:

```text
We help you turn agent tools into controllable work.
We translate official harness docs into human-owned workflows.
We teach the missing operator layer: scope, gates, verification, and stop rules.
```

The user's pain is usually not lack of content. The pain is:

```text
I have too much agent output and too little control.
```

## 7. Recommended V0 Use

Use this prior art only as source context for:

- HAI Live Harness Onboarding Agent.
- Claude-Code-Onboarding-Agent.
- Codex-Onboarding-Agent.
- Hermes-Onboarding-Agent.
- Future HAI Harness Operator Training.

V0 should not become a course platform.

V0 should stay:

```text
Harness selection
specialized onboarding prompt
8-12 message session
summary
contact CTA
no payment
no upload
no tool execution
```

## 8. What Not To Build Yet

Do not build:

- A full "School of Agents" platform.
- Video lessons.
- Certificates.
- A generic agent framework tutorial.
- A large public curriculum.
- Multi-harness deep courseware.
- Paid course infrastructure.
- Community/forum features.
- Student leaderboards.
- A replacement for official docs.

Build first:

```text
One live HAI harness check that turns a user's concrete agent problem into a safe next step.
```

## 9. Open Questions

1. Should the education track be named at all, or should it stay embedded inside the live harness check?
2. Is "School of Agents" too guru-like and therefore wrong for Samuel's honest positioning?
3. Should the public term be "Agent Operator Training" instead?
4. Which free sources should each onboarding agent cite directly?
5. Should HAI publish curated reading paths instead of its own lessons?
6. What is the smallest proof that HAI adds value beyond the free web?
7. Should the first HAI educational artifact be "How not to lose control with Claude Code" rather than a full curriculum?

## 10. Working Conclusion

The free web does not kill HAI. It kills a lazy version of HAI.

Bad idea:

```text
Another course explaining agents.
```

Good idea:

```text
A harness operator layer that helps people use Claude Code, Codex, Hermes, and similar tools with ownership, bounded scope, and verification.
```

Samuel does not need to pose as someone who never makes mistakes. The honest authority is:

```text
I have made many of the typical agent mistakes. HAI is the method for making those mistakes smaller, earlier, and less dangerous.
```
