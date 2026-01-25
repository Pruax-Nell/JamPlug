
import { z, defineCollection } from "astro:content"; 
import { glob } from "astro/loaders";
import { EVENT_STATUS, SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, POST_STATUS, SOCIAL_MEDIA } from '../src/constants'
import { getValues, OTHER_COUNTRIES, ALL_CONTINENT_VALUES, ALL_COUNTRY_VALUES, ALL_REGION_VALUES, AUS_REGION_OPTIONS, CANADA_PROVINCE_OPTIONS, UK_NATION_OPTIONS, US_STATE_OPTIONS } from './data/globe-constants'


// zod templates
export const timeObject = z.object({
    hour: z.string(),
    minute: z.string(),
});

export const personObject = z.object({
  name: z.string(),
  socialLinks: z.array(
    z.object({
      platform: z.enum(getValues(SOCIAL_MEDIA)).default('socials'),
      url: z.string().url().optional().or(z.literal('')),
    })
  ).optional().nullable().default([]),
});

// FUTURE USE ... rinks etc
export const businessObject = z.object({
  name: z.string(),
  runBy: z.string(),
  address: z.object({
    firstLine: z.string(),
    area: z.string(),
    postCode: z.string(),
  }),
  contact: z.object({
      mainNo: z.string(), 
      secondNo: z.string(),
      emailAddress: z.string(),
      otherContact: z.string(),
      website: z.string(),
  }).optional().nullable().nullable(),
});


// LOCATION SCHEMA ---
export const locationSchema = z.object({
  // .enum() ensures the value MUST be one of the strings in your arrays
  continent: z.enum(ALL_CONTINENT_VALUES, {
    errorMap: () => ({ message: "Please select a valid continent." }),
  }),
  
  country: z.enum(ALL_COUNTRY_VALUES, {
    errorMap: () => ({ message: "Please select a valid country." }),
  }),

  // .optional() because many countries don't have regions in your data
  region: z.enum(ALL_REGION_VALUES).optional().or(z.literal("")),
});

export type LocationData = z.infer<typeof locationSchema>;
