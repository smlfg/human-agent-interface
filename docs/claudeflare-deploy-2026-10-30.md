# ClaudeFlare-Deploy nach dem Redesign

Stand: 30.10.2026. Read-only-Prüfung.

## 1. Auslieferungspfad: belegt vs. Annahme

Belegt:
- Produktion ist der Worker human-agent-interface aus 03_HAI (src/worker.js, Assets "." als ASSETS, workers_dev und preview_urls aus). Deploy ist manuell; kein package.json, keine CI, kein gepinntes Wrangler.
- wrangler.jsonc enthält keine routes/custom_domain. Die Domain ist also nicht im Repo deklariert, sondern im Dashboard gebunden (Annahme; von außen nicht prüfbar).
- Die Produktion läuft noch auf dem alten Worker: / liefert data-hero-variant, das nur der lokal gelöschte handleHomepage injiziert. /was-ist-hai/ und /mesh/ sind live 404; /agentfaehig/ ist live 200.
- Das Fleet-Repo 00_AKTUELL/claudeflareworkerhaus ist ein Test-Fleet cwh-01…11. Das Manifest enthält keinen Worker für die Hauptseite; die Domains sind laut README und LIVE-FLEET-STATUS nur Zuordnung, ohne Routes/DNS. Einzige reale Verbindung: Service Binding EXPLAIN → cwh-11-explain-20261008 (live bestätigt: /api/explain/health = 200, gleiche workerId). cwh-05 „Agentfähig“ ist ein Test-Worker, nicht agentfähig.de.
- Nicht prüfbar: R2-Jurisdiction eu, Preview-Bucket, Analytics-Dataset.

## 2. Werden die neuen Verzeichnisse ohne Config-Änderung ausgeliefert?

Ja. Default html_handling = auto-trailing-slash: /was-ist-hai → 307 /was-ist-hai/, /was-ist-hai/ → 200 was-ist-hai/index.html; /en/mesh/ analog. Default not_found_handling = none: echte 404, kein SPA-Fallback. run_worker_first enthält nur /, /index.html, /intake, /intake/*, /api/*; alle neuen Pfade laufen asset-first am Worker vorbei. Keine Änderung nötig; die Defaults können explizit festgeschrieben werden. Live bestätigt: /index.html → 307 /, /agentfaehig → 307 /agentfaehig/.

Wichtig: run_worker_first matcht Pfade, nie Hosts. Ein Host-Rewrite im Worker greift nur für diese Pfade — der entscheidende Punkt für agentfähig.de.

## 3. Root-Ersatz und Altlasten

Der neue index.html funktioniert mit dem aktuellen Setting: / läuft durch den Worker, der an ASSETS weiterreicht. handleHomepage ist entbehrlich.

Tot: cryptoRandomIndex (L697) hat keinen Aufrufer mehr. HERO_EXPERIMENT_ID, HERO_VARIANTS, SITE_EVENTS und SITE_EVENT_TARGETS leben nur noch als Legacy-Zweig in normalizeSiteEvent (L416–424). Nicht löschen, solange /agentfaehig/ und /ch/ noch hero_impression/cta_click mit homepage-hero-2026-05-23 senden; sonst 400.

Neu: assets/hai.js sendet redesign-protocol-2026-10-30; alle data-target/data-page-Werte sind in PROTOCOL_TARGETS enthalten (geprüft).

Duplikate auf demselben Host: /proof/ (ohne Canonical) und /what_it_is/ (Canonical auf sich) sind live; die neuen Seiten heißen /beweis/ und /was-ist-hai/. Canonical der alten Indexseiten auf die neuen setzen.

## 4. agentfähig.de

Ist: agentfähig.de ist live, aber ein eigener Standalone-Auftritt (Titel „Was willst du heute erledigen lassen?“, 51 kB, keine Canonical; /agentfaehig/ dort 404). Auf human-agent-interface.com existiert parallel /agentfaehig/ (20 kB) mit Canonical auf HAI. Das ist der Duplicate-Content-Fall — nicht der im Mesh beschriebene.

Empfohlen (minimales Risiko): eigener Worker mit assets.directory "./agentfaehig", Custom Domains agentfähig.de und www.agentfähig.de, run_worker_first true und kleinem Apex→www-301. Kein Eingriff in den Hauptworker. Vorher in agentfaehig/index.html: Canonical und hreflang de-DE auf https://www.xn--agentfhig-02a.de/; /tutorials/, /impressum/, /datenschutz/ sowie /favicon.png und /mail-fallback.js absolut setzen oder mitnehmen.

Variante B (ein Worker): run_worker_first: true ist zwingend; sonst liefert die Asset-Schicht auf agentfähig.de die HAI-Seiten direkt aus (auch / = Homepage), und der Host-Branch greift nur für gelistete Pfade. Dann Host-Branch oben in fetch() nach const url (L163):

    const SALES = new Set(["xn--agentfhig-02a.de", "www.xn--agentfhig-02a.de"]);
    if (SALES.has(url.hostname)) {
      if (!url.hostname.startsWith("www.")) return Response.redirect("https://www." + url.hostname + url.pathname + url.search, 301);
      if (url.pathname !== "/") return new Response("Not found", { status: 404 });
      return env.ASSETS.fetch(new Request(new URL("/agentfaehig/", url), request));
    }

Nachteil: jeder Asset-Request läuft durch den Worker (Kosten, Latenz, Blast Radius). Alternative: Selbst-Canonical live, /agentfaehig/ dorthin; kein Worker-Deploy.

## 5. Risiken und Checkliste

- Drei Checkouts: 05_INBOX/human-agent-interface ist ein alter Stand (207d710, Juni) mit gleichem Worker-Namen und veraltetem assets.exclude. Ein Deploy von dort überschreibt Produktion. Nur aus 03_HAI deployen; pwd und git rev-parse HEAD prüfen.
- Kein package.json und kein gepinntes Wrangler: npx wrangler@Version deploy verwenden.
- preview_urls und workers_dev sind aus: keine Preview-URL. Vorher lokal wrangler dev; alternativ Preview kurz aktivieren oder wrangler versions upload.
- R2 eu: Bucket und preview_bucket_name müssen in EU existieren, sonst Deploy-Fehler; /api/client-handoff-upload testen.
- Service Binding EXPLAIN: cwh-11 muss im selben Account bleiben (live 200).
- Analytics: hai_site_events; ungültige Events → 400. Alte Sender erst nach Umstellung entfernen.
- .assetsignore: docs/** fehlt — dieser Report würde unter /docs/… öffentlich ausgeliefert. Vor Deploy ergänzen.
- Sitemap/llms.txt wurden während der Prüfung bereits umgestellt; /proof/ und /what_it_is/ sind dort entfernt, aber live und ohne Canonical auf die neuen Seiten. Deren Canonicals noch setzen.
- Reihenfolge: Canonicals/Sitemap/Altlinks, .assetsignore, Root und neue Seiten deployen, agentfähig.de separat, dann Live-Checks (200/307/404, Canonicals, /api/site-event OPTIONS 204, /api/explain/health 200).
