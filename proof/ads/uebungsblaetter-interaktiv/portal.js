const sheets=[
{n:1,count:4,title:'C++-Einstieg',topics:'Heron · Dateien · Bilder · Unit Tests'},
{n:2,count:7,title:'Speicher & Rechnen',topics:'Wörter · intvec · Rekursion · Floating Point'},
{n:3,count:6,title:'Komplexität',topics:'Big-O · Induktion · Rekurrenzen · Wachstum'},
{n:4,count:4,title:'Sortieren',topics:'Selection · Counting · Heap · QuickSort'},
{n:5,count:4,title:'Teile & Herrsche',topics:'MaxSub · BigInt · schnelles Potenzieren'},
{n:6,count:3,title:'Backtracking',topics:'N-Damen · Visualisierung · Sudoku'},
{n:7,count:4,title:'Warteschlangen',topics:'Flex Queue · Josephus · Radixsort'},
{n:8,count:7,title:'Bäume & Mengen',topics:'BST · Set · 2-3-4-Bäume'},
{n:9,count:3,title:'Hashing',topics:'Sondieren · Hashmap · Benchmarks'}];
const STORE='ads-uebungsblaetter-state-v1';let state={};try{state=JSON.parse(localStorage.getItem(STORE)||'{}')}catch{}
const key=(s,a)=>`pb${String(s).padStart(2,'0')}a${String(a).padStart(2,'0')}`;
const values=[];sheets.forEach(s=>{for(let a=1;a<=s.count;a++)values.push(state[key(s.n,a)])});
const done=values.filter(Boolean).length,sits=values.filter(v=>v==='sitzt').length;
document.querySelector('#total').textContent=`${done}/42`;document.querySelector('#bar').style.width=`${done/42*100}%`;document.querySelector('#legend').textContent=`${sits} sitzt · ${done-sits} wackelt`;
document.querySelector('#sheets').innerHTML=sheets.map(s=>{let d=0;for(let a=1;a<=s.count;a++)if(state[key(s.n,a)])d++;return `<a class="sheet-card" href="blatt-${String(s.n).padStart(2,'0')}/index.html"><b>${String(s.n).padStart(2,'0')}</b><div><h2>${s.title}</h2><p>${s.topics}</p><small>${d}/${s.count} bearbeitet</small></div></a>`}).join('');
