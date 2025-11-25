import { defineCollection, z } from "astro:content";

const eventCollection = defineCollection({
    type: 'content',
    schema: z.object ({
        eventName: z.string(),
        organiser: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        tags: z.array(z.string(),),
        category:z.array(z.string(),),

    }),
});

export const collections = {
    event: eventCollection,
};

