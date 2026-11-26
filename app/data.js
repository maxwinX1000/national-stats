// All figures are real, published statistics. Every number carries its source
// and year in the site's footnotes; no figure here is invented or rounded
// beyond one decimal. Sources used: BPS (Statistics Indonesia), World Bank
// World Development Indicators, CIA World Factbook, UNDP. Figures are cited
// by source name and year only — this file contains no web addresses.

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

// GDP in current US$ billions and real growth, World Bank WDI.
export const GDP_SERIES = [
  { year: 2019, gdp: 1119.1, growth: 5.0 },
  { year: 2020, gdp: 1059.1, growth: -2.1 },
  { year: 2021, gdp: 1186.5, growth: 3.7 },
  { year: 2022, gdp: 1319.1, growth: 5.3 },
  { year: 2023, gdp: 1371.2, growth: 5.0 },
  { year: 2024, gdp: 1396.3, growth: 5.0 },
];

// Population in millions, World Bank WDI / BPS.
export const POP_SERIES = [
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

// Ten largest provinces. Population: BPS mid-2024 estimates (millions).
// Area: official provincial area in km². Density and share are computed.
export const PROVINCES = [
  { name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', pop: 50.19, area: 35378 },
  { name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', pop: 42.58, area: 47803 },
  { name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', pop: 38.64, area: 32801 },
  { name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatera', pop: 15.59, area: 72981 },
  { name: 'Banten', capital: 'Serang', island: 'Jawa', pop: 12.2, area: 9663 },
  { name: 'DKI Jakarta', capital: 'Jakarta', island: 'Jawa', pop: 10.68, area: 664 },
  { name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', pop: 9.46, area: 46717 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatera', pop: 9.44, area: 34624 },
  { name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatera', pop: 8.84, area: 91592 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatera', pop: 6.88, area: 87024 },
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

// Poverty rate, BPS (percent of population).
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

// Human Development Index, BPS.
export const HDI_SERIES = [
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
  { dataset: 'Open unemployment rate (TPT)', source: 'BPS — Statistics Indonesia, Labour Force Survey (Sakernas)', year: 'Aug 2024' },
  { dataset: 'Human Development Index and its dimensions', source: 'BPS — Statistics Indonesia, Human Development Index release', year: '2024–2025' },
  { dataset: 'Provincial and city populations', source: 'BPS — Statistics Indonesia, mid-year official estimates', year: 2024 },
  { dataset: 'GDP by sector and by end use, labour force by occupation', source: 'CIA World Factbook — Indonesia', year: '2024 estimates' },
  { dataset: 'Unemployment, ILO modelled; youth unemployment; health and education spending', source: 'World Bank — World Development Indicators', year: '2020–2025' },
];

export const METHOD_NOTES = [
  'Life expectancy differs by source because the methods differ: BPS builds it from national mortality tables (74.15 years in 2024), while the World Bank uses the UN World Population Prospects model (71.3 years). Both are shown so the difference is visible, not hidden.',
  'The open unemployment rate (TPT) counts people actively looking for work, following the BPS labour force survey. The World Bank ILO-modelled rate uses a different definition and is lower; the site shows both and labels each.',
  'Provincial populations are BPS mid-year estimates. Densities are computed from population divided by official provincial area.',
  'Poverty follows the BPS cost-of-basic-needs method: the poverty line is the cost of a minimum food basket plus essential non-food spending.',
  'All figures were compiled in November 2026 from the releases listed above. Where a newer release exists for an indicator, the newest verified value is the one shown.',
];
