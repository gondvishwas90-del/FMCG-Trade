/**
 * Type definitions for Packages Showcase component
 */

export interface PackageCard {
    id: number;
    title: string;
    price?: string;
    priceSubtitle?: string;
    image: string;
    tagline: string;
    features?: string[];
    bodyText: string;
    storage?: string;
    showCTA: boolean;
    color: string;
    href?: string;
    templateId?: string;
}
