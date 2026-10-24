import { ImpactShowcaseItem } from '../types/strategic-impact-showcase.types';

export const impactShowcaseItems: ImpactShowcaseItem[] = [
    {
        id: "spirits-liquors",
        title: "Spirits & Liquors",
        subtitle: "Commercial FMCG Supply",
        description: [
            "Whisky, vodka, gin, rum & tequila in commercial volumes",
            "Bonded warehouse stock, under-bond transfers & duty-free SKUs",
            "Full pallet and container loads for international trade"
        ],
        image: "/categories/Product Categories/Spirits.jpg",
        tags: ["FMCG Trade", "Bonded Stock", "Pallet Volumes"],
        link: "/categories/spirits"
    },
    {
        id: "wines-champagnes",
        title: "Wines & Champagnes",
        subtitle: "Trade & Duty-Free Allocations",
        description: [
            "Red, white & rosé wines sourced from established regions",
            "Prosecco, Champagne & premium sparkling allocations",
            "Case minimums and pallet supply for hospitality & retail resale"
        ],
        image: "/categories/Product Categories/Wine and Champagne.jpg",
        stats: [
            { label: "Origin Regions", value: "40+" },
            { label: "Grade", value: "Commercial" }
        ],
        tags: ["Case Quantities", "Bonded Wine", "Commercial Trade"],
        link: "/categories/wine"
    },
    {
        id: "beers-craft",
        title: "Beers & Craft",
        subtitle: "FMCG Distribution & Bulk Procurement",
        description: [
            "Leading international lagers, ales & regional brands",
            "Container-level export and domestic pallet fulfillment",
            "Direct supplier-to-warehouse trade logistics"
        ],
        image: "/categories/Product Categories/BEER and Cider.jpg",
        stats: [
            { label: "Export Portfolios", value: "500+" },
            { label: "Format", value: "Pallet/Bulk" }
        ],
        tags: ["Beverage Distribution", "Container Loads", "Export Ready"],
        link: "/categories/beer"
    },
    {
        id: "speciality-beverages",
        title: "Speciality Beverages",
        subtitle: "High-Rotation FMCG Sourcing",
        description: [
            "Soft drinks, juices & functional beverages in bulk packaging",
            "Premium mixers, tonics & bar-trade staples for commercial buyers",
            "Energy drinks & hydration lines for distribution networks"
        ],
        image: "/categories/Product Categories/Soft drink -Cocktail mixer tonic.jpg",
        tags: ["Bulk Cases", "Trade Mixers", "High-Rotation"],
        link: "/categories/cocktails"
    },
    {
        id: "food-grocery",
        title: "Food & Grocery",
        subtitle: "FMCG Sourcing & Supply",
        description: [
            "Dry goods, confectionery and pantry staples for commercial resale",
            "Container and pallet consolidation for international markets",
            "Duty-free and travel-retail compliant commercial SKUs"
        ],
        image: "/categories/Product Categories/FOOD AND GROCERY.png",
        stats: [
            { label: "Commercial SKUs", value: "2000+" },
            { label: "Distribution", value: "Global B2B" }
        ],
        tags: ["Pantry Staples", "Commercial Supply", "Export Ready"],
        link: "/categories/food-grocery"
    }
];
