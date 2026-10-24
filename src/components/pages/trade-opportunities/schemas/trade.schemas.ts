import { z } from 'zod';

export const tradeRequirementSchema = z.object({
    category: z.string().min(1, "Category is required"),
    market: z.string().min(1, "Target Market is required"),
    volume: z.string().min(1, "Volume Band is required"),
    timeline: z.string().min(1, "Timeline is required"),
    notes: z.string().optional(),
});

export type TradeRequirementSchema = z.infer<typeof tradeRequirementSchema>;
