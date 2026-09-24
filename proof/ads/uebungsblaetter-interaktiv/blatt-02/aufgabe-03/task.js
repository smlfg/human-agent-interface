"use strict";
const STORAGE_KEY = "ads-uebungsblaetter-state-v1";
const TASK_KEY = "pb02a03";
const form = document.querySelector("#workbench");
const feedback = document.querySelector("#workFeedback");
const output = document.querySelector("#tableOutput");

function number(id) { return Number(document.getElementById(id).value); }
function renderTable(start, step, base, perline, count) {
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const x = start + i * step;
    if (x <= 0) throw new Error(`x = ${x} ist nicht positiv; log(x) ist reell nicht definiert.`);
    const entry = `${x.toFixed(1).padStart(6)}: ${(Math.log(x) / Math.log(base)).toFixed(4)}`;
    if (i % perline === 0) rows.push([]);
    rows.at(-1).push(entry);
  }
  return rows.map(row => row.join("    ")).join("\n");
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const start = number("start"), step = number("step"), base = number("base");
  const perline = number("perline"), count = number("count");
  if (![start, step, base, perline, count].every(Number.isFinite)) { feedback.className = "feedback try"; feedback.textContent = "Blockiert: Alle fünf Eingaben müssen Zahlen sein."; return; }
  if (base <= 0 || base === 1) { feedback.className = "feedback try"; feedback.textContent = "Blockiert: Eine Logarithmusbasis muss positiv und ungleich 1 sein; ln(base) wäre sonst ungültig oder 0."; output.textContent = ""; return; }
  if (!Number.isInteger(perline) || perline <= 0 || !Number.isInteger(count) || count <= 0) { feedback.className = "feedback try"; feedback.textContent = "Blockiert: pro Zeile und Anzahl müssen positive ganze Zahlen sein."; output.textContent = ""; return; }
  try { output.textContent = `log table: base=${base}, start=${start}, step=${step}: ${count} elements\n${renderTable(start, step, base, perline, count)}`; feedback.className = "feedback good"; feedback.textContent = `Basiswechsel aktiv: ln(x) / ln(${base}). Prüfe x = ${start + step}.`; }
  catch (error) { output.textContent = ""; feedback.className = "feedback try"; feedback.textContent = `Blockiert: ${error.message}`; }
});
document.querySelectorAll("[data-hint]").forEach(button => button.addEventListener("click", () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; }));
document.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
  const gate = document.querySelector("#gateFeedback"); gate.hidden = false;
  if (button.dataset.choice === "change") { gate.className = "feedback good"; gate.textContent = "Richtig: Beide Logarithmen haben dieselbe natürliche Basis; ihr Quotient wechselt zu base."; document.querySelector("#contract").hidden = false; document.querySelector("#labStep").hidden = false; }
  else if (button.dataset.choice === "divide") { gate.className = "feedback try"; gate.textContent = "Blockiert: Durch base zu teilen skaliert nur ln(x). Der Basiswechsel verlangt ln(base) im Nenner."; }
  else { gate.className = "feedback try"; gate.textContent = "Blockiert: ln(1) = 0; Division durch 0 liefert keinen Logarithmus zur Basis 1."; }
}));
function readState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; } }
function paint(value) { document.querySelectorAll("[data-state]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.state === value))); }
document.querySelectorAll("[data-state]").forEach(button => button.addEventListener("click", () => { const state = readState(); state[TASK_KEY] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); paint(button.dataset.state); const note = document.querySelector("#stateFeedback"); note.hidden = false; note.className = "feedback good"; note.textContent = `Gespeichert: ${button.dataset.state}.`; }));
paint(readState()[TASK_KEY]); form.requestSubmit();
