// Router and control wiring. The site is one page with hash routes:
// #/ #/population #/economy #/jobs #/prices #/people #/provinces
// #/compare #/sources. State lives here and is passed to the view
// functions; every control re-renders through render() so the page
// always matches the state. State is also saved to localStorage, so a
// reload brings back the tab, sort, selection and comparison you had.
import { ROUTES, NAV } from './views.js';
import { GDP_SERIES, PROVINCES } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const STORE_KEY = 'nusantara-data-state-v2';

const defaults = {
  gdpMode: 'line',
  gdpYear: 2024,
  popTab: 'age',
  provQuery: '',
  provSort: 'pop',
  provDir: 'desc',
  provSel: null,
  cmpA: 'Jawa Barat',
  cmpB: 'Jawa Timur',
  cmpYearA: 2014,
  cmpYearB: 2024,
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (saved && typeof saved === 'object') return { ...defaults, ...saved };
  } catch (e) {
    // A corrupt saved state is not worth crashing over; start fresh.
  }
  return { ...defaults };
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    // Private mode or a full store: the site still works without saving.
  }
}

function route() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return ROUTES[hash] ? hash : '';
}

function render() {
  const r = route();
  const view = ROUTES[r];
  app.innerHTML = view(state);
  nav.querySelectorAll('a').forEach((a) => {
    const p = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('on', p === r);
    if (p === r) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = r === ''
    ? 'Nusantara Data — Indonesia in Numbers'
    : `${NAV.find((n) => n.path === r).label} — Nusantara Data`;
  window.scrollTo(0, 0);
  saveState();
}

// Build a CSV string from a header row and an array of value rows.
function toCsv(header, rows) {
  const cell = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return [header, ...rows].map((row) => row.map(cell).join(',')).join('\n');
}

function downloadCsv(name, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvFor(kind) {
  if (kind === 'economy') {
    return toCsv(
      ['Year', 'GDP (US$ billions)', 'Growth (%)'],
      GDP_SERIES.map((d) => [d.year, d.gdp, d.growth]),
    );
  }
  if (kind === 'provinces') {
    const total = PROVINCES.reduce((s, p) => s + p.pop, 0);
    return toCsv(
      ['Province', 'Capital', 'Island', 'Population (millions)', 'Area (km2)', 'Density (per km2)', 'Share of Indonesia (%)'],
      PROVINCES.map((p) => [
        p.name,
        p.capital,
        p.island,
        p.pop,
        p.area,
        Math.round((p.pop * 1e6) / p.area),
        ((p.pop / total) * 100).toFixed(1),
      ]),
    );
  }
  return '';
}

// One delegated listener for every click control in the app.
app.addEventListener('click', (ev) => {
  const tab = ev.target.closest('[data-tab]');
  if (tab) {
    state.popTab = tab.getAttribute('data-tab');
    render();
    return;
  }
  const mode = ev.target.closest('[data-mode]');
  if (mode) {
    state.gdpMode = mode.getAttribute('data-mode');
    render();
    return;
  }
  const year = ev.target.closest('[data-year]');
  if (year) {
    state.gdpYear = Number(year.getAttribute('data-year'));
    render();
    return;
  }
  const sort = ev.target.closest('[data-sort]');
  if (sort) {
    const key = sort.getAttribute('data-sort');
    if (state.provSort === key) {
      state.provDir = state.provDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.provSort = key;
      state.provDir = key === 'name' ? 'asc' : 'desc';
    }
    render();
    return;
  }
  const csv = ev.target.closest('[data-csv]');
  if (csv) {
    const kind = csv.getAttribute('data-csv');
    const text = csvFor(kind);
    if (text) downloadCsv(`nusantara-data-${kind}.csv`, text);
    return;
  }
  const row = ev.target.closest('[data-prov]');
  if (row) {
    const name = row.getAttribute('data-prov');
    state.provSel = state.provSel === name ? null : name;
    render();
  }
});

// Selects (compare pickers) fire change, not click.
app.addEventListener('change', (ev) => {
  const id = ev.target.id;
  if (id === 'cmp-a') state.cmpA = ev.target.value;
  else if (id === 'cmp-b') state.cmpB = ev.target.value;
  else if (id === 'cmp-year-a') state.cmpYearA = Number(ev.target.value);
  else if (id === 'cmp-year-b') state.cmpYearB = Number(ev.target.value);
  else return;
  render();
});

app.addEventListener('input', (ev) => {
  if (ev.target.id === 'prov-search') {
    state.provQuery = ev.target.value;
    // A full render is simpler and fast at this size; keep the caret
    // where it was by restoring focus and the selection afterwards.
    const pos = ev.target.selectionStart;
    render();
    const again = document.getElementById('prov-search');
    if (again) {
      again.focus();
      again.setSelectionRange(pos, pos);
    }
  }
});

window.addEventListener('hashchange', render);
render();
