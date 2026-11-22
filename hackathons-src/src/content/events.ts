import type { TimelineEvent, Chapter, SiteMeta, DatasetRef } from './schema';

/**
 * Canonical TableSalt documentary chronology.
 * Every entry is backed by files and measurements in the tablesalt repository.
 * Chronological order is by `date`, then `order`.
 */

export const siteMeta: SiteMeta = {
  title: 'TableSalt',
  subtitle:
    'Three hackathon days (20–22 Nov; recorded repo history covers 20–21 Nov up to 19:21), three perspectives and a retrospective, one evolving understanding',
  event: 'lerrai TableSalt OCR Challenge · Campus Founders Batch #9',
  location: 'GRAVITY Heilbronn',
  dates: '20 – 22 November 2026',
  author: 'Samuel Fleig',
  repository: 'https://github.com/smlfg/CFHackathon_OCR_2026',
  thesis:
    'The hackathon was not a straight line from an idea to a solution. It was a sequence of discoveries, wrong assumptions, competing architectures, unexpected results, and increasingly better questions.',
};

export const datasets: DatasetRef[] = [
  {
    id: 'dev',
    name: 'dev',
    size: '24 tables (6 per tier)',
    role: 'Official yardstick. Never trained on.',
    gtVisible: 'Grader only (agents never saw GT)',
    note: 'The fixed measuring stick for the whole project — later found to have been used adaptively together with val96 when developing postprocess.py.',
  },
  {
    id: 'val96',
    name: 'val96',
    size: '96 tables (seed 2)',
    role: 'Generated decision set — used whenever dev would be noise.',
    gtVisible: 'Grader only',
    note: 'Later found to be adaptively used: postprocess.py was developed against dev + val96 together, so neither remained a true holdout.',
  },
  {
    id: 'lab',
    name: 'lab_dev_a / lab_promo / lab_repl_1',
    size: '48 / 120 / 120 tables',
    role: 'Autoresearch lab: exploration, promotion gate, and independent replication sets behind a hidden grader.',
    gtVisible: 'Hidden behind grader.private',
  },
  {
    id: 'ocrbench',
    name: 'OCRBench-v2',
    size: '24 tables',
    role: 'Out-of-distribution stress test — real documents, not generator output.',
    gtVisible: 'External benchmark',
    note: 'Where the generator-trained lexicon turned out to be a liability.',
  },
  {
    id: 'hidden',
    name: 'hidden',
    size: '~96 tables',
    role: 'The organizer’s private evaluation set.',
    gtVisible: 'Organizer only',
    note: 'Never available to the team; the 0.882 TEDS / 0.759 QA figure is reported only, never reproduced locally.',
  },
];

export const events: TimelineEvent[] = [
  // =========================================================================
  // 2026-11-20
  // =========================================================================
  {
    id: 'ev-2026-11-20-repo-init',
    order: 10,
    date: '2026-11-20',
    time: '11:29',
    timestamp: '2026-11-20T11:29:55+01:00',
    timeConfidence: 'exact',
    kicker: 'Repository',
    title: 'An empty repository, opened before the challenge begins',
    summary:
      'The project repository is created with an initial commit at 11:29, thirteen minutes before the "Prepare the challenge" commit at 11:42. The organizer kit — the scoring code, the dataset generator, the evaluation scripts, the submission template, and the 0.348 Tesseract floor — arrives as the first real content.',
    significance: {
      tech: 'The scoring contract is fixed before any modelling starts: score_all.py, evaluate.py and eval_qa.py stay unmodified for the entire hackathon and remain the only source of truth.',
      learning:
        'The very first structural decision was to make the scorer unchangeable, so that every later claim could be checked against a fixed ruler rather than a moving one.',
      narrative:
        'The day did not begin with an idea. It began at 11:29 with a clean Git history, and thirteen minutes later the organiser’s kit arrived: the scorer, the evaluation scripts, the dataset generator. The first two commits contain no model, no pipeline, and no result — they contain a contract. That order was not an accident, and it is the only part of the documented hackathon that never changed.',
      retro:
        'Audit A & B verdict: fixing score_all.py before any modelling is one of the project’s genuine methodological strengths — every later negative result stayed trustworthy because the ruler never moved. What remained missing at day one was a sealed, untouched holdout reserved exclusively for final verification.',
    },
    metrics: [
      {
        label: 'Organizer floor (Tesseract baseline)',
        value: 0.348,
        dataset: 'dev',
        tier: 'all',
        caveat:
          'Reported by the organizer and shipped in the kit; local runs reproduced 0.3410–0.3441 depending on Tesseract build and path.',
      },
    ],
    sources: [
      { kind: 'commit', ref: 'fe0ae9d', label: 'Initial commit', note: '11:29 — organizer kit: generator, scorer, baselines, template' },
      { kind: 'commit', ref: '052a638', label: 'Prepare the challenge', note: '11:42 — requirements, README, submission template' },
    ],
    evidence: 'measured-official',
    commits: ['fe0ae9d', '052a638'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-kickoff-speech',
    order: 20,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Kick-off',
    title: '"Sounds like an OCR problem. It isn’t."',
    summary:
      'Before any measurement, the intended approach is written down: do not train a new OCR model. Run existing pipelines — Docling, Surya, PaddleOCR — on identical test tables, measure cell-assignment and number errors, and build a validation layer that flags uncertain extractions instead of guessing. One question is named as deciding the whole design: is the bottleneck OCR quality, table structure, or LLM reliability?',
    significance: {
      tech: 'A pre-registration of intent: measurement first, no new model, validation over guessing. Three candidates named before any benchmark existed (Surya never entered the codebase; Docling and PaddleOCR later appeared on the 28-model board).',
      learning:
        'The core insight is stated before there is any evidence for it: recognizing characters is the easy part, keeping the structure is the hard part. Flattening a table into a text stream keeps every number but destroys which number belongs to which label — two dimensions squeezed into one is lossy.',
      narrative:
        'Prepared in two languages before anything was measured — the exact hour of the kick-off call is not recorded in the repo, only that it took place on 20 November before the 18:20 commit. The talk refused the framing of the title ("Sounds like an OCR problem. It isn’t.") and named a validation layer that admits uncertainty instead of guessing. Sixty hours later, that ambition returns as the question the hackathon ends on.',
      retro:
        'Audit D identifies this pre-commit speech note as the strongest evidence of Samuel Fleig’s personal conceptual ownership: the 2D→1D loss argument and the three-way bottleneck question were written before any agent run existed, not reconstructed after the fact.',
    },
    learning: {
      thought:
        'Before anything was measured I held the model that recognition is trivial and layout is the problem: “Recognizing the characters is the easy part. Keeping the structure is the hard part.” I expected the bottleneck to be merged cells and multi-level headers, and I planned to answer it by running existing pipelines on identical test tables and building “a validation layer that flags uncertain extractions instead of guessing”.',
      observed:
        'The claim survived, but in a narrower form than I stated it. The oracle experiment paired TATR’s grid with ground-truth text and reached weighted TEDS 0.9365 with 23 of 24 shapes exactly right — a structure ceiling below the 0.9672 TEDS-weighted a VLM already reached end to end with real text. On the fax tier the same grid scored 0.946 with oracle text and 0.623 with Tesseract text. The kick-off’s three-way question (OCR quality, table structure, LLM reliability) resolved to the first; the third was never tested at all, because no LLM sits in the pipeline.',
      understood:
        'Structure and text are separable costs, and pairing a structure model with perfect text is the instrument that separates them — it answers “is the grid wrong or are the characters wrong?” in one run. The two-dimensional claim is right, but it is not about structure being intrinsically hard: it is about a 1-D text stream losing the row/column relation, which the collapsed-header case shows exactly (every character correct, “Plan” + “Q1” fused into “Plan Q1”, the meaning gone). What actually cost us was not a missing grid — it was a wrong character, a wrong dash, a wrong number separator.',
      question:
        'If structure is not the bottleneck and text is, does the validation layer I promised need a model, or can it be a deterministic checker over generator-shaped rules? The answer, sixty hours later, was “no model” — but only after the rules were written by hand.',
    },
    metrics: [],
    sources: [
      {
        kind: 'file',
        ref: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
        label: 'Kick-off speech (EN + DE)',
        note: 'Prepared talk, dated 2026-11-20, GRAVITY Heilbronn',
      },
    ],
    evidence: 'documented',
    commits: ['8504ca8'],
    branches: ['main'],
    quotes: [
      {
        text: 'The challenge is called Robust Table OCR for LLM Consumption. Sounds like an OCR problem. It isn’t.',
        context: 'Opening line of the prepared kick-off talk',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'Recognizing the characters is the easy part. Keeping the structure is the hard part.',
        context: 'Core premise of the prepared talk, stated before any measurement existed',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'A tax form has merged cells, multi-level headers, numbers that belong to exactly one row and one column. Flatten that into a stream of text and the numbers are all still there — but the model no longer knows which number belongs to which label. One wrong cell assignment and the answer is confidently wrong.',
        context: 'Why 2D table layout cannot be flattened without losing meaning',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'It’s the same problem I hit with my Algebra agent. The model reads every symbol correctly and still loses the meaning, because the meaning lives in the layout: which step belongs to which line, what lines up with the equals sign. Two dimensions squeezed into one is lossy.',
        context: 'The personal analogy the talk uses to motivate the claim — an earlier project, not this one',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'Concretely: I don’t want to train a new OCR model. I’d run two existing pipelines — Docling, Surya, PaddleOCR — on identical test tables, measure cell-assignment and number errors, and build a validation layer that flags uncertain extractions instead of guessing.',
        context: 'The pre-registered plan: measurement, not training, plus a validation layer',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'And one question decides the whole design: is the real bottleneck OCR quality, table structure, or LLM reliability? Those are three different engineering problems.',
        context: 'The question posed before implementation',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: 'Also nicht Bild → OCR → Text → LLM, sondern Bild → Erkennung → strukturierte Zwischenrepräsentation → Validierung → LLM.',
        context:
          'German version of the architecture claim [So not image → OCR → text → LLM, but image → recognition → structured intermediate representation → validation → LLM.]',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
      {
        text: '2D → 1D ist verlustbehaftet.',
        context: 'German summary of the two-dimensional argument [2D → 1D is lossy.]',
        source: 'samuelthoughts/2026-11-20-lerrai-table-ocr-speech.md',
      },
    ],
    feature: 'breakthrough',
  },
  {
    id: 'ev-2026-11-20-organizer-constraints',
    order: 30,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Rules',
    title: 'The organizer sets the trap before anyone writes code',
    summary:
      'The kick-off rules and hidden-set constraints are documented in PROBLEM.md §6 & §8: 24 open dev tables against ~96 hidden test tables, an explicit warning not to overfit to the open set, and surprises in the hidden suite including PDF inputs and pages with text around the table. Every solution must run offline inside Docker from the repo root on an RTX 4070 laptop (8 GB VRAM, ≤ 15 GB image, ≤ 15 s/table), with intermediate results and documented reasoning distinguishing approaches.',
    significance: {
      tech: 'Every constraint that later bound the engineering was stated in the first fifteen minutes: offline, open-weight models, RTX 4070 with 8 GB VRAM, 15 s/table, image <= 15 GB, 5 min startup, Docker from the repo root, and a possible PDF or text-around-table input that the loader must survive.',
      learning:
        'The overfitting trap was named before the first model was downloaded. Knowing that the open set would be used for training is a different situation from discovering it afterwards — the difference is whether you can design your validation process around it.',
      narrative:
        'The most consequential fifteen minutes of the hackathon contain no code at all. What happens next — a second validation set, an error registry, a promotion gate with a hidden replication set — is a direct response to the warning issued on day one.',
    },
    metrics: [
      { label: 'Time budget per table', value: 15, unit: 's/table', dataset: 'challenge contract' },
      { label: 'VRAM ceiling', value: 8, unit: 'GB', dataset: 'challenge contract' },
      { label: 'Container image limit', value: 15, unit: 'GB', dataset: 'challenge contract' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/transcript.raw.txt', label: 'Kick-off transcript (raw)', note: 'Hidden-set warning, PDF/text-around-table, Docker and laptop constraints' },
      { kind: 'doc', ref: 'challenge/PROBLEM.md', label: 'PROBLEM.md §6 & §8 — Hard constraints & hidden-set traps', note: 'Traps and hardware limits transcribed from the transcript' },
      { kind: 'file', ref: 'challenge/TRANSCRIPT.md', label: 'TRANSCRIPT.md', note: 'Cleaned-up version of the same session' },
    ],
    evidence: 'documented',
    commits: ['8504ca8'],
    branches: ['main'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-problem-framed',
    order: 40,
    date: '2026-11-20',
    time: '18:20',
    timestamp: '2026-11-20T18:20:07+01:00',
    timeConfidence: 'exact',
    kicker: 'Framing',
    title: 'The challenge is written down as a structured problem',
    summary:
      'The kick-off transcript and a structured problem statement are committed. PROBLEM.md decomposes the challenge into three independent failure axes (degradation, structure, content), fixes the scoring formula FINAL = 0.85 × tier-weighted TEDS + 0.15 × QA (with T2+T3 carrying 70% of TEDS weight), and defines seven open engineering decisions — structure approach, text engine, preprocessing depth, post-processing, fine-tuning, output format, and fallback ladder.',
    significance: {
      tech: 'The three-axis decomposition (degradation / structure / content) and seven open decisions become the project’s spine. Every later ADR closes one of them with evidence attached.',
      learning:
        'Writing the questions down before choosing an architecture is what makes the later reversals legible. You can only see an assumption change if you recorded the assumption.',
      narrative:
        'At 18:20, the kick-off briefing is turned into a structured specification. Before a single model is downloaded, the challenge has three failure axes, a scoring contract weighted 70% toward degraded tiers, and seven open engineering decisions.',
    },
    metrics: [
      { label: 'TEDS weight in FINAL', value: 0.85, dataset: 'scoring contract' },
      { label: 'QA weight in FINAL', value: 0.15, dataset: 'scoring contract' },
      { label: 'T2 + T3 share of TEDS weight', value: 0.7, dataset: 'scoring contract', caveat: 'T0=0.1, T1=0.2, T2=0.3, T3=0.4' },
    ],
    sources: [
      { kind: 'commit', ref: '8504ca8', label: 'Add challenge folder: kick-off transcript and structured problem' },
      { kind: 'file', ref: 'challenge/PROBLEM.md', label: 'PROBLEM.md', note: 'Three axes, I/O contract, scoring formula, hard constraints' },
      { kind: 'file', ref: 'challenge/TRANSCRIPT.md', label: 'TRANSCRIPT.md', note: 'Kick-off transcript' },
    ],
    evidence: 'documented',
    commits: ['8504ca8'],
    branches: ['main'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-method-written',
    order: 50,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Method',
    title: '"Every step produces a number, not an opinion"',
    summary:
      'A five-milestone plan is written before the first measurement: M0 establish the floor on our own hardware, M1 understand the failures rather than the pipeline, M2 build a validation set that can carry decisions, M3 architecture one seam at a time, M4 the container exactly as it will be run, M5 show the work. The rule is stated up front — nothing enters the pipeline that did not move a number or fix a named error class.',
    significance: {
      tech: 'The plan predicts the shape of the whole repository: M1’s acceptance criterion is "a ranked list of the 3 error classes that cost the most score" (which becomes ERRORS.md), M4 is the container recipe (which becomes the submission), and M5 names ERRORS.md, MEASUREMENTS.md and DECISIONS.md as deliverables.',
      learning:
        'The plan is also the answer to the demand for a visible reasoning trail. A method that produces a ledger is what makes a two-day project reconstructable afterwards — including the parts that failed.',
      narrative:
        'Long before there was anything to show, there was a rule for showing it: every step produces a number, not an opinion, and nothing enters the pipeline without moving a metric or fixing a named error class. The project stayed legible afterwards because of a page written on day one.',
      retro:
        'Audit A notes that M0–M5 were largely upheld on paper, yet M3’s architecture choice diverged from reality: the winning CPU pipeline arrived on a separate line and the final selection rationale (ADR-017) was only written retrospectively on Day 3.',
    },
    metrics: [],
    sources: [
      { kind: 'file', ref: 'challenge/PLAN.md', label: 'PLAN.md — M0 to M5, risk register, definition of done', note: 'Committed with the challenge folder' },
      { kind: 'doc', ref: 'challenge/PROBLEM.md', label: 'PROBLEM.md §7 — What actually wins', note: 'Why the plan takes this shape' },
    ],
    evidence: 'documented',
    commits: ['8504ca8'],
    branches: ['main'],
    quotes: [
      {
        text: 'Order of work for the TableSalt challenge. Rule of the whole plan: every step produces a number, not an opinion.',
        context: 'Opening of the preparation plan',
        source: 'challenge/PLAN.md:3',
      },
      {
        text: 'Nothing gets added to the pipeline that did not move a number or fix a named error class.',
        context: 'Gate rule in the preparation plan',
        source: 'challenge/PLAN.md:5',
      },
      {
        text: 'Someone else can read the three files and rebuild our reasoning without asking us.',
        context: 'Acceptance criterion for M5 (ERRORS.md, MEASUREMENTS.md, DECISIONS.md)',
        source: 'challenge/PLAN.md:119',
      },
    ],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-vlm-board',
    order: 60,
    date: '2026-11-20',
    time: '20:09',
    timestamp: '2026-11-20T20:09:03+01:00',
    timeConfidence: 'exact',
    kicker: 'Instrumentation',
    title: 'Offline gallery and the evaluation harness behind the model board',
    summary:
      'Two commits land within the same minute: an offline gallery putting image, ground truth, and cell-level prediction diff side by side, and the OCR evaluation pipeline (model registry, converter, runner, metrics store, leaderboard). Inference runs on the host over HTTP while the container handles orchestration, conversion, scoring, and storage. Temperature 0, one image per request, prompt text and hash stored per run.',
    significance: {
      tech: 'This is the infrastructure decision that makes every later comparison legitimate: one converter, one scorer, one metrics store. An adapter gate (>20% non-converting tables or median <2 cells) prevents converter bugs from masquerading as bad models, and `pipeline/board.py verify` recomputes every stored run with the official scorer (0 drifted). The board started at 23 scored runs and later grew to 28 when four unmeasured candidates were scored (four further models failed to load and are listed as "not scored").',
      learning:
        'A leaderboard you did not build yourself is a leaderboard you cannot debug. Comparability is an engineering property: the board and the scorer had to come from one codebase.',
      narrative:
        'By 20:09 the project had a model registry, an evaluation harness, and an offline gallery putting image, ground truth, and cell-level prediction diff side by side. This was the moment the subject stopped being an idea and became a table of rows — because a table of rows is a thing that can be argued with. Twenty-eight scored runs would eventually fill it; the scorer would never change.',
    },
    metrics: [
      {
        label: 'Models scored on dev board',
        value: 28,
        unit: 'runs',
        dataset: 'dev',
        tier: 'all',
        caveat:
          'Started at 23 rows on 2026-11-20/21 and grew to 28 when PP-Structure, img2table, Docling toolkit, and Camelot were scored (plus 4 models that failed to load).',
      },
      {
        label: 'Best raw dev FINAL on the board (MinerU2.5 1.2B)',
        value: 0.9659,
        dataset: 'dev',
        tier: 'all',
        direction: 'up',
        caveat: 'Official scorer, official dev set, raw model + OTSL converter, no post-processing.',
      },
    ],
    sources: [
      { kind: 'commit', ref: '7e0d32b', label: 'Add VLM OCR pipeline, model registry and evaluation scripts' },
      { kind: 'commit', ref: 'a0b9c1c', label: 'Add offline gallery: dataset, ground truth and cell-level prediction diff' },
      { kind: 'file', ref: 'pipeline/README.md', label: 'pipeline/README.md', note: 'Orchestration vs inference split, adapter gate, fairness rules, output dialects' },
      { kind: 'file', ref: 'registry/models.json', label: 'registry/models.json', note: 'Model registry' },
      { kind: 'file', ref: 'metrics/LEADERBOARD.md', label: 'metrics/LEADERBOARD.md', note: 'Scored dev board with objective decomposition' },
      { kind: 'file', ref: 'gallery.py', label: 'gallery.py', note: 'Offline gallery generator' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b', 'a0b9c1c'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-tatr-fusion',
    order: 70,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Structure model',
    title: 'Tesseract floor, then TATR recovers from a 0.08 fax collapse with two lines outside the model',
    summary:
      'The classical floor is measured first: Tesseract 5.5.3 on dev scores FINAL 0.3417 — below the organizer’s published 0.348, later traced to a double JPEG re-encode before pytesseract. Table Transformer (TATR, 28.8M params, DETR ResNet-18) is then evaluated: as-is structure scores weighted TEDS 0.589 because T3 (fax) collapses to 0.083 from duplicate row/column boxes on speckle. Adding a 3×3 median filter and greedy NMS (IoU 0.3) lifts T3 structure to 0.946 (weighted TEDS 0.9365 with oracle text, 23/24 shapes exact), while entropy deskew costs 0.21 TEDS on T2 and is dropped. Paired with per-cell Tesseract, TATR reaches FINAL 0.6608 on dev (T0 0.831, T1 0.877, T2 0.738, T3 0.623, QA 0.275, weighted TEDS 0.7289).',
    significance: {
      tech: 'The defect in T3 was duplicate detections on sensor noise, not capacity, resolution, or skew — fixed outside the weights with a pre-filter and post-filter. Yet even patched, TATR + Tesseract leaves a massive gap between T3 structure (0.946) and T3 end-to-end (0.623): text, not structure, turns out to be the binding constraint.',
      learning:
        'When a model fails catastrophically on one tier, the cheap first question is whether the failure is the model or the input contract. And a single aggregate number hides which tier breaks.',
      narrative:
        'First real progress: Table Transformer with Tesseract reading each cell hit FINAL 0.6608 on dev, almost double the 0.3417 floor, after a 3×3 median filter and NMS 0.3 lifted T3 structure from 0.083 to 0.946 without touching a weight. Yet the per-tier spread told a different story — T1 at 0.877, T3 at 0.623, QA stuck at 0.275 — the first hint that doubling the score was not doubling the understanding.',
    },
    learning: {
      thought:
        'When Table Transformer collapsed on T3 (fax) to 0.083 weighted TEDS, the natural assumption was that fax noise broke the detector’s representations or that tilted tables needed geometric deskewing first.',
      observed:
        'Adding unconditional entropy deskew cost −0.21 TEDS on T2 and was dropped. Meanwhile, inspecting T3 predictions showed duplicate row and column boxes triggered by sensor speckle; adding a 3×3 median filter plus greedy NMS (IoU 0.3) lifted T3 structure from 0.083 to 0.946 (weighted TEDS 0.9365 overall with oracle text). Paired with per-cell Tesseract, dev FINAL reached 0.6608 — yet T3 ended at 0.623 and QA at 0.275.',
      understood:
        'A catastrophic tier collapse is not automatically a model capacity failure — here it was duplicate detections on speckle, fixed outside the weights in two lines, while blind deskew actively damaged upright T2 images. More importantly, even a 0.946 structure grid only reached 0.623 end-to-end on T3, pointing straight to per-cell OCR as the real leak.',
      question:
        'If TATR’s grid already reaches 0.946 on fax tables with ground-truth text, is structure solved well enough — or does an end-to-end VLM beat even TATR’s oracle ceiling?',
    },
    metrics: [
      { label: 'Tesseract floor', value: 0.3417, dataset: 'dev', tier: 'all', caveat: 'Local host Tesseract 5.5.3; organizer published 0.348' },
      { label: 'Weighted TEDS, TATR as-is (oracle text)', value: 0.589, dataset: 'dev', tier: 'all', caveat: 'Structure only with GT text, measured via evaluate.py TEDS (no QA term).' },
      { label: 'T3 weighted TEDS, TATR as-is (oracle text)', value: 0.083, dataset: 'dev', tier: 'T3', caveat: 'Fax tier collapse from duplicate row/column boxes on speckle.' },
      { label: 'T3 weighted TEDS, + 3×3 median + NMS 0.3', value: 0.946, dataset: 'dev', tier: 'T3', baseline: 0.083, delta: '+0.863', direction: 'up', caveat: 'Oracle text — structure ceiling only.' },
      { label: 'Entropy deskew cost on T2', value: -0.21, unit: 'TEDS', dataset: 'dev', tier: 'T2', caveat: 'Cost of unconditional deskew on upright images.' },
      { label: 'Structure-only runtime', value: '0.08–0.17', unit: 's/table', dataset: 'dev', tier: 'all', caveat: 'MPS structure inference only, excluding per-cell OCR.' },
      { label: 'TATR + Tesseract per cell, FINAL', value: 0.6608, dataset: 'dev', baseline: 0.3417, delta: '+0.3191', direction: 'up', tier: 'all' },
      { label: 'TATR + Tesseract, T3', value: 0.623, dataset: 'dev', tier: 'T3' },
      { label: 'TATR + Tesseract, T1', value: 0.877, dataset: 'dev', tier: 'T1' },
      { label: 'TATR + Tesseract, QA', value: 0.275, dataset: 'dev', tier: 'all' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — TATR + Tesseract row', note: 'FINAL 0.6608 on dev' },
      { kind: 'file', ref: 'scripts/tatr_experiment.py', label: 'scripts/tatr_experiment.py', note: 'Measurement script for rows A–D' },
      { kind: 'doc', ref: 'challenge/TATR_RESEARCH.md', label: 'TATR_RESEARCH.md §6', note: 'Per-tier A/B/C/C’/D table and shape counts' },
      { kind: 'external', ref: 'https://github.com/microsoft/table-transformer', label: 'microsoft/table-transformer', note: '28.8M params, 110 MB, MIT' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    artifacts: ['challenge/TATR_RESEARCH.md', 'scripts/tatr_experiment.py'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-baseline-reproduction',
    order: 80,
    date: '2026-11-20',
    time: '22:54',
    timestamp: '2026-11-20T22:54:46Z',
    timeConfidence: 'exact',
    kicker: 'B1',
    title: 'The floor is reproduced on our own hardware',
    summary:
      'A baseline reproduction run records its own conditions in the header: git 7e0d32b+dirty, Tesseract 5.5.3, host M3 Max, scorer unchanged. The floor scores 0.3417 on dev and 0.3082 on val96; TATR + Tesseract scores 0.6608 on dev and 0.6173 on val96. The gap between the two splits for the same configuration is 0.044 — and the same run shows dev overstates the floor by 0.034.',
    significance: {
      tech: 'First rigorous, reproducible baseline block: two datasets, one scorer, one machine, wall-clock recorded (105 s for 24 tables, 501 s for 96). The organizer’s published 0.348 is not reproduced on this hardware — 0.3417 — which is recorded rather than rounded away.',
      learning:
        'Running the same configuration on two datasets immediately shows which conclusions belong to the data and which belong to the configuration. The TATR parameters (nms 0.3, denoise) were chosen on dev; on val96 they lose 0.044. Winner’s curse, visible in one afternoon.',
      narrative:
        'Late on the first night (22:54 UTC), the floor is measured honestly against itself on local hardware. Tesseract scores 0.3417 on dev against the published 0.348 (a gap later traced to a double JPEG re-encode), and TATR + Tesseract drops from 0.6608 on dev to 0.6173 on val96. The discrepancy is written into the ledger rather than rounded away.',
    },
    learning: {
      thought:
        'I treated the published 0.348 floor as a fixed constant and assumed parameters picked on the 24-table dev set (NMS 0.3, denoise) would hold unchanged on a larger synthetic split from the same generator.',
      observed:
        'On local hardware (M3 Max, Tesseract 5.5.3), the floor reproduced at 0.3417 on dev and 0.3082 on val96 (96 tables). TATR + Tesseract scored 0.6608 on dev and 0.6173 on val96 — a 0.044 drop between two splits from the same generator.',
      understood:
        'A 24-table dev set (6 tables per tier) flatters both baselines and tuned parameters: dev overstated the Tesseract floor by 0.034 and overstated TATR + Tesseract by 0.044. Every decision needs a larger split, and hardware/build discrepancies belong in the ledger.',
      question:
        'If 0.6608 already drops to 0.6173 on val96, how much of TATR’s limitation is the grid itself versus Tesseract failing inside every cropped cell?',
    },
    metrics: [
      { label: 'Tesseract floor', value: 0.3417, dataset: 'dev', caveat: 'Local host Tesseract 5.5.3; organizer published 0.348' },
      { label: 'Tesseract floor', value: 0.3082, dataset: 'val96' },
      { label: 'TATR + Tesseract', value: 0.6608, dataset: 'dev' },
      { label: 'TATR + Tesseract', value: 0.6173, dataset: 'val96', baseline: 0.6608, delta: '-0.044', direction: 'down' },
      { label: 'Wall clock', value: 105, unit: 's for 24 tables', dataset: 'dev' },
      { label: 'Wall clock', value: 501, unit: 's for 96 tables', dataset: 'val96' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/autoresearch/runs/b1_baselines.txt', label: 'B1 baseline reproduction', note: 'Header records git sha, Tesseract version, host, scorer' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-20-structure-ceiling',
    order: 90,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'The decisive experiment',
    title: 'Oracle text vs. real OCR: the structure ceiling is lower than the VLM',
    summary:
      'The identical TATR grid is filled two ways: with ground-truth text (oracle) and with per-cell Tesseract. Oracle: weighted TEDS 0.9365, 23/24 shapes exact (residual spanning-cell error −0.015 TEDS between row C’ 0.9217 and row C 0.9365). With Tesseract text: weighted TEDS 0.7289, FINAL 0.6608 (T3 0.623). Meanwhile MinerU2.5 1.2B delivers 0.9672 TEDS_w (0.9659 FINAL) end to end. ADR-001 accepts TATR as a validator candidate, not a primary model.',
    significance: {
      tech: 'One grid, two text sources, a 0.21 TEDS gap. ADR-001 closes the architecture question: on the degraded tiers, "OCR quality or table structure?" had a measured answer — text (0.946 → 0.623 on T3). The structure model stays as a cheap validator, never as the primary model.',
      learning:
        'An oracle counterfactual separates two failure causes that look identical from outside. Running the structure model with perfect text answers a question the aggregate score cannot: is the grid wrong, or are the characters wrong?',
      narrative:
        'The decisive experiment was designed to fail in an interesting way: keep TATR’s grid and substitute ground-truth text. If the grid were the bottleneck, the score would jump past everything else. It stopped at weighted TEDS 0.9365 (23/24 shapes exact) — below what a 1.2B VLM already reached end to end with real text — and on T3 the split was stark (0.946 oracle vs 0.623 Tesseract). ADR-001 recorded the verdict in one line: "Structure is not our bottleneck; text is."',
      retro:
        'Audit B & D highlight ADR-001 as genuine scientific reasoning: pricing the oracle ceiling killed a flawed primary architecture early. However, Audit D notes that while the diagnostic reasoning is personally evidenced, the underlying TATR modeling and fusion scripts still need personal from-scratch mastery.',
    },
    learning: {
      thought:
        'I expected the structure work to be the expensive part and the OCR to be a solved, interchangeable component. If the grid is right, the rest is a character recogniser and a known-good one is already available. Under that model, the order of work is obvious: get the grid right first, plug in the best OCR afterwards.',
      observed:
        'The grid was right — and that was the problem. With ground-truth text the TATR grid reached weighted TEDS 0.9365 with 23 of 24 shapes exactly right; with Tesseract text the same grid reached weighted TEDS 0.7289 / FINAL 0.6608 on dev and 0.6173 on val96. On the fax tier the gap was largest and clearest: 0.946 structure with oracle text, 0.623 with real text. The dedicated structure model turned out to sit below the VLM’s own structure, which already delivered 0.9672 TEDS-weighted end to end with real text.',
      understood:
        'A structure specialist is not automatically a good structure component — it has to beat what the text model already does, and here it did not. ADR-001 therefore keeps TATR as a validator, not a replacement. The deeper lesson is about how to attribute a loss: the aggregate score cannot tell you whether a table failed because the grid was wrong or because a character was wrong, and those two causes call for completely different work. The oracle-text run is the cheapest way to separate them, and it is worth running before optimising anything.',
      question:
        'If the structure model is not the answer, what is it for? It became a validator on the VLM’s HTML, and later a second opinion. Is a validator that only says “no” better than a component that says “yes”?',
    },
    metrics: [
      {
        label: 'TATR grid + GT text (ORACLE), weighted TEDS',
        value: 0.9365,
        unit: 'TEDS_w',
        dataset: 'dev',
        tier: 'all',
        caveat: 'ORACLE: ground-truth text substituted for OCR — a ceiling, not a submission.',
      },
      {
        label: 'TATR grid + Tesseract per cell, weighted TEDS',
        value: 0.7289,
        dataset: 'dev',
        tier: 'all',
        baseline: 0.9365,
        delta: -0.2076,
        direction: 'down',
        caveat: 'Identical grid to the oracle row; the only difference is the text source.',
      },
      {
        label: 'TATR grid + Tesseract per cell, FINAL',
        value: 0.6608,
        dataset: 'dev',
        tier: 'all',
        baseline: 0.9365,
        delta: -0.2757,
        direction: 'down',
        caveat: 'QA 0.275, CellF1 0.4966.',
      },
      {
        label: 'VLM end-to-end (MinerU2.5), FINAL',
        value: 0.9659,
        dataset: 'dev',
        tier: 'all',
        baseline: 0.6608,
        delta: '+0.3051',
        direction: 'up',
        caveat: 'Different system, same dev set and official scorer.',
      },
      { label: 'Shapes exactly right', value: '23/24', dataset: 'dev', caveat: 'Shape only; oracle text.' },
      { label: 'Residual spanning-cell error (row C’ vs C)', value: -0.015, unit: 'TEDS', dataset: 'dev', tier: 'all', caveat: '0.9217 without spans vs 0.9365 with spans.' },
      { label: 'T3 structure before / after denoise + NMS', value: '0.083 → 0.946', dataset: 'dev', tier: 'T3' },
      { label: 'TATR + Tesseract text, T3', value: 0.623, dataset: 'dev', tier: 'T3' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/DECISIONS.md', label: 'ADR-001 — Table Transformer as structure specialist', note: 'Choice C (validator, not replacement), evidence and revisit condition' },
      { kind: 'doc', ref: 'challenge/TATR_RESEARCH.md', label: 'TATR_RESEARCH.md §6', note: 'Rows C vs D (oracle 0.9365 vs Tesseract 0.7289)' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — oracle text row' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    quotes: [
      {
        text: 'Structure is not our bottleneck; text is (0.946 → 0.623 on T3).',
        context: 'ADR-001, Evidence — the conclusion that reorganised the whole pipeline',
        source: 'challenge/DECISIONS.md',
      },
      {
        text: 'The speed ceiling for this pipeline is set by the OCR stage, not by TATR.',
        context: 'ADR-003, Evidence — the same asymmetry, found a second time on the time axis',
        source: 'challenge/DECISIONS.md',
      },
    ],
    diagram: {
      kind: 'architecture',
      title: 'G1 · One structure model, two text sources (ADR-001)',
      caption:
        'The oracle-text ceiling experiment. The grid is identical in both arms; only the text source changes. The gap between the two arms is the cost of OCR quality, measured with everything else held constant.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'patch', label: 'median3 denoise + NMS 0.3', detail: 'patches duplicate detections on fax speckle', kind: 'process', changed: true },
        { id: 'tatr', label: 'TATR structure (28.8M)', detail: 'DETR / ResNet-18, MaxResize 1000, threshold 0.5', kind: 'model', changed: true },
        { id: 'grid', label: 'Rows × cols grid + spans', detail: 'cells = row ∩ column minus spanning subcells', kind: 'process' },
        { id: 'oracle', label: 'Ground-truth text', detail: 'ORACLE — not achievable', kind: 'model', changed: true },
        { id: 'tess', label: 'Tesseract per cell', detail: 'deu+eng, psm 6/7', kind: 'model', changed: true },
        { id: 'f-oracle', label: 'TEDS_w 0.9365', detail: 'oracle arm', kind: 'metric', changed: true },
        { id: 'f-tess', label: 'FINAL 0.6608', detail: 'Tesseract-text arm (TEDS_w 0.7289)', kind: 'metric', changed: true },
        { id: 'f-vlm', label: 'VLM FINAL 0.9659', detail: 'end-to-end reference', kind: 'metric' },
      ],
      edges: [
        { from: 'img', to: 'patch' },
        { from: 'patch', to: 'tatr' },
        { from: 'tatr', to: 'grid' },
        { from: 'grid', to: 'oracle', label: 'arm A' },
        { from: 'grid', to: 'tess', label: 'arm B' },
        { from: 'oracle', to: 'f-oracle' },
        { from: 'tess', to: 'f-tess' },
        { from: 'f-oracle', to: 'f-vlm', label: 'both below VLM line' },
      ],
    },
    feature: 'reversal',
  },
  {
    id: 'ev-2026-11-20-mineru-vlm',
    order: 100,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'End-to-end VLM (G2)',
    title: 'MinerU2.5 1.2B clears the structure ceiling in one pass',
    summary:
      'A 1.2B-parameter vision-language model (bf16), run over MLX at native resolution (`max_edge=0`, prompt "Table Recognition:"), emits OTSL tokens converted to cells by `pipeline/convert.py`. It scores FINAL 0.9659 on dev (T0 0.959, T1 0.992, T2 0.956, T3 0.966, QA 0.958, CellF1 0.9369) at 2.56 s/table and 0.9621 on val96 (seed 2: T0 0.986, T1 0.975, T2 0.945, T3 0.963, QA 0.960) at 2.33 s/table — overtaking the hand-built classical pipeline.',
    significance: {
      tech: 'The architecture collapsed from "structure model + OCR model + assembler" to "one model + converter" (G2). Because the input is already a cropped single table, MinerU2.5 runs in stage II of its own pipeline (no layout stage), and OTSL encodes spans as tokens (`fcel`/`lcel`/`ucel`/`xcel`). Crucially, "raw" 0.9659 already depends on our OTSL-to-cell footprinting converter.',
      learning:
        'The right question about a model is not "is it good?" but "which of its stages do we actually need?" And "raw model output" is half converter.',
      narrative:
        'On the same night, a 1.2B-parameter vision-language model that had never been trained specifically for these tables scored 0.9659 on dev and 0.9621 on val96 at ~2.5 seconds per table. The multi-stage structure-plus-OCR plan written that morning had been overtaken by evening — not because the classical argument was illogical, but because an end-to-end Stage II VLM plus an OTSL converter solved both halves at once.',
    },
    learning: {
      thought:
        'I expected a dedicated structure detector paired with per-cell OCR (or an off-the-shelf document toolkit) to beat small VLMs on structured table extraction, and I did not expect a 1.2B VLM to clear the hardware and speed budgets.',
      observed:
        'Running MinerU2.5 1.2B (bf16, native resolution, prompt "Table Recognition:") directly as Stage II on cropped tables produced dev FINAL 0.9659 (TEDS_w 0.9672, QA 0.9583, 2.56 s/table) and val96 FINAL 0.9621 (2.33 s/table) — with `pipeline/convert.py` resolving OTSL span tokens (`fcel`/`lcel`/`ucel`/`xcel`) into cells.',
      understood:
        'When inputs are already cropped tables, skipping Stage I layout detection turns a full document pipeline into one focused Stage II call — and what looks like "raw model performance" is jointly the model plus the OTSL-to-cell converter.',
      question:
        'Where do the remaining ~3.5 points of loss on dev and val96 sit — inside the VLM’s character predictions, or in fax degradation that image preprocessing could clean up first?',
    },
    metrics: [
      { label: 'MinerU2.5 1.2B raw, FINAL', value: 0.9659, dataset: 'dev', tier: 'all', direction: 'up', caveat: 'Official scorer; includes our OTSL converter, no post-processing.' },
      { label: 'MinerU2.5 1.2B raw, FINAL', value: 0.9621, dataset: 'val96', tier: 'all', baseline: 0.9659, delta: '-0.0038', direction: 'down', caveat: 'Generated 96-table set (seed 2), official scorer.' },
      { label: 'TEDS_w', value: 0.9672, dataset: 'dev', tier: 'all' },
      { label: 'TEDS_w', value: 0.9623, dataset: 'val96', tier: 'all' },
      { label: 'CellF1', value: 0.9369, dataset: 'dev', tier: 'all' },
      { label: 'CellF1', value: 0.9356, dataset: 'val96', tier: 'all' },
      { label: 'QA accuracy', value: 0.9583, dataset: 'dev', tier: 'all' },
      { label: 'QA accuracy', value: 0.9604, dataset: 'val96', tier: 'all' },
      { label: 'T0 / T1 / T2 / T3', value: '0.959 / 0.992 / 0.956 / 0.966', dataset: 'dev', tier: 'all' },
      { label: 'T3 weighted TEDS', value: 0.9632, dataset: 'val96', tier: 'T3' },
      { label: 'Runtime (dev)', value: 2.56, unit: 's/table', dataset: 'dev', caveat: 'runs.jsonl and MEASUREMENTS.md say 2.56; LEADERBOARD.md rounds to 2.1.' },
      { label: 'Runtime (val96)', value: 2.33, unit: 's/table', dataset: 'val96' },
    ],
    sources: [
      { kind: 'run', ref: 'mineru2.5-1.2b__dev__9e485ad5', label: 'runs.jsonl: mineru2.5-1.2b__dev__9e485ad5' },
      { kind: 'run', ref: 'mineru2.5-1.2b__val96__9e485ad5', label: 'runs.jsonl: mineru2.5-1.2b__val96__9e485ad5' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — MinerU2.5 raw rows' },
      { kind: 'doc', ref: 'challenge/research/MinerU_Research.md', label: 'MinerU_Research.md §0–1', note: 'Model vs converter vs post-processing split; why stage II applies' },
      { kind: 'file', ref: 'metrics/runs/mineru2.5-1.2b__val96__9e485ad5.html', label: 'Per-table run report (val96)' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    diagram: {
      kind: 'architecture',
      title: 'G2 · The VLM end-to-end path',
      caption:
        'One model, one converter, one scorer. Inference lives on the host over HTTP because Docker on macOS has no Metal; the container does orchestration, conversion, scoring, and storage.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'host', label: 'MLX server (host)', detail: 'MinerU2.5 1.2B bf16, temperature 0', kind: 'model', changed: true },
        { id: 'otsl', label: 'OTSL token stream', detail: 'fcel / lcel / ucel / xcel spans', kind: 'process', changed: true },
        { id: 'conv', label: 'pipeline/convert.py', detail: 'resolves spans and grid coordinates', kind: 'process', changed: true },
        { id: 'cells', label: 'cells.json (text, r, c, rs, cs)', kind: 'output', changed: true },
        { id: 'score', label: 'score_all.py / evaluate.py', detail: 'official scorer, unmodified', kind: 'metric' },
        { id: 'store', label: 'metrics.sqlite + LEADERBOARD.md', kind: 'output', changed: true },
      ],
      edges: [
        { from: 'img', to: 'host', label: 'HTTP' },
        { from: 'host', to: 'otsl' },
        { from: 'otsl', to: 'conv' },
        { from: 'conv', to: 'cells' },
        { from: 'cells', to: 'score' },
        { from: 'score', to: 'store' },
      ],
    },
    feature: 'breakthrough',
  },
  {
    id: 'ev-2026-11-20-preprocessing-rejected',
    order: 110,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Reversal',
    title: 'Image preprocessing is measured and thrown away',
    summary:
      'Two preprocessing variants are evaluated on the hardest tier only: T3 `median3` (val96 T3 0.956, QA 0.850) and T3 `despeckle1` (val96 T3 0.970, QA 1.000). End-to-end against raw, both lose: raw + post-processing reaches 0.9891 on val96 T3, while `despeckle1` + post-processing reaches 0.9881 and `median3` + post-processing 0.9740.',
    significance: {
      tech: 'Preprocessing was built with an on/off toggle so it could be measured rather than assumed. Both variants were dropped: the VLM already absorbs fax degradation, while pixel filters add their own distortions.',
      learning:
        'An improvement on a slice is not an improvement on the system. The measurement that matters is the end-to-end number under the identical downstream pipeline.',
      narrative:
        'Then came the cleanest possible disappointment: two image-preprocessing filters that improved the fax tier they targeted (`despeckle1` reaching 0.970 on val96 T3 alone) both lost end-to-end against raw input plus post-processing (`0.9881` and `0.9740` vs `0.9891`). An improvement on an isolated slice did not survive contact with the full pipeline.',
    },
    learning: {
      thought:
        'Because a 3×3 median filter rescued TATR on T3 (0.083 → 0.946), I expected morphological despeckling or median filtering before MinerU2.5 to improve T3 as well.',
      observed:
        'On val96 T3 alone without post-processing, `despeckle1` reached 0.970 (vs 0.9632 raw) and `median3` scored 0.956 (QA 0.850). Yet evaluated end-to-end alongside P0–P5, raw input scored 0.9891 on val96 T3, beating both `despeckle1` (0.9881) and `median3` (0.9740).',
      understood:
        'A VLM absorbs fax speckle better from the raw pixels than from a hand-crafted filter that blurs thin strokes and punctuation; worse, a slice-level gain before post-processing can turn negative once downstream repairs are active.',
      question:
        'If pixel cleaning before the VLM hurts, where should systematic residual errors be fixed instead?',
    },
    metrics: [
      { label: 'T3 weighted TEDS, raw + P0..P5', value: 0.9891, dataset: 'val96', tier: 'T3', caveat: 'Winner on val96 T3 (24 tables).' },
      { label: 'T3 weighted TEDS, despeckle1 + P0..P5', value: 0.9881, dataset: 'val96', tier: 'T3', baseline: 0.9891, delta: '-0.0010', direction: 'down' },
      { label: 'T3 weighted TEDS, median3 + P0..P5', value: 0.974, dataset: 'val96', tier: 'T3', baseline: 0.9891, delta: '-0.0151', direction: 'down' },
      { label: 'T3 weighted TEDS, despeckle1 only', value: 0.97, dataset: 'val96', tier: 'T3', caveat: 'No post-processing.' },
      { label: 'T3 weighted TEDS, despeckle1 only', value: 0.966, dataset: 'dev', tier: 'T3', caveat: 'dev T3 = 6 tables.' },
      { label: 'T3 weighted TEDS, median3 only', value: 0.956, dataset: 'val96', tier: 'T3', caveat: 'No post-processing; QA 0.850.' },
      { label: 'T3 weighted TEDS, median3 only', value: 0.956, dataset: 'dev', tier: 'T3', caveat: 'dev T3 = 6 tables.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — T3 preprocessing rows' },
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — top-3 note on T3 preprocessing' },
      { kind: 'file', ref: 'scripts/ablate_t3_preproc.py', label: 'scripts/ablate_t3_preproc.py' },
    ],
    evidence: 'measured-official',
    commits: ['7e0d32b'],
    branches: ['main', 'feat/vlm-ocr-bench'],
    feature: 'reversal',
  },
  {
    id: 'ev-2026-11-20-postprocess-p0p5',
    order: 120,
    date: '2026-11-20',
    timeConfidence: 'day',
    kicker: 'Post-processing (G3)',
    title: 'P0–P5: six post-processing rules buy the last two points',
    summary:
      'Six deterministic passes are added in `pipeline/postprocess.py`: P0 `collapse_phantom_columns`, P1 `normalize_dashes`, P2 `normalize_number_format`, P3 `split_numeric_colspans` (deskewed pure-NumPy ink column projection), P4 `repair_header_corner_rowspan`, and P5 `merge_split_placeholders`. Unicode dash normalization alone is worth +0.0124 FINAL on dev (0.9659 → 0.9783) and +0.0085 on val96 (0.9621 → 0.9705). Together with 0/120 ground-truth cells harmed: dev FINAL 0.9862 (T3 1.0000, QA 0.958), val96 FINAL 0.9808 (T3 0.9891, QA 0.960) — though both synthetic sets were used adaptively to develop the rules.',
    significance: {
      tech: 'The largest remaining gain is not a better model but deterministic, geometry-aware rules tied 1-to-1 to named error classes in ERRORS.md, with no hardcoded dataset vocabulary. P3 and P5 re-project ink from the original image and only act when pixel geometry proves it. Note the methodological caveat: dev and val96 were both used adaptively to build and verify these rules.',
      learning:
        'Post-processing is not "cheating" — it is where the model’s residual, systematic errors live. The errors worth fixing are the ones that repeat, because a rule targeting the right evidence (strings for dashes, ink geometry for spans) fixes all of them at once — though tuning against dev + val96 turned both sets into training anchors.',
      narrative:
        'Six deterministic rules took FINAL from 0.9659 to 0.9862 on dev and from 0.9621 to 0.9808 on val96 (with both synthetic sets used adaptively to craft and verify them). Unicode dash normalisation alone was worth +0.0124, while the structural rules acted on ink geometry rather than text — verified by 0/120 ground-truth cells harmed. Crossing 0.98 felt like the end of the technical story. It was not.',
      retro:
        'Critical audit point: developing P0–P5 against all 120 tables of dev + val96 converted both validation sets into plausibility anchors rather than holdouts, while encoding assumptions tied specifically to the synthetic generator’s font, alignment, and formatting rules.',
    },
    learning: {
      thought:
        'I expected the last two points to need a better model — a bigger VLM, a fine-tune, or a different OCR engine. Hand-written rules felt like the opposite of progress: a brittle patch that would not survive a different dataset.',
      observed:
        'Six rules moved FINAL from 0.9659 to 0.9862 on dev and from 0.9621 to 0.9808 on val96, with zero regressions and 0/120 ground-truth cells harmed. The single biggest pass was unicode-dash normalisation (+0.0124 dev, 61% of the dev gain). The structural passes — boundary straddle and illegal numeric colspan fusion — acted on ink geometry, not text: a span is fused or split only when the pixels prove it. Later the same discipline produced the Layer-1 coherence layer on Enes’s parser (+0.0215 val96, 17/96 improved, 0 regressed, 0 MB, under 1 ms).',
      understood:
        'Rules are not the opposite of learning; they are the limit case where a repeating pattern has been priced and repaired in the place where information still exists. A dash error is a text error with no image evidence needed, so a string rule fixes it; a wrong span is a geometry error where the pixels survive, so an ink projection fixes it. By contrast, rules that consume generator vocabulary rather than image evidence fail out of distribution — and because P0–P5 were developed against all 120 tables of dev + val96, neither set stayed an unbiased holdout.',
      question:
        'Every rule in P0–P5 was written by a human inspecting failures on dev and val96 — which is both the discovery bottleneck and the source of adaptive contamination. Can a rule be discovered against a hidden grader and tested outside the distribution it was written on?',
    },
    metrics: [
      {
        label: 'FINAL with P0..P5',
        value: 0.9862,
        dataset: 'dev',
        baseline: 0.9659,
        delta: '+0.0203',
        direction: 'up',
        tier: 'all',
        caveat: 'Both synthetic datasets (dev + val96) were used adaptively to develop and verify P0–P5 — neither is an independent holdout.',
      },
      {
        label: 'FINAL with P0..P5',
        value: 0.9808,
        dataset: 'val96',
        baseline: 0.9621,
        delta: '+0.0187',
        direction: 'up',
        tier: 'all',
        caveat: 'Both synthetic datasets (dev + val96) were used adaptively to develop and verify P0–P5 — neither is an independent holdout.',
      },
      { label: 'T3 weighted TEDS', value: 1.0, dataset: 'dev', tier: 'T3', caveat: 'dev T3 = 6 tables; adaptive dev+val96 development.' },
      { label: 'T3 weighted TEDS', value: 0.9891, dataset: 'val96', baseline: 0.9632, delta: '+0.0259', direction: 'up', tier: 'T3', caveat: 'Adaptive dev+val96 development.' },
      { label: 'P1 unicode dash alone, FINAL delta', value: 0.0124, unit: 'ΔFINAL', dataset: 'dev', baseline: 0.9659, delta: '+0.0124', direction: 'up', caveat: '61% of total post-processing gain on dev.' },
      { label: 'P1 unicode dash alone, FINAL delta', value: 0.0085, unit: 'ΔFINAL', dataset: 'val96', baseline: 0.9621, delta: '+0.0085', direction: 'up', caveat: '45% of total post-processing gain on val96.' },
      { label: 'GT cells harmed by P0..P5', value: '0/120', dataset: 'dev + val96' },
      { label: 'Remaining dev loss attributable to QA', value: '~45%', dataset: 'dev', caveat: 'Remaining dev loss 0.0138 (31% on val96).' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — postprocess P0..P5 rows' },
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — error classes and costs' },
      { kind: 'file', ref: 'pipeline/postprocess.py', label: 'pipeline/postprocess.py', note: 'P0–P5 passes; "no hardcoded dataset vocabulary"' },
      { kind: 'file', ref: 'scripts/ablate_postprocess.py', label: 'scripts/ablate_postprocess.py', note: 'Per-pass ablation harness' },
      { kind: 'commit', ref: '76a98f6', label: 'feat(pipeline): Tesseract floor runtime + P0-P5 postprocess' },
    ],
    evidence: 'measured-official',
    commits: ['76a98f6'],
    branches: ['feat/vlm-ocr-bench'],
    quotes: [
      {
        text: 'Zahl, Datei, Zeile. Keine Meinung ohne Messung, kein „sollte besser sein“.',
        context: 'AGENTS.md §7 [number, file, line. No opinion without measurement, no “should be better”.]',
        source: 'AGENTS.md',
      },
      {
        text: 'Eine Änderung pro Lauf, beide Sets gescort, Zeit gemessen.',
        context: 'AGENTS.md §7 [one change per run, both sets scored, time measured.]',
        source: 'AGENTS.md',
      },
    ],
    diagram: {
      kind: 'layer-stack',
      title: 'G3 · The P0–P5 deterministic rule layer',
      caption:
        'Each pass targets one named error class in ERRORS.md. P3 and P5 re-project the ink of the original image and only act when pixel geometry confirms the repair.',
      nodes: [
        { id: 'raw', label: 'Raw VLM HTML (OTSL → cells)', kind: 'input' },
        { id: 'p0', label: 'P0 collapse_phantom_columns', detail: 'class: illegal-numeric-colspan', kind: 'process', changed: true },
        { id: 'p1', label: 'P1 normalize_dashes', detail: 'class: unicode-dash (+0.0124 dev)', kind: 'process', changed: true },
        { id: 'p2', label: 'P2 normalize_number_format', detail: 'class: number-format', kind: 'process', changed: true },
        { id: 'p3', label: 'P3 split_numeric_colspans', detail: 'deskewed NumPy ink column projection', kind: 'process', changed: true },
        { id: 'p4', label: 'P4 repair_header_corner_rowspan', detail: 'class: missing-corner-rowspan2', kind: 'process', changed: true },
        { id: 'p5', label: 'P5 merge_split_placeholders', detail: 'class: split-placeholder', kind: 'process', changed: true },
        { id: 'img', label: 'Original image (geometry)', kind: 'input' },
        { id: 'out', label: 'Final cells.json', kind: 'output', changed: true },
        { id: 'm-dev', label: 'dev FINAL 0.9862 (adaptive)', kind: 'metric', changed: true },
        { id: 'm-val', label: 'val96 FINAL 0.9808 (adaptive)', kind: 'metric', changed: true },
      ],
      edges: [
        { from: 'raw', to: 'p0' },
        { from: 'p0', to: 'p1' },
        { from: 'p1', to: 'p2' },
        { from: 'p2', to: 'p3' },
        { from: 'p3', to: 'p4' },
        { from: 'p4', to: 'p5' },
        { from: 'p5', to: 'out' },
        { from: 'img', to: 'p3', label: 'ink projection' },
        { from: 'img', to: 'p5', label: 'straddle check' },
        { from: 'out', to: 'm-dev' },
        { from: 'out', to: 'm-val' },
      ],
    },
    feature: 'breakthrough',
  },

  // =========================================================================
  // 2026-11-21
  // =========================================================================
  {
    id: 'ev-2026-11-21-errors-costed',
    order: 10,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Error analysis',
    title: 'Seven error classes, each with a price tag',
    summary:
      'Error analysis on 120 tables (dev + val96) names seven classes and costs each one: unicode-dash (39/96 val96 tables, +0.0124 dev / +0.0085 val96), split-placeholder (17/96, +0.0056 val96), illegal-numeric-colspan (+0.0055 dev / +0.0032 val96 with P0), missing-corner-rowspan2 (+0.0014 val96), collapsed-header-row (15/19 remaining val96 QA misses), number-format (2/96 val96), and text (9/96 + 1/96 digit). The per-tier × per-style grids are recorded for both the Tesseract floor and the VLM.',
    significance: {
      tech: 'The error registry replaces "the score went up" with "this specific class of failure now costs this much". This is the document that turns a leaderboard into engineering.',
      learning:
        'Costing an error class is what converts a vague feeling ("the headers are wrong") into a decision ("fix the collapsed header first, it is 15 of 19 remaining QA misses").',
      narrative:
        'Before writing the rules, the project priced its own failures across 120 tables: seven error classes, each with a cost, a tier, a style, and a concrete table id. The most valuable file in the repository is a table of things that are wrong, with numbers attached — and it also named the one wall left standing, responsible for 100% of dev QA misses (5/5) and 15/19 val96 QA misses.',
    },
    learning: {
      thought:
        'Once MinerU2.5 crossed 0.96, the remaining errors looked like scattered edge cases to inspect table by table whenever a run missed.',
      observed:
        'Cataloguing all errors across dev + val96 (120 tables) sorted them into seven finite classes with measured costs: `unicode-dash` alone moved dev by +0.0124 (39/96 val96 tables), `split-placeholder` cost +0.0056 val96 (17/96), `illegal-numeric-colspan` cost +0.0055 dev / +0.0032 val96, and `collapsed-header-row` accounted for 100% of dev QA misses (5/5) and 15/19 remaining val96 QA misses.',
      understood:
        'When errors are named, counted, and priced against the exact scoring formula, engineering stops being trial-and-error: you know before writing a line of code which class carries 60% of the TEDS headroom and which single class owns the QA gap.',
      question:
        'Why does `collapsed-header-row` cause only a ~0.16 TEDS drop while wiping out 100% of dev QA accuracy?',
    },
    metrics: [
      { label: 'Error classes identified', value: 7, dataset: 'dev + val96' },
      { label: 'unicode-dash affected tables', value: '39/96', dataset: 'val96' },
      { label: 'split-placeholder affected tables', value: '17/96', dataset: 'val96', caveat: 'Cost +0.0056 val96 post-P4' },
      { label: 'illegal-numeric-colspan cost', value: '+0.0055 dev / +0.0032 val96', dataset: 'dev + val96', caveat: '4/96 val96 + 1 dev' },
      { label: 'collapsed-header-row', value: '15/19', unit: 'of remaining QA misses', dataset: 'val96' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — error class table and per-tier × per-style grids' },
      { kind: 'file', ref: 'eval_qa.py', label: 'eval_qa.py', note: 'QA scorer' },
    ],
    evidence: 'measured-official',
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-tesseract-floor-runtime',
    order: 15,
    date: '2026-11-21',
    time: '10:12',
    timestamp: '2026-11-21T10:12:48+01:00',
    timeConfidence: 'exact',
    kicker: 'The floor (G0)',
    title: 'Tesseract stops being a side script and becomes a pipeline runtime',
    summary:
      'The organizer’s standalone floor script was not on the model board, so "what does a classic CV baseline get?" had no comparable row. ADR-002 integrates Tesseract as a third runtime (`tesseract-baseline`) through the exact same convert → score → store path: TSV words, y-center row clustering, x-gap column clustering, plain grid, no spans, deliberately non-optimized. Dev FINAL 0.3424 (T0 0.539, T1 0.490, T2 0.268, T3 0.309, QA 0.267, CellF1 0.159, 0.2 s/table). In-container Debian Tesseract scored 0.3441 (and 0.3410 with Tesseract 5.5.0); RGB normalization before pytesseract removed a double JPEG re-encode (0.3417 → 0.3435).',
    significance: {
      tech: 'A baseline not measured on the same scorer and dataset is a rumor. Putting G0 inside `pipeline/` made every later delta checkable and uncovered a real codec dependency until RGB normalization was added.',
      learning:
        'The floor is worth more than the winner. It converts every subsequent number into a delta.',
      narrative:
        'On day two morning (10:12), the team spent part of the clock re-measuring the thing they were trying to beat — bringing the organizer’s standalone Tesseract script inside `pipeline/` as a first-class runtime (`0.3424` dev) and catching a silent double JPEG re-encode (`0.3417 → 0.3435` after RGB normalization) so every later claim sat on one measuring stick.',
    },
    metrics: [
      { label: 'FINAL (pipeline runtime)', value: 0.3424, dataset: 'dev', tier: 'all', baseline: 0.348, delta: '-0.0056', direction: 'down', caveat: 'Organizer published 0.348; local/container runs yield 0.3410–0.3441 depending on Tesseract build and path.' },
      { label: 'FINAL (built Debian container)', value: 0.3441, dataset: 'dev', tier: 'all', caveat: 'ADR-002 container verification.' },
      { label: 'FINAL (container Tess 5.5.0)', value: 0.3410, dataset: 'dev', tier: 'all', caveat: 'MEASUREMENTS.md row 2.' },
      { label: 'FINAL (standalone organizer script)', value: 0.3435, dataset: 'dev', tier: 'all', caveat: 'After RGB normalization; keeps 2 wordless tables as empty <table></table>.' },
      { label: 'FINAL (host Tess 5.5.3)', value: 0.3082, dataset: 'val96', tier: 'all', caveat: '0.034 lower than dev — dev overestimates the floor.' },
      { label: 'QA / CellF1', value: '0.267 / 0.159', dataset: 'dev', tier: 'all' },
      { label: 'Runtime', value: 0.2, unit: 's/table', dataset: 'dev', tier: 'all' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/DECISIONS.md', label: 'DECISIONS.md ADR-002', note: 'Choice B (pipeline runtime), container 0.3441, RGB fix' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md rows 2–3' },
      { kind: 'run', ref: 'tesseract-baseline__dev__e3b0c442', label: 'runs.jsonl: tesseract-baseline__dev__e3b0c442' },
      { kind: 'commit', ref: '965845c', label: 'Log container Tesseract floor and pending MinerU/postprocess measurements' },
      { kind: 'commit', ref: '76a98f6', label: 'feat(pipeline): Tesseract floor runtime + P0-P5 postprocess' },
    ],
    evidence: 'measured-official',
    commits: ['965845c', '76a98f6'],
    branches: ['feat/vlm-ocr-bench'],
    diagram: {
      kind: 'architecture',
      title: 'G0 · The floor, as a pipeline runtime',
      caption:
        'Same scorer, same dataset, same store path as every VLM on the board. No span detection, no deskew, no denoise, no post-processing — merged cells are wrong by construction.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'tsv', label: 'Tesseract TSV words', detail: 'CPU only, no weights to ship', kind: 'model' },
        { id: 'rows', label: 'Cluster rows by y-center', kind: 'process' },
        { id: 'cols', label: 'Cluster cols by x-gap', kind: 'process' },
        { id: 'grid', label: 'Plain grid <table>', detail: 'no rowspan / colspan', kind: 'process' },
        { id: 'cells', label: 'cells.json', kind: 'output' },
        { id: 'score', label: 'score_all.py', kind: 'metric' },
        { id: 'm', label: 'dev FINAL 0.3424 · 0.2 s/table', kind: 'metric' },
      ],
      edges: [
        { from: 'img', to: 'tsv' },
        { from: 'tsv', to: 'rows' },
        { from: 'tsv', to: 'cols' },
        { from: 'rows', to: 'grid' },
        { from: 'cols', to: 'grid' },
        { from: 'grid', to: 'cells' },
        { from: 'cells', to: 'score' },
        { from: 'score', to: 'm' },
      ],
    },
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-one-task',
    order: 20,
    date: '2026-11-21',
    time: '11:47',
    timestamp: '2026-11-21T11:47:29+0100',
    timeConfidence: 'exact',
    kicker: 'Focus',
    title: '"One task. Not two."',
    summary:
      'Midway through the second day a single QA target is formalized: raise the QA share from 0.960 to ≥ 0.975 on val96 while holding FINAL at ≥ 0.9808, attacking the `collapsed-header-row` lever from ERRORS.md. The rule for parallel agent sessions is explicit — at most three sessions, but only one task: a builder who writes, a verifier who contradicts with a number, and a researcher who supplies table ids.',
    significance: {
      tech: 'A single acceptance criterion is fixed in advance: one row in MEASUREMENTS.md with QA before/after and FINAL before/after, dev neutral or better, no ground truth in the pipeline, no new dependencies, no new scorer. The acceptance bar is fixed before work starts, not adjusted afterwards.',
      learning:
        'The temptation of a hackathon is not to run out of ideas — there is never a shortage — but to run out of hours. Narrowing to one lever is what turns a day of experiments into a decision.',
      narrative:
        'At 11:47 on day two, the focus narrows to a single sentence of discipline: three roles, one task, and one number that has to move — raising val96 QA from 0.960 to ≥ 0.975 on `collapsed-header-row` without losing 0.9808 FINAL. Yet no QA ≥ 0.975 improvement was ever logged in `MEASUREMENTS.md`: the lever was named and costed, and stayed unpulled.',
      retro:
        'Critical contradiction in the record: a strict "one task" contract was formally adopted at 11:47, while the actual energy that afternoon went into five parallel tracks (CUDA container, TATR fusion, small-model matrix, classic-CV integration, CORAL lab) — productive for exploration, risky for shared ownership and integration.',
    },
    metrics: [
      { label: 'QA target', value: 0.975, baseline: 0.96, delta: '+0.015', direction: 'up', dataset: 'val96' },
      { label: 'FINAL floor to hold', value: 0.9808, dataset: 'val96' },
      { label: 'Maximum parallel agent roles', value: 3, dataset: 'task contract' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — collapsed-header-row QA lever' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — val96 0.960 QA baseline' },
    ],
    evidence: 'documented',
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-fusion-reborn',
    order: 25,
    date: '2026-11-21',
    time: '14:52',
    timestamp: '2026-11-21T14:52:47+01:00',
    timeConfidence: 'exact',
    kicker: 'Second run (G1)',
    title: 'TATR → clean Tesseract: the structure route is repaired, and still trails the VLM',
    summary:
      'A cleaner TATR → Tesseract fusion (`scripts/my_tatr_fusion.py`) is committed: border trim, white pad, upscale, `deu+eng`, speckle-gated median, NMS 0.3. Dev FINAL rises from 0.6608 to 0.7268 (T0 0.899, T1 0.867, T2 0.764, T3 0.682, CellF1 0.6235, QA 0.508) at 1.49 s/table (1.43 s/table parallelized; 4.4 s/table single-worker end-to-end incl. model load in LAB.md). That is the best a pure structure-plus-OCR architecture reached, still 0.24 FINAL behind raw MinerU2.5.',
    significance: {
      tech: 'The classic two-model G1 architecture was carried to its best measured state, and the gap to the VLM did not close. That settled whether a small trainable structure model should be the primary engine: on this distribution it should not.',
      learning:
        'Improving a rejected architecture is worth doing once — it converts "we rejected it" from an opinion into a number.',
      narrative:
        'The classical path was not dead; it was solving a different problem — cheap, CPU-only, offline, reproducible. A cleaner fusion (border trim, white pad, upscale, `deu+eng`, speckle-gated median, NMS 0.3) reached 0.7268 on dev at 1.49 s/table. They finished the rival architecture properly before letting it go, still 0.24 behind raw MinerU2.5.',
    },
    metrics: [
      { label: 'TATR → clean Tesseract, FINAL', value: 0.7268, dataset: 'dev', baseline: 0.6608, delta: '+0.0660', direction: 'up', tier: 'all' },
      { label: 'CellF1', value: 0.6235, dataset: 'dev', caveat: 'Exact fidelity check value reproduced by the CUDA benchmark harness.' },
      { label: 'QA', value: 0.508, dataset: 'dev' },
      { label: 'T0 / T1 / T2 / T3', value: '0.899 / 0.867 / 0.764 / 0.682', dataset: 'dev', tier: 'all' },
      { label: 'Runtime (MEASUREMENTS.md / parallel)', value: 1.49, unit: 's/table', dataset: 'dev', caveat: '1.43 s/table with 6 parallel workers; 4.4 s/table single-worker incl. model load in LAB.md.' },
      { label: 'TATR + Tesseract on val96 (B1)', value: 0.6173, dataset: 'val96', baseline: 0.6608, delta: '-0.0435', direction: 'down', caveat: 'From LAB.md B1 (earlier unpolished config).' },
    ],
    sources: [
      { kind: 'commit', ref: '3cbde1b', label: 'feat(tatr): add TATR-to-Tesseract fusion with speckle-gated denoise' },
      { kind: 'file', ref: 'scripts/my_tatr_fusion.py', label: 'scripts/my_tatr_fusion.py' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — TATR -> clean Tesseract row' },
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §1 (B1) — end-to-end runtime correction' },
    ],
    evidence: 'measured-official',
    commits: ['3cbde1b'],
    branches: ['feat/vlm-ocr-bench', 'origin/feat/tatr-polish'],
    diagram: {
      kind: 'architecture',
      title: 'G1 · TATR structure path (best measured state)',
      caption:
        'The architecture ADR-001 demoted, carried to its best state. The structure stage is fast and accurate; the per-cell OCR stage is what costs the score.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'denoise', label: 'Speckle-gated median + border trim', kind: 'process', changed: true },
        { id: 'tatr', label: 'TATR structure (28.8M)', detail: '0.08–0.17 s/table structure only', kind: 'model' },
        { id: 'nms', label: 'NMS 0.3 on rows/cols', kind: 'process' },
        { id: 'cells', label: 'Upscaled padded cell crops', kind: 'process', changed: true },
        { id: 'ocr', label: 'Tesseract per cell', detail: 'deu+eng, psm 6/7', kind: 'model' },
        { id: 'out', label: 'cells.json', kind: 'output' },
        { id: 'm', label: 'dev FINAL 0.7268', kind: 'metric' },
        { id: 'ref', label: 'Raw VLM reference (0.9659)', kind: 'metric' },
      ],
      edges: [
        { from: 'img', to: 'denoise' },
        { from: 'denoise', to: 'tatr' },
        { from: 'tatr', to: 'nms' },
        { from: 'nms', to: 'cells' },
        { from: 'cells', to: 'ocr' },
        { from: 'ocr', to: 'out' },
        { from: 'out', to: 'm' },
        { from: 'm', to: 'ref', label: '0.24 behind' },
      ],
    },
    feature: 'breakthrough',
  },
  {
    id: 'ev-2026-11-21-cuda-benchmark-split',
    order: 30,
    date: '2026-11-21',
    time: '15:35',
    timestamp: '2026-11-21T15:35:33+01:00',
    timeConfidence: 'exact',
    kicker: 'Hardware question',
    title: 'The CUDA benchmark says the GPU is not the lever',
    summary:
      'ADR-003 builds a standalone benchmark container (`benchmarks/cuda/`) that imports `scripts/my_tatr_fusion.py` unchanged and times each stage separately. On the Mac CPU reference it reproduces the ledger exactly (FINAL 0.7268, CellF1 0.6235) and splits the wall clock: median3 2.8% (0.040 s), TATR structure 6.8% (0.097 s), cell geometry 0.0%, Tesseract 89.4% (1.281 s), total 1.432 s/table. In the Ubuntu 24.04 container (Tesseract 5.3.4, CUDA 12.6, amd64 under emulation, `--network none`), it scores 0.7124 at 3.84 s/table — a 0.0144 Tesseract-version delta.',
    significance: {
      tech: 'Because the harness imports the algorithm unchanged, it cannot drift from what it measures. Separating the stages proves the GPU can touch at most 6.8% of wall clock (max 14.7× theoretical speedup / ~1.35 s/table prediction on RTX 4070 — explicitly an unrun prediction, since no CUDA run exists in the repo).',
      learning:
        'A GPU makes the fast part faster. Before optimizing hardware, measure where the time actually goes — 89.4% sat in CPU-bound Tesseract.',
      narrative:
        'The benchmark harness reproduced the 0.7268 row exactly (CellF1 0.6235) — its own correctness check — and split the wall clock by stage: TATR 6.8%, Tesseract 89.4%. The GPU was not the lever. The same asymmetry the project had found once on quality, it now found again on time.',
    },
    learning: {
      thought:
        'I assumed packaging TATR + Tesseract in a CUDA 12.6 container for an RTX 4070 would yield a large speedup because neural structure detection looks like the heavy stage.',
      observed:
        'Stage-by-stage timing on the Mac CPU reference (reproducing FINAL 0.7268, CellF1 0.6235) showed TATR took 0.097 s/table (6.8%) while per-cell Tesseract took 1.281 s/table (89.4%). Inside the `linux/amd64` container (Tesseract 5.3.4 under emulation), FINAL shifted to 0.7124 at 3.84 s/table.',
      understood:
        'A GPU only accelerates the stage that runs on it: touching 6.8% of runtime cannot transform total latency (ADR-003), and moving across OS/Tesseract versions shifts accuracy by −0.0144 without changing a line of Python.',
      question:
        'If CPU-bound OCR dominates runtime while VLM accuracy dominates score, what actually happens inside the last remaining error class that separates our best pipeline from 1.0?',
    },
    metrics: [
      { label: 'TATR structure share of wall clock', value: 6.8, unit: '%', dataset: 'dev (Mac CPU reference)', caveat: '0.097 s/table — the only part a GPU touches.' },
      { label: 'Tesseract share of wall clock', value: 89.4, unit: '%', dataset: 'dev (Mac CPU reference)', caveat: '1.281 s/table — CPU-bound.' },
      { label: 'CPU reference runtime', value: 1.432, unit: 's/table', dataset: 'dev (Mac CPU reference)', caveat: 'p50 1.40 s, p90 2.32 s; FINAL 0.7268, CellF1 0.6235.' },
      { label: 'In-container FINAL (Tesseract 5.3.4)', value: 0.7124, dataset: 'dev (linux/amd64 container)', baseline: 0.7268, delta: '-0.0144', direction: 'down', caveat: 'Gap comes from Tesseract 5.3.4 vs host 5.5.3 (T3 0.648 vs 0.682).' },
      { label: 'In-container runtime (amd64 emulated)', value: 3.84, unit: 's/table', dataset: 'dev (linux/amd64 container)', caveat: 'Emulation on Apple Silicon, not native GPU.' },
      { label: 'Predicted 4070 runtime (unmeasured)', value: 1.35, unit: 's/table', dataset: 'dev (prediction)', caveat: 'PREDICTION from stage split (14.7× cap on TATR) — no CUDA run exists in repo.' },
    ],
    sources: [
      { kind: 'file', ref: 'benchmarks/cuda/README.md', label: 'benchmarks/cuda/README.md', note: 'Stage split, container verification, CUDA prediction caveat' },
      { kind: 'file', ref: 'benchmarks/cuda/bench_tatr_cuda.py', label: 'benchmarks/cuda/bench_tatr_cuda.py' },
      { kind: 'doc', ref: 'challenge/DECISIONS.md', label: 'DECISIONS.md ADR-003' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md rows 11–12' },
      { kind: 'commit', ref: '7305ffa', label: 'feat(bench): CUDA benchmark container for TATR -> Tesseract' },
    ],
    evidence: 'measured-official',
    commits: ['7305ffa', 'eb4f985', '29c7d75', 'ad228ca'],
    branches: ['feat/vlm-ocr-bench'],
    diagram: {
      kind: 'architecture',
      title: 'Where the wall clock actually goes (ADR-003)',
      caption:
        'Timed per stage on the Mac CPU reference. The GPU-reachable stage is 6.8% of total time; the CPU-bound OCR stage is 89.4%.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'median', label: 'median3 denoise', detail: '0.040 s (2.8%)', kind: 'process' },
        { id: 'tatr', label: 'TATR structure', detail: '0.097 s (6.8%) — GPU-bound', kind: 'model', changed: true },
        { id: 'geom', label: 'Cell geometry', detail: '0.0002 s (0.0%)', kind: 'process' },
        { id: 'tess', label: 'Tesseract per cell', detail: '1.281 s (89.4%) — CPU-bound', kind: 'model', changed: true },
        { id: 'total', label: '1.432 s/table', kind: 'output' },
        { id: 'gpu', label: 'CUDA 12.6 (not run)', detail: 'can touch ≤ 6.8%', kind: 'decision', changed: true },
        { id: 'score', label: 'FINAL 0.7268 (fidelity check)', kind: 'metric' },
      ],
      edges: [
        { from: 'img', to: 'median' },
        { from: 'median', to: 'tatr' },
        { from: 'tatr', to: 'geom' },
        { from: 'geom', to: 'tess' },
        { from: 'tess', to: 'total' },
        { from: 'gpu', to: 'tatr', label: 'only reachable stage' },
        { from: 'total', to: 'score' },
      ],
    },
    feature: 'question',
  },
  {
    id: 'ev-2026-11-21-collapsed-header',
    order: 35,
    date: '2026-11-21',
    time: '15:39',
    timestamp: '2026-11-21T15:39:29+01:00',
    timeConfidence: 'exact',
    kicker: 'The last wall',
    title: 'Every character correct, the table still wrong',
    summary:
      'The dominant QA failure is traced to four concrete tables. In dev_table_016 the model reads "Plan", "Delta", "Reported", "Q1", "Q2", "Q3", "85 421", "62 026", "34 327" — every character correct — but fuses the two header rows into one: pred row 0 becomes [\'\', \'plan q1\', \'delta q2\', \'reported q3\']. TEDS falls to 0.8352 and QA to 0/5, because eval_qa.py looks for the column headers Q1, Q2, Q3 in the first three rows and they are no longer there. The common cause: no horizontal line between the upper and lower header, so nothing tells the reader where one row ends and the next begins. Three tables are collapsed-header cases; a fourth (val96_table_050) is a different failure — a one-row header dropped completely on a skewed, low-contrast phone photo.',
    significance: {
      tech: 'A full repro bundle is produced: images, ground-truth HTML and QA, and predictions side by side for all four cases. This error class accounts for 100% of the dev QA misses (5/5) and 15 of the 19 remaining val96 QA misses — the only place left where real points remain, since QA carries 15% of the score.',
      learning:
        'This is the clearest possible demonstration that OCR accuracy and table correctness are different quantities. A model with essentially perfect character recognition loses every QA question on the table because the number of rows is wrong and the header labels have moved into the data row.',
      narrative:
        'In `dev/table_016`, the mechanism is visible in a single line: the model read every letter and every number correctly, and merged `Plan` and `Q1` into one cell, `Plan Q1`. The column headers could no longer be found, so QA answered 0 of 5 questions while TEDS still read 0.8352. The last wall of the hackathon was not a harder image — it was a missing horizontal line, packaged as four picture-and-JSON bundles so the next person started from evidence instead of a hunch.',
      retro:
        'Retrospective lesson: creating crisp repro bundles (commit b654780) is strong engineering hand-off practice, yet neither the team nor the parallel agent loops closed the loop on collapsed-header-row before the hackathon ended — demonstrating the gap between diagnosing an error class and shipping its verified fix.',
    },
    learning: {
      thought:
        'I assumed that when a VLM reads every word and number in a table accurately, downstream question answering will succeed automatically — and any remaining loss is minor boundary noise.',
      observed:
        'In `dev_table_016`, `val96_table_070`, and `val96_table_094`, MinerU2.5 recognized every character correctly yet fused two borderless header rows into one (`[\'\', \'plan q1\', \'delta q2\', \'reported q3\']`), scoring TEDS 0.8352–0.8522 while collapsing QA to 0/5 or 1/5. Meanwhile `val96_table_050` dropped its one-row header completely on a skewed photo (TEDS 0.7174, QA 0/5).',
      understood:
        'Character accuracy and table semantics diverge sharply when a visual boundary (a missing horizontal rule between upper and lower headers) disappears: `nrows` is off by one, column headers vanish from the first three rows, and QA lookup collapses completely even though TEDS stays above 0.83.',
      question:
        'Why do TEDS, Cell-F1, and QA behave so differently on the same prediction — and can a single intervention improve both without hurting clean headers?',
    },
    metrics: [
      { label: 'dev_table_016 TEDS', value: 0.8352, dataset: 'dev' },
      { label: 'dev_table_016 QA', value: '0/5', dataset: 'dev' },
      { label: 'dev_table_016 rows', value: '9 predicted vs 10 in ground truth', dataset: 'dev' },
      { label: 'val96_table_070 TEDS', value: 0.8522, dataset: 'val96' },
      { label: 'val96_table_070 QA', value: '1/5', dataset: 'val96' },
      { label: 'val96_table_094 TEDS', value: 0.8472, dataset: 'val96' },
      { label: 'val96_table_094 QA', value: '1/5', dataset: 'val96' },
      { label: 'val96_table_050 TEDS', value: 0.7174, dataset: 'val96', caveat: 'dropped-header-row — a different failure' },
      { label: 'val96_table_050 QA', value: '0/5', dataset: 'val96' },
      { label: 'Share of remaining QA misses', value: '15/19', dataset: 'val96' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/collapsed_header_cases/README.md', label: 'collapsed_header_cases/README.md', note: 'GT vs prediction dumps for all four cases' },
      { kind: 'file', ref: 'challenge/collapsed_header_cases/dev_table_016.json', label: 'dev_table_016.json', note: 'Machine-readable repro bundle' },
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — collapsed-header-row row' },
      { kind: 'commit', ref: 'b654780', label: 'docs(errors): add collapsed-header-row images and repro bundles for teammate' },
    ],
    evidence: 'measured-official',
    commits: ['b654780'],
    branches: ['feat/vlm-ocr-bench'],
    feature: 'failure',
    unresolved: [
      'No fix for collapsed-header-row was measured. The class remained open at the end of the hackathon.',
      'val96_table_050 is a dropped header, not a collapsed one — it likely needs a different mechanism and was not diagnosed further.',
    ],
  },
  {
    id: 'ev-2026-11-21-metrics-three-questions',
    order: 40,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Metrics',
    title: 'Three metrics, three geometries: the same table fails them differently',
    summary:
      'The scorer combines three things that do not agree. TEDS is a tree edit distance over HTML and forgives character noise; cell-F1 asks for exact text at an exact grid position; QA answers ~5 lookup-and-aggregate questions from the cell grid alone. On `dev/table_016` (collapsed-header-row), TEDS drops to 0.8352 while QA collapses to 0/5 because Q1/Q2/Q3 disappeared from the header rows. Conversely, fixing `unicode-dash` moves FINAL by +0.0124 on dev without touching QA at all.',
    significance: {
      tech: 'Explains why no single lever moves both TEDS and QA together: remaining QA loss (15/19 val96 misses) and remaining TEDS loss live in disjoint error classes.',
      learning:
        'A score is a function of what the metric can see. Before optimizing against a number you have to know which geometry it measures — tree, grid position, or question.',
      narrative:
        'The most useful hour of the project produced no new model. It produced the understanding that three of our numbers — TEDS (tree edit distance), Cell-F1 (exact text at exact coordinates), and QA (grid lookup over row labels and top-three header rows) — were three separate examinations of the same patient.',
    },
    learning: {
      thought:
        'I treated “the score” as one thing. FINAL = 0.85 × tier-weighted TEDS + 0.15 × QA, so I assumed that any real improvement would move it and that a pipeline with a higher FINAL was a pipeline that understood more. The tie-breaker (cell F1, “exact text at exact position”) felt like a technical footnote.',
      observed:
        'The metrics diverge sharply on the same tables. `dev/table_016` has a two-row header fused into one: TEDS 0.8352 — about 0.16 of tree loss — and QA 0/5, because the column headers Q1/Q2/Q3 cannot be found. `val96/table_070` and `val96/table_094` behave the same way (TEDS 0.8522 / 0.8472, QA 1/5). Conversely the unicode-dash class — a character-level defect, exactly the kind TEDS is supposed to tolerate — was worth +0.0124 FINAL on dev (0.9659 → 0.9783) and +0.0085 on val96 when fixed, and it does not touch QA at all. QA is answered only from our own cells: a row label matched in column 1, a column header matched anywhere in the first three rows, and numbers matched by normalized value.',
      understood:
        'Three metrics, three geometries. TEDS compares HTML trees and forgives minor character noise while punishing wrong spans or missing rows; Cell-F1 checks exact text at exact grid coordinates, blind to table meaning; QA is a grid lookup where one misread label or one shifted header makes every answer wrong even when every character is right. “Raise the score” is not an actionable instruction until you know which geometry you are attacking.',
      question:
        'Is there a single quantity that predicts both? The remaining TEDS loss and the remaining QA loss sit in different error classes — collapsed headers hit QA hard and TEDS mildly; unicode dashes hit TEDS and leave QA untouched.',
    },
    metrics: [
      { label: 'dev_table_016 TEDS', value: 0.8352, dataset: 'dev', caveat: 'collapsed-header-row' },
      { label: 'dev_table_016 QA', value: '0/5', dataset: 'dev', caveat: 'collapsed-header-row — headers fused into data row' },
      { label: 'val96_table_070 TEDS / QA', value: '0.8522 / 1/5', dataset: 'val96', caveat: 'collapsed-header-row' },
      { label: 'val96_table_094 TEDS / QA', value: '0.8472 / 1/5', dataset: 'val96', caveat: 'collapsed-header-row' },
      { label: 'Unicode dash P1 gain (no QA change)', value: 0.0124, unit: 'ΔFINAL', dataset: 'dev', baseline: 0.9659, delta: '+0.0124', direction: 'up' },
      { label: 'Remaining QA misses from collapsed-header-row', value: '15/19', dataset: 'val96' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/PROBLEM.md', label: 'PROBLEM.md §5 — scoring semantics' },
      { kind: 'doc', ref: 'challenge/ERRORS.md', label: 'ERRORS.md — error class table and costs' },
      { kind: 'doc', ref: 'challenge/collapsed_header_cases/README.md', label: 'collapsed_header_cases/README.md' },
      { kind: 'file', ref: 'eval_qa.py', label: 'eval_qa.py', note: 'QA scorer, unmodified since 052a638' },
    ],
    evidence: 'measured-official',
    branches: ['feat/vlm-ocr-bench'],
    quotes: [
      {
        text: 'Responsible for 100% of dev QA misses (5/5) and 15/19 val96 QA misses.',
        context: 'ERRORS.md §“Top 3 things to fix”, item 3 — why QA is the last lever',
        source: 'challenge/ERRORS.md',
      },
      {
        text: 'MinerU2.5 liest jeden Buchstaben und jede Zahl korrekt, zieht aber z. B. `Plan` + `Q1` in eine einzelne Zelle `\'Plan Q1\'` zusammen.',
        context: 'collapsed_header_cases/README.md [MinerU2.5 reads every letter and number correctly, but merges e.g. “Plan” + “Q1” into one cell “Plan Q1”.]',
        source: 'challenge/collapsed_header_cases/README.md',
      },
    ],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-null-experiment',
    order: 45,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Null experiment',
    title: 'Before measuring a difference, measuring the noise',
    summary:
      'A null experiment calibrates the floor of the instrument itself. Re-running the pipeline on two fresh seeds produces 0/96 tables that differ byte-wise — the pipeline is deterministic. The paired standard error is 0.00054, giving a minimum detectable effect of 0.0013 at n = 96 and 0.0012 at n = 120. Unpaired comparisons need 0.0045 or more: across 9 seeds the baseline FINAL ranges from 0.994 to 0.9985 with a standard deviation of 0.0013.',
    significance: {
      tech: 'This is the measurement instrument being validated before it is trusted. A paired self-test on 200 tables returns delta 0.0 with CI [0.0, 0.0]. From here on, every candidate has a number it must clear, and the relevance threshold of 0.005 sits comfortably above the unpaired noise floor.',
      learning:
        'Determinism of the pipeline is not the same as determinism of the data, and neither is determinism of the environment. The team checked all three separately — and only then started trusting a delta.',
      narrative:
        'A whole run spent establishing what a difference of zero looks like (0/96 byte diffs on reruns, paired SE 0.00054, MDE 0.0013 vs unpaired threshold 0.0045 across 9 seeds). It is the least dramatic measurement in the repository and the one that makes every other measurement mean something.',
    },
    learning: {
      thought:
        'I assumed any small gain on a 96-table synthetic split was real signal, and that comparing two runs on different generated seeds was close enough to compare candidates.',
      observed:
        'Re-running the pipeline on identical images produced 0/96 differing tables (paired self-test Δ = 0.0, CI [0.0, 0.0]), giving a paired SE of 0.00054 and a paired MDE of 0.0013 at n=96 (0.0012 at n=120). Across 9 different seeds, however, baseline FINAL ranged from 0.994 to 0.9985 (sd 0.0013), requiring ≥ 0.0045 for unpaired comparisons.',
      understood:
        'Before trusting any candidate delta, you have to measure zero. Half of the lab’s candidate effects fell between 0.0013 and 0.0045 — invisible to unpaired comparisons and only resolvable on identical images.',
      question:
        'If the pipeline is byte-deterministic on identical images, does regenerating a dataset with the same seed reproduce identical images?',
    },
    metrics: [
      { label: 'Paired SE', value: 0.00054, unit: 'ΔFINAL', dataset: 'n=96' },
      { label: 'Minimum detectable effect', value: 0.0013, unit: 'ΔFINAL', dataset: 'n=96' },
      { label: 'Minimum detectable effect', value: 0.0012, unit: 'ΔFINAL', dataset: 'n=120' },
      { label: 'Unpaired threshold', value: 0.0045, unit: 'ΔFINAL', dataset: '9 seeds, n=96' },
      { label: 'Baseline FINAL range over 9 seeds', value: '0.994–0.9985', dataset: 'n=96' },
      { label: 'Byte-wise differing tables on rerun', value: '0/96', dataset: 'lab_r3103, lab_r3104' },
      { label: 'Paired self-test delta', value: 0.0, dataset: 'val200 (n=200)' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/autoresearch/runs/null/calibration.txt', label: 'null/calibration.txt — SE, MDE, unpaired threshold' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/null/determinism.txt', label: 'null/determinism.txt — byte-wise rerun check' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/p0/paired_selftest.json', label: 'paired_selftest.json' },
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §7 — smallest complete cycle, step 1 (null experiment)' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-render-gap',
    order: 50,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Measurement hazard',
    title: 'Two pixels of rendering difference move the score by 0.038',
    summary:
      'Regenerating `data/dev` with the same seed 42 produces byte-identical ground truth, QA, and manifest — but all 24 images differ (e.g. 672 vs 670 px width; Pillow 13.0.0, FreeType 2.14.3 on this machine). TATR + Tesseract on the re-rendered images scores 0.6989 instead of 0.6608 (T3 0.709 vs 0.623) — a +0.0381 shift, over seven times the planned 0.005 relevance threshold. Meanwhile val96 scores 0.6173 against dev 0.6608, and the lab null check measures val200 at 0.9957 vs 0.9963 documented.',
    significance: {
      tech: 'Invalidates comparing absolute scores across locally generated sets and official dev/hidden sets: only paired comparisons on identical images are clean. A 2-px render change shifts FINAL by 0.038.',
      learning:
        'A fixed random seed fixes the content of a table, not its pixels. Determinism lives in the generator, not in the environment. And parameters tuned on dev (nms/denoise) lose 0.044 on val96.',
      narrative:
        'Regenerating `data/dev` with the exact same seed 42 produced byte-identical ground truth, QA files, and manifest — and 24 different images (672 vs 670 px wide) because of the local Pillow and FreeType build. The score jumped from 0.6608 to 0.6989: two pixels moved the score by 0.038, more than seven times the 0.005 relevance threshold. The measurement instruments were moving.',
      retro:
        'Audit B key finding: a fixed seed does not prevent Pillow/FreeType/font rendering drift. A 2-px difference shifted FINAL by ~0.038 (~7.6× the 0.005 threshold), proving that absolute scores across environments are invalid and only paired comparisons on identical pixel inputs are reliable.',
    },
    learning: {
      thought:
        'I assumed determinism was a property of the dataset. Fixed seed plus unchanged `generate_dataset.py` equals the same data — and therefore the same score.',
      observed:
        'Regenerating `data/dev` with seed 42 produced byte-identical ground truth, QA files, and manifest — and 24 different images (672 vs 670 px width, Pillow 13.0.0, FreeType 2.14.3). TATR + Tesseract on the re-rendered images scored 0.6989 instead of 0.6608 (T3 0.709 vs 0.623): a 2-px render shift moved FINAL by 0.038, over seven times the planned 0.005 relevance threshold. On val96 the same configuration scored 0.6173 vs 0.6608 on dev, and the lab null check measured val200 at 0.9957 against 0.9963 documented and dev24 at 0.9998 against 0.9971.',
      understood:
        'Determinism lives in the generator, not in the environment, and labels, manifest, and pixels can drift independently — a seed fixes table content, not rendered pixels. Meanwhile the 0.6608 → 0.6173 drop on val96 made the Winner’s Curse visible in parameters fitted on dev. After this finding the lab rule was fixed: absolute scores on `lab_*` are never comparable to official dev/hidden numbers; only paired comparisons on identical images are clean.',
      question:
        'Is the 0.038 shift systematic bias — local renders being easier — or pipeline sensitivity to 2 px of width? With one pair it is undecidable, leaving open how much cross-environment rendering drift separates local runs from the hidden scorer.',
    },
    metrics: [
      { label: 'TATR+Tesseract, re-rendered dev', value: 0.6989, dataset: 'dev (re-rendered, seed 42)', baseline: 0.6608, delta: '+0.0381', direction: 'up', caveat: 'Not an improvement: 2-px rendering drift (672 vs 670 px).' },
      { label: 'T3 weighted TEDS, re-rendered dev', value: 0.709, dataset: 'dev (re-rendered, seed 42)', tier: 'T3', baseline: 0.623, delta: '+0.086', direction: 'up' },
      { label: 'TATR+Tesseract on val96', value: 0.6173, dataset: 'val96', baseline: 0.6608, delta: '-0.044', direction: 'down' },
      { label: 'Planned relevance threshold', value: 0.005, unit: 'ΔFINAL', dataset: 'promotion rule' },
      { label: 'Lab baseline reproduction (val200 / dev24)', value: '0.9957 / 0.9998', dataset: 'val200 / dev24', caveat: 'Documented values were 0.9963 / 0.9971.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §8b F4 — render gap' },
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §1 — val96 vs dev baseline' },
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — baseline reproduced' },
      { kind: 'doc', ref: 'challenge/autoresearch/UPSTREAM_SEARCH.md', label: 'UPSTREAM_SEARCH.md' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'feat/vlm-ocr-bench'],
    quotes: [
      {
        text: 'Absolute Scores auf `lab_*` sind nicht mit offiziellen dev/Hidden-Zahlen vergleichbar; nur gepaarte Vergleiche auf denselben Bildern sind sauber.',
        context: 'LAB.md §8b F4 [absolute scores on lab_* are not comparable with official dev/hidden numbers; only paired comparisons on the same images are clean.]',
        source: 'challenge/autoresearch/LAB.md',
      },
      {
        text: 'Eine 2-px-Renderänderung verschiebt FINAL um 0,038 — größer als die geplante Relevanzschwelle 0,005.',
        context: 'LAB.md §8b F4 [a 2-px rendering change shifts FINAL by 0.038 — larger than the planned relevance threshold of 0.005.]',
        source: 'challenge/autoresearch/LAB.md',
      },
      {
        text: 'Ursache vermutlich andere Pillow/FreeType-Version beim Veranstalter (HYPOTHESE, nicht geprüft).',
        context: 'LAB.md §8b F4 [cause presumably a different Pillow/FreeType version at the organiser’s (hypothesis, not verified)]',
        source: 'challenge/autoresearch/LAB.md',
      },
    ],
    feature: 'failure',
  },
  {
    id: 'ev-2026-11-21-contamination-found',
    order: 55,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Contamination',
    title: 'The validation set is not a validation set any more',
    summary:
      'postprocess.py was developed against all 120 tables of dev + val96 and verified with "0/120 GT harmed". The lab report states the consequence plainly: dev and val96 are both adaptively used, so neither is a holdout any more — they are plausibility anchors. A new dataset tier is designed: DEV (free experiments, 48 tables), PROMO (promotion gate, 120), REPL (independent replication, 120), with ground truth hidden behind a grader.',
    significance: {
      tech: 'The measurement design is rebuilt under the discovery. Promotion requires a paired stratified bootstrap on PROMO with a lower confidence bound above zero, a practical significance floor of ΔFINAL ≥ 0.005, a per-tier loss limit of 0.02, Holm correction across candidates, a hard 15 s/table ceiling, and a fresh REPL replication before integration.',
      learning:
        'Overfitting does not require a neural network. A rule set tuned against a feedback loop becomes a fit to that loop, whatever the model underneath does. The label "validation set" hides the mechanism — a set used to choose things is a training set.',
      narrative:
        'Then came the finding that mattered most, because it was bookkeeping rather than engineering: `postprocess.py` had been developed against all 120 tables of dev and val96 and checked with "0/120 GT harmed". Dev and val96 were not holdouts — they had been a training set with a better name. The most important finding of the hackathon is also the least likely to show up on a leaderboard.',
      retro:
        'Central methodological lesson of the retrospective: repeated post-processing decisions on dev and val96 eroded both as independent holdouts. Self-reporting contamination honestly in LAB.md §1 is a scientific strength, and motivates the strict rule to seal an untouched holdout set from day one.',
    },
    learning: {
      thought:
        'I believed we had a clean three-level arrangement: `data/dev` was the fixed yardstick never trained on, `data/val` was the decision set used whenever dev would be noise, and the hidden set was the only unseen data.',
      observed:
        'The rules were developed against all 120 tables of dev + val96 and verified with “0/120 GT harmed”. LAB.md §1 states it plainly: “`postprocess.py` wurde gegen alle 120 Tabellen (dev + val96) entwickelt … dev und val96 sind damit beide adaptiv genutzt — kein Holdout mehr, nur Plausibilitätsanker.” The Winner’s Curse was already visible in TATR + Tesseract dropping from 0.6608 on dev to 0.6173 on val96.',
      understood:
        'The word “validation” was doing the hiding. A set used to choose rules is a training set whether a neural network is involved or not — the six post-processing passes are parameters, and they were fitted. Even “0/120 GT harmed” is a symptom: rules can be tuned to harm zero seen cells while still overfitting them. Hence the hidden-grader ladder (DEV 48, PROMO 120, REPL 120) where the unit of evidence is one evaluated table rather than one run — because 24 and 240 tables are 10× different evidence.',
      question:
        'How much of dev 0.9862 / val96 0.9808 survives a set nobody looked at? The promotion gate was built to answer that question — and it was never executed, leaving the promotion ledger (`experiments.jsonl`) at zero lines.',
    },
    metrics: [
      { label: 'TATR+Tesseract dev → val96', value: 0.6173, dataset: 'val96', baseline: 0.6608, delta: '-0.044', direction: 'down' },
      { label: 'Promotion threshold ΔFINAL', value: 0.005, dataset: 'promotion rule' },
      { label: 'Promotion sample size', value: 10000, unit: 'stratified bootstrap draws', dataset: 'promotion rule' },
      { label: 'Per-tier loss limit at promotion', value: 0.02, unit: 'TEDS', dataset: 'promotion rule' },
      { label: 'DEV / PROMO / REPL sizes', value: '48 / 120 / 120', dataset: 'lab_*', caveat: 'Ground truth hidden behind the grader' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §1 Kontamination note, §2 Datenebenen, §5 Promotion-Regel' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — “Notes on method”' },
      {
        kind: 'file',
        ref: 'challenge/autoresearch/shared/experiments.jsonl',
        label: 'experiments.jsonl (empty promotion ledger, 0 lines)',
        note: '0 lines recorded — confirms no candidate was ever promoted',
      },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a'],
    quotes: [
      {
        text: '`postprocess.py` wurde gegen alle 120 Tabellen (dev + val96) entwickelt und mit „0/120 GT harmed“ geprüft. dev und val96 sind damit beide adaptiv genutzt — kein Holdout mehr, nur Plausibilitätsanker.',
        context: 'LAB.md §1 [postprocess.py was developed against all 120 tables (dev + val96) and checked with “0/120 GT harmed”. dev and val96 are therefore both adaptively used — no longer a holdout, only a plausibility anchor.]',
        source: 'challenge/autoresearch/LAB.md',
      },
      {
        text: 'Einheit: bewertete Tabelle auf DEV (nicht „Lauf“: 24 vs 240 Tabellen sind 10× verschiedene Evidenz; flash_7).',
        context: 'LAB.md §3 [unit: evaluated table on DEV (not “run”: 24 vs 240 tables are 10× different evidence).]',
        source: 'challenge/autoresearch/LAB.md',
      },
      {
        text: 'Claude prüft die Begründung (ADR), nicht die Zahl. Eine gemessene Zahl wird nie per Urteil überstimmt.',
        context: 'LAB.md §5 [Claude checks the justification (ADR), not the number. A measured number is never overruled by judgement.]',
        source: 'challenge/autoresearch/LAB.md',
      },
    ],
    diagram: {
      kind: 'dataset-shift',
      title: 'The promotion flow rebuilt after contamination',
      caption:
        'DEV for free exploration, PROMO for the promotion gate, REPL for independent replication — plus the original dev/val96, which are now anchors rather than holdouts, and the hidden set, which stays private.',
      nodes: [
        { id: 'dev', label: 'DEV (48)', kind: 'input' },
        { id: 'promo', label: 'PROMO (120)', kind: 'input', changed: true },
        { id: 'repl', label: 'REPL (120)', kind: 'input', changed: true },
        { id: 'gate', label: 'Promotion gate', kind: 'decision', changed: true },
        { id: 'integrate', label: 'Integrate', kind: 'output' },
        { id: 'anchor', label: 'dev24 / val96', kind: 'metric', changed: true },
        { id: 'hidden', label: 'Hidden', kind: 'output' },
      ],
      edges: [
        { from: 'dev', to: 'promo', label: 'best candidate' },
        { from: 'promo', to: 'gate' },
        { from: 'gate', to: 'repl', label: 'replication' },
        { from: 'repl', to: 'integrate' },
        { from: 'anchor', to: 'hidden', label: 'final report only' },
      ],
    },
    feature: 'question',
  },
  {
    id: 'ev-2026-11-21-dataset-ladder',
    order: 60,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Measurement infrastructure',
    title: 'From 24 tables to a promotion gate: the eight-rung dataset ladder',
    summary:
      'Decisions were structured on an explicit ladder of datasets with separate jobs: `dev` (24, official yardstick) → `val96` (96, seed 2 decision set) → `lab_dev_a/b/c` (48 each, free agent exploration) → `lab_promo` (120, seed 7001 promotion gate) → `lab_repl_1` (120, seed 8001 replication, burned after use) → `lab_r3301/r3302` (96 each, router train/test) → `OCRBench-v2` (24, real-world OOD) → `hidden` (~96, private seed). Every generated set was regenerated byte-identically and SHA-256 hashed before use.',
    significance: {
      tech: 'The ladder is why claims in this chronology carry explicit evidence levels. Agents see no ground truth and no generator; the gate scores via 10,000 stratified bootstrap draws, ΔFINAL ≥ 0.005, max per-tier loss 0.02, and an evaluation budget counted in tables (1,920 table evaluations per cycle = 40 × 48).',
      learning:
        'The quality of a measurement is set by the dataset you measured on, not by the code you wrote.',
      narrative:
        'To stop measuring themselves with a compromised ruler, they built an eight-rung staircase of datasets — from 24-table dev up to hidden-grader PROMO (120) and burned-after-use REPL (120), every synthetic rung SHA-256 verified, and real-world OCRBench-v2 at the edge. The staircase was verified and ready; the automated agent loop never climbed it.',
    },
    metrics: [
      { label: 'dev / val96 sizes', value: '24 / 96', unit: 'tables', dataset: 'dev / val96' },
      { label: 'lab_dev_a/b/c size', value: 48, unit: 'tables each', dataset: 'lab_dev_a / lab_dev_b / lab_dev_c', caveat: 'Seeds 1000/1001/1002, 12 per tier.' },
      { label: 'lab_promo / lab_repl_1 size', value: 120, unit: 'tables each', dataset: 'lab_promo / lab_repl_1', caveat: 'Seeds 7001 / 8001; REPL burned after one use.' },
      { label: 'lab_r3301 / lab_r3302 size', value: 96, unit: 'tables each', dataset: 'lab_r3301 / lab_r3302', caveat: 'Router train/test split.' },
      { label: 'OCRBench-v2 size', value: 24, unit: 'real tables', dataset: 'OCRBench-v2', caveat: 'Only real-world set; baseline TEDS 0.4774.' },
      { label: 'Agent evaluation budget', value: 1920, unit: 'table evals', dataset: 'lab_dev_a (48)', caveat: '40 evaluations × 48 tables per agent per cycle.' },
      { label: 'lab_promo determinism check', value: 'byte-identical (494 files)', dataset: 'lab_promo', caveat: 'Regenerated and SHA-256 verified before use.' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §2, §5, §8b (F4)', note: 'Dataset ladder seeds, sizes, hashes, seven-point gate' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — Notes on method' },
      { kind: 'doc', ref: 'challenge/PLAN.md', label: 'PLAN.md §M2' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a'],
    diagram: {
      kind: 'dataset-shift',
      title: 'The eight-rung dataset ladder',
      caption:
        'Each rung has a distinct role and visibility rule. Only OCRBench-v2 (and the private hidden set) sit outside the synthetic generator distribution.',
      nodes: [
        { id: 'dev', label: 'dev (24)', detail: 'official yardstick (adaptive)', kind: 'input', changed: true },
        { id: 'val96', label: 'val96 (96)', detail: 'seed 2 decision set (adaptive)', kind: 'input', changed: true },
        { id: 'labdev', label: 'lab_dev_a/b/c (48)', detail: 'free agent exploration', kind: 'input' },
        { id: 'promo', label: 'lab_promo (120)', detail: 'promotion gate — 1 look', kind: 'decision', changed: true },
        { id: 'repl', label: 'lab_repl_1 (120)', detail: 'replication — burned after use', kind: 'decision', changed: true },
        { id: 'r33', label: 'lab_r3301 / r3302 (96)', detail: 'router train / test', kind: 'input' },
        { id: 'ood', label: 'OCRBench-v2 (24)', detail: 'REAL tables — TEDS 0.4774', kind: 'input', changed: true },
        { id: 'hidden', label: 'hidden (~96)', detail: 'reported TEDS 0.882 / QA 0.759', kind: 'metric', changed: true },
        { id: 'synthetic', label: 'Generator distribution', kind: 'output' },
        { id: 'real', label: 'Real-world distribution', kind: 'output' },
      ],
      edges: [
        { from: 'dev', to: 'val96', label: '24 is noise' },
        { from: 'val96', to: 'labdev' },
        { from: 'labdev', to: 'promo', label: 'paired bootstrap' },
        { from: 'promo', to: 'repl', label: 'point estimate > 0' },
        { from: 'labdev', to: 'r33' },
        { from: 'r33', to: 'ood' },
        { from: 'ood', to: 'real' },
        { from: 'dev', to: 'synthetic' },
        { from: 'val96', to: 'synthetic' },
        { from: 'hidden', to: 'real', label: 'reported only' },
      ],
    },
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-hidden-drop',
    order: 65,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Hidden set',
    title: 'The hidden set breaks every assumption',
    summary:
      'A reported hidden-set result of TEDS 0.882 and QA 0.759 arrives from a parallel Gemini session (not reproduced locally; the report does not state which system produced it). Local numbers had been 0.96–0.99 on dev and val96. The lab report links this drop to the out-of-distribution finding: on generator seeds the pipeline is saturated (rest headroom 0.002–0.006), on OOD OCRBench-v2 the baseline sits at TEDS 0.4774, and the lexicon’s sign flips.',
    significance: {
      tech: 'The synthetic benchmark scores were never proof of generalization. On the generator’s own distribution the pipeline is saturated (rest headroom 0.002–0.006); out of distribution the same components behave differently, and a generator word-pool lexicon actively hurts.',
      learning:
        'A near-perfect score on data you generated yourself mostly measures your generator. The question is not "how high is the score" but "which parts of the score would survive a different renderer".',
      narrative:
        'The hidden set came back at TEDS 0.882 and QA 0.759 — numbers reported by a parallel Gemini session and never reproduced locally inside this repository, marked as reported wherever they appear. No document in the repo records an emotional reaction; the report only carries numbers. Alongside OCRBench-v2 at TEDS 0.4774 and synthetic rest headroom of 0.002–0.006, it is the centre of the project: discovering that the local 0.9862 / 0.9808 scores (themselves adaptively tuned) had been answering a different question.',
      retro:
        'Epistemic discipline & unresolved contradiction: 0.882 / 0.759 stays marked `reported` because it was never reproduced locally and is not even uniquely tied to either the CPU submission (0.9971) or the CUDA-TATR container (0.7124). Meanwhile, external real-world evaluations (0.259–0.517 TEDS across PubTabNet/ICDAR/FinTabNet/SciTSR-PD) independently prove that synthetic benchmark success does not generalize.',
    },
    learning: {
      thought:
        'I read 0.9862 on dev and 0.9808 on val96 as evidence that the problem was essentially solved and the remaining 1–2 points were housekeeping — a couple more rules for the collapsed header and the last QA misses.',
      observed:
        'A parallel Gemini session reported hidden-set TEDS 0.882 and QA 0.759 (never reproduced inside this repo). Independently, the lab had already measured the reason locally: on generator seeds the pipeline is saturated (“Rest-Headroom 0,002–0,006”), the OOD OCRBench-v2 baseline sits at TEDS 0.4774, and the lexicon’s sign flips outside the generator distribution.',
      understood:
        'A near-perfect score on data you generated yourself mostly measures your generator. 0.9862 and 0.4774 are not contradictory numbers — they answer two different questions, and 0.002–0.006 rest headroom was never “two points left to find”, it was saturation of the synthetic benchmark.',
      question:
        'What would make a score believable without a holdout? The project designed a ladder plus promotion gate plus replication set — machinery built and never executed. Is there a cheaper form of belief a two-day hackathon can actually afford?',
    },
    metrics: [
      { label: 'Hidden-set TEDS', value: 0.882, dataset: 'hidden', caveat: 'REPORTED — not reproduced locally; not a FINAL score and source system unspecified.' },
      { label: 'Hidden-set QA', value: 0.759, dataset: 'hidden', caveat: 'REPORTED — not reproduced locally.' },
      { label: 'Lexicon ablation, synthetic', value: -0.032, dataset: '4/4 generator seeds', direction: 'down' },
      { label: 'Lexicon ablation, OOD', value: 0.0067, dataset: 'OCRBench-v2 (5 better, 0 worse)', direction: 'up' },
      { label: 'OOD baseline TEDS', value: 0.4774, dataset: 'OCRBench-v2', caveat: 'Measured locally, independently of Gemini.' },
      { label: 'Rest headroom on generator seeds', value: '0.002–0.006', dataset: 'synthetic', caveat: 'PILOT_REPORT: “die Pipeline ist ausgereizt”.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — OOD ablation results' },
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — hidden-set reference', note: 'Marked BERICHT (reported) from a Gemini session' },
    ],
    evidence: 'reported',
    branches: ['lab/autoresearch-a'],
    quotes: [
      {
        text: 'Auf Generator-Seeds ist die Pipeline ausgereizt: Rest-Headroom 0,002–0,006, Tesseract-Konfiguration bewegt nur Rauschen.',
        context: 'PILOT_REPORT.md, answer to the lead question [on generator seeds the pipeline is exhausted: rest headroom 0.002–0.006, the Tesseract configuration only moves noise.]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
    ],
    feature: 'failure',
    unresolved: [
      'The hidden-set number was reported by another session and never independently reproduced inside this repo.',
      'Whether the 2-px render gap (0.038) contributes to the hidden drop is explicitly left as an open hypothesis.',
    ],
  },
  {
    id: 'ev-2026-11-21-lexicon-sign-flip',
    order: 70,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'OOD & ablations',
    title: 'A component that helps inside the distribution and hurts outside it',
    summary:
      'Four ablations of the classic-CV pipeline are measured across four fresh generator seeds (96 tables each) and OOD on OCRBench-v2 (24 real tables; baseline TEDS 0.4774, TEDS-S 0.6813, CellF1 0.1058). E3 (lexicon snapping off) loses −0.032 mean FINAL on synthetic seeds (−0.0407 / −0.0254 / −0.0289 / −0.0336), but gains +0.0067 TEDS on OCRBench-v2 (0.4774 → 0.4841; 5 better, 0 worse) — the sign flips. E2 (perspective off): −0.016 synthetic, −0.0005 OOD; E1 (3→1 reads): −0.0012 synthetic, +0.0001 OOD; E4 (median off): −0.0009 synthetic, −0.0011 OOD.',
    significance: {
      tech: 'The variance space is characterized by component, not by score. Every OCR configuration candidate moves less than the paired MDE (0.0013) on replication sets — CI includes zero. Meanwhile the lexicon, the largest synthetic effect, reverses sign out of distribution ("Robust über Seeds ≠ robust auf Hidden").',
      learning:
        'A component can be simultaneously a genuine improvement in-distribution and a liability out-of-distribution. Sign is not a property of the component; it is a property of the component-plus-data pair.',
      narrative:
        'The sharpest technical result of the lab: removing the generator-vocabulary lexicon hurt all four synthetic seeds (−0.032 mean FINAL; 61, 41, 48, and 53 tables worsened), yet on real-world OCRBench-v2 tables the exact same ablation gained +0.0067 TEDS (5 better, 0 worse). Four independent seeds had looked like ironclad proof, and they were testing stability under one distribution — blind to a sign flip.',
      retro:
        'Decisive proof of generator-binding: components tuned to generator word lists, typography, and formatting rules flip sign outside that synthetic world (−0.032 synthetic vs +0.0067 OOD). Stability across synthetic seeds does not measure real-world robustness.',
    },
    learning: {
      thought:
        'I treated a component’s effect as a property of the component. If snapping a label to the nearest known word pool improves the score on four independent generator seeds, then it is a good component and should stay.',
      observed:
        'Removing the lexicon cost −0.0407 (lab_r3101), −0.0254 (r3102), −0.0289 (r3103), −0.0336 (r3104) — mean −0.032 — with 61, 41, 48 and 53 tables worsened and QA losses of 119, 74, 83 and 99 hits. On OCRBench-v2 the same ablation gained +0.0067 TEDS: 5 tables better, 0 worse. Perspective correction showed the same shape more weakly (−0.016 synthetic, −0.0005 OOD). The pilot report wrote the rule: “Robust über Seeds ≠ robust auf Hidden.”',
      understood:
        'Sign is not a property of the component; it is a property of the component-plus-data pair. Inside the generator distribution the lexicon snaps corrupted labels back to known pools; outside it, it drags real documents toward a vocabulary they never used. Four synthetic seeds only tested stability under one distribution — a sign flip is invisible until you leave the generator.',
      question:
        'Which other components carry hidden distribution assumptions, and can a sign flip be detected without leaving the distribution for a separate OOD benchmark?',
    },
    metrics: [
      { label: 'OOD baseline TEDS', value: 0.4774, dataset: 'OCRBench-v2 (24)', caveat: 'TEDS-S 0.6813, CellF1 0.1058.' },
      { label: 'E3 lexicon off (mean, 4 seeds)', value: -0.032, dataset: 'lab_r3101..3104 (96 each)', direction: 'down', caveat: 'Per seed: -0.0407 / -0.0254 / -0.0289 / -0.0336.' },
      { label: 'E3 lexicon off, OOD TEDS delta', value: 0.0067, dataset: 'OCRBench-v2 (24)', baseline: 0.4774, delta: '+0.0067', direction: 'up', caveat: 'SIGN FLIP: 0.4774 → 0.4841 (5 better, 0 worse).' },
      { label: 'E2 perspective off (synthetic / OOD)', value: '-0.016 / -0.0005', dataset: 'lab_r3101..3104 / OCRBench-v2', direction: 'down' },
      { label: 'E1 3-read vote off (synthetic / OOD)', value: '-0.0012 / +0.0001', dataset: 'lab_r3101..3104 / OCRBench-v2' },
      { label: 'E4 median filter off (synthetic / OOD)', value: '-0.0009 / -0.0011', dataset: 'lab_r3101..3104 / OCRBench-v2', direction: 'down' },
      { label: 'Paired / Unpaired MDE', value: '0.0013 / 0.0045', unit: 'ΔFINAL at n=96', dataset: 'lab calibration' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — Ergebnis table' },
      { kind: 'doc', ref: 'challenge/autoresearch/VARIANCE_SPACE.md', label: 'VARIANCE_SPACE.md — parameterised components E1–E4' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/ablation.log', label: 'runs/ablation.log', note: '16 paired ablation runs across 4 seeds' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/ood/E3.json', label: 'runs/ood/E3.json', note: 'OOD paired lexicon ablation (sign flip)' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/ood/E1.json', label: 'runs/ood/E1.json' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/ood/E2.json', label: 'runs/ood/E2.json' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/ood/E4.json', label: 'runs/ood/E4.json' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'lab/autoresearch-ts'],
    quotes: [
      {
        text: 'Das Lexikon ist die einzige Komponente mit großem Effekt, und das Vorzeichen kippt außerhalb der Generator-Verteilung. Robust über Seeds ≠ robust auf Hidden.',
        context: 'PILOT_REPORT.md [the lexicon is the only component with a large effect, and the sign flips outside the generator distribution. Robust across seeds ≠ robust on hidden.]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
      {
        text: 'unpaired: Baseline-FINAL ueber 9 Seeds (n=96) sd 0.0013, range 0.994-0.9985 -> ungepaarte Vergleiche brauchen >= 0.0045',
        context: 'runs/null/calibration.txt [unpaired comparisons need ≥ 0.0045]',
        source: 'challenge/autoresearch/runs/null/calibration.txt',
      },
      {
        text: 'paired SE (n=96, small effects, 8 Paare): median 0.00054 range 0.00031-0.00117',
        context: 'runs/null/calibration.txt — the paired noise floor [paired SE (n=96, small effects, 8 pairs): median 0.00054, range 0.00031–0.00117]',
        source: 'challenge/autoresearch/runs/null/calibration.txt',
      },
    ],
    feature: 'reversal',
  },
  {
    id: 'ev-2026-11-21-research-verdicts',
    order: 75,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Option space closed',
    title: 'Five research notes turn the candidate list into a closed set',
    summary:
      'Five notes are written against a shared template with claim tables, confidence columns, and revisit conditions: Camelot (PDF library — returns 0 tables on image-only PDFs without a text layer; flavor="ml" is TATR + RapidOCR), Docling/TableFormer (53.2M params / 213 MB vs TATR 28.8M / 110 MB, structure + foreign OCR), PP-Structure (only SLANet_plus is text-free at 6.9 MB / 41.8 ms CPU), MinerU (separating model, OTSL converter, and rule layer), and img2table (heuristic OpenCV wrapper with no learned model).',
    significance: {
      tech: 'Every note ends with an explicit recommendation, local numbers wherever measured, and a revisit condition — closing the option space to candidates already on the board while flagging vendor PubTabNet/PubTables-1M numbers as non-comparable.',
      learning:
        'A research note that ends in "maybe" has failed. Every one of these ends in a verdict and a revisit condition.',
      narrative:
        'Before guessing from reputation, they read the source code of five candidate systems — Camelot, Docling/TableFormer, PP-Structure, MinerU, and img2table — and recorded explicit verdicts, non-comparability caveats against vendor PubTabNet scores, and exact conditions under which a rejected option should be revisited.',
    },
    metrics: [
      { label: 'Camelot tables on image-only PDF', value: 0, unit: 'tables', dataset: 'image -> PDF (no text layer)', caveat: 'extract_tables() aborts without a text layer.' },
      { label: 'TATR vs TableFormer size', value: '28.8M (110 MB) vs 53.2M (213 MB)', dataset: 'model specs' },
      { label: 'SLANet_plus size / CPU speed', value: '6.9 MB / 41.8 ms', dataset: 'model specs', caveat: 'Vendor PubTabNet TEDS 0.9589 (2022) is clean PDF renders, not comparable to dev.' },
      { label: 'TATR published GriTS_Top', value: 0.9849, dataset: 'PubTables-1M', caveat: 'Published clean-render figure; not comparable to dev.' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/research/Camelot_Research.md', label: 'Camelot_Research.md' },
      { kind: 'file', ref: 'challenge/research/Docling_Research.md', label: 'Docling_Research.md' },
      { kind: 'file', ref: 'challenge/research/PP-Structure_Research.md', label: 'PP-Structure_Research.md' },
      { kind: 'file', ref: 'challenge/research/MinerU_Research.md', label: 'MinerU_Research.md' },
      { kind: 'file', ref: 'challenge/research/img2table_Research.md', label: 'img2table_Research.md' },
      { kind: 'file', ref: 'challenge/TATR_RESEARCH.md', label: 'TATR_RESEARCH.md' },
    ],
    evidence: 'measured-local',
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-unmeasured-candidates-measured',
    order: 80,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Closing the loop',
    title: 'Four previously unmeasured candidates are run on dev — expanding the board from 23 to 28',
    summary:
      'Four systems whose research notes had relied on source inspection are executed on dev through the official scorer: PP-Structure (PaddleOCR 3.7 stock) scores FINAL 0.6083 (T3 collapses to 0.432, 6.52 s/table); img2table 3.x (borderless on, Tesseract psm 7) scores 0.5868 (4.42 s/table); Docling 2.151.1 toolkit (layout + TableFormer + RapidOCR CPU — distinct from the Docling VLMs) scores 0.8132 (2.38 s/table); Camelot 2.0 (after OCRmyPDF manufactures a text layer) scores 0.2296 (0.730 on T0, collapsing to 0.120 on T2 — below the 0.3424 Tesseract floor).',
    significance: {
      tech: 'Three verdicts held as predicted and one changed: Camelot produced tables once OCRmyPDF synthesized a text layer, only to collapse on degraded tiers (0.120 on T2) where 70% of the objective weight sits. Promoting TATR + Tesseract alongside these four grew `LEADERBOARD.md` from 23 to 28 scored rows.',
      learning:
        'A verdict written from source code is still a hypothesis. A review is a prediction; a run is a number.',
      narrative:
        'They read the code, formed opinions, and then ran all four unmeasured candidates through the official dev scorer anyway — expanding the board from 23 to 28 scored rows so no verdict rested on code inspection alone.',
    },
    learning: {
      thought:
        'After inspecting the source code of Camelot, PP-Structure, img2table, and Docling, their rankings felt predictable enough to settle on paper — especially Camelot returning 0 tables on image-only PDFs.',
      observed:
        'Running all four on dev through the official scorer confirmed three verdicts and revised one mechanism: Docling toolkit hit 0.8132, PP-Structure 0.6083, img2table 0.5868, and Camelot (given a synthetic text layer via OCRmyPDF) did emit tables at 0.2296 — collapsing to 0.120 on T2, below the 0.3424 Tesseract floor.',
      understood:
        'Source inspection predicts failure mechanisms, not system scores. Even a library that fails cleanly on raw images can be made to run and still fail on the weighted tiers (T2/T3) that decide 70% of TEDS.',
      question:
        'How much of the gap on weak classical parsers (img2table, SLANet_plus, Docling) comes from the model itself versus raw degraded inputs?',
    },
    metrics: [
      { label: 'Docling 2.151.1 toolkit FINAL', value: 0.8132, dataset: 'dev', tier: 'all', caveat: 'T0 0.770, T1 0.975, T2 0.896, T3 0.705, QA 0.758, CellF1 0.739, 2.38 s/table.' },
      { label: 'PP-Structure (stock) FINAL', value: 0.6083, dataset: 'dev', tier: 'all', caveat: 'T3 0.432, QA 0.325, 6.52 s/table.' },
      { label: 'img2table 3.x FINAL', value: 0.5868, dataset: 'dev', tier: 'all', caveat: 'Borderless on, Tesseract psm 7; QA 0.375, 4.42 s/table.' },
      { label: 'Camelot 2.0 (via OCRmyPDF) FINAL', value: 0.2296, dataset: 'dev', tier: 'all', caveat: 'T0 0.730, T2 0.120 — below the 0.3424 Tesseract floor.' },
      { label: 'Leaderboard size', value: '23 → 28', unit: 'scored models', dataset: 'dev' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md rows 30–33' },
      { kind: 'file', ref: 'metrics/LEADERBOARD.md', label: 'metrics/LEADERBOARD.md', note: '28-model board snapshot' },
      { kind: 'run', ref: 'docling__dev__728c94f0', label: 'runs.jsonl: docling__dev__728c94f0' },
      { kind: 'run', ref: 'pp-structure__dev__cef39a30', label: 'runs.jsonl: pp-structure__dev__cef39a30' },
      { kind: 'run', ref: 'img2table__dev__3609cc25', label: 'runs.jsonl: img2table__dev__3609cc25' },
      { kind: 'run', ref: 'camelot__dev__8117b0ae', label: 'runs.jsonl: camelot__dev__8117b0ae' },
    ],
    evidence: 'measured-official',
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-classic-cv-pipeline',
    order: 85,
    date: '2026-11-21',
    time: '17:10',
    timestamp: '2026-11-21T17:10:13+01:00',
    timeConfidence: 'exact',
    kicker: 'Third line',
    title: 'The classic-CV + Tesseract pipeline reaches 0.9971 on dev — on a different host, dataset, and scorer path',
    summary:
      'A third architecture (`tablesalt/`: illumination + Otsu preprocessing, blob structure, rs=2 stub and group-DP span detection, batched Tesseract with 3 crop variants and digit vote, per-table number format, and lexicon snapping) lands on `main` with 35 tests. Its own ledger reports dev(24) FINAL 0.9971 (6.41 s/table) and val(200) FINAL 0.9963 (seed 2, rendered on Windows with Arial and Tesseract 5.4.0 across 12 workers). The lab pilot later reproduced it at 0.9998 on dev(24) and 0.9957 on val(200).',
    significance: {
      tech: 'Reaches its scores with zero VLM weights, but on a different validation set (n=200 Windows/Arial), OCR build (Tesseract 5.4.0), and local wrapper (`tools/eval_local.py`). Comparing 0.9971 directly against MinerU’s 0.9862 without platform and scorer caveats is invalid.',
      learning:
        'Two pipelines scoring the same 24 tables can differ by 0.011 without either being wrong — if the rendering, OCR build, and scorer path differ.',
      narrative:
        'A third architecture with zero VLM weights landed on `main` at 17:10 — reporting 0.9971 on dev and 0.9963 on a 200-table Windows/Arial split (`0.9998 / 0.9957` in the lab pilot’s reproduction). Three architectures, three ledgers, and an immediate warning against reading numbers across different hosts and OCR builds as one leaderboard.',
      retro:
        'Audit A & C critique: the core `tablesalt/` package arrived as a single 2,827-line agent-assisted commit (`cd54a0c`) without a recorded line-by-line review, and later powered the `grokbot-abgabe` submission line (0.9971 synthetic dev vs 0.259–0.517 on real public datasets in ADR-017). High velocity outpaced personal code verification and cross-branch integration.',
    },
    metrics: [
      {
        label: 'FINAL (classic-CV, Windows Tesseract 5.4.0)',
        value: 0.9971,
        dataset: 'dev (24)',
        baseline: 0.348,
        delta: '+0.6491',
        direction: 'up',
        caveat: 'Scored via tools/eval_local.py on Windows (Tesseract 5.4.0, 6.41 s/table) — NOT comparable directly to Mac/MLX MinerU rows.',
      },
      {
        label: 'FINAL (classic-CV, Windows Arial render)',
        value: 0.9963,
        dataset: 'val (200, seed 2)',
        caveat: '200-table Windows Arial set, different from val96.',
      },
      {
        label: 'Lab pilot reproduction (dev / val200)',
        value: '0.9998 / 0.9957',
        dataset: 'dev (24) / val (200)',
        caveat: 'REPORTED in PILOT_REPORT.md — two reproductions of dev(24) differ by 0.0027.',
      },
      { label: 'TEDS-S (structure only)', value: 1.0, dataset: 'dev (24)' },
    ],
    sources: [
      { kind: 'commit', ref: 'cd54a0c', label: 'Add tablesalt classic-CV + Tesseract pipeline (agent.md M0-M9)' },
      { kind: 'file', ref: 'docs/RESULTS.md', label: 'docs/RESULTS.md @cd54a0c', note: 'Per-step ledger with tier breakdown, QA, TEDS-S, and s/table' },
      { kind: 'file', ref: 'docs/LEARNLOG.md', label: 'docs/LEARNLOG.md @cd54a0c' },
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — baseline reproduction' },
    ],
    evidence: 'reported',
    commits: ['cd54a0c'],
    branches: ['main', 'origin/tesseract-pipeline', 'lab/autoresearch-ts'],
    diagram: {
      kind: 'architecture',
      title: 'The classic-CV + Tesseract pipeline',
      caption:
        'A third architecture with no VLM weights. Its 0.9971 dev score sits on a different host, Tesseract build, and scorer path than the VLM rows.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'prep', label: 'Illumination + Otsu + deskew + homography', kind: 'process', changed: true },
        { id: 'struct', label: 'Blob structure: rows, right-edge cols, style', kind: 'process', changed: true },
        { id: 'spans', label: 'Spans: rs=2 stub, group DP, cs=2 merges', kind: 'process', changed: true },
        { id: 'ocr', label: 'Batched Tesseract, 3 crop variants + digit vote', kind: 'model', changed: true },
        { id: 'post', label: 'Per-table number format + lexicon snapping', kind: 'process', changed: true },
        { id: 'out', label: 'cells.json', kind: 'output', changed: true },
        { id: 'm', label: 'dev 0.9971 · val200 0.9963', kind: 'metric', changed: true },
        { id: 'cav', label: 'Windows / Tesseract 5.4.0 path', kind: 'decision', changed: true },
      ],
      edges: [
        { from: 'img', to: 'prep' },
        { from: 'prep', to: 'struct' },
        { from: 'struct', to: 'spans' },
        { from: 'spans', to: 'ocr' },
        { from: 'ocr', to: 'post' },
        { from: 'post', to: 'out' },
        { from: 'out', to: 'm' },
        { from: 'cav', to: 'm', label: 'different measurement footing' },
      ],
    },
    feature: 'question',
  },
  {
    id: 'ev-2026-11-21-small-model-matrix',
    order: 90,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Small models',
    title: 'Classical and small-model parsers, measured twice: as shipped and with Enes DataPrep',
    summary:
      'Five small/classical parsers are scored on dev both pure and with Enes’s DataPrep recipe (crop dark frame, upscale, deskew, binarize, line masks): img2table 0.5868 → 0.7362; RapidTable SLANet_plus (7.4 MB ONNX + PP-OCRv6) 0.5046 → 0.6718 (T3 0.252 → 0.659); IBM Docling / TableFormer 0.8132 → 0.9239 (~3.0 s/table). Two TATR stacks: TATR + PP-OCRv5 ONNX (7.9 MB) 0.7441 and TATR + PARSeq (23M ViT) 0.6372 (QA 0.108).',
    significance: {
      tech: 'DataPrep moved weak parsers by +0.11 to +0.17 FINAL, yet the strongest small system (Docling + DataPrep 0.9239) still trailed the raw VLM (0.9659) and the VLM + rule layer (0.9862). Also exposes a real run-config discrepancy: an earlier research-note config of img2table (2× upscale, psm 11) scored 0.3856 dev / 0.3026 val96 (42% empty tables).',
      learning:
        'Input preparation can matter more to weak parsers than swapping the parser itself, while still leaving a structural ceiling below end-to-end VLMs.',
      narrative:
        'The strongest small classical system was not a single model, but a model paired with Enes’s DataPrep recipe for its input (`Docling 0.8132 → 0.9239`, `SLANet_plus 0.5046 → 0.6718`, `img2table 0.5868 → 0.7362`). Yet even after +0.11 to +0.17 gains, every small stack still sat well below the raw 1.2B VLM.',
    },
    learning: {
      thought:
        'When `img2table`, `SLANet_plus`, and `Docling` scored 0.50–0.81 out of the box, it was easy to dismiss lightweight classical parsers as fundamentally incapable on degraded tables.',
      observed:
        'Applying Enes’s DataPrep recipe (crop dark frame, upscale, deskew, binarize, line masks) lifted every weak parser by +0.11 to +0.17 FINAL on dev: `img2table` 0.5868 → 0.7362, `SLANet_plus` 0.5046 → 0.6718 (T3 0.252 → 0.659), and `Docling` 0.8132 → 0.9239 (~3.0 s/table) — while still trailing raw MinerU2.5 (0.9659).',
      understood:
        'For classical parsers, input normalization is often worth more than swapping the model itself — yet even clean inputs leave a ceiling below an end-to-end VLM on complex layouts.',
      question:
        'Where does a separate CPU-only classical pipeline break when it moves beyond the 24 dev tables to 96 tables?',
    },
    metrics: [
      { label: 'Docling / TableFormer, pur → +DataPrep', value: '0.8132 → 0.9239', dataset: 'dev', baseline: 0.8132, delta: '+0.1107', direction: 'up' },
      { label: 'img2table, pur → +DataPrep', value: '0.5868 → 0.7362', dataset: 'dev', baseline: 0.5868, delta: '+0.1494', direction: 'up', caveat: 'Earlier img2table_Research.md config (2× upscale, psm 11) scored 0.3856 dev / 0.3026 val96.' },
      { label: 'RapidTable SLANet_plus, pur → +DataPrep', value: '0.5046 → 0.6718', dataset: 'dev', baseline: 0.5046, delta: '+0.1672', direction: 'up', caveat: 'T3 jumped 0.252 → 0.659 on 6 dev tables.' },
      { label: 'TATR + PP-OCRv5 ONNX (7.9 MB)', value: 0.7441, dataset: 'dev' },
      { label: 'TATR + PARSeq (23M ViT)', value: 0.6372, dataset: 'dev', caveat: 'QA collapses to 0.108.' },
      { label: 'img2table structure ceiling (GT text)', value: 0.7188, dataset: 'dev', caveat: 'ORACLE text ceiling.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md rows 13–16' },
      { kind: 'file', ref: 'challenge/research/img2table_Research.md', label: 'img2table_Research.md §4' },
      { kind: 'file', ref: 'out/enes_repo/tableparser/preprocess.py', label: 'tableparser/preprocess.py', note: 'Enes DataPrep recipe' },
      { kind: 'commit', ref: 'f505b61', label: 'feat(coherence): ... and log small-model matrix' },
    ],
    evidence: 'measured-official',
    commits: ['f505b61'],
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-enes-tableparser-line',
    order: 95,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'A second line',
    title: 'Enes’s tableparser: a CPU-only line kept separate from the MinerU pipeline',
    summary:
      'An independent CPU + PP-OCRv5 ONNX pipeline built by Enes (`tableparser`) is scored separately on the official scorer: dev FINAL 0.9704 (T0 0.999, T1 0.995, T2 0.981, T3 0.978, QA 0.892, 2.05 s/table) and val96 FINAL 0.9336 (T3 0.905, QA 0.883, ~3.3 s/table) — a −0.0368 drop from dev to val96. Its own log reports 0.9262 → 0.9573 on a 100-table set and FinTabNet degraded TEDS 0.201 → 0.454.',
    significance: {
      tech: 'Kept strictly separate from the MinerU pipeline in all tables and claims. Provides clean evidence of dev-to-val96 generalization drop (−0.037) on a fully offline CPU weights-in-image system, alongside a depth-4 tier triage tree built for speed rather than score.',
      learning:
        'The dev-to-val gap of a system is more informative than its dev score.',
      narrative:
        'Two architectures, two scorecards, one ledger. Scored separately on the official scorer, Enes’s CPU-only `tableparser` reached 0.9704 on dev and dropped −0.0368 to 0.9336 on val96 (with T3 falling 0.978 → 0.905) — showing in plain numbers how fast a 24-table dev score separates from 96 tables.',
      retro:
        'Audit C correction: Git commit counts alone underestimate human-to-human collaboration because Enes’s `tableparser` entered as evaluated artifacts rather than commits in this repo. Yet whether teammates jointly discussed, decided, and integrated artifacts — or mainly shared outputs across parallel tracks — remains an open question.',
    },
    metrics: [
      { label: 'Enes tableparser FINAL', value: 0.9704, dataset: 'dev', tier: 'all', caveat: 'Official scorer; separate system from MinerU.' },
      { label: 'Enes tableparser FINAL', value: 0.9336, dataset: 'val96', baseline: 0.9704, delta: '-0.0368', direction: 'down', tier: 'all' },
      { label: 'QA accuracy (dev / val96)', value: '0.892 / 0.883', dataset: 'dev / val96' },
      { label: 'T3 weighted TEDS (dev → val96)', value: '0.978 → 0.905', dataset: 'dev / val96', baseline: 0.978, delta: '-0.073', direction: 'down', tier: 'T3' },
      { label: 'Runtime (dev / val96)', value: '2.05 / ~3.3', unit: 's/table', dataset: 'dev / val96' },
      { label: 'FinTabNet degraded TEDS', value: 0.454, dataset: 'FinTabNet', baseline: 0.201, delta: '+0.253', direction: 'up', caveat: 'REPORTED in NIGHT_LOG.md — real-world tables.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md rows 17–18' },
      { kind: 'file', ref: 'out/enes_repo/NIGHT_LOG.md', label: 'NIGHT_LOG.md', note: 'Parallel line step ledger and FinTabNet numbers' },
      { kind: 'file', ref: 'out/enes_repo/tableparser/triage.py', label: 'tableparser/triage.py', note: 'Depth-4 tier triage tree for fast path' },
      { kind: 'doc', ref: 'challenge/PARKING.md', label: 'PARKING.md' },
    ],
    evidence: 'reported',
    branches: ['feat/vlm-ocr-bench'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-coherence-layer',
    order: 100,
    date: '2026-11-21',
    time: '17:18',
    timestamp: '2026-11-21T17:18:57+01:00',
    timeConfidence: 'exact',
    kicker: 'Coherence layer (G4)',
    title: 'A zero-byte layer that repairs coherence with zero regressions',
    summary:
      'Layer-1 Coherence post-processing (`scripts/coherence_postprocess.py`) is added: 0 MB of weights, under 1 ms per table, parser-agnostic over any `cells.json`, and never touches numeric body cells. On Enes’s tableparser output it improves 4/24 dev tables with 0 regressions (dev FINAL 0.9704 → 0.9774, CellF1 0.9807) and 17/96 val96 tables with 0 regressions (val96 FINAL 0.9336 → 0.9551, lifting CellF1 from 0.8467 to 0.9387).',
    significance: {
      tech: 'Because it reads cells rather than pixels and leaves numeric body cells untouched, the layer generalized immediately to an independent upstream parser with 0/120 regressions — proving structural/label consistency errors are distinct from recognition errors.',
      learning:
        'Improving 17 tables while regressing none is a very different claim from improving a mean. The zero-regression guard rail is what makes a rule layer safe to ship.',
      narrative:
        'The last technical win of the evening was not a model: a coherence layer of zero bytes and under a millisecond, applied after `cells.json`, improved 17 of 96 val96 tables on Enes’s `tableparser` and regressed none — lifting FINAL from 0.9336 to 0.9551 and CellF1 from 0.8467 to 0.9387. The gain was not character recognition; it was making the output consistent with itself.',
      retro:
        'Strongest proof of genuine human-to-human interface in the project (Audit C): Enes’s independent `tableparser` + Samuel’s Layer-1 coherence pass (`0.9336 → 0.9551`, 0 regressions). Even so, it stayed an experimental interface rather than becoming the integrated `main` submission.',
    },
    learning: {
      thought:
        'After writing P0–P5 specifically around MinerU2.5’s OTSL outputs, I expected post-processing repairs to remain coupled to that single VLM’s quirks.',
      observed:
        'A parser-agnostic Layer-1 coherence pass (`scripts/coherence_postprocess.py`, 0 MB weights, <1 ms/table, leaving numeric body cells untouched) applied to Enes’s independent `tableparser` improved 4/24 dev tables (0.9704 → 0.9774) and 17/96 val96 tables (0.9336 → 0.9551, CellF1 0.8467 → 0.9387) with 0/120 tables regressed.',
      understood:
        'Structural and label coherence errors live in the predicted `cells.json` grid, independent of whether a VLM or a CPU OCR engine produced them — and enforcing a zero-regression invariant is what turns a heuristic into a portable layer.',
      question:
        'If a zero-byte coherence layer can improve predictions without touching weights, how do we verify the container itself behaves identically outside our laptop?',
    },
    metrics: [
      { label: 'FINAL with coherence', value: 0.9774, dataset: 'dev', baseline: 0.9704, delta: '+0.0070', direction: 'up', tier: 'all', caveat: '4/24 tables improved, 0 regressed.' },
      { label: 'FINAL with coherence', value: 0.9551, dataset: 'val96', baseline: 0.9336, delta: '+0.0215', direction: 'up', tier: 'all', caveat: '17/96 tables improved, 0 regressed.' },
      { label: 'CellF1 on val96', value: 0.9387, dataset: 'val96', baseline: 0.8467, delta: '+0.0920', direction: 'up' },
      { label: 'CellF1 on dev', value: 0.9807, dataset: 'dev' },
      { label: 'Tables regressed', value: '0/120', dataset: 'dev + val96' },
      { label: 'Cost', value: 0, unit: 'MB, <1 ms', dataset: 'dev + val96' },
    ],
    sources: [
      { kind: 'commit', ref: 'f505b61', label: 'feat(coherence): add Layer-1 coherence postprocess (+0.0215 val96, 0 regressions)' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — coherence rows 19–20' },
      { kind: 'file', ref: 'scripts/coherence_postprocess.py', label: 'scripts/coherence_postprocess.py' },
    ],
    evidence: 'measured-official',
    commits: ['f505b61'],
    branches: ['feat/vlm-ocr-bench'],
    diagram: {
      kind: 'layer-stack',
      title: 'G4 · Coherence as a portable repair layer',
      caption:
        'Operates on cells.json, never pixels, and never modifies numeric body cells — making it attachable to an independent upstream parser with 0/120 regressions.',
      nodes: [
        { id: 'parser', label: 'Any parser output (cells.json)', detail: 'Enes tableparser here', kind: 'input' },
        { id: 'rules', label: 'Layer-1 coherence rules', detail: 'phantom row 0, header & label OCR repair', kind: 'process', changed: true },
        { id: 'keep', label: 'Numeric body cells untouched', kind: 'decision', changed: true },
        { id: 'out', label: 'Repaired cells.json', kind: 'output', changed: true },
        { id: 'm-dev', label: 'dev 0.9704 → 0.9774', kind: 'metric', changed: true },
        { id: 'm-val', label: 'val96 0.9336 → 0.9551', kind: 'metric', changed: true },
      ],
      edges: [
        { from: 'parser', to: 'rules' },
        { from: 'rules', to: 'keep' },
        { from: 'rules', to: 'out' },
        { from: 'out', to: 'm-dev' },
        { from: 'out', to: 'm-val' },
      ],
    },
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-submission-container',
    order: 105,
    date: '2026-11-21',
    time: '17:55',
    timestamp: '2026-11-21T17:55:50+01:00',
    timeConfidence: 'exact',
    kicker: 'Submission',
    title: 'The work becomes something that can actually be handed over',
    summary:
      'A multi-variant CUDA submission container and offline evaluation harness are committed (`0ea8b01`). The commit message states 3.56 GB, corrected in `f418c99` and `benchmarks/cuda/README.md` to 5.7 GB (still well under the 15 GB limit). The `linux/amd64` image runs with `--network none`, bakes TATR weights at build time via `fetch_weights.py`, and enforces two build-time preflight checks (a Tesseract digit read test and an offline `local_files_only=True` TATR load) after a broken `TESSDATA_PREFIX` earlier produced FINAL 0.16 with a clean log.',
    significance: {
      tech: 'Hard delivery gates enforced at build time rather than discovered at scoring time: offline execution, baked weights, and <15 s/table inside the container (3.84 s/table under amd64 emulation on Apple Silicon, FINAL 0.7124 with Tesseract 5.3.4 vs 0.7268 on host).',
      learning:
        'A clean log is not evidence of a working run, and a number measured on your machine is a hypothesis about your machine. A container that fails at build time is worth more than one that fails at the finish line.',
      narrative:
        'At 17:55, the project becomes a hand-over artifact: 5.7 GB (corrected from 3.56 GB in `f418c99`), built from the repository root, run with `--network none`. Then came the uncomfortable cross-environment measurement: running Tesseract 5.3.4 under `linux/amd64` emulation produced 0.7124 on dev at 3.84 s/table against 0.7268 on the Mac host — a 0.0144 delta from the container environment alone, and the same lesson as the two-pixel render gap one level up.',
      retro:
        'Open historical contradiction (Audit A): two competing delivery lines existed — the CUDA-TATR container (`feat/vlm-ocr-bench`, 0.7124 dev) vs. the lightweight CPU `tablesalt/` submission (`grokbot-abgabe`, 520 MB, 0.9971 dev, PR #2 open draft), while `origin/main` remained at `973cc2d` and official organizer registration/result is undocumented.',
    },
    learning: {
      thought:
        'Once the pipeline ran cleanly on the host at 0.7268 and exited 0 inside Docker, I expected container packaging to be a mechanical copy of the exact same behavior and score.',
      observed:
        'An early broken `TESSDATA_PREFIX` inside Docker produced FINAL 0.16 while exiting cleanly, forcing two build-time preflight checks (Tesseract digit read + `local_files_only=True` TATR load). Once fixed, the `linux/amd64` image (Tesseract 5.3.4, `--network none`, 5.7 GB) scored 0.7124 on dev at 3.84 s/table — 0.0144 below the Mac host’s 0.7268 (Tesseract 5.5.3).',
      understood:
        'A clean exit code proves nothing without a semantic preflight check, and a number measured on your laptop is only a hypothesis about your laptop until the exact `linux/amd64` offline container reproduces it.',
      question:
        'With the submission container verified offline under the 15 s/table gate, what happens when the autonomous agent lab tries to improve the pipeline on its own?',
    },
    metrics: [
      { label: 'Container run (Tesseract 5.3.4, amd64 emulated)', value: 0.7124, dataset: 'dev', baseline: 0.7268, delta: '-0.0144', direction: 'down' },
      { label: 'Container image size', value: '5.7 (3.56 in 0ea8b01 msg)', unit: 'GB', dataset: 'submission container', caveat: 'Corrected from 3.56 GB to 5.7 GB in commit f418c99; hard limit is 15 GB.' },
      { label: 'Runtime in container (emulated)', value: 3.84, unit: 's/table', dataset: 'dev' },
      { label: 'Runtime budget', value: 15, unit: 's/table', dataset: 'challenge contract', caveat: 'Hard gate' },
    ],
    sources: [
      { kind: 'commit', ref: '0ea8b01', label: 'feat(docker): add multi-variant CUDA submission container and offline eval harness' },
      { kind: 'commit', ref: 'f418c99', label: 'docs(bench): correct the image size in the transfer instructions (5.7 GB)' },
      { kind: 'file', ref: 'benchmarks/cuda/Dockerfile', label: 'benchmarks/cuda/Dockerfile' },
      { kind: 'file', ref: 'benchmarks/cuda/fetch_weights.py', label: 'benchmarks/cuda/fetch_weights.py' },
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md — container rows' },
    ],
    evidence: 'measured-official',
    commits: ['0ea8b01', 'f418c99'],
    branches: ['feat/vlm-ocr-bench', 'main', 'lab/autoresearch-ts'],
    feature: 'none',
  },
  {
    id: 'ev-2026-11-21-abandoned-lab',
    order: 110,
    date: '2026-11-21',
    timeConfidence: 'range',
    kicker: 'Abort (18:08–18:59)',
    title: 'The agent run is aborted — processes started, zero results produced',
    summary:
      'Mission `M-20261121T180824` (Line-A pilot) is stopped on owner instruction: "ABGEBROCHEN auf Owner-Anweisung. Agentenlauf nicht durchgeführt (alle LLM-Kontingente leer)." No agent run produced a result, nothing was promoted, and `experiments.jsonl` remained empty (0 lines). In the `wt-ts` CORAL attempt, an agent process did start across three arms at 18:31:54 (with a further attempt at 18:42:59), exited with code 1 / `no_result` three times, and was force-exited at 18:47:52 into `results_run1_aborted`. The report (written 18:59:19) still preserved concrete process findings: host CORAL isolation leaked relative paths until patched with a `sandbox-exec` shim, and exploratory calls burned budget without a local fast-eval path.',
    significance: {
      tech: 'The lab infrastructure was real — a CORAL grader bound to `score_all.py`, a paired-bootstrap + Holm promotion gate, three disjoint-ownership axes — and agent processes *did* launch in `wt-ts`, but every arm exited `no_result` and zero candidate runs completed.',
      learning:
        'Distinguishing "no agent process started" from "processes started but no run produced a result" matters. An abort report that names the untested hypotheses (H2: 1 vs 3 agents; c3: 3 concurrent axes) and the defects that burned budget is itself a measurement.',
      narrative:
        'The most honest document in the repository is titled "abort report". The project had built a careful machine for autonomous improvement, and it did not complete a single run: zero promotions, zero integrations, and an empty `experiments.jsonl` ledger. In `wt-ts`, CORAL logs show `captain-nemo` starting at 18:31:54 across three arms, exiting `no_result` three times, and force-exiting at 18:47:52 (`results_run1_aborted`) — while the report records only the immediate cause ("alle LLM-Kontingente leer" and owner instruction), leaving the conversation behind the stop unrecorded.',
      retro:
        'Agent↔Agent reality check (Audit A & C): CORAL Autoresearch had elaborate infrastructure (three disjoint axes, promotion gates, `sandbox-exec` shim), yet produced 0 completed runs, 0 promotions, and 0 integrations due to exhausted LLM quotas and missing fast local eval (`quick_eval.py`). Automation outran the measurement path.',
    },
    learning: {
      thought:
        'I thought the lab’s product was the improvement an autonomous agent loop would find across isolated worktrees, hidden graders, and a paired-bootstrap promotion gate.',
      observed:
        'PILOT_REPORT.md records: “ABGEBROCHEN auf Owner-Anweisung. Agentenlauf nicht durchgeführt (alle LLM-Kontingente leer).” In the `wt-ts` CORAL attempt an agent process (`captain-nemo`) did start at 18:31:54, exited with code 1 / `no_result` three times, and was force-exited at 18:47:52 (`results_run1_aborted`), with a second round starting 18:42:59. Zero promotions, zero integrations, 0-line `experiments.jsonl`. Surviving findings: host CORAL isolation leaked relative `.coral/private` paths until fixed with a `sandbox-exec` PATH shim (test 3 passed), and budget was burned on exploration without `quick_eval.py`.',
      understood:
        'The abort exposed which hypotheses never ran (H2: 1 vs 3 agents; c3: 3 concurrent axes) and revealed an arithmetic tension [INTERPRETATION]: the promotion gate required ΔFINAL ≥ 0.005 while the oracle ceiling over the five OCR variants was only 0.0013 in-distribution and 0.00379 OOD — so no candidate in that search space could have passed the gate even with unlimited budget.',
      question:
        'Was the abort only about exhausted LLM quotas, or was the search space mis-specified before it began? How do you price an idea’s oracle ceiling before spending a day building agent harnesses for it?',
    },
    metrics: [
      { label: 'Agent runs producing a result', value: 0, dataset: 'Line A pilot / wt-ts', caveat: 'Processes launched at 18:31:54 in wt-ts exited code 1 / no_result three times (force-exited 18:47:52).' },
      { label: 'Promotions / Integrations', value: 0, dataset: 'Line A pilot', caveat: 'experiments.jsonl has 0 lines.' },
      { label: 'Paired MDE', value: 0.0013, unit: 'ΔFINAL at n=96', dataset: 'lab calibration' },
      { label: 'Paired MDE', value: 0.0012, unit: 'ΔFINAL at n=120', dataset: 'lab calibration' },
      { label: 'Oracle ceiling of searched expert set (OOD)', value: 0.00379, unit: 'ΔTEDS', dataset: 'OCRBench-v2', caveat: 'Below the 0.005 promotion threshold.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/PILOT_REPORT.md', label: 'PILOT_REPORT.md — abort report (18:59:19)' },
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md §8c PAUSE' },
      { kind: 'file', ref: 'challenge/autoresearch/shared/experiments.jsonl', label: 'experiments.jsonl (0 lines / empty)', note: 'Confirms zero promotions' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'lab/autoresearch-ts'],
    quotes: [
      {
        text: 'ABGEBROCHEN auf Owner-Anweisung. Agentenlauf nicht durchgeführt (alle LLM-Kontingente leer).',
        context: 'PILOT_REPORT.md [ABORTED on owner instruction. Agent run not carried out (all LLM quotas empty).]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
      {
        text: 'c3 (drei Agentenachsen aktiv) — blockiert durch LLM-Kontingente. Keine Promotion, nichts integriert, nichts committet.',
        context: 'PILOT_REPORT.md [c3 (three agent axes active) — blocked by LLM quotas. No promotion, nothing integrated, nothing committed.]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
      {
        text: 'CORAL-Isolation auf Host unzureichend: `.coral/private` per relativem `cd` lesbar; `command` im Binding wird ignoriert. Behoben mit `sandbox-exec`-PATH-Shim (`sandbox/`), Test 3 bestanden.',
        context: 'PILOT_REPORT.md, process findings [CORAL isolation on the host insufficient: .coral/private readable via relative cd; command in the binding is ignored. Fixed with a sandbox-exec PATH shim (sandbox/), test 3 passed.]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
      {
        text: 'Agentenbudget verbrannt durch Erkundung ohne lokalen Messweg (Lauf 1). `quick_eval.py` im Seed behebt das — für einen späteren Lauf.',
        context: 'PILOT_REPORT.md, process findings [agent budget burned by exploration without a local measurement path (run 1). quick_eval.py in the seed fixes that — for a later run.]',
        source: 'challenge/autoresearch/PILOT_REPORT.md',
      },
    ],
    feature: 'failure',
    unresolved: [
      'Hypothesis H2 (1 agent vs 3 agents at equal scorer budget) was never tested.',
      'The three agent axes (preprocessing / text recognition / structure+postprocessing) never completed a run concurrently.',
      'The error registry and experiments.jsonl promotion ledger remained empty (0 lines).',
    ],
  },
  {
    id: 'ev-2026-11-21-learnable-architecture',
    order: 115,
    date: '2026-11-21',
    time: '19:08',
    timestamp: '2026-11-21T19:08:28+01:00',
    timeConfidence: 'exact',
    kicker: 'Self-validation (G4)',
    title: 'A ground-truth-free self-check flags bad tables and routes a second opinion',
    summary:
      'Commit `3c1a053` (merged via PR #1 `973cc2d` at 19:21) adds `tablesalt/selfcheck.py` — realising the kick-off speech’s "validation layer that flags uncertain extractions instead of guessing" as deterministic rules that need zero ground truth: header sequence, label pool, single number format, units, empties, and grid coverage. On 224 known-correct tables it flagged 0. Flagged tables are re-read with alternative layout settings (selecting the read with fewer self-check issues), skipping extra reads near a 12 s deadline (`TABLESALT_DEADLINE_S`, toggleable via `TABLESALT_SECOND_OPINION=0`). On a fresh 200-table set (seed 987654), FINAL rose 0.9949 → 0.9978 (T2 0.996 → 1.000), while dev(24) was unchanged because 0 tables were flagged.',
    significance: {
      tech: 'Unlike P0–P5 or score_all.py, `selfcheck.py` runs without ground truth inside the container on the hidden set. Zero false positives across 224 correct tables is the measurement that licenses triggering a second-opinion re-read.',
      learning:
        'A check you can only run against the answer teaches you nothing about production. The arc from hand-written repairs (Layer 1) to ground-truth-free self-checks (Layer 2) to learned routing (Layer 3) traces an explicit path toward an auditable, learnable architecture.',
      narrative:
        'The last feature commit of the documented hackathon (19:08, merged at 19:21) is neither a model nor a leaderboard row. It is the kick-off speech’s promised "validation layer that flags uncertain extractions instead of guessing", finally built as deterministic rules without ground truth: flagging 0 of 224 correct tables and routing flagged tables to a second-opinion re-read (0.9949 → 0.9978 on a fresh 200).',
      retro:
        'Audit C & D perspective: `selfcheck.py` and PR #1 closed the loop back to the Day 1 kick-off vision, yet PR #1 was generated by Claude Code without a documented line-by-line human re-implementation or independent review trail — underscoring the gap between directing agents and proving personal code ownership.',
    },
    learning: {
      thought:
        'I thought the end state of the hackathon would be a tuned pipeline: every stage hand-optimised in order, with the human remaining the only decision-maker in the loop.',
      observed:
        '`tablesalt/selfcheck.py` (commit `3c1a053`) checks header sequence, label pool, single number format, units, empties, and grid coverage with zero ground truth, flagging 0 of 224 known-correct tables. Routing flagged tables to alternative layout settings within a 12 s deadline guard moved a fresh 200-table set (seed 987654) from 0.9949 to 0.9978 (T2 0.996 → 1.000) while leaving dev(24) unchanged (0 flagged).',
      understood:
        'Three layers of decision-making now sit in the repo in order of generality: Layer 1 (hand-written rules) decides *how* to repair a cell; Layer 2 (ground-truth-free self-check) decides *whether* to spend more compute, and can actually run on the hidden set; Layer 3 (learned router) decides *which* specialist to use, priced separately to a null.',
      question:
        'The self-check knows when it is unsure, and the router was tested across near-identical OCR settings. Can a learned policy take the self-check’s uncertainty flags as inputs to gate genuinely different model families?',
    },
    metrics: [
      { label: 'Correct tables falsely flagged', value: '0/224', dataset: '224 known-correct tables', caveat: 'Licenses triggering re-reads without harming clean predictions.' },
      { label: 'FINAL with second-opinion router', value: 0.9978, dataset: 'fresh 200 (seed 987654)', baseline: 0.9949, delta: '+0.0029', direction: 'up' },
      { label: 'T2 with second-opinion router', value: 1.0, dataset: 'fresh 200 (seed 987654)', baseline: 0.996, delta: '+0.004', direction: 'up', tier: 'T2' },
      { label: 'dev(24) with self-check active', value: 0.9971, dataset: 'dev (24)', baseline: 0.9971, delta: '0.0', direction: 'neutral', caveat: '0 tables flagged on dev.' },
      { label: 'Second-opinion deadline guard', value: 12, unit: 's/table', dataset: 'TABLESALT_DEADLINE_S', caveat: 'Under the 15 s/table challenge limit.' },
    ],
    sources: [
      { kind: 'commit', ref: '3c1a053', label: 'Self-check + second-opinion router (CPU only), visible Tesseract errors' },
      { kind: 'commit', ref: '973cc2d', label: 'Merge pull request #1 from smlfg/feat/selfcheck-router' },
      { kind: 'doc', ref: 'challenge/PROBLEM.md', label: 'PROBLEM.md §6 — 15 s/table hard limit' },
      { kind: 'doc', ref: 'challenge/PLAN.md', label: 'PLAN.md' },
    ],
    evidence: 'measured-local',
    commits: ['3c1a053', '973cc2d'],
    branches: ['main', 'feat/selfcheck-router'],
    quotes: [
      {
        text: 'tablesalt/selfcheck.py: rule check without ground truth (header sequence, label pool, one number format, units, empties, grid). 0 of 224 correct tables flagged.',
        context: 'Commit message of 3c1a053 — the self-check in the author’s own words',
        source: 'git 3c1a053',
      },
      {
        text: 'Fresh 200 (seed 987654): final 0.9949 -> 0.9978, T2 0.996 -> 1.000. Dev 24 unchanged (0 flagged).',
        context: 'Commit message of 3c1a053 — measured effect of the second-opinion router',
        source: 'git 3c1a053',
      },
      {
        text: 'Wenn ich unsicher bin: die eine Frage stellen, nicht drei Varianten bauen.',
        context: 'AGENTS.md §7 [when I am unsure: ask the one question, do not build three variants.] — the rule behind the decision log',
        source: 'AGENTS.md',
      },
    ],
    feature: 'breakthrough',
  },
  {
    id: 'ev-2026-11-21-decision-tree-idea',
    order: 120,
    date: '2026-11-21',
    time: '19:11',
    timestamp: '2026-11-21T19:11:32+01:00',
    timeConfidence: 'exact',
    kicker: 'Research question',
    title: 'Can a classifier learn which OCR path to activate? (Formulated, aborted for agents, measured by hand)',
    summary:
      'An experiment is formulated against the classic-CV pipeline: can a DecisionTreeClassifier (with RandomForestClassifier as comparison) trained purely on 14 image features choose between five Tesseract configuration variants (Base, K1_4reads, K2_5reads, K3_psm8, K4_margin0) on lab_r3301 (n=96), hold up on unseen lab_r3302 (n=96), and transfer out of distribution to OCRBench-v2 (n=24)? The automated agent arm was aborted before completing, so the experiment — including the full oracle ceiling — was executed and measured by hand right afterwards (`tree_adapter_report.json`, 19:11–19:14).',
    significance: {
      tech: 'The routing idea is stated as a falsifiable zero-leakage experiment with a named held-out set and an oracle ceiling to beat. Measured by hand after the agent abort, the oracle came back flat in-distribution (+0.00132 r3301 / +0.00123 r3302 — inside the 0.0013 paired MDE) and larger OOD (+0.00379 on OCRBench-v2).',
      learning:
        'The question shifted from "which pipeline is best" to "which pipeline is best for this document, and is the ceiling high enough to justify learning a router?" Pricing the oracle first gave a falsifiable answer.',
      narrative:
        'The experiment was formulated, its agent arm was aborted, and it was measured by hand twenty minutes later — returning a clean null in-distribution and an open OOD thread (+0.00379).',
    },
    learning: {
      thought:
        'I expected routing to be where the remaining headroom was. If OCR configurations differ in which documents they handle well, a small interpretable decision tree on ground-truth-free image features could pick the right configuration per document.',
      observed:
        'After the agent arm was aborted, the experiment was run by hand (`tree_adapter_report.json`, 19:11–19:14). The oracle over the five Tesseract variants beat Base by only +0.00132 on lab_r3301 and +0.00123 on lab_r3302 (at or below the 0.0013 paired MDE), and by +0.00379 on OCRBench-v2. Every learned router’s 95% CI on r3302 included zero, and RandomForest routed 96/96 tables to Base.',
      understood:
        'A routing architecture can only pay off where the experts genuinely differ. These five configurations of one OCR engine differ by less than the instrument’s noise floor, so the target was flat. Computing the oracle priced the entire idea before building a production router.',
      question:
        'The OOD oracle is +0.00379 — roughly three times the in-distribution ceiling, improving 11 of 24 real documents with 0 worsened. Is a learned router over models that fail differently (TATR structure, MinerU text, coherence layer) worth more than routing five variants of one OCR engine?',
    },
    metrics: [
      { label: 'Oracle ceiling over Base', value: 0.00132, unit: 'ΔFINAL', dataset: 'lab_r3301 (n=96)', baseline: 0.99681, delta: '+0.00132', direction: 'up' },
      { label: 'Oracle ceiling over Base', value: 0.00123, unit: 'ΔFINAL', dataset: 'lab_r3302 (n=96)', baseline: 0.99583, delta: '+0.00123', direction: 'up' },
      { label: 'Oracle ceiling over Base (OOD thread)', value: 0.00379, unit: 'ΔTEDS', dataset: 'OCRBench-v2 (n=24)', baseline: 0.47743, delta: '+0.00379', direction: 'up', caveat: '11/24 improved, 0 worsened — remaining OOD thread.' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md — DecisionTreeClassifier vs RandomForest experiment' },
      { kind: 'doc', ref: 'challenge/autoresearch/VARIANCE_SPACE.md', label: 'VARIANCE_SPACE.md — axes A/B/C' },
      { kind: 'file', ref: 'challenge/autoresearch/shared/paired.py', label: 'challenge/autoresearch/shared/paired.py', note: 'Paired comparison harness' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/tree_adapter_report.json', label: 'tree_adapter_report.json (19:11–19:14)', note: 'Manual measurement of oracle and all 8 tree/RF models' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'lab/autoresearch-ts'],
    diagram: {
      kind: 'decision-tree',
      title: 'The routing question: learned selection over five OCR variants',
      caption:
        'Proposed architecture: image features routed by a classifier across five Tesseract configurations. Measured by hand after the agent abort, the oracle ceiling proved flat in-distribution (+0.00123) and +0.00379 OOD.',
      nodes: [
        { id: 'img', label: 'Document image', kind: 'input' },
        { id: 'feat', label: '14 image features', kind: 'process', changed: true },
        { id: 'tree', label: 'Decision tree classifier', kind: 'decision', changed: true },
        { id: 'k1', label: 'K1 4 reads', kind: 'model' },
        { id: 'k2', label: 'K2 5 reads', kind: 'model' },
        { id: 'k3', label: 'K3 psm 8', kind: 'model' },
        { id: 'k4', label: 'K4 margin 0', kind: 'model' },
        { id: 'out', label: 'Cells', kind: 'output' },
      ],
      edges: [
        { from: 'img', to: 'feat' },
        { from: 'feat', to: 'tree' },
        { from: 'tree', to: 'k1' },
        { from: 'tree', to: 'k2' },
        { from: 'tree', to: 'k3' },
        { from: 'tree', to: 'k4' },
        { from: 'k1', to: 'out' },
        { from: 'k2', to: 'out' },
        { from: 'k3', to: 'out' },
        { from: 'k4', to: 'out' },
      ],
    },
    feature: 'question',
    unresolved: [
      'The agent arm of this experiment was aborted; the measurement in tree_adapter_report.json (19:11–19:14) was executed by hand outside the agent loop.',
      'In-distribution, the oracle over the five Tesseract variants is measured at +0.00132 / +0.00123 (a null ceiling); only the OOD oracle (+0.00379 on OCRBench-v2) and routing between genuinely different model families remain open.',
    ],
  },
  {
    id: 'ev-2026-11-21-decision-tree-result',
    order: 125,
    date: '2026-11-21',
    time: '19:13',
    timestamp: '2026-11-21T19:13:57+01:00',
    timeConfidence: 'exact',
    kicker: 'Result (G5)',
    title: 'The learned router is measured — a null ceiling in-distribution, +0.00379 OOD thread',
    summary:
      'Executed under a strict zero-leakage protocol (`tree_adapter_eval.py`: train on `lab_r3301` n=96, held-out `lab_r3302` n=96, plus OOD `OCRBench-v2` n=24, official scorers). Five decision trees and three random forests over 14 image features produce a measured null in-distribution: oracle ceiling is +0.00132 (r3301) and +0.00123 (r3302) — below the 0.005 promotion threshold and inside the 0.0013 paired MDE. Best held-out tree `DT_depth3_gainweight` scores +0.00032 with CI95 [−0.00013, 0.00114] (includes 0); `RF_100_depth3_unweighted` routes 96/96 documents to Base (Δ 0.0). On OOD `OCRBench-v2`, `DT_depth2_unweighted` reaches +0.00123 (0.47866 vs 0.47743) against an OOD oracle of +0.00379.',
    significance: {
      tech: 'The research question is answered negatively and precisely for the 5-Tesseract-variant set: the problem was not that trees failed, it was "nothing to route to" (`speckle_rate <= 0.05 -> Base` moves almost nothing). Only the OOD thread (+0.00379 oracle, 11/24 improved) hints that document-dependent routing could matter across genuinely distinct models.',
      learning:
        'Measure the oracle before you build the router. A router cannot exceed the sum of its experts’ disagreements — and here that ceiling sat inside the noise floor.',
      narrative:
        'The measured verdict on the routing experiment: an in-distribution null — oracle +0.00132 (r3301) and +0.00123 (r3302), every learned tree’s 95% CI crossing zero, and RandomForest sending 96 of 96 tables (100%) to Base. Only out of distribution on OCRBench-v2 did the oracle reach +0.00379 (11/24 improved, 0 worsened), leaving behind a sharper question rather than a victory. Here, at 19:21 on 21 November, the repository record ends; day three (22 November) lies outside it.',
      retro:
        'Scientific strength highlighted in the meta-review: preserving negative results rather than burying them. The tree router gained only +0.00032 (95% CI [−0.00013, 0.00114], including zero) with an oracle ceiling of +0.00123/+0.00132 — rigorously documenting the abort instead of tuning on noise.',
    },
    learning: {
      thought:
        'With 14 image features (speckle rate, line strength, Laplacian variance, contrast) and five Tesseract experts, I expected a zero-leakage decision tree or random forest to discover document-specific routing gains on the held-out `lab_r3302` split.',
      observed:
        'The oracle bound over all five experts was only +0.00132 (`lab_r3301`) and +0.00123 (`lab_r3302`) — inside the 0.0013 paired MDE. Every learned router’s 95% CI on `lab_r3302` included zero (`DT_depth3_gainweight` +0.00032 [−0.00013, 0.00114]; `DT_depth2_unweighted` −0.00029 [−0.00103, 0.00015]), and `RF_100_depth3_unweighted` routed 96/96 (100%) to `Base`. On OOD `OCRBench-v2`, `DT_depth2_unweighted` gained +0.00123 against an OOD oracle of +0.00379 (11/24 improved, 0 worsened).',
      understood:
        'The classifiers did not fail; the target was flat (“kein robuster Effekt” rather than “proven zero”). Computing the oracle first prices the ceiling of the expert set before anyone builds production routing — and the 3× larger OOD oracle hints that routing matters across different document distributions and distinct model families, not minor tweaks of one OCR engine.',
      question:
        'What is the oracle ceiling if the candidate experts are genuinely different architectures (TATR structure, MinerU2.5 VLM, classic-CV, and coherence repair) rather than five configurations of Tesseract?',
    },
    metrics: [
      { label: 'Oracle ceiling over Base (train)', value: 0.00132, unit: 'ΔFINAL', dataset: 'lab_r3301 (96)', baseline: 0.99681, delta: '+0.00132', direction: 'up', caveat: '11/96 non-Base winners.' },
      { label: 'Oracle ceiling over Base (held-out)', value: 0.00123, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '+0.00123', direction: 'up', caveat: '8/96 non-Base winners.' },
      { label: 'Oracle ceiling over Base (OOD thread)', value: 0.00379, unit: 'ΔTEDS', dataset: 'OCRBench-v2 (24)', baseline: 0.47743, delta: '+0.00379', direction: 'up', caveat: '11/24 improved, 0 worsened.' },
      { label: 'DT_depth3_gainweight (best held-out)', value: 0.00032, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '+0.00032', direction: 'up', caveat: 'CI95 [−0.00013, 0.00114] — includes zero.' },
      { label: 'DT_depth2_unweighted (held-out)', value: -0.00029, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '-0.00029', direction: 'down', caveat: 'CI95 [−0.00103, 0.00015] — includes zero.' },
      { label: 'DT_depth4_balanced (held-out)', value: -0.00001, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '-0.00001', direction: 'neutral', caveat: 'CI95 [−0.00101, 0.00088].' },
      { label: 'DT_unbounded_gainweight (held-out)', value: 0.00004, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '+0.00004', direction: 'neutral', caveat: 'CI95 [−0.00096, 0.00104].' },
      { label: 'RF_100_depth3_unweighted (held-out)', value: 0.0, unit: 'ΔFINAL', dataset: 'lab_r3302 (96)', baseline: 0.99583, delta: '0.0', direction: 'neutral', caveat: 'Routed 96/96 documents to Base (CI [0.0, 0.0]).' },
      { label: 'DT_depth2_unweighted (best OOD router)', value: 0.47866, unit: 'TEDS', dataset: 'OCRBench-v2 (24)', baseline: 0.47743, delta: '+0.00123', direction: 'up', caveat: 'Below OOD oracle 0.48122.' },
      { label: 'Base expert (r3302 / OCRBench-v2)', value: '0.99583 / 0.47743', dataset: 'lab_r3302 / OCRBench-v2' },
    ],
    sources: [
      { kind: 'file', ref: 'challenge/autoresearch/runs/tree_adapter_report.json', label: 'tree_adapter_report.json', note: 'All expert, oracle, DT, and RF numbers with paired bootstrap CIs' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/tree_adapter_eval.py', label: 'tree_adapter_eval.py', note: 'Zero-leakage protocol, 14 image features, official scorers' },
      { kind: 'doc', ref: 'challenge/autoresearch/LAB.md', label: 'LAB.md — DecisionTreeClassifier vs RandomForest experiment' },
      { kind: 'file', ref: 'out/enes_repo/tableparser/triage.py', label: 'tableparser/triage.py', note: 'Parallel depth-4 triage tree used for speed, not score' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'lab/autoresearch-ts'],
    diagram: {
      kind: 'decision-tree',
      title: 'G5 · Learned routing: the tree that could not pay for itself',
      caption:
        'Image features → DT_depth2 (speckle_rate ≤ 0.05 → Base, else K2_5reads) routes 89/96 held-out tables to Base (RF routes 96/96). Even the oracle ceiling (+0.00123) sits right at the 0.0012–0.0013 paired noise floor.',
      nodes: [
        { id: 'img', label: 'Table image', kind: 'input' },
        { id: 'feat', label: '14 image features', detail: 'speckle_rate, v_line_max, laplacian_var, p5…', kind: 'process' },
        { id: 'split', label: 'speckle_rate <= 0.05 ?', kind: 'decision', changed: true },
        { id: 'base', label: 'Base (3 reads + digit vote)', kind: 'model', changed: true },
        { id: 'k2', label: 'K2_5reads', kind: 'model', changed: true },
        { id: 'out', label: 'Routed prediction', kind: 'output', changed: true },
        { id: 'm', label: 'r3302 Δ -0.00029 (DT3 +0.00032)', detail: '95% CI includes zero', kind: 'metric', changed: true },
        { id: 'oracle', label: 'Oracle ceiling +0.00123', detail: 'OOD oracle +0.00379', kind: 'metric', changed: true },
        { id: 'noise', label: 'Noise floor 0.0012–0.0013', detail: 'paired MDE', kind: 'metric', changed: true },
      ],
      edges: [
        { from: 'img', to: 'feat' },
        { from: 'feat', to: 'split' },
        { from: 'split', to: 'base', label: 'yes (89/96)' },
        { from: 'split', to: 'k2', label: 'no (7/96)' },
        { from: 'base', to: 'out' },
        { from: 'k2', to: 'out' },
        { from: 'out', to: 'm' },
        { from: 'm', to: 'noise', label: 'inside' },
        { from: 'oracle', to: 'noise', label: 'barely above' },
      ],
    },
    feature: 'reversal',
    unresolved: [
      'The oracle ceiling (+0.00132 / +0.00123) covers five Tesseract variants of one pipeline — it does not test routing between genuinely different model families (TATR, MinerU, PaddleOCR-VL).',
      'Only low-level image statistics were tested; learned features or structure-model signals (e.g. selfcheck flags) were not tested as router inputs.',
      'The artifacts under challenge/autoresearch/ are untracked local work outside committed git history.',
    ],
  },
  {
    id: 'ev-2026-11-21-complementarity',
    order: 130,
    date: '2026-11-21',
    timeConfidence: 'day',
    kicker: 'Specialists',
    title: 'Combining specialists: one strong complement measured, one flat one, one only imagined',
    summary:
      'The project never built a full mixture of experts, but it measured the diversity bound that decides when combining specialists pays off: (1) structure + text complement (TATR grid + GT text 0.9365 TEDS_w vs Tesseract 0.6608 FINAL), (2) model + consistency layer (MinerU raw 0.9621 → 0.9808 with P0–P5; Enes tableparser 0.9336 → 0.9551 with Layer-1 coherence), and (3) flat OCR variants (oracle ceiling 0.0013). A VLM Mixture-of-Experts remained an explicit untested hypothesis.',
    significance: {
      tech: 'Turns "combine specialists" from a slogan into a measurable diversity check: oracle ceilings tell you whether candidates actually fail differently before you build an ensemble.',
      learning:
        'A mixture of experts is a bet on error diversity, not on model count. Structure/text and model/consistency are real complements; five tweaks of one OCR engine are not.',
      narrative:
        'The two documented days (20–21 November, ending at 19:21; 22 November and any final hand-in score lie outside the repository record) close without softening their central contradiction: progress was real (0.3417 → 0.9862 on dev, an offline container under 15 s/table, 28 scored rows, 7 priced error classes), and uncertainty grew faster (2-px render drift of 0.038, adaptive dev+val96 use, OOD lexicon sign flip, an empty promotion ledger, and a routing tree priced to a +0.0013 in-distribution null). What survives is a method for checking whether specialists fail differently before trusting an ensemble.',
      retro:
        'The next research question before building complex routers: systematically measure the complementarity of genuinely distinct experts (Tesseract, TATR, MinerU2.5/Docling) on real public document datasets — not five parameter variants of one OCR engine on synthetic tables.',
    },
    learning: {
      thought:
        'I assumed specialists naturally combine: a structure model plus a text engine plus a validator ought to outperform any single model, and a Mixture of Experts is the formal name for letting each specialist cover the others.',
      observed:
        'Three complementarity facts were measured: (1) structure + text (`TATR` grid + GT text 0.9365 TEDS_w vs `Tesseract` 0.6608 FINAL — the gap is the cost of text); (2) model + consistency repair (MinerU raw 0.9621 → 0.9808 with P0–P5 on val96; Enes `tableparser` 0.9336 → 0.9551 with Layer-1 coherence); and (3) flat OCR variants (five Tesseract settings differ by an oracle ceiling of only +0.0013 in-distribution / +0.00379 OOD). Meanwhile a VLM MoE sits in `UPSTREAM_SEARCH.md` solely as an untested hypothesis.',
      understood:
        'Combining specialists only pays off when they fail differently, and “different configuration” is not “different failure”. Structure vs text and model vs consistency are genuine complements; five configurations of one OCR engine are interchangeable. The oracle bound is the cheap instrument that tests error diversity before building.',
      question:
        'What is the achievable oracle ceiling across genuinely distinct model families — TATR structure, MinerU2.5 text, classic-CV, and the ground-truth-free self-check? That measurement remained open at the end of 21 November.',
    },
    metrics: [
      { label: 'Structure + oracle text vs Tesseract', value: '0.9365 vs 0.6608', dataset: 'dev', caveat: 'Oracle TEDS_w vs Tesseract FINAL.' },
      { label: 'MinerU raw → +P0..P5', value: 0.9808, dataset: 'val96', baseline: 0.9621, delta: '+0.0187', direction: 'up', caveat: 'Both synthetic datasets used adaptively.' },
      { label: 'tableparser → +coherence layer', value: 0.9551, dataset: 'val96', baseline: 0.9336, delta: '+0.0215', direction: 'up' },
      { label: '5 OCR variants oracle (in-dist / OOD)', value: '0.0013 / 0.00379', dataset: 'lab_r3302 / OCRBench-v2' },
    ],
    sources: [
      { kind: 'doc', ref: 'challenge/MEASUREMENTS.md', label: 'MEASUREMENTS.md' },
      { kind: 'doc', ref: 'challenge/DECISIONS.md', label: 'ADR-001, ADR-003' },
      { kind: 'doc', ref: 'challenge/autoresearch/UPSTREAM_SEARCH.md', label: 'UPSTREAM_SEARCH.md — MoE hypothesis line' },
      { kind: 'file', ref: 'challenge/autoresearch/runs/tree_adapter_report.json', label: 'tree_adapter_report.json' },
    ],
    evidence: 'measured-local',
    branches: ['lab/autoresearch-a', 'feat/vlm-ocr-bench'],
    quotes: [
      {
        text: 'MoE muss alle Experten resident halten (HYPOTHESE für Doc-VLMs, kein Messwert).',
        context: 'UPSTREAM_SEARCH.md [a MoE has to keep all experts resident (hypothesis for document VLMs, not a measured value).]',
        source: 'challenge/autoresearch/UPSTREAM_SEARCH.md',
      },
    ],
    feature: 'none',
  },
];

export const chapters: Chapter[] = [
  {
    id: 'ch-before',
    date: '2026-11-20 · morning',
    title: 'Before the first measurement',
    lede: 'An idea, a set of traps, and a rule — all written down before there is any evidence to support it.',
    eventIds: [
      'ev-2026-11-20-repo-init',
      'ev-2026-11-20-kickoff-speech',
      'ev-2026-11-20-organizer-constraints',
      'ev-2026-11-20-problem-framed',
      'ev-2026-11-20-method-written',
    ],
    accent: 'intro',
  },
  {
    id: 'ch-boards',
    date: '2026-11-20 · afternoon',
    title: 'The board of candidates',
    lede: 'Every model becomes a row. Comparability is built before it is needed.',
    eventIds: [
      'ev-2026-11-20-vlm-board',
      'ev-2026-11-20-tatr-fusion',
      'ev-2026-11-20-baseline-reproduction',
    ],
    accent: 'intro',
  },
  {
    id: 'ch-turning',
    date: '2026-11-20 · evening',
    title: 'The evening the plan changed',
    lede: 'An oracle experiment refuses to support the exciting hypothesis, and a 1.2B model overtakes a hand-built pipeline.',
    eventIds: [
      'ev-2026-11-20-structure-ceiling',
      'ev-2026-11-20-mineru-vlm',
      'ev-2026-11-20-preprocessing-rejected',
    ],
    accent: 'turning',
  },
  {
    id: 'ch-rules',
    date: '2026-11-20 · night → 2026-11-21',
    title: 'The last two points are not a model',
    lede: 'Deterministic, geometry-aware rules beat every remaining modelling idea.',
    eventIds: [
      'ev-2026-11-20-postprocess-p0p5',
      'ev-2026-11-21-errors-costed',
    ],
    accent: 'turning',
  },
  {
    id: 'ch-second-run',
    date: '2026-11-21 · day',
    title: 'One task, the classical line rebuilt, and the last wall',
    lede: 'The classical path is instrumented end-to-end on speed and structure — while remaining QA failures trace to four pictures and three diverging metrics.',
    eventIds: [
      'ev-2026-11-21-tesseract-floor-runtime',
      'ev-2026-11-21-one-task',
      'ev-2026-11-21-fusion-reborn',
      'ev-2026-11-21-cuda-benchmark-split',
      'ev-2026-11-21-collapsed-header',
      'ev-2026-11-21-metrics-three-questions',
    ],
    accent: 'turning',
  },
  {
    id: 'ch-instruments',
    date: '2026-11-21 · late',
    title: 'When the instruments start moving',
    lede: 'Two pixels of rendering difference move the score more than any model improvement did — and the validation set turns out to be contaminated.',
    eventIds: [
      'ev-2026-11-21-null-experiment',
      'ev-2026-11-21-render-gap',
      'ev-2026-11-21-contamination-found',
      'ev-2026-11-21-dataset-ladder',
    ],
    accent: 'failure',
  },
  {
    id: 'ch-outside',
    date: '2026-11-21 · afternoon',
    title: 'Outside the distribution',
    lede: 'The hidden set drops, a star component flips sign on real tables, and four previously unmeasured candidates close the board.',
    eventIds: [
      'ev-2026-11-21-hidden-drop',
      'ev-2026-11-21-lexicon-sign-flip',
      'ev-2026-11-21-research-verdicts',
      'ev-2026-11-21-unmeasured-candidates-measured',
    ],
    accent: 'failure',
  },
  {
    id: 'ch-submission',
    date: '2026-11-21 · evening (17:10–18:00)',
    title: 'The work becomes something you can hand over',
    lede: 'Competing small-model and classic-CV lines, a portable zero-regression coherence layer, and a container verified offline.',
    eventIds: [
      'ev-2026-11-21-classic-cv-pipeline',
      'ev-2026-11-21-small-model-matrix',
      'ev-2026-11-21-enes-tableparser-line',
      'ev-2026-11-21-coherence-layer',
      'ev-2026-11-21-submission-container',
    ],
    accent: 'turning',
  },
  {
    id: 'ch-abort',
    date: '2026-11-21 · evening (18:08–18:59)',
    title: 'The agent run is stopped',
    lede: 'The most honest document in the repository is titled "abort report".',
    eventIds: ['ev-2026-11-21-abandoned-lab'],
    accent: 'failure',
  },
  {
    id: 'ch-open',
    date: '2026-11-21 · night (19:08–19:21)',
    title: 'What stays open',
    lede: 'A ground-truth-free self-check, a routing experiment measured to a null, and the question that outlives the hackathon.',
    eventIds: [
      'ev-2026-11-21-learnable-architecture',
      'ev-2026-11-21-decision-tree-idea',
      'ev-2026-11-21-decision-tree-result',
      'ev-2026-11-21-complementarity',
    ],
    accent: 'open',
  },
];

export const eventById = new Map(events.map((e) => [e.id, e]));
