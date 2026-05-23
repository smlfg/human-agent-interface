const MAX_USER_MESSAGES = 10;
const SESSION_SECONDS = 10 * 60;
const CONTACT_EMAIL = "samuel@human-agent-interface.com";
const API_ENDPOINT = "/api/harness-check/chat";

const profiles = {
  claude: {
    label: "Claude Code",
    route: "Claude-Code-Onboarding",
    fit: "projektnahe Codearbeit, Debugging und kontextreiches Arbeiten",
    risks: [
      "Scope wird zu breit, bevor ein Plan geprueft wurde",
      "Permissions, Hooks oder MCP werden ohne klare Grenze aktiviert",
      "Der Mensch verliert Merge- und Abnahmeautoritaet"
    ],
    recommendations: {
      beginner: [
        "Starte mit Plan Mode oder einem reinen Erklaerauftrag.",
        "Halte die erste Aufgabe klein und nenne ein Stop-Kriterium.",
        "Verlange am Ende Evidence: Diff, Tests oder konkrete Befunde."
      ],
      intermediate: [
        "Lege vor dem Lauf Scope, verbotene Aktionen und Akzeptanzkriterien fest.",
        "Nutze kleine Diffs und pruefe den Plan, bevor Edits passieren.",
        "Halte Secrets, private Logs und breite MCP-Rechte aus dem Einstieg heraus."
      ],
      power: [
        "Trenne Strategie, Ausfuehrung und Review in eigene Phasen.",
        "Nutze Hooks/Skills nur fuer klare Guardrails, nicht fuer Breitenautomation.",
        "Mache den Menschen zur Merge Authority und den Agenten zum Patch-Lieferanten."
      ]
    },
    nextStep: "Formuliere eine Aufgabe mit Scope, verbotenen Aktionen, Akzeptanzkriterien und gewuenschtem Beleg."
  },
  codex: {
    label: "Codex",
    route: "Codex-Onboarding",
    fit: "bounded Worker fuer klar definierte Coding-Aufgaben",
    risks: [
      "Auftrag ist mehrere Ziele gleichzeitig",
      "Akzeptanzkriterium oder Testbeleg fehlt",
      "Sandbox, Netzwerk oder Approval-Grenzen sind unklar"
    ],
    recommendations: {
      beginner: [
        "Beschreibe genau eine Aufgabe, nicht ein ganzes Projekt.",
        "Nenne das erwartete Ergebnis und ein einfaches Pruefkriterium.",
        "Bitte zuerst um Analyse, wenn der Schreibbereich unklar ist."
      ],
      intermediate: [
        "Gib betroffene Dateien oder Module an, wenn du sie kennst.",
        "Definiere Done als Test, Smoke-Check oder nachvollziehbaren Befund.",
        "Halte Netzwerk und Schreibrechte begrenzt, bis sie begruendet sind."
      ],
      power: [
        "Splitte Explorer-, Builder- und Reviewer-Arbeit bewusst.",
        "Nutze Subagents nur fuer disjunkte, begrenzte Nebenaufgaben.",
        "Verlange eine kurze Abschlusslage: geaendert, geprueft, offen."
      ]
    },
    nextStep: "Schreibe einen Codex-Auftrag mit Ziel, Scope, Constraints, Akzeptanzkriterien und Testplan."
  },
  hermes: {
    label: "Hermes",
    route: "Hermes-Onboarding",
    fit: "profilbasierte Agentensteuerung, Rollenarbeit und HAI-Control-Plane-Denken",
    risks: [
      "Profile vermischen Rolle, Tools und Owner-Entscheidung",
      "Zu viele Agenten werden gleichzeitig angestossen",
      "Langfristige Memory wird mit Session-Kontext verwechselt"
    ],
    recommendations: {
      beginner: [
        "Klaere zuerst, welche Rolle der Agent wirklich hat.",
        "Halte Toolzugriff aus dem ersten Test heraus.",
        "Beende die Session mit einem Owner-Packet statt einem grossen Plan."
      ],
      intermediate: [
        "Trenne Profile nach Verantwortung: Intake, Review, Builder, Owner-Summary.",
        "Nutze session-lokale Fakten und speichere nur mit bewusstem Grund.",
        "Begrenze Fanout: kleine Batches, klare Frage, klares Ende."
      ],
      power: [
        "Baue eine explizite Send-Right- und Approval-Grenze ein.",
        "Halte Meta-Agenten von Produktionsausfuehrung getrennt.",
        "Pruefe Profile gegen HAI: Ownership, Scope, Evidence, Stop-Regel."
      ]
    },
    nextStep: "Definiere ein Hermes-Profil mit Rolle, Nicht-Rolle, erlaubtem Kontext, Stop-Regel und Output-Format."
  },
  unknown: {
    label: "General HAI Triage",
    route: "General-HAI-Triage",
    fit: "Klaerung, welches Harness oder welche Arbeitsform ueberhaupt passt",
    risks: [
      "Tool-Frage wird beantwortet, bevor das Problem verstanden ist",
      "Der Nutzer erwartet Ausfuehrung statt Entscheidungshilfe",
      "Zu viele Optionen erhoehen kognitive Last"
    ],
    recommendations: {
      beginner: [
        "Beschreibe zuerst die Situation, nicht das gewuenschte Tool.",
        "Benenne, was der Agent auf keinen Fall tun darf.",
        "Waehle danach ein Harness fuer genau einen naechsten Schritt."
      ],
      intermediate: [
        "Sortiere das Problem in Orientierung, Setup oder Workflow-Steuerung.",
        "Entscheide, ob du Analyse, Patch-Arbeit oder Review brauchst.",
        "Nimm das kleinste Harness, das diesen Schritt kontrollierbar erledigt."
      ],
      power: [
        "Trenne Produktentscheidung, Ausfuehrungsgrenze und Reviewpflicht.",
        "Nutze Spezialprofile erst, wenn die Owner-Frage klar ist.",
        "Halte Subagents als Review-/Research-Werkzeug, nicht als Default-Runtime."
      ]
    },
    nextStep: "Formuliere dein Problem als Owner-Entscheidung: Was soll klarer werden, was bleibt menschlich, welcher Beleg zaehlt?"
  }
};

const levelLabels = {
  beginner: "Anfaenger",
  intermediate: "Fortgeschritten",
  power: "Power User"
};

const state = {
  started: false,
  ended: false,
  selectedHarness: "claude",
  userLevel: "intermediate",
  mainProblem: "",
  goal: "",
  constraints: [],
  messages: [],
  userMessageCount: 0,
  startedAt: null,
  remainingSeconds: SESSION_SECONDS,
  timerId: null,
  summaryText: "",
  pending: false
};

const elements = {
  intakeForm: document.querySelector("#intakeForm"),
  chatForm: document.querySelector("#chatForm"),
  chatLog: document.querySelector("#chatLog"),
  messageInput: document.querySelector("#messageInput"),
  sendButton: document.querySelector("#sendButton"),
  endSessionButton: document.querySelector("#endSessionButton"),
  timerDisplay: document.querySelector("#timerDisplay"),
  messageCounter: document.querySelector("#messageCounter"),
  routeLabel: document.querySelector("#routeLabel"),
  summaryTitle: document.querySelector("#summary-title"),
  summaryIntro: document.querySelector("#summaryIntro"),
  summaryOutput: document.querySelector("#summaryOutput"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  consentInput: document.querySelector("#consentInput"),
  mailLink: document.querySelector("#mailLink")
};

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function getConstraints() {
  return Array.from(document.querySelectorAll('input[name="constraint"]:checked')).map((input) => input.value);
}

function sanitizeText(value, fallback) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed || fallback;
}

function currentProfile() {
  return profiles[state.selectedHarness] || profiles.unknown;
}

function updateRouteLabel() {
  elements.routeLabel.textContent = currentProfile().route;
}

function updateMeters() {
  const minutes = Math.floor(state.remainingSeconds / 60).toString().padStart(2, "0");
  const seconds = (state.remainingSeconds % 60).toString().padStart(2, "0");
  elements.timerDisplay.textContent = `${minutes}:${seconds}`;
  elements.messageCounter.textContent = `${state.userMessageCount}/${MAX_USER_MESSAGES}`;
}

function setChatEnabled(enabled) {
  const active = enabled && !state.pending;
  elements.messageInput.disabled = !active;
  elements.sendButton.disabled = !active;
  elements.endSessionButton.disabled = !active;
  elements.messageInput.placeholder = active ? "Antworte knapp. Keine Secrets, keine privaten Dumps." : "Session starten, dann hier antworten.";
  elements.sendButton.textContent = state.pending ? "Warten" : "Senden";
}

function appendMessage(role, paragraphs, variant = "") {
  const article = document.createElement("article");
  article.className = `message ${role}${variant ? ` ${variant}` : ""}`;

  const label = document.createElement("span");
  label.className = "message-role";
  label.textContent = role === "user" ? "Du" : currentProfile().route;
  article.append(label);

  paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    article.append(p);
  });

  elements.chatLog.append(article);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function containsSecretLikeText(text) {
  const patterns = [
    /sk-[a-zA-Z0-9_-]{12,}/,
    /api[_-]?key\s*[:=]/i,
    /token\s*[:=]/i,
    /password\s*[:=]/i,
    /secret\s*[:=]/i
  ];
  return patterns.some((pattern) => pattern.test(text));
}

function startTimer() {
  window.clearInterval(state.timerId);
  state.timerId = window.setInterval(() => {
    if (!state.started || state.ended) {
      window.clearInterval(state.timerId);
      return;
    }

    state.remainingSeconds -= 1;
    updateMeters();

    if (state.remainingSeconds <= 0) {
      endSession("timer");
    }
  }, 1000);
}

function setPending(pending) {
  state.pending = pending;
  setChatEnabled(state.started && !state.ended);
}

function buildRequestPayload(mode) {
  return {
    mode,
    harness: state.selectedHarness,
    level: state.userLevel,
    problem: state.mainProblem,
    goal: state.goal,
    constraints: state.constraints,
    messages: state.messages,
    userMessageCount: state.userMessageCount
  };
}

async function requestHarnessAgent(mode) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildRequestPayload(mode))
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("Backend-Antwort war kein JSON.");
  }

  if (!response.ok || data.error) {
    throw new Error(data.detail || data.error || "Backend-Anfrage fehlgeschlagen.");
  }

  return data;
}

async function startSession(event) {
  event.preventDefault();

  state.started = true;
  state.ended = false;
  state.selectedHarness = getSelectedValue("harness") || "unknown";
  state.userLevel = getSelectedValue("level") || "intermediate";
  state.mainProblem = sanitizeText(document.querySelector("#problemInput").value, "Noch nicht klar benannt");
  state.goal = sanitizeText(document.querySelector("#goalInput").value, "kontrollierter mit dem Harness arbeiten");
  state.constraints = getConstraints();
  state.messages = [];
  state.userMessageCount = 0;
  state.startedAt = new Date();
  state.remainingSeconds = SESSION_SECONDS;
  state.summaryText = "";
  state.pending = false;

  updateRouteLabel();
  updateMeters();
  setChatEnabled(false);
  resetSummary();
  elements.chatLog.innerHTML = "";

  const profile = currentProfile();
  appendMessage("agent", [
    `Route gesetzt: ${profile.route}. Dieses V0 ruft einen Backend-Agenten auf und fuehrt nur Beratung und Onboarding aus.`,
    `Startproblem: ${state.mainProblem}`,
    "Ich hole die erste Agentenantwort vom Worker."
  ]);

  startTimer();

  setPending(true);
  try {
    const data = await requestHarnessAgent("chat");
    state.messages.push({ role: "agent", text: data.reply });
    appendMessage("agent", splitParagraphs(data.reply), data.blocked ? "warning" : "");
    setChatEnabled(true);
    elements.messageInput.focus();
  } catch (error) {
    appendMessage("agent", [
      "Backend-Agent nicht erreichbar.",
      error.message,
      "Pruefe Worker-Deploy, OPENAI_API_KEY und HAI_HARNESS_MODEL."
    ], "warning");
    state.ended = true;
    window.clearInterval(state.timerId);
  } finally {
    setPending(false);
  }
}

async function handleUserMessage(event) {
  event.preventDefault();

  if (!state.started || state.ended || state.pending) {
    return;
  }

  const text = elements.messageInput.value.trim();
  if (!text) {
    return;
  }

  if (containsSecretLikeText(text)) {
    elements.messageInput.value = "";
    appendMessage("agent", [
      "Stop: Das sieht nach Secret, Token oder Passwort aus. Ich sende das nicht an den Backend-Agenten.",
      "Beschreibe die Stelle abstrakt: welches System, welche Grenze, welcher Fehler. Keine Werte, keine Keys, keine privaten Dumps."
    ], "warning");
    return;
  }

  state.userMessageCount += 1;
  state.messages.push({ role: "user", text });
  appendMessage("user", [text]);
  elements.messageInput.value = "";
  updateMeters();

  setPending(true);
  try {
    const data = await requestHarnessAgent("chat");
    state.messages.push({ role: "agent", text: data.reply });
    appendMessage("agent", splitParagraphs(data.reply), data.blocked ? "warning" : "");
  } catch (error) {
    appendMessage("agent", [
      "Backend-Agent nicht erreichbar.",
      error.message,
      "Die Session wurde nicht gespeichert. Du kannst nach Worker/API-Key-Konfiguration neu starten."
    ], "warning");
  } finally {
    setPending(false);
  }

  if (state.userMessageCount >= MAX_USER_MESSAGES) {
    await endSession("limit");
  }
}

function summaryLines(reason) {
  const profile = currentProfile();
  const recs = profile.recommendations[state.userLevel] || profile.recommendations.intermediate;
  const reasonLabel = reason === "timer" ? "Timer abgelaufen" : reason === "limit" ? "Nachrichtenlimit erreicht" : "Manuell abgeschlossen";

  return [
    `HAI Harness Check - Session Packet`,
    ``,
    `Abschlussgrund: ${reasonLabel}`,
    `Harness: ${profile.label}`,
    `Route: ${profile.route}`,
    `Level: ${levelLabels[state.userLevel] || levelLabels.intermediate}`,
    `Problem: ${state.mainProblem}`,
    `Ziel: ${state.goal}`,
    `Grenzen: ${state.constraints.join(", ") || "keine angegeben"}`,
    ``,
    `Problemverstaendnis: Der Nutzer braucht keine autonome Ausfuehrung, sondern einen kleineren, pruefbaren Harness-Schritt.`,
    `Top-Risiken: ${profile.risks.slice(0, 3).join("; ")}`,
    `Empfehlung: ${recs.join(" ")}`,
    `Naechster sicherer Schritt: ${profile.nextStep}`,
    `Verifikation: Der naechste Agentenlauf muss Scope, Aenderung/Ergebnis und Beleg sichtbar machen.`,
    `HAI-Prinzipien: Mensch bleibt Owner; Scope bleibt klein; keine Secrets; kein Upload; keine stille Ausfuehrung.`,
    ``,
    `Kontakt-CTA: Optional mit Consent an Samuel senden.`
  ];
}

function splitParagraphs(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function renderSummary(reason, summaryText = "") {
  const lines = summaryText ? [summaryText] : summaryLines(reason);
  state.summaryText = lines.join("\n");
  elements.summaryTitle.textContent = "Session Packet";
  elements.summaryIntro.textContent = summaryText
    ? "Vom Backend-Agenten erzeugt. Versand nur nach aktivem Consent."
    : "Lokales Fallback-Paket. Versand nur nach aktivem Consent.";
  elements.summaryOutput.innerHTML = "";

  const text = document.createElement("pre");
  text.className = "summary-text";
  text.textContent = state.summaryText;
  elements.summaryOutput.append(text);

  elements.copySummaryButton.disabled = false;
  elements.consentInput.disabled = false;
  updateMailLink();
}

async function endSession(reason = "manual") {
  if (!state.started || state.ended) {
    return;
  }

  state.ended = true;
  window.clearInterval(state.timerId);
  setChatEnabled(false);
  appendMessage("agent", [
    "Session abgeschlossen. Ich erzeuge jetzt das Session Packet.",
    "Ohne Consent wird nichts gespeichert oder versendet."
  ]);

  setPending(true);
  try {
    const data = await requestHarnessAgent("summary");
    renderSummary(reason, data.reply);
  } catch (error) {
    renderSummary(reason);
    appendMessage("agent", [
      "Backend-Summary nicht erreichbar. Rechts steht ein lokales Fallback-Paket.",
      error.message
    ], "warning");
  } finally {
    setPending(false);
  }
}

function resetSummary() {
  elements.summaryTitle.textContent = "Noch nicht erzeugt";
  elements.summaryIntro.textContent = "Das Paket erscheint nach dem Abschluss der begrenzten Session.";
  elements.summaryOutput.innerHTML = '<p class="empty-state">Kein persistenter Speicher. Das Paket bleibt in dieser Browser-Session.</p>';
  elements.copySummaryButton.disabled = true;
  elements.consentInput.checked = false;
  elements.consentInput.disabled = true;
  elements.mailLink.href = "#";
  elements.mailLink.classList.add("disabled");
  elements.mailLink.setAttribute("aria-disabled", "true");
}

async function copySummary() {
  if (!state.summaryText) {
    return;
  }

  try {
    await navigator.clipboard.writeText(state.summaryText);
    elements.copySummaryButton.textContent = "Kopiert";
    window.setTimeout(() => {
      elements.copySummaryButton.textContent = "Paket kopieren";
    }, 1400);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = state.summaryText;
    textarea.setAttribute("readonly", "");
    textarea.className = "sr-only";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function updateMailLink() {
  const hasConsent = elements.consentInput.checked;
  const canSend = hasConsent && Boolean(state.summaryText);

  if (!canSend) {
    elements.mailLink.href = "#";
    elements.mailLink.classList.add("disabled");
    elements.mailLink.setAttribute("aria-disabled", "true");
    return;
  }

  const subject = encodeURIComponent("HAI Harness Check Session Packet");
  const body = encodeURIComponent(`Hallo Samuel,\n\nich moechte diese HAI Harness Check Zusammenfassung teilen:\n\n${state.summaryText}\n\nMoegliche Zeitfenster:\n`);
  elements.mailLink.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  elements.mailLink.classList.remove("disabled");
  elements.mailLink.setAttribute("aria-disabled", "false");
}

document.querySelectorAll('input[name="harness"]').forEach((input) => {
  input.addEventListener("change", () => {
    state.selectedHarness = getSelectedValue("harness") || "unknown";
    updateRouteLabel();
  });
});

elements.intakeForm.addEventListener("submit", startSession);
elements.chatForm.addEventListener("submit", handleUserMessage);
elements.endSessionButton.addEventListener("click", () => {
  endSession("manual");
});
elements.copySummaryButton.addEventListener("click", copySummary);
elements.consentInput.addEventListener("change", updateMailLink);

updateRouteLabel();
updateMeters();
