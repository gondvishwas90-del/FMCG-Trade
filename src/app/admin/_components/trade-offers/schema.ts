import z from "zod";

export const tradeOfferSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),
    sizes: z.array(z.string().max(50, "Size tag too long")).min(1, "At least one size is required"),
    category: z.array(z.string().max(50, "Category tag too long")).min(1, "Select at least one category"),
    market: z.array(z.string().max(50, "Market tag too long")).min(1, "Select at least one market"),
    notes: z.array(z.string().max(100, "Note tag too long")),
    availability: z.string().min(1, "Availability status is required"),
    image: z.string().min(1, "Product image is required"),
    types: z.array(z.string().max(50, "Type tag too long")).min(1, "Select at least one type"),
    status: z.enum(["active", "draft"]),
});

export type TradeOfferFormValues = z.infer<typeof tradeOfferSchema>;
