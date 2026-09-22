(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb05a01';
  const values = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];
  const target = [2, 3, 4, 5, 6];
  const $ = (selector) => document.querySelector(selector);
  let tracePosition = 0;
  let pathCorrect = false;
  let runtimeCorrect = false;

  function feedback(element, message, kind) { element.textContent = message; element.className = `feedback ${kind}`; element.hidden = false; }
  function render() {
    $('#source-array').innerHTML = values.map((value, index) => `<button type="button" class="cell${target.slice(0, tracePosition).includes(index) ? ' selected' : ''}${target[tracePosition] === index ? ' next' : ''}" data-index="${index}"><small>Index ${index}</small><strong>${value}</strong></button>`).join('');
    const picked = target.slice(0, tracePosition);
    $('#running-sum').textContent = picked.reduce((sum, index) => sum + values[index], 0);
    $('#range-label').textContent = picked.length ? `${picked[0]}..${picked[picked.length - 1]}` : 'noch keine';
  }
  render();

  $('#source-array').addEventListener('click', (event) => {
    const button = event.target.closest('[data-index]'); if (!button) return;
    const index = Number(button.dataset.index);
    if (index !== target[tracePosition]) {
      const message = tracePosition === 0 ? 'Falscher Start: Für den Originaltrace beginnt die beste Folge bei Index 2.' : 'Blockiert: Eine Teilfolge ist zusammenhängend. Klicke genau den nächsten Index rechts neben deiner Auswahl.';
      feedback($('#trace-feedback'), message, 'try'); return;
    }
    tracePosition += 1; render();
    if (tracePosition < target.length) { feedback($('#trace-feedback'), `Weiter: Die Zwischensumme ist ${$('#running-sum').textContent}. Ein negatives Element beendet die Folge nicht automatisch.`, 'good'); return; }
    feedback($('#trace-feedback'), 'Trace komplett: Index 2..6 ergibt 187. Jetzt vergleiche erneutes Summieren mit Wiederverwendung.', 'good');
    $('#loops-step').hidden = false;
  });
  $('#reset-trace').addEventListener('click', () => { tracePosition = 0; render(); $('#trace-feedback').hidden = true; });
  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-path]').forEach((button) => button.addEventListener('click', () => {
    const out = $('#path-feedback');
    if (button.dataset.path === 'empty') { feedback(out, 'Blockiert: Die Aufgabenfolge ist nichtleer. Bei ausschließlich negativen Zahlen wäre 0 die Summe der ungeklärten leeren Folge statt eines gültigen Ergebnisses.', 'try'); return; }
    if (button.dataset.path === 'resum') { feedback(out, 'Noch Θ(n³): Wenn für jedes Paar (i,j) wieder von i bis j summiert wird, bleibt die dritte Arbeitsschleife erhalten — auch mit anderem Namen.', 'try'); return; }
    pathCorrect = true; feedback(out, 'Richtig: Für festes i wächst j nach rechts und übernimmt die vorige Summe. Damit entfallen die Θ(n) Additionen pro (i,j).', 'good');
    $('#lab-step').hidden = false; $('#runtime-step').hidden = false;
  }));
  $('#check-runtime').addEventListener('click', () => {
    runtimeCorrect = $('#naive-runtime').value === 'n3' && $('#reuse-runtime').value === 'n2';
    if (!runtimeCorrect) { feedback($('#runtime-feedback'), 'Zähle die Arbeit: Θ(n²) Paare (i,j). Naiv kostet jede Summe zusätzlich Θ(n); mit Wiederverwendung nur Θ(1).', 'try'); return; }
    feedback($('#runtime-feedback'), 'Stimmt: naiv Θ(n³), mit wiederverwendeter laufender Summe Θ(n²).', 'good'); $('#completion').hidden = false;
  });
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (tracePosition !== target.length || !pathCorrect || !runtimeCorrect || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Trace, Verbesserungsweg, Laufzeiten und echter 10/10-Testlauf gehören zusammen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
