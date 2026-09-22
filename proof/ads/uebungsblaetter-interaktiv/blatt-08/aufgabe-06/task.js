(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a06';
  const keys = [13, 20, 6, 15, 1, 25, 11];
  let step = 0;
  let attempted = false;
  let routeSolved = false;
  let secondSplitDone = false;
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const node = (values, changed = false) => `<div class="node${changed ? ' changed' : ''}">${values.map(v => `<span>${v}</span>`).join('')}</div>`;
  const tree = (levels, changed = []) => `<div class="tree">${levels.map((level, li) => `<div class="level">${level.map((values, ni) => node(values, changed.some(p => p[0] === li && p[1] === ni))).join('')}</div>`).join('')}</div>`;

  const sequenceStates = [
    [],
    [[[13]]],
    [[[13, 20]]],
    [[[6, 13, 20]]],
    [[[13]], [[6], [15, 20]]],
    [[[13]], [[1, 6], [15, 20]]],
    [[[13]], [[1, 6], [15, 20, 25]]],
    [[[13]], [[1, 6, 11], [15, 20, 25]]]
  ];
  const messages = [
    'Noch leer. Ein Knoten ist eine Box und enthält 1–3 geordnete Schlüssel.',
    '13 eröffnet die Wurzel. Das ist der Startknoten, noch kein Split.',
    '20 passt geordnet rechts neben 13. Keine strukturelle Änderung.',
    '6 macht die Wurzel zum vollen 4-Knoten [6|13|20]. Noch kein Split.',
    'Strukturänderung: Vor 15 wird die volle Wurzel gesplittet. 13 steigt auf; 6 und [15|20] sind Kinder.',
    '1 wird links in [6] einsortiert. Keine strukturelle Änderung.',
    '25 wird rechts in [15|20] einsortiert. Keine strukturelle Änderung.',
    '11 wird links in [1|6] einsortiert. Fertig; seit 15 entstand keine weitere Ebene.'
  ];
  function renderSequence() {
    document.querySelector('.sequence').innerHTML = keys.map((k, i) => `<span class="${i < step ? 'done' : i === step ? 'current' : ''}">${k}</span>`).join('');
    byId('next-key').textContent = step < keys.length ? keys[step] : 'fertig';
    byId('insert-next').textContent = step < keys.length ? `${keys[step]} einfügen` : 'Folge abgeschlossen';
    byId('insert-next').disabled = step >= keys.length;
    byId('sequence-tree').innerHTML = step === 0 ? '<span class="empty">leerer Baum</span>' : tree(sequenceStates[step], step === 4 ? [[0,0],[1,0],[1,1]] : []);
    byId('sequence-feedback').textContent = messages[step];
    byId('sequence-feedback').className = `feedback ${step === 4 ? 'good' : ''}`;
    byId('split-log').innerHTML = step < 4 ? '<strong>Zeichnungen fürs Blatt:</strong> Noch keine strukturelle Änderung.' : '<strong>Zeichnung fürs Blatt:</strong> Beim Einfügen von 15 entsteht eine neue Ebene. Danach gibt es keinen weiteren Split.';
    maybeUnlock();
  }

  const initialPdf = [[[7]], [[3], [11,15,23]], [[2],[5],[9],[13],[17,19,21],[25,27,29]]];
  const afterFirst = [[[7,15]], [[3],[11],[23]], [[2],[5],[9],[13],[17,19,21],[25,27,29]]];
  const afterSecond = [[[7,15]], [[3],[11],[23,27]], [[2],[5],[9],[13],[17,19,21],[25],[29]]];
  const finalTree = [[[7,15]], [[3],[11],[23,27]], [[2],[5],[9],[13],[17,19,21],[25],[29,31]]];
  byId('pdf-tree').innerHTML = tree(initialPdf);
  byId('sequence-answer').innerHTML = tree(sequenceStates[4]);
  byId('split-one-answer').innerHTML = tree(afterFirst);
  byId('final-answer').innerHTML = tree(finalTree);

  byId('insert-next').addEventListener('click', () => { if (step < keys.length) step += 1; attempted = true; renderSequence(); });
  byId('reset-sequence').addEventListener('click', () => { step = 0; renderSequence(); });
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempted = true; show(button.dataset.hint); }));

  document.querySelectorAll('[data-route]').forEach(button => button.addEventListener('click', () => {
    attempted = true;
    if (button.dataset.route === 'late') { feedback('route-feedback', 'Blockiert: Erst nach dem Abstieg zu splitten kann dich in einen bereits vollen Knoten führen. Top-down wird jeder volle Knoten auf dem Suchweg vor dem Betreten gesplittet.', 'try'); return; }
    if (button.dataset.route === 'move') { feedback('route-feedback', 'Blockiert: Schlüssel ohne Kinderbereiche zu verschieben zerstört die Suchordnung. Beim Split an 15 müssen [11] samt [9],[13] und [23] samt den größeren Teilbäumen getrennt werden.', 'try'); return; }
    routeSolved = true;
    byId('pdf-tree').innerHTML = tree(afterFirst, [[0,0],[1,1],[1,2]]);
    feedback('route-feedback', 'Korrekt: 15 steigt zur Wurzel auf. 31 liegt nun im rechten Bereich von [23] – dort wartet noch das volle Blatt [25|27|29].', 'good');
    show('continue-31');
    maybeUnlock();
  }));
  byId('continue-31').addEventListener('click', () => {
    secondSplitDone = true;
    byId('pdf-tree').innerHTML = tree(finalTree, [[1,2],[2,6]]);
    byId('continue-31').hidden = true;
    feedback('route-feedback', '27 steigt in den Elternknoten: [23|27]. Danach passt 31 geordnet in das rechte Blatt [29|31].', 'good');
    maybeUnlock();
  });

  function unlock() {
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Freigeschaltet: Beide Splitmechaniken wurden durchlaufen.';
  }
  function maybeUnlock() { if (step === keys.length && routeSolved && secondSplitDone) unlock(); }
  byId('reveal').addEventListener('click', () => {
    if (!attempted && !window.confirm('Noch kein Versuch. Musterweg wirklich aufdecken?')) return;
    show('solution'); byId('solution').hidden = false; show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Bewusst aufgedeckt: Vergleiche jeden Split mit den geordneten Kinderbereichen.';
  });
  const originalUnlock = unlock;
  unlock = function () { originalUnlock(); byId('solution').hidden = false; };

  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state));
    feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
  renderSequence();
})();
