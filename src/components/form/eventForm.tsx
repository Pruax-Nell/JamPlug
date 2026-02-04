import { useState } from 'react';
import { CONTINENT_DATA, getRegionOptions } from '../../data/globe-constants';
import { slugify } from '../../function/stringHelper';

export default function EventForm() {
  const [continent, setContinent] = useState('europe');
  const [country, setCountry] = useState('united-kingdom');

  // Find the country list for the selected continent
  const currentContinentData = CONTINENT_DATA.find(c => slugify(c.continent) === continent);
  const countryOptions = currentContinentData?.countries || [];

  // Check if the current country selection has regions
  const regionOptions = getRegionOptions(country);

  return (
    <form method="POST">
      {/* 1. Continent Selector */}
      <select 
        name="location.discriminant" 
        onChange={(e) => setContinent(e.target.value)}
      >
        {CONTINENT_DATA.map(c => (
          <option value={slugify(c.continent)}>{c.continent}</option>
        ))}
      </select>

      {/* 2. Country Selector - Dynamically filtered */}
      <select 
        name="location.value.discriminant" 
        onChange={(e) => setCountry(e.target.value)}
      >
        {countryOptions.map(c => (
          <option value={c.value}>{c.label}</option>
        ))}
      </select>

      {/* 3. Region Selector - Only shows if relevant */}
      {regionOptions.length > 0 && (
        <select name="location.value.value.discriminant">
          {regionOptions.map(r => (
            <option value={r.value}>{r.label}</option>
          ))}
        </select>
      )}
    </form>
  );
}

//Use it in your Astro Page:

// ---
// // src/pages/submit-event.astro
// import EventForm from '../components/EventForm.tsx';
// ---

// <html>
//   <body>
//     <EventForm client:load />
//   </body>
// </html>