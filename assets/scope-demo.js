(() => {
  const demo = document.getElementById("scope-demo");
  const choices = [...demo.querySelectorAll("[data-choice]")];
  const reset = demo.querySelector("[data-scope-reset]");
  const checks = [...demo.querySelectorAll("[data-check]")];
  const summary = demo.querySelector("[data-scope-summary]");
  const copy = {
    en: {
      pending: "Awaiting your decision", form: "Signup form only", both: "Signup form + CSV import",
      ready: "Ready to test", skipped: "Outside scope", pass: "✓ Empty name rejected", fail: "Empty name accepted"
    },
    de: {
      pending: "Entscheidung offen", form: "Nur Anmeldeformular", both: "Anmeldeformular + CSV-Import",
      ready: "Test bereit", skipped: "Außerhalb der Freigabe", pass: "✓ Leerer Name abgelehnt", fail: "Leerer Name akzeptiert"
    }
  };

  let choice = "pending";
  // Both example inputs initially accept an empty name. Apply the selected fix
  // to a fresh in-memory example for every decision, then exercise its inputs.
  function testExample(scope) {
    const acceptsName = { form: () => true, import: () => true };
    const allowed = scope === "both" ? ["form", "import"] : ["form"];
    for (const input of allowed) {
      acceptsName[input] = name => name.trim().length > 0;
    }
    return Object.fromEntries(allowed.map(input => [input, acceptsName[input]("") ? "fail" : "pass"]));
  }

  function render() {
    const labels = copy[document.documentElement.lang] || copy.en;
    const results = choice === "pending" ? {} : testExample(choice);
    demo.dataset.scope = choice;
    summary.textContent = labels[choice];
    for (const check of checks) {
      const state = results[check.dataset.check] || (choice === "pending" ? "ready" : "skipped");
      check.dataset.result = state;
      check.textContent = labels[state];
    }
    for (const button of choices) {
      button.setAttribute("aria-pressed", String(button.dataset.choice === choice));
    }
    reset.hidden = choice === "pending";
  }

  for (const button of choices) {
    button.addEventListener("click", () => {
      choice = button.dataset.choice;
      render();
    });
  }
  reset.addEventListener("click", () => {
    choice = "pending";
    render();
    choices[0].focus();
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  render();
  demo.hidden = false;
})();
