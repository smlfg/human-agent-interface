/**
 * Canonical event schema for the TableSalt documentary.
 *
 * One chronological event model, four page-specific interpretations.
 * Content lives in `events.ts`; presentation lives in `src/components`.
 * Never import components from here — this file is pure data + types.
 */

export type PageId = 'tech' | 'learnings' | 'story' | 'retro';

export type EvidenceStatus =
  /** Produced by the official scorer on official data (score_all.py on data/dev). */
  | 'measured-official'
  /** Produced locally by our own scorer on our own generated data. */
  | 'measured-local'
  /** Recorded verbatim in a project document — a statement, a plan, an ADR. Not a measurement. */
  | 'documented'
  /** Reported by an agent or a parallel session; not re-verified here. */
  | 'reported'
  /** A hypothesis that was proposed but not (yet) tested. */
  | 'hypothesis'
  /** An inference drawn from the evidence, not stated verbatim in a source. */
  | 'inferred';

export type SourceKind =
  | 'commit'
  | 'file'
  | 'doc'
  | 'dataset'
  | 'run'
  | 'report'
  | 'external';

export interface SourceRef {
  kind: SourceKind;
  /** Commit hash, repo-relative path, doc name, run id, or URL. */
  ref: string;
  /** Human-readable label shown in the UI. */
  label: string;
  /** What this source actually supports (one clause). */
  note?: string;
}

export interface Metric {
  label: string;
  value: number | string;
  unit?: string;
  /** Dataset the number was measured on: 'dev', 'val96', 'lab_dev_a', 'OCRBench-v2', … */
  dataset?: string;
  /** The comparable number this metric was measured against. */
  baseline?: number | string;
  delta?: number | string;
  direction?: 'up' | 'down' | 'neutral';
  /** Tier scope: 'T0' | 'T1' | 'T2' | 'T3' | 'T3-only' | 'all'. */
  tier?: string;
  /** Extra caveat: incompatible metric, different scorer, different generator, … */
  caveat?: string;
}

export interface Quote {
  text: string;
  context: string;
  source: string;
}

/** The four-part learning frame used on the Learnings page. */
export interface LearningFrame {
  /** "I thought …" — the pre-event mental model. */
  thought: string;
  /** "I observed …" — what the experiment actually showed. */
  observed: string;
  /** "I understood …" — the corrected model. */
  understood: string;
  /** "I now question …" — the open question that survived the event. */
  question: string;
}

/** A node in an architecture-evolution diagram. */
export interface ArchNode {
  id: string;
  label: string;
  detail?: string;
  kind?: 'input' | 'process' | 'model' | 'output' | 'decision' | 'metric';
  /** Marks the node as new / changed relative to the previous architecture. */
  changed?: boolean;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

/** A data-driven architecture diagram attached to an event. */
export interface ArchDiagram {
  kind: 'architecture' | 'decision-tree' | 'dataset-shift' | 'layer-stack';
  title: string;
  caption?: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export interface TimelineEvent {
  /** Stable, human-readable id. Never reused, never renumbered. */
  id: string;
  /** ISO date, 'YYYY-MM-DD'. */
  date: string;
  /** Local time 'HH:MM' when known. */
  time?: string;
  /** ISO timestamp when both are known. */
  timestamp?: string;
  /** How much we trust the timing. */
  timeConfidence: 'exact' | 'approx' | 'day' | 'range';
  /** Short label used in the rail / index. */
  kicker: string;
  /** Factual, evidence-backed title. */
  title: string;
  /** What happened, stated plainly. No spin. */
  summary: string;
  /** The four page-specific readings of the same event. */
  significance: {
    tech?: string;
    learning?: string;
    narrative?: string;
    retro?: string;
  };
  /** The four-part learning frame (Learnings page). */
  learning?: LearningFrame;
  /** Metrics with their dataset, baseline and caveats. */
  metrics?: Metric[];
  /** Where the claims come from. */
  sources: SourceRef[];
  /** The overall evidence status of this event's central claim. */
  evidence: EvidenceStatus;
  /** Commits that carry the change. */
  commits?: string[];
  /** Branches the work happened on. */
  branches?: string[];
  /** Architecture / decision-tree diagram. */
  diagram?: ArchDiagram;
  /** Verbatim quotes from the project notes. */
  quotes?: Quote[];
  /** What was still unresolved when the hackathon ended. */
  unresolved?: string[];
  /** Local artifacts (relative to the tablesalt repo). */
  artifacts?: string[];
  /** Marks a turning point worth a richer visual treatment. */
  feature?: 'none' | 'breakthrough' | 'reversal' | 'failure' | 'question';
  /** Ordering hint within the same timestamp. */
  order?: number;
}

export interface Chapter {
  id: string;
  date: string;
  title: string;
  /** One-sentence framing of the chapter. */
  lede: string;
  /** Event ids belonging to this chapter. */
  eventIds: string[];
  /** Optional chapter-specific accent, defaults to the page accent. */
  accent?: string;
}

export interface SiteMeta {
  title: string;
  subtitle: string;
  event: string;
  location: string;
  dates: string;
  author: string;
  repository: string;
  /** The one-line thesis of the whole site. */
  thesis: string;
}

export interface DatasetRef {
  id: string;
  name: string;
  size: string;
  role: string;
  /** Whether the ground truth was ever visible to the agent working on it. */
  gtVisible: string;
  note?: string;
}
