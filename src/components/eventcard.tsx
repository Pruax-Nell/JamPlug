import React from 'react';
import type { ImageMetadata } from 'astro';
import Image from 'astro/components/Image.astro';
import type { SerializedEvent, EventCardData, } from '../function/types';
import { formatEventDate, formatTBCDate, formatTime } from '../function/dateHelper';
import { formatLocation, hasRegionSelected } from '../data/globe-constants';

import PosterPlaceholder from '../assets/placeholder/placeholder-eventPoster.jpg'

// card holder for upcomingEvents.tsx

type EventCardProps = SerializedEvent['data'] & {
  id: string; 
};

export default function EventCard({
  id,
  eventName,
  subheading,
  townCity,
  location,
  datesTBC,
  startDate,
  endDate,
  eventPoster,
  eventPosterAlt,
  skateDiscipline,
  skillLevel,
  eventType, 
  isFeatured,
  eventStatus,
  footwear,
  minAge, 
}: EventCardProps) {

const mainImageSrc = eventPoster?.src ?? PosterPlaceholder.src;

const labels = formatLocation(location, townCity);
const showRegion = hasRegionSelected(location);

const cardClasses = isFeatured ? "event-card featured-event" : "event-card";
const statusClass = eventStatus ? `status-${eventStatus}` : '';
// const dateRange = formatEventDate(startDate, endDate);

// const isTBC = datesTBC ?? false;
const isTBC = !!datesTBC;

const dateLabel = isTBC 
  ? formatTBCDate(startDate) 
  : formatEventDate(startDate, endDate ?? null);

  // console.log(`Event Check:`, { datesTBC, type: typeof datesTBC });
 
  return (
    <a href={`/events/${id}`} className={`event-card-link ${statusClass}`} aria-label={eventName}>
    <article className={cardClasses}>

      <div className="card-image-container">
        <img 
          src={mainImageSrc} 
          alt={eventName} 
          className="event-image" 
          loading="lazy" 
        />
          {minAge && <span className="age-tag">{minAge}+</span>}
          <span className="event-type-label">{eventType}</span>
        
      </div> 

      <div className="card-body">

        <header className="card-header">
          <h3 className="event-title">{eventName}
          </h3>
          <span className='sub-title'> {subheading} </span>
        </header> 

        <div className="card-meta">
          <p className="meta-item location">
            <span>📍</span> 
            {townCity && <span>{townCity}, </span>}
            {showRegion && <span>{labels.regionLabel}, </span>}
            <span className="country-label">{labels.countryLabel}</span>
            
          </p>
          <p className="meta-item date">
            <span>📅</span> {dateLabel}
          </p>
          <div className='sub-meta'>
            
          {skateDiscipline && ( <p className="meta-item discipline">{skateDiscipline}</p>)}
          {skillLevel && ( <p className="meta-item level">{skillLevel}</p>)}
          
          </div>
          {eventStatus && (
        <div className="status-badge">
           {eventStatus.replace('-', ' ')}
        </div>
      )}
        </div> 

      </div> 

    </article>
    </a>
  );
}

