(() => {
  const STORE = 'ads-uebungsblaetter-state-v1';
  const FIELD = 'pb01a03';
  const pixels = [0, 24, 25, 49, 50, 100];
  const V = 100;
  let output = Array(pixels.length).fill(V);
  let attempted = false;
  let boundaryDone = false;

  const byId = id => document.getElementById(id);
  const show = id => { byId(id).hidden = false; };
  const feedback = (id, text, kind = 'try') => { const box = byId(id); box.textContent = text; box.className = `feedback ${kind}`; box.hidden = false; };
  const threshold = () => Number(byId('threshold').value);
  const expected = () => pixels.map(v => v < (threshold() / 100) * V ? 0 : V);
  const shade = value => `rgb(${Math.round(value / V * 255)},${Math.round(value / V * 255)},${Math.round(value / V * 255)})`;
  const foreground = value => value < V / 2 ? '#fff' : '#111';
  const pixelMarkup = (value, index, button = false) => `<${button ? 'button' : 'span'} class="pixel" ${button ? `type="button" data-index="${index}" aria-label="Ausgabepixel ${index + 1}: ${value}, umschalten"` : ''} style="background:${shade(value)};color:${foreground(value)}">${value}</${button ? 'button' : 'span'}>`;
  const render = () => {
    byId('input-grid').innerHTML = pixels.map((v, i) => pixelMarkup(v, i)).join('');
    byId('output-grid').innerHTML = output.map((v, i) => pixelMarkup(v, i, true)).join('');
    byId('threshold-output').value = `${threshold()} %`;
  };
  const unlock = () => {
    if (!boundaryDone) return;
    show('solution'); show('completion'); byId('reveal').hidden = true;
    byId('gate-copy').textContent = 'Raster korrekt — jetzt übersetzt du denselben Datenweg in dein C++-Lab.';
  };

  byId('boundary-question').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return; attempted = true;
    if (button.dataset.answer === 'black') { feedback('boundary-feedback', 'Falscher Pfad: Die Regel ist strikt „kleiner als“. Am Grenzwert gilt 25 < 25 nicht; mit <= würdest du den Pixel fälschlich schwarz machen.', 'try'); return; }
    if (button.dataset.answer === 'factor') { feedback('boundary-feedback', 'Falscher Pfad: 25 ist Prozent, nicht der Faktor 25. Erst durch 100 teilen: s = 0.25.', 'try'); return; }
    feedback('boundary-feedback', 'Richtig: 25 ist nicht kleiner als 0.25 · 100. Der Pixel wird V = 100, also weiß.', 'good'); boundaryDone = true; show('lab-step'); render();
  });
  byId('threshold').addEventListener('input', () => { output = Array(pixels.length).fill(V); render(); feedback('grid-feedback', 'Neuer Schwellwert: Ausgabe zurückgesetzt. Entscheide die sechs Pixel erneut.', 'try'); });
  byId('output-grid').addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; attempted = true; const i = Number(button.dataset.index); output[i] = output[i] === 0 ? V : 0; render(); });
  byId('check-grid').addEventListener('click', () => {
    attempted = true; const want = expected(); const bad = output.findIndex((v, i) => v !== want[i]);
    if (bad !== -1) { const limit = (threshold() / 100) * V; feedback('grid-feedback', `Pixel v=${pixels[bad]} stimmt noch nicht: Prüfe strikt ${pixels[bad]} < ${limit}. Gleichheit ist weiß.`, 'try'); return; }
    feedback('grid-feedback', `Korrekt: [3, 2, ${V}, ${output.join(', ')}]. Metadaten blieben stehen; alle Pixel sind 0 oder V.`, 'good'); unlock();
  });
  document.querySelectorAll('.hint-btn').forEach(button => button.addEventListener('click', () => { attempted = true; show(button.dataset.hint); }));
  byId('reveal').addEventListener('click', () => { if (!attempted && !window.confirm('Noch kein Versuch. Codegerüst wirklich aufdecken?')) return; show('solution'); show('completion'); byId('reveal').hidden = true; });
  document.querySelectorAll('.state-btn').forEach(button => button.addEventListener('click', () => {
    let state = {}; try { state = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { state = {}; }
    state[FIELD] = button.dataset.state; localStorage.setItem(STORE, JSON.stringify(state)); feedback('state-feedback', `${button.textContent} gespeichert. Schlüssel: ${FIELD}.`, 'good');
  }));
})();
