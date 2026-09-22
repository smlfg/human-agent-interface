(() => {
  'use strict';

  const sorted = [1, 3, 5, 7, 9];
  const reversed = [...sorted].reverse();
  const scenarios = [
    { algorithm: 'selection', input: sorted, inputName: 'EINGABE 1 · SCHON SORTIERT', title: 'SelectionSort schaut trotzdem überall nach.', goal: 'Finde den kleinsten Wert im gesamten Restbereich.' },
    { algorithm: 'insertion', input: sorted, inputName: 'EINGABE 1 · SCHON SORTIERT', title: 'InsertionSort ist fast sofort weiter.', goal: 'Prüfe nur den linken Nachbarn des nächsten Schlüssels.' },
    { algorithm: 'selection', input: reversed, inputName: 'EINGABE 2 · UMGEKEHRT SORTIERT', title: 'SelectionSort schaut gleich lange weiter.', goal: 'Auch jetzt wird jeder Restbereich vollständig abgesucht.' },
    { algorithm: 'insertion', input: reversed, inputName: 'EINGABE 2 · UMGEKEHRT SORTIERT', title: 'InsertionSort muss jetzt weit nach links.', goal: 'Schiebe jedes größere Element einzeln nach rechts.' }
  ];

  const $ = selector => document.querySelector(selector);
  const arrayNode = $('#array');
  const caseKicker = $('#case-kicker');
  const title = $('#experiment-title');
  const goal = $('#experiment-goal');
  const overall = $('#overall-progress');
  const compareCount = $('#compare-count');
  const motionCount = $('#motion-count');
  const motionLabel = $('#motion-label');
  const arrayRole = $('#array-role');
  const keyTray = $('#key-tray');
  const nextTitle = $('#next-title');
  const status = $('#step-status');
  const nextButton = $('#next-button');
  const restartButton = $('#restart-button');
  const ledger = $('#ledger');
  const question = $('#question');
  const feedback = $('#question-feedback');
  const conclusion = $('#conclusion');

  let scenarioIndex = 0;
  let events = [];
  let eventIndex = 0;
  let state = null;
  let compares = 0;
  let motions = 0;
  let results = [];
  let animating = false;

  const clone = values => values.slice();

  function selectionEvents(input) {
    const values = clone(input);
    const steps = [];
    for (let i = 0; i < values.length - 1; i += 1) {
      let min = i;
      let lastComparison = null;
      for (let j = i + 1; j < values.length; j += 1) {
        const oldMin = min;
        const isSmaller = values[j] < values[min];
        if (isSmaller) min = j;
        const step = {
          type: 'compare', algorithm: 'selection', before: clone(values), array: clone(values), boundary: i, beforeBoundary: i,
          highlight: [oldMin, j], candidateBefore: oldMin, candidate: min, compare: 1,
          text: isSmaller
            ? `${values[j]} ist kleiner als ${values[oldMin]}. Der Minimum-Marker wandert zu ${values[j]}.`
            : `${values[oldMin]} bleibt das bisher kleinste Element.`,
          next: `Vergleiche ${values[min]} mit ${values[j + 1] ?? 'dem Ende'}.`
        };
        steps.push(step);
        lastComparison = step;
      }
      if (min !== i) {
        const before = clone(values);
        [values[i], values[min]] = [values[min], values[i]];
        steps.push({
          type: 'swap', algorithm: 'selection', before, array: clone(values), beforeBoundary: i,
          boundary: i === values.length - 2 ? values.length : i + 1, highlight: [i, min], candidate: null, motion: 1,
          text: `Tausche ${before[i]} mit dem gefundenen Minimum ${before[min]}.`,
          next: 'Suche im nächsten Restbereich weiter.'
        });
      } else if (lastComparison) {
        lastComparison.boundaryAfter = i === values.length - 2 ? values.length : i + 1;
      }
    }
    return steps;
  }

  function insertionEvents(input) {
    let values = clone(input);
    const steps = [];
    for (let i = 1; i < values.length; i += 1) {
      const key = values[i];
      let hole = i;
      let held = false;
      let j = i - 1;
      while (j >= 0) {
        const left = values[j];
        const shouldShift = left > key;
        steps.push({
          type: 'compare', algorithm: 'insertion', before: clone(values), array: clone(values), prefix: i, beforePrefix: i,
          highlight: held ? [j] : [j, hole], key, keyHeld: held, beforeKeyHeld: held, hole, beforeHole: hole, compare: 1,
          text: shouldShift ? `${left} ist größer als Schlüssel ${key}. Es muss Platz machen.` : `${left} ist nicht größer als Schlüssel ${key}. Hier endet der Weg nach links.`,
          next: shouldShift ? `Schiebe ${left} eine Stelle nach rechts.` : 'Nimm den nächsten Schlüssel.'
        });
        if (!shouldShift) {
          if (held) {
            values[hole] = key;
            steps.push({
              type: 'insert', algorithm: 'insertion', before: clone(values), array: clone(values), prefix: i, beforePrefix: i,
              highlight: [hole], key, keyHeld: false, beforeKeyHeld: true, hole, beforeHole: hole,
              text: `Setze Schlüssel ${key} in die freie Stelle ein.`,
              next: 'Nimm den nächsten Schlüssel.'
            });
          }
          break;
        }
        const before = clone(values);
        const beforeHole = hole;
        const beforeHeld = held;
        values[hole] = left;
        values[j] = null;
        held = true;
        hole = j;
        steps.push({
          type: 'shift', algorithm: 'insertion', before, array: clone(values), prefix: i, beforePrefix: i,
          highlight: [hole + 1], key, keyHeld: true, beforeKeyHeld: beforeHeld, hole, beforeHole, motion: 1,
          text: `Verschiebe ${left} genau eine Stelle nach rechts.`,
          next: hole > 0 ? `Vergleiche den linken Nachbarn mit Schlüssel ${key}.` : `Setze Schlüssel ${key} ganz vorne ein.`
        });
        j -= 1;
        if (j < 0) {
          values[hole] = key;
          steps.push({
            type: 'insert', algorithm: 'insertion', before: clone(values), array: clone(values), prefix: i, beforePrefix: i,
            highlight: [hole], key, keyHeld: false, beforeKeyHeld: true, hole, beforeHole: hole,
            text: `Setze Schlüssel ${key} in die freie Stelle ein.`,
            next: 'Nimm den nächsten Schlüssel.'
          });
        }
      }
    }
    return steps;
  }

  function prepareScenario() {
    const scenario = scenarios[scenarioIndex];
    events = scenario.algorithm === 'selection' ? selectionEvents(scenario.input) : insertionEvents(scenario.input);
    eventIndex = 0;
    compares = 0;
    motions = 0;
    state = { array: clone(scenario.input), boundary: 0, prefix: 1, key: null, keyHeld: false, hole: null, candidate: null };
    caseKicker.textContent = scenario.inputName;
    title.textContent = scenario.title;
    goal.textContent = scenario.goal;
    overall.textContent = `Versuch ${scenarioIndex + 1} / ${scenarios.length}`;
    motionLabel.textContent = scenario.algorithm === 'selection' ? 'TAUSCHE' : 'VERSCHIEBUNGEN';
    question.hidden = true;
    conclusion.hidden = true;
    renderPreview();
  }

  function roleText() {
    const scenario = scenarios[scenarioIndex];
    if (scenario.algorithm === 'selection') return `Grün: fest. Gelb: der komplette Restbereich für Position ${state.boundary + 1}.`;
    return `Grün: schon sortierter Anfang. Blau: Schlüssel ${state.key ?? 'bereit'}.`;
  }

  function render(event = null, preview = false) {
    compareCount.textContent = String(compares);
    motionCount.textContent = String(motions);
    arrayRole.textContent = roleText();
    keyTray.hidden = !state.keyHeld;
    keyTray.innerHTML = state.keyHeld ? `Schlüssel <b>${state.key}</b>` : '';
    arrayNode.innerHTML = '';
    state.array.forEach((value, index) => {
      const cell = document.createElement('li');
      cell.className = 'array-cell';
      cell.dataset.index = `a[${index}]`;
      cell.textContent = value ?? '·';
      if (scenarios[scenarioIndex].algorithm === 'selection' && index < state.boundary) cell.classList.add('fixed');
      if (scenarios[scenarioIndex].algorithm === 'insertion' && index < state.prefix && value !== null) cell.classList.add('fixed');
      if (state.candidate === index) cell.classList.add('candidate');
      if (value === null) cell.classList.add('hole');
      if (event?.highlight?.includes(index)) cell.classList.add(preview ? 'next' : `event-${event.type}`);
      if (preview && !state.keyHeld && state.key !== null && index === state.hole) cell.classList.add('key-source');
      arrayNode.append(cell);
    });
  }

  function previewCopy(event) {
    if (!event) return { title: 'Beobachte zuerst die vier Spuren.', status: 'Alle Experimente sind durchlaufen.' };
    if (event.type === 'compare') {
      const nums = event.highlight.map(index => (event.before || event.array)[index]).filter(value => value !== null);
      const suffix = event.keyHeld ? ` mit Schlüssel ${event.key}` : nums.join(' mit ');
      return { title: `Vergleiche ${suffix}.`, status: 'Nur diese Stellen sind jetzt relevant.' };
    }
    if (event.type === 'swap') return { title: 'Tausche die zwei markierten Werte.', status: 'Ein Tausch – keine neue Suche.' };
    if (event.type === 'shift') return { title: `Schiebe ${(event.before || event.array)[event.highlight[0] - 1]} nach rechts.`, status: 'Eine Verschiebung – der Schlüssel wartet oben.' };
    return { title: `Setze Schlüssel ${event.key} ein.`, status: 'Eine sichtbare Bewegung, aber kein neuer Vergleich.' };
  }

  function renderPreview() {
    const event = events[eventIndex];
    if (!event) {
      finishScenario();
      return;
    }
    state = {
      array: clone(event.before || event.array), boundary: event.beforeBoundary ?? event.boundary ?? state.boundary,
      prefix: event.beforePrefix ?? event.prefix ?? state.prefix, key: event.key ?? null,
      keyHeld: Boolean(event.beforeKeyHeld), hole: event.beforeHole ?? event.hole ?? null,
      candidate: event.candidateBefore ?? null
    };
    const copy = previewCopy(event);
    nextTitle.textContent = copy.title;
    status.textContent = copy.status;
    nextButton.textContent = event.type === 'compare' ? 'Vergleich ausführen →' : event.type === 'swap' ? 'Tausch ausführen →' : event.type === 'shift' ? 'Verschiebung ausführen →' : 'Einsetzen →';
    nextButton.disabled = false;
    render(event, true);
  }

  function applyEvent(event) {
    if (event.compare) compares += event.compare;
    if (event.motion) motions += event.motion;
    state = {
      array: clone(event.array), boundary: event.boundaryAfter ?? event.boundary ?? state.boundary,
      prefix: event.prefix ?? state.prefix, key: event.key ?? null, keyHeld: Boolean(event.keyHeld),
      hole: event.hole ?? null, candidate: event.candidate ?? null
    };
    nextTitle.textContent = event.text;
    status.textContent = event.type === 'compare' ? 'Ein Vergleich gezählt.' : event.type === 'shift' ? 'Eine Verschiebung gezählt.' : event.type === 'swap' ? 'Ein Tausch gezählt.' : 'Der Schlüssel liegt wieder an seiner Stelle.';
    render(event, false);
  }

  function renderLedger() {
    if (!results.length) {
      ledger.innerHTML = '<p class="ledger-empty">Die erste Spur entsteht gerade.</p>';
      return;
    }
    ledger.innerHTML = results.map(result => `<div class="ledger-entry"><strong>${result.name}</strong>${result.compares} Vergleiche · ${result.motions} ${result.motionName}</div>`).join('');
  }

  function finishScenario() {
    const scenario = scenarios[scenarioIndex];
    state = {
      ...state,
      boundary: state.array.length,
      prefix: state.array.length,
      key: null,
      keyHeld: false,
      hole: null,
      candidate: null
    };
    render();
    results.push({
      name: `${scenario.algorithm === 'selection' ? 'SelectionSort' : 'InsertionSort'} · ${scenario.inputName.includes('SCHON') ? 'sortiert' : 'umgekehrt'}`,
      compares, motions, motionName: scenario.algorithm === 'selection' ? 'Tausche' : 'Verschiebungen'
    });
    renderLedger();
    scenarioIndex += 1;
    if (scenarioIndex < scenarios.length) {
      prepareScenario();
      status.textContent = 'Spur gespeichert. Jetzt folgt direkt derselbe Input mit der anderen Strategie.';
      return;
    }
    nextButton.disabled = true;
    nextButton.textContent = 'Alle Spuren beobachtet';
    nextTitle.textContent = 'Jetzt kommt genau eine kleine Frage.';
    status.textContent = 'Vergleiche die vier entstandenen Spuren.';
    question.hidden = false;
    question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  nextButton.addEventListener('click', () => {
    if (animating || !events[eventIndex]) return;
    animating = true;
    nextButton.disabled = true;
    applyEvent(events[eventIndex]);
    eventIndex += 1;
    window.setTimeout(() => {
      animating = false;
      renderPreview();
    }, 460);
  });

  restartButton.addEventListener('click', () => {
    scenarioIndex = 0;
    results = [];
    feedback.className = 'feedback';
    feedback.textContent = '';
    renderLedger();
    prepareScenario();
  });

  document.querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      const correct = button.dataset.answer === 'selection-scans';
      document.querySelectorAll('[data-answer]').forEach(item => item.classList.remove('correct', 'wrong'));
      button.classList.add(correct ? 'correct' : 'wrong');
      feedback.className = `feedback show ${correct ? 'good' : 'try'}`;
      if (correct) {
        feedback.innerHTML = '<strong>Genau.</strong> Bei SelectionSort verschwinden höchstens Tausche, nicht die vollständige Suche. InsertionSort braucht bei sortierter Eingabe pro neuem Schlüssel nur einen Vergleich.';
        conclusion.hidden = false;
        conclusion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (button.dataset.answer === 'both-fast') {
        feedback.innerHTML = '<strong>Fast die typische Falle.</strong> Keine Tausche bedeutet nicht: keine Vergleiche. SelectionSort prüft den Restbereich trotzdem vollständig.';
      } else {
        feedback.innerHTML = '<strong>Die Tausche sind nicht der Takt.</strong> Entscheidend sind die Vergleiche im Restbereich; davon hat SelectionSort auch bei sortierter Eingabe quadratisch viele.';
      }
    });
  });

  prepareScenario();
})();
