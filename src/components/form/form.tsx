import { useState, useMemo } from 'react';
import { CONTINENT_DATA, getRegionOptions } from '../../data/globe-constants';
import { slugify } from '../../function/stringHelper';
// import { actions } from 'astro:actions'; 

export default function EventForm() {
  // 1. Setup State for the selections
  const [continent, setContinent] = useState(slugify("Europe"));
  const [country, setCountry] = useState("united-kingdom");

  // 2. Derive the lists based on state
  // We use useMemo to avoid re-calculating on every tiny render
  const countryOptions = useMemo(() => {
    const data = CONTINENT_DATA.find((c) => slugify(c.continent) === continent);
    return data?.countries || [];
  }, [continent]);

  const regionOptions = useMemo(() => {
    return getRegionOptions(country);
  }, [country]);

  // 3. Handle Continent Change
  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newContinent = e.target.value;
    setContinent(newContinent);
    
    // Reset country to the first one in the new continent list
    const firstCountry = CONTINENT_DATA.find(c => slugify(c.continent) === newContinent)?.countries[0];
    if (firstCountry) setCountry(firstCountry.value);
  };

  return (
    <form action={actions.submitEvent} method="POST" className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Event Name</label>
        <input name="eventName" type="text" required className="border p-2 w-full" />
      </div>

      <hr />

      {/* LEVEL 1: Continent */}
      <div>
        <label className="block text-sm font-medium">Continent</label>
        <select 
          name="location.discriminant" 
          value={continent}
          onChange={handleContinentChange}
          className="border p-2 w-full"
        >
          {CONTINENT_DATA.map((c) => (
            <option key={c.continent} value={slugify(c.continent)}>
              {c.continent}
            </option>
          ))}
        </select>
      </div>

      {/* LEVEL 2: Country */}
      <div>
        <label className="block text-sm font-medium">Country</label>
        <select 
          name="location.value.discriminant" 
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 w-full"
        >
          {countryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* LEVEL 3: Region (Conditional) */}
      {regionOptions.length > 0 && (
        <div>
          <label className="block text-sm font-medium">Region / State</label>
          <select 
            name="location.value.value.discriminant" 
            className="border p-2 w-full"
          >
            {regionOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Event
      </button>
    </form>
  );
}

//To use this in your Astro page, just remember to add the client:load directive: 
// ---
// import EventForm from '../components/EventForm';
// ---
// <EventForm client:load />
