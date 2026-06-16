const form = document.getElementById("intakeForm");
const steps = [...document.querySelectorAll(".step")];
const stepCount = document.getElementById("stepCount");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const copyButton = document.getElementById("copy");
const packet = document.getElementById("packet");
const failureWarning = document.getElementById("failureWarning");
let currentStep = 0;

function checkedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((item) => item.value);
}

function value(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function updateStep() {
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  stepCount.textContent = currentStep >= 6
    ? "Owner Intake Packet"
    : `Step ${currentStep + 1} of 6 / ${steps[currentStep].dataset.title}`;
  backButton.disabled = currentStep === 0;
  nextButton.textContent = currentStep === 5 ? "Generate packet" : currentStep >= 6 ? "Edit intake" : "Next";
  copyButton.style.display = currentStep >= 6 ? "inline-flex" : "none";
  window.scrollTo(0, 0);
}

function stepIsValid() {
  const required = [...steps[currentStep].querySelectorAll("[required]")];
  return required.every((field) => field.reportValidity());
}

function classifyLevel(tools, frequency) {
  const toolSet = new Set(tools);
  if (["Claude Code Terminal", "Codex CLI", "Hermes", "terminal-based agent workflow"].some((tool) => toolSet.has(tool)) || frequency === "core workflow") return "terminal workflow operator";
  if (["OpenCode", "custom harness", "Cline", "Aider"].some((tool) => toolSet.has(tool))) return "agentic builder";
  if (["Claude Code Mac App", "Codex App", "Cursor", "Lovable", "Google Antigravity"].some((tool) => toolSet.has(tool))) return "tool-surface user";
  return "tool user";
}

function toolFitNote(tools) {
  const toolSet = new Set(tools);
  const hasCore = ["Claude Code Terminal", "Codex CLI", "Hermes", "terminal-based agent workflow"].some((tool) => toolSet.has(tool));
  const hasAdjacent = ["OpenCode", "custom harness", "Cline", "Aider"].some((tool) => toolSet.has(tool));
  const hasApp = ["Claude Code Mac App", "Codex App", "ChatGPT", "Claude"].some((tool) => toolSet.has(tool));
  const hasNonFocus = ["Cursor", "Lovable", "Google Antigravity", "GitHub Copilot", "Devin", "OpenHands"].some((tool) => toolSet.has(tool));

  if (hasCore && hasNonFocus) {
    return "Very strong if the real break happens in the terminal agent loop; IDE or platform-specific support is secondary.";
  }
  if (hasCore) {
    return "Very strong fit: terminal-based agent workflow, project context, hooks, verification, and ownership boundaries.";
  }
  if (hasAdjacent) {
    return "Possible fit: close enough if the issue is workflow structure, verification, scope control, or handoff.";
  }
  if (hasApp) {
    return "Limited fit: method and ownership help are possible, but deep app-surface support is not the main focus.";
  }
  if (hasNonFocus) {
    return "Not the main focus: likely better for method, gates, and ownership boundaries than product-specific tool advice.";
  }
  return "Unknown fit until the tool surface and workflow break are made concrete.";
}

function fitNote(failure, humanOwned, agentOwned, verification) {
  const weakVerification = verification.includes("no clear rule") || verification.includes("manual review") || failure.includes("weak verification") || failure.includes("false done");
  const ownershipRisk = agentOwned.includes("goal") || agentOwned.includes("scope") || agentOwned.includes("risk") || humanOwned.length === 0;
  if (failure.length > 0 && agentOwned.length > 0 && (weakVerification || ownershipRisk)) {
    return "Strong fit: real agent work, visible failure pattern, and a control or verification gap.";
  }
  if (failure.length > 0) {
    return "Medium fit: real task and pain are visible; the first HAI step should narrow delegation and evidence.";
  }
  return "Weak fit until the workflow pain is made concrete.";
}

function humanGates(humanOwned, never, stopApproving) {
  const gates = [];
  if (humanOwned.length) gates.push(`Human keeps: ${humanOwned.join(", ")}`);
  if (never) gates.push(`Never without human: ${never}`);
  if (stopApproving.length && !stopApproving.includes("none yet")) {
    gates.push(`Still approving manually: ${stopApproving.join(", ")}`);
  }
  return gates.length ? gates.map((g, i) => `${i + 1}. ${g}`).join("\n") : "1. Not specified yet — clarify before delegating.";
}

function verificationRule(verification, evidence, reliability) {
  const parts = [];
  if (verification.length) parts.push(`Check via: ${verification.join(", ")}`);
  if (evidence.length) parts.push(`Trust when: ${evidence.join(", ")}`);
  if (reliability) parts.push(`Current reliability: ${reliability}`);
  return parts.join("\n") || "No verifier rule yet — define one before scaling agent output.";
}

function nextActionPacket(currentWork, failure, autonomy) {
  const outcome = currentWork
    ? `One bounded improvement to: ${currentWork.slice(0, 120)}${currentWork.length > 120 ? "…" : ""}`
    : "One bounded workflow improvement with explicit owner gate";
  const topFailure = failure[0] || "unclear failure pattern";
  return `Outcome: ${outcome}
Evidence: ${failure.length ? `Failure pattern "${topFailure}" no longer blocks the next verifiable step` : "One visible proof that the workflow is checkable"}
Boundaries: ${autonomy || "L2 or lower until verifier rule exists"}; no commit/push/deploy without human gate
Stop condition: Stop when one next step is written, scoped, and verifiable — or when scope needs an owner decision`;
}

function generatePacket() {
  const tools = checkedValues("tools");
  const failure = checkedValues("failure");
  const humanOwned = checkedValues("humanOwned");
  const agentOwned = checkedValues("agentOwned");
  const verification = checkedValues("verification");
  const evidence = checkedValues("evidence");
  const stopApproving = checkedValues("stopApproving");
  const currentWork = value("currentWork");
  const level = classifyLevel(tools, value("frequency"));
  const toolFit = toolFitNote(tools);
  const fit = fitNote(failure, humanOwned, agentOwned, verification);
  const friction = failure.length
    ? failure.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join("\n")
    : "1. Not specified\n2. —\n3. —";

  packet.textContent = `# HAI Owner Intake Packet

## Problem (one sentence)
${currentWork || "not specified"}

## Three friction points
${friction}

## Current workflow
${currentWork}

Tools in use:
${tools.join(", ") || "not specified"}${value("customSetup") ? `\nCustom setup: ${value("customSetup")}` : ""}

Tool fit signal:
${toolFit}

Usage frequency:
${value("frequency")}

Break point:
${value("breakPoint") || "not specified"}

Customer level:
${level}

## Human gates
${humanGates(humanOwned, value("never"), stopApproving)}

Human-owned decisions/work:
${humanOwned.join(", ") || "not specified"}

Agent-owned work:
${agentOwned.join(", ") || "not specified"}

Handoff clarity:
${value("handoff") || "not specified"}

Missing layer:
${checkedValues("missingLayer").join(", ") || "not specified"}

Desired autonomy level:
${value("autonomy")}

Hard autonomy boundary:
${value("never")}

## Verification rule
${verificationRule(verification, evidence, value("reliability"))}

Existing verification methods:
${verification.join(", ") || "not specified"}

Trusted evidence:
${evidence.join(", ") || "not specified"}${value("evidenceNote") ? `\nEvidence note: ${value("evidenceNote")}` : ""}

## Next Action Packet
${nextActionPacket(currentWork, failure, value("autonomy"))}

## Audit fit
${fit}

---
Next step: Book a 20 min HAI fit call — samuel@human-agent-interface.com
Subject: HAI fit call + attach this packet`;
}

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.dataset.toggle);
    const open = panel.classList.toggle("open");
    button.textContent = open
      ? button.textContent.replace("More", "Hide")
      : button.textContent.replace("Hide", "More");
  });
});

document.querySelectorAll('input[name="failure"]').forEach((box) => {
  box.addEventListener("change", () => {
    if (checkedValues("failure").length > 3) {
      box.checked = false;
      failureWarning.classList.add("visible");
      setTimeout(() => failureWarning.classList.remove("visible"), 1800);
    }
  });
});

backButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    updateStep();
  }
});

nextButton.addEventListener("click", () => {
  if (currentStep >= 6) {
    currentStep = 0;
    updateStep();
    return;
  }

  if (!stepIsValid()) return;

  if (currentStep === 5) {
    generatePacket();
    currentStep = 6;
  } else {
    currentStep += 1;
  }
  updateStep();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(packet.textContent);
    const old = copyButton.textContent;
    copyButton.textContent = "Copied";
    setTimeout(() => { copyButton.textContent = old; }, 1200);
  } catch (error) {
    copyButton.textContent = "Copy manually";
  }
});

updateStep();
