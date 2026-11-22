/**
 * Hackathon archive — one record per hackathon. To add one: append a record here
 * (and, optionally, build a documentary under src/pages/<slug>/). No component changes needed.
 * `href` points to the full project story; omit it for a short summary without its own page.
 */
export type EvidenceLevel = 'documented' | 'partly-measured' | 'unverified';

export interface HackathonEntry {
  slug: string;
  name: string;
  project: string;
  dates: string;
  isoDate: string; // for sorting
  location: string;
  organizer: string;
  challenge: string;
  role: string;
  collaborators?: string;
  technologies: string[];
  outcome: string;
  evidenceStatus: string;
  keyLearning: string;
  /** Link to the full story (documentary or ordinary project page). */
  href?: string;
  /** Extra external links. */
  links?: { label: string; href: string }[];
}

export const hackathons: HackathonEntry[] = [
  {
    slug: 'tablesalt-ocr',
    name: 'lerrai TableSalt OCR Challenge — Campus Founders Batch #9',
    project: 'TableSalt OCR',
    dates: '20–22 November 2026',
    isoDate: '2026-11-20',
    location: 'GRAVITY, Heilbronn',
    organizer: 'Campus Founders / lerrai',
    challenge:
      'Recognise the structure and content of tables in photographed and scanned documents, scored by the organiser with TEDS and question answering.',
    role: 'Participant. The split between my own work, agent work and team collaboration is examined in the retrospective.',
    collaborators: 'Not named in the project record, so not listed here.',
    technologies: ['OCR', 'Table structure recognition', 'Classic CV pipeline', 'Small VLMs', 'TEDS / QA scoring', 'AI coding agents'],
    outcome:
      'A scored OCR pipeline with documented architecture changes (G0 → G5). Numbers are labelled measured, reported or inferred.',
    evidenceStatus:
      'Every number on the project pages carries an evidence badge; some figures are reported from a parallel session and not re-verified.',
    keyLearning:
      'A benchmark can look decisive while testing only one distribution — and it cannot show who actually understood the system.',
    href: 'tablesalt-ocr/',
    links: [{ label: 'Repository', href: 'https://github.com/smlfg/CFHackathon_OCR_2026' }],
  },
];
