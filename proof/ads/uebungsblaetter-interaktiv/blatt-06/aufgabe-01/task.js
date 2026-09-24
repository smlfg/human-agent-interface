(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb06a01';
  const $ = (s) => document.querySelector(s);
  const board = [-1, -1, -1, -1];
  const trace = [
    { action:'place', row:0, col:0, text:'Start: Zeile 0, Spalte 0 ist frei.' },
    { action:'conflict', row:1, col:0, text:'Gleiche Spalte wie die Dame in Zeile 0.' },
    { action:'place', row:1, col:2, text:'Spalte 2 kollidiert weder direkt noch diagonal.' },
    { action:'conflict', row:2, col:3, text:'Diagonal: |2−1| = |3−2|.' },
    { action:'undo', row:1, col:2, text:'Zeile 2 hat keinen gültigen Kandidaten: Dame aus Zeile 1 entfernen.' },
    { action:'undo', row:0, col:0, text:'Auch Zeile 1 ist ausgeschöpft: bis Zeile 0 zurückgehen.' },
    { action:'place', row:0, col:1, text:'Nächster Kandidat der ersten Zeile.' },
    { action:'place', row:1, col:3, text:'Gültig gegen die Dame bei (0,1).' },
    { action:'place', row:2, col:0, text:'Gültig gegen beide früheren Damen.' },
    { action:'place', row:3, col:2, text:'Vollständige erste Lösung erreicht.' }
  ];
  let step = 0, traceDone = false, modeDone = false, countsDone = false;
  function feedback(el, text, kind){ el.textContent=text; el.className=`feedback ${kind}`; el.hidden=false; }
  function render(){
    const event = trace[step];
    $('#board').innerHTML = board.map((queenCol,row) => Array.from({length:4},(_,col)=>`<span class="square ${(row+col)%2?'dark':''} ${event&&event.row===row&&event.col===col?'candidate':''}" aria-hidden="true">${queenCol===col?'♛':''}</span>`).join('')).join('');
    $('#board').setAttribute('aria-label', `Vier-mal-vier-Brett. Damen je Zeile: ${board.map(v=>v<0?'frei':`Spalte ${v}`).join(', ')}`);
    $('#candidate').textContent = event ? `Kandidat (${event.row}, ${event.col})` : 'Erste Lösung: [1, 3, 0, 2]';
    $('#trace-prompt').textContent = event ? `Schritt ${step+1}/${trace.length}: ${event.text} Was tut der Algorithmus?` : 'Erste Lösung gefunden.';
  }
  function reset(){ board.fill(-1); step=0; traceDone=false; modeDone=false; countsDone=false; ['#mode-step','#lab-step','#gate-step','#completion'].forEach(s=>$(s).hidden=true); $('#trace-feedback').hidden=true; render(); }
  render();
  document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{
    const event=trace[step]; if(!event)return;
    if(button.dataset.action!==event.action){
      const why = button.dataset.action==='place' ? 'Blockiert: Ein Kandidat darf erst nach Spalten- und Diagonalprüfung gesetzt werden.' : button.dataset.action==='undo' ? 'Noch nicht: Undo ist erst nötig, wenn der aktuelle Ast keine Fortsetzung besitzt.' : 'Prüfe gleiche Spalte und |ΔZeile| = |ΔSpalte|.';
      feedback($('#trace-feedback'),why,'try'); return;
    }
    if(event.action==='place') board[event.row]=event.col;
    if(event.action==='undo') board[event.row]=-1;
    step++;
    feedback($('#trace-feedback'), event.action==='conflict' ? `Richtig erkannt: ${event.text}` : event.action==='undo' ? 'Richtig: Zurücknehmen ist eine Zustandsänderung, kein bloßer Rücksprung.' : 'Gültige Wahl. Rekursion geht eine Zeile tiefer.', 'good');
    if(step===trace.length){ traceDone=true; $('#mode-step').hidden=false; }
    render();
  }));
  $('#reset-trace').addEventListener('click',reset);
  document.querySelectorAll('[data-hint]').forEach(button=>button.addEventListener('click',()=>{const h=document.getElementById(button.dataset.hint);h.hidden=!h.hidden;button.setAttribute('aria-expanded',String(!h.hidden));}));
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
    if(button.dataset.mode==='column-only'){feedback($('#mode-feedback'),'Blockiert: Verschiedene Spalten reichen nicht. Zwei Damen bedrohen sich auch diagonal, wenn |ΔZeile| = |ΔSpalte|.','try');return;}
    if(button.dataset.mode==='first'){feedback($('#mode-feedback'),'Blockiert für -a: Ein globales true beim ersten Treffer schneidet den restlichen Suchbaum ab.','try');return;}
    modeDone=true; feedback($('#mode-feedback'),'Richtig: Der Basisfall ist Trefferpunkt; nur der erste-Lösung-Modus propagiert den Abbruch. -a zählt und lässt Backtracking weiterlaufen.','good'); $('#lab-step').hidden=false; $('#gate-step').hidden=false;
  }));
  $('#check-counts').addEventListener('click',()=>{
    const normalized=$('#counts').value.match(/\d+/g)?.map(Number) || [];
    countsDone=JSON.stringify(normalized)===JSON.stringify([1,0,0,2,10,4,40,92]);
    if(!countsDone){feedback($('#count-feedback'),'Noch nicht. Kontrollpunkte: N=4 hat 2 Lösungen, N=8 hat 92. Prüfe insbesondere Undo und beide Diagonalen.','try');return;}
    feedback($('#count-feedback'),'Stimmt. Diese Folge deckt zu strenges Prüfen, fehlende Diagonalen und fehlendes Undo zuverlässig auf.','good'); $('#completion').hidden=false;
  });
  document.querySelectorAll('[data-state]').forEach(button=>button.addEventListener('click',()=>{
    if(!traceDone||!modeDone||!countsDone||!$('#tests-pass').checked){$('#state-feedback').textContent='Noch gesperrt: Trace, Modusfrage, Counts und echter Testlauf gehören zusammen.';return;}
    let state={};try{state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(_){state={}}
    state[FIELD]=button.dataset.state;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('#state-feedback').textContent=`Gespeichert: ${button.dataset.state==='sitzt'?'Sitzt':'Wackelt'}.`;
  }));
})();
