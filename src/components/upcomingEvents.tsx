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
  // ---  STATE ---
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // ---  URL SYNC ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updatedFilters = { ...INITIAL_FILTERS };
    (Object.keys(INITIAL_FILTERS) as Array<keyof FilterState>).forEach(key => {
      const val = params.get(key);
      if (val) updatedFilters[key] = val;
    });
    setFilters(updatedFilters);
  }, []);

  
  // ---  DYNAMIC DROPDOWN LOGIC ---
  // calculate towns dynamically because they depend on the Country. 
  // static (from constants) don't need a useMemo here.
  const availableTowns = useMemo(() => {
    if (filters.country === 'All') {
      const allTowns = Object.values(serverOptions.townsByCountry).flat();
      return ['All', ...new Set(allTowns)].sort();
    }
    return ['All', ...(serverOptions.townsByCountry[filters.country] || [])];
  }, [filters.country, serverOptions]);

  // This scans all events to see which categories actually have data
// const activeFilterValues = useMemo(() => {
//   return {
//     countries: new Set(initialEvents.map(e => e.data.country)),
//     types: new Set(initialEvents.map(e => e.data.eventType)),
//     disciplines: new Set(initialEvents.map(e => e.data.skateDiscipline)),
//     levels: new Set(initialEvents.map(e => e.data.skillLevel)),
//     rinks: new Set(initialEvents.map(e => e.data.rink)),
//     months: new Set(initialEvents.map(e => new Date(e.data.startDate).getMonth().toString())),
//   };
// }, [initialEvents]);

const activeFilterValues = useMemo(() => {
  // Helper to extract values and remove any that are undefined or null
  const getActiveSet = (key: keyof SerializedEvent['data']) => {
    return new Set(
      initialEvents
        .map(e => e.data[key])
        .filter((val): val is string => typeof val === 'string') // This removes undefined/null
    );
  };

  return {
    countries: getActiveSet('country'),
    types: getActiveSet('eventType'),
    disciplines: getActiveSet('skateDiscipline'),
    levels: getActiveSet('skillLevel'),
    rinks: getActiveSet('rink'),
    // Months usually comes from a date string which is never undefined if the event exists
    months: new Set(initialEvents.map(e => new Date(e.data.startDate).getMonth().toString()))
  };
}, [initialEvents]);

const renderOptions = (
  constantList: readonly { readonly value: string; readonly label: string }[],
  activeSet: Set<string>
) => {
  return constantList.map((item) => {
    const isDisabled = !activeSet.has(item.value);
    return (
      <option key={item.value} value={item.value} disabled={isDisabled}>
        {item.label} {isDisabled ? ' ' : ''}
      </option>
    );
  });
};

  // --- FILTERING ENGINE ---
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const d = event.data;
      const match = (filterVal: string, eventVal: any) => {
        if (filterVal === 'All') return true;
        return String(eventVal) === filterVal;
      };
      const eventMonth = new Date(d.startDate).getMonth().toString();
      const monthMatch = filters.month === 'All' || eventMonth === filters.month;

      return (
        match(filters.country, d.country) &&
        match(filters.townCity, d.townCity) &&
        match(filters.eventType, d.eventType) &&
        match(filters.skateDiscipline, d.skateDiscipline) &&
        match(filters.skillLevel, d.skillLevel) &&
        match(filters.minAge, d.minAge) &&
        match(filters.rink, d.rink) &&
        monthMatch
      );
    });
  }, [filters, initialEvents]);

  // ---  PAGINATION LOGIC ---
  //totalPages must be calculated from the FILTERED list, not the initial list.
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  
  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  // ---  HANDLERS ---
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

        <div className='duo-filter'>
        <select value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
          <option value="All">Any Country</option>
          {renderOptions(GROUPED_COUNTRIES, activeFilterValues.countries)}
        </select>
          <span className='divider'></span>
        {/* Dynamic Town Dropdown */}
        <select value={filters.townCity} onChange={(e) => handleFilterChange('townCity', e.target.value)}>
          {availableTowns.map(t => <option key={t} value={t}>{t} 
             
          </option>)}
        </select>

        </div>

        <div className='duo-filter'>
          <select value={filters.eventType} onChange={(e) => handleFilterChange('eventType', e.target.value)}>
            <option value="All">Any Type</option>
            {renderOptions(EVENT_TYPE, activeFilterValues.types)}
          </select>
          <span className='divider'></span>


          <select value={filters.skateDiscipline} onChange={(e) => handleFilterChange('skateDiscipline', e.target.value)}>
            <option value="All">Any Discipline</option>
            {renderOptions(SKATE_DISCIPLINES, activeFilterValues.disciplines)}
          </select>
        </div>

        <div className='duo-filter'>
        <select value={filters.month} onChange={(e) => handleFilterChange('month', e.target.value)}>
          <option value="All">Any Month</option>
          {renderOptions(MONTH_ORDER, activeFilterValues.months)}
        </select>
            <span className='divider'></span>


        <select value={filters.minAge} onChange={(e) => handleFilterChange('minAge', e.target.value)}>
          <option value="All">Any Age</option>
          {serverOptions.minAge.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
          </select>

          
        </div>
        
        <div className='duo-filter'>

          <select value={filters.skillLevel} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
            <option value="All">Any Level</option>
            {renderOptions(SKILL_LEVEL, activeFilterValues.levels)}
          </select>
            <span className='divider'></span>

          <select value={filters.rink} onChange={(e) => handleFilterChange('rink', e.target.value)}>
            <option value="All">Any Rink</option>
            {serverOptions.rink.sort().map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

        </div>
        {/* <select value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
          <option value="All">All Countries</option>
          {Object.keys(serverOptions.townsByCountry).map(c => <option key={c} value={c}>{c}</option>)}
        </select> */}

        {/* <select value={filters.month} onChange={(e) => handleFilterChange('month', e.target.value)}>
          {MONTH_ORDER.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select> */}

        {/* <select value={filters.eventType} onChange={(e) => handleFilterChange('eventType', e.target.value)}>
          <option value="All">All Event Type</option>
          {EVENT_TYPE.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select> */}

        {/* <select value={filters.skateDiscipline} onChange={(e) => handleFilterChange('skateDiscipline', e.target.value)}>
          <option value="All">All Disciplines</option>
          {SKATE_DISCIPLINES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select> */}

        {/* <select value={filters.skillLevel} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
          <option value="All">All Levels</option>
          {SKILL_LEVEL.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select> */}


        <button 
          className="reset-button"
          onClick={() => {
            // 1. Reset the React State to the empty blueprint
            setFilters(INITIAL_FILTERS);
            
            // 2. Reset to the first page of results
            setCurrentPage(1);

            // 3. Clear the URL Search Parameters
            window.history.replaceState({}, '', window.location.pathname);
          }}
        >
          Clear All Filters
        </button>
      </section>

      <div className="event-grid">
        {visibleEvents.length > 0 ? (
          visibleEvents.map(event => (
            <EventCard 
              key={event.id} 
              id={event.id} 
              {...event.data} 
            />
          ))
        ) : (
          <div className="no-events-fallback">
            <h3>No events found</h3>
            <p>Try adjusting your filters or check back later for new dates.</p>
            
          </div>
        )}
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