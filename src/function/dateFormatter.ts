export const formatEventDate = (startStr: string, endStr: string | null) => {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : null;

  const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
  const fullDateOptions: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };

  if (!end || start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString('en-GB', fullDateOptions);
  }

  // 2. Result: "Jan 20 – 22, 2026"
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = start.toLocaleDateString('en-GB', monthOptions);
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();
    
    return `${month} ${startDay} – ${endDay}, ${year}`;
  }

  // 3. Multi-day event spanning DIFFERENT MONTHS (same year)
  // Result: "Jan 30 – Feb 2, 2026"
  if (start.getFullYear() === end.getFullYear()) {
    const startPart = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const endPart = end.toLocaleDateString('en-GB', fullDateOptions);
    
    return `${startPart} – ${endPart}`;
  }

  // 4. Multi-day event spanning DIFFERENT YEARS
  // Result: "Dec 30, 2025 – Jan 2, 2026"
  return `${start.toLocaleDateString('en-GB', fullDateOptions)} – ${end.toLocaleDateString('en-GB', fullDateOptions)}`;
};