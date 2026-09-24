(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb09a02';
  const $ = (s) => document.querySelector(s);
  let collisionPassed = false;

  function say(selector, text, kind) {
    const node = $(selector); node.textContent = text; node.className = `feedback ${kind}`; node.hidden = false;
  }

  $('#choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]'); if (!button) return;
    if (button.dataset.answer === 'overwrite') {
      say('#feedback', 'Blockiert: Damit wäre „agent“ nicht mehr erreichbar. Eine Kollision darf den Bucketkopf oder die alte Liste nicht vernichten.', 'try'); return;
    }
    if (button.dataset.answer === 'next') {
      say('#feedback', 'Das wäre offene Adressierung. Bei Verkettung bleibt der Hashindex 1; die Kollision lebt als weiterer Listenknoten im selben Bucket.', 'try'); return;
    }
    collisionPassed = true;
    $('#chain').innerHTML = '<b>agent · 1</b><i>→</i><b class="new">array · 1</b><i>→</i><em>nullptr</em>';
    $('#progress').textContent = 'Schritt 2 / 3';
    say('#feedback', 'Richtig: Beide Schlüssel bleiben über Bucket 1 erreichbar. Bei erneutem „agent“ wird dessen value erhöht, kein zweiter Knoten angelegt.', 'good');
    $('#pipeline').hidden = false;
    $('#pipeline').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('#max-choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-max]'); if (!button || !collisionPassed) return;
    if (button.dataset.max === 'first') {
      say('#max-feedback', 'Blockiert: Beim ersten Insert haben rot, blau und grün alle Count 1. Das spätere *val += 1 verändert die Rangfolge; ein dort eingefrorenes Maximum ist veraltet.', 'try'); return;
    }
    $('#progress').textContent = 'Schritt 3 / 3';
    say('#max-feedback', 'Richtig: Nach dem Zählen liefert die Iteratorrunde rot · 3, blau · 2, grün · 1. Jetzt ist das Maximum belastbar.', 'good');
    $('#completion').hidden = false;
    $('#completion').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => {
    const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden));
  }));
  document.querySelectorAll('[data-state]').forEach((button) => button.addEventListener('click', () => {
    if (!$('#lab-proof').checked) { $('#state-feedback').textContent = 'Hake zuerst den lokalen Lababschluss ab.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) {}
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
