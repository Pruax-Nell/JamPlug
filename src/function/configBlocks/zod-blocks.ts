
import { z } from "astro:content";  

import { glob } from "astro/loaders";
import { EVENT_STATUS, SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, POST_STATUS, SOCIAL_MEDIA } from '../../data/skate-constants'
import { getValues, OTHER_COUNTRIES, ALL_CONTINENT_VALUES, ALL_COUNTRY_VALUES, ALL_REGION_VALUES, AUS_REGION_OPTIONS, CANADA_PROVINCE_OPTIONS, UK_NATION_OPTIONS, US_STATE_OPTIONS } from '../../data/globe-constants'
import { defineAction } from 'astro:actions';

// zod templates
export const imageObject = (image: any) =>
  z.object({
    src: image(),
    alt: z.string(),
    caption: z.string().optional(),
}).optional().nullable();

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
  discriminant: z.enum(ALL_CONTINENT_VALUES as [string, ...string[]]),
  value: z.object({
    discriminant: z.enum(ALL_COUNTRY_VALUES as [string, ...string[]]),
    value: z.enum(ALL_REGION_VALUES as [string, ...string[]]).optional().nullable(),
  }),
});

export const mapCoords = z.object ({
  longitude: z.number().optional().nullable(),
  latitude: z.number().optional().nullable(),
}).optional().nullable();

export type LocationData = z.infer<typeof locationSchema>;

export const server = {
  submitEvent: defineAction({
    accept: 'form',
    input: z.object({
      eventName: z.string().min(3),
      location: locationSchema, 
    }),
    handler: async (input) => {
      const { discriminant: continent, value: countryObj } = input.location;
      const country = countryObj.discriminant;
      const region = countryObj.value || null;

      console.log(`Processing event: ${input.eventName}`);
      console.log(`Path: ${continent} > ${country} > ${region || 'No Region'}`);

      return { 
        success: true, 
        received: { continent, country, region } 
      };
    }
  })
};

// If you are submitting this from a custom Astro form, your input names must use dot notation for Zod to reconstruct the object correctly:

// Continent: <select name="location.discriminant">

// Country: <select name="location.value.discriminant">

// Region: <select name="location.value.value.discriminant">

// <form action={actions.submitEvent}>
//   <input type="text" name="eventName" />

//   <select name="location.discriminant">
//     <option value="europe">Europe</option>
//     <option value="north-america">North America</option>
//   </select>

//   <select name="location.value.discriminant">
//     <option value="united-kingdom">United Kingdom</option>
//     <option value="france">France</option>
//   </select>

//   <select name="location.value.value.discriminant">
//     <option value="uk-england">England</option>
//     <option value="uk-scotland">Scotland</option>
//   </select>

//   <button type="submit">Submit Event</button>
// </form>