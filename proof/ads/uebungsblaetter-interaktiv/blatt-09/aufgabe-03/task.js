(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb09a03';
  const sample = [17, 1017, 2017, 42, 1042, 999999];
  const seen = new Set();
  const $ = (s) => document.querySelector(s);
  function say(node, message, kind) { node.textContent = message; node.className = `feedback ${kind}`; node.hidden = false; }

  $('#inspect').addEventListener('click', () => {
    const mod = Number($('#hash-select').value);
    const size = Number($('#size-select').value);
    const number = $('#hash-select').selectedIndex + 1;
    const groups = new Map();
    sample.forEach(value => {
      const raw = mod === 1 ? value : value % mod;
      const bucket = ((raw % size) + size) % size;
      if (!groups.has(bucket)) groups.set(bucket, []);
      groups.get(bucket).push(value);
    });
    $('#buckets').innerHTML = [...groups.entries()].sort((a,b) => a[0]-b[0]).map(([bucket, values]) => `<div class="bucket"><strong>Bucket ${bucket}</strong><span>${values.join(', ')}</span></div>`).join('');
    seen.add(number);
    $('#coverage').textContent = `${seen.size} / 4 Funktionen geprüft`;
    const largest = Math.max(...[...groups.values()].map(values => values.length));
    say($('#feedback'), `${groups.size} von ${size.toLocaleString('de-DE')} möglichen Start-Buckets belegt; größte Gruppe: ${largest}. Das misst Verteilung, noch keine Insert-Zeit.`, groups.size < sample.length ? 'try' : 'good');
  });

  document.querySelectorAll('[data-hint]').forEach(button => button.addEventListener('click', () => {
    const hint = document.getElementById(button.dataset.hint); hint.hidden = !hint.hidden; button.setAttribute('aria-expanded', String(!hint.hidden));
  }));
  $('#open-design').addEventListener('click', () => {
    if (seen.size === 0) { say($('#feedback'), 'Prüfe zuerst mindestens eine Bucket-Verteilung.', 'try'); return; }
    $('#design').hidden = false; $('#design').scrollIntoView({behavior:'smooth', block:'start'});
  });
  document.querySelectorAll('.design-choice').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.choice === 'wrong-pointer') { say($('#design-feedback'), 'Blockiert: So ignorierst du den Funktionszeiger; alle Benchmark-Zeilen messen dieselbe Funktion.', 'try'); return; }
    if (button.dataset.choice === 'wrong-rng') { say($('#design-feedback'), 'Blockiert: Dann misst du zusätzlich Zufallserzeugung und vergleichst womöglich verschiedene Daten.', 'try'); return; }
    say($('#design-feedback'), 'Fairer Kern: identische vorbereitete Werte, Funktionszeiger wirklich wechseln, Operationen getrennt stoppen.', 'good');
    $('#interpretation').hidden = false; $('#interpretation').scrollIntoView({behavior:'smooth', block:'start'});
  }));
  document.querySelectorAll('.interpret-choice').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.answer === 'wrong') { say($('#interpret-feedback'), 'Zu schnell zugeschrieben: Tabellenlänge verändert auch Lastfaktor und Speicherverhalten; schlechte Hashverteilung erzeugt Kollisionen unabhängig von freien Plätzen.', 'try'); return; }
    say($('#interpret-feedback'), 'Richtig: Zeit plus Strukturmetriken ergeben eine belastbare Interpretation.', 'good'); $('#completion').hidden = false;
  }));
  document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => {
    if (!$('#proof').checked) { $('#state-feedback').textContent = 'Hake zuerst den Lababschluss ab.'; return; }
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) {}
    state[FIELD] = button.dataset.state; localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
  }));
})();
