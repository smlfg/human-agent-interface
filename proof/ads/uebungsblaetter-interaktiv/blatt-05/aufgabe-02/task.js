(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb05a02';
  const values = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];
  const $ = (selector) => document.querySelector(selector);
  let splitDone = false;
  let pathCorrect = false;
  let runtimeCorrect = false;

  function feedback(element, message, kind) { element.textContent = message; element.className = `feedback ${kind}`; element.hidden = false; }
  $('#source-array').innerHTML = values.map((value, index) => `<div class="cell ${index < 5 ? 'l' : 'r'}${index === 5 ? ' split' : ''}"><small>Index ${index}</small><strong>${value}</strong></div>`).join('');

  $('#split-button').addEventListener('click', () => {
    splitDone = true;
    feedback($('#split-feedback'), 'Geteilt. a und b kommen aus den Rekursionen. Beim Merge fehlt noch der Kandidat, der von L nach R reicht.', 'good');
    $('#merge-step').hidden = false;
  });
  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-path]').forEach((button) => button.addEventListener('click', () => {
    const out = $('#path-feedback');
    if (button.dataset.path === 'halves') { feedback(out, 'Blockiert: max(a,b) übersieht jede optimale Folge, die den Split kreuzt. Im Original wäre das Maximum dann 155 statt 187.', 'try'); return; }
    if (button.dataset.path === 'quadratic') { feedback(out, 'Blockiert: Alle Teilfolgen im Merge erneut zu testen kostet pro Ebene quadratisch. Für Θ(n log n) werden nur zwei lineare Randscans gebraucht.', 'try'); return; }
    pathCorrect = true; $('#cross-slot').textContent = 'x + y';
    feedback(out, 'Richtig: max(85, 32 + 155, 155) = 187. Nur die beiden am Split anliegenden Randsummen können gemeinsam eine gültige überkreuzende Folge bilden.', 'good');
    $('#lab-step').hidden = false; $('#runtime-step').hidden = false;
  }));
  $('#check-runtime').addEventListener('click', () => {
    runtimeCorrect = $('#runtime').value === 'nlogn';
    if (!runtimeCorrect) { feedback($('#runtime-feedback'), 'Pro Aufruf entstehen zwei halb so große Rekursionen. Die beiden Randsummen kosten zusammen linear: 2T(n/2) + Θ(n).', 'try'); return; }
    feedback($('#runtime-feedback'), 'Stimmt: Auf jeder Rekursionsebene insgesamt Θ(n) Merge-Arbeit, über Θ(log n) Ebenen also Θ(n log n).', 'good');
    $('#completion').hidden = false;
  });
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (!splitDone || !pathCorrect || !runtimeCorrect || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Split, Merge-Regel, Laufzeit und echter Testlauf gehören zusammen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
