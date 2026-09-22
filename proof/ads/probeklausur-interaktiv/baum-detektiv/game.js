(() => {
  "use strict";

  const STORAGE_KEY = "ads-probeklausur-state-v2";
  const TOPIC_LABELS = {
    bst: "Suchbaum",
    traversal: "Traversal",
    avl: "AVL",
  };

  const tree = (value, left = null, right = null) => [value, left, right];

  const BASE_BST = tree(10,
    tree(5, tree(2), tree(7)),
    tree(15, tree(12), tree(18)),
  );

  const TRAVERSAL_TREE = tree(8,
    tree(4, tree(2), tree(6)),
    tree(12, tree(10), tree(14)),
  );

  const TASK_12_TREE = tree(8,
    tree(4, tree(3, tree(2)), tree(7)),
    tree(12, tree(10, tree(9)), tree(20)),
  );

  const PB08_INITIAL = tree(13,
    tree(7, tree(3), tree(12, tree(9))),
    tree(17, tree(14), tree(21, tree(19))),
  );

  const PB08_AFTER_DELETE_7 = tree(13,
    tree(9, tree(3), tree(12)),
    tree(17, tree(14), tree(21, tree(19))),
  );

  const PB08_AFTER_DELETE_13 = tree(14,
    tree(9, tree(3), tree(12)),
    tree(17, null, tree(21, tree(19))),
  );

  const token = (id, label) => ({ id, label });
  const valueTokens = (values) => values.map((value) => token(`v-${value}`, String(value)));

  const CASES = [
    {
      id: "bst-insert-13",
      topic: "bst",
      level: "foundation",
      type: "path",
      title: "Wo landet die 13?",
      brief: "Klicke den Vergleichspfad ab der Wurzel. Entscheide danach, an welcher freien Kante eingefügt wird.",
      source: "Lernvariante auf Basis ADSPB08 · BST-Einfügen",
      tree: BASE_BST,
      expectedPath: [10, 15, 12],
      pathPrompt: "Klicke alle besuchten Knoten für insert(13).",
      choices: [
        { id: "left-12", label: "13 wird linkes Kind von 12", correct: false },
        { id: "right-12", label: "13 wird rechtes Kind von 12", correct: true },
        { id: "left-15", label: "13 wird linkes Kind von 15", correct: false },
      ],
      finalTree: tree(10, tree(5, tree(2), tree(7)), tree(15, tree(12, null, tree(13)), tree(18))),
      finalCaption: "13 liegt rechts von 12; die BST-Regel bleibt erhalten.",
      supports: [
        "Vergleiche 13 an jedem Knoten neu.",
        "13 > 10, 13 < 15, 13 > 12. Der Pfad hat drei Knoten.",
      ],
      hints: [
        "Beginne bei 10: Größere Schlüssel gehen nach rechts.",
        "Am Knoten 12 ist 13 größer. Suche dort die rechte Kante.",
      ],
      bridge: {
        code: "if (key < node->key)\n    node->left = insert(node->left, key);\nelse if (key > node->key)\n    node->right = insert(node->right, key);",
        note: "Jeder rekursive Aufruf entspricht genau einer Kante deines Klickpfads.",
      },
    },
    {
      id: "bst-search-11",
      topic: "bst",
      level: "foundation",
      type: "path",
      title: "Die verschwundene 11",
      brief: "Zeige nur die wirklich besuchten Knoten. Ein erfolgloser Suchlauf traversiert nicht automatisch den ganzen Baum.",
      source: "Lernvariante auf Basis Probeklausur-Aufgabe 12 · search",
      tree: BASE_BST,
      expectedPath: [10, 15, 12],
      pathPrompt: "Klicke den Suchpfad für search(11).",
      choices: [
        { id: "missing-left", label: "11 fehlt: links von 12 endet der Pfad leer", correct: true },
        { id: "missing-right", label: "11 fehlt: rechts von 12 endet der Pfad leer", correct: false },
        { id: "continue-all", label: "Danach müssen noch 5, 7 und 2 geprüft werden", correct: false },
      ],
      finalCaption: "Der leere linke Zeiger von 12 beendet die Suche.",
      supports: [
        "Folge immer genau einer Kante.",
        "11 > 10, 11 < 15, 11 < 12; danach kommt nullptr.",
      ],
      hints: [
        "11 ist größer als 10, also kann der linke Teilbaum ausgeschlossen werden.",
        "Bei 12 geht es nach links – dort ist kein Knoten.",
      ],
      bridge: {
        code: "while (p != nullptr && p->key != 11) {\n    p = (11 < p->key) ? p->left : p->right;\n}",
        note: "Die Schleife läuft über die Höhe des tatsächlich besuchten Pfads: Θ(h), nicht Θ(k).",
      },
    },
    {
      id: "bst-maximum-20",
      topic: "bst",
      level: "foundation",
      type: "path",
      title: "Rechte Spur bis zum Maximum",
      brief: "Finde das Maximum, ohne Werte zu sortieren oder den linken Teilbaum zu besuchen.",
      source: "Probeklausur-Aufgabe 12 · maxValue",
      tree: TASK_12_TREE,
      expectedPath: [8, 12, 20],
      pathPrompt: "Klicke den Pfad, den maxValue ab der Wurzel nimmt.",
      choices: [
        { id: "max-20", label: "20 ist das Maximum, weil rechts nichts mehr folgt", correct: true },
        { id: "max-14", label: "14 ist das Maximum der sichtbaren Ebene", correct: false },
        { id: "scan", label: "Alle k Knoten müssen verglichen werden", correct: false },
      ],
      finalCaption: "Ganz rechts endet die Spur bei 20.",
      supports: [
        "Im BST ist jeder rechte Nachfolger größer.",
        "Gehe 8 → 12 → 20 und stoppe am leeren rechten Zeiger.",
      ],
      hints: [
        "Das Maximum eines BST hat kein rechtes Kind.",
        "Du brauchst ausschließlich rechte Kanten.",
      ],
      bridge: {
        code: "Node* p = root;\nwhile (p->right != nullptr)\n    p = p->right;\nreturn p->key;",
        note: "Die while-Schleife bildet deinen Pfad 1:1 ab und kostet Θ(h).",
      },
    },
    {
      id: "bst-delete-7",
      topic: "bst",
      level: "foundation",
      type: "path",
      title: "Knoten 7 mit zwei Kindern löschen",
      brief: "Finde zuerst den Löschknoten. Wähle dann den InOrder-Nachfolger, der seine Position übernimmt.",
      source: "ADSPB08 · Aufgabe 1 · Löschen von 7",
      tree: PB08_INITIAL,
      expectedPath: [13, 7],
      pathPrompt: "Klicke den Suchpfad zum zu löschenden Schlüssel 7.",
      choices: [
        { id: "successor-9", label: "Nachfolger 9 übernimmt; die alte 9 wird entfernt", correct: true },
        { id: "predecessor-3", label: "3 übernimmt, weil es links unten liegt", correct: false },
        { id: "child-12", label: "12 rückt direkt hoch; 9 bleibt unter 12", correct: false },
      ],
      finalTree: PB08_AFTER_DELETE_7,
      finalCaption: "9 ersetzt 7; 3 bleibt links und 12 rechts von 9.",
      supports: [
        "Bei zwei Kindern brauchst du einen geordneten Ersatz.",
        "Der InOrder-Nachfolger ist das Minimum des rechten Teilbaums: 9.",
      ],
      hints: [
        "Der Löschknoten liegt von 13 aus links.",
        "Suche danach im rechten Teilbaum von 7 den ganz linken Knoten.",
      ],
      bridge: {
        code: "Node* successor = minimum(node->right);\nnode->key = successor->key;\nnode->right = remove(node->right, successor->key);",
        note: "Der Ersatzwert wird kopiert; anschließend wird sein alter Knoten rekursiv entfernt.",
      },
    },
    {
      id: "traversal-inorder",
      topic: "traversal",
      level: "foundation",
      type: "order",
      title: "InOrder: Besuch in der Mitte",
      brief: "Ordne die Knoten durch Klick oder Drag & Drop in feste Plätze. Die Werte helfen hier – die Regel muss trotzdem stimmen.",
      source: "Probeklausur-Aufgabe 10 · InOrder",
      tree: TRAVERSAL_TREE,
      tokens: valueTokens([8, 4, 2, 6, 12, 10, 14]),
      expectedOrder: ["v-2", "v-4", "v-6", "v-8", "v-10", "v-12", "v-14"],
      orderPrompt: "Baue die vollständige InOrder-Folge.",
      supports: [
        "InOrder heißt: links, Knoten, rechts.",
        "Bearbeite zuerst den kompletten Teilbaum unter 4, dann 8, dann den Teilbaum unter 12.",
      ],
      hints: [
        "Die Wurzel 8 steht erst nach dem gesamten linken Teilbaum.",
        "Der linke Teilbaum liefert 2, 4, 6.",
      ],
      bridge: {
        code: "inOrder(node->left);\nvisit(node);\ninOrder(node->right);",
        note: "Die Position von visit ist der Name der Traversierung: bei InOrder zwischen den Rekursionen.",
      },
    },
    {
      id: "traversal-preorder",
      topic: "traversal",
      level: "foundation",
      type: "order",
      title: "PreOrder: Wurzel zuerst",
      brief: "Lege dieselben Knoten neu. Diesmal wird jeder Knoten vor seinen beiden Teilbäumen besucht.",
      source: "Probeklausur-Aufgabe 10 · Lernableitung PreOrder",
      tree: TRAVERSAL_TREE,
      tokens: valueTokens([8, 4, 2, 6, 12, 10, 14]),
      expectedOrder: ["v-8", "v-4", "v-2", "v-6", "v-12", "v-10", "v-14"],
      orderPrompt: "Baue die vollständige PreOrder-Folge.",
      supports: [
        "PreOrder heißt: Knoten, links, rechts.",
        "8 kommt zuerst; danach wird der linke Teilbaum vollständig erledigt.",
      ],
      hints: [
        "Beginne sofort mit der Wurzel 8.",
        "Nach 8 folgt der komplette PreOrder-Lauf unter 4.",
      ],
      bridge: {
        code: "visit(node);\npreOrder(node->left);\npreOrder(node->right);",
        note: "visit steht vor beiden rekursiven Aufrufen – daher PreOrder.",
      },
    },
    {
      id: "traversal-postorder",
      topic: "traversal",
      level: "foundation",
      type: "order",
      title: "PostOrder: Wurzel zuletzt",
      brief: "Schließe beide Teilbäume ab, bevor ihr gemeinsamer Elternknoten besucht wird.",
      source: "Probeklausur-Aufgabe 10 · Lernableitung PostOrder",
      tree: TRAVERSAL_TREE,
      tokens: valueTokens([8, 4, 2, 6, 12, 10, 14]),
      expectedOrder: ["v-2", "v-6", "v-4", "v-10", "v-14", "v-12", "v-8"],
      orderPrompt: "Baue die vollständige PostOrder-Folge.",
      supports: [
        "PostOrder heißt: links, rechts, Knoten.",
        "Unter 4 kommen erst 2 und 6, dann 4; die Wurzel 8 kommt ganz zuletzt.",
      ],
      hints: [
        "Ein Elternknoten darf erst nach beiden Kindern erscheinen.",
        "Die ersten drei Werte sind 2, 6, 4.",
      ],
      bridge: {
        code: "postOrder(node->left);\npostOrder(node->right);\nvisit(node);",
        note: "visit steht hinter beiden Rekursionen – daher PostOrder.",
      },
    },
    {
      id: "traversal-code-order",
      topic: "traversal",
      level: "foundation",
      type: "order",
      title: "Aus dem Bild in drei Codezeilen",
      brief: "Ordne keine Zahlen, sondern die drei Aktionen eines InOrder-Aufrufs.",
      source: "Probeklausur-Aufgabe 10 · rekursive InOrder-Funktion",
      tree: TRAVERSAL_TREE,
      tokens: [
        token("left", "links rekursiv"),
        token("visit", "Knoten besuchen"),
        token("right", "rechts rekursiv"),
      ],
      expectedOrder: ["left", "visit", "right"],
      orderPrompt: "Ziehe die drei Codeaktionen in Ausführungsreihenfolge.",
      supports: [
        "Der Name InOrder verrät die mittlere Position.",
        "Zuerst links, dann visit, dann rechts.",
      ],
      hints: [
        "Der aktuelle Knoten wird zwischen den Teilbäumen ausgegeben.",
        "Die erste Aktion ist der rekursive Aufruf für links.",
      ],
      bridge: {
        code: "if (node == nullptr) return;\ninOrder(node->left);\ncout << node->key;\ninOrder(node->right);",
        note: "Der Null-Fall stoppt. Die drei folgenden Zeilen sind genau deine gelegte Reihenfolge.",
      },
    },
    {
      id: "avl-ll",
      topic: "avl",
      level: "foundation",
      type: "rotation",
      title: "LL-Fall: einmal nach rechts",
      brief: "Lies den Einfügepfad 90 → 80 → 70, klassifiziere den Fall und führe die Rotation aus.",
      source: "Verifizierter Lernstand · AVL LL",
      states: [
        tree(90, tree(80, tree(70))),
        tree(80, tree(70), tree(90)),
      ],
      stateCaptions: ["90 ist links-links überlastet.", "80 übernimmt die Wurzelposition."],
      pivots: [90, 80],
      expectedPath: [90, 80, 70],
      rotationType: "LL",
      rotationTokens: [token("right-90", "Rechtsrotation um 90")],
      expectedRotations: ["right-90"],
      supports: [
        "Benenne die beiden Richtungen ab dem ersten unausgeglichenen Knoten.",
        "Von 90 geht es links und nochmals links: LL.",
      ],
      hints: [
        "Der neue Knoten liegt im linken Teilbaum des linken Kindes.",
        "LL wird durch eine Rechtsrotation am oberen Knoten behoben.",
      ],
      bridge: {
        code: "LL  →  rotateRight(90)\nPrüfung: InOrder = 70, 80, 90",
        note: "Bei AVL zählt hier erst die Struktur: Fall erkennen, Pivot drehen, InOrder prüfen.",
      },
    },
    {
      id: "avl-rr",
      topic: "avl",
      level: "foundation",
      type: "rotation",
      title: "RR-Fall: einmal nach links",
      brief: "Verfolge 10 → 20 → 25. Der Fall ist das Spiegelbild von LL.",
      source: "Verifizierter Lernstand · AVL RR",
      states: [
        tree(10, null, tree(20, null, tree(25))),
        tree(20, tree(10), tree(25)),
      ],
      stateCaptions: ["10 ist rechts-rechts überlastet.", "20 übernimmt die Wurzelposition."],
      pivots: [10, 20],
      expectedPath: [10, 20, 25],
      rotationType: "RR",
      rotationTokens: [token("left-10", "Linksrotation um 10")],
      expectedRotations: ["left-10"],
      supports: [
        "Lies beide Kantenrichtungen ab 10.",
        "Rechts und nochmals rechts ergibt RR.",
      ],
      hints: [
        "Der neue Knoten liegt im rechten Teilbaum des rechten Kindes.",
        "RR wird durch eine Linksrotation am oberen Knoten behoben.",
      ],
      bridge: {
        code: "RR  →  rotateLeft(10)\nPrüfung: InOrder = 10, 20, 25",
        note: "LL und RR sind Spiegelbilder; die Drehrichtung ist jeweils entgegengesetzt zur Schieflage.",
      },
    },
    {
      id: "avl-lr",
      topic: "avl",
      level: "foundation",
      type: "rotation",
      title: "LR-Fall vollständig drehen",
      brief: "Eine Zickzack-Spur braucht zwei Schritte. Ordne sie, führe beide aus und prüfe das Ergebnis.",
      source: "Verifizierter Lernstand · AVL LR",
      states: [
        tree(40, tree(20, null, tree(30))),
        tree(40, tree(30, tree(20))),
        tree(30, tree(20), tree(40)),
      ],
      stateCaptions: ["Pfad: links, dann rechts.", "Schritt 1 richtet den linken Teilbaum aus.", "Schritt 2 balanciert die Wurzel."],
      pivots: [40, 20, 30],
      expectedPath: [40, 20, 30],
      rotationType: "LR",
      rotationTokens: [
        token("left-20", "Linksrotation um 20"),
        token("right-40", "Rechtsrotation um 40"),
      ],
      expectedRotations: ["left-20", "right-40"],
      supports: [
        "Zickzack heißt Doppelrotation: zuerst das Kind, dann der obere Pivot.",
        "Erst links um 20, danach rechts um 40.",
      ],
      hints: [
        "Richte zuerst 20–30 zu einer LL-Linie aus.",
        "Nach der Linksrotation um 20 folgt die Rechtsrotation um 40.",
      ],
      bridge: {
        code: "LR  →  rotateLeft(20)\n       rotateRight(40)\nPrüfung: InOrder = 20, 30, 40",
        note: "Die beiden Operationen sind bewusst als Strukturkarten dargestellt – nicht als auswendig zu lernender C++-Block.",
      },
    },
    {
      id: "avl-rl",
      topic: "avl",
      level: "foundation",
      type: "rotation",
      title: "RL-Fall als Spiegelbild",
      brief: "Vervollständige die bisher offene Spiegelung: rechts-links erkennen, zweimal drehen, InOrder prüfen.",
      source: "Lernstandslücke · AVL RL-Spiegelung",
      states: [
        tree(20, null, tree(40, tree(30))),
        tree(20, null, tree(30, null, tree(40))),
        tree(30, tree(20), tree(40)),
      ],
      stateCaptions: ["Pfad: rechts, dann links.", "Schritt 1 richtet den rechten Teilbaum aus.", "Schritt 2 balanciert die Wurzel."],
      pivots: [20, 40, 30],
      expectedPath: [20, 40, 30],
      rotationType: "RL",
      rotationTokens: [
        token("right-40", "Rechtsrotation um 40"),
        token("left-20", "Linksrotation um 20"),
      ],
      expectedRotations: ["right-40", "left-20"],
      supports: [
        "Spiegle LR vollständig – auch die Reihenfolge der Drehrichtungen.",
        "Erst rechts um 40, danach links um 20.",
      ],
      hints: [
        "Richte zuerst 40–30 zu einer RR-Linie aus.",
        "Nach der Rechtsrotation um 40 folgt die Linksrotation um 20.",
      ],
      bridge: {
        code: "RL  →  rotateRight(40)\n       rotateLeft(20)\nPrüfung: InOrder = 20, 30, 40",
        note: "RL ist die echte Spiegelung von LR: Pfad und Operationsfolge wechseln die Seiten.",
      },
    },
    {
      id: "bst-delete-13-transfer",
      topic: "bst",
      level: "transfer",
      type: "path",
      title: "Transfer: die Wurzel 13 löschen",
      brief: "Arbeite auf dem Baum nach dem Löschen von 7 weiter. Nun hat die Wurzel zwei Kinder.",
      source: "ADSPB08 · Aufgabe 1 · Folgeschritt Löschen von 13",
      tree: PB08_AFTER_DELETE_7,
      expectedPath: [13],
      pathPrompt: "Klicke den Suchpfad zum Schlüssel 13.",
      choices: [
        { id: "successor-14", label: "14 ist der InOrder-Nachfolger und wird neue Wurzel", correct: true },
        { id: "successor-17", label: "17 wird neue Wurzel, weil es das rechte Kind ist", correct: false },
        { id: "predecessor-12", label: "12 wird zwingend neue Wurzel", correct: false },
      ],
      finalTree: PB08_AFTER_DELETE_13,
      finalCaption: "14 ersetzt 13; die alte 14 verschwindet links von 17.",
      supports: [
        "Der Nachfolger ist nicht automatisch das rechte Kind.",
        "Gehe im rechten Teilbaum einmal zu 17 und dann ganz nach links zu 14.",
      ],
      hints: [
        "Der Suchpfad zur Wurzel enthält nur einen Knoten.",
        "Das Minimum im rechten Teilbaum ist 14.",
      ],
      bridge: {
        code: "successor = minimum(root->right);  // 14\nroot->key = successor->key;\nroot->right = remove(root->right, 14);",
        note: "Der zweite rekursive Löschlauf entfernt die ursprüngliche 14 unterhalb von 17.",
      },
    },
    {
      id: "bst-path-vs-full",
      topic: "bst",
      level: "transfer",
      type: "concept",
      title: "Transfer: Suchpfad oder Vollbesuch?",
      brief: "Die Suche nach 9 besucht 8 → 12 → 10 → 9. Welche Laufzeitaussage beschreibt diesen Mechanismus korrekt?",
      source: "Probeklausur-Aufgaben 10/12 · Lerntransfer Laufzeit",
      tree: TASK_12_TREE,
      choices: [
        { id: "height", label: "BST-Suche: Θ(h), weil pro Ebene höchstens eine Kante gewählt wird", correct: true },
        { id: "nodes", label: "BST-Suche: immer Θ(k), weil der Baum k Knoten besitzt", correct: false },
        { id: "constant", label: "BST-Suche: Θ(1), weil der Wert vorhanden ist", correct: false },
      ],
      markedPath: [8, 12, 10, 9],
      supports: [
        "Zähle besuchte Ebenen, nicht vorhandene Knoten.",
        "Der Suchbaum verwirft bei jedem Vergleich einen ganzen Teilbaum: Θ(h).",
      ],
      hints: [
        "Der Pfad enthält vier Knoten, obwohl der Baum neun Knoten hat.",
        "Nur eine der beiden rekursiven Richtungen wird gewählt.",
      ],
      bridge: {
        code: "search(node, key)\n  if key < node->key: return search(node->left, key)\n  else:               return search(node->right, key)",
        note: "Ein Suchpfad kostet Θ(h). Eine vollständige Traversierung besucht dagegen Θ(k) Knoten.",
      },
    },
    {
      id: "traversal-non-bst",
      topic: "traversal",
      level: "transfer",
      type: "order",
      title: "Transfer: PostOrder ohne BST-Hilfe",
      brief: "Die Werte sind absichtlich nicht sortiert. Nur die Baumstruktur und die Besuchsregel zählen.",
      source: "Lernvariante · Strukturtransfer Traversierung",
      tree: tree(7, tree(12, tree(1), tree(9)), tree(3, null, tree(8))),
      tokens: valueTokens([7, 12, 1, 9, 3, 8]),
      expectedOrder: ["v-1", "v-9", "v-12", "v-8", "v-3", "v-7"],
      orderPrompt: "Baue die PostOrder-Folge, ohne nach Wertgröße zu sortieren.",
      supports: [
        "Traversal braucht keine BST-Eigenschaft.",
        "Links: 1, 9, 12. Rechts: 8, 3. Ganz zuletzt: 7.",
      ],
      hints: [
        "Unter 12 werden erst 1 und 9 besucht, dann 12.",
        "Die Wurzel 7 kommt bei PostOrder ganz zuletzt.",
      ],
      bridge: {
        code: "postOrder(left);\npostOrder(right);\nvisit(node);",
        note: "Die Funktion vergleicht keine Schlüssel. Deshalb ist ihre Reihenfolge unabhängig von der BST-Regel.",
      },
    },
    {
      id: "traversal-runtime",
      topic: "traversal",
      level: "transfer",
      type: "concept",
      title: "Transfer: zwei Rekursionen, trotzdem Θ(k)",
      brief: "Eine Traversierung ruft sich links und rechts auf. Warum explodiert die Laufzeit nicht zu Θ(2ᵏ)?",
      source: "Probeklausur-Aufgabe 10 · Lerntransfer Laufzeit",
      tree: TRAVERSAL_TREE,
      choices: [
        { id: "disjoint", label: "Beide Aufrufe bearbeiten disjunkte Teilbäume; jeder Knoten wird einmal besucht: Θ(k)", correct: true },
        { id: "exponential", label: "Zwei Aufrufe pro Knoten bedeuten automatisch Θ(2ᵏ)", correct: false },
        { id: "height", label: "Es wird immer nur ein Pfad verfolgt, also Θ(h)", correct: false },
      ],
      supports: [
        "Frage, ob dieselben Knoten mehrfach bearbeitet werden.",
        "Linker und rechter Teilbaum überlappen nicht; zusammen enthalten sie k−1 Knoten.",
      ],
      hints: [
        "Markiere gedanklich jeden Knoten beim ersten Besuch.",
        "Die Rekurrenz ist T(k)=T(kₗ)+T(kᵣ)+Θ(1), nicht 2T(k−1).",
      ],
      bridge: {
        code: "T(k) = T(k_left) + T(k_right) + Θ(1)\nk_left + k_right = k - 1\n⇒ T(k) = Θ(k)",
        note: "Zwei rekursive Codezeilen sind nicht automatisch exponentiell. Entscheidend sind Größe und Überlappung der Teilprobleme.",
      },
    },
    {
      id: "avl-lr-transfer",
      topic: "avl",
      level: "transfer",
      type: "rotation",
      title: "Transfer: LR mit mitwanderndem Teilbaum",
      brief: "Der Knoten 35 darf bei den Rotationen nicht verloren gehen. Verfolge Pfad, Operationen und beide Zwischenbilder.",
      source: "Lernvariante · AVL LR mit fünf Knoten",
      states: [
        tree(50, tree(30, null, tree(40, tree(35))), tree(70)),
        tree(50, tree(40, tree(30, null, tree(35))), tree(70)),
        tree(40, tree(30, null, tree(35)), tree(50, null, tree(70))),
      ],
      stateCaptions: ["35 erzeugt den LR-Pfad unter 50.", "35 wandert als rechtes Kind von 30 mit.", "40 balanciert; die InOrder-Folge bleibt gleich."],
      pivots: [50, 30, 40],
      expectedPath: [50, 30, 40, 35],
      rotationType: "LR",
      rotationTokens: [
        token("left-30", "Linksrotation um 30"),
        token("right-50", "Rechtsrotation um 50"),
      ],
      expectedRotations: ["left-30", "right-50"],
      supports: [
        "Achte neben den drei Pivotwerten auch auf den inneren Teilbaum 35.",
        "Erst links um 30; 35 bleibt rechts von 30. Dann rechts um 50.",
      ],
      hints: [
        "Der Pfad zum neuen tiefen Knoten lautet 50 → 30 → 40 → 35.",
        "Nach beiden Rotationen lautet InOrder weiterhin 30, 35, 40, 50, 70.",
      ],
      bridge: {
        code: "LR  →  rotateLeft(30)\n       rotateRight(50)\nCheck: 30 < 35 < 40 < 50 < 70",
        note: "Mitwandernde Teilbäume werden an der einzigen Position befestigt, an der ihre Schlüssel weiterhin gültig sind.",
      },
    },
    {
      id: "avl-rl-transfer",
      topic: "avl",
      level: "transfer",
      type: "rotation",
      title: "Transfer: RL mit mitwanderndem Teilbaum",
      brief: "Spiegle den Fünf-Knoten-Fall vollständig. Der Knoten 45 ist der Kontrollpunkt.",
      source: "Lernvariante · AVL RL mit fünf Knoten",
      states: [
        tree(30, tree(10), tree(50, tree(40, null, tree(45)))),
        tree(30, tree(10), tree(40, null, tree(50, tree(45)))),
        tree(40, tree(30, tree(10)), tree(50, tree(45))),
      ],
      stateCaptions: ["45 erzeugt den RL-Pfad unter 30.", "45 wandert als linkes Kind von 50 mit.", "40 balanciert; die InOrder-Folge bleibt gleich."],
      pivots: [30, 50, 40],
      expectedPath: [30, 50, 40, 45],
      rotationType: "RL",
      rotationTokens: [
        token("right-50", "Rechtsrotation um 50"),
        token("left-30", "Linksrotation um 30"),
      ],
      expectedRotations: ["right-50", "left-30"],
      supports: [
        "Spiegle Richtungen, Pivots und die Position des inneren Teilbaums.",
        "Erst rechts um 50; 45 bleibt links von 50. Dann links um 30.",
      ],
      hints: [
        "Der Pfad lautet 30 → 50 → 40 → 45.",
        "Nach beiden Rotationen lautet InOrder weiterhin 10, 30, 40, 45, 50.",
      ],
      bridge: {
        code: "RL  →  rotateRight(50)\n       rotateLeft(30)\nCheck: 10 < 30 < 40 < 45 < 50",
        note: "Der Knoten 45 kontrolliert, ob du den inneren Teilbaum beim Spiegeln korrekt mitgenommen hast.",
      },
    },
  ];

  const elements = {
    caseTabs: document.querySelector("#case-tabs"),
    caseTopic: document.querySelector("#case-topic"),
    caseTitle: document.querySelector("#case-title"),
    caseBrief: document.querySelector("#case-brief"),
    caseNumber: document.querySelector("#case-number"),
    caseSource: document.querySelector("#case-source"),
    stageCaption: document.querySelector("#stage-caption"),
    treeSvg: document.querySelector("#tree-svg"),
    treeText: document.querySelector("#tree-text"),
    actionPanel: document.querySelector("#action-panel"),
    feedback: document.querySelector("#feedback"),
    supportBanner: document.querySelector("#support-banner"),
    hintButton: document.querySelector("#hint-button"),
    modeIndicator: document.querySelector("#mode-indicator"),
    nextButton: document.querySelector("#next-button"),
    codeBridge: document.querySelector("#code-bridge"),
    bridgeCode: document.querySelector("#bridge-code"),
    bridgeNote: document.querySelector("#bridge-note"),
    cleanCount: document.querySelector("#clean-count"),
    adaptiveNote: document.querySelector("#adaptive-note"),
  };

  const validModes = new Set(["guided", "adaptive", "exam"]);
  const validBanks = new Set(["foundation", "transfer", "all"]);

  function readRootState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  const initialRoot = readRootState();
  const initialEvidence = initialRoot.evidence && typeof initialRoot.evidence === "object"
    ? initialRoot.evidence
    : {};
  const initialPreferences = initialRoot.preferences && typeof initialRoot.preferences === "object"
    ? initialRoot.preferences
    : {};

  let results = initialEvidence.treeDetective && typeof initialEvidence.treeDetective === "object"
    ? { ...initialEvidence.treeDetective }
    : {};
  let stats = initialEvidence.treeDetectiveStats && typeof initialEvidence.treeDetectiveStats === "object"
    ? { ...initialEvidence.treeDetectiveStats }
    : {};
  stats.cases = stats.cases && typeof stats.cases === "object" ? { ...stats.cases } : {};
  stats.supportLevel = Number.isInteger(stats.supportLevel) ? Math.max(0, Math.min(2, stats.supportLevel)) : 1;
  stats.cleanRunIds = Array.isArray(stats.cleanRunIds) ? [...stats.cleanRunIds] : [];

  const storedPreferences = initialPreferences.treeLearning && typeof initialPreferences.treeLearning === "object"
    ? initialPreferences.treeLearning
    : {};
  let preferences = {
    learningMode: validModes.has(storedPreferences.learningMode) ? storedPreferences.learningMode : "adaptive",
    bank: validBanks.has(storedPreferences.bank) ? storedPreferences.bank : "foundation",
  };

  if (location.hash === "#transfer") preferences.bank = "transfer";
  if (location.hash === "#all") preferences.bank = "all";

  let currentCase = null;
  let session = null;
  let completedThisRun = 0;

  function saveState() {
    const root = readRootState();
    if (!root.evidence || typeof root.evidence !== "object" || Array.isArray(root.evidence)) root.evidence = {};
    if (!root.preferences || typeof root.preferences !== "object" || Array.isArray(root.preferences)) root.preferences = {};
    root.evidence.treeDetective = results;
    root.evidence.treeDetectiveStats = stats;
    root.preferences.treeLearning = preferences;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
    } catch (_) {
      // Das Training funktioniert auch ohne persistenten Browserspeicher.
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  function activeCases() {
    return preferences.bank === "all"
      ? CASES
      : CASES.filter((item) => item.level === preferences.bank);
  }

  function currentSupportLevel() {
    if (preferences.learningMode === "guided") return 2;
    if (preferences.learningMode === "exam") return 0;
    return stats.supportLevel;
  }

  function modeLabel() {
    if (preferences.learningMode === "guided") return "Begleitet · Hilfestufe 2";
    if (preferences.learningMode === "exam") return "Prüfung · Hilfen aus";
    return `Adaptiv · Hilfestufe ${currentSupportLevel()}`;
  }

  function updateHash() {
    const hash = preferences.bank === "transfer" ? "#transfer" : preferences.bank === "all" ? "#all" : "";
    try {
      history.replaceState(null, "", `${location.pathname}${location.search}${hash}`);
    } catch (_) {
      // file:// darf je nach Browser History-Aufrufe einschränken.
    }
  }

  function setBank(bank, requestedTopic = null) {
    if (!validBanks.has(bank)) return;
    preferences.bank = bank;
    saveState();
    updateHash();
    const pool = activeCases();
    const matching = requestedTopic ? pool.filter((item) => item.topic === requestedTopic) : pool;
    const next = matching.find((item) => !results[item.id]) || matching[0] || pool.find((item) => !results[item.id]) || pool[0];
    if (next) startCase(next.id);
    renderSettings();
  }

  function renderSettings() {
    document.querySelectorAll("[data-learning-mode]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.learningMode === preferences.learningMode));
    });
    document.querySelectorAll("[data-bank]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.bank === preferences.bank));
    });
    elements.modeIndicator.textContent = modeLabel();
    elements.adaptiveNote.textContent = preferences.learningMode === "adaptive"
      ? `Adaptiv: aktuelle Hilfestufe ${currentSupportLevel()}. Zwei verschiedene saubere Fälle ziehen eine Stufe zurück.`
      : preferences.learningMode === "guided"
        ? "Begleitet zeigt eine stärkere Startspur. Fehler bleiben erlaubt und sichtbar."
        : "Prüfungsmodus blendet Startspuren und Hinweise aus; es gibt bewusst keinen Zwangstimer.";
    renderSupportBanner();
    updateHintButton();
  }

  function renderTopicStatus() {
    ["bst", "traversal", "avl"].forEach((topic) => {
      const transferCases = CASES.filter((item) => item.topic === topic && item.level === "transfer");
      const clean = transferCases.filter((item) => results[item.id] && results[item.id].quality === "clean").length;
      const label = document.querySelector(`[data-topic-status="${topic}"]`);
      if (!label) return;
      const sits = clean === transferCases.length;
      label.textContent = sits ? "Sitzt · 2/2 sauber" : `Transfer ${clean}/2 sauber`;
      label.classList.toggle("is-clean", sits);
    });
    elements.cleanCount.textContent = String(Object.values(results).filter((entry) => entry && entry.quality === "clean").length);
  }

  function renderCaseTabs() {
    const pool = activeCases();
    elements.caseTabs.innerHTML = pool.map((item) => {
      const globalNumber = CASES.indexOf(item) + 1;
      const quality = results[item.id] && results[item.id].quality;
      const resultClass = quality === "clean" ? "is-clean" : quality === "guided" ? "is-guided" : "";
      return `<button class="case-tab ${resultClass}" type="button" role="tab" data-case-id="${escapeHtml(item.id)}" aria-selected="${item.id === currentCase.id}" aria-label="Fall ${globalNumber}: ${escapeHtml(item.title)}">${String(globalNumber).padStart(2, "0")}</button>`;
    }).join("");
    elements.caseTabs.querySelectorAll("[data-case-id]").forEach((button) => {
      button.addEventListener("click", () => startCase(button.dataset.caseId));
    });
  }

  function initialPhase(item) {
    if (item.type === "path" || item.type === "rotation") return "path";
    if (item.type === "order") return "order";
    return "choice";
  }

  function startCase(id) {
    const item = CASES.find((candidate) => candidate.id === id);
    if (!item) return;
    currentCase = item;
    const sequenceLength = item.expectedOrder
      ? item.expectedOrder.length
      : item.expectedRotations
        ? item.expectedRotations.length
        : 0;
    session = {
      phase: initialPhase(item),
      path: [],
      choice: null,
      sequence: Array(sequenceLength).fill(null),
      wrong: 0,
      hintUsed: false,
      hintIndex: 0,
      animationIndex: 0,
    };

    const globalNumber = CASES.indexOf(item) + 1;
    elements.caseTopic.textContent = `${TOPIC_LABELS[item.topic]} · ${item.level === "foundation" ? "Fundament" : "Transfer"}`;
    elements.caseTitle.textContent = item.title;
    elements.caseBrief.textContent = item.brief;
    elements.caseNumber.textContent = String(globalNumber).padStart(2, "0");
    elements.caseSource.textContent = item.source;
    elements.nextButton.hidden = true;
    elements.codeBridge.hidden = true;
    clearFeedback();
    renderCaseTabs();
    renderSupportBanner();
    updateHintButton();
    renderTree();
    renderActionPanel();
  }

  function countDepth(node) {
    if (!node) return -1;
    return 1 + Math.max(countDepth(node[1]), countDepth(node[2]));
  }

  function describeTree(node) {
    if (!node) return "leer";
    const parts = [];
    function walk(current) {
      if (!current) return;
      const left = current[1] ? current[1][0] : "leer";
      const right = current[2] ? current[2][0] : "leer";
      parts.push(`${current[0]}: links ${left}, rechts ${right}`);
      walk(current[1]);
      walk(current[2]);
    }
    walk(node);
    return parts.join("; ");
  }

  function displayedTree() {
    if (currentCase.type === "rotation") return currentCase.states[session.animationIndex];
    if (currentCase.type === "path" && session.phase === "completed" && currentCase.finalTree) return currentCase.finalTree;
    return currentCase.tree;
  }

  function activePath() {
    if (currentCase.type === "concept") return currentCase.markedPath || [];
    return session.path;
  }

  function renderTree() {
    const root = displayedTree();
    const svg = elements.treeSvg;
    const namespace = "http://www.w3.org/2000/svg";
    svg.replaceChildren();
    const positions = [];
    const maxDepth = Math.max(1, countDepth(root));
    const yGap = Math.min(102, 285 / maxDepth);

    function layout(node, x = 380, depth = 0, span = 190, parent = null) {
      if (!node) return;
      const position = { node, value: node[0], x, y: 58 + depth * yGap, parent };
      positions.push(position);
      const nextSpan = Math.max(43, span * .55);
      layout(node[1], x - span, depth + 1, nextSpan, position);
      layout(node[2], x + span, depth + 1, nextSpan, position);
    }
    layout(root);

    const path = activePath();
    function edgeOnPath(parentValue, childValue) {
      return path.some((value, index) => value === parentValue && path[index + 1] === childValue);
    }

    positions.filter((position) => position.parent).forEach((position) => {
      const line = document.createElementNS(namespace, "line");
      line.setAttribute("x1", String(position.parent.x));
      line.setAttribute("y1", String(position.parent.y));
      line.setAttribute("x2", String(position.x));
      line.setAttribute("y2", String(position.y));
      line.setAttribute("class", `tree-edge${edgeOnPath(position.parent.value, position.value) ? " is-path" : ""}`);
      line.dataset.edge = `${position.parent.value}-${position.value}`;
      svg.append(line);
    });

    const finalState = session.phase === "completed"
      || (currentCase.type === "rotation" && session.animationIndex === currentCase.states.length - 1);
    const pivot = currentCase.type === "rotation" ? currentCase.pivots[session.animationIndex] : null;

    positions.forEach((position) => {
      const group = document.createElementNS(namespace, "g");
      const selected = path.includes(position.value);
      group.setAttribute("class", `tree-node${selected ? " is-selected" : ""}${finalState ? " is-final" : ""}${pivot === position.value ? " is-pivot" : ""}`);
      group.setAttribute("transform", `translate(${position.x} ${position.y})`);
      if (session.phase === "path") group.setAttribute("tabindex", "0");
      group.setAttribute("role", session.phase === "path" ? "button" : "img");
      group.setAttribute("aria-label", `Knoten ${position.value}${selected ? ", im gewählten Pfad" : ""}`);
      if (session.phase === "path") group.setAttribute("aria-disabled", "false");
      group.dataset.nodeValue = String(position.value);

      const circle = document.createElementNS(namespace, "circle");
      circle.setAttribute("r", "29");
      const label = document.createElementNS(namespace, "text");
      label.setAttribute("y", "8");
      label.textContent = String(position.value);
      group.append(circle, label);

      group.addEventListener("click", () => handleNodeClick(position.value));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNodeClick(position.value);
        }
      });
      svg.append(group);
    });

    elements.treeText.textContent = `Baumstruktur: ${describeTree(root)}.`;
    if (currentCase.type === "rotation") {
      elements.stageCaption.textContent = currentCase.stateCaptions[session.animationIndex];
    } else if (session.phase === "completed" && currentCase.finalCaption) {
      elements.stageCaption.textContent = currentCase.finalCaption;
    } else if (currentCase.type === "path") {
      elements.stageCaption.textContent = "Klicke den Pfad ab der Wurzel.";
    } else if (currentCase.type === "concept") {
      elements.stageCaption.textContent = currentCase.markedPath ? `Markierter Pfad: ${currentCase.markedPath.join(" → ")}` : "Lies die Struktur.";
    } else {
      elements.stageCaption.textContent = "Lies Verbindungen, nicht Wertmuster.";
    }
  }

  function handleNodeClick(value) {
    if (session.phase !== "path") return;
    const existing = session.path.indexOf(value);
    if (existing >= 0) {
      session.path = session.path.slice(0, existing + 1);
    } else {
      session.path.push(value);
    }
    clearFeedback();
    renderTree();
    renderActionPanel();
  }

  function clearFeedback() {
    elements.feedback.className = "feedback";
    elements.feedback.textContent = "";
  }

  function showFeedback(kind, message) {
    elements.feedback.className = `feedback show ${kind}`;
    elements.feedback.textContent = message;
  }

  function caseStats() {
    if (!stats.cases[currentCase.id] || typeof stats.cases[currentCase.id] !== "object") {
      stats.cases[currentCase.id] = { attempts: 0, wrong: 0, hints: 0 };
    }
    return stats.cases[currentCase.id];
  }

  function recordAttempt() {
    const entry = caseStats();
    entry.attempts = (entry.attempts || 0) + 1;
    saveState();
  }

  function raiseAdaptiveSupport() {
    if (preferences.learningMode !== "adaptive") return;
    stats.supportLevel = Math.min(2, currentSupportLevel() + 1);
    stats.cleanRunIds = [];
  }

  function recordWrong() {
    session.wrong += 1;
    const entry = caseStats();
    entry.wrong = (entry.wrong || 0) + 1;
    raiseAdaptiveSupport();
    saveState();
    renderSettings();
  }

  function renderSupportBanner() {
    if (!currentCase || !session || currentSupportLevel() === 0) {
      elements.supportBanner.hidden = true;
      return;
    }
    const level = currentSupportLevel();
    elements.supportBanner.hidden = false;
    elements.supportBanner.textContent = `${level === 2 ? "Starke Startspur" : "Startspur"}: ${currentCase.supports[level - 1]}`;
  }

  function updateHintButton() {
    const hidden = !currentCase || preferences.learningMode === "exam";
    elements.hintButton.hidden = hidden;
    if (hidden) return;
    const exhausted = session && session.hintIndex >= currentCase.hints.length;
    elements.hintButton.disabled = Boolean(exhausted);
    elements.hintButton.textContent = exhausted ? "Hinweise ausgeschöpft" : `Hinweis ${session.hintIndex + 1} öffnen`;
  }

  function useHint() {
    if (preferences.learningMode === "exam" || session.hintIndex >= currentCase.hints.length) return;
    const hint = currentCase.hints[session.hintIndex];
    session.hintIndex += 1;
    session.hintUsed = true;
    const entry = caseStats();
    entry.hints = (entry.hints || 0) + 1;
    raiseAdaptiveSupport();
    saveState();
    renderSettings();
    showFeedback("try", `Hinweis ${session.hintIndex}: ${hint}`);
  }

  function renderPathPhase() {
    const pathMarkup = session.path.length
      ? session.path.map((value) => `<b>${escapeHtml(value)}</b>`).join(" → ")
      : "Noch kein Knoten gewählt.";
    elements.actionPanel.innerHTML = `
      <span class="instruction-tag">Schritt 1 · Pfad</span>
      <h4>${escapeHtml(currentCase.pathPrompt || "Klicke den Einfügepfad.")}</h4>
      <p>Ein zweiter Klick auf einen bereits gewählten Knoten setzt den Pfad bis dorthin zurück.</p>
      <div class="path-readout" aria-label="Gewählter Pfad">${pathMarkup}</div>
      <div class="button-row">
        <button class="panel-button primary" id="check-path" type="button">Pfad prüfen</button>
        <button class="panel-button" id="reset-path" type="button">Zurücksetzen</button>
      </div>`;
    document.querySelector("#reset-path").addEventListener("click", () => {
      session.path = [];
      clearFeedback();
      renderTree();
      renderActionPanel();
    });
    document.querySelector("#check-path").addEventListener("click", () => {
      if (!session.path.length) {
        showFeedback("try", "Wähle zuerst mindestens den Wurzelknoten.");
        return;
      }
      recordAttempt();
      if (!arraysEqual(session.path, currentCase.expectedPath)) {
        recordWrong();
        showFeedback("try", "Der Pfad stimmt noch nicht. Prüfe an der ersten Abzweigung erneut kleiner oder größer.");
        return;
      }
      session.phase = "choice";
      session.choice = null;
      renderActionPanel();
      showFeedback("good", "Pfad stimmt. Jetzt begründe die Operation.");
    });
  }

  function renderChoicePhase() {
    const isRotationClass = currentCase.type === "rotation" && session.animationIndex === 0;
    const isRotationVerify = currentCase.type === "rotation" && session.phase === "verify";
    const choices = isRotationClass
      ? ["LL", "RR", "LR", "RL"].map((label) => ({ id: label, label: `${label}-Fall`, correct: label === currentCase.rotationType }))
      : isRotationVerify
        ? [
          { id: "sorted", label: "InOrder ist weiter aufsteigend; die BST-Regel gilt", correct: true },
          { id: "height-only", label: "Nur die Höhe zählt; die Schlüsselordnung darf sich ändern", correct: false },
        ]
        : currentCase.choices;
    const tag = isRotationClass ? "Schritt 2 · Falltyp" : isRotationVerify ? "Schritt 4 · Prüfungssatz" : "Schritt 2 · Schlussfolgerung";
    const heading = isRotationClass
      ? "Welche Schieflage zeigt der Pfad?"
      : isRotationVerify
        ? "Woran erkennst du, dass die Rotation korrekt blieb?"
        : "Welche Aussage folgt aus der Struktur?";
    elements.actionPanel.innerHTML = `
      <span class="instruction-tag">${tag}</span>
      <h4>${heading}</h4>
      <div class="choice-list">
        ${choices.map((choice) => `<button class="choice-button${session.choice === choice.id ? " is-selected" : ""}" type="button" data-choice="${escapeHtml(choice.id)}">${escapeHtml(choice.label)}</button>`).join("")}
      </div>
      <button class="panel-button primary" id="check-choice" type="button">Aussage prüfen</button>`;
    elements.actionPanel.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        session.choice = button.dataset.choice;
        elements.actionPanel.querySelectorAll("[data-choice]").forEach((candidate) => {
          candidate.classList.toggle("is-selected", candidate === button);
        });
      });
    });
    document.querySelector("#check-choice").addEventListener("click", () => {
      const selected = choices.find((choice) => choice.id === session.choice);
      if (!selected) {
        showFeedback("try", "Wähle zuerst eine Aussage.");
        return;
      }
      recordAttempt();
      if (!selected.correct) {
        recordWrong();
        showFeedback("try", "Noch nicht. Begründe die Aussage direkt mit Kanten, Besuchsregel oder InOrder-Prüfung.");
        return;
      }
      if (isRotationClass) {
        session.phase = "rotation-sequence";
        session.choice = null;
        session.sequence = Array(currentCase.expectedRotations.length).fill(null);
        renderActionPanel();
        showFeedback("good", `${currentCase.rotationType} stimmt. Ordne jetzt die Rotation${currentCase.expectedRotations.length > 1 ? "en" : ""}.`);
      } else if (isRotationVerify) {
        completeCase();
      } else {
        completeCase();
      }
    });
  }

  function placeSequenceToken(id, targetIndex) {
    const currentIndex = session.sequence.indexOf(id);
    const displaced = session.sequence[targetIndex];
    if (currentIndex >= 0) {
      session.sequence[currentIndex] = displaced || null;
    }
    session.sequence[targetIndex] = id;
    clearFeedback();
    renderActionPanel();
  }

  function renderSequence(tokens, expected, prompt, onCorrect) {
    const tokenById = Object.fromEntries(tokens.map((item) => [item.id, item]));
    elements.actionPanel.innerHTML = `
      <span class="instruction-tag">${currentCase.type === "rotation" ? "Schritt 3 · Operation" : "Besuchsfolge"}</span>
      <h4>${escapeHtml(prompt)}</h4>
      <p class="sequence-instruction">Klicke Karten zum Einsetzen – oder ziehe sie in einen festen Platz. Ein Klick auf einen belegten Platz löst die Karte wieder.</p>
      <div class="sequence-slots" aria-label="Feste Lösungsplätze">
        ${expected.map((_, index) => {
          const id = session.sequence[index];
          const label = id && tokenById[id] ? tokenById[id].label : `Platz ${index + 1}`;
          return `<div class="sequence-slot" tabindex="0" role="button" draggable="${Boolean(id)}" data-slot="${index}" data-token-id="${id || ""}" aria-label="Platz ${index + 1}: ${escapeHtml(label)}">${escapeHtml(label)}</div>`;
        }).join("")}
      </div>
      <div class="token-bank" aria-label="Verfügbare Karten">
        ${tokens.map((item) => `<button class="sequence-token${session.sequence.includes(item.id) ? " is-used" : ""}" type="button" draggable="true" data-token-id="${escapeHtml(item.id)}">${escapeHtml(item.label)}</button>`).join("")}
      </div>
      <div class="button-row">
        <button class="panel-button primary" id="check-sequence" type="button">Reihenfolge prüfen</button>
        <button class="panel-button" id="reset-sequence" type="button">Leeren</button>
      </div>`;

    elements.actionPanel.querySelectorAll(".token-bank [data-token-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const empty = session.sequence.indexOf(null);
        if (empty >= 0) placeSequenceToken(button.dataset.tokenId, empty);
      });
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", button.dataset.tokenId);
        event.dataTransfer.effectAllowed = "move";
      });
    });

    elements.actionPanel.querySelectorAll("[data-slot]").forEach((slot) => {
      slot.addEventListener("click", () => {
        const index = Number(slot.dataset.slot);
        if (session.sequence[index]) {
          session.sequence[index] = null;
          clearFeedback();
          renderActionPanel();
        }
      });
      slot.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && session.sequence[Number(slot.dataset.slot)]) {
          event.preventDefault();
          session.sequence[Number(slot.dataset.slot)] = null;
          clearFeedback();
          renderActionPanel();
        }
      });
      slot.addEventListener("dragstart", (event) => {
        if (!slot.dataset.tokenId) return;
        event.dataTransfer.setData("text/plain", slot.dataset.tokenId);
        event.dataTransfer.effectAllowed = "move";
      });
      slot.addEventListener("dragover", (event) => {
        event.preventDefault();
        slot.classList.add("is-over");
      });
      slot.addEventListener("dragleave", () => slot.classList.remove("is-over"));
      slot.addEventListener("drop", (event) => {
        event.preventDefault();
        slot.classList.remove("is-over");
        const id = event.dataTransfer.getData("text/plain");
        if (tokenById[id]) placeSequenceToken(id, Number(slot.dataset.slot));
      });
    });

    document.querySelector("#reset-sequence").addEventListener("click", () => {
      session.sequence = Array(expected.length).fill(null);
      clearFeedback();
      renderActionPanel();
    });
    document.querySelector("#check-sequence").addEventListener("click", () => {
      if (session.sequence.includes(null)) {
        showFeedback("try", "Besetze zuerst alle festen Plätze.");
        return;
      }
      recordAttempt();
      if (!arraysEqual(session.sequence, expected)) {
        recordWrong();
        showFeedback("try", "Die Karten sind vollständig, aber noch nicht in Ausführungsreihenfolge.");
        return;
      }
      onCorrect();
    });
  }

  function renderOrderPhase() {
    renderSequence(currentCase.tokens, currentCase.expectedOrder, currentCase.orderPrompt, () => completeCase());
  }

  function renderRotationSequence() {
    renderSequence(currentCase.rotationTokens, currentCase.expectedRotations, "In welcher Reihenfolge wird gedreht?", () => {
      session.phase = "animate";
      session.animationIndex = 0;
      renderActionPanel();
      showFeedback("good", "Operationsfolge stimmt. Führe sie nun am Baum aus.");
    });
  }

  function renderAnimationPhase() {
    const nextOperation = currentCase.rotationTokens.find((item) => item.id === currentCase.expectedRotations[session.animationIndex]);
    elements.actionPanel.innerHTML = `
      <span class="instruction-tag">Schritt 3 · Ausführen</span>
      <h4>Zwischenbilder bewusst ansehen.</h4>
      <p>${escapeHtml(currentCase.stateCaptions[session.animationIndex])}</p>
      <button class="panel-button primary" id="animate-step" type="button">${escapeHtml(nextOperation ? nextOperation.label : "Nächsten Schritt ausführen")} →</button>`;
    document.querySelector("#animate-step").addEventListener("click", () => {
      session.animationIndex += 1;
      renderTree();
      if (session.animationIndex >= currentCase.states.length - 1) {
        session.phase = "verify";
        session.choice = null;
        renderActionPanel();
        showFeedback("good", "Rotation abgeschlossen. Ein letzter Strukturcheck fehlt.");
      } else {
        renderActionPanel();
        showFeedback("good", currentCase.stateCaptions[session.animationIndex]);
      }
    });
  }

  function renderCompletedPanel() {
    const result = results[currentCase.id];
    const qualityText = result && result.quality === "clean" ? "Sauber gelöst" : "Mit Hilfe gelöst";
    elements.actionPanel.innerHTML = `
      <span class="instruction-tag">Fall abgeschlossen</span>
      <h4>${qualityText}.</h4>
      <p>${result && result.quality === "clean"
        ? "Du hast diesen Fall ohne Hinweis und ohne Fehlversuch gelöst."
        : "Der Mechanismus ist bearbeitet. Wiederhole ihn später einmal ohne Hilfe für einen sauberen Transferbeleg."}</p>`;
  }

  function renderActionPanel() {
    if (session.phase === "path") renderPathPhase();
    else if (session.phase === "choice" || session.phase === "verify") renderChoicePhase();
    else if (session.phase === "order") renderOrderPhase();
    else if (session.phase === "rotation-sequence") renderRotationSequence();
    else if (session.phase === "animate") renderAnimationPhase();
    else renderCompletedPanel();
  }

  function renderBridge() {
    elements.bridgeCode.textContent = currentCase.bridge.code;
    elements.bridgeNote.textContent = currentCase.bridge.note;
    elements.codeBridge.hidden = false;
  }

  function completeCase() {
    const earnedQuality = session.hintUsed || session.wrong > 0 ? "guided" : "clean";
    const previous = results[currentCase.id];
    const quality = previous && previous.quality === "clean" ? "clean" : earnedQuality;
    results[currentCase.id] = {
      quality,
      completedAt: new Date().toISOString(),
    };

    if (preferences.learningMode === "adaptive") {
      if (earnedQuality === "clean") {
        if (!stats.cleanRunIds.includes(currentCase.id)) stats.cleanRunIds.push(currentCase.id);
        if (stats.cleanRunIds.length >= 2) {
          stats.supportLevel = Math.max(0, currentSupportLevel() - 1);
          stats.cleanRunIds = [];
        }
      } else {
        stats.cleanRunIds = [];
      }
    }

    completedThisRun += 1;
    session.phase = "completed";
    saveState();
    renderTree();
    renderActionPanel();
    renderBridge();
    renderCaseTabs();
    renderTopicStatus();
    renderSettings();
    elements.nextButton.hidden = false;
    const pauseNote = completedThisRun % 4 === 0
      ? " Freiwilliger Checkpoint: vier Fälle sind genug für einen kurzen Blick weg vom Bildschirm."
      : "";
    showFeedback(
      earnedQuality === "clean" ? "good" : "try",
      `${earnedQuality === "clean" ? "Sauberer Beleg gespeichert." : "Als mit Hilfe gelöst gespeichert."}${pauseNote}`,
    );
  }

  function openNextCase() {
    const pool = activeCases();
    const index = pool.findIndex((item) => item.id === currentCase.id);
    const later = [...pool.slice(index + 1), ...pool.slice(0, index + 1)];
    const next = later.find((item) => !results[item.id]) || later[0];
    if (next) startCase(next.id);
  }

  document.querySelectorAll("[data-learning-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      preferences.learningMode = button.dataset.learningMode;
      saveState();
      renderSettings();
      clearFeedback();
    });
  });

  document.querySelectorAll("[data-bank]").forEach((button) => {
    button.addEventListener("click", () => setBank(button.dataset.bank));
  });

  document.querySelectorAll("[data-topic-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.topicJump;
      const inCurrentBank = activeCases().some((item) => item.topic === topic);
      if (!inCurrentBank) preferences.bank = "all";
      setBank(preferences.bank, topic);
      document.querySelector("#training").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  elements.hintButton.addEventListener("click", useHint);
  elements.nextButton.addEventListener("click", openNextCase);

  window.addEventListener("hashchange", () => {
    if (location.hash === "#transfer" && preferences.bank !== "transfer") setBank("transfer");
    if (location.hash === "#all" && preferences.bank !== "all") setBank("all");
  });

  renderTopicStatus();
  renderSettings();
  const initialPool = activeCases();
  const initialCase = initialPool.find((item) => !results[item.id]) || initialPool[0] || CASES[0];
  startCase(initialCase.id);
})();
