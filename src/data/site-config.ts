
export const SITE_TITLE  = "Your Jam Plug UK | Europe's Skate Event Directory";
export const SITE_DESCRIPTION = 'For Roller Skaters who want to skate';

export const HOMEPAGE_FEATURE_LIMIT = 8;
export const EVENTS_PER_PAGE = 20;

export const SUPPORT_LINKS = {
  donate: 'https://ko-fi.com/your-skate-page',
  patreon: 'https://patreon.com/your-skate-page',
};


// export const COMPANY_EMAIL = ;
// export const OFFICIAL_LINKS = [
    

// ];

const now = new Date();

export const CURRENT_YEAR = now.getFullYear();

export const getYearRange = (year = CURRENT_YEAR) => {
    return {
    prevYear: year - 1,
    currentYear: year,
    nextYear: year + 1
};
};

const janStart = new Date(CURRENT_YEAR, 0, 1);
const janEnd = new Date(CURRENT_YEAR, 0, 18);

const mayStart = new Date(CURRENT_YEAR, 4, 1);
const mayEnd = new Date(CURRENT_YEAR, 4, 26);

const septStart = new Date(CURRENT_YEAR, 8, 1);
const septEnd = new Date(CURRENT_YEAR, 8, 26);

const novStart = new Date(CURRENT_YEAR, 10, 1);
const novEnd = new Date(CURRENT_YEAR, 10, 18);

export const SHOW_JAN_BANNER = now >= janStart && now <= janEnd;
export const SHOW_MAY_BANNER = now >= mayStart && now <= mayEnd;
export const SHOW_SEPT_BANNER = now >= septStart && now <= septEnd;
export const SHOW_NOV_BANNER = now >= novStart && now <= novEnd;

