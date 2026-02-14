import React from 'react';
import LocationShort from './locationShort.astro';
import type { AstroImage, SerializedEvent, EventCardData } from '../function/types';
import { formatEventDate, formatTime } from '../function/dateHelper';
import { formatLocation, hasRegionSelected } from '../data/globe-constants';



type EventCardProps = SerializedEvent['data'] & {
  id: string;
};

export default function EventCard({
  id,
  eventName,
  townCity,
  location,
  startDate,
  endDate,
  eventPoster,
  skateDiscipline,
  skillLevel,
  eventType,
  isFeatured,
  eventStatus,
  footwear,
  minAge,
}: EventCardProps) {

  const imageSrc = typeof eventPoster === 'object' && eventPoster !== null 
  ? (eventPoster as unknown as AstroImage).src 
  : eventPoster;

const labels = formatLocation(location, townCity);
const showRegion = hasRegionSelected(location);

const cardClasses = isFeatured ? "event-card featured" : "event-card";
const statusClass = eventStatus ? `status-${eventStatus}` : '';
const dateRange = formatEventDate(startDate, endDate);

  return (
    <a href={`/events/${id}`} className={`event-card-link ${statusClass}`}>
    <article className="event-card">

      <div className="card-image-container">
        {eventPoster ? (
          <img src={imageSrc} alt={eventName} className="event-image" />
        ) : (
          <div className="placeholder-image">🛼</div>
        )}

          
          {minAge && <span className="age-tag">{minAge}+</span>}
          <span className="event-type-label">{eventType}</span>
        
      </div> 

      <div className="card-body">

        <header className="card-header">
          <h3 className="event-title">{eventName}
          </h3>
          
        </header>

        <div className="card-meta">
          <p className="meta-item location">
            <span>📍</span> 
            {townCity && <span>{townCity}, </span>}
            {showRegion && <span>{labels.regionLabel}, </span>}
            <span className="country-label">{labels.countryLabel}</span>
            
          </p>
          <p className="meta-item date">
            <span>📅</span> {dateRange}
          </p>
          <div className='sub-meta'>
            
          {skateDiscipline && ( <p className="meta-item discipline">{skateDiscipline}</p>)}
          {skillLevel && ( <p className="meta-item level">{skillLevel}</p>)}
           {/* <p className="meta-item level">{skillLevel}</p> */}
          
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

