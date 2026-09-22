(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb01a01';
  const $ = (selector) => document.querySelector(selector);
  let a = 0;
  let x = 17;
  let eps = 1e-6;
  let iteration = 0;
  let traceComplete = false;
  let correctPath = false;

  const fmt = (value) => Number(value).toPrecision(9);
  function setFeedback(message, kind) {
    const out = $('#path-feedback');
    out.textContent = message;
    out.className = `feedback ${kind}`;
    out.hidden = false;
  }
  function addRow(current, next, delta, stopping) {
    const row = document.createElement('tr');
    [iteration, fmt(current), fmt(next), fmt(delta), stopping ? 'STOP' : 'weiter'].forEach((value) => {
      const cell = document.createElement('td'); cell.textContent = value; row.appendChild(cell);
    });
    $('#trace-body').appendChild(row);
  }
  function step() {
    const next = (a + x / a) / 2;
    const delta = Math.abs(next - a);
    const stopping = delta < eps;
    addRow(a, next, delta, stopping);
    if (stopping) {
      traceComplete = true;
      $('#next-step').disabled = true;
      $('#trace-status').textContent = `Fertig nach ${iteration + 1} Iterationen: √${x} ≈ ${fmt(next)}; Änderung ${fmt(delta)} < ε.`;
      $('#stop-check').hidden = false;
      return;
    }
    a = next; iteration += 1;
    $('#trace-status').textContent = `Iteration ${iteration}: noch nicht stoppen; die Änderung ist ≥ ε.`;
  }
  $('#start-trace').addEventListener('click', () => {
    x = Number($('#x-input').value); eps = Number($('#eps-input').value);
    if (!(x > 0) || !(eps > 0)) { $('#trace-status').textContent = 'Bitte x > 0 und ε > 0 eingeben.'; return; }
    a = (1 + x) / 2; iteration = 0; traceComplete = false;
    $('#trace-body').textContent = ''; $('#next-step').disabled = false;
    $('#trace-status').textContent = `Start: a₀ = (1 + ${x}) / 2 = ${fmt(a)}.`;
    step();
  });
  $('#next-step').addEventListener('click', step);
  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => {
    const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden;
    button.setAttribute('aria-expanded', String(!hint.hidden));
  }));
  document.querySelectorAll('[data-path]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.path === 'exact') { setFeedback('Blockiert: Auf exakte Gleichheit von Gleitkommazahlen zu warten ignoriert das geforderte ε und kann unnötig lange oder nie terminieren.', 'try'); return; }
    if (button.dataset.path === 'integer') { setFeedback('Blockiert: Integerdivision schneidet Nachkommastellen ab. Damit verliert die Näherungsfolge genau die Präzision, die sie verbessern soll.', 'try'); return; }
    correctPath = true;
    setFeedback('Richtig: next berechnen, |next − a| mit ε vergleichen und nur bei Bedarf next zur neuen Näherung machen.', 'good');
    $('#lab-step').hidden = false; $('#completion').hidden = false;
  }));
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (!traceComplete || !correctPath || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Trace abschließen, ε-Pfad wählen und echten 7/7-Testlauf bestätigen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
