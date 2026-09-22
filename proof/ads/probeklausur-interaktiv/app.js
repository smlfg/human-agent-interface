(() => {
  "use strict";

  const tasks = [
    ["SelectionSort sezieren", "Laufzeit · Schleifen"],
    ["Pointer-Übersetzer", "Liste · Laufzeit"],
    ["Rekurrenz-Werkstatt", "Rekurrenz · Fakultät"],
    ["Drei Produkte, drei Fallen", "Best/Worst · Codevergleich"],
    ["Gleiches Ziel, anderer Weg", "Eingabegröße · Wertabhängigkeit"],
    ["Big-O Duell I", "Asymptotik · Terme"],
    ["Big-O Duell II", "Asymptotik · Wegkürzen"],
    ["Stack-Werkstatt", "Array-Stack · Implementieren"],
    ["Listen-Labor", "Verkettete Liste · Pointer"],
    ["Baum-Traversierungsdrohne", "Binärbaum · InOrder"],
    ["Baum-Code-Expedition", "Baum · rekursive Funktionen"],
    ["Suchbaum-Chirurgie", "BST · Pfade · Trim"],
    ["Rekursions-Echo", "Aufrufbaum · Ausgabe"],
    ["Rekursion entzaubern", "Bedeutung erkennen"],
    ["2-3-4-Baum TÜV", "2-3-4-Baum · Regeln"],
    ["Baum rückwärts bauen", "2-3-4-Baum · Einfügen"],
    ["Hash-Kollisionen provozieren", "Hashing · Sondieren"],
  ];
  const key = "ads-probeklausur-state-v2";
  const legacyKey = "ads-probeklausur-state-v1";

  function read(keyName) {
    try { return JSON.parse(localStorage.getItem(keyName) || "{}") || {}; }
    catch (_) { return {}; }
  }

  function migrate() {
    const current = read(key);
    const legacy = read(legacyKey);
    let changed = false;
    for (let number = 1; number <= 17; number += 1) {
      const padded = `task${String(number).padStart(2, "0")}`;
      if (current[padded]) continue;
      const value = legacy[padded] || legacy[`task${number}`] || legacy[number] || current[`task${number}`] || current[number];
      if (value === "sitzt" || value === "wackelt") {
        current[padded] = value;
        changed = true;
      }
    }
    if (changed) {
      try { localStorage.setItem(key, JSON.stringify(current)); } catch (_) { /* optional */ }
    }
    return current;
  }

  const state = migrate();
  const taskState = (number) => state[`task${String(number).padStart(2, "0")}`] || "";
  const touched = tasks.filter((_, index) => taskState(index + 1)).length;
  const sits = tasks.filter((_, index) => taskState(index + 1) === "sitzt").length;
  const wobbles = touched - sits;
  const firstOpen = tasks.findIndex((_, index) => !taskState(index + 1));
  const firstWobble = tasks.findIndex((_, index) => taskState(index + 1) === "wackelt");
  const nextIndex = firstOpen >= 0 ? firstOpen : firstWobble >= 0 ? firstWobble : 16;
  const next = nextIndex + 1;

  document.querySelector("#app").innerHTML = `
    <div class="shell">
      <nav class="topbar">
        <a class="brand back" href="../klausur-roadmap.html">← ADS / Roadmap</a>
        <a class="source-link" href="/proof/ads/source-materials-not-included.html">Aufgabensammlung ↗</a>
      </nav>
      <span class="kicker">17 klausurnahe Aufgaben · eine Mission pro Seite</span>
      <h1>Gute Hilfen. Dein eigener nächster Zug.</h1>
      <p class="lead">Die Aufgaben sind machbar: Originalkern ansehen, genau einen Schritt produzieren, bei Bedarf Hinweise einzeln öffnen und danach ehrlich Sitzt oder Wackelt markieren.</p>
      <section class="dashboard">
        <div class="card">
          <div class="status-big">${touched}/17</div>
          <div>Aufgaben angefasst</div>
          <div class="progress"><i style="width:${(touched / 17) * 100}%"></i></div>
          <div class="legend">${sits} sitzt · ${wobbles} wackelt · lokal in diesem Browser gespeichert</div>
        </div>
        <div class="card">
          <h2>Weiter bei Aufgabe ${String(next).padStart(2, "0")}</h2>
          <p><strong>${tasks[nextIndex][0]}</strong><br>${tasks[nextIndex][1]}</p>
          <p class="tiny">Wenn es hängt: immer nur den nächsten Hinweis öffnen. Der Musterweg ist Abgleich, nicht Einstieg.</p>
          <a class="action primary" href="task-${String(next).padStart(2, "0")}/index.html">Mission starten →</a>
        </div>
      </section>
      <section class="card" aria-labelledby="runtime-game-title">
        <span class="kicker">Zusatztraining · Einzelcode und Klausurvergleich</span>
        <h2 id="runtime-game-title">Laufzeit-Detektiv: Spuren finden und A/B vergleichen.</h2>
        <p>Trainiere erst das Lesen und dann den Klausurvergleich: gleiche Ausgabe, Laufzeitmotoren, Best/Worst und die Bedingung, unter der A oder B besser ist.</p>
        <div class="choices">
          <a class="action" href="laufzeit-detektiv/index.html">15 Einzelcodes →</a>
          <a class="action primary" href="laufzeit-detektiv/index.html#duelle">10 A/B-Duelle →</a>
        </div>
      </section>
      <section class="card" aria-labelledby="tree-game-title">
        <span class="kicker">Zusatztraining · Struktur vor Code</span>
        <h2 id="tree-game-title">Baum-Detektiv: Pfade klicken, Folgen legen, AVL drehen.</h2>
        <p>Trainiere binäre Suchbäume, In-/Pre-/PostOrder und LL/RR/LR/RL an sichtbaren Baumzuständen. Erst begründest du die Struktur, danach folgt der kurze Codeblick.</p>
        <div class="choices">
          <a class="action" href="baum-detektiv/index.html">12 Fundamentfälle →</a>
          <a class="action primary" href="baum-detektiv/index.html#transfer">6 Transferfälle →</a>
        </div>
      </section>
      <h2>Der Parcours</h2>
      <div class="task-grid">
        ${tasks.map((task, index) => {
          const number = index + 1;
          return `<a class="task-tile ${number === next ? "recommended" : ""}" data-state="${taskState(number)}" href="task-${String(number).padStart(2, "0")}/index.html"><b>${String(number).padStart(2, "0")}</b><span><strong>${task[0]}</strong><br>${task[1]}</span></a>`;
        }).join("")}
      </div>
      <p class="tiny">Quelle: lokale ADS-Aufgabensammlung <code>Probeklausur.pdf</code>/<code>ads_aufg.pdf</code>. Sie ist klausurnahes Training, keine authentische Alt- oder Probeklausur und keine Aussage über die echte Gewichtung.</p>
    </div>`;
})();
