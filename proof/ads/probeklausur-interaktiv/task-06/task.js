(() => {
  'use strict';
  const STORE = 'ads-probeklausur-state-v2';
  const terms = [
    { name: 'f', expression: '1 + 2n + 3n + 4', options: ['Θ(1)', 'Θ(n)', 'Θ(n²)'], answer: 'Θ(n)', result: 'f(n) = 5n + 5', hint1: 'Fasse zuerst Konstanten und n-Terme getrennt zusammen.', hint2: '2n + 3n = 5n; 1 + 4 = 5.', wrong: 'Nicht nach der längsten Schreibweise urteilen: Gleichartige Terme zusammenfassen. Übrig bleibt ein linearer n-Term.' },
    { name: 'g', expression: '(1+n)(2+n) − 3n', options: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)'], answer: 'Θ(n²)', result: 'g(n) = n² + 2', hint1: 'Multipliziere jeden Term der ersten Klammer mit jedem der zweiten.', hint2: '(1+n)(2+n) = 2 + 3n + n²; danach −3n.', wrong: 'Die Klammern verdecken den Grad. Erst ausmultiplizieren: Die linearen +3n und −3n verschwinden, n² bleibt.' },
    { name: 'h', expression: '(17+n²) · log₃(n)', options: ['Θ(n²)', 'Θ(n² log n)', 'Θ(log n)'], answer: 'Θ(n² log n)', result: 'h(n) = 17log₃(n) + n²log₃(n)', hint1: 'Der Logarithmus multipliziert die ganze Klammer.', hint2: 'Von 17 und n² dominiert n²; der Faktor log₃(n) bleibt erhalten.', wrong: 'Der Logarithmus ist kein Summand, den man wegwerfen darf: Er multipliziert n² und wächst selbst weiter.' },
    { name: 'k', expression: '42 + n² + (1+n)(2−n)', options: ['Θ(n)', 'Θ(n²)', 'Θ(n³)'], answer: 'Θ(n)', result: 'k(n) = n + 44', hint1: 'Hier ist der sichtbare n²-Term eine Falle. Multipliziere die Klammern vollständig aus.', hint2: '(1+n)(2−n) = 2 + n − n²; dieses −n² löscht das äußere +n².', wrong: 'Genau die Klausurfalle: Den sichtbaren n²-Term darfst du vor dem Ausmultiplizieren nicht zum Sieger erklären; +n² und −n² löschen sich.' }
  ];
  const claims = [
    { html: 'g ∈ O(f)', answer: 'false', good: 'Falsch: g ist quadratisch und wächst damit schneller als das lineare f.', wrong: 'Mechanik: Links ist quadratisch, rechts nur linear. „Höchstens so schnell“ ist daher verletzt.' },
    { html: 'g ∈ O(f) · O(f)', answer: 'true', good: 'Wahr: linear mal linear liefert eine quadratische Schranke für das quadratische g.', wrong: 'Das Produkt rechts ist entscheidend: O(n) · O(n) = O(n²), nicht bloß O(n).' },
    { html: 'g ∈ O(h)', answer: 'true', good: 'Wahr: n² wächst höchstens so schnell wie n² log n.', wrong: 'Die Richtung zählt: Eine langsamere Funktion links darf in O(einer schnelleren Funktion) liegen.' },
    { html: 'h ∈ O(g)', answer: 'false', good: 'Falsch: Der zusätzliche Faktor log n macht h asymptotisch schneller als g.', wrong: '„Fast gleich“ reicht nicht: h/g verhält sich wie log n und bleibt nicht durch eine Konstante beschränkt.' },
    { html: 'g ∈ O(k)', answer: 'false', good: 'Falsch: Nach dem Kürzen ist k linear, g bleibt quadratisch.', wrong: 'Nicht die Rohform vergleichen: In k löschen sich +n² und −n². Damit kann lineares k das quadratische g nicht beschränken.' }
  ];
  let termIndex = 0;
  const claimAttempts = new Set();
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const feedback = (element, message, good = false) => {
    element.textContent = message;
    element.className = `feedback show ${good ? 'good' : 'try'}`;
  };

  function renderTerm() {
    const term = terms[termIndex];
    if (!term) {
      $('#term-bench').innerHTML = '<div class="term-card"><h3>Werkbank frei ✓</h3><p>Du hast alle vier Rohterme enttarnt. Jetzt darfst du Größenordnungen vergleichen.</p></div>';
      $('#claims-step').classList.add('unlocked');
      $('#claims-step').setAttribute('aria-disabled', 'false');
      $('#claims-step').querySelectorAll('button,input,textarea').forEach(control => { control.disabled = false; });
      $('#claims-step').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    $('#term-bench').innerHTML = `<article class="term-card"><div class="term-progress">Term ${termIndex + 1} von 4</div><h3>${term.name}(n) enttarnen</h3><div class="term-expression">${term.expression}</div><div class="choice-grid" role="group" aria-label="Dominanten Term für ${term.name} wählen">${term.options.map(option => `<button class="choice term-choice" data-value="${option}">${option}</button>`).join('')}</div></article>`;
    $('#term-hint').className = 'hint';
    $('#term-feedback').className = 'feedback';
    $$('.term-choice').forEach(button => button.addEventListener('click', () => checkTerm(button.dataset.value)));
  }

  function checkTerm(value) {
    const term = terms[termIndex];
    $$('.term-choice').forEach(button => { button.disabled = true; button.classList.toggle('selected', button.dataset.value === value); });
    if (value === term.answer) feedback($('#term-feedback'), `Richtig: ${term.result}, also ${term.answer}.`, true);
    else feedback($('#term-feedback'), `${term.wrong} Ergebnis: ${term.result} ∈ ${term.answer}.`);
    const next = document.createElement('button');
    next.className = 'action primary';
    next.textContent = termIndex === terms.length - 1 ? 'Zu den Aussagen →' : 'Nächsten Term öffnen →';
    next.addEventListener('click', () => { termIndex += 1; renderTerm(); });
    $('#term-feedback').append(document.createElement('br'), next);
  }

  $('#hint-one').addEventListener('click', () => {
    const term = terms[termIndex]; if (!term) return;
    $('#term-hint').textContent = term.hint1; $('#term-hint').classList.add('show'); $('#hint-one').setAttribute('aria-expanded', 'true');
  });
  $('#hint-two').addEventListener('click', () => {
    const term = terms[termIndex]; if (!term) return;
    $('#term-hint').textContent = term.hint2; $('#term-hint').classList.add('show'); $('#hint-two').setAttribute('aria-expanded', 'true');
  });

  $('#claims').innerHTML = claims.map((claim, index) => `<article class="claim" data-index="${index}"><h3>${index + 1}. <code>${claim.html}</code></h3><fieldset><legend>Deine Entscheidung</legend><label><input type="radio" name="claim-${index}" value="true"> Wahr</label><label><input type="radio" name="claim-${index}" value="false"> Falsch</label></fieldset><label for="reason-${index}">Dein Ein-Satz-Grund:</label><textarea class="answer" id="reason-${index}" placeholder="… weil …"></textarea><button class="action check-claim" data-index="${index}">Aussage prüfen</button><div class="feedback claim-feedback" aria-live="polite"></div></article>`).join('');
  $('#claims-step').querySelectorAll('button,input,textarea').forEach(control => { control.disabled = true; });
  $$('.check-claim').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.index);
    const card = $(`.claim[data-index="${index}"]`);
    const selected = card.querySelector(`input[name="claim-${index}"]:checked`);
    const reason = card.querySelector('textarea').value.trim();
    if (!selected) return feedback(card.querySelector('.claim-feedback'), 'Wähle zuerst wahr oder falsch.');
    if (!reason) return feedback(card.querySelector('.claim-feedback'), 'Schreibe noch deinen einen Begründungssatz — genau der bringt in der Klausur den Beleg.');
    claimAttempts.add(index); card.classList.add('done');
    const correct = selected.value === claims[index].answer;
    feedback(card.querySelector('.claim-feedback'), correct ? claims[index].good : claims[index].wrong, correct);
    if (claimAttempts.size === claims.length) {
      $('#finish-step').classList.add('unlocked'); $('#reveal').disabled = false;
    }
  }));

  $('#reveal').addEventListener('click', () => {
    $('#solution').hidden = false; $('#solution').focus();
  });

  const readState = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } };
  const current = readState().task06;
  if (current) {
    $('#state-feedback').textContent = `Gespeichert: ${current === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    $(`.state-btn[data-value="${current}"]`)?.classList.add('selected');
  }
  $$('.state-btn').forEach(button => button.addEventListener('click', () => {
    const state = readState(); state.task06 = button.dataset.value; localStorage.setItem(STORE, JSON.stringify(state));
    $$('.state-btn').forEach(item => item.classList.toggle('selected', item === button));
    $('#state-feedback').textContent = `Gespeichert: ${button.textContent}.`;
  }));
  renderTerm();
})();
