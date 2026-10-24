import * as z from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    image: z.string().optional(),
    abv: z.string().optional(),
    size: z.string().optional(),
    description: z.string().optional(),
});

export const portfolioRangeSchema = z.object({
    id: z.string().min(1, "Range ID is required"),
    rangeName: z.string().min(1, "Range name is required"),
    categoryPath: z.string().min(1, "Category path is required"),
    tradePositioning: z.string().min(1, "Trade positioning is required"),
    commonTradeUse: z.array(z.string()).default([]),
    typicalFormats: z.array(z.string()).default([]),
    regionalNote: z.string().optional(),
    relevantFor: z.array(z.string()).default([]),
});

export const brandSchema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    country: z.string().optional(),
    countryCode: z.string().optional(),
    positioning: z.string().optional(),
    description: z.string().optional(),
    tier1Ids: z.array(z.string()).default([]),
    tier2Ids: z.array(z.string()).default([]),
    tier3Ids: z.array(z.string()).default([]),
    tradeCapabilities: z.object({
        exportAvailable: z.boolean().default(false),
        privateLabel: z.boolean().default(false),
        ukDistribution: z.boolean().default(false),
        euDistribution: z.boolean().default(false),
        onTradeFocused: z.boolean().default(false),
        offTradeFocused: z.boolean().default(false),
    }),
    image: z.string().optional(),
    backgroundImage: z.string().optional(),
    mobileBackgroundImage: z.string().optional(),
    tagline: z.string().optional(),
    storyTitle: z.string().optional(),
    storyHeadline: z.string().optional(),
    storyDescription: z.string().optional(),
    tradeAnalystVerdict: z.string().optional(),
    products: z.array(productSchema).default([]),
    portfolioRanges: z.array(portfolioRangeSchema).default([]),
    marketConsiderations: z.array(z.string()).default([]),
    tradeIntents: z.array(z.string()).default([]),
    brandOwnerId: z.string().optional(),
    status: z.enum(['active', 'draft']).default('active'),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
