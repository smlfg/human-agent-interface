"use strict";

const STORAGE_KEY = "ads-uebungsblaetter-state-v1";
const TASK_KEY = "pb01a02";
let values = [];
let cursor = 0;
let minimum;

function parseValues() {
  const raw = document.querySelector("#numbers").value.trim();
  if (!raw) return [];
  const tokens = raw.split(/\s+/);
  if (tokens.some(token => !/^[+-]?\d+$/.test(token))) return null;
  return tokens.map(Number);
}

function resetScan() {
  values = parseValues();
  cursor = 0;
  minimum = undefined;
  const strip = document.querySelector("#scanStrip");
  const feedback = document.querySelector("#scanFeedback");
  document.querySelector("#runningMin").textContent = "–";
  if (values === null || values.length === 0) {
    strip.innerHTML = "";
    feedback.className = "feedback try";
    feedback.textContent = values === null ? "Nur ganze Zahlen eingeben." : "Der Vektor braucht für diese Aufgabe mindestens einen Wert.";
    return;
  }
  strip.innerHTML = values.map((value, index) => `<span data-index="${index}">${value}</span>`).join("");
  feedback.className = "feedback";
  feedback.textContent = "Bereit. Die erste gelesene Zahl wird dein erster gültiger Kandidat.";
}

document.querySelector("#resetScan").addEventListener("click", resetScan);
document.querySelector("#numbers").addEventListener("change", resetScan);
document.querySelector("#scanNext").addEventListener("click", () => {
  if (!Array.isArray(values) || values.length === 0) return;
  if (cursor >= values.length) {
    document.querySelector("#scanFeedback").textContent = `Fertig: Das Minimum der Datei ist ${minimum}.`;
    return;
  }
  document.querySelectorAll("#scanStrip span").forEach((cell, index) => {
    cell.className = index < cursor ? "done" : index === cursor ? "current" : "";
  });
  const candidate = values[cursor];
  const previous = minimum;
  minimum = previous === undefined ? candidate : Math.min(previous, candidate);
  document.querySelector("#runningMin").textContent = String(minimum);
  const feedback = document.querySelector("#scanFeedback");
  feedback.className = "feedback good";
  feedback.textContent = previous === undefined
    ? `${candidate} stammt wirklich aus dem Vektor: gültiger Start.`
    : `${candidate} ${candidate < previous ? "ist kleiner und ersetzt" : "ist nicht kleiner als"} ${previous}.`;
  cursor += 1;
  if (cursor === values.length) document.querySelectorAll("#scanStrip span").forEach(cell => cell.classList.add("done"));
});

document.querySelectorAll("[data-hint]").forEach(button => button.addEventListener("click", () => {
  const hint = document.getElementById(button.dataset.hint);
  hint.hidden = !hint.hidden;
}));

document.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
  const feedback = document.querySelector("#gateFeedback");
  feedback.hidden = false;
  if (button.dataset.choice === "first") {
    feedback.className = "feedback good";
    feedback.textContent = "Tragfähig. Bei positiven wie negativen Dateien beginnt der Vergleich mit einem echten Element. Das Lab ist entsperrt.";
    document.querySelector("#labStep").hidden = false;
  } else if (button.dataset.choice === "zero") {
    feedback.className = "feedback try";
    feedback.textContent = "Blockiert: Bei 7, 4, 9 würdest du fälschlich 0 ausgeben, obwohl 0 nie in der Datei stand.";
  } else {
    feedback.className = "feedback try";
    feedback.textContent = "Blockiert: Der Dateiname wählt nur die Quelle. Erst read_ints liefert vergleichbare int-Werte.";
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
  feedback.hidden = false;
  feedback.className = "feedback good";
  feedback.textContent = `Gespeichert: ${button.dataset.state}.`;
}));

resetScan();
paintState(readState()[TASK_KEY]);
