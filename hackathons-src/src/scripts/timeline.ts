/**
 * Timeline behaviour — one small vanilla module, bundled and deferred by
 * Astro. No framework, no network, no layout thrash: every read happens in a
 * single animation frame before any write.
 */

interface TimelineItem {
  /** The <li> that wraps marker + card. */
  item: HTMLElement;
  /** The <article> that carries the event id. */
  card: HTMLElement;
  marker: HTMLElement | null;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function init(): void {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  if (!timeline) return;
  const docBase = timeline.dataset.docBase ?? '';

  const total = Number(timeline.dataset.total ?? '0');
  const countEl = timeline.querySelector<HTMLElement>('[data-status-count]');
  const kickerEl = timeline.querySelector<HTMLElement>('[data-status-kicker]');
  const barEl = timeline.querySelector<HTMLElement>('[data-progress-bar]');
  const perspectiveLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-perspective-link][data-page]'),
  );

  const items: TimelineItem[] = Array.from(
    timeline.querySelectorAll<HTMLElement>('.tl-event'),
  )
    .map((item) => {
      const card = item.querySelector<HTMLElement>('.card');
      if (!card) return null;
      return {
        item,
        card,
        marker: item.querySelector<HTMLElement>('.tl-marker'),
      };
    })
    .filter((entry): entry is TimelineItem => entry !== null);

  if (items.length === 0) return;

  let current = -1;
  let ticking = false;
  let hashLocked = false;
  let hashLockTimer: number | null = null;
  let userHasScrolled = false;

  /**
   * Pick the event closest to the reading focus line in the upper-middle
   * viewport. If a card spans the focus line (common for expanded cards),
   * keep it active while the reader moves through it.
   */
  function nearestToFocus(): number {
    const focusY = Math.min(window.innerHeight * 0.36, 300);
    let best = -1;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < items.length; i += 1) {
      const rect = items[i].card.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
      if (rect.top <= focusY && rect.bottom >= focusY) return i;
      const distance = rect.top > focusY ? rect.top - focusY : focusY - rect.bottom;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    return best;
  }

  function updatePerspectiveLinks(activeId: string): void {
    if (!activeId) return;
    for (const link of perspectiveLinks) {
      const targetPath = link.dataset.path;
      if (!targetPath) continue;
      link.setAttribute('href', `${docBase}/${targetPath}/#${activeId}`);
    }
  }

  function writeHash(id: string): void {
    if (hashLocked || !userHasScrolled || !id) return;
    if (window.location.hash === `#${id}`) return;
    try {
      window.history.replaceState(null, '', `#${id}`);
    } catch {
      /* replaceState can be blocked on file:// — the page still works. */
    }
  }

  function setCurrent(index: number, options: { updateUrl?: boolean } = {}): void {
    if (index < 0 || index === current) return;
    current = index;

    for (let i = 0; i < items.length; i += 1) {
      const isCurrent = i === index;
      items[i].item.dataset.state = i < index ? 'passed' : isCurrent ? 'current' : 'future';

      if (isCurrent) {
        items[i].card.dataset.current = 'true';
        items[i].marker?.setAttribute('aria-current', 'location');
      } else {
        delete items[i].card.dataset.current;
        items[i].marker?.removeAttribute('aria-current');
      }
    }

    const active = items[index];
    const kicker = active.card.querySelector<HTMLElement>('.card__kicker')?.textContent?.trim();

    if (countEl) countEl.textContent = `${pad(index + 1)} / ${pad(total)}`;
    if (kickerEl && kicker) kickerEl.textContent = kicker;
    if (barEl) barEl.style.width = `${Math.round(((index + 1) / total) * 100)}%`;

    updatePerspectiveLinks(active.card.id);
    if (options.updateUrl !== false) writeHash(active.card.id);
  }

  function scheduleUpdate(): void {
    if (hashLocked || ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (hashLocked) return;
      setCurrent(nearestToFocus());
    });
  }

  /* --- Disclosure ------------------------------------------------------ */

  function toggleDetail(
    toggle: HTMLElement,
    force?: boolean,
    options: { instant?: boolean; skipUpdate?: boolean } = {},
  ): void {
    const id = toggle.getAttribute('aria-controls');
    const detail = id ? document.getElementById(id) : null;
    if (!detail) return;

    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    const open = force ?? !wasOpen;

    if (options.instant || prefersReducedMotion()) {
      detail.dataset.instant = 'true';
    } else {
      delete detail.dataset.instant;
    }

    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    detail.dataset.open = open ? 'true' : 'false';

    if (options.instant) {
      /* Force style flush so initial deep-link height is settled before scrollIntoView. */
      void detail.offsetHeight;
      window.requestAnimationFrame(() => {
        delete detail.dataset.instant;
      });
    }

    const label = toggle.querySelector<HTMLElement>('[data-label-open]');
    if (label) {
      const openText = label.getAttribute('data-label-open') ?? '';
      const closeText = label.getAttribute('data-label-close') ?? '';
      label.textContent = open ? closeText : openText;
    }

    if (!options.skipUpdate) scheduleUpdate();
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const toggle = target.closest<HTMLElement>('[data-toggle]');
    if (toggle) {
      event.preventDefault();
      toggleDetail(toggle);
      return;
    }

    const marker = target.closest<HTMLAnchorElement>('.tl-marker');
    if (marker) {
      const hash = marker.getAttribute('href') ?? '';
      if (hash.startsWith('#') && hash === window.location.hash) {
        event.preventDefault();
        applyHashTarget(false, true);
      }
    }
  });

  /* --- Current event tracking ------------------------------------------ */

  const observer = new IntersectionObserver(scheduleUpdate, {
    rootMargin: '-20% 0px -20% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  });

  for (const entry of items) observer.observe(entry.card);

  const markManualScroll = () => {
    userHasScrolled = true;
    if (hashLocked) {
      hashLocked = false;
      if (hashLockTimer !== null) {
        window.clearTimeout(hashLockTimer);
        hashLockTimer = null;
      }
    }
  };

  window.addEventListener('wheel', markManualScroll, { passive: true });
  window.addEventListener('touchstart', markManualScroll, { passive: true });
  window.addEventListener(
    'scroll',
    () => {
      if (!hashLocked) userHasScrolled = true;
      scheduleUpdate();
    },
    { passive: true },
  );
  window.addEventListener('resize', scheduleUpdate, { passive: true });

  /* --- Arrival with a hash & hashchange -------------------------------- */

  function lockHashBriefly(durationMs: number): void {
    hashLocked = true;
    if (hashLockTimer !== null) window.clearTimeout(hashLockTimer);
    hashLockTimer = window.setTimeout(() => {
      hashLocked = false;
      hashLockTimer = null;
    }, durationMs);
  }

  function applyHashTarget(isInitial: boolean, focusCard = false): void {
    const rawHash = window.location.hash.replace(/^#/, '');
    if (!rawHash) return;

    let id = rawHash;
    try {
      id = decodeURIComponent(rawHash);
    } catch {
      /* Keep raw hash if malformed percent-encoding. */
    }

    const card = document.getElementById(id);
    if (!card || !card.classList.contains('card')) return;

    const index = items.findIndex((entry) => entry.card === card);
    const useInstant = isInitial || prefersReducedMotion();

    lockHashBriefly(useInstant ? 350 : 700);

    const toggle = card.querySelector<HTMLElement>('[data-toggle]');
    if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
      toggleDetail(toggle, true, { instant: useInstant, skipUpdate: true });
    }

    if (index >= 0) {
      current = -1;
      setCurrent(index, { updateUrl: false });
    }

    card.scrollIntoView({
      behavior: useInstant ? 'auto' : 'smooth',
      block: 'start',
    });

    if (focusCard) {
      card.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', () => {
    applyHashTarget(false, true);
  });

  if (window.location.hash) {
    applyHashTarget(true, false);
  } else {
    setCurrent(0, { updateUrl: false });
    scheduleUpdate();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
