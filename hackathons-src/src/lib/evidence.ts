import type { EvidenceStatus } from '../content/schema';

/** The evidence vocabulary shown in the legend and on every metric row. */
export interface EvidenceBadge {
  key: string;
  label: string;
  title: string;
  description: string;
}

export const EVIDENCE_BADGES: Record<EvidenceStatus, EvidenceBadge> = {
  'measured-official': {
    key: 'official',
    label: 'official',
    title: 'Official scorer, official data',
    description:
      'Produced by the organiser’s own scorer on the organiser’s own data. These are the numbers we treat as ground truth.',
  },
  'measured-local': {
    key: 'local',
    label: 'local',
    title: 'Local scorer, own data',
    description:
      'Reproduced by us on data we generated ourselves. Directionally useful, but not directly comparable to official numbers.',
  },
  documented: {
    key: 'documented',
    label: 'documented',
    title: 'Recorded in a project document',
    description:
      'Stated verbatim in a project document — a kick-off note, a plan, an ADR. A statement of intent or a decision, not a measurement.',
  },
  reported: {
    key: 'reported',
    label: 'reported',
    title: 'Reported, not reproduced here',
    description:
      'Reported by an agent or a parallel session and quoted as-is. We have not re-verified it inside this repository.',
  },
  hypothesis: {
    key: 'hypothesis',
    label: 'hypothesis',
    title: 'Hypothesis, not yet tested',
    description:
      'A proposal that was written down before it was measured. No measurement behind it yet.',
  },
  inferred: {
    key: 'inferred',
    label: 'inferred',
    title: 'Inference, not stated verbatim',
    description:
      'A conclusion we drew from the evidence. The source says something close, but not exactly this.',
  },
};

/** Ordered list used by the legend component. */
export const EVIDENCE_ORDER: EvidenceStatus[] = [
  'measured-official',
  'measured-local',
  'documented',
  'reported',
  'hypothesis',
  'inferred',
];

/** Fallback for a status the site has not been taught about yet. */
export const UNKNOWN_BADGE: EvidenceBadge = {
  key: 'unknown',
  label: 'unclassified',
  title: 'Evidence status not classified',
  description:
    'This event carries an evidence status the site does not know yet. Treat the number with suspicion until it is classified.',
};

/** Safe lookup — never throws on an unknown status. */
export function badgeFor(status: EvidenceStatus): EvidenceBadge {
  return EVIDENCE_BADGES[status] ?? UNKNOWN_BADGE;
}
