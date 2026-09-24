(() => {
  'use strict';
  const STORE = 'ads-probeklausur-state-v2';
  const values = [2, -1, 3];
  let manipulated = false;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const showFeedback = (element, text, good = false) => {
    element.textContent = text;
    element.className = `feedback show ${good ? 'good' : 'try'}`;
  };

  const unlock = (section, controls) => {
    section.classList.add('unlocked');
    controls.forEach((control) => { control.disabled = false; });
  };

  const signed = (number) => number < 0 ? `−${Math.abs(number)}` : String(number);

  const render = () => {
    values.forEach((value, index) => { $(`#value-${index}`).textContent = signed(value); });
    const sum = values.reduce((total, value) => total + value, 0);
    const steps = values.reduce((total, value) => total + Math.abs(value), 0);
    $('#sum-meter').textContent = signed(sum);
    $('#sum-expression').textContent = values.map(signed).join(' + ').replace(/\+ −/g, '− ');
    $('#step-meter').textContent = String(steps);
    $('#step-expression').textContent = values.map((value) => `|${signed(value)}|`).join(' + ');
    const tape = $('#step-tape');
    tape.replaceChildren();
    if (steps === 0) {
      const tick = document.createElement('span'); tick.className = 'tick zero'; tick.textContent = 'kein ±1'; tape.append(tick);
    } else {
      values.forEach((value, index) => {
        for (let step = 0; step < Math.abs(value); step += 1) {
          const tick = document.createElement('span'); tick.className = `tick${value < 0 ? ' negative' : ''}`;
          tick.textContent = `${value < 0 ? '−1' : '+1'}₍${index}₎`; tape.append(tick);
        }
      });
    }
  };

  $$('.nudge').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.index);
    values[index] = Math.max(-9, Math.min(9, values[index] + Number(button.dataset.delta)));
    manipulated = true; render();
    showFeedback($('#array-feedback'), `n bleibt 3. Trotzdem braucht fun2 jetzt ${values.reduce((s, v) => s + Math.abs(v), 0)} innere Schritte. Genau das kann n allein nicht zeigen.`);
  }));

  $('#lock-array').addEventListener('click', () => {
    if (!manipulated) {
      showFeedback($('#array-feedback'), 'Drehe zuerst mindestens einmal an einer Zahl. Der wichtige Effekt ist: n bleibt gleich, die Arbeit von fun2 ändert sich.');
      return;
    }
    showFeedback($('#array-feedback'), 'Array gesichert. Du hast gesehen: Das Ergebnis ist die normale Summe; der Aufwand von fun2 folgt den Beträgen.', true);
    unlock($('#meaning-step'), [$('#meaning-quiz'), $('#check-meaning')]);
  });

  $$('.hint-btn').forEach((button) => button.addEventListener('click', () => {
    const hint = document.getElementById(button.dataset.hint); hint.classList.add('show'); button.setAttribute('aria-expanded', 'true');
  }));

  $('#check-meaning').addEventListener('click', () => {
    const answer = document.querySelector('input[name="meaning"]:checked');
    if (!answer) return showFeedback($('#meaning-feedback'), 'Wähle zuerst eine Aussage.');
    if (answer.value === 'different-negative') {
      showFeedback($('#meaning-feedback'), 'Negativ bedeutet nicht „anderes Ergebnis“: Die zweite while-Schleife zieht für jeden Schritt 1 von val ab. Bei −3 geschieht das dreimal — netto also −3.');
    } else if (answer.value === 'absolute') {
      showFeedback($('#meaning-feedback'), 'Die Beträge zählen nur die Arbeit. Das Vorzeichen bleibt im Ergebnis erhalten: positive Werte machen val größer, negative kleiner.');
    } else {
      showFeedback($('#meaning-feedback'), 'Korrekt: fun2 schreibt dieselbe Addition nur als viele ±1-Schritte aus.', true);
      unlock($('#size-step'), [$('#size-quiz'), $('#check-size')]);
    }
  });

  $('#check-size').addEventListener('click', () => {
    const answer = document.querySelector('input[name="size"]:checked');
    if (!answer) return showFeedback($('#size-feedback'), 'Wähle zuerst eine Laufzeitaussage.');
    if (answer.value === 'only-n') {
      showFeedback($('#size-feedback'), 'Das ist die zentrale n-Falle: Beide Beispielarrays haben n = 3, aber fun2 macht 3 versus 300 innere Schritte. n beschreibt den Wertaufwand nicht vollständig.');
    } else if (answer.value === 'quadratic') {
      showFeedback($('#size-feedback'), 'Zwei Schleifenebenen bedeuten nicht automatisch n²: Die inneren while-Schleifen laufen |a[i]|-mal, nicht n-mal. Nur mit einer zusätzlichen Schranke |a[i]| = Θ(n) entsteht Θ(n²).');
    } else {
      showFeedback($('#size-feedback'), 'Treffer: n bezahlt den Durchlauf durch das Array; Σ|a[i]| bezahlt alle ±1-Schritte.', true);
      unlock($('#finish-step'), [$('#condition'), $('#check-condition')]);
    }
  });

  $('#check-condition').addEventListener('click', () => {
    const raw = $('#condition').value.trim().toLowerCase();
    $('#reveal').disabled = false;
    const mentionsMagnitude = /gro(ß|ss)|betrag|hohe|wert|zahl|summe|koeffizient/.test(raw);
    const mentionsRuntime = /schritt|lauf|iteration|operation|oft|viele/.test(raw);
    if (mentionsMagnitude && mentionsRuntime) {
      showFeedback($('#condition-feedback'), 'Prüfungstauglich: Große Beträge verursachen in fun2 viele ±1-Operationen — unabhängig vom Vorzeichen.', true);
    } else if (mentionsMagnitude) {
      showFeedback($('#condition-feedback'), 'Richtung stimmt. Ergänze die Mechanik: Jeder Betrag |a[i]| bestimmt die Zahl der inneren Schleifendurchläufe.');
    } else {
      showFeedback($('#condition-feedback'), 'Schau nicht nur auf n. Welche Eigenschaft der Arraywerte macht das ±1-Band besonders lang?');
    }
  });

  $('#reveal').addEventListener('click', () => { $('#solution').hidden = false; $('#solution').focus(); });

  const readState = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } };
  const current = readState().task05;
  if (current) {
    $('#state-feedback').textContent = `Gespeichert: ${current === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    $(`.state-btn[data-value="${current}"]`)?.classList.add('selected');
  }
  $$('.state-btn').forEach((button) => button.addEventListener('click', () => {
    const state = readState(); state.task05 = button.dataset.value; localStorage.setItem(STORE, JSON.stringify(state));
    $$('.state-btn').forEach((candidate) => candidate.classList.toggle('selected', candidate === button));
    $('#state-feedback').textContent = `Gespeichert: ${button.textContent}.`;
  }));

  render();
})();
