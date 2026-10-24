// types.ts

export type ID = string;

// --- CATEGORY STRUCTURE ---

export interface CategoryTier3 {
    id: ID;              // e.g., 'scotch'
    name: string;        // e.g., 'Scotch Whisky'
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description: string;
}

export interface CategoryTier2 {
    id: ID;              // e.g., 'whisky'
    name: string;        // e.g., 'Whisky'
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description: string;
    tier3: CategoryTier3[];
}

export interface CategoryTier1 {
    id: ID;              // e.g., 'spirits'
    name: string;        // e.g., 'Spirits'
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    descriptor: string;
    tradeGuidance: string;
    gridArea: string;
    // Filtering Flags
    isTrending?: boolean;
    isNew?: boolean;
    isGlobal?: boolean;
    tier2: CategoryTier2[];
}

// --- BRAND DATA ---

export interface BrandProduct {
    name: string;
    image: string;
    abv: string;
    size: string;
    description: string;
}

export interface TradeCapabilities {
    exportAvailable: boolean;
    privateLabel: boolean;
    ukDistribution: boolean;
    euDistribution: boolean;
    onTradeFocused: boolean;
    offTradeFocused: boolean;
}

export interface Brand {
    id: ID;
    name: string;
    country: string;
    countryCode: string; // e.g., 'uk', 'fr'
    image: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string;
    description: string;
    positioning: string; // e.g., 'Premium', 'Value'

    // RELATIONAL LINKS
    tier1Id: ID;          // Links to CategoryTier1
    tier2Id: ID;          // Links to CategoryTier2
    tier3Ids: ID[];       // Array of IDs linking to specific Tier3 niches

    tradeCapabilities: TradeCapabilities;
    products: BrandProduct[];
}