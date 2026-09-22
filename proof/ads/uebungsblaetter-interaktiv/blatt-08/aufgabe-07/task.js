(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb08a07';
  const $ = s => document.querySelector(s);
  const cmp = (a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' });
  const clone = n => n ? { keys: [...n.keys], children: n.children.map(clone) } : null;
  const node = (keys = [], children = []) => ({ keys, children });
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let letters = [], events = [], cursor = 0, ruleOK = false, underflowOK = false;

  function normalize(value) { return Array.from(value.toLocaleUpperCase('de')).filter(c => /\p{L}/u.test(c)); }
  function has(root, key) { let n = root; while (n) { let i = 0; while (i < n.keys.length && cmp(key, n.keys[i]) > 0) i++; if (i < n.keys.length && cmp(key, n.keys[i]) === 0) return true; n = n.children[i]; } return false; }
  function log(kind, phase, title, detail, root, structural = false) { events.push({ kind, phase, title, detail, root: clone(root), structural }); }
  function splitChild(parent, i, phase, key) {
    const full = parent.children[i], middle = full.keys[1];
    const left = node([full.keys[0]], full.children.length ? full.children.slice(0, 2) : []);
    const right = node([full.keys[2]], full.children.length ? full.children.slice(2) : []);
    parent.keys.splice(i, 0, middle); parent.children.splice(i, 1, left, right);
    log('split', phase, `Split vor ${phase === 'EINFÜGEN' ? '+' : '−'} ${key}`, `${middle} steigt in die Elternbox auf; links und rechts bleiben 2-3-4-Knoten.`, currentRoot, true);
  }
  let currentRoot = null;
  function insert(key) {
    if (has(currentRoot, key)) { log('noop', 'EINFÜGEN', `+ ${key} · No-op`, 'Duplikat: Der Schlüssel ist bereits gespeichert.', currentRoot); return; }
    if (!currentRoot) { currentRoot = node([key]); log('insert', 'EINFÜGEN', `+ ${key}`, `${key} wird Wurzel.`, currentRoot); return; }
    if (currentRoot.keys.length === 3) {
      currentRoot = node([], [currentRoot]); splitChild(currentRoot, 0, 'EINFÜGEN', key);
    }
    let n = currentRoot;
    while (n.children.length) {
      let i = 0; while (i < n.keys.length && cmp(key, n.keys[i]) > 0) i++;
      if (n.children[i].keys.length === 3) { splitChild(n, i, 'EINFÜGEN', key); if (cmp(key, n.keys[i]) > 0) i++; }
      n = n.children[i];
    }
    let i = 0; while (i < n.keys.length && cmp(key, n.keys[i]) > 0) i++; n.keys.splice(i, 0, key);
    log('insert', 'EINFÜGEN', `+ ${key}`, `${key} wird sortiert in die Blattbox eingesetzt.`, currentRoot);
  }
  function borrowLeft(parent, i, key) {
    const child = parent.children[i], sib = parent.children[i - 1];
    child.keys.unshift(parent.keys[i - 1]); parent.keys[i - 1] = sib.keys.pop();
    if (sib.children.length) child.children.unshift(sib.children.pop());
    log('borrow', 'LÖSCHEN', `Leihen vor − ${key}`, 'Vom linken Geschwister rotiert ein Schlüssel über die Elternbox ins Zielkind.', currentRoot, true);
  }
  function borrowRight(parent, i, key) {
    const child = parent.children[i], sib = parent.children[i + 1];
    child.keys.push(parent.keys[i]); parent.keys[i] = sib.keys.shift();
    if (sib.children.length) child.children.push(sib.children.shift());
    log('borrow', 'LÖSCHEN', `Leihen vor − ${key}`, 'Vom rechten Geschwister rotiert ein Schlüssel über die Elternbox ins Zielkind.', currentRoot, true);
  }
  function merge(parent, i, key) {
    const left = parent.children[i], right = parent.children[i + 1];
    left.keys.push(parent.keys.splice(i, 1)[0], ...right.keys); left.children.push(...right.children); parent.children.splice(i + 1, 1);
    if (parent === currentRoot && parent.keys.length === 0) currentRoot = left;
    log('merge', 'LÖSCHEN', `Merge vor − ${key}`, 'Zwei 1-Schlüssel-Kinder und der Trennschlüssel werden zu einer 3-Schlüssel-Box.', currentRoot, true);
    return left;
  }
  function maxKey(n) { while (n.children.length) n = n.children[n.children.length - 1]; return n.keys[n.keys.length - 1]; }
  function minKey(n) { while (n.children.length) n = n.children[0]; return n.keys[0]; }
  function removeFrom(n, key) {
    let i = 0; while (i < n.keys.length && cmp(key, n.keys[i]) > 0) i++;
    if (i < n.keys.length && cmp(key, n.keys[i]) === 0) {
      if (!n.children.length) { n.keys.splice(i, 1); return true; }
      if (n.children[i].keys.length >= 2) { const pred = maxKey(n.children[i]); n.keys[i] = pred; return removeFrom(n.children[i], pred); }
      if (n.children[i + 1].keys.length >= 2) { const succ = minKey(n.children[i + 1]); n.keys[i] = succ; return removeFrom(n.children[i + 1], succ); }
      const joined = merge(n, i, key); return removeFrom(joined, key);
    }
    if (!n.children.length) return false;
    let child = n.children[i];
    if (child.keys.length === 1) {
      if (i > 0 && n.children[i - 1].keys.length >= 2) borrowLeft(n, i, key);
      else if (i < n.children.length - 1 && n.children[i + 1].keys.length >= 2) borrowRight(n, i, key);
      else if (i < n.children.length - 1) child = merge(n, i, key);
      else { child = merge(n, i - 1, key); i--; }
    }
    return removeFrom(child, key);
  }
  function remove(key) {
    if (!currentRoot || !has(currentRoot, key)) { log('noop', 'LÖSCHEN', `− ${key} · No-op`, 'Der Schlüssel ist nicht mehr im Baum.', currentRoot); return; }
    removeFrom(currentRoot, key);
    if (currentRoot && currentRoot.keys.length === 0) currentRoot = currentRoot.children[0] || null;
    log('delete', 'LÖSCHEN', `− ${key}`, currentRoot ? `${key} ist entfernt; alle Knoten haben weiterhin 1–3 Schlüssel.` : `${key} ist entfernt. Der Baum ist leer.`, currentRoot);
  }
  function buildEvents() { events = []; currentRoot = null; letters.forEach(insert); letters.forEach(remove); }

  function levels(root) { const out = []; if (!root) return out; let q = [root]; while (q.length) { out.push(q); q = q.flatMap(n => n.children); } return out; }
  function draw(root) { if (!root) return '<div class="empty-tree">∅ — leerer 2-3-4-Baum</div>'; return `<div class="tree">${levels(root).map(level => `<div class="tree-level">${level.map(n => `<div class="node234" aria-label="Knoten ${esc(n.keys.join(', '))}">${n.keys.map(k => `<span>${esc(k)}</span>`).join('')}</div>`).join('')}</div>`).join('')}</div>`; }
  function ascii(root, depth = 0) { if (!root) return '∅'; let out = `${'  '.repeat(depth)}[${root.keys.join(' | ')}]\n`; root.children.forEach(c => { out += ascii(c, depth + 1); }); return out; }

  function prepare() {
    letters = normalize($('#name-input').value); if (!letters.length) { $('#sequence').textContent = 'Bitte mindestens einen Buchstaben eingeben.'; $('#gate').hidden = true; return; }
    const seen = new Set(); $('#sequence').innerHTML = letters.map(c => { const duplicate = seen.has(c); seen.add(c); return `<span class="key${duplicate ? ' duplicate' : ''}" title="${duplicate ? 'Duplikat-No-op' : 'wird eingefügt'}">${esc(c)}</span>`; }).join('');
    ruleOK = underflowOK = false; $('#start').disabled = true; $('#gate-feedback').hidden = true; $('#gate').hidden = false; $('#trainer').hidden = true; $('#solution').hidden = true; $('#completion').hidden = true;
    document.querySelectorAll('.choice').forEach(b => b.classList.remove('selected'));
  }
  function feedback(text, kind) { const out = $('#gate-feedback'); out.textContent = text; out.className = `feedback ${kind}`; out.hidden = false; }
  function updateGate() { $('#start').disabled = !(ruleOK && underflowOK); }
  $('#prepare').addEventListener('click', prepare);
  document.querySelector('[data-rule="bst"]').addEventListener('click', () => { ruleOK = false; feedback('Blockiert: Eine 2-3-4-Box hat bis zu drei Schlüssel und daher bis zu vier Werteintervalle. Die binäre Links/Rechts-Regel reicht nicht.', 'try'); updateGate(); });
  document.querySelector('[data-rule="interval"]').addEventListener('click', e => { ruleOK = true; e.currentTarget.classList.add('selected'); feedback('Richtig: Die sortierten Schlüssel einer Box bestimmen das passende Kindintervall.', 'good'); updateGate(); });
  document.querySelector('[data-underflow="ignore"]').addEventListener('click', () => { underflowOK = false; feedback('Blockiert: Löschen aus einem 1-Schlüssel-Kind könnte einen leeren Nicht-Wurzel-Knoten erzeugen. Vor dem Abstieg leihen oder mergen.', 'try'); updateGate(); });
  document.querySelector('[data-underflow="repair"]').addEventListener('click', e => { underflowOK = true; e.currentTarget.classList.add('selected'); feedback('Richtig: Top-down wird das Zielkind vor dem Abstieg auf mindestens zwei Schlüssel gebracht.', 'good'); updateGate(); });
  $('#start').addEventListener('click', () => { buildEvents(); cursor = 0; $('#tree').innerHTML = '<div class="empty-tree">∅ — leerer Startbaum</div>'; $('#event-title').textContent = 'Leerer Startbaum'; $('#operation').textContent = 'Bereit: Wir fügen in Namensreihenfolge ein.'; $('#progress').textContent = `0 / ${events.length}`; $('#trainer').hidden = false; $('#next-step').disabled = false; $('#next-step').textContent = 'Nächsten Mikroschritt zeigen'; $('#trainer').scrollIntoView({behavior:'smooth',block:'start'}); });
  $('#next-step').addEventListener('click', () => { if (cursor >= events.length) return; const e = events[cursor++]; $('#phase').textContent = e.phase; $('#event-title').textContent = e.title; $('#tree').innerHTML = draw(e.root); $('#operation').textContent = e.detail; $('#progress').textContent = `${cursor} / ${events.length}`; if (cursor === events.length) finish(); });
  function finish() { $('#next-step').disabled = true; $('#next-step').textContent = 'Trace vollständig'; $('#phase').textContent = 'FERTIG'; const structural = events.filter(e => e.structural); $('#timeline').innerHTML = [...structural, events[events.length - 1]].map((e, i, arr) => `<article class="snapshot${i === arr.length - 1 ? ' final' : ''}"><h3>${esc(e.title)}</h3><pre>${esc(ascii(e.root))}</pre></article>`).join(''); $('#solution').hidden = false; $('#completion').hidden = false; $('#solution').scrollIntoView({behavior:'smooth',block:'start'}); }
  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => { const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden)); }));
  document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => { if (!$('#paper-proof').checked) { $('#state-feedback').textContent = 'Hake zuerst den Papiervergleich ab.'; return; } let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) {} state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`; }));
  prepare();
})();
