// src/utils/dateHelpers.ts

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

// export function formatDate(date: Date): string {
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   };

//   return new Date(date).toLocaleDateString(undefined, options);
// }
// src/function/dateHelper.ts

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return d.toLocaleDateString(undefined, options);
}

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

export const formatFestivalDate = (startStr: string | Date, endStr?: string | Date | null) => {
  try {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : null;

    // Check if start date is actually valid
    if (isNaN(start.getTime())) return 'Date TBC';

    const fullDateOptions: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long',  
      year: 'numeric' 
    };

    // 1. Single day or no end date
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-GB', fullDateOptions);
    }

    // 2. Same month range: "20 – 22 Jan 2026"
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      const month = start.toLocaleDateString('en-GB', { month: 'long' });
      return `${start.getDate()} – ${end.getDate()} ${month}`;
    }

    // 3. Different months, same year: "30 Jan – 2 Feb 2026"
    if (start.getFullYear() === end.getFullYear()) {
      const startPart = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
      const endPart = end.toLocaleDateString('en-GB', fullDateOptions);
      return `${startPart} – ${endPart}`;
    }

    // 4. Different years
    return `${start.toLocaleDateString('en-GB', fullDateOptions)} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
  } catch (e) {
    return 'Date TBC';
  }
};

export const getCalendarUrls = (eventData: any) => {
  try {
    // Ensure we are working with Date objects
    const start = new Date(eventData.startDate);
    // Fallback to start if no end date
    const end = eventData.endDate ? new Date(eventData.endDate) : start;
    
    if (isNaN(start.getTime())) throw new Error("Invalid Start Date");

    const formatCalDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const sStr = formatCalDate(start);
    const eStr = formatCalDate(end);

    const title = encodeURIComponent(eventData.eventName || 'Event');
    const description = encodeURIComponent(eventData.description || "");
    // Use rink if available, otherwise just townCity
    const locationStr = eventData.rink ? `${eventData.townCity}, ${eventData.rink}` : eventData.townCity;
    const location = encodeURIComponent(locationStr || "");

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${sStr}/${eStr}&details=${description}&location=${location}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${eventData.eventName}`,
      `DTSTART:${sStr}`,
      `DTEND:${eStr}`,
      `LOCATION:${locationStr}`,
      `DESCRIPTION:${eventData.description || ""}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT24H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    // Safe Base64 for UTF-8 characters (handles accents/emojis in event names)
    const base64Content = btoa(unescape(encodeURIComponent(icsContent)));
    const icsDataUri = `data:text/calendar;base64,${base64Content}`;

    return { googleUrl, icsDataUri };
  } catch (e) {
    console.error("Calendar Link Error:", e);
    return { googleUrl: '#', icsDataUri: '#' };
  }
};