(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb03a06';
  const HARDWARE = 1e9;
  let attempted = false;
  let deltaDone = false;
  let doubleDone = false;
  let polynomialDone = false;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const markAttempt = () => { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Schließe die drei Wachstumsvergleiche ab oder vergleiche bewusst mit dem Musterweg.'; };
  const maybeComplete = () => {
    if (!(deltaDone && doubleDone && polynomialDone)) return;
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Alle drei Wachstumsvergleiche geschafft — hier ist der vollständige Papierabschluss.';
  };

  document.querySelector('[data-question="speedup"]').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt();
    if (button.dataset.answer !== 'billion') { feedback('speedup-feedback', 'Multipliziere alle drei unabhängigen Faktoren: 10³ · 10³ · 10³. Die Exponenten werden addiert.', 'try'); return; }
    feedback('speedup-feedback', 'Richtig: 10³ · 10³ · 10³ = 10⁹. Jetzt übersetzt du diesen Arbeitsfaktor in zusätzliches n.', 'good');
    show('growth-step'); updateMeter();
  });

  const updateMeter = () => {
    const delta = Number(byId('delta').value);
    const work = 2 ** delta;
    byId('delta-output').value = delta;
    byId('meter-fill').style.width = `${Math.min(100, work / HARDWARE * 100)}%`;
    byId('growth-readout').textContent = `2^${delta} = ${work.toLocaleString('de-DE')} · Hardwarebudget: 1.000.000.000${work <= HARDWARE ? ' ✓' : ' — zu groß'}`;
  };
  byId('delta').addEventListener('input', () => { markAttempt(); updateMeter(); });
  byId('solve-delta').addEventListener('click', () => {
    markAttempt();
    const delta = Math.log2(HARDWARE);
    feedback('delta-feedback', `Δn = log₂(10⁹) = ${delta.toFixed(3)}. Also n ≈ 89,897; für ganzzahliges n ist 89 maximal, denn 2³⁰ > 10⁹.`, 'good');
    deltaDone = true; show('double-step'); maybeComplete();
  });

  document.querySelectorAll('.double-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'linear') { feedback('double-feedback', 'Falscher Pfad: n zu verdoppeln verdoppelt die Zeit nur bei linearer Laufzeit. Bei 2ⁿ ist der Faktor 2^(120−60)=2⁶⁰.', 'try'); return; }
    if (button.dataset.answer === 'missing-hardware') { feedback('double-feedback', 'Der Wachstumsfaktor 2⁶⁰ stimmt, aber diese Zeit wäre für den alten Rechner. Der neue Rechner teilt sie durch seinen Speedup 10⁹.', 'try'); return; }
    const days = 2 * (2 ** 60) / HARDWARE;
    feedback('double-feedback', `Korrekt: 2 Tage · 2⁶⁰ / 10⁹ ≈ ${days.toLocaleString('de-DE', {maximumFractionDigits: 0})} Tage, also rund 6,31 Millionen Jahre.`, 'good');
    doubleDone = true; show('polynomial-step'); maybeComplete();
  }));

  byId('check-poly').addEventListener('click', () => {
    markAttempt();
    if (Number(byId('poly-answer').value) !== 64) { feedback('poly-feedback', 'Falscher Pfad: Auch n⁶ skaliert nicht linear. Erst den Eingabequotienten 120/60=2 bilden, dann die sechste Potenz nehmen.', 'try'); return; }
    feedback('poly-feedback', 'Richtig: 2⁶=64. Etwas über 2 Tage · 64 ergibt etwas über 128 Tage auf dem alten Rechner.', 'good');
    polynomialDone = true; maybeComplete();
  });

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Möchtest du die vollständige Lösung wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
