"use strict";

const STORAGE_KEY = "ads-uebungsblaetter-state-v1";
const TASK_KEY = "pb03a02";

const terms = [
  ["f(n) = n + 1 + 3n", "n"],
  ["g(n) = 3 + 9n²", "n²"],
  ["h(n) = (n + 6)(n + 7)", "n²"],
  ["ξ(n) = (n + 1)(n + 2)/(n + 3)", "n"],
  ["φ(n) = log(3n)(n + 15)", "n·log n"],
  ["ψ(n) = n⁶(n + 5)/(n + 4)", "n⁶"]
];
const growthOptions = ["n", "n²", "n·log n", "n⁶", "2ⁿ"];

const claims = [
  ["f ∈ O(n)", true, "f wächst linear: Θ(n), also liegt f in O(n)."],
  ["f ∈ O(n²)", true, "Linear wächst höchstens quadratisch: O(n) ⊂ O(n²)."],
  ["f ∈ O(g)", true, "f ~ n und g ~ n²; linear ist nach oben durch quadratisch beschränkt."],
  ["g = O(f)", false, "Als g ∈ O(f) gelesen: n² ist nicht durch eine lineare Funktion beschränkt."],
  ["f + ξ ∈ O(g)", true, "f + ξ ~ n + n = n und damit O(n²)."],
  ["f · ξ ∈ O(g)", true, "f · ξ ~ n · n = n², dieselbe Wachstumsordnung wie g."],
  ["f · ξ ∈ O(ξ)", false, "n² wächst schneller als ξ ~ n; ein Faktor f verschwindet nicht."],
  ["g · ξ ∈ O(2ⁿ)", true, "g · ξ ~ n³; jedes feste Polynom wächst langsamer als 2ⁿ."],
  ["φ ∈ O(f)", false, "φ ~ n log n wächst schneller als f ~ n."],
  ["φ ∈ O(h)", true, "n log n wächst höchstens quadratisch; h ~ n²."],
  ["n¹² ∈ O(ξ · ψ)", false, "ξ · ψ ~ n · n⁶ = n⁷; n¹² wächst schneller als n⁷."],
  ["O(f) ⊆ O(g)", true, "O(f)=O(n) ist eine Teilmenge von O(g)=O(n²)."],
  ["O(f) = O(g)", false, "O(n) und O(n²) sind nicht gleich; die erste Menge ist echt kleiner."],
  ["O(g) ⊆ O(f)", false, "Die Inklusion läuft andersherum: O(n) ⊂ O(n²)."],
  ["O(g) ⊆ O(h)", true, "g und h sind beide Θ(n²), daher sind ihre O-Mengen gleich."],
  ["O(h) ⊆ O(g)", true, "h und g sind beide Θ(n²), daher gilt auch diese Inklusion."],
  ["5 · 2ⁿ ⊆ O(n²)", false, "Links steht eine Funktion, keine Menge; selbst als ∈ gelesen wächst 2ⁿ schneller als n²."]
];

const termBench = document.querySelector("#termBench");
const claimBox = document.querySelector("#claims");
const termFeedback = document.querySelector("#termFeedback");
const claimFeedback = document.querySelector("#claimFeedback");
const solutions = document.querySelector("#solutions");

terms.forEach(([formula, answer], index) => {
  const row = document.createElement("label");
  row.className = "term-row";
  row.innerHTML = `<span class="formula">${formula}</span><select data-term="${index}" aria-label="Wachstumsform von ${formula}"><option value="">Wachstum wählen …</option>${growthOptions.map(x => `<option value="${x}">${x}</option>`).join("")}</select>`;
  row.dataset.answer = answer;
  termBench.append(row);
});

const genericWrong = [
  "Konstanten entscheiden die O-Klasse.",
  "O(…) ist hier ein einzelner Zahlenwert.",
  "Man darf sichtbare Terme vergleichen, ohne Produkte oder Quotienten zu vereinfachen."
];

claims.forEach(([text, truth, reason], index) => {
  const card = document.createElement("article");
  card.className = "claim-card";
  const distractor = genericWrong[index % genericWrong.length];
  const other = truth ? "Die linke Seite wächst asymptotisch schneller als die rechte." : "Beide Seiten besitzen automatisch dieselbe O-Klasse.";
  const reasons = [reason, distractor, other].sort(() => (index % 2 ? 1 : -1));
  card.innerHTML = `<span class="claim-no">${String(index + 1).padStart(2, "0")}</span><div class="claim-main"><span class="claim-text">${text}</span><div class="truth"><label><input type="radio" name="claim-${index}" value="true"> wahr</label><label><input type="radio" name="claim-${index}" value="false"> falsch</label></div></div><label class="reason-label">Begründung<select data-reason="${index}"><option value="">Mechanismus wählen …</option>${reasons.map(x => `<option value="${x === reason ? "correct" : "wrong"}">${x}</option>`).join("")}</select></label>`;
  claimBox.append(card);
});

document.querySelectorAll("[data-hint]").forEach(button => button.addEventListener("click", () => {
  const hint = document.getElementById(button.dataset.hint);
  hint.hidden = !hint.hidden;
}));

document.querySelector("#checkTerms").addEventListener("click", () => {
  const selects = [...document.querySelectorAll("[data-term]")];
  const wrong = selects.filter((select, i) => select.value !== terms[i][1]);
  termFeedback.hidden = false;
  if (wrong.length) {
    termFeedback.className = "feedback try";
    termFeedback.textContent = `${wrong.length} Term${wrong.length === 1 ? "" : "e"} noch nicht tragfähig. Falscher Pfad: sichtbare Schreibweise direkt vergleichen. Multipliziere Produkte gedanklich aus und kürze den Quotienten asymptotisch.`;
    return;
  }
  termFeedback.className = "feedback good";
  termFeedback.textContent = "Werkbank stimmt. Jetzt vergleichst du nur noch n, n², n·log n, n⁶ und 2ⁿ — beziehungsweise Mengen solcher Funktionen.";
  document.querySelector("#claimsStep").hidden = false;
  document.querySelector("#claimsStep").scrollIntoView({behavior: "smooth", block: "start"});
});

document.querySelector("#checkClaims").addEventListener("click", () => {
  let correct = 0;
  let incomplete = 0;
  document.querySelectorAll(".claim-card").forEach((card, index) => {
    const chosen = card.querySelector(`input[name="claim-${index}"]:checked`);
    const reason = card.querySelector("select").value;
    card.classList.remove("correct", "wrong");
    if (!chosen || !reason) incomplete++;
    const ok = chosen && chosen.value === String(claims[index][1]) && reason === "correct";
    card.classList.add(ok ? "correct" : "wrong");
    if (ok) correct++;
  });
  claimFeedback.hidden = false;
  claimFeedback.className = correct === claims.length ? "feedback good" : "feedback try";
  claimFeedback.textContent = correct === claims.length
    ? "17/17: Abschluss erreicht. Jede Aussage hat Wahrheit und Mechanismus."
    : `${correct}/17 korrekt${incomplete ? `, ${incomplete} unvollständig` : ""}. Prüfe besonders: Funktion ∈ O(…) versus O(…) ⊆ O(…). O(f) ist eine Funktionenmenge, keine Zahl.`;
  showSolutions();
});

function showSolutions() {
  solutions.innerHTML = claims.map(([text, truth, reason], i) => `<div class="solution-item"><strong>${i + 1}. ${text}: ${truth ? "wahr" : "falsch"}.</strong> ${reason}</div>`).join("");
  solutions.hidden = false;
}

document.querySelector("#revealAsk").addEventListener("click", () => {
  document.querySelector("#revealConfirm").hidden = false;
});
document.querySelector("#revealConfirm").addEventListener("click", showSolutions);

function readState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function paintState(value) {
  document.querySelectorAll("[data-state]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.state === value)));
}
document.querySelectorAll("[data-state]").forEach(button => button.addEventListener("click", () => {
  const state = readState();
  state[TASK_KEY] = button.dataset.state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  paintState(button.dataset.state);
  const feedback = document.querySelector("#stateFeedback");
  feedback.hidden = false;
  feedback.className = "feedback good";
  feedback.textContent = `Gespeichert: ${button.dataset.state}.`;
}));
paintState(readState()[TASK_KEY]);
