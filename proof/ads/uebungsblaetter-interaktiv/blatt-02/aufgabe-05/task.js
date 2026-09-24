(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb02a05';
  const states = [{d:3,x:4},{d:5,x:9},{d:7,x:16}];
  let traceIndex = 0;
  let attempted = false;
  let solvedTrace = false;
  let solvedFunction = false;
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const attempt = () => { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Löse das Gate weiter oder vergleiche bewusst mit dem Papierweg.'; };

  function renderChoices() {
    const next = states[traceIndex];
    byId('trace-choices').innerHTML = `<button class="choice trace-choice" data-d="${next.d}" data-x="${next.x}">d=${next.d}, x=${next.x}</button><button class="choice trace-choice" data-wrong="old">d=${next.d}, x=${next.x - 2}</button><button class="choice trace-choice" data-wrong="stop">jetzt schon stoppen</button>`;
  }
  function unlock() {
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Gate geöffnet: Trace und Funktionszuordnung stimmen. Vergleiche jetzt den vollständigen Papierweg.';
  }

  document.querySelectorAll('.first-choice').forEach(button => button.addEventListener('click', () => {
    attempt();
    if (button.dataset.path === 'old-d') { feedback('first-feedback', 'Blockiert: x += d steht nach d += 2. x wird deshalb mit dem neuen d=3 erhöht: 1+3=4, nicht 1+1=2.', 'try'); return; }
    if (button.dataset.path === 'late-check') { feedback('first-feedback', 'Blockiert: Die while-Bedingung wird am Schleifenkopf vor dem Rumpf geprüft. Erst danach ändern die beiden Anweisungen d und x.', 'try'); return; }
    feedback('first-feedback', 'Richtig: Aus (d,x)=(1,1) wird zuerst d=3 und dann x=1+3=4.', 'good'); show('trace-step'); renderChoices();
  }));

  byId('trace-choices').addEventListener('click', event => {
    const button = event.target.closest('.trace-choice'); if (!button) return; attempt();
    if (button.dataset.wrong === 'old') { feedback('trace-feedback', 'Falsche Reihenfolge: Für x gilt bereits der um 2 erhöhte d-Wert. Rechne d neu und addiere genau diesen Wert.', 'try'); return; }
    if (button.dataset.wrong === 'stop') { feedback('trace-feedback', 'Die Bedingung gehört an den Schleifenkopf. Solange das aktuelle x≤10 ist, wird der ganze nächste Rumpf noch ausgeführt.', 'try'); return; }
    const current = states[traceIndex];
    byId('trace').insertAdjacentHTML('beforeend', `<div class="trace-row new"><span>${traceIndex + 1}</span><strong>${current.d}</strong><strong>${current.x}</strong></div>`);
    traceIndex += 1;
    if (traceIndex < states.length) { feedback('trace-feedback', `Korrekt. Am nächsten Schleifenkopf ist x=${current.x}≤10.`, 'good'); renderChoices(); return; }
    solvedTrace = true; byId('trace-choices').innerHTML = '';
    feedback('trace-feedback', 'Jetzt ist x=16>10: Ende. return (7−1)/2 = 3.', 'good'); show('function-step');
  });

  document.querySelectorAll('.function-choice').forEach(button => button.addEventListener('click', () => {
    attempt();
    if (button.dataset.answer === 'ceil') { feedback('function-feedback', 'Teste n=10: ⌈√10⌉=4, der Trace liefert aber 3. Die Funktion bleibt unterhalb der nächsten Quadratgrenze.', 'try'); return; }
    if (button.dataset.answer === 'odd') { feedback('function-feedback', 'Das wären ungefähr n/2 Schritte. Hier springt x über aufeinanderfolgende Quadrate; bei n=17 sind es nur 4 Durchläufe.', 'try'); return; }
    solvedFunction = true; feedback('function-feedback', 'Richtig: k wird so gewählt, dass k²≤n<(k+1)². Also k=⌊√n⌋.', 'good');
    if (solvedTrace && solvedFunction) unlock();
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempt(); const hint = byId(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
