
export const slugify = (str: string) => 
  str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

// src/utils/stringHelper.ts
// make sure your COUNTRY_MAP includes all the countries you expect to feature regularly.
// // In your component
// const loc = formatLocationLabel(event.data.location);
// const displayString = `${event.data.townCity}, ${loc.full}`; 
// Result: "London, England, UK"

const COUNTRY_MAP: Record<string, string> = {
  'united-kingdom': 'UK',
  'united-states-of-america': 'USA',
  'canada': 'Canada',
  'australia': 'Australia'
};

export function formatLocationLabel(location: { discriminant: string; value?: string | null }) {
  // 1. Get the Country Label
  const country = COUNTRY_MAP[location.discriminant] || 
    location.discriminant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // 2. Get the Region Label (Remove prefixes like 'uk-' or 'us-')
  let region = '';
  if (location.value) {
    region = location.value
      .replace(/^[a-z]{2,3}-/, '') // Removes us-, uk-, can-, aus-
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return {
    country,
    region,
    full: region ? `${region}, ${country}` : country
  };
}

// <div className="location-wrapper">
//     📍 <p className="location">{post.data.townCity} - {post.data.country}</p>
// </div>

// Take above and change to below (event card)

// import { formatLocation } from '../function/stringHelper';

// // ... inside your map function
// <div className="location-wrapper">
//     <span className="icon">📍</span> 
//     <p className="location">{formatLocation(post.data)}</p>
// </div>