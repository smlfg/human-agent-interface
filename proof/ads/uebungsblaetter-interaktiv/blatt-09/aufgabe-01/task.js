(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb09a01';
  const $ = (selector) => document.querySelector(selector);
  const rows = [
    { key: 125, start: 4, visits: [4], end: 4 },
    { key: 77, start: 0, visits: [0], end: 0 },
    { key: 65, start: 10, visits: [10], end: 10 },
    { key: 1001, start: 0, visits: [0, 1], end: 1 },
    { key: 23, start: 1, visits: [1, 2], end: 2 },
    { key: 14, start: 3, visits: [3], end: 3 }
  ];
  const table = Array(11).fill(null);
  let stage = 0;
  let attempted = false;

  function feedback(message, kind) {
    const output = $('#feedback');
    output.textContent = message;
    output.className = `feedback ${kind}`;
    output.hidden = false;
  }

  function renderTable(visits = []) {
    $('#table').innerHTML = table.map((value, index) => `<div class="slot ${value !== null ? 'filled' : ''} ${visits.includes(index) ? 'visited' : ''}" role="gridcell" aria-label="Index ${index}: ${value === null ? 'frei' : value}"><span class="slot-index">${index}</span><span class="slot-value">${value === null ? 'frei' : value}</span></div>`).join('');
  }

  function distractors(row) {
    if (row.visits.length > 1) {
      return [
        { value: `overwrite-${row.start}`, label: `Index ${row.start}: vorhandenen Eintrag überschreiben` },
        { value: `probe-${row.end}`, label: `Index ${row.end}, aber Start nicht mitzählen` },
        { value: String(row.end), label: `Index ${row.end}; Folge ${row.visits.join(' → ')}` }
      ];
    }
    const wrong = (row.end + 1) % 11;
    return [
      { value: String(wrong), label: `Index ${wrong}` },
      { value: `overwrite-${wrong}`, label: `Index ${wrong}, weil er als Nächstes kommt` },
      { value: String(row.end), label: `Index ${row.end}` }
    ];
  }

  function render() {
    const row = rows[stage];
    $('#progress').textContent = `Schlüssel ${stage + 1} / ${rows.length}`;
    $('#current-key').textContent = row.key;
    $('#hash-line').textContent = `h(${row.key}) = ${row.key} mod 11 = ${row.start}`;
    $('#prompt').textContent = `Wähle den Endplatz für ${row.key}.`;
    $('#choices').innerHTML = distractors(row).map(choice => `<button class="choice" type="button" data-answer="${choice.value}">${choice.label}</button>`).join('');
    $('#feedback').hidden = true;
    renderTable();
  }

  $('#choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (!button) return;
    attempted = true;
    const row = rows[stage];
    if (button.dataset.answer.startsWith('overwrite-')) {
      feedback(`Blockiert: Eine Kollision überschreibt keinen Schlüssel. ${table[row.start]} bleibt an Index ${row.start}; sondiere zum nächsten freien Platz weiter.`, 'try');
      renderTable(row.visits);
      return;
    }
    if (button.dataset.answer.startsWith('probe-')) {
      feedback(`Endplatz richtig, Zählung inkonsistent: Auch der Hash-Start ${row.start} wurde besucht. Die Folge ${row.visits.join(' → ')} hat ${row.visits.length} Sondierungen.`, 'try');
      renderTable(row.visits);
      return;
    }
    if (Number(button.dataset.answer) !== row.end) {
      feedback(`Noch nicht: Starte bei ${row.start}. Ist der Platz frei, stoppst du sofort; sonst gehst du genau einen Platz weiter.`, 'try');
      renderTable(row.visits);
      return;
    }
    table[row.end] = row.key;
    renderTable(row.visits);
    feedback(`${row.key} liegt an Index ${row.end}. Besuchsfolge: ${row.visits.join(' → ')} (${row.visits.length} ${row.visits.length === 1 ? 'Sondierung' : 'Sondierungen'}).`, 'good');
    stage += 1;
    if (stage < rows.length) window.setTimeout(render, 650);
    else window.setTimeout(() => showSolution(false), 500);
  });

  function showSolution(revealed) {
    rows.forEach(row => { table[row.end] = row.key; });
    renderTable();
    $('#choices').innerHTML = '';
    $('#current-key').textContent = '✓';
    $('#hash-line').textContent = 'Alle sechs Schlüssel sind eingefügt.';
    $('#prompt').textContent = 'Kontrolliere jetzt Belegung, Besuchsfolgen und Mittelwert.';
    $('#progress').textContent = '6 / 6 Schlüssel';
    $('#gate-note').textContent = revealed ? 'Bewusst aufgedeckt: Übertrage die Spur jetzt selbst auf Papier.' : 'Gate geöffnet: Alle sechs Endplätze wurden korrekt bestimmt.';
    $('#trace-body').innerHTML = rows.map(row => `<tr><td>${row.key}</td><td>${row.start}</td><td><code>${row.visits.join(' → ')}</code></td><td>${row.visits.length}</td><td>${row.end}</td></tr>`).join('');
    $('#solution').hidden = false;
    $('#completion').hidden = false;
    $('#solution').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $('#reveal').addEventListener('click', () => {
    if (!attempted && stage === 0) {
      feedback('Versuche zuerst mindestens einen Endplatz. Danach kannst du die Kontrollspur bewusst öffnen.', 'try');
      return;
    }
    showSolution(true);
  });

  document.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.hidden = !hint.hidden;
      button.setAttribute('aria-expanded', String(!hint.hidden));
    });
  });

  document.querySelectorAll('[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!$('#paper-proof').checked) {
        $('#state-feedback').textContent = 'Hake zuerst den Papiervergleich ab.';
        return;
      }
      let state = {};
      try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
      state[FIELD] = button.dataset.state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    });
  });

  render();
})();
