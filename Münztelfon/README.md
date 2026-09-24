# HAI Münztelefon

Begrenzte, bezahlte 10-Minuten-Erstklärung für Menschen mit einem konkreten Agenten- oder Harness-Problem.

## Was es ist

Ein textbasiertes Session-Widget, das:
1. Den Besucher durch ein Intake-Formular führt (Harness, Level, Problem, Ziel, Constraints)
2. Eine zeitlich begrenzte Chat-Session startet (10 Min, max 10 Nachrichten)
3. Ein Harness-spezifisches HAI-Onboarding bietet
4. Am Ende ein strukturiertes Session-Packet erzeugt

## Schnellstart

```bash
# 1. Abhängigkeiten installieren
pip install -r requirements.txt

# 2. Server starten (Ollama, LiteLLM oder OpenAI – auto-detected)
./start.sh 8000

# 3. Öffnen
open http://localhost:8000
```

## Model-Auswahl (automatisch)

| Verfügbar | Ausgewählt |
|-----------|-----------|
| Ollama (lokal) | `codellama:latest` |
| LiteLLM / TINKER | `HAI_HARNESS_MODEL` env |
| OpenAI | `gpt-4o-mini` |

Override: `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `LITELLM_API_KEYS`, `OPENAI_API_KEY`, `HAI_HARNESS_MODEL`

## Dateien

```
├── index.html        Frontend: Intake-Form + Chat-UI + Summary-Panel
├── app.js            Frontend-Logik: State, API-Calls, Timer, Summary
├── styles.css        CSS (HAI-Dark-Theme, responsive)
├── server.py         FastAPI-Backend: Chat + Summary, 4 Harness-Profile
├── requirements.txt  Python-Deps
├── start.sh          Start-Script mit Env-Loading
└── README.md         Diese Datei
```

## Harness-Profile

- **Claude Code** — projektnahe Codearbeit, Permissions, MCP, Merge-Autorität
- **Codex** — bounded Worker, klarer Scope, Testbeleg
- **Hermes** — Profile, Rollen, Memory, HAI-Control-Plane
- **Unknown** — General HAI Triage für unklare Situationen

## Security

- Keine Ausführung, keine Datei-Operationen, keine Secrets-Eingabe
- Secret-Erkennung im Frontend (Regex für API-Keys, Tokens, Passwörter)
- Backend bleibt read-only im Beratungsmodus

## V0-Scope

- Text-only (Voice ist V1)
- Kein echtes Payment (Free-Session-V0)
- Ollama/OpenAI-Anbindung

## V1 (nach Validierung)

- Stripe/PayPal-Integration
- Voice-Eingabe + Transkription
- Warteschlange, Rate-Limits, echte 1-EUR-Sessions
