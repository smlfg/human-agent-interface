(() => {
  'use strict';

  const storageKey = 'ads-probeklausur-state-v2';
  const $ = (selector) => document.querySelector(selector);
  const showFeedback = (element, message, kind = 'try') => {
    element.textContent = message;
    element.className = `feedback show ${kind}`;
  };
  const unlock = (element) => {
    element.classList.remove('locked');
    element.classList.add('unlocked');
  };
  let recurrenceCorrect = false;

  document.querySelectorAll('[data-branches]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-branches]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      if (button.dataset.branches === '1') {
        showFeedback($('#branch-feedback'), 'Genau: eine Zeile enthält fun(…), also entsteht eine einzige Kette x → x−1 → … → 1.', 'good');
        unlock($('#step-recurrence'));
        $('#step-recurrence').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        showFeedback($('#branch-feedback'), 'Hier entsteht keine Verzweigung: zw speichert nur das Ergebnis des einen Aufrufs. Suche im Code ein zweites fun(…) – es gibt keins. Versuch es noch einmal.');
      }
    });
  });

  document.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.classList.add('show');
      hint.setAttribute('tabindex', '-1');
      hint.focus();
    });
  });

  $('#check-recurrence').addEventListener('click', () => {
    const selected = document.querySelector('input[name="recurrence"]:checked');
    const feedback = $('#recurrence-feedback');
    if (!selected) {
      showFeedback(feedback, 'Wähle zuerst eine der drei Formeln.');
      return;
    }
    if (selected.value === 'linear') {
      recurrenceCorrect = true;
      showFeedback(feedback, 'Treffer: ein kleineres Teilproblem plus konstante Arbeit auf dieser Ebene.', 'good');
      unlock($('#step-unroll'));
      return;
    }
    if (selected.value === 'double') {
      showFeedback(feedback, 'Das würde zwei rekursive Aufrufe pro Ebene verlangen. Im Code steht fun(x−1) aber nur einmal.');
      return;
    }
    showFeedback(feedback, 'x · T(x−1) verwechselt Ergebnis und Aufwand: „zw * x“ multipliziert zwei Zahlen einmal; es startet nicht x weitere Aufrufe.');
  });

  let currentX = 1;
  $('#next-value').addEventListener('click', () => {
    if (currentX >= 4) return;
    currentX += 1;
    const value = 3 * currentX - 1;
    const chip = document.createElement('span');
    chip.textContent = `T(${currentX}) = ${value}`;
    $('#tape').append(chip);
    if (currentX === 4) {
      $('#next-value').disabled = true;
      showFeedback($('#machine-feedback'), 'Muster sichtbar: 2, 5, 8, 11. Pro zusätzlicher Ebene kommen genau 3 hinzu. Jetzt formuliere die Gerade.', 'good');
      unlock($('#step-finish'));
    } else {
      showFeedback($('#machine-feedback'), `${value - 3} + 3 = ${value}. Noch eine Ebene!`, 'good');
    }
  });

  let finalAttempted = false;
  $('#check-final').addEventListener('click', () => {
    finalAttempted = true;
    $('#reveal-solution').disabled = false;
    const raw = $('#final-answer').value.toLowerCase().replace(/\s+/g, '');
    const hasClosedForm = /3\*?x-1/.test(raw);
    const hasTheta = /theta\(?x\)?|θ\(?x\)?/.test(raw);
    if (hasClosedForm && hasTheta && recurrenceCorrect && currentX === 4) {
      completeTask();
      showFeedback($('#final-feedback'), 'Prüfungsreif: T(x)=3x−1 und damit T(x)∈Θ(x). Die Funktion berechnet x!, ihre Aufrufkette bleibt aber linear.', 'good');
    } else if (hasClosedForm && hasTheta) {
      showFeedback($('#final-feedback'), 'Form und Klasse stimmen. Für den Kerncheck musst du vorher noch die richtige Rekurrenz wählen und die Werte bis T(4) selbst erzeugen.');
    } else if (hasClosedForm) {
      showFeedback($('#final-feedback'), 'Die geschlossene Form sitzt. Ergänze noch die asymptotische Klasse Θ(x).');
    } else if (hasTheta) {
      showFeedback($('#final-feedback'), 'Die Klasse stimmt. Gesucht ist zusätzlich die exakte geschlossene Form, die bei x=1 den Wert 2 liefert.');
    } else {
      showFeedback($('#final-feedback'), 'Noch nicht vollständig. Nutze die Folge 2, 5, 8, 11: Steigung 3; bestimme dann den konstanten Rest.');
    }
  });

  $('#reveal-solution').addEventListener('click', () => {
    if (!finalAttempted) return;
    const solution = $('#solution');
    solution.hidden = false;
    solution.open = true;
    solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  const readState = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch (_) { return {}; }
  };
  let taskCompleted = Boolean(readState().evidence?.task03?.completed);
  const sitsButton = document.querySelector('[data-state="sitzt"]');
  const paintCompletion = () => {
    sitsButton.disabled = !taskCompleted;
    sitsButton.title = taskCompleted ? '' : 'Erst Rekurrenz, Ausrollen und korrekte geschlossene Form abschließen.';
  };
  const completeTask = () => {
    const state = readState();
    state.evidence ||= {};
    state.evidence.task03 = { completed: true, completedAt: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(state));
    taskCompleted = true;
    paintCompletion();
  };
  const applyState = (value) => {
    document.querySelectorAll('[data-state]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.state === value));
    });
    $('#state-feedback').textContent = value ? `Gespeichert: ${value === 'sitzt' ? 'Sitzt' : 'Wackelt'}.` : '';
  };
  applyState(readState().task03);
  document.querySelectorAll('[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.state === 'sitzt' && !taskCompleted) {
        $('#state-feedback').textContent = 'Sitzt wird nach dem vollständigen Rekurrenz-Loop freigeschaltet.';
        return;
      }
      const state = readState();
      state.task03 = button.dataset.state;
      localStorage.setItem(storageKey, JSON.stringify(state));
      applyState(button.dataset.state);
    });
  });
  paintCompletion();
})();
