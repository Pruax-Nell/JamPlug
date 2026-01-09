// src/types.ts

// This represents the "Cleaned" data sent to React
export interface SerializedEvent {
  id: string;
  slug: string;
  data: {
    eventName: string;
    country: string;
    townCity: string;
    category: string;
    eventType: string;
    skateDiscipline: string;
    minAge?: string; // Optional field
    skillLevel: string;
    description: string;
    eventPoster?: string;
    startDate: string; // ISO String for Serialization
    endDate: string | null;
  };
}

// You can also define your Constant types here
export type CountryCode = 'uk' | 'france' | 'germany' | 'spain'; // etc.