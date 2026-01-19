export const getCalendarUrls = (eventData: any) => {
  // Format dates: YYYYMMDDTHHMMSSZ
  const formatDate = (dateStr: string) => dateStr.replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const start = formatDate(eventData.startDate.toISOString());
  const end = eventData.endDate 
    ? formatDate(eventData.endDate.toISOString()) 
    : start;

  const title = encodeURIComponent(eventData.eventName);
  const details = encodeURIComponent(eventData.description || "");
  const location = encodeURIComponent(`${eventData.townCity}, ${eventData.rink}`);

  // 1. Google Link
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  // 2. ICS File (Apple/Outlook) - Encoded as a Data URI
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gemini//Skate Events//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${eventData.eventName}`,
    `DESCRIPTION:${eventData.description || ""}`,
    `LOCATION:${eventData.townCity}, ${eventData.rink}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");

  const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  return { googleUrl, icsDataUri };
};