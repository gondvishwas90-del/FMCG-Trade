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
    'BACARDI LTD.': '/products/bacardi-carta-blanca.jpg',
    'BROWN FORMAN': '/products/Jack Daniels Tennessee  American Whiskey.webp',
    'BEAM SUNTORY': '/products/Jim beam amwrican whicsky.jpg',
    'CAMPARI GROUP': '/products/campari-bitter.jpg',
    'COCA-COLA': '/products/coca-cola-can-330ml.jpg',
    'PEPSICO': '/products/pepsi-regular-1l.png',
    'HEINEKEN UK': '/products/heineken-bottle.jpg',
    "CARLSBERG MARSTON'S BREWING COMPANY": '/products/heineken-bottle.jpg',
    'ASAHI UK': '/products/heineken-bottle.jpg',
    'FEVER-TREE': '/products/fever-tree-tonic.jpg',
    'LVMH (MOET HENNESSY)': '/products/moet-chandon.jpg',
    'EDRINGTON': '/products/macallan-12.png',
    'WILLIAM GRANT & SONS': '/products/Hendricks London Dry Gin.webp',
    'PROXIMO SPIRITS': '/products/jose-cuervo-tequila.jpg',
    'CONSTELLATION BRANDS': '/products/corona-extra.png',
    'REMY COINTREAU': '/products/hennessy-vs-cognac.jpg',
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
    'MOLSON COORS UK': '/products/heineken-bottle.jpg',

    // Categories
    'WHISKY': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'VODKA': '/products/absolut-vodka.png',
    'BEER': '/products/heineken-bottle.jpg',
    'CHAMPAGNE & SPARKLING': '/products/moet-chandon.jpg',
    'CIDER': '/products/cider-bottle.jpg',
    'COGNAC & BRANDY': '/products/hennessy-vs-cognac.jpg',
    'CONFECTIONERY & CHOCOLATES': '/products/kitkat-bar.jpg',
    'GENERAL': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'GIN': '/products/Hendricks London Dry Gin.webp',
    'GROCERY': '/products/mcvities-digestives.jpg',
    'LIQUEURS': '/products/Baileys Irish Cream Liqueur.jpg',
    'MIXERS & TONICS': '/products/fever-tree-tonic.jpg',
    'READY TO DRINK': '/products/buzzballz-cocktail.jpg',
    'RED WINE': '/products/red-wine-bottle.jpg',
    'ROSÉ WINE': '/products/rose-wine-bottle.jpg',
    'RUM': '/products/bacardi-carta-blanca.jpg',
    'SOFT DRINKS & WATER': '/products/pepsi-regular-1l.png',
    'SPIRITS': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'TEQUILA & MEZCAL': '/products/jose-cuervo-tequila.jpg',
    'BABY FOOD & INFANT NUTRITION': '/products/infant-formula.jpg',

    // Countries
    'UNITED KINGDOM': '/products/Johnnie Walker Black  Label Scotch Whisky.webp',
    'UNITED STATES': '/products/Jack Daniels Tennessee  American Whiskey.webp',
    'FRANCE': '/products/moet-chandon.jpg',
    'IRELAND': '/products/Jameson Irish Whiskey.webp',
    'MEXICO': '/products/corona-extra.png',
    'GERMANY': '/products/Jägermeister Liqueur.jpg',
    'ITALY': '/products/campari-bitter.jpg',
    'SCOTLAND': '/products/macallan-12.png',
    'SPAIN': '/products/red-wine-bottle.jpg',
    'NETHERLANDS': '/products/heineken-bottle.jpg',
    'BELGIUM': '/products/heineken-bottle.jpg',
    'JAPAN': '/products/hibiki-harmony.jpg',
    'POLAND': '/products/absolut-vodka.png',
    'SWEDEN': '/products/absolut-vodka.png',
    'SWITZERLAND': '/products/kitkat-bar.jpg',
    'CUBA': '/products/bacardi-carta-blanca.jpg',
    'JAMAICA': '/products/Captain Morgan Spiced Rum.jpg',
    'BARBADOS': '/products/Captain Morgan Spiced Rum.jpg',
    'GUATEMALA': '/products/Captain Morgan Spiced Rum.jpg',
    'AUSTRIA': '/products/red-bull-can.png',
    'AUSTRALIA': '/products/red-wine-bottle.jpg',
    'NEW ZEALAND': '/products/red-wine-bottle.jpg',
    'INDIA': '/products/Johnnie Walker Red Label Scotch Whisky.webp',
    'DENMARK': '/products/heineken-bottle.jpg',
    'NORTHERN IRELAND': '/products/Bushmills Single Malt Irish Whiskey.jpg',

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
        image: '/products/Jameson Irish Whiskey.webp',
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

