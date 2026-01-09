export const SITE_TITLE = 'Your Jam Plug UK';
export const SITE_DESCRIPTION = 'For Roller Skaters who want to skate';

export const HOMEPAGE_FEATURE_LIMIT = 8;
export const EVENTS_PER_PAGE = 20;

// ---------------------- CMS HELPERS
export const POST_STATUS = [
  {value:'draft', label: 'Draft'},
  {value:'published', label: 'Published'},
] as const;

//  ---------------------- MONTH ORDER
export const MONTH_ORDER = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' },
] as const;

//  ----------------------  BLOG-logic
export const BLOG_CATEGORY = [
    // can be multiple choice..
    { value: 'news', label: 'News'},
    // announcements and news
    { value: 'community', label: 'Community'},
    // people and events highlights/throwbacks etc
    { value: 'skate-spot', label: 'Skate Spots'},
    // introducing/reviewing skate spots/rinks etc
    { value: 'kit-list', label: 'Kit List'},
    // introducing skate gear and tools
    { value: 'perspective', label: 'Perspective'},
    // My thoughts and opions 
    { value: 'miscellaneous', label: 'Miscellaneous'},
    // all others / uncategorised
] as const;

// ----------------------  EVENT logic
export const FOOTWEAR_CHOICE = [
    {value:'skates', label: 'Skates'},
    {value:'Shoes', label: 'Shoes'},
] as const;

export const SKATE_DISCIPLINES = [
  {value:'rhythm-dance', label: 'Rhythm & Dance'},
  // Rhythm
  // Jam, Rhythm, JB, Artistic, and casual rink skating.
  {value:'sport-games', label: 'Sport & Games'},
  // Sport
  // Derby, Hockey, and organized meetup groups.
  {value:'park-ramps', label: 'Park & Ramps'},
  // Park
  // Park skating, Vert, and Aggressive street
  {value:'distance-detours', label: 'Distance & Detours '},
  // Distance
  // Trail, Speed, Urban Flow, and City skating.
  {value: 'other', label: 'Other'},
] as const;

export const EVENT_TYPE = [
    { value: 'day-skate', label: 'Day Skate' },
    { value: 'skate-night', label: 'Skate Night' },
    { value: 'social', label: 'Social' },
    { value: 'festival', label: 'Festival' },
    { value: 'weekend', label: 'Weekend' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'other', label: 'Other' },
    // MISCELLANEOUS?
] as const;

export const SKILL_LEVEL =  [
    {value: 'foundational', label: 'Foundational (Beginner)'},
    {value: 'competent', label: 'Competent (Beinner-Intermediate)'},
    {value: 'proficient', label: 'Proficient (Higher-Intermediate)'},
    {value: 'advanced', label: 'Advanced (Professional)'},
] as const;

//  ---------------------- COUNTRY logic
export interface CountryOption {
  readonly value: string;
  readonly label: string;
}

export interface CountryGroup {
  readonly label: string;
  readonly options: CountryOption[];
}


// Small helper to turn "San Marino" into "san-marino"
const slugify = (str: string) => 
  str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

export const ALL_COUNTRIES: CountryGroup[] = [
  {
    label: "United Kingdom & Ireland",
    options: ["England", "Ireland", "Northern Ireland", "Scotland", "Wales"]
      .sort().map(name => ({ value: slugify(name), label: name }))
  },
  {
    label: "International",
    options: [
      "Aland Islands", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", 
      "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 
      "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", 
      "Greece", "Hungary", "Iceland", "Italy", "Kazakhstan", 
      "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", 
      "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", 
      "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", 
      "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", 
      "Ukraine", "Vatican City" 
    ]
      .sort().map(name => ({ value: slugify(name), label: name }))
  }
];

export const GROUPED_COUNTRIES = ALL_COUNTRIES.flatMap(g => g.options) as readonly CountryOption[];

export type SkateDisciplines = (typeof SKATE_DISCIPLINES)[number]['value'];
export type BlogCategory = (typeof BLOG_CATEGORY)[number]['value'];
export type MonthOrder = (typeof MONTH_ORDER)[number]['value'];
export type CountryValue = (typeof GROUPED_COUNTRIES)[number]['value'];
export type SkillLevel = (typeof SKILL_LEVEL)[number]['value'];
export type EventType = (typeof EVENT_TYPE)[number]['value'];
export type PostStatus = (typeof POST_STATUS)[number]['value'];
// export type ParticipationLevel = (typeof PARTICIPATION_LEVEL)[number]['value'];

// export const PARTICIPATION_LEVEL = [
//     {value: 'novice', label: 'Novice'},
//     {value: 'amateur', label: 'Amateur'},
//     {value: 'professional', label: 'Professional'},
// ] as const;
