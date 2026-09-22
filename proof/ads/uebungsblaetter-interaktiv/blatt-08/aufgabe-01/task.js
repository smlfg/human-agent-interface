(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a01';
  const $ = (selector) => document.querySelector(selector);

  const snapshots = [
    { label: 'Start', root: null },
    { label: '+ 13', root: [13] },
    { label: '+ 7', root: [13, [7]] },
    { label: '+ 12', root: [13, [7, null, [12]]] },
    { label: '+ 17', root: [13, [7, null, [12]], [17]] },
    { label: '+ 3', root: [13, [7, [3], [12]], [17]] },
    { label: '+ 21', root: [13, [7, [3], [12]], [17, null, [21]]] },
    { label: '+ 9', root: [13, [7, [3], [12, [9]]], [17, null, [21]]] },
    { label: '+ 19', root: [13, [7, [3], [12, [9]]], [17, null, [21, [19]]]] },
    { label: '+ 14', root: [13, [7, [3], [12, [9]]], [17, [14], [21, [19]]]] },
    { label: '− 7 (Nachfolger 9)', root: [13, [9, [3], [12]], [17, [14], [21, [19]]]] },
    { label: '− 13 (Nachfolger 14)', root: [14, [9, [3], [12]], [17, null, [21, [19]]]] }
  ];

  const steps = [
    { prompt: 'Welche vollständige Einfügefolge erzeugt den geforderten BST?', correct: 'insert', choices: [['insert', '13, 7, 12, 17, 3, 21, 9, 19, 14'], ['sorted', '3, 7, 9, 12, 13, 14, 17, 19, 21']], wrong: 'Die sortierte Folge entartet zu einer Rechtskette. Beim BST bestimmt die vorgegebene Reihenfolge die Form.' },
    { prompt: '7 hat zwei Kinder. Wie löschst du 7 nach unserer festen Regel?', correct: 'succ7', choices: [['drop7', '7 samt beiden Unterbäumen entfernen'], ['random7', 'Beliebigen Ersatzschlüssel wählen'], ['succ7', 'Inorder-Nachfolger 9 einsetzen']], wrong: 'Blockiert: Beim Löschen dürfen die Unterbäume nicht verschwinden und der Ersatz ist nicht beliebig. Nimm das Minimum im rechten Unterbaum: 9.' },
    { prompt: '13 hat zwei Kinder. Wie löschst du anschließend 13 konsistent?', correct: 'succ13', choices: [['pred13', 'Diesmal Vorgänger 12 wählen'], ['succ13', 'Inorder-Nachfolger 14 einsetzen'], ['drop13', '13 samt Unterbäumen entfernen']], wrong: 'Bleib bei derselben Regel: Minimum im rechten Unterbaum. Für 13 ist das 14. Ein Regelwechsel oder Entfernen der Unterbäume ist kein konsistenter Löschtrace.' }
  ];

  let stage = 0;
  function feedback(message, kind) {
    const out = $('#feedback');
    out.textContent = message;
    out.className = `feedback ${kind}`;
    out.hidden = false;
  }

  function drawTree(root) {
    if (!root) return '<div class="empty-tree">Leerer Baum — beginne mit der Wurzel 13</div>';
    const nodes = [], edges = [];
    function walk(node, x, y, spread) {
      if (!node) return;
      nodes.push({ value: node[0], x, y });
      [[node[1], x - spread], [node[2], x + spread]].forEach(([child, childX]) => {
        if (child) { edges.push({ x1: x, y1: y + 21, x2: childX, y2: y + 69 }); walk(child, childX, y + 90, Math.max(34, spread * .53)); }
      });
    }
    walk(root, 400, 34, 190);
    return `<svg class="tree-svg" viewBox="0 0 800 320" role="img" aria-label="Binärer Suchbaum">${edges.map(e => `<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"/>`).join('')}${nodes.map(n => `<g><circle cx="${n.x}" cy="${n.y}" r="22"/><text x="${n.x}" y="${n.y}">${n.value}</text></g>`).join('')}</svg>`;
  }

  function render() {
    const step = steps[stage];
    $('#phase').textContent = stage === 0 ? 'EINFÜGEN' : 'LÖSCHEN';
    $('#instruction').textContent = stage === 0 ? 'Baue den Baum auf' : `Lösche ${stage === 1 ? '7' : '13'}`;
    $('#progress').textContent = stage === 0 ? '9 Einfügungen' : `${9 + stage} / 11 Operationen`;
    $('#prompt').textContent = step.prompt;
    $('#tree').innerHTML = drawTree(snapshots[stage === 0 ? 0 : stage === 1 ? 9 : 10].root);
    $('#choices').innerHTML = step.choices.map(([value, label]) => `<button class="choice" type="button" data-answer="${value}">${label}</button>`).join('');
    $('#feedback').hidden = true;
  }

  $('#choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (!button) return;
    const step = steps[stage];
    if (button.dataset.answer !== step.correct) { feedback(step.wrong, 'try'); return; }
    if (stage === 0) feedback('Richtig aufgebaut. Kontrolliere jetzt den ersten Zwei-Kinder-Fall: delete(7).', 'good');
    if (stage === 1) feedback('Richtig: 9 übernimmt die Position von 7; 3 und 12 bleiben erhalten.', 'good');
    stage += 1;
    if (stage < steps.length) { window.setTimeout(render, 550); return; }
    $('#tree').innerHTML = drawTree(snapshots[11].root);
    $('#choices').innerHTML = '';
    $('#phase').textContent = 'FERTIG';
    $('#instruction').textContent = 'Beide Löschungen sind konsistent';
    $('#progress').textContent = '11 / 11 Operationen';
    $('#prompt').textContent = '14 ist die neue Wurzel; alle übrigen Schlüssel erfüllen weiterhin die BST-Ordnung.';
    feedback('Gate geöffnet: Inorder-Nachfolger zweimal korrekt angewandt.', 'good');
    showSolution();
  });

  function ascii(root, prefix = '', side = '') {
    if (!root) return '';
    let text = `${prefix}${side}${root[0]}\n`;
    if (root[1] || root[2]) {
      text += root[1] ? ascii(root[1], `${prefix}  `, 'L─') : `${prefix}  L─∅\n`;
      text += root[2] ? ascii(root[2], `${prefix}  `, 'R─') : `${prefix}  R─∅\n`;
    }
    return text;
  }

  function showSolution() {
    $('#timeline').innerHTML = snapshots.slice(1).map(s => `<article class="snapshot"><h3>${s.label}</h3><pre>${ascii(s.root)}</pre></article>`).join('');
    $('#solution').hidden = false;
    $('#completion').hidden = false;
    $('#solution').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.hidden = !hint.hidden;
      button.setAttribute('aria-expanded', String(!hint.hidden));
    });
  });

  document.querySelectorAll('[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!$('#paper-proof').checked) { $('#state-feedback').textContent = 'Hake zuerst den Papiervergleich ab.'; return; }
      let state = {};
      try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
      state[FIELD] = button.dataset.state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    });
  });

  render();
})();
