import { ImpactShowcaseItem } from '../types/strategic-impact-showcase.types';

export const impactShowcaseItems: ImpactShowcaseItem[] = [
    {
        id: "spirits-liquors",
        title: "Spirits & Liquors",
        subtitle: "Whisky, Vodka, Gin & More",
        description: [
            "Whisky, vodka, gin, rum & tequila",
            "Liqueurs, aperitifs & RTD formats",
            "Premium, craft & private‑label spirits"
        ],
        image: "/categories/Product Categories/Spirits.jpg",
        tags: ["Premium", "Craft", "Global"],
        link: "/categories/spirits"
    },
    {
        id: "wines-champagnes",
        title: "Wines & Champagnes",
        subtitle: "Fine Wine & Sparkling",
        description: [
            "Red, white & rosé wines from top regions",
            "Sparkling wines & Prosecco",
            "Champagne & premium cuvées",
            "Private‑label & bespoke bottlings"
        ],
        image: "/categories/Product Categories/Wine and Champagne.jpg",
        stats: [
            { label: "Regions", value: "40+" },
            { label: "Vintages", value: "Premium" }
        ],
        tags: ["Fine Wine", "Sparkling", "Cuvée"],
        link: "/categories/wine"
    },
    {
        id: "beers-craft",
        title: "Beers & Craft",
        subtitle: "Lagers, Ales & Craft Selection",
        description: [
            "Premium Lagers & Ales",
            "Craft Beer Selection",
            "Regional Specialties"
        ],
        image: "/categories/Product Categories/BEER and Cider.jpg",
        stats: [
            { label: "Varieties", value: "500+" },
            { label: "Breweries", value: "150+" }
        ],
        tags: ["Craft", "Lager", "Ale"],
        link: "/categories/beer"
    },
    {
        id: "speciality-beverages",
        title: "Speciality Beverages",
        subtitle: "Mixers, Tonics & Non-Alcoholic",
        description: [
            "Soft drinks, juices & functional beverages",
            "Premium Mixers, tonics & soda waters",
            "Energy drinks & hydration solutions",
            "Alcohol‑free spirits alternatives"
        ],
        image: "/categories/Product Categories/Soft drink -Cocktail mixer tonic.jpg",
        tags: ["Functional", "Mixers", "Zero-Alc"],
        link: "/categories/cocktails"
    },
    {
        id: "food-grocery",
        title: "Food & Grocery",
        subtitle: "Pantry Staples & Sweeteners",
        description: [
            "Dry goods and pantry staples sourced globally",
            "Sweeteners and natural sugar alternatives",
            "Travel‑retail and duty‑free compliant SKUs"
        ],
        image: "/categories/Product Categories/FOOD AND GROCERY.png",
        stats: [
            { label: "SKUs", value: "2000+" },
            { label: "Reach", value: "Global" }
        ],
        tags: ["Pantry", "Organic", "Staples"],
        link: "/categories/food-grocery"
    }
];
