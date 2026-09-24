(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb03a04';
  const values = {2: 4, 3: 9, 4: 16, 5: 25};
  let attempted = false;
  let completed = false;
  const show = id => { document.getElementById(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => {
    const box = document.getElementById(id);
    box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false;
  };
  const markAttempt = () => {
    attempted = true;
    document.getElementById('gate-copy').textContent = 'Dein Versuch zählt. Du kannst den vollständigen Papierweg jetzt bewusst vergleichen.';
  };

  document.querySelector('[data-question="first"]').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt();
    if (button.dataset.value !== '1') {
      feedback('first-feedback', 'Setze den Basiswert wirklich ein: f(0)=0 und 2·1−1=1. Also 0+1, nicht nur einen Teil des Terms.', 'try'); return;
    }
    feedback('first-feedback', 'Richtig: f(1)=1. Jetzt wird der neue Wert jeweils zum Startwert des nächsten Schritts.', 'good'); show('trace');
  });

  document.getElementById('trace-grid').addEventListener('click', event => {
    const button = event.target.closest('.trace-next'); if (!button) return;
    markAttempt();
    const card = button.closest('.trace-card');
    const n = Number(card.dataset.n); const previous = (n - 1) ** 2; const increment = 2 * n - 1;
    card.className = 'trace-card done'; card.innerHTML = `<span>n = ${n}</span><strong>${previous} + ${increment} = ${values[n]}</strong>`;
    if (n < 5) {
      const next = document.createElement('div'); next.className = 'trace-card active'; next.dataset.n = String(n + 1);
      next.innerHTML = `<span>n = ${n + 1}</span><strong>f(${n + 1}) = ?</strong><button class="action trace-next">Nächsten Wert berechnen</button>`;
      document.getElementById('trace-grid').append(next);
      feedback('trace-feedback', `f(${n})=${values[n]}. Der nächste Zuwachs ist ${2 * (n + 1) - 1}.`, 'good');
    } else {
      feedback('trace-feedback', 'Komplett: 1, 4, 9, 16, 25. Ein Zahlenmuster ist jetzt sichtbar — aber „für alle n“ ist noch nicht bewiesen.', 'good'); show('form-step');
    }
  });

  document.querySelectorAll('.form-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'values') {
      feedback('form-feedback', 'Das beschreibt nur die fünf berechneten Werte. Die Aufgabe verlangt eine Formel für beliebiges n und danach einen Beweis.', 'try'); return;
    }
    if (button.dataset.answer === 'linear') {
      feedback('form-feedback', '2n−1 ist nur der Zuwachs im n-ten Schritt. f(n) sammelt alle ungeraden Zuwächse bis n.', 'try'); return;
    }
    feedback('form-feedback', 'Ja: f(n)=n² ist geschlossen. Jetzt beweist die Induktion, dass das Muster nicht nach n=5 abbricht.', 'good'); show('induction');
  }));

  document.querySelectorAll('.induction-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'old') {
      feedback('induction-feedback', 'Indexfehler: 2n−1 gehört zum Schritt auf f(n). Für f(n+1) muss n in der gesamten Rekurrenz durch n+1 ersetzt werden: 2(n+1)−1.', 'try'); return;
    }
    feedback('induction-feedback', 'Richtig indiziert. Setze jetzt die IV f(n)=n² ein und forme zum Ziel (n+1)² um.', 'good'); show('algebra');
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  document.getElementById('finish').addEventListener('click', () => {
    completed = true; show('solution'); show('completion'); document.getElementById('reveal').hidden = true;
    document.getElementById('gate-copy').textContent = 'Beweisweg abgeschlossen — hier ist dein vollständiger Papiervergleich.';
    document.getElementById('completion').scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('reveal').addEventListener('click', () => {
    if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return;
    show('solution'); show('completion'); document.getElementById('reveal').hidden = true;
  });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert${completed ? ' — vollständiger Beweisweg geschafft.' : '.'}`, 'good');
  }));
})();
