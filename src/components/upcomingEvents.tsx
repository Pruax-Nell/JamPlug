//pseudo code::
  // 1. IMPORTS
  // 2. TYPES (FilterState, Props)
  // 3. INITIAL_FILTERS

  // 4. SUB-COMPONENT: Location Search

  // export default function Upcoming Events(...) {
  // 5. STATE: filters, currentPage
  
  // 6. DERIVED GEOGRAPHY (useMemo)
  // Calculate dynamic Regions based on filters.country
  // Calculate active Options based on filters.country + filters.region
  
  // 7. FILTERING ENGINE (The big useMemo)
  // Step A: Does it match the geography?
  // Step B: Does it match the skate discipline?
  // Step C: Does it match the boolean (footwear)?
  
  // 8. PAGINATION CALCS
  // Slice the filtered Events based on current Page
  
  // 9. HANDLERS
  // handle FilterChange (Updates state + Syncs URL)
  
  // 10. JSX RETURN
  // Render search bar
  // Render dropdowns (render Options)
  // Render the EventGrid
  // Render Pagination
// }

// ------------- IMPORTS AND CONSTANTS
// styles and components
import '../styles/global.css'
import '../styles/event.css'
import EventCard from './eventcard';

// REACT and CONSTANTS 
import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { SerializedEvent, EventCardData, EventLocation, SelectOption } from '../function/types';
import { formatEventDate, } from '../function/dateHelper';
import { formatLabel, capitalize, slugify } from '../function/stringHelper';
import { formatLocation } from '../data/globe-constants';

//  DATA 
import { MONTH_ORDER, EVENT_TYPE, SKATE_DISCIPLINES, SKILL_LEVEL, EVENTS_PER_PAGE, FOOTWEAR_CHOICE  } from '../data/skate-constants';

import type { Footwear, SkateDisciplines, SkillLevel, EventStatus, EventType, MonthOrder, PostStatus } from '../data/skate-constants';
import {getRegionOptions, ALL_CONTINENT_VALUES, CONTINENT_DATA } from '../data/globe-constants'

const continentOptions = ALL_CONTINENT_VALUES.map(c => ({
  label: formatLabel(c),
  value: c
}));

// ------------- TYPES AND INTERFACE

interface UpcomingEventsProps {
  initialEvents: SerializedEvent[];
  serverOptions: ServerOptions;
  eventsPerPage?: number;
}

// Server sourced 
interface ServerOptions {
  minAge: string[];
}

interface FilterState {
  location: LocationContext;
  attributes: AttributeContext;
}

// Location group for 'where' filter (hierarchical)
interface LocationContext {
  continent: string;
  country: string;
  region: string;
  townCity: string;
}

interface AttributeContext {
  month: string;
  eventType: string;
  skateDiscipline: string;
  skillLevel: string;
  footwear: string;
  minAge: string;
}

interface LocationSearchProps {
  locationFilters: LocationContext; // Only gets the location object
  onLocationChange: (key: keyof LocationContext, value: string) => void;
  initialEvents: SerializedEvent[];
}

const INITIAL_FILTERS: FilterState = {
 location: {
    continent: 'All',
    country: 'All',
    region: 'All',
    townCity: '',
 }, 

  attributes: {
    minAge: 'All',
    month: 'All',
    eventType: 'All',
    skateDiscipline: 'All',
    skillLevel: 'All',
    footwear: 'All',
  }
};

// ---- LOCATION DATA 
export const LocationSearch = ({ onLocationChange, locationFilters, initialEvents }: LocationSearchProps) => {

  const [inputValue, setInputValue] = useState(locationFilters.townCity || '');
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
      if (locationFilters.townCity === '' || locationFilters.townCity === 'All') {
        setInputValue('');
      } else {
        if (inputValue !== locationFilters.townCity) {
          setInputValue(locationFilters.townCity)
        }
    }
  }, [locationFilters.townCity]);

  const locationSuggestions = useMemo(() => {
    const rawSuggestions = initialEvents.map(event => {
      const { townCity, location } = event.data;
      const labels = formatLocation(location);
      const subLabel = labels.regionLabel || labels.countryLabel;
      
      return {
        label: townCity ? `${townCity}, ${subLabel}` : labels.full,
        values: {
          continent: location.discriminant,
          country: location.value?.discriminant || 'All',
          region: location.value?.value || 'All',
          townCity,
        }
      };
    });
    const unique = Array.from(new Map(rawSuggestions.map(s => [s.label, s])).values());

    return unique.sort((a, b) => a.label.localeCompare(b.label));

  }, [initialEvents]);

  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) return locationSuggestions;

    const matches = locationSuggestions.filter(s =>
      s.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    const isExactMatch = locationSuggestions.some(s => s.label === inputValue);
    
    return (isExactMatch && isOpen) ? locationSuggestions : matches;

  }, [inputValue, locationSuggestions, isOpen]);

  const handleSelect = (suggestion: typeof locationSuggestions[0]) => {
    setInputValue(suggestion.values.townCity); 
    setIsOpen(false);

    onLocationChange('continent', suggestion.values.continent);
    onLocationChange('country', suggestion.values.country);
    onLocationChange('region', suggestion.values.region);
    onLocationChange('townCity', suggestion.values.townCity);
  };

  return (
  <div className="filter-group location-search-wrapper" ref={wrapperRef} style={{ position: 'relative' }}>
   
    <label htmlFor='location-search-input' className='input-label'> Search :</label>

    <input
      id='location-search-input'
      type="text"
      role='combobox'
      aria-controls='listbox'
      placeholder="City, Region, or Country..."
      value={inputValue}
      onFocus={() => setIsOpen(true)}
      // onBlur={() => setTimeout(() => setIsOpen(false), 200)}

      onChange={(e) => {
        const val = e.target.value;
        setInputValue(val);
        onLocationChange('townCity', val);
        setIsOpen(true);
      }}
      className="input-box"
    />

    {isOpen && (filteredSuggestions.length > 0 || inputValue.trim() !== '') && (
      <ul className="location-options-list" role='listbox' >
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion, index) => (
            <li
              role='option'
              key={index}
              onMouseDown={() => handleSelect(suggestion)}
              className="suggestion-item"
            >
              {suggestion.label}
            </li>
          ))
        ) : (
          <li className="suggestion-no-results">
            No active events found for "<strong>{inputValue}</strong>"
          </li>
        )}
      </ul>
    )}
  </div>
);
};
// ------------------------- ----------- --------------------------- ||
// ------------------------- EVENTS DATA --------------------------- ||
export default function UpcomingEvents({ initialEvents, serverOptions }: UpcomingEventsProps) {
  
  // ---  5. STATE ---
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicRegions, setDynamicRegions] = useState<SelectOption[]>([]);
  const [regionLabel, setRegionLabel] = useState('Region'); 

  const getRegionOptions = (selectedCountry: string): SelectOption[] => {
    if (!selectedCountry || selectedCountry === 'All') return [];

    const regions = initialEvents
      .filter(event => {
        const loc = event.data.location;
        return loc.value?.discriminant === selectedCountry;
      })
      .map(event => event.data.location.value?.value) 
      .filter((region): region is string => !!region);

    const uniqueRegions = Array.from(new Set(regions)).sort();

    return uniqueRegions.map(reg => ({
      value: reg,
      label: formatLabel(reg)
    }));
  };

  useEffect(() => {
    const selectedCountry = filters.location.country;

    if (selectedCountry === 'united-states-of-america') {
      setRegionLabel('State');
    } else if (selectedCountry === 'canada') {
      setRegionLabel('Province');
    } else if (selectedCountry === 'united-kingdom') {
      setRegionLabel('Nation');
    } else {
      setRegionLabel('Region'); 
    }

    if (selectedCountry === 'All') {
      setDynamicRegions([]); 
    } else {
      const availableRegions = getRegionOptions(selectedCountry);
      setDynamicRegions(availableRegions);
    }
  }, [filters.location.country, initialEvents]);

  // const availableCountries = useMemo(() => {
    
  //   if (filters.location.continent === 'All') return CONTINENT_DATA.flatMap(c => c.countries);
  //   return CONTINENT_DATA.find(c => c.continent === filters.location.continent)?.countries || [];
  // }, [filters.location.continent]);

  const availableCountries = useMemo(() => {
    if (filters.location.continent === 'All') {
      return CONTINENT_DATA.flatMap(c => c.countries);
    }

    // Standardize both sides to slug format for the comparison
    const foundContinent = CONTINENT_DATA.find(
      c => slugify(c.continent) === slugify(filters.location.continent)
    );

    return foundContinent ? foundContinent.countries : [];
  }, [filters.location.continent]);
  
  // console.log('Available:', availableCountries)

  const { filteredEvents, activeOptions } = useMemo(() => {

    const geography = {
      continents: new Set<string>(),
      countries: new Set<string>(),
      regions: new Set<string>(),
      towns: new Set<string>(),
      ages: new Set<string>(),
    };

    const attributes = {
      types: new Set<string>(),
      disciplines: new Set<string>(),
      levels: new Set<string>(),
      months: new Set<string>(),
      footwear: new Set<string>(),
    };

    const filtered = initialEvents.filter((event) => {
      const d = event.data;
      const { location: loc, attributes: attr } = filters;
      // const eventMonth = new Date(d.startDate).toLocaleString('en-GB', { month: 'long' }).toLowerCase();
      const eventMonth = d.startDate 
      ? new Date(d.startDate).toLocaleString('en-GB', { month: 'long' }).toLowerCase() 
      : 'unknown';

      const eventContSlug = slugify(d.location.discriminant);
      const filterContSlug = slugify(loc.continent);

  // 1. Geography Check
    const matchContinent = loc.continent === 'All' || eventContSlug === filterContSlug;
    const matchCountry = loc.country === 'All' || d.location.value?.discriminant === loc.country;
    const matchRegion = loc.region === 'All' || d.location.value?.value === loc.region;

      // const matchContinent = loc.continent === 'All' || d.location.discriminant === loc.continent;

      // const matchCountry = loc.country === 'All' || d.location.value?.discriminant === loc.country;

      // const matchRegion = loc.region === 'All' || d.location.value?.value === loc.region;
      
      const searchStr = loc.townCity.toLowerCase().trim();
      const matchTown = !searchStr || d.townCity.toLowerCase().includes(searchStr.split(',')[0]);

      const isLocationMatch = matchContinent && matchCountry && matchRegion && matchTown;
      const countrySlug = d.location.value?.discriminant;

      // 2. Populate Dropdown Logic
      geography.continents.add(d.location.discriminant);
      if (matchContinent && matchTown && countrySlug) {
        geography.countries.add(countrySlug);
      }

      if (matchContinent && matchCountry && matchTown) {
        const regionSlug = d.location.value?.value;
        if (regionSlug) geography.regions.add(regionSlug);
      }

      if (isLocationMatch) {
        attributes.types.add(d.eventType.toLowerCase());
        attributes.disciplines.add(d.skateDiscipline?.toLowerCase() ?? '');
        attributes.levels.add(d.skillLevel?.toLowerCase() ?? '');
        attributes.months.add(eventMonth);
        attributes.footwear.add(d.footwear.toLowerCase());
        geography.ages.add(d.minAge ?? '');
      }

      // 3. Final Boolean Check
      const matchDiscipline = attr.skateDiscipline === 'All' || d.skateDiscipline === attr.skateDiscipline;
      const matchType = attr.eventType === 'All' || d.eventType === attr.eventType;
      const matchMonth = attr.month === 'All' || eventMonth === attr.month.toLowerCase();
      const matchLevel = attr.skillLevel === 'All' || d.skillLevel === attr.skillLevel;
      const matchAge = attr.minAge === 'All' || d.minAge === attr.minAge;
      const matchFootwear = attr.footwear === 'All' || d.footwear === attr.footwear;
      

      return isLocationMatch && matchDiscipline && matchType && matchFootwear && matchMonth && matchLevel && matchAge;
    });

    return { filteredEvents: filtered, activeOptions: { ...geography, ...attributes } };
  }, [initialEvents, filters]);

  const renderOptions = (
    constantList: readonly { value: string; label: string }[],
    activeSet: Set<string>
  ) => {
    return constantList.map((item) => {
      const isDefault = item.value === 'All' || item.value === '';
      
      const isDisabled = !isDefault && !activeSet.has(item.value.toLowerCase());
      
      return (
        <option 
          key={item.value} 
          value={item.value} 
          disabled={isDisabled}
          className={isDisabled ? 'option-disabled' : ''}>
          {item.label} {isDisabled ? '(0)' : ''}
        </option>
      );
    });
  };

 
  // ---  HANDLERS ---
  const handleFilterChange = (
    group: keyof FilterState, // 'location' | 'attributes', 
    key: string, 
    value: string
    ) => {
      setFilters(prev => {const updatedGroup = { 
          ...prev[group], 
          [key]: value 
        };

        if (group === 'location') {
          const locGroup = updatedGroup as LocationContext;

          if (key === 'continent') {
            locGroup.country = 'All';
            locGroup.region = 'All';
            locGroup.townCity = '';
          } else if (key === 'country') {
            locGroup.region = 'All';
            locGroup.townCity = '';
          }
        }

      const newFilters = {
        ...prev,
        [group]: updatedGroup
      };

      updateURLParams(newFilters);
      
      return newFilters;
    });

    setCurrentPage(1);
  };

  const updateURLParams = (state: FilterState) => {
    const params = new URLSearchParams();
    
    const flat = { ...state.location, ...state.attributes };

    Object.entries(flat).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== '') {
        params.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const newFilters = JSON.parse(JSON.stringify(INITIAL_FILTERS));

  Object.keys(newFilters.location).forEach((key) => {
    const val = params.get(key);
    if (val) (newFilters.location as any)[key] = val;
  });

  Object.keys(newFilters.attributes).forEach((key) => {
    const val = params.get(key);
    if (val) newFilters.attributes[key] = val;
  });

  setFilters(newFilters);
}, []); 

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);

    window.history.replaceState({}, '', window.location.pathname);
  };

  // ---  PAGINATION LOGIC ---
  //totalPages = FILTERED list, ! initial list.
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isvisible, setIsVisible] = useState(false);

  const expandFilters = () => {

    setIsExpanded(prev => !prev);
    setIsVisible(prev => !prev);
  }

  
  // ------------- CLIENT RETURN/TSX

  return (
    <div className="events-wrapper">
        <h5 id='filter-title'>Filter your Skate Events:</h5>
        

      <section className="filter-bar" aria-labelledby='filter-title'>

      
        <div className={`filter-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {/* <div className="filter-section"> */}

          <fieldset className='filter-field location-fields'>
          <div className="divider"><span>A&#41; Search Town, Region or Country:</span></div>
            <legend className='srOnly'>Location Filters </legend>

            <LocationSearch 
              locationFilters={filters.location} 
              onLocationChange={(key, val) => handleFilterChange('location', key, val)}
              initialEvents={initialEvents}
            />
            
            <div className="divider"><span>OR B&#41; Filter locations:</span></div>

            <div className='filter-group'>
              <label htmlFor='continent-select' className='input-label'>Continent: </label>
              <select value={filters.location.continent} onChange={(e) => handleFilterChange('location', 'continent', e.target.value)}
                id='continent-select' aria-label='Select a continent' className='input-box'>
                <option value="All">Any Continent</option>
                {renderOptions(continentOptions, activeOptions.continents)}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="country-select" className='input-label'>Country:</label>
              <select value={filters.location.country} onChange={(e) => handleFilterChange('location', 'country', e.target.value)}
                id='country-select' className='input-box'>
                <option value="All">Any Country</option>
                {availableCountries
                  .filter(opt => activeOptions.countries.has(opt.value)) 
                  .map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))
                }
              </select>
            </div>
          
            <div className="filter-group">
              <label htmlFor="region-select" className='input-label'>Region</label>
              <select value={filters.location.region} onChange={(e) => handleFilterChange('location','region', e.target.value)}
                id='region-select' className='input-box' aria-label=''>
                <option value="All">Any {regionLabel}</option>
                {dynamicRegions
                  .filter(reg => activeOptions.regions.has(reg.value))
                  .map(reg => (
                    <option key={reg.value} value={reg.value}>{reg.label}</option>
                  ))}
              </select>
            </div>

          </fieldset>

          <div className='filter-field attribute-fields'>
            <p className='srOnly'>Attribute field</p>

            <div className="filter-group">
              <label htmlFor='month-select' className='input-label'>Choose When:</label>
              <select value={filters.attributes.month} onChange={(e) => handleFilterChange('attributes', 'month', e.target.value)} 
                id='month-select' className='input-box'>
                <option value="All">Any Month</option>
                {renderOptions(MONTH_ORDER, activeOptions.months)}
              </select>
            </div>


            <div className="filter-group">

              <label htmlFor="event-select" className='input-label'>Event Type:</label>
              <select value={filters.attributes.eventType} onChange={(e) => handleFilterChange('attributes', 'eventType', e.target.value)}
                id='event-select' className='input-box'>
                <option value="All">Any Event Type</option>
                {renderOptions(EVENT_TYPE, activeOptions.types)}
              </select>
            </div>

            <div className="filter-group" >
              <label htmlFor='discipline-select' className='input-label'>Skate Discipline:</label>
              <select 
                value={filters.attributes.skateDiscipline}
                onChange={(e) => handleFilterChange('attributes', 'skateDiscipline', e.target.value)}
                id='discipline-select'
                className='input-box'
                >
                <option value="All">All Disciplines</option>
                {renderOptions(SKATE_DISCIPLINES, activeOptions.disciplines)}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor='footwear-select' className='input-label'>Footwear:</label>
              <select 
                value={filters.attributes.footwear}
                onChange={(e) => handleFilterChange('attributes', 'footwear', e.target.value)}
                id='footwear-select'
                className='input-box'
                >
                <option value="All">All Footwear</option>
                {renderOptions(FOOTWEAR_CHOICE, activeOptions.footwear)}
              </select>
              </div>

            <div className="filter-group">
              <label htmlFor='skill-select' className='input-label'>Level:</label>
              <select value={filters.attributes.skillLevel} onChange={(e) => handleFilterChange('attributes', 'skillLevel', e.target.value)}
                id='skill-select' className='input-box'>
                <option value="All">Any Level</option>
                {renderOptions(SKILL_LEVEL, activeOptions.levels)}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor='age-select' className='input-label'>Age</label>
              <select value={filters.attributes.minAge} onChange={(e) =>     handleFilterChange('attributes', 'minAge', e.target.value)} className='input-box' id='age-select'>
                <option value="All">Any Age</option>
                {serverOptions.minAge.map(age => (
                  <option key={age} value={age}>{age}+</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        <div className='button-div'>
          <button id='clear-filters-button' className={` reset-button ${isvisible ? 'hidden' : 'visible'}`} onClick={handleReset} aria-label='Clear All Filters'>
            Clear All Filters
          </button>

          <button 
            className={`expand-filter-button ${isExpanded ? 'active' : ''}`} 
            onClick={expandFilters}
            aria-expanded={isExpanded}
            aria-controls="filter-section reset-button"
            aria-label='Open Filters Doc'
            >
            {isExpanded ? 'Close Filters' : 'Show Filters'}
          </button>
          </div>

      </section>
      
      <div className="results-meta">
        <p>
          Showing <strong className='highlight'>{filteredEvents.length}</strong> 
          {filteredEvents.length === 1 ? ' event' : ' events'}
          {filters.location.townCity && ` in ${filters.location.townCity}`}
        </p>
        <div aria-live="polite" className="srOnly">
          {filteredEvents.length} events found.
        </div>
      </div>

      <section className="event-grid">
        {visibleEvents && (<span className='scroll-hint'> ~ Scroll Start ~ </span>)}
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
        {visibleEvents && (<span className='scroll-hint'> * Scroll End * </span>)}
        
      </section>
    
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button disabled={!canGoBack} onClick={() => setCurrentPage(p => p - 1)} aria-label="Previous Page">Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={!canGoForward} onClick={() => setCurrentPage(p => p + 1)} aria-label="Next Page">Next</button>
        </div>
      )}
    </div>
  );

}
