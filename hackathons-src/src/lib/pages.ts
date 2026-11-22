import type { PageId } from '../content/schema';
import { docHref } from './paths';

/**
 * Page configuration. The four perspectives share one chronology but differ
 * in accent, wording and which field of `TimelineEvent.significance` is read.
 */
export interface PageConfig {
  id: PageId;
  /** Nav label — short, uppercase in the UI. */
  nav: string;
  /** Full page title (the <h1>). */
  title: string;
  /** One-line framing under the title. */
  lede: string;
  /** The single accent colour used on this page. */
  accent: string;
  /** Human name of the accent, used in the legend/meta line. */
  accentName: string;
  /** Which `significance` field this page reads. */
  significanceKey: 'tech' | 'learning' | 'narrative' | 'retro';
  /** Fallback order for the significance field. */
  fallbackKeys: Array<'tech' | 'learning' | 'narrative' | 'retro'>;
  /** Verb used in the cross-page switcher, e.g. "See this moment from …". */
  perspectiveLabel: string;
  /** Noun describing this perspective in the cross-page switcher. */
  perspectiveNoun: string;
}

export const PAGES: Record<PageId, PageConfig> = {
  tech: {
    id: 'tech',
    nav: 'Tech',
    title: 'The technical chronology',
    lede:
      'What was built, measured, kept and thrown away — in the order it happened, with the numbers that decided each decision.',
    accent: '#7FD4E8',
    accentName: 'cyan',
    significanceKey: 'tech',
    fallbackKeys: ['tech', 'learning', 'narrative', 'retro'],
    perspectiveLabel: 'See this moment from',
    perspectiveNoun: 'the technical record',
  },
  learnings: {
    id: 'learnings',
    nav: 'Learnings',
    title: 'What we thought, and what we now think',
    lede:
      'Every event read as an assumption change: what we believed before, what the measurement showed, what we understood afterwards, and what stayed open.',
    accent: '#E8B87F',
    accentName: 'amber',
    significanceKey: 'learning',
    fallbackKeys: ['learning', 'tech', 'narrative', 'retro'],
    perspectiveLabel: 'See this moment from',
    perspectiveNoun: 'an assumption change',
  },
  story: {
    id: 'story',
    nav: 'Story',
    title: 'Three days, in order',
    lede:
      'The same chronology, read as a narrative: a plan written before the evidence, an afternoon that overturned it, and a morning that did not.',
    accent: '#E88C8C',
    accentName: 'rose',
    significanceKey: 'narrative',
    fallbackKeys: ['narrative', 'learning', 'tech', 'retro'],
    perspectiveLabel: 'See this moment from',
    perspectiveNoun: 'the narrative',
  },
  retro: {
    id: 'retro',
    nav: 'Retro',
    title: 'What the Benchmark Couldn’t Measure',
    lede:
      'Das Hauptproblem war nicht einfach Scope Creep — sondern der Übergang von vielen parallelen Experimenten zu einem gemeinsam verstandenen, unabhängig überprüften und tatsächlich ausgelieferten System.',
    accent: '#B9A7E0',
    accentName: 'violet',
    significanceKey: 'retro',
    fallbackKeys: ['retro', 'learning', 'narrative', 'tech'],
    perspectiveLabel: 'Read the retrospective critique on',
    perspectiveNoun: 'the retrospective critique',
  },
};

export const PAGE_IDS: PageId[] = ['tech', 'learnings', 'story', 'retro'];

/** The three public perspectives shown in navigation. Retro is the concluding chapter of Learnings. */
export const NAV_IDS: PageId[] = ['story', 'tech', 'learnings'];

/** Path of a perspective below the documentary root. */
export function pagePath(id: PageId): string {
  return id === 'retro' ? 'learnings/retro' : id;
}

export function pageHref(id: PageId, hash = ''): string {
  return docHref(pagePath(id), hash);
}

/** The other perspectives that are not the current one. */
export function otherPages(current: PageId): PageConfig[] {
  return PAGE_IDS.filter((id) => id !== current).map((id) => PAGES[id]);
}

/** Deep link to the same event on another page. */
export function crossPageHref(target: PageId, eventId: string): string {
  return pageHref(target, eventId);
}
