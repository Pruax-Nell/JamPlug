import type { CollectionEntry } from 'astro:content';

import { formatLocation } from "../data/globe-constants";
import { formatFestivalDate, formatEventDate, formatDate, formatTBCDate, formatTime } from "./dateHelper";
import { getImageSource } from '../function/sourceHelper';
import type { KeystaticImage } from './types';

import EventPlaceholder from '../assets/placeholder/placeholder-eventPoster.jpg'

// FULL event props
export const mapEventFull = (event: CollectionEntry<'events'>) => {
    const realPoster = !!event.data.eventPoster;
    const location = formatLocation(event.data.location, event.data.townCity);
    // const dates = formatEventDate(event.data.startDate, event.data.endDate);
    const dateLabel = event.data.datesTBC 
    ? formatTBCDate(event.data.startDate)
    : formatEventDate(event.data.startDate, event.data.endDate);
    const startTime = event.data.showStartTime ? formatTime(event.data.startTime) : null;
    const endTime = event.data.showEndTime ? formatTime(event.data.endTime) : null;
    const hasStart = !!startTime;
    const hasEnd = !!endTime;

    // const mapCoordinates = event.data.mapCoordinates?.longitude && event.data.mapCoordinates.latitude;
    const mapCoordinates = (event.data.mapCoordinates?.longitude && event.data.mapCoordinates?.latitude) 
        ? event.data.mapCoordinates 
        : null;

    const flyerKeys = ['flyerImage1', 'flyerImage2', 'flyerImage3', 'flyerImage4', 'flyerImage5'] as const;
    const galleryImages = flyerKeys
        .map(key => {
            const src = event.data[key];
            const alt = event.data[`${key}Alt` as keyof typeof event.data];
            const caption = event.data[`${key}Caption` as keyof typeof event.data];

            if (!src) return null;

            return {
                src,
                alt: alt || `Gallery image for ${event.data.eventName}`,
                caption: caption || `${event.data.eventName} poster Image`,
            };
        })
        .filter((img): img is NonNullable<typeof img> => !!img);

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
       
        datesTBC: event.data.datesTBC ?? false,
        // dateLabel: dates,
        dateLabel: dateLabel,
        startDate: event.data.startDate,
        endDate: event.data.endDate,
        startTime: startTime,
        endTime: endTime,
        showStart: event.data.showStartTime,
        showEnd: event.data.showEndTime,
        
        eventType: event.data.eventType,
        skateDiscipline: event.data.skateDiscipline,
        skillLevel: event.data.skillLevel,
        minAge: event.data.minAge,
        maxAge: event.data.maxAge,
        footwear: event.data.footwear,
        wheels: event.data.wheels,

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
        partners: (event.data.partners || []).map(p => mapPerson(p, 'Partner')).filter(Boolean),

        // Poster Gallery
        poster: event.data.eventPoster,
        alt: event.data.eventPosterAlt || event.data.eventName,
        caption: event.data.eventPosterCaption || '@YourJamPlug',
        isPlaceholder: !realPoster,
        gallery: galleryImages,

    }
}; 

// small cards | carosel use 
export const mapEventToCard = (event: CollectionEntry<'events'>) => {
    const location = formatLocation(event.data.location, event.data.townCity);
    // const dates = formatEventDate(event.data.startDate, event.data.endDate);
    const dateLabel = event.data.datesTBC 
    ? formatTBCDate(event.data.startDate)
    : formatEventDate(event.data.startDate, event.data.endDate);
    const realPoster = !!event.data.eventPoster;

    return{
        variant: "event" as const,

        id: event.id,
        url: `/events/${event.id}`,
        status: event.data.status,
        title: event.data.eventName,
        subtitle: event.data.subheading,
        description: event.data.description,
        poster: (event.data.eventPoster ?? EventPlaceholder),
        isPlaceholder: !realPoster,
        alt: event.data.eventPosterAlt || event.data.eventName,
        caption: event.data.eventPosterCaption || '@YourJamPlug',
        locationLabel: location.full, // "London, England, UK"
        eventType: event.data.eventType,
        featured: event.data.isFeatured,
        // dateLabel: dates,
        datesTBC: event.data.datesTBC ?? false,
        dateLabel: dateLabel,
        startDate: event.data.startDate,
        endDate: event.data.endDate
    }
}; 

export const mapToFeaturedCard = (event: any) => {
    const location = formatLocation(event.data.location, event.data.townCity);
    const dates = formatEventDate(event.data.startDate, event.data.endDate);
    const realPoster = !!event.data.eventPoster;
    
    return {
        variant: "event" as const,

        id: event.id,
        url: `/events/${event.id}/`,
        title: event.data.eventName,
        subtitle: event.data.subheading,
        locationLabel: location.full, // "London, England, UK"
        dateLabel: dates,
        description: event.data.description,
        poster: event.data.eventPoster,
        isPlaceholder: !realPoster,
        alt: event.data.eventPosterAlt || event.data.eventName,
        caption: event.data.eventPosterCaption || '@YourJamPlug',
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
    
    photo: person.photo || null,
    alt: person.name,
  
  };
};

const mapPerson = (person: any, role: string): MappedPerson => {
  return {
    name: person.name || "TBA",
    role: role,
    socials: (person.socialLinks || []).map((link: any, index: number): SocialLink => {
      const platform = link.platform || 'Social';
      const personName = person.name || 'Artist';
      const isSocial = platform.toLowerCase() === 'socials';
      const isWebsite = platform.toLowerCase() === 'website';
      const isOther = platform.toLowerCase() === 'other';

      let prefix = '•';
      if (isSocial) prefix = '@';
      if (isWebsite) prefix = 'WWW:';

      const numbering = index > 0 ? ` ${index + 1}` : '';

      
      return {
        platform: platform,
        url: link.url || '#',
        displayText: `[ ${prefix} ${personName}${numbering} ]`
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

// to be used in future reference !! TODO
// export const othermapEventToCard = (event: CollectionEntry<'events'>): SerializedEvent => {
//   const d = event.data;
//   const isPlaceholder = !d.eventPoster;

//   return {
//     id: event.id,
//     slug: event.id,
//     data: {
//       eventName: d.eventName,
//       townCity: d.townCity,
//       location: d.location,
//       // Convert Dates to Strings for serialization
//       startDate: d.startDate.toISOString(),
//       endDate: d.endDate?.toISOString() || null,
//       datesTBC: d.datesTBC ?? false,
      
//       // Other fields your EventCardData expects
//       skateDiscipline: d.skateDiscipline,
//       skillLevel: d.skillLevel,
//       eventType: d.eventType,
//       eventPoster: d.eventPoster,
//       isPlaceholder: isPlaceholder,
//       minAge: d.minAge,
//       footwear: d.footwear,
//       isFeatured: d.isFeatured,
//       eventStatus: d.eventStatus,
//       // Add any missing fields like 'wheels' or 'dateLabel' if your interface requires them
//     }
//   };
// };