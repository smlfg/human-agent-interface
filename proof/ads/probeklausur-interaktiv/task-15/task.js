(() => {
  'use strict';
  const STORE = 'ads-probeklausur-state-v2';
  const correct = { '1': 'children', '2': 'depth', '3': 'order', '4': 'history' };
  const feedback = {
    '1': {
      children: ['good', 'Genau. Zwei Schlüssel erzeugen drei Wertebereiche – also braucht der innere Knoten c h drei Kinder. Das Kind für den Bereich zwischen c und h fehlt.'],
      keys: ['try', 'Die Schlüsselzahl ist erlaubt: Ein 2-3-4-Knoten darf 1 bis 3 Schlüssel tragen. Prüfe jetzt: Wie viele Wertebereiche erzeugen c und h?'],
      depth: ['try', 'Alle sichtbaren Blätter liegen hier gleich tief. Der Fehler sitzt direkt am inneren Knoten c h: Schlüsselzahl mit Kinderzahl vergleichen.'],
      order: ['try', 'a < c und k > h passen zu den vorhandenen äußeren Bereichen. Trotzdem fehlt der mittlere Wertebereich als Kind.']
    },
    '2': {
      depth: ['good', 'Richtig. Links enden die Wege bei a/e/h eine Ebene früher als rechts bei o/q/x/z. Alle Blätter eines 2-3-4-Baums müssen gleich tief sein.'],
      children: ['try', 'c f hat zwei Schlüssel und korrekt drei Kinder: a, e, h. Zähle stattdessen die Kanten von m zu jedem Blatt.'],
      order: ['try', 'Die Buchstabenintervalle stimmen. Vergleiche die Weglängen m→c f→a und m→r→p→o.'],
      valid: ['try', 'Fast überzeugend – Schlüssel, Kinder und Ordnung passen. Aber die Blätter a/e/h liegen eine Ebene höher als o/q/x/z.']
    },
    '3': {
      order: ['good', 'Treffer. Unter d e h muss das zweite Kind zwischen d und e liegen. Dort steht c, obwohl c < d ist. Damit ist es kein Suchbaum.'],
      keys: ['try', 'Drei Schlüssel sind erlaubt: Das ist ein 4-Knoten. Prüfe den Wertebereich des zweiten Kindes c.'],
      children: ['try', 'r hat einen Schlüssel und korrekt zwei Kinder. Der Verstoß ist alphabetisch: In welchem Intervall müsste c liegen?'],
      depth: ['try', 'Alle Blätter liegen auf derselben Ebene. Lies d | e | h als Trennwände für vier geordnete Bereiche.']
    },
    '4': {
      history: ['good', 'Ja – formal besteht er den Struktur-TÜV. Der Split-Verlauf verrät ihn: Beim Entstehen von d g j müssten zwei Ein-Schlüssel-Kinder entstehen; die gezeigte gleichmäßige Füllung kann d g j nicht unverändert überlebt haben.'],
      children: ['try', 'd g j hat drei Schlüssel und genau vier Kinder – das passt. Auch y hat einen Schlüssel und zwei Kinder.'],
      depth: ['try', 'Alle Blätter liegen gleich tief. Dieser Baum scheitert nicht an einer sichtbaren Strukturregel, sondern an seiner möglichen Entstehung.'],
      order: ['try', 'Die Bereiche stimmen: abc < d, ef liegt zwischen d und g, hi zwischen g und j, kl > j; rechts gilt x < y < z. Prüfe nun die Split-Historie.']
    }
  };
  const attempted = new Set();
  const solved = new Set();

  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { return {}; }
  }
  function writeTask(value) {
    const state = readStore(); state.task15 = value; localStorage.setItem(STORE, JSON.stringify(state));
  }
  function refreshProgress() {
    document.querySelector('#progress').textContent = `${solved.size} / 4 geprüft`;
    if (attempted.size === 4) {
      document.querySelector('#gate-copy').textContent = 'Alle vier Bäume wurden versucht. Jetzt darfst du deinen TÜV-Bericht mit der Musterlösung abgleichen.';
      document.querySelector('#reveal').textContent = 'Musterlösung abgleichen';
    }
  }

  document.querySelector('[data-first-check]').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    document.querySelectorAll('[data-first-check] button').forEach(b => b.classList.toggle('selected', b === button));
    const box = document.querySelector('#first-feedback');
    box.className = `feedback show ${button.dataset.first === 'rules' ? 'good' : 'try'}`;
    box.textContent = button.dataset.first === 'rules'
      ? 'Genau. Schlüsselzahl ist nur die Eintrittskarte. Jetzt kommt der eigentliche TÜV.'
      : 'Das ist der benannte Fallenweg: Alle vier Bilder haben erlaubte Schlüsselzahlen. Trotzdem sind drei strukturell falsch und einer nicht erreichbar.';
  });

  document.querySelectorAll('.tree-card').forEach(card => {
    card.querySelector('.diagnoses').addEventListener('click', event => {
      const button = event.target.closest('button'); if (!button) return;
      const id = card.dataset.tree; const choice = button.dataset.answer;
      attempted.add(id);
      card.querySelectorAll('[data-answer]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const [kind, text] = feedback[id][choice]; const box = card.querySelector('.feedback');
      box.className = `feedback show ${kind}`; box.textContent = text;
      if (choice === correct[id]) { solved.add(id); card.classList.add('solved'); }
      refreshProgress();
    });
  });

  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => {
    const hint = document.querySelector(`#${button.dataset.hint}`); hint.classList.add('show'); button.hidden = true;
  }));

  document.querySelector('#reveal').addEventListener('click', () => {
    const solution = document.querySelector('#full-solution'); solution.hidden = false;
    document.querySelector('#reveal').hidden = true; solution.setAttribute('tabindex', '-1'); solution.focus();
  });

  const saved = readStore().task15;
  document.querySelectorAll('[data-state]').forEach(button => {
    button.classList.toggle('active', button.dataset.state === saved);
    button.addEventListener('click', () => {
      writeTask(button.dataset.state);
      document.querySelectorAll('[data-state]').forEach(b => b.classList.toggle('active', b === button));
      document.querySelector('#state-feedback').textContent = `Gespeichert: Aufgabe 15 ${button.textContent}.`;
    });
  });
})();
