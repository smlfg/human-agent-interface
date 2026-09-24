(() => {
  'use strict';

  const cases = [
    {
      id: 'single', tab: '1 · Einmal', title: 'Eine Schleife läuft durch ein Array',
      goal: 'Finde Größe, Wiederholungsmotor und Fortschritt.', source: 'Quelle: Probeklausur.pdf, Aufgabe 5 · fun1.',
      lines: [
        ['int sum(int* a, size_t ', ['n', 'size'], ') {'],
        ['  int val = 0;'],
        ['  size_t i = 0;'],
        ['  ', ['while (i < n)', 'loop'], ' {'],
        ['    ', ['val += a[i]', 'work'], ';'],
        ['    ', ['++i', 'step'], ';'],
        ['  }'], ['  return val;'], ['}']
      ],
      stages: [
        ['size', 'Welche Variable beschreibt die Anzahl der Arraywerte?', 'n ist die Eingabegröße: Das Array enthält n Werte.', 'Sie steht im Funktionskopf und wird in der Schleifenbedingung benutzt.'],
        ['loop', 'Welche Stelle wiederholt den Block?', 'Die while-Schleife ist der Wiederholungsmotor.', 'Suche die Zeile, die so lange wahr bleibt, wie i kleiner als n ist.'],
        ['step', 'Welche Stelle bringt die Schleife dem Ende näher?', '++i erhöht den Index. Nach ungefähr n Erhöhungen endet die Schleife.', 'Ohne diese Zeile würde i gleich bleiben.']
      ],
      wrong: { work: 'Die Addition ist Arbeit innerhalb einer Runde. Gesucht ist gerade die Steuerung der Wiederholung.' },
      prompt: 'Eine Schleife zählt i von 0 bis n−1. Welche Klasse passt?',
      choices: [
        ['constant', 'Θ(1) · nur eine Addition', false, 'Die Addition steht in einer Schleife und passiert nicht nur einmal.'],
        ['linear', 'Θ(n) · ungefähr n Runden', true, 'Genau: konstante Arbeit pro Runde mal ungefähr n Runden ergibt Θ(n).'],
        ['quadratic', 'Θ(n²) · zwei Dimensionen', false, 'Es gibt nur eine Schleife, keine zweite Schleife darin.']
      ],
      classHint: 'Eine Schleife, die n Positionen besucht: konstante Arbeit × n.',
      conclusion: 'Ein einzelner vollständiger Durchlauf durch n Werte ist linear: Θ(n).'
    },
    {
      id: 'sequential', tab: '2 · Danach', title: 'Zwei Schleifen laufen nacheinander',
      goal: 'Erkenne: nacheinander wird addiert, nicht multipliziert.', source: 'Quelle: Probeklausur.pdf, Aufgabe 2 · Listenfunktion g.',
      lines: [
        [['while (n != nullptr)', 'loop-a'], ' {'],
        ['  if (n->wert >= 0) wert1 += n->wert;'],
        ['  ', ['n = n->next', 'move'], ';'], ['}'],
        ['n = head;'],
        [['while (n != nullptr)', 'loop-b'], ' {'],
        ['  if (n->wert < 0) wert2 += n->wert;'],
        ['  n = n->next;'], ['}']
      ],
      stages: [
        ['loop-a', 'Welche Stelle startet den ersten vollständigen Listendurchlauf?', 'Die erste while-Schleife besucht alle k Knoten.', 'Suche die erste while-Bedingung.'],
        ['move', 'Welche Stelle bewegt den Zeiger genau einen Knoten weiter?', 'n = n->next ist die Bewegung zur nächsten Box.', 'Der Pfeil liest das Feld next des aktuellen Knotens.'],
        ['loop-b', 'Welche Stelle startet danach einen zweiten vollständigen Durchlauf?', 'Die zweite while-Schleife besucht dieselben k Knoten noch einmal.', 'Sie steht nach n = head und nicht innerhalb der ersten Schleife.']
      ],
      prompt: 'Zwei vollständige Durchläufe mit je k Knoten: Welche Rechnung passt?',
      choices: [
        ['add', 'k + k = 2k → Θ(k)', true, 'Genau: nacheinander addierst du die Arbeiten. Der Faktor 2 fällt weg.'],
        ['multiply', 'k · k → Θ(k²)', false, 'Multiplizieren würdest du nur bei einer Schleife innerhalb der anderen.'],
        ['constant', 'Θ(1) · zwei feste Schleifen', false, 'Die Schleifenanzahl ist fest, aber jede Schleife besucht k Knoten.']
      ],
      classHint: 'Nacheinander: erster Weg plus zweiter Weg. Also k + k.',
      conclusion: 'Zwei lineare Schleifen nacheinander bleiben linear: k + k = 2k ∈ Θ(k).'
    },
    {
      id: 'nested', tab: '3 · Darin', title: 'Eine Schleife steckt in einer Schleife',
      goal: 'Finde beide Schleifen und die häufigste Operation.', source: 'Quelle: Probeklausur.pdf, Aufgabe 1 · SelectionSort.',
      lines: [
        [['for (int i = 0; i < n; ++i)', 'outer'], ' {'],
        ['  int minidx = i;'],
        ['  ', ['for (int j = i + 1; j < n; ++j)', 'inner'], ' {'],
        ['    ', ['if (a[j] < a[minidx])', 'compare'], ' minidx = j;'],
        ['  }'], ['  ', ['swap(a, i, minidx)', 'swap'], ';'], ['}']
      ],
      stages: [
        ['outer', 'Welche Schleife bestimmt die äußeren Runden?', 'Die i-Schleife wählt nacheinander jede Position.', 'Sie beginnt ganz oben mit i = 0.'],
        ['inner', 'Welche Schleife läuft innerhalb jeder äußeren Runde?', 'Die j-Schleife durchsucht jeweils den verbleibenden Rest.', 'Sie ist eingerückt und steht innerhalb der i-Schleife.'],
        ['compare', 'Welche Operation passiert in fast jeder inneren Runde?', 'Der Vergleich a[j] < a[minidx] ist die zentrale Operation.', 'swap passiert nur einmal pro äußerer Runde; suche tiefer.']
      ],
      wrong: { swap: 'swap passiert nur einmal pro äußerer Runde. Der Vergleich in der inneren Schleife passiert viel häufiger.' },
      prompt: 'Die innere Schleife wird mit jeder äußeren Runde kürzer. Welche Klasse entsteht?',
      choices: [
        ['linear', 'n + n → Θ(n)', false, 'Die Schleifen stehen nicht nacheinander; die innere läuft innerhalb der äußeren.'],
        ['quadratic', '(n−1)+(n−2)+…+1 → Θ(n²)', true, 'Treffer: Die Dreieckssumme wächst quadratisch.'],
        ['constant', 'Θ(1) · ein swap', false, 'Der swap ist nicht die häufigste Operation.']
      ],
      classHint: 'Addiere die Längen der inneren Schleife: n−1, n−2, …, 1.',
      conclusion: 'Verschachtelung erzeugt hier eine Dreieckssumme und damit Θ(n²).'
    },
    {
      id: 'recursive', tab: '4 · Wieder selbst', title: 'Die Funktion ruft sich selbst kleiner auf',
      goal: 'Finde Stopp, Selbstaufruf und Verkleinerung.', source: 'Quelle: Probeklausur.pdf, Aufgabe 3 · Rekurrenz.',
      lines: [
        ['int fun(int x) {'],
        ['  ', ['if (x == 1)', 'stop'], ' ', ['return 1', 'base'], ';'],
        ['  int zw = ', ['fun', 'call'], '(', ['x - 1', 'shrink'], ');'],
        ['  return ', ['zw * x', 'result'], ';'], ['}']
      ],
      stages: [
        ['stop', 'Welche Bedingung beendet die Aufrufkette?', 'Bei x == 1 endet die Rekursion.', 'Suche die if-Bedingung mit direktem return.'],
        ['call', 'Welche Stelle startet dieselbe Funktion erneut?', 'fun innerhalb von fun ist der rekursive Wiederholungsmotor.', 'Der Funktionsname steht im Funktionskörper noch einmal.'],
        ['shrink', 'Welche Stelle macht den nächsten Fall kleiner?', 'x−1 verkleinert das Problem pro Ebene um genau 1.', 'Schau auf das Argument des inneren fun-Aufrufs.']
      ],
      wrong: { base: 'return 1 liefert den Basiswert. Der Stopp ist die Bedingung davor.', result: 'zw * x ist eine einzelne Multiplikation und startet keinen neuen Aufruf.' },
      prompt: 'Ein kleinerer Aufruf pro Ebene, bis x gleich 1 ist: Welche Klasse passt?',
      choices: [
        ['linear', 'ungefähr x Ebenen → Θ(x)', true, 'Genau: Es entsteht eine Kette, keine Verzweigung.'],
        ['exponential', 'zwei Äste pro Ebene → Θ(2ˣ)', false, 'Im Code steht nur ein rekursiver fun-Aufruf.'],
        ['factorial', 'x neue Aufrufe pro Ebene → Θ(x!)', false, 'Die Multiplikation verändert den Ergebniswert, nicht die Anzahl der Aufrufe.']
      ],
      classHint: 'Male nur die Aufrufe: x → x−1 → x−2 → … → 1.',
      conclusion: 'Ein rekursiver Aufruf mit x−1 ergibt eine lineare Kette: Θ(x).'
    },
    {
      id: 'early', tab: '5 · Früh raus', title: 'Ein return kann die Schleife früh beenden',
      goal: 'Trenne Best Case und Worst Case.', source: 'Quelle: Probeklausur.pdf, Aufgabe 4 · fun2.',
      lines: [
        ['size_t i = 0;'],
        [['while (i < n)', 'loop'], ' {'],
        ['  ', ['if (a[i] == 0)', 'condition'], ' ', ['return 0', 'early'], ';'],
        ['  prod *= a[i];'],
        ['  ', ['++i', 'step'], ';'], ['}'], ['return prod;']
      ],
      stages: [
        ['loop', 'Welche Stelle kann bis zu n Elemente besuchen?', 'Die while-Schleife ist der normale Laufzeitmotor.', 'Suche die Bedingung mit i < n.'],
        ['early', 'Welche Stelle kann die Funktion sofort vollständig verlassen?', 'return 0 beendet nicht nur die Runde, sondern die ganze Funktion.', 'break wäre nur Schleifenende; gesucht ist return.'],
        ['step', 'Welche Stelle geht zum nächsten Arrayelement?', '++i bewegt den Index weiter. Ohne frühen return sind bis zu n Schritte nötig.', 'Der Index muss sich verändern.']
      ],
      prompt: 'Was gilt, wenn a[0] schon 0 ist – und wenn gar keine 0 vorkommt?',
      choices: [
        ['mixed', 'Best Θ(1), Worst Θ(n)', true, 'Genau: sofortiger return im besten Fall, vollständiger Durchlauf im schlechtesten.'],
        ['linear', 'Best und Worst beide Θ(n)', false, 'Bei a[0] = 0 endet die Funktion bereits im ersten Durchlauf.'],
        ['constant', 'Best und Worst beide Θ(1)', false, 'Ohne 0 muss die Schleife alle n Werte prüfen.']
      ],
      classHint: 'Setze gedanklich einmal a[0] = 0 und einmal: keine Zahl ist 0.',
      conclusion: 'Ein früher return kann die Fälle trennen: Best Θ(1), Worst Θ(n).'
    },
    {
      id: 'reverse', tab: '6 · Rückwärts', title: 'Eine Schleife zählt rückwärts',
      goal: 'Erkenne lineare Laufzeit auch bei einer anderen Laufrichtung.', source: 'Didaktische Variation zu Probeklausur.pdf, Aufgabe 5 · fun1.',
      lines: [
        ['int sumBack(int* a, size_t ', ['n', 'size'], ') {'],
        ['  int sum = 0;'],
        ['  for (size_t i = n; ', ['i > 0', 'loop'], '; ', ['--i', 'step'], ') {'],
        ['    ', ['sum += a[i - 1]', 'work'], ';'],
        ['  }'], ['  return sum;'], ['}']
      ],
      stages: [
        ['size', 'Welche Variable sagt, wie viele Arraywerte existieren?', 'n bleibt die Eingabegröße, auch wenn rückwärts gelaufen wird.', 'Suche den Parameter, der die Arraylänge beschreibt.'],
        ['loop', 'Welche Bedingung hält die Wiederholung am Laufen?', 'Solange i größer als 0 ist, läuft die for-Schleife weiter.', 'Sie steht als mittlerer Teil im for-Kopf.'],
        ['step', 'Welche Stelle verändert i in jeder Runde?', '--i zählt pro Runde genau um 1 herunter.', 'Die Laufrichtung ist rückwärts: Suche das Minus-Minus.']
      ],
      wrong: { work: 'Die Addition ist die Arbeit pro Runde. Gesucht ist gerade der Fortschritt der Schleife.' },
      prompt: 'i läuft von n bis 1. Welche Laufzeitklasse hat der vollständige Durchlauf?',
      choices: [
        ['linear', 'Θ(n) · n Rückwärtsschritte', true, 'Genau: Rückwärts oder vorwärts ändert die Zahl der besuchten Positionen nicht.'],
        ['log', 'Θ(log n) · weil i kleiner wird', false, 'i wird nur um 1 kleiner. Logarithmisch wäre eine Teilung, etwa i /= 2.'],
        ['constant', 'Θ(1) · nur eine Schleife', false, 'Eine einzelne Schleife kann trotzdem n Runden ausführen.']
      ],
      classHint: 'Schreibe für n=4 die i-Werte auf: 4, 3, 2, 1.',
      conclusion: 'Die Richtung ist egal: n Positionen werden einmal besucht, also Θ(n).'
    },
    {
      id: 'halving-loop', tab: '7 · Halbieren', title: 'Die Eingabe halbiert sich pro Runde',
      goal: 'Unterscheide „minus 1“ von „geteilt durch 2“.', source: 'Didaktische Schleifenform zu Probeklausur.pdf, Aufgabe 14 · F2.',
      lines: [
        ['int halvings(int ', ['n', 'size'], ') {'],
        ['  int count = 0;'],
        ['  ', ['while (n > 1)', 'loop'], ' {'],
        ['    ', ['n = n / 2', 'halve'], ';'],
        ['    ++count;'],
        ['  }'], ['  return count;'], ['}']
      ],
      stages: [
        ['size', 'Welche Größe wird in jeder Runde verändert?', 'n ist Eingabe und zugleich die schrumpfende Restgröße.', 'Sie steht im Funktionskopf und in der while-Bedingung.'],
        ['loop', 'Welche Stelle wiederholt den Block?', 'Die while-Schleife läuft, solange n größer als 1 ist.', 'Suche die Bedingung direkt vor dem Block.'],
        ['halve', 'Welche Stelle lässt das Problem besonders schnell schrumpfen?', 'n = n / 2 halbiert die Restgröße in jeder Runde.', 'Nicht minus 1: Gesucht ist die Division.']
      ],
      prompt: 'n wird 64 → 32 → 16 → 8 → 4 → 2 → 1. Welche Klasse passt?',
      choices: [
        ['log', 'Θ(log n) · Anzahl der Halbierungen', true, 'Genau: Der Logarithmus zählt, wie oft halbiert werden kann.'],
        ['linear', 'Θ(n) · n wird kleiner', false, 'Nicht jedes Kleinerwerden ist linear. Halbieren überspringt immer größere Bereiche.'],
        ['constant', 'Θ(1) · Division ist ein Schritt', false, 'Die einzelne Division ist konstant, aber sie wird mehrfach ausgeführt.']
      ],
      classHint: 'Frage: Wie oft kann ich n durch 2 teilen, bis 1 erreicht ist?',
      conclusion: 'Halbierung pro Runde erzeugt logarithmisch viele Runden: Θ(log n).'
    },
    {
      id: 'two-inputs', tab: '8 · n plus m', title: 'Zwei unabhängige Eingabegrößen',
      goal: 'Addiere n und m, ohne eine der beiden Größen zu verstecken.', source: 'Didaktische Transferform zur Listenfunktion aus Probeklausur.pdf, Aufgabe 2.',
      lines: [
        ['void visit(int* a, ', ['size_t n, size_t m', 'sizes'], ', int* b) {'],
        ['  ', ['for (size_t i = 0; i < n; ++i)', 'loop-n'], ' use(a[i]);'],
        ['  ', ['for (size_t j = 0; j < m; ++j)', 'loop-m'], ' use(b[j]);'],
        ['}']
      ],
      stages: [
        ['sizes', 'Welche beiden Größen können unabhängig voneinander wachsen?', 'n und m beschreiben zwei verschiedene Datenmengen.', 'Im Funktionskopf stehen zwei Größenparameter.'],
        ['loop-n', 'Welche Schleife besucht die n Elemente?', 'Die erste Schleife kostet Θ(n).', 'Suche die Bedingung i < n.'],
        ['loop-m', 'Welche Schleife besucht danach die m Elemente?', 'Die zweite Schleife kostet Θ(m) und läuft erst nach der ersten.', 'Suche die Bedingung j < m.']
      ],
      prompt: 'Erst n Elemente, danach m Elemente: Welche Aussage bleibt ohne Zusatzannahme korrekt?',
      choices: [
        ['sum', 'Θ(n + m)', true, 'Genau: unabhängige Eingaben und nacheinander ausgeführte Arbeit werden addiert.'],
        ['product', 'Θ(n · m)', false, 'Multiplizieren wäre richtig, wenn die m-Schleife innerhalb jeder n-Runde liefe.'],
        ['only-n', 'Θ(n)', false, 'm darf unabhängig viel größer als n sein und kann deshalb nicht einfach verschwinden.']
      ],
      classHint: 'Die zweite Schleife steht nicht innerhalb der ersten: n Arbeit plus m Arbeit.',
      conclusion: 'Zwei unabhängige vollständige Durchläufe nacheinander ergeben Θ(n + m).'
    },
    {
      id: 'rectangle', tab: '9 · n mal m', title: 'Ein rechteckiges Schleifenraster',
      goal: 'Multipliziere nur, wenn die zweite Schleife wirklich innen liegt.', source: 'Didaktische Brücke zur Verschachtelung aus Probeklausur.pdf, Aufgabe 1.',
      lines: [
        ['for (size_t i = 0; ', ['i < n', 'outer'], '; ++i) {'],
        ['  for (size_t j = 0; ', ['j < m', 'inner'], '; ++j) {'],
        ['    ', ['compare(a[i], b[j])', 'work'], ';'],
        ['  }'], ['}']
      ],
      stages: [
        ['outer', 'Welche Bedingung erzeugt n äußere Runden?', 'i < n erzeugt n Zeilen im gedachten Raster.', 'Suche den Schleifenkopf mit i.'],
        ['inner', 'Welche Bedingung erzeugt in jeder äußeren Runde m innere Runden?', 'j < m erzeugt m Spalten pro äußerer Runde.', 'Diese Schleife steht eingerückt innerhalb der i-Schleife.'],
        ['work', 'Welche Operation passiert für jedes Paar (i,j)?', 'compare wird für jedes der n·m Paare ausgeführt.', 'Suche die innerste Codezeile.']
      ],
      prompt: 'Für jedes der n Elemente werden alle m Elemente geprüft. Welche Klasse passt?',
      choices: [
        ['product', 'Θ(n · m)', true, 'Genau: n äußere Runden mal m innere Runden.'],
        ['sum', 'Θ(n + m)', false, 'Addieren wäre richtig, wenn die Schleifen nacheinander stünden.'],
        ['square', 'Immer Θ(n²)', false, 'Nur wenn n und m dieselbe Größe beschreiben, kann daraus Θ(n²) werden.']
      ],
      classHint: 'Male ein Raster: n Zeilen und m Spalten.',
      conclusion: 'Eine m-Schleife innerhalb jeder n-Runde erzeugt n·m Paare: Θ(n·m).'
    },
    {
      id: 'duplicates-worst', tab: '10 · Dreieck II', title: 'Alle Zahlenpaare vergleichen',
      goal: 'Erkenne dieselbe Dreieckssumme in einem anderen Algorithmus.', source: 'Quelle: ADSPB03.pdf, Aufgabe 5 · Duplikatsuche.',
      lines: [
        [['for (int i = 0; i < n; ++i)', 'outer'], ' {'],
        ['  ', ['for (int j = i + 1; j < n; ++j)', 'inner'], ' {'],
        ['    ', ['if (a[i] == a[j])', 'compare'], ' return true;'],
        ['  }'], ['}'], ['return false;']
      ],
      stages: [
        ['outer', 'Welche Schleife wählt den ersten Wert eines Zahlenpaares?', 'Die i-Schleife wählt nacheinander den linken Partner.', 'Suche den äußeren for-Kopf.'],
        ['inner', 'Welche Schleife wählt nur noch spätere Partner?', 'j startet bei i+1; dadurch wird jede innere Reihe kürzer.', 'Suche den Startwert j = i+1.'],
        ['compare', 'Welche Operation passiert für jedes betrachtete Paar?', 'a[i] == a[j] ist die zentrale Vergleichsoperation.', 'Suche die if-Bedingung mit zwei Arrayzugriffen.']
      ],
      prompt: 'Im Worst Case gibt es kein Duplikat. Welche Laufzeit hat die vollständige Suche?',
      choices: [
        ['quadratic', '(n−1)+(n−2)+…+1 → Θ(n²)', true, 'Genau: Wieder entsteht die quadratische Dreieckssumme.'],
        ['linear', 'Θ(n) · jedes Element einmal', false, 'Jedes Element wird mit vielen späteren Elementen verglichen.'],
        ['constant', 'Θ(1) · return false', false, 'Der abschließende return kommt erst nach allen Vergleichen.']
      ],
      classHint: 'Zähle bei n=5 die Vergleiche pro i: 4 + 3 + 2 + 1.',
      conclusion: 'Andere Geschichte, gleiche Form: Die Paarvergleiche bilden eine Dreieckssumme, also Worst Θ(n²).'
    },
    {
      id: 'value-dependent', tab: '11 · Werte zählen', title: 'Die Werte bestimmen die innere Arbeit',
      goal: 'Erkenne, wann n allein die Laufzeit nicht beschreibt.', source: 'Quelle: Probeklausur.pdf, Aufgabe 5 · fun2.',
      lines: [
        [['for (size_t i = 0; i < n; ++i)', 'outer'], ' {'],
        ['  int v = a[i];'],
        ['  ', ['while (v > 0)', 'positive'], ' { val += 1; v -= 1; }'],
        ['  ', ['while (v < 0)', 'negative'], ' { val -= 1; v += 1; }'],
        ['}']
      ],
      stages: [
        ['outer', 'Welche Schleife besucht alle n Arrayelemente?', 'Die for-Schleife erzeugt mindestens n äußere Runden.', 'Suche die Bedingung i < n.'],
        ['positive', 'Welche Schleife macht bei einem positiven Wert v genau v Schritte?', 'Die erste while-Schleife zählt positive Werte einzeln herunter.', 'Eine 1000 braucht hier tausend Runden.'],
        ['negative', 'Welche Schleife macht bei einem negativen Wert genau |v| Schritte?', 'Die zweite while-Schleife zählt negative Werte einzeln hoch bis 0.', 'Auch −1000 braucht tausend Runden.']
      ],
      prompt: 'Welche Eingabegröße beschreibt die Arbeit besser als n allein?',
      choices: [
        ['values', 'Θ(n + Σ|a[i]|)', true, 'Genau: Jedes Element kostet Grundarbeit plus so viele Schritte wie sein Betrag.'],
        ['linear', 'Immer Θ(n)', false, 'Gleiches n kann sehr verschiedene Werte enthalten: 1 kostet einen, 1000 tausend Schritte.'],
        ['quadratic', 'Immer Θ(n²)', false, 'Die innere Laufzahl hängt von den Werten ab, nicht automatisch von n.']
      ],
      classHint: 'Vergleiche [1,1,1] mit [1000,1000,1000]: gleiches n, andere Arbeit.',
      conclusion: 'Bei wertabhängigen Schleifen reicht n nicht: Die Arbeit ist Θ(n + Σ|a[i]|).'
    },
    {
      id: 'recursive-half', tab: '12 · Rekursiv halb', title: 'Ein rekursiver Aufruf mit n/2',
      goal: 'Übertrage die Halbierungsregel von der Schleife auf Rekursion.', source: 'Quelle: Probeklausur.pdf, Aufgabe 14 · F2.',
      lines: [
        ['double F2(int n) {'],
        ['  ', ['if (n < 2)', 'stop'], ' return 0;'],
        ['  return 1 + ', ['F2', 'call'], '(', ['n / 2', 'shrink'], ');'],
        ['}']
      ],
      stages: [
        ['stop', 'Welche Bedingung stoppt die Rekursion?', 'Bei n < 2 endet die Aufrufkette.', 'Suche den direkten return ohne weiteren F2-Aufruf.'],
        ['call', 'Welche Stelle ruft dieselbe Funktion erneut auf?', 'F2 im Körper von F2 ist der rekursive Motor.', 'Suche den Funktionsnamen ein zweites Mal.'],
        ['shrink', 'Wie wird das Problem pro Aufruf kleiner?', 'n/2 halbiert die Eingabe auf jeder Ebene.', 'Achte auf Division statt minus 1.']
      ],
      prompt: 'Ein Aufruf pro Ebene, aber n halbiert sich. Welche Laufzeit folgt?',
      choices: [
        ['log', 'T(n)=T(n/2)+c → Θ(log n)', true, 'Genau: Eine Kette mit logarithmisch vielen Halbierungen.'],
        ['linear', 'T(n)=T(n−1)+c → Θ(n)', false, 'Der Code zieht nicht 1 ab, sondern halbiert n.'],
        ['exponential', 'T(n)=2T(n−1)+c → Θ(2ⁿ)', false, 'Es gibt nur einen F2-Aufruf pro Ebene.']
      ],
      classHint: 'Trace für 20: 20 → 10 → 5 → 2 → 1.',
      conclusion: 'Ein rekursiver Aufruf mit n/2 ergibt Θ(log n).'
    },
    {
      id: 'double-recursion', tab: '13 · Zwei Äste', title: 'Zwei rekursive Aufrufe pro Ebene',
      goal: 'Zähle alle Knoten des Aufrufbaums, nicht nur seine Tiefe.', source: 'Quelle: Probeklausur.pdf, Aufgabe 13 · fun1.',
      lines: [
        ['void fun1(int N) {'],
        ['  ', ['if (N == 1)', 'stop'], ' cout << N;'],
        ['  else {'],
        ['    ', ['fun1(N - 1)', 'call-a'], ';'],
        ['    ', ['fun1(N - 1)', 'call-b'], ';'],
        ['  }'], ['}']
      ],
      stages: [
        ['stop', 'Welche Bedingung beendet einen Ast?', 'Bei N == 1 endet der jeweilige Ast.', 'Suche den Basisfall vor dem else.'],
        ['call-a', 'Wo entsteht der erste rekursive Folgeaufruf?', 'Die erste fun1-Zeile erzeugt ein Kind im Aufrufbaum.', 'Im else stehen zwei gleiche Funktionsaufrufe. Nimm den ersten.'],
        ['call-b', 'Wo entsteht der zweite rekursive Folgeaufruf?', 'Die zweite fun1-Zeile erzeugt das zweite Kind.', 'Direkt unter dem ersten steht ein zweiter Selbstaufruf.']
      ],
      prompt: 'Ebenenbreiten für N=4: 1, 2, 4, 8. Welche Klasse passt?',
      choices: [
        ['exponential', '2ᴺ−1 Aufrufe → Θ(2ᴺ)', true, 'Genau: Die Zahl der Knoten verdoppelt sich pro Ebene.'],
        ['linear', 'Θ(N) · Tiefe des Baums', false, 'Die Tiefe zählt nur einen Weg. Die Funktion führt beide Äste vollständig aus.'],
        ['quadratic', 'Θ(N²) · zwei Aufrufe', false, 'Zwei Folgeaufrufe bedeuten hier Verdopplung pro Ebene, nicht nur ein Quadrat.']
      ],
      classHint: 'Addiere alle Ebenen: 1 + 2 + 4 + 8 + …',
      conclusion: 'Der vollständige binäre Aufrufbaum hat 2ᴺ−1 Knoten: Θ(2ᴺ).'
    },
    {
      id: 'tree-traversal', tab: '14 · Jeder Knoten', title: 'Zwei Aufrufe, aber jeder Baumknoten nur einmal',
      goal: 'Vermeide die Falle „zwei Rekursionen sind immer exponentiell“.', source: 'Quelle: Probeklausur.pdf, Aufgabe 10 · InOrder-Traversierung.',
      lines: [
        ['void inorder(node* n) {'],
        ['  ', ['if (n == nullptr)', 'stop'], ' return;'],
        ['  ', ['inorder(n->left)', 'left'], ';'],
        ['  visit(n);'],
        ['  ', ['inorder(n->right)', 'right'], ';'],
        ['}']
      ],
      stages: [
        ['stop', 'Welche Bedingung stoppt an einem leeren Kind?', 'nullptr beendet diesen Teilbaum sofort.', 'Suche den Basisfall mit return.'],
        ['left', 'Welche Stelle bearbeitet den linken Teilbaum?', 'Der erste rekursive Aufruf besucht ausschließlich den linken Teilbaum.', 'Suche den Aufruf mit left.'],
        ['right', 'Welche Stelle bearbeitet den rechten Teilbaum?', 'Der zweite Aufruf besucht ausschließlich den rechten Teilbaum.', 'Suche den Aufruf mit right.']
      ],
      prompt: 'Der Baum besitzt insgesamt k Knoten und jeder wird genau einmal besucht. Welche Laufzeit gilt?',
      choices: [
        ['linear', 'Θ(k) · einmal pro Knoten', true, 'Genau: Die beiden Aufrufe teilen den vorhandenen Baum auf; sie verdoppeln nicht dieselben Teilprobleme.'],
        ['exponential', 'Θ(2ᵏ) · zwei rekursive Aufrufe', false, 'Links und rechts sind verschiedene, disjunkte Teilbäume. Kein Knoten wird doppelt erzeugt.'],
        ['log', 'Θ(log k) · Baumhöhe', false, 'Die Höhe wäre für einen einzigen Suchpfad relevant. InOrder besucht aber alle Knoten.']
      ],
      classHint: 'Schreibe auf jeden realen Knoten genau einen Besuchspunkt.',
      conclusion: 'Zwei disjunkte Teilbäume sind keine Verdopplung derselben Arbeit: Alle k Knoten einmal ergibt Θ(k).'
    },
    {
      id: 'duplicates-cases', tab: '15 · Fälle II', title: 'Früher Abbruch in zwei Schleifen',
      goal: 'Trenne Best und Worst auch bei verschachtelten Schleifen.', source: 'Quelle: ADSPB03.pdf, Aufgabe 5 · Duplikatsuche.',
      lines: [
        [['for (int i = 0; i < n; ++i)', 'outer'], ' {'],
        ['  for (int j = i + 1; j < n; ++j) {'],
        ['    ', ['if (a[i] == a[j])', 'compare'], ' ', ['return true', 'early'], ';'],
        ['  }'], ['}'], ['return false;']
      ],
      stages: [
        ['outer', 'Welche Stelle kann im Worst Case n äußere Runden starten?', 'Die i-Schleife eröffnet die vollständige Paarprüfung.', 'Suche den äußeren for-Kopf.'],
        ['compare', 'Welche Bedingung entscheidet, ob ein Duplikat gefunden wurde?', 'Der Vergleich erkennt zwei gleiche Werte.', 'Suche die if-Bedingung mit a[i] und a[j].'],
        ['early', 'Welche Stelle kann die ganze Funktion sehr früh beenden?', 'return true beendet sofort beide Schleifen und die Funktion.', 'Gesucht ist nicht break, sondern return.']
      ],
      prompt: 'a[0] == a[1] im Best Case; kein Duplikat im Worst Case. Welche Aussage passt?',
      choices: [
        ['mixed', 'Best Θ(1), Worst Θ(n²)', true, 'Genau: erster Vergleich kann reichen; ohne Treffer läuft die ganze Dreieckssumme.'],
        ['quadratic', 'Best und Worst beide Θ(n²)', false, 'Ein Treffer beim ersten Paar beendet die Funktion sofort.'],
        ['linear', 'Best Θ(1), Worst Θ(n)', false, 'Ohne Treffer wird nicht nur jedes Element, sondern jedes relevante Paar verglichen.']
      ],
      classHint: 'Teste zwei Extreme: [7,7,…] und ein Array mit ausschließlich verschiedenen Werten.',
      conclusion: 'Früher return plus Verschachtelung: Best Θ(1), Worst Θ(n²).'
    }
  ];

  const duels = [
    {
      id: 'for-vs-while', tab: '1 · Syntax', title: 'for gegen while',
      goal: 'Lass dich nicht von einer anderen Schreibweise täuschen.',
      source: 'Didaktische Variation zu Probeklausur.pdf, Aufgabe 5 · vollständiger Arraydurchlauf.',
      relation: {
        prompt: 'Beide Funktionen erhalten dasselbe Array mit n Werten. Was geben sie zurück?',
        hint: 'Schreibe für beide nur die besuchten Indizes auf: 0, 1, …, n−1.',
        choices: [
          ['same', 'Immer dieselbe Summe', true, 'Richtig: Beide besuchen dieselben n Positionen und addieren dieselben Werte.'],
          ['different', 'for und while liefern grundsätzlich andere Ergebnisse', false, 'Die Schleifenschreibweise ändert die berechneten Arraywerte nicht.'],
          ['condition', 'Nur bei sortierten Arrays gleich', false, 'Die Reihenfolge der Werte spielt für diesen Vergleich keine Rolle.']
        ]
      },
      a: {
        label: 'Summe mit for',
        lines: [
          ['int sumA(int* a, int n) {'], ['  int sum = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' {'],
          ['    ', ['sum += a[i]', 'work'], ';'], ['  }'], ['  return sum;'], ['}']
        ],
        motors: [['loop', 'Klicke die Stelle, die ungefähr n Runden erzeugt.', 'Die for-Schleife besucht jeden Index genau einmal.', 'Im for-Kopf stehen Start, Bedingung und Schritt zusammen.']]
      },
      b: {
        label: 'Summe mit while',
        lines: [
          ['int sumB(int* a, int n) {'], ['  int sum = 0, i = 0;'],
          ['  ', ['while (i < n)', 'loop'], ' {'],
          ['    ', ['sum += a[i]', 'work'], ';'], ['    ', ['++i', 'step'], ';'],
          ['  }'], ['  return sum;'], ['}']
        ],
        motors: [['loop', 'Klicke die Stelle, die den Block bis i == n wiederholt.', 'Auch die while-Schleife erzeugt n Runden.', 'Suche die Bedingung, die so lange i < n wahr bleibt.']]
      },
      runtime: {
        prompt: 'Welche Laufzeiten passen zu A und B?',
        hint: 'Konstante Arbeit pro Element mal n Elemente.',
        choices: [
          ['both-linear', 'A: Θ(n) · B: Θ(n)', true, 'Genau: Andere Syntax, gleiche Anzahl besuchter Elemente.'],
          ['for-constant', 'A: Θ(1) · B: Θ(n)', false, 'Eine for-Schleife ist nicht automatisch konstant; sie läuft hier n-mal.'],
          ['while-quadratic', 'A: Θ(n) · B: Θ(n²)', false, 'In B steckt keine zweite Schleife innerhalb der while-Schleife.']
        ]
      },
      verdict: {
        prompt: 'Welche Vergleichsaussage wäre in der Klausur sauber?',
        hint: 'Vergleiche die Zahl der Runden, nicht die Schlüsselwörter for und while.',
        choices: [
          ['tie', 'Asymptotisch gleich; die Schreibweise allein ändert nichts.', true, 'Treffer: Beide sind linear.'],
          ['for-faster', 'for ist asymptotisch immer schneller als while.', false, 'Die Syntax bestimmt keine andere Θ-Klasse.'],
          ['while-faster', 'while ist wegen weniger Zeichen schneller.', false, 'Quelltextlänge ist kein Laufzeitmaß.']
        ]
      },
      examSentence: 'A und B berechnen dieselbe Summe und benötigen jeweils Θ(n), da beide alle n Arrayelemente genau einmal besuchen.',
      conclusion: 'Erste Vergleichsregel: Übersetze beide Codes in besuchte Elemente. Unterschiedliche Syntax kann dieselbe Arbeit beschreiben.'
    },
    {
      id: 'one-vs-two-passes', tab: '2 · 1× / 2×', title: 'Ein Durchlauf gegen zwei Durchläufe',
      goal: 'Trenne konstante Mehrarbeit von einer neuen Wachstumsklasse.',
      source: 'Didaktische Variation zu Probeklausur.pdf, Aufgaben 2 und 5 · aufeinanderfolgende Durchläufe.',
      relation: {
        prompt: 'A summiert direkt. B summiert nichtnegative und negative Werte getrennt. Ist das Ergebnis gleich?',
        hint: 'pos + neg enthält am Ende wieder jedes Arrayelement genau einmal.',
        choices: [
          ['same', 'Ja, beide liefern Σ a[i]', true, 'Richtig: B verteilt die Werte nur auf zwei Teilsummen.'],
          ['different', 'Nein, B verliert die negativen Werte', false, 'B addiert negative Werte in neg und rechnet pos + neg.'],
          ['only-positive', 'Nur bei ausschließlich positiven Werten', false, 'Auch negative Werte werden von B berücksichtigt.']
        ]
      },
      a: {
        label: 'Eine Runde',
        lines: [
          ['int sumA(int* a, int n) {'], ['  int sum = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' sum += a[i];'],
          ['  return sum;'], ['}']
        ],
        motors: [['loop', 'Klicke den vollständigen Arraydurchlauf.', 'A besucht n Elemente in einem Durchlauf.', 'Suche i < n.']]
      },
      b: {
        label: 'Zwei Runden',
        lines: [
          ['int sumB(int* a, int n) {'], ['  int pos = 0, neg = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'positive-loop'], ''],
          ['    if (a[i] >= 0) pos += a[i];'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'negative-loop'], ''],
          ['    if (a[i] < 0) neg += a[i];'], ['  return pos + neg;'], ['}']
        ],
        motors: [
          ['positive-loop', 'Klicke den ersten vollständigen Durchlauf in B.', 'Der erste Loop kostet Θ(n).', 'Suche die erste Bedingung i < n.'],
          ['negative-loop', 'Klicke den zweiten vollständigen Durchlauf in B.', 'Der zweite Loop kostet ebenfalls Θ(n) und läuft danach.', 'Er steht nach dem ersten Loop, nicht darin.']
        ]
      },
      runtime: {
        prompt: 'A kostet ungefähr n Runden, B ungefähr 2n. Welche Klassen folgen?',
        hint: 'Bei Θ fallen konstante Faktoren wie 2 weg.',
        choices: [
          ['both-linear', 'A: Θ(n) · B: Θ(n)', true, 'Genau: n und 2n wachsen beide linear.'],
          ['b-square', 'A: Θ(n) · B: Θ(n²)', false, 'Die beiden Schleifen stehen nacheinander, nicht ineinander.'],
          ['both-constant', 'A: Θ(1) · B: Θ(2)', false, 'Jeder Durchlauf hängt von n ab.']
        ]
      },
      verdict: {
        prompt: 'Was darfst du trotz gleicher Θ-Klasse sagen?',
        hint: 'Asymptotik ignoriert konstante Faktoren; reale Grundoperationen darf man trotzdem vergleichen.',
        choices: [
          ['constant', 'Beide sind Θ(n); B macht typischerweise etwa doppelt so viele Besuche.', true, 'Sauber getrennt: gleiche Klasse, anderer konstanter Aufwand.'],
          ['square', 'B ist wegen zwei Schleifen quadratisch.', false, 'Zwei aufeinanderfolgende lineare Schleifen ergeben 2n, nicht n².'],
          ['identical', 'Beide führen exakt gleich viele Operationen aus.', false, 'Gleiche Θ-Klasse bedeutet nicht identische Operationszahl.']
        ]
      },
      examSentence: 'Beide Funktionen liefern dieselbe Summe und sind Θ(n); B durchläuft das Array jedoch zweimal und hat daher einen größeren konstanten Aufwand.',
      conclusion: 'In der Klausur sind zwei Aussagen gleichzeitig möglich: asymptotisch gleich und dennoch praktisch mehr Grundoperationen.'
    },
    {
      id: 'flat-vs-nested', tab: '3 · n / n²', title: 'Flach gegen verschachtelt',
      goal: 'Erkenne redundante Arbeit, obwohl das Ergebnis gleich bleibt.',
      source: 'Didaktische Transferform zu Probeklausur.pdf, Aufgabe 1 · Schleifenverschachtelung.',
      relation: {
        prompt: 'Beide Funktionen starten mit c = 0. Welchen Wert geben sie für n ≥ 0 zurück?',
        hint: 'In B wird ++c nur dann ausgeführt, wenn j == 0.',
        choices: [
          ['same', 'Beide geben n zurück', true, 'Richtig: In B trifft j == 0 genau einmal pro äußerer Runde zu.'],
          ['square-result', 'B gibt n² zurück', false, 'Die Bedingung j == 0 verhindert n Erhöhungen pro äußerer Runde.'],
          ['different', 'A gibt n, B gibt 0 zurück', false, 'Bei jedem äußeren i nimmt j einmal den Wert 0 an.']
        ]
      },
      a: {
        label: 'Direkt zählen',
        lines: [
          ['int countA(int n) {'], ['  int c = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' ++c;'],
          ['  return c;'], ['}']
        ],
        motors: [['loop', 'Klicke den einzigen Wiederholungsmotor.', 'A erhöht c genau n-mal.', 'Es gibt nur einen for-Kopf.']]
      },
      b: {
        label: 'Redundant zählen',
        lines: [
          ['int countB(int n) {'], ['  int c = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'outer'], ' {'],
          ['    ', ['for (int j = 0; j < n; ++j)', 'inner'], ' {'],
          ['      ', ['if (j == 0)', 'condition'], ' ++c;'], ['    }'], ['  }'],
          ['  return c;'], ['}']
        ],
        motors: [
          ['outer', 'Klicke den äußeren Motor von B.', 'Die i-Schleife erzeugt n äußere Runden.', 'Suche den Loop mit i.'],
          ['inner', 'Klicke den Motor, der in jeder i-Runde erneut n-mal läuft.', 'Die j-Schleife erzeugt n·n Bedingungsprüfungen.', 'Sie steht eingerückt innerhalb der i-Schleife.']
        ]
      },
      runtime: {
        prompt: 'Die Ausgabe ist gleich. Wie unterscheidet sich die Laufzeit?',
        hint: 'Auch eine meistens falsche if-Bedingung muss in jeder inneren Runde geprüft werden.',
        choices: [
          ['linear-square', 'A: Θ(n) · B: Θ(n²)', true, 'Genau: B prüft n²-mal, ob j == 0.'],
          ['both-linear', 'A: Θ(n) · B: Θ(n)', false, 'Die innere Schleife läuft auch dann vollständig, wenn ++c selten ausgeführt wird.'],
          ['both-square', 'A: Θ(n²) · B: Θ(n²)', false, 'A besitzt nur einen linearen Durchlauf.']
        ]
      },
      verdict: {
        prompt: 'Welche Funktion skaliert für große n besser?',
        hint: 'Vergleiche n mit n².',
        choices: [
          ['a', 'A, weil es dieselbe Ausgabe ohne n² Prüfungen erzeugt.', true, 'Richtig: A vermeidet die redundante innere Schleife.'],
          ['tie', 'Beide gleich, weil beide n zurückgeben.', false, 'Gleiche Ausgabe garantiert keine gleiche Laufzeit.'],
          ['b', 'B, weil die if-Bedingung nur n-mal wahr ist.', false, 'Auch die n²−n falschen Prüfungen kosten Zeit.']
        ]
      },
      examSentence: 'Beide Funktionen geben n zurück, aber A läuft in Θ(n), während B wegen der verschachtelten Schleifen Θ(n²) Bedingungsprüfungen ausführt.',
      conclusion: 'Zähle nicht nur erfolgreiche Änderungen. Auch ein Vergleich, der fast immer falsch ist, wird ausgeführt.'
    },
    {
      id: 'zero-product', tab: '4 · Früh raus', title: 'Null ignorieren oder sofort zurückgeben',
      goal: 'Vergleiche Ausgabe, Vorbedingung und Best/Worst getrennt.',
      source: 'Quelle: Probeklausur.pdf, Aufgabe 4 · Produktfunktionen und Nullbehandlung.',
      relation: {
        prompt: 'A ignoriert Nullen, B gibt bei der ersten Null sofort 0 zurück. Wann liefern sie dasselbe?',
        hint: 'Teste das kleinste Gegenbeispiel [2, 0, 3].',
        choices: [
          ['no-zero', 'Wenn das Array keine Null enthält', true, 'Richtig: Ohne Null multiplizieren beide dieselben Werte.'],
          ['always', 'Für jedes Array', false, 'Bei [2,0,3] liefert A 6 und B 0.'],
          ['only-zero', 'Nur wenn alle Werte 0 sind', false, 'A würde dann 1 zurückgeben, B dagegen 0.']
        ]
      },
      a: {
        label: 'Null überspringen',
        lines: [
          ['int productA(int* a, int n) {'], ['  int prod = 1;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' {'],
          ['    ', ['if (a[i] != 0)', 'condition'], ' prod *= a[i];'],
          ['  }'], ['  return prod;'], ['}']
        ],
        motors: [['loop', 'Klicke den Motor, der auch nach einer Null weiterläuft.', 'A prüft immer alle n Elemente.', 'Es gibt keinen return im Schleifenkörper.']]
      },
      b: {
        label: 'Bei Null abbrechen',
        lines: [
          ['int productB(int* a, int n) {'], ['  int prod = 1;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' {'],
          ['    if (a[i] == 0) ', ['return 0', 'early'], ';'],
          ['    prod *= a[i];'], ['  }'], ['  return prod;'], ['}']
        ],
        motors: [
          ['loop', 'Klicke den normalen Wiederholungsmotor von B.', 'Ohne Null kann auch B alle n Werte besuchen.', 'Suche den for-Kopf.'],
          ['early', 'Klicke die Stelle, die B schon im ersten Durchlauf beenden kann.', 'return 0 erzeugt den konstanten Best Case.', 'Gesucht ist der frühe Funktionsausstieg, nicht nur die if-Bedingung.']
        ]
      },
      runtime: {
        prompt: 'Welche Best/Worst-Aussage ist korrekt?',
        hint: 'Teste für B eine Null an Position 0 und danach ein Array ohne Null.',
        choices: [
          ['mixed', 'A: Best/Worst Θ(n) · B: Best Θ(1), Worst Θ(n)', true, 'Genau: Nur B kann die Funktion sofort verlassen.'],
          ['both-linear', 'A und B: Best/Worst immer Θ(n)', false, 'B endet bei a[0] == 0 nach konstant vielen Schritten.'],
          ['a-constant', 'A: Best Θ(1) · B: Best Θ(n)', false, 'A besitzt keinen frühen return und prüft immer alle Werte.']
        ]
      },
      verdict: {
        prompt: 'Welche Gesamtaussage berücksichtigt auch die Korrektheit?',
        hint: 'Schneller ist nur nützlich, wenn beide unter der betrachteten Vorbedingung dasselbe berechnen.',
        choices: [
          ['condition', 'B kann früher enden; vergleichbar sind die Ergebnisse aber nur ohne Null.', true, 'Richtig: Laufzeit und Funktionsbedeutung wurden getrennt geprüft.'],
          ['b-always', 'B ist immer die bessere Implementierung.', false, 'Bei Arrays mit Null berechnet B bewusst ein anderes Ergebnis als A.'],
          ['a-fast', 'A ist asymptotisch schneller, weil es Nullen überspringt.', false, 'A bleibt Θ(n); das Überspringen einzelner Multiplikationen beendet den Durchlauf nicht.']
        ]
      },
      examSentence: 'Ohne Null liefern A und B dasselbe Produkt; A benötigt stets Θ(n), während B bei einer Null vorne Best Θ(1), ohne Null aber Worst Θ(n) benötigt.',
      conclusion: 'Ein früher return verändert den Best Case – und möglicherweise zugleich die Bedeutung der Funktion.'
    },
    {
      id: 'direct-vs-unit-sum', tab: '5 · Werte', title: 'Direkte Addition gegen ±1-Schritte',
      goal: 'Erkenne eine Laufzeit, die nicht allein von n abhängt.',
      source: 'Quelle: Probeklausur.pdf, Aufgabe 5 · fun1 gegen fun2.',
      relation: {
        prompt: 'A addiert a[i] direkt. B verändert val |a[i]|‑mal um ±1. Was berechnen beide?',
        hint: 'Spiele für einen Wert v = −3 die drei Schritte von B durch.',
        choices: [
          ['same', 'Beide berechnen Σ a[i]', true, 'Richtig: B simuliert dieselbe Addition in vielen Einzelschritten.'],
          ['absolute', 'B berechnet Σ |a[i]|', false, 'Bei negativen Werten wird val dekrementiert; das Vorzeichen bleibt erhalten.'],
          ['positive', 'B ignoriert negative Werte', false, 'Die zweite while-Schleife verarbeitet gerade die negativen Werte.']
        ]
      },
      a: {
        label: 'Direkt addieren',
        lines: [
          ['int sumA(int* a, int n) {'], ['  int val = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' val += a[i];'],
          ['  return val;'], ['}']
        ],
        motors: [['loop', 'Klicke den einzigen vollständigen Durchlauf.', 'A erledigt konstante Arbeit pro Arraywert.', 'Suche i < n.']]
      },
      b: {
        label: 'Addition simulieren',
        lines: [
          ['int sumB(int* a, int n) {'], ['  int val = 0;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'outer'], ' {'], ['    int v = a[i];'],
          ['    ', ['while (v > 0)', 'positive'], ' { ++val; --v; }'],
          ['    ', ['while (v < 0)', 'negative'], ' { --val; ++v; }'],
          ['  }'], ['  return val;'], ['}']
        ],
        motors: [
          ['outer', 'Klicke den Motor, der alle n Werte auswählt.', 'Der äußere Loop kostet mindestens Θ(n).', 'Suche den for-Kopf.'],
          ['positive', 'Klicke den Motor für einen positiven Wert v.', 'Dieser Loop läuft v-mal, wenn v positiv ist.', 'v nähert sich mit --v der Null.'],
          ['negative', 'Klicke den Motor für einen negativen Wert v.', 'Dieser Loop läuft |v|-mal, wenn v negativ ist.', 'v nähert sich mit ++v der Null.']
        ]
      },
      runtime: {
        prompt: 'Welche Beschreibung berücksichtigt sowohl Anzahl als auch Beträge der Werte?',
        hint: 'Bei [1,1,1] macht B drei innere Schritte, bei [100,100,100] dreihundert.',
        choices: [
          ['value-aware', 'A: Θ(n) · B: Θ(n + Σ|a[i]|)', true, 'Genau: Für B reicht n als alleinige Größe nicht.'],
          ['both-linear', 'A und B immer Θ(n)', false, 'Bei festem n können die Beträge und damit Bs Arbeit beliebig wachsen.'],
          ['b-square', 'B immer Θ(n²)', false, 'Die inneren Runden hängen von den Werten ab, nicht automatisch von n.']
        ]
      },
      verdict: {
        prompt: 'Wann erwartest du für B deutlich mehr Arbeit?',
        hint: 'Halte n fest und vergrößere nur die Beträge.',
        choices: [
          ['large-values', 'Bei großen positiven oder negativen Beträgen.', true, 'Richtig: Entscheidend ist Σ|a[i]|.'],
          ['negative-only', 'Nur bei negativen Zahlen.', false, 'Auch große positive Werte erzeugen viele +1-Schritte.'],
          ['large-n-only', 'Nur wenn n wächst; Werte sind egal.', false, 'Schon bei festem n können große Beträge B stark verlangsamen.']
        ]
      },
      examSentence: 'Beide Funktionen berechnen Σa[i]; A läuft in Θ(n), B dagegen in Θ(n + Σ|a[i]|) und wird deshalb bei großen Beträgen deutlich langsamer.',
      conclusion: 'Eingabegröße ist nicht immer nur die Zahl der Elemente. Manchmal treiben die Werte selbst die Wiederholungen.'
    },
    {
      id: 'decrement-vs-halving', tab: '6 · −1 / ÷2', title: 'Herunterzählen gegen Halbieren',
      goal: 'Lies den Fortschritt der Schleife, nicht nur ihre Bedingung.',
      source: 'Didaktische Transferform zu Probeklausur.pdf, Aufgabe 14 · lineares und logarithmisches Schrumpfen.',
      relation: {
        prompt: 'Beide zählen ihre Schleifenrunden. Geben sie für allgemeines n denselben Zähler zurück?',
        hint: 'Teste n = 8: Wie viele Zustände entstehen bei −1 und bei ÷2?',
        choices: [
          ['different', 'Nein, die Zahl der Schritte ist im Allgemeinen verschieden.', true, 'Richtig: 8 braucht sieben Dekremente, aber nur drei Halbierungen.'],
          ['same', 'Ja, beide geben n−1 zurück.', false, 'Beim Halbieren werden viele Zwischenwerte übersprungen.'],
          ['both-log', 'Ja, beide geben log₂n zurück.', false, 'A verändert n nur um 1 pro Runde.']
        ]
      },
      a: {
        label: 'Minus eins',
        lines: [
          ['int stepsA(int n) {'], ['  int c = 0;'],
          ['  ', ['while (n > 1)', 'loop'], ' {'],
          ['    ', ['--n', 'decrement'], '; ++c;'], ['  }'], ['  return c;'], ['}']
        ],
        motors: [
          ['loop', 'Klicke den Wiederholungsmotor von A.', 'A läuft, solange n größer als 1 ist.', 'Suche die while-Bedingung.'],
          ['decrement', 'Klicke den Fortschritt pro Runde.', 'n sinkt nur um 1; dadurch entstehen ungefähr n Runden.', 'Suche Minus-Minus.']
        ]
      },
      b: {
        label: 'Durch zwei',
        lines: [
          ['int stepsB(int n) {'], ['  int c = 0;'],
          ['  ', ['while (n > 1)', 'loop'], ' {'],
          ['    ', ['n /= 2', 'halve'], '; ++c;'], ['  }'], ['  return c;'], ['}']
        ],
        motors: [
          ['loop', 'Klicke den Wiederholungsmotor von B.', 'B besitzt dieselbe Schleifenbedingung wie A.', 'Suche die while-Bedingung.'],
          ['halve', 'Klicke den entscheidenden Fortschritt von B.', 'Jede Runde halbiert die Restgröße.', 'Suche die Division durch 2.']
        ]
      },
      runtime: {
        prompt: 'Welche Klassen folgen aus −1 und ÷2?',
        hint: 'Der Logarithmus zählt, wie oft eine Zahl halbiert werden kann.',
        choices: [
          ['linear-log', 'A: Θ(n) · B: Θ(log n)', true, 'Genau: ungefähr n Dekremente gegen logarithmisch viele Halbierungen.'],
          ['both-linear', 'A: Θ(n) · B: Θ(n)', false, 'Halbieren erzeugt viel weniger als n Runden.'],
          ['both-log', 'A: Θ(log n) · B: Θ(log n)', false, 'A überspringt nichts und zählt einzeln herunter.']
        ]
      },
      verdict: {
        prompt: 'Was ist die korrekte Vergleichsaussage?',
        hint: 'n wächst schneller als log n; die Funktionen berechnen aber verschiedene Schrittzahlen.',
        choices: [
          ['b', 'B wächst langsamer, berechnet aber nicht denselben Zähler wie A.', true, 'Richtig: Laufzeitvorteil und andere Ausgabe gehören beide in das Urteil.'],
          ['replace', 'B kann A immer ersetzen, weil B schneller ist.', false, 'Schneller reicht nicht: Die Rückgabewerte unterscheiden sich.'],
          ['a', 'A wächst langsamer, weil −1 billiger als Division ist.', false, 'Die Zahl der Runden dominiert für große n den konstanten Einzelpreis.']
        ]
      },
      examSentence: 'A und B liefern im Allgemeinen verschiedene Schrittzahlen; A benötigt Θ(n) Dekremente, B nur Θ(log n) Halbierungen.',
      conclusion: 'Bei Schleifen mit gleicher Bedingung entscheidet oft allein das Update zwischen linear und logarithmisch.'
    },
    {
      id: 'factorial-loop-vs-recursion', tab: '7 · n!', title: 'Fakultät als Schleife und Rekursion',
      goal: 'Trenne Ergebniswachstum von der Zahl der ausgeführten Schritte.',
      source: 'Quelle: Probeklausur.pdf, Aufgabe 3 · Fakultätsfunktion und Rekurrenz.',
      relation: {
        prompt: 'Für n ≥ 0: Berechnen beide Funktionen n Fakultät?',
        hint: 'B entfaltet sich zu n · (n−1) · … · 1.',
        choices: [
          ['same', 'Ja, beide berechnen n!', true, 'Richtig: Schleife und Rekursionskette multiplizieren dieselben Faktoren.'],
          ['recursion-sum', 'Nein, B addiert die Zahlen.', false, 'Im return steht eine Multiplikation.'],
          ['only-even', 'Nur für gerade n', false, 'Die Parität spielt für die Fakultät keine Rolle.']
        ]
      },
      a: {
        label: 'Iterativ',
        lines: [
          ['int factorialA(int n) {'], ['  int result = 1;'],
          ['  ', ['for (int i = 2; i <= n; ++i)', 'loop'], ' result *= i;'],
          ['  return result;'], ['}']
        ],
        motors: [['loop', 'Klicke den Motor, der die Faktoren 2 bis n besucht.', 'Die Schleife erzeugt ungefähr n Multiplikationen.', 'Suche i <= n.']]
      },
      b: {
        label: 'Rekursiv',
        lines: [
          ['int factorialB(int n) {'], ['  if (n <= 1) return 1;'],
          ['  return n * ', ['factorialB', 'call'], '(', ['n - 1', 'shrink'], ');'], ['}']
        ],
        motors: [
          ['call', 'Klicke den Selbstaufruf.', 'factorialB innerhalb von factorialB startet die nächste Ebene.', 'Suche den wiederholten Funktionsnamen.'],
          ['shrink', 'Klicke die Verkleinerung des nächsten Problems.', 'n−1 erzeugt eine einzelne Kette bis zum Basisfall.', 'Betrachte das Argument des Selbstaufrufs.']
        ]
      },
      runtime: {
        prompt: 'Wie viele Schleifenrunden beziehungsweise Rekursionsebenen entstehen?',
        hint: 'Male nur n → n−1 → … → 1, nicht den Zahlenwert des Ergebnisses.',
        choices: [
          ['both-linear', 'A: Θ(n) · B: Θ(n)', true, 'Genau: Beide führen linear viele Multiplikationen aus.'],
          ['b-factorial', 'A: Θ(n) · B: Θ(n!)', false, 'n! ist der Ergebniswert, nicht die Anzahl der Aufrufe.'],
          ['b-exponential', 'A: Θ(n) · B: Θ(2ⁿ)', false, 'B enthält pro Ebene nur einen rekursiven Aufruf.']
        ]
      },
      verdict: {
        prompt: 'Welche Begründung trifft die zentrale Rekursionsfalle?',
        hint: 'Zähle Aufrufe, nicht die Größe der zurückgegebenen Zahl.',
        choices: [
          ['chain', 'B bildet eine Kette aus n Aufrufen; n! beschreibt nur das Ergebnis.', true, 'Richtig: Ein Selbstaufruf pro Ebene ergibt lineare Laufzeit.'],
          ['name', 'Eine Fakultätsfunktion hat automatisch Θ(n!).', false, 'Der Funktionsname oder Ergebniswert legt die Laufzeit nicht fest.'],
          ['recursive', 'Jede Rekursion ist exponentiell.', false, 'Exponentiell wird es erst bei entsprechender Verzweigung.']
        ]
      },
      examSentence: 'Beide Funktionen berechnen n! und laufen in Θ(n), denn A hat n Schleifenrunden und B eine unverzweigte Kette von n Rekursionsaufrufen.',
      conclusion: 'Das Ausrufezeichen gehört zum Ergebnis. Für die Laufzeit zählt die Form des Aufrufbaums.'
    },
    {
      id: 'power-loop-vs-branching', tab: '8 · 2 Äste', title: 'Gleiches 2ⁿ, völlig andere Arbeit',
      goal: 'Erkenne doppelte Rekursion als echten Aufrufbaum.',
      source: 'Didaktische Verbindung aus Probeklausur.pdf, Aufgaben 3 und 13 · Ergebniswachstum und Doppelrekursion.',
      relation: {
        prompt: 'A verdoppelt p n-mal. B addiert zweimal dasselbe Teilproblem. Was geben beide für n ≥ 0 zurück?',
        hint: 'B(n) = B(n−1) + B(n−1) mit B(0) = 1.',
        choices: [
          ['same', 'Beide geben 2ⁿ zurück', true, 'Richtig: Beide verdoppeln den Ergebniswert pro Stufe.'],
          ['b-linear-result', 'B gibt 2n zurück', false, 'Jede Ebene verdoppelt den vollständigen Wert der vorherigen Ebene.'],
          ['different', 'A und B haben verschiedene Ergebnisse', false, 'Die Rekurrenz von B löst sich ebenfalls zu 2ⁿ.']
        ]
      },
      a: {
        label: 'Wert iterativ verdoppeln',
        lines: [
          ['int powerA(int n) {'], ['  int p = 1;'],
          ['  ', ['for (int i = 0; i < n; ++i)', 'loop'], ' p *= 2;'],
          ['  return p;'], ['}']
        ],
        motors: [['loop', 'Klicke den einzigen Wiederholungsmotor.', 'A verdoppelt den Wert in n Schleifenrunden.', 'Suche i < n.']]
      },
      b: {
        label: 'Teilproblem doppelt rechnen',
        lines: [
          ['int powerB(int n) {'], ['  if (n == 0) return 1;'],
          ['  return ', ['powerB(n - 1)', 'left-call'], ' + ', ['powerB(n - 1)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Klicke den ersten rekursiven Ast.', 'Der erste Aufruf erzeugt ein Teilproblem der Größe n−1.', 'Links vom Plus steht ein Selbstaufruf.'],
          ['right-call', 'Klicke den zweiten rekursiven Ast.', 'Der zweite Aufruf berechnet dasselbe Teilproblem erneut.', 'Rechts vom Plus steht noch ein Selbstaufruf.']
        ]
      },
      runtime: {
        prompt: 'Welche Laufzeiten folgen aus einer Schleife gegenüber zwei neuen Aufrufen pro Ebene?',
        hint: 'Der Aufrufbaum von B verdoppelt ungefähr seine Knotenzahl pro Ebene.',
        choices: [
          ['linear-exp', 'A: Θ(n) · B: Θ(2ⁿ)', true, 'Genau: B berechnet dieselben Teilprobleme exponentiell oft neu.'],
          ['both-exp', 'A: Θ(2ⁿ) · B: Θ(2ⁿ)', false, 'A erzeugt den großen Wert in nur n Verdopplungen.'],
          ['both-linear', 'A: Θ(n) · B: Θ(n)', false, 'Bei B reicht es nicht, nur die Rekursionstiefe zu zählen.']
        ]
      },
      verdict: {
        prompt: 'Warum ist B trotz gleicher Ausgabe schlechter skalierbar?',
        hint: 'Unterscheide Ergebnis verdoppeln von Rechenarbeit verdoppeln.',
        choices: [
          ['duplicate', 'B berechnet auf jeder Ebene dasselbe Teilproblem zweimal neu.', true, 'Richtig: Die doppelte Verzweigung erzeugt den exponentiellen Aufrufbaum.'],
          ['result', 'Weil das Ergebnis 2ⁿ groß ist.', false, 'A hat dasselbe Ergebnis und bleibt trotzdem linear.'],
          ['recursion', 'Nur weil B rekursiv geschrieben ist.', false, 'Eine unverzweigte Rekursion könnte ebenfalls linear sein.']
        ]
      },
      examSentence: 'Beide Funktionen liefern 2ⁿ; A benötigt Θ(n) Verdopplungen, B wegen zweier rekursiver Aufrufe pro Ebene jedoch Θ(2ⁿ) Aufrufe.',
      conclusion: 'Gleicher Ergebniswert, anderer Aufrufbaum: Das ist der sauberste Beweis, dass Ergebniswachstum nicht Laufzeitwachstum ist.'
    },
    {
      id: 'selection-vs-insertion', tab: '9 · Sortieren', title: 'SelectionSort gegen InsertionSort',
      goal: 'Vergleiche zwei korrekte Sortierungen über Best und Worst Case.',
      source: 'Quelle: Probeklausur.pdf, Aufgabe 1 · SelectionSort; InsertionSort als kursnahe Transferimplementierung.',
      relation: {
        prompt: 'Welche Aussage über die Ausgabe gilt nach vollständiger Ausführung?',
        hint: 'A wählt jeweils das Minimum; B schiebt den aktuellen Schlüssel an seine Position.',
        choices: [
          ['same', 'Beide sortieren das Array aufsteigend.', true, 'Richtig: Die Strategie unterscheidet sich, das Sortierziel nicht.'],
          ['a-only', 'Nur A sortiert vollständig.', false, 'Auch InsertionSort fügt jedes Element in das sortierte Präfix ein.'],
          ['different-order', 'A sortiert aufsteigend, B absteigend.', false, 'Bs while verschiebt größere Werte nach rechts und erzeugt damit aufsteigende Ordnung.']
        ]
      },
      a: {
        label: 'SelectionSort',
        lines: [
          [['for (int i = 0; i < n - 1; ++i)', 'outer'], ' {'], ['  int min = i;'],
          ['  ', ['for (int j = i + 1; j < n; ++j)', 'inner'], ''],
          ['    if (a[j] < a[min]) min = j;'], ['  swap(a[i], a[min]);'], ['}']
        ],
        motors: [
          ['outer', 'Klicke die äußeren Auswahlrunden.', 'A legt nacheinander jede Arrayposition fest.', 'Suche den Loop mit i.'],
          ['inner', 'Klicke die Suche im jeweils verbleibenden Rest.', 'Die inneren Längen bilden n−1 + n−2 + … + 1.', 'Suche den eingerückten Loop mit j.']
        ]
      },
      b: {
        label: 'InsertionSort',
        lines: [
          [['for (int i = 1; i < n; ++i)', 'outer'], ' {'], ['  int key = a[i], j = i - 1;'],
          ['  ', ['while (j >= 0 && a[j] > key)', 'shift-loop'], ' {'],
          ['    a[j + 1] = a[j]; --j;'], ['  }'], ['  a[j + 1] = key;'], ['}']
        ],
        motors: [
          ['outer', 'Klicke den Motor, der jedes neue Element auswählt.', 'B erweitert das sortierte Präfix n−1-mal.', 'Suche den for-Kopf mit i.'],
          ['shift-loop', 'Klicke den Motor, der je nach Eingabe früh stoppen kann.', 'Die while-Schleife verschiebt nur Werte, die größer als key sind.', 'Bei bereits sortierter Eingabe ist ihre Bedingung sofort falsch.']
        ]
      },
      runtime: {
        prompt: 'Wie unterscheiden sich Best und Worst Case?',
        hint: 'SelectionSort durchsucht den Rest immer; InsertionSort verschiebt bei sortierter Eingabe nichts.',
        choices: [
          ['correct', 'A: Best/Worst Θ(n²) · B: Best Θ(n), Worst Θ(n²)', true, 'Genau: Nur B profitiert asymptotisch von bereits sortierter Eingabe.'],
          ['both-square', 'A und B: Best/Worst immer Θ(n²)', false, 'Bei sortierter Eingabe prüft Bs while pro äußerer Runde nur einmal.'],
          ['a-linear', 'A: Best Θ(n) · B: Best Θ(n²)', false, 'SelectionSort führt seine Restminimum-Suche unabhängig von der Ordnung aus.']
        ]
      },
      verdict: {
        prompt: 'Unter welcher Eingabe hat B den klaren asymptotischen Vorteil?',
        hint: 'Wann muss kein Element nach rechts verschoben werden?',
        choices: [
          ['sorted', 'Bei bereits aufsteigend sortierter Eingabe.', true, 'Richtig: Dann läuft InsertionSort in Θ(n).'],
          ['reverse', 'Bei absteigend sortierter Eingabe.', false, 'Dann muss B besonders viele Werte verschieben und erreicht Θ(n²).'],
          ['never', 'Nie, weil beide sortieren.', false, 'Gleiche Aufgabe bedeutet nicht gleiche Best-Case-Laufzeit.']
        ]
      },
      examSentence: 'Beide Algorithmen sortieren aufsteigend; SelectionSort ist im Best und Worst Case Θ(n²), InsertionSort bei sortierter Eingabe Θ(n), im Worst Case aber ebenfalls Θ(n²).',
      conclusion: 'Ein Algorithmus kann dieselbe Aufgabe lösen und dennoch stärker auf die konkrete Eingabeordnung reagieren.'
    },
    {
      id: 'tree-vs-bst', tab: '10 · Baum', title: 'Vollständige Baumsuche gegen BST-Pfad',
      goal: 'Formuliere die Vorbedingung und unterscheide k von der Baumhöhe h.',
      source: 'Quelle: Probeklausur.pdf, Aufgaben 10–12 · Baumrekursion und binärer Suchbaum.',
      relation: {
        prompt: 'A durchsucht beide Teilbäume. B folgt anhand des Werts nur einem Pfad. Wann sind beide Suchergebnisse zuverlässig gleich?',
        hint: 'B verwirft bei x < value den gesamten rechten Teilbaum. Wann ist das erlaubt?',
        choices: [
          ['bst', 'Wenn der Baum die BST-Suchordnung erfüllt.', true, 'Richtig: Nur dann darf B den jeweils anderen Teilbaum sicher ausschließen.'],
          ['always', 'Bei jedem beliebigen Binärbaum.', false, 'Ohne Suchordnung könnte der gesuchte Wert im verworfenen Teilbaum liegen.'],
          ['balanced-only', 'Nur wenn der Baum perfekt balanciert ist.', false, 'Balance beeinflusst die Höhe, nicht die Korrektheit der BST-Suche.']
        ]
      },
      a: {
        label: 'Allgemeiner Binärbaum',
        lines: [
          ['bool containsA(Node* p, int x) {'], ['  if (p == nullptr) return false;'],
          ['  if (p->value == x) return true;'],
          ['  return ', ['containsA(p->left, x)', 'left-call'], ' ||'],
          ['         ', ['containsA(p->right, x)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Klicke den Aufruf für den linken Teilbaum.', 'A kann den gesamten linken Teilbaum durchsuchen.', 'Suche containsA mit p->left.'],
          ['right-call', 'Klicke den Aufruf für den rechten Teilbaum.', 'Wenn links kein Treffer entsteht, kann A auch rechts weitersuchen.', 'Suche containsA mit p->right.']
        ]
      },
      b: {
        label: 'Binärer Suchbaum',
        lines: [
          ['bool containsB(Node* p, int x) {'],
          ['  ', ['while (p != nullptr && p->value != x)', 'loop'], ' {'],
          ['    ', ['p = x < p->value ? p->left : p->right', 'branch'], ';'],
          ['  }'], ['  return p != nullptr;'], ['}']
        ],
        motors: [
          ['loop', 'Klicke den Motor, der einen Baumlevel pro Runde besucht.', 'B läuft höchstens entlang eines Wurzel-Blatt-Pfads.', 'Suche die while-Bedingung.'],
          ['branch', 'Klicke die Stelle, die immer nur einen Teilbaum auswählt.', 'Die BST-Ordnung erlaubt links oder rechts statt beide.', 'Suche den ternären Ausdruck mit p->left und p->right.']
        ]
      },
      runtime: {
        prompt: 'k sei die Knotenzahl und h die Höhe. Welche Worst-Case-Beschreibung ist präzise?',
        hint: 'A kann jeden Knoten besuchen; B besucht höchstens einen Pfad mit h Knoten.',
        choices: [
          ['k-h', 'A: Θ(k) · B: Θ(h)', true, 'Genau: Bs Vorteil hängt von der Baumhöhe ab.'],
          ['both-log', 'A und B immer Θ(log k)', false, 'A kann den vollständigen Baum durchsuchen; außerdem kann ein BST entarten.'],
          ['a-h-b-k', 'A: Θ(h) · B: Θ(k)', false, 'A verzweigt in beide Teilbäume, B folgt nur einem Pfad.']
        ]
      },
      verdict: {
        prompt: 'Wann wird aus Bs Θ(h) ein logarithmischer Vorteil?',
        hint: 'Wie groß ist die Höhe eines balancierten Baums im Verhältnis zu k?',
        choices: [
          ['balanced', 'Bei einem balancierten BST ist h = Θ(log k); entartet kann h = Θ(k) sein.', true, 'Richtig: Suchordnung sichert Korrektheit, Balance die logarithmische Höhe.'],
          ['always-log', 'Jeder BST hat automatisch h = Θ(log k).', false, 'Sortiert eingefügte Werte können ohne Balancierung eine Kette erzeugen.'],
          ['balance-correctness', 'Nur Balance macht die Suche korrekt.', false, 'Die BST-Ordnung macht sie korrekt; Balance macht sie schnell.']
        ]
      },
      examSentence: 'Auf einem gültigen BST liefern beide Suchen dasselbe; A benötigt im Worst Case Θ(k), B Θ(h), also bei Balance Θ(log k), bei einem entarteten Baum jedoch Θ(k).',
      conclusion: 'Zwei Eigenschaften, zwei Aufgaben: BST-Ordnung garantiert korrektes Verwerfen, Balance garantiert eine kleine Höhe.'
    }
  ];

  const selectionLines = [
    [['for (int i = 0; i < n - 1; ++i)', 'outer'], ' {'], ['  int min = i;'],
    ['  ', ['for (int j = i + 1; j < n; ++j)', 'inner'], ''],
    ['    if (a[j] < a[min]) min = j;'], ['  swap(a[i], a[min]);'], ['}']
  ];
  const insertionLines = [
    [['for (int i = 1; i < n; ++i)', 'outer'], ' {'], ['  int key = a[i], j = i - 1;'],
    ['  ', ['while (j >= 0 && a[j] > key)', 'shift'], ' {'],
    ['    a[j + 1] = a[j]; --j;'], ['  }'], ['  a[j + 1] = key;'], ['}']
  ];
  const selectionMotors = [
    ['outer', 'Markiere die äußeren Auswahlrunden.', 'A legt nacheinander jede Zielposition fest.', 'Suche die Schleife mit i.'],
    ['inner', 'Markiere die vollständige Suche im Restarray.', 'A prüft den Rest auch dann vollständig, wenn die Eingabe schon günstig liegt.', 'Suche die eingerückte j-Schleife.']
  ];
  const insertionMotors = [
    ['outer', 'Markiere die Runden, die das sortierte Präfix erweitern.', 'B betrachtet nacheinander jedes neue Schlüsselelement.', 'Suche die Schleife mit i.'],
    ['shift', 'Markiere die eingabeabhängige Verschiebeschleife.', 'Die Zahl der Verschiebungen hängt von der Zahl der Inversionen ab.', 'Suche die while-Bedingung mit a[j] > key.']
  ];
  const makeSortTransfer = ({ id, tab, title, goal, input, runtime, verdict, examSentence, conclusion }) => ({
    id, tab, title, goal, level: 'transfer', topic: 'Sortieren',
    source: `Didaktischer Transfer zu Probeklausur.pdf, Aufgabe 1 · SelectionSort; feste Eingabeform: ${input}.`,
    relation: {
      prompt: 'Welche Aussage gilt nach vollständiger Ausführung auf demselben Array?',
      hint: 'Beide Algorithmen verändern die Reihenfolge, bis das Array aufsteigend ist.',
      choices: [
        ['same', 'Beide sortieren das Array aufsteigend.', true, 'Richtig: Die Strategie unterscheidet sich, das Ergebnis nicht.'],
        ['a-only', 'Nur A sortiert vollständig.', false, 'B fügt jedes neue Element an die richtige Stelle im sortierten Präfix ein.'],
        ['different-order', 'A sortiert aufsteigend, B absteigend.', false, 'B verschiebt größere Werte nach rechts und sortiert ebenfalls aufsteigend.']
      ]
    },
    a: { label: 'SelectionSort', lines: selectionLines, motors: selectionMotors },
    b: { label: 'InsertionSort', lines: insertionLines, motors: insertionMotors },
    runtime,
    verdict,
    examSentence,
    conclusion
  });

  const transferDuels = [
    {
      id: 'recursion-chain-vs-branch', tab: 'R1 · Kette/Baum', title: 'Ein Folgeaufruf gegen zwei gleiche Folgeaufrufe',
      goal: 'Leite Ausgabe und Laufzeit getrennt aus dem Aufrufbaum ab.', level: 'transfer', topic: 'Rekursion',
      source: 'Didaktischer Transfer zu Probeklausur.pdf, Aufgaben 13 und 14 · Einzelkette gegen Doppelrekursion.',
      relation: {
        prompt: 'Für n ≥ 2: Geben beide Funktionen denselben Wert zurück?',
        hint: 'Probiere n=2: A addiert entlang einer Kette; B verdoppelt das vorige Ergebnis.',
        choices: [
          ['different', 'Nein. A gibt n+1 zurück, B gibt 2ⁿ zurück.', true, 'Richtig: gleicher Startwert, aber Addition gegen Verdopplung.'],
          ['same', 'Ja. Beide geben n+1 zurück.', false, 'B verwendet das Teilproblem zweimal und verdoppelt dadurch den Wert jeder Ebene.'],
          ['both-power', 'Ja. Beide geben 2ⁿ zurück.', false, 'A besitzt nur einen Folgeaufruf und addiert pro Ebene genau 1.']
        ]
      },
      a: {
        label: 'Eine Rekursionskette',
        lines: [
          ['int countA(int n) {'], ['  if (n <= 0) return 1;'],
          ['  return 1 + ', ['countA', 'call'], '(', ['n - 1', 'shrink'], ');'], ['}']
        ],
        motors: [
          ['call', 'Markiere den einzigen Selbstaufruf von A.', 'A erzeugt genau ein Kind pro Ebene.', 'Suche countA im Funktionskörper.'],
          ['shrink', 'Markiere die Verkleinerung des Arguments.', 'n−1 erzeugt ungefähr n Ebenen.', 'Betrachte das Argument des Selbstaufrufs.']
        ]
      },
      b: {
        label: 'Doppelter Folgeaufruf',
        lines: [
          ['int countB(int n) {'], ['  if (n <= 0) return 1;'],
          ['  return ', ['countB(n - 1)', 'left-call'], ' + ', ['countB(n - 1)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere den ersten Selbstaufruf von B.', 'Der erste Aufruf erzeugt einen Ast der Größe n−1.', 'Links vom Plus steht der erste Aufruf.'],
          ['right-call', 'Markiere den zweiten Selbstaufruf von B.', 'B berechnet dasselbe Teilproblem ein zweites Mal.', 'Rechts vom Plus steht der zweite Aufruf.']
        ]
      },
      runtime: {
        prompt: 'Welche Laufzeiten folgen aus einer Kette und einem binären Aufrufbaum?',
        hint: 'Zähle die Knoten pro Ebene: A hat immer 1; B hat 1, 2, 4, 8, …',
        choices: [
          ['linear-exp', 'A: Θ(n) · B: Θ(2ⁿ)', true, 'Genau: lineare Tiefe gegen exponentiell wachsende Ebenenbreite.'],
          ['both-linear', 'A und B: Θ(n)', false, 'Bei B reicht die Tiefe nicht; beide Äste werden vollständig ausgeführt.'],
          ['linear-square', 'A: Θ(n) · B: Θ(n²)', false, 'Zwei Aufrufe verdoppeln die Breite jeder Ebene statt nur mit n zu multiplizieren.']
        ]
      },
      verdict: {
        prompt: 'Welche Aussage trennt Ergebniswachstum und Laufzeit sauber?',
        hint: 'Bei B wachsen Ergebnis und Zahl der Aufrufe exponentiell; das folgt aus zwei getrennten Verdopplungen.',
        choices: [
          ['tree', 'B bildet einen Aufrufbaum und berechnet dasselbe Teilproblem zweimal; A bildet nur eine Kette.', true, 'Richtig: Die Anzahl der rekursiven Folgeaufrufe entscheidet.'],
          ['recursive', 'B ist nur deshalb langsamer, weil es rekursiv ist.', false, 'A ist ebenfalls rekursiv und bleibt linear.'],
          ['result-only', 'Der größere Rückgabewert allein beweist die größere Laufzeit.', false, 'Ein großer Wert könnte auch in wenigen Operationen berechnet werden.']
        ]
      },
      examSentence: 'A und B liefern für n≥2 verschiedene Werte; A läuft wegen eines n−1-Aufrufs in Θ(n), B wegen zweier gleicher Folgeaufrufe in Θ(2ⁿ).',
      conclusion: 'Erst Aufrufzahl, dann Ergebniswert: Ein Kind ergibt eine Kette, zwei gleiche Kinder einen Baum.'
    },
    {
      id: 'recursion-minus-one-vs-half', tab: 'R2 · −1/÷2', title: 'Rekursiv herunterzählen gegen rekursiv halbieren',
      goal: 'Übertrage die Fortschrittsregel auf zwei ähnlich aussehende Rekursionen.', level: 'transfer', topic: 'Rekursion',
      source: 'Didaktischer Transfer zu Probeklausur.pdf, Aufgabe 14 · F1/F2-Verkleinerungen.',
      relation: {
        prompt: 'Für n ≥ 3: Zählen beide Funktionen gleich viele Ebenen?',
        hint: 'Trace n=8 einmal mit 8→7→…→1 und einmal mit 8→4→2→1.',
        choices: [
          ['different', 'Nein. A zählt Dekremente, B zählt Halbierungen.', true, 'Richtig: Die Rückgabewerte wachsen unterschiedlich.'],
          ['same', 'Ja. Beide enden bei n≤1 und geben deshalb dasselbe zurück.', false, 'Derselbe Stopp sagt nichts darüber, wie viele Schritte bis dorthin nötig sind.'],
          ['only-even', 'Nur für gerade n sind die Werte immer gleich.', false, 'Schon n=8 erzeugt 7 Dekremente, aber nur 3 Halbierungen.']
        ]
      },
      a: {
        label: 'n wird n−1',
        lines: [
          ['int depthA(int n) {'], ['  if (n <= 1) return 0;'],
          ['  return 1 + ', ['depthA', 'call'], '(', ['n - 1', 'shrink'], ');'], ['}']
        ],
        motors: [
          ['call', 'Markiere den rekursiven Motor von A.', 'A ruft sich einmal pro Ebene auf.', 'Suche depthA im return.'],
          ['shrink', 'Markiere den Fortschritt von A.', 'A entfernt pro Ebene nur 1.', 'Suche n−1.']
        ]
      },
      b: {
        label: 'n wird n/2',
        lines: [
          ['int depthB(int n) {'], ['  if (n <= 1) return 0;'],
          ['  return 1 + ', ['depthB', 'call'], '(', ['n / 2', 'halve'], ');'], ['}']
        ],
        motors: [
          ['call', 'Markiere den rekursiven Motor von B.', 'Auch B hat nur einen Aufruf pro Ebene.', 'Suche depthB im return.'],
          ['halve', 'Markiere den entscheidenden Fortschritt von B.', 'B halbiert die Restgröße pro Ebene.', 'Suche n/2.']
        ]
      },
      runtime: {
        prompt: 'Welche Klassen passen zu n−1 und n/2?',
        hint: 'Der Logarithmus zählt die Zahl der möglichen Halbierungen.',
        choices: [
          ['linear-log', 'A: Θ(n) · B: Θ(log n)', true, 'Genau: ungefähr n Dekremente gegen logarithmisch viele Halbierungen.'],
          ['both-linear', 'A und B: Θ(n)', false, 'B überspringt durch jede Halbierung einen wachsenden Teil der Restgröße.'],
          ['both-log', 'A und B: Θ(log n)', false, 'A halbiert nicht, sondern entfernt immer nur 1.']
        ]
      },
      verdict: {
        prompt: 'Was ist trotz Bs besserer Laufzeit wichtig?',
        hint: 'Vergleiche nicht nur Geschwindigkeit, sondern auch die gezählte Größe.',
        choices: [
          ['not-replacement', 'B wächst langsamer, berechnet aber eine andere Schrittzahl als A.', true, 'Richtig: schneller bedeutet hier nicht austauschbar.'],
          ['replacement', 'B darf A immer ersetzen, weil beide bei 1 stoppen.', false, 'Die Rückgabewerte unterscheiden sich im Allgemeinen.'],
          ['a-faster', 'A ist schneller, weil Subtraktion billiger als Division ist.', false, 'Konstante Operationskosten ändern nicht n gegenüber log n.']
        ]
      },
      examSentence: 'A und B zählen verschiedene Reduktionsschritte; A benötigt Θ(n) Aufrufe mit n−1, B nur Θ(log n) Aufrufe mit n/2.',
      conclusion: 'Bei einer unverzweigten Rekursion entscheidet die Verkleinerung über die Zahl der Ebenen.'
    },
    {
      id: 'tree-once-vs-repeat-left', tab: 'R3 · Doppelt links', title: 'Zwei Teilbäume gegen dasselbe Teilproblem zweimal',
      goal: 'Unterscheide disjunkte Baumteile von wiederholter Arbeit auf denselben Knoten.', level: 'transfer', topic: 'Rekursion',
      source: 'Didaktischer Transfer zu Probeklausur.pdf, Aufgaben 10 und 13 · Baumrekursion plus Doppelaufruf.',
      relation: {
        prompt: 'Berechnen beide Funktionen für einen allgemeinen Binärbaum dieselbe Summe?',
        hint: 'B erwähnt den rechten Teilbaum überhaupt nicht und setzt dafür links zweimal ein.',
        choices: [
          ['different', 'Nein. B ignoriert rechts und addiert links doppelt.', true, 'Richtig: Zwei Aufrufe sind hier nicht zwei verschiedene Teilbäume.'],
          ['same', 'Ja. Zwei rekursive Aufrufe decken automatisch links und rechts ab.', false, 'Beide B-Aufrufe verwenden ausdrücklich p->left.'],
          ['leaves-only', 'Sie unterscheiden sich nur bei Blättern.', false, 'Bei Blättern sind beide Kinder leer; Unterschiede entstehen gerade bei inneren Knoten.']
        ]
      },
      a: {
        label: 'Jeden Knoten einmal',
        lines: [
          ['int sumA(Node* p) {'], ['  if (p == nullptr) return 0;'],
          ['  return p->value + ', ['sumA(p->left)', 'left-call'], ' +'],
          ['                    ', ['sumA(p->right)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere As linken Teilbaum.', 'A besucht den linken Teilbaum einmal.', 'Suche p->left.'],
          ['right-call', 'Markiere As rechten Teilbaum.', 'A besucht den disjunkten rechten Teilbaum einmal.', 'Suche p->right.']
        ]
      },
      b: {
        label: 'Linken Teilbaum doppelt',
        lines: [
          ['int sumB(Node* p) {'], ['  if (p == nullptr) return 0;'],
          ['  return p->value + ', ['sumB(p->left)', 'left-call'], ' +'],
          ['                    ', ['sumB(p->left)', 'repeat-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere Bs ersten linken Aufruf.', 'B berechnet die linke Teilsumme einmal.', 'Suche den ersten Aufruf mit p->left.'],
          ['repeat-call', 'Markiere die wiederholte Arbeit.', 'B berechnet exakt denselben linken Teilbaum erneut.', 'Suche den zweiten identischen Aufruf.']
        ]
      },
      runtime: {
        prompt: 'k sei die Knotenzahl; h sei die Länge einer linken Kette. Welche Worst-Case-Aussage passt?',
        hint: 'A verteilt Arbeit auf vorhandene Knoten. B erzeugt auf einer linken Kette pro Ebene zwei Besuche desselben Rests.',
        choices: [
          ['linear-exp', 'A: Θ(k) · B: Θ(2ʰ)', true, 'Genau: einmal pro realem Knoten gegen wiederholte Verdopplung derselben linken Kette.'],
          ['both-linear', 'A und B: Θ(k)', false, 'B besucht denselben linken Teilbaum nicht einmal, sondern exponentiell oft erneut.'],
          ['both-exp', 'A und B: Θ(2ʰ), weil beide zwei Aufrufe enthalten.', false, 'As Aufrufe teilen den vorhandenen Baum in disjunkte Teilmengen.']
        ]
      },
      verdict: {
        prompt: 'Welche Regel erklärt den Unterschied trotz jeweils zwei Aufrufen?',
        hint: 'Frage, ob die Folgeaufrufe verschiedene Daten oder dieselben Daten erhalten.',
        choices: [
          ['disjoint', 'Disjunkte Teilbäume addieren sich; dasselbe Teilproblem zweimal erzeugt Wiederholungsarbeit.', true, 'Richtig: Nicht die Zahl der Codezeilen, sondern die Überlappung entscheidet.'],
          ['always-exp', 'Zwei rekursive Aufrufe sind immer exponentiell.', false, 'A ist das direkte Gegenbeispiel: jeder reale Knoten wird einmal besucht.'],
          ['always-linear', 'Baumfunktionen sind immer linear in k.', false, 'B kann vorhandene Teilbäume mehrfach besuchen.']
        ]
      },
      examSentence: 'A summiert jeden der k Knoten einmal in Θ(k); B ist nicht äquivalent und wiederholt auf einer linken Kette dasselbe Teilproblem mit Θ(2ʰ) Aufrufen.',
      conclusion: 'Zwei Äste sind nur dann harmlos, wenn sie disjunkte Arbeitspakete besitzen.'
    },
    {
      id: 'preorder-vs-inorder-recursion', tab: 'R4 · Ausgabeort', title: 'Gleicher Aufrufbaum, andere Ausgabereihenfolge',
      goal: 'Erkenne gleiche Laufzeit trotz semantisch unterschiedlicher Reihenfolge.', level: 'transfer', topic: 'Rekursion',
      source: 'Quelle: Probeklausur.pdf, Aufgabe 13 · fun1 und fun2.',
      relation: {
        prompt: 'Für N>1: Erzeugen A und B dieselbe Ausgabesequenz?',
        hint: 'A gibt N vor beiden Aufrufen aus; B gibt N zwischen den Aufrufen aus.',
        choices: [
          ['different-order', 'Nein. Dieselben Werte erscheinen in einer anderen Reihenfolge.', true, 'Richtig: Der Ausgabeort verändert die Sequenz.'],
          ['same', 'Ja. Gleiche Aufrufe bedeuten automatisch gleiche Ausgabe.', false, 'Die Position von cout relativ zu den Aufrufen ist beobachtbar.'],
          ['different-count', 'Nein. B gibt insgesamt weniger Werte aus.', false, 'Beide besitzen denselben Aufrufbaum und genau eine Ausgabe pro Aufruf.']
        ]
      },
      a: {
        label: 'Ausgabe vor den Ästen',
        lines: [
          ['void funA(int N) {'], ['  cout << N;'], ['  if (N > 1) {'],
          ['    ', ['funA(N - 1)', 'left-call'], ';'], ['    ', ['funA(N - 1)', 'right-call'], ';'],
          ['  }'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere As ersten Folgeaufruf.', 'A erzeugt den ersten Ast der Größe N−1.', 'Suche den ersten funA-Aufruf.'],
          ['right-call', 'Markiere As zweiten Folgeaufruf.', 'A erzeugt auch einen zweiten Ast derselben Größe.', 'Suche den zweiten funA-Aufruf.']
        ]
      },
      b: {
        label: 'Ausgabe zwischen den Ästen',
        lines: [
          ['void funB(int N) {'], ['  if (N == 1) { cout << N; return; }'],
          ['  ', ['funB(N - 1)', 'left-call'], ';'], ['  cout << N;'],
          ['  ', ['funB(N - 1)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere Bs ersten Folgeaufruf.', 'B besitzt denselben ersten Ast wie A.', 'Suche den ersten funB-Aufruf.'],
          ['right-call', 'Markiere Bs zweiten Folgeaufruf.', 'Auch B erzeugt zwei gleich große Äste.', 'Suche den zweiten funB-Aufruf.']
        ]
      },
      runtime: {
        prompt: 'Welche Laufzeiten haben die zwei gleich geformten Aufrufbäume?',
        hint: 'Der Ausgabeort ändert konstante Arbeit pro Knoten, aber nicht die Zahl der Knoten.',
        choices: [
          ['both-exp', 'A und B: Θ(2ᴺ)', true, 'Genau: Beide verdoppeln die Zahl der Folgeaufrufe pro Ebene.'],
          ['a-exp-b-linear', 'A: Θ(2ᴺ) · B: Θ(N)', false, 'B besitzt dieselben zwei N−1-Aufrufe wie A.'],
          ['both-linear', 'A und B: Θ(N)', false, 'Die Tiefe ist linear, die gesamte Knotenzahl aber exponentiell.']
        ]
      },
      verdict: {
        prompt: 'Was wäre die saubere Klausuraussage?',
        hint: 'Trenne beobachtbare Ausgabe von asymptotischer Arbeit.',
        choices: [
          ['same-runtime', 'Andere Ausgabereihenfolge, aber gleicher exponentieller Aufrufbaum.', true, 'Richtig: Semantik und Laufzeit sind getrennte Vergleichsachsen.'],
          ['interchangeable', 'Gleiche Laufzeit macht beide Funktionen austauschbar.', false, 'Die Reihenfolge der ausgegebenen Werte unterscheidet sich.'],
          ['cout-dominates', 'cout vor der Rekursion macht A asymptotisch langsamer.', false, 'Eine konstante Ausgabe pro Aufruf verändert die Klasse nicht.']
        ]
      },
      examSentence: 'A und B erzeugen unterschiedliche Ausgabereihenfolgen, besitzen aber denselben binären Aufrufbaum mit Θ(2ᴺ) Aufrufen.',
      conclusion: 'Gleiche Laufzeit beweist keine gleiche Funktion; der Ort einer Operation kann die Semantik ändern.'
    },
    makeSortTransfer({
      id: 'selection-insertion-sorted', tab: 'S1 · Sortiert', title: 'Sortiertes Array: Wer kann die Ordnung nutzen?',
      goal: 'Leite den Best Case aus einer konkreten Eingabe ab.', input: 'bereits aufsteigend sortiert',
      runtime: {
        prompt: 'Das Array ist bereits aufsteigend sortiert. Welche Laufzeiten entstehen?',
        hint: 'A sucht jedes Restminimum trotzdem; Bs while ist in jeder Runde sofort falsch.',
        choices: [
          ['square-linear', 'A: Θ(n²) · B: Θ(n)', true, 'Genau: SelectionSort prüft alle Restpaare, InsertionSort nur die äußeren Runden.'],
          ['both-square', 'A und B: Θ(n²)', false, 'Bei B entstehen keine Verschiebungen; die false-Prüfung pro äußerer Runde bleibt linear.'],
          ['both-linear', 'A und B: Θ(n)', false, 'A führt seine innere Restminimum-Suche unabhängig von der Ordnung aus.']
        ]
      },
      verdict: {
        prompt: 'Welche Eingabeeigenschaft erzeugt Bs Vorteil?',
        hint: 'Zähle, wie oft a[j] > key wahr wird.',
        choices: [
          ['sorted', 'Keine Inversion: B muss keinen Wert verschieben.', true, 'Richtig: Die while-Schleife stoppt sofort.'],
          ['names', 'InsertionSort ist wegen seines Namens immer linear.', false, 'Bei umgekehrter Reihenfolge wird B quadratisch.'],
          ['swap', 'A wird linear, weil swap konstant ist.', false, 'Die quadratisch vielen Vergleiche passieren vor dem swap.']
        ]
      },
      examSentence: 'Beide sortieren aufsteigend; bei bereits sortierter Eingabe bleibt SelectionSort Θ(n²), während InsertionSort ohne Verschiebungen Θ(n) benötigt.',
      conclusion: 'Der Best Case kommt aus dem Datenzustand, nicht aus dem Algorithmusnamen.'
    }),
    makeSortTransfer({
      id: 'selection-insertion-reverse', tab: 'S2 · Rückwärts', title: 'Umgekehrtes Array: gleicher Grad, andere Arbeit',
      goal: 'Unterscheide gleiche Θ-Klasse von identischen Operationen.', input: 'streng absteigend sortiert',
      runtime: {
        prompt: 'Das Array ist streng absteigend sortiert. Welche Laufzeiten entstehen?',
        hint: 'A prüft alle Restpaare; B verschiebt für jeden neuen key das ganze sortierte Präfix.',
        choices: [
          ['both-square', 'A und B: Θ(n²)', true, 'Genau: quadratisch viele Vergleiche gegen quadratisch viele Verschiebungen.'],
          ['a-square-b-linear', 'A: Θ(n²) · B: Θ(n)', false, 'Die umgekehrte Ordnung ist gerade Bs Worst Case.'],
          ['a-linear-b-square', 'A: Θ(n) · B: Θ(n²)', false, 'A spart seine innere Suche auch bei dieser Eingabe nicht ein.']
        ]
      },
      verdict: {
        prompt: 'Was darf man aus derselben Θ-Klasse schließen?',
        hint: 'Asymptotik ignoriert Faktoren und die Art der Grundoperationen.',
        choices: [
          ['same-class', 'Beide skalieren quadratisch; ihre konkreten Vergleiche, Swaps und Shifts bleiben verschieden.', true, 'Richtig: gleiche Klasse ist nicht identische Ausführungsarbeit.'],
          ['same-steps', 'Beide führen exakt gleich viele Operationen aus.', false, 'Die Algorithmen verwenden unterschiedliche Operationen und Zählformeln.'],
          ['a-faster-always', 'SelectionSort ist deshalb für jede Eingabe schneller.', false, 'Aus diesem einen Eingabefall folgt keine universelle reale Rangfolge.']
        ]
      },
      examSentence: 'Beide sortieren aufsteigend und benötigen auf absteigender Eingabe Θ(n²), obwohl SelectionSort Restvergleiche und InsertionSort Verschiebungen ausführt.',
      conclusion: 'Gleiche asymptotische Klasse lässt konkrete Arbeit bewusst offen.'
    }),
    makeSortTransfer({
      id: 'selection-insertion-one-displaced', tab: 'S3 · Fast sortiert', title: 'Ein Wert steht ganz falsch',
      goal: 'Summiere tatsächliche Verschiebungen statt pro Runde den Worst Case anzunehmen.', input: '[2,3,…,n,1]',
      runtime: {
        prompt: 'Nur die letzte 1 muss durch das ganze Präfix wandern. Welche Laufzeiten folgen?',
        hint: 'B hat viele sofort endende Runden und genau eine Runde mit n−1 Verschiebungen.',
        choices: [
          ['square-linear', 'A: Θ(n²) · B: Θ(n)', true, 'Genau: n äußere Prüfungen plus eine lineare Verschiebekette bleiben insgesamt linear.'],
          ['both-square', 'A und B: Θ(n²)', false, 'Eine einzige lange innere Runde wird nicht n-mal wiederholt.'],
          ['both-linear', 'A und B: Θ(n)', false, 'A durchsucht in jeder Runde weiterhin das vollständige Restarray.']
        ]
      },
      verdict: {
        prompt: 'Welche Zählidee erklärt InsertionSort hier am besten?',
        hint: 'Eine Inversion ist ein Wertepaar in falscher Reihenfolge.',
        choices: [
          ['inversions', 'B kostet Θ(n + I); hier gibt es nur I=n−1 Inversionen.', true, 'Richtig: tatsächliche Verschiebungen statt verschachtelte Syntax zählen.'],
          ['nested', 'for plus while ist automatisch Θ(n²).', false, 'Die while-Schleife läuft nicht in jeder äußeren Runde n-mal.'],
          ['constant', 'Eine falsch platzierte Zahl kostet nur Θ(1).', false, 'Die 1 muss an n−1 Werten vorbeigeschoben werden.']
        ]
      },
      examSentence: 'Beide sortieren aufsteigend; für [2,3,…,n,1] bleibt SelectionSort Θ(n²), während InsertionSort mit Θ(n+I)=Θ(n) nur n−1 Inversionen verschiebt.',
      conclusion: 'Verschachtelung liefert erst zusammen mit der tatsächlichen inneren Rundenzahl die Laufzeit.'
    }),
    {
      id: 'tree-max-general-vs-bst', tab: 'B1 · Maximum', title: 'Allgemeines Baummaximum gegen rechtesten BST-Knoten',
      goal: 'Formuliere die Suchordnungs-Vorbedingung und zähle k gegen h.', level: 'transfer', topic: 'Bäume',
      source: 'Didaktischer Vergleich aus Probeklausur.pdf, Aufgaben 10 und 12 · vollständige Baumrekursion und sb_maxval.',
      relation: {
        prompt: 'Wann liefern A und B für einen nichtleeren Baum zuverlässig dasselbe Maximum?',
        hint: 'B betrachtet ausschließlich die rechte Kette.',
        choices: [
          ['bst', 'Wenn der Baum die BST-Suchordnung erfüllt.', true, 'Richtig: Dann liegt das Maximum am rechtesten Knoten.'],
          ['always', 'Bei jedem beliebigen Binärbaum.', false, 'Ohne Suchordnung könnte ein größerer Wert in einem linken Teilbaum liegen.'],
          ['balanced-only', 'Nur wenn der Baum perfekt balanciert ist.', false, 'Balance beeinflusst die Höhe, nicht die Lage des Maximums im gültigen BST.']
        ]
      },
      a: {
        label: 'Maximum im beliebigen Baum',
        lines: [
          ['int maxA(Node* p) {'], ['  if (p == nullptr) return INT_MIN;'],
          ['  int left = ', ['maxA(p->left)', 'left-call'], ';'],
          ['  int right = ', ['maxA(p->right)', 'right-call'], ';'],
          ['  return max(p->value, max(left, right));'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere die vollständige Suche links.', 'A kann jeden linken Teilbaum besuchen.', 'Suche maxA mit p->left.'],
          ['right-call', 'Markiere die vollständige Suche rechts.', 'A besucht auch den rechten Teilbaum.', 'Suche maxA mit p->right.']
        ]
      },
      b: {
        label: 'Maximum im Suchbaum',
        lines: [
          ['int maxB(Node* p) {'], ['  if (p == nullptr) throw runtime_error("leer");'],
          ['  ', ['while (p->right != nullptr)', 'loop'], ''], ['    ', ['p = p->right', 'move'], ';'],
          ['  return p->value;'], ['}']
        ],
        motors: [
          ['loop', 'Markiere den Motor entlang der rechten Kette.', 'B besucht höchstens einen Knoten pro Baumebene.', 'Suche die while-Bedingung.'],
          ['move', 'Markiere die einzige erlaubte Bewegung.', 'Die BST-Ordnung macht den rechten Pfad ausreichend.', 'Suche p->right.']
        ]
      },
      runtime: {
        prompt: 'k sei die Knotenzahl und h die Höhe. Welche Worst-Case-Beschreibung ist präzise?',
        hint: 'A kann alle k Knoten besuchen; B bleibt auf einem Pfad.',
        choices: [
          ['k-h', 'A: Θ(k) · B: Θ(h)', true, 'Genau: vollständiger Baum gegen rechteste Wurzel-Blatt-Kette.'],
          ['both-k', 'A und B: Θ(k) für jede Baumform', false, 'B kann bei kleiner Höhe viel weniger als k Knoten besuchen.'],
          ['both-log', 'A und B: immer Θ(log k)', false, 'A besucht alle Knoten; außerdem kann ein BST entarten.']
        ]
      },
      verdict: {
        prompt: 'Welche zwei Eigenschaften darfst du nicht vermischen?',
        hint: 'Eine Eigenschaft macht B korrekt, eine andere macht h klein.',
        choices: [
          ['order-balance', 'BST-Ordnung macht den rechten Pfad korrekt; Balance macht h zu Θ(log k).', true, 'Richtig: Korrektheit und Geschwindigkeit haben verschiedene Voraussetzungen.'],
          ['balance-correct', 'Erst Balance macht den rechten Pfad korrekt.', false, 'Schon ein entarteter gültiger BST ordnet größere Werte nach rechts.'],
          ['order-log', 'BST-Ordnung garantiert automatisch logarithmische Höhe.', false, 'Sortiertes Einfügen kann einen gültigen BST zur Kette machen.']
        ]
      },
      examSentence: 'Auf einem nichtleeren BST liefern beide das Maximum; A besucht Θ(k) Knoten, B nur Θ(h), bei Balance also Θ(log k), entartet jedoch Θ(k).',
      conclusion: 'Suchordnung spart Teilbäume; Balance spart Ebenen.'
    },
    {
      id: 'tree-contains-recursive-vs-bst', tab: 'B2 · Suchpfad', title: 'Zwei rekursive Suchen, aber nur eine verzweigt vollständig',
      goal: 'Erkenne, dass Rekursionssyntax nicht automatisch dieselbe Arbeit bedeutet.', level: 'transfer', topic: 'Bäume',
      source: 'Didaktischer Transfer zu Probeklausur.pdf, Aufgaben 10–12 · allgemeiner Baum gegen Suchbaum.',
      relation: {
        prompt: 'Wann beantworten beide Funktionen die Mitgliedschaftsfrage zuverlässig gleich?',
        hint: 'B verwirft abhängig von x immer einen kompletten Teilbaum.',
        choices: [
          ['bst', 'Wenn der Baum die BST-Suchordnung erfüllt.', true, 'Richtig: Nur dann ist der verworfene Teilbaum garantiert irrelevant.'],
          ['always', 'Bei jedem Binärbaum, weil beide rekursiv sind.', false, 'Die Schreibweise garantiert keine Suchordnung der Werte.'],
          ['balanced', 'Nur bei perfekter Balance.', false, 'Balance ist für die Laufzeit wichtig, nicht für die Suchkorrektheit.']
        ]
      },
      a: {
        label: 'Vollständige rekursive Suche',
        lines: [
          ['bool containsA(Node* p, int x) {'], ['  if (p == nullptr) return false;'],
          ['  if (p->value == x) return true;'],
          ['  return ', ['containsA(p->left, x)', 'left-call'], ' ||'],
          ['         ', ['containsA(p->right, x)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['left-call', 'Markiere As Suche im linken Teilbaum.', 'A kann links vollständig suchen.', 'Suche p->left.'],
          ['right-call', 'Markiere As mögliche Suche im rechten Teilbaum.', 'Ohne Treffer links sucht A auch rechts.', 'Suche p->right.']
        ]
      },
      b: {
        label: 'Rekursive BST-Suche',
        lines: [
          ['bool containsB(Node* p, int x) {'], ['  if (p == nullptr) return false;'],
          ['  if (p->value == x) return true;'],
          ['  return ', ['x < p->value', 'decision'], ' ?'],
          ['    ', ['containsB(p->left, x)', 'left-call'], ' : ', ['containsB(p->right, x)', 'right-call'], ';'], ['}']
        ],
        motors: [
          ['decision', 'Markiere die Ordnungsentscheidung.', 'Der Vergleich wählt genau eine Richtung.', 'Suche x < p->value.'],
          ['left-call', 'Markiere einen möglichen Folgepfad.', 'Bei kleinerem x geht B ausschließlich nach links.', 'Suche den linken Folgeaufruf.'],
          ['right-call', 'Markiere den alternativen Folgepfad.', 'Sonst geht B ausschließlich nach rechts; nie in beide.', 'Suche den rechten Folgeaufruf.']
        ]
      },
      runtime: {
        prompt: 'Welche Worst-Case-Laufzeiten gelten mit k Knoten und Höhe h?',
        hint: 'A kann beide Teilbäume prüfen; B führt pro Ebene genau einen der beiden Aufrufe aus.',
        choices: [
          ['k-h', 'A: Θ(k) · B: Θ(h)', true, 'Genau: vollständige Suche gegen einen einzigen Pfad.'],
          ['both-k', 'A und B: Θ(k), weil beide zwei Aufrufzeilen besitzen.', false, 'Der ternäre Operator in B führt pro Ebene nur einen Aufruf aus.'],
          ['both-h', 'A und B: Θ(h)', false, 'A kann auf derselben Höhe sehr viele Knoten in beiden Teilbäumen besuchen.']
        ]
      },
      verdict: {
        prompt: 'Welche Aussage beschreibt Bs Vorteil mechanistisch?',
        hint: 'Nicht rekursiv gegen iterativ vergleichen, sondern beide Teilbäume gegen einen Pfad.',
        choices: [
          ['one-path', 'Die BST-Ordnung erlaubt B pro Ebene genau einen Folgeaufruf.', true, 'Richtig: Der Datenstrukturvertrag eliminiert Arbeit.'],
          ['recursion-fast', 'Rekursion ist bei B grundsätzlich schneller.', false, 'A ist ebenfalls rekursiv; die gewählte Teilproblemmenge unterscheidet sich.'],
          ['ternary-constant', 'Der ternäre Operator macht die gesamte Suche Θ(1).', false, 'Er spart einen Ast, aber der verbleibende Pfad kann h Ebenen lang sein.']
        ]
      },
      examSentence: 'Auf einem gültigen BST liefern beide dasselbe; A kann Θ(k) Knoten besuchen, B wählt pro Ebene einen Ast und benötigt Θ(h).',
      conclusion: 'Entscheidend ist nicht Rekursion gegen Schleife, sondern wie viele Teilprobleme wirklich ausgeführt werden.'
    },
    {
      id: 'bst-vs-avl-search', tab: 'B3 · BST/AVL', title: 'Gleicher Suchcode, andere Höhengarantie',
      goal: 'Leite Laufzeit aus der Datenstruktur-Invariante statt nur aus dem Code ab.', level: 'transfer', topic: 'Bäume',
      source: 'Didaktischer Transfer zu Probeklausur.pdf, Aufgabe 12, und begriffe/bst_laufzeitfaelle.md · BST gegen AVL-Höhengarantie.',
      relation: {
        prompt: 'Beide Bäume enthalten dieselben Schlüssel und erfüllen ihre jeweilige Suchordnung. Liefern die Suchen dasselbe?',
        hint: 'AVL ändert die Form, aber nicht die sortierte Suchbaumordnung.',
        choices: [
          ['same', 'Ja. Beide beantworten dieselbe Mitgliedschaftsfrage.', true, 'Richtig: Balance verändert nicht, welche Schlüssel enthalten sind.'],
          ['avl-different', 'Nein. Rotationen verändern das Suchergebnis.', false, 'Rotationen erhalten die Inorder-Reihenfolge und damit die Schlüsselmenge.'],
          ['only-found', 'Nur bei vorhandenen Schlüsseln stimmen sie überein.', false, 'Bei gleicher Schlüsselmenge stimmen auch erfolglose Suchen überein.']
        ]
      },
      a: {
        label: 'Gewöhnlicher BST',
        lines: [
          ['bool containsBST(Node* p, int x) {'],
          ['  ', ['while (p != nullptr && p->value != x)', 'loop'], ' {'],
          ['    ', ['p = x < p->value ? p->left : p->right', 'branch'], ';'],
          ['  }'], ['  return p != nullptr;'], ['}']
        ],
        motors: [
          ['loop', 'Markiere den Ebenenmotor im gewöhnlichen BST.', 'A besucht einen Knoten pro Ebene.', 'Suche die while-Bedingung.'],
          ['branch', 'Markiere die Richtungswahl.', 'A folgt einem Suchpfad, dessen Höhe unbeschränkt entarten kann.', 'Suche links oder rechts.']
        ]
      },
      b: {
        label: 'AVL-Baum',
        lines: [
          ['bool containsAVL(Node* p, int x) {'],
          ['  ', ['while (p != nullptr && p->value != x)', 'loop'], ' {'],
          ['    ', ['p = x < p->value ? p->left : p->right', 'branch'], ';'],
          ['  }'], ['  return p != nullptr;'], ['}']
        ],
        motors: [
          ['loop', 'Markiere den Ebenenmotor im AVL-Baum.', 'B besucht ebenfalls einen Knoten pro Ebene.', 'Suche die while-Bedingung.'],
          ['branch', 'Markiere die Richtungswahl.', 'Der Code ist gleich; die AVL-Invariante begrenzt jedoch die Höhe.', 'Suche links oder rechts.']
        ]
      },
      runtime: {
        prompt: 'k sei die Knotenzahl. Welche Worst-Case-Aussage berücksichtigt die Strukturverträge?',
        hint: 'Ein gewöhnlicher BST kann zur Kette werden; ein AVL-Baum hält seine Höhe logarithmisch.',
        choices: [
          ['bst-avl', 'A: Θ(h), im Worst Case Θ(k) · B: Θ(log k)', true, 'Genau: gleicher Pfadcode, aber nur B garantiert kleine Höhe.'],
          ['both-log', 'A und B: im Worst Case immer Θ(log k)', false, 'Ein unbalancierter BST kann Höhe k besitzen.'],
          ['both-k', 'A und B: im Worst Case immer Θ(k)', false, 'Die AVL-Balance verhindert eine lineare Höhe.']
        ]
      },
      verdict: {
        prompt: 'Warum unterscheiden sich die Worst Cases trotz fast identischem Code?',
        hint: 'Laufzeit hängt auch von garantierten Eingabeeigenschaften ab.',
        choices: [
          ['invariant', 'Die AVL-Invariante garantiert h=Θ(log k); der normale BST garantiert nur die Suchordnung.', true, 'Richtig: Die Datenstrukturform ist Teil der Laufzeitanalyse.'],
          ['syntax', 'containsAVL ist wegen des Funktionsnamens schneller.', false, 'Namen haben keinen Einfluss auf ausgeführte Schritte.'],
          ['rotation-search', 'Bei jeder AVL-Suche wird zusätzlich rotiert und dadurch beschleunigt.', false, 'Rotationen reparieren Änderungen; die Suche selbst folgt nur einem Pfad.']
        ]
      },
      examSentence: 'Beide Suchen liefern bei gleicher Schlüsselmenge dasselbe; der BST benötigt Θ(h) und kann Θ(k) erreichen, der AVL-Baum garantiert wegen h=Θ(log k) logarithmische Suche.',
      conclusion: 'Manchmal steckt der Laufzeitunterschied nicht in der Schleife, sondern in der garantierten Form ihrer Eingabe.'
    }
  ];

  duels.forEach((duel) => { duel.level ||= 'foundation'; });
  duels.push(...transferDuels);

  const $ = (selector) => document.querySelector(selector);
  const storageKey = 'ads-probeklausur-state-v2';
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const readState = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; }
    catch (_) { return {}; }
  };
  const resultState = () => readState().evidence?.runtimeDetective || {};
  const statsState = () => readState().evidence?.runtimeDetectiveStats || { attempts: 0, byCase: {} };
  const duelResultState = () => readState().evidence?.runtimeDuels || {};
  const duelStatsState = () => readState().evidence?.runtimeDuelStats || { attempts: 0, byCase: {} };
  const foundationDuels = () => duels.filter((item) => item.level === 'foundation');
  const defaultDuelBank = () => foundationDuels().every((item) => duelResultState()[item.id]) ? 'transfer' : 'foundation';
  const learningPrefsState = () => {
    const saved = readState().preferences?.runtimeLearning2 || {};
    return {
      mode: ['guided', 'adaptive', 'exam'].includes(saved.mode) ? saved.mode : 'adaptive',
      bank: ['foundation', 'transfer', 'all'].includes(saved.bank) ? saved.bank : defaultDuelBank(),
      adaptiveLevel: Math.max(0, Math.min(2, Number.isFinite(saved.adaptiveLevel) ? saved.adaptiveLevel : 2)),
      cleanStreak: Math.max(0, Number.isFinite(saved.cleanStreak) ? saved.cleanStreak : 0)
    };
  };
  const persistLearningPrefs = (patch = {}) => {
    const state = readState();
    state.preferences ||= {};
    state.preferences.runtimeLearning2 = { ...learningPrefsState(), ...patch };
    localStorage.setItem(storageKey, JSON.stringify(state));
  };
  const countKnownResults = (results, items) => Object.keys(results).filter((id) => items.some((item) => item.id === id)).length;
  const renderOverallProgress = () => {
    const detectiveSolved = countKnownResults(resultState(), cases);
    const duelSolved = countKnownResults(duelResultState(), duels);
    const attempts = (statsState().attempts || 0) + (duelStatsState().attempts || 0);
    $('#overall-progress').textContent = `Einzel ${detectiveSolved}/${cases.length} · A/B ${duelSolved}/${duels.length} · ${attempts} Versuche`;
  };
  let currentIndex = Math.max(0, cases.findIndex((item) => !resultState()[item.id]));
  let stageIndex = 0;
  let hintUsed = false;
  let answerAttempts = 0;
  const initialLearningPrefs = learningPrefsState();
  let duelLearningMode = initialLearningPrefs.mode;
  let duelBank = initialLearningPrefs.bank;
  let adaptiveSupportLevel = initialLearningPrefs.adaptiveLevel;
  let adaptiveCleanStreak = initialLearningPrefs.cleanStreak;
  const activeDuels = () => duelBank === 'all' ? duels : duels.filter((item) => item.level === duelBank);
  const supportLevel = () => duelLearningMode === 'guided' ? 2 : duelLearningMode === 'exam' ? 0 : adaptiveSupportLevel;
  const firstDuelIndex = () => {
    const bank = activeDuels();
    const firstUnsolved = bank.find((item) => !duelResultState()[item.id]) || bank[0];
    return Math.max(0, duels.indexOf(firstUnsolved));
  };
  let duelCurrentIndex = firstDuelIndex();
  let duelStage = 0;
  let duelMotorIndex = 0;
  let duelHintUsed = false;
  let duelWrongAttempts = 0;
  let duelStartedSupport = supportLevel();

  const showFeedback = (target, message, kind = 'try') => {
    target.textContent = message;
    target.className = `feedback show ${kind}`;
  };
  const clearFeedback = (target) => {
    target.textContent = '';
    target.className = 'feedback';
  };
  const saveResult = (caseId, quality) => {
    const state = readState();
    state.evidence ||= {};
    state.evidence.runtimeDetective ||= {};
    const previous = state.evidence.runtimeDetective[caseId];
    state.evidence.runtimeDetective[caseId] = previous === 'clean' || quality === 'clean' ? 'clean' : quality;
    state.evidence.runtimeDetectiveStats ||= { attempts: 0, byCase: {} };
    state.evidence.runtimeDetectiveStats.attempts += 1;
    state.evidence.runtimeDetectiveStats.byCase[caseId] = (state.evidence.runtimeDetectiveStats.byCase[caseId] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(state));
  };
  const renderTabs = () => {
    const results = resultState();
    $('#case-tabs').innerHTML = cases.map((item, index) => `<button class="case-tab" type="button" role="tab" data-index="${index}" data-result="${results[item.id] || ''}" aria-selected="${index === currentIndex}">${escapeHtml(item.tab)}</button>`).join('');
    document.querySelectorAll('#case-tabs .case-tab').forEach((button) => button.addEventListener('click', () => loadCase(Number(button.dataset.index))));
    renderOverallProgress();
  };
  const lineMarkup = (line, index) => {
    const parts = line.map((part) => {
      if (!Array.isArray(part)) return `<code>${escapeHtml(part)}</code>`;
      return `<button class="code-token" type="button" data-clue="${escapeHtml(part[1])}" aria-pressed="false"><code>${escapeHtml(part[0])}</code></button>`;
    }).join('');
    return `<div class="code-line"><span class="line-no">${index + 1}</span>${parts}</div>`;
  };
  const paintQuestion = () => {
    const item = cases[currentIndex];
    const stage = item.stages[stageIndex];
    if (!stage) return;
    $('#clue-question').textContent = `${stageIndex + 1}/${item.stages.length}: ${stage[1]}`;
    $('#hint-button').textContent = `Hinweis ${stageIndex + 1}`;
  };
  const clueLabel = (id, index) => ({
    size: 'Größe', sizes: 'Größen', loop: 'Motor', outer: 'Außenloop', inner: 'Innenloop',
    'loop-a': 'Loop 1', 'loop-b': 'Loop 2', 'loop-n': 'n-Loop', 'loop-m': 'm-Loop',
    step: 'Schritt', move: 'Bewegung', halve: 'Halbierung', shrink: 'Verkleinerung',
    stop: 'Stopp', call: 'Aufruf', 'call-a': 'Aufruf 1', 'call-b': 'Aufruf 2',
    left: 'Linksaufruf', right: 'Rechtsaufruf', compare: 'Vergleich', work: 'Arbeit',
    positive: 'Positivloop', negative: 'Negativloop', early: 'Früher Exit'
  }[id] || `Spur ${index + 1}`);
  const renderClues = (item) => {
    $('#clue-list').innerHTML = item.stages.map((stage, index) => `<li data-stage="${escapeHtml(stage[0])}"><span>${index + 1}</span>${escapeHtml(clueLabel(stage[0], index))}</li>`).join('');
  };
  const completeClues = () => {
    const item = cases[currentIndex];
    $('#clue-question').textContent = 'Alle Code-Spuren gefunden. Jetzt erst kommt die Laufzeit.';
    $('#case-progress').textContent = `${item.stages.length} / ${item.stages.length} Spuren`;
    $('#hint-button').textContent = 'Hinweis zur Laufzeit';
    $('#classification').hidden = false;
    $('#classification-prompt').textContent = item.prompt;
    $('#runtime-choices').innerHTML = item.choices.map((choice) => `<button class="runtime-choice" type="button" data-choice="${escapeHtml(choice[0])}">${escapeHtml(choice[1])}</button>`).join('');
    document.querySelectorAll('#runtime-choices .runtime-choice').forEach((button) => button.addEventListener('click', () => checkRuntime(button)));
    document.querySelector('#runtime-choices .runtime-choice').focus();
  };
  const handleToken = (button) => {
    const item = cases[currentIndex];
    const expected = item.stages[stageIndex];
    if (!expected) {
      showFeedback($('#clue-feedback'), 'Die Code-Spuren sind vollständig. Entscheide jetzt unten über die Laufzeit.', 'good');
      return;
    }
    if (button.dataset.clue !== expected[0]) {
      const message = item.wrong?.[button.dataset.clue] || (item.stages.some((stage) => stage[0] === button.dataset.clue) ? 'Das ist ebenfalls eine wichtige Spur, aber gerade wird eine andere gesucht.' : 'Diese Stelle berechnet etwas, steuert aber nicht die aktuell gesuchte Wiederholung.');
      showFeedback($('#clue-feedback'), message);
      return;
    }
    button.classList.remove('nudged');
    button.classList.add('found');
    button.setAttribute('aria-pressed', 'true');
    document.querySelector(`[data-stage="${expected[0]}"]`).classList.add('found');
    stageIndex += 1;
    $('#case-progress').textContent = `${stageIndex} / ${item.stages.length} Spuren`;
    showFeedback($('#clue-feedback'), expected[2], 'good');
    if (stageIndex === item.stages.length) completeClues();
    else paintQuestion();
  };
  const checkRuntime = (button) => {
    const item = cases[currentIndex];
    const choice = item.choices.find((entry) => entry[0] === button.dataset.choice);
    answerAttempts += 1;
    document.querySelectorAll('#runtime-choices .runtime-choice').forEach((entry) => entry.classList.remove('correct', 'wrong'));
    if (!choice[2]) {
      button.classList.add('wrong');
      showFeedback($('#runtime-feedback'), choice[3]);
      return;
    }
    button.classList.add('correct');
    showFeedback($('#runtime-feedback'), choice[3], 'good');
    const quality = hintUsed || answerAttempts > 1 ? 'guided' : 'clean';
    saveResult(item.id, quality);
    $('#conclusion-text').textContent = item.conclusion;
    $('#result-quality').textContent = quality === 'clean' ? 'Ohne Hinweis gelöst – starkes Signal, aber noch kein kalter Klausurbeleg.' : 'Mit Hilfe gelernt – genau richtig für den Aufbau. Später an neuem Code kalt prüfen.';
    $('#conclusion').hidden = false;
    $('#next-case').textContent = currentIndex === cases.length - 1 ? 'Zurück zu Fall 1 ↻' : 'Nächster Fall →';
    renderTabs();
    $('#conclusion').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const loadCase = (index) => {
    currentIndex = index;
    stageIndex = 0;
    hintUsed = false;
    answerAttempts = 0;
    const item = cases[index];
    $('#case-kicker').textContent = `FALL ${index + 1} · ${item.tab.split('·')[1].trim().toUpperCase()}`;
    $('#case-title').textContent = item.title;
    $('#case-goal').textContent = item.goal;
    $('#case-progress').textContent = `0 / ${item.stages.length} Spuren`;
    $('#source-note').textContent = item.source;
    $('#code-board').innerHTML = item.lines.map(lineMarkup).join('');
    renderClues(item);
    clearFeedback($('#clue-feedback'));
    clearFeedback($('#runtime-feedback'));
    $('#classification').hidden = true;
    $('#conclusion').hidden = true;
    document.querySelectorAll('#code-board .code-token').forEach((button) => button.addEventListener('click', () => handleToken(button)));
    renderTabs();
    paintQuestion();
  };

  const renderLearningControls = () => {
    const level = supportLevel();
    $('#duel-mode-panel').dataset.support = String(level);
    document.querySelectorAll('[data-learning-mode]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.learningMode === duelLearningMode));
    });
    document.querySelectorAll('[data-duel-bank]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.duelBank === duelBank));
    });
    const status = duelLearningMode === 'guided'
      ? 'Geführt · volle Spuren'
      : duelLearningMode === 'exam'
        ? 'Klausur · ohne Hinweise'
        : level === 2
          ? 'Adaptiv · volle Spuren'
          : level === 1
            ? 'Adaptiv · reduzierte Fragen'
            : 'Adaptiv · fast klausurnah';
    $('#assistance-status').textContent = status;

    const explanations = {
      guided: 'Geführt zeigt die konkrete nächste Code-Spur und darf sie auf Wunsch markieren. Das ist der sichere Aufbau-Modus.',
      exam: 'Klausur zeigt keine Hinweise und tarnt die anklickbaren Motoren als normalen Code. Wechsel jederzeit zurück, ohne Fortschritt zu verlieren.'
    };
    $('#learning-explanation').textContent = duelLearningMode === 'adaptive'
      ? `Adaptiv: ${adaptiveCleanStreak}/2 saubere Duelle bis zur nächsten Reduktion. Ein Fehler holt eine Hilfestufe zurück.`
      : explanations[duelLearningMode];

    const visible = activeDuels();
    const bankLabel = duelBank === 'foundation' ? 'Grundlagen' : duelBank === 'transfer' ? 'schwere Transfer' : 'gemischte';
    $('#duel-picker-title').textContent = `${visible.length} ${bankLabel}-Duelle, immer dieselben vier Fragen`;
  };

  const configureDuelHintButton = (normalLabel) => {
    const button = $('#duel-hint-button');
    button.disabled = duelLearningMode === 'exam';
    if (duelLearningMode === 'exam') button.textContent = 'Klausurmodus · keine Hinweise';
    else if (duelLearningMode === 'adaptive' && supportLevel() === 0) button.textContent = 'Eine Hilfestufe zurückholen';
    else button.textContent = normalLabel;
  };
  const currentDuelHintLabel = () => duelStage === 0
    ? 'Hinweis zum Ergebnis'
    : duelStage === 1
      ? 'Hinweis zur Code-Spur'
      : duelStage === 2
        ? 'Hinweis zu den Laufzeiten'
        : 'Hinweis zum Urteil';

  const registerAdaptiveStruggle = () => {
    if (duelLearningMode !== 'adaptive') return '';
    adaptiveCleanStreak = 0;
    if (adaptiveSupportLevel < 2) {
      adaptiveSupportLevel += 1;
      persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: 0 });
      renderLearningControls();
      configureDuelHintButton(currentDuelHintLabel());
      return ` Adaptiv gibt dir jetzt Hilfestufe ${adaptiveSupportLevel + 1}/3 zurück.`;
    }
    persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: 0 });
    renderLearningControls();
    configureDuelHintButton(currentDuelHintLabel());
    return '';
  };

  const finishAdaptiveStep = (quality) => {
    if (duelLearningMode !== 'adaptive') return '';
    if (quality !== 'clean') {
      adaptiveCleanStreak = 0;
      persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: 0 });
      renderLearningControls();
      return '';
    }
    if (adaptiveSupportLevel === 0) {
      adaptiveCleanStreak = 0;
      persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: 0, cleanStreak: 0 });
      renderLearningControls();
      return ' Klausurnah und sauber gelöst.';
    }
    adaptiveCleanStreak += 1;
    if (adaptiveCleanStreak >= 2) {
      adaptiveSupportLevel -= 1;
      adaptiveCleanStreak = 0;
      persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: 0 });
      renderLearningControls();
      return ' Zwei saubere Duelle: Im nächsten Fall verschwindet eine Hilfestufe.';
    }
    persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: adaptiveCleanStreak });
    renderLearningControls();
    return ' Noch ein sauberes Duell bis zur nächsten Hilfereduktion.';
  };

  const saveDuelResult = (duelId, quality) => {
    const state = readState();
    state.evidence ||= {};
    state.evidence.runtimeDuels ||= {};
    const previous = state.evidence.runtimeDuels[duelId];
    state.evidence.runtimeDuels[duelId] = previous === 'clean' || quality === 'clean' ? 'clean' : quality;
    state.evidence.runtimeDuelStats ||= { attempts: 0, byCase: {} };
    state.evidence.runtimeDuelStats.attempts += 1;
    state.evidence.runtimeDuelStats.byCase[duelId] = (state.evidence.runtimeDuelStats.byCase[duelId] || 0) + 1;
    state.evidence.runtimeDuelLearning2Stats ||= { attempts: 0, byMode: {}, byCase: {} };
    state.evidence.runtimeDuelLearning2Stats.attempts += 1;
    state.evidence.runtimeDuelLearning2Stats.byMode[duelLearningMode] = (state.evidence.runtimeDuelLearning2Stats.byMode[duelLearningMode] || 0) + 1;
    state.evidence.runtimeDuelLearning2Stats.byCase[duelId] = {
      attempts: (state.evidence.runtimeDuelLearning2Stats.byCase[duelId]?.attempts || 0) + 1,
      lastMode: duelLearningMode,
      lastStartSupport: duelStartedSupport,
      lastQuality: quality
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  };
  const duelMotorQueue = (item) => [
    ...item.a.motors.map((motor) => ({ side: 'a', motor })),
    ...item.b.motors.map((motor) => ({ side: 'b', motor }))
  ];
  const remainingDuelMotors = (item) => duelMotorQueue(item).filter((entry) => {
    const token = document.querySelector(`#duel-code-${entry.side} .code-token[data-clue="${entry.motor[0]}"]`);
    return !token?.classList.contains('found');
  });
  const renderDuelTabs = () => {
    const results = duelResultState();
    $('#duel-tabs').innerHTML = activeDuels().map((item) => {
      const index = duels.indexOf(item);
      return `<button class="case-tab" type="button" role="tab" data-index="${index}" data-level="${item.level}" data-result="${results[item.id] || ''}" aria-selected="${index === duelCurrentIndex}">${escapeHtml(item.tab)}</button>`;
    }).join('');
    document.querySelectorAll('#duel-tabs .case-tab').forEach((button) => button.addEventListener('click', () => loadDuel(Number(button.dataset.index))));
    renderLearningControls();
    renderOverallProgress();
  };
  const renderDuelChoices = (group) => {
    const choices = [...group.choices];
    if (supportLevel() < 2) {
      const offset = (duelCurrentIndex + duelStage) % choices.length;
      choices.push(...choices.splice(0, offset));
    }
    $('#duel-choices').innerHTML = choices.map((choice) => `<button class="runtime-choice duel-choice" type="button" data-choice="${escapeHtml(choice[0])}">${escapeHtml(choice[1])}</button>`).join('');
    document.querySelectorAll('#duel-choices .duel-choice').forEach((button) => button.addEventListener('click', () => checkDuelChoice(button)));
  };
  const setDuelCodeEnabled = (side = '') => {
    ['a', 'b'].forEach((codeSide) => {
      document.querySelectorAll(`#duel-code-${codeSide} .code-token`).forEach((button) => {
        button.disabled = (side !== '*' && side !== codeSide) || button.classList.contains('found');
      });
    });
  };
  const markDuelCards = (activeSide = '') => {
    const queue = duelMotorQueue(duels[duelCurrentIndex]);
    ['a', 'b'].forEach((side) => {
      const card = $(`#duel-card-${side}`);
      const sideEntries = queue.filter((entry) => entry.side === side);
      const completed = sideEntries.every((entry) => document.querySelector(`#duel-code-${side} .code-token[data-clue="${entry.motor[0]}"]`)?.classList.contains('found'));
      card.classList.toggle('active', activeSide === side);
      card.classList.toggle('complete', completed && duelMotorIndex > 0);
      card.setAttribute('aria-label', `${side === 'a' ? 'Code A' : 'Code B'}${activeSide === side ? ', jetzt untersuchen' : completed && duelMotorIndex > 0 ? ', Motoren gefunden' : ''}`);
    });
  };
  const renderDuelStage = (message = '', kind = 'good') => {
    const item = duels[duelCurrentIndex];
    const question = $('#duel-question');
    renderLearningControls();
    question.classList.remove('motor-stage');
    document.querySelectorAll('#duel-mode-panel .code-token').forEach((button) => button.classList.remove('nudged'));
    clearFeedback($('#duel-feedback'));
    $('#duel-conclusion').hidden = true;

    if (duelStage === 0) {
      $('#duel-progress').textContent = 'Schritt 1 / 4';
      $('#duel-stage-label').textContent = 'SCHRITT 1 · ERGEBNIS';
      $('#duel-question-title').textContent = 'Machen beide Codes dasselbe?';
      $('#duel-question-prompt').textContent = item.relation.prompt;
      configureDuelHintButton('Hinweis zum Ergebnis');
      renderDuelChoices(item.relation);
      setDuelCodeEnabled();
      markDuelCards();
    } else if (duelStage === 1) {
      const queue = duelMotorQueue(item);
      const remaining = remainingDuelMotors(item);
      const current = remaining[0];
      if (!current) {
        duelStage = 2;
        renderDuelStage('Alle Laufzeitmotoren sind markiert.', 'good');
        return;
      }
      const freeSelection = supportLevel() < 2;
      question.classList.add('motor-stage');
      $('#duel-progress').textContent = supportLevel() === 0
        ? `Schritt 2 / 4 · ${duelMotorIndex} Spuren gefunden`
        : `Schritt 2 / 4 · Spur ${duelMotorIndex + 1}/${queue.length}`;
      $('#duel-stage-label').textContent = 'SCHRITT 2 · MOTOREN';
      $('#duel-question-title').textContent = freeSelection ? 'Markiere alle Laufzeitmotoren.' : `Untersuche jetzt Code ${current.side.toUpperCase()}.`;
      $('#duel-question-prompt').textContent = supportLevel() === 2
        ? current.motor[1]
        : supportLevel() === 1
          ? 'Finde Schleifen, rekursive Folgeaufrufe und die Updates, die ihre Rundenzahl bestimmen. Die Reihenfolge ist frei.'
          : 'Lies den Code ohne sichtbare Markierung und wähle alle Stellen, die die Wiederholungszahl bestimmen.';
      configureDuelHintButton('Hinweis zur Code-Spur');
      $('#duel-choices').innerHTML = '';
      setDuelCodeEnabled(freeSelection ? '*' : current.side);
      markDuelCards(freeSelection ? '' : current.side);
    } else if (duelStage === 2) {
      $('#duel-progress').textContent = 'Schritt 3 / 4';
      $('#duel-stage-label').textContent = 'SCHRITT 3 · LAUFZEITEN';
      $('#duel-question-title').textContent = 'Welche Laufzeiten folgen?';
      $('#duel-question-prompt').textContent = item.runtime.prompt;
      configureDuelHintButton('Hinweis zu den Laufzeiten');
      renderDuelChoices(item.runtime);
      setDuelCodeEnabled();
      markDuelCards();
    } else if (duelStage === 3) {
      $('#duel-progress').textContent = 'Schritt 4 / 4';
      $('#duel-stage-label').textContent = 'SCHRITT 4 · URTEIL';
      $('#duel-question-title').textContent = 'Was ist der saubere Vergleich?';
      $('#duel-question-prompt').textContent = item.verdict.prompt;
      configureDuelHintButton('Hinweis zum Urteil');
      renderDuelChoices(item.verdict);
      setDuelCodeEnabled();
      markDuelCards();
    }
    if (message) showFeedback($('#duel-feedback'), message, kind);
  };
  const currentDuelChoiceGroup = () => {
    const item = duels[duelCurrentIndex];
    return duelStage === 0 ? item.relation : duelStage === 2 ? item.runtime : item.verdict;
  };
  const finishDuel = (button, choice) => {
    const item = duels[duelCurrentIndex];
    button.classList.add('correct');
    document.querySelectorAll('#duel-choices .duel-choice').forEach((entry) => { entry.disabled = true; });
    showFeedback($('#duel-feedback'), choice[3], 'good');
    duelStage = 4;
    const quality = duelHintUsed || duelWrongAttempts > 0 ? 'guided' : 'clean';
    saveDuelResult(item.id, quality);
    const adaptiveMessage = finishAdaptiveStep(quality);
    $('#duel-progress').textContent = '4 / 4 · fertig';
    $('#duel-exam-sentence').textContent = item.examSentence;
    $('#duel-conclusion-text').textContent = item.conclusion;
    const qualityMessage = quality === 'clean'
      ? duelLearningMode === 'exam'
        ? 'Im Klausurmodus fehlerfrei gelöst – starker kalter Transferbeleg.'
        : 'Ohne Hinweis gelöst – jetzt später an einem unbekannten Duell kalt wiederholen.'
      : 'Mit Hilfe gelernt – richtig für den Aufbau. Beim nächsten Durchlauf ohne Hinweis prüfen.';
    $('#duel-result-quality').textContent = `${qualityMessage}${adaptiveMessage}`;
    $('#duel-conclusion').hidden = false;
    const visible = activeDuels();
    const visiblePosition = visible.indexOf(item);
    $('#next-duel').textContent = visiblePosition === visible.length - 1 ? 'Zurück zum ersten Duell ↻' : 'Nächstes Duell →';
    setDuelCodeEnabled();
    markDuelCards();
    renderDuelTabs();
    $('#duel-conclusion').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const checkDuelChoice = (button) => {
    if (![0, 2, 3].includes(duelStage)) return;
    const group = currentDuelChoiceGroup();
    const choice = group.choices.find((entry) => entry[0] === button.dataset.choice);
    document.querySelectorAll('#duel-choices .duel-choice').forEach((entry) => entry.classList.remove('correct', 'wrong'));
    if (!choice[2]) {
      duelWrongAttempts += 1;
      button.classList.add('wrong');
      const adaptiveMessage = registerAdaptiveStruggle();
      showFeedback($('#duel-feedback'), `${choice[3]}${adaptiveMessage}`);
      return;
    }
    if (duelStage === 3) {
      finishDuel(button, choice);
      return;
    }
    duelStage = duelStage === 0 ? 1 : 3;
    renderDuelStage(choice[3], 'good');
  };
  const handleDuelToken = (side, button) => {
    if (duelStage !== 1) return;
    const item = duels[duelCurrentIndex];
    const remaining = remainingDuelMotors(item);
    const expected = supportLevel() === 2
      ? remaining[0]
      : remaining.find((entry) => entry.side === side && entry.motor[0] === button.dataset.clue);
    if (!expected || side !== expected.side || button.dataset.clue !== expected.motor[0]) {
      duelWrongAttempts += 1;
      const adaptiveMessage = registerAdaptiveStruggle();
      const guidance = supportLevel() === 2 && remaining[0] ? ` ${remaining[0].motor[1]}` : '';
      showFeedback($('#duel-feedback'), `Diese Stelle ist nicht die gerade gesuchte Laufzeitspur.${guidance}${adaptiveMessage}`);
      return;
    }
    button.classList.remove('nudged');
    button.classList.add('found');
    button.setAttribute('aria-pressed', 'true');
    button.disabled = true;
    duelMotorIndex += 1;
    if (remainingDuelMotors(item).length === 0) {
      duelStage = 2;
      renderDuelStage(`${expected.motor[2]} Alle Laufzeitmotoren sind markiert.`, 'good');
      return;
    }
    renderDuelStage(expected.motor[2], 'good');
  };
  const loadDuel = (index) => {
    duelCurrentIndex = index;
    duelStage = 0;
    duelMotorIndex = 0;
    duelHintUsed = false;
    duelWrongAttempts = 0;
    duelStartedSupport = supportLevel();
    const item = duels[index];
    const visiblePosition = Math.max(0, activeDuels().indexOf(item));
    $('#duel-kicker').textContent = `DUELL ${visiblePosition + 1} · ${item.tab.split('·')[1].trim().toUpperCase()}`;
    $('#duel-title').textContent = item.title;
    $('#duel-goal').textContent = item.goal;
    $('#duel-label-a').textContent = item.a.label;
    $('#duel-label-b').textContent = item.b.label;
    $('#duel-code-a').innerHTML = item.a.lines.map(lineMarkup).join('');
    $('#duel-code-b').innerHTML = item.b.lines.map(lineMarkup).join('');
    $('#duel-source-note').textContent = item.source;
    document.querySelectorAll('#duel-code-a .code-token').forEach((button) => button.addEventListener('click', () => handleDuelToken('a', button)));
    document.querySelectorAll('#duel-code-b .code-token').forEach((button) => button.addEventListener('click', () => handleDuelToken('b', button)));
    renderDuelTabs();
    renderDuelStage();
  };
  const setMode = (mode) => {
    const showDuels = mode === 'duels';
    $('#detective-mode-panel').hidden = showDuels;
    $('#duel-mode-panel').hidden = !showDuels;
    $('#detective-mode-button').setAttribute('aria-selected', String(!showDuels));
    $('#duel-mode-button').setAttribute('aria-selected', String(showDuels));
    renderOverallProgress();
  };

  $('#hint-button').addEventListener('click', () => {
    const item = cases[currentIndex];
    hintUsed = true;
    if (stageIndex >= item.stages.length) {
      showFeedback($('#clue-feedback'), item.classHint);
      return;
    }
    document.querySelectorAll('#code-board .code-token').forEach((button) => button.classList.remove('nudged'));
    const stage = item.stages[stageIndex];
    document.querySelector(`#code-board .code-token[data-clue="${stage[0]}"]`).classList.add('nudged');
    showFeedback($('#clue-feedback'), stage[3]);
  });
  $('#restart-button').addEventListener('click', () => loadCase(currentIndex));
  $('#random-button').addEventListener('click', () => {
    const results = resultState();
    const unsolved = cases.map((item, index) => ({ item, index })).filter(({ item }) => !results[item.id]);
    const allOthers = cases.map((item, index) => ({ item, index })).filter(({ index }) => index !== currentIndex);
    const pool = unsolved.length ? unsolved : allOthers;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    loadCase(picked?.index ?? 0);
  });
  $('#next-case').addEventListener('click', () => loadCase((currentIndex + 1) % cases.length));

  $('#duel-hint-button').addEventListener('click', () => {
    if (duelLearningMode === 'exam') return;
    const item = duels[duelCurrentIndex];
    duelHintUsed = true;
    const adaptiveMessage = registerAdaptiveStruggle();
    document.querySelectorAll('#duel-mode-panel .code-token').forEach((button) => button.classList.remove('nudged'));
    if (duelStage === 1) {
      const current = remainingDuelMotors(item)[0];
      if (!current) return;
      const target = Array.from(document.querySelectorAll(`#duel-code-${current.side} .code-token`)).find((button) => button.dataset.clue === current.motor[0]);
      if (supportLevel() === 2) target?.classList.add('nudged');
      showFeedback($('#duel-feedback'), `${current.motor[3]}${adaptiveMessage}`);
      return;
    }
    const group = duelStage === 0 ? item.relation : duelStage === 2 ? item.runtime : item.verdict;
    showFeedback($('#duel-feedback'), `${group.hint}${adaptiveMessage}`);
  });
  $('#duel-restart-button').addEventListener('click', () => loadDuel(duelCurrentIndex));
  $('#duel-random-button').addEventListener('click', () => {
    const results = duelResultState();
    const visible = activeDuels();
    const unsolved = visible.map((item) => ({ item, index: duels.indexOf(item) })).filter(({ item }) => !results[item.id]);
    const allOthers = visible.map((item) => ({ item, index: duels.indexOf(item) })).filter(({ index }) => index !== duelCurrentIndex);
    const pool = unsolved.length ? unsolved : allOthers;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    loadDuel(picked?.index ?? 0);
  });
  $('#next-duel').addEventListener('click', () => {
    const visible = activeDuels();
    const position = Math.max(0, visible.indexOf(duels[duelCurrentIndex]));
    const next = visible[(position + 1) % visible.length];
    loadDuel(duels.indexOf(next));
  });
  document.querySelectorAll('[data-learning-mode]').forEach((button) => button.addEventListener('click', () => {
    duelLearningMode = button.dataset.learningMode;
    persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: adaptiveCleanStreak });
    loadDuel(duelCurrentIndex);
  }));
  document.querySelectorAll('[data-duel-bank]').forEach((button) => button.addEventListener('click', () => {
    duelBank = button.dataset.duelBank;
    persistLearningPrefs({ mode: duelLearningMode, bank: duelBank, adaptiveLevel: adaptiveSupportLevel, cleanStreak: adaptiveCleanStreak });
    loadDuel(firstDuelIndex());
  }));
  $('#detective-mode-button').addEventListener('click', () => {
    window.location.hash = 'einzelcode';
    setMode('detective');
  });
  $('#duel-mode-button').addEventListener('click', () => {
    window.location.hash = 'duelle';
    setMode('duels');
  });
  window.addEventListener('hashchange', () => setMode(window.location.hash === '#duelle' ? 'duels' : 'detective'));

  loadCase(currentIndex);
  loadDuel(duelCurrentIndex);
  setMode(window.location.hash === '#duelle' ? 'duels' : 'detective');
})();
