export const getCalendarUrls = (eventData: any) => {
  // Format dates: YYYYMMDDTHHMMSSZ
  const formatDate = (dateStr: string) => dateStr.replace(/[-:]/g, '').split('.')[0] + 'Z';
  const formatICSDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const start = formatDate(eventData.startDate.toISOString());
  const end = eventData.endDate 
    ? formatDate(eventData.endDate.toISOString()) 
    : start;

  const title = encodeURIComponent(eventData.eventName);
  const details = encodeURIComponent(eventData.description || "");
  const description = eventData.description || "";
  const location = encodeURIComponent(`${eventData.townCity}, ${eventData.rink}`);

  // 1. Google Link
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  // 2. ICS File (Apple/Outlook) - Encoded as a Data URI
const icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  `SUMMARY:${title}`,
  `DTSTART:${start}`,
  `DTEND:${end}`,
  `LOCATION:${location}`,
  `DESCRIPTION:${description}`,
  "STATUS:CONFIRMED",
  "SEQUENCE:0",
  "BEGIN:VALARM", // This adds a 1-day reminder automatically
  "TRIGGER:-PT24H",
  "ACTION:DISPLAY",
  "DESCRIPTION:Reminder",
  "END:VALARM",
  "END:VEVENT",
  "END:VCALENDAR"
].join("\r\n");

  // const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  const icsBase64 = Buffer.from(icsContent).toString('base64');
const icsDataUri = `data:text/calendar;base64,${icsBase64}`;

  return { googleUrl, icsDataUri };
};