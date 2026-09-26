const stages = {
  owner: {
    kicker: "01 / Human Ownership",
    title: "Der Mensch setzt Ziel, Risiko und Abbruchlinie.",
    body: "Agenten arbeiten erst sinnvoll, wenn Ziel, Nicht-Ziel und Human-only Entscheidungen sichtbar sind.",
    active: 0,
  },
  scope: {
    kicker: "02 / Scope Boundary",
    title: "Der Auftrag wird klein genug, dass Erfolg pruefbar ist.",
    body: "Das Harness trennt Wunsch, Kontext, Nicht-Ziel und erlaubte Aktionen, bevor der Agent arbeitet.",
    active: 1,
  },
  delegate: {
    kicker: "03 / Delegation Card",
    title: "Das Tool bekommt Rolle, Grenze und Artefaktpflicht.",
    body: "Die Delegation Card ersetzt den diffusen Prompt durch Ziel, Scope, Human Gates und Verifikation.",
    active: 2,
  },
  verify: {
    kicker: "04 / Verifier Loop",
    title: "Done ist erst wahr, wenn Belege danebenliegen.",
    body: "Tests, Diffs, Dateien, Screenshots oder Reports schlagen die Erfolgserzaehlung des Agenten.",
    active: 3,
  },
  handoff: {
    kicker: "05 / Next Action",
    title: "Am Ende steht eine Entscheidung, kein Rohlog.",
    body: "Der Mensch sieht, was geaendert wurde, welche Belege existieren, was offen bleibt und was als naechstes passiert.",
    active: 4,
  },
};

const taskData = {
  docs: {
    goal: "Baue oder verbessere ein Tutorial-Artefakt.",
    artifact: "Markdown-Dokumente, Quellenliste, Completion Checklist",
    verify: "rg-Coverage, Link-Check, git diff --check",
  },
  bug: {
    goal: "Reproduziere und behebe einen konkreten Fehler.",
    artifact: "kleiner Diff, fokussierter Test oder Repro-Log",
    verify: "Fehler reproduziert, Fix ausgefuehrt, Test/Smoke-Check gruen",
  },
  ui: {
    goal: "Verbessere eine konkrete UI-Ansicht.",
    artifact: "HTML/CSS/JS-Diff, Screenshot, responsive Check",
    verify: "Headless Screenshot, mobile/desktop Sichtpruefung, keine Overlaps",
  },
  audit: {
    goal: "Pruefe ein Repo oder Ergebnis read-only.",
    artifact: "Audit-Report mit Findings, Belegen und Next Action",
    verify: "Datei-/Zeilenbelege, keine Schreiboperationen, offene Risiken markiert",
  },
};

const toolData = {
  codex: {
    name: "Codex",
    source: "source: official OpenAI docs + local tutorial",
    role: "Lokaler Coding-Agent fuer Repo-Arbeit, Review, Tests und sichtbare Diffs.",
    use: "bounded implementation, repo audit, tests, docs",
    needs: "AGENTS.md, konkrete Aufgabe, Done when, Verifikation",
    artifact: "Diff, Tests, Verification Report, Next Action",
    gate: "Scope drift, dependencies, destructive actions, deploy",
    promptHandle: "Codex arbeitet im aktuellen Repo und liefert Diffs, Checks und Handoff.",
  },
  claude: {
    name: "Claude Code",
    source: "source: local HAI notes + Claude Code practice layer",
    role: "Tiefer Codebase-Arbeiter fuer Planung, Implementierung und Review gegen Repo-Kontext.",
    use: "komplexe Codebase-Arbeit, Architekturfragen, laengere Debug-Loops",
    needs: "CLAUDE.md/Repo-Regeln, kleine Tasks, klare Tests, sichtbarer Diff",
    artifact: "Plan, Patch, Tests, Review Notes",
    gate: "Engine-Grenzen ehrlich markieren, breite Refactors und Tool-Rechte freigeben lassen",
    promptHandle: "Claude Code nutzt Repo-Kontext, soll aber mit klarer Human Gate- und Testpflicht arbeiten.",
  },
  hermes: {
    name: "Hermes",
    source: "source: local Zustand-Hermes",
    role: "Control Plane mit Profilen, Skills, Memory, Verifiern und Owner-Schutz.",
    use: "Projektzustand laden, Profil waehlen, kleine naechste Schritte fuehren",
    needs: "explizites Profil, Scope, Artefaktpflicht, Verifier oder Decision-Control",
    artifact: "Owner Packet, Delegation Card, Verifier Report, Resume State",
    gate: "Samuel entscheidet Produkt, Scope, Architektur, irreversible Freigaben",
    promptHandle: "Hermes soll als Control Plane arbeiten: Profil waehlen, Briefing bauen, bounded delegieren.",
  },
  openclaw: {
    name: "OpenClaw",
    source: "source: local OpenClaw commands + architecture notes",
    role: "Router/Gateway-System fuer Agenten, Sessions, Devices und komplexe Scout-Build-Verify-Flows.",
    use: "Frontdoor-Routing, Gateway-Status, Agent-Sessions, komplexe Projektpipeline",
    needs: "router/hermes/specialist topology, gateway health, session choice, explicit approvals",
    artifact: "Routing Decision, Session State, Scout-Build-Verify Trace",
    gate: "gateway/config/devices/auth commands and new specialists need explicit human approval",
    promptHandle: "OpenClaw soll Routing und Sessions kontrolliert fuehren; komplexe Aufgaben gehen Scout -> Build -> Verify.",
  },
  opencode: {
    name: "OpenCode",
    source: "source: local OpenCode tutorials + handoff docs",
    role: "Schneller Builder und Reality-Check-Agent mit strenger Scope-Anweisung.",
    use: "one-shot Drafts, Gegenentwurf, schnelle Dateistrukturen, Implementierung",
    needs: "vollstaendiger Kontext pro Run, Output-Pfad, Nicht-Ziele, Tests",
    artifact: "kleiner Diff, Risiken, bewusst weggelassene Features",
    gate: "wenn der erste Run falsch scoped ist: neue Session mit besserem Briefing statt Reparatur-Chat",
    promptHandle: "OpenCode bekommt einen engen one-shot Auftrag mit Output-Pfad und expliziten Nicht-Zielen.",
  },
  pi: {
    name: "Pi",
    source: "source: generic HAI profile; no canonical local tool source found",
    role: "Persoenlicher Intake- und Denkdialog fuer unstrukturierte menschliche Ausgangslage.",
    use: "Wunsch klaeren, emotionale/kognitive Lage sortieren, Owner Packet vorbereiten",
    needs: "keine Writes, keine Done-Claims, klare Uebergabe an Arbeitsagent",
    artifact: "Problemklassifikation, Human-only Liste, naechste Frage",
    gate: "Reflexion ist kein Beleg; Umsetzung startet erst in einem anderen bounded Tool",
    promptHandle: "Pi soll nur klaeren und verdichten, nicht implementieren oder Erfolg behaupten.",
  },
  conductor: {
    name: "Conductor",
    source: "source: generic HAI orchestration profile; no canonical local tool source found",
    role: "Orchestrierungsrolle fuer mehrere Worker, ohne selbst die Ownership zu uebernehmen.",
    use: "Run-Leitung, Task-Slicing, Worker-Reihenfolge, Handoff und Integration",
    needs: "ein Lead, getrennte Write Scopes, Stop Rules, gemeinsamer Verifier",
    artifact: "Run Plan, Worker Contracts, Integration Checklist",
    gate: "kein Fanout ohne disjunkte Schreibbereiche und klares Integrationsartefakt",
    promptHandle: "Conductor koordiniert nur bounded Worker und muss Human Gates und Verifier sichtbar halten.",
  },
};

const riskData = {
  low: {
    label: "bounded",
    meter: "74%",
    gate: "Stoppe bei Scope Drift oder fehlenden Belegen.",
  },
  medium: {
    label: "gated",
    meter: "58%",
    gate: "Frage vor Dependencies, breiteren Datei-Aenderungen und unklaren Tests.",
  },
  high: {
    label: "human gate required",
    meter: "34%",
    gate: "Keine Ausfuehrung ohne menschliche Freigabe fuer Risiko, Auth, Deploy oder destruktive Aktionen.",
  },
};

const canvas = document.querySelector("#harnessCanvas");
const ctx = canvas.getContext("2d");
const stageButtons = Array.from(document.querySelectorAll("[data-stage]"));
const flowNodes = Array.from(document.querySelectorAll(".flow-node"));
const stageKicker = document.querySelector("#stageKicker");
const stageTitle = document.querySelector("#stageTitle");
const stageBody = document.querySelector("#stageBody");
const promptOutput = document.querySelector("#promptOutput");
const readinessMeter = document.querySelector("#readinessMeter");
const readinessLabel = document.querySelector("#readinessLabel");
const copyPrompt = document.querySelector("#copyPrompt");
const toolSelect = document.querySelector("#toolSelect");
const toolTabs = Array.from(document.querySelectorAll("[data-tool]"));
const toolSource = document.querySelector("#toolSource");
const toolName = document.querySelector("#toolName");
const toolRole = document.querySelector("#toolRole");
const toolUse = document.querySelector("#toolUse");
const toolNeeds = document.querySelector("#toolNeeds");
const toolArtifact = document.querySelector("#toolArtifact");
const toolGate = document.querySelector("#toolGate");
const gateInputs = Array.from(document.querySelectorAll(".gate-list input"));
const gateVerdict = document.querySelector(".gate-verdict");
const gateMode = document.querySelector("#gateMode");
const gateTitle = document.querySelector("#gateTitle");
const gateBody = document.querySelector("#gateBody");

let currentStage = "owner";
let currentTool = "codex";
let currentTask = "docs";
let currentRisk = "low";
let pointer = { x: 0.72, y: 0.38 };

function setStage(stageId) {
  const stage = stages[stageId];
  if (!stage) return;
  currentStage = stageId;
  stageKicker.textContent = stage.kicker;
  stageTitle.textContent = stage.title;
  stageBody.textContent = stage.body;

  stageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.stage === stageId);
  });

  flowNodes.forEach((node) => {
    node.classList.toggle("is-active", node.dataset.stage === stageId);
  });
}

function buildPrompt() {
  const task = taskData[currentTask];
  const risk = riskData[currentRisk];
  const tool = toolData[currentTool];
  readinessMeter.style.width = risk.meter;
  readinessLabel.textContent = risk.label;
  promptOutput.textContent = [
    "Tool:",
    tool.name,
    "",
    "Ziel:",
    task.goal,
    "",
    "Tool-Rolle:",
    "- " + tool.promptHandle,
    "",
    "Kontext:",
    "- Nutze das bestehende Repo und lies betroffene Dateien zuerst.",
    "- Behandle Chat als Steuerpult, nicht als Arbeitsflaeche.",
    "- Tool braucht: " + tool.needs + ".",
    "",
    "Scope:",
    "- Arbeite nur an dieser Aufgabe.",
    "- Erzeuge ein pruefbares Artefakt: " + task.artifact + ".",
    "- Tool-Artefakt: " + tool.artifact + ".",
    "",
    "Nicht tun:",
    "- keine Commits ohne Freigabe",
    "- keine neuen Dependencies ohne Gate",
    "- keine Scope-Erweiterung ohne Rueckfrage",
    "",
    "Human Gates:",
    "- " + tool.gate + ".",
    "- " + risk.gate,
    "- Stoppe bei destruktiven Aktionen, Secrets/Auth/Deploy oder unklarem Arbeitsordner.",
    "",
    "Verifikation:",
    "- " + task.verify,
    "- Liefere einen Verification Report mit Belegen.",
    "",
    "Abschluss:",
    "- Geaendert",
    "- Belege",
    "- Checks",
    "- Offen",
    "- Naechste Entscheidung",
  ].join("\n");
}

function setTool(toolId) {
  const tool = toolData[toolId];
  if (!tool) return;
  currentTool = toolId;
  toolSource.textContent = tool.source;
  toolName.textContent = tool.name;
  toolRole.textContent = tool.role;
  toolUse.textContent = tool.use;
  toolNeeds.textContent = tool.needs;
  toolArtifact.textContent = tool.artifact;
  toolGate.textContent = tool.gate;
  toolSelect.value = toolId;
  toolTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tool === toolId);
  });
  buildPrompt();
}

function updateGate() {
  const active = gateInputs.filter((input) => input.checked).map((input) => input.value);
  const hardStop = active.some((value) => ["dependency", "destructive", "secret", "scope"].includes(value));
  gateVerdict.classList.toggle("is-stop", hardStop);

  if (hardStop) {
    gateMode.textContent = "STOP";
    gateTitle.textContent = "Erst Human Gate, dann Codex.";
    gateBody.textContent = "Mindestens ein harter Gate-Faktor ist aktiv. Der Mensch entscheidet Scope, Risiko oder Freigabe, bevor der Agent weiterarbeitet.";
  } else if (active.includes("unknown")) {
    gateMode.textContent = "WARN";
    gateTitle.textContent = "Der Agent darf nur diagnostizieren.";
    gateBody.textContent = "Unklare Tests oder unbekannte Fehler brauchen erst Reproduktion und Beleg, nicht direkt einen Fix.";
  } else {
    gateMode.textContent = "RUN";
    gateTitle.textContent = "Das Tool darf bounded arbeiten.";
    gateBody.textContent = "Kein harter Human Gate aktiv. Der Auftrag braucht trotzdem Artefaktpflicht und Verifikation.";
  }
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawCanvas(time) {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#0d100c";
  ctx.fillRect(0, 0, width, height);

  const grid = 46;
  ctx.strokeStyle = "rgba(238, 228, 207, 0.05)";
  ctx.lineWidth = 1;
  for (let x = -grid; x < width + grid; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x + ((time / 80) % grid), 0);
    ctx.lineTo(x + ((time / 80) % grid), height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const nodes = [
    { label: "OWNER", x: 0.62, y: 0.24, color: "#a4d65e" },
    { label: "SCOPE", x: 0.78, y: 0.36, color: "#4fa997" },
    { label: toolData[currentTool].name.toUpperCase().slice(0, 9), x: 0.68, y: 0.54, color: "#547aa5" },
    { label: "VERIFY", x: 0.84, y: 0.66, color: "#c76b42" },
    { label: "NEXT", x: 0.55, y: 0.72, color: "#9b82c7" },
  ];

  const activeIndex = stages[currentStage].active;

  ctx.lineWidth = 2;
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const from = nodes[i];
    const to = nodes[i + 1];
    const fx = from.x * width;
    const fy = from.y * height;
    const tx = to.x * width;
    const ty = to.y * height;
    ctx.strokeStyle = i < activeIndex ? "rgba(164, 214, 94, 0.7)" : "rgba(238, 228, 207, 0.18)";
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo((fx + tx) / 2, fy);
    ctx.lineTo((fx + tx) / 2, ty);
    ctx.lineTo(tx, ty);
    ctx.stroke();
  }

  nodes.forEach((node, index) => {
    const x = node.x * width + (pointer.x - 0.5) * 16;
    const y = node.y * height + (pointer.y - 0.5) * 16;
    const active = index === activeIndex;
    const size = active ? 88 : 72;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = active ? node.color : "rgba(238, 228, 207, 0.08)";
    ctx.strokeStyle = active ? "rgba(255,255,255,0.62)" : "rgba(238, 228, 207, 0.22)";
    ctx.lineWidth = active ? 2 : 1;
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    ctx.restore();

    ctx.fillStyle = active ? "#0d100c" : "rgba(238, 228, 207, 0.72)";
    ctx.font = "12px IBM Plex Mono, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.fillText(node.label, x, y + 4);
  });

  requestAnimationFrame(drawCanvas);
}

stageButtons.forEach((button) => {
  button.addEventListener("click", () => setStage(button.dataset.stage));
});

toolTabs.forEach((button) => {
  button.addEventListener("click", () => setTool(button.dataset.tool));
});

toolSelect.addEventListener("change", () => setTool(toolSelect.value));

document.querySelectorAll("[data-task]").forEach((button) => {
  button.addEventListener("click", () => {
    currentTask = button.dataset.task;
    document.querySelectorAll("[data-task]").forEach((item) => item.classList.toggle("is-active", item === button));
    buildPrompt();
  });
});

document.querySelectorAll("[data-risk]").forEach((button) => {
  button.addEventListener("click", () => {
    currentRisk = button.dataset.risk;
    document.querySelectorAll("[data-risk]").forEach((item) => item.classList.toggle("is-active", item === button));
    buildPrompt();
  });
});

copyPrompt.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptOutput.textContent);
    copyPrompt.textContent = "Copied";
    setTimeout(() => {
      copyPrompt.textContent = "Copy";
    }, 1200);
  } catch {
    copyPrompt.textContent = "Select";
    setTimeout(() => {
      copyPrompt.textContent = "Copy";
    }, 1200);
  }
});

gateInputs.forEach((input) => input.addEventListener("change", updateGate));

document.querySelectorAll(".run-step").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    const open = button.classList.contains("is-open");
    document.querySelectorAll(".run-step").forEach((item) => item.classList.remove("is-open"));
    document.querySelectorAll(".run-detail").forEach((item) => item.classList.remove("is-open"));
    if (!open) {
      button.classList.add("is-open");
      detail.classList.add("is-open");
    }
  });
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  pointer = {
    x: event.clientX / Math.max(1, window.innerWidth),
    y: event.clientY / Math.max(1, window.innerHeight),
  };
});

resizeCanvas();
setStage("owner");
setTool("codex");
updateGate();
requestAnimationFrame(drawCanvas);
