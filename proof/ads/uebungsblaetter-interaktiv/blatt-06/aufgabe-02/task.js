(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb06a02';
  const $ = (s) => document.querySelector(s);
  let n = 8, queens = [], events = 0, running = false, paused = false, token = 0;
  let gateDone = false, sawUndo = false, solvedEight = false, active = null;
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const delay = () => 820 - Number($('#speed').value);
  function render() {
    $('#board').style.gridTemplateColumns = `repeat(${n},1fr)`;
    $('#board').innerHTML = queens.map((queen,row) => Array.from({length:n},(_,col) => {
      const mark = active && active.row===row && active.col===col ? active.type : '';
      return `<span class="square ${(row+col)%2?'dark':''} ${mark}" aria-hidden="true">${queen===col?'♛':''}</span>`;
    }).join('')).join('');
    $('#board').setAttribute('aria-label', `${n}-mal-${n}-Brett; Damen: ${queens.map((v,r)=>v<0?'':`Zeile ${r}, Spalte ${v}`).filter(Boolean).join('; ')||'keine'}`);
    $('#stats').textContent = `${events} Events · ${queens.filter(v=>v>=0).length}/${n} Damen`;
  }
  async function emit(type,row,col,myToken,text) {
    if (myToken !== token) return false;
    active={type,row,col}; events++; $('#event').textContent=text; render();
    while(paused && myToken===token) await wait(60);
    await wait(delay()); active=null; render();
    return myToken===token;
  }
  function valid(row,col){for(let old=0;old<row;old++)if(queens[old]===col||Math.abs(queens[old]-col)===row-old)return false;return true;}
  async function solve(row,myToken){
    if(myToken!==token)return false;
    if(row===n)return true;
    for(let col=0;col<n;col++){
      if(!valid(row,col)){if(!await emit('conflict',row,col,myToken,`Konflikt bei (${row}, ${col}) — Kandidat bleibt ungesetzt.`))return false;continue;}
      queens[row]=col;if(!await emit('place',row,col,myToken,`Place (${row}, ${col}) — grün, dann render + Pause.`))return false;
      if(await solve(row+1,myToken))return true;
      queens[row]=-1;sawUndo=true;if(!await emit('undo',row,col,myToken,`Undo (${row}, ${col}) — Feld zurückgesetzt, Zustand erneut gerendert.`))return false;
    }
    return false;
  }
  function reset(){token++;running=false;paused=false;n=Number($('#size').value);queens=Array(n).fill(-1);events=0;active=null;$('#start').disabled=false;$('#pause').disabled=true;$('#pause').textContent='Pause';$('#event').textContent='Bereit: Noch keine Dame gesetzt.';render();}
  $('#start').addEventListener('click',async()=>{if(running)return;reset();running=true;const mine=token;$('#start').disabled=true;$('#pause').disabled=false;const found=await solve(0,mine);if(mine!==token)return;running=false;$('#pause').disabled=true;if(found){solvedEight ||= n===8;$('#event').textContent=`Erste ${n}er-Lösung sichtbar: [${queens.join(', ')}].`;active=null;render();if(gateDone&&sawUndo&&solvedEight)$('#completion').hidden=false;}else $('#event').textContent='Keine Lösung gefunden.';});
  $('#pause').addEventListener('click',()=>{paused=!paused;$('#pause').textContent=paused?'Weiter':'Pause';});
  $('#reset').addEventListener('click',reset); $('#size').addEventListener('change',reset);
  $('#speed').addEventListener('input',()=>{$('#speed-label').textContent=`${delay()} ms`;});
  document.querySelectorAll('[data-hint]').forEach(b=>b.addEventListener('click',()=>{const h=document.getElementById(b.dataset.hint);h.hidden=!h.hidden;b.setAttribute('aria-expanded',String(!h.hidden));}));
  document.querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',()=>{const f=$('#gate-feedback');f.hidden=false;if(b.dataset.order==='end'){f.className='feedback try';f.textContent='Blockiert: Ein einzelnes Endbild ist keine dynamische Visualisierung; der Suchweg bleibt unsichtbar.';return;}if(b.dataset.order==='no-undo'){f.className='feedback try';f.textContent='Blockiert: Nur gesetzte Damen zu zeigen erzeugt Geisterzustände. Rücknahmen müssen ebenfalls reset + render + Pause auslösen.';return;}gateDone=true;f.className='feedback good';f.textContent='Richtig: Jede Zustandsänderung wird sofort gerendert und lange genug gehalten; das gilt auch für Konflikt und Undo.';$('#lab-step').hidden=false;if(sawUndo&&solvedEight)$('#completion').hidden=false;}));
  document.querySelectorAll('[data-state]').forEach(b=>b.addEventListener('click',()=>{if(!gateDone||!sawUndo||!solvedEight||!$('#tests-pass').checked){$('#state-feedback').textContent='Noch gesperrt: Integrations-Gate, sichtbares Undo, erste 8er-Lösung und echter Testlauf fehlen noch.';return;}let state={};try{state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(_){state={}}state[FIELD]=b.dataset.state;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('#state-feedback').textContent=`Gespeichert: ${b.dataset.state==='sitzt'?'Sitzt':'Wackelt'}.`; }));
  reset();
})();
