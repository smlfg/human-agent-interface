#!/usr/bin/env bash
# HAI Münztelefon — Start script
# Usage: ./start.sh [port]
set -euo pipefail
PORT="${1:-8000}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Load env from pi/agent if present (TINKER_API_KEY, LITELLM_BASE_URL, etc.)
if [[ -f /home/smlflg/.pi/agent/.env.keys ]]; then
    set -a
    # shellcheck disable=SC1091
    source /home/smlflg/.pi/agent/.env.keys
    set +a
fi

# Allow local .env override
if [[ -f "$SCRIPT_DIR/.env" ]]; then
    set -a
    # shellcheck disable=SC1091
    source "$SCRIPT_DIR/.env"
    set +a
fi

echo "=== HAI Münztelefon ==="
echo "Model: ${HAI_HARNESS_MODEL:-gpt-4o-mini}"
echo "Base URL: ${LITELLM_BASE_URL:-api.openai.com}"
echo "Starting server on http://localhost:${PORT}"
echo "Press Ctrl+C to stop."
echo ""

exec uvicorn server:app --host 0.0.0.0 --port "${PORT}" --reload