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
  links?: { label: string; href: string; primary?: boolean }[];
}

export const hackathons: HackathonEntry[] = [
  {
    slug: 'founder-hackathon-stuttgart',
    name: 'Cursor x Sandbox Founder Hackathon Stuttgart',
    project: 'FiCo',
    dates: '7 November 2026',
    isoDate: '2026-11-07',
    location: 'Stuttgart',
    organizer: 'Cursor x Sandbox (per my own repository title; not independently confirmed)',
    challenge: 'No official challenge text is recorded. I built FiCo, a gamified personal-finance product.',
    role: 'I built FiCo. Team and exact role are not recorded here.',
    collaborators: 'Not named in the project record, so not listed here.',
    technologies: ['TypeScript', 'Node', 'Docker', 'Gamification'],
    outcome:
      'FiCo, a gamified personal-finance product, with a five-slide pitch and a recorded demo. No result or placement is recorded, so none is claimed here.',
    evidenceStatus:
      'Based on the project files and day-of recordings; the repository is private, so it is not linked.',
    keyLearning:
      'The product was built for an outside audience but kept private, and an insight from the day stayed in a voice note. Next time: a public repository and a short post soon after the event.',
  },
  {
    slug: 'green-city-hackathon',
    name: 'Green City Hackathon Heilbronn',
    project: 'Green City data kit and mobility layers',
    dates: '27–28 October 2026',
    isoDate: '2026-10-27',
    location: 'Heilbronn',
    organizer: 'Not named in the records; data source: greencity.hn.',
    challenge:
      'Build on the open citizen-science data of Heilbronn as Green Capital of Europe 2027: street segments, bike sensors, bird-feeder visits and air measurements.',
    role: 'Team member in a six-person team. My commits covered the data layer: data kit, mobility data loader, sensor and tree-cadastre data, and an architecture diagram.',
    technologies: ['Python', 'Open data', 'Bike sensor data', 'GitHub branches and pull requests'],
    outcome: 'No result or placement is recorded, so none is claimed here.',
    evidenceStatus:
      'Based on the team repository history (29 commits, 13 of them mine) and my own notes from the day. The repository is on another participant\'s account, so it is not linked.',
    keyLearning:
      'First real team workflow on GitHub with branches and merges. Shared data work is easy to give away: next time I would publish the data core under my own name and link it from the team repository.',
    links: [{ label: 'Data source: greencity.hn', href: 'https://greencity.hn' }],
  },
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
  {
    slug: 'future-city-glasroute',
    name: 'Future City Hackathon 2026 — PreZero challenge',
    project: 'GlasRoute',
    dates: '14–15 November 2026',
    isoDate: '2026-11-14',
    location: 'Heilbronn',
    organizer: 'Hochschule Heilbronn (HHN)',
    challenge:
      'Plan glass-container collection from data instead of fixed area lists. The only data: 11,701 historical visits to 449 containers, with fill levels estimated by drivers in 10 % steps.',
    role: 'Solo team.',
    technologies: ['Python', 'pandas', 'OR-Tools routing', 'OpenStreetMap', 'Simulation', 'GitHub Pages', 'AI coding agents'],
    outcome:
      'Submitted and pitched on 15 November; the PreZero mentor offered to stay in contact. A follow-up on 16 November, prezero-clean, re-did the analysis with a simulation view. Both are hosted and working.',
    evidenceStatus:
      'The data is real; container locations are a simulated mapping to OpenStreetMap points, and the “today” state is estimated. Savings therefore hold as ratios under stated assumptions, not as proven operational savings.',
    keyLearning:
      'Green tests and local correctness do not guarantee the goal is met: agents made me fast, and they amplified scope drift just as fast. Check each new layer against the original question before building it.',
    links: [
      { label: 'GlasRoute demo', href: 'https://smlfg.github.io/GlasRoute-PreZero-HHN-FUTURECITYHACKATHON2026/', primary: true },
      { label: 'prezero-clean simulation', href: 'https://smlfg.github.io/prezero-clean/sim/kino.html', primary: true },
      { label: 'GlasRoute repository', href: 'https://github.com/smlfg/GlasRoute-PreZero-HHN-FUTURECITYHACKATHON2026' },
      { label: 'prezero-clean repository', href: 'https://github.com/smlfg/prezero-clean' },
    ],
  },
];
