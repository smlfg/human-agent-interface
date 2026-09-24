(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const show = (id, text, kind = 'good') => { const el = $(id); el.textContent = text; el.className = `feedback show ${kind}`; };
  const unlock = (id) => { const el = $(id); el.hidden = false; el.classList.remove('locked'); el.removeAttribute('aria-disabled'); };
  const progress = { inc: false, path: false, complete: false, bugs: false };
  const maybeFinish = () => { if (Object.values(progress).every(Boolean)) unlock('finishStep'); };

  document.querySelectorAll('[data-start]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-start]').forEach(b => b.classList.toggle('selected', b === button));
    if (button.dataset.start === 'return') {
      show('startFeedback', 'Genau. nullptr ist keine Box: sofort stoppen, bevor n->val oder Kinder gelesen werden.');
      unlock('incStep');
    } else if (button.dataset.start === 'read') show('startFeedback', 'Konkreter Absturzpfad: n ist nullptr. n->val würde eine nicht vorhandene Box dereferenzieren. Erst Basisfall, dann lesen.', 'try');
    else show('startFeedback', 'Auch n->left und n->right dereferenzieren n. Bei nullptr gibt es keine Kinder: zuerst return.', 'try');
  }));

  document.querySelectorAll('.hintBtn').forEach(button => button.addEventListener('click', () => {
    $(button.dataset.hint).classList.add('show'); button.setAttribute('aria-expanded', 'true');
  }));

  const oddSelected = new Set();
  document.querySelectorAll('[data-value]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.value; oddSelected.has(value) ? oddSelected.delete(value) : oddSelected.add(value);
    button.classList.toggle('selected'); $('oddOutput').textContent = [...oddSelected].join(', ') || '—';
  }));
  $('checkOdd').addEventListener('click', () => {
    const got = [...oddSelected].sort((a,b) => a-b).join(','), expected = '3,5,7,13';
    if (got === expected) { show('oddFeedback', 'Richtig: jede ungerade Box wird bearbeitet — unabhängig von ihrer Position. Jetzt baust du den Rundgang.'); $('incSkeleton').hidden = false; }
    else if (!oddSelected.has('13')) show('oddFeedback', 'Der rechte Teilbaum wurde nicht vollständig besucht: 13 ist ebenfalls ungerade. „Alle Werte“ verlangt left und right.', 'try');
    else show('oddFeedback', 'Prüfe jede gewählte Zahl mit Rest 1. Gerade Werte wie 4 und 10 bleiben unverändert.', 'try');
  });
  $('checkIncCode').addEventListener('click', () => {
    if ($('incBase').value === 'null' && $('incKids').value === 'both' && $('incWork').value === 'odd') {
      show('incCodeFeedback', 'inc_odd1 sitzt: nullptr stoppt; beide Teilbäume werden besucht; nur ungerade Boxen ändern sich.'); progress.inc = true; unlock('pathStep');
    } else if ($('incBase').value === 'leaf') show('incCodeFeedback', 'Wenn du am Blatt stoppst, bearbeitest du gerade die Blätter 3, 5 und 13 nie. Stoppe erst hinter dem Blatt bei nullptr.', 'try');
    else if ($('incKids').value === 'left') show('incCodeFeedback', 'Nur left vergisst den kompletten rechten Teilbaum — konkret 10 und 13. „Alle“ braucht beide Aufrufe.', 'try');
    else show('incCodeFeedback', 'Drei Rollen prüfen: nullptr-Abbruch, beide Kinder, Änderung nur bei ungeradem val.', 'try');
  });

  const path = ['7','4','5']; let pathIndex = 0;
  document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.path;
    if (value === path[pathIndex]) {
      button.classList.add('done'); button.disabled = true; pathIndex++;
      $('pathOutput').textContent = path.slice(0,pathIndex).join(' → '); $('pathLength').textContent = pathIndex;
      if (pathIndex === path.length) { show('pathFeedback', 'Pfad fertig: 7 ungerade → links; 4 gerade → rechts; 5 ungerade → links auf nullptr. Länge 3.'); $('pathSkeleton').hidden = false; }
      else show('pathFeedback', `${value} zählt. Seine Parität bestimmt jetzt genau ein Kind.`);
    } else {
      button.classList.add('wrong'); setTimeout(() => button.classList.remove('wrong'), 450);
      if (value === '3' && pathIndex === 2) show('pathFeedback', 'Du bist von 4 nochmals links gegangen. Aber 4 ist gerade: laut Aufgabenregel geht es nach rechts zu 5.', 'try');
      else show('pathFeedback', `Noch nicht. Aktuell erwartet der top-down Pfad Knoten ${path[pathIndex]}. Kein zweiter Teilbaum wird besucht.`, 'try');
    }
  }));
  $('checkPathCode').addEventListener('click', () => {
    if ($('pathLoop').value === 'node' && $('pathCount').value === 'each' && $('pathDirection').value === 'rule') {
      show('pathCodeFeedback', 'len_odd_even sitzt: jeder besuchte Knoten zählt einmal, aber nur ein Kind wird nach Parität verfolgt.'); progress.path = true; unlock('completeStep');
    } else if ($('pathLoop').value === 'child') show('pathCodeFeedback', 'Dann würdest du den letzten Knoten nicht sicher mitzählen. Die Schleife läuft, solange die aktuelle Box n existiert.', 'try');
    else if ($('pathDirection').value === 'both') show('pathCodeFeedback', 'Das wäre ein Rundgang durch den Baum, kein einzelner Pfad. Hier entscheidet die Parität exakt eine Richtung.', 'try');
    else show('pathCodeFeedback', 'Zähle jeden existierenden Knoten; odd → left, else → right; bei nullptr ist Schluss.', 'try');
  });

  const holes = new Set();
  document.querySelectorAll('[data-hole]').forEach(button => button.addEventListener('click', () => {
    holes.add(button.dataset.hole); button.classList.add('filled'); button.textContent = '0'; button.disabled = true;
    if (holes.size === 4) { show('completeFeedback', 'Höhe 3 ist jetzt überall erreicht. Kein Kind unter Ebene 3 ergänzen: Die Höhe muss erhalten bleiben.'); $('completeSkeleton').hidden = false; }
    else show('completeFeedback', `${holes.size} von 4 fehlenden Positionen ergänzt. Arbeite top-down weiter.`);
  }));
  $('checkCompleteCode').addEventListener('click', () => {
    if ($('completeBase').value === 'height' && $('completeCreate').value === 'missing' && $('completeKids').value === 'both') {
      show('completeCodeFeedback', 'baum_complete sitzt: bei Resthöhe 1 stoppen, beide fehlenden Kinder mit 0 bauen, dann mit height-1 in beide Richtungen.'); progress.complete = true; unlock('bugsStep');
    } else if ($('completeBase').value === 'null') show('completeCodeFeedback', 'Nur bei nullptr zu stoppen hilft hier nicht: fehlende Kinder sollen gerade erzeugt werden. Die Resthöhe ist das Stoppsignal.', 'try');
    else if ($('completeKids').value === 'same') show('completeCodeFeedback', 'Ohne height-1 schrumpft die Resthöhe nie; die Rekursion baut endlos weiter. Jede Ebene verbraucht 1.', 'try');
    else show('completeCodeFeedback', 'Stopp über Resthöhe; beide fehlenden Kinder erzeugen; beide mit um 1 reduzierter Höhe besuchen.', 'try');
  });

  $('checkBugs').addEventListener('click', () => {
    const values = [...document.querySelectorAll('[data-bug]')].map(s => s.value);
    if (values.join(',') === 'root,local,cycle') {
      show('bugsFeedback', 'Alle drei korrekt: bad1 zerstört über die Zeigerreferenz; bad2 hängt wegen lokaler Kopie nichts ein; bad3 erzeugt beim nichtleeren Baum einen Zyklus.'); progress.bugs = true; maybeFinish();
    } else if (values[0] === 'local') show('bugsFeedback', 'bad1 ist keine harmlose lokale Kopie: *& bindet n an den echten Zeiger. Schon der Abstieg n = n->left überschreibt Baumkanten.', 'try');
    else if (values[1] === 'root') show('bugsFeedback', 'bad2 hat gerade kein &: n wird lokal verschoben und später lokal neu belegt. Der echte Baum bleibt unverändert.', 'try');
    else if (values[2] !== 'cycle') show('bugsFeedback', 'bad3 setzt den rechten Zeiger des neuen Blatts auf b->root. Damit entsteht bei einem nichtleeren Baum ein Rückweg zur Wurzel.', 'try');
    else show('bugsFeedback', 'Noch nicht vollständig. Unterscheide Zeigerreferenz, lokale Zeigerkopie und Rückzeiger-Zyklus.', 'try');
  });

  $('checkFinish').addEventListener('click', () => {
    const answer = $('finalAnswer').value.trim(); $('revealSolution').disabled = false;
    if (answer.length < 35) show('finishFeedback', 'Versuch gespeichert. Für einen tragfähigen Klausursatz fehlen noch Basisfall sowie „ein Pfad“ versus „beide Teilbäume“. Nutze deine vier grünen Werkstätten.', 'try');
    else show('finishFeedback', 'Versuch gespeichert. Prüfe beim Vergleich mit der Musterlösung besonders: nullptr/Resthöhe, beide Teilbäume bei inc/complete, genau ein Kind beim Paritätspfad.');
  });
  $('revealSolution').addEventListener('click', () => { $('fullSolution').hidden = false; $('revealSolution').textContent = 'Musterlösung ist geöffnet'; });

  const storageKey = 'ads-probeklausur-state-v2';
  const readState = () => { try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; } };
  const saved = readState().task11;
  if (saved) document.querySelector(`[data-value="${saved}"]`)?.classList.add('active');
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    const state = readState(); state.task11 = button.dataset.value; localStorage.setItem(storageKey, JSON.stringify(state));
    document.querySelectorAll('.state-btn').forEach(b => b.classList.toggle('active', b === button));
    show('stateFeedback', `Gespeichert: Aufgabe 11 ${button.dataset.value}.`);
  }));
})();
