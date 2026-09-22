(() => {
  "use strict";

  const storageKey = "ads-probeklausur-state-v2";
  const $ = (id) => document.getElementById(id);
  let f1Depth = 0;
  let halveIndex = 0;
  const halveValues = [13, 6, 3, 1];

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, "").replace(/[·×]/g, "*");
  }

  function showFeedback(element, kind, html) {
    element.className = `feedback show ${kind}`;
    element.innerHTML = html;
  }

  function unlock(id) {
    const step = $(id);
    step.classList.remove("locked");
    step.removeAttribute("aria-disabled");
  }

  $("f1Next").addEventListener("click", () => {
    const traces = [
      "3 + F1(3, 3)",
      "3 + 3 + F1(3, 2)",
      "3 + 3 + 3 + F1(3, 1)",
      "3 + 3 + 3 + 3 + F1(3, 0)",
      "3 + 3 + 3 + 3 + 0 = 12"
    ];
    $("f1Trace").textContent = traces[Math.min(f1Depth, traces.length - 1)];
    f1Depth += 1;
    if (f1Depth >= traces.length) {
      $("f1Next").disabled = true;
      $("f1Next").textContent = "Basisfall erreicht";
      $("f1Pattern").focus();
    }
  });

  $("checkF1").addEventListener("click", () => {
    const answer = normalize($("f1Pattern").value);
    unlock("step2");
    renderHalveChoices();
    if (/^(n\*x|x\*n)$/.test(answer) || answer.includes("multiplik")) {
      showFeedback($("feedbackF1"), "good", "Genau: <strong>F1(x,n) = n · x</strong>. Du hast den Trace zur Gesamtbedeutung komprimiert.");
    } else if ((answer.match(/x/g) || []).length > 1 || answer.includes("add")) {
      showFeedback($("feedbackF1"), "try", "Der Trace stimmt als Mechanik: wiederholtes Addieren. Der Prüfungsauftrag fragt aber nach der <strong>Gesamtbedeutung</strong>. Wie heißt <code>x + … + x</code> mit genau <code>n</code> Summanden?");
    } else {
      showFeedback($("feedbackF1"), "try", "Noch nicht. Fixiere zuerst: Pro Rekursionsschritt kommt genau ein <code>x</code> dazu, während <code>n</code> um 1 sinkt. Benenne dann die gesamte Rechnung.");
    }
  });

  function renderHalveChoices() {
    const box = $("halveChoices");
    if (halveIndex >= halveValues.length - 1) {
      box.innerHTML = "<strong>Stopp:</strong> 1 &lt; 2. Es entstanden drei +1-Schritte.";
      $("f2Pattern").focus();
      return;
    }
    const current = halveValues[halveIndex];
    const correct = Math.floor(current / 2);
    const alternatives = [correct, Math.ceil(current / 2), current - 2]
      .filter((value, index, all) => value >= 0 && all.indexOf(value) === index)
      .sort(() => 0.5 - Math.random());
    box.innerHTML = "";
    alternatives.forEach((value) => {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";
      button.textContent = String(value);
      button.addEventListener("click", () => chooseHalf(value, correct));
      box.appendChild(button);
    });
  }

  function chooseHalf(value, correct) {
    if (value !== correct) {
      showFeedback($("feedbackF2"), "try", value > correct
        ? "Fast: <code>int</code>-Division schneidet den Rest ab. Bei 13 / 2 wird aus 6,5 also <strong>6</strong>, nicht aufgerundet."
        : "Dieser Sprung zieht mehr als eine Halbierung zusammen. Führe exakt <strong>einen</strong> Aufruf mit <code>n / 2</code> aus.");
      return;
    }
    halveIndex += 1;
    const path = $("halvePath");
    path.insertAdjacentHTML("beforeend", `<i aria-hidden="true">→</i><span>${correct}</span>`);
    renderHalveChoices();
  }

  $("checkF2").addEventListener("click", () => {
    const answer = normalize($("f2Pattern").value);
    unlock("step3");
    if (answer.includes("log") || (answer.includes("halb") && (answer.includes("anzahl") || answer.includes("wieoft")))) {
      showFeedback($("feedbackF2"), "good", "Richtig: F2 zählt vollständige Halbierungen bis 1, also <strong>⌊log₂(n)⌋</strong> für positive ganze n.");
    } else if (/13.*6.*3.*1/.test(answer)) {
      showFeedback($("feedbackF2"), "try", "Dein Trace ist richtig. Jetzt fehlt die <strong>Gesamtbedeutung</strong>: Welche bekannte Funktion zählt die Anzahl der Halbierungen?");
    } else {
      showFeedback($("feedbackF2"), "try", "Noch nicht: Jeder Aufruf halbiert <code>n</code> ganzzahlig und addiert 1. Gesucht ist der Name für die Anzahl dieser Halbierungen.");
    }
  });

  $("checkFinal").addEventListener("click", () => {
    const f1 = normalize($("f1Code").value).replace(/;/g, "");
    const f2 = normalize($("f2Code").value).replace(/;/g, "");
    const f1Okay = /return(n\*x|x\*n)/.test(f1);
    const f2Okay = /return(\(int\))?log2\(n\)/.test(f2) || /return(floor\()?log2\(n\)\)?/.test(f2);
    if (f1Okay && f2Okay) {
      showFeedback($("finalFeedback"), "good", "Prüfungsreif: <strong>F1 = n · x</strong> und <strong>F2 = ⌊log₂(n)⌋</strong>. Beide Rekursionen sind jetzt direkte Rückgaben.");
    } else if (!f1Okay && !f2Okay) {
      showFeedback($("finalFeedback"), "try", "Beide Zeilen brauchen noch die Gesamtbedeutung statt eines neuen Traces: F1 ist eine Multiplikation; F2 ein abgerundeter Zweierlogarithmus.");
    } else if (!f1Okay) {
      showFeedback($("finalFeedback"), "try", "F2 sitzt. Bei F1 darf keine Rekursion und keine Additionskette mehr stehen: komprimiere <code>n</code> gleiche Summanden.");
    } else {
      showFeedback($("finalFeedback"), "try", "F1 sitzt. Bei F2 brauchst du eine direkte Standardfunktion für „Wie oft kann ich halbieren?“.");
    }
  });

  $("revealSolution").addEventListener("click", () => {
    $("solution").hidden = false;
    $("solution").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelectorAll(".hint-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const hint = $(button.dataset.hint);
      hint.classList.toggle("show");
      button.setAttribute("aria-expanded", String(hint.classList.contains("show")));
    });
  });

  function readState() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  }

  function renderState(value) {
    document.querySelectorAll(".state-btn").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.value === value));
    });
    $("stateFeedback").textContent = value ? `Gespeichert: ${value}.` : "Noch nicht markiert.";
  }

  document.querySelectorAll(".state-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const state = readState();
      state.task14 = button.dataset.value;
      localStorage.setItem(storageKey, JSON.stringify(state));
      renderState(button.dataset.value);
    });
  });

  renderState(readState().task14);
})();
