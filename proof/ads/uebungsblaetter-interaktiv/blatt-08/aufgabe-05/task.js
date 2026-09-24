(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a05';
  let attempted = false;
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const unlock = () => { show('venn-step'); show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden = true; byId('gate-copy').textContent = 'Richtung sitzt: Nur is1 wird mit is1 \\ is2 überschrieben.'; };

  document.querySelectorAll('.result-choice').forEach(button => button.addEventListener('click', () => {
    attempted = true;
    if (button.dataset.answer === 'reverse') { feedback('result-feedback', 'Falscher Pfad: {3} wäre B \\ A. Die Signatur verlangt is1 := is1 \\ is2.', 'try'); return; }
    if (button.dataset.answer === 'symmetric') { feedback('result-feedback', 'Falscher Pfad: {1, 3} ist die symmetrische Differenz. Gesucht sind nur Elemente aus A, die nicht in B liegen.', 'try'); return; }
    feedback('result-feedback', 'Korrekt: 2 und 4 liegen in B und werden nur aus A entfernt. B bleibt {2, 3, 4}.', 'good'); unlock();
  }));

  const copies = {
    union: ['Vereinigung: links, Mitte und rechts werden in is1 übernommen.', 'is1 = {1, 2, 3, 4}'],
    intersect: ['Schnitt: Nur die Überlappung bleibt in is1.', 'is1 = {2, 4}'],
    difference: ['Differenz: Nur der Teil von is1 außerhalb is2 bleibt.', 'is1 = {1}']
  };
  document.querySelectorAll('.op').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.op').forEach(item => item.classList.toggle('active', item === button));
    const op = button.dataset.op; byId('venn').dataset.op = op; byId('op-copy').textContent = copies[op][0]; byId('after-is1').textContent = copies[op][1];
  }));
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempted = true; show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Vertrag wirklich aufdecken?')) return; unlock(); });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state)); feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
