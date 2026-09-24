(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb04a01';
  const $ = (selector) => document.querySelector(selector);
  let correctPath = false;
  let runtimeCorrect = false;

  function feedback(element, message, kind) {
    element.textContent = message;
    element.className = `feedback ${kind}`;
    element.hidden = false;
  }

  document.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.hidden = !hint.hidden;
      button.setAttribute('aria-expanded', String(!hint.hidden));
    });
  });

  document.querySelectorAll('[data-path]').forEach((button) => {
    button.addEventListener('click', () => {
      const out = $('#path-feedback');
      if (button.dataset.path === 'print') {
        feedback(out, 'Blockiert: Beispielausgabe ansehen prüft weder fehlende Werte noch Duplikate und Randfälle. Ein Test braucht eine unabhängige Erwartung.', 'try');
        return;
      }
      if (button.dataset.path === 'merge') {
        feedback(out, 'Blockiert: Nur Splitten sortiert nichts. Ohne korrektes Merge bleiben die Teilfelder getrennt oder werden falsch überschrieben.', 'try');
        return;
      }
      correctPath = true;
      feedback(out, 'Richtig: Der Testtreiber kennt die erwartete sortierte Folge und vergleicht jedes Element. Das ist mehr als die eigene Ausgabe anzusehen.', 'good');
      $('#lab-step').hidden = false;
      $('#runtime-step').hidden = false;
    });
  });

  $('#check-runtime').addEventListener('click', () => {
    const chosen = Object.fromEntries([...document.querySelectorAll('[data-runtime]')].map((select) => [select.dataset.runtime, select.value]));
    runtimeCorrect = chosen.selection === 'quadratic' && chosen.insertion === 'linear-best' && chosen.merge === 'nlogn';
    if (!runtimeCorrect) {
      feedback($('#runtime-feedback'), 'Noch nicht: Selection durchsucht das Restfeld immer; Insertion kann bei vorsortierter Eingabe sofort weitergehen; Merge bearbeitet auf jeder der log n Ebenen insgesamt n Elemente.', 'try');
      return;
    }
    feedback($('#runtime-feedback'), 'Stimmt: Selection Θ(n²); Insertion best Θ(n), sonst bis Θ(n²); Merge Θ(n log n).', 'good');
    $('#completion').hidden = false;
  });

  document.querySelectorAll('[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!correctPath || !runtimeCorrect || !$('#tests-pass').checked) {
        $('#state-feedback').textContent = 'Noch gesperrt: richtiger Testpfad, Laufzeitordnung und ein echter grüner 12/12-Lauf gehören zusammen.';
        return;
      }
      let state = {};
      try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
      state[FIELD] = button.dataset.state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    });
  });
})();
