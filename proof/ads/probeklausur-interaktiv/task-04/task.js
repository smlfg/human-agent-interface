(() => {
  'use strict';
  const STORE = 'ads-probeklausur-state-v2';
  const cases = {
    zero: { values: [2, 0, 3], out: { f1: 6, f2: 0, f3: 0 }, note: 'Treffer: fun1 überspringt die Null; fun2 beendet sofort; fun3 addiert bei 0 kein einziges Mal und setzt prod auf 0.' },
    clean: { values: [2, 3, 5], out: { f1: 30, f2: 30, f3: 30 }, note: 'Hier stimmen alle überein: Die gerade 2 wird in fun3 als zweimalige Addition simuliert.' },
    negative: { values: [-2, 3], out: { f1: -6, f2: -6, f3: 0 }, note: 'Negativ-Falle: Bei a[i] = -2 startet j bei 0; 0 < -2 ist falsch. fun3 addiert nullmal und setzt prod auf 0.' }
  };
  let active = null;
  let opened = new Set();
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const showFeedback = (el, text, good = false) => { el.textContent = text; el.className = `feedback show ${good ? 'good' : 'try'}`; };
  const unlock = (section, controls) => { section.classList.add('unlocked'); controls.forEach(el => { el.disabled = false; }); };

  $$('.case').forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.case; opened = new Set();
    $$('.case').forEach(b => b.classList.toggle('selected', b === btn));
    $$('.machine').forEach(m => { m.disabled = false; m.classList.remove('revealed'); m.querySelector('span').textContent = '?'; m.querySelector('small').textContent = 'Spur aufdecken'; });
    showFeedback($('#trace-feedback'), `Testfall ${JSON.stringify(cases[active].values)} geladen. Öffne alle drei Maschinen.`);
  }));

  $$('.machine').forEach(machine => machine.addEventListener('click', () => {
    if (!active) return;
    const fn = machine.dataset.fn;
    machine.querySelector('span').textContent = cases[active].out[fn];
    machine.querySelector('small').textContent = 'Rückgabewert';
    machine.classList.add('revealed'); opened.add(fn);
    if (opened.size === 3) {
      showFeedback($('#trace-feedback'), cases[active].note, active !== 'zero' || cases[active].out.f1 !== cases[active].out.f2);
      unlock($('#runtime-step'), [$('#runtime-quiz'), $('#check-runtime')]);
    }
  }));

  $$('.hint-btn').forEach(btn => btn.addEventListener('click', () => {
    const hint = document.getElementById(btn.dataset.hint); hint.classList.add('show'); btn.setAttribute('aria-expanded', 'true');
  }));

  $('#check-runtime').addEventListener('click', () => {
    const answer = document.querySelector('input[name="runtime"]:checked');
    if (!answer) return showFeedback($('#runtime-feedback'), 'Wähle zuerst eine Zuordnung.');
    if (answer.value === 'alln') {
      showFeedback($('#runtime-feedback'), 'Noch nicht: fun2 kann bei der ersten Null sofort stoppen. Und fun3 hat eine innere Schleife, deren Länge vom Wert a[i] abhängt — nicht nur von n.');
    } else if (answer.value === 'zero') {
      showFeedback($('#runtime-feedback'), 'Nullbehandlung vertauscht: fun1 läuft trotz Null durch alle n Plätze; fun2 kann gerade wegen der ersten Null Θ(1) erreichen.');
    } else {
      showFeedback($('#runtime-feedback'), 'Korrekt. Du hast Abbruch und wertabhängige innere Schleife getrennt erkannt.', true);
      unlock($('#finish-step'), [$('#condition'), $('#check-condition')]);
    }
  });

  $('#check-condition').addEventListener('click', () => {
    const raw = $('#condition').value.trim().toLowerCase();
    $('#reveal').disabled = false;
    const nonzero = /ungleich\s*0|keine?\s+null|nullfrei|non.?zero|positiv/.test(raw);
    const safeEven = /positiv|gerade.{0,25}(positiv|größer)|keine.{0,20}negativ.{0,20}gerade/.test(raw);
    if (nonzero && safeEven) showFeedback($('#condition-feedback'), 'Präzise: Damit sind Null-Falle und negative gerade Werte ausgeschlossen.', true);
    else if (nonzero) showFeedback($('#condition-feedback'), 'Fast klausurnah — aber teste noch [-2, 3]: „alle ungleich 0“ allein reicht für fun3 nicht. Schließe negative gerade Werte aus (am einfachsten: alle Werte positiv).');
    else showFeedback($('#condition-feedback'), 'Die Null-Falle fehlt noch: fun1 ignoriert 0, fun2/fun3 liefern dadurch 0. Formuliere eine Bedingung, die das verhindert.');
  });

  $('#reveal').addEventListener('click', () => { $('#solution').hidden = false; $('#solution').focus?.(); });

  const readState = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } };
  const current = readState().task04;
  if (current) { $('#state-feedback').textContent = `Gespeichert: ${current === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`; $(`.state-btn[data-value="${current}"]`)?.classList.add('selected'); }
  $$('.state-btn').forEach(btn => btn.addEventListener('click', () => {
    const state = readState(); state.task04 = btn.dataset.value; localStorage.setItem(STORE, JSON.stringify(state));
    $$('.state-btn').forEach(b => b.classList.toggle('selected', b === btn)); $('#state-feedback').textContent = `Gespeichert: ${btn.textContent}.`;
  }));
})();
