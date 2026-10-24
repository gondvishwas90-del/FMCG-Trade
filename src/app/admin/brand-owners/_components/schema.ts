import * as z from "zod";

export const brandOwnerSchema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    logo: z.string().min(1, "Logo is required"),
    logoDark: z.string().optional(),
    logoLight: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    website: z.string().optional(),
    country: z.string().optional(),
    countryCode: z.string().max(5, "Country code must be 5 characters").optional(),
    status: z.enum(['active', 'draft']).default('active'),
});

export type BrandOwnerFormValues = z.infer<typeof brandOwnerSchema>;
