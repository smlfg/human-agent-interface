"use strict";

const STORAGE_KEY = "ads-uebungsblaetter-state-v1";
const TASK_KEY = "pb02a02";
const phases = ["allocate", "copy", "release", "switch", "append"];
let phase = 0;
let copied = false;
let released = false;
let switched = false;
let appended = false;

function cell(value) { return `<span class="cell${value === undefined ? " empty" : ""}">${value === undefined ? "·" : value}</span>`; }
function render() {
  const oldCells = released ? [] : [4, 9];
  const newCells = phase === 0 ? null : [copied ? 4 : undefined, copied ? 9 : undefined, appended ? 17 : undefined, undefined];
  document.querySelector("#memory").innerHTML =
    `<div class="block ${switched ? "" : "current"} ${released ? "freed" : ""}"><strong>Block A ${released ? "(freigegeben)" : ""}</strong><div class="cells">${oldCells.map(cell).join("") || "—"}</div></div>` +
    (newCells ? `<div class="block ${switched ? "current" : ""}"><strong>Block B</strong><div class="cells">${newCells.map(cell).join("")}</div></div>` : "");
  document.querySelector("#sizeValue").textContent = appended ? "3" : "2";
  document.querySelector("#capacityValue").textContent = switched ? "4" : "2";
  document.querySelector("#pointerValue").textContent = switched ? "B" : "A";
}

function reset() {
  phase = 0; copied = false; released = false; switched = false; appended = false;
  document.querySelector("#workFeedback").className = "feedback";
  document.querySelector("#workFeedback").textContent = "Der alte Block A enthält 4 und 9. Was muss vor dem Umschalten passieren?";
  render();
}

document.querySelectorAll("[data-op]").forEach(button => button.addEventListener("click", () => {
  const op = button.dataset.op;
  const feedback = document.querySelector("#workFeedback");
  if (op !== phases[phase]) {
    feedback.className = "feedback try";
    if ((op === "switch" || op === "release") && !copied) feedback.textContent = "Blockiert: Ohne Kopie gehen 4 und 9 verloren. Der alte Block ist noch deine einzige Quelle.";
    else if (op === "append" && !switched) feedback.textContent = "Blockiert: arr zeigt noch auf den vollen alten Block. Erst den Besitzwechsel sauber abschließen.";
    else feedback.textContent = "Noch nicht: Halte Quelle und Ziel gültig und arbeite die Besitzübergabe der Reihe nach ab.";
    return;
  }
  if (op === "copy") copied = true;
  if (op === "release") released = true;
  if (op === "switch") switched = true;
  if (op === "append") appended = true;
  phase += 1;
  feedback.className = "feedback good";
  feedback.textContent = appended ? "Sauber: [4, 9, 17], size 3, capacity 4, arr zeigt auf B." : `Schritt ${phase} stimmt. Beide Invarianten bleiben kontrolliert.`;
  render();
}));
document.querySelector("#reset").addEventListener("click", reset);

document.querySelectorAll("[data-hint]").forEach(button => button.addEventListener("click", () => {
  const hint = document.getElementById(button.dataset.hint);
  hint.hidden = !hint.hidden;
}));

document.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
  const feedback = document.querySelector("#gateFeedback");
  feedback.hidden = false;
  if (button.dataset.choice === "clean") {
    feedback.className = "feedback good";
    feedback.textContent = "Richtig. delete[] passt zu new[]; Nullzeiger und Nullgrößen verhindern danach einen scheinbar noch gültigen, aber freigegebenen Zustand.";
    document.querySelector("#contracts").hidden = false;
    document.querySelector("#labStep").hidden = false;
  } else if (button.dataset.choice === "scalar") {
    feedback.className = "feedback try";
    feedback.textContent = "Blockiert: Mit new[] allokierter Speicher verlangt delete[]. delete ist hier die falsche Freigabeform und erzeugt undefiniertes Verhalten.";
  } else {
    feedback.className = "feedback try";
    feedback.textContent = "Blockiert: arr würde auf freigegebenen Speicher zeigen; size und capacity behaupteten weiter einen nutzbaren Vektor. Das sind dangling Attribute.";
  }
}));

function readState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; } }
function paintState(value) { document.querySelectorAll("[data-state]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.state === value))); }
document.querySelectorAll("[data-state]").forEach(button => button.addEventListener("click", () => {
  const state = readState();
  state[TASK_KEY] = button.dataset.state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  paintState(button.dataset.state);
  const feedback = document.querySelector("#stateFeedback");
  feedback.hidden = false; feedback.className = "feedback good"; feedback.textContent = `Gespeichert: ${button.dataset.state}.`;
}));

reset();
paintState(readState()[TASK_KEY]);
