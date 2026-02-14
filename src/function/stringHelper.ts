
// slug strings "North America" > 'north-america'
export const slugify = (str: string) => 
  str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

// Capitalize the first letter
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Label maker - GEO
export function formatLabel(str: string) {
  return str
    .replace(/^(uk-|us-|can-|aus-)/, '') 
    .replace(/-/g, ' ')                 
    .replace(/\b\w/g, l => l.toUpperCase()); 
}

// for maps 
export function formatLocationString(
  coords: { latitudeCoord: number; longitudecoord: number } | null | undefined,
  precision: number = 2
): string {
  // 1. Safety Check: If coordinates are missing, return a fallback
  if (!coords || coords.latitudeCoord === undefined || coords.longitudecoord === undefined) {
    return "Location pending";
  }

  // 2. Formatting: Use toFixed to control decimal places
  const lat = coords.latitudeCoord.toFixed(precision);
  const lng = coords.longitudecoord.toFixed(precision);

  return `${lat}, ${lng}`;
}

// {mapCoords && (
//   <div id="map" 
//     data-lat={mapCoords.latitudeCoord} 
//     data-lng={mapCoords.longitudecoord}
//   ></div>
// )}