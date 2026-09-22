(() => {
  const STORAGE_KEY = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb03a01';
  const $ = (selector) => document.querySelector(selector);
  let validWitness = null;
  let attempted = false;

  function feedback(element, message, kind) {
    element.textContent = message;
    element.className = `feedback ${kind}`;
    element.hidden = false;
  }

  document.querySelectorAll('[data-hint]').forEach((button) => {
    button.addEventListener('click', () => {
      const hint = document.getElementById(button.dataset.hint);
      hint.hidden = !hint.hidden;
      button.setAttribute('aria-expanded', String(!hint.hidden));
    });
  });

  $('#check-witness').addEventListener('click', () => {
    attempted = true;
    const c = Number($('#c-input').value);
    const n0 = Number($('#n0-input').value);
    const out = $('#witness-feedback');
    if ($('#c-input').value === '' || $('#n0-input').value === '' || !Number.isFinite(c) || !Number.isInteger(n0)) {
      feedback(out, 'Trage ein nichtnegatives c und ein ganzzahliges n₀ ein. Die Existenzquantoren brauchen konkrete Zeugen.', 'try');
      return;
    }
    if (c < 0 || n0 < 0) {
      feedback(out, 'Die Definition verlangt c ≥ 0 und n₀ ≥ 0. Korrigiere zuerst diese Nebenbedingung.', 'try');
      return;
    }
    if (2 * c <= 3) {
      feedback(out, 'Dieses c lässt keinen Platz für +17: Aus 3n + 17 ≤ 2cn würde 17 ≤ (2c−3)n, aber rechts steht höchstens 0.', 'try');
      return;
    }
    const threshold = 17 / (2 * c - 3);
    if (n0 < threshold) {
      feedback(out, `Fast: Bei deiner Wahl müsste n₀ mindestens ${Math.ceil(threshold)} sein, damit 17 ≤ (2c−3)n ab dort gilt.`, 'try');
      return;
    }
    validWitness = { c, n0 };
    feedback(out, `Gültige Zeugen. Jetzt fehlt noch der entscheidende Satz: Warum gilt die Ungleichung für jedes n ≥ ${n0}?`, 'good');
    $('#proof-prompt').textContent = `Nutze deine Wahl c = ${c}, n₀ = ${n0}. Entscheide, welche Art von Begründung den Allquantor erfüllt.`;
    $('#proof-step').hidden = false;
    $('#proof-step').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('#check-proof').addEventListener('click', () => {
    const choice = document.querySelector('input[name="proof"]:checked');
    const out = $('#proof-feedback');
    if (!choice) {
      feedback(out, 'Wähle eine Begründung. Gesucht ist ein Satz, der alle n ≥ n₀ abdeckt.', 'try');
      return;
    }
    if (choice.value === 'label') {
      feedback(out, '„Beide linear“ benennt nur die vermutete Klasse. Es liefert weder konkrete Zeugen noch den geforderten ∀n-Nachweis.', 'try');
      return;
    }
    if (choice.value === 'sample') {
      feedback(out, 'Ein einzelner Testwert erfüllt den Allquantor nicht. Du musst zeigen, dass die Ungleichung ab n₀ nie wieder kippt.', 'try');
      return;
    }
    if (!validWitness || validWitness.c !== 2 || validWitness.n0 < 17) {
      feedback(out, 'Diese konkrete Rechenkette passt zu c = 2 und n₀ ≥ 17. Setze diese Zeugen oben ein – oder formuliere für deine Wahl die entsprechende Schranke.', 'try');
      return;
    }
    feedback(out, 'Formal vollständig: konkrete Zeugen, Nebenbedingungen und eine Ungleichung für alle n ≥ n₀.', 'good');
    $('#solution').hidden = false;
    $('#completion').hidden = false;
  });

  $('#reveal-solution').addEventListener('click', () => {
    const okay = attempted || window.confirm('Du hast noch keine eigene Wahl geprüft. Musterweg trotzdem öffnen?');
    if (!okay) return;
    $('#solution').hidden = false;
    $('#completion').hidden = false;
  });

  document.querySelectorAll('[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      let state = {};
      try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { state = {}; }
      state[FIELD] = button.dataset.state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      $('#state-feedback').textContent = `Gespeichert: ${button.dataset.state === 'sitzt' ? 'Sitzt' : 'Wackelt'}.`;
    });
  });
})();
