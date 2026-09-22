(() => {
  'use strict';

  const storageKey = 'ads-probeklausur-state-v2';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  let traceIndex = -1;
  let pass = 1;
  let ideaAttempted = false;

  const showFeedback = (element, kind, message) => {
    element.className = `feedback show ${kind}`;
    element.innerHTML = message;
  };

  const unlock = (selector) => {
    const step = $(selector);
    step.classList.add('is-open');
    step.removeAttribute('inert');
  };

  $$('.hint-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.classList.toggle('show');
      button.setAttribute('aria-expanded', String(hint.classList.contains('show')));
    });
  });

  $$('[data-arrow]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-arrow]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      const feedback = $('#arrow-feedback');
      if (button.dataset.arrow === 'move') {
        showFeedback(feedback, 'good', '<strong>Genau.</strong> <code>-&gt;</code> rechnet nichts. Es liest das Feld <code>next</code> der aktuellen Box; die Zuweisung bewegt den Zeiger dorthin.');
        unlock('#trace-step');
        $('#trace-next').disabled = false;
        $('#trace-readout').textContent = 'Pass 1 ist bereit: n steht gedanklich vor dem ersten Knoten.';
      } else if (button.dataset.arrow === 'calculate') {
        showFeedback(feedback, 'try', '<strong>Stopp: Das ist kein Rechenoperator.</strong> Das Zeichen besteht zwar aus Minus und Größer-als, aber zusammen ist <code>-&gt;</code> ein Feldzugriff über einen Zeiger. <code>n-&gt;next</code> liest die gespeicherte Adresse der nächsten Box.');
      } else {
        showFeedback(feedback, 'try', '<strong>Noch nicht.</strong> Für einen Vergleich bräuchte der Code etwa <code>==</code>. Hier wird rechts eine Adresse gelesen und links in <code>n</code> gespeichert: Der Finger wandert weiter.');
      }
    });
  });

  const renderTrace = () => {
    $$('[data-node]').forEach((node) => node.classList.remove('active'));
    const current = $(`[data-node="${traceIndex}"]`);
    if (current) current.classList.add('active');
    if (traceIndex < 3) {
      current.classList.add('visited');
      $('#trace-readout').textContent = `Pass ${pass}: n zeigt auf Knoten ${traceIndex + 1} von 3. Danach liest n->next die Adresse der nächsten Box.`;
      return;
    }
    $('#trace-readout').textContent = `Pass ${pass}: n ist nullptr – nach allen 3 Knoten endet diese Schleife.`;
  };

  $('#trace-next').addEventListener('click', () => {
    traceIndex += 1;
    renderTrace();
    if (traceIndex === 3 && pass === 1) {
      pass = 2;
      traceIndex = -1;
      $('#trace-next').textContent = 'Zweiten Pass starten →';
    } else if (traceIndex === 3 && pass === 2) {
      $('#trace-next').disabled = true;
      $('#trace-next').textContent = '2 × 3 Knoten besucht';
      unlock('#runtime-step');
    } else {
      $('#trace-next').textContent = 'Ein Schritt →';
    }
  });

  $$('[data-runtime]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-runtime]').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      const feedback = $('#runtime-feedback');
      if (button.dataset.runtime === 'linear') {
        showFeedback(feedback, 'good', '<strong>Treffer:</strong> Beide Schleifen laufen vollständig: <code>k + k = 2k</code>. Der konstante Faktor 2 fällt in Θ/O weg. Werte und Vorzeichen verkürzen keinen Durchlauf.');
        unlock('#finish-step');
      } else if (button.dataset.runtime === 'quadratic') {
        showFeedback(feedback, 'try', '<strong>Zwei Schleifen sind nicht automatisch quadratisch.</strong> Sie stehen nacheinander, also addierst du: <code>k + k</code>. Nur eine Schleife innerhalb der anderen würde die Faktoren multiplizieren.');
      } else {
        showFeedback(feedback, 'try', '<strong>Auch im Best Case kein früher Ausgang:</strong> Selbst bei leerer Addition muss der Zeiger jeden der k Knoten in beiden Schleifen besuchen. Deshalb unterscheiden sich Best, Mittel und Worst asymptotisch nicht.');
      }
    });
  });

  $('#submit-idea').addEventListener('click', () => {
    ideaAttempted = true;
    $('#show-solution').disabled = false;
    $('#lock-note').textContent = 'Freigeschaltet – dein Versuch steht zuerst.';
    const text = $('#one-loop').value.trim().toLowerCase();
    if (!text) {
      showFeedback($('#idea-feedback'), 'try', '<strong>Versuch registriert.</strong> Minimaler Start: eine Variable für die Gesamtsumme, dann genau eine Bewegung <code>n = n-&gt;next</code> pro Knoten.');
    } else if ((text.includes('sum') || text.includes('+=')) && (text.includes('>= 0') || text.includes('>=0')) && pass === 2 && traceIndex === 3) {
      completeTask();
      showFeedback($('#idea-feedback'), 'good', '<strong>Das ist die Kernidee:</strong> alle Werte einmal summieren und prüfen, ob die Gesamtsumme nichtnegativ ist. Vergleiche gleich mit dem Musterweg.');
    } else {
      showFeedback($('#idea-feedback'), 'try', '<strong>Guter eigener Zug.</strong> Prüfe noch: Die ursprüngliche Bedingung lässt sich zu <code>wert1 + wert2 &gt;= 0</code> umformen. Kann eine Gesamtsumme beide Teilsummen ersetzen?');
    }
  });

  $('#show-solution').addEventListener('click', () => {
    if (!ideaAttempted) return;
    $('#solution').classList.add('show');
    $('#show-solution').setAttribute('aria-expanded', 'true');
    $('#solution').setAttribute('tabindex', '-1');
    $('#solution').focus();
  });

  const readState = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  };
  let taskCompleted = Boolean(readState().evidence?.task02?.completed);
  const sitsButton = $('.state-btn[data-value="sitzt"]');
  const paintCompletion = () => {
    sitsButton.disabled = !taskCompleted;
    sitsButton.title = taskCompleted ? '' : 'Erst beide Pointer-Pässe, Laufzeit und Ein-Schleifen-Idee abschließen.';
  };
  const completeTask = () => {
    const state = readState();
    state.evidence ||= {};
    state.evidence.task02 = { completed: true, completedAt: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(state));
    taskCompleted = true;
    paintCompletion();
  };
  const stored = readState().task02;
  if (stored) {
    $('#state-readout').textContent = `Gespeichert: ${stored === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    const active = $(`.state-btn[data-value="${stored}"]`);
    if (active) active.setAttribute('aria-pressed', 'true');
  }
  $$('.state-btn').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.value === stored));
    button.addEventListener('click', () => {
      if (button.dataset.value === 'sitzt' && !taskCompleted) {
        $('#state-readout').textContent = 'Sitzt wird nach dem vollständigen Pointer-/Laufzeit-Loop freigeschaltet.';
        return;
      }
      const state = readState();
      state.task02 = button.dataset.value;
      localStorage.setItem(storageKey, JSON.stringify(state));
      $$('.state-btn').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      $('#state-readout').textContent = `Gespeichert: ${button.dataset.value === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    });
  });
  paintCompletion();
})();
