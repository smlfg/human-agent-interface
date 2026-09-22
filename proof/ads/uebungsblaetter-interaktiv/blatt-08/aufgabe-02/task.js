(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a02';
  const $ = (selector) => document.querySelector(selector);
  const compare = (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' });
  const clone = (node) => node ? { key: node.key, left: clone(node.left), right: clone(node.right) } : null;
  let letters = [], operations = [], snapshots = [], cursor = 0;
  let orderOK = false, deleteOK = false;

  function normalize(value) { return Array.from(value.toLocaleUpperCase('de')).filter(char => /\p{L}/u.test(char)); }
  function insert(root, key) {
    if (!root) return { root: { key, left: null, right: null }, changed: true };
    const relation = compare(key, root.key);
    if (relation === 0) return { root, changed: false };
    const branch = relation < 0 ? 'left' : 'right';
    const result = insert(root[branch], key);
    root[branch] = result.root;
    return { root, changed: result.changed };
  }
  function remove(root, key) {
    if (!root) return { root: null, changed: false, twoChildren: false };
    const relation = compare(key, root.key);
    if (relation !== 0) {
      const branch = relation < 0 ? 'left' : 'right';
      const result = remove(root[branch], key);
      root[branch] = result.root;
      return { root, changed: result.changed, twoChildren: result.twoChildren };
    }
    if (!root.left) return { root: root.right, changed: true, twoChildren: false };
    if (!root.right) return { root: root.left, changed: true, twoChildren: false };
    let successor = root.right;
    while (successor.left) successor = successor.left;
    root.key = successor.key;
    root.right = remove(root.right, successor.key).root;
    return { root, changed: true, twoChildren: true };
  }
  function escaped(text) { return text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }

  function prepare() {
    letters = normalize($('#name-input').value);
    if (!letters.length) { $('#sequence').textContent = 'Bitte mindestens einen Buchstaben eingeben.'; $('#gate').hidden = true; return; }
    const seen = new Set();
    $('#sequence').innerHTML = letters.map(char => {
      const id = char.toLocaleUpperCase('de'); const duplicate = seen.has(id); seen.add(id);
      return `<span class="key${duplicate ? ' duplicate' : ''}" title="${duplicate ? 'Duplikat: wird nicht erneut eingefügt' : 'wird eingefügt'}">${escaped(char)}</span>`;
    }).join('');
    const sorted = [...letters].sort(compare);
    $('#order-choices').innerHTML = `<button class="choice" type="button" data-order="given">${escaped(letters.join(' → '))}</button><button class="choice" type="button" data-order="sorted">${escaped(sorted.join(' → '))}</button>`;
    orderOK = deleteOK = false;
    $('#open-trace').disabled = true;
    $('#gate-feedback').hidden = true;
    $('#gate').hidden = false;
    $('#trainer').hidden = true; $('#solution').hidden = true; $('#completion').hidden = true;
  }

  $('#prepare').addEventListener('click', prepare);
  $('#order-choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-order]'); if (!button) return;
    $('#order-choices').querySelectorAll('.choice').forEach(el => el.classList.remove('selected'));
    if (button.dataset.order === 'sorted') {
      gateFeedback('Blockiert: Alphabetisch vorsortiert erzeugt einen anderen, oft entarteten Baum. Die Namensreihenfolge bestimmt die Form.', 'try'); orderOK = false;
    } else { button.classList.add('selected'); orderOK = true; gateFeedback('Richtig: eingefügt wird exakt von links nach rechts aus dem Namen.', 'good'); }
    updateGate();
  });
  document.querySelector('[data-delete-rule="drop"]').addEventListener('click', () => {
    deleteOK = false; gateFeedback('Blockiert: Ein Unterbaum darf nicht verloren gehen. Der Inorder-Nachfolger übernimmt, alle übrigen Knoten werden wieder korrekt verknüpft.', 'try'); updateGate();
  });
  document.querySelector('[data-delete-rule="relink"]').addEventListener('click', (event) => {
    document.querySelectorAll('[data-delete-rule]').forEach(el => el.classList.remove('selected')); event.currentTarget.classList.add('selected');
    deleteOK = true; gateFeedback('Richtig: Ersatzschlüssel einsetzen, danach den ursprünglichen Nachfolger entfernen — ohne Unterbaumverlust.', 'good'); updateGate();
  });
  function gateFeedback(message, kind) { const out = $('#gate-feedback'); out.textContent = message; out.className = `feedback ${kind}`; out.hidden = false; }
  function updateGate() { $('#open-trace').disabled = !(orderOK && deleteOK); }

  function buildTrace() {
    let root = null; operations = []; snapshots = [];
    letters.forEach(key => {
      const result = insert(root, key); root = result.root;
      operations.push({ phase: 'EINFÜGEN', key, changed: result.changed, twoChildren: false }); snapshots.push(clone(root));
    });
    letters.forEach(key => {
      const result = remove(root, key); root = result.root;
      operations.push({ phase: 'LÖSCHEN', key, changed: result.changed, twoChildren: result.twoChildren }); snapshots.push(clone(root));
    });
    cursor = 0; $('#tree').innerHTML = '<div class="empty-tree">Leerer Startbaum</div>'; $('#operation').textContent = 'Bereit: Der erste Buchstabe wird zur Wurzel.';
    $('#progress').textContent = `0 / ${operations.length}`; $('#phase').textContent = 'EINFÜGEN'; $('#trainer').hidden = false;
    $('#next-step').disabled = false; $('#next-step').textContent = 'Nächsten Schritt zeigen';
    $('#trainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  $('#open-trace').addEventListener('click', buildTrace);

  $('#next-step').addEventListener('click', () => {
    if (cursor >= operations.length) return;
    const op = operations[cursor]; $('#phase').textContent = op.phase; $('#instruction').textContent = `${op.phase === 'EINFÜGEN' ? 'Füge' : 'Lösche'} ${op.key}`;
    $('#tree').innerHTML = drawTree(snapshots[cursor]);
    const verb = op.phase === 'EINFÜGEN' ? 'insert' : 'delete';
    $('#operation').textContent = !op.changed ? `${verb}(${op.key}) ist ein No-op: Der identische Schlüssel ist ${op.phase === 'EINFÜGEN' ? 'schon vorhanden' : 'bereits entfernt'}.` : op.twoChildren ? `delete(${op.key}): Zwei-Kinder-Fall. Inorder-Nachfolger eingesetzt; kein Unterbaum geht verloren.` : `${verb}(${op.key}) ausgeführt.`;
    cursor += 1; $('#progress').textContent = `${cursor} / ${operations.length}`;
    if (cursor === operations.length) finish();
  });

  function drawTree(root) {
    if (!root) return '<div class="empty-tree">∅ — leerer Baum</div>';
    const ordered = []; (function inorder(node, depth = 0) { if (!node) return; inorder(node.left, depth + 1); ordered.push({ node, depth }); inorder(node.right, depth + 1); })(root);
    const positions = new Map(); ordered.forEach((entry, index) => positions.set(entry.node, { x: 55 + index * (590 / Math.max(1, ordered.length - 1)), y: 38 + entry.depth * 68 }));
    const edges = []; (function collect(node) { if (!node) return; const p = positions.get(node); [node.left, node.right].forEach(child => { if (child) { const c = positions.get(child); edges.push(`<line x1="${p.x}" y1="${p.y + 20}" x2="${c.x}" y2="${c.y - 20}"/>`); collect(child); } }); })(root);
    const nodes = ordered.map(({ node }) => { const p = positions.get(node); return `<g><circle cx="${p.x}" cy="${p.y}" r="21"/><text x="${p.x}" y="${p.y}">${escaped(node.key)}</text></g>`; }).join('');
    return `<svg class="tree-svg" viewBox="0 0 700 330" role="img" aria-label="Aktueller binärer Suchbaum, Wurzel oben">${edges.join('')}${nodes}</svg>`;
  }
  function ascii(root, prefix = '', label = '') {
    if (!root) return label ? `${prefix}${label}∅\n` : '∅';
    let out = `${prefix}${label}${root.key}\n`;
    if (root.left || root.right) { out += ascii(root.left, `${prefix}  `, 'L─'); out += ascii(root.right, `${prefix}  `, 'R─'); }
    return out;
  }
  function finish() {
    $('#next-step').disabled = true; $('#next-step').textContent = 'Trace vollständig'; $('#phase').textContent = 'FERTIG';
    $('#operation').textContent += ' Abschluss erreicht: Der letzte Baum ist leer.';
    $('#timeline').innerHTML = snapshots.map((root, index) => { const op = operations[index]; const noOp = op.changed ? '' : ' · No-op'; return `<article class="snapshot${index === snapshots.length - 1 ? ' final' : ''}"><h3>${index + 1}. ${op.phase === 'EINFÜGEN' ? '+' : '−'} ${escaped(op.key)}${noOp}</h3><pre>${escaped(ascii(root))}</pre></article>`; }).join('');
    $('#solution').hidden = false; $('#completion').hidden = false; $('#solution').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => {
    if (!$('#paper-proof').checked) { $('#state-feedback').textContent = 'Hake zuerst den Papiervergleich ab.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
  prepare();
})();
