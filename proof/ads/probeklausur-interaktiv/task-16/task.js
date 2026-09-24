(() => {
  'use strict';

  const STORAGE_KEY = 'ads-probeklausur-state-v2';
  const TASK_KEY = 'task16';
  const LETTERS = ['a', 'b', 'e', 'l', 'm', 'o', 'r', 't'];
  const bank = document.querySelector('#letter-bank');
  const sequenceOut = document.querySelector('#sequence');
  const feedback = document.querySelector('#puzzle-feedback');
  const checkButton = document.querySelector('#check');
  const undoButton = document.querySelector('#undo');
  const resetButton = document.querySelector('#reset');
  const traceStep = document.querySelector('#trace-step');
  const traceTree = document.querySelector('#trace-tree');
  const traceNote = document.querySelector('#trace-note');
  const traceCount = document.querySelector('#trace-count');
  const solution = document.querySelector('#solution');
  const reveal = document.querySelector('#reveal');
  let order = [];
  let trace = [];
  let traceIndex = 0;
  let strategyChosen = false;

  function storageRead() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (_) { return {}; }
  }

  function storageWrite(value) {
    const state = storageRead();
    state[TASK_KEY] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clone(node) {
    return { keys: [...node.keys], children: node.children.map(clone) };
  }

  function splitChild(parent, index) {
    const full = parent.children[index];
    const middle = full.keys[1];
    const left = { keys: [full.keys[0]], children: [] };
    const right = { keys: [full.keys[2]], children: [] };
    if (full.children.length) {
      left.children = full.children.slice(0, 2);
      right.children = full.children.slice(2);
    }
    parent.keys.splice(index, 0, middle);
    parent.children.splice(index, 1, left, right);
    return middle;
  }

  function insertNonFull(node, key, events) {
    if (!node.children.length) {
      node.keys.push(key);
      node.keys.sort();
      return;
    }
    let index = 0;
    while (index < node.keys.length && key > node.keys[index]) index += 1;
    if (node.children[index].keys.length === 3) {
      const promoted = splitChild(node, index);
      events.push(`Voller Knoten gesplittet: ${promoted} steigt zum Elternknoten auf.`);
      if (key > promoted) index += 1;
    }
    insertNonFull(node.children[index], key, events);
  }

  function buildTree(keys) {
    let root = { keys: [], children: [] };
    const states = [];
    keys.forEach((key, position) => {
      const events = [];
      if (root.keys.length === 3) {
        const oldRoot = root;
        root = { keys: [], children: [oldRoot] };
        const promoted = splitChild(root, 0);
        events.push(`Die volle Wurzel wird gesplittet: ${promoted} steigt in die neue Wurzel auf.`);
      }
      insertNonFull(root, key, events);
      states.push({
        tree: clone(root),
        note: `${position + 1}. Karte: „${key}“ eingefügt. ${events.length ? events.join(' ') : 'Kein Split nötig.'}`
      });
    });
    return { root, states };
  }

  function signature(node) {
    return `[${node.keys.join('')}]${node.children.length ? `(${node.children.map(signature).join('')})` : ''}`;
  }

  function targetReached(root) {
    return signature(root) === '[blr]([a][e][mo][t])';
  }

  function renderNode(node) {
    const subtree = document.createElement('div');
    subtree.className = 'btree-subtree';
    const nodeEl = document.createElement('div');
    nodeEl.className = 'tree-node';
    node.keys.forEach(key => {
      const span = document.createElement('span');
      span.textContent = key;
      nodeEl.append(span);
    });
    subtree.append(nodeEl);
    if (node.children.length) {
      const children = document.createElement('div');
      children.className = 'btree-children';
      node.children.forEach(child => children.append(renderNode(child)));
      subtree.append(children);
    }
    return subtree;
  }

  function showTrace(index) {
    traceIndex = Math.max(0, Math.min(index, trace.length - 1));
    const state = trace[traceIndex];
    traceTree.replaceChildren(renderNode(state.tree));
    traceNote.textContent = state.note;
    traceCount.textContent = `Zug ${traceIndex + 1} / ${trace.length}`;
    document.querySelector('#trace-prev').disabled = traceIndex === 0;
    document.querySelector('#trace-next').disabled = traceIndex === trace.length - 1;
  }

  function renderBank() {
    bank.replaceChildren();
    LETTERS.forEach(letter => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'letter-card';
      button.textContent = letter;
      button.setAttribute('aria-label', `Buchstabe ${letter} einfügen`);
      button.disabled = order.includes(letter);
      button.addEventListener('click', () => {
        order.push(letter);
        renderBank();
        updateControls();
      });
      bank.append(button);
    });
  }

  function updateControls() {
    sequenceOut.textContent = order.length ? order.join(' → ') : 'Noch leer';
    undoButton.disabled = !order.length;
    resetButton.disabled = !order.length;
    checkButton.disabled = order.length !== LETTERS.length;
  }

  function setStrategy(value) {
    strategyChosen = true;
    document.querySelectorAll('[data-strategy]').forEach(button => {
      button.classList.toggle('selected', button.dataset.strategy === value);
      button.setAttribute('aria-pressed', String(button.dataset.strategy === value));
    });
    const box = document.querySelector('#strategy-feedback');
    box.className = 'feedback show';
    if (value === 'guess') {
      box.classList.add('try');
      box.innerHTML = '<strong>Genau diese Falle blockieren wir.</strong> Der fertige Baum verrät nicht, wann ein Knoten voll war. Ohne Splitmechanik kann eine plausibel aussehende Reihenfolge einen völlig anderen Baum erzeugen.';
    } else {
      box.classList.add('good');
      box.innerHTML = '<strong>Ja.</strong> Die Wurzelschlüssel sind Spuren früherer Splits. Lege jetzt Karten; der Simulator zeigt dir jeden Aufstieg.';
    }
    document.querySelector('#puzzle-step').classList.remove('is-locked');
  }

  document.querySelectorAll('[data-strategy]').forEach(button => {
    button.addEventListener('click', () => setStrategy(button.dataset.strategy));
  });

  undoButton.addEventListener('click', () => {
    order.pop();
    feedback.textContent = '';
    traceStep.hidden = true;
    renderBank();
    updateControls();
  });

  resetButton.addEventListener('click', () => {
    order = [];
    feedback.textContent = '';
    traceStep.hidden = true;
    renderBank();
    updateControls();
  });

  checkButton.addEventListener('click', () => {
    if (!strategyChosen) setStrategy('split');
    const result = buildTree(order);
    trace = result.states;
    traceStep.hidden = false;
    showTrace(trace.length - 1);
    feedback.className = 'feedback show';
    if (targetReached(result.root)) {
      feedback.classList.add('good');
      feedback.innerHTML = `<strong>Treffer.</strong> <code>${order.join('')}</code> erzeugt exakt [b l r] mit [a], [e], [m o], [t]. Öffne im Trace die Splitzüge und formuliere dann deinen Prüfungssatz.`;
      revealSolution('Dein Versuch stimmt — hier ist der kompakte Musterweg dazu.');
    } else if (order.join('') === 'abelmort' || order.join('') === LETTERS.join('')) {
      feedback.classList.add('try');
      feedback.innerHTML = '<strong>Alphabetisch wirkt plausibel, baut aber nicht den Zielbaum.</strong> Die Einfügereihenfolge muss volle Knoten genau so entstehen lassen, dass b, dann l und dann r aufsteigen. Gehe im Trace zu den Splitzügen zurück.';
    } else if (order.slice(0, 3).some(letter => ['b', 'l', 'r'].includes(letter))) {
      feedback.classList.add('try');
      feedback.innerHTML = '<strong>Nicht nur die Zielwurzel zuerst legen.</strong> b, l und r sollen durch Splits aufsteigen. Prüfe im Trace: Welcher mittlere Schlüssel wurde bei jedem vollen Knoten befördert?';
    } else {
      feedback.classList.add('try');
      feedback.innerHTML = '<strong>Noch ein anderer Baum.</strong> Nutze den Trace statt optisch zu raten: Suche den ersten Split, dessen aufsteigender Buchstabe nicht b, l oder r zur passenden Zeit ist.';
    }
    reveal.textContent = 'Musterweg jetzt vergleichen';
    traceStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('[data-hint]').forEach(button => {
    button.addEventListener('click', () => {
      const hint = document.querySelector(`#hint-${button.dataset.hint}`);
      hint.classList.toggle('show');
      button.setAttribute('aria-expanded', String(hint.classList.contains('show')));
    });
  });

  function revealSolution(message) {
    solution.hidden = false;
    reveal.hidden = true;
    if (message) {
      const note = document.createElement('p');
      note.className = 'tiny';
      note.textContent = message;
      solution.prepend(note);
    }
  }

  reveal.addEventListener('click', () => revealSolution('Bewusst freigegeben: Verfolge vor allem die drei Aufstiege b → l → r.'));
  document.querySelector('#trace-prev').addEventListener('click', () => showTrace(traceIndex - 1));
  document.querySelector('#trace-next').addEventListener('click', () => showTrace(traceIndex + 1));

  document.querySelectorAll('.state-btn').forEach(button => {
    button.addEventListener('click', () => {
      storageWrite(button.dataset.value);
      applyStatus(button.dataset.value);
    });
  });

  function applyStatus(value) {
    document.querySelectorAll('.state-btn').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.value === value));
    });
    document.querySelector('#state-feedback').textContent = value
      ? `Gespeichert: Aufgabe 16 ${value === 'sitzt' ? 'sitzt.' : 'wackelt noch.'}`
      : 'Noch nicht markiert.';
  }

  document.querySelector('#puzzle-step').classList.add('is-locked');
  renderBank();
  updateControls();
  applyStatus(storageRead()[TASK_KEY]);
})();
