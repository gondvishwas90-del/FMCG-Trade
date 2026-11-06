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

