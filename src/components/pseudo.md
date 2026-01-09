// --- ... --- //
    PSEUDO CODE for Event Pagination
// --- ... --- //


// --- EVENT DATA = Filters  --- //

1. get collection - filter
status: draft / published
startDate: a, b = order
    1-a. 
    isFeatured: ------  true/false || VISUAL  <!-- BACKEND ONLY ...  -->
    --- [ ] empty lists get greyed out || VISUAL  

2. dynamic page filters - mapping 
offSkates: ------ STATIC 
skillLevel: ------ STATIC 
skateDiscipline: ------ STATIC 
eventType: ------ STATIC 

country: ------  STATIC 
    townCity: ------ DYNAMIC string()

minAge: ------ DYNAMIC string()
featuredRink: ------ DYNAMIC string()

3. pagination

// --- ... --- //
<!-- PSEUDO -->

Data collection
- receive EVENTS list
- define ITEMS_PER_PAGE
state
- define ITNITIAL_FILTERS 'All'
- state * filters , currentPage [0]

Scanner
- calculate uniqueOptions: 
    view all EVENTS
    curate lists (countries, towns, types etc = conditional listing)
    create map of towns grouped by Country
    name cleanup toLowerCase etc
    add 'All' to every list 

normalise
// normalise
const normalizeName = (name) => {
  if (!name) return "";
  return name
    .trim()
    .replace(/\s+/g, ' ') // Collapses multiple spaces into one
    .split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
};

Filtering Logic

- calculate filteredEvents:
    forEach event
    does data match filter || 'all'
    keep events that pass, remove else

pagination
- calculate totalCount of events
- calculate totalPages (totalCount / ITEMS_PER_PAGE)
- calculate visibleEvents (currentPage - 1) * ITEMS_PER_PAGE
    + find the end (start + ITEMS_PER_PAGE)
    + .slice() filteredEvents 



Handlers
- onChange :
    update filters state
    update URL sync to match
    save to localStorage? maybe...
    reset currentPage back to 1[0]
        when page changes, update currentPage and scroll back to pageTop

Interface
- show filter dropdowns - built by uniqueOptions
- check capacity for conditional css
- show results .map()<EventCard> visibleEvents
- show pagination buttons and page numbers


// --- ... --- //

    1.
array of event objects from 'events' collection to be passed through and data to be filtered by:
-country[]>-townCity(dependent), 
-month[], -eventType[], -skateDiscipline,
-skillLevel?, -ParticipationLevel?, -minAge?,

// --- ... --- //

visual disabling / capacity based filtering

change the ui based on the list  capacity.

need two lists:
1. full list | all choices
2. active list | availiable choices (have options)

<<jsx>>
const filterCapacity = useMemo(() => {
  // 1. Create containers for what is "currently available"
  const active = {
    eventType: new Set(),
    skateDiscipline: new Set(),
    skillLevel: new Set(),
    month: new Set(),
  };

  // 2. Scan ONLY the events that passed the gate (filteredEvents)
  filteredEvents.forEach((event) => {
    const d = event.data;
    if (d.eventType) active.eventType.add(d.eventType);
    if (d.skateDiscipline) active.skateDiscipline.add(d.skateDiscipline);
    if (d.skillLevel) active.skillLevel.add(d.skillLevel);
    
    if (d.startDate) {
      const m = new Date(d.startDate).toLocaleString('en-GB', { month: 'long' });
      active.month.add(m);
    }
  });

  return active;
}, [filteredEvents]); // Re-calculates every time the results change

<<return/jsx>>
// Inside your return/JSX
{SKATE_DISCIPLINES.map((discipline) => {
  // Check if this discipline exists in our current "active" scan
  const isAvailable = filterCapacity.skateDiscipline.has(discipline.value);

  return (
    <button
      key={discipline.value}
      disabled={!isAvailable}
      style={{
        opacity: isAvailable ? 1 : 0.3,
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        pointerEvents: isAvailable ? 'auto' : 'none'
      }}
      onClick={() => handleFilterChange('skateDiscipline', discipline.value)}
    >
      {discipline.label}
    </button>
  );
})}



// --- ... --- //
// --- ... --- //
<!-- reset filters -->

const resetFilters = () => {
  // 1. Reset the logic state
  setFilters(INITIAL_FILTERS);
  
  // 2. Reset the page to 1
  setCurrentPage(1);
  
  // 3. Clean the URL address bar
  setSearchParams({}); 
  
  // 4. (Optional) Clear LocalStorage if you want a total wipe
  localStorage.removeItem('user_event_filters');
};
// --- ... --- //

<!-- Pagination -->
const ITEMS_PER_PAGE = 10;
const currentPage = 1; // Let  assume we are on page 1

// 1. Calculate the starting index
// If page is 1: (1 - 1) * 10 = 0
// If page is 2: (2 - 1) * 10 = 10
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

// 2. Calculate the ending index
// If page is 1: 0 + 10 = 10 (Slice will take 0-9)
// If page is 2: 10 + 10 = 20 (Slice will take 10-19)
const endIndex = startIndex + ITEMS_PER_PAGE;

// 3. Cut the array
const visibleEvents = filteredEvents.slice(startIndex, endIndex);

const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

// The "Next" button logic
const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

<!-- Status Line" (e.g., "Showing 11-20 of 45 events") -->
const totalResults = filteredEvents.length;
const from = totalResults === 0 ? 0 : startIndex + 1;
const to = Math.min(endIndex, totalResults);

return (
  <div className="results-status">
    <p>
      Showing <strong>{from}-{to}</strong> of <strong>{totalResults}</strong> events
    </p>
  </div>
);

// --- ... --- //
<!-- no events found conditional rendering-->
const filterCapacity = useMemo(() => {
  // 1. Create containers for what is "currently available"
  const active = {
    eventType: new Set(),
    skateDiscipline: new Set(),
    skillLevel: new Set(),
    month: new Set(),
  };

  // 2. Scan ONLY the events that passed the gate (filteredEvents)
  filteredEvents.forEach((event) => {
    const d = event.data;
    if (d.eventType) active.eventType.add(d.eventType);
    if (d.skateDiscipline) active.skateDiscipline.add(d.skateDiscipline);
    if (d.skillLevel) active.skillLevel.add(d.skillLevel);
    
    if (d.startDate) {
      const m = new Date(d.startDate).toLocaleString('en-GB', { month: 'long' });
      active.month.add(m);
    }
  });

  return active;
}, [filteredEvents]); // Re-calculates every time the results change

// Inside your return/JSX
{SKATE_DISCIPLINES.map((discipline) => {
  // Check if this discipline exists in our current "active" scan
  const isAvailable = filterCapacity.skateDiscipline.has(discipline.value);

  return (
    <button
      key={discipline.value}
      disabled={!isAvailable}
      style={{
        opacity: isAvailable ? 1 : 0.3,
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        pointerEvents: isAvailable ? 'auto' : 'none'
      }}
      onClick={() => handleFilterChange('skateDiscipline', discipline.value)}
    >
      {discipline.label}
    </button>
  );
})}

<p>
  Showing {from}-{to} of {totalResults} events 
  <button onClick={resetFilters} className="text-link">(Clear all)</button>
</p>

{filteredEvents.length === 0 ? (
  <div className="no-results-box">
    <h3>🔍 No events found</h3>
    <p>We couldn't find anything matching your current filters.</p>
    
    <button onClick={resetFilters} className="reset-btn">
      Clear all filters
    </button>
  </div>
) : (
  <div className="event-list">
    {/* ... your map function for events goes here ... */}
  </div>
)}

// --- ... --- //
bookmark on URL

useSearchParams

import { useSearchParams } from 'react-router-dom';

// Inside your component:
const [searchParams, setSearchParams] = useSearchParams();

const handleFilterChange = (key, value) => {
  // 1. Get the current list of "bookmarks"
  const newParams = new URLSearchParams(searchParams);
  
  // 2. Update or Remove the bookmark
  if (value === 'All') {
    newParams.delete(key); // Keep the URL clean
  } else {
    newParams.set(key, value);
  }
  
  // 3. Update the address bar (this also triggers the state change)
  setSearchParams(newParams);
  setCurrentPage(1);
};

// --- ... --- //
<!-- ! Low priority for events, but useful elsewhere !  -->
add localStorage to the above URL Syncing 

// 1. SAVING: Every time 'filters' change, whisper them to the browser  memory
useEffect(() => {
  localStorage.setItem('user_event_filters', JSON.stringify(filters));
}, [filters]);

// 2. LOADING: When the component first starts (Initialization)
const getStartingFilters = () => {
  // Check URL first (it  the most important)
  const params = new URLSearchParams(window.location.search);
  if (params.toString()) return null; // Let the URL logic handle it

  // If URL is empty, check LocalStorage
  const saved = localStorage.getItem('user_event_filters');
  return saved ? JSON.parse(saved) : INITIAL_FILTERS;
};

// --- ... --- //
