(() => {
  "use strict";

  const STORAGE_KEY = "ads-klausur-simulation-v1";
  const modes = {
    mini: { durationMs: 35 * 60 * 1000, total: 35, label: "35-Minuten-Mini" },
    full: { durationMs: 90 * 60 * 1000, total: 80, label: "90-Minuten-Runde" },
  };
  const errorLabels = ["Code/Syntax", "Mechanik", "Trace/Rechnung", "Begründung", "Zeitdruck"];
  const repairTransferPrompts = {
    m1: "Transfer: Ersetze den Abbruch durch `if (a[i] == 0) return c;`. Nenne je eine Best-/Worst-Eingabe und begründe beide Laufzeiten.",
    m2: "Transfer: Trace `evenSum` für head → 6 → 1 → −4 → nullptr. Notiere p, s, Rückgabe sowie Best/Worst für k Knoten.",
    m3: "Transfer: `q(n)` ruft für n>0 genau `q(n−2)` auf und addiert 1. Notiere Basis, Rekurrenz, zwei Ausrollschritte und Θ.",
    m4: "Transfer: Führe delete-min auf `[1,3,2,8,6,5,4]` aus. Notiere jeden Arrayzustand und Best/Worst.",
  };

  let currentMode = "mini";
  let state = readState();
  let timerId = null;
  let saveNoteTimer = null;

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
      return { version: 1, ...parsed };
    } catch (_) {
      return { version: 1 };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const note = document.querySelector("#autosave-note");
      if (note) {
        note.textContent = "Lokal gespeichert";
        clearTimeout(saveNoteTimer);
        saveNoteTimer = setTimeout(() => { note.textContent = "Autosave aktiv"; }, 1200);
      }
    } catch (_) {
      const note = document.querySelector("#autosave-note");
      if (note) note.textContent = "Speichern nicht verfügbar";
    }
  }

  function modeState(mode) {
    if (!state[mode]) {
      state[mode] = {
        answers: {},
        scores: {},
        errors: {},
        repairs: {},
      };
    }
    state[mode].answers ||= {};
    state[mode].scores ||= {};
    state[mode].errors ||= {};
    state[mode].repairs ||= {};
    state[mode].repairAnswers ||= {};
    return state[mode];
  }

  function taskElements(mode = currentMode) {
    return [...document.querySelectorAll(`#exam-${mode} .exam-task`)];
  }

  function formatTime(milliseconds) {
    const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function stateDescription(mode) {
    const saved = state[mode] || {};
    if (saved.submittedAt) {
      const when = new Date(saved.submittedAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" });
      return `${saved.timedOut ? "Zeit abgelaufen" : "Abgegeben"} · ${when}`;
    }
    if (saved.startedAt) {
      const remaining = Math.max(0, (saved.deadline || 0) - Date.now());
      return remaining > 0 ? `Läuft · noch ${formatTime(remaining)}` : "Zeit ist abgelaufen";
    }
    return "Noch nicht gestartet.";
  }

  function paintModeCards() {
    for (const mode of Object.keys(modes)) {
      document.querySelector(`#${mode}-mode-state`).textContent = stateDescription(mode);
      document.querySelector(`#mode-card-${mode}`).classList.toggle("active", mode === currentMode);
    }
  }

  function populateAnswers(mode) {
    const saved = modeState(mode);
    document.querySelectorAll(`#exam-${mode} [data-answer]`).forEach((field) => {
      field.value = saved.answers[field.dataset.answer] || "";
      field.disabled = !saved.startedAt || Boolean(saved.submittedAt);
    });
  }

  function selectMode(mode) {
    if (!modes[mode]) return;
    currentMode = mode;
    clearInterval(timerId);
    timerId = null;
    document.querySelector("#exam-panel").hidden = false;
    populateAnswers(mode);
    paintModeCards();
    paintExamState();
    history.replaceState(null, "", `#${mode}`);
    document.querySelector("#exam-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function paintExamState() {
    const saved = modeState(currentMode);
    const start = document.querySelector("#start-exam");
    const submit = document.querySelector("#submit-exam");
    const rule = document.querySelector("#exam-rule");
    document.querySelector("#post-submit").hidden = !saved.submittedAt;
    const hasStarted = Boolean(saved.startedAt);
    document.querySelector("#prestart-note").hidden = hasStarted;
    document.querySelectorAll(".exam-view").forEach((view) => {
      view.hidden = view.dataset.mode !== currentMode || !hasStarted;
    });

    if (saved.submittedAt) {
      start.hidden = true;
      submit.hidden = true;
      rule.textContent = saved.timedOut
        ? "Die Zeit ist abgelaufen. Antworten sind eingefroren; Auswertung ist freigeschaltet."
        : "Manuell abgegeben. Antworten sind eingefroren; Auswertung ist freigeschaltet.";
      revealSolutions();
      updateTimer(true);
      return;
    }

    hideSolutions();
    if (saved.startedAt) {
      start.hidden = true;
      submit.hidden = false;
      rule.textContent = "Der Timer läuft nach realer Uhrzeit weiter — auch nach Reload oder Tabwechsel.";
      populateAnswers(currentMode);
      updateTimer();
      timerId = setInterval(updateTimer, 250);
    } else {
      start.hidden = false;
      start.textContent = `${modes[currentMode].label} starten`;
      submit.hidden = true;
      document.querySelector("#timer").textContent = formatTime(modes[currentMode].durationMs);
      document.querySelector("#timer").classList.remove("danger");
      document.querySelector("#timer-progress").style.width = "100%";
      document.querySelector("#autosave-note").textContent = "Noch nicht gestartet";
      rule.textContent = "Papier bereit? Erst der Startknopf setzt die Uhr in Gang.";
      populateAnswers(currentMode);
    }
  }

  function startExam() {
    const saved = modeState(currentMode);
    if (saved.startedAt || saved.submittedAt) return;
    const now = Date.now();
    saved.startedAt = now;
    saved.deadline = now + modes[currentMode].durationMs;
    saved.timedOut = false;
    saveState();
    populateAnswers(currentMode);
    paintModeCards();
    paintExamState();
    taskElements()[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateTimer(forceSubmitted = false) {
    const saved = modeState(currentMode);
    const timer = document.querySelector("#timer");
    if (forceSubmitted || saved.submittedAt) {
      timer.textContent = saved.timedOut ? "ZEIT" : "ABGEGEBEN";
      timer.classList.toggle("danger", Boolean(saved.timedOut));
      document.querySelector("#timer-progress").style.width = "0%";
      return;
    }
    if (!saved.startedAt) return;
    const remaining = (saved.deadline || 0) - Date.now();
    if (remaining <= 0) {
      submitExam(true);
      return;
    }
    timer.textContent = formatTime(remaining);
    timer.classList.toggle("danger", remaining <= 5 * 60 * 1000);
    const ratio = Math.max(0, Math.min(1, remaining / modes[currentMode].durationMs));
    document.querySelector("#timer-progress").style.width = `${ratio * 100}%`;
    document.querySelector("#autosave-note").textContent = "Autosave aktiv";
  }

  function submitExam(timedOut = false) {
    const saved = modeState(currentMode);
    if (!saved.startedAt || saved.submittedAt) return;
    if (!timedOut && !window.confirm("Jetzt endgültig abgeben? Danach werden Lösungen und Rubriken sichtbar.")) return;
    saved.submittedAt = Date.now();
    saved.timedOut = timedOut;
    saveState();
    clearInterval(timerId);
    timerId = null;
    populateAnswers(currentMode);
    paintModeCards();
    paintExamState();
    document.querySelector("#post-submit").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideSolutions() {
    document.querySelectorAll(`#exam-${currentMode} [data-solution]`).forEach((solution) => { solution.hidden = true; });
    document.querySelector("#post-submit").hidden = true;
  }

  function revealSolutions() {
    const saved = modeState(currentMode);
    taskElements().forEach((task) => {
      const taskId = task.dataset.task;
      const solution = task.querySelector("[data-solution]");
      solution.hidden = false;
      if (!solution.querySelector(".self-score")) solution.append(buildScoreControls(task));
      const score = solution.querySelector(".score-input");
      score.value = saved.scores[taskId] ?? "";
      solution.querySelectorAll("[data-error]").forEach((checkbox) => {
        checkbox.checked = (saved.errors[taskId] || []).includes(checkbox.dataset.error);
      });
    });
    document.querySelector("#repair-section").hidden = currentMode !== "mini";
    renderRepairs();
    updateScore();
  }

  function buildScoreControls(task) {
    const taskId = task.dataset.task;
    const max = Number(task.dataset.max);
    const wrapper = document.createElement("div");
    wrapper.className = "self-score";

    const scoreBlock = document.createElement("label");
    scoreBlock.innerHTML = `<strong>Selbstpunkte</strong><br><input class="score-input" type="number" min="0" max="${max}" step="1" inputmode="numeric" aria-label="Punkte für ${taskId}"> / ${max}`;
    scoreBlock.querySelector("input").addEventListener("input", (event) => {
      if (event.target.value === "") {
        delete modeState(currentMode).scores[taskId];
      } else {
        const raw = Number(event.target.value);
        const value = Number.isFinite(raw) ? Math.max(0, Math.min(max, raw)) : 0;
        modeState(currentMode).scores[taskId] = value;
      }
      saveState();
      updateScore();
      renderRepairs();
    });

    const tags = document.createElement("div");
    tags.innerHTML = "<strong>Fehlerarten</strong>";
    const tagRow = document.createElement("div");
    tagRow.className = "error-tags";
    errorLabels.forEach((label) => {
      const tag = document.createElement("label");
      tag.className = "error-tag";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.error = label;
      checkbox.addEventListener("change", () => {
        const checked = [...tagRow.querySelectorAll("[data-error]:checked")].map((item) => item.dataset.error);
        modeState(currentMode).errors[taskId] = checked;
        saveState();
        renderRepairs();
      });
      tag.append(checkbox, document.createTextNode(label));
      tagRow.append(tag);
    });
    tags.append(tagRow);
    wrapper.append(scoreBlock, tags);
    return wrapper;
  }

  function updateScore() {
    const saved = modeState(currentMode);
    const total = taskElements().reduce((sum, task) => sum + Number(saved.scores[task.dataset.task] || 0), 0);
    document.querySelector("#score-display").textContent = `${total} / ${modes[currentMode].total}`;
    const marked = taskElements().filter((task) => saved.scores[task.dataset.task] !== undefined).length;
    document.querySelector("#score-message").textContent = marked === taskElements().length
      ? "Alle Rubriken bewertet. Nutze jetzt nur die markierten Fehler für die Reparatur."
      : `${marked}/${taskElements().length} Aufgaben mit der Rubrik bewertet. Keine Bestehensprognose.`;
  }

  function repairCandidate(taskId) {
    const saved = modeState("mini");
    const task = taskElements("mini").find((item) => item.dataset.task === taskId);
    if (!task) return null;
    const max = Number(task.dataset.max);
    const score = Number(saved.scores[taskId] || 0);
    const errors = saved.errors[taskId] || [];
    return {
      taskId,
      title: task.querySelector("h3").textContent,
      errors,
      ratio: score / max,
      transfer: repairTransferPrompts[taskId],
    };
  }

  function repairCandidates() {
    return taskElements("mini")
      .map((task) => repairCandidate(task.dataset.task))
      .sort((left, right) => {
        if (right.errors.length !== left.errors.length) return right.errors.length - left.errors.length;
        return left.ratio - right.ratio;
      })
      .slice(0, 2);
  }

  function renderRepairs() {
    const list = document.querySelector("#repair-list");
    if (currentMode !== "mini" || !modeState("mini").submittedAt) {
      list.replaceChildren();
      return;
    }
    const saved = modeState("mini");
    list.replaceChildren();
    const miniTasks = taskElements("mini");
    const scored = miniTasks.filter((task) => Object.hasOwn(saved.scores, task.dataset.task)).length;
    if (scored < miniTasks.length) {
      const notice = document.createElement("p");
      notice.className = "repair-notice";
      notice.textContent = `Zuerst alle vier Rubriken bewerten (${scored}/4). Danach werden die zwei schwächsten Transferfälle festgeschrieben.`;
      list.append(notice);
      return;
    }

    if (!Array.isArray(saved.repairTaskIds) || saved.repairTaskIds.length !== 2) {
      saved.repairTaskIds = repairCandidates().map((candidate) => candidate.taskId);
      saveState();
    }
    const candidates = saved.repairTaskIds.map(repairCandidate).filter(Boolean);
    candidates.forEach((candidate, index) => {
      const card = document.createElement("article");
      card.className = "repair-card";
      const heading = document.createElement("h4");
      heading.textContent = `${index + 1}. ${candidate.title}`;
      const issue = document.createElement("p");
      issue.className = "tiny";
      issue.textContent = `Fokus: ${candidate.errors.length ? candidate.errors.join(", ") : "niedrigster Selbstscore"}.`;
      const prompt = document.createElement("p");
      prompt.textContent = candidate.transfer;
      const answer = document.createElement("textarea");
      answer.className = "repair-answer";
      answer.value = saved.repairAnswers[candidate.taskId] || "";
      answer.setAttribute("aria-label", `Antwort zum Reparaturfall ${candidate.title}`);
      answer.placeholder = "Eigener Lösungsweg – mindestens Rechnung/Trace plus Begründung …";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(saved.repairs[candidate.taskId]);
      checkbox.disabled = answer.value.trim().length < 20;
      checkbox.addEventListener("change", () => {
        saved.repairs[candidate.taskId] = checkbox.checked;
        saveState();
      });
      answer.addEventListener("input", () => {
        saved.repairAnswers[candidate.taskId] = answer.value;
        checkbox.disabled = answer.value.trim().length < 20;
        if (checkbox.disabled) {
          checkbox.checked = false;
          saved.repairs[candidate.taskId] = false;
        }
        saveState();
      });
      const confirmation = document.createElement("label");
      confirmation.className = "repair-item";
      confirmation.append(checkbox, document.createTextNode("Diesen veränderten Fall ohne Musterlösung vollständig bearbeitet."));
      card.append(heading, issue, prompt, answer, confirmation);
      list.append(card);
    });
  }

  function resetExam() {
    const saved = state[currentMode];
    const hasState = saved && (saved.startedAt || saved.submittedAt || Object.keys(saved.answers || {}).length);
    const message = hasState
      ? `${modes[currentMode].label} wirklich zurücksetzen? Timer, Antworten und Auswertung dieses Modus werden gelöscht. Das 17er-Training bleibt erhalten.`
      : `${modes[currentMode].label} ist noch leer. Trotzdem zurücksetzen?`;
    if (!window.confirm(message)) return;
    delete state[currentMode];
    saveState();
    clearInterval(timerId);
    timerId = null;
    modeState(currentMode);
    populateAnswers(currentMode);
    paintModeCards();
    paintExamState();
  }

  document.querySelectorAll(".exam-task").forEach((task) => {
    const taskId = task.dataset.task;
    const heading = task.querySelector("h3");
    const answer = task.querySelector("[data-answer]");
    heading.id = `${taskId}-title`;
    answer.setAttribute("aria-labelledby", heading.id);
  });

  document.querySelectorAll("[data-select-mode]").forEach((button) => {
    button.addEventListener("click", () => selectMode(button.dataset.selectMode));
  });
  document.querySelector("#start-exam").addEventListener("click", startExam);
  document.querySelector("#submit-exam").addEventListener("click", () => submitExam(false));
  document.querySelector("#reset-exam").addEventListener("click", resetExam);

  document.querySelectorAll("[data-answer]").forEach((field) => {
    field.addEventListener("input", () => {
      const mode = field.closest(".exam-view").dataset.mode;
      modeState(mode).answers[field.dataset.answer] = field.value;
      saveState();
    });
  });

  window.addEventListener("storage", () => {
    state = readState();
    populateAnswers(currentMode);
    paintModeCards();
    paintExamState();
  });

  const requestedMode = window.location.hash.replace("#", "");
  selectMode(modes[requestedMode] ? requestedMode : "mini");
})();
