(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb02a01';
  let attempted = false;
  let current = null;
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };

  const calculate = words => {
    const started = performance.now();
    const initials = Array(26).fill(0);
    let letters = 0, longest = 0, shortest = words.length ? words[0].length : 0;
    words.forEach(word => {
      letters += word.length;
      longest = Math.max(longest, word.length);
      shortest = Math.min(shortest, word.length);
      const first = word[0]?.toUpperCase();
      if (first >= 'A' && first <= 'Z') initials[first.charCodeAt(0) - 65] += 1;
    });
    const elapsed = performance.now() - started;
    return { count: words.length, letters, longest, shortest, initials, elapsed };
  };
  const render = result => {
    const labels = [['Wörter', result.count], ['Buchstaben', result.letters], ['Längstes', result.longest], ['Kürzestes', result.shortest]];
    byId('stats').innerHTML = labels.map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join('');
    byId('timing').textContent = `Berechnung: ${result.elapsed.toFixed(3)} ms (vor Rendering gestoppt)`;
    byId('alphabet').innerHTML = result.initials.map((value, i) => `<span class="letter"><b>${String.fromCharCode(65 + i)}</b><span>${value}</span></span>`).join('');
  };
  const unlock = () => { show('solution'); show('completion'); byId('reveal').hidden = true; byId('gate-copy').textContent = 'Fixture belegt — übertrage jetzt denselben Datenweg in das C++-Lab.'; };

  byId('analyze').addEventListener('click', () => {
    attempted = true;
    const words = byId('words').value.trim() ? byId('words').value.trim().split(/\s+/) : [];
    current = calculate(words); render(current); show('result-step');
    feedback('analysis-feedback', words.length ? 'Berechnet. Trage jetzt deine erwarteten Werte ein.' : 'Leere Liste: In diesem Lab gilt shortest = 0. Welche Initialen dürfen gezählt werden?', 'good');
  });
  byId('check-fixture').addEventListener('click', () => {
    if (!current) return;
    const count = Number(byId('guess-count').value);
    const letters = Number(byId('guess-letters').value);
    const match = byId('guess-range').value.match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
    if (count !== current.count || letters !== current.letters || !match || Number(match[1]) !== current.longest || Number(match[2]) !== current.shortest) {
      feedback('fixture-feedback', 'Noch nicht: Zähle jedes Zeichen der Wörter; Leerzeichen gehören nicht dazu. Bei Gleichstand bleibt nur die Länge relevant.', 'try'); return;
    }
    feedback('fixture-feedback', `Belegt: ${current.count} Wörter, ${current.letters} Buchstaben, Längen ${current.longest}/${current.shortest}. A und a landen beide im Feld A.`, 'good'); unlock();
  });
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempted = true; show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Codegerüst wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state)); feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
