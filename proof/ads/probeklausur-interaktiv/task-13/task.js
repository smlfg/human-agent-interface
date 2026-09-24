(() => {
  'use strict';

  const STORAGE_KEY = 'ads-probeklausur-state-v2';
  const TASK_KEY = 'task13';
  const expected = {
    fun1: '4 3 2 1 1 2 1 1 3 2 1 1 2 1 1',
    fun2: '1 2 1 3 1 2 1 4 1 2 1 3 1 2 1'
  };

  const loadState = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (_) { return {}; }
  };
  const state = loadState();
  const taskState = (state[TASK_KEY] && typeof state[TASK_KEY] === 'object')
    ? state[TASK_KEY]
    : { status: typeof state[TASK_KEY] === 'string' ? state[TASK_KEY] : '' };
  state[TASK_KEY] = taskState;
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const showFeedback = (element, kind, html) => {
    element.className = `feedback show ${kind}`;
    element.innerHTML = html;
  };
  const unlock = (element) => {
    element.classList.remove('locked');
    element.removeAttribute('aria-disabled');
    element.querySelectorAll('button, input, textarea').forEach((control) => { control.disabled = false; });
  };
  const normalizeSequence = (value) => (value.match(/\d+/g) || []).join(' ');

  let expanded = new Set();
  let treeFinished = false;
  const tree = $('#tree');

  const buildNode = (n, path) => {
    const item = document.createElement('li');
    item.className = 'tree-node';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `node-button${n === 1 ? ' leaf' : ''}${expanded.has(path) ? ' expanded' : ''}`;
    button.textContent = String(n);
    button.setAttribute('aria-label', n === 1 ? `Aufruf ${path}: Basisfall N gleich 1` : `Aufruf ${path}: N gleich ${n}, zwei Kinder ${expanded.has(path) ? 'sichtbar' : 'auffalten'}`);
    if (n === 1) button.disabled = true;
    button.addEventListener('click', () => {
      expanded.add(path);
      renderTree();
    });
    item.append(button);
    if (n > 1 && expanded.has(path)) {
      const children = document.createElement('ul');
      children.className = 'tree-list';
      children.append(buildNode(n - 1, `${path}L`), buildNode(n - 1, `${path}R`));
      item.append(children);
    }
    return item;
  };

  const visibleCount = () => {
    let count = 1;
    expanded.forEach((path) => {
      if (path.length <= 3) count += 2;
    });
    return count;
  };

  const renderTree = () => {
    const root = document.createElement('ul');
    root.className = 'tree-list';
    root.append(buildNode(4, 'R'));
    tree.replaceChildren(root);
    const count = visibleCount();
    $('#call-meter').textContent = `${count} sichtbare${count === 1 ? 'r' : ''} Aufruf${count === 1 ? '' : 'e'}`;
    if (count === 15 && !treeFinished) {
      treeFinished = true;
      showFeedback($('#tree-feedback'), 'good', '<strong>Baum komplett:</strong> 15 sichtbare Knoten. Jetzt entscheidest du, an welcher Stelle jeder Knoten ausgegeben wird.');
      unlock($('#reading-step'));
      $('#reading-step').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  $('#expand-all').addEventListener('click', () => {
    ['R', 'RL', 'RR', 'RLL', 'RLR', 'RRL', 'RRR'].forEach((path) => expanded.add(path));
    renderTree();
  });
  $('#reset-tree').addEventListener('click', () => {
    expanded = new Set();
    treeFinished = false;
    renderTree();
    $('#tree-feedback').className = 'feedback';
  });
  renderTree();

  const solvedOrders = new Set();
  $$('[data-order]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('.choices');
      group.querySelectorAll('.choice').forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
      const value = button.dataset.order;
      const correct = value === 'fun1-pre' || value === 'fun2-in';
      if (correct) solvedOrders.add(value.startsWith('fun1') ? 'fun1' : 'fun2');
      if (value === 'fun1-depth') {
        showFeedback($('#order-feedback'), 'try', '<strong>Das ist die Tiefen-Falle.</strong> Die Tiefe beschreibt nur einen Weg. Beide rekursiven Zeilen werden ausgeführt; deshalb müssen auch beide Teilbäume vollständig gelesen werden.');
      } else if (correct) {
        showFeedback($('#order-feedback'), 'good', `<strong>Genau.</strong> ${value === 'fun1-pre' ? 'fun1 druckt den Knoten beim Betreten — vor beiden Kindern.' : 'fun2 druckt erst nach dem linken und vor dem rechten Kind.'}`);
      } else {
        showFeedback($('#order-feedback'), 'try', '<strong>Noch einmal die Zeilenposition ansehen:</strong> Bei fun2 steht die Ausgabe zwischen den beiden rekursiven Aufrufen.');
      }
      if (solvedOrders.size === 2) unlock($('#count-step'));
    });
  });

  $$('[data-count]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-count]').forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
      const value = Number(button.dataset.count);
      if (value === 15) {
        showFeedback($('#count-feedback'), 'good', '<strong>Ja: 15.</strong> Du zählst alle Knoten: <code>1 + 2 + 4 + 8</code>. Allgemein ergibt die geometrische Summe <code>2<sup>N</sup>−1</code>.');
        unlock($('#finish-step'));
        ['fun1-output', 'fun2-output', 'count-4', 'count-10'].forEach((id) => { $(`#${id}`).disabled = false; });
        $('#check-finish').disabled = false;
      } else if (value === 4) {
        showFeedback($('#count-feedback'), 'try', '<strong>4 ist nur die Rekursionstiefe.</strong> Auf jeder Tiefe liegen mehrere Aufrufe: <code>1, 2, 4, 8</code>. Die Funktion führt beide Kinder aus, nicht nur einen Pfad.');
      } else {
        showFeedback($('#count-feedback'), 'try', '<strong>8 zählt nur die Basisfälle.</strong> Auch die Aufrufe mit <code>N=4, 3 und 2</code> sind echte Funktionsaufrufe. Addiere alle Ebenen.');
      }
    });
  });

  $$('.hint-button').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = $(`#${button.dataset.hint}`);
      hint.classList.toggle('show');
      button.setAttribute('aria-expanded', String(hint.classList.contains('show')));
    });
  });

  const fields = {
    fun1: $('#fun1-output'), fun2: $('#fun2-output'), count4: $('#count-4'), count10: $('#count-10')
  };
  Object.entries(fields).forEach(([name, field]) => {
    field.value = taskState.answers?.[name] || '';
    field.addEventListener('input', () => {
      taskState.answers = taskState.answers || {};
      taskState.answers[name] = field.value;
      save();
    });
  });

  let attemptedFinish = false;
  let revealArmed = false;
  $('#check-finish').addEventListener('click', () => {
    attemptedFinish = true;
    const checks = {
      fun1: normalizeSequence(fields.fun1.value) === expected.fun1,
      fun2: normalizeSequence(fields.fun2.value) === expected.fun2,
      count4: Number(fields.count4.value.trim()) === 15,
      count10: Number(fields.count10.value.trim()) === 1023
    };
    const wrong = Object.entries(checks).filter(([, okay]) => !okay).map(([name]) => name);
    if (!wrong.length) {
      showFeedback($('#finish-feedback'), 'good', '<strong>Prüfungsabschluss vollständig.</strong> Beide Ausgaben stimmen; <code>15 = 2⁴−1</code> und <code>1023 = 2¹⁰−1</code>.');
    } else {
      const messages = [];
      if (wrong.includes('fun1')) messages.push('<code>fun1</code>: Beginne jeden Teilbaum mit dessen Wurzel.');
      if (wrong.includes('fun2')) messages.push('<code>fun2</code>: Schreibe die Wurzel erst zwischen linkem und rechtem Teilbaum.');
      if (wrong.includes('count4')) messages.push('<code>N=4</code>: Zähle alle Ebenen, nicht nur Tiefe oder Blätter.');
      if (wrong.includes('count10')) messages.push('<code>N=10</code>: Setze in <code>2ᴺ−1</code> ein.');
      showFeedback($('#finish-feedback'), 'try', `<strong>${4 - wrong.length}/4 Teile stimmen.</strong><br>${messages.join('<br>')}`);
    }
    $('#reveal-solution').textContent = 'Vollständigen Musterweg zeigen';
    $('#solution-note').textContent = 'Dein Versuch ist gespeichert. Du darfst jetzt mit dem vollständigen Musterweg abgleichen.';
  });

  $('#reveal-solution').addEventListener('click', (event) => {
    if (!attemptedFinish && !revealArmed) {
      revealArmed = true;
      event.currentTarget.textContent = 'Ja, Musterweg ohne Versuch öffnen';
      $('#solution-note').textContent = 'Noch ein Klick öffnet bewusst die Lösung. Du kannst stattdessen erst oben einen eigenen Versuch eintragen.';
      return;
    }
    $('#solution').hidden = false;
    $('#solution').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  const restoreStatus = () => {
    const status = taskState.status || '';
    $$('.state-btn').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.value === status)));
    if (status) $('#state-feedback').textContent = `Gespeichert: ${status}.`;
  };
  $$('.state-btn').forEach((button) => {
    button.addEventListener('click', () => {
      taskState.status = button.dataset.value;
      save();
      restoreStatus();
    });
  });
  restoreStatus();
})();
