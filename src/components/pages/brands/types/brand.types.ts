export type TradeIntent = 'market-entry' | 'on-trade-cocktail' | 'export-portfolio' | 'private-label' | 'volume-strategic';

export interface Product {
    name: string;
    image: string;
    abv: string;
    size: string;
    description?: string;
}

export interface PortfolioRange {
    id: string;
    rangeName: string;
    categoryPath: string;
    tradePositioning: 'Core' | 'Premium' | 'Super-Premium' | 'Limited' | string;
    commonTradeUse: string[];
    typicalFormats: string[];
    regionalNote?: string;
    relevantFor: TradeIntent[];
}

export interface Brand {
    id: string;
    name: string;
    country: string;
    countryCode: string;
    positioning: string;
    description: string;
    tier1Ids: string[];
    tier2Ids: string[];
    tier3Ids: string[];
    category?: string; // Legacy/Display category
    categoryFit?: string[]; // Legacy/Display category fits
    tradeCapabilities: {
        exportAvailable: boolean;
        privateLabel: boolean;
        ukDistribution: boolean;
        euDistribution: boolean;
        onTradeFocused: boolean;
        offTradeFocused: boolean;
    };
    image?: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string;
    tagline?: string;
    storyTitle?: string;
    storyHeadline?: string;
    storyDescription?: string;
    tradeAnalystVerdict?: string;
    products: Product[];
    portfolioRanges: PortfolioRange[];
    marketConsiderations: string[];
    tradeIntents: string[];
    brandOwnerId?: string;
    owner?: {
        id: string;
        name: string;
        logo: string;
    };
}
