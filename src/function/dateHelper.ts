// src/utils/dateHelpers.ts

/**
 * Formats Keystatic time object {hour, minute} to "12:00 PM"
 */
// export function formatTime(timeObj: { hour: string; minute: string } | any) {
//   if (!timeObj || typeof timeObj !== 'object') return '';
//   const h = parseInt(timeObj.hour);
//   const ampm = h >= 12 ? 'PM' : 'AM';
//   const displayHour = h % 12 || 12;
//   return `${displayHour}:${timeObj.minute.toString().padStart(2, '0')} ${ampm}`;
// }

export function formatTime(timeObj: any) {
  try {
    if (!timeObj || typeof timeObj !== 'object') return '';
    const h = parseInt(timeObj.hour);
    if (isNaN(h)) return ''; // Fail-safe if hour isn't a number
    
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${timeObj.minute.toString().padStart(2, '0')} ${ampm}`;
  } catch (e) {
    return ''; // Return empty string instead of crashing
  }
}

/**
 * Formats a single date or a range into a readable string
 */
// export const formatEventDate = (startStr: string | Date, endStr?: string | Date | null) => {
//   const start = new Date(startStr);
//   const end = endStr ? new Date(endStr) : null;

//   const fullDateOptions: Intl.DateTimeFormatOptions = { 
//     day: 'numeric', 
//     month: 'short',  
//     year: 'numeric' 
//   };

export const formatEventDate = (startStr: string | Date, endStr?: string | Date | null) => {
  try {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : null;

    // Check if start date is actually valid
    if (isNaN(start.getTime())) return 'Date TBC';

    const fullDateOptions: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short',  
      year: 'numeric' 
    };

    // 1. Single day or no end date
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-GB', fullDateOptions);
    }

    // 2. Same month range: "20 – 22 Jan 2026"
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      const month = start.toLocaleDateString('en-GB', { month: 'short' });
      return `${start.getDate()} – ${end.getDate()} ${month} ${start.getFullYear()}`;
    }

    // 3. Different months, same year: "30 Jan – 2 Feb 2026"
    if (start.getFullYear() === end.getFullYear()) {
      const startPart = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const endPart = end.toLocaleDateString('en-GB', fullDateOptions);
      return `${startPart} – ${endPart}`;
    }

    // 4. Different years
    return `${start.toLocaleDateString('en-GB', fullDateOptions)} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
  } catch (e) {
    return 'Date TBC';
  }
};

//   if (!end || start.toDateString() === end.toDateString()) {
//     return start.toLocaleDateString('en-GB', fullDateOptions);
//   }

//   if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
//     const month = start.toLocaleDateString('en-GB', { month: 'short' });
//     return `${start.getDate()} – ${end.getDate()} ${month} ${start.getFullYear()}`;
    
//   }

//   if (start.getFullYear() === end.getFullYear()) {
//     const startPart = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
//     return `${startPart} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
//   }

//   return `${start.toLocaleDateString('en-GB', fullDateOptions)} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
// };


export const generateCalendarLink = (event: any) => {
  const { eventName, description, startDate, startTime, location, townCity } = event.data;

  // Format date/time to YYYYMMDDTHHMMSSZ
  const formatForCal = (dateStr: string, timeObj: any) => {
    const d = new Date(dateStr);
    const hh = timeObj.hour.padStart(2, '0');
    const mm = timeObj.minute.padStart(2, '0');
    return d.toISOString().replace(/-/g, '').split('T')[0] + `T${hh}${mm}00Z`;
  };

  const start = formatForCal(startDate, startTime);
  const loc = `${townCity}, ${location.value || ''}, ${location.discriminant}`;

  // The .ics template
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${eventName}`,
    `DESCRIPTION:${description || ''}`,
    `LOCATION:${loc}`,
    `DTSTART:${start}`,
    `DTEND:${start}`, // You can calculate end time similarly
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
};