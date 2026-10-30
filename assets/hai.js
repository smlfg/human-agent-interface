/* HAI — Protokoll. Behaviour variants, gate, analytics. */
(function () {
  "use strict";

  var VARIANTS = ["A", "B", "C"];
  var EXPERIMENT = "redesign-protocol-2026-10-30";
  var root = document.documentElement;
  var params = new URLSearchParams(window.location.search);

  function readVariant() {
    var fromUrl = (params.get("v") || "").toUpperCase();
    if (VARIANTS.indexOf(fromUrl) !== -1) return fromUrl;
    try {
      var stored = (window.localStorage.getItem("hai-variant") || "").toUpperCase();
      if (VARIANTS.indexOf(stored) !== -1) return stored;
    } catch (error) { /* storage blocked */ }
    return "A";
  }

  if (params.get("test") === "1") root.setAttribute("data-test-mode", "true");

  var variant = readVariant();
  var isEnglish = (root.getAttribute("lang") || "de").indexOf("en") === 0;
  root.setAttribute("data-variant", variant.toLowerCase());

  var variantNames = isEnglish
    ? { A: "Protocol", B: "Paper", C: "Instrument" }
    : { A: "Protokoll", B: "Papier", C: "Instrument" };
  document.querySelectorAll("[data-variant-label]").forEach(function (element) {
    element.textContent = (isEnglish ? "Variant " : "Variante ") + variant + " · " + variantNames[variant];
  });

  if (params.get("v") && VARIANTS.indexOf((params.get("v") || "").toUpperCase()) !== -1) {
    try { window.localStorage.setItem("hai-variant", variant); } catch (error) { /* ignore */ }
  }

  document.querySelectorAll("[data-variant-link]").forEach(function (link) {
    var value = (link.getAttribute("data-variant-link") || "").toUpperCase();
    if (VARIANTS.indexOf(value) === -1) return;
    link.setAttribute("href", "?v=" + value);
    if (value === variant) link.setAttribute("aria-current", "true");
    link.addEventListener("click", function () {
      try { window.localStorage.setItem("hai-variant", value); } catch (error) { /* ignore */ }
    });
  });

  function viewportClass() {
    if (window.innerWidth < 620) return "mobile";
    if (window.innerWidth < 980) return "tablet";
    return "desktop";
  }

  function track(event, target) {
    try {
      var payload = {
        experiment_id: EXPERIMENT,
        variant: variant,
        event: event,
        target: target || (document.body && document.body.getAttribute("data-page")) || "home",
        path: window.location.pathname,
        language: (root.getAttribute("lang") || "de").slice(0, 2),
        viewport_class: viewportClass()
      };
      window.fetch("/api/site-event", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () { /* never block the page */ });
    } catch (error) { /* analytics is optional */ }
  }

  track("page_view");

  /* Variant B: ink reveal on scroll */
  if (variant === "B" && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(function (element) {
      revealObserver.observe(element);
    });

    window.setTimeout(function () {
      document.querySelectorAll(".reveal").forEach(function (element) {
        element.classList.add("is-in");
      });
    }, 2500);
  }

  /* Variant C: status line follows the reading position */
  if (variant === "C") {
    var statusTarget = document.querySelector("[data-status-section]");
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
    var ticking = false;

    function updateStatus() {
      ticking = false;
      if (!statusTarget || !sections.length) return;
      var point = window.scrollY + 140;
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.offsetTop <= point) current = section;
      });
      statusTarget.textContent = current.getAttribute("data-section") || "";
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateStatus);
    }, { passive: true });

    updateStatus();
  }

  /* The gate: nothing runs before a human approves it */
  document.querySelectorAll("[data-gate]").forEach(function (gate) {
    var items = Array.prototype.slice.call(gate.querySelectorAll(".gate-item"));
    var status = gate.querySelector("[data-gate-status]");

    var labels = isEnglish
      ? { approved: "approved", denied: "denied", open: "open" }
      : { approved: "freigegeben", denied: "abgelehnt", open: "offen" };

    function update() {
      var approved = 0;
      var denied = 0;
      items.forEach(function (item) {
        var state = item.getAttribute("data-state");
        if (state === "done") approved += 1;
        if (state === "denied") denied += 1;
      });
      if (status) {
        status.textContent = approved + " " + labels.approved + " · " +
          denied + " " + labels.denied + " · " +
          (items.length - approved - held) + " " + labels.open;
      }
    }

    gate.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-action]");
      if (!button || !gate.contains(button)) return;

      var action = button.getAttribute("data-action");

      if (action === "reset") {
        items.forEach(function (row) {
          row.removeAttribute("data-state");
          row.querySelectorAll("button[data-action]").forEach(function (rowButton) {
            rowButton.setAttribute("aria-pressed", "false");
          });
        });
        update();
        return;
      }

      var item = button.closest(".gate-item");
      if (!item) return;

      item.setAttribute("data-state", action === "approve" ? "done" : "denied");
      item.querySelectorAll("button[data-action]").forEach(function (rowButton) {
        if (rowButton.getAttribute("data-action") === "reset") return;
        rowButton.setAttribute("aria-pressed", rowButton === button ? "true" : "false");
      });
      update();
      track(action === "approve" ? "gate_approve" : "gate_deny",
        item.getAttribute("data-target") || "gate");
    });

    update();
  });

  document.querySelectorAll("a[data-target]").forEach(function (link) {
    link.addEventListener("click", function () {
      track("nav_click", link.getAttribute("data-target"));
    });
  });
  /* Interactive PenEcho demo */
  document.querySelectorAll("[data-demo]").forEach(function (demo) {
    var statusEl = demo.querySelector("[data-demo-status]");
    var timers = [];

    function clearTimers() {
      timers.forEach(window.clearTimeout);
      timers = [];
    }

    function setStatus(text) {
      if (statusEl) statusEl.textContent = text;
    }

    function runCheck() {
      clearTimers();
      demo.classList.remove("is-marked", "is-hinted");
      setStatus(isEnglish ? "Agent reads…" : "Agent liest …");
      timers.push(window.setTimeout(function () {
        demo.classList.add("is-marked");
        setStatus(isEnglish ? "Wrong step marked" : "Falscher Schritt markiert");
      }, 650));
      timers.push(window.setTimeout(function () {
        demo.classList.add("is-hinted");
        setStatus(isEnglish ? "Evidence: distribute" : "Beleg: Distributivgesetz");
      }, 1450));
    }

    demo.addEventListener("click", function (event) {
      var button = event.target.closest("[data-demo-action]");
      if (!button || !demo.contains(button)) return;
      var action = button.getAttribute("data-demo-action");

      if (action === "stop") {
        clearTimers();
        demo.classList.remove("is-marked", "is-hinted");
        setStatus(isEnglish ? "Stopped · nothing written" : "Angehalten · nichts geschrieben");
        return;
      }

      if (action === "check") runCheck();
    });

    window.setTimeout(runCheck, 1200);
  });

})();
