import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(["navolochky", "turbany"]),
    categoryName: z.string(),
    color: z.string(),
    colorName: z.string(),
    price: z.number(),
    currency: z.enum(["UAH"]).default("UAH"),
    images: z.array(z.string()).min(1),
    shortDescription: z.string(),
    metaDescription: z.string().max(160),
    order: z.number().default(0),
    active: z.boolean().default(true),
  }),
});

export const collections = { products };
