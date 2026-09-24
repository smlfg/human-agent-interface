(() => {
  'use strict';

  const STORAGE_KEY = 'ads-probeklausur-state-v2';
  const initial = { 1: 23, 3: 25, 7: 29, 9: 31, 2: 2, 4: 4 };
  const paths = {
    linear: [3, 4, 2, 5],
    quadratic: [3, 4, 2, 7, 10]
  };
  let mode = null;
  let position = 0;
  const completed = new Set();

  const table = document.querySelector('#hash-table');
  for (let index = 0; index <= 10; index += 1) {
    const row = document.createElement('li');
    const label = document.createElement('span');
    const slot = document.createElement('button');
    label.className = 'slot-index';
    label.textContent = String(index);
    slot.type = 'button';
    slot.className = 'slot';
    slot.dataset.index = String(index);
    slot.setAttribute('aria-label', `Index ${index}${initial[index] ? `, belegt mit ${initial[index]}` : ', frei'}`);
    if (initial[index]) {
      slot.textContent = String(initial[index]);
      slot.classList.add('occupied');
    } else {
      slot.textContent = '·';
    }
    row.append(label, slot);
    table.append(row);
  }

  function showFeedback(element, message, kind) {
    element.textContent = message;
    element.className = `feedback show ${kind}`;
  }

  function unlock(id) {
    const section = document.querySelector(id);
    section.classList.remove('locked');
    section.removeAttribute('aria-disabled');
  }

  document.querySelectorAll('.hint-button').forEach((button) => {
    button.addEventListener('click', () => document.querySelector(`#${button.dataset.hint}`).classList.add('show'));
  });

  document.querySelectorAll('[data-sequence]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-sequence]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      const feedback = document.querySelector('#sequence-feedback');
      if (button.dataset.sequence === '2,4,3') {
        showFeedback(feedback, 'Richtig: drei getrennte Zahlen – 2, dann 4, dann 3. Jetzt darfst du sondieren.', 'good');
        unlock('#step2');
      } else {
        showFeedback(feedback, 'Das ist der Extraktionsfehler: 243 wäre nur eine Zahl. Im PDF sind 2, 4 und 3 sichtbar getrennt, und die Aufgabe verlangt drei Zahlen.', 'try');
      }
    });
  });

  function clearTrace() {
    position = 0;
    document.querySelectorAll('.slot').forEach((slot) => slot.classList.remove('visited', 'target'));
    document.querySelector('#trace-output').textContent = mode ? 'Noch kein Index besucht.' : 'Wähle zuerst eine Methode.';
    document.querySelector('#probe-count').textContent = 'Sondierungen: –';
    document.querySelector('#trace-feedback').className = 'feedback';
  }

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach((item) => item.classList.toggle('selected', item === button));
      clearTrace();
      document.querySelector('#trace-output').textContent = 'Klicke den Startindex von 3.';
    });
  });
  document.querySelector('#reset-trace').addEventListener('click', clearTrace);

  table.addEventListener('click', (event) => {
    const slot = event.target.closest('.slot');
    if (!slot || !mode) return;
    const chosen = Number(slot.dataset.index);
    const expected = paths[mode][position];
    const feedback = document.querySelector('#trace-feedback');
    if (chosen !== expected) {
      const prior = position === 0 ? 3 : paths[mode][position - 1];
      const mechanism = mode === 'linear' ? '±i: +1, −1, +2, −2' : '±i²: +1², −1², +2², −2²';
      showFeedback(feedback, `Noch nicht: Nach ${prior} verlangt ${mechanism} als Nächstes Index ${expected}. Der Sprung wird immer vom Hash-Start 3 gerechnet.`, 'try');
      return;
    }
    slot.classList.add('visited');
    position += 1;
    const visited = paths[mode].slice(0, position);
    document.querySelector('#trace-output').textContent = visited.join(' → ');
    document.querySelector('#probe-count').textContent = `Sondierungen: ${Math.max(0, position - 1)}`;
    if (position === paths[mode].length) {
      slot.classList.add('target');
      completed.add(mode);
      showFeedback(feedback, `${mode === 'linear' ? 'Linear' : 'Quadratisch'} fertig: Index ${chosen} ist frei. ${position - 1} Sondierungen.`, 'good');
      if (completed.size === 2) unlock('#step3');
    } else {
      showFeedback(feedback, `Index ${chosen} ist belegt. Berechne jetzt genau den nächsten Sprung.`, 'try');
    }
  });

  function parsePath(value) {
    return (value.match(/\d+/g) || []).map(Number);
  }
  function samePath(actual, expected) {
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  }

  const finalFeedback = document.querySelector('#final-feedback');
  document.querySelector('#check-final').addEventListener('click', () => {
    const linearPath = parsePath(document.querySelector('#linear-path').value);
    const quadPath = parsePath(document.querySelector('#quad-path').value);
    const linearIndex = Number(document.querySelector('#linear-index').value);
    const linearProbes = Number(document.querySelector('#linear-probes').value);
    const quadIndex = Number(document.querySelector('#quad-index').value);
    const quadProbes = Number(document.querySelector('#quad-probes').value);
    const linearOkay = samePath(linearPath, paths.linear) && linearIndex === 5 && linearProbes === 3;
    const quadOkay = samePath(quadPath, paths.quadratic) && quadIndex === 10 && quadProbes === 4;
    if (linearOkay && quadOkay) {
      showFeedback(finalFeedback, 'Prüfungsreif: Folge 2,4,3; linear endet 3 nach drei Sondierungen an Index 5, quadratisch nach vier an Index 10.', 'good');
      document.querySelector('#solution').hidden = false;
    } else if ((linearIndex === 5 && linearProbes !== 3) || (quadIndex === 10 && quadProbes !== 4)) {
      showFeedback(finalFeedback, 'Die Endposition passt, aber die Aufgabe verlangt auch die Sondierungszahl. Zähle nach dem Hash-Start jeden geprüften Platz einschließlich des freien Zielplatzes.', 'try');
    } else if (linearPath.length <= 1 || quadPath.length <= 1) {
      showFeedback(finalFeedback, 'Nur Endindizes reichen nicht: Schreibe die komplette Besuchsfolge hin. Genau daran erkennt man die 3 gegenüber 4 Sondierungen.', 'try');
    } else {
      showFeedback(finalFeedback, 'Mindestens ein Trace weicht ab. Rechne alle Sprünge vom Hash-Start 3 und nutze die Reihenfolge +i, −i beziehungsweise +i², −i².', 'try');
    }
  });
  document.querySelector('#reveal-solution').addEventListener('click', () => {
    document.querySelector('#solution').hidden = false;
    showFeedback(finalFeedback, 'Musterweg bewusst aufgedeckt. Fahre danach beide Spuren noch einmal selbst.', 'try');
  });

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }
  function paintState(value) {
    document.querySelectorAll('.state-btn').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.value === value)));
  }
  const savedState = readState();
  paintState(savedState.task17);
  document.querySelectorAll('.state-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const state = readState();
      state.task17 = button.dataset.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      paintState(button.dataset.value);
      document.querySelector('#state-feedback').textContent = `Gespeichert: ${button.textContent}.`;
    });
  });
})();
