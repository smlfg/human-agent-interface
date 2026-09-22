const DATA={
1:{title:'C++-Einstieg',topics:'Heron · Dateien · Bilder · Unit Tests',tasks:['Heron-Verfahren','Kleinste Zahl aus Datei','PGM binarisieren','Funktion kleinste']},
2:{title:'Speicher & Rechnen',topics:'Wörter · intvec · Rekursion · Floating Point',tasks:['Wortstatistik','Dynamisches intvec','Logarithmustabelle','Operationsreihenfolge','Quadratwurzel-Trace','McCarthy 91','Floating-Point-Falle']},
3:{title:'Komplexität',topics:'Big-O · Induktion · Rekurrenzen · Wachstum',tasks:['Formaler O-Beweis','Big-O-Aussagen','Vollständige Induktion','Rekurrenz n²','Duplikate finden','Exponentiell vs. polynomiell']},
4:{title:'Sortieren',topics:'Selection · Counting · Heap · QuickSort',tasks:['Drei Sortierverfahren','CountingSort','HeapSort','QuickSort auf Papier']},
5:{title:'Teile & Herrsche',topics:'Maximum Subarray · BigInt · Potenzen',tasks:['Maximum Subarray','Divide-and-Conquer MaxSub','Rekursive BigInt-Arithmetik','Schnelles Potenzieren']},
6:{title:'Backtracking',topics:'N-Damen · Visualisierung · Sudoku',tasks:['N-Damen-Solver','N-Damen visualisieren','Sudoku-Solver']},
7:{title:'Warteschlangen',topics:'Flex Queue · Josephus · Linked Queue · Radixsort',tasks:['Dynamische Queue','Abzählreim','Verkettete Queue','Wörter mit Queues sortieren']},
8:{title:'Bäume & Mengen',topics:'BST · Mengen · 2-3-4-Bäume',tasks:['BST einfügen/löschen','Name im BST','Vector-Menge','BST-Menge','Mengenoperationen','2-3-4-Baum einfügen','Name im 2-3-4-Baum']},
9:{title:'Hashing',topics:'Sondieren · Hashmap · Benchmarks',tasks:['Offene Adressierung','Verkettete Überläufer','Hashfunktionen vergleichen']}
};
const sheet=Number(document.body.dataset.sheet),data=DATA[sheet],pad=n=>String(n).padStart(2,'0');
const STORE='ads-uebungsblaetter-state-v1';let state={};try{state=JSON.parse(localStorage.getItem(STORE)||'{}')}catch{}
document.title=`ADS Blatt ${sheet} · ${data.title}`;document.querySelector('#sheet-number').textContent=`Blatt ${sheet}`;document.querySelector('#sheet-title').textContent=data.title;document.querySelector('#sheet-topics').textContent=data.topics;document.querySelector('#pdf').href=`/proof/ads/source-materials-not-included.html`;
let done=0,sits=0;const cards=data.tasks.map((title,i)=>{const a=i+1,key=`pb${pad(sheet)}a${pad(a)}`,value=state[key];if(value)done++;if(value==='sitzt')sits++;return `<a class="task-link" data-state="${value||''}" href="aufgabe-${pad(a)}/index.html"><span><strong>Aufgabe ${a}</strong><br>${title}</span><small>${value==='sitzt'?'✓ sitzt':value==='wackelt'?'↻ wackelt':'öffnen →'}</small></a>`});
document.querySelector('#tasks').innerHTML=cards.join('');document.querySelector('#sheet-progress').textContent=`${done}/${data.tasks.length}`;document.querySelector('#bar').style.width=`${done/data.tasks.length*100}%`;document.querySelector('#legend').textContent=`${sits} sitzt · ${done-sits} wackelt`;
