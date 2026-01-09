import React from 'react';
import type { SerializedEvent } from '../types';
import { formatEventDate } from "../function/dateFormatter";

// We use Pick or just access the 'data' property of our Master Blueprint
type EventCardProps = SerializedEvent['data'] & {
  id: string;
};

export default function EventCard({
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
  
const dateDisplay = formatEventDate(startDate, endDate);

  return (
    <article className="event-card">
      <div className="card-image-container">
        {eventPoster ? (
          <img 
            src={eventPoster} 
            alt={`Poster for ${eventName}`}
            loading="lazy"
            decoding="async"
            className="event-image"
          />
        ) : (
          <div className="placeholder-image">🛼</div>
        )}
        <div className="discipline-badge">{skateDiscipline}</div>
      </div>

      <div className="card-body">
        <header className="card-header">
          <span className="event-type-label">{eventType}</span>
          <h3 className="event-title">{eventName}</h3>
        </header>

        <div className="card-meta">
          <p className="meta-item location">
            <span>📍</span> {townCity}, {country.replace(/-/g, ' ')}
          </p>
          <p className="meta-item date">
            <span>📅</span> {dateDisplay}
          </p>
          <p className="meta-item level">
            <span>💪</span> {skillLevel}
          </p>
        </div>
      </div>
    </article>
  );
}