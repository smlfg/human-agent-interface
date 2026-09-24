(() => {
  'use strict';

  const operationFeedback = document.querySelector('#operation-feedback');
  const traceStep = document.querySelector('#trace-step');
  const finishStep = document.querySelector('#finish-step');
  const rounds = [...document.querySelectorAll('.round')];
  const totalOutput = document.querySelector('#trace-total');
  const answer = document.querySelector('#final-answer');
  const checkAnswer = document.querySelector('#check-answer');
  const finalFeedback = document.querySelector('#final-feedback');
  const revealButton = document.querySelector('#reveal-solution');
  const solutionLock = document.querySelector('#solution-lock span');
  const solution = document.querySelector('#solution');
  let expectedRound = 0;
  let total = 0;

  const showFeedback = (element, kind, html) => {
    element.className = `feedback show ${kind}`;
    element.innerHTML = html;
  };

  const unlock = (section, controls) => {
    section.classList.remove('locked');
    section.removeAttribute('aria-disabled');
    controls.forEach(control => { control.disabled = false; });
  };

  document.querySelectorAll('[data-operation]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-operation]').forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      if (button.dataset.operation === 'compare') {
        showFeedback(operationFeedback, 'good', '<strong>Genau.</strong> Dieser Vergleich sitzt in der inneren Schleife und wird für jedes verbleibende Element ausgeführt. Jetzt machen wir seine Häufigkeit sichtbar.');
        unlock(traceStep, rounds);
        rounds[0].focus();
      } else if (button.dataset.operation === 'swap') {
        showFeedback(operationFeedback, 'try', '<strong>Der typische falsche Pfad:</strong> <code>swap</code> wird nur einmal pro äußerer Runde ausgeführt – also ungefähr <code>n</code>-mal. Davor durchsucht <code>j</code> aber den ganzen Rest. Zähle deshalb den Vergleich in der inneren Schleife.');
      } else {
        showFeedback(operationFeedback, 'try', '<strong>Noch eine Ebene tiefer.</strong> <code>minidx = i</code> passiert einmal pro äußerer Runde. Gesucht ist die Operation, die in jeder inneren Runde wiederkehrt.');
      }
    });
  });

  document.querySelectorAll('.hint-button').forEach(button => {
    button.addEventListener('click', () => {
      const hint = document.querySelector(`#${button.dataset.hint}`);
      hint.classList.add('show');
      button.setAttribute('aria-expanded', 'true');
    });
  });

  rounds.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index !== expectedRound) {
        totalOutput.textContent = `Beginne links bei i = ${expectedRound}.`;
        return;
      }
      const count = Number(button.dataset.count);
      button.querySelector('b').textContent = count;
      button.classList.add('revealed');
      button.disabled = true;
      total += count;
      expectedRound += 1;
      totalOutput.textContent = `Vergleiche sichtbar: ${rounds.slice(0, expectedRound).map(item => item.dataset.count).join(' + ')} = ${total}`;
      if (expectedRound === rounds.length) {
        totalOutput.textContent = 'Für n = 5: 4 + 3 + 2 + 1 + 0 = 10 Vergleiche. Das ist das Dreieck.';
        unlock(finishStep, [answer, checkAnswer]);
        answer.focus();
      }
    });
  });

  checkAnswer.addEventListener('click', () => {
    const raw = answer.value.trim();
    const normalized = raw.toLowerCase().replaceAll('²', '^2').replaceAll('θ', 'theta');
    revealButton.disabled = false;
    solutionLock.textContent = 'Entsperrt: Du hast einen eigenen Versuch abgegeben.';

    if (!raw) {
      showFeedback(finalFeedback, 'try', '<strong>Noch kein Versuch.</strong> Schreibe wenigstens: Was wird addiert, welche Klasse folgt daraus und warum ändern die Arraywerte die Schleifenanzahl nicht?');
      return;
    }

    const hasTriangle = /n\s*\(?n\s*[-−]\s*1\)?\s*\/\s*2|\(n\s*[-−]\s*1\).*\+|dreieck|n-1/.test(normalized);
    const hasQuadratic = /theta\s*\(?\s*n\s*(\^2|\*\s*n)|o\s*\(?\s*n\s*(\^2|\*\s*n)/.test(normalized);
    const hasCases = /(best|beste).*(worst|schlecht)|(worst|schlecht).*(best|beste)/.test(normalized);
    const hasReason = /(schleif|vergleich).*(immer|unabhängig|vollständig|gleich)|(immer|unabhängig|vollständig|gleich).*(schleif|vergleich)/.test(normalized);

    if (hasTriangle && hasQuadratic && hasCases && hasReason) {
      completeTask();
      showFeedback(finalFeedback, 'good', '<strong>Prüfungsfest.</strong> Du hast Summe, Klasse und den Grund für Best = Worst verbunden. Präzise Endnotation: <code>Best = Worst = Θ(n²)</code>.');
    } else {
      const missing = [];
      if (!hasTriangle) missing.push('die Dreieckssumme <code>(n−1)+…+1 = n(n−1)/2</code>');
      if (!hasQuadratic) missing.push('<code>Θ(n²)</code>');
      if (!hasCases) missing.push('Best und Worst');
      if (!hasReason) missing.push('den Grund: beide Schleifen laufen unabhängig von den Werten vollständig');
      showFeedback(finalFeedback, 'try', `<strong>Guter eigener Start.</strong> Ergänze noch ${missing.join(', ')}. Hinweis: Nur <code>O(n²)</code> nennt eine Obergrenze; hier kannst du genauer <code>Θ(n²)</code> sagen.`);
    }
  });

  revealButton.addEventListener('click', () => {
    solution.hidden = false;
    revealButton.setAttribute('aria-expanded', 'true');
    solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  const storageKey = 'ads-probeklausur-state-v2';
  const stateOutput = document.querySelector('#state-feedback');
  const stateButtons = [...document.querySelectorAll('.state-btn')];
  const sitsButton = stateButtons.find(button => button.dataset.value === 'sitzt');

  const readState = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  };
  let taskCompleted = Boolean(readState().evidence?.task01?.completed);

  const paintCompletion = () => {
    sitsButton.disabled = !taskCompleted;
    sitsButton.title = taskCompleted ? '' : 'Erst den korrekten Prüfungssatz abschließen.';
  };

  const completeTask = () => {
    const state = readState();
    state.evidence ||= {};
    state.evidence.task01 = { completed: true, completedAt: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(state));
    taskCompleted = true;
    paintCompletion();
  };

  const paintState = value => {
    stateButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.value === value)));
    stateOutput.textContent = value ? `Gespeichert: Aufgabe 01 ${value === 'sitzt' ? 'sitzt.' : 'wackelt noch.'}` : 'Noch nicht markiert.';
  };

  try {
    const state = readState();
    paintState(state.task01 || '');
  } catch {
    paintState('');
  }
  paintCompletion();

  stateButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.value === 'sitzt' && !taskCompleted) {
        stateOutput.textContent = 'Sitzt wird nach dem korrekten Prüfungssatz freigeschaltet. Wackelt kannst du jederzeit markieren.';
        return;
      }
      const state = readState();
      state.task01 = button.dataset.value;
      localStorage.setItem(storageKey, JSON.stringify(state));
      paintState(button.dataset.value);
    });
  });
})();
