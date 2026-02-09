import { CANADA_PROVINCE_OPTIONS, UK_NATION_OPTIONS, US_STATE_OPTIONS, AUS_REGION_OPTIONS, ALL_CONTINENT_VALUES, ALL_COUNTRY_VALUES, ALL_REGION_VALUES } from '../data/globe-constants';
import { locationSchema } from './configBlocks/zod-blocks';
import {z} from 'zod';

// literal types ... (alias)
  export type ContinentValue = (typeof ALL_CONTINENT_VALUES)[number];
  export type CountryValue = (typeof ALL_COUNTRY_VALUES)[number];
  export type RegionValue = (typeof ALL_REGION_VALUES)[number];

  export type UKNation = (typeof UK_NATION_OPTIONS)[number]['value'];
  export type USState = (typeof US_STATE_OPTIONS)[number]['value']; 
  export type CanadaProvince = (typeof CANADA_PROVINCE_OPTIONS)[number]['value'];
  export type AustraliaRegion = (typeof AUS_REGION_OPTIONS)[number]['value'];
  // ...
  export type EventLocation = z.infer<typeof locationSchema>;

// ------------ interfaces ... (shape)

// UTILITIES



export interface AstroImage {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface SelectOption {
  label: string;
  value: string;
}


// SPECIFICS
export interface EventCardData {
  eventName: string;
  location: EventLocation;
  townCity: string;
  startDate: string | Date;
  footwear: string;
  eventType: string;
  skateDiscipline?: string;
  minAge?: string; 
  skillLevel?: string;
  description?: string;
  eventPoster?: string;
  endDate: string | null;
  rink?: string;
  isFeatured?: Boolean;
  eventStatus?: string;
}

export interface BlogCardData {
  title: string;
  subtitle?: string;
  description: string;
  published: string;
  blogCategory: string;
  skateDiscipline?: string;
  coverImage?: string;
  
}

// This represents the "Cleaned" data sent to React
export interface SerializedEvent {
  id: string;
  slug: string;
  data: EventCardData; 
}

export interface SerializedBlog {
  id: string;
  slug: string;
  data: BlogCardData; 
}


