(() => {
  'use strict';
  const STORAGE_KEY = 'ads-probeklausur-state-v2';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const showFeedback = (element, text, good = false) => {
    element.textContent = text;
    element.className = `feedback show ${good ? 'good' : 'try'}`;
  };
  const unlock = (element) => {
    element.classList.remove('locked');
    element.removeAttribute('aria-disabled');
  };

  $$('.hint-button').forEach((button) => button.addEventListener('click', () => {
    document.getElementById(button.dataset.hint).classList.add('show');
  }));

  $$('#tos-choices .choice').forEach((button) => button.addEventListener('click', () => {
    $$('#tos-choices .choice').forEach((item) => item.classList.toggle('selected', item === button));
    if (button.dataset.value === '-1') {
      showFeedback($('#tos-feedback'), 'Richtig: −1 ist „kein gültiger Arrayindex“. Der erste Push erhöht tos auf 0.', true);
      unlock($('#play-step'));
      $('#push-value').focus();
    } else if (button.dataset.value === '0') {
      showFeedback($('#tos-feedback'), 'Inkonsistente tos-Konvention: Wenn 0 „leer“ hieße, würde der erste Push mit ++tos in vec[1] schreiben und vec[0] verschwenden.');
    } else {
      showFeedback($('#tos-feedback'), 'depth liegt bereits hinter dem letzten gültigen Index depth−1. Dieser Wert kann nicht „leer“ bedeuten.');
    }
  }));

  const values = [];
  const renderStack = () => {
    $$('#stack-cells li').forEach((cell) => {
      const index = Number(cell.dataset.index);
      const filled = index < values.length;
      cell.classList.toggle('filled', filled);
      cell.classList.toggle('top', filled && index === values.length - 1);
      cell.querySelector('b').textContent = filled ? values[index] : 'leer';
    });
    const tos = values.length - 1;
    $('#tos-flag').textContent = `tos = ${tos}`;
    $('#tos-flag').style.bottom = `${18 + Math.max(0, tos) * 54}px`;
  };
  $('#push').addEventListener('click', () => {
    if (values.length === 5) {
      showFeedback($('#operation-feedback'), 'Stack overflow: tos ist schon depth−1 = 4. Vor dem Schreiben muss push abbrechen.');
      return;
    }
    const value = Number($('#push-value').value);
    if (!Number.isInteger(value)) {
      showFeedback($('#operation-feedback'), 'Bitte einen int-Wert eingeben.');
      return;
    }
    values.push(value);
    renderStack();
    showFeedback($('#operation-feedback'), `push(${value}): erst tos erhöhen, dann in vec[${values.length - 1}] schreiben.`, true);
  });
  $('#pop').addEventListener('click', () => {
    if (!values.length) {
      showFeedback($('#operation-feedback'), 'Stack underflow: tos ist −1. Es gibt kein oberstes Element zum Lesen.');
      return;
    }
    const oldIndex = values.length - 1;
    const value = values.pop();
    renderStack();
    showFeedback($('#operation-feedback'), `pop() liefert ${value} aus vec[${oldIndex}] und senkt tos danach.`, true);
  });
  $('#reset').addEventListener('click', () => {
    values.length = 0;
    renderStack();
    showFeedback($('#operation-feedback'), 'Neu initialisiert: depth = 5, tos = −1.', true);
  });

  $$('#lifo-choices .choice').forEach((button) => button.addEventListener('click', () => {
    $$('#lifo-choices .choice').forEach((item) => item.classList.toggle('selected', item === button));
    if (button.dataset.value === '3') {
      showFeedback($('#lifo-feedback'), 'Richtig: 3 kam zuletzt hinein und kommt zuerst heraus — LIFO.', true);
      unlock($('#code-step'));
      $('[data-key="init"]').focus();
    } else if (button.dataset.value === '2') {
      showFeedback($('#lifo-feedback'), 'Das wäre FIFO wie bei einer Warteschlange. Ein Stack nimmt immer das zuletzt gepushte Element oben weg.');
    } else {
      showFeedback($('#lifo-feedback'), '4 liegt zwar im Stack, aber 3 wurde danach gepusht und liegt deshalb darüber.');
    }
  }));

  const expected = {init: 'minus', clear: 'array', overflow: 'right', push: 'right', underflow: 'right', pop: 'right'};
  $('#check-code').addEventListener('click', () => {
    const selects = $$('.code-puzzle select');
    const missing = selects.filter((select) => !select.value);
    if (missing.length) {
      showFeedback($('#code-feedback'), `Noch ${missing.length} Entscheidung(en) offen. Geh Funktion für Funktion.`);
      missing[0].focus();
      return;
    }
    const wrong = selects.filter((select) => select.value !== expected[select.dataset.key]);
    if (!wrong.length) {
      showFeedback($('#code-feedback'), 'Konsistent: −1 ist leer, depth−1 ist voll, push erhöht vor dem Schreiben und pop senkt nach dem Lesen.', true);
      unlock($('#main-step'));
      $('#trace-answer').focus();
      return;
    }
    const key = wrong[0].dataset.key;
    const messages = {
      init: 'init: tos = 0 kollidiert mit „tos ist der Index des obersten Elements“. Leer muss −1 sein.',
      clear: 'clear: Der Speicher kam von new int[...], also muss er mit delete[] freigegeben werden.',
      overflow: 'Overflow muss vor dem Schreiben am letzten gültigen Index depth−1 erkannt werden.',
      push: 'Mit tos = −1 muss push vor dem Arrayzugriff erhöhen. vec[tos++] würde zuerst vec[−1] ansprechen.',
      underflow: 'Bei dieser Konvention ist tos = 0 ein Stack mit genau einem Element. Leer ist erst −1.',
      pop: 'vec[0] wäre FIFO und verschiebt außerdem nichts. pop muss vec[tos] lesen und tos danach senken.'
    };
    showFeedback($('#code-feedback'), messages[key]);
    wrong[0].focus();
  });

  $('#check-trace').addEventListener('click', () => {
    const normalized = $('#trace-answer').value.trim().replace(/\s+/g, ' ');
    if (normalized === '4 3 2 1 0') {
      showFeedback($('#trace-feedback'), 'Richtig: LIFO dreht die Push-Reihenfolge um. Danach löst der nächste pop den Underflow aus.', true);
      unlock($('#solution-step'));
      $('#reveal-solution').disabled = false;
      $('#reveal-solution').focus();
    } else if (normalized === '0 1 2 3 4') {
      showFeedback($('#trace-feedback'), 'Das ist FIFO. Der Stack liest immer am aktuellen tos: zuerst Index 4, dann 3, 2, 1, 0.');
    } else {
      showFeedback($('#trace-feedback'), 'Noch nicht. Schreibe den aktuellen obersten Wert, senke tos um eins und wiederhole bis tos = −1.');
    }
  });

  $('#reveal-solution').addEventListener('click', () => {
    $('#solution').hidden = false;
    $('#reveal-solution').textContent = 'Musterlösung sichtbar';
    $('#reveal-solution').disabled = true;
  });

  $$('.state-btn').forEach((button) => button.addEventListener('click', () => {
    let state = {};
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state.task08 = button.dataset.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Aufgabe 08 ist als „${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}“ gespeichert.`;
  }));

  renderStack();
})();
