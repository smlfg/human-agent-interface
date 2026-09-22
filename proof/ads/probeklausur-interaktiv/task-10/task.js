(() => {
  'use strict';
  const order = ['2', '4', '6', '8', '10', '12', '14'];
  let traceIndex = 0;
  const openedActions = new Set();
  const $ = (id) => document.getElementById(id);
  const showFeedback = (el, text, kind) => {
    el.textContent = text;
    el.className = `feedback show ${kind}`;
  };
  const unlock = (el) => { el.hidden = false; el.classList.remove('locked'); el.removeAttribute('aria-disabled'); };

  document.querySelectorAll('[data-start]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-start]').forEach((b) => b.classList.toggle('selected', b === button));
    if (button.dataset.start === 'left') {
      showFeedback($('startFeedback'), 'Genau. Zeile für Zeile: erst left vollständig bearbeiten, dann td(el), dann right.', 'good');
      unlock($('traceStep'));
      $('traceStep').scrollIntoView({behavior: 'smooth', block: 'start'});
    } else if (button.dataset.start === 'self') {
      showFeedback($('startFeedback'), 'Das wäre Preorder: Wurzel zuerst. Inorder führt vor td(el) zuerst den kompletten linken Aufruf aus.', 'try');
    } else {
      showFeedback($('startFeedback'), 'Rechts kommt erst nach der Aktion am aktuellen Knoten. Lies die drei Zeilen top-down: left → td(el) → right.', 'try');
    }
  }));

  document.querySelectorAll('.hintBtn').forEach((button) => button.addEventListener('click', () => {
    const hint = $(button.dataset.hint);
    hint.classList.add('show');
    button.setAttribute('aria-expanded', 'true');
  }));

  document.querySelectorAll('.node').forEach((node) => node.addEventListener('click', () => {
    const value = node.dataset.node;
    if (value === order[traceIndex]) {
      node.classList.add('done'); node.disabled = true; traceIndex += 1;
      $('traceOutput').textContent = order.slice(0, traceIndex).join(' ');
      const next = document.querySelector(`[data-node="${order[traceIndex]}"]`);
      if (next) { $('avatar').style.left = `${next.offsetLeft}px`; $('avatar').style.top = `${Math.max(0, next.offsetTop - 48)}px`; }
      if (traceIndex === order.length) {
        showFeedback($('traceFeedback'), 'Inorder vollständig: Der Zahlenwert steigt hier nur deshalb, weil dieser Beispielbaum ein Suchbaum ist. Die Mechanik war immer left → ich → right.', 'good');
        unlock($('codeStep'));
      } else showFeedback($('traceFeedback'), `Richtig. ${value} ist verarbeitet. Jetzt den noch nicht verarbeiteten Knoten wählen, den der Code als Nächstes erreicht.`, 'good');
    } else {
      node.classList.remove('wrong'); void node.offsetWidth; node.classList.add('wrong');
      const expected = order[traceIndex];
      const rootGuess = value === '8' && traceIndex === 0;
      showFeedback($('traceFeedback'), rootGuess ? 'Du hast die Wurzel optisch zuerst genommen. Das wäre Preorder. Der Code steigt vor td(8) über left bis ganz nach links ab.' : `${value} ist noch nicht dran. Folge nicht der Größe oder Nähe: Der nächste ausgeführte td-Aufruf trifft Knoten ${expected}.`, 'try');
    }
  }));

  $('checkCode').addEventListener('click', () => {
    const picked = [$('line1').value, $('line2').value, $('line3').value];
    if (picked.join(',') === 'left,self,right') {
      showFeedback($('codeFeedback'), 'Skelett sitzt: linker Teilbaum, Aktion am Element, rechter Teilbaum. Dazu kommt oben nur noch der nullptr-Abbruch.', 'good');
      unlock($('actionsStep'));
    } else if (new Set(picked).size < 3) {
      showFeedback($('codeFeedback'), 'Eine Zeile fehlt oder ist doppelt. Jede Rolle kommt genau einmal vor: linker Aufruf, Aktion, rechter Aufruf.', 'try');
    } else if (picked[0] === 'self') {
      showFeedback($('codeFeedback'), 'td(el) zuerst wäre Preorder. Inorder muss den linken rekursiven Aufruf vollständig beenden, bevor es das eigene Element verarbeitet.', 'try');
    } else {
      showFeedback($('codeFeedback'), 'Fast. Lies die Reihenfolge mechanisch: left → td(el) → right. Nicht anhand des Traversierungsnamens raten.', 'try');
    }
  });

  document.querySelectorAll('.action-card').forEach((card) => card.addEventListener('click', () => {
    openedActions.add(card.dataset.action); card.classList.add('opened'); card.setAttribute('aria-pressed', 'true');
    if (openedActions.size === 2) {
      showFeedback($('actionsFeedback'), 'Genau: Derselbe Rundgang, aber austauschbare Aktion. showt liest; add1t verändert dank T& den echten Knotenwert.', 'good');
      unlock($('finishStep'));
    } else showFeedback($('actionsFeedback'), 'Eine Aktion verstanden. Öffne noch die zweite: Die Traversierung selbst ändert sich nicht.', 'good');
  }));

  const normalize = (s) => s.trim().replace(/[;,]+/g, ' ').replace(/\s+/g, ' ');
  $('checkFinish').addEventListener('click', () => {
    $('revealSolution').disabled = false;
    const before = normalize($('before').value), after = normalize($('after').value);
    const okBefore = before === '2 4 6 8 10 12 14';
    const okAfter = after === '3 5 7 9 11 13 15';
    if (okBefore && okAfter) showFeedback($('finishFeedback'), 'Prüfungsabschluss korrekt. showt liefert Inorder; add1t erhöht jeden Knoten; der zweite showt-Aufruf beweist die Änderung.', 'good');
    else if (!okBefore && before.startsWith('8')) showFeedback($('finishFeedback'), 'Die erste Zeile beginnt mit der Wurzel: Das ist wieder Preorder. Führe left vor td(el) wirklich bis zum nullptr-Abbruch aus.', 'try');
    else if (okBefore) showFeedback($('finishFeedback'), 'Die Inorder-Zeile stimmt. Beim zweiten Lauf wird jeder einzelne Wert — auch 14 — exakt um 1 erhöht.', 'try');
    else showFeedback($('finishFeedback'), 'Noch nicht mechanisch vollständig. Nutze exakt deine grüne Klickfolge als erste Zeile; addiere danach zu jedem Eintrag 1.', 'try');
  });
  $('revealSolution').addEventListener('click', () => { $('fullSolution').hidden = false; $('revealSolution').textContent = 'Musterweg ist geöffnet'; });

  const storageKey = 'ads-probeklausur-state-v2';
  const readState = () => { try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; } };
  const saved = readState().task10;
  if (saved) document.querySelector(`[data-value="${saved}"]`)?.classList.add('active');
  document.querySelectorAll('.state-btn').forEach((button) => button.addEventListener('click', () => {
    const state = readState(); state.task10 = button.dataset.value; localStorage.setItem(storageKey, JSON.stringify(state));
    document.querySelectorAll('.state-btn').forEach((b) => b.classList.toggle('active', b === button));
    showFeedback($('stateFeedback'), `Gespeichert: Aufgabe 10 ${button.dataset.value}.`, 'good');
  }));
})();
