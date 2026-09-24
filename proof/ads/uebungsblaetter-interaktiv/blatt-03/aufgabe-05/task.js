(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb03a05';
  const values = [4, 7, 2, 7];
  const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]];
  let pairIndex = 0;
  let attempted = false;
  let traceDone = false;
  let casesDone = false;
  let sortedDone = false;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const markAttempt = () => { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Schließe beide Fallentscheidungen ab oder vergleiche bewusst mit dem Musterweg.'; };
  const maybeComplete = () => {
    if (!(traceDone && casesDone && sortedDone)) return;
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Trace und beide Laufzeitentscheidungen geschafft — hier ist der vollständige Papiervergleich.';
  };
  const renderArray = () => {
    byId('trace-array').innerHTML = values.map((value, index) => `<span data-index="${index}"><small>${index}</small>${value}</span>`).join('');
  };

  document.querySelector('[data-question="first"]').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt();
    if (button.dataset.pair !== '0-1') { feedback('first-feedback', 'Die äußere Schleife startet mit i=0. Die innere setzt j=i+1, also j=1. Erst danach wandert j nach rechts.', 'try'); return; }
    feedback('first-feedback', 'Richtig: zuerst a[0] mit a[1]. Jetzt gehst du die tatsächliche Vergleichsreihenfolge ab.', 'good');
    renderArray(); show('trace-step');
  });

  byId('next-comparison').addEventListener('click', () => {
    markAttempt();
    const [i, j] = pairs[pairIndex];
    document.querySelectorAll('#trace-array span').forEach(cell => { cell.className = ''; });
    const left = document.querySelector(`#trace-array [data-index="${i}"]`); const right = document.querySelector(`#trace-array [data-index="${j}"]`);
    left.className = 'active-i'; right.className = 'active-j';
    const equal = values[i] === values[j];
    byId('comparison').textContent = `a[${i}] = ${values[i]}  ${equal ? '==' : '!='}  a[${j}] = ${values[j]}`;
    const item = document.createElement('li'); item.textContent = `(${i},${j}): ${values[i]} ${equal ? '=' : '≠'} ${values[j]}${equal ? ' → return true' : ''}`; byId('trace-log').append(item);
    if (equal) {
      left.classList.add('match'); right.classList.add('match'); byId('next-comparison').disabled = true;
      feedback('trace-feedback', 'Treffer bei (1,3): return true beendet den Algorithmus sofort. Spätere Paare werden nicht mehr geprüft.', 'good');
      traceDone = true; show('cases-step'); return;
    }
    pairIndex += 1;
    feedback('trace-feedback', j < values.length - 1 ? 'Ungleich: j wandert für dasselbe i eine Position weiter.' : 'Ungleich und j ist am Ende: danach erhöht sich i; j startet wieder bei i+1.', 'try');
  });

  document.querySelectorAll('.case-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'linear') { feedback('cases-feedback', 'Falscher Pfad: Best Case ist nicht pauschal O(n). Bei a[0]==a[1] greift return true schon nach dem ersten Vergleich — Θ(1).', 'try'); return; }
    if (button.dataset.answer === 'always') { feedback('cases-feedback', 'Zwei verschachtelte Schleifen bestimmen den Worst Case, aber der frühe Rücksprung kann schon im ersten inneren Durchlauf stoppen.', 'try'); return; }
    feedback('cases-feedback', 'Korrekt: Worst n(n−1)/2 Vergleiche = Θ(n²); Best genau ein Vergleich = Θ(1).', 'good'); casesDone = true; show('sorted-step'); maybeComplete();
  }));

  document.querySelectorAll('.sorted-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'pairs') { feedback('sorted-feedback', 'Falscher Pfad: Wer trotz Sortierung alle Paare vergleicht, verschenkt die Ordnung und bleibt quadratisch. Gleiche Werte müssen Nachbarn sein.', 'try'); return; }
    if (button.dataset.answer === 'ends') { feedback('sorted-feedback', 'Nur die Enden reichen nicht: Das Duplikat 4,4 liegt in der Mitte. Prüfe jedes benachbarte Paar.', 'try'); return; }
    feedback('sorted-feedback', 'Genau: höchstens n−1 Nachbarvergleiche, also Θ(n) im Worst Case. Ein frühes Nachbar-Duplikat kann weiterhin sofort stoppen.', 'good'); sortedDone = true; maybeComplete();
  }));

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
