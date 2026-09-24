(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb04a04';
  const rows = [
    {range:[0,7], pivot:21, result:[17,7,2,12,16,25,21,23], split:5},
    {range:[0,4], pivot:2, result:[2,7,17,12,16,25,21,23], split:1},
    {range:[1,4], pivot:17, result:[2,7,16,12,17,25,21,23], split:4},
    {range:[1,3], pivot:16, result:[2,7,12,16,17,25,21,23], split:3},
    {range:[1,2], pivot:7, result:[2,7,12,16,17,25,21,23], split:2, overlap:1},
    {range:[5,7], pivot:21, result:[2,7,12,16,17,21,25,23], split:6},
    {range:[6,7], pivot:25, result:[2,7,12,16,17,21,23,25], split:7}
  ];
  let cursor = 0;
  let attempted = false;
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind='try') => { const el=byId(id); el.textContent=text; el.className=`feedback ${kind}`; el.hidden=false; };
  const markAttempt = () => { attempted=true; byId('gate-copy').textContent='Dein Versuch zählt. Vervollständige die Pivotzeilen oder vergleiche bewusst mit dem Musterweg.'; };

  function rowMarkup(row, index, label=`Z${index+1}`) {
    const cells = row.result.map((value,i) => {
      const classes=['cell']; if(i<row.range[0]||i>row.range[1]) classes.push('outside'); else classes.push('active');
      const marker = i===row.split ? '<i class="split-mark" aria-label="Überlappungsstelle"></i>' : '';
      return `${marker}<span class="${classes.join(' ')}">${value}</span>`;
    }).join('');
    return `<div class="trace-row"><div class="row-label">${label}</div><div class="row-array">${cells}</div><div class="pivot-note">Pivot ${row.pivot}${row.overlap!==undefined?' · Treffpunkt '+row.overlap:''}</div></div>`;
  }
  function renderWork() {
    if(cursor>=rows.length) return;
    const row=rows[cursor], before=cursor===0?[23,7,2,21,16,25,12,17]:rows[cursor-1].result;
    const active=before.slice(row.range[0],row.range[1]+1);
    byId('work-copy').innerHTML=`Teilarray <code>${active.join(', ')}</code>: Welcher Wert steht an der mittleren Position?`;
    const correct=row.pivot;
    const candidates=[...new Set([active[Math.floor(active.length/2)], [...active].sort((a,b)=>a-b)[Math.floor((active.length-1)/2)], correct])];
    byId('pivot-choices').innerHTML=candidates.map(v=>`<button class="choice" data-value="${v}">${v}</button>`).join('');
  }
  function finish() {
    byId('pivot-work').hidden=true; byId('progress').textContent='7 / 7';
    feedback('trace-feedback','Vollständig: sieben Pivotzeilen. Die Endfolge ist 2, 7, 12, 16, 17, 21, 23, 25.','good');
    show('solution'); show('completion'); byId('reveal').hidden=true; byId('gate-copy').textContent='Trace geschafft — vergleiche jetzt deinen vollständigen Papierabschluss.';
  }

  byId('first-question').addEventListener('click', event => {
    const button=event.target.closest('button'); if(!button) return; markAttempt();
    if(button.dataset.answer==='median'){feedback('first-feedback','Falscher Pfad: Gesucht ist nicht der Median der Werte. Pivotwahl bedeutet hier Positionsmitte im aktuellen Array.','try');return;}
    if(button.dataset.answer==='right'){feedback('first-feedback','Bei acht Elementen gibt es zwei mittlere Positionen. Die Aufgabe verlangt ausdrücklich die linke: Position 4, Wert 21.','try');return;}
    feedback('first-feedback','Richtig: Position 4 von 8 trägt 21. Jetzt dieselbe Regel rekursiv anwenden.','good'); show('trace-step'); renderWork();
  });
  byId('pivot-choices').addEventListener('click', event => {
    const button=event.target.closest('button'); if(!button) return; markAttempt(); const chosen=Number(button.dataset.value), row=rows[cursor];
    if(chosen!==row.pivot){feedback('trace-feedback',`Falscher Pfad: ${chosen} ist hier nicht die linke Positionsmitte. Zähle im markierten Teilarray, ohne seine Werte zu sortieren.`, 'try');return;}
    byId('trace').insertAdjacentHTML('beforeend',rowMarkup(row,cursor)); cursor++; byId('progress').textContent=`${cursor} / ${rows.length}`;
    if(cursor===rows.length){finish();return;} feedback('trace-feedback','Pivot stimmt. Partition und Überlappungsstelle sind notiert — weiter mit dem nächsten rekursiven Bereich.','good'); renderWork();
  });
  byId('keep-pivot').addEventListener('click', () => {markAttempt();feedback('trace-feedback','Falscher Pfad: Das Pivot muss in jeder Zeile separat notiert werden. Sein Wert kann nach einem Tausch physisch im Array liegen; die neuen Teilbereiche bestimmt aber die markierte Zeiger-Überlappung, nicht „Pivot im Teilarray lassen“.','try');});
  document.querySelectorAll('.hint-btn').forEach(button=>button.addEventListener('click',()=>{markAttempt();show(button.dataset.hint);}));
  byId('solution-trace').innerHTML=rows.map((row,index)=>rowMarkup(row,index)).join('');
  byId('reveal').addEventListener('click',()=>{if(!attempted&&!window.confirm('Noch kein Versuch. Möchtest du den vollständigen Musterweg wirklich aufdecken?'))return;show('solution');show('completion');byId('reveal').hidden=true;});
  document.querySelectorAll('.state-btn').forEach(button=>button.addEventListener('click',()=>{let state={};try{state=JSON.parse(localStorage.getItem(STORE)||'{}');}catch(_){state={};}state[FIELD]=button.dataset.state;localStorage.setItem(STORE,JSON.stringify(state));feedback('state-feedback',`${button.textContent} gespeichert. Schlüssel: ${FIELD}.`,'good');}));
})();
