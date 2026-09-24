(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb07a02';
  const $ = (selector) => document.querySelector(selector);
  let queue = [], removed = [], rotations = 0, round = 1, gateDone = false, solved = false;

  function settings() {
    return {n: Math.max(1, Math.min(20, Number($('#n').value) || 1)), k: Math.max(1, Math.min(20, Number($('#k').value) || 1))};
  }
  function needed() { return settings().k - 1; }
  function render(message) {
    const {n} = settings();
    $('#queue').innerHTML = queue.map(value => `<span>${value}</span>`).join('');
    $('#circle').innerHTML = queue.map((value, index) => {
      const angle = (2 * Math.PI * index / queue.length) - Math.PI / 2;
      const left = 50 + 40 * Math.cos(angle), top = 50 + 40 * Math.sin(angle);
      return `<span class="child ${index === 0 ? 'front' : ''}" style="left:${left}%;top:${top}%">${value}</span>`;
    }).join('');
    $('#circle').setAttribute('aria-label', `${queue.length} von ${n} Kindern übrig; vorn steht ${queue[0]}`);
    $('#history').textContent = `Ausgeschieden: ${removed.length ? removed.join(' → ') : '–'}`;
    if (message) $('#event').textContent = message;
    const finished = queue.length === 1;
    $('#rotate').disabled = finished;
    $('#remove').disabled = finished;
    $('#round').disabled = finished;
    if (finished) {
      solved = settings().n === 7 && settings().k === 3 && queue[0] === 3;
      $('#event').textContent = `Gewinner: Kind ${queue[0]}.`;
      if (gateDone && solved) $('#completion').hidden = false;
    }
  }
  function reset() {
    const {n, k} = settings();
    $('#n').value = n; $('#k').value = k;
    queue = Array.from({length: n}, (_, index) => index); removed = []; rotations = 0; round = 1; solved = false;
    $('#completion').hidden = true;
    render(`Runde 1: Noch ${k - 1} Rotation${k === 2 ? '' : 'en'}, dann entfernen.`);
  }
  function rotate() {
    if (queue.length < 2) return;
    if (rotations >= needed()) {
      render(`Stopp: ${needed()} Rotationen sind erreicht. Jetzt muss Kind ${queue[0]} ausscheiden.`); return;
    }
    const child = queue.shift(); queue.push(child); rotations++;
    render(`Silbe ${rotations}: Kind ${child} wandert nach hinten. Noch ${needed() - rotations} Rotation(en).`);
  }
  function remove() {
    if (queue.length < 2) return;
    if (rotations !== needed()) {
      render(`Noch gesperrt: Erst genau ${needed() - rotations} weitere Rotation(en), dann bekommt das vorderste Kind die k-te Silbe.`); return;
    }
    const child = queue.shift(); removed.push(child); round++; rotations = 0;
    render(`Kind ${child} scheidet aus. Runde ${round}: ${needed()} Rotation(en), dann entfernen.`);
  }
  function playRound() { while (rotations < needed()) rotate(); remove(); }

  $('#rotate').addEventListener('click', rotate); $('#remove').addEventListener('click', remove); $('#round').addEventListener('click', playRound);
  $('#reset').addEventListener('click', reset); $('#n').addEventListener('change', reset); $('#k').addEventListener('change', reset);
  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => {
    const feedback = $('#gate-feedback'); feedback.hidden = false;
    if (button.dataset.path === 'extra') { feedback.className = 'feedback try'; feedback.textContent = 'Blockiert (off-by-one): Nach k Rotationen hast du die k-te Silbe bereits übersprungen; das zusätzliche Entfernen trifft das nächste Kind.'; return; }
    if (button.dataset.path === 'one') { feedback.className = 'feedback try'; feedback.textContent = 'Blockiert: Die geforderte Rückgabe nummeriert Kinder von 0 bis n−1. Eine 1-basierte Queue verschiebt jeden Ergebniswert.'; return; }
    gateDone = true; feedback.className = 'feedback good'; feedback.textContent = 'Richtig: k−1 Kinder werden hinten angestellt; das danach vorderste Kind scheidet aus.'; $('#lab-step').hidden = false; if (solved) $('#completion').hidden = false;
  }));
  document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => {
    if (!gateDone || !solved || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Gate, Simulation 7/3 und bestätigter lokaler Testlauf fehlen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
  reset();
})();
