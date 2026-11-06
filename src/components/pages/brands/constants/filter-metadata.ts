export interface FilterOptionMeta {
    title: string;
    subtitle: string;
}

export const CATEGORY_META: Record<string, string> = {
    'COGNAC & BRANDY': 'VS, VSOP & XO aged spirits',
    'GIN': 'London dry & botanical distillations',
    'LIQUEURS': 'Cream, herbal & fruit liqueurs',
    'RUM': 'Caribbean aged & spiced rums',
    'SPIRITS': 'High-rotation distilled portfolio',
    'TEQUILA & MEZCAL': '100% blue agave & reposado',
    'VODKA': 'Triple-distilled & premium grain',
    'WHISKY': 'Single malt, blended scotch & bourbon'
};

export const COUNTRY_META: Record<string, string> = {
    'BARBADOS': 'Heritage aged rums & Caribbean distillery trade',
    'CUBA': 'Traditional cane rum & Havana exports',
    'FRANCE': 'Champagne, cognac & fine wine appellations',
    'GERMANY': 'Pilsner, herbal liqueurs & premium FMCG',
    'GUATEMALA': 'Solera aged rums & highland spirits',
    'INDIA': 'Single malt, prestige spirits & domestic volume',
    'IRELAND': 'Triple-distilled Irish whiskey & heritage brands',
    'ITALY': 'Aperitivos, prosecco & premium confectionery',
    'JAMAICA': 'Pot-still Caribbean rums & tropical spirits',
    'JAPAN': 'Craft whisky, super dry beer & artisanal spirits',
    'MEXICO': 'Tequila, mezcal & international beers',
    'NORTHERN IRELAND': 'Bushmills & historic coastal distilleries',
    'POLAND': 'Traditional rye & potato vodkas',
    'SCOTLAND': 'Single malt & blended scotch whisky',
    'SPAIN': 'Wine, cava, sherry & Mediterranean FMCG',
    'SWEDEN': 'Winter wheat vodka, craft cider & spirits',
    'UNITED KINGDOM': 'Scotch, London dry gin & domestic FMCG',
    'UNITED STATES': 'Bourbon, rye, sodas & iconic global brands'
};

export const MARKET_FOCUS_META: Record<string, string> = {
    'ON-TRADE': 'Bars, restaurants, hotels & nightlife venues',
    'OFF-TRADE': 'Supermarkets, cash & carry and retail chains',
    'COCKTAIL': 'High-volume mixing ingredients & aperitifs'
};

export const OWNERSHIP_META: Record<string, string> = {
    'BACARDI LTD.': 'Bacardi Rum, Grey Goose, Bombay Sapphire',
    'BEAM SUNTORY': "Jim Beam, Maker's Mark, Hibiki, Yamazaki",
    'BROWN FORMAN': "Jack Daniel's, Woodford Reserve, Finlandia",
    'CAMPARI GROUP': 'Aperol, Campari Bitter, Grand Marnier',
    'DIAGEO': "Johnnie Walker, Tanqueray, Smirnoff, Baileys",
    'HEINEKEN UK': 'Heineken, Birra Moretti, Desperados',
    'LVMH (MOET HENNESSY)': 'Moët & Chandon, Hennessy, Dom Pérignon',
    'PERNOD RICARD': "Chivas Regal, Jameson, Absolut, Ballantine's",
    'PROXIMO SPIRITS': 'Jose Cuervo, Bushmills, Kraken Rum',
    'REMY COINTREAU': 'Rémy Martin, Cointreau, The Botanist'
};

export const FILTER_OPTION_IMAGES: Record<string, string> = {
    // Ownerships
    'DIAGEO': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'PERNOD RICARD': '/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg',
    'BACARDI LTD.': '/products/bacardi-carta-blanca.jpg',
    'BROWN FORMAN': '/products/Jack Daniels Tennessee  American Whiskey.webp',
    'BEAM SUNTORY': '/products/Jim beam amwrican whicsky.jpg',
    'CAMPARI GROUP': '/products/campari-bitter.jpg',
    'COCA-COLA': '/products/coca-cola-can-330ml.jpg',
    'PEPSICO': '/products/pepsi-regular-1l.png',
    'HEINEKEN UK': '/products/heineken-bottle.jpg',
    "CARLSBERG MARSTON'S BREWING COMPANY": '/brand-logos/Carlsberg Marston’s Brewing Company.png',
    'ASAHI UK': '/brand-logos/Asahi UK.png',
    'FEVER-TREE': '/products/fever-tree-tonic.jpg',
    'LVMH (MOET HENNESSY)': '/products/moet-chandon.jpg',
    'EDRINGTON': '/products/macallan-12.png',
    'WILLIAM GRANT & SONS': '/products/Hendricks London Dry Gin.webp',
    'PROXIMO SPIRITS': '/products/jose-cuervo-tequila.jpg',
    'CONSTELLATION BRANDS': '/products/corona-extra.png',
    'REMY COINTREAU': '/brand-logos/Remy Cointreau.png',
    'RED BULL GMBH': '/products/red-bull-can.png',
    'NESTLE': '/products/kitkat-bar.jpg',
    'MONDELEZ': '/products/cadbury-dairy-milk.jpg',
    'KRAFT HEINZ': '/brand-logos/Kraft Heinz.png',
    'UNILEVER': '/brand-logos/Unilever.png',
    'MARS WRIGLEY': '/products/snickers-bar.jpg',
    'DANONE': '/products/infant-formula.jpg',
    "KELLOGG'S": '/brand-logos/Kellogg\'s.png',
    "PLADIS (MCVITIE'S)": '/products/mcvities-digestives.jpg',
    'PREMIER FOODS': '/brand-logos/Premier Foods.png',
    'MOLSON COORS UK': '/brand-logos/Molson Coors UK.png',

    // Categories
    'WHISKY': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'VODKA': '/products/absolut-vodka.png',
    'BEER': '/products/heineken-bottle.jpg',
    'CHAMPAGNE & SPARKLING': '/products/moet-chandon.jpg',
    'CIDER': '/products/cider-bottle.jpg',
    'COGNAC & BRANDY': '/products/hennessy-vs-cognac.jpg',
    'CONFECTIONERY & CHOCOLATES': '/products/cadbury-dairy-milk.jpg',
    'GENERAL': '/products/Singleton 12 Year Old Single Malt Scotch Whisky.webp',
    'GIN': '/products/Hendricks London Dry Gin.webp',
    'GROCERY': '/products/mcvities-digestives.jpg',
    'LIQUEURS': '/products/Baileys Irish Cream Liqueur.jpg',
    'MIXERS & TONICS': '/products/fever-tree-tonic.jpg',
    'READY TO DRINK': '/products/buzzballz-cocktail.jpg',
    'RED WINE': '/products/red-wine-bottle.jpg',
    'ROSÉ WINE': '/products/rose-wine-bottle.jpg',
    'RUM': '/products/bacardi-carta-blanca.jpg',
    'SOFT DRINKS & WATER': '/products/coca-cola-can-330ml.jpg',
    'SPIRITS': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'TEQUILA & MEZCAL': '/products/jose-cuervo-tequila.jpg',
    'BABY FOOD & INFANT NUTRITION': '/products/infant-formula.jpg',

    // Countries (Authentic Geographic Maps)
    'BARBADOS': '/maps/barbados-map.svg',
    'CUBA': '/maps/cuba-map.svg',
    'FRANCE': '/maps/france-map.svg',
    'GERMANY': '/maps/germany-map.svg',
    'GUATEMALA': '/maps/guatemala-map.svg',
    'INDIA': '/maps/india-map.svg',
    'IRELAND': '/maps/ireland-map.svg',
    'ITALY': '/maps/italy-map.svg',
    'JAMAICA': '/maps/jamaica-map.svg',
    'JAPAN': '/maps/japan-map.svg',
    'MEXICO': '/maps/mexico-map.svg',
    'NORTHERN IRELAND': '/maps/northern-ireland-map.svg',
    'POLAND': '/maps/poland-map.svg',
    'SCOTLAND': '/maps/scotland-map.svg',
    'SPAIN': '/maps/spain-map.svg',
    'SWEDEN': '/maps/sweden-map.svg',
    'UNITED KINGDOM': '/maps/united-kingdom-map.svg',
    'UNITED STATES': '/maps/united-states-map.svg',

    // Market Focus
    'ON-TRADE': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'OFF-TRADE': '/products/pepsi-regular-1l.png',
    'COCKTAIL': '/products/fever-tree-tonic.jpg',
};

export const DEFAULT_TAB_HEROES: Record<string, { image: string; title: string; desc: string }> = {
    category: {
        image: '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
        title: 'Built for global FMCG',
        desc: 'Explore verified wholesale portfolios across international spirits, beers, wines, mixers, and groceries.'
    },
    country: {
        image: '/maps/world-map.svg',
        title: 'Worldwide trade origin',
        desc: 'Filter verified commercial allocations by bonded warehouse hub and official country of manufacture.'
    },
    use: {
        image: '/products/fever-tree-tonic.jpg',
        title: 'Tailored distribution',
        desc: 'Select procurement streams optimized for on-trade hospitality, off-trade retail, or high-volume cocktail mixing.'
    },
    owner: {
        image: '/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg',
        title: 'Direct producer houses',
        desc: 'Inspect certified brand houses and multinational conglomerate supply lines with guaranteed provenance.'
    },
    access: {
        image: '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
        title: 'Trade Access',
        desc: 'Refine by compliance and duty status.'
    }
};

