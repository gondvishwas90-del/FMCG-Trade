export interface CategoryTier3Data {
    id: string;
    name: string;
    image?: string;
    description?: string;
}

export interface CategoryTier2Data {
    id: string;
    name: string;
    image?: string;
    description?: string;
    tier3?: CategoryTier3Data[];
}

export interface CategoryTier1Data {
    id: string;
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    descriptor: string;
    tradeGuidance?: string;
    gridArea?: string;
    isTrending?: boolean;
    isNew?: boolean;
    isGlobal?: boolean;
    status: 'active' | 'draft';
    tier2: CategoryTier2Data[];
}

export const fallbackCategories: CategoryTier1Data[] = [
    {
        id: "spirits",
        name: "Spirits",
        descriptor: "Whisky, Vodka, Rum, Gin, Tequila, Cognac",
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1600",
        mobileImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800",
        tradeGuidance: "High-volume international rotation, duty-free allocations, and premium on-trade spirits.",
        status: "active",
        tier2: [
            { id: "whisky", name: "Whisky", tier3: [{ id: "scotch", name: "Scotch Whisky" }, { id: "irish-whiskey", name: "Irish Whiskey" }, { id: "bourbon", name: "Bourbon & American" }] },
            { id: "vodka", name: "Vodka", tier3: [] },
            { id: "rum", name: "Rum", tier3: [] },
            { id: "gin", name: "Gin", tier3: [] },
            { id: "tequila", name: "Tequila & Mezcal", tier3: [] },
            { id: "cognac", name: "Cognac & Brandy", tier3: [] }
        ]
    },
    {
        id: "wine",
        name: "Wine & Champagne",
        descriptor: "Champagne, Sparkling Wine, Red Wine, White Wine, Rosé",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1600",
        mobileImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
        tradeGuidance: "Curated portfolio of prestigious Champagne houses and high-volume commercial table wines.",
        status: "active",
        tier2: [
            { id: "champagne", name: "Champagne", tier3: [] },
            { id: "sparkling", name: "Sparkling Wine & Prosecco", tier3: [] },
            { id: "red-wine", name: "Red Wine", tier3: [] },
            { id: "white-wine", name: "White Wine", tier3: [] },
            { id: "rose", name: "Rosé", tier3: [] }
        ]
    },
    {
        id: "beer",
        name: "Beer & Cider",
        descriptor: "Lager, Ale, Craft Beer, Cider, Stout",
        image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=1600",
        mobileImage: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=800",
        tradeGuidance: "Mass-rotation international lagers, premium European craft beers, and packaged ciders in bottle and can formats.",
        status: "active",
        tier2: [
            { id: "lager", name: "Lager", tier3: [] },
            { id: "ale", name: "Ale & IPA", tier3: [] },
            { id: "craft-beer", name: "Craft Beer", tier3: [] },
            { id: "cider", name: "Cider", tier3: [] },
            { id: "stout", name: "Stout & Porter", tier3: [] }
        ]
    },
    {
        id: "food-grocery",
        name: "Food & Grocery",
        descriptor: "Confectionery, Snacks, Beverages, Pantry, Dairy",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
        mobileImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
        tradeGuidance: "Top-tier FMCG ambient grocery lines, global confectionery brands, and high-turnover pantry staples.",
        status: "active",
        tier2: [
            { id: "confectionery", name: "Confectionery & Chocolate", tier3: [] },
            { id: "snacks", name: "Crisps & Snacks", tier3: [] },
            { id: "beverages", name: "Soft Drinks & Juices", tier3: [] },
            { id: "pantry", name: "Pantry & Spreads", tier3: [] },
            { id: "dairy", name: "Dairy & Chilled", tier3: [] }
        ]
    },
    {
        id: "cocktails",
        name: "Cocktails & Mixers",
        descriptor: "Ready to Drink, Premium Mixers, Syrups, Bitters",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1600",
        mobileImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
        tradeGuidance: "Fast-growing Ready-To-Drink (RTD) cocktail cans, luxury tonics, botanicals, and hospitality bar supplies.",
        status: "active",
        tier2: [
            { id: "rtd", name: "Ready To Drink (RTD)", tier3: [] },
            { id: "mixers", name: "Tonic & Mixers", tier3: [] },
            { id: "syrups", name: "Bar Syrups & Purees", tier3: [] }
        ]
    }
];

