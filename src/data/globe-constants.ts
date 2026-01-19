// flat data for zod/filter values 
import { RAW_US_STATES, RAW_CANADA_PROVINCE, RAW_UK_REGIONS, RAW_AUS_REGIONS } from './geo/regions';
import { RAW_EUROPE } from './geo/europe-countries';
import { RAW_AFRICA_COUNTRIES } from './geo/africa-countries';
import { RAW_ASIA_COUNTRIES } from './geo/asia-countries';
import { RAW_AUS_OCEANIA } from './geo/aus-oceania-countries';
import { RAW_NORTH_AMERICAS, RAW_SOUTH_AMERICAS } from './geo/americas-countries';

import {formatLocationLabel, slugify} from '../function/stringHelper';

const COUNTRIES_WITH_REGIONS = ["United Kingdom", "United States of America", "Canada", "Australia"];

// Level 3: Regions (Mapped from raw strings)
// option objects (nested) for REACT UI
export const US_STATE_OPTIONS = RAW_US_STATES
.map(name => ({
  label: name,
  value: `us-${slugify(name)}` 
}));

export const UK_NATION_OPTIONS = RAW_UK_REGIONS
.map(name => ({
  label: name,
  value: `uk-${slugify(name)}` 
}));

export const CANADA_PROVINCE_OPTIONS = RAW_CANADA_PROVINCE
.map(name => ({
  label: name,
  value: `can-${slugify(name)}` 
}));

export const AUS_REGION_OPTIONS = RAW_AUS_REGIONS
.map(name => ({
  label: name,
  value: `aus-${slugify(name)}` 
}));

const countryMapper = (name: string) => ({
  label: name,
  value: slugify(name),
  hasRegions: COUNTRIES_WITH_REGIONS.includes(name)
});

// Level 2: Countries (Grouped by Continent)
export const CONTINENT_DATA = [
  { continent: "Asia", countries: RAW_ASIA_COUNTRIES.map(countryMapper) },
  { continent: "Africa", countries: RAW_AFRICA_COUNTRIES.map(countryMapper) },
  { continent: "Europe", countries: RAW_EUROPE.map(countryMapper) },
  { continent: "North America", countries: RAW_NORTH_AMERICAS.map(countryMapper) },
  { continent: "South America", countries: RAW_SOUTH_AMERICAS.map(countryMapper) },
  { continent: "Oceania", countries: RAW_AUS_OCEANIA.map(countryMapper) },
] as const;

export const getRegionOptions = (countryValue: string) => {
  // Use the slugified version of your COUNTRIES_WITH_REGIONS
  switch (countryValue) {
    case 'united-states-of-america': return US_STATE_OPTIONS;
    case 'united-kingdom': return UK_NATION_OPTIONS;
    case 'canada': return CANADA_PROVINCE_OPTIONS;
    case 'australia': return AUS_REGION_OPTIONS;
    default: return [];
  }
};

// --- ZOD VALIDATION LISTS (FLAT) ---
// These are what you use in your Astro Schema
export const ALL_CONTINENT_VALUES = CONTINENT_DATA.map(c => c.continent) as [string, ...string[]];

export const ALL_COUNTRY_VALUES = CONTINENT_DATA.flatMap(c => 
  c.countries.map(country => country.value)
) as [string, ...string[]];

export const ALL_REGION_VALUES = [
  ...US_STATE_OPTIONS.map(o => o.value),
  ...UK_NATION_OPTIONS.map(o => o.value),
  ...CANADA_PROVINCE_OPTIONS.map(o => o.value),
  ...AUS_REGION_OPTIONS.map(o => o.value),
] as [string, ...string[]];

export const OTHER_COUNTRIES = ALL_COUNTRY_VALUES.filter(
  val => !['united-kingdom', 'united-states-of-america', 'canada', 'australia'].includes(val)
) as [string, ...string[]];

// Helper to extract values for Zod Schema
export const getValues = (constArray: readonly { value: string }[]) => 
  constArray.map(o => o.value) as [string, ...string[]];

export type ContinentValue = (typeof ALL_CONTINENT_VALUES)[number];
export type CountryValue = (typeof ALL_COUNTRY_VALUES)[number];
export type RegionValue = (typeof ALL_REGION_VALUES)[number];
