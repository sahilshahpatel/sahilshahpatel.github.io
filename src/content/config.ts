import { z, defineCollection } from 'astro:content';

const orderSchema = z.number().nonnegative().int();

const abroadCollection = defineCollection({
    type: "content",
    schema: z.object({
        order:  orderSchema,
        what:   z.string(),
        where:  z.string(),
        when:   z.string(),
        img:    z.string(),
        imgPos: z.string().optional(),
    })
});

const jobsCollection = defineCollection({
    type: "content",
    schema: z.object({
        order:     orderSchema,
        company:   z.string(),
        logo:      z.string(),
        position:  z.string(),
        timeframe: z.string(),
        summary:   z.string(),
    })
});

const projectsCollection = defineCollection({
    type: "content",
    schema: z.object({
        order:       orderSchema,
        title:       z.string(),
        category:    z.string(),
        img:         z.string(),
        imgPos:      z.string().optional(),
        gif:         z.string().optional(),
        description: z.string(),

        links: z.object({
            demo:   z.string().optional(),
            report: z.string().optional(),
            github: z.string().optional(),
        }).optional(),
    })
});

const collectionsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title:       z.string(),
        description: z.string(),
        thumbnail:   z.object({
                        src: z.string(),
                        alt: z.string(),
                        pos: z.string().optional(),
        }),
        links:       z.array(
            z.object({
                href:        z.string(),
                description: z.string().optional(),
            })
        ),
    })
})

const REVIEW_TYPES = [
    "book",
    "movie",
    "tv",
    "video game",
    "board game",
    "short story"
] as const;

const REVIEW_TAGS = [
    // General Categories
    "indie game club",

    // General Genres
    "fantasy",
    "sci-fi",
    "romance",
    "mystery",
    "thriller",
    "historical fiction",
    "comedy",
    "magical realism",

    // Book specific
    "realistic fiction",
    "literary fiction",
    "nonfiction",

    // Movie/TV specific
    "animation",

    // Video game specific
    "space",
    "physics",
    "narrative",
    "co-op",
] as const;

const reviewsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title:        z.string(),
        date:         z.coerce.date(),
        type:         z.enum(REVIEW_TYPES),
        tier:         z.enum(["S", "A", "B", "C", "D", "F"]),
        tierModifier: z.enum(["+", "-"]).optional(),
        tierAsterisk: z.enum(["nostalgia"]).optional(),
        tags:         z.array(z.enum(REVIEW_TAGS)),

        // Identifiers
        isbn:             z.string().optional(),
        tmbdId:           z.string().optional(),
        steamAppId:       z.string().optional(),
        boardGameGeeksId: z.string().optional(),

        // Other metadata
        author:    z.string().optional(),
        director:  z.string().optional(),
        developer: z.string().optional(),
        series:    z.string().optional(),
    })
})


export const collections = {
    "abroad":      abroadCollection,
    "jobs":        jobsCollection,
    "projects":    projectsCollection,
    "collections": collectionsCollection,
    "reviews":     reviewsCollection,
}
