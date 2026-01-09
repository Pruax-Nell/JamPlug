//  ...CODE A...
import '../styles/components.css'
import '../styles/global.css'
import '../styles/event.css'

import React, { useState, useMemo, useEffect } from 'react';
import { formatEventDate } from '../function/dateFormatter';
// import type { SerializedEvent } from '../types';

import { Image } from 'astro:assets'; 
import { GROUPED_COUNTRIES, MONTH_ORDER, EVENT_TYPE, DISCIPLINE_TAGS, SKILL_LEVEL, FOOTWARE_CHOICE } from '../constants';
 
const BASE_URL = import.meta.env.BASE_URL

const EVENTS_PER_PAGE = 20;

const EventFilters = ({ events }) => {
  const safeEvents = events || [];
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. GENERATE DYNAMIC OPTIONS ...code a...
  const uniqueOptions = useMemo(() => { 
    // -NOTE- creates a container to prepare for incoming loop's information.
    const townsByCountry = {}; 
// -NOTE- difference between {} object -key and value, and [] array -list of obj/string etc.
    safeEvents.forEach((event) => {
      const { country, townCity } = event.data;
      if (country && townCity) {
        if (!townsByCountry[country]) townsByCountry[country] = new Set();
        townsByCountry[country].add(townCity);
      }
    });

    // Helper to add 'All' to any constant list
    const withAll = (list) => [{ value: 'All', label: 'All' }, ...list];

    return {
      country: withAll(GROUPED_COUNTRIES), 
      eventType: withAll(EVENT_TYPE),
      skateDiscipline: withAll(DISCIPLINE_TAGS),
      skillLevel: withAll(SKILL_LEVEL),
      month: withAll(MONTH_ORDER),
      // Towns are special: they depend on the country filter
      // townsByCountry,
      townCity: townsByCountry,
      // Fixed minAge logic TODO change to dynamic list to allow other age settings
      minAge: ['All', '18+', '21+'],
    };
  }, [safeEvents]);
// end of calculation -NOTE- depends on safeEvents

  // 2. GET CURRENT TOWNS BASED ON SELECTED COUNTRY
  const availableTowns = useMemo(() => {
    const countryVal = filters.country;
    if (countryVal === 'All') return ['All'];

    const towns = options.townsByCountry[countryVal] || new Set();
    return ['All', ...Array.from(towns).sort()];
  }, [filters.country, options.townsByCountry]);

  // 3. FILTER LOGIC
  // AKA THE GATE CHECK 
  const filteredEvents = useMemo(() => {
    return safeEvents.filter((event) => {
      const d = event.data;

      const date = new Date(d.startDate);
      const eventMonth = date.toLocaleString('en-GB', { month: 'long' }).toLowerCase();
      
      const match = (filterVal, dataVal) => filterVal === 'All' || dataVal === filterVal;

      return (
        match(filters.country, d.country) &&
        match(filters.eventType, d.eventType) &&
        match(filters.skateDiscipline, d.skateDiscipline) &&
        match(filters.skillLevel, d.skillLevel) &&
        match(filters.month.toLowerCase(), eventMonth) &&
        match(filters.townCity, d.townCity)
      );
    });
  }, [safeEvents, filters]);

  // Reset town when country changes to prevent "Ghost" filtering
  useEffect(() => {
    setFilters(prev => ({ ...prev, townCity: 'All' }));
  }, [filters.country]);

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

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  
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
          <FilterSelect label="Town" name="townCity" options={uniqueOptions.townCity} className="filter-box" />
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
// end of const EventFilters variable/function

export default EventFilters;