import { CANADA_PROVINCE_OPTIONS, UK_NATION_OPTIONS, US_STATE_OPTIONS, AUS_REGION_OPTIONS, ALL_CONTINENT_VALUES, ALL_COUNTRY_VALUES, ALL_REGION_VALUES } from './data/globe-constants';

// literal types ... (alias)
  export type ContinentValue = (typeof ALL_CONTINENT_VALUES)[number];
  export type CountryValue = (typeof ALL_COUNTRY_VALUES)[number];
  export type RegionValue = (typeof ALL_REGION_VALUES)[number];

  export type UKNation = (typeof UK_NATION_OPTIONS)[number]['value'];
  export type USState = (typeof US_STATE_OPTIONS)[number]['value']; 
  export type CanadaProvince = (typeof CANADA_PROVINCE_OPTIONS)[number]['value'];
  export type AustraliaRegion = (typeof AUS_REGION_OPTIONS)[number]['value'];
// ...

export type EventLocation =
  | { discriminant: 'united-kingdom'; value: UKNation }
  | { discriminant: 'united-states-of-america'; value: USState }
  | { discriminant: 'canada'; value: CanadaProvince }
  | { discriminant: 'australia'; value: AustraliaRegion }
  | { discriminant: string; value: null | undefined }; // Fallback


// ------------ interfaces ... (shape)

// UTILITIES

export interface SearchableSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

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
  continent: string;
  location: EventLocation; // Our nested discriminated union
  townCity: string;
  startDate: string | Date;
  offSkates: boolean;
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

  // This represents the "Cleaned" data sent to React
  export interface SerializedEvent {
    id: string;
    slug: string;
    data: EventCardData; // Nesting the interface we defined above
  }

