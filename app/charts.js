// Hand-built SVG charts. No library anywhere: every chart is a string of
// SVG assembled from the numbers in data.js, so the first load stays
// small and the page fetches nothing from the network.

const INK = '#1c2b2d';
const SOFT = '#5c6b6e';
const TEAL = '#0e4f5c';
const AMBER = '#e8a13a';
const GREEN = '#2e7d5b';
const RED = '#b3402e';
const GRIDLINE = '#e3ddd0';

function escText(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Round a chart ceiling up to a friendly 1 / 2 / 2.5 / 5 / 10 step.
function roundCeil(v) {
  const power = 10 ** Math.floor(Math.log10(v));
  const scaled = v / power;
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return step * power;
}

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${escText(label)}" preserveAspectRatio="xMidYMid meet">`;
}

// Line chart: dots, a soft area fill, and a value printed at each dot.
// `labelIndices` narrows the printed values to the given point indices
// (e.g. first, last and the 2020 dip on a short home-page strip); by
// default every point is labelled, as before.
export function lineChart({ width = 640, height = 260, points, format, color = TEAL, labelIndices = null }) {
  const left = 52;
  const right = 14;
  const top = 18;
  const bottom = 30;
  const innerW = width - left - right;
  const innerH = height - top - bottom;
  const vals = points.map((p) => p.value);
  const topVal = roundCeil(Math.max(...vals) * 1.08);
  const baseVal = Math.min(0, Math.min(...vals));
  const px = (i) => left + (i / (points.length - 1)) * innerW;
  const py = (v) => top + innerH - ((v - baseVal) / (topVal - baseVal)) * innerH;
  let grid = '';
  for (let t = 0; t <= 4; t += 1) {
    const v = baseVal + ((topVal - baseVal) * t) / 4;
    const yy = py(v);
    grid += `<line x1="${left}" y1="${yy}" x2="${width - right}" y2="${yy}" stroke="${GRIDLINE}" stroke-width="1"/>`;
    grid += `<text x="${left - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SOFT}">${escText(format(v))}</text>`;
  }
  const trace = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(p.value).toFixed(1)}`).join(' ');
  const fill = `${trace} L${px(points.length - 1).toFixed(1)},${py(baseVal).toFixed(1)} L${px(0).toFixed(1)},${py(baseVal).toFixed(1)} Z`;
  let marks = '';
  points.forEach((p, i) => {
    const isLast = i === points.length - 1;
    marks += `<circle cx="${px(i)}" cy="${py(p.value)}" r="4" fill="${color}" stroke="#fff" stroke-width="2"/>`;
    if (labelIndices === null || labelIndices.includes(i)) {
      // First point: left-align the label so it cannot collide with the
      // y-axis gridline labels; last point: right-align it.
      const anchor = isLast ? 'end' : i === 0 ? 'start' : 'middle';
      const lx = isLast ? px(i) + 2 : i === 0 ? px(i) + 2 : px(i);
      marks += `<text x="${lx}" y="${py(p.value) - 10}" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${INK}">${escText(format(p.value))}</text>`;
    }
    marks += `<text x="${px(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${SOFT}">${escText(p.label)}</text>`;
  });
  return `${svgOpen(width, height, 'Line chart')}<path d="${fill}" fill="${color}" opacity="0.08"/><path d="${trace}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${grid}${marks}</svg>`;
}

// Vertical bars with a value printed above each one.
export function barChart({ width = 640, height = 260, items, format, colors }) {
  const left = 12;
  const right = 12;
  const top = 24;
  const bottom = 30;
  const innerW = width - left - right;
  const innerH = height - top - bottom;
  const topVal = roundCeil(Math.max(...items.map((i) => i.value)) * 1.08);
  const slot = innerW / items.length;
  const bw = Math.min(64, slot * 0.62);
  let bars = '';
  items.forEach((item, i) => {
    const h = (item.value / topVal) * innerH;
    const x = left + i * slot + (slot - bw) / 2;
    const y = top + innerH - h;
    const fill = item.value < 0 ? RED : (colors ? colors[i % colors.length] : TEAL);
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(h, 2).toFixed(1)}" rx="4" fill="${fill}"/>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${escText(format(item.value))}</text>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${SOFT}">${escText(item.label)}</text>`;
  });
  return `${svgOpen(width, height, 'Bar chart')}${bars}</svg>`;
}

// Horizontal bars — the right shape for ranked lists like provinces.
export function hbarChart({ width = 640, items, format, color = TEAL, rowH = 34 }) {
  const height = items.length * rowH + 12;
  const left = 150;
  const right = 64;
  const topVal = Math.max(...items.map((i) => i.value));
  const innerW = width - left - right;
  let rows = '';
  items.forEach((item, i) => {
    const y = 6 + i * rowH;
    const w = Math.max(2, (item.value / topVal) * innerW);
    rows += `<text x="${left - 10}" y="${y + 17}" text-anchor="end" font-size="12" fill="${INK}">${escText(item.label)}</text>`;
    rows += `<rect x="${left}" y="${y + 4}" width="${w.toFixed(1)}" height="18" rx="4" fill="${item.color || color}"/>`;
    rows += `<text x="${left + w + 8}" y="${y + 17}" font-size="12" font-weight="700" fill="${INK}">${escText(format(item.value))}</text>`;
  });
  return `${svgOpen(width, height, 'Horizontal bar chart')}${rows}</svg>`;
}

// Donut with a big centre number and a short line under it.
export function donut({ size = 220, segments, centre }) {
  const c = size / 2;
  const outer = size / 2 - 14;
  const inner = outer * 0.62;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let start = -Math.PI / 2;
  let slices = '';
  segments.forEach((seg) => {
    const frac = seg.value / total;
    const end = start + frac * Math.PI * 2;
    const x0 = c + outer * Math.cos(start);
    const y0 = c + outer * Math.sin(start);
    const x1 = c + outer * Math.cos(end);
    const y1 = c + outer * Math.sin(end);
    const big = frac > 0.5 ? 1 : 0;
    slices += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${outer},${outer} 0 ${big} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${(c + inner * Math.cos(end)).toFixed(1)},${(c + inner * Math.sin(end)).toFixed(1)} A${inner},${inner} 0 ${big} 0 ${(c + inner * Math.cos(start)).toFixed(1)},${(c + inner * Math.sin(start)).toFixed(1)} Z" fill="${seg.color}"/>`;
    start = end;
  });
  return `${svgOpen(size, size, 'Donut chart')}${slices}<text x="${c}" y="${c - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${escText(centre.big)}</text><text x="${c}" y="${c + 16}" text-anchor="middle" font-size="11" fill="${SOFT}">${escText(centre.small)}</text></svg>`;
}

// Two values side by side for each row: the Compare page's workhorse.
// `rows` is [{ label, a, b, format }] and the two colours are A and B.
// Each row is scaled to its own larger value, so a row like density —
// where one province can be a thousand times the other — still reads.
export function versusChart({ width = 640, rows, format, aColor = TEAL, bColor = AMBER, rowH = 52 }) {
  const height = rows.length * rowH + 34;
  const left = 170;
  const right = 74;
  const innerW = width - left - right;
  const barH = 13;
  let out = '';
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const rowMax = Math.max(r.a, r.b);
    const fmt = r.format || format;
    const wa = Math.max(2, (r.a / rowMax) * innerW);
    const wb = Math.max(2, (r.b / rowMax) * innerW);
    out += `<text x="${left - 10}" y="${y + 24}" text-anchor="end" font-size="12" fill="${INK}">${escText(r.label)}</text>`;
    out += `<rect x="${left}" y="${y}" width="${wa.toFixed(1)}" height="${barH}" rx="4" fill="${aColor}"/>`;
    out += `<text x="${left + wa + 8}" y="${y + 11}" font-size="12" font-weight="700" fill="${INK}">${escText(fmt(r.a))}</text>`;
    out += `<rect x="${left}" y="${y + 20}" width="${wb.toFixed(1)}" height="${barH}" rx="4" fill="${bColor}"/>`;
    out += `<text x="${left + wb + 8}" y="${y + 31}" font-size="12" font-weight="700" fill="${INK}">${escText(fmt(r.b))}</text>`;
  });
  return `${svgOpen(width, height, 'Comparison chart')}${out}</svg>`;
}

// Tile-grid cartogram: one equal tile per province, placed roughly where
// the province sits in the country, shaded by the selected metric.
// `shade` is 'share' (population share, pale paper → deep teal),
// 'hdi' (Human Development Index, pale → deep teal, low → high) or
// 'poverty' (poverty rate, pale → deep red, low → high). The second line
// inside each tile shows the active metric's value. Tiles are buttons —
// clicking one selects that province.
export function tileGrid({ tiles, selected, cols = 14, rows = 6, tileW = 64, tileH = 48, gap = 5, shade = 'share' }) {
  const width = cols * (tileW + gap) + gap;
  const height = rows * (tileH + gap) + gap;
  const metric = (t) => (shade === 'hdi' ? t.hdi : shade === 'poverty' ? t.poverty : t.share);
  const values = tiles.map(metric);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const fmtMetric = (t) => (shade === 'hdi' ? t.hdi.toFixed(2) : shade === 'poverty' ? `${t.poverty.toFixed(1)}%` : `${t.share.toFixed(1)}%`);
  const metricName = shade === 'hdi' ? 'HDI 2024' : shade === 'poverty' ? 'poverty rate, Sep 2024' : 'share of Indonesia';
  let cells = '';
  tiles.forEach((t) => {
    const x = gap + t.gx * (tileW + gap);
    const y = gap + t.gy * (tileH + gap);
    // Depth 0..1 across the metric's range; shade pale → deep.
    const depth = maxV === minV ? 0.5 : (metric(t) - minV) / (maxV - minV);
    let fill;
    if (shade === 'poverty') {
      // Pale paper → deep red as poverty rises.
      const r = Math.round(238 - depth * (238 - 179));
      const g = Math.round(231 - depth * (231 - 64));
      const b = Math.round(214 - depth * (214 - 46));
      fill = `rgb(${r},${g},${b})`;
    } else {
      // Pale paper → deep teal as the value rises.
      const r = Math.round(232 - depth * (232 - 14));
      const g = Math.round(226 - depth * (226 - 79));
      const b = Math.round(210 - depth * (210 - 92));
      fill = `rgb(${r},${g},${b})`;
    }
    const isSel = selected === t.name;
    const textFill = depth > 0.55 ? '#ffffff' : INK;
    cells += `<g data-prov="${escText(t.name)}" style="cursor:pointer">`;
    cells += `<rect x="${x}" y="${y}" width="${tileW}" height="${tileH}" rx="6" fill="${fill}" stroke="${isSel ? AMBER : '#ffffff'}" stroke-width="${isSel ? 3 : 1}"/>`;
    cells += `<text x="${x + tileW / 2}" y="${y + 21}" text-anchor="middle" font-size="12" font-weight="700" fill="${textFill}">${escText(t.short)}</text>`;
    cells += `<text x="${x + tileW / 2}" y="${y + 38}" text-anchor="middle" font-size="11" fill="${textFill}">${fmtMetric(t)}</text>`;
    cells += `<title>${escText(t.name)} — ${fmtMetric(t)} (${metricName})</title></g>`;
  });
  return `${svgOpen(width, height, 'Tile-grid cartogram of Indonesia')}${cells}</svg>`;
}
