(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb01a04';
  const values = [4, -2, 5, -3, 17];
  let index = 0;
  let minimum = Number.MAX_SAFE_INTEGER;
  let attempted = false;
  let startDone = false;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const render = () => {
    byId('minimum').textContent = minimum === Number.MAX_SAFE_INTEGER ? 'INT_MAX' : String(minimum);
    byId('candidate').textContent = index < values.length ? String(values[index]) : 'fertig';
  };
  const unlock = () => {
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Scan korrekt — übertrage jetzt dieselbe Invariante in das C++-Lab.';
  };

  byId('start-question').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return; attempted = true;
    if (button.dataset.answer === 'front') { feedback('start-feedback', 'Falscher Pfad: a[0] liest bei einem leeren Vektor außerhalb des gültigen Bereichs. Die Leerfall-Regel muss ohne Zugriff funktionieren.', 'try'); return; }
    if (button.dataset.answer === 'zero') { feedback('start-feedback', 'Falscher Pfad: Mit 0 als Startminimum liefert [4, 9] fälschlich 0, obwohl 0 gar nicht im Vektor steht.', 'try'); return; }
    feedback('start-feedback', 'Richtig: INT_MAX ist größer oder gleich jedem int. Bei leerem Vektor bleibt er unverändert; sonst kann der Scan ihn ersetzen.', 'good');
    startDone = true; show('scan-step'); render();
  });

  const decide = replace => {
    attempted = true; if (!startDone || index >= values.length) return;
    const candidate = values[index]; const shouldReplace = candidate < minimum;
    if (replace !== shouldReplace) { feedback('scan-feedback', shouldReplace ? `${candidate} ist kleiner als das bisherige Minimum: Es muss ersetzt werden.` : `${candidate} ist nicht kleiner: Das Minimum bleibt stehen.`, 'try'); return; }
    if (replace) minimum = candidate; index += 1; render();
    if (index === values.length) { feedback('scan-feedback', `Korrekt gescannt: Der kleinste Wert ist ${minimum}.`, 'good'); unlock(); }
    else feedback('scan-feedback', 'Richtig. Jetzt den nächsten Wert mit dem bisherigen Minimum vergleichen.', 'good');
  };
  byId('keep').addEventListener('click', () => decide(false));
  byId('replace').addEventListener('click', () => decide(true));
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempted = true; show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Codegerüst wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state)); feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
