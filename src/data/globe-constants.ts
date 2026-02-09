// 1. The Strategy: "The Three-Tier System"
// Your file structure correctly implements a three-tier data flow:

// Tier 1 (Raw Data): /data/geo/*.ts (e.g., americas-countries.ts). Pure string arrays.

// Tier 2 (The Transformer): globe-constants.ts. Maps raw strings into Slugs, Labels, and Options.

// Tier 3 (The Consumer): Your Zod schemas and Keystatic config consume these transformed lists.

// flat data for zod/filter values 
import { RAW_US_STATES, RAW_CANADA_PROVINCE, RAW_UK_REGIONS, RAW_AUS_REGIONS } from './geo/regions';
import { RAW_EUROPE } from './geo/europe-countries';
import { RAW_AFRICA_COUNTRIES } from './geo/africa-countries';
import { RAW_ASIA_COUNTRIES } from './geo/asia-countries';
import { RAW_AUS_OCEANIA } from './geo/aus-oceania-countries';
import { RAW_NORTH_AMERICAS, RAW_SOUTH_AMERICAS } from './geo/americas-countries';

import { slugify, formatLabel } from '../function/stringHelper';

const COUNTRIES_WITH_REGIONS = ["United Kingdom", "United States of America", "Canada", "Australia"];
 
// object / option builders KEYSTATIC&REACT
export const US_STATE_OPTIONS: SelectOption[] = RAW_US_STATES
.map(name => ({
  label: name,
  value: `us-${slugify(name)}` 
}));

export const UK_NATION_OPTIONS: SelectOption[] = RAW_UK_REGIONS
.map(name => ({
  label: name,
  value: `uk-${slugify(name)}` 
}));

export const CANADA_PROVINCE_OPTIONS: SelectOption[] = RAW_CANADA_PROVINCE
.map(name => ({
  label: name,
  value: `can-${slugify(name)}` 
}));

export const AUS_REGION_OPTIONS: SelectOption[] = RAW_AUS_REGIONS
.map(name => ({
  label: name,
  value: `aus-${slugify(name)}` 
}));

const countryMapper = (name: string): CountryOption => ({
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
];

// --- ZOD VALIDATION LISTS (FLAT) ---
export const ALL_CONTINENT_VALUES = CONTINENT_DATA.map(c => 
  slugify(c.continent)
) as unknown as [string, ...string[]];

export const ALL_COUNTRY_VALUES = CONTINENT_DATA.flatMap(c => 
  c.countries.map(country => country.value)
) as unknown as [string, ...string[]];

export const ALL_REGION_VALUES = [
  ...US_STATE_OPTIONS.map(o => o.value),
  ...UK_NATION_OPTIONS.map(o => o.value),
  ...CANADA_PROVINCE_OPTIONS.map(o => o.value),
  ...AUS_REGION_OPTIONS.map(o => o.value),
] as unknown as [string, ...string[]];

// helpers 
export const continentKeys = {
  asia: slugify("Asia"),
  africa: slugify("Africa"),
  europe: slugify("Europe"),
  northAmerica: slugify("North America"),
  southAmerica: slugify("South America"),
  oceania: slugify("Oceania"),
};

const COUNTRY_MAP: Record<string, string> = {
  'united-kingdom': 'UK',
  'united-states-of-america': 'USA',
  'canada': 'Canada',
  'australia': 'Australia',
  'united-arab-emirates': 'UAE',
  'congo-democratic-republic-of-the': 'DRC'
};

// DISPLAYS - label || LOGIC - slug
export function formatLocation(location: LocationData, townCity?: string) {
  if (!location) return { country: '', region: '', continent: '', full: townCity || '' };

  const hasRegion = !!location.value?.value && location.value.value !== 'none';
  const hasCountry = !!location.value?.discriminant && location.value.discriminant !== 'none';
  const continent = location.discriminant;
  const countrySlug = location.value?.discriminant || location.discriminant;
  const regionSlug = hasRegion ? location.value.value : undefined;

  const countryLabel = hasCountry
  ? (COUNTRY_MAP[countrySlug] || formatLabel(countrySlug!)) : '';
  const regionLabel = regionSlug ? formatLabel(regionSlug) : '';

  const parts = [townCity, regionLabel, countryLabel].filter(Boolean);

  return {
    continent,      // 'europe'
    countrySlug,    // 'united-kingdom'
    regionSlug,     // 'uk-england'
    countryLabel,   // 'UK'
    regionLabel,    // 'England'
    full: parts.join(', ') // 'London, England, UK'
  };
}

import type { LocationData } from "../function/configBlocks/zod-blocks";

export function hasRegionSelected(location: LocationData): location is LocationData & { value: { value: string } } {
  return (
    !!location.value?.value && 
    location.value.value !== 'none'
  );
}
export interface SelectOption {
  label: string;
  value: string;
}

export interface CountryOption extends SelectOption {
  hasRegions: boolean;
}

const REGION_LOOKUP: Record<string, SelectOption[]> = {
  'united-states-of-america': US_STATE_OPTIONS,
  'united-kingdom': UK_NATION_OPTIONS,
  'canada': CANADA_PROVINCE_OPTIONS,
  'australia': AUS_REGION_OPTIONS,
};

export const getRegionOptions = (countryValue: string): SelectOption[] => {
  return REGION_LOOKUP[countryValue] || [];
};


export const OTHER_COUNTRIES = ALL_COUNTRY_VALUES.filter(
  val => !['united-kingdom', 'united-states-of-america', 'canada', 'australia'].includes(val)
) as unknown as [string, ...string[]];

export const getValues = (constArray: readonly { value: string }[]) => 
  constArray.map(o => o.value) as unknown as [string, ...string[]];


export type ContinentValue = (typeof ALL_CONTINENT_VALUES)[number];
export type CountryValue = (typeof ALL_COUNTRY_VALUES)[number];
export type RegionValue = (typeof ALL_REGION_VALUES)[number];




