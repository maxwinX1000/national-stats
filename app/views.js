// One render function per page. Each returns an HTML string for #app.
// All controls are plain buttons, selects and inputs; main.js wires them
// up after each render. Every figure names its source and year.
import { lineChart, barChart, hbarChart, donut } from './charts.js';
import {
  COUNTRY, HEADLINE, GDP_SERIES, POP_SERIES, AGE_STRUCTURE, SECTORS,
  EXPENDITURE, PROVINCES, CITIES, POVERTY_SERIES, POVERTY_DETAIL,
  HDI_SERIES, HDI_DIMENSIONS, JOBS, HEALTH_EDU, TRADE, SOURCES, METHOD_NOTES,
} from './data.js';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function srcLine(source, year) {
  return `<p class="src">Source: ${esc(source)} · ${esc(year)}</p>`;
}

function kpiCards() {
  return `<div class="kpis">${HEADLINE.map(
    (k) => `<a class="kpi" href="#/${k.id === 'gdp' || k.id === 'gdp-capita' || k.id === 'growth' ? 'economy' : k.id === 'population' ? 'population' : k.id === 'poverty' ? 'prices' : k.id === 'hdi' ? 'people' : ''}">
      <span class="kpi-label">${esc(k.label)}</span>
      <span class="kpi-value">${esc(k.value)} <span class="kpi-unit">${esc(k.unit)}</span></span>
      <span class="kpi-detail">${esc(k.detail)}</span>
      <span class="kpi-src">${esc(k.source)} · ${esc(k.year)}</span>
    </a>`,
  ).join('')}</div>`;
}

export function viewHome() {
  const gdpPoints = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.gdp }));
  const islandShare = [
    { label: 'Jawa', value: 55.9, color: '#0e4f5c' },
    { label: 'Sumatera', value: 21.8, color: '#2e7d5b' },
    { label: 'Kalimantan', value: 6.2, color: '#7a9a3d' },
    { label: 'Sulawesi', value: 7.4, color: '#e8a13a' },
    { label: 'Others', value: 8.7, color: '#b98a5a' },
  ];
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia in numbers · Updated ${esc(COUNTRY.updated)}</p>
    <h1>One country, <em>283.5 million</em> stories — counted.</h1>
    <p class="lede">Nusantara Data gathers Indonesia's official statistics in one place: population, economy, work, prices, health and education — every figure with its source and year, every chart built from the numbers themselves.</p>
    <div class="hero-facts">
      <span><strong>${esc(COUNTRY.provinces)}</strong> provinces</span>
      <span><strong>${esc(COUNTRY.regenciesCities)}</strong> regencies &amp; cities</span>
      <span><strong>${esc(COUNTRY.islands)}</strong> islands</span>
      <span><strong>${esc(COUNTRY.capital)}</strong> is the capital</span>
    </div>
  </section>
  ${kpiCards()}
  <section class="grid2">
    <article class="card">
      <h2>GDP, 2019–2024</h2>
      <p class="card-sub">Current US$ billions. The 2020 dip is the pandemic; growth has held above 5% since 2022.</p>
      ${lineChart({ points: gdpPoints, format: (v) => `$${Math.round(v)}B` })}
      ${srcLine('World Bank — World Development Indicators', 2024)}
      <p><a class="btn" href="#/economy">Explore the economy →</a></p>
    </article>
    <article class="card">
      <h2>What makes up GDP</h2>
      <p class="card-sub">Share of GDP by sector of origin, 2024 estimates.</p>
      <div class="donut-wrap">
        ${donut({ segments: SECTORS.map((s) => ({ value: s.share, color: s.color })), centre: { big: '100%', small: 'of GDP' } })}
        <ul class="legend">${SECTORS.map((s) => `<li><span class="sw" style="background:${s.color}"></span>${esc(s.name)} — <strong>${s.share}%</strong></li>`).join('')}</ul>
      </div>
      ${srcLine('CIA World Factbook', '2024 estimates')}
    </article>
  </section>
  <section class="card">
    <h2>Where people live</h2>
    <p class="card-sub">Share of the population by island group. More than half of all Indonesians live on Jawa, which is 7% of the land.</p>
    ${hbarChart({ items: islandShare, format: (v) => `${v}%` })}
    ${srcLine('BPS — Population Projection 2020–2050', 2023)}
    <p><a class="btn" href="#/provinces">See all provinces →</a></p>
  </section>`;
}

export function viewPopulation(state) {
  const tab = state.popTab || 'age';
  const tabs = `
    <div class="tabs" role="tablist">
      <button data-tab="age" class="${tab === 'age' ? 'on' : ''}">Age structure</button>
      <button data-tab="growth" class="${tab === 'growth' ? 'on' : ''}">Growth 2019–2024</button>
      <button data-tab="cities" class="${tab === 'cities' ? 'on' : ''}">Largest cities</button>
    </div>`;
  let body = '';
  if (tab === 'age') {
    body = `
      <p class="card-sub">Indonesia is young: almost a quarter of the population is under 15, and more than two in three are of working age.</p>
      ${hbarChart({ items: AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share })), format: (v) => `${v}%` })}
      ${srcLine('World Bank — World Development Indicators', 2024)}
      <table class="tbl"><thead><tr><th>Age group</th><th>Share</th><th>What it means</th></tr></thead><tbody>
      ${AGE_STRUCTURE.map((a) => `<tr><td>${esc(a.group)}</td><td>${a.share}%</td><td>${esc(a.note)}</td></tr>`).join('')}
      </tbody></table>`;
  } else if (tab === 'growth') {
    body = `
      <p class="card-sub">Population in millions. Growth has slowed to 0.8% a year — the demographic dividend is still open, but narrowing.</p>
      ${lineChart({ points: POP_SERIES.map((d) => ({ label: String(d.year), value: d.pop })), format: (v) => `${v.toFixed(1)}M` })}
      ${srcLine('World Bank — World Development Indicators', 2024)}
      <table class="tbl"><thead><tr><th>Year</th><th>Population</th></tr></thead><tbody>
      ${POP_SERIES.map((d) => `<tr><td>${d.year}</td><td>${d.pop.toFixed(1)} million</td></tr>`).join('')}
      </tbody></table>`;
  } else {
    body = `
      <p class="card-sub">Jakarta is the only megacity; the next nine are all under 3 million. Figures are BPS mid-2024 official estimates.</p>
      ${hbarChart({ items: CITIES.map((c) => ({ label: c.name, value: c.pop })), format: (v) => `${v}M` })}
      ${srcLine('BPS — Statistics Indonesia', 'mid-2024 estimates')}`;
  }
  return `
  <section class="pagehead"><h1>Population</h1>
  <p class="lede">283.5 million people (World Bank, 2024) — the world's 4th largest population, spread over 17,500 islands, with 58.8% living in towns and cities.</p></section>
  ${tabs}
  <section class="card">${body}</section>`;
}

export function viewEconomy(state) {
  const mode = state.gdpMode || 'line';
  const year = state.gdpYear || 2024;
  const chart = mode === 'line'
    ? lineChart({ points: GDP_SERIES.map((d) => ({ label: String(d.year), value: d.gdp })), format: (v) => `$${Math.round(v)}B` })
    : barChart({ items: GDP_SERIES.map((d) => ({ label: String(d.year), value: d.gdp })), format: (v) => `$${Math.round(v)}B` });
  const sel = GDP_SERIES.find((d) => d.year === year);
  return `
  <section class="pagehead"><h1>Economy</h1>
  <p class="lede">A $1.40 trillion economy (World Bank, 2024) — Southeast Asia's largest — growing 5.03% a year, with services now the biggest sector.</p></section>
  <section class="card">
    <div class="card-head"><h2>GDP, 2019–2024</h2>
      <div class="seg" role="group" aria-label="Chart type">
        <button data-mode="line" class="${mode === 'line' ? 'on' : ''}">Line</button>
        <button data-mode="bar" class="${mode === 'bar' ? 'on' : ''}">Bars</button>
      </div>
    </div>
    <p class="card-sub">Current US$ billions. Pick a year below to see its detail.</p>
    ${chart}
    ${srcLine('World Bank — World Development Indicators', 2024)}
    <div class="yearpick">${GDP_SERIES.map((d) => `<button data-year="${d.year}" class="${d.year === year ? 'on' : ''}">${d.year}</button>`).join('')}</div>
    <div class="yeardetail">
      <strong>${sel.year}:</strong> GDP $${sel.gdp.toLocaleString('en-US')} billion · growth ${sel.growth > 0 ? '+' : ''}${sel.growth.toFixed(1)}% · ${sel.year === 2020 ? 'pandemic contraction, the first since 1998' : sel.year === 2024 ? 'GDP per capita $4,925' : 'steady recovery'}.
    </div>
    <table class="tbl"><thead><tr><th>Year</th><th>GDP (US$ bn)</th><th>Growth</th></tr></thead><tbody>
    ${GDP_SERIES.map((d) => `<tr class="${d.year === year ? 'hl' : ''}"><td>${d.year}</td><td>$${d.gdp.toLocaleString('en-US')}</td><td>${d.growth > 0 ? '+' : ''}${d.growth.toFixed(1)}%</td></tr>`).join('')}
    </tbody></table>
  </section>
  <section class="grid2">
    <article class="card">
      <h2>GDP by sector</h2>
      <p class="card-sub">Share of GDP by sector of origin, 2024 estimates.</p>
      <div class="donut-wrap">
        ${donut({ segments: SECTORS.map((s) => ({ value: s.share, color: s.color })), centre: { big: '43.8%', small: 'services' } })}
        <ul class="legend">${SECTORS.map((s) => `<li><span class="sw" style="background:${s.color}"></span>${esc(s.name)} — <strong>${s.share}%</strong></li>`).join('')}</ul>
      </div>
      ${srcLine('CIA World Factbook', '2024 estimates')}
    </article>
    <article class="card">
      <h2>GDP by end use</h2>
      <p class="card-sub">What the economy is spent on, as a share of GDP.</p>
      ${hbarChart({ items: EXPENDITURE.map((e) => ({ label: e.name, value: e.share })), format: (v) => `${v}%` })}
      ${srcLine('CIA World Factbook', '2024 estimates')}
      <h3 class="mini">Trade &amp; investment</h3>
      <ul class="facts">${TRADE.map((t) => `<li><strong>${esc(t.value)}</strong> — ${esc(t.name)} <span class="fsrc">${esc(t.source)}, ${esc(t.year)}</span></li>`).join('')}</ul>
    </article>
  </section>`;
}

export function viewJobs() {
  return `
  <section class="pagehead"><h1>Work</h1>
  <p class="lede">Open unemployment is 4.91% (BPS, Aug 2024). Half of all workers are in services; agriculture still employs more than one in four.</p></section>
  <section class="grid2">
    <article class="card">
      <h2>Unemployment</h2>
      <p class="card-sub">Two measures, two definitions — both shown, both labelled.</p>
      <ul class="facts big">
        <li><strong>${JOBS.openUnemployment.value}%</strong> — ${esc(JOBS.openUnemployment.label)} <span class="fsrc">${esc(JOBS.openUnemployment.source)}, ${esc(JOBS.openUnemployment.year)}</span></li>
        <li><strong>${JOBS.iloUnemployment.value}%</strong> — ${esc(JOBS.iloUnemployment.label)} <span class="fsrc">${esc(JOBS.iloUnemployment.source)}, ${esc(JOBS.iloUnemployment.year)}</span></li>
        <li><strong>${JOBS.youthUnemployment.value}%</strong> — ${esc(JOBS.youthUnemployment.label)} <span class="fsrc">${esc(JOBS.youthUnemployment.source)}, ${esc(JOBS.youthUnemployment.year)}</span></li>
      </ul>
      <p class="note">The BPS open rate counts people actively looking for work in the labour-force survey. The ILO-modelled rate uses a different definition and runs lower.</p>
    </article>
    <article class="card">
      <h2>Where people work</h2>
      <p class="card-sub">Share of the labour force by occupation.</p>
      ${hbarChart({ items: JOBS.byOccupation.map((o) => ({ label: o.name, value: o.share })), format: (v) => `${v}%` })}
      ${srcLine('CIA World Factbook', '2024 estimates')}
    </article>
  </section>`;
}

export function viewPrices() {
  return `
  <section class="pagehead"><h1>Prices &amp; poverty</h1>
  <p class="lede">Inflation ran at 2.2% in 2024 (World Bank). Poverty fell to 8.57% in September 2024 — the lowest ever recorded by BPS.</p></section>
  <section class="grid2">
    <article class="card">
      <h2>Poverty is falling</h2>
      <p class="card-sub">Percent of the population below the poverty line, BPS.</p>
      ${lineChart({ points: POVERTY_SERIES.map((d) => ({ label: d.label, value: d.value })), format: (v) => `${v.toFixed(2)}%`, color: '#2e7d5b' })}
      ${srcLine('BPS — Statistics Indonesia, Poverty Profile', 'Mar 2024 – Mar 2026')}
      <ul class="facts">
        <li><strong>24.06 million</strong> people were poor in Sep 2024</li>
        <li><strong>6.66%</strong> poor in urban areas · <strong>11.34%</strong> in rural areas</li>
        <li><strong>Rp ${POVERTY_DETAIL.line.toLocaleString('en-US')}</strong> poverty line per capita per month</li>
        <li><strong>${POVERTY_DETAIL.gini}</strong> Gini ratio (${esc(POVERTY_DETAIL.giniYear)})</li>
      </ul>
    </article>
    <article class="card">
      <h2>Prices</h2>
      <p class="card-sub">Consumer prices, and what they mean for a household budget.</p>
      <ul class="facts big">
        <li><strong>2.2%</strong> — consumer price inflation, annual average <span class="fsrc">World Bank, 2024</span></li>
        <li><strong>1.57%</strong> — inflation, December 2024 year-on-year <span class="fsrc">BPS, 2024</span></li>
        <li><strong>Rp 595,242</strong> — monthly poverty line per person <span class="fsrc">BPS, Sep 2024</span></li>
      </ul>
      <p class="note">The poverty line is the cost of a minimum food basket plus essential non-food spending, by the BPS cost-of-basic-needs method.</p>
      <p><a class="btn" href="#/people">How people are doing →</a></p>
    </article>
  </section>`;
}

export function viewPeople() {
  return `
  <section class="pagehead"><h1>Health &amp; education</h1>
  <p class="lede">Human Development Index 75.02 (BPS, 2024) — up from 72.81 in 2020. Indonesians live longer and stay in school longer than ever.</p></section>
  <section class="grid2">
    <article class="card">
      <h2>Human Development Index</h2>
      <p class="card-sub">BPS index, 2020–2025. All four dimensions rose in 2024.</p>
      ${lineChart({ points: HDI_SERIES.map((d) => ({ label: String(d.year), value: d.hdi })), format: (v) => v.toFixed(2), color: '#2e7d5b' })}
      ${srcLine('BPS — Statistics Indonesia, Human Development Index', '2020–2025')}
      <ul class="facts">${HDI_DIMENSIONS.map((d) => `<li><strong>${esc(d.value)}</strong> — ${esc(d.name)} <span class="fsrc">${esc(d.source)}, ${esc(d.year)}</span></li>`).join('')}</ul>
    </article>
    <article class="card">
      <h2>Health &amp; schooling</h2>
      <p class="card-sub">The rest of the picture, each figure with its source.</p>
      <ul class="facts">${HEALTH_EDU.map((h) => `<li><strong>${esc(h.value)}</strong> — ${esc(h.name)} <span class="fsrc">${esc(h.source)}, ${esc(h.year)}</span></li>`).join('')}</ul>
      <p class="note">Life expectancy is 74.15 years by BPS mortality tables and 71.3 by the World Bank's UN-based model — different methods, both shown on the Sources page.</p>
    </article>
  </section>`;
}

export function viewProvinces(state) {
  const q = (state.provQuery || '').toLowerCase();
  const sort = state.provSort || 'pop';
  const dir = state.provDir || 'desc';
  let rows = PROVINCES.map((p) => ({
    ...p,
    density: Math.round((p.pop * 1e6) / p.area),
    share: ((p.pop / 283.487) * 100),
  }));
  if (q) rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q) || r.island.toLowerCase().includes(q));
  rows.sort((a, b) => {
    const k = sort === 'name' ? a.name.localeCompare(b.name) : sort === 'density' ? a.density - b.density : sort === 'share' ? a.share - b.share : a.pop - b.pop;
    return dir === 'asc' ? k : -k;
  });
  const sel = state.provSel ? rows.find((r) => r.name === state.provSel) || PROVINCES.find((p) => p.name === state.provSel) : null;
  const selRow = sel ? { ...sel, density: Math.round((sel.pop * 1e6) / sel.area), share: (sel.pop / 283.487) * 100 } : null;
  const arrow = (key) => (sort === key ? (dir === 'asc' ? ' ↑' : ' ↓') : '');
  return `
  <section class="pagehead"><h1>Provinces</h1>
  <p class="lede">The ten largest of Indonesia's 38 provinces hold 204.5 million people — 72% of the country. Search, sort, and tap a row for its detail.</p></section>
  <section class="card">
    <div class="toolbar">
      <input id="prov-search" type="search" placeholder="Search province, capital or island…" value="${esc(state.provQuery || '')}" aria-label="Search provinces">
      <span class="count">${rows.length} of ${PROVINCES.length} shown</span>
    </div>
    <div class="tablewrap"><table class="tbl sortable"><thead><tr>
      <th><button data-sort="name">Province${arrow('name')}</button></th>
      <th><button data-sort="capital">Capital</button></th>
      <th>Island</th>
      <th><button data-sort="pop">Population${arrow('pop')}</button></th>
      <th><button data-sort="share">Share${arrow('share')}</button></th>
      <th><button data-sort="density">Density /km²${arrow('density')}</button></th>
    </tr></thead><tbody>
    ${rows.map((r) => `<tr data-prov="${esc(r.name)}" class="${selRow && selRow.name === r.name ? 'hl' : ''}"><td>${esc(r.name)}</td><td>${esc(r.capital)}</td><td>${esc(r.island)}</td><td>${r.pop.toFixed(2)}M</td><td>${r.share.toFixed(1)}%</td><td>${r.density.toLocaleString('en-US')}</td></tr>`).join('') || '<tr><td colspan="6">No province matches that search.</td></tr>'}
    </tbody></table></div>
    ${srcLine('BPS — Statistics Indonesia, mid-2024 official estimates', 2024)}
    ${selRow ? `<aside class="detail">
      <h3>${esc(selRow.name)}</h3>
      <p>Capital <strong>${esc(selRow.capital)}</strong> · Island <strong>${esc(selRow.island)}</strong></p>
      <p>Population <strong>${selRow.pop.toFixed(2)} million</strong> — <strong>${selRow.share.toFixed(1)}%</strong> of Indonesia — spread over <strong>${selRow.area.toLocaleString('en-US')} km²</strong> at <strong>${selRow.density.toLocaleString('en-US')} people per km²</strong>.</p>
      <p class="src">Source: BPS, mid-2024 estimates. Density computed from population ÷ area.</p>
    </aside>` : '<p class="hint">Tap any row to see that province in detail.</p>'}
  </section>`;
}

export function viewSources() {
  return `
  <section class="pagehead"><h1>Methodology &amp; sources</h1>
  <p class="lede">Every number on this site comes from one of the releases below. Nothing is estimated by this site except densities, which are population divided by area and labelled as computed.</p></section>
  <section class="card">
    <h2>Sources</h2>
    <table class="tbl"><thead><tr><th>Dataset</th><th>Source</th><th>Year</th></tr></thead><tbody>
    ${SOURCES.map((s) => `<tr><td>${esc(s.dataset)}</td><td>${esc(s.source)}</td><td>${esc(s.year)}</td></tr>`).join('')}
    </tbody></table>
  </section>
  <section class="card">
    <h2>Notes on method</h2>
    <ol class="notes">${METHOD_NOTES.map((n) => `<li>${esc(n)}</li>`).join('')}</ol>
    <p class="note">Nusantara Data is an independent, original site. It is not affiliated with BPS, the World Bank, or any government body; it cites their published figures and names them as sources.</p>
  </section>`;
}

export const ROUTES = {
  '': viewHome,
  population: viewPopulation,
  economy: viewEconomy,
  jobs: viewJobs,
  prices: viewPrices,
  people: viewPeople,
  provinces: viewProvinces,
  sources: viewSources,
};

export const NAV = [
  { path: '', label: 'Home' },
  { path: 'population', label: 'Population' },
  { path: 'economy', label: 'Economy' },
  { path: 'jobs', label: 'Work' },
  { path: 'prices', label: 'Prices' },
  { path: 'people', label: 'Health & Education' },
  { path: 'provinces', label: 'Provinces' },
  { path: 'sources', label: 'Sources' },
];
