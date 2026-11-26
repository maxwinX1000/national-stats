# Nusantara Data — Indonesia in Numbers

An original national statistics site for Indonesia: population, economy, work, prices, health and education in one place. Every figure names its source and year (BPS — Statistics Indonesia, World Bank World Development Indicators, CIA World Factbook).

The site is plain static files under `app/` — no build step, no network requests, works on desktop and on a phone. Charts are hand-drawn SVG built from the data in `app/data.js`; there is no charting library.

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
- `app/main.js` — hash router and control wiring
- `app/views.js` — one render function per page
- `app/charts.js` — hand-rolled SVG charts (line, bar, horizontal bar, donut)
- `app/data.js` — every figure, with source and year
- `app/style.css` — the design
- `screenshots/` — 3–4 renders of the site in a browser
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
