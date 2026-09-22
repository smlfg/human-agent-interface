(() => {
  'use strict';

  const storageKey = 'ads-probeklausur-state-v2';
  const selectedCoefficients = new Set();
  const coefficientButtons = [...document.querySelectorAll('.coefficient')];
  const totalOutput = document.querySelector('#coefficient-total');
  const firstFeedback = document.querySelector('#first-feedback');
  const dominanceStep = document.querySelector('#dominance-step');
  const claimsStep = document.querySelector('#claims-step');
  const solutionStep = document.querySelector('#solution-step');
  const revealButton = document.querySelector('#reveal-solution');

  function feedback(node, message, kind = 'try') {
    node.textContent = message;
    node.className = `feedback show ${kind}`;
  }

  function unlock(section) {
    section.classList.remove('locked');
    section.removeAttribute('aria-disabled');
  }

  function updateCoefficientTotal() {
    const total = [...selectedCoefficients].reduce((sum, index) => sum + Number(coefficientButtons[index].dataset.value), 0);
    totalOutput.textContent = selectedCoefficients.size ? `${total} · n²` : '? · n²';
    if (selectedCoefficients.size === coefficientButtons.length) {
      feedback(firstFeedback, 'Genau: (1 + 2 − 3) · n² = 0 · n² = 0. k ist nicht quadratisch – die n²-Terme löschen sich exakt aus.', 'good');
      unlock(dominanceStep);
    }
  }

  coefficientButtons.forEach((button, index) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (selectedCoefficients.has(index)) selectedCoefficients.delete(index);
      else selectedCoefficients.add(index);
      button.setAttribute('aria-pressed', String(selectedCoefficients.has(index)));
      updateCoefficientTotal();
    });
  });

  document.querySelector('#quadratic-trap').addEventListener('click', () => {
    feedback(firstFeedback, 'Blockiert: Das sichtbare n² reicht nicht. Gleichartige Terme müssen zuerst zusammengefasst werden; ihr Koeffizient ist 1 + 2 − 3 = 0. Damit bleibt kein quadratischer Term übrig.', 'try');
  });

  document.querySelectorAll('.hint-button').forEach(button => {
    button.addEventListener('click', () => document.querySelector(`#${button.dataset.hint}`).classList.add('show'));
  });

  document.querySelector('#check-terms').addEventListener('click', () => {
    const expected = {f: 'n2', g: 'n', h: 'n199log', k: 'zero'};
    const selects = [...document.querySelectorAll('[data-term]')];
    const missing = selects.some(select => !select.value);
    const wrong = selects.filter(select => select.value && select.value !== expected[select.dataset.term]);
    const node = document.querySelector('#term-feedback');
    if (missing) return feedback(node, 'Noch nicht vollständig: Gib jeder der vier Funktionen eine Wachstumskarte.', 'try');
    if (wrong.length) return feedback(node, `Noch einmal bei ${wrong.map(select => select.dataset.term).join(', ')}: ausmultiplizieren bzw. zusammenfassen, dann erst den dominanten Term wählen.`, 'try');
    feedback(node, 'Termkarte steht: f → n², g → n, h → n^1,99 log₂n, k → exakt 0.', 'good');
    unlock(claimsStep);
  });

  document.querySelector('#check-claims').addEventListener('click', () => {
    const expected = {c1: 'true', c2: 'true', c3: 'false', c4: 'true'};
    const chosen = {};
    Object.keys(expected).forEach(name => {
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      chosen[name] = checked?.value;
    });
    const node = document.querySelector('#claim-feedback');
    if (Object.values(chosen).some(value => !value)) return feedback(node, 'Entscheide erst alle vier Aussagen. Danach bekommst du präzises Feedback.', 'try');
    const wrong = Object.keys(expected).filter(name => chosen[name] !== expected[name]);
    if (wrong.length) {
      const messages = {
        c1: '(1): n wächst höchstens so schnell wie n².',
        c2: '(2): Das Produkt zweier linearer O-Klassen ergibt hier O(n²).',
        c3: '(3): n² / (n^1,99 log n) = n^0,01 / log n wächst unbegrenzt.',
        c4: '(4): k ist exakt 0, nicht quadratisch.'
      };
      return feedback(node, `Noch nicht: ${wrong.map(name => messages[name]).join(' ')}`, 'try');
    }
    feedback(node, 'Alle vier Urteile stimmen: wahr, wahr, falsch, wahr. Der Prüfungsabschluss ist freigeschaltet.', 'good');
    unlock(solutionStep);
    revealButton.disabled = false;
  });

  revealButton.addEventListener('click', () => {
    const solution = document.querySelector('#solution');
    solution.hidden = false;
    revealButton.setAttribute('aria-expanded', 'true');
    solution.focus?.();
  });

  function readState() {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  }

  document.querySelectorAll('.state-btn').forEach(button => {
    button.addEventListener('click', () => {
      const state = readState();
      state.task07 = button.dataset.state;
      localStorage.setItem(storageKey, JSON.stringify(state));
      document.querySelector('#state-feedback').textContent = `Gespeichert: Aufgabe 07 ${button.dataset.state === 'sitzt' ? 'sitzt' : 'wackelt noch'}.`;
      document.querySelectorAll('.state-btn').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });

  const saved = readState().task07;
  if (saved) {
    document.querySelectorAll('.state-btn').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.state === saved)));
    document.querySelector('#state-feedback').textContent = `Gespeicherter Stand: ${saved}.`;
  }
})();
