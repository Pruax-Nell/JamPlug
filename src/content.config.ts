import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
 
const events = defineCollection({
    loader: glob({pattern: "**/[^_]*.{md,mdx}", base: "./src/content/events"}),
    schema: ({ image }) =>  z.object ({
        eventName: z.string(),
        startDate: z.coerce.date().min(new Date(), { message: "Start date must be in the future." }), 
        endDate: z.coerce.date().min(new Date(), { message: "End date must be in the future." }),
        tags: z.array(z.string()).default(['new']),
        status: z.enum(['draft', 'pending', 'published']).default('draft'),
        published: z.coerce.date(), 
        
        country: z.string(),
        townCity: z.string(),
        description: z.string(),

        isUpcoming: z.boolean().default(true),
        isFeatured: z.boolean().default(false),
        removeWhen: z.coerce.date().optional(),

        category: z.enum(['Street', 'Jam/Dance', 'Artistic', 'Ramps/Vert', 'Speed', 'Roller Hockey', 'All', 'Other']),
        eventType: z.enum(['Skate Party', 'Day Party', 'Festival', 'Workshop','Social', 'Weekend', 'Other']),
        eventPoster: z.string(),

        startTime: z.string().optional(), 
        endTime: z.string().optional(), 

        eventLink: z.string().url().optional(),
        ticketLink: z.string().url().optional(),
        organiser: reference('organisers').optional(), 
        orgLink: z.string().url().optional(),
        host: z.string().optional(),
        hostLink: z.string().url().optional(),
        coach: z.string().optional(),
        coachLink: z.string().url().optional(),
        dj: z.string().optional(),
        djLink: z.string().url().optional(),
        
        eventImageOther: image().optional(),
        
        featuredRink: z.string().optional(),
        venueAddress: z.string().optional(),
        mapCoordinates: z.string().optional(),

        repetition: z.array(z.string()).optional(),
        startlevel: z.enum(['beginner', 'intermediate','advanced']).optional(), 
        offSkates: z.boolean().optional(),
        minAge: z.string().optional(),
        maxAge: z.string().optional(),
        frequency: z.string().optional(),

        orgPastEvents: z.array(reference('events')).optional(),

    })
});

// ORGANISERS ***

const organisers = defineCollection({
    loader: glob({pattern: "**/[^_]*.{md,mdx}", base: "./src/content/organisers"}),
    schema: ({ image }) => z.object({
        name: z.string(),
        portfolio: z.string().url(),
        socials: z.array(z.string().url()).optional(),
        coverImage: image().optional(),
        insert1: image().optional(),
        insert2: image().optional(),
        insert3: image().optional(),
    }),
});


//  BLOGS *** 
const blogs = defineCollection ({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog"}),
    schema: ({ image }) => z.object({
        title: z.string(),
        status: z.enum(['draft', 'published']).default('draft'),
        tags: z.array(z.string()).default([]).default(['new']),
        published: z.coerce.date(),
        description: z.string(),
        coverImage: image().optional(),
        insert1: image().optional(),
        insert2: image().optional(),
        insert3: image().optional(),
    }),
});

export const collections = {blogs, events, organisers, };


