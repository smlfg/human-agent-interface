import type { ArchDiagram, ArchEdge, ArchNode } from '../content/schema';

/**
 * Deterministic layout for inline SVG diagrams. No external graph library, no
 * runtime measurement — positions are computed from the data so the markup is
 * identical on the server and on the client.
 */

const NODE_W = 196;
const MIN_NODE_H = 62;
const H_GAP = 74;
const V_GAP = 24;
const PAD = 26;
const LABEL_CHARS = 24;
const MAX_LINES = 3;

export interface LaidOutNode {
  node: ArchNode;
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  cx: number;
  cy: number;
}

export interface LaidOutEdge {
  edge: ArchEdge;
  path: string;
  label: string;
  labelX: number;
  labelY: number;
}

export interface DiagramLayout {
  width: number;
  height: number;
  nodes: LaidOutNode[];
  edges: LaidOutEdge[];
  horizontal: boolean;
}

function wrap(label: string): string[] {
  const words = label.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + ' ' + word).length <= LABEL_CHARS) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= MAX_LINES) return lines;
  const kept = lines.slice(0, MAX_LINES);
  kept[MAX_LINES - 1] = kept[MAX_LINES - 1].replace(/.{2}$/, '…');
  return kept;
}

/** Depth of every node, following edges from the roots (no incoming edge). */
function computeLayers(nodes: ArchNode[], edges: ArchEdge[]): Map<string, number> {
  const ids = new Set(nodes.map((n) => n.id));
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, string[]>();

  for (const node of nodes) incoming.set(node.id, 0);
  for (const edge of edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) continue;
    incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge.to);
    outgoing.set(edge.from, list);
  }

  const roots = nodes.filter((n) => (incoming.get(n.id) ?? 0) === 0).map((n) => n.id);
  const depth = new Map<string, number>();
  const queue: string[] = roots.length > 0 ? roots : nodes.slice(0, 1).map((n) => n.id);

  for (const root of queue) depth.set(root, 0);

  // Breadth-first; guards against cycles in hand-written edge lists.
  let head = 0;
  while (head < queue.length) {
    const current = queue[head++];
    const currentDepth = depth.get(current) ?? 0;
    for (const next of outgoing.get(current) ?? []) {
      if (!depth.has(next) || (depth.get(next) ?? 0) < currentDepth + 1) {
        depth.set(next, currentDepth + 1);
        if (!queue.includes(next)) queue.push(next);
      }
    }
  }

  // Isolated nodes keep their declaration order at the end.
  let fallback = Math.max(0, ...Array.from(depth.values())) + 1;
  for (const node of nodes) {
    if (!depth.has(node.id)) {
      depth.set(node.id, fallback);
      fallback += 1;
    }
  }
  return depth;
}

/** Order the nodes inside one layer by their declaration order. */
function layerOrder(nodes: ArchNode[], depth: Map<string, number>): Map<number, ArchNode[]> {
  const layers = new Map<number, ArchNode[]>();
  for (const node of nodes) {
    const d = depth.get(node.id) ?? 0;
    const list = layers.get(d) ?? [];
    list.push(node);
    layers.set(d, list);
  }
  return layers;
}

function bezier(x1: number, y1: number, x2: number, y2: number, horizontal: boolean): string {
  if (horizontal) {
    const dx = Math.max(24, Math.abs(x2 - x1) * 0.45);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }
  const dy = Math.max(20, Math.abs(y2 - y1) * 0.45);
  return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
}

/** Compute the full layout for a diagram. */
export function layoutDiagram(diagram: ArchDiagram): DiagramLayout {
  const horizontal = diagram.kind === 'architecture' || diagram.kind === 'dataset-shift';
  const depth = computeLayers(diagram.nodes, diagram.edges);
  const layers = layerOrder(diagram.nodes, depth);
  const depths = Array.from(layers.keys()).sort((a, b) => a - b);

  const laid: LaidOutNode[] = [];

  for (const d of depths) {
    const layer = layers.get(d) ?? [];
    const measured = layer.map((node) => {
      const lines = wrap(node.label);
      const h = Math.max(MIN_NODE_H, 26 + lines.length * 16);
      return { node, lines, h };
    });

    if (horizontal) {
      const totalHeight =
        measured.reduce((sum, m) => sum + m.h, 0) + V_GAP * Math.max(0, measured.length - 1);
      let y = PAD;
      for (const m of measured) {
        laid.push({
          node: m.node,
          x: PAD + d * (NODE_W + H_GAP),
          y,
          w: NODE_W,
          h: m.h,
          lines: m.lines,
          cx: PAD + d * (NODE_W + H_GAP) + NODE_W / 2,
          cy: y + m.h / 2,
        });
        y += m.h + V_GAP;
      }
      void totalHeight;
    } else {
      const totalWidth =
        measured.reduce((sum, m) => sum + m.h, 0) + V_GAP * Math.max(0, measured.length - 1);
      let x = PAD;
      for (const m of measured) {
        const w = Math.max(NODE_W, totalWidth);
        laid.push({
          node: m.node,
          x,
          y: PAD + d * (MIN_NODE_H + H_GAP),
          w,
          h: m.h,
          lines: m.lines,
          cx: x + w / 2,
          cy: PAD + d * (MIN_NODE_H + H_GAP) + m.h / 2,
        });
        x += m.h + V_GAP;
      }
    }
  }

  const byId = new Map(laid.map((n) => [n.node.id, n]));
  const edges: LaidOutEdge[] = [];

  for (const edge of diagram.edges) {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) continue;

    let path: string;
    let labelX: number;
    let labelY: number;

    if (horizontal) {
      const x1 = from.x + from.w;
      const y1 = from.cy;
      const x2 = to.x;
      const y2 = to.cy;
      path = bezier(x1, y1, x2, y2, true);
      labelX = (x1 + x2) / 2;
      labelY = (y1 + y2) / 2 - 8;
    } else {
      const x1 = from.cx;
      const y1 = from.y + from.h;
      const x2 = to.cx;
      const y2 = to.y;
      path = bezier(x1, y1, x2, y2, false);
      labelX = (x1 + x2) / 2 + 10;
      labelY = (y1 + y2) / 2;
    }
    edges.push({ edge, path, label: edge.label ?? '', labelX, labelY });
  }

  const maxX = laid.reduce((max, n) => Math.max(max, n.x + n.w), 0);
  const maxY = laid.reduce((max, n) => Math.max(max, n.y + n.h), 0);

  return {
    width: maxX + PAD,
    height: maxY + PAD,
    nodes: laid,
    edges,
    horizontal,
  };
}
