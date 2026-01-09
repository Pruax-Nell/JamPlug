// ...CODE B...
import '../styles/components.css'
import '../styles/global.css'
import '../styles/event.css'

import React, { useState, useMemo, useEffect } from 'react';
import { formatEventDate } from '../function/dateFormatter';

import { Image } from 'astro:assets'; 
import { GROUPED_COUNTRIES, MONTH_ORDER, EVENT_TYPE, SKATE_DISCIPLINES, SKILL_LEVEL, EVENTS_PER_PAGE } from '../constants';

// const EVENTS_PER_PAGE = 20;

const INITIAL_FILTERS = {
  country: 'All',
  eventType: 'All',
  skateDiscipline: 'All',
  minAge: 'All', 
  skillLevel: 'All', 
  month: 'All',
  townCity: 'All',
};


// -------------------------
const EventFilters = ({ events }) => {
  const safeEvents = events || [];
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Now 'events' will be an empty array by default if nothing is passed in. -NOTE- can set the default directly in the arguments
// const EventFilters = ({ events = [] }) => {
// }
// -------------------------
  
  // useMemo ensures we only scan the event list once unless the list changes
//   const uniqueOptions = useMemo(() => {

//     const townsByCountry = {}; 

//     safeEvents.forEach((event) => {
//       const { country, townCity } = event.data;
//       if (country && townCity) {
//         if (!townsByCountry[country]) townsByCountry[country] = new Set();
//         townsByCountry[country].add(townCity);
//       }
//     });

//     const options = {
//       country: new Set(),
//       eventType: new Set(),
//       skateDiscipline: new Set(),
//       minAge: new Set(['18+', '21+']),
//       skillLevel: new Set(),
//       townsByCountry
//       // townCity: new Set(availableTowns) ,
//       // month: MONTH_ORDER ,
//     };

//     const normalizeTown = (str) => {
//   if (!str) return '';
//   return str
//     .trim()                                
//     .toLowerCase()                         
//     .split(' ')                            
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
//     .join(' ');                            
// };

//     safeEvents.forEach((event) => {
//       const d = event.data;
//       if (d.country) options.country.add(d.country) ;
//       if (d.eventType) options.eventType.add(d.eventType);
//       if (d.skateDiscipline) options.skateDiscipline.add(d.skateDiscipline);
//       if (d.minAge) options.minAge.add(d.minAge);
//       if (d.skillLevel) options.skillLevel.add(d.skillLevel);
//       if (d.townCity) options.townCity.add(normalizeTown(d.townCity));

//       // Extract month name from ISO date string
//       if (d.startDate) {
//         const date = new Date(d.startDate);
//         const monthName = date.toLocaleString('en-GB', { month: 'long' });
//       }
//     });

//     // Helper to turn Set into sorted array with 'All' at the top
//     const format = (set) => ['All', ...Array.from(set).sort()];

//     return {
//       country: [{value: 'All', label: 'All'}, ...GROUPED_COUNTRIES],
//       eventType: [{value: 'All', label: 'All'}, ...EVENT_TYPE],
//       skateDiscipline: [{value: 'All', label: 'All'}, ...SKATE_DISCIPLINES],
//       skillLevel: [{value: 'All', label: 'All'}, ...SKILL_LEVEL],
//       month: [{value: 'All', label: 'All'}, ...MONTH_ORDER],
//       // townCity: format(options.townsByCountry),
//       townCity: filters.country === 'All' 
//         ? ['All'] 
//       : ['All', ...Array.from(townsByCountry[filters.country] || []).sort()],
//       minAge: format(options.minAge),
//     };
//     // return {
//     //   country: GROUPED_COUNTRIES,
//     //   eventType: EVENT_TYPE,
//     //   skateDiscipline: SKATE_DISCIPLINES,
//     //   minAge: format(options.minAge),
//     //   skillLevel: SKILL_LEVEL,
//     //   townCity: format(townsByCountry),
//     //   month: MONTH_ORDER,
//     // };
//   }, [safeEvents]);

const uniqueOptions = useMemo(() => {
    // 1. Build a dictionary of towns grouped by country value
    const townsByCountry = {};

    safeEvents.forEach((event) => {
      const { country, townCity } = event.data;
      if (country && townCity) {
        // We use the country VALUE (slug) as the key
        if (!townsByCountry[country]) townsByCountry[country] = new Set();
        townsByCountry[country].add(townCity);
      }
    });

    // 2. Prepare the static options from constants.ts
    // We keep them as objects {value, label} so the UI is pretty but logic is fast
    return {
      country: [{ value: 'All', label: 'All' }, ...GROUPED_COUNTRIES],
      eventType: [{ value: 'All', label: 'All' }, ...EVENT_TYPE],
      skateDiscipline: [{ value: 'All', label: 'All' }, ...SKATE_DISCIPLINES],
      skillLevel: [{ value: 'All', label: 'All' }, ...SKILL_LEVEL],
      month: [{ value: 'All', label: 'All' }, ...MONTH_ORDER],
      // We pass the raw Set dictionary for the towns helper below
      townCity: townsByCountry,
      // Fixed minAge logic
      minAge: ['All', '18+', '21+'],
    };
}, [safeEvents]);
// VISIBLE BREAK


 // 3. Dynamic Town Selection
  // Combines your previous two hooks into one working version
  const dynamicTowns = useMemo(() => {
    const selectedCountry = filters.country;
    if (selectedCountry === 'All') return ['All'];
    
    // Use the correct key name from your uniqueOptions object
    const towns = uniqueOptions.townsByCountry[selectedCountry] || new Set();
    return ['All', ...Array.from(towns).sort()];
  }, [filters.country, uniqueOptions]);

  // This calculates the 'Source of Truth' for the filtered results
  const filteredEvents = useMemo(() => {
    return safeEvents.filter((event) => {
      const d = event.data;
      const date = new Date(d.startDate);
      
      const eventMonth = date.toLocaleString('en-GB', { month: 'long' });
      
      const matchesCountry = filters.country === 'All' || d.country === filters.country;
      const matchesType = filters.eventType === 'All' || d.eventType === filters.eventType;
      const matchesDiscipline = filters.skateDiscipline === 'All' || d.skateDiscipline === filters.skateDiscipline;
      const matchesAge = filters.minAge === 'All' || d.minAge === filters.minAge;
      const matchesSkill = filters.skillLevel === 'All' || d.skillLevel === filters.skillLevel;
      const matchesMonth = filters.month === 'All' || eventMonth === filters.month.toLowerCase();
      const matchTown = filters.townCity === 'All' || d.townCity === filters.townCity;

      // Event must pass ALL filters to be included
      return matchesCountry && matchesType && matchesDiscipline && matchesAge && matchesSkill && matchesMonth && matchTown;
    });
  }, [safeEvents, filters]);

  // PAGINATION 
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage]);

  // If user changes a filter, always go back to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // --- Handlers ---
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('events-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // TODO TYPE.VALUE vs TYPE.LABEL
  // --- UI Components ---
  const FilterSelect = ({ label, name, options }) => (
    <div className="filter-box">
      <label className="label">{label}</label>
      <select
        value={filters[name]}
        onChange={(e) => handleFilterChange(name, e.target.value)}
      >
        {options.map((opt) => {
          // Check if opt is an object {value, label} or just a string
          const isObj = typeof opt === 'object' && opt !== null;
          const val = isObj ? opt.value : opt;
          const lab = isObj ? opt.label : opt;

          return (
            <option key={val} value={val}>
              {lab}
            </option>
          );
        })}
      </select>
    </div>
  );

  return (
    <div className="primary-container" id="events-anchor">
      
      {/* 6. FILTER BAR */}
      <div id='filter-component' className="">
        <div className="filter-group">
          <FilterSelect label="Country" name="country" options={uniqueOptions.country} />
          <FilterSelect label="Event Type" name="eventType" options={uniqueOptions.eventType} className="filter-box" />
          <FilterSelect label="Discipline" name="skateDiscipline" options={uniqueOptions.skateDiscipline} className="filter-box" />
          <FilterSelect label="Age Limit" name="minAge" options={uniqueOptions.minAge} className="filter-box" />
          <FilterSelect label="Skill Level" name="skillLevel" options={uniqueOptions.skillLevel} className="filter-box" />
          <FilterSelect label="Month" name="month" options={uniqueOptions.month} className="filter-box" />
          <FilterSelect label="Town" name="townCity" options={dynamicTowns} className="filter-box" />
        </div>
        
        <div className="filter-return">
            <p>Showing <span className="p3 highlight">{filteredEvents.length}</span> upcoming events</p>

            {/* clear filters button */}
            <button 
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="button reset-button"
            >
              Clear All Filters
            </button>
        </div>
      </div>

      {/* 7. EVENT GRID */}
      <div className="primary-container events event-grid">

        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((post) => (
            
            <div 
              key={post.id || post.slug} 
              className="event-item "
            >
                <a 
                href={`/events/${post.slug || post.id}/`}
                className="list-link">

                <div className="img-wrapper ">
                    {post.data.eventPoster ? (
                        <Image 
                        // TODO change src path
                            src= {`/content/flyers/${post.data.eventPoster}`} 
                            alt={post.data.eventName}
                            width={230}
                            height={320}
                            className="eventcard-poster"
                        />
                        
                    ) : (
                        <div className="eventcard-poster-alt">
                            No Image
                        </div>
                    )}
                </div>

                <div className="content-wrapper">
                    <div className="title-wrap">
                        <h6 className="event-name">{post.data.eventName}</h6>
                    </div>

                    <div className="event-category">
                        <div className="flex cat-box-1">
                            <div className="cat-tag">{post.data.category}</div>
                            <div className="type-tag">{post.data.eventType}</div>
                            
                        </div>
                        <div className="flex cat-box-2">
                            {post.data.minAge && <div className="age-tag dataOptional" id="minimum-age-tag">{post.data.minAge}</div>}
                        </div>
                    </div>

                    <div className="meta-wrapper">
                        <div className="location-wrapper">
                            📍 <p className="location">{post.data.townCity} - {post.data.country}</p>
                        </div>

                        <div className="description-wrapper">
                            <span className="description">{post.data.description}</span>
                        </div>

                        <div className="date-wrapper">
                            <span>
                                <span>🗓️ {new Date(post.data.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </span>
                             

                            <span>
                                ~
                            </span>

                            <span>
                                <span>{new Date(post.data.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
          ))
        ) : (
          <div className="none-returned">
            <p className="text-gray-400 text-lg">No events match your criteria.</p>

            <button 
              onClick={() => setFilters(INITIAL_FILTERS)}
              className="button mt-4 text-indigo-600 font-bold underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* 8. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
            }`}
          >
            Prev
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Only show first, last, and pages around current to avoid long lists
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        currentPage === page 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400'
                      }`}
                    >
                      {page}
                    </button>
                  );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;