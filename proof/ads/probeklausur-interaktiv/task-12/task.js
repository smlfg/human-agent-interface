(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  let stage = 1;
  let trace = [];
  let chosenPath = '';
  const completed = new Set();
  const nodes = $$('.node');

  function feedback(id, kind, html) {
    const el = $(id);
    el.className = `feedback show ${kind}`;
    el.innerHTML = html;
  }
  function unlock(n) {
    stage = n;
    const el = $(`#step${n}`);
    el.classList.remove('locked'); el.classList.add('active'); el.removeAttribute('aria-disabled');
    el.scrollIntoView({behavior:'smooth', block:'center'});
  }
  function markDone(n) {
    completed.add(n);
    if (n < 4 && !completed.has(n + 1)) unlock(n + 1);
    if (completed.size === 4) {
      const sol = $('#solution');
      sol.classList.remove('locked'); sol.removeAttribute('aria-disabled');
      $('#revealSolution').disabled = false;
    }
  }
  function resetTree() { nodes.forEach(n => n.classList.remove('selected','correct','cut')); }
  function renderTrace() { $('#trace').textContent = trace.length ? trace.join(' → ') : '—'; }

  nodes.forEach(node => node.addEventListener('click', () => {
    const val = node.dataset.node;
    if (stage === 1) {
      const expected = ['8','12','20'];
      const next = expected[trace.length];
      if (val === next) { trace.push(val); node.classList.add('selected'); }
      else {
        feedback('#feedback1','try', val === '4'
          ? '<strong>Konkreter Denkfehler:</strong> Links liegen kleinere Werte. Für <code>sb_maxval</code> suchst du das größte einzelne Element, also gehst du rechts.'
          : 'Folge einer zusammenhängenden Zeigerkette ab der Wurzel: erst 8 anklicken, dann ein Kind davon.');
      }
      renderTrace();
    } else if (stage === 4) {
      node.classList.toggle('cut');
    }
  }));

  $$('[data-hint]').forEach(btn => btn.addEventListener('click', () => $(`#${btn.dataset.hint}`).classList.add('show')));

  $('#check1').addEventListener('click', () => {
    if (trace.join('-') === '8-12-20') {
      nodes.filter(n => trace.includes(n.dataset.node)).forEach(n => n.classList.add('correct'));
      feedback('#feedback1','good','Richtig: <code>while (n-&gt;right != nullptr)</code> führt 8 → 12 → 20. Rückgabe: <strong>20</strong>. Beim leeren Baum muss vorher ein <code>runtime_error</code> kommen.');
      markDone(1);
    } else feedback('#feedback1','try','Der Weg ist noch nicht vollständig. Beginne an der Wurzel und gehe so lange rechts, wie ein rechtes Kind existiert.');
  });

  $$('.path-choice').forEach(btn => btn.addEventListener('click', () => {
    $$('.path-choice').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected'); chosenPath = btn.dataset.path;
    resetTree(); chosenPath.split('-').forEach(v => nodes.find(n => n.dataset.node === v)?.classList.add('selected'));
    $('#trace').textContent = `${chosenPath.replaceAll('-', ' → ')} = ${chosenPath.split('-').reduce((s,v)=>s+Number(v),0)}`;
  }));
  $('#check2').addEventListener('click', () => {
    if (chosenPath === '8-12-20') {
      feedback('#feedback2','good','Richtig: 8 + 12 + 20 = <strong>40</strong>. Die Hilfsmethode liefert <code>n-&gt;val + max(linkeSumme, rechteSumme)</code>.');
      markDone(2);
    } else if (chosenPath === '8-12-10-9') {
      feedback('#feedback2','try','Fast — dieser Pfad hat 39. Der kürzere Pfad 8 → 12 → 20 hat 40. Vergleiche Summen, nicht Pfadlängen.');
    } else if (chosenPath) {
      feedback('#feedback2','try','<strong>Falscher Pfad erklärt:</strong> Die Suchbaumordnung hilft nur bei einzelnen Schlüsselwerten. Für eine Pfadsumme darfst du nicht automatisch nur einen „größeren“ Ast verfolgen; berechne beide Teilbäume und vergleiche deren Gesamtsummen.');
    } else feedback('#feedback2','try','Wähle zuerst einen vollständigen Wurzel-Blatt-Pfad.');
  });

  $('#check3').addEventListener('click', () => {
    const a = $('#baseSum').value.trim(), b = $('#baseLen').value.trim();
    if (a === '0' && b === '0') {
      feedback('#feedback3','good','Genau: <code>paar{0, 0}</code>. Am aktuellen Knoten addierst du danach Wert und 1 zur Länge. Für den schwersten Werkstattpfad ist die Länge <strong>3</strong>.');
      markDone(3);
    } else feedback('#feedback3','try', a === '0' || b === '0' ? 'Ein Feld stimmt schon. Ein leerer Teilbaum enthält aber weder Summe noch Knoten: beide Werte sind 0.' : 'Der neutrale Rückgabewert darf Summe und Länge nicht verändern: <code>{0, 0}</code>.');
  });

  $('#check4').addEventListener('click', () => {
    const cut = nodes.filter(n => n.classList.contains('cut')).map(n => n.dataset.node).sort();
    const wanted = ['2','3','7','9','10','20'].sort();
    if (JSON.stringify(cut) === JSON.stringify(wanted)) {
      feedback('#feedback4','good','Schnitt sitzt: 8, 4 und 12 bleiben. Bei Resthöhe 1 löscht <code>sb_clear</code> beide Unterbäume; danach müssen beide Kindzeiger auf <code>nullptr</code>, sonst zeigen sie auf gelöschten Speicher.');
      markDone(4);
    } else if (cut.includes('4') || cut.includes('12')) {
      feedback('#feedback4','try','Zu hoch geschnitten: Bei Zielhöhe 2 bleiben die Kinder der Wurzel. Entfernt werden erst deren Unterbäume.');
    } else feedback('#feedback4','try','Noch nicht exakt: Entferne alle Knoten ab Ebene 3. Wurzel = Ebene 1; 4 und 12 = Ebene 2.');
  });

  $('#revealSolution').addEventListener('click', () => {
    $('#solutionCode').classList.remove('hidden'); $('#examBox').classList.remove('hidden');
    $('#revealSolution').textContent = 'Code ist aufgedeckt'; $('#revealSolution').disabled = true;
  });

  const key = 'ads-probeklausur-state-v2';
  function readState() { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; } }
  function showState(value) {
    $$('.state-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
    $('#savedState').textContent = value ? `Gespeichert: ${value === 'sitzt' ? 'Sitzt' : 'Wackelt'}.` : 'Noch nicht markiert.';
  }
  $$('.state-btn').forEach(btn => btn.addEventListener('click', () => {
    const state = readState(); state.task12 = btn.dataset.value;
    localStorage.setItem(key, JSON.stringify(state)); showState(btn.dataset.value);
  }));
  showState(readState().task12);
})();
