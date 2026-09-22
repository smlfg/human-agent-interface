(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb05a04';
  const sequence = [13, 6, 3, 1, 0];
  const options = [6, 12, 3, 2, 1, 0];
  const $ = (selector) => document.querySelector(selector);
  let position = 1;
  let pathCorrect = false;
  let runtimeCorrect = false;

  function feedback(element, message, kind) { element.textContent = message; element.className = `feedback ${kind}`; element.hidden = false; }
  function render() {
    $('#path-label').textContent = sequence.slice(0, position).join(' → ');
    $('#next-label').textContent = sequence[position] ?? 'fertig';
    $('#exponent-path').innerHTML = options.map((value) => `<button type="button" data-exp="${value}" class="${sequence.slice(1, position).includes(value) ? 'done' : ''}${sequence[position] === value ? ' expected' : ''}">p = ${value}</button>`).join('');
  }
  render();
  $('#exponent-path').addEventListener('click', (event) => {
    const button = event.target.closest('[data-exp]'); if (!button || position >= sequence.length) return;
    const picked = Number(button.dataset.exp);
    if (picked !== sequence[position]) { feedback($('#path-feedback'), `Blockiert: power_b ruft das Teilproblem mit ganzzahligem p / 2 auf. ${sequence[position - 1]} / 2 führt zu ${sequence[position]}, nicht zu ${picked}.`, 'try'); return; }
    position += 1; render();
    if (position < sequence.length) { feedback($('#path-feedback'), 'Richtig. Das Halbresultat dieses Aufrufs wird später genau einmal gespeichert und dann quadriert.', 'good'); return; }
    pathCorrect = true; feedback($('#path-feedback'), 'Basisfall erreicht: p = 0 liefert 1. Jetzt entscheide, welcher Codepfad die Teilrechnung nicht verdoppelt.', 'good'); $('#compare-step').hidden = false;
  });
  $('#reset-path').addEventListener('click', () => { position = 1; pathCorrect = false; render(); $('#path-feedback').hidden = true; $('#compare-step').hidden = true; $('#lab-step').hidden = true; $('#gate-step').hidden = true; $('#completion').hidden = true; });
  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-path]').forEach((button) => button.addEventListener('click', () => {
    const out = $('#choice-feedback');
    if (button.dataset.path === 'zero') { feedback(out, 'Blockiert: Das leere Produkt ist 1. Sonst wären n⁰ und damit jeder darauf aufbauende Rekursionspfad falsch.', 'try'); return; }
    if (button.dataset.path === 'twice') { feedback(out, 'Blockiert: Zwei identische Rekursionsaufrufe erzeugen T(p)=2T(p/2)+O(1)=Θ(p). Der halbierte Exponent allein garantiert noch kein Θ(log p).', 'try'); return; }
    feedback(out, 'Richtig: Ein Rekursionsaufruf pro Ebene. Danach wird dasselbe gespeicherte BigInt zweimal verwendet.', 'good'); $('#lab-step').hidden = false; $('#gate-step').hidden = false;
  }));
  $('#check-runtime').addEventListener('click', () => {
    runtimeCorrect = $('#runtime-a').value === 'linear' && $('#runtime-b').value === 'log';
    if (!runtimeCorrect) { feedback($('#runtime-feedback'), 'Zähle Multiplikationen: power_a senkt p um 1; power_b halbiert p und berechnet das Halbproblem nur einmal.', 'try'); return; }
    feedback($('#runtime-feedback'), 'Stimmt: power_a braucht Θ(p), power_b mit Zwischenspeicher Θ(log p) Multiplikationen.', 'good'); $('#completion').hidden = false;
  });
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (!pathCorrect || !runtimeCorrect || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Rekursionspfad, richtiger Cache-Weg, Laufzeit-Gate und echter Testlauf gehören zusammen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
