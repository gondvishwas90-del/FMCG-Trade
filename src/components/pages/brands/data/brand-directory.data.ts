export interface FeaturedBrandItem {
    id: string;
    name: string;
    logo: string;
    category: 'Spirits' | 'Beer & Cider' | 'Wine & Champagne' | 'Food & Grocery' | 'Mixers & Beverages';
    searchQuery: string;
    country?: string;
}

export const FEATURED_BRAND_LOGOS: FeaturedBrandItem[] = [
    // Spirits & Whiskies
    {
        id: "diageo",
        name: "Diageo",
        logo: "/brand-logos/Diageo.png",
        category: "Spirits",
        searchQuery: "Diageo",
        country: "United Kingdom"
    },
    {
        id: "pernod-ricard",
        name: "Pernod Ricard",
        logo: "/brand-logos/Pernod Ricard.png",
        category: "Spirits",
        searchQuery: "Pernod Ricard",
        country: "France"
    },
    {
        id: "bacardi",
        name: "BACARDI",
        logo: "/brand-logos/BACARDI.png",
        category: "Spirits",
        searchQuery: "Bacardi",
        country: "Bermuda"
    },
    {
        id: "brown-forman",
        name: "Brown-Forman",
        logo: "/brand-logos/Brown Forman.png",
        category: "Spirits",
        searchQuery: "Brown-Forman",
        country: "United States"
    },
    {
        id: "beam-suntory",
        name: "Beam Suntory",
        logo: "/brand-logos/Beam Suntory.png",
        category: "Spirits",
        searchQuery: "Suntory",
        country: "Japan / USA"
    },
    {
        id: "campari",
        name: "Campari Group",
        logo: "/brand-logos/Campari Group.png",
        category: "Spirits",
        searchQuery: "Campari",
        country: "Italy"
    },
    {
        id: "proximo-spirits",
        name: "Proximo Spirits",
        logo: "/brand-logos/Proximo Spirits.png",
        category: "Spirits",
        searchQuery: "Proximo",
        country: "United States / Ireland"
    },
    {
        id: "remy-cointreau",
        name: "Rémy Cointreau",
        logo: "/brand-logos/Remy Cointreau.png",
        category: "Spirits",
        searchQuery: "Remy Cointreau",
        country: "France"
    },
    {
        id: "william-grant",
        name: "William Grant & Sons",
        logo: "/brand-logos/William Grant & Sons.png",
        category: "Spirits",
        searchQuery: "William Grant",
        country: "Scotland"
    },
    {
        id: "edrington",
        name: "Edrington",
        logo: "/brand-logos/Edrington.png",
        category: "Spirits",
        searchQuery: "Edrington",
        country: "Scotland"
    },
    {
        id: "sazerac",
        name: "Sazerac Company",
        logo: "/brand-logos/Sazerac Company.png",
        category: "Spirits",
        searchQuery: "Sazerac",
        country: "United States"
    },
    {
        id: "kweichow-moutai",
        name: "Kweichow Moutai",
        logo: "/brand-logos/Kweichow Moutai.png",
        category: "Spirits",
        searchQuery: "Moutai",
        country: "China"
    },

    // Beer & Cider
    {
        id: "heineken",
        name: "Heineken",
        logo: "/brand-logos/Heineken UK.png",
        category: "Beer & Cider",
        searchQuery: "Heineken",
        country: "Netherlands"
    },
    {
        id: "budweiser",
        name: "Budweiser (AB InBev)",
        logo: "/brand-logos/Budweiser.png",
        category: "Beer & Cider",
        searchQuery: "AB InBev",
        country: "United States"
    },
    {
        id: "carlsberg",
        name: "Carlsberg Marston's",
        logo: "/brand-logos/Carlsberg Marston's Brewing Company.png",
        category: "Beer & Cider",
        searchQuery: "Carlsberg",
        country: "Denmark / UK"
    },
    {
        id: "asahi",
        name: "Asahi UK",
        logo: "/brand-logos/Asahi UK.png",
        category: "Beer & Cider",
        searchQuery: "Asahi",
        country: "Japan"
    },
    {
        id: "molson-coors",
        name: "Molson Coors",
        logo: "/brand-logos/Molson Coors UK.png",
        category: "Beer & Cider",
        searchQuery: "Molson Coors",
        country: "USA / Canada"
    },

    // Wine & Champagne
    {
        id: "lvmh-moet",
        name: "Moët Hennessy • LVMH",
        logo: "/brand-logos/LVMH Moet Hennessy.png",
        category: "Wine & Champagne",
        searchQuery: "LVMH",
        country: "France"
    },
    {
        id: "constellation",
        name: "Constellation Brands",
        logo: "/brand-logos/Constellation Brands.png",
        category: "Wine & Champagne",
        searchQuery: "Constellation",
        country: "United States"
    },

    // Food & Grocery
    {
        id: "nestle",
        name: "Nestlé",
        logo: "/brand-logos/Nestle.png",
        category: "Food & Grocery",
        searchQuery: "Nestle",
        country: "Switzerland"
    },
    {
        id: "danone",
        name: "Danone",
        logo: "/brand-logos/Danone.png",
        category: "Food & Grocery",
        searchQuery: "Danone",
        country: "France"
    },
    {
        id: "mondelez",
        name: "Mondelēz",
        logo: "/brand-logos/Mondelez.png",
        category: "Food & Grocery",
        searchQuery: "Mondelez",
        country: "United States"
    },
    {
        id: "mars-wrigley",
        name: "Mars Wrigley",
        logo: "/brand-logos/Mars Wrigley.png",
        category: "Food & Grocery",
        searchQuery: "Mars",
        country: "United States"
    },
    {
        id: "kraft-heinz",
        name: "Kraft Heinz",
        logo: "/brand-logos/Kraft Heinz.png",
        category: "Food & Grocery",
        searchQuery: "Kraft Heinz",
        country: "United States"
    },
    {
        id: "kelloggs",
        name: "Kellogg's",
        logo: "/brand-logos/Kellogg's.png",
        category: "Food & Grocery",
        searchQuery: "Kellogg",
        country: "United States"
    },
    {
        id: "pladis",
        name: "Pladis (McVitie's)",
        logo: "/brand-logos/Pladis (McVitie's).png",
        category: "Food & Grocery",
        searchQuery: "Pladis",
        country: "United Kingdom"
    },
    {
        id: "unilever",
        name: "Unilever",
        logo: "/brand-logos/Unilever.png",
        category: "Food & Grocery",
        searchQuery: "Unilever",
        country: "United Kingdom"
    },
    {
        id: "premier-foods",
        name: "Premier Foods",
        logo: "/brand-logos/Premier Foods.png",
        category: "Food & Grocery",
        searchQuery: "Premier Foods",
        country: "United Kingdom"
    },

    // Soft Drinks, Mixers & RTD
    {
        id: "coca-cola",
        name: "Coca-Cola",
        logo: "/brand-logos/Coca-Cola.png",
        category: "Mixers & Beverages",
        searchQuery: "Coca-Cola",
        country: "United States"
    },
    {
        id: "pepsico",
        name: "PepsiCo",
        logo: "/brand-logos/PepsiCo.png",
        category: "Mixers & Beverages",
        searchQuery: "Pepsi",
        country: "United States"
    },
    {
        id: "red-bull",
        name: "Red Bull",
        logo: "/brand-logos/Red Bull.png",
        category: "Mixers & Beverages",
        searchQuery: "Red Bull",
        country: "Austria"
    },
    {
        id: "fever-tree",
        name: "Fever-Tree",
        logo: "/brand-logos/Fever Tree.png",
        category: "Mixers & Beverages",
        searchQuery: "Fever-Tree",
        country: "United Kingdom"
    }
];

export const DIRECTORY_CATEGORIES = [
    "All Brands",
    "Spirits",
    "Beer & Cider",
    "Wine & Champagne",
    "Food & Grocery",
    "Mixers & Beverages"
] as const;

