import { slugify } from "../function/stringHelper";

export const SITE_TITLE  = "Your Jam Plug UK | Europe's Skate Event Directory";
export const SITE_DESCRIPTION = 'For Roller Skaters who want to skate';
const NEW_BRAND = ' Your Jam Plug | Skate Global'

export const HOMEPAGE_FEATURE_LIMIT = 8;
export const EVENTS_PER_PAGE = 20;

// ----------------------  EVENT UPDATE LIST
export const EVENT_STATUS = [
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Sold Out', value: 'sold-out' },
  { label: 'Rescheduled', value: 'rescheduled' },
  { label: '-', value: '' },
] as const;

export const EVENT_VALUES = EVENT_STATUS.map(option => option.value) as [string, ...string[]];
export const EVENT_LABELS = EVENT_STATUS.map(option => option.label) as [string, ...string[]];

// ----------------------  MEDIA LIST
export const SOCIAL_MEDIA = [
  { label: 'Socials', value: 'socials' },
  { label: 'Other', value: 'other' },
  { label: 'Website', value: 'website' },
] as const;

// ---------------------- CMS HELPERS
export const POST_STATUS = [
  {value:'draft', label: 'Draft'},
  {value:'published', label: 'Published'},
  {value:'archived', label: 'Archived'},
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

//  ----------------------  BUSINESS CATEGORY
export const BUSINESS_CATEGORY = [ //
    {value: 'rink', label: 'Rink'},
    {value: 'retail', label: 'Retail'},
    {value: 'manufacturing', label: 'Manufacturing'},
    {value: 'education', label: 'Education'},
    {value: 'community', label: 'Community'},
    {value: 'services', label: 'Services'},
    {value: 'other', label: 'Other'},
] as const;

export const BUSINESS_VALUES = BUSINESS_CATEGORY.map(option => option.value) as [string, ...string[]];
export const BUSINESS_LABELS = BUSINESS_CATEGORY.map(option => option.label) as [string, ...string[]];


//  ----------------------  COMMUNITY HUB
export const COMMUNITY_CAT = [ //
    {value: 'education', label: 'Education'},
    {value: 'community', label: 'Community'},
    {value: 'other', label: 'Other'},
] as const;

//  ----------------------  INDUSTRY HUB
export const INDUSTRY_CAT = [ //
    {value: 'retail', label: 'Retail'},
    {value: 'manufacturing', label: 'Manufacturing'},
    {value: 'services', label: 'Services'},
    {value: 'other', label: 'Other'},
] as const;


//  ----------------------  VENUE TYPE
export const SKATE_VENUE = [ //
    {value: 'rink', label: 'Full Rink'},
    {value: 'studio', label: 'Skate Studio'},
    {value: 'pop-up', label: 'Pop-up Space'},
    {value: 'multi', label: 'Multi-use Space'},
    {value: 'outdoor', label: 'Outdoor Court'},
] as const;

export const VENUE_VALUES = SKATE_VENUE.map(option => option.value) as [string, ...string[]];
export const VENUE_LABELS = SKATE_VENUE.map(option => option.label) as [string, ...string[]];

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

export const BLOG_VALUES = BLOG_CATEGORY.map(option => option.value) as [string, ...string[]];
export const BLOG_LABELS = BLOG_CATEGORY.map(option => option.label) as [string, ...string[]];

// ----------------------  WHEELS ALLOWED
export const WHEEL_CHOICE = [  //
    {value:'quad-skates', label: 'Quad Skates'},
    {value:'inline-skates', label: 'Inline Skates'},
    {value:'free-skates', label: 'Free Skates'},
    {value:'boards', label: 'Boards'},
    {value:'scooter', label: 'Scooter'},
    {value:'bike', label: 'Bike'},
] as const;

export const WHEEL_VALUES = WHEEL_CHOICE.map(option => option.value) as [string, ...string[]];
// export const WHEEL_LABELS = WHEEL_CHOICE.map(option => option.label) as [string, ...string[]];
export const getWheelLabel = (val: string) => 
  WHEEL_CHOICE.find(option => option.value === val)?.label ?? val;
// ----------------------  EVENT logic
export const FOOTWEAR_CHOICE = [ 
    {value:'skates', label: 'Skates'},
    {value:'shoes', label: 'Shoes'},
    {value:'sync', label: 'Sync'},
    {value:'sequence', label: 'sequence'},
] as const;

export const FOOTWEAR_VALUES = FOOTWEAR_CHOICE.map(option => option.value) as [string, ...string[]];
export const FOOTWEAR_LABELS = FOOTWEAR_CHOICE.map(option => option.label) as [string, ...string[]];


export const SKATE_DISCIPLINES = [
  {value:'rhythm-style', label: 'Rhythm & Style'},
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

export const DISCIPLINE_VALUES = SKATE_DISCIPLINES.map(option => option.value) as [string, ...string[]];
export const DISCIPLINE_LABELS = SKATE_DISCIPLINES.map(option => option.label) as [string, ...string[]];

export const EVENT_TYPE = [
    { value: 'day-skate', label: 'Day Skate' },
    { value: 'skate-night', label: 'Skate Night' },
    { value: 'social', label: 'Social' },
    { value: 'festival', label: 'Festival' },
    { value: 'weekend', label: 'Weekend' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'tour', label: 'Tour' }, // workshop tours 
    { value: 'sessions', label: 'Sessions' }, // regular session 
    { value: 'convention', label: 'Convention' }, // roller con
    { value: 'other', label: 'Other' }, // MISCELLANEOUS?
] as const;

export const EVENT_TYPE_VALUES = EVENT_TYPE.map(option => option.value) as [string, ...string[]];
export const EVENT_TYPE_LABELS = EVENT_TYPE.map(option => option.label) as [string, ...string[]];

export const SKILL_LEVEL =  [
    {value: 'foundational', label: 'Foundational (Beginner)'},
    {value: 'competent', label: 'Competent (Beinner-Intermediate)'},
    {value: 'proficient', label: 'Proficient (Higher-Intermediate)'},
    {value: 'advanced', label: 'Advanced (Professional)'},
] as const;

export const SKILL_VALUES = SKILL_LEVEL.map(option => option.value) as [string, ...string[]];
export const SKILL_LABELS = SKILL_LEVEL.map(option => option.label) as [string, ...string[]];


export const OCCURANCE_REP =  [ //
    {value: 'annual', label: 'Annual'},
    {value: 'seasonal', label: 'Seasonal'},
    {value: 'special', label: 'Speacial Occurance'},
    {value: 'other', label: 'Other'},
] as const;

// EVENT & BLOG DATA
export type BlogCategory = (typeof BLOG_CATEGORY)[number]['value'];
export type SkateDisciplines = (typeof SKATE_DISCIPLINES)[number]['value'];
export type SkillLevel = (typeof SKILL_LEVEL)[number]['value'];
export type EventType = (typeof EVENT_TYPE)[number]['value'];
export type PostStatus = (typeof POST_STATUS)[number]['value'];
export type socialMedia = (typeof SOCIAL_MEDIA)[number]['value'];
export type EventStatus = (typeof EVENT_STATUS)[number]['value'];
export type Footwear = (typeof FOOTWEAR_CHOICE)[number]['value'];
export type wheels = (typeof WHEEL_CHOICE)[number]['value'];
export type MonthOrder = (typeof MONTH_ORDER)[number]['value'];

