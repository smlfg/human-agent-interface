(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb03a03';
  let attempted = false;
  let completed = false;
  const show = id => { document.getElementById(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => {
    const box = document.getElementById(id);
    box.textContent = text;
    box.className = `feedback ${kind}`;
    box.hidden = false;
  };
  const markAttempt = () => { attempted = true; document.getElementById('gate-copy').textContent = 'Dein Versuch zählt. Du kannst den Musterweg jetzt bewusst vergleichen.'; };

  document.querySelectorAll('.fold-title').forEach(button => button.addEventListener('click', () => {
    const body = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    body.hidden = open;
  }));

  document.querySelector('[data-question="start"]').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt();
    if (button.dataset.answer === 'numbers') {
      feedback('start-feedback', 'Zahlenbeispiele prüfen nur einzelne Fälle. „Für alle i“ braucht die Kette: Anfang, Voraussetzung und Übergang i → i+1.', 'try');
      return;
    }
    feedback('start-feedback', 'Genau. Falte den Beweis jetzt Karte für Karte auf.', 'good'); show('ia');
  });

  document.querySelectorAll('.ia-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.correct === 'true') { feedback('ia-feedback', 'Richtig: Bei i = 0 enthält die Summe den Summanden k = 0, also 1/2⁰ = 1.', 'good'); show('iv'); }
    else feedback('ia-feedback', 'Achte auf die Grenzen: Für i = 0 läuft k von 0 bis 0. Die Summe ist nicht leer und enthält genau 1/2⁰.', 'try');
  }));

  document.querySelectorAll('.iv-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.correct === 'true') { feedback('iv-feedback', 'Ja. Diese Gleichung wird für ein festes, aber beliebiges i angenommen und gleich im Schritt eingesetzt.', 'good'); show('is'); }
    else feedback('iv-feedback', 'Einsetzen einiger Zahlen ist ein Plausibilitätscheck, keine Induktionsvoraussetzung. Du brauchst die Behauptung für ein festes i.', 'try');
  }));

  document.querySelectorAll('.is-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'forgot') {
      feedback('is-feedback', 'Der neue Summand fehlt. Die obere Grenze wächst von i auf i+1; deshalb kommt 1/2^(i+1) zur bisherigen Summe hinzu.', 'try');
      return;
    }
    feedback('is-feedback', 'Richtig aufgefaltet. Jetzt darfst du die IV für die alte Summe einsetzen.', 'good'); show('algebra');
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  document.getElementById('finish').addEventListener('click', () => {
    completed = true; show('completion'); show('solution'); document.getElementById('reveal').hidden = true;
    document.getElementById('gate-copy').textContent = 'Beweisweg abgeschlossen — hier ist dein Papiervergleich.';
    document.getElementById('completion').scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('reveal').addEventListener('click', () => {
    if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return;
    show('solution'); document.getElementById('reveal').hidden = true; show('completion');
  });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {};
    try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state;
    localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert${completed ? ' — vollständiger Beweisweg geschafft.' : '.'}`, 'good');
  }));
})();
