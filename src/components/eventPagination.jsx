import React, { useState, useMemo, useEffect } from 'react';
import '../styles/components.css'
import '../styles/global.css'
// import '../styles/event.css'

import { Image } from 'astro:assets';
import { allEuropeanCountries } from '../function/constant';
 
const BASE_URL = import.meta.env.BASE_URL
const Poster = 'src/content' 
// **/[^_]*.{md,mdx,mdoc}
const Content_Folder = "src/content/posters/*.{jpeg, jpg, pgn}";

const GROUPED_COUNTRIES = allEuropeanCountries

const SKATE_DISCIPLINE = [
  'All','Artistic','Street', 'Jam/Dance',  'Ramps/Vert', 'Roller Hockey', 'Speed', 'Other'
];

const EVENT_TYPE = [
  'All', 'Day Party', 'Festival', 'Social', 'Skate Party', 'Weekend', 'Workshop', 'Other'
];

const MONTH_ORDER = [
  'All',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * CONFIGURATION
 * These constants control the behavior of the list.
 */
const EVENTS_PER_PAGE = 20;

const INITIAL_FILTERS = {
  country: 'All',
  eventType: 'All',
  skateDiscipline: 'All',
  minAge: 'All', 
  skillLevel: 'All', 
  month: 'All',
};

const EventFilters = ({ events }) => {
  // 1. STATE MANAGEMENT
  // safeEvents ensures we always have an array to work with even if props are null
  const safeEvents = events || [];
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // 2. DYNAMIC DROPDOWN OPTIONS (Computed from available data)
  // useMemo ensures we only scan the event list once unless the list changes
  const uniqueOptions = useMemo(() => {
    const options = {
      country: new Set(),
      eventType: new Set(),
      skateDiscipline: new Set(),
      minAge: new Set(['18+', '21+']),
      skillLevel: new Set(),
      // month: MONTH_ORDER ,
      // month: new Set(),
    };

    safeEvents.forEach((event) => {
      const d = event.data;
      if (d.country) options.country.add(d.country);
      if (d.eventType) options.eventType.add(d.eventType);
      if (d.skateDiscipline) options.skateDiscipline.add(d.skateDiscipline);
      if (d.minAge) options.minAge.add(d.minAge);
      if (d.skillLevel) options.skillLevel.add(d.skillLevel);
      
      // Extract month name from ISO date string
      if (d.startDate) {
        const date = new Date(d.startDate);
        const monthName = date.toLocaleString('en-US', { month: 'long' });
        // options.month.add(monthName);
      }
    });

    // Helper to turn Set into sorted array with 'All' at the top
    const format = (set) => ['All', ...Array.from(set).sort()];

    return {
      country: GROUPED_COUNTRIES,
      eventType: EVENT_TYPE,
      skateDiscipline: SKATE_DISCIPLINE,
      minAge: format(options.minAge),
      skillLevel: format(options.skillLevel),
      month: MONTH_ORDER,
      // month: format(options.month),
    };
  }, [safeEvents]);

  // 3. FILTERING LOGIC
  // This calculates the 'Source of Truth' for the filtered results
  const filteredEvents = useMemo(() => {
    return safeEvents.filter((event) => {
      const d = event.data;
      const date = new Date(d.startDate);
      const eventMonth = date.toLocaleString('en-US', { month: 'long' });

      const matchesCountry = filters.country === 'All' || d.country === filters.country;
      const matchesType = filters.eventType === 'All' || d.eventType === filters.eventType;
      const matchesDiscipline = filters.skateDiscipline === 'All' || d.skateDiscipline === filters.skateDiscipline;
      const matchesAge = filters.minAge === 'All' || d.minAge === filters.minAge;
      const matchesSkill = filters.skillLevel === 'All' || d.skillLevel === filters.skillLevel;
      const matchesMonth = filters.month === 'All' || eventMonth === filters.month;

      // Event must pass ALL filters to be included
      return matchesCountry && matchesType && matchesDiscipline && matchesAge && matchesSkill && matchesMonth;
    });
  }, [safeEvents, filters]);

  // 4. PAGINATION LOGIC
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage]);

  // 5. AUTO-RESET
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
      // Smooth scroll to top of section for better UX
      document.getElementById('events-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- UI Components ---
  const FilterSelect = ({ label, name, options }) => (
    <div className=" filter-box">
      <label className="label">
        {label}
      </label>

      <select
        value={filters[name]}
        onChange={(e) => handleFilterChange(name, e.target.value)}
        className=""
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
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
                        <img 
                            src= {`/content/flyers/${post.data.eventPoster}`} 
                            alt={post.data.eventName}
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
                className="mt-4 text-indigo-600 font-bold underline"
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