(() => {
  "use strict";

  const TRAINING_KEY = "ads-probeklausur-state-v2";
  const LEGACY_TRAINING_KEY = "ads-probeklausur-state-v1";
  const SIMULATION_KEY = "ads-klausur-simulation-v1";

  const tasks = [
    ["SelectionSort sezieren", "Code in Deutsch übersetzen, Vergleiche zählen, Best und Worst mit einem Satz begründen."],
    ["Pointer-Übersetzer", "Mit -> zum nächsten Knoten gehen, zwei vollständige Läufe zählen und Θ(k) begründen."],
    ["Rekurrenz-Werkstatt", "Basisfall erkennen, T(n)=T(n−1)+c ausrollen und die geschlossene Form nennen."],
    ["Drei Funktionen vergleichen", "Ergebnis, Vorbedingung, frühen Abbruch und Best/Worst sauber trennen."],
    ["Gleiches Ziel, anderer Weg", "Wertabhängige Laufzeit erkennen und eine passende Eingabegröße angeben."],
    ["Big-O-Duell I", "Dominante Terme bestimmen und Aussagen mit genau einem Satz begründen."],
    ["Big-O-Duell II", "Täuschende Konstanten und sich aufhebende Terme sicher behandeln."],
    ["Stack-Werkstatt", "LIFO simulieren und die zentralen 5–15 Codezeilen selbst ergänzen."],
    ["Listen-Labor", "Knoten anlegen, Pfeile umhängen und Speicherwege nicht verlieren."],
    ["InOrder-Drohne", "Basisfall und Reihenfolge links–Knoten–rechts in Code und Trace verbinden."],
    ["Baum-Code-Expedition", "Rekursives Skelett für Höhe, Anzahl und Summe wiederverwenden."],
    ["Suchbaum-Chirurgie", "BST-Pfade und rekursive Teilresultate sichtbar kombinieren."],
    ["Rekursions-Echo", "Aufrufbaum zeichnen, Ausgabe traceen und Aufrufe zählen."],
    ["Rekursion entzaubern", "Bedeutung erkennen und eine rekursive Funktion iterativ formulieren."],
    ["2-3-4-Baum-TÜV", "Vier Strukturregeln einzeln prüfen und Verstöße benennen."],
    ["Baum rückwärts bauen", "Einfügereihenfolge und Split-Spuren im Zielbaum rekonstruieren."],
    ["Hash-Kollisionen", "Lineare und quadratische Sondierungsfolge lückenlos fahren."],
  ];

  function readJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}") || {};
    } catch (_) {
      return {};
    }
  }

  function stateKey(number) {
    return `task${String(number).padStart(2, "0")}`;
  }

  function migrateTrainingState() {
    const current = readJSON(TRAINING_KEY);
    const legacy = readJSON(LEGACY_TRAINING_KEY);
    let changed = false;

    for (let number = 1; number <= 17; number += 1) {
      const target = stateKey(number);
      if (current[target]) continue;
      const legacyValue = legacy[target] || legacy[`task${number}`] || legacy[number] || current[`task${number}`] || current[number];
      if (legacyValue === "sitzt" || legacyValue === "wackelt") {
        current[target] = legacyValue;
        changed = true;
      }
    }

    if (changed) {
      try {
        localStorage.setItem(TRAINING_KEY, JSON.stringify(current));
      } catch (_) {
        // Navigation bleibt auch ohne lokalen Speicher nutzbar.
      }
    }
    return current;
  }

  function taskStatus(state, number) {
    const value = state[stateKey(number)] || state[`task${number}`] || state[number];
    return value === "sitzt" || value === "wackelt" ? value : "";
  }

  function nextTask(state) {
    for (let number = 1; number <= 17; number += 1) {
      if (!taskStatus(state, number)) return number;
    }
    for (let number = 1; number <= 17; number += 1) {
      if (taskStatus(state, number) === "wackelt") return number;
    }
    return 17;
  }

  function paintProgress() {
    const state = migrateTrainingState();
    const statuses = Array.from({ length: 17 }, (_, index) => taskStatus(state, index + 1));
    const touched = statuses.filter(Boolean).length;
    const sits = statuses.filter((value) => value === "sitzt").length;
    const wobbles = statuses.filter((value) => value === "wackelt").length;
    const open = 17 - touched;

    const ring = document.querySelector("#progress-ring");
    ring.style.setProperty("--progress", `${(touched / 17) * 360}deg`);
    ring.dataset.progress = `${touched}/17`;
    ring.setAttribute("aria-label", `${touched} von 17 Aufgaben angefasst`);
    document.querySelector("#progress-title").textContent = touched
      ? `${touched} Aufgaben angefasst`
      : "Noch keine Markierung gefunden";
    document.querySelector("#sits-count").textContent = `${sits} sitzt`;
    document.querySelector("#wobbles-count").textContent = `${wobbles} wackelt`;
    document.querySelector("#open-count").textContent = `${open} offen`;

    const next = nextTask(state);
    document.querySelector("#next-task-number").textContent = String(next).padStart(2, "0");
    document.querySelector("#next-task-title").textContent = tasks[next - 1][0];
    document.querySelector("#next-task-copy").textContent = tasks[next - 1][1];
    const link = document.querySelector("#primary-task-link");
    link.href = `probeklausur-interaktiv/task-${String(next).padStart(2, "0")}/index.html`;
    link.textContent = touched === 17 && wobbles === 0
      ? "Aufgabe 17 als Abschluss öffnen →"
      : `Jetzt Aufgabe ${next} ${taskStatus(state, next) === "wackelt" ? "reparieren" : "lernen"} →`;

    document.querySelectorAll("[data-route-task]").forEach((row) => {
      const number = Number(row.dataset.routeTask);
      const status = taskStatus(state, number);
      const label = row.querySelector(".route-state");
      label.textContent = status || "offen";
      label.className = `route-state ${status}`;
      row.setAttribute("aria-label", `Aufgabe ${number}: ${status || "offen"}`);
    });

    paintGates(state);
  }

  function paintGate(card, statusElement, isOpen, openText, closedText) {
    card.classList.toggle("is-open", isOpen);
    card.classList.toggle("is-closed", !isOpen);
    statusElement.textContent = isOpen ? openText : closedText;
    card.dataset.open = String(isOpen);
  }

  function paintGates(trainingState) {
    const coreChecks = [1, 2, 3].filter((number) => {
      const key = stateKey(number);
      return taskStatus(trainingState, number) === "sitzt" && Boolean(trainingState.evidence?.[key]?.completed);
    }).length;
    const coreReady = coreChecks === 3;
    const simulation = readJSON(SIMULATION_KEY);
    const mini = simulation.mini || {};
    const miniTaskIds = ["m1", "m2", "m3", "m4"];
    const scored = miniTaskIds.filter((taskId) => Object.hasOwn(mini.scores || {}, taskId)).length;
    const fixedRepairIds = Array.isArray(mini.repairTaskIds) ? mini.repairTaskIds : [];
    const repairs = fixedRepairIds.filter((taskId) => (
      mini.repairs?.[taskId] === true && String(mini.repairAnswers?.[taskId] || "").trim().length >= 20
    )).length;
    const fullReady = Boolean(mini.submittedAt) && scored === 4 && repairs >= 2;

    paintGate(
      document.querySelector("#mini-gate"),
      document.querySelector("#mini-gate-status"),
      coreReady,
      "empfohlen: frei",
      `${coreChecks}/3 gelöste Kernchecks`,
    );
    paintGate(
      document.querySelector("#full-gate"),
      document.querySelector("#full-gate-status"),
      fullReady,
      "empfohlen: frei",
      !mini.submittedAt ? "Mini noch nicht abgegeben" : scored < 4 ? `${scored}/4 Rubriken` : `${repairs}/2 Transferreparaturen`,
    );
  }

  document.querySelectorAll(".gate-launch").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      const card = button.closest(".gate-card");
      if (card.dataset.open === "true") {
        window.location.href = `klausur-simulation.html#${mode}`;
        return;
      }
      const confirm = document.querySelector(`#${mode}-confirm`);
      confirm.classList.toggle("show");
      const checkbox = confirm.querySelector("input");
      const link = confirm.querySelector("a");
      link.setAttribute("aria-disabled", String(!checkbox.checked));
      checkbox.focus();
    });
  });

  document.querySelectorAll(".gate-confirm").forEach((confirm) => {
    const checkbox = confirm.querySelector("input");
    const link = confirm.querySelector("a");
    checkbox.addEventListener("change", () => {
      link.setAttribute("aria-disabled", String(!checkbox.checked));
    });
    link.addEventListener("click", (event) => {
      if (!checkbox.checked) event.preventDefault();
    });
  });

  document.querySelector("#print-sheet").addEventListener("click", () => window.print());
  window.addEventListener("storage", paintProgress);
  window.addEventListener("pageshow", paintProgress);
  paintProgress();
})();
