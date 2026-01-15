import React from 'react';
import type { SerializedEvent } from '../types';
// import { formatEventDate } from "../function/dateFormatter";
import { formatEventDate, formatTime } from '../function/dateHelper';

// We use Pick or just access the 'data' property of our Master Blueprint

interface AstroImage {
  src: string;
  width: number;
  height: number;
  format: string;
}

type EventCardProps = SerializedEvent['data'] & {
  id: string;
};



export default function EventCard({
  id,
  eventName,
  townCity,
  country,
  startDate,
  endDate,
  eventPoster,
  skateDiscipline,
  skillLevel,
  eventType
}: EventCardProps) {

  const imageSrc = typeof eventPoster === 'object' && eventPoster !== null 
  ? (eventPoster as unknown as AstroImage).src 
  : eventPoster;
  
// const dateDisplay = formatEventDate(startDate, endDate);

// const { data } = Astro.props;
const dateRange = formatEventDate(startDate, endDate);
// const startTime = formatTime(startTime);

  return (
    <a href={`/events/${id}`} className="event-card-link">
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

        <header className="card-header">
          <h3 className="event-title">{eventName}</h3>
        </header>

        <div className="card-meta">
          <p className="meta-item location">
            <span>📍</span> {townCity}, {country.replace(/-/g, ' ')}
          </p>
          <p className="meta-item date">
            <span>📅</span> {dateRange}
          </p>
          <div className='sub-meta'>
            
          {skateDiscipline && ( <p className="meta-item discipline">{skateDiscipline}</p>)}
          {skillLevel && ( <p className="meta-item level">{skillLevel}</p>)}
          
          </div>
        </div>

      </div> 

    </article>
    </a>
  );
}

