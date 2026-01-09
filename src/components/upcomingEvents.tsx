// ...CODE C... 

// styles and aesthetics
import '../styles/components.css'
import '../styles/global.css'
import '../styles/event.css'

// REACT and CONSTANTS 
import React, { useState, useMemo, useEffect } from 'react';
import type { SerializedEvent } from '../types';
import EventCard from './eventcard';
import { GROUPED_COUNTRIES, MONTH_ORDER, EVENT_TYPE, SKATE_DISCIPLINES, SKILL_LEVEL, FOOTWEAR_CHOICE, EVENTS_PER_PAGE,  } from '../constants';


interface ServerOptions {
  townsByCountry: Record<string, string[]>;
  rink: string[];
  minAge: string[];
}

interface UpcomingEventsProps {
  initialEvents: SerializedEvent[];
  serverOptions: ServerOptions;
  eventsPerPage?: number;
}

interface FilterState {
  country: string;
  townCity: string;
  month: string;
  eventType: string;
  skateDiscipline: string;
  skillLevel: string;
  minAge: string;
  rink: string;
}

const INITIAL_FILTERS: FilterState = {
  country: 'All',
  townCity: 'All',
  month: 'All',
  eventType: 'All',
  skateDiscipline: 'All',
  skillLevel: 'All',
  minAge: 'All',
  rink: 'All',
};

export default function UpcomingEvents({ initialEvents, serverOptions }: UpcomingEventsProps) {
  // --- 1. STATE ---
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // --- 2. URL SYNC ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updatedFilters = { ...INITIAL_FILTERS };
    (Object.keys(INITIAL_FILTERS) as Array<keyof FilterState>).forEach(key => {
      const val = params.get(key);
      if (val) updatedFilters[key] = val;
    });
    setFilters(updatedFilters);
  }, []);

  // --- 3. DYNAMIC DROPDOWN LOGIC ---
  // [LEARNING NOTE]: We only calculate towns dynamically because they depend on the Country. 
  // Disciplines/Skill Levels are static (from constants), so they don't need a useMemo here.
  const availableTowns = useMemo(() => {
    if (filters.country === 'All') {
      const allTowns = Object.values(serverOptions.townsByCountry).flat();
      return ['All', ...new Set(allTowns)].sort();
    }
    return ['All', ...(serverOptions.townsByCountry[filters.country] || [])];
  }, [filters.country, serverOptions]);

  // --- 4. FILTERING ENGINE ---
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const d = event.data;
      const match = (filterVal: string, eventVal: any) => {
        if (filterVal === 'All') return true;
        return String(eventVal) === filterVal;
      };

      return (
        match(filters.country, d.country) &&
        match(filters.townCity, d.townCity) &&
        match(filters.eventType, d.eventType) &&
        match(filters.skateDiscipline, d.skateDiscipline) &&
        match(filters.skillLevel, d.skillLevel) &&
        match(filters.minAge, d.minAge) &&
        match(filters.rink, d.rink)
      );
    });
  }, [filters, initialEvents]);

  // --- 5. PAGINATION LOGIC ---
  // [LEARNING NOTE]: totalPages must be calculated from the FILTERED list, not the initial list.
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  
  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  // --- 6. HANDLERS ---
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to page 1 whenever a filter changes!

    // URL Sync logic
    const params = new URLSearchParams(window.location.search);
    if (value === 'All') params.delete(key);
    else params.set(key, value);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  return (
    <div className="events-page-wrapper">
      <section className="filter-bar">
        {/* Country Dropdown */}
        <select value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
          <option value="All">All Countries</option>
          {Object.keys(serverOptions.townsByCountry).map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Dynamic Town Dropdown */}
        <select value={filters.townCity} onChange={(e) => handleFilterChange('townCity', e.target.value)}>
          {availableTowns.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        
        <select value={filters.month} onChange={(e) => handleFilterChange('townCity', e.target.value)}>
          {availableTowns.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        {/* [LEARNING NOTE]: Use your Constants for these! */}
        <select value={filters.eventType} onChange={(e) => handleFilterChange('skateDiscipline', e.target.value)}>
          <option value="All">All Disciplines</option>
          {EVENT_TYPE.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        <select value={filters.skateDiscipline} onChange={(e) => handleFilterChange('skateDiscipline', e.target.value)}>
          <option value="All">All Disciplines</option>
          {SKATE_DISCIPLINES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        <select value={filters.skillLevel} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
          <option value="All">All Levels</option>
          {SKILL_LEVEL.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <select value={filters.minAge} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
          <option value="All">All Levels</option>
          {minAge.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <select value={filters.rink} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
          <option value="All">All Levels</option>
          {rink.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <button onClick={() => { setFilters(INITIAL_FILTERS); window.history.replaceState({}, '', window.location.pathname); }}>
          Reset
        </button>
      </section>

      <div className="event-grid">
        {visibleEvents.map(event => (
          <EventCard key={event.id} id={event.id} {...event.data} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span>{currentPage} / {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}