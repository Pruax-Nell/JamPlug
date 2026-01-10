import { z, defineCollection } from "astro:content"; 
import { glob } from "astro/loaders";
import { SKATE_DISCIPLINES, BLOG_CATEGORY, SKILL_LEVEL, EVENT_TYPE, GROUPED_COUNTRIES, POST_STATUS } from '../src/constants'

const getValues = (constArray: readonly { value: string }[]) => {
  return constArray.map(c => c.value) as [string, ...string[]];
};

const timeObject = z.object({
    hour: z.string(),
    minute: z.string(),
});

//  BLOGS *** 
const blog = defineCollection ({
    loader: glob({ pattern: '**/index.mdoc', base: "./src/content/blog"}),
    schema: ({ image }: { image: any }) => z.object({
    // CMS ADMIN FIELDS
        status: z.enum(getValues(POST_STATUS)).default('draft'),
        published: z.coerce.date().default(() => new Date()),
    // MAIN FIELDS
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string(),
        
        blogCategory: z.enum( getValues(BLOG_CATEGORY)),
        skateDiscipline: z.enum( getValues(SKATE_DISCIPLINES)).optional(),
        
        coverImage: image().optional(),
        gallery: z.array(image()).optional().default([]),
        
    }),
});

//  EVENTS  *** 
const events = defineCollection({
    loader: glob({pattern: '**/index.mdoc', base: "./src/content/events"}),
    schema: ({ image }: { image: any }) =>  z.object ({
// CMS admin items 
        status: z.enum(getValues(POST_STATUS)).default('draft'),
        published: z.coerce.date().optional(), 
        isFeatured: z.boolean().default(false),
    // Main Info
        eventName: z.string(),
        subheading: z.string().optional(),
        description: z.string(),
        startDate: z.coerce.date(), 
        endDate: z.coerce.date().optional(),
    // Secondary key info
        eventPoster: image().optional(),
        gallery: z.array(image()).optional().default([]),
        country: z.enum( getValues(GROUPED_COUNTRIES)),
        townCity: z.string(),
        eventType: z.enum( getValues(EVENT_TYPE)),
        skateDiscipline: z.enum( getValues(SKATE_DISCIPLINES)),
        skillLevel: z.enum( getValues(SKILL_LEVEL)).optional(), 
        // participationlevel: z.enum( getValues(PARTICIPATION_LEVEL)).optional(), 
        minAge: z.string().optional(),
        maxAge: z.string().optional(),

        startTime: timeObject.optional(), 
        endTime: timeObject.optional(), 
    // Bonus info - option to add multiple lines ideal
        eventLink: z.string().url().optional(),
        ticketLink: z.string().url().optional(),
        organiser: z.string().optional(), 
        orgLink: z.string().url().optional(),
        host: z.string().optional(),
        hostLink: z.string().url().optional(),
        coach: z.string().optional(),
        coachLink: z.string().url().optional(),
        dj: z.string().optional(),
        djLink: z.string().url().optional(),
        
        rink: z.string().optional(),
        venueAddress: z.string().optional(),
        mapCoordinates: z.string().optional(),

        offSkates: z.boolean().optional().default(false),
        repetition: z.string().optional(),

    })
});

// ORGANISERS ***

// const organisers = defineCollection({
//     loader: glob({pattern: "**/[^_]*.{md,mdx,mdoc, }", base: "./src/content/organisers"}),
//     schema: ({ image }: { image: any }) => z.object({
//         name: z.string(),
//         portfolio: z.string().url(),
//         socials: z.array(z.object({
//             platform: z.enum(['instagram', 'facebook', 'x', 'tiktok', 'website', 'other platform']),
//             url: z.string().url(),
//             })).optional(),
//         about: z.string().optional(),
//         brand: image().optional(),
//         insert1: image().optional(),
//         insert2: image().optional(),
//         insert3: image().optional(),
//     }),
// });


// SKATE SPOTS FOR REFERENCE AND REVIEWS 
// const spots = defineCollection ({
//     loader: glob({ pattern: "**/[^_]*.{md,mdx,mdoc}", base: "./src/content/spots"}),
//     schema: ({ image }: { image: any }) => z.object({ 
//         name: z.string(),
//         cover: image().optional(),
//         status: z.enum(['draft', 'published']).default('draft'),

//     })

// })




// const posts = defineCollection({
//   type: 'content', 
//   schema: z.object({
//     title: z.string(),
//     date: z.string().optional(), 
//   }),
// });

export const collections = {blog, events};