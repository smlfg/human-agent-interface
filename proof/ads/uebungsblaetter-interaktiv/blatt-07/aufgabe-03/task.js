(() => {
  const STORAGE_KEY='ads-uebungsblaetter-state-v1', FIELD='pb07a03';
  const queue=[],$=selector=>document.querySelector(selector);
  function render(){
    $('#nodes').innerHTML=queue.length?queue.map(value=>`<span class="node">${escapeHtml(value)}</span>`).join(''):'∅';
    $('#first-pointer').textContent=queue.length?`→ "${queue[0]}"`:'nullptr';
    $('#last-pointer').textContent=queue.length?`→ "${queue[queue.length-1]}"`:'nullptr';
    $('#size').textContent=String(queue.length);
  }
  function escapeHtml(value){const span=document.createElement('span');span.textContent=value;return span.innerHTML;}
  $('#enter').addEventListener('click',()=>{const value=$('#name').value.trim();if(!value){$('#op-feedback').textContent='Bitte zuerst einen String eingeben.';return;}const wasEmpty=queue.length===0;queue.push(value);render();$('#steps').textContent='1 Pointer-Schritt';$('#op-feedback').textContent=wasEmpty?'Erster Knoten: first und last zeigen auf denselben Knoten.':'An last angehängt; last zeigt jetzt auf den neuen Knoten.';});
  $('#leave').addEventListener('click',()=>{if(!queue.length){$('#op-feedback').textContent='Leer: leave hat keinen Knoten zum Entfernen.';return;}const value=queue.shift();render();$('#steps').textContent='1 Pointer-Schritt';$('#op-feedback').textContent=queue.length?`"${value}" vorne entfernt; first wurde weitergeschoben.`:`"${value}" entfernt; first und last wurden nullptr.`;});
  $('#reset').addEventListener('click',()=>{queue.length=0;render();$('#steps').textContent='0 Pointer-Schritte';$('#op-feedback').textContent='Queue geleert: first = last = nullptr.';});
  document.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{const ok=button.dataset.answer==='clear',out=$('#gate-feedback');out.hidden=false;out.className=`feedback ${ok?'good':'try'}`;out.textContent=ok?'Richtig: Der letzte Leave nullt beide Zeiger. Das Lab ist entsperrt.':'Blockiert: Nach delete zeigt last sonst auf freigegebenen Speicher (dangling pointer).';$('#lab').hidden=!ok;if(ok)$('#lab').scrollIntoView({behavior:'smooth',block:'start'});}));
  document.querySelectorAll('[data-hint]').forEach(button=>button.addEventListener('click',()=>{const hint=document.getElementById(button.dataset.hint);hint.hidden=!hint.hidden;button.setAttribute('aria-expanded',String(!hint.hidden));}));
  document.querySelectorAll('[data-state]').forEach(button=>button.addEventListener('click',()=>{if(!$('#proof').checked){$('#state-feedback').textContent='Erst grüne FIFO- und Memory-Tests bestätigen.';return;}let state={};try{state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(_){state={}}state[FIELD]=button.dataset.state;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('#state-feedback').textContent=`Gespeichert: ${button.dataset.state==='sitzt'?'Sitzt':'Wackelt'}.`;}));
})();
