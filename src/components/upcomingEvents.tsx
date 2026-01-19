//pseudo code::
  // 1. IMPORTS
  // 2. TYPES (FilterState, Props)
  // 3. INITIAL_FILTERS

  // 4. SUB-COMPONENT: LocationSearch

  // export default function UpcomingEvents(...) {
  // 5. STATE: filters, currentPage
  
  // 6. DERIVED GEOGRAPHY (useMemo)
  // Calculate dynamicRegions based on filters.country
  // Calculate dynamicTowns based on filters.country + filters.region
  
  // 7. FILTERING ENGINE (The big useMemo)
  // Step A: Does it match the geography?
  // Step B: Does it match the skate discipline?
  // Step C: Does it match the boolean (offSkates)?
  
  // 8. PAGINATION CALCS
  // Slice the filteredEvents based on currentPage
  
  // 9. HANDLERS
  // handleFilterChange (Updates state + Syncs URL)
  
  // 10. JSX RETURN
  // Render search bar
  // Render dropdowns (renderOptions)
  // Render the EventGrid
  // Render Pagination
// }

// ------------- IMPORTS AND CONSTANTS
// styles and aesthetics
import '../styles/global.css'
import '../styles/event.css'
import EventCard from './eventcard';

// REACT and CONSTANTS 
import React, { useState, useMemo, useEffect } from 'react';
import type { SearchableSelectProps, SerializedEvent, EventCardData, EventLocation, SelectOption } from '../types';
import { formatEventDate } from '../function/dateHelper';
import { formatLocationLabel } from '../function/stringHelper';

//  DATA 
import { MONTH_ORDER, EVENT_TYPE, SKATE_DISCIPLINES, SKILL_LEVEL, EVENTS_PER_PAGE,  } from '../constants';
import {getRegionOptions, ALL_CONTINENT_VALUES, CONTINENT_DATA } from '../data/globe-constants'

const continentOptions = ALL_CONTINENT_VALUES.map(c => ({
  label: c,
  value: c
}));



// ------------- TYPES AND INTERFACE

interface ServerOptions {
  minAge: string[];
}

interface UpcomingEventsProps {
  initialEvents: SerializedEvent[];
  serverOptions: ServerOptions;
  eventsPerPage?: number;
}

interface FilterState {
  //static
  continent: string;
  country: string;
  region: string; 
  townCity: string;
  month: string;
  eventType: string;
  skateDiscipline: string;
  skillLevel: string;
  // scraped
  minAge: string;
  offSkates: string;
}

interface LocationSearchProps {
  initialEvents: SerializedEvent[];
  onFilterChange: (key: keyof FilterState, value: string) => void;
  value: string; 
}

// ... 

const INITIAL_FILTERS: FilterState = {
  //static location 
  continent: 'All',
  country: 'All',
  region: 'All',
  // dependant^, scraped
  townCity: '', // All
  // static other
  month: 'All',
  eventType: 'All',
  skateDiscipline: 'All',
  skillLevel: 'All',
  // scraped
  minAge: 'All',
  offSkates: 'All',
};
// ------------- COMPONENT FUNCTION

// ----- SEARCHSELECT
export const SearchableSelect = ({ label, value, options, onChange, placeholder, disabled }: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync searchTerm with current value when it changes
  useEffect(() => {
    const currentOption = options.find(o => o.value === value);
    setSearchTerm(currentOption ? currentOption.label : value === 'All' ? '' : value);
  }, [value, options]);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <div className={`searchable-select ${disabled ? 'disabled' : ''}`}>
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow clicks
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="options-list">
          {filteredOptions.map(opt => (
            <li key={opt.value} onClick={() => onChange(opt.value)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ---- LOCATION DATA 
export const LocationSearch = ({ initialEvents, onFilterChange, value }: LocationSearchProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
      if (value === '' || value === 'All') {
        setInputValue('');
      }
    }, [value]);

  const locationSuggestions = useMemo(() => {
    const rawSuggestions = initialEvents.map(event => {
      const { townCity, location } = event.data;
      const labels = formatLocationLabel(location);
      
      
      return {
        label: `${townCity}, ${labels.full}`,
        values: {
          townCity,
          country: location.discriminant,
          region: location.value || 'All'
        }
      };
    });

    const uniqueSuggestions = rawSuggestions.filter((item, index, self) =>
      index === self.findIndex((t) => t.label === item.label)
    );

    return uniqueSuggestions.sort((a, b) => a.label.localeCompare(b.label));
  }, [initialEvents]);

  useEffect(() => {
    const match = locationSuggestions.find(s => s.label === inputValue);
    if (match && match.values.townCity !== value) {
      onFilterChange('country', match.values.country);
      onFilterChange('region', match.values.region);
      onFilterChange('townCity', match.values.townCity);
    }
  }, [inputValue, locationSuggestions, onFilterChange, value]);

  // 4. THE BODY (The Return statement)
  return (
    <div className="location-search-wrapper">
      <input
        type="text"
        list="location-options"
        placeholder="City, Region, or Country..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
      <datalist id="location-options">
        {locationSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.label} />
        ))}
      </datalist>
    </div>
  );
};

// ----- EVENTS DATA
export default function UpcomingEvents({ initialEvents, serverOptions }: UpcomingEventsProps) {
  
  // ---  5. STATE ---
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicRegions, setDynamicRegions] = useState<SelectOption[]>([]);
  const [regionLabel, setRegionLabel] = useState('Region'); //switch "State" and "Nation"

  const availableCountries = useMemo(() => {
    if (filters.continent === 'All') return CONTINENT_DATA.flatMap(c => c.countries);
    return CONTINENT_DATA.find(c => c.continent === filters.continent)?.countries || [];
  }, [filters.continent]);

  const dynamicTowns = useMemo(() => {
    const towns = initialEvents
    .filter((event) => {
      const d = event.data;
      const matchesCountry = filters.country === 'All' || d.location?.discriminant === filters.country;
      
      const matchesRegion = filters.region === 'All' || d.location?.value === filters.region;

      return matchesCountry && matchesRegion;
    })
    .map((event) => event.data.townCity);

  return ['All', ...new Set(towns)].sort();

  }, [filters.country, filters.region, initialEvents]);


  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const d = event.data;
      const loc = d.location; 

    const matchLevel = 
    filters.skillLevel === 'All' || 
    (event.data.skillLevel && event.data.skillLevel === filters.skillLevel);

    const matchAge = 
    filters.minAge === 'All' || 
    (event.data.minAge && event.data.minAge === filters.minAge);

    const matchContinent = filters.continent === 'All' || d.continent === filters.continent;

    const matchCountry = filters.country === 'All' || 
    loc.discriminant.toLowerCase().includes(filters.country.toLowerCase());

    const matchRegion = filters.region === 'All' || 
      (loc.value && loc.value.toLowerCase().includes(filters.region.toLowerCase()));

    const matchTown = filters.townCity === '' || 
      d.townCity.toLowerCase().includes(filters.townCity.toLowerCase());

    const matchDiscipline = filters.skateDiscipline === 'All' || d.skateDiscipline === filters.skateDiscipline;

    const matchType = filters.eventType === 'All' || d.eventType === filters.eventType;

    const matchOffSkates = filters.offSkates === 'All' ? true : 
      filters.offSkates === 'Off-Skates' ? d.offSkates === true : d.offSkates === false;

      const matchMonth = filters.month === 'All' || (() => {
        const eventMonth = new Date(d.startDate).toLocaleString('en-GB', { month: 'long' }).toLowerCase();
        return eventMonth === filters.month;
      })();


    return matchContinent && matchCountry && matchRegion && matchTown && matchDiscipline && matchType && matchOffSkates && matchAge && matchLevel && matchMonth ;

      
    });
  }, [filters, initialEvents]);


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
      continent: getActiveSet('continent'),
      countries: new Set(initialEvents.map(e => e.data.location.discriminant)),
      regions: new Set(initialEvents.map(e => e.data.location.value).filter(Boolean)),
      types: getActiveSet('eventType'),
      disciplines: getActiveSet('skateDiscipline'),
      levels: getActiveSet('skillLevel'),
      months: new Set(
        initialEvents.map(e => 
          new Date(e.data.startDate)
          .toLocaleString('en-GB', { month: 'long' })
          .toLowerCase()
        )
      )
    };
  }, [initialEvents]);

  useEffect(() => {
    const countryValue = filters.country;

    // 1. Reset the region filter whenever the country changes
    setFilters(prev => ({ ...prev, region: 'All' }));

    // 2. Fetch the correct regions (Level 3)
    const options = getRegionOptions(countryValue);
    setDynamicRegions(options);

    // 3. Optional: Dynamic Labeling for better UX
    if (countryValue === 'united-states') {
      setRegionLabel('State');
    } else if (countryValue === 'united-kingdom') {
      setRegionLabel('Nation');
    } else if (countryValue === 'canada') {
      setRegionLabel('Province');
    }else {
      setRegionLabel('Region');
    }

  }, [filters.country]);

  const renderOptions = (
    constantList: readonly { readonly value: string; readonly label: string }[],
    activeSet: Set<string>
  ) => {
    return constantList.map((item) => {
      // 1. "All" or "Any" should NEVER be disabled, otherwise users get stuck
      const isDefault = item.value === 'All' || item.value === '';
      
      // 2. Disable if not in the set AND it's not the default option
      const isDisabled = !isDefault && !activeSet.has(item.value);

      return (
        <option key={item.value} value={item.value} disabled={isDisabled}>
          {item.label} {isDisabled ? '(0)' : ''}
        </option>
      );
    });
  };

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const updatedFilters = { ...INITIAL_FILTERS };
      
      (Object.keys(INITIAL_FILTERS) as Array<keyof FilterState>).forEach(key => {
        const val = params.get(key);
        if (val) updatedFilters[key] = val;
      });
      
      setFilters(updatedFilters);
    }, []); 
  
  // ---  HANDLERS ---
  const handleFilterChange = (key: keyof FilterState, value: string) => {
  setFilters(prev => {
    const newFilters = { ...prev, [key]: value };
    
    if (key === 'continent') {
      newFilters.country = 'All';
      newFilters.region = 'All';
      newFilters.townCity = '';
    } else if (key === 'country') {
      newFilters.region = 'All';
      newFilters.townCity = '';
    } else if (key === 'region') {
      newFilters.townCity = '';
    }

    const params = new URLSearchParams(window.location.search);
    
    Object.entries(newFilters).forEach(([fKey, fVal]) => {
      if (fVal === 'All' || fVal === '') {
        params.delete(fKey);
      } else {
        params.set(fKey, fVal);
      }
    });

    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    
    return newFilters;
  });
  
    setCurrentPage(1); // Crucial: Always go back to page 1
  };

  // handleReset
  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);

    window.history.replaceState({}, '', window.location.pathname);
  };

  // ---  PAGINATION LOGIC ---
  //totalPages must be calculated from the FILTERED list, not the initial list.
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(start, start + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;
  
  // ------------- CLIENT RETURN/TSX

  return (
    <div className="events-page-wrapper">
      <section className="filter-bar">
        <span>Filter your Skate Events</span>
      
      <div className='filter-group'>
        <label>A&#41; Search Town, Region, or Country</label>
        <LocationSearch 
          initialEvents={initialEvents} 
          onFilterChange={handleFilterChange} 
          value={filters.townCity}
        />
        <span>OR</span>
        <label>B&#41; Choose in order: Continent, Country, Region, Town/City</label>
        <select value={filters.continent} onChange={(e) => handleFilterChange('continent', e.target.value)}>
          <option value="All">Any Continent</option>
          {renderOptions(continentOptions, activeFilterValues.continent)}
        </select>

        <select value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
          <option value="All">Any Country</option>
          {renderOptions(availableCountries, activeFilterValues.countries)}
        </select>
        
        
        <span className='caption'>Region/City will appear once 'Country' is selected</span>
        <select value={filters.region} onChange={(e) => handleFilterChange('region', e.target.value)}>
          <option value="All">Any {regionLabel}</option>
          {dynamicRegions.map(reg => (
            <option key={reg.value} value={reg.value}>{reg.label}</option>
          ))}
        </select>

        <select value={filters.townCity} onChange={(e) => handleFilterChange('townCity', e.target.value)}>
          <option value="All">Any City</option>
          {dynamicTowns.map(t => <option key={t} value={t}>{t}</option>)}
        </select>


      </div>

      <div className='filter-group'>
        
        <span>Choose When:</span>
        <select value={filters.month} onChange={(e) => handleFilterChange('month', e.target.value)}>
          <option value="All">Any Month</option>
          {renderOptions(MONTH_ORDER, activeFilterValues.months)}
        </select>

        <span>Choose What:</span>
        <select value={filters.eventType} onChange={(e) => handleFilterChange('eventType', e.target.value)}>
          <option value="All">Any Event Type</option>
          {renderOptions(EVENT_TYPE, activeFilterValues.types)}
        </select>

        <select value={filters.skateDiscipline} onChange={(e) => handleFilterChange('skateDiscipline', e.target.value)}>
          <option value="All">Any Skate Discipline</option>
          {renderOptions(SKATE_DISCIPLINES, activeFilterValues.disciplines)}
        </select>
        <select 
          value={filters.offSkates} 
          onChange={(e) => handleFilterChange('offSkates', e.target.value)}
        >
          <option value="all"> 'On/Off Skates' </option>
          <option value="skating">🛼 On-Skates Only</option>
          <option value="off-skates">👟 Off-Skates / Socials</option>
        </select>

        <select value={filters.skillLevel} onChange={(e) => handleFilterChange('skillLevel', e.target.value)}>
          <option value="All">Any Level</option>
          {renderOptions(SKILL_LEVEL, activeFilterValues.levels)}
        </select>

        <select value={filters.minAge} onChange={(e) =>     handleFilterChange('minAge', e.target.value)}>
          <option value="All">Any Age</option>
          {serverOptions.minAge.map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>


      </div>

      <button className="reset-button" onClick={handleReset}>
        Clear All Filters
      </button>

      </section>

      <div className="results-meta">
        <p>
          Showing <strong className='highlight'>{filteredEvents.length}</strong> 
          {filteredEvents.length === 1 ? ' event' : ' events'}
          {filters.townCity && ` in ${filters.townCity}`}
        </p>
      </div>

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
    
      {/* Final Pagination (Only need one version) */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button disabled={!canGoBack} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={!canGoForward} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );

}
