import type { BlogCategory, SkateDisciplines, SkillLevel, EventType, PostStatus, socialMedia, EventStatus, Footwear, MonthOrder, } from '../data/skate-constants';
import { locationSchema } from './configBlocks/zod-blocks';
import {z} from 'zod';

export type EventLocation = z.infer<typeof locationSchema>;

// ------------ interfaces ... (shape)

// UTILITIES
export interface AstroImage {
  src: string;
  width: number;
  height: number;
  format: string;
}

export interface KeystaticImage {
  src: AstroImage | string; 
  alt: string;
  caption: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

// TODO - create a BusinessProfile interface once collections are up
export interface AuthorProfile {
  legalName: string;
  alias: string; 
  role: string;
  headshot?: KeystaticImage | null;
  skateImage?: KeystaticImage | null;
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
  coverImage?: KeystaticImage | null;
  authorName: string; 
  authorId: string;
  slug: string;
  
}

// event data

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

  eventPoster?: KeystaticImage | null;
  flyerImage1?: KeystaticImage | null;
  flyerImage2?: KeystaticImage | null;
  flyerImage3?: KeystaticImage | null;
  flyerImage4?: KeystaticImage | null;
  flyerImage5?: KeystaticImage | null;

  startTime?: TimeObject;
  endTime?: TimeObject;
  eventLink?: string;
  ticketLink?: {
    name: string;
    directLink?: string | null;
    disclaimer?: string;
  }[];

  // People
  organisers?: PersonObject[];
  hosts?: PersonObject[];
  coaches?: PersonObject[];
  djs?: PersonObject[];

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
  eventPoster?: KeystaticImage | null;
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


