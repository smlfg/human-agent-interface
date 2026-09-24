"use strict";
const STORAGE_KEY = "ads-uebungsblaetter-state-v1";
const TASK_KEY = "pb02a07";
const form = document.querySelector("#experiment");

function parseSequence() {
  const parts = document.querySelector("#sequence").value.split(",").map(value => value.trim()).filter(Boolean);
  if (parts.length < 2 || parts.length > 8) throw new Error("Nutze 2 bis 8 kommagetrennte Zahlen.");
  const values = parts.map(Number);
  if (!values.every(Number.isFinite)) throw new Error("Alle Werte müssen endliche double-Zahlen sein; Infinity und NaN zählen nicht.");
  return values;
}
function format(value){ return value === 0 ? "0" : value.toExponential(6); }
function trace(values) {
  let sum = 0;
  return values.map((value,index) => {
    const before = sum;
    sum += value;
    if (!Number.isFinite(sum)) throw new Error("Eine Zwischensumme ist nicht endlich. Verkleinere die Werte: Overflow/NaN ist kein Nachweis.");
    const absorbed = value !== 0 && (sum === before || (before !== 0 && sum === value));
    return {index:index+1,before,value,after:sum,absorbed};
  });
}
function renderTrace(target, steps) {
  target.replaceChildren(...steps.map(step => {
    const row=document.createElement("div"); row.className=`trace-step${step.absorbed ? " absorbed" : ""}`;
    const n=document.createElement("b"); n.textContent=String(step.index);
    const calc=document.createElement("code"); calc.textContent=`${format(step.before)} + ${format(step.value)} → ${format(step.after)}`;
    const badge=document.createElement("span"); badge.className="badge"; badge.textContent=step.absorbed ? "ABSORBIERT" : "verändert";
    row.append(n,calc,badge); return row;
  }));
}
function runExperiment(event) {
  if(event) event.preventDefault();
  const feedback=document.querySelector("#experimentFeedback"), difference=document.querySelector("#difference");
  try {
    const values=parseSequence(), forward=trace(values), reverse=trace([...values].reverse());
    const a=forward.at(-1).after,b=reverse.at(-1).after,error=Math.abs(a-b);
    renderTrace(document.querySelector("#forwardTrace"),forward); renderTrace(document.querySelector("#reverseTrace"),reverse);
    document.querySelector("#forwardResult").textContent=`Ergebnis: ${format(a)}`; document.querySelector("#reverseResult").textContent=`Ergebnis: ${format(b)}`;
    const biggest=Math.max(...values.map(Math.abs)); const exponent=biggest===0 ? 0 : Math.log10(biggest); document.querySelector("#magnitudeMarker").style.left=`${Math.max(0,Math.min(100,(exponent+324)/632*100))}%`;
    difference.className=`difference${error>=1 ? " success" : ""}`; difference.textContent=`|vorwärts − rückwärts| = ${format(error)}${error>=1 ? "  ✓ Ziel erreicht" : "  · noch kleiner als 1"}`;
    feedback.className="feedback good"; feedback.textContent="Beobachte den orange markierten Schritt: Hat ein Summand den Akkumulator überhaupt verändert?";
  } catch(error) { feedback.className="feedback try"; feedback.textContent=`Blockiert: ${error.message}`; difference.className="difference invalid"; difference.textContent="Kein gültiger Nachweis."; }
}
form.addEventListener("submit",runExperiment);
document.querySelectorAll("[data-hint]").forEach(button=>button.addEventListener("click",()=>{const hint=document.getElementById(button.dataset.hint);hint.hidden=!hint.hidden;}));
document.querySelectorAll("[data-choice]").forEach(button=>button.addEventListener("click",()=>{const gate=document.querySelector("#gateFeedback");gate.hidden=false;if(button.dataset.choice==="round"){gate.className="feedback good";gate.textContent="Richtig: So isolierst du Rundung und Reihenfolge als Ursache.";document.querySelector("#contract").hidden=false;document.querySelector("#labStep").hidden=false;}else if(button.dataset.choice==="real"){gate.className="feedback try";gate.textContent="Blockiert: Die reelle Addition rundet nicht nach jedem Schritt. Genau diese Übertragung soll das Experiment widerlegen.";}else{gate.className="feedback try";gate.textContent="Blockiert: NaN ist mit nichts gleich und entsteht hier durch einen verlassenen Wertebereich; das weist keine endliche Rundungsabweichung ≥ 1 nach.";}}));
function readState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");}catch{return {};}}
function paint(value){document.querySelectorAll("[data-state]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.state===value)));}
document.querySelectorAll("[data-state]").forEach(button=>button.addEventListener("click",()=>{const state=readState();state[TASK_KEY]=button.dataset.state;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));paint(button.dataset.state);const note=document.querySelector("#stateFeedback");note.hidden=false;note.className="feedback good";note.textContent=`Gespeichert: ${button.dataset.state}.`;}));
paint(readState()[TASK_KEY]); runExperiment();
