// Small hand-rolled SVG charts. No library: every chart is built from the
// data in data.js as plain SVG strings, so the first load stays tiny and
// nothing is fetched from anywhere.

const INK = '#1c2b2d';
const MUTED = '#5c6b6e';
const TEAL = '#0e4f5c';
const AMBER = '#e8a13a';
const GREEN = '#2e7d5b';
const RED = '#b3402e';
const GRID = '#e3ddd0';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceMax(v) {
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * p;
}

// Line chart with dots, area fill and value labels.
export function lineChart({ width = 640, height = 260, points, format, color = TEAL }) {
  const padL = 52;
  const padR = 14;
  const padT = 18;
  const padB = 30;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const values = points.map((p) => p.value);
  const max = niceMax(Math.max(...values) * 1.08);
  const min = Math.min(0, Math.min(...values));
  const x = (i) => padL + (i / (points.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const ticks = 4;
  let g = '';
  for (let t = 0; t <= ticks; t += 1) {
    const v = min + ((max - min) * t) / ticks;
    const yy = y(v);
    g += `<line x1="${padL}" y1="${yy}" x2="${width - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(format(v))}</text>`;
  }
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z`;
  let dots = '';
  points.forEach((p, i) => {
    const last = i === points.length - 1;
    const anchor = last ? 'end' : 'middle';
    const lx = last ? x(i) + 2 : x(i);
    dots += `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="${color}" stroke="#fff" stroke-width="2"/>`;
    dots += `<text x="${lx}" y="${y(p.value) - 10}" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${INK}">${esc(format(p.value))}</text>`;
    dots += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" preserveAspectRatio="xMidYMid meet"><path d="${area}" fill="${color}" opacity="0.08"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${g}${dots}</svg>`;
}

// Vertical bar chart with value labels.
export function barChart({ width = 640, height = 260, items, format, colors }) {
  const padL = 12;
  const padR = 12;
  const padT = 24;
  const padB = 30;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const max = niceMax(Math.max(...items.map((i) => i.value)) * 1.08);
  const slot = iw / items.length;
  const bw = Math.min(64, slot * 0.62);
  let bars = '';
  items.forEach((item, i) => {
    const bh = (item.value / max) * ih;
    const bx = padL + i * slot + (slot - bw) / 2;
    const by = padT + ih - bh;
    const color = colors ? colors[i % colors.length] : TEAL;
    const neg = item.value < 0;
    bars += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 2).toFixed(1)}" rx="4" fill="${neg ? RED : color}"/>`;
    bars += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${esc(format(item.value))}</text>`;
    bars += `<text x="${(bx + bw / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(item.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" preserveAspectRatio="xMidYMid meet">${bars}</svg>`;
}

// Horizontal bars, good for ranked lists like provinces.
export function hbarChart({ width = 640, items, format, color = TEAL, rowH = 34 }) {
  const height = items.length * rowH + 12;
  const padL = 150;
  const padR = 64;
  const max = Math.max(...items.map((i) => i.value));
  const iw = width - padL - padR;
  let rows = '';
  items.forEach((item, i) => {
    const y = 6 + i * rowH;
    const bw = Math.max(2, (item.value / max) * iw);
    rows += `<text x="${padL - 10}" y="${y + 17}" text-anchor="end" font-size="12" fill="${INK}">${esc(item.label)}</text>`;
    rows += `<rect x="${padL}" y="${y + 4}" width="${bw.toFixed(1)}" height="18" rx="4" fill="${item.color || color}"/>`;
    rows += `<text x="${padL + bw + 8}" y="${y + 17}" font-size="12" font-weight="700" fill="${INK}">${esc(format(item.value))}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal bar chart" preserveAspectRatio="xMidYMid meet">${rows}</svg>`;
}

// Donut chart with a centre label and a legend list beside it.
export function donut({ size = 220, segments, centre }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let a0 = -Math.PI / 2;
  let paths = '';
  segments.forEach((seg) => {
    const frac = seg.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const large = frac > 0.5 ? 1 : 0;
    paths += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${(cx + inner * Math.cos(a1)).toFixed(1)},${(cy + inner * Math.sin(a1)).toFixed(1)} A${inner},${inner} 0 ${large} 0 ${(cx + inner * Math.cos(a0)).toFixed(1)},${(cy + inner * Math.sin(a0)).toFixed(1)} Z" fill="${seg.color}"/>`;
    a0 = a1;
  });
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart" preserveAspectRatio="xMidYMid meet">${paths}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${esc(centre.big)}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(centre.small)}</text></svg>`;
}
