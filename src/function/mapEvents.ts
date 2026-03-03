import type { CollectionEntry } from 'astro:content';

import { formatLocation } from "../data/globe-constants";
import { formatFestivalDate, formatEventDate, formatDate, formatTime } from "./dateHelper";
import { getImageSource } from '../function/sourceHelper';
import type { KeystaticImage } from './types';

import EventPlaceholder from '../assets/placeholder/placeholder-eventPoster.jpg'

// FULL event props
export const mapEventFull = (event: CollectionEntry<'events'>) => {
    const location = formatLocation(event.data.location, event.data.townCity);
    const dates = formatEventDate(event.data.startDate, event.data.endDate);
    const startTime = formatTime(event.data.startTime);
    const endTime = formatTime(event.data.endTime);
    const mapCoordinates = event.data.mapCoordinates?.longitude && event.data.mapCoordinates.latitude;
    const galleryImages = [
        event.data.flyerImage1,
        event.data.flyerImage2,
        event.data.flyerImage3,
        event.data.flyerImage4,
        event.data.flyerImage5,
    ]
    .filter((img): img is KeystaticImage => !!img && !!img.src)
    .map(img => ({
        src: img.src, 
        alt: img.alt || `Gallery image for ${event.data.eventName}`,
        caption: img.caption || `${event.data.eventName} poster Image`,
    }));

    return{

        // CMS admin items 
        id: event.id,
        url: `/events/${event.id}`,
        status: event.data.status,
        // Main Info
        title: event.data.eventName,
        subtitle: event.data.subheading,
        description: event.data.description,
        eventStatus: event.data.eventStatus,
        featured: event.data.isFeatured,
        // filter options --
        locationLabel: location.full, // "London, England, UK"
        continent: location.continent,
        country: location.country,
        townCity: event.data.townCity,
       
        dateLabel: dates,
        startDate: event.data.startDate,
        endDate: event.data.endDate,
        startTime: startTime,
        endTime: endTime,
        
        eventType: event.data.eventType,
        skateDiscipline: event.data.skateDiscipline,
        skillLevel: event.data.skillLevel,
        minAge: event.data.minAge,
        maxAge: event.data.maxAge,
        footwear: event.data.footwear,

        // Bonus info
        rink: event.data.rink,
        venueAddress: event.data.venueAddress,
        mapCoordinates: mapCoordinates,
        
        eventLink: event.data.eventLink,
        tickets: (event.data.ticketLink || []).map(link => ({
            platform: link?.platform,
            url: link?.directLink || '#', 
            disclaimer: link?.disclaimer || "Your Jam Plug is not responsible for external site content",
        })),

        // people
        organisers: (event.data.organisers || []).map(p => mapPerson(p, 'Organiser')).filter(Boolean),
        hosts: (event.data.hosts || []).map(p => mapPerson(p, 'Host')).filter(Boolean),
        coaches: (event.data.coaches || []).map(p => mapPerson(p, 'Coach')).filter(Boolean),
        djs: (event.data.djs || []).map(p => mapPerson(p, 'DJ')).filter(Boolean),

        // Poster Gallery
        poster: {
            src: getImageSource(event.data.eventPoster, EventPlaceholder),
            isPlaceholder: !event.data.eventPoster?.src,
            alt: event.data.eventPoster?.alt || event.data.eventName,
            caption: event.data.eventPoster?.caption || '@YourJamPlug'
        },
        gallery: galleryImages,

    }
};

// Check if the src specifically exists
//  poster: {

// src: event.data.eventPoster?.src ? event.data.eventPoster.src : EventPlaceholder,

// alt: event.data.eventPoster?.alt || event.data.eventName,

// caption: event.data.eventPoster?.caption || '@YourJamPlug'

// },

// small cards | carosel use 
export const mapEventToCard = (event: CollectionEntry<'events'>) => {
    const location = formatLocation(event.data.location, event.data.townCity);
    const dates = formatEventDate(event.data.startDate, event.data.endDate);

    return{
        variant: "event" as const,

        id: event.id,
        url: `/events/${event.id}`,
        status: event.data.status,
        title: event.data.eventName,
        subtitle: event.data.subheading,
        description: event.data.description,
        poster: {
            src: getImageSource(event.data.eventPoster, EventPlaceholder),
            isPlaceholder: !event.data.eventPoster?.src,
            alt: event.data.eventPoster?.alt || event.data.eventName,
            caption: event.data.eventPoster?.caption || '@YourJamPlug' ,
        },
        locationLabel: location.full, // "London, England, UK"
        eventType: event.data.eventType,
        featured: event.data.isFeatured,
        dateLabel: dates,
        startDate: event.data.startDate,
        endDate: event.data.endDate
    }
};

export const mapToFeaturedCard = (event: any) => {
    const location = formatLocation(event.data.location, event.data.townCity);
    const dates = formatEventDate(event.data.startDate, event.data.endDate);

    return {
        variant: "event" as const,

        id: event.id,
        url: `/events/${event.id}/`,
        title: event.data.eventName,
        subtitle: event.data.subheading,
        locationLabel: location.full, // "London, England, UK"
        dateLabel: dates,
        description: event.data.description,
        poster: {
          src: getImageSource(event.data.eventPoster, EventPlaceholder),
          alt: event.data.eventPoster.alt,
          caption: event.data.eventPoster?.caption || '',
          isPlaceholder: !event.data.eventPoster?.src,
        },
        eventType: event.data.eventType,
        startOrder: event.data.startDate,
    };
};


const person = (person: any, role: string) => {
  if (!person || !person.name) return null;

  return {
    name: person.name,
    role: role,
    socials: (person.socialLinks || []).map((link: any) => ({
      platform: link.platform,
      url: link.url || '#'
    })).filter((link: any) => link.url !== '#'), 
    
    primaryUrl: person.socialLinks?.[0]?.url || '#',
    
    photo: {
        src: person.photo || null,
        // getImageSource()
        alt: person.name,
    }
  };
};

const mapPerson = (person: any, role: string): MappedPerson => {
  return {
    name: person.name || "TBA",
    role: role,
    socials: (person.socialLinks || []).map((link: any): SocialLink => {
      const platform = link.platform || 'Social';
      const personName = person.name || 'Artist';
      
      return {
        platform: platform,
        url: link.url || '#',
        displayText: `${platform}: ${personName}` 
      };
    })
    .filter((l: SocialLink) => l.url !== ''),
    alt: person.name || role
  };
};

export interface SocialLink {
  platform: string;
  url: string;
  displayText: string;
}

export interface MappedPerson {
  name: string;
  role: string;
  socials: SocialLink[]; 
  alt: string;
}