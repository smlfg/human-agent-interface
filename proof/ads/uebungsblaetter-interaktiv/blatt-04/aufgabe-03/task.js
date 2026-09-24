(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb04a03';
  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  let heap = [null, 1, 33, 42, 47, 49, 100, 88, 17];
  let phase = 'up';
  let upStep = 0;
  let downStep = 0;
  let attempted = false;
  let completed = false;
  const positions = {1:[1,4,2],2:[2,2,2],3:[2,6,2],4:[3,1,2],5:[3,3,2],6:[3,5,2],7:[3,7,2],8:[4,1,1]};
  const expectedUp = [4, 2];
  const expectedDown = [2, 4];

  function markAttempt() { attempted = true; byId('gate-copy').textContent = 'Dein Versuch zählt. Beende beide Bewegungen oder vergleiche bewusst mit dem Musterweg.'; }
  function render() {
    const tree = byId('heap-tree'); tree.innerHTML = '';
    heap.slice(1).forEach((value, offset) => {
      const i = offset + 1; const [row,col,span] = positions[i];
      const button = document.createElement('button'); button.type = 'button'; button.className = 'node'; button.dataset.index = i; button.dataset.value = value; button.textContent = value; button.style.gridRow = row; button.style.gridColumn = `${col} / span ${span}`;
      const active = phase === 'up' ? (upStep === 0 ? 8 : 4) : (downStep === 0 ? 1 : 2); if (i === active) button.classList.add('active');
      tree.appendChild(button);
    });
    byId('array-row').innerHTML = `<div class="cell zero"><span class="idx">Index 0</span><span class="val">frei</span></div>` + heap.slice(1).map((value, offset) => { const i=offset+1; const active=phase==='up'?(upStep===0?8:4):(downStep===0?1:2); return `<div class="cell ${i===active?'active':''}"><span class="idx">Index ${i}</span><span class="val">${value}</span></div>`; }).join('');
    drawEdges();
  }
  function drawEdges() {
    const stage = document.querySelector('.heap-stage'); const svg = byId('edges'); const base = stage.getBoundingClientRect(); svg.innerHTML='';
    for (let child=2; child<heap.length; child++) { const parent=Math.floor(child/2); const a=document.querySelector(`.node[data-index="${parent}"]`).getBoundingClientRect(); const b=document.querySelector(`.node[data-index="${child}"]`).getBoundingClientRect(); const line=document.createElementNS('http://www.w3.org/2000/svg','line'); line.setAttribute('x1',a.left+a.width/2-base.left); line.setAttribute('y1',a.top+a.height/2-base.top); line.setAttribute('x2',b.left+b.width/2-base.left); line.setAttribute('y2',b.top+b.height/2-base.top); svg.appendChild(line); }
  }
  function swap(a,b) { [heap[a],heap[b]]=[heap[b],heap[a]]; }
  function finish() { completed=true; show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden=true; byId('gate-copy').textContent='Beide Bewegungen korrekt begründet — hier sind Mechanikabschluss und Starter-Lab.'; }

  byId('index-question').addEventListener('click', event => {
    const button=event.target.closest('button'); if(!button)return; markAttempt();
    if(button.dataset.answer==='zero'){ feedback('index-feedback','Falscher Pfad: 5 und 6 entsteht aus einer 0-basierten Vorstellung. Hier bleibt Index 0 frei: links = 2·3 = 6, rechts = 7.','try'); return; }
    if(button.dataset.answer==='next'){ feedback('index-feedback','Die Kinder liegen nicht einfach an den zwei Folgeplätzen. Nutze 2·i und 2·i+1.','try'); return; }
    feedback('index-feedback','Richtig: links 2·3 = 6, rechts 2·3+1 = 7. Jetzt bewege den neu eingefügten Wert.','good'); show('heap-step'); render();
  });
  byId('heap-tree').addEventListener('click', event => {
    const node=event.target.closest('.node'); if(!node||completed)return; markAttempt(); const chosen=Number(node.dataset.index);
    if(phase==='up') {
      const current=upStep===0?8:4; const expected=expectedUp[upStep];
      if(chosen!==expected){ feedback('heap-feedback',`Noch nicht: Der neue Wert steht an Index ${current}. Vergleiche genau mit Vater ⌊${current}/2⌋ = ${expected}.`,'try'); return; }
      swap(current,expected); upStep++; render();
      if(upStep<2){ feedback('heap-feedback','Tausch korrekt. 17 ist noch kleiner als sein neuer Vater — noch einmal nach oben.','good'); return; }
      feedback('heap-feedback','Bubble-up fertig: Vater 1 ist kleiner als 17. Neues Beispiel für delete-min: 1 wird entnommen und der letzte Wert 88 kommt an die Wurzel.','good');
      heap=[null,88,17,42,33,49,100,47]; phase='down'; byId('phase-label').textContent='Neues Beispiel · Delete-min'; byId('formula').textContent='kleineres Kind wählen'; byId('instruction').textContent='Aus dem Heap [1,17,42,33,49,100,47,88] wurde 1 entfernt; 88 steht nun an der Wurzel. Klicke bei jedem Schritt das Kind, mit dem 88 tauschen muss.'; setTimeout(render,450); return;
    }
    const current=downStep===0?1:2; const expected=expectedDown[downStep];
    if(chosen!==expected){ const sibling=downStep===0?3:5; if(chosen===sibling){ feedback('heap-feedback',`Falscher Pfad: Nicht ein beliebiges kleineres Kind wählen. Vergleiche beide Kinder; Index ${expected} hat den kleineren Wert.`,'try'); } else { feedback('heap-feedback',`Bubble-down vergleicht die Kinder von Index ${current}. Wähle das kleinere Kind, falls es kleiner als 88 ist.`,'try'); } return; }
    swap(current,expected); downStep++; render();
    if(downStep<2){ feedback('heap-feedback','Kleineres Kind korrekt gewählt. 88 verletzt weiter unten noch die Heap-Eigenschaft.','good'); return; }
    feedback('heap-feedback','Bubble-down fertig: Jeder Vater ist wieder ≤ seinen Kindern.','good'); finish();
  });
  document.querySelectorAll('.hint-btn').forEach(button=>button.addEventListener('click',()=>{ markAttempt(); show(button.dataset.hint); }));
  byId('reveal').addEventListener('click',()=>{ if(!attempted&&!window.confirm('Noch kein Versuch. Möchtest du den Musterweg wirklich aufdecken?'))return; show('solution'); show('lab-step'); show('completion'); byId('reveal').hidden=true; });
  document.querySelectorAll('.state-btn').forEach(button=>button.addEventListener('click',()=>{ let state={}; try{state=JSON.parse(localStorage.getItem(STORE)||'{}');}catch(_){state={};} state[FIELD]=button.dataset.state; localStorage.setItem(STORE,JSON.stringify(state)); feedback('state-feedback',`${button.textContent} gespeichert. Schlüssel: ${FIELD}.`,'good'); }));
  window.addEventListener('resize',()=>{ if(!byId('heap-step').hidden) drawEdges(); });
})();
