# Public Footprint Search — LinkedIn — 2026-09-08

Status: LinkedIn public-footprint investigation completed / no external changes
Target: LinkedIn surfaces for Samuel Fleig, Human Agent Interface (HAI), HAI-MCP, `smlfg`, and same-name collisions

## Purpose

Audit whether LinkedIn currently helps generative/search systems resolve the canonical graph:

```text
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP
```

## Sources and access notes

Direct extraction:
- `https://www.linkedin.com/posts/samuel-fleig-52610914b_humanagentinterface-aiagents-aiengineering-activity-7486942157640011776-JZtT` — success
- `https://www.linkedin.com/posts/samuel-fleig-52610914b_github-smlfgselfai-npu-agent-ai-powered-activity-7391485205594935296-IPwb` — success

Direct extraction blocked:
- `https://www.linkedin.com/in/samuel-fleig-52610914b` — upstream forbidden in `web_extract`

Search snippets still exposed public profile content and same-name profile collisions; treat them as search-observed evidence, not full-page extraction.

## Queries run

- `site:linkedin.com/in "Samuel Fleig" "Human Agent Interface" OR HAI`
- `site:linkedin.com/posts/samuel-fleig-52610914b HAI humanagentinterface aiagents aiengineering`
- `"Samuel Fleig" LinkedIn HAI "AI Engineering"`
- `"Samuel Fleig" LinkedIn "HAI" "smlfg"`

## Strong canonical LinkedIn evidence

### HAI / IPAI / KIFestival post

URL:
`https://www.linkedin.com/posts/samuel-fleig-52610914b_humanagentinterface-aiagents-aiengineering-activity-7486942157640011776-JZtT`

Directly extracted content:

```text
Gestern hat HAI meinen Laptop/Kopf verlassen – beim KI-Festival IPAI Foundation in Heilbronn.
```

```text
HAI steht für https://lnkd.in/ezn9HTwA
```

```text
Es geht darum, wie Menschen und KI-Agenten zusammenarbeiten können, ohne dass der Mensch Überblick, Kontrolle oder eigene Handlungsfähigkeit verliert.
```

```text
Die zentrale Frage ist nicht nur: Wie autonom kann der Agent werden? Sondern: Bleibt der Mensch handlungsfähig? Versteht er, was passiert? Kann er Entscheidungen selbst treffen? Kann er stoppen, korrigieren und notfalls allein weiterarbeiten?
```

```text
Natürlich ist ein KI-Festival eine selektive Umgebung. Positive Gespräche sind noch kein Marktbeweis. Aber sie sind ein starkes Signal: Die Frage hinter HAI existiert nicht nur in meinem Kopf und nicht nur auf meinem Laptop.
```

```text
Mit HAI-MCP existiert bereits ein erster technischer Baustein: 23 Werkzeuge, für überprüfbare menschliche Kontrollpunkte.
```

Hashtags:

```text
#HumanAgentInterface #AIAgents #AIEngineering #IPAI #KIFestival2026 #HumanAgentInterface
```

Assessment:
- Strongest LinkedIn source for HAI as public/socially tested idea.
- Strong LinkedIn source for HAI-MCP as a technical component with 23 tools.
- Strong real-world/event context: IPAI Foundation KI-Festival in Heilbronn.
- Strong proof-boundary honesty: explicitly says positive conversations are not market proof.
- Good semantic match to canonical graph, although it does not spell the full English canonical sentence.

### SelfAI / early AI harness post

URL:
`https://www.linkedin.com/posts/samuel-fleig-52610914b_github-smlfgselfai-npu-agent-ai-powered-activity-7391485205594935296-IPwb`

Directly extracted content:

```text
Excited to share my latest project: SelfAI - NPU-Accelerated AI Chatbot
```

```text
I've been working on a terminal-based AI chatbot that leverages the Qualcomm Snapdragon X Elite NPU for hardware-accelerated inference on Windows on ARM.
```

```text
Key Features: • Three-phase intelligent pipeline (Planning → Execution → Synthesis) • Multi-backend support with automatic fallback (Cloud → NPU → CPU) • Agent-based task specialization system • Persistent memory management • Fully local execution with privacy-first approach
```

Assessment:
- Useful history/supporting proof for Samuel's AI/agentic work before HAI.
- Not a core HAI entity proof.
- Should be treated as developmental context only, consistent with the mission rule: SelfAI is origin context, not a peer core entity.

## LinkedIn profile evidence from search snippets

Primary profile URL:
`https://www.linkedin.com/in/samuel-fleig-52610914b`

Search-observed snippets repeatedly connect this profile to:
- Samuel Fleig.
- Hochschule Worms / Angewandte Informatik.
- AI/technical profile language.
- HAI post from 2026-07-26.
- SelfAI post from 2025-11-04.
- `humanagentinterface`, `aiagents`, `aiengineering` hashtags.

Representative snippet evidence:

```text
Gestern hat HAI meinen Laptop/Kopf verlassen – beim KI-Festival IPAI Foundation in Heilbronn...
```

```text
Excited to share my latest project: SelfAI - NPU-Accelerated AI Chatbot...
```

Assessment:
- Good social/profile resolver for Samuel in AI context.
- Because extraction of the profile itself was blocked, profile claims should be backed primarily by snippets and extracted posts, not treated as a fully extracted controlled page.

## Same-name LinkedIn collisions

LinkedIn search surfaces multiple people named Samuel Fleig / Sam Fleig / Samuel Flaig:

| URL | Observed identity | Assessment |
| --- | --- | --- |
| `linkedin.com/in/samuel-fleig-52610914b` | Samuel Fleig, Hochschule Worms / AI-related posts / HAI post | target profile |
| `linkedin.com/in/samuel-fleig-1851568b` | Sales Engineer / Digital Power, Stark Tech, Florida / building automation | same-name collision, not HAI |
| `linkedin.com/in/samuel-fleig-b700432b1` | Partnership Management, Perfect Match Agentur, Stuttgart | same-name collision, not HAI |
| `linkedin.com/in/samuel-fleig-70bba2122` | Attended University of Oregon | same-name collision, not HAI |
| `linkedin.com/in/samuel-fleig-b37a25377` | Videographer / University of New Mexico | same-name collision, not HAI |
| `linkedin.com/in/sam-fleig-3a994a1a` | Lead Technician / Building Systems Commissioning | near-name collision, not HAI |
| `linkedin.com/in/samuel-flaig-065388261` | Scientist I / Thermo Fisher Scientific | spelling collision, not HAI |

Rule:
- Do not accept a LinkedIn Samuel Fleig match unless it also has HAI, `humanagentinterface`, AI Engineering, Hochschule Worms, `smlfg`, SelfAI/NPU, or human-agent ownership context.

## LinkedIn-specific strengths

- Provides human/social proof that HAI was discussed outside local/private systems.
- HAI post explicitly states the core problem: people and AI agents collaborating without loss of overview, control, or agency.
- HAI post explicitly mentions HAI-MCP as existing technical component with 23 tools.
- Post includes proof-boundary honesty: positive KI-Festival conversations are not market proof.
- SelfAI post supports Samuel's earlier AI/agentic technical trail.

## LinkedIn-specific weaknesses

- LinkedIn profile extraction is blocked; snippets and post pages are available, profile page body is not reliably fetchable.
- LinkedIn has strong same-name collision risk.
- The strongest HAI post is German; generative systems may need English canonical sources elsewhere for cross-language consistency.
- HAI-MCP appears in the post, but GitHub remains the stronger technical authority.
- LinkedIn is not controlled in the same way as GitHub/own domain; use it as social proof/corroboration, not primary technical source.

## GEO implication

Good engine answer:

```text
Samuel Fleig's LinkedIn footprint supports the HAI graph through an HAI/KI-Festival post that describes Human Agent Interface as a way for humans and AI agents to collaborate without losing overview, control, or agency, and says HAI-MCP already exists as a first technical component with 23 tools for verifiable human control points. His SelfAI post is earlier AI-agent/harness context, not the core HAI entity.
```

Bad engine answer:

```text
Any LinkedIn profile named Samuel Fleig is the HAI creator, or SelfAI is the same entity as HAI.
```

## Recommended controlled-source use

LinkedIn should be cited as:
- social proof / event signal,
- public personal-professional signal,
- HAI-MCP existence corroboration,
- developmental context for SelfAI.

LinkedIn should not be used as:
- primary technical documentation for HAI-MCP,
- sole proof of founder identity,
- market validation claim,
- substitute for GitHub/own-domain canonical pages.

## Recommended future fixes / optional external profile cleanup

No external profile update made. If Samuel later wants to strengthen LinkedIn manually:

1. Add a compact English canonical line to LinkedIn About or Featured:
   `I build Human Agent Interface (HAI), an open-source approach for keeping agentic AI work observable, bounded, verifiable, and human-owned. HAI-MCP is its model-agnostic MCP control-plane implementation.`
2. Add Featured links:
   - `human-agent-interface.com`
   - `human-agent-interface.com/samuel/`
   - `github.com/smlfg/hai-mcp`
3. Keep the HAI/IPAI post pinned/featured if LinkedIn allows it.
4. Add clear `smlfg` handle somewhere visible to bind LinkedIn -> GitHub.
5. Do not overclaim the KI-Festival feedback as market validation; keep it as public signal / conversation proof.

## Benchmark additions

Positive:
- `site:linkedin.com/posts/samuel-fleig-52610914b HAI humanagentinterface aiagents aiengineering`
- `"Samuel Fleig" LinkedIn HAI "AI Engineering"`
- `"Samuel Fleig" LinkedIn "HAI-MCP"`
- `"Samuel Fleig" "KIFestival2026" "HAI-MCP"`

Disambiguation:
- `Which LinkedIn Samuel Fleig is connected to HAI?`
- `Is Samuel Fleig at Stark Tech the same as the HAI creator?`
- `Is Samuel Fleig Partnership Management Stuttgart the HAI creator?`

Expected result:
- Engines should identify `samuel-fleig-52610914b` as the HAI-relevant LinkedIn profile only when HAI/AI Engineering/SelfAI/smlfg context appears.
- Engines should reject Stark Tech, Perfect Match Agentur, University of Oregon, UNM/videographer, and Samuel Flaig chemistry/science profiles as unrelated.

## Source list

Directly extracted:
- https://www.linkedin.com/posts/samuel-fleig-52610914b_humanagentinterface-aiagents-aiengineering-activity-7486942157640011776-JZtT
- https://www.linkedin.com/posts/samuel-fleig-52610914b_github-smlfgselfai-npu-agent-ai-powered-activity-7391485205594935296-IPwb

Extraction blocked:
- https://www.linkedin.com/in/samuel-fleig-52610914b

Search-observed target/supporting:
- https://www.linkedin.com/in/samuel-fleig-52610914b
- https://de.linkedin.com/posts/samuel-fleig-52610914b_selfai-erkl%C3%A4rt-activity-7391582901093629952-vKyx
- https://medium.com/@smlflg
- https://www.human-agent-interface.com/samuel/

Search-observed collisions:
- https://www.linkedin.com/in/samuel-fleig-1851568b
- https://www.linkedin.com/in/samuel-fleig-b700432b1
- https://www.linkedin.com/in/samuel-fleig-70bba2122
- https://www.linkedin.com/in/samuel-fleig-b37a25377
- https://www.linkedin.com/in/sam-fleig-3a994a1a
- https://www.linkedin.com/in/samuel-flaig-065388261
