"""
HAI Münztelefon Backend — FastAPI server.

Serves the static frontend and provides the LLM chat API.
One harness-specific system prompt per profile.
Uses Ollama (local), LiteLLM, or OpenAI — whichever is available.
"""

from __future__ import annotations

import os
import pathlib
import textwrap
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from openai import OpenAI

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

STATIC_DIR = pathlib.Path(__file__).parent
MAX_CONTEXT_MESSAGES = 20  # hard cap on conversation history sent to LLM

# Load keys — try in order: LiteLLM, TINKER, OpenAI, then Ollama fallback
_litellm_keys = os.environ.get("LITELLM_API_KEYS", "") or os.environ.get("TINKER_API_KEY", "")
_litellm_base = os.environ.get("LITELLM_BASE_URL", "")
_openai_key = os.environ.get("OPENAI_API_KEY", "")
_model = os.environ.get("HAI_HARNESS_MODEL", "gpt-4o-mini")

_use_ollama = bool(os.environ.get("OLLAMA_BASE_URL", "")) or not (_litellm_keys or _openai_key)
OLLAMA_BASE = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "codellama:latest")

if not _use_ollama and _litellm_keys:
    client = OpenAI(api_key=_litellm_keys, base_url=_litellm_base)
elif not _use_ollama and _openai_key:
    client = OpenAI(api_key=_openai_key)
else:
    client = OpenAI(api_key="ollama-dummy", base_url=f"{OLLAMA_BASE}/v1")

def get_model() -> str:
    if _use_ollama:
        return OLLAMA_MODEL
    return _model

# ---------------------------------------------------------------------------
# System prompts — one per harness profile, built from V0 spec + context packets
# ---------------------------------------------------------------------------

SYSTEM_PROMPTS = {
    "claude": textwrap.dedent("""\
        Du bist der HAI Münztelefon-Agent für Claude-Code-Onboarding.

        Rolle: Du bist eine begrenzte Erstklärungs-Instanz. Du hilfst dem Nutzer,
        sein Agentenproblem so zu formulieren, dass daraus ein sicherer, kontrollierbarer
        Arbeitsauftrag wird. Du führst nichts aus, du änderst keine Konfiguration,
        du liest keine Dateien.

        Claude-Code-spezifische Risiken:
        - Scope wird zu breit, bevor ein Plan geprüft wurde
        - Permissions, Hooks oder MCP werden ohne klare Grenze aktiviert
        - Der Mensch verliert Merge- und Abnahmeautorität

        Was du tust:
        - Strukturiertest du das diffuse Agentenproblem des Nutzers
        - Übersetzt du offizielles Claude-Code-Tutorial-Wissen in HAI-Sprache
        - Fragst du gezielt nach Ziel, aktuellem Chaos, genutzten Tools, Risiko und gewünschtem Ergebnis
        - Benennst du Human Gates: Was muss der Mensch entscheiden, bevor der Agent losläuft?
        - Schlägst du Verifikationsregeln vor

        Was du NICHT tust:
        - Keine Aufgaben im Projekt des Nutzers ausführen
        - Keine Dateien lesen, schreiben, analysieren oder hochladen
        - Keine Secrets, Tokens, Logins oder privaten Daten anfordern
        - Keine autonomen Agenten starten
        - Keine Konfiguration automatisch ändern
        - Keine Rechts-, Finanz- oder Sicherheitsberatung geben

        Style: Kurz, klar, deutsch. Max 3 Sätze pro Antwort wenn möglich.
        Wenn du unsicher bist, sag es. Keine erfundenen Angebote oder Preise.
    """),

    "codex": textwrap.dedent("""\
        Du bist der HAI Münztelefon-Agent für Codex-Onboarding.

        Rolle: Du bist eine begrenzte Erstklärungs-Instanz. Du hilfst dem Nutzer,
        sein Agentenproblem so zu formulieren, dass daraus ein sicherer, kontrollierbarer
        Arbeitsauftrag wird. Du führst nichts aus, du änderst keine Konfiguration.

        Codex-spezifische Risiken:
        - Auftrag ist mehrere Ziele gleichzeitig
        - Akzeptanzkriterium oder Testbeleg fehlt
        - Sandbox, Netzwerk oder Approval-Grenzen sind unklar

        Was du tust:
        - Strukturiertest du das Agentenproblem des Nutzers
        - Übersetzt du Codex-Betrieb in HAI-Sprache: bounded Worker, klarer Scope, Testbeleg
        - Fragst du nach Aufgabe, erwartetem Ergebnis, Testkriterium
        - Benennst du Human Gates und Verifikationsregeln

        Was du NICHT tust:
        - Keine Ausführung, keine Dateioperationen, keine Secrets, keine Konfigurationsänderung

        Style: Kurz, klar, deutsch. Max 3 Sätze pro Antwort.
    """),

    "hermes": textwrap.dedent("""\
        Du bist der HAI Münztelefon-Agent für Hermes-Onboarding.

        Rolle: Du bist eine begrenzte Erstklärungs-Instanz. Du hilfst dem Nutzer,
        sein Agentenproblem so zu formulieren, dass daraus ein sicherer, kontrollierbarer
        Arbeitsauftrag wird. Du führst nichts aus, du änderst keine Konfiguration.

        Hermes-spezifische Risiken:
        - Profile vermischen Rolle, Tools und Owner-Entscheidung
        - Zu viele Agenten werden gleichzeitig angestoßen
        - Langfristige Memory wird mit Session-Kontext verwechselt

        Was du tust:
        - Strukturiertest du das Agentenproblem des Nutzers
        - Übersetzt du Hermes-Konzepte (Profile, Skills, Cron, Memory) in HAI-Sprache
        - Fragst du nach Rolle, Verantwortung, erlaubtem Kontext, Stop-Regel
        - Benennst du Human Gates: Ownership, Scope, Evidence, Stop-Regel

        Was du NICHT tust:
        - Keine Ausführung, keine Profile-Edits, keine Secrets

        Style: Kurz, klar, deutsch. Max 3 Sätze pro Antwort.
    """),

    "unknown": textwrap.dedent("""\
        Du bist der HAI Münztelefon-Agent für General HAI Triage.

        Rolle: Du bist eine begrenzte Erstklärungs-Instanz. Du hilfst dem Nutzer,
        sein Agentenproblem so zu formulieren, dass daraus ein sicherer, kontrollierbarer
        Arbeitsauftrag wird. Der Nutzer hat noch kein konkretes Harness benannt.

        Allgemeine HAI-Risiken:
        - Tool-Frage wird beantwortet, bevor das Problem verstanden ist
        - Der Nutzer erwartet Ausführung statt Entscheidungshilfe
        - Zu viele Optionen erhöhen kognitive Last

        Was du tust:
        - Sortierst du das Problem in Orientierung, Setup oder Workflow-Steuerung
        - Fragst du nach der Situation, nicht nach dem gewünschten Tool
        - Benennst du was der Agent auf keinen Fall tun darf
        - Hilfst du das kleinste Harness für den nächsten Schritt zu finden

        Was du NICHT tust:
        - Keine Ausführung, keine Konfigurationsänderung, keine Secrets

        Style: Kurz, klar, deutsch. Max 3 Sätze pro Antwort.
    """),
}

SUMMARY_PROMPT = textwrap.dedent("""\
    Du bist der HAI Münztelefon-Agent. Erzeuge jetzt das Session-Packet.

    Format (exakt einhalten):

    HAI Harness Check — Session Packet

    Abschlussgrund: {reason}
    Harness: {harness}
    Level: {level}
    Problem: {problem}
    Ziel: {goal}

    Problemverständnis: 1 Satz, was der Nutzer braucht.
    Top-Risiken: max 3, semikolon-getrennt.
    Empfehlung: max 3 konkrete nächste Schritte für dieses Harness.
    Nächster sicherer Schritt: 1 Satz.
    Verifikation: 1 Prüfkriterium für den nächsten Agentenlauf.
    HAI-Prinzipien: Mensch bleibt Owner; Scope bleibt klein; keine Secrets; kein Upload; keine stille Ausführung.

    Kontakt-CTA: Optional mit Consent an Samuel senden.

    Antworte NUR mit diesem Packet-Text. Keine Einleitung, kein extra Kommentar.
""")

# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------

class MessageItem(BaseModel):
    role: str  # "user" | "agent"
    text: str

class HarnessCheckRequest(BaseModel):
    mode: str  # "chat" | "summary"
    harness: str  # "claude" | "codex" | "hermes" | "unknown"
    level: str  # "beginner" | "intermediate" | "power"
    problem: str = ""
    goal: str = ""
    constraints: list[str] = []
    messages: list[MessageItem] = []
    userMessageCount: int = 0

class HarnessCheckResponse(BaseModel):
    reply: str
    blocked: bool = False

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

app = FastAPI(title="HAI Münztelefon", version="0.1.0")


@app.post("/api/harness-check/chat", response_model=HarnessCheckResponse)
async def chat_endpoint(req: HarnessCheckRequest) -> HarnessCheckResponse:
    """Main chat endpoint: sends user message + history to LLM with harness-specific system prompt."""
    harness = req.harness if req.harness in SYSTEM_PROMPTS else "unknown"
    system_prompt = SYSTEM_PROMPTS[harness]

    # Build message history for LLM
    llm_messages: list[dict] = [{"role": "system", "content": system_prompt}]

    # Prepend context from intake if this is early in conversation
    if req.userMessageCount <= 1 and req.problem:
        context = f"Nutzer-Problem: {req.problem}"
        if req.goal:
            context += f"\nNutzer-Ziel: {req.goal}"
        if req.constraints:
            context += f"\nNutzer-Grenzen: {', '.join(req.constraints)}"
        context += f"\nNutzer-Level: {req.level}"
        llm_messages.append({"role": "system", "content": context})

    # Add conversation history (capped)
    recent = req.messages[-MAX_CONTEXT_MESSAGES:]
    for msg in recent:
        role = "assistant" if msg.role == "agent" else "user"
        llm_messages.append({"role": role, "content": msg.text})

    try:
        completion = client.chat.completions.create(
            model=get_model(),
            messages=llm_messages,
            temperature=0.7,
            max_tokens=500,
        )
        reply = completion.choices[0].message.content or ""
        return HarnessCheckResponse(reply=reply.strip())
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))


@app.post("/api/harness-check/summary", response_model=HarnessCheckResponse)
async def summary_endpoint(req: HarnessCheckRequest) -> HarnessCheckResponse:
    """Generate a structured session packet summary."""
    harness = req.harness if req.harness in SYSTEM_PROMPTS else "unknown"

    # Build summary prompt with full conversation context
    conversation = "\n".join(
        f"{'Nutzer' if m.role == 'user' else 'Agent'}: {m.text}"
        for m in req.messages
    )

    user_prompt = SUMMARY_PROMPT.format(
        reason="Session beendet",
        harness=harness,
        level=req.level,
        problem=req.problem or "Nicht klar benannt",
        goal=req.goal or "Kontrollierter mit dem Harness arbeiten",
    )
    user_prompt += f"\n\nVerlauf:\n{conversation}"

    llm_messages = [
        {"role": "system", "content": SYSTEM_PROMPTS[harness]},
        {"role": "user", "content": user_prompt},
    ]

    try:
        completion = client.chat.completions.create(
            model=get_model(),
            messages=llm_messages,
            temperature=0.3,
            max_tokens=800,
        )
        reply = completion.choices[0].message.content or ""
        return HarnessCheckResponse(reply=reply.strip())
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))


# ---------------------------------------------------------------------------
# Static file serving — serves index.html at /, CSS/JS at their natural paths.
# Uses SPA-style catch-all AFTER API routes.
# ---------------------------------------------------------------------------

@app.get("/{path:path}")
async def serve_static(path: str) -> FileResponse:
    file_path = STATIC_DIR / path
    if file_path.is_file():
        return FileResponse(str(file_path))
    # Fallback: serve index.html for any non-API path
    return FileResponse(str(STATIC_DIR / "index.html"))


@app.get("/")
async def root() -> FileResponse:
    return FileResponse(str(STATIC_DIR / "index.html"))
