# Nusantara Data — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/maxwinX1000/national-stats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/maxwinX1000/national-stats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original national statistics site for Indonesia: population, economy, work, prices, health and education in one place. Every figure names its source and year (BPS — Statistics Indonesia, World Bank World Development Indicators, CIA World Factbook).

Round 2 adds: all 38 provinces (BPS mid-2024 estimates) with a tile-grid cartogram, decade series 2014–2024 for GDP, population, poverty and HDI, a Compare page (any two provinces, any two years), unemployment and inflation series, and CSV downloads of the economy and province tables.

The site is plain static files under `app/` — no build step, no network requests, works on desktop and on a phone. Charts are hand-drawn SVG built from the data in `app/data.js`; there is no charting library. State (tabs, sorts, selections, comparisons) is saved in localStorage so a reload picks up where you left off.

## Run it

Serve `app/` with any static server, for example:

```sh
python3 -m http.server 8080 --directory app
```

then open `http://localhost:8080`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `app/` and `screenshots/` to `out/` and writes `out/dossier.json` with the vendored make.fun library.

## Layout

- `app/index.html` — page shell: header, nav, mount point, footer
- `app/main.js` — hash router, control wiring, CSV downloads, localStorage state
- `app/views.js` — one render function per page, including Compare
- `app/charts.js` — hand-rolled SVG charts (line, bar, horizontal bar, donut, comparison bars, tile-grid cartogram)
- `app/data.js` — every figure, with source and year; all 38 provinces
- `app/style.css` — the design
- `screenshots/` — 3–4 renders of the site in a browser
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
