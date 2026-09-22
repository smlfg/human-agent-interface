(() => {
  'use strict';
  const STORAGE_KEY = 'ads-probeklausur-state-v2';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const feedback = (element, text, good = false) => {
    element.textContent = text;
    element.className = `feedback show ${good ? 'good' : 'try'}`;
  };
  const unlock = (element) => {
    element.classList.remove('locked');
    element.removeAttribute('aria-disabled');
  };

  $$('.hint-button').forEach((button) => button.addEventListener('click', () => {
    document.getElementById(button.dataset.hint).classList.add('show');
  }));

  $$('#alphabet-choices .choice').forEach((button) => button.addEventListener('click', () => {
    $$('#alphabet-choices .choice').forEach((item) => item.classList.toggle('selected', item === button));
    if (button.dataset.value === 'right') {
      feedback($('#alphabet-feedback'), 'Richtig: zwei Feldzugriffe entlang von Zeigern — Liste → erster Knoten → Nachfolger.', true);
      unlock($('#pointer-step'));
      $('.line-choice').focus();
    } else if (button.dataset.value === 'node') {
      feedback($('#alphabet-feedback'), 'Der gespeicherte Wert steht im Feld ele. Das Feld next enthält dagegen den Zeiger zum nächsten Knoten.');
    } else {
      feedback($('#alphabet-feedback'), 'Der Pfeil ist kein Rechenoperator. Lies ihn als „folge dem Zeiger und öffne dieses Feld“.');
    }
  }));

  const safeOrder = ['save', 'advance', 'delete'];
  let pointerTrace = [];
  const renderTrace = () => {
    const labels = {save: 'todel zeigt jetzt auf den alten Kopf 7.', advance: 'head folgt next und zeigt jetzt auf 18.', delete: 'Der alte, nun abgehängte Knoten 7 wird freigegeben.'};
    $('#trace-log').innerHTML = pointerTrace.length ? pointerTrace.map((line) => `<li>${labels[line]}</li>`).join('') : '<li>Noch keine Zeile ausgeführt.</li>';
    $$('.line-choice').forEach((button) => button.classList.toggle('used', pointerTrace.includes(button.dataset.line)));
  };
  $$('.line-choice').forEach((button) => button.addEventListener('click', () => {
    const line = button.dataset.line;
    if (line === 'overwrite') {
      feedback($('#pointer-feedback'), 'Restliste verloren: head war der einzige Einstieg. Nach head = nullptr sind 7, 18 und 43 nicht mehr erreichbar — ein Speicherleck.');
      return;
    }
    const expected = safeOrder[pointerTrace.length];
    if (line !== expected) {
      const messages = {
        advance: 'Noch nicht: Wenn head weiterzieht, brauchst du vorher todel als Griff auf den alten Kopf; sonst kannst du genau diesen Knoten nicht mehr löschen.',
        delete: pointerTrace.length ? 'Noch nicht: Vor delete muss head bereits auf den Nachfolger zeigen. Sonst wäre der Zugriff head->next danach ein Zugriff auf freigegebenen Speicher.' : 'Noch nicht: Sichere zuerst den Knoten in todel und den Restweg über head.',
        save: 'todel ist schon gesichert. Jetzt darf head dem next-Zeiger folgen.'
      };
      feedback($('#pointer-feedback'), messages[line]);
      return;
    }
    pointerTrace.push(line);
    renderTrace();
    if (pointerTrace.length === safeOrder.length) {
      feedback($('#pointer-feedback'), 'Sicher: alter Kopf gesichert → head weitergeschoben → alten Knoten gelöscht. Genau diese Reihenfolge wiederholt clear.', true);
      unlock($('#operation-step'));
      $('[data-op="back17"]').focus();
    } else {
      feedback($('#pointer-feedback'), pointerTrace.length === 1 ? 'Gesichert. Jetzt darfst du head verändern.' : 'Restliste ist über head erreichbar. Jetzt darf todel gelöscht werden.', true);
    }
  }));
  $('#reset-trace').addEventListener('click', () => { pointerTrace = []; renderTrace(); feedback($('#pointer-feedback'), 'Zurückgesetzt. Erst sichern, dann verschieben, dann löschen.'); });

  const labValues = [];
  const operations = ['back17', 'back42', 'back666', 'front6'];
  const opValues = {back17: 17, back42: 42, back666: 666, front6: 6};
  const renderList = () => {
    $('#list-state').innerHTML = labValues.length
      ? `<span>head →</span>${labValues.map((value) => `<span class="node"><b>${value}</b><small>next</small></span>`).join('<span class="arrow">→</span>')}<span>→ null</span><span>len = ${labValues.length}</span>`
      : '<span>head → null · len = 0</span>';
  };
  $$('#operation-buttons button').forEach((button) => button.addEventListener('click', () => {
    const index = labValues.length;
    if (button.dataset.op !== operations[index]) return;
    const value = opValues[button.dataset.op];
    if (button.dataset.op === 'front6') labValues.unshift(value); else labValues.push(value);
    renderList();
    button.disabled = true;
    const next = $(`[data-op="${operations[index + 1]}"]`);
    if (next) next.disabled = false;
    $('#operation-note').innerHTML = button.dataset.op === 'front6'
      ? '<code>pushfront</code>: neuer Knoten zeigt auf den bisherigen head; danach wird er selbst head.'
      : labValues.length === 1 ? '<code>pushback</code> auf leerer Liste kann <code>pushfront</code> verwenden.' : '<code>pushback</code>: bis zum Knoten mit <code>next == nullptr</code> laufen und dort anhängen.';
  }));
  $$('#front-choices .choice').forEach((button) => button.addEventListener('click', () => {
    if (labValues.length !== 4) { feedback($('#front-feedback'), 'Führe zuerst alle vier Operationen oben aus.'); return; }
    $$('#front-choices .choice').forEach((item) => item.classList.toggle('selected', item === button));
    if (button.dataset.value === 'right') {
      feedback($('#front-feedback'), 'Richtig: Der neue Knoten übernimmt den bisherigen head als next. Erst danach zeigt head auf den neuen Knoten.', true);
      unlock($('#code-step'));
      $('[data-key="init"]').focus();
    } else if (button.dataset.value === 'lost') {
      feedback($('#front-feedback'), 'Falscher Pfad: Der neue Kopf zeigt auf nullptr. Die bisherige Liste 17 → 42 → 666 ist damit vom head aus verloren.');
    } else {
      feedback($('#front-feedback'), 'Das überschreibt nur den Wert 17 mit 6. Es entsteht kein neuer Knoten und len dürfte nicht wachsen.');
    }
  }));

  const wrongMessages = {
    init: 'Eine leere Liste hat keinen ersten Knoten: head = nullptr und len = 0.',
    clear: 'Use-after-free: Nach delete head darfst du head->next nicht mehr lesen. Erst todel sichern und head weiterschieben, dann todel löschen.',
    front: 'Mit next = nullptr würdest du beim neuen Kopf die komplette bisherige Restliste abschneiden.',
    back: 'Wenn du bis n == nullptr läufst, kannst du n->next nicht mehr setzen. Stoppe beim letzten echten Knoten: n->next == nullptr.',
    assign: 'dst->head = src->head wäre eine flache Kopie: Beide Listen teilen Knoten, und clear einer Liste macht die andere ungültig.',
    size: 'Das Feld len wird bei jeder Änderung gepflegt. Daher darf size es direkt in O(1) zurückgeben.'
  };
  $('#check-code').addEventListener('click', () => {
    const selects = $$('.code-puzzle select');
    const missing = selects.find((select) => !select.value);
    if (missing) { feedback($('#code-feedback'), 'Noch nicht vollständig. Wähle für jede Funktion genau eine Zeile.'); missing.focus(); return; }
    const wrong = selects.find((select) => select.value !== 'right');
    if (wrong) { feedback($('#code-feedback'), wrongMessages[wrong.dataset.key]); wrong.focus(); return; }
    feedback($('#code-feedback'), 'Konsistent: Restweg bleibt erreichbar, Kopien besitzen eigene Knoten, und len liefert size direkt.', true);
    unlock($('#trace-step'));
    $('#trace-five').focus();
  });

  const normalize = (value) => value.trim().replace(/[\[\],]/g, ' ').replace(/\s+/g, ' ');
  $('#check-main-trace').addEventListener('click', () => {
    const five = normalize($('#trace-five').value);
    const six = normalize($('#trace-six').value);
    const expected = '7 18 43 667 7 18 43 667';
    if (five === expected && six === expected) {
      feedback($('#main-feedback'), 'Richtig: append hängt eine tiefe Kopie von lisb an lis. liste_plus kopiert lisc und hängt lisc erneut an — beide Ausgaben haben acht Werte.', true);
      unlock($('#solution-step'));
      $('#reveal-solution').disabled = false;
      $('#reveal-solution').focus();
    } else if (five === '7 18 43 667' || six === '7 18 43 667') {
      feedback($('#main-feedback'), 'Eine Hälfte fehlt: append/plus ersetzen nicht, sondern hängen die vier Werte ein zweites Mal an.');
    } else {
      feedback($('#main-feedback'), 'Trace mechanisch: Starte mit 7 18 43 667 und kopiere die vier Quellwerte in derselben Reihenfolge ans Ende. Das gilt für beide Ausgaben.');
    }
  });

  $('#reveal-solution').addEventListener('click', () => {
    $('#solution').hidden = false;
    $('#reveal-solution').textContent = 'Komplette Lösung sichtbar';
    $('#reveal-solution').disabled = true;
  });
  $$('.state-btn').forEach((button) => button.addEventListener('click', () => {
    let state = {};
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state.task09 = button.dataset.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Aufgabe 09 ist als „${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}“ gespeichert.`;
  }));
  renderTrace();
  renderList();
})();
