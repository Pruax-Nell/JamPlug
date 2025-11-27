import { z, defineCollection, reference, getCollection, getEntry, getEntries, render } from "astro:content";
import { glob } from "astro/loaders"; 

const events = defineCollection({
    loader: glob({ pattern: "**/*.md", base: ".src/content/events"}),
    schema: z.object ({
        eventName: z.string(),
        startDate: z.coerce.date().min(new Date()),
        endDate: z.coerce.date().min(new Date()),
        tags: z.array(z.string(),),
        status: z.array(z.string(),),
        isUpcoming: z.boolean(),
        isFeatured: z.boolean().optional(),
        postWhen: z.date(),
        removeWhen: z.date().optional(),
        slug: z.string(),
        
        eventType: z.enum(['Skate Party', 'Day Party', 'Festival', 'Workshop','Social', 'Weekend', 'Other']),
        eventLink: z.string(),
        category: z.enum(['Street', 'Jam/Dance', 'Artistic', 'Ramps/Vert', 'Speed', 'Roller Hockey', 'All', 'Other']),
        ticketLink: z.string().optional(),
        organiser: z.string(),
        orgLink: z.string(),
        host: z.string().optional(),
        hostLink: z.string().optional(),
        coach: z.string().optional(),
        coachLink: z.string().optional(),
        dj: z.string().optional(),
        djLink: z.string().optional(),
        eventPoster: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        country: z.string(),
        townCity: z.string().optional(),
        shortDescription: z.string(),
        eventImageOther: z.object({
            src: z.string(),
            alt: z.string(),
        }).optional(),

        featuredRink: z.string().optional(),
        venueAddress: z.string(),
        mapCoordinates: z.string().optional(),
        repetition: z.array(z.string(),).optional(),
        startlevel: z.enum(['beginner', 'intermediate','advance']).optional(),
        offSkates: z.boolean().optional(),
        minAge: z.number().optional(),
        maxAge: z.number().optional(),
        frequency: z.string().optional(),

        // orgPastEvents: z.array(reference('events')),
        orgPastEvents: z.array(reference('organiser')),

    }),
});

const blogs = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blogs" }),
    // loader: glob({ pattern: "**/*.md", base: ".src/content/blogs"}),
    schema: z.object({
        title: z.string(),
        published: z.date(),
        status: z.string(),
        author: z.string().default('Anonymous'),
        description: z.string(),
        isFeatured: z.boolean().optional(),
        postWhen: z.date().optional(),
        removeWhen: z.date().optional(),
        postImage: z.object({
            src: z.string(),
            alt: z.string(),
        }).optional(),
        tags: z.array(z.string()),
        // slug: z.string().optional(),
        relatedPosts: z.array(reference('blog')).optional(),
        updatedDate: z.string().transform((str) => new Date(str)).optional(),
    })
});


const organisers = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/authors" }),
  schema: z.object({
    name: z.string(),
    portfolio: z.string().url(),
  })
});

export const collections = {blogs, events, organisers};


