import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    price: z.number(),
    currency: z.enum(["UAH"]).default("UAH"),
    images: z.array(z.string()).min(1),
    colors: z.array(z.string()),
    description: z.string(),
    metaDescription: z.string().max(160),
    order: z.number().default(0),
    active: z.boolean().default(true),
  }),
});

export const collections = { products };
