
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



