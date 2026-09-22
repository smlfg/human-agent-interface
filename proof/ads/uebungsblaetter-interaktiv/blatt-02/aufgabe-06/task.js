(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb02a06';
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  let attempted = false;
  let finishedNestedTrace = false;
  let patternSolved = false;
  let trace = null;

  const attempt = () => {
    attempted = true;
    byId('gate-copy').textContent = 'Dein Versuch zählt. Beende Gate und Hypothese oder vergleiche bewusst mit dem Abschluss.';
  };

  function mc91Steps(start) {
    const steps = [`f(${start})`];
    const evaluate = value => {
      if (value > 100) return value - 10;
      steps.push(`f(${value}) = f(f(${value + 11}))`);
      const inner = evaluate(value + 11);
      steps.push(`inneres Ergebnis ${inner} → äußerer Aufruf f(${inner})`);
      return evaluate(inner);
    };
    const result = evaluate(start);
    steps.push(`= ${result}`);
    return { steps, usedNesting: start <= 100 };
  }

  function renderNext() {
    const list = byId('call-trace');
    if (!trace || trace.index >= trace.steps.length) return;
    const item = document.createElement('li');
    item.textContent = trace.steps[trace.index++];
    list.appendChild(item);
    if (trace.index === trace.steps.length) {
      byId('trace-next').disabled = true;
      if (trace.usedNesting) {
        finishedNestedTrace = true;
        feedback('trace-feedback', 'Trace beendet. Jetzt leite aus mehreren Startwerten die Grenze der einfacheren Definition ab.', 'good');
        show('pattern-step');
      } else {
        feedback('trace-feedback', 'Dieser Wert nimmt sofort den Basisfall. Starte zusätzlich einen Trace mit x≤100, damit du die Verschachtelung siehst.', 'try');
      }
    }
  }

  function unlock() {
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Gate geöffnet: verschachtelter Trace und Grenzwert-Hypothese stimmen.';
  }

  document.querySelectorAll('.first-choice').forEach(button => button.addEventListener('click', () => {
    attempt();
    if (button.dataset.path === 'single') { feedback('first-feedback', 'Blockiert: Im sonst-Zweig steht f(f(x+11)). f(110) ist nur der innere Aufruf; dessen Ergebnis muss noch durch das äußere f.', 'try'); return; }
    if (button.dataset.path === 'always') { feedback('first-feedback', 'Das ist eine Hypothese über das Endergebnis, aber keine Expansion nach der gegebenen Definition. Außerdem ist „immer 91“ für x>101 falsch.', 'try'); return; }
    feedback('first-feedback', 'Richtig: 99≤100, daher f(f(99+11)) = f(f(110)).', 'good'); show('trace-step');
  }));

  byId('trace-start').addEventListener('click', () => {
    attempt();
    const raw = Number(byId('trace-input').value);
    if (!Number.isInteger(raw) || raw < -100 || raw > 200) { feedback('trace-feedback', 'Bitte eine ganze Zahl zwischen −100 und 200 eingeben.', 'try'); return; }
    trace = { ...mc91Steps(raw), index: 0 };
    byId('call-trace').innerHTML = '';
    byId('trace-next').disabled = false;
    byId('trace-feedback').hidden = true;
    renderNext();
  });
  byId('trace-next').addEventListener('click', renderNext);

  document.querySelectorAll('.pattern-choice').forEach(button => button.addEventListener('click', () => {
    attempt();
    if (button.dataset.answer === 'single') { feedback('pattern-feedback', 'Falscher Pfad: Nur den inneren Aufruf auszuführen lässt das äußere f verschwinden. Genau diese Verschachtelung erzeugt das konstante Intervall.', 'try'); return; }
    if (button.dataset.answer === 'always') { feedback('pattern-feedback', 'Teste x=102: Der Basisfall gilt sofort und liefert 92. „Immer 91“ ist daher oberhalb 101 falsch.', 'try'); return; }
    patternSolved = true;
    feedback('pattern-feedback', 'Passt: Bis einschließlich 101 ist das Ergebnis 91; erst ab 102 liefert der Basisfall x−10 einen anderen Wert.', 'good');
    if (finishedNestedTrace && patternSolved) unlock();
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => {
    attempt(); const hint = byId(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden));
  }));
  byId('reveal').addEventListener('click', () => {
    if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du den Abschluss wirklich aufdecken?')) return;
    show('solution'); show('completion'); byId('reveal').hidden = true;
  });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
