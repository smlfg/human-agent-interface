const MAX_FILE_BYTES = 1024 * 1024;
const MAX_REQUEST_BYTES = MAX_FILE_BYTES + 32 * 1024;
const MAX_HARNESS_REQUEST_BYTES = 24 * 1024;
const MAX_SITE_EVENT_BYTES = 2048;
const CONSENT_VERSION = "client-handoff-md-v0-2026-05-14";
const DEFAULT_HARNESS_MODEL = "gpt-5.5";
const HERO_EXPERIMENT_ID = "homepage-hero-2026-05-23";
const HERO_VARIANTS = ["A_control", "B_offer_first", "C_proof_first"];
const SITE_EVENTS = ["hero_impression", "hero_cta_click", "cta_click"];
const SITE_EVENT_TARGETS = [
  "",
  "contact_fit_call",
  "intake_start",
  "hero_choose_path",
  "hero_fit",
  "hero_fit_call",
  "hero_product",
  "hero_proof",
  "nav_fit_call",
  "router_agent_workflow",
  "router_muenztelefon",
  "router_orientation",
  "choose_path",
  "contact_fit_call_nav",
  "contact_one_workflow",
  "fit",
  "product",
  "proof",
];
const VIEWPORT_CLASSES = ["mobile", "tablet", "desktop"];

const HARNESS_PROFILES = {
  claude: {
    label: "Claude Code",
    route: "Claude-Code-Onboarding",
    focus: "projektnahe Codearbeit, Debugging, kontextreiches Arbeiten",
    guidance: [
      "Scope vor Ausfuehrung festlegen.",
      "Plan pruefen lassen, bevor Edits passieren.",
      "Kleine Diffs, keine Secrets, Tests oder Evidence verlangen.",
      "Mensch bleibt Merge- und Abnahmeautoritaet.",
    ],
  },
  codex: {
    label: "Codex",
    route: "Codex-Onboarding",
    focus: "bounded Worker fuer klar definierte Coding-Aufgaben",
    guidance: [
      "Aufgabe eng formulieren.",
      "Dateien oder Module nennen, wenn bekannt.",
      "Akzeptanzkriterien und Abschlusspruefung geben.",
      "Output als Patch, Report oder naechste Entscheidung verlangen.",
    ],
  },
  hermes: {
    label: "Hermes",
    route: "Hermes-Onboarding",
    focus: "profilbasierte Agentensteuerung, Rollenarbeit und HAI-Control-Plane-Denken",
    guidance: [
      "Profilrolle und Nicht-Rolle trennen.",
      "Session-Kontext nicht mit langfristiger Memory verwechseln.",
      "Fanout klein halten und mit Stop-Regel beenden.",
      "Owner-Packet statt unkontrollierter Orchestrierung erzeugen.",
    ],
  },
  unknown: {
    label: "General HAI Triage",
    route: "General-HAI-Triage",
    focus: "Klaerung, welches Harness oder welche Arbeitsform passt",
    guidance: [
      "Erst Problem, Ziel und Grenze klaeren.",
      "Keine Tool-Empfehlung vor Problemverstaendnis.",
      "Eine kleine kontrollierbare naechste Handlung definieren.",
      "Spezialroute erst waehlen, wenn der Tool-Kontext klar ist.",
    ],
  },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/client-handoff-upload") {
      return handleClientHandoffUpload(request, env);
    }

    if (url.pathname === "/api/harness-check/chat") {
      return handleHarnessCheckChat(request, env);
    }

    if (url.pathname === "/api/site-event") {
      return handleSiteEvent(request, env);
    }

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
      return handleHomepage(request, env);
    }

    if (request.method === "GET" && (url.pathname === "/intake" || url.pathname.startsWith("/intake/"))) {
      return serveIntakeAsset(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleHomepage(request, env) {
  const url = new URL(request.url);
  const previewVariant = url.searchParams.get("hero_variant");
  const existingVariant = parseCookies(request.headers.get("cookie") || "").haiHeroVariant;
  const variant = HERO_VARIANTS.includes(previewVariant)
    ? previewVariant
    : HERO_VARIANTS.includes(existingVariant)
      ? existingVariant
      : HERO_VARIANTS[cryptoRandomIndex(HERO_VARIANTS.length)];

  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.append("Vary", "Cookie");

  if (!HERO_VARIANTS.includes(previewVariant)) {
    headers.append("Set-Cookie", `haiHeroVariant=${variant}; Max-Age=2592000; Path=/; SameSite=Lax; Secure`);
  }

  const contentType = headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const html = await response.text();
  const injected = html.replace(
    "<html lang=\"en\">",
    `<html lang="en" data-hero-experiment="${HERO_EXPERIMENT_ID}" data-hero-variant="${variant}">`,
  );

  return new Response(injected, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function serveIntakeAsset(request, env, url) {
  let assetPath = url.pathname;
  if (assetPath === "/intake" || assetPath === "/intake/") {
    assetPath = "/APP/intake/index.html";
  } else if (assetPath.startsWith("/intake/")) {
    assetPath = `/APP/intake/${assetPath.slice("/intake/".length)}`;
  }

  const assetUrl = new URL(assetPath, url.origin);
  return env.ASSETS.fetch(new Request(assetUrl, request));
}

async function handleSiteEvent(request, env) {
  if (request.method === "OPTIONS") {
    return json({ ok: true }, 204, corsHeaders());
  }

  if (request.method !== "POST") {
    return json({ error: "Only POST site events are accepted." }, 405, {
      Allow: "POST, OPTIONS",
      ...corsHeaders(),
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_SITE_EVENT_BYTES) {
    return json({ error: "Site event is too large." }, 413, corsHeaders());
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Site events must be JSON." }, 415, corsHeaders());
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return json({ error: "Site event JSON could not be read." }, 400, corsHeaders());
  }

  const event = normalizeSiteEvent(payload);
  if (!event.ok) {
    return json({ error: event.error }, 400, corsHeaders());
  }

  if (env.HAI_SITE_EVENTS) {
    env.HAI_SITE_EVENTS.writeDataPoint({
      indexes: [event.value.experiment_id],
      blobs: [
        event.value.variant,
        event.value.event,
        event.value.target,
        event.value.path,
        event.value.language,
        event.value.viewport_class,
      ],
      doubles: [Date.now()],
    });
  }

  return json({
    ok: true,
    recorded: Boolean(env.HAI_SITE_EVENTS),
  }, 200, corsHeaders());
}

async function handleHarnessCheckChat(request, env) {
  if (request.method === "OPTIONS") {
    return json({ ok: true }, 204, corsHeaders());
  }

  if (request.method !== "POST") {
    return json({ error: "Only POST chat requests are accepted." }, 405, {
      Allow: "POST, OPTIONS",
      ...corsHeaders(),
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_HARNESS_REQUEST_BYTES) {
    return json({ error: "Harness check request is too large." }, 413, corsHeaders());
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Harness check requests must be JSON." }, 415, corsHeaders());
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return json({ error: "Harness check JSON could not be read." }, 400, corsHeaders());
  }

  const session = normalizeHarnessSession(payload);
  const profile = HARNESS_PROFILES[session.harness] || HARNESS_PROFILES.unknown;

  if (hasSecretLikeText(JSON.stringify(payload))) {
    return json({
      ok: true,
      route: profile.route,
      blocked: true,
      reply: "Stop: Das sieht nach Secret, Token, Passwort oder API-Key aus. Ich verarbeite das in V0 nicht weiter. Beschreibe die Stelle abstrakt: welches System, welche Grenze, welcher Fehler. Keine Werte, keine Keys, keine privaten Dumps.",
    }, 200, corsHeaders());
  }

  if (!env.OPENAI_API_KEY) {
    return json({
      error: "OpenAI API key is not configured.",
      route: profile.route,
    }, 503, corsHeaders());
  }

  const mode = session.mode === "summary" ? "summary" : "chat";
  const instructions = buildHarnessInstructions(profile, mode);
  const input = buildHarnessInput(session, profile, mode);
  const model = trimMax(env.HAI_HARNESS_MODEL || env.OPENAI_MODEL || DEFAULT_HARNESS_MODEL, 80);

  let openaiResponse;
  try {
    openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions,
        input,
        store: false,
        max_output_tokens: mode === "summary" ? 520 : 360,
      }),
    });
  } catch (error) {
    return json({
      error: "OpenAI request failed before a response was returned.",
      route: profile.route,
    }, 502, corsHeaders());
  }

  let data;
  try {
    data = await openaiResponse.json();
  } catch (error) {
    return json({
      error: "OpenAI response could not be read.",
      route: profile.route,
    }, 502, corsHeaders());
  }

  if (!openaiResponse.ok) {
    return json({
      error: "OpenAI request failed.",
      detail: trimMax(data?.error?.message || "Unknown OpenAI error.", 260),
      route: profile.route,
    }, 502, corsHeaders());
  }

  const text = extractOpenAIText(data);
  if (!text) {
    return json({
      error: "OpenAI response did not contain text.",
      route: profile.route,
    }, 502, corsHeaders());
  }

  return json({
    ok: true,
    mode,
    route: profile.route,
    harness: session.harness,
    reply: text,
    summaryReady: mode === "summary" || session.userMessageCount >= 4,
  }, 200, corsHeaders());
}

function normalizeHarnessSession(payload) {
  const rawHarness = trimMax(payload?.harness, 40);
  const rawLevel = trimMax(payload?.level, 40);
  const messages = Array.isArray(payload?.messages) ? payload.messages : [];

  return {
    mode: trimMax(payload?.mode, 20),
    harness: HARNESS_PROFILES[rawHarness] ? rawHarness : "unknown",
    level: ["beginner", "intermediate", "power"].includes(rawLevel) ? rawLevel : "intermediate",
    problem: trimMax(payload?.problem, 520) || "Noch nicht klar benannt",
    goal: trimMax(payload?.goal, 180) || "kontrollierter mit dem Harness arbeiten",
    constraints: normalizeStringList(payload?.constraints, 8, 80),
    userMessageCount: clampInteger(payload?.userMessageCount, 0, 10),
    messages: messages.slice(-12).map((message) => ({
      role: message?.role === "agent" ? "agent" : "user",
      text: trimMax(message?.text, 900),
    })).filter((message) => message.text),
  };
}

function normalizeStringList(value, maxItems, maxLength) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, maxItems)
    .map((item) => trimMax(item, maxLength))
    .filter(Boolean);
}

function normalizeSiteEvent(payload) {
  const experimentId = trimMax(payload?.experiment_id, 80);
  const variant = trimMax(payload?.variant, 40);
  const event = trimMax(payload?.event, 40);
  const target = trimMax(payload?.target, 80);
  const path = normalizeSitePath(payload?.path);
  const language = normalizeLanguage(payload?.language);
  const viewportClass = trimMax(payload?.viewport_class, 20);

  if (experimentId !== HERO_EXPERIMENT_ID) {
    return { ok: false, error: "Unknown experiment." };
  }

  if (!HERO_VARIANTS.includes(variant)) {
    return { ok: false, error: "Unknown variant." };
  }

  if (!SITE_EVENTS.includes(event)) {
    return { ok: false, error: "Unknown event." };
  }

  if (!SITE_EVENT_TARGETS.includes(target)) {
    return { ok: false, error: "Unknown event target." };
  }

  if (!VIEWPORT_CLASSES.includes(viewportClass)) {
    return { ok: false, error: "Unknown viewport class." };
  }

  return {
    ok: true,
    value: {
      experiment_id: experimentId,
      variant,
      event,
      target,
      path,
      language,
      viewport_class: viewportClass,
    },
  };
}

function normalizeSitePath(value) {
  const path = trimMax(value, 120) || "/";
  if (!path.startsWith("/")) return "/";
  return path.split("?")[0].split("#")[0].replace(/[^a-zA-Z0-9/_-]+/g, "").slice(0, 120) || "/";
}

function normalizeLanguage(value) {
  const language = trimMax(value, 8).toLowerCase();
  if (language.startsWith("de")) return "de";
  return "en";
}

function clampInteger(value, min, max) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function buildHarnessInstructions(profile, mode) {
  const task = mode === "summary"
    ? "Erzeuge ein kompaktes Session Packet."
    : "Fuehre die naechste Antwort in der begrenzten Onboarding-Session.";

  return [
    "Du bist der HAI Live Harness Onboarding Agent.",
    task,
    "Sprache: Deutsch, knapp, konkret, ohne Marketing-Floskeln.",
    "Du erklaerst, strukturierst und schlaegst vor. Du fuehrst nichts aus.",
    "Du nimmst keine Secrets, API Keys, Tokens, Passwoerter, privaten Repo-Dumps oder Accountdaten entgegen.",
    "Du forderst keinen Upload und keinen direkten Repo- oder Account-Zugriff an.",
    "Du gibst keine Rechts-, Finanz-, Medizin- oder Security-Expertenberatung.",
    "Ziel: Aus einem diffusen Agentenproblem wird ein sicherer, pruefbarer naechster Harness-Schritt.",
    `Route: ${profile.route}.`,
    `Harness-Fokus: ${profile.focus}.`,
    `Guidance: ${profile.guidance.join(" ")}`,
    mode === "summary"
      ? "Format: plain text mit Labels: Problem, Harness, Risiken, Empfehlung, Naechster Schritt, Verifikation, Kontakt-Hinweis. Keine Tabelle."
      : "Antwortformat: 2-4 kurze Absaetze. Stelle maximal eine Frage. Wenn genug Kontext da ist, fuehre zum Abschluss-Paket.",
  ].join("\n");
}

function buildHarnessInput(session, profile, mode) {
  const transcript = session.messages
    .map((message) => `${message.role === "agent" ? "Agent" : "User"}: ${message.text}`)
    .join("\n");

  return [
    `Modus: ${mode}`,
    `Harness: ${profile.label}`,
    `Route: ${profile.route}`,
    `Level: ${session.level}`,
    `Problem: ${session.problem}`,
    `Ziel: ${session.goal}`,
    `Grenzen: ${session.constraints.join(", ") || "keine angegeben"}`,
    `User-Nachrichten: ${session.userMessageCount}/10`,
    "",
    "Transkript:",
    transcript || "(noch kein User-Transkript)",
  ].join("\n");
}

function extractOpenAIText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") {
        parts.push(content.text);
      }
    }
  }

  return parts.join("\n").trim();
}

function hasSecretLikeText(text) {
  return [
    /sk-[a-zA-Z0-9_-]{12,}/,
    /api[_-]?key\s*[:=]/i,
    /token\s*[:=]/i,
    /password\s*[:=]/i,
    /secret\s*[:=]/i,
  ].some((pattern) => pattern.test(text || ""));
}

async function handleClientHandoffUpload(request, env) {
  if (request.method === "OPTIONS") {
    return json({ ok: true }, 204, corsHeaders());
  }

  if (request.method !== "POST") {
    return json({ error: "Only POST uploads are accepted." }, 405, {
      Allow: "POST, OPTIONS",
      ...corsHeaders(),
    });
  }

  if (!env.HAI_CLIENT_HANDOFFS) {
    return json({ error: "Upload storage is not configured." }, 500);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: "Upload is too large. The Markdown file must be 1 MB or smaller." }, 413);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return json({ error: "Upload must be sent as multipart form data." }, 415);
  }

  let form;
  try {
    form = await request.formData();
  } catch (error) {
    return json({ error: "Upload form could not be read." }, 400);
  }

  const caseId = normalizeCaseId(readText(form, "caseId"));
  const customerName = trimMax(readText(form, "customerName"), 120);
  const customerEmail = trimMax(readText(form, "customerEmail"), 160);
  const contextNote = trimMax(readText(form, "contextNote"), 1000);
  const consent = form.get("consent") === "yes";
  const consentVersion = readText(form, "consentVersion") || CONSENT_VERSION;
  const files = form.getAll("handoffFile").filter(isFileLike);

  if (!caseId) {
    return json({ error: "Accepted case ID is required." }, 400);
  }

  if (!customerName) {
    return json({ error: "Name is required." }, 400);
  }

  if (!isEmailLike(customerEmail)) {
    return json({ error: "A valid customer email is required." }, 400);
  }

  if (!consent) {
    return json({ error: "Consent is required before uploading context." }, 400);
  }

  if (files.length !== 1) {
    return json({ error: "Upload exactly one Markdown file." }, 400);
  }

  const file = files[0];
  const originalFilename = trimMax(file.name || "context.md", 180);

  if (!originalFilename.toLowerCase().endsWith(".md")) {
    return json({ error: "Only .md files are accepted in this MVP." }, 415);
  }

  if (file.size <= 0) {
    return json({ error: "The Markdown file is empty." }, 400);
  }

  if (file.size > MAX_FILE_BYTES) {
    return json({ error: "The Markdown file must be 1 MB or smaller." }, 413);
  }

  const safeFilename = normalizeFilename(originalFilename);
  const uploadedAt = new Date().toISOString();
  const uploadId = crypto.randomUUID();
  const keyTimestamp = uploadedAt.replace(/[:.]/g, "-");
  const objectKey = `accepted-cases/${caseId}/${keyTimestamp}-${safeFilename}`;
  const metadataKey = `${objectKey}.metadata.json`;
  const body = await file.arrayBuffer();
  const sha256 = await sha256Hex(body);

  const metadata = {
    uploadId,
    caseId,
    uploadedAt,
    originalFilename,
    storedFilename: safeFilename,
    size: file.size,
    sha256,
    customerName,
    customerEmail,
    contextNote,
    consent: true,
    consentVersion,
    purpose: "Accepted HAI case preparation context",
    limits: "One Markdown file only. No raw .claude folder or agent-system folder.",
  };

  await env.HAI_CLIENT_HANDOFFS.put(objectKey, body, {
    httpMetadata: {
      contentType: "text/markdown; charset=utf-8",
      contentDisposition: `attachment; filename="${safeFilename}"`,
      cacheControl: "no-store",
    },
    customMetadata: {
      uploadId,
      caseId,
      uploadedAt,
      customerEmail,
      originalFilename,
      sha256,
      consentVersion,
    },
  });

  await env.HAI_CLIENT_HANDOFFS.put(metadataKey, JSON.stringify(metadata, null, 2), {
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
      cacheControl: "no-store",
    },
  });

  return json({
    ok: true,
    uploadId,
    caseId,
    filename: safeFilename,
    size: file.size,
  }, 201);
}

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(status === 204 ? null : JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    String(cookieHeader || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        if (index === -1) return [part, ""];
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function cryptoRandomIndex(length) {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return bytes[0] % length;
}

function readText(form, key) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function trimMax(value, max) {
  return String(value || "").trim().slice(0, max);
}

function isFileLike(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof value.name === "string" &&
      typeof value.size === "number" &&
      typeof value.arrayBuffer === "function",
  );
}

function normalizeCaseId(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeFilename(value) {
  const base = String(value || "context.md").split(/[\\/]/).pop() || "context.md";
  const normalized = base
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  if (!normalized) return "context.md";
  return normalized.toLowerCase().endsWith(".md") ? normalized : `${normalized}.md`;
}

function isEmailLike(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sha256Hex(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
