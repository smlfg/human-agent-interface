import type { Chapter, Metric, TimelineEvent, EvidenceStatus } from '../content/schema';
import { PAGES } from './pages';

/** A run of events, either under a chapter heading or unfiled. */
export interface TimelineGroup {
  chapter: Chapter | null;
  events: TimelineEvent[];
}

/** Chronological key: full timestamp first, then plain date, then `order`. */
function sortKey(event: TimelineEvent): string {
  if (event.timestamp) return `${event.timestamp}#${String(event.order ?? 0).padStart(4, '0')}`;
  return `${event.date}T00:00#${String(event.order ?? 0).padStart(4, '0')}`;
}

/** Stable chronological sort — never mutates the input array. */
export function sortEvents(events: readonly TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    const ka = sortKey(a);
    const kb = sortKey(b);
    if (ka !== kb) return ka < kb ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
}

/**
 * Group events into chapters. Events not referenced by any chapter are kept
 * and appended in their own unfiled group so nothing ever disappears from the
 * chronology when the dataset grows.
 */
export function buildGroups(
  events: readonly TimelineEvent[],
  chapters: readonly Chapter[],
): TimelineGroup[] {
  const sorted = sortEvents(events);
  const byId = new Map(sorted.map((e) => [e.id, e]));
  const used = new Set<string>();
  const groups: TimelineGroup[] = [];

  for (const chapter of chapters) {
    const list: TimelineEvent[] = [];
    for (const id of chapter.eventIds) {
      const event = byId.get(id);
      if (!event) continue;
      list.push(event);
      used.add(id);
    }
    if (list.length > 0) groups.push({ chapter, events: list });
  }

  const unfiled = sorted.filter((e) => !used.has(e.id));
  if (unfiled.length > 0) groups.push({ chapter: null, events: unfiled });

  return groups;
}

/** The page-specific reading of an event, with graceful fallbacks. */
export function significanceFor(event: TimelineEvent, pageId: keyof typeof PAGES): string {
  const config = PAGES[pageId];
  for (const key of [config.significanceKey, ...config.fallbackKeys]) {
    const value = event.significance?.[key];
    if (value && value.trim().length > 0) return value;
  }
  return event.summary;
}

/** Human label for the evidence status of an event. */
export function evidenceLabel(status: EvidenceStatus): string {
  switch (status) {
    case 'measured-official':
      return 'official';
    case 'measured-local':
      return 'local';
    case 'documented':
      return 'documented';
    case 'reported':
      return 'reported';
    case 'hypothesis':
      return 'hypothesis';
    case 'inferred':
      return 'inferred';
  }
}

/**
 * Evidence badge for a single metric. `Metric` carries no evidence field of
 * its own, so we inherit the event's status and upgrade to `reported` when the
 * caveat explicitly says the number was reported rather than reproduced.
 */
export function metricEvidence(metric: Metric, eventStatus: EvidenceStatus): EvidenceStatus {
  const caveat = metric.caveat?.toLowerCase() ?? '';
  if (/reported|bericht|not reproduced|nicht reproduziert/.test(caveat)) return 'reported';
  return eventStatus;
}

/** `2026-11-20` → `20 Nov 2026` */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [, y, m, d] = match;
  const monthIndex = Number(m) - 1;
  if (monthIndex < 0 || monthIndex > 11) return iso;
  return `${Number(d)} ${months[monthIndex]} ${y}`;
}

/** True when the timing is trustworthy enough to be shown as a precise time. */
export function timeIsExact(event: TimelineEvent): boolean {
  return event.timeConfidence === 'exact' && Boolean(event.time);
}
