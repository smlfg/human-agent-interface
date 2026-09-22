(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb05a03';
  const $ = (selector) => document.querySelector(selector);
  let addReady = false;
  let signsReady = false;
  let measureReady = false;
  const show = (el, message, kind) => { el.textContent = message; el.className = `feedback ${kind}`; el.hidden = false; };

  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => {
    const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden));
  }));
  document.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.add === 'loop') { show($('#add-feedback'), 'Blockiert: --m macht eine negative Zahl noch negativer. Die Rekursion entfernt sich von 0 und endet nicht.', 'try'); return; }
    if (button.dataset.add === 'stuck') { show($('#add-feedback'), 'Noch falsch: Beide Werte zu erhöhen verändert die Summe. Der Ausgleich muss in Gegenrichtung laufen.', 'try'); return; }
    addReady = true; show($('#add-feedback'), 'Richtig: ++m nähert sich 0, --n hält die Summe invariant. Damit ist der fehlende negative add-Fall klar.', 'good'); $('#sign-step').hidden = false;
  }));
  $('#check-signs').addEventListener('click', () => {
    signsReady = [...document.querySelectorAll('[data-rule]')].every((select) => select.value === 'ok');
    if (!signsReady) { show($('#sign-feedback'), 'Mindestens ein Weg läuft von 0 weg oder verliert das Vorzeichen. Prüfe bei jedem Schritt: Wird der Betrag des Steuerparameters kleiner?', 'try'); return; }
    show($('#sign-feedback'), 'Alle Vorzeichenpfade terminieren an 0 und erhalten die gewünschte Operation.', 'good'); $('#lab-step').hidden = false; $('#measure-step').hidden = false;
  });
  document.querySelectorAll('[data-measure]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.measure !== 'correct') { show($('#measure-feedback'), 'Blockiert: In [−x..x] liegen 2x+1 Werte, also werden (2x+1)² geordnete Paare gemessen — noch bevor Rekursionsarbeit zählt.', 'try'); return; }
    measureReady = true; show($('#measure-feedback'), 'Genau: Laufzeitkurven der Gesamtschleife sind nicht direkt die Kosten eines einzelnen add- oder mult-Aufrufs.', 'good'); $('#completion').hidden = false;
  }));
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (!addReady || !signsReady || !measureReady || !$('#tests-pass').checked) { $('#state-feedback').textContent = 'Noch gesperrt: Vorzeichenpfade, Messdeutung und echter Testlauf gehören zusammen.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
