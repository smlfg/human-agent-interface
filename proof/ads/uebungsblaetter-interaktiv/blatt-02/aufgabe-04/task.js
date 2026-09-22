(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb02a04';
  const operations = [
    {id:'m1', label:'M₁', formula:'666 · 5 = 3330', needs:[]},
    {id:'m2', label:'M₂', formula:'42 · 42 = 1764', needs:[]},
    {id:'div', label:'D', formula:'6241032 ÷ 1764 = 3538', needs:['m2']},
    {id:'add', label:'A', formula:'9876 + 1234 = 11110', needs:[]},
    {id:'sub1', label:'S₁', formula:'11110 − 3330 = 7780', needs:['add','m1']},
    {id:'sub2', label:'S₂', formula:'7780 − 3538 = 4242', needs:['sub1','div']}
  ];
  let done = [];
  let attempted = false;
  let completed = false;
  const show = id => { document.getElementById(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => {
    const box = document.getElementById(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false;
  };
  const markAttempt = () => {
    attempted = true;
    document.getElementById('gate-copy').textContent = 'Dein Versuch zählt. Nach der Determinismusfrage kannst du den vollständigen Papierweg vergleichen.';
  };

  const renderDag = () => {
    const dag = document.getElementById('dag'); dag.innerHTML = '';
    operations.forEach(op => {
      const ready = op.needs.every(id => done.includes(id));
      const finished = done.includes(op.id);
      const button = document.createElement('button');
      button.className = `op-card${finished ? ' done' : ready ? ' ready' : ''}`;
      button.dataset.op = op.id; button.disabled = finished;
      button.setAttribute('aria-label', `${op.label}: ${op.formula}`);
      const missing = op.needs.filter(id => !done.includes(id)).map(id => operations.find(item => item.id === id).label);
      button.innerHTML = `<small>${op.label}</small><strong>${op.formula}</strong><small>${finished ? 'ausgeführt' : ready ? 'keine offene Voraussetzung' : `wartet auf ${missing.join(' und ')}`}</small>`;
      dag.append(button);
    });
    document.getElementById('sequence').innerHTML = done.map(id => `<li>${operations.find(op => op.id === id).label}</li>`).join('');
  };

  document.getElementById('first-choices').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return; markAttempt();
    if (button.dataset.first === 'wrong') {
      feedback('first-feedback', 'Blockiert: Das fasst Addition und Subtraktion zusammen und ignoriert den Vorrang von 666·5. Strikt links nach rechts ist hier kein gültiger Mathematik-Ablauf.', 'try'); return;
    }
    feedback('first-feedback', 'Ja. Diese Punktrechnung hat keine offene Voraussetzung. Es gibt sogar mehrere sofort ausführbare Operationen — der Ablauf ist also nicht eindeutig.', 'good'); show('dag-step'); renderDag();
  });

  document.getElementById('dag').addEventListener('click', event => {
    const card = event.target.closest('.op-card'); if (!card || card.disabled) return; markAttempt();
    const op = operations.find(item => item.id === card.dataset.op);
    const missing = op.needs.filter(id => !done.includes(id));
    if (missing.length) { feedback('dag-feedback', `${op.label} ist noch blockiert: Zuerst ${missing.map(id => operations.find(item => item.id === id).label).join(' und ')} ausführen.`, 'try'); return; }
    done.push(op.id); renderDag();
    if (done.length === operations.length) {
      feedback('dag-feedback', `Gültige Reihenfolge: ${done.map(id => operations.find(item => item.id === id).label).join(' → ')}. Ergebnis 4242.`, 'good'); show('concept-step');
    } else feedback('dag-feedback', `${op.label} ausgeführt. Wähle nun eine gelbe, ausführbare Karte.`, 'good');
  });

  document.getElementById('reset-run').addEventListener('click', () => { done = []; renderDag(); feedback('dag-feedback', 'Zurückgesetzt. Probiere diesmal bewusst eine andere Reihenfolge.', 'good'); });
  document.querySelectorAll('.concept-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'wrong') { feedback('concept-feedback', 'Nein: Wahlfreiheit bei unabhängigen Zwischenschritten ändert ihre Werte und Abhängigkeiten nicht. Nicht eindeutiger Ablauf bedeutet hier nicht nicht eindeutiges Ergebnis.', 'try'); return; }
    if (button.dataset.answer === 'left') { feedback('concept-feedback', 'Blockiert: Strikt links nach rechts verletzt Punkt-vor-Strich und die Klammer im Nenner. Erlaubt sind nur Reihenfolgen, die alle Abhängigkeiten respektieren.', 'try'); return; }
    feedback('concept-feedback', 'Genau: Das Ergebnis ist deterministisch (4242), der Ablauf nur partiell geordnet. Das beschreibt ein DAG.', 'good'); show('orders-step');
  }));
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  document.getElementById('finish').addEventListener('click', () => {
    completed = true; show('solution'); show('completion'); document.getElementById('reveal').hidden = true;
    document.getElementById('gate-copy').textContent = 'Ablauf und Determinismus geklärt — hier ist der vollständige Papiervergleich.';
    document.getElementById('completion').scrollIntoView({behavior:'smooth', block:'center'});
  });
  document.getElementById('reveal').addEventListener('click', () => {
    if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return;
    show('solution'); show('completion'); document.getElementById('reveal').hidden = true;
  });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert${completed ? ' — kompletter Papierweg geschafft.' : '.'}`, 'good');
  }));
})();
