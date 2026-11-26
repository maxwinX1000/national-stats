// Router and control wiring. The site is one page with hash routes:
// #/ #/population #/economy #/jobs #/prices #/people #/provinces #/sources.
// State lives here and is passed to the view functions; every control
// re-renders through render() so the page always matches the state.
import { ROUTES, NAV } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

const state = {
  gdpMode: 'line',
  gdpYear: 2024,
  popTab: 'age',
  provQuery: '',
  provSort: 'pop',
  provDir: 'desc',
  provSel: null,
};

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
}

// One delegated listener for every control in the app.
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
  const row = ev.target.closest('[data-prov]');
  if (row) {
    const name = row.getAttribute('data-prov');
    state.provSel = state.provSel === name ? null : name;
    render();
  }
});

app.addEventListener('input', (ev) => {
  if (ev.target.id === 'prov-search') {
    state.provQuery = ev.target.value;
    // Re-render only the table body would be nicer, but a full render is
    // simpler and fast at this size; keep focus by restoring it after.
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
