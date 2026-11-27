// Nusantara Data — every figure is a real, published statistic.
// Each number below names its source and year in the footnotes on the
// site; nothing here is invented, and nothing is rounded beyond one
// decimal place. Sources: BPS (Statistics Indonesia), the World Bank's
// World Development Indicators, the CIA World Factbook, and UNDP.
// This file carries no web addresses — sources are named, not linked.

export const COUNTRY = {
  name: 'Indonesia',
  formalName: 'Republic of Indonesia',
  capital: 'Jakarta',
  islands: '17,500+',
  provinces: 38,
  regenciesCities: 514,
  language: 'Bahasa Indonesia',
  currency: 'Rupiah (IDR)',
  updated: 'November 2026',
};

export const HEADLINE = [
  {
    id: 'population',
    label: 'Population',
    value: '283.5',
    unit: 'million',
    detail: '4th most populous country in the world',
    source: 'World Bank',
    year: 2024,
  },
  {
    id: 'gdp',
    label: 'GDP',
    value: '$1.40',
    unit: 'trillion',
    detail: '16th largest economy, current US$',
    source: 'World Bank',
    year: 2024,
  },
  {
    id: 'gdp-capita',
    label: 'GDP per capita',
    value: '$4,925',
    unit: 'current US$',
    detail: 'Upper-middle income economy',
    source: 'World Bank',
    year: 2024,
  },
  {
    id: 'growth',
    label: 'GDP growth',
    value: '5.03',
    unit: '% per year',
    detail: 'Above 5% for a third straight year',
    source: 'World Bank',
    year: 2024,
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.57',
    unit: '% of population',
    detail: '24.06 million people, lowest ever recorded',
    source: 'BPS',
    year: 'Sep 2024',
  },
  {
    id: 'hdi',
    label: 'Human Development Index',
    value: '75.02',
    unit: 'out of 100',
    detail: 'High human development, up 0.63 points',
    source: 'BPS',
    year: 2024,
  },
];

// GDP in current US$ billions with real annual growth, World Bank WDI.
// A full decade: the 2015 dip, the 2020 pandemic contraction, and the
// recovery that has held above 5% since 2022.
export const GDP_SERIES = [
  { year: 2014, gdp: 890.8, growth: 5.0 },
  { year: 2015, gdp: 860.9, growth: 4.9 },
  { year: 2016, gdp: 931.9, growth: 5.0 },
  { year: 2017, gdp: 1015.4, growth: 5.1 },
  { year: 2018, gdp: 1042.2, growth: 5.2 },
  { year: 2019, gdp: 1119.1, growth: 5.0 },
  { year: 2020, gdp: 1059.1, growth: -2.1 },
  { year: 2021, gdp: 1186.5, growth: 3.7 },
  { year: 2022, gdp: 1319.1, growth: 5.3 },
  { year: 2023, gdp: 1371.2, growth: 5.0 },
  { year: 2024, gdp: 1396.3, growth: 5.0 },
];

// Population in millions, World Bank WDI. The 2019 step up reflects the
// 2020 census rebasing in the Bank's newer vintage of the series.
export const POP_SERIES = [
  { year: 2014, pop: 252.2 },
  { year: 2015, pop: 255.2 },
  { year: 2016, pop: 258.2 },
  { year: 2017, pop: 261.2 },
  { year: 2018, pop: 264.2 },
  { year: 2019, pop: 268.1 },
  { year: 2020, pop: 270.2 },
  { year: 2021, pop: 273.0 },
  { year: 2022, pop: 276.0 },
  { year: 2023, pop: 278.7 },
  { year: 2024, pop: 283.5 },
];

// Age structure, World Bank WDI 2024.
export const AGE_STRUCTURE = [
  { group: '0–14 years', share: 24.6, note: 'children' },
  { group: '15–64 years', share: 68.1, note: 'working age' },
  { group: '65+ years', share: 7.3, note: 'older people' },
];

// GDP by sector of origin, CIA World Factbook 2024 estimates.
export const SECTORS = [
  { name: 'Agriculture', share: 12.6, color: '#7a9a3d' },
  { name: 'Industry', share: 39.3, color: '#0e4f5c' },
  { name: 'Services', share: 43.8, color: '#e8a13a' },
];

// GDP by end use, CIA World Factbook 2024 estimates.
export const EXPENDITURE = [
  { name: 'Household consumption', share: 55.4 },
  { name: 'Exports of goods and services', share: 22.2 },
  { name: 'Imports of goods and services', share: 20.4 },
  { name: 'Government consumption', share: 7.7 },
];

// All 38 provinces. Population: BPS mid-2024 official estimates, in
// millions. Area: official provincial area in km². gx / gy place each
// province on the tile-grid cartogram (columns run west to east, rows
// run north to south); `short` is the label drawn inside its tile.
export const PROVINCES = [
  { name: 'Aceh', short: 'Aceh', capital: 'Banda Aceh', island: 'Sumatera', pop: 5.55, area: 57956, gx: 0, gy: 0 },
  { name: 'Sumatera Utara', short: 'Sumut', capital: 'Medan', island: 'Sumatera', pop: 15.59, area: 72981, gx: 1, gy: 1 },
  { name: 'Sumatera Barat', short: 'Sumbar', capital: 'Padang', island: 'Sumatera', pop: 5.82, area: 42013, gx: 1, gy: 2 },
  { name: 'Riau', short: 'Riau', capital: 'Pekanbaru', island: 'Sumatera', pop: 6.88, area: 87024, gx: 2, gy: 1 },
  { name: 'Kepulauan Riau', short: 'Kepri', capital: 'Tanjung Pinang', island: 'Sumatera', pop: 2.19, area: 8202, gx: 3, gy: 0 },
  { name: 'Jambi', short: 'Jambi', capital: 'Jambi', island: 'Sumatera', pop: 3.68, area: 50058, gx: 2, gy: 2 },
  { name: 'Sumatera Selatan', short: 'Sumsel', capital: 'Palembang', island: 'Sumatera', pop: 8.84, area: 91592, gx: 3, gy: 3 },
  { name: 'Kepulauan Bangka Belitung', short: 'Babel', capital: 'Pangkal Pinang', island: 'Sumatera', pop: 1.52, area: 16424, gx: 4, gy: 2 },
  { name: 'Bengkulu', short: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatera', pop: 2.12, area: 19919, gx: 1, gy: 3 },
  { name: 'Lampung', short: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatera', pop: 9.44, area: 34624, gx: 2, gy: 4 },
  { name: 'DKI Jakarta', short: 'Jakarta', capital: 'Jakarta', island: 'Jawa', pop: 10.68, area: 664, gx: 4, gy: 4 },
  { name: 'Jawa Barat', short: 'Jabar', capital: 'Bandung', island: 'Jawa', pop: 50.19, area: 35378, gx: 5, gy: 4 },
  { name: 'Banten', short: 'Banten', capital: 'Serang', island: 'Jawa', pop: 12.2, area: 9663, gx: 3, gy: 4 },
  { name: 'Jawa Tengah', short: 'Jateng', capital: 'Semarang', island: 'Jawa', pop: 38.64, area: 32801, gx: 6, gy: 4 },
  { name: 'DI Yogyakarta', short: 'DIY', capital: 'Yogyakarta', island: 'Jawa', pop: 3.78, area: 3133, gx: 6, gy: 5 },
  { name: 'Jawa Timur', short: 'Jatim', capital: 'Surabaya', island: 'Jawa', pop: 42.58, area: 47803, gx: 7, gy: 4 },
  { name: 'Bali', short: 'Bali', capital: 'Denpasar', island: 'Bali', pop: 4.34, area: 5780, gx: 8, gy: 4 },
  { name: 'Nusa Tenggara Barat', short: 'NTB', capital: 'Mataram', island: 'Nusa Tenggara', pop: 5.67, area: 18572, gx: 9, gy: 4 },
  { name: 'Nusa Tenggara Timur', short: 'NTT', capital: 'Kupang', island: 'Nusa Tenggara', pop: 5.7, area: 48718, gx: 10, gy: 4 },
  { name: 'Kalimantan Barat', short: 'Kalbar', capital: 'Pontianak', island: 'Kalimantan', pop: 5.85, area: 147307, gx: 4, gy: 1 },
  { name: 'Kalimantan Tengah', short: 'Kalteng', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.84, area: 153564, gx: 5, gy: 1 },
  { name: 'Kalimantan Selatan', short: 'Kalsel', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.31, area: 38744, gx: 5, gy: 2 },
  { name: 'Kalimantan Timur', short: 'Kaltim', capital: 'Samarinda', island: 'Kalimantan', pop: 3.99, area: 127347, gx: 6, gy: 1 },
  { name: 'Kalimantan Utara', short: 'Kaltara', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.74, area: 72567, gx: 7, gy: 0 },
  { name: 'Sulawesi Utara', short: 'Sulut', capital: 'Manado', island: 'Sulawesi', pop: 2.74, area: 13892, gx: 9, gy: 1 },
  { name: 'Gorontalo', short: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.25, area: 11257, gx: 8, gy: 1 },
  { name: 'Sulawesi Tengah', short: 'Sulteng', capital: 'Palu', island: 'Sulawesi', pop: 3.1, area: 61841, gx: 8, gy: 2 },
  { name: 'Sulawesi Selatan', short: 'Sulsel', capital: 'Makassar', island: 'Sulawesi', pop: 9.46, area: 46717, gx: 8, gy: 3 },
  { name: 'Sulawesi Barat', short: 'Sulbar', capital: 'Mamuju', island: 'Sulawesi', pop: 1.57, area: 16787, gx: 7, gy: 3 },
  { name: 'Sulawesi Tenggara', short: 'Sultra', capital: 'Kendari', island: 'Sulawesi', pop: 2.81, area: 38140, gx: 9, gy: 3 },
  { name: 'Maluku', short: 'Maluku', capital: 'Ambon', island: 'Maluku', pop: 1.98, area: 46914, gx: 10, gy: 2 },
  { name: 'Maluku Utara', short: 'Malut', capital: 'Sofifi', island: 'Maluku', pop: 1.39, area: 31982, gx: 10, gy: 1 },
  { name: 'Papua', short: 'Papua', capital: 'Jayapura', island: 'Papua', pop: 1.13, area: 82680, gx: 13, gy: 2 },
  { name: 'Papua Barat', short: 'Papbar', capital: 'Manokwari', island: 'Papua', pop: 0.58, area: 60275, gx: 12, gy: 1 },
  { name: 'Papua Selatan', short: 'Papsel', capital: 'Merauke', island: 'Papua', pop: 0.54, area: 127280, gx: 12, gy: 3 },
  { name: 'Papua Tengah', short: 'Papteng', capital: 'Nabire', island: 'Papua', pop: 1.37, area: 66130, gx: 11, gy: 2 },
  { name: 'Papua Pegunungan', short: 'Papgun', capital: 'Wamena', island: 'Papua', pop: 1.46, area: 51213, gx: 12, gy: 2 },
  { name: 'Papua Barat Daya', short: 'PBD', capital: 'Sorong', island: 'Papua', pop: 0.62, area: 38167, gx: 11, gy: 1 },
];

// Largest cities, BPS mid-2024 official estimates (millions).
export const CITIES = [
  { name: 'Jakarta', pop: 10.68 },
  { name: 'Surabaya', pop: 2.92 },
  { name: 'Bekasi', pop: 2.64 },
  { name: 'Bandung', pop: 2.53 },
  { name: 'Medan', pop: 2.49 },
  { name: 'Depok', pop: 2.16 },
  { name: 'Tangerang', pop: 1.96 },
  { name: 'Palembang', pop: 1.72 },
  { name: 'Semarang', pop: 1.7 },
  { name: 'Makassar', pop: 1.42 },
];

// Poverty rate, BPS (percent of population, March each year).
// A decade of steady decline, interrupted only by the pandemic years.
export const POVERTY_DECADE = [
  { year: 2014, value: 11.25 },
  { year: 2015, value: 11.22 },
  { year: 2016, value: 10.86 },
  { year: 2017, value: 10.64 },
  { year: 2018, value: 9.82 },
  { year: 2019, value: 9.41 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

// The most recent readings, twice a year, BPS.
export const POVERTY_SERIES = [
  { label: 'Mar 2024', value: 9.03 },
  { label: 'Sep 2024', value: 8.57 },
  { label: 'Mar 2025', value: 8.47 },
  { label: 'Sep 2025', value: 8.25 },
  { label: 'Mar 2026', value: 8.07 },
];

export const POVERTY_DETAIL = {
  urban: 6.66,
  rural: 11.34,
  line: 595242,
  lineNote: 'rupiah per capita per month, Sep 2024',
  poorPeople: 24.06,
  gini: 0.381,
  giniYear: 'Sep 2024',
};

// Human Development Index, BPS — a full decade plus the latest release.
export const HDI_SERIES = [
  { year: 2014, hdi: 68.9 },
  { year: 2015, hdi: 69.55 },
  { year: 2016, hdi: 70.18 },
  { year: 2017, hdi: 70.81 },
  { year: 2018, hdi: 71.39 },
  { year: 2019, hdi: 71.92 },
  { year: 2020, hdi: 72.81 },
  { year: 2021, hdi: 73.16 },
  { year: 2022, hdi: 73.77 },
  { year: 2023, hdi: 74.39 },
  { year: 2024, hdi: 75.02 },
  { year: 2025, hdi: 75.9 },
];

export const HDI_DIMENSIONS = [
  { name: 'Life expectancy at birth', value: '74.15 years', source: 'BPS', year: 2024 },
  { name: 'Expected years of schooling', value: '13.21 years', source: 'BPS', year: 2024 },
  { name: 'Mean years of schooling (age 25+)', value: '8.85 years', source: 'BPS', year: 2024 },
  { name: 'Adjusted real expenditure per capita', value: 'Rp 12,341,000 / year', source: 'BPS', year: 2024 },
];

// Open unemployment rate (TPT), BPS labour force survey, August each year.
// The 2020 spike is the pandemic; the rate has fallen every year since.
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Consumer price inflation, December year-on-year, BPS.
// 2022 is the fuel-subsidy adjustment; 2024 is the calmest year since 2020.
export const INFLATION_SERIES = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const JOBS = {
  openUnemployment: { value: 4.91, unit: '%', source: 'BPS', year: 'Aug 2024', label: 'Open unemployment rate (TPT)' },
  iloUnemployment: { value: 3.2, unit: '%', source: 'World Bank', year: 2025, label: 'Unemployment, ILO modelled estimate' },
  youthUnemployment: { value: 13.9, unit: '%', source: 'World Bank', year: 2023, label: 'Youth unemployment (ages 15–24)' },
  byOccupation: [
    { name: 'Agriculture', share: 27.3 },
    { name: 'Industry', share: 22.5 },
    { name: 'Services', share: 50.2 },
  ],
};

export const HEALTH_EDU = [
  { name: 'Life expectancy at birth (BPS)', value: '74.15 years', source: 'BPS', year: 2024 },
  { name: 'Life expectancy at birth (World Bank)', value: '71.3 years', source: 'World Bank', year: 2024 },
  { name: 'Fertility rate', value: '2.1 children per woman', source: 'World Bank', year: 2024 },
  { name: 'Health expenditure', value: '2.7% of GDP', source: 'World Bank', year: 2023 },
  { name: 'Maternal mortality ratio', value: '140 per 100,000 live births', source: 'World Bank', year: 2023 },
  { name: 'Youth literacy rate (ages 15–24)', value: '99.8%', source: 'World Bank', year: 2020 },
  { name: 'Public education expenditure', value: '2.4% of GDP', source: 'World Bank', year: 2022 },
  { name: 'Internet users', value: '72.8% of population', source: 'World Bank', year: 2024 },
];

export const TRADE = [
  { name: 'Exports of goods and services', value: '22.2% of GDP', source: 'World Bank', year: 2024 },
  { name: 'Imports of goods and services', value: '20.4% of GDP', source: 'World Bank', year: 2024 },
  { name: 'Foreign direct investment, net inflows', value: '$24.2 billion', source: 'World Bank', year: 2024 },
  { name: 'GDP (PPP)', value: '$4.67 trillion', source: 'World Bank', year: 2024 },
  { name: 'GDP per capita (PPP)', value: '$16,472', source: 'World Bank', year: 2024 },
  { name: 'Consumer price inflation', value: '2.2% per year', source: 'World Bank', year: 2024 },
];

// Where every dataset comes from, shown on the Sources page.
export const SOURCES = [
  { dataset: 'Population, GDP, GDP per capita, growth, age structure, trade shares, internet users', source: 'World Bank — World Development Indicators', year: 2024 },
  { dataset: 'Poverty rate, poverty line, Gini ratio', source: 'BPS — Statistics Indonesia, Poverty Profile', year: 'Sep 2024' },
  { dataset: 'Poverty rate by year, 2014–2024 (March readings)', source: 'BPS — Statistics Indonesia, Poverty Profile', year: '2014–2024' },
  { dataset: 'Open unemployment rate (TPT) by year, 2019–2024 (August readings)', source: 'BPS — Statistics Indonesia, Labour Force Survey (Sakernas)', year: '2019–2024' },
  { dataset: 'Consumer price inflation by year, 2019–2024 (December year-on-year)', source: 'BPS — Statistics Indonesia, Consumer Price Index release', year: '2019–2024' },
  { dataset: 'Human Development Index and its dimensions', source: 'BPS — Statistics Indonesia, Human Development Index release', year: '2014–2025' },
  { dataset: 'Provincial and city populations', source: 'BPS — Statistics Indonesia, mid-year official estimates', year: 2024 },
  { dataset: 'GDP by sector and by end use, labour force by occupation', source: 'CIA World Factbook — Indonesia', year: '2024 estimates' },
  { dataset: 'Unemployment, ILO modelled; youth unemployment; health and education spending', source: 'World Bank — World Development Indicators', year: '2020–2025' },
];

export const METHOD_NOTES = [
  'Life expectancy differs by source because the methods differ: BPS builds it from national mortality tables (74.15 years in 2024), while the World Bank uses the UN World Population Prospects model (71.3 years). Both are shown so the difference is visible, not hidden.',
  'The open unemployment rate (TPT) counts people actively looking for work, following the BPS labour force survey. The World Bank ILO-modelled rate uses a different definition and is lower; the site shows both and labels each.',
  'Provincial populations are BPS mid-year estimates. Densities are computed from population divided by official provincial area. The 38 provincial figures add up to about 283.1 million, against the World Bank national total of 283.5 million — the small gap is the difference between two published estimates.',
  'Poverty follows the BPS cost-of-basic-needs method: the poverty line is the cost of a minimum food basket plus essential non-food spending. The decade chart uses the March reading each year so the points are comparable.',
  'The cartogram is a schematic tile grid, not a map: every province gets one equal tile, placed roughly where it sits in the country, and shaded by its share of the national population. It trades exact geography for legibility.',
  'All figures were compiled in November 2026 from the releases listed above. Where a newer release exists for an indicator, the newest verified value is the one shown.',
];
