# GEO Measurement — Web Search Control Baseline — 2026-09-08 23:11 CEST

Run metadata:
- Engine: Hermes configured `web_search` backend / classic web-search control
- Run type: baseline
- Catalog: `/home/smlflg/Projekte/Human-Agent-Interface/HAI-GEO/GEO_BENCHMARK_CATALOG.json`
- Scope: search-result understanding only, not ChatGPT/Gemini/Perplexity answer quality.

Canonical graph:
Samuel Fleig -> Creator/Developer -> Human Agent Interface (HAI) -> HAI-MCP

## Query: `"Samuel Fleig" "Human Agent Interface"`

Observed top relevant result:
- `https://www.human-agent-interface.com/samuel/` — title `About Samuel Fleig | Human Agent Interface`.

Answer/search excerpt evidence:
- Result description says: `I am Samuel Fleig, an AI Engineering student and AI engineer working on agentic systems, harnesses, and human-owned AI workflows.`
- Result description says HAI came from work inside `agentic systems: terminal agents, coding agents, harnesses, control layers`.

Score:
- correct_samuel_identified: 1
- samuel_hai_association: 1
- hai_definition_accuracy: 1
- hai_hai_mcp_association: 0
- correct_citations: 1
- wrong_person_selected: 0
- wrong_hai_or_hai_mcp_collision: 0
- hallucinated_facts: 0

Verdict: partial

Reason:
- Web search surfaces the correct Samuel/HAI page and AI-engineering context.
- It does not yet surface HAI-MCP for this query.

## Query: `"HAI-MCP" "Samuel Fleig"`

Observed relevant results:
- `https://unyly.org/mcp/hai-mcp` — strong external registry/installer page.
- `https://linkedin.com/in/samuel-fleig-52610914b` — relevant Samuel profile but snippet is broad and partly stale.
- Other same-name LinkedIn profiles also appear and are collision risks.
- `https://www.rustio.net/crate/hai-mcp` appears as an unrelated collision for another `hai-mcp` crate.

Answer/search excerpt evidence:
- Unyly description says: `HAI-MCP is the open-source MCP control-plane implementation of Human Agent Interface (HAI), created by Samuel Fleig.`
- Unyly description says HAI keeps agentic AI work `observable, bounded, owner-gated, and evidence-based so a human can still own the work.`
- Unyly links canonical website and About Samuel Fleig page.
- Rustio result describes an unrelated `Experimental HAIAI MCP server` and maintainer `H Jonathan Hendler`, so it is a negative collision.

Score:
- correct_samuel_identified: 1
- samuel_hai_association: 1
- hai_definition_accuracy: 2
- hai_hai_mcp_association: 1
- correct_citations: 2
- wrong_person_selected: 0
- wrong_hai_or_hai_mcp_collision: 1
- hallucinated_facts: 0

Verdict: partial-to-correct with collision risk

Reason:
- Unyly reconstructs the full target graph very strongly.
- Search result set still contains unrelated `hai-mcp` collision; benchmark must penalize engines that pick it as canonical.

## Query: `"Human Agent Interface" "HAI-MCP"`

Observed result:
- Tool-backed search failed for this query with backend error: `Keyless Exa search failed: Unrecognized MCP response shape. Set EXA_API_KEY ... or another web backend via hermes tools for reliable service.`

Score:
- correct_samuel_identified: not scored
- samuel_hai_association: not scored
- hai_definition_accuracy: not scored
- hai_hai_mcp_association: not scored
- correct_citations: not scored
- wrong_person_selected: not scored
- wrong_hai_or_hai_mcp_collision: not scored
- hallucinated_facts: not scored

Verdict: not enough evidence

Reason:
- Backend failure blocks this query in the web-search control surface.

## Baseline summary

Current understanding in web-search control:
- Samuel + HAI is discoverable through the live Samuel page.
- Full Samuel -> HAI -> HAI-MCP graph is strongest via Unyly.
- GitHub/registry surfaces are likely critical for HAI-MCP retrieval.
- Same-name Samuel profiles and unrelated `hai-mcp` crates are real collision risks.
- Website live-state likely remains weaker than local patched state until deploy.

Next correction target:
- Make controlled primary sources stronger and public: homepage, Samuel page, `/hai-mcp/`, sitemap, JSON-LD, HAI-MCP repo README.
- Then rerun identical benchmark queries across ChatGPT, Gemini/Google AI Mode, Perplexity, and web-search control.
