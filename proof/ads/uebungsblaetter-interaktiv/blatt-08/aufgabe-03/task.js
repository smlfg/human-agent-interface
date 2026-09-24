(() => {
  const STORAGE_KEY='ads-uebungsblaetter-state-v1', FIELD='pb08a03';
  const values=[],$=s=>document.querySelector(s);
  function render(){ $('#set-box').innerHTML=values.length?values.map(v=>`<span class="token">${v}</span>`).join(''):'∅'; }
  document.querySelector('.controls').addEventListener('click',event=>{
    const button=event.target.closest('[data-op]'); if(!button)return;
    const value=Number($('#value').value); if(!Number.isInteger(value)){ $('#op-feedback').textContent='Bitte eine ganze Zahl eingeben.';return; }
    const index=values.indexOf(value); let result=false,message='';
    if(button.dataset.op==='add'){ if(index<0){values.push(value);result=true;} message=`add(${value}) → ${result}: ${result?'neu eingefügt':'Duplikat, Menge unverändert'}`; }
    if(button.dataset.op==='contains'){ result=index>=0;message=`contains(${value}) → ${result}: ${result?'enthalten':'nicht enthalten'}`; }
    if(button.dataset.op==='remove'){ if(index>=0){values.splice(index,1);result=true;} message=`remove(${value}) → ${result}: ${result?'entfernt':'fehlte schon, Menge unverändert'}`; }
    render();$('#op-feedback').textContent=message;
  });
  $('#reset').addEventListener('click',()=>{values.length=0;render();$('#op-feedback').textContent='Menge geleert.';});
  document.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
    const ok=button.dataset.answer==='changed',out=$('#gate-feedback');out.hidden=false;out.className=`feedback ${ok?'good':'try'}`;
    out.textContent=ok?'Richtig: true belegt eine echte Zustandsänderung. Das Lab ist entsperrt.':'Blockiert: remove auf einem fehlenden Wert ist ein No-op und muss false liefern.';
    $('#lab').hidden=!ok;if(ok)$('#lab').scrollIntoView({behavior:'smooth',block:'start'});
  }));
  document.querySelectorAll('[data-hint]').forEach(button=>button.addEventListener('click',()=>{const hint=document.getElementById(button.dataset.hint);hint.hidden=!hint.hidden;button.setAttribute('aria-expanded',String(!hint.hidden));}));
  document.querySelectorAll('[data-state]').forEach(button=>button.addEventListener('click',()=>{
    if(!$('#proof').checked){$('#state-feedback').textContent='Erst den grünen Harness und beide Größen bestätigen.';return;}
    let state={};try{state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch(_){state={}}state[FIELD]=button.dataset.state;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('#state-feedback').textContent=`Gespeichert: ${button.dataset.state==='sitzt'?'Sitzt':'Wackelt'}.`;
  }));
})();
