import z from "zod";

export const heroBannerSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
    subtitle: z.string()
        .max(300, "Subtitle cannot exceed 300 characters")
        .optional()
        .or(z.literal("")),
    cta: z.string()
        .max(50, "CTA text cannot exceed 50 characters")
        .optional()
        .or(z.literal("")),
    layout: z.enum(['norman', 'found', 'measured', 'centered']),
    image: z.string().min(1, "Background image is required"),
    mobileImage: z.string().optional().or(z.literal("")),
    order: z.number()
        .int("Order must be a whole number")
        .min(0, "Order must be 0 or greater"),
    status: z.enum(["active", "draft"]),
});

export type HeroBannerFormValues = z.infer<typeof heroBannerSchema>;
