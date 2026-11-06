export interface FilterOptionMeta {
    title: string;
    subtitle: string;
}

export const CATEGORY_META: Record<string, string> = {
    'WHISKY': 'Single malt, blended scotch & bourbon',
    'VODKA': 'Triple-distilled & premium grain',
    'BEER': 'International lagers & craft brews',
    'CHAMPAGNE & SPARKLING': 'Brut, vintage & grand cuvées',
    'CIDER': 'Apple, pear & fruit ciders',
    'COGNAC & BRANDY': 'VS, VSOP & XO aged spirits',
    'CONFECTIONERY & CHOCOLATES': 'Chocolates, sweets & wafers',
    'GENERAL': 'Cross-category commercial lots',
    'GIN': 'London dry & botanical distillations',
    'GROCERY': 'Packaged food & ambient pantry',
    'LIQUEURS': 'Cream, herbal & fruit liqueurs',
    'MIXERS & TONICS': 'Premium tonic water & sodas',
    'READY TO DRINK': 'Pre-mixed cans & cocktails',
    'RED WINE': 'Cabernet, merlot & bordeaux',
    'ROSÉ WINE': 'Provence & crisp dry rosé',
    'RUM': 'Caribbean aged & spiced rums',
    'SOFT DRINKS & WATER': 'Colas, mineral water & sodas',
    'SPIRITS': 'High-rotation distilled portfolio',
    'TEQUILA & MEZCAL': '100% blue agave & reposado',
    'BABY FOOD & INFANT NUTRITION': 'Milk formulas & organic jars'
};

export const COUNTRY_META: Record<string, string> = {
    'UNITED KINGDOM': 'Scotch, gin & domestic FMCG',
    'UNITED STATES': 'Bourbon, soda & snack lines',
    'FRANCE': 'Champagne, cognac & wine',
    'IRELAND': 'Triple-distilled Irish whiskey',
    'MEXICO': 'Tequila, mezcal & beer',
    'GERMANY': 'Pilsner, herbal liqueurs & food',
    'ITALY': 'Aperitivos, prosecco & confectionery',
    'SCOTLAND': 'Single malt & blended scotch',
    'SPAIN': 'Wine, cava & specialty foods',
    'NETHERLANDS': 'European beer & bonded hub',
    'BELGIUM': 'Abbey beers & chocolates',
    'JAPAN': 'Craft whisky & super dry beer',
    'POLAND': 'Traditional rye & potato vodkas',
    'SWEDEN': 'Winter wheat vodka & cider',
    'SWITZERLAND': 'Luxury chocolate & nutrition',
    'CUBA': 'Traditional cane rum',
    'JAMAICA': 'Pot-still Caribbean rums',
    'BARBADOS': 'Heritage aged rums',
    'GUATEMALA': 'Solera aged rums',
    'AUSTRIA': 'Energy drinks & mountain spirits',
    'AUSTRALIA': 'Shiraz, wine & specialty items',
    'NEW ZEALAND': 'Sauvignon blanc & wine',
    'INDIA': 'Single malt & high-rotation FMCG',
    'DENMARK': 'Danish pilsner & butter cookies',
    'NORTHERN IRELAND': 'Bushmills & historic distilleries'
};

export const MARKET_FOCUS_META: Record<string, string> = {
    'ON-TRADE': 'Bars, restaurants, hotels & nightlife venues',
    'OFF-TRADE': 'Supermarkets, cash & carry and retail chains',
    'COCKTAIL': 'High-volume mixing ingredients & aperitifs'
};

export const OWNERSHIP_META: Record<string, string> = {
    'DIAGEO': "Johnnie Walker, Tanqueray, Smirnoff, Baileys",
    'PERNOD RICARD': "Chivas Regal, Jameson, Absolut, Ballantine's",
    'HEINEKEN UK': 'Heineken, Birra Moretti, Desperados',
    'COCA-COLA': 'Coca-Cola Original, Zero Sugar, Sprite, Fanta',
    'PEPSICO': "Pepsi, Lay's, Doritos, Quaker",
    'BROWN FORMAN': "Jack Daniel's, Woodford Reserve, Finlandia",
    'BACARDI LTD.': 'Bacardi Rum, Grey Goose, Bombay Sapphire',
    'BEAM SUNTORY': "Jim Beam, Maker's Mark, Hibiki, Yamazaki",
    'CAMPARI GROUP': 'Aperol, Campari Bitter, Grand Marnier',
    'LVMH (MOET HENNESSY)': 'Moët & Chandon, Hennessy, Dom Pérignon',
    'EDRINGTON': 'The Macallan, Highland Park, Famous Grouse',
    'NESTLE': 'Nescafé, KitKat, San Pellegrino, Perrier',
    'MONDELEZ': 'Cadbury, Oreo, Milka, Toblerone',
    'KRAFT HEINZ': 'Heinz Ketchup, Baked Beans, Mayonnaise',
    'UNILEVER': "Hellmann's, Knorr, Lipton, Magnum",
    "CARLSBERG MARSTON'S BREWING COMPANY": 'Carlsberg, Kronenbourg 1664, San Miguel',
    'ASAHI UK': 'Asahi Super Dry, Peroni Nastro Azzurro',
    'FEVER-TREE': 'Indian Tonic Water, Ginger Beer, Soda',
    'MARS WRIGLEY': "M&M's, Snickers, Extra, Maltesers",
    'RED BULL GMBH': 'Red Bull Energy Drink, Sugarfree, Editions',
    'REMY COINTREAU': 'Rémy Martin, Cointreau, The Botanist',
    'WILLIAM GRANT & SONS': "Glenfiddich, The Balvenie, Hendrick's",
    'PROXIMO SPIRITS': 'Jose Cuervo, Bushmills, Kraken Rum',
    'CONSTELLATION BRANDS': 'Corona Extra, Modelo Especial, Pacifico',
    'DANONE': 'Evian, Volvic, Activia, Aptamil',
    "KELLOGG'S": 'Corn Flakes, Pringles, Special K',
    "PLADIS (MCVITIE'S)": "McVitie's, Carr's, Godiva, Ulker",
    'PREMIER FOODS': "Bisto, Ambrosia, Mr Kipling, Sharwood's"
};

export const FILTER_OPTION_IMAGES: Record<string, string> = {
    // Ownerships
    'DIAGEO': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'PERNOD RICARD': '/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg',
    'BACARDI LTD.': '/brand-logos/BACARDI.png',
    'BROWN FORMAN': '/products/Jack Daniels Tennessee  American Whiskey.webp',
    'BEAM SUNTORY': '/products/Jim beam amwrican whicsky.jpg',
    'CAMPARI GROUP': '/products/Aperol Flavoured Liqueurs.webp',
    'COCA-COLA': '/products/coca-cola-can-330ml.jpg',
    'PEPSICO': '/products/pepsi-regular-1l.png',
    'HEINEKEN UK': '/brand-logos/Heineken UK.png',
    "CARLSBERG MARSTON'S BREWING COMPANY": '/categories/Product Categories/BEER and Cider.jpg',
    'ASAHI UK': '/brand-logos/Asahi UK.png',
    'FEVER-TREE': '/brand-logos/Fever Tree.png',
    'LVMH (MOET HENNESSY)': '/products/Veuve Clicquot GB Champagne.webp',
    'EDRINGTON': '/products/Singleton 12 Year Old Single Malt Scotch Whisky.webp',
    'WILLIAM GRANT & SONS': '/products/Hendricks London Dry Gin.webp',
    'PROXIMO SPIRITS': '/products/Bushmills Single Malt Irish Whiskey.jpg',
    'CONSTELLATION BRANDS': '/brand-logos/Constellation Brands.png',
    'REMY COINTREAU': '/brand-logos/Remy Cointreau.png',
    'RED BULL GMBH': '/brand-logos/Red Bull.png',
    'NESTLE': '/brand-logos/Nestle.png',
    'MONDELEZ': '/brand-logos/Mondelez.png',
    'KRAFT HEINZ': '/brand-logos/Kraft Heinz.png',
    'UNILEVER': '/brand-logos/Unilever.png',
    'MARS WRIGLEY': '/brand-logos/Mars Wrigley.png',
    'DANONE': '/brand-logos/Danone.png',
    "KELLOGG'S": '/brand-logos/Kellogg\'s.png',
    "PLADIS (MCVITIE'S)": '/brand-logos/Pladis (McVitie’s).png',
    'PREMIER FOODS': '/brand-logos/Premier Foods.png',
    'MOLSON COORS UK': '/brand-logos/Molson Coors UK.png',

    // Categories
    'WHISKY': '/categories/Spirits/Whisky/Scotch Whisky.png',
    'VODKA': '/products/Singleton 12 Year Old Single Malt Scotch Whisky.webp',
    'BEER': '/categories/Product Categories/BEER and Cider.jpg',
    'CHAMPAGNE & SPARKLING': '/products/Veuve Clicquot GB Champagne.webp',
    'CIDER': '/categories/Beer & Cider/Cider/Cider.jpg',
    'COGNAC & BRANDY': '/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg',
    'CONFECTIONERY & CHOCOLATES': '/categories/Product Categories/FOOD AND GROCERY.png',
    'GENERAL': '/categories/Product Categories/Spirits.jpg',
    'GIN': '/products/Hendricks London Dry Gin.webp',
    'GROCERY': '/categories/Product Categories/FOOD AND GROCERY.png',
    'LIQUEURS': '/products/Baileys Irish Cream Liqueur.jpg',
    'MIXERS & TONICS': '/categories/Product Categories/Soft drink -Cocktail mixer tonic.jpg',
    'READY TO DRINK': '/products/coca-cola-can-330ml.jpg',
    'RED WINE': '/categories/Product Categories/Wine and Champagne.jpg',
    'ROSÉ WINE': '/categories/Product Categories/Wine and Champagne.jpg',
    'RUM': '/products/Captain Morgan Spiced Rum.jpg',
    'SOFT DRINKS & WATER': '/products/pepsi-regular-1l.png',
    'SPIRITS': '/categories/Product Categories/Spirits.jpg',
    'TEQUILA & MEZCAL': '/products/Bushmills Single Malt Irish Whiskey.jpg',
    'BABY FOOD & INFANT NUTRITION': '/categories/Product Categories/FOOD AND GROCERY.png',

    // Countries
    'UNITED KINGDOM': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'UNITED STATES': '/products/Jack Daniels Tennessee  American Whiskey.webp',
    'FRANCE': '/products/Veuve Clicquot GB Champagne.webp',
    'IRELAND': '/products/Jameson Irish Whiskey.webp',
    'MEXICO': '/products/Bushmills Single Malt Irish Whiskey.jpg',
    'GERMANY': '/products/Jägermeister Liqueur.jpg',
    'ITALY': '/products/Aperol Flavoured Liqueurs.webp',
    'SCOTLAND': '/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg',
    'SPAIN': '/categories/Product Categories/Wine and Champagne.jpg',
    'NETHERLANDS': '/brand-logos/Heineken UK.png',
    'BELGIUM': '/categories/Product Categories/BEER and Cider.jpg',
    'JAPAN': '/products/Jim beam amwrican whicsky.jpg',
    'POLAND': '/categories/Product Categories/Spirits.jpg',
    'SWEDEN': '/products/Singleton 12 Year Old Single Malt Scotch Whisky.webp',
    'SWITZERLAND': '/brand-logos/Nestle.png',
    'CUBA': '/products/Captain Morgan Spiced Rum.jpg',
    'JAMAICA': '/products/Captain Morgan Spiced Rum.jpg',
    'BARBADOS': '/products/Captain Morgan Spiced Rum.jpg',
    'GUATEMALA': '/products/Captain Morgan Spiced Rum.jpg',
    'AUSTRIA': '/brand-logos/Red Bull.png',
    'AUSTRALIA': '/categories/Product Categories/Wine and Champagne.jpg',
    'NEW ZEALAND': '/categories/Product Categories/Wine and Champagne.jpg',
    'INDIA': '/products/Johnnie Walker Red Label Scotch Whisky.webp',
    'DENMARK': '/categories/Product Categories/BEER and Cider.jpg',
    'NORTHERN IRELAND': '/products/Bushmills Single Malt Irish Whiskey.jpg',

    // Market Focus
    'ON-TRADE': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'OFF-TRADE': '/products/coca-cola-can-330ml.jpg',
    'COCKTAIL': '/products/Aperol Flavoured Liqueurs.webp',
};

export const DEFAULT_TAB_HEROES: Record<string, { image: string; title: string; desc: string }> = {
    category: {
        image: '/categories/Product Categories/Spirits.jpg',
        title: 'Built for global FMCG',
        desc: 'Explore verified wholesale portfolios across international spirits, beers, wines, mixers, and groceries.'
    },
    country: {
        image: '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
        title: 'Worldwide trade origin',
        desc: 'Filter verified commercial allocations by bonded warehouse hub and official country of manufacture.'
    },
    use: {
        image: '/products/Aperol Flavoured Liqueurs.webp',
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

