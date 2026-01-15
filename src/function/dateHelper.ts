// src/utils/dateHelpers.ts

/**
 * Formats Keystatic time object {hour, minute} to "12:00 PM"
 */
export function formatTime(timeObj: { hour: string; minute: string } | any) {
  if (!timeObj || typeof timeObj !== 'object') return '';
  const h = parseInt(timeObj.hour);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  return `${displayHour}:${timeObj.minute.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Formats a single date or a range into a readable string
 */
export const formatEventDate = (startStr: string | Date, endStr?: string | Date | null) => {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : null;

  const fullDateOptions: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short',  
    year: 'numeric' 
  };

  // 1. Single day or no end date
  if (!end || start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString('en-GB', fullDateOptions);
  }

  // 2. Same month range: "Jan 20 – 22, 2026"
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = start.toLocaleDateString('en-GB', { month: 'short' });
    return `${month} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
  }

  // 3. Different months, same year: "Jan 30 – Feb 2, 2026"
  if (start.getFullYear() === end.getFullYear()) {
    const startPart = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return `${startPart} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
  }

  // 4. Different years
  return `${start.toLocaleDateString('en-GB', fullDateOptions)} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
};