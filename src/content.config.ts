import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: z.object({
    // Basic info
    title: z.string(), // "Шовкова наволочка Айворі"

    // Category
    category: z.enum(["navolochky", "turbany"]), // URL segment
    categoryName: z.string(), // "Наволочки" or "Тюрбани"

    // Product type (for cart & SalesDrive)
    productName: z.string(), // "Шовкова наволочка" or "Шовковий тюрбан"

    // Color
    color: z.string(), // "ivory" (for cart & API)
    colorName: z.string(), // "Айворі" (for display)
    hexColor: z.string(), // "#F5F5DC" (for color picker UI)

    // Pricing
    price: z.number(), // 2190
    oldPrice: z.number().optional(), // 2500 (crossed out price)
    currency: z.enum(["UAH"]).default("UAH"),

    // Images (array for carousel, first is main)
    images: z.array(z.string()).min(1),

    // SEO & descriptions
    shortDescription: z.string(), // For product cards
    metaDescription: z.string().max(160), // For <meta> tag

    // Display options
    order: z.number().default(0), // Sort order in category
    featured: z.boolean().default(false), // Show on homepage
    active: z.boolean().default(true), // Published or draft
  }),
});

export const collections = { products };
