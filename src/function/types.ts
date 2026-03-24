import type { BlogCategory, SkateDisciplines, SkillLevel, EventType, PostStatus, socialMedia, EventStatus, Footwear, MonthOrder, } from '../data/skate-constants';
import { locationSchema } from './configBlocks/zod-blocks';
import {z} from 'zod';
import type { ImageMetadata } from 'astro';

export type EventLocation = z.infer<typeof locationSchema>;

// (Keystatic -> Zod -> Mapper -> Component) 

// ------------ interfaces ... (shape)

// UTILITIES
export interface SelectOption {
  label: string;
  value: string;
}

export interface KeystaticImage {
  src: ImageMetadata; 
  alt: string; 
  caption: string;
}


// TODO - create a BusinessProfile interface once collections are up
export interface AuthorProfile {
  legalName: string;
  alias: string; 
  role: string;
  headshot?: string;
  headshotAlt?: string;
  headshotCaption?: string;
  skateImage?: ImageMetadata;
  skateImageAlt?: string;
  skateImageCaption?: string;
  bio: string;
  socials: {
    platform: socialMedia;
    url: string;
  }[];
  isAnonymous?: boolean; // Keep for blog logic
}

export interface SerializedAuthor {
  id: string;
  data: AuthorProfile;
}

export interface BlogCardData {
  title: string;
  subtitle?: string;
  description: string;
  published: string;
  blogCategory: BlogCategory;
  skateDiscipline?: SkateDisciplines;
  coverImage?: ImageMetadata;
  coverImageAlt?: string;
  coverImageCaption?: string;
  isPlaceholder: boolean;
  authorName: string; 
  authorId: string;
  slug: string;
  
}

// event data //

export interface SocialLink {
  platform: string;
  url: string;
}

export interface MappedPerson {
  name: string;
  role: string;
  socials: SocialLink[]; 
  alt: string;
}

export interface PersonObject {
  name: string;
  socialLinks?: {
    platform: socialMedia;
    url: string;
  }[];
}

export interface TimeObject {
  hour: string;
  minute: string;
}

export interface EventData {
  // CMS admin items
  status: PostStatus;
  isFeatured: boolean;
  eventStatus?: EventStatus;

  // Main Info
  eventName: string;
  subheading?: string;
  description?: string;
  startDate: Date;
  endDate?: Date;

  // Filter options
  location: EventLocation;
  townCity: string;
  eventType: EventType;
  skateDiscipline: SkateDisciplines;
  skillLevel?: SkillLevel;
  minAge?: string;
  maxAge?: string;

  isPlaceholder: boolean;
  eventPoster?: ImageMetadata;
  eventPosterAlt?: string;
  eventPosterCaption?: string;
  flyerImage1?: ImageMetadata;
  flyerImage1Alt?: string;
  flyerImage1Caption?: string;
  flyerImage2?: ImageMetadata;
  flyerImage2Alt?: string;
  flyerImage2Caption?: string;
  flyerImage3?: ImageMetadata;
  flyerImage3Alt?: string;
  flyerImage3Caption?: string;
  flyerImage4?: ImageMetadata;
  flyerImage4Alt?: string;
  flyerImage4Caption?: string;
  flyerImage5?: ImageMetadata;
  flyerImage5Alt?: string;
  flyerImage5Caption?: string;

  showStartTime: boolean;
  startTime?: TimeObject;
  showEndTime: boolean;
  endTime?: TimeObject;
  eventLink?: string;
  ticketLink?: {
    name: string;
    directLink?: string | null;
    disclaimer?: string;
  }[];

  // People
  organisers?: PersonObject[];
  djs?: PersonObject[];
  coaches?: PersonObject[];
  hosts?: PersonObject[];
  partners?: PersonObject[];

  // Venue
  rink?: string;
  venueAddress?: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
  };

  footwear: Footwear; 
}

// SPECIFICS
export interface EventCardData {
  eventName: string;
  location: EventLocation;
  townCity: string;
  startDate: string;
  endDate: string | null;
  footwear: Footwear;
  eventType: EventType;
  skateDiscipline?: SkateDisciplines;
  minAge?: string; 
  skillLevel?: SkillLevel;
  description?: string;
  eventPoster?: ImageMetadata;
  eventPosterAlt?: string;
  eventPosterCaption?: string;
  isPlaceholder: boolean;
  rink?: string;
  isFeatured?: boolean;
  eventStatus?: EventStatus;
}

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


