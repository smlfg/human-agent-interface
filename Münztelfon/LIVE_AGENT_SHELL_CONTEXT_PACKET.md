# Live Agent Shell Context Packet

Research worker scope: `Router / Intake / Payment / Session Shell` for the HAI Live Harness Onboarding project.

Constraints honored: no implementation, no global install, no dependencies added, no production files modified.

## 1. What this component is

The Live Agent Shell is the wrapper around specialized harness onboarding agents.

It owns:

- Harness intake: "Welches Harness nutzt du?"
- Routing: Claude Code -> Claude-Code-Agent, Codex -> Codex-Agent, Hermes -> Hermes-Agent, Unknown -> General HAI Triage Agent.
- Session limits: timer plus 8-12 message cap for V0.
- Chat surface: text-only first, voice plus text later.
- Session state: selected harness, user level, main problem, goal, constraints, recommendations, summary.
- Session summary: compact written packet at the end.
- Contact CTA: opt-in handoff to Samuel.
- V1 payment gate: Stripe or PayPal before unlocking 10 minutes.
- V1 consent gate: user must explicitly allow Samuel to see/store the lead summary.

The shell is not the domain expert. It should not contain all Claude/Codex/Hermes onboarding knowledge. Its job is to route, constrain, record state, and end the session cleanly.

## 2. Official sources to study

OpenAI / Voice / Realtime:

- [OpenAI Voice agents guide](https://developers.openai.com/api/docs/guides/voice-agents) - start here for V1 voice agents. It separates session transport from agent business logic and describes the browser flow with an ephemeral client secret, `RealtimeSession`, WebRTC/browser or WebSocket/server connection, plus guardrails/handoffs.
- [OpenAI Realtime API with WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc) - official browser speech-to-speech transport. Important point: use a backend to create sessions or ephemeral credentials; do not expose a standard OpenAI API key in the browser.
- [OpenAI Realtime and audio overview](https://developers.openai.com/api/docs/guides/realtime) - current GA flow and event shape. Avoid old beta examples.
- [OpenAI Realtime API with WebSocket](https://developers.openai.com/api/docs/guides/realtime-websocket) - useful for server-side or worker-side flows; browser clients should prefer WebRTC where possible.
- [OpenAI Realtime Console repo](https://github.com/openai/openai-realtime-console) - lightweight official-ish example app linked from the WebRTC docs.
- [OpenAI Realtime Agents repo](https://github.com/openai/openai-realtime-agents) - stronger prior art for multi-agent handoffs, realtime agents, and scenario routing.

Payment:

- [Stripe Checkout Sessions API](https://docs.stripe.com/api/checkout/sessions/create) - V1 custom payment unlock path: create a one-time `payment` mode Checkout Session, redirect/return, then unlock a session.
- [Stripe Payment Links](https://docs.stripe.com/payments/no-code) - simplest no-code fallback for validating willingness to pay before building a full payment/session unlock.
- [Stripe webhooks](https://docs.stripe.com/webhooks) - needed once payment unlock becomes automatic. Verify signatures and treat Stripe as source of payment truth.
- [PayPal Orders v2](https://developer.paypal.com/docs/api/orders/v2/) - create, authorize/capture, and inspect orders.
- [PayPal JavaScript SDK reference](https://developer.paypal.com/sdk/js/reference/) - client button and server create/capture flow.

Hosting / current repo fit:

- [Cloudflare Workers static assets config](https://developers.cloudflare.com/workers/wrangler/configuration/) - current HAI repo already uses Workers static assets and `run_worker_first` for `/api/*`.
- [Cloudflare Workers static assets binding](https://developers.cloudflare.com/workers/static-assets/binding/) - relevant because the current site serves static files and routes API calls through `src/worker.js`.

Local sources inspected:

- `/home/smlflg/Projekte/Human-Agent-Interface/wrangler.jsonc` - static assets with Worker-first `/api/*`, R2 binding, exclusions for private folders.
- `/home/smlflg/Projekte/Human-Agent-Interface/src/worker.js` - existing consent-first upload API with input limits, CORS, filename normalization, SHA-256, and no-store metadata.
- `/home/smlflg/Projekte/Human-Agent-Interface/setupinflow/index.html` - existing progressive intake UI: one visible step, choices first, copyable packet, no backend submission.
- `/home/smlflg/Projekte/Voicemode/README.md` - local STT/TTS split and Edge TTS wrapper notes.
- `/home/smlflg/Projekte/MyAIGame/portable/tui-design/VOICE_INTEGRATION.md` - mature local voice architecture: STT layer, TTS layer, intent router, narration filter, confirmation for destructive actions.
- `/home/smlflg/Projekte/Sidecar-Workspace/Sidecar-V7-V2/core/sidecar_core/session_state.py` - local session-state pattern with session id, goals, counts, phase, pipeline phase, TTS history, plan gate, and active time.
- `/home/smlflg/Projekte/Sidecar-Workspace/Sidecar-V7/samuel/sidecar_samuel/time_tracker.py` - lightweight timer/session-duration logic.
- `/home/smlflg/Projekte/PraxisHAIV0/01_REQUIREMENTS.md` - HAI cockpit requirements for voice/text fallback, work packets, owner packets, and human ownership.

## 3. Relevant GitHub repos/templates

Recommended to study:

- [openai/openai-realtime-console](https://github.com/openai/openai-realtime-console) - best for V1 WebRTC mechanics and event visibility. Reuse pattern: small server endpoint plus frontend event panel. Do not copy wholesale into V0.
- [openai/openai-realtime-agents](https://github.com/openai/openai-realtime-agents) - best for V1/V2 agent handoff architecture. Reuse pattern: specialized agents and sequential handoffs. Avoid V0 complexity.
- [openai/openai-cs-agents-demo](https://github.com/openai/openai-cs-agents-demo) - useful for human-in-the-loop customer-service style flows. Reuse pattern: keep a human decision surface separate from customer chat.
- [openai/openai-support-agent-demo](https://github.com/openai/openai-support-agent-demo) - useful for suggested responses and human control. Avoid file-search/upload for V0.
- [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) - strong React chat UI primitives with streaming, accessibility, voice dictation, tool rendering, and human approvals. Reuse ideas if moving to React; avoid adding this dependency to the static HAI V0.
- [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot) - full Next.js AI chatbot template with persistence/auth. Useful as reference for mature chat state; too heavy for current static Cloudflare V0.
- [huggingface/chat-ui](https://github.com/huggingface/chat-ui) - mature open-source chat app. Useful for session/history concepts; too broad for a 10-minute shell.
- [webrtcHacks/gpt-realtime-webrtc](https://github.com/webrtcHacks/aiy-chatgpt-webrtc) - small WebRTC example. Useful for understanding browser WebRTC basics; not a product shell.

Local prior art to reuse conceptually:

- `setupinflow/index.html` for progressive disclosure and copyable packet generation.
- `src/worker.js` for consent, request limits, no-store responses, safe normalization, and R2 metadata pattern.
- Sidecar session state for a small session object with explicit phase/timer/history fields.
- MyAIGame voice architecture for STT/TTS separation and destructive-action confirmation.

## 4. Reusable patterns

V0 shell:

- Use a static page plus small script first.
- Store session state in browser memory only for V0.
- Ask one routing question first: "Welches Harness nutzt du?"
- Route to a prompt profile, not a separate deployed service yet.
- Keep the UI dense but calm: harness selector, current transcript/chat, timer/message count, summary panel, contact CTA.
- End the session deterministically after 8-12 user messages or timer expiry.
- Generate the Session Summary locally from the current conversation state and final agent response.
- Make contact CTA opt-in: name/email/message plus consent checkbox.

Existing HAI repo pattern:

- Worker API routes should live under `/api/*`, matching current `wrangler.jsonc`.
- Keep private folders excluded from deploy.
- Follow the existing `src/worker.js` style: explicit method checks, content limits, input normalization, CORS only where needed, JSON `no-store` responses.
- If storing lead summaries later, copy the consent metadata approach from `client-handoff-upload`: consent version, purpose, limits, timestamp, SHA or stable ID.

V1 voice:

- Use OpenAI Voice agents as the high-level architecture reference.
- Keep transport in the session layer and business logic in the agent definition.
- Browser voice should prefer WebRTC.
- Backend must mint session credentials or create the Realtime call; never expose the standard OpenAI API key in the browser.
- Keep visible transcript even when voice is active.
- Treat audio as enhancement; text fallback remains mandatory.

V1 payment:

- Start with Stripe Checkout Session for a real integration, or Payment Link for a manual low-code validation.
- Unlock session only after payment success is verified by server-side state or trusted webhook, not by client-only redirect.
- PayPal needs create-order plus capture-order server flow if used.
- For 1 EUR payments, keep the product fixed and simple: one product, one duration, one session unlock.

## 5. Risks/security concerns

Payment:

- Client-side redirect alone is not proof of payment.
- Webhooks need signature verification and raw body handling.
- Stripe Payment Links are easy but weak for one-session unlock logic because links can be shared and payment-to-session mapping needs extra state.
- PayPal introduces create/capture complexity; use only if Stripe alone is not enough for early validation.

OpenAI voice:

- Never expose standard OpenAI API keys in browser code.
- Use ephemeral credentials or backend-created Realtime sessions.
- WebSocket from browser is not the preferred path; WebRTC is the better browser default.
- Realtime voice adds latency, VAD, interruption, and transcript consistency issues. Keep it V1.

Session/privacy:

- Do not store conversation content by default.
- Ask explicit consent before storing a lead summary for Samuel.
- Do not accept secrets, API keys, private repo dumps, or long private files.
- Keep "no user upload" in V0.
- Do not let the agent access user accounts or execute tools.

Product:

- Payment + voice + routing + summaries can become a complexity trap.
- V0 should validate whether the harness onboarding conversation helps before building paid voice.
- The shell must not become a generic AI chat widget.

## 6. HAI-specific onboarding guidance

The shell should enforce HAI before the specialized agent starts:

1. Name the harness.
2. Name the current problem.
3. Name the user's level.
4. Name what the agent may not do.
5. Keep the session bounded.
6. End with one concrete next step and a summary.

Shell intake fields:

- `selected_harness`: Claude Code, Codex, Hermes, Unknown.
- `user_level`: beginner, intermediate, power user.
- `main_problem`: short free text.
- `goal`: what should improve.
- `constraints`: no secrets, no upload, no account access, small steps, human control.

Shell summary fields:

- Current agent problem.
- Selected harness.
- User level.
- Recommended specialist route.
- One safe next step.
- 1-3 setup or workflow recommendations.
- HAI principles used.
- Contact CTA with consent.

HAI tone:

- "We make your agent workflow controllable" beats "ask an AI anything".
- The agent should be explicit that it explains, structures, and suggests; it does not act autonomously.
- For Unknown, route to General HAI Triage and classify before recommending a harness.

## 7. Recommended V0 scope

Build target later:

```text
Text-only HAI Harness Onboarding Demo
- Harness-Auswahl
- Routing zu spezialisiertem Agentenprompt
- Session-Limit: 8-12 Nachrichten
- Session Summary
- Contact CTA
- keine Zahlung
- kein User-Upload
- kein Tool-Zugriff
```

Recommended technical V0:

- One static route in the existing HAI site.
- One browser-side session object.
- One router function:
  - Claude Code -> Claude-Code prompt profile.
  - Codex -> Codex prompt profile.
  - Hermes -> Hermes prompt profile.
  - Unknown -> General HAI Triage prompt profile.
- A visible message counter.
- Optional visible timer, but message cap is enough for the first text demo.
- A fixed summary template.
- A consent checkbox before contact/lead submission.
- No persistence unless user opts in.

Use existing HAI patterns:

- Copy the progressive disclosure interaction model from `setupinflow/index.html`.
- Reuse the current Worker API style only if lead capture must post to the server.
- Defer R2 storage until there is a real need to store consented lead summaries.

## 8. What not to build yet

Do not build in V0:

- Payment.
- Voice input.
- Voice output.
- OpenAI Realtime integration.
- Pay-as-you-go "coin refill".
- Public queue.
- User upload.
- File search.
- Account login.
- Long-term memory.
- Samuel dashboard.
- Autonomous tool execution.
- Repo access.
- Multi-agent backend orchestration.
- New app framework migration.
- New dependencies.

Do not install globally:

- No Stripe CLI.
- No Vercel CLI.
- No new npm package.
- No new Python package.
- No OpenAI SDK changes.

V1 is the earliest place for:

- OpenAI Realtime / Voice agents.
- Stripe or PayPal payment.
- 10-minute paid timer.
- Session consent and lead summary storage.

## 9. Open questions

1. Is the first external V0 public on the HAI website, or hidden/test-only?
2. Should V0 include a backend model call, or should it be a scripted/mock onboarding demo first?
3. Where should the first context packet live if consented: R2 bucket, email-only, or local/manual?
4. Is Stripe enough for V1, or is PayPal required because of the "Muenztelefon" metaphor?
5. Should V1 payment use Checkout Sessions or Payment Links for the first paid test?
6. Does the paid timer start immediately after payment or after first user message?
7. What is the exact message cap: 8, 10, or 12 user messages?
8. What is the exact CTA: "Contact Samuel", "Book HAI Audit", or "Send summary to Samuel"?
9. Should Unknown route ask 2-3 triage questions before any harness recommendation?
10. Which specialist prompt profile should be built first: Claude Code, Codex, or Hermes?
