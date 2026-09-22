(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb04a02';
  const values = [-2, 1, -3, -2, 2, 1];
  const min = -3;
  const counts = Array(6).fill(0);
  let cursor = 0;
  let attempted = false;
  let traceDone = false;
  let writeDone = false;
  let complexityDone = false;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const markAttempt = () => { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Schließe Trace, Rückgabe und Laufzeit ab oder vergleiche bewusst mit dem Musterweg.'; };
  const renderTrace = () => {
    byId('input-strip').innerHTML = values.map((value, index) => `<span class="${index < cursor ? 'done' : index === cursor ? 'current' : ''}">${value}</span>`).join('');
    byId('counter-row').innerHTML = `<th>Anzahl</th>${counts.map(count => `<td>${count}</td>`).join('')}`;
    byId('counter-buttons').innerHTML = counts.map((_, index) => `<button type="button" data-index="${index}">Spalte ${index}</button>`).join('');
  };
  const maybeComplete = () => {
    if (!(traceDone && writeDone && complexityDone)) return;
    show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Trace, Rückgabe und Laufzeit geschafft — hier ist dein Papierabschluss und das Starter-Lab.';
  };

  byId('offset-question').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt();
    if (button.dataset.answer === 'direct') { feedback('offset-feedback', 'Falscher Pfad: Einen Wert direkt als Arrayindex zu verwenden scheitert bei −2. Verschiebe den Wertebereich mit value − min auf 0…k−1.', 'try'); return; }
    if (button.dataset.answer === 'zero') { feedback('offset-feedback', 'Index 0 gehört dem kleinsten Wert −3. Für −2 gehst du eine Spalte weiter.', 'try'); return; }
    feedback('offset-feedback', 'Richtig: −2 − (−3) = 1. So funktionieren auch negative Zahlen.', 'good'); renderTrace(); show('trace-step');
  });

  byId('counter-buttons').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button || traceDone) return;
    markAttempt();
    const chosen = Number(button.dataset.index); const expected = values[cursor] - min;
    if (chosen !== expected) { feedback('trace-feedback', `Noch nicht: ${values[cursor]} − (${min}) ist nicht ${chosen}. Rechne value − min.`, 'try'); return; }
    counts[chosen] += 1; byId('offset-equation').textContent = `${values[cursor]} − (${min}) = ${chosen} → Zähler ${chosen} erhöhen`;
    cursor += 1;
    if (cursor === values.length) { traceDone = true; renderTrace(); feedback('trace-feedback', 'Tabelle fertig: [1, 2, 0, 0, 2, 1]. Jetzt werden Werte, nicht Indizes, zurückgeschrieben.', 'good'); show('write-step'); return; }
    renderTrace(); feedback('trace-feedback', 'Korrekte Spalte. Nächster Wert ist markiert.', 'good');
  });

  document.querySelectorAll('.write-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'indices') { feedback('write-feedback', 'Falscher Pfad: Die Zählerindizes sind nicht die Originalwerte. Zurück gilt value = index + min; Index 0 steht für −3.', 'try'); return; }
    if (button.dataset.answer === 'skip') { feedback('write-feedback', 'Jeder Wert muss so oft geschrieben werden, wie sein Zähler angibt. Die beiden −2 und beiden 1 dürfen nicht zusammenfallen.', 'try'); return; }
    feedback('write-feedback', 'Korrekt: −3, −2, −2, 1, 1, 2. Null-Zähler erzeugen keinen Ausgabewert.', 'good'); writeDone = true; show('complexity-step'); maybeComplete();
  }));

  document.querySelectorAll('.complexity-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'linear') { feedback('complexity-feedback', 'Falscher Pfad: Nur O(n) vergisst min/max und den vollständigen Zählerbereich. Bei 3 Werten über Milliarden möglicher Werte dominiert k.', 'try'); return; }
    if (button.dataset.answer === 'quadratic') { feedback('complexity-feedback', 'Nacheinander ausgeführte Schleifen werden addiert, nicht multipliziert: n + k statt n·k.', 'try'); return; }
    feedback('complexity-feedback', 'Genau: Initialisieren und Ablaufen kosten Θ(k), Zählen und Zurückschreiben Θ(n). Zusammen Θ(n+k).', 'good'); complexityDone = true; maybeComplete();
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du den Musterweg wirklich aufdecken?')) return; show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
