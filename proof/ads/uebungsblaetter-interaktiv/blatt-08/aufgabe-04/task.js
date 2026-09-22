(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a04';
  const path = [8, 12, 10];
  let pathIndex = 0;
  let attempted = false;
  let contractDone = false;
  let deleteDone = false;
  let deleteStage = 0;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const markAttempt = () => { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Schließe die drei Schritte ab oder vergleiche bewusst mit den Verträgen.'; };
  const unlock = () => {
    if (!(pathIndex === path.length && contractDone && deleteDone)) return;
    show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Pointerpfad und Verträge sitzen — jetzt folgt das echte Starter-Lab.';
  };

  document.querySelectorAll('.node').forEach(node => node.addEventListener('click', () => {
    markAttempt();
    const value = Number(node.dataset.value);
    if (value !== path[pathIndex]) {
      feedback('path-feedback', `Nicht ${value}: Vergleiche 11 zuerst mit ${path[pathIndex]}. Nur von diesem aktuellen Knoten darfst du links oder rechts weitergehen.`, 'try');
      node.classList.add('expected'); setTimeout(() => node.classList.remove('expected'), 700); return;
    }
    node.classList.add('visited'); pathIndex += 1;
    if (pathIndex === path.length) {
      byId('path-prompt').textContent = '10 < 11: Der rechte Link von 10 ist nullptr — dort würde 11 eingefügt.';
      feedback('path-feedback', 'Pfad 8 → 12 → 10 → rechter nullptr. Du hast Knoten verglichen, nicht den ganzen Baum abgesucht.', 'good'); show('contract-step'); unlock(); return;
    }
    byId('path-prompt').textContent = `Richtig. 11 ist ${11 < value ? 'kleiner' : 'größer'} als ${value}. Klicke den nächsten Knoten.`;
    feedback('path-feedback', 'Eine Kante weiter. Der aktuelle Pointer ist jetzt neu gesetzt.', 'good');
  }));

  document.querySelectorAll('.contract-choice').forEach(button => button.addEventListener('click', () => {
    markAttempt();
    if (button.dataset.answer === 'grow') { feedback('contract-feedback', 'Falscher Pfad: Eine Menge enthält jeden Wert höchstens einmal. Ein zweiter 10-Knoten verletzt die BST-Set-Invariante.', 'try'); return; }
    if (button.dataset.answer === 'size') { feedback('contract-feedback', 'Falscher Pfad: size zählt erreichbare verschiedene Knoten. Ohne neuen Knoten darf sie bei einem Duplikat nicht steigen.', 'try'); return; }
    contractDone = true; feedback('contract-feedback', 'Korrekt: Duplikat bedeutet keine Mutation, false und unveränderte Größe.', 'good'); show('delete-step'); unlock();
  }));

  byId('delete-tree').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    markAttempt(); const value = Number(button.dataset.delete);
    if (deleteStage === 0) {
      if (value !== 12) { feedback('delete-feedback', 'Zuerst den zu löschenden Knoten 12 lokalisieren. Noch wird keine Kante getrennt.', 'try'); return; }
      button.classList.add('selected'); deleteStage = 1; byId('reconnect-copy').textContent = '12 hat zwei Kinder: noch nicht löschen. Suche das Minimum im rechten Teilbaum.';
      feedback('delete-feedback', 'Ziel gefunden. Direktes Abtrennen würde 10 oder 14 verlieren.', 'good'); return;
    }
    if (deleteStage === 1) {
      if (value !== 14) { feedback('delete-feedback', 'Der Inorder-Nachfolger ist das kleinste Element im rechten Teilbaum von 12 — hier 14, nicht ein beliebiger Nachbar.', 'try'); return; }
      button.classList.add('replacement'); deleteStage = 2; deleteDone = true;
      byId('reconnect-copy').textContent = 'Wert 14 ersetzt 12; anschließend wird der alte 14-Knoten aus seinem Parent-Link entfernt. Beide Teilbäume bleiben erreichbar.';
      feedback('delete-feedback', 'Richtig: Ersatzwert übertragen und den nun einfachen Ersatzknoten an seiner alten Stelle reconnecten. Größe sinkt genau einmal.', 'good'); unlock();
    }
  });

  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { markAttempt(); show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Verträge wirklich aufdecken?')) return; show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
