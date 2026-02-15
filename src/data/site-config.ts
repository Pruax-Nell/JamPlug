
export const SITE_TITLE  = "Your Jam Plug UK | Europe's Skate Event Directory";
export const SITE_DESCRIPTION = 'For Roller Skaters who want to skate';

export const HOMEPAGE_FEATURE_LIMIT = 8;
export const EVENTS_PER_PAGE = 20;

// export const COMPANY_EMAIL = ;
// export const OFFICIAL_LINKS = [


// ];

// A: Hardcoded 
// export const CURRENT_FESTIVAL_YEAR = 2026;

// B: Dynamic 
export const CURRENT_YEAR = new Date().getFullYear();

export const getYearRange = (year = CURRENT_YEAR) => {
  return {
    prevYear: year - 1,
    currentYear: year,
    nextYear: year + 1
  };
};