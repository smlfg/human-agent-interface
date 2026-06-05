const VERSION_DATA = {
  "v1-0": {
    number: "V1.0",
    title: "Ordnungs-Agent mit menschlichem Gate",
    status: "gesicherter Snapshot",
    oneLine: "V1.0 macht HAI erstmals wiederholbar: Projektlage, naechster Schritt und Ausfuehrung laufen durch ein menschliches Gate.",
    skillstand: [
      "Projektlage, Idee, Codezustand, Briefing, Minimierung und Execution-Loop werden als Artefakt-Kette gebaut.",
      "Der Executor arbeitet nur auf akzeptierten EXECUTION_STEPs; der Validator prueft danach read-only."
    ],
    skills: ["project-state", "idea-spec", "code-state", "briefing", "minimize", "execution-loop"],
    stand: "Erster gespeicherter agentischer HAI-Workflow vom 2026-05-08; praktisch brauchbar, aber aus BahnAgent/Testfall entstanden.",
    problem: "Unklar, ob der Workflow ausserhalb des Ursprungstests generalisiert. Die alte Ordnung war noch nicht als wiederholbarer Projektmanagement-Prozess bewiesen.",
    proposal: "V1 sichern, Rollen trennen und danach mit fremden Projekten pruefen. Nicht die Basis umbauen, bevor Generalisierung messbar ist.",
    implementation: "HAI-Agent erzeugt PROJECT_STATE, PROMPT, CODE_STATE, BRIEFING und NEXT_STEP; akzeptierte EXECUTION_STEPs laufen ueber Executer und Validator.",
    test: "Nachfolgender V1.1-Dreierlauf auf WerBinIch, NasaCode und PromptBoost.",
    validationText: "2 PASS, 1 PARTIAL; kein BahnAgent-Overfit sichtbar, aber Root-Bindung und Reporting bleiben offen.",
    method: "Methodischer Kern: erst reproduzierbaren Baseline-Snapshot sichern, dann Generalisierung getrennt evaluieren.",
    good: ["Klare Trennung: planen, ausfuehren, validieren.", "Samuel bleibt Gate vor jeder Ausfuehrung."],
    weak: ["Noch stark aus BahnAgent/Testfall geboren.", "Root-Bindung und dauerhafte Reports fehlen."],
    next: "V1.1 muss beweisen, dass HAI auch ausserhalb des Ursprungstests den kleinsten sinnvollen Schritt findet.",
    background: "Der erste Fortschritt ist nicht Autonomie, sondern Wiederherstellbarkeit.",
    proof: ["EXECUTION_STEP Gate", "read-only Validator", "2 PASS / 1 PARTIAL"],
    sources: [
      { label: "V1 README", href: "../../V1/README.md" },
      { label: "V1 Manifest", href: "../../V1/MANIFEST.md" }
    ],
    matrix: ["Artefakt-Kette", "Briefing entsteht", "Validator", "kaum", "hartes Execution-Gate"],
    asciiArt: String.raw`
                 V1.0  BASELINE / OWNER-GATE

      MENSCH / OWNER
      Zustand + Absicht
            |
            v
   +------------------+      +------------------+
   | PROJECT_STATE    | ---> | BRIEFING         |
   +------------------+      +------------------+
            |                         |
            v                         v
   +------------------+      +------------------+
   | CODE_STATE       | ---> | NEXT_STEP        |
   +------------------+      +---------+--------+
                                      |
                              HUMAN ACCEPT?
                                no | yes
                                   v
                         +-------------------+
                         | hai-executer      |
                         +---------+---------+
                                   |
                                   v
                         +-------------------+
                         | hai-validator     |
                         +---------+---------+
                                   |
                                   v
                         EVIDENZ -> OWNER`,
    website: {
      storyTitle: "Vom Chaos zum ersten Owner-Gate",
      storyLead: "V1.0 ist die erste HAI-Website ueber Wiederholbarkeit: nicht mehr Agent macht irgendwas, sondern Mensch akzeptiert einen konkreten Schritt.",
      before: "Agentische Arbeit war moeglich, aber nicht stabil als Prozess greifbar.",
      after: "PROJECT_STATE, BRIEFING, NEXT_STEP, Executer und Validator bilden eine kontrollierte Linie.",
      ownerQuestion: "Hat Samuel nach dem Ruecklauf mehr Klarheit als vor dem Start?"
    }
  },
  "v1-1": {
    number: "V1.1",
    title: "Generalisierung statt Demo-Fit",
    status: "PARTIAL, Richtung stimmt",
    oneLine: "V1.1 loest HAI vom Demo-Fit: Projektabsicht wird breiter gelesen, PromptGarage bleibt read-only, Human Gate bleibt hart.",
    skillstand: [
      "project-state -> user-wishlist -> idea-spec -> code-state -> briefing -> minimize -> execution-loop.",
      "V1 bleibt stabil; Executor und Validator werden nicht umgebaut."
    ],
    skills: ["project-state", "user-wishlist", "idea-spec", "code-state", "briefing", "minimize"],
    stand: "V1.1 ist der Generalization-Lernstand nach drei fremden Projekten: semantisch besser, aber noch PARTIAL.",
    problem: "HAI hing zu stark an README/IDEA und schrieb bei PromptBoost Artefakte in den falschen Root-Kontext.",
    proposal: "Intent-Quellen breiter lesen, PromptGarage nur read-only als historisches Quellenmaterial nutzen und Root-Bindung haerten.",
    implementation: "Neuer Pre-Briefing-Schritt hai-user-wishlist; hai-idea-spec akzeptiert idea-aehnliche Dateien statt nur feste Dateinamen.",
    test: "Manuelle Evaluation: WerBinIch PASS, NasaCode PASS, PromptBoost PARTIAL.",
    validationText: "Generalisiert semantisch ueber drei Projekte; nicht clean PASS wegen Project-Root-Ambiguitaet und fehlendem durable Verification-Report.",
    method: "Overfit-Test gegen neue Projektklassen statt Vertrauen in einen gelungenen Demo-Fall.",
    good: ["HAI erkennt Projektabsicht breiter.", "PromptGarage wird nur read-only als Kontext genutzt."],
    weak: ["Root-Bindung ist noch nicht sauber genug.", "Momentum und Verifikationsreport bleiben zu schwach."],
    next: "V1.2 muss aus sicherem PARTIAL einen klareren PASS machen: Root bestaetigen, Verifikation dokumentieren, Nutzen zeigen.",
    background: "Generalisierung heisst: Kontext nutzen, ohne ihn als Auftrag zu missverstehen.",
    proof: ["2 PASS", "1 PARTIAL", "PromptGarage read-only"],
    sources: [
      { label: "V1.1 README", href: "../../V1.1/README.md" },
      { label: "V1.1 Final Report", href: "../../docs/hai-architecture/v1_1_generalization_manual_eval_2026-05-08_1835/FINAL_GENERALIZATION_REPORT.md" }
    ],
    matrix: ["breiter Intent", "mehr Kontext", "manueller 3-Projekt-Test", "kaum", "Human Gate bleibt"],
    asciiArt: String.raw`
              V1.1  INTENT-DISCOVERY / WISHLIST

                         MENSCH / OWNER
                              |
          aktuelle Anweisung  |  bleibt hoechste Quelle
                              v
      +-----------+   +---------------+   +-------------+
      | README    |   | idea-aehnlich |   | Projektspur |
      +-----+-----+   +-------+-------+   +------+------+
            \                 |                  /
             \                |                 /
              v               v                v
            +-------------------------------------+
            |        hai-user-wishlist            |
            | PromptGarage nur READ-ONLY          |
            +------------------+------------------+
                               |
                               v
            +-------------------------------------+
            | idea-spec liest Intent breiter       |
            +------------------+------------------+
                               |
                               v
                     BRIEFING -> NEXT_STEP
                               |
                               v
                  alte Spuren erklaeren, befehlen nicht`,
    website: {
      storyTitle: "Intent breiter lesen, ohne alte Prompts zu befehligen",
      storyLead: "V1.1 zeigt HAI als Uebersetzer zwischen aktuellem Projekt und historischen Wunsch-Spuren.",
      before: "HAI war zu abhaengig von README/IDEA und konnte fremde Projektformen misslesen.",
      after: "Wishlist und breitere Intent-Discovery machen Kontext nuetzlich, aber PromptGarage bleibt read-only.",
      ownerQuestion: "Bleibt die aktuelle menschliche Absicht hoeher priorisiert als alte Spuren?"
    }
  },
  "v1-2": {
    number: "V1.2",
    title: "Von Projekt-Verstehen zu stabiler Ausfuehrung",
    status: "validierter Zwischenschritt",
    oneLine: "V1.2 verbessert Intent; die Bruchstelle wird Umsetzung.",
    skillstand: [
      "HAI erkennt mehr Quellen als IDEA/README und behandelt fehlende Standarddateien nur als Signal.",
      "Gehaertet werden handoff, minimize, execution-loop, user-wishlist und idea-spec."
    ],
    skills: ["project-state", "wishlist", "idea", "code", "briefing", "minimize", "executor-handoff", "loop"],
    stand: "V1.2 verbessert Projektwahrnehmung deutlich; die Hauptbruchstelle verschiebt sich zur Ausfuehrung.",
    problem: "Sonnenuhr bekam einen zu grossen README-Step; schloss_PDF zeigte fragile Executor/Validator-Loop-Zustaende.",
    proposal: "Atomization Gate haerten, NEXT_STEP fuer Menschen knapp lassen und daraus ein executor-klares Handoff erzeugen.",
    implementation: "hai-minimize verlangt Step IDs und kleinere bounded surfaces; hai-executor-handoff erzeugt EXECUTOR_HANDOFF_NEXT_STEP; loop bekommt Timeout/No-Report-Zustaende.",
    test: "Dreierlauf auf WG-Agent, Sonnenuhr und schloss_PDF; zusaetzlich meta-new-agent Review, doctor und Chat-Smoke.",
    validationText: "Intent ca. 60 -> 85; PromptGarage 0 -> 80 brauchbar; Loop bleibt nur ca. 55-60 robust.",
    method: "Methodisch: Fehlerklasse isolieren. Wenn Verstehen besser wird, wird die naechste Hypothese Ausfuehrungsrobustheit.",
    good: ["Intent-Erkennung grob 60 -> 85.", "PromptGarage-Nutzung 0 -> 80, weiter immutable/read-only."],
    weak: ["Loop nur 55-60 robust.", "Steps teils noch zu gross fuer saubere Ausfuehrung."],
    next: "V1.3 muss pruefen, ob ein Schritt menschlich sinnvoll ist, nicht nur klein.",
    background: "Projektverstehen generalisiert; jetzt muss HAI schlechte Arbeit aktiv verhindern.",
    proof: ["Intent 60 -> 85", "PromptGarage 0 -> 80", "Loop 55-60", "3 Testprojekte"],
    sources: [
      { label: "V1.2 Report", href: "../../V1.2/V1_2_GENERALIZATION_REPORT.md" },
      { label: "V1.2 Changelog", href: "../../V1.2/CHANGELOG.md" }
    ],
    matrix: ["85% grob", "Executor-Handoff", "doctor + meta PASS", "Loop-Gates", "weiter hart"],
    asciiArt: String.raw`
              V1.2  HANDOFF / ATOMIZATION ARCHITECTURE

                 MENSCHLICH KNAPPER NEXT_STEP
                              |
                              v
              +-------------------------------+
              | Step-ID + Allowed Changes     |
              | Atomizitaets-Gate             |
              +---------------+---------------+
                              |
                 scope-identisch uebersetzen
                              v
              +-------------------------------+
              | EXECUTOR_HANDOFF_NEXT_STEP    |
              +---------------+---------------+
                              |
               +--------------+--------------+
               |                             |
               v                             v
      +----------------+             +----------------+
      | hai-executer   |             | watchdog gates |
      +-------+--------+             | timeout/no rpt |
              |                      +----------------+
              v
      +----------------+
      | hai-validator  |
      +-------+--------+
              |
              v
      ACCEPT / REJECT / BLOCKED mit Beweis`,
    website: {
      storyTitle: "Kleiner Schritt heisst noch nicht ausfuehrbarer Schritt",
      storyLead: "V1.2 ist die Website ueber Handoff: aus menschlich knappem NEXT_STEP wird executor-klare Arbeit.",
      before: "Verstehen wurde besser, aber die Ausfuehrung blieb fragil.",
      after: "Step-ID, Handoff, Timeout und No-Report-Gates machen Failure sichtbar.",
      ownerQuestion: "Kann Samuel erkennen, ob die Maschine wirklich im erlaubten Scope blieb?"
    }
  },
  "v1-3": {
    number: "V1.3",
    title: "Projekt-Sinn vor Agenten-Arbeit",
    status: "eingefrorene akzeptierte Baseline",
    oneLine: "V1.3 fragt nicht nur, ob ein Schritt klein ist, sondern ob er fuer Samuel ueberhaupt Sinn macht.",
    skillstand: [
      "HAI unterscheidet Build, Verify, Goal reached, Archive/Maintain und menschliche Entscheidung.",
      "Neu: explain-better, Lifecycle-Gates, executor handoff und canonical NEXT_STEP refresh."
    ],
    skills: ["project-state", "explain-better", "minimize", "executor-handoff", "execution-loop", "lifecycle-gates"],
    stand: "V1.3 ist die akzeptierte Baseline nach V1.4-PASS; installiert, gesichert und eingefroren.",
    problem: "V1.2 konnte kleine Schritte erzeugen, die technisch korrekt, aber menschlich schlecht, stale oder sinnlos waren.",
    proposal: "Vor NEXT_STEP nicht nur Atomizitaet pruefen, sondern Lifecycle und Human-Payoff: already works, goal reached, event passed, archive/maintain.",
    implementation: "hai-explain-better zwischen Briefing und Minimize; Lifecycle-Gates; canonical NEXT_STEP refresh/blocking nach Human Redirect.",
    test: "V1.3-Eval auf TypoTuner, PseudoLogikPyhthonCPP und HeumandenParty; danach V1.4-Proof-Run als Regression.",
    validationText: "V1.3-Eval PARTIAL mit zwei Patches; V1.4-Proof danach PASS und keine Pflicht-Patches.",
    method: "Nicht nur Output-Qualitaet messen, sondern menschlichen Nutzen und Stop-Bedingungen als Erfolgskriterium.",
    good: ["Weniger Busywork und klarere NEXT_STEPs.", "Bessere Gates vor Deploy, Commit, Push und externem Zugriff."],
    weak: ["Kein Produkt-Autopilot.", "Bei Auth, Hosting oder Entscheidung blockt HAI statt zu raten."],
    next: "V1.4 muss die Baseline an frischen Projekten pruefen, ohne schon wieder umzubauen.",
    background: "HAI wird ein Sinn-Filter vor kontrollierter Agentenarbeit.",
    proof: ["V1.4 PASS", "No mandatory patch", "Lifecycle Gates", "Human Gate"],
    sources: [
      { label: "V1.3 Freeze", href: "../../V1.3/BASELINE_FREEZE.md" },
      { label: "V1.3 Eval", href: "../../docs/hai-architecture/v1_3_generalization_manual_eval_2026-05-08_1953/FINAL_GENERALIZATION_REPORT.md" }
    ],
    matrix: ["Sinn statt nur klein", "NEXT_STEP refresh", "V1.4 PASS", "Blocken korrekt", "stark"],
    asciiArt: String.raw`
                 V1.3  LIFECYCLE-BREMSE / SINN-FILTER

                         BRIEFING
                            |
                            v
              +-----------------------------+
              |      hai-explain-better     |
              | Warum hilft dieser Schritt? |
              +--------------+--------------+
                             |
                             v
                    +----------------+
                    | Lifecycle Gate |
                    +--------+-------+
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
  ALREADY_WORKS        GOAL_REACHED       EVENT_PASSED
      |                    |                   |
      +---------+----------+---------+---------+
                |                    |
                v                    v
        DECISION / STOP        ARCHIVE_OR_MAINTAIN
                |
                v
      nur wenn sinnvoll: NEXT_STEP -> Execution

          Erfolg = Arbeit verhindern, wenn Arbeit falsch ist`,
    website: {
      storyTitle: "Sinn-Bremse vor Busywork",
      storyLead: "V1.3 macht HAI zur Scope-Maschine, die nicht nur Arbeit erzeugt, sondern schlechte Arbeit verhindert.",
      before: "Ein kleiner technischer Schritt konnte trotzdem menschlich sinnlos sein.",
      after: "Lifecycle-Gates erkennen ALREADY_WORKS, GOAL_REACHED und ARCHIVE_OR_MAINTAIN.",
      ownerQuestion: "Wurde Samuel vor unnoetiger Agentenarbeit geschuetzt?"
    }
  },
  "v1-4": {
    number: "V1.4",
    title: "Proof-Run fuer V1.3",
    status: "Proof-Run, nicht installierbare Version",
    oneLine: "V1.4 ist der Generalization-Proof: drei neue Projekte, drei Zustandslagen, kein neuer Agentenbau.",
    skillstand: [
      "Getestet wird die global installierte V1.3-Baseline, nicht eine neue installierbare Version.",
      "Fokus: Lifecycle Gate, Explain-Better Gate, NEXT_STEP Refresh und Human Decision vor Deploy/Push."
    ],
    skills: ["v1.3-baseline", "lifecycle-test", "explain-better", "redirect-refresh", "regression-check"],
    stand: "V1.4 ist Proof-Run, keine installierbare Version. Getestet wurde die global installierte V1.3-Baseline.",
    problem: "Offen war, ob Lifecycle/Human-Payoff nur auf bekannten Faellen gut klingt oder in echten Projekten Busywork verhindert.",
    proposal: "Drei neue Projektzustaende pruefen: unfertig aber low-payoff, deploy-gated Website, nahezu fertiges Portfolio.",
    implementation: "Keine neue Runtime; Codex liest die von Samuel erzeugten Projek-Managment-Artefakte und Scorecards gegen definierte Fokusfragen.",
    test: "BookmarkBrain, SandrasWritingWorld und PortfolioTimeline im manuellen V1.4-Eval vom 2026-05-10.",
    validationText: "Gesamt PASS: BookmarkBrain PASS, SandrasWritingWorld BLOCKED_BUT_CORRECT, PortfolioTimeline PASS; keine Pflicht-Patches.",
    method: "Methodisch: Proof-Run statt Feature-Run. Die Hypothese ist, ob HAI Arbeit stoppen kann, wenn Arbeit nicht mehr sinnvoll ist.",
    good: ["HAI erkennt Build, Parken, Publizieren und menschliche Entscheidung besser.", "Der Run vermeidet stale oder low-payoff Busywork."],
    weak: ["Kein Installationsstand.", "Proof ist manuell evaluiert und haengt an Projektartefakten."],
    next: "V1.5 darf nur einen engen Repair-Pfad ergaenzen, ohne die akzeptierte Linie umzubauen.",
    background: "Proof ist hier wichtiger als neue Features.",
    proof: ["3 reale Projekte", "Gesamt PASS", "0 Pflicht-Patches", "Proof-only"],
    sources: [
      { label: "V1.4 Final Report", href: "../../docs/hai-architecture/v1_4_generalization_manual_eval_2026-05-10_1747/FINAL_GENERALIZATION_REPORT.md" },
      { label: "V1.4 Run Notes", href: "../../docs/hai-architecture/v1_4_generalization_manual_eval_2026-05-10_1747/RUN_NOTES.md" }
    ],
    matrix: ["Proof statt Feature", "Baseline belegt", "3 reale Projekte", "indirekt", "entscheidet vor Deploy"],
    asciiArt: String.raw`
                    V1.4  PROOF-RUN / BASELINE TEST

                       V1.3 BASELINE (frozen)
                                |
                                v
              +-----------------------------------+
              | Keine neue Runtime, nur Beweis    |
              +-----------------+-----------------+
                                |
          +---------------------+----------------------+
          |                     |                      |
          v                     v                      v
 +----------------+    +--------------------+   +----------------+
 | BookmarkBrain  |    | SandrasWritingWorld|   | PortfolioLine  |
 | PASS           |    | BLOCKED_BUT_CORRECT|   | PASS           |
 +-------+--------+    +---------+----------+   +--------+-------+
         \                       |                       /
          \                      |                      /
           v                     v                     v
              +-----------------------------------+
              | Generalization Verdict: PASS      |
              | Pflichtpatches: 0                 |
              +-----------------------------------+

              Version als Produktbeweis, nicht Feature-Hype`,
    website: {
      storyTitle: "Proof-Website statt Feature-Website",
      storyLead: "V1.4 ist die Website des Beweises: keine neue Magie, sondern frische Faelle gegen V1.3.",
      before: "Unklar war, ob die Sinn-Bremse nur auf bekannten Faellen gut klingt.",
      after: "Drei Projekte zeigen PASS/BLOCKED_BUT_CORRECT/PASS ohne Pflichtpatch.",
      ownerQuestion: "Wird korrektes Stoppen als Erfolg anerkannt?"
    }
  },
  "v1-5": {
    number: "V1.5",
    title: "Eskalieren, ohne Kontrolle abzugeben",
    status: "zufriedenstellender aktueller Stand",
    oneLine: "V1.5 bleibt eine testbare PM-Baseline: Gemini darf helfen, wenn ein Loop scheitert, aber nicht die Kontrolle uebernehmen.",
    skillstand: [
      "Stabile V1.3/V1.4-Linie plus Gemini-MCP Escalation Review.",
      "Trigger: BLOCKED, REJECT, UNCLEAR, Timeouts, Step-ID- und Finalization-Konflikte."
    ],
    skills: ["native-mcp", "gemini-escalation", "execution-loop", "human-gate", "no-fanout"],
    stand: "V1.5 ist ein kleiner Patch auf der akzeptierten V1.3/V1.4-Linie und aktuell zufriedenstellender PM-Stand.",
    problem: "Execution-Loop-Failures brauchen Repair-Analyse, aber ein zweiter autonomer Validator oder breiter Agenten-Fanout wuerde Kontrolle verschieben.",
    proposal: "Gemini-MCP nur bei BLOCKED, REJECT, UNCLEAR, Timeout, No-Report, Step-ID- oder Finalization-Konflikt als Escalation Review nutzen.",
    implementation: "hai-execution-loop bekommt GEMINI_ESCALATION_REVIEW_NEXT_STEP als Artefaktvertrag; Gemini darf Repair triggern, aber nicht Scope erweitern.",
    test: "V1.5-Eval am 2026-05-25 auf FireTracker, miniZentrale und ShortcutCounter; Score 36/39.",
    validationText: "PM-Baseline PASS_WITH_FINDING: 3/3 brauchbare PM-Pakete; Gemini-Pfad selbst NOT_MEASURED.",
    method: "Wissenschaftlicher Caveat: Der Patch darf als nicht-regressiv gelten, aber die neue Gemini-Hypothese ist noch nicht kausal gemessen.",
    good: ["3/3 Projekte erzeugten brauchbare PM-Pakete.", "Human Gate, NEXT_STEP und Executer-Validator-Kette bleiben erhalten."],
    weak: ["Gemini-Pfad ist noch nicht gemessen.", "Der Repair-Pfad wurde noch nicht hart gegen Failure-Faelle getestet."],
    next: "Kein breiter V1.6-Umbau; erst Report-to-NEXT_STEP-Canonicalization, dann gezielte Gemini-Failure-Eval.",
    background: "Repair darf helfen, aber nicht die Besitzrechte am Prozess verschieben.",
    proof: ["36/39", "92.3%", "3/3 PM-Pakete", "Gemini NOT_MEASURED"],
    sources: [
      { label: "V1.5 Final Report", href: "../../docs/hai-architecture/v1_5_generalization_manual_eval_2026-05-25_1630/FINAL_GENERALIZATION_REPORT.md" },
      { label: "V1.5 README", href: "../../V1.5/README.md" }
    ],
    matrix: ["PM-Baseline stabil", "Repair-Eskalation", "36/39", "Gemini angelegt", "bleibt fuehrend"],
    asciiArt: String.raw`
                  V1.5  FAILURE-REPAIR / GEMINI ESCALATION

                    normaler Execution Loop
           NEXT_STEP -> executer -> validator -> ACCEPT
                                |
                     nur bei Fehler/Unklarheit
                                v
        +-----------------------------------------------+
        | BLOCKED | REJECT | UNCLEAR | TIMEOUT | NO RPT |
        +----------------------+------------------------+
                               |
                               v
        +-----------------------------------------------+
        | GEMINI_ESCALATION_REVIEW_NEXT_STEP            |
        | analysiert Failure, erweitert Scope NICHT     |
        +----------------------+------------------------+
                               |
              +----------------+----------------+
              |                                 |
              v                                 v
     scope-identischer Repair            zurueck zu Samuel
              |
              v
        normaler Validator bleibt Wahrheitsinstanz

              Mehr Intelligenz, aber kein zweiter Owner`,
    website: {
      storyTitle: "Repair darf helfen, aber nicht uebernehmen",
      storyLead: "V1.5 ist die Website fuer enge Eskalation: Gemini darf bei Failure analysieren, aber nicht Scope ausweiten.",
      before: "Loop-Failures waren sichtbar, aber Repair-Analyse war nicht sauber kontrahiert.",
      after: "Gemini-MCP ist nur Failure-/Unklarheits-Review, kein zweiter Autopilot.",
      ownerQuestion: "Bleibt Samuel trotz zusaetzlicher Intelligenz der Kontrollpunkt?"
    }
  },
  "v1-6": {
    number: "V1.6",
    title: "Zwei Lanes, ein Owner",
    status: "Pair-Modus Patchlinie",
    oneLine: "V1.6 erlaubt maximal zwei unabhaengige EXECUTION_STEP-Lanes, aber nur wenn Scope, Worktrees und Join-Vertrag Samuels Ownership erhalten.",
    skillstand: [
      "Stabile V1.5-Linie plus eng begrenzter Pair-Modus.",
      "Zwei unabhaengige Lanes laufen isoliert in Git-Worktrees und werden erst nach Validator-ACCEPT zusammengefuehrt."
    ],
    skills: ["pair-plan", "pair-execution-loop", "worktrees", "validator-accept", "pair-join"],
    stand: "V1.6 ist ein kleiner Patch auf V1.5: kein breiter Agenten-Fanout, sondern maximal zwei sichere unabhaengige Lanes.",
    problem: "HAI soll fluessiger arbeiten, ohne bei paralleler Ausfuehrung Kontrolle, Scope oder menschliche Stop-Fragen zu verlieren.",
    proposal: "Pair-Modus nur bei Pair Autonomy Verdict: AUTO_EXECUTION_ALLOWED. Gleiche Dateien, Lockfiles, Migrationen, globale Config, Produktfragen und externe Side Effects blocken Pair-Ausfuehrung.",
    implementation: "Neuer hai-pair-plan erzeugt PAIR_PLAN.md; neuer hai-pair-execution-loop fuehrt Lane A/B in isolierten Worktrees aus und schreibt PAIR_STATUS.md sowie PAIR_JOIN_REPORT.md.",
    test: "Noch zu messen: gezielter Pair-Modus-Canary mit zwei wirklich unabhaengigen atomaren Steps und einem Negativfall mit ueberlappendem Scope.",
    validationText: "README beschreibt die Guardrails; kausale Pair-Evaluation steht noch aus.",
    method: "Methodisch: Durchsatz nur dort erhoehen, wo Unabhaengigkeit beweisbar ist. Ownership-Fragen stoppen weiterhin beim Menschen.",
    good: ["Maximal zwei Lanes statt beliebigem Batch-N-System.", "Join erst nach Validator-ACCEPT und Scope-Pruefung."],
    weak: ["Pair-Modus braucht harte Negativtests.", "Mehr Parallelitaet erhoeht Merge- und Scope-Risiko, wenn Gates lax werden."],
    next: "V1.6 braucht einen Pair-Canary: ein Positivfall mit zwei unabhaengigen Lanes und ein Negativfall, der korrekt auf Single-Step oder Samuel zurueckfaellt.",
    background: "Mehr Durchsatz ist nur Fortschritt, wenn der Mensch danach mehr Owner ist, nicht weniger.",
    proof: ["2-Lane-Limit", "Worktree-Isolation", "Validator-ACCEPT", "Pair-Join"],
    sources: [
      { label: "V1.6 README", href: "../../V1.6/README.md" },
      { label: "V1.6 Changelog", href: "../../V1.6/CHANGELOG.md" }
    ],
    matrix: ["Pair-Autonomie", "Lane A/B Handoff", "Stop-Fragen bleiben", "Gemini bleibt Failure-Repair", "Owner vor Durchsatz"],
    asciiArt: String.raw`
                    V1.6  PAIR-MODE / TWO-LANE JOIN

                         NEXT_STEP Kandidaten
                                  |
                                  v
                   +------------------------------+
                   | hai-pair-plan                |
                   | Unabhaengigkeit beweisen     |
                   +---------------+--------------+
                                   |
                  AUTO_EXECUTION_ALLOWED?
                      no |                | yes
                         v                v
                  Single Step       +-------------+
                  oder Samuel       | 2-Lane Max  |
                                   +------+------+
                                          |
                 +------------------------+------------------------+
                 |                                                 |
                 v                                                 v
        +------------------+                              +------------------+
        | Worktree A       |                              | Worktree B       |
        | executer+val     |                              | executer+val     |
        +--------+---------+                              +--------+---------+
                 |                                                 |
                 +------------------------+------------------------+
                                          |
                              beide Validator ACCEPT?
                                no |          | yes
                                   v          v
                               STOP       PAIR_JOIN_REPORT
                                              |
                                              v
                                      mehr Evidenz -> Owner`,
    website: {
      storyTitle: "Zwei Lanes, kein Kontrollverlust",
      storyLead: "V1.6 ist die Website fuer begrenzten Durchsatz: genau zwei unabhaengige Lanes, wenn Autonomie beweisbar ist.",
      before: "Single-Step war sicher, aber manchmal langsamer als noetig.",
      after: "Pair-Plan, Worktrees und Join nach Validator-ACCEPT erlauben parallele Arbeit ohne Fanout.",
      ownerQuestion: "Hat Samuel nach zwei Lanes mehr Evidenz, ohne weniger Owner zu sein?"
    }
  }
};

const ORDER = ["v1-0", "v1-1", "v1-2", "v1-3", "v1-4", "v1-5", "v1-6"];
const MATRIX_ROWS = ["Verstehen", "Handoff", "Lifecycle-Stop", "Repair", "Human Gate"];



const VISUAL_DATA = {
  "v1-0": {
    label: "Owner-Gate Baseline",
    thesis: "V1.0 verwandelt unklare Projektlage in einen akzeptierten, validierten Schritt.",
    layers: [
      { title: "Mensch", items: ["Zustand", "Absicht", "Risiko"] },
      { title: "HAI-Kette", items: ["Project State", "Briefing", "NEXT_STEP"] },
      { title: "Execution", items: ["Human Accept", "Executer", "Validator"] }
    ],
    deltas: ["erstes Gate", "Rollen getrennt", "Evidenz-Ruecklauf"],
    warning: "Ohne ACCEPT keine Ausfuehrung."
  },
  "v1-1": {
    label: "Intent Source Discovery",
    thesis: "V1.1 macht aus verstreuten Absichtsspuren einen kontrollierten Kontext, ohne alte Prompts zu befehligen.",
    layers: [
      { title: "Quellen", items: ["README", "Idea-like Files", "Projektspuren"] },
      { title: "Read-only Kontext", items: ["PromptGarage", "Wishlist", "Priorisierung"] },
      { title: "Kanon", items: ["Idea Spec", "Briefing", "NEXT_STEP"] }
    ],
    deltas: ["Wishlist neu", "Intent breiter", "History != Auftrag"],
    warning: "Aktuelle Samuel-Anweisung bleibt hoeher als alte Treffer."
  },
  "v1-2": {
    label: "Handoff Contract",
    thesis: "V1.2 trennt menschliche Knappheit von maschineller Praezision: ein Step wird zum pruefbaren Vertrag.",
    layers: [
      { title: "Kanonischer Step", items: ["Step-ID", "Allowed Changes", "Atomizitaet"] },
      { title: "Handoff", items: ["Executor Contract", "Scope Match", "Status Gates"] },
      { title: "Loop Watch", items: ["Timeout", "No Report", "Validator Verdict"] }
    ],
    deltas: ["Executor-Handoff", "Step-ID Lock", "Failure sichtbar"],
    warning: "Wenn Handoff != NEXT_STEP, stoppt der Loop."
  },
  "v1-3": {
    label: "Lifecycle Brake",
    thesis: "V1.3 fuegt vor Arbeit eine Sinn-Bremse ein: Nicht jeder kleine Schritt ist ein guter Schritt.",
    layers: [
      { title: "Projektlage", items: ["Already works?", "Goal reached?", "Event passed?"] },
      { title: "Bremse", items: ["Explain Better", "Lifecycle Gate", "Human Payoff"] },
      { title: "Ausgang", items: ["Decision Step", "Archive/Maintain", "Execution Step"] }
    ],
    deltas: ["Sinn vor Arbeit", "Stale Step Block", "Stop ist Erfolg"],
    warning: "HAI darf korrekt blocken, auch wenn Technik moeglich waere."
  },
  "v1-4": {
    label: "Proof, not Feature",
    thesis: "V1.4 ist ein Beweis-Release: dieselbe Baseline wird gegen drei frische Projektlagen gehalten.",
    layers: [
      { title: "Frozen Baseline", items: ["V1.3", "keine Runtime-Aenderung", "Hypothese"] },
      { title: "Eval Cases", items: ["BookmarkBrain", "WritingWorld", "Portfolio"] },
      { title: "Verdict", items: ["PASS", "BLOCKED_BUT_CORRECT", "0 Pflichtpatches"] }
    ],
    deltas: ["Proof-Run", "3 reale Faelle", "Baseline bestaetigt"],
    warning: "Produktvalidierung ist hier wichtiger als neue Features."
  },
  "v1-5": {
    label: "Scoped Repair",
    thesis: "V1.5 baut eine zweite Analyse-Brille ein, aber nicht einen zweiten Owner.",
    layers: [
      { title: "Normal Loop", items: ["NEXT_STEP", "Executer", "Validator"] },
      { title: "Failure Trigger", items: ["BLOCKED", "REJECT", "UNCLEAR", "Timeout"] },
      { title: "Repair Review", items: ["Gemini MCP", "Scope bleibt", "Repair oder Samuel"] }
    ],
    deltas: ["Gemini nur Failure", "kein Fanout", "Repair-Vertrag"],
    warning: "Gemini darf analysieren, aber keinen Scope erfinden."
  },
  "v1-6": {
    label: "Two-Lane Join",
    thesis: "V1.6 erhoeht Durchsatz nur dort, wo Unabhaengigkeit beweisbar und der Join kontrolliert ist.",
    layers: [
      { title: "Pair Plan", items: ["Lane A/B", "Unabhaengigkeitsbeweis", "AUTO_EXECUTION_ALLOWED"] },
      { title: "Isolation", items: ["Worktree A", "Worktree B", "Validator je Lane"] },
      { title: "Join Gate", items: ["beide ACCEPT", "PAIR_JOIN_REPORT", "sonst Stop"] }
    ],
    deltas: ["2-Lane Max", "Worktree-Isolation", "Join nach ACCEPT"],
    warning: "Bei Scope-Ueberlappung zurueck zu Single-Step oder Samuel."
  }
};

const PROFILE_DATA = {
  "v1-0": {
    role: "Baseline-Agent / Owner-Gate",
    positioning: "HAI V1.0 wird als erstes Produktprofil gezeigt: ein reproduzierbarer Agenten-Workflow, nicht nur ein loses Profil- und Skill-Buendel.",
    inputs: ["Projektzustand", "IDEA/README-Signale", "Codezustand", "Samuels akzeptierter EXECUTION_STEP"],
    process: "HAI baut eine Artefakt-Kette aus Project State, Idea Spec, Code State, Briefing und NEXT_STEP. Erst nach menschlicher Akzeptanz wird ausgefuehrt.",
    outputs: ["PROJECT_STATE.md", "PROMPT.md", "CODE_STATE.md", "BRIEFING.md", "NEXT_STEP.md", "Validator-Ruecklauf"],
    mentalModel: "Der Nutzer ist Owner, aber braucht eine Scope-Maschine, die aus unklarer Lage einen kleinsten verantwortbaren Schritt macht.",
    changes: ["Erster gesicherter agentischer HAI-Snapshot", "Rollen getrennt: HAI-Agent, Executer, Validator", "Human Gate vor Ausfuehrung etabliert"],
    functions: ["Artefakt-Kette", "EXECUTION_STEP Gate", "read-only Validator", "Change-Log/Commit-Regel nach ACCEPT"],
    governance: "V1.0 darf ausfuehren, aber nicht ohne akzeptierten Step. Produktversprechen: Kontrolle vor Geschwindigkeit."
  },
  "v1-1": {
    role: "Intent-Reader / Wishlist-Agent",
    positioning: "V1.1 positioniert HAI als Agentenprodukt, das Nutzerabsicht breiter erkennt und historische Wunsch-Spuren kontrolliert nutzt.",
    inputs: ["Projektdateien", "idea-aehnliche Intent-Dateien", "PromptGarage read-only", "aktuelle Samuel-Anweisung"],
    process: "Vor dem Briefing wird User-Wishlist-Kontext rekonstruiert. Alte Prompts werden Quellenmaterial, aber nicht neue aktuelle Entscheidung.",
    outputs: ["WISHLIST.md", "breiteres PROMPT.md", "robusteres Briefing", "kanonischer NEXT_STEP"],
    mentalModel: "Der Nutzer hat Absichten ueber Zeit verteilt. HAI darf diese Spuren lesen, muss aber aktuelle Ownership priorisieren.",
    changes: ["hai-user-wishlist in die Pre-Briefing-Kette aufgenommen", "idea-spec liest mehr als nur IDEA/README", "fehlende Standarddateien werden Signal, kein Fehler"],
    functions: ["PromptGarage read-only Rekonstruktion", "Intent Source Discovery", "Wishlist-Artefakt", "Prioritaetsregel: aktuelle Anweisung vor alten Treffern"],
    governance: "V1.1 verhindert Prompt-Archaeologie als Autopilot: Historie erklaert, aber befiehlt nicht."
  },
  "v1-2": {
    role: "Handoff-Agent / Atomisierungsmaschine",
    positioning: "V1.2 zeigt HAI als Produkt, das nicht nur versteht, sondern Uebergaben ausfuehrbar und pruefbar macht.",
    inputs: ["NEXT_STEP.md", "Step-ID", "Allowed Changes", "Executor-/Validator-Reports", "Timeout/No-Report-Signale"],
    process: "Der menschlich knappe Step wird in ein scope-identisches Executor-Handoff uebersetzt; der Loop bekommt explizite Status- und Konfliktzustaende.",
    outputs: ["EXECUTOR_HANDOFF_NEXT_STEP.md", "Step-ID-Abgleich", "Timeout-/No-Report-Status", "archivierter NEXT_STEP-Verlauf"],
    mentalModel: "Der Nutzer will nicht Mikromanagement betreiben; HAI muss beweisen, dass der Agent genau das erlaubte Ding macht.",
    changes: ["Atomizitaets-Gate geschaerft", "Executor-Handoff Skill eingefuehrt", "Execution-Loop mit Status-Gates gehaertet"],
    functions: ["Scope-identisches Handoff", "Step-ID-Konflikterkennung", "Timeout-Gates", "No-Report-Gates"],
    governance: "V1.2 macht Failure sichtbar statt still weiterzulaufen. Unklare Uebergaben werden blockiert oder eskaliert."
  },
  "v1-3": {
    role: "Lifecycle-Bremse / Sinn-Filter",
    positioning: "V1.3 ist die Produktversion, die HAI vom Task-Erzeuger zum Sinn-Filter weiterentwickelt.",
    inputs: ["Briefing", "Projektlebenszyklus", "Human Redirects", "Goal-/Archive-Signale", "Deploy-/Side-Effect-Risiken"],
    process: "Vor dem NEXT_STEP prueft HAI, ob Arbeit ueberhaupt sinnvoll ist: already works, goal reached, event passed, archive/maintain oder Entscheidung noetig.",
    outputs: ["bessere NEXT_STEP-Begruendung", "Lifecycle-Verdict", "Human-Decision-Step", "stale NEXT_STEP Blocking/Refresh"],
    mentalModel: "Der Nutzer ist nicht Auftraggeber fuer Busywork. HAI muss Arbeit stoppen, wenn Stoppen die bessere Produktentscheidung ist.",
    changes: ["hai-explain-better hinzugefuegt", "Lifecycle-Gates eingefuehrt", "Canonical NEXT_STEP Refresh nach Human Redirect"],
    functions: ["ALREADY_WORKS Gate", "GOAL_REACHED Gate", "EVENT_PASSED Gate", "ARCHIVE_OR_MAINTAIN Gate", "Explain-Better"],
    governance: "V1.3 bewertet menschlichen Nutzen vor technischer Machbarkeit. Das Produkt darf korrekt blocken."
  },
  "v1-4": {
    role: "Proof-Run / Produktvalidierung",
    positioning: "V1.4 ist keine neue Runtime, sondern eine Produktvorstellung des Beweises: HAI V1.3 funktioniert auf frischen Projektlagen.",
    inputs: ["drei neue Projektartefakte", "V1.3-Baseline", "Scorecards", "Lifecycle-/Explain-Fokusfragen"],
    process: "Die bestehende Baseline wird gegen neue Projekte evaluiert. Der Wert liegt im Nachweis, nicht im Feature-Ausbau.",
    outputs: ["PASS/BLOCKED_BUT_CORRECT/PASS", "Final Report", "Regressionserkenntnis", "keine Pflichtpatches"],
    mentalModel: "Der Nutzer braucht Vertrauen in die Produktlinie. Eine Version darf ein Beweis sein, nicht nur ein neues Feature.",
    changes: ["Proof-Run als Versionsstufe dokumentiert", "drei reale Projekte evaluiert", "V1.3 als Baseline bestaetigt"],
    functions: ["Generalization Proof", "Lifecycle-Regression", "Human-Payoff-Review", "Stop-Erfolg als Messpunkt"],
    governance: "V1.4 trennt Produktvalidierung von Produktveraenderung. Keine Aenderung ohne Pflichtbefund."
  },
  "v1-5": {
    role: "Repair-Agent / Eskalationsreview",
    positioning: "V1.5 stellt HAI als Produkt mit engem Repair-Kanal vor: mehr Intelligenz bei Failure, aber keine Kontrollabgabe.",
    inputs: ["BLOCKED", "REJECT", "UNCLEAR", "Timeout", "No-Report", "Step-ID-/Finalization-Konflikte"],
    process: "Gemini-MCP wird nur bei Loop-Problemen als Escalation Review genutzt. Gemini darf Repair ausloesen, aber Scope nicht erweitern.",
    outputs: ["GEMINI_ESCALATION_REVIEW_NEXT_STEP", "Repair-Verdict", "dokumentierter Ausfall wenn MCP fehlt", "kanonischer NEXT_STEP bleibt fuehrend"],
    mentalModel: "Der Nutzer akzeptiert Hilfe bei Sackgassen, aber nicht einen zweiten autonomen Entscheider neben sich.",
    changes: ["Gemini-MCP in hai-execution-loop verdrahtet", "NEXT_STEP-Historie verlustfrei gehaertet", "SOUL/Registry auf Repair-Pfad aktualisiert"],
    functions: ["Gemini Failure Review", "Scope-erhaltender Repair", "Archivierte NEXT_STEP-History", "MCP Availability Handling"],
    governance: "V1.5 ist kein Fanout. Repair ist Assistenz im Fehlerfall, nicht ein neuer Autopilot."
  },
  "v1-6": {
    role: "Pair-Agent / Zwei-Lane-Orchestrator",
    positioning: "V1.6 stellt HAI als begrenzt paralleles Agentenprodukt vor: Durchsatz steigt nur, wenn Ownership und Scope beweisbar stabil bleiben.",
    inputs: ["PAIR_PLAN.md", "Lane A/B Kandidaten", "Unabhaengigkeitsbeweis", "Git-Worktree-Isolation", "Validator-ACCEPT pro Lane"],
    process: "HAI darf genau zwei unabhaengige EXECUTION_STEP-Lanes vorbereiten und in isolierten Worktrees ausfuehren; Join erst nach beidseitiger Validierung.",
    outputs: ["PAIR_PLAN.md", "PAIR_STATUS.md", "PAIR_JOIN_REPORT.md", "Lane Reports", "geparkte Restkandidaten"],
    mentalModel: "Der Nutzer will mehr Fluss, aber nicht den Preis von Batch-Chaos. HAI muss beweisen, dass Parallelitaet sicher ist.",
    changes: ["hai-pair-plan eingefuehrt", "hai-pair-execution-loop eingefuehrt", "2-Lane-Limit und Worktree-Grenzen definiert"],
    functions: ["Pair Autonomy Verdict", "Lane A/B Worktrees", "Validator-ACCEPT pro Lane", "Pair Join", "Stop bei Scope-/Taste-/Risk-Fragen"],
    governance: "V1.6 ist maximal zwei Lanes, kein N-Agenten-Fanout. Wenn Unabhaengigkeit nicht beweisbar ist, faellt HAI auf Single-Step oder Samuel zurueck."
  }
};


function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function chips(items, className = "skill-chip") {
  return items.map((item) => `<span class="${className}">${esc(item)}</span>`).join("");
}



function renderAiVisual(visual, id) {
  if (!visual) return "";
  const layers = (visual.layers ?? []).map((layer, layerIndex) => `
    <section class="explain-layer" style="--layer:${layerIndex}">
      <div class="layer-num">${esc(String(layerIndex + 1))}</div>
      <h4>${esc(layer.title)}</h4>
      <ul>${(layer.items ?? []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
    </section>
  `).join("<div class=\"flow-arrow\">→</div>");
  const deltas = (visual.deltas ?? []).map((delta) => `<span>${esc(delta)}</span>`).join("");
  return `<div class="explain-visual">
    <div class="explain-head">
      <span>${esc(id.toUpperCase())}</span>
      <strong>${esc(visual.label)}</strong>
    </div>
    <p class="explain-thesis">${esc(visual.thesis)}</p>
    <div class="explain-flow">${layers}</div>
    <div class="delta-row" aria-label="Was neu ist">${deltas}</div>
    <p class="visual-warning">${esc(visual.warning)}</p>
  </div>`;
}

function sourceLinks(items) {
  return items.map((item) => `<span class="source-link" title="${esc(item.href)}">${esc(item.label)}</span>`).join("");
}

function hrefFor(id) {
  return `./versions/${id}/`;
}

function renderIndex() {
  const evolution = document.querySelector("[data-evolution]");
  const matrix = document.querySelector("[data-matrix]");
  if (!evolution || !matrix) return;

  evolution.innerHTML = ORDER.map((id, index) => {
    const item = VERSION_DATA[id];
    return `
      <a class="process-node" href="${hrefFor(id)}">
        <span class="node-dot">${index + 1}</span>
        <span class="node-number">${esc(item.number)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.oneLine)}</p>
        <span class="node-status">${esc(item.status)}</span>
      </a>
    `;
  }).join("");

  const header = `<tr><th scope="col">Faehigkeit</th>${ORDER.map((id) => `<th scope="col">${esc(VERSION_DATA[id].number)}</th>`).join("")}</tr>`;
  const rows = MATRIX_ROWS.map((row, rowIndex) => `
    <tr>
      <th scope="row">${esc(row)}</th>
      ${ORDER.map((id) => `<td data-version="${esc(VERSION_DATA[id].number)}"><strong>${esc(VERSION_DATA[id].matrix[rowIndex])}</strong></td>`).join("")}
    </tr>
  `).join("");
  matrix.innerHTML = header + rows;
}

function renderVersion() {
  const id = document.body.dataset.version;
  if (!id) return;
  const item = VERSION_DATA[id];
  if (!item) return;
  const profile = PROFILE_DATA[id] ?? {};

  document.title = `${item.number} | HAI Version Dossier`;
  document.querySelectorAll("[data-version-number]").forEach((node) => { node.textContent = item.number; });
  document.querySelectorAll("[data-version-title]").forEach((node) => { node.textContent = item.title; });
  document.querySelectorAll("[data-version-status]").forEach((node) => { node.textContent = item.status; });
  document.querySelectorAll("[data-version-one-line]").forEach((node) => { node.textContent = item.oneLine; });

  const targets = {
    "[data-skillstand]": list(item.skillstand),
    "[data-skill-chain]": chips(item.skills),
    "[data-stand]": esc(item.stand),
    "[data-problem]": esc(item.problem),
    "[data-proposal]": esc(item.proposal),
    "[data-implementation]": esc(item.implementation),
    "[data-test]": esc(item.test),
    "[data-validation-text]": esc(item.validationText),
    "[data-method]": esc(item.method),
    "[data-good]": list(item.good),
    "[data-weak]": list(item.weak),
    "[data-next]": esc(item.next),
    "[data-background]": esc(item.background),
    "[data-proof]": chips(item.proof, "proof-chip"),
    "[data-sources]": sourceLinks(item.sources ?? []),
    "[data-ascii-art]": esc(item.asciiArt ?? ""),
    "[data-story-title]": esc(item.website?.storyTitle ?? ""),
    "[data-story-lead]": esc(item.website?.storyLead ?? ""),
    "[data-story-before]": esc(item.website?.before ?? ""),
    "[data-story-after]": esc(item.website?.after ?? ""),
    "[data-owner-question]": esc(item.website?.ownerQuestion ?? ""),
    "[data-agent-role]": esc(profile.role ?? ""),
    "[data-product-positioning]": esc(profile.positioning ?? ""),
    "[data-system-inputs]": list(profile.inputs ?? []),
    "[data-system-process]": esc(profile.process ?? ""),
    "[data-system-outputs]": list(profile.outputs ?? []),
    "[data-mental-model]": esc(profile.mentalModel ?? ""),
    "[data-version-changes]": list(profile.changes ?? []),
    "[data-version-functions]": list(profile.functions ?? []),
    "[data-profile-governance]": esc(profile.governance ?? "")
  };

  Object.entries(targets).forEach(([selector, html]) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = html;
  });


  const visualNode = document.querySelector("[data-ai-visual]");
  if (visualNode) visualNode.innerHTML = renderAiVisual(VISUAL_DATA[id], id);

  const currentIndex = ORDER.indexOf(id);
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next-link]");
  if (prev && currentIndex > 0) prev.href = `../${ORDER[currentIndex - 1]}/`;
  if (prev && currentIndex === 0) prev.hidden = true;
  if (next && currentIndex < ORDER.length - 1) next.href = `../${ORDER[currentIndex + 1]}/`;
  if (next && currentIndex === ORDER.length - 1) next.hidden = true;
}

renderIndex();
renderVersion();
