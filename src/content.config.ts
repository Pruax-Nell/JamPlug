import { z, defineCollection } from "astro:content"; 
import { glob } from "astro/loaders";
import { EVENT_STATUS, SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, POST_STATUS, SOCIAL_MEDIA, FOOTWEAR_CHOICE } from './data/skate-constants'
import { getValues, OTHER_COUNTRIES, ALL_CONTINENT_VALUES, ALL_COUNTRY_VALUES, ALL_REGION_VALUES, AUS_REGION_OPTIONS, CANADA_PROVINCE_OPTIONS, UK_NATION_OPTIONS, US_STATE_OPTIONS } from './data/globe-constants'
import { timeObject, personObject, locationSchema, businessObject,mapCoords } from "./function/configBlocks/zod-blocks";
import { slugify } from "./function/stringHelper";

// ------------- Collections ----------------- //
//  BLOGS *** 
const posts = defineCollection({
  type: 'content', 
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    status: z.enum(getValues(POST_STATUS)).default('draft'),
    published: z.string().or(z.date()),
    isFeatured: z.boolean().default(false),
    updated: z.string().or(z.date()).optional(), 
    description: z.string(),
    blogCategory: z.enum( getValues(BLOG_CATEGORY)),
    // skateDiscipline: z.string().optional().default(''),
    skateDiscipline: z.union([
    z.enum(getValues(SKATE_DISCIPLINES)),
    z.literal('') 
    ]).optional(),
    coverImage: image().optional(), 
  }),
});
//  BLOGS OLD *** 
const blog = defineCollection ({
    loader: glob({ pattern: '**/index.mdoc', base: "src/content/blog"}),
    schema: ({ image }) => z.object({
    // CMS ADMIN FIELDS
        status: z.enum(getValues(POST_STATUS)).default('draft'),
        published: z.coerce.date().default(() => new Date()),
    // MAIN FIELDS
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string(),
        
        blogCategory: z.enum( getValues(BLOG_CATEGORY)),
        // skateDiscipline: z.enum( getValues(SKATE_DISCIPLINES)).optional().nullable(),
        skateDiscipline: z.preprocess(
            (val) => (val === "" ? undefined : val), 
            z.enum(getValues(SKATE_DISCIPLINES))
        )
        .optional(),
        
        coverImage: image().optional(),
        gallery1: image().optional(),
        gallery2: image().optional(),
        gallery3: image().optional(),
        gallery4: image().optional(),
        
    }),
});

//  EVENTS  *** 
const events = defineCollection({
    loader: glob({pattern: '**/index.mdoc', base: "./src/content/events"}),
    schema: ({ image }) =>  z.object ({
    // CMS admin items 
        status: z.enum(getValues(POST_STATUS)).default('draft'),
        isFeatured: z.boolean().default(false),
        eventStatus: z.enum(getValues(EVENT_STATUS)).default('').catch(''),
    // Main Info
        eventName: z.string(),
        subheading: z.string().optional(),
        description: z.string().optional(),
    // filter options --
        startDate: z.coerce.date(), 
        endDate: z.coerce.date().optional(),
        location: locationSchema,
        townCity: z.string(),
        eventType: z.enum( getValues(EVENT_TYPE)),
        skateDiscipline: z.enum( getValues(SKATE_DISCIPLINES)),
        skillLevel: z.enum( getValues(SKILL_LEVEL)).optional().or(z.literal('')), 
        minAge: z.string().optional(),
    // Secondary key info
        maxAge: z.string().optional(),
        eventPoster: image().optional().nullable(),
        flyerImage1: image().optional(),
        flyerImage2: image().optional(),
        flyerImage3: image().optional(),
        flyerImage4: image().optional(),
        flyerImage5: image().optional(),

        startTime: timeObject.optional(), 
        endTime: timeObject.optional(), 

    // Bonus info - option to add multiple lines ideal
        eventLink: z.string().url().optional().or(z.literal('')),
        ticketLink: z.string().url().optional().or(z.literal('')),
        tickets: z.array(
            z.object({
                name: z.string(),
                directLink: z.string().url().optional().nullable().or(z.literal('')),
            })
    ).optional().nullable().default([]),

    organisers: z.array(personObject).optional().nullable().default([]),
    hosts: z.array(personObject).optional().nullable().default([]),
    coaches: z.array(personObject).optional().nullable().default([]),
    djs: z.array(personObject).optional().nullable().default([]),
    
    rink: z.string().optional(),
    venueAddress: z.string().optional(),
    mapCoordinates: mapCoords,

    footwear: z.enum( getValues(FOOTWEAR_CHOICE)).default('skates'),
    repetition: z.string().optional(),

    })
});


export const collections = {posts, blog, events};