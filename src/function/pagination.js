import React, { useState, useMemo, useEffect } from 'react';

// Configuration constants
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
    // 1. Initial State (Safe Array and Filter States)
    const safeEvents = events || [];
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [currentPage, setCurrentPage] = useState(1);

    // 2. Derive Unique Filter Options from Data
    const uniqueOptions = useMemo(() => {
        const options = {
            country: new Set(),
            eventType: new Set(),
            skateDiscipline: new Set(),
            minAge: new Set(),
            skillLevel: new Set(),
            month: new Set(),
        };

        safeEvents.forEach(event => {
            const data = event.data;
            options.country.add(data.country);
            options.eventType.add(data.eventType);
            options.skateDiscipline.add(data.skateDiscipline);
            options.minAge.add(data.minAge);
            options.skillLevel.add(data.skillLevel);
            // Extract month name (e.g., "January", "February")
            const date = new Date(data.startDate);
            options.month.add(date.toLocaleString('en-US', { month: 'long' }));
        });

        // Convert Sets to sorted Arrays, prepending 'All'
        return Object.fromEntries(
            Object.entries(options).map(([key, set]) => [
                key,
                ['All', ...Array.from(set).filter(Boolean).sort()]
            ])
        );
    }, [safeEvents]);

    // 3. CORE FILTERING LOGIC (Runs when filters change)
    const filteredEvents = useMemo(() => {
        return safeEvents.filter(event => {
            const data = event.data;
            const date = new Date(data.startDate);
            const eventMonth = date.toLocaleString('en-US', { month: 'long' });

            // Apply AND logic across all 6 filters
            const matchesCountry = filters.country === 'All' || data.country === filters.country;
            const matchesType = filters.eventType === 'All' || data.eventType === filters.eventType;
            const matchesDiscipline = filters.skateDiscipline === 'All' || data.skateDiscipline === filters.skateDiscipline;
            const matchesAge = filters.minAge === 'All' || data.minAge === filters.minAge;
            const matchesSkill = filters.skillLevel === 'All' || data.skillLevel === filters.skillLevel;
            const matchesMonth = filters.month === 'All' || eventMonth === filters.month;

            return matchesCountry && matchesType && matchesDiscipline && matchesAge && matchesSkill && matchesMonth;
        });
    }, [safeEvents, filters]);

    // 4. PAGINATION LOGIC (Runs when filteredEvents or page changes)
    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
        const endIndex = startIndex + EVENTS_PER_PAGE;
        return filteredEvents.slice(startIndex, endIndex);
    }, [filteredEvents, currentPage]);

    // 5. EFFECTS: Reset page to 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // --- Handlers ---
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            document.getElementById('events-filter-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Placeholder for EventCard (Astro component structure cannot be imported into React)
    const EventCardStub = ({ post }) => (
        <a 
            href={`/events/${post.slug || post.id}/`} 
            className="block p-4 bg-white border-l-4 border-indigo-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label={`View details for ${post.data.eventName}`}
        >
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{post.data.eventName}</h3>
            <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-medium">{post.data.country}</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">{post.data.eventType}</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">{new Date(post.data.startDate).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 line-clamp-3">{post.data.description}</p>
        </a>
    );

    // Render helper for dropdowns
    const renderSelect = (name, label, options) => (
        <div className="flex flex-col min-w-[120px]">
            <label className="text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
            <select
                value={filters[name]}
                onChange={(e) => handleFilterChange(name, e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div id="events-filter-section" className="space-y-8">
            
            {/* FILTER UI BAR */}
            <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
                    {/* Render all six filter dropdowns */}
                    {renderSelect('country', 'Country', uniqueOptions.country)}
                    {renderSelect('eventType', 'Event Type', uniqueOptions.eventType)}
                    {renderSelect('skateDiscipline', 'Discipline', uniqueOptions.skateDiscipline)}
                    {renderSelect('minAge', 'Age Limit', uniqueOptions.minAge)}
                    {renderSelect('skillLevel', 'Skill Level', uniqueOptions.skillLevel)}
                    {renderSelect('month', 'Month', uniqueOptions.month)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium text-gray-600">
                    Showing {filteredEvents.length} total results.
                </div>
            </div>

            {/* EVENT GRID */}
            <div className="event-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedEvents.length > 0 ? (
                    paginatedEvents.map((post) => (
                        <EventCardStub key={post.slug || post.id} post={post} />
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-lg">
                        No upcoming events match the current filter selection.
                    </div>
                )}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
                <nav className="flex justify-center items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
                    >
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {/* Simple page numbers display */}
                        <span className="px-3 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
                    >
                        Next
                    </button>
                </nav>
            )}
        </div>
    );
};

export default EventFilters;