
export const formatEventDate = (startStr: string, endStr: string | null) => {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : null;

  const fullDateOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };

  // 1. If there is no end date, or end date is the same as start date
  if (!end || start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString('en-GB', fullDateOptions);
  }

  // 2. If they are in the same month: Jan 20 - 22, 2026
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const startDay = start.getDate();
    return `${start.toLocaleDateString('en-GB', { month: 'short' })} ${startDay} - ${end.toLocaleDateString('en-US', fullDateOptions)}`;
  }

  // 3. Different months or years: Jan 30 - Feb 2, 2026
  return `${start.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', fullDateOptions)}`;
};
