import React from 'react';
import type { AstroImage, SerializedEvent, EventCardData } from '../types';
import { formatEventDate, formatTime } from '../function/dateHelper';
import { formatLocationLabel } from '../function/stringHelper';


// We use Pick or just access the 'data' property of our Master Blueprint

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
}: EventCardProps) {

  const imageSrc = typeof eventPoster === 'object' && eventPoster !== null 
  ? (eventPoster as unknown as AstroImage).src 
  : eventPoster;
  
// const dateDisplay = formatEventDate(startDate, endDate);
const cardClasses = isFeatured ? "event-card featured" : "event-card";
const statusClass = eventStatus ? `status-${eventStatus}` : '';
const labels = formatLocationLabel(location);
// const { data } = Astro.props;
const dateRange = formatEventDate(startDate, endDate);
// const startTime = formatTime(startTime);

  return (
    <a href={`/events/${id}`} className={`event-card-link ${statusClass}`}>
    <article className="event-card">

      <div className="card-image-container">
        {eventPoster ? (
          <img src={imageSrc} alt={eventName} className="event-image" />
        ) : (
          <div className="placeholder-image">🛼</div>
        )}
          <span className="event-type-label">{eventType}</span>
        
      </div> 

      <div className="card-body">
        {/* {isFeatured && <span class="badge">Recommended</span>} */}

        <header className="card-header">
          <h3 className="event-title">{eventName}</h3>
        </header>

        <div className="card-meta">
          <p className="meta-item location">
            <span>📍</span> {townCity}, {labels.country}
          </p>
          <p className="meta-item date">
            <span>📅</span> {dateRange}
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

