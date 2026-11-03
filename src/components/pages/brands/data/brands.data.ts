import type { Brand } from '../types/brand.types';

export const fallbackBrands: Brand[] = [
    {
        id: "johnnie-walker",
        name: "Johnnie Walker",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A globally dominant Scotch whisky brand with strong pull across both on-trade and off-trade channels.",
        description: "Founded in the 19th century, Johnnie Walker has grown from a Scottish grocery business into one of the world's most recognized Scotch whisky brands. Built on the philosophy of forward movement and master blending.",
        tagline: "Keep Walking",
        category: "Spirits & Liquors",
        categoryFit: ["Blended Scotch", "Premium Whisky", "Duty-Free Spirits"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["scotch-whisky"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "diageo",
            name: "Diageo",
            logo: "/brands/diageo.png"
        },
        products: [
            {
                name: "Black Label 12YO Blended Scotch",
                image: "/products/Johnnie Walker Black  Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl • 100 cs / Pallet",
                description: "The benchmark premium 12-year-old blended Scotch whisky with rich, complex smoky depth."
            },
            {
                name: "Red Label Blended Scotch",
                image: "/products/Johnnie Walker Red Label Scotch Whisky.webp",
                abv: "40%",
                size: "12 x 1L & 6 x 70cl Cases (Pallet: 60 / 100 cases)",
                description: "High-volume rotation blended whisky suitable for international export and retail resale."
            },
            {
                name: "Blue Label Luxury Blend",
                image: "/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg",
                abv: "40%",
                size: "6 x 75cl Gift Cases (Bonded Port Allocation)",
                description: "Rare and prestigious blend with hand-selected rare casks for duty-free and luxury on-trade."
            }
        ],
        portfolioRanges: [
            {
                id: "jw-core",
                rangeName: "Red & Black Label Commercial Tier",
                categoryPath: "Spirits → Scotch Whisky → Blended",
                tradePositioning: "Core Volume",
                commonTradeUse: ["Off-trade retail", "High-volume wholesale", "Duty-free trade"],
                typicalFormats: ["6 x 70cl", "12 x 1L", "Full Pallets (60-100 cs)", "20ft FCL (1,800 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded dispatch (Loendersloot / PLG)", "UK Duty-Paid Available", "EUR1 / COO Certified"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "chivas-regal",
        name: "Chivas Regal",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A heritage of luxury blending and refined Scotch craftsmanship for premium retail and on-trade.",
        description: "Pioneering luxury blended Scotch whisky since the 19th century. Known for rich, smooth profiles tailored for premium on-trade and upscale international retail.",
        tagline: "Success Is a Blend",
        category: "Spirits & Liquors",
        categoryFit: ["Blended Scotch", "Luxury Spirits", "Travel Retail"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["scotch-whisky"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "pernod-ricard",
            name: "Pernod Ricard",
            logo: "/brands/pernod.png"
        },
        products: [
            {
                name: "Chivas Regal 12 Year Old",
                image: "/products/Chivas Regal 12 Year Old Blended Scotch Whisky.jpg",
                abv: "40%",
                size: "6 x 70cl • 100 cs / Pallet",
                description: "Smooth blend of finest malt and grain whiskies matured for at least 12 years."
            },
            {
                name: "Chivas Regal 18 Year Old Gold Signature",
                image: "/products/Johnnie Walker Red Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl Gift Box (Pallet: 80 cases)",
                description: "Rich, multi-layered blend with 85 unique flavour notes in every drop."
            }
        ],
        portfolioRanges: [
            {
                id: "chivas-core",
                rangeName: "Chivas 12 & 18 Year Tier",
                categoryPath: "Spirits → Scotch Whisky → Premium Blended",
                tradePositioning: "Premium",
                commonTradeUse: ["Duty-Free", "High-End Retail", "Hotel & On-Trade"],
                typicalFormats: ["6 x 70cl", "12 x 1L", "Mixed Pallet Allocations"],
                relevantFor: ["export-portfolio", "on-trade-cocktail"]
            }
        ],
        marketConsiderations: ["Bonded Storage T1", "Container Export (FCL)", "UK/EU Compliance"],
        tradeIntents: ["export-portfolio"]
    },
    {
        id: "jameson",
        name: "Jameson",
        country: "Ireland",
        countryCode: "IE",
        positioning: "A globally dominant Irish whiskey with exceptional on-trade pull and high-turnover bar culture presence.",
        description: "Founded in 1780, Jameson is the world's most widely consumed Irish whiskey, triple-distilled for signature smoothness and versatile cocktail pairing.",
        tagline: "Sine Metu",
        category: "Spirits & Liquors",
        categoryFit: ["Irish Whiskey", "High-Rotation Spirits", "On-Trade Core"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["irish-whiskey"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "pernod-ricard",
            name: "Pernod Ricard",
            logo: "/brands/pernod.png"
        },
        products: [
            {
                name: "Jameson Original Triple Distilled",
                image: "/products/Johnnie Walker Red Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl • 105 cs / Pallet",
                description: "Triple distilled, twice as smooth, perfectly balanced for on-trade and wholesale."
            },
            {
                name: "Jameson Black Barrel",
                image: "/products/Johnnie Walker Black  Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl Cases (Pallet: 90 cases)",
                description: "Double charred bourbon cask finish delivering heightened richness and complexity."
            }
        ],
        portfolioRanges: [
            {
                id: "jameson-standard",
                rangeName: "Jameson Original Wholesale Lot",
                categoryPath: "Spirits → Irish Whiskey",
                tradePositioning: "Core High-Rotation",
                commonTradeUse: ["Bar distribution", "Supermarket retail", "Export containers"],
                typicalFormats: ["6 x 70cl", "12 x 1L", "Full Pallets (105 cs)", "FCL (1,950 cs)"],
                relevantFor: ["volume-strategic", "on-trade-cocktail"]
            }
        ],
        marketConsiderations: ["Under-Bond Transfer", "UK Domestic Fast Delivery", "Full Container Directs"],
        tradeIntents: ["volume-strategic", "on-trade-cocktail"]
    },
    {
        id: "jack-daniels",
        name: "Jack Daniel's",
        country: "United States",
        countryCode: "US",
        positioning: "An iconic American whiskey defined by charcoal mellowing, global cultural recognition, and huge volume turnover.",
        description: "Founded in 1866 in Lynchburg, Tennessee. Charcoal mellowed drop by drop through sugar maple charcoal for smooth signature taste.",
        tagline: "It’s Not Scotch. It’s Not Bourbon. It’s Tennessee Whiskey.",
        category: "Spirits & Liquors",
        categoryFit: ["American Whiskey", "Tennessee Whiskey", "Global Anchor"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["american-whiskey"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "brown-forman",
            name: "Brown-Forman",
            logo: "/brands/brown-forman.png"
        },
        products: [
            {
                name: "Old No. 7 Tennessee Whiskey",
                image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
                abv: "40%",
                size: "6 x 70cl & 12 x 1L Cases (Pallet: 100 / 60 cases)",
                description: "The world's leading Tennessee whiskey, essential for on-trade and wholesale distributors."
            },
            {
                name: "Gentleman Jack Double Mellowed",
                image: "/products/Johnnie Walker Black  Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl Cases (Pallet: 90 cases)",
                description: "Undergoes a second charcoal mellowing for exceptional smoothness."
            }
        ],
        portfolioRanges: [
            {
                id: "jd-standard",
                rangeName: "Old No. 7 Volume Allocation",
                categoryPath: "Spirits → American Whiskey",
                tradePositioning: "Core Volume",
                commonTradeUse: ["High-Volume Wholesale", "Bar Accounts", "Duty-Free Corridors"],
                typicalFormats: ["6 x 70cl", "12 x 1L", "Pallets & 40ft Containers"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Bonded Warehouse Accounts", "Transit Documentation", "Direct Container Loads"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "aptamil",
        name: "Aptamil",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A science-led premium infant nutrition brand built on 50 years of early life nutrition research.",
        description: "Global market leader in infant nutrition, developed through extensive scientific formulations supporting baby growth and developmental stages. A primary staple for export and healthcare-backed retail.",
        tagline: "Inspired by 50 Years of Research in Early Life Science",
        category: "Food & Grocery",
        categoryFit: ["Baby Food & Infant Nutrition", "Early Life Nutrition", "Export Core"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["baby-food"],
        tier3Ids: ["infant-formula"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "danone",
            name: "Danone",
            logo: "/brands/danone.png"
        },
        products: [
            {
                name: "Aptamil 1 First Infant Milk (Stage 1)",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "6 x 800g Tins per Case (Pallet: 80 cases / 480 tins)",
                description: "Nutritionally complete breastmilk substitute from birth onwards in hermetically sealed 800g tins."
            },
            {
                name: "Aptamil 2 Follow On Milk (Stage 2)",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "6 x 800g Tins per Case (Pallet: 80 cases / 480 tins)",
                description: "Formulated for babies from 6 to 12 months with vitamins C & D and tailored iron levels."
            },
            {
                name: "Aptamil 3 Toddler Milk (Stage 3)",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "6 x 800g Tins per Case (Pallet: 80 cases / 480 tins)",
                description: "Enriched growing up milk for toddlers aged 1 to 2 years with prebiotics and omega-3."
            }
        ],
        portfolioRanges: [
            {
                id: "aptamil-export",
                rangeName: "Stage 1, 2, 3 Export Pallet Lots",
                categoryPath: "Food & Grocery → Baby Food → Formula",
                tradePositioning: "Super-Premium Formula",
                commonTradeUse: ["Cross-Border Export", "Pharmacy Distribution", "Supermarket Retail"],
                typicalFormats: ["6 x 800g Cases", "Full Pallets (80 cs / 480 tins)", "40ft Container (1,920 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Batch Fresh Production Dates", "Health Certificates & Certificate of Origin", "Container Moisture Sealed"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "cow-gate",
        name: "Cow & Gate",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A heritage infant nutrition brand providing accessible, reliable daily nourishment for families.",
        description: "Supporting families for over a century with infant formulas and everyday baby foods, offering trusted quality across the UK and international markets.",
        tagline: "Supporting Your Baby Every Step of the Way",
        category: "Food & Grocery",
        categoryFit: ["Baby Food & Infant Nutrition", "Dairy & Nutrition"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["baby-food"],
        tier3Ids: ["infant-formula"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "danone",
            name: "Danone",
            logo: "/brands/danone.png"
        },
        products: [
            {
                name: "First Infant Milk Stage 1",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "6 x 800g Tins (Pallet: 80 cases)",
                description: "Complete infant nutrition from birth, suitable as sole source of nutrition."
            },
            {
                name: "Follow-On Milk Stage 2",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "6 x 800g Tins (Pallet: 80 cases)",
                description: "Nutritional support for weaning babies from 6-12 months."
            }
        ],
        portfolioRanges: [
            {
                id: "cg-core",
                rangeName: "Stage 1 & 2 Standard Formats",
                categoryPath: "Food & Grocery → Baby Food",
                tradePositioning: "Core Value",
                commonTradeUse: ["Off-trade wholesale", "Export channels", "Retail chains"],
                typicalFormats: ["6 x 800g", "Pallet Loads (80 cs)"],
                relevantFor: ["volume-strategic"]
            }
        ],
        marketConsiderations: ["UK Domestic & Export Certified", "Pallet & Container Available"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "kitkat",
        name: "KitKat",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A globally iconic chocolate wafer brand built on simple break rituals, unmatched brand power, and mass volume.",
        description: "Crisp wafer fingers enrobed in smooth milk chocolate. One of the highest rotation confectionery lines globally, commanding consistent multi-pallet and container demand.",
        tagline: "Have a Break, Have a KitKat",
        category: "Food & Grocery",
        categoryFit: ["Confectionery & Chocolates", "High-Rotation Snacks", "Export Confectionery"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["confectionery"],
        tier3Ids: ["chocolate"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "nestle",
            name: "Nestlé",
            logo: "/brands/nestle.png"
        },
        products: [
            {
                name: "KitKat 4-Finger Milk Chocolate",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "24 x 41.5g Display Outer (Pallet: 192 cases / 4,608 bars)",
                description: "Original 4-finger crisp wafer in milk chocolate. Standard wholesale outer display."
            },
            {
                name: "KitKat Chunky Milk Chocolate",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "24 x 40g Display Outer (Pallet: 192 cases)",
                description: "Single chunky wafer finger for grab-and-go convenience and vending distribution."
            }
        ],
        portfolioRanges: [
            {
                id: "kitkat-wholesale",
                rangeName: "Display Outers Commercial Tier",
                categoryPath: "Food & Grocery → Confectionery → Chocolate",
                tradePositioning: "Core High-Rotation",
                commonTradeUse: ["Cash & carry", "Retail supermarkets", "Container trade export"],
                typicalFormats: ["24 x 41.5g", "Pallet Loads (192 cs)", "20ft FCL (2,400 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Temperature-Controlled Container Reefer", "UK/EU Ingredients Compliant", "Multi-Pallet Lots"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "snickers",
        name: "Snickers",
        country: "United States",
        countryCode: "US",
        positioning: "A globally leading chocolate confectionery bar built on energy, real roasted peanuts, and mass consumer appeal.",
        description: "Packed with roasted peanuts, nougat, caramel and milk chocolate. A staple core SKU for vending, impulse retail, and international container shipments.",
        tagline: "You’re Not You When You’re Hungry",
        category: "Food & Grocery",
        categoryFit: ["Confectionery & Chocolates", "Impulse Retail"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["confectionery"],
        tier3Ids: ["chocolate"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "mars-wrigley",
            name: "Mars Wrigley",
            logo: "/brands/mars.png"
        },
        products: [
            {
                name: "Snickers Standard Single Bar",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "24 x 48g Display Box (Pallet: 180 cases / 4,320 bars)",
                description: "Standard counter display outer for wholesale distributors and supermarket chains."
            },
            {
                name: "Snickers Duo Double Bar",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "24 x 80g Display Box (Pallet: 140 cases)",
                description: "Two-piece bar designed for sharing and maximum impulse turnover."
            }
        ],
        portfolioRanges: [
            {
                id: "snickers-fmcg",
                rangeName: "Snickers Standard Wholesale Lots",
                categoryPath: "Food & Grocery → Confectionery",
                tradePositioning: "Core High-Rotation",
                commonTradeUse: ["Wholesale distribution", "Convenience retail", "Export transit"],
                typicalFormats: ["24 x 48g", "Full Pallets (180 cs)", "Container Allocation"],
                relevantFor: ["volume-strategic"]
            }
        ],
        marketConsiderations: ["Reefer Temperature Monitored", "Long Expiry Batches", "Pallet & Container Minimums"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "cadbury-dairy-milk",
        name: "Cadbury Dairy Milk",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "A flagship British chocolate brand built on glass and a half heritage, exceptional consumer trust, and high retail turnover.",
        description: "The UK's iconic milk chocolate brand, crafted with fresh milk. A universal favourite across retail networks, gift channels, and overseas British food distribution.",
        tagline: "There's a Glass and a Half in Everyone",
        category: "Food & Grocery",
        categoryFit: ["Confectionery & Chocolates", "British Food Export"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["confectionery"],
        tier3Ids: ["chocolate"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "mondelez",
            name: "Mondelez",
            logo: "/brands/mondelez.png"
        },
        products: [
            {
                name: "Cadbury Dairy Milk Standard Tablet",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "18 x 110g Outer Case (Pallet: 144 cases)",
                description: "Standard tablet bar in iconic purple foil packaging."
            },
            {
                name: "Cadbury Dairy Milk Giant Sharing Bar",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "16 x 200g Outer Case (Pallet: 120 cases)",
                description: "Generous 200g block for sharing occasions and retail promotional ends."
            }
        ],
        portfolioRanges: [
            {
                id: "cadbury-range",
                rangeName: "Dairy Milk Block Commercial Range",
                categoryPath: "Food & Grocery → Confectionery → Tablets",
                tradePositioning: "Core Heritage",
                commonTradeUse: ["Supermarket chains", "Cash & Carry", "Export lots"],
                typicalFormats: ["18 x 110g", "16 x 200g", "Pallets (120-144 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["UK Domestic Fast Shipping", "Export Documents EUR1", "Temperature Controlled"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "mcvities",
        name: "McVitie's",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "The undisputed leader in British biscuits, built on everyday consumption, authentic heritage, and dependable turnover.",
        description: "Baking Britain's favourite biscuits since 1839. Digestives, Rich Tea, and Hobnobs represent foundational pantry staples for grocery wholesalers and international importers.",
        tagline: "The True Original",
        category: "Food & Grocery",
        categoryFit: ["Grocery & Pantry", "Biscuits & Bakery", "British Staples"],
        tier1Ids: ["food-grocery"],
        tier2Ids: ["grocery"],
        tier3Ids: ["biscuits"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "pladis",
            name: "Pladis",
            logo: "/brands/pladis.png"
        },
        products: [
            {
                name: "McVitie's Digestives Original Roll Pack",
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "12 x 400g Cases (Pallet: 96 cases / 1,152 rolls)",
                description: "The classic wheat biscuit with wholesome crumb and distinctive flavor."
            },
            {
                name: "McVitie's Milk Chocolate Digestives",
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600",
                abv: "0%",
                size: "12 x 266g Cases (Pallet: 108 cases)",
                description: "Topped with a generous layer of silky milk chocolate."
            }
        ],
        portfolioRanges: [
            {
                id: "mcvities-core",
                rangeName: "Digestives & Hobnobs Pallet Allocations",
                categoryPath: "Food & Grocery → Biscuits",
                tradePositioning: "Core Pantry",
                commonTradeUse: ["Grocery distribution", "Cash & carry wholesale", "Export shipping"],
                typicalFormats: ["12 x 400g", "Pallet Loads (96 cs)", "Container Loads"],
                relevantFor: ["volume-strategic"]
            }
        ],
        marketConsiderations: ["Pallet & Container Available", "Long Shelf Life (12+ Months)", "UK Production Fresh"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "heineken",
        name: "Heineken",
        country: "Netherlands",
        countryCode: "NL",
        positioning: "The world's leading international premium lager brand, driving massive global turnover across on-trade and retail.",
        description: "Brewed with 100% natural ingredients—barley, water, hops, and unique Heineken A-yeast. Exceptional recognition and consistent volume across 190+ countries.",
        tagline: "Open Your World",
        category: "Beers & Craft",
        categoryFit: ["Premium Lager", "International Beer", "High-Volume Keg & Bottle"],
        tier1Ids: ["beer"],
        tier2Ids: ["lager"],
        tier3Ids: ["international-lager"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1608270119299-4458b09b30c5?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "heineken-global",
            name: "Heineken",
            logo: "/brands/heineken.png"
        },
        products: [
            {
                name: "Heineken Premium Lager Bottle",
                image: "https://images.unsplash.com/photo-1608270119299-4458b09b30c5?auto=format&fit=crop&q=80&w=600",
                abv: "5.0%",
                size: "24 x 330ml Case (Pallet: 63 cases / 1,512 bottles)",
                description: "The global icon. Pure malt lager brewed with horizontal fermentation."
            },
            {
                name: "Heineken Premium Lager Can",
                image: "https://images.unsplash.com/photo-1608270119299-4458b09b30c5?auto=format&fit=crop&q=80&w=600",
                abv: "5.0%",
                size: "24 x 500ml Shrink Tray (Pallet: 72 trays / 1,728 cans)",
                description: "High-rotation 500ml cans for retail and outdoor venue distribution."
            }
        ],
        portfolioRanges: [
            {
                id: "heineken-lots",
                rangeName: "330ml Bottles & 500ml Cans Commercial Lots",
                categoryPath: "Beers & Craft → Lager",
                tradePositioning: "Core High-Volume",
                commonTradeUse: ["Duty-Free beer trade", "Wholesale cash & carry", "On-trade venue supply"],
                typicalFormats: ["24 x 330ml", "24 x 500ml", "Full Truckload (FTL 26 Pallets)", "20ft/40ft Container"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded Dispatch", "Temperature Controlled", "Truckload & Container Loads Only"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "fever-tree",
        name: "Fever-Tree",
        country: "United Kingdom",
        countryCode: "GB",
        positioning: "The pioneer of premium natural mixers, revolutionizing the global tonic and mixer category.",
        description: "Crafted by blending highest-quality botanicals with spring water and quinine from the Congo. The number one choice for upscale on-trade bars and spirit pairings.",
        tagline: "If 3/4 of Your Drink is the Mixer, Mix with the Best",
        category: "Speciality Beverages",
        categoryFit: ["Premium Mixers", "Tonic & Soda", "On-Trade Essential"],
        tier1Ids: ["cocktails"],
        tier2Ids: ["mixers"],
        tier3Ids: ["tonic"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "fevertree-drinks",
            name: "Fever-Tree",
            logo: "/brands/fevertree.png"
        },
        products: [
            {
                name: "Premium Indian Tonic Water",
                image: "/products/Aperol Flavoured Liqueurs.webp",
                abv: "0%",
                size: "24 x 200ml Glass Bottles (Pallet: 88 cases / 2,112 bottles)",
                description: "Signature tonic crafted with natural quinine and Mexican bitter orange oils."
            },
            {
                name: "Mediterranean Tonic Water",
                image: "/products/Aperol Flavoured Liqueurs.webp",
                abv: "0%",
                size: "24 x 200ml Glass Bottles (Pallet: 88 cases)",
                description: "Delicate herbal blend with rosemary and lemon thyme from the Mediterranean shores."
            }
        ],
        portfolioRanges: [
            {
                id: "fevertree-wholesale",
                rangeName: "24x200ml Glass Commercial Cases",
                categoryPath: "Speciality Beverages → Mixers → Tonics",
                tradePositioning: "Super-Premium Mixer",
                commonTradeUse: ["High-end bar accounts", "Hotel beverage supply", "Distributor spirit bundling"],
                typicalFormats: ["24 x 200ml", "Pallet Allocations (88 cs)", "Mixed Pallets"],
                relevantFor: ["on-trade-cocktail", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Pallet & Mixed Pallet Dispatch", "UK Domestic & Export Documentation", "No Minimum Consumer Orders"],
        tradeIntents: ["on-trade-cocktail", "export-portfolio"]
    },
    {
        id: "bushmills",
        name: "Bushmills",
        country: "Northern Ireland",
        countryCode: "GB",
        positioning: "Distilled with heritage dating back to 1608, crafting smooth triple-distilled Irish whiskeys.",
        description: "One of the oldest licensed whiskey distilleries globally, producing distinctive single malts and smooth blends tailored for premium on-trade and duty-free export.",
        tagline: "The Old Bushmills Distillery",
        category: "Spirits",
        categoryFit: ["Irish Whiskey", "Single Malt", "Blended Whiskey"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["irish-whiskey"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "proximo-spirits",
            name: "Proximo Spirits",
            logo: "/brands/proximo.png"
        },
        products: [
            {
                name: "Bushmills Original Triple Distilled",
                image: "/products/Johnnie Walker Black  Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl • 100 cs / Pallet",
                description: "Triple distilled grain and malt whiskey known for versatile warmth and light fruit notes."
            }
        ],
        portfolioRanges: [
            {
                id: "bushmills-core",
                rangeName: "Original & Black Bush Cases",
                categoryPath: "Spirits → Irish Whiskey",
                tradePositioning: "Core Premium Irish",
                commonTradeUse: ["On-trade bars", "Duty-free trade", "Retail export"],
                typicalFormats: ["6 x 70cl", "Pallet Loads (100 cs)"],
                relevantFor: ["export-portfolio", "volume-strategic"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded Dispatch", "EUR1 & Certificate of Origin"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "jim-beam",
        name: "Jim Beam",
        country: "United States",
        countryCode: "US",
        positioning: "The world's #1 Kentucky straight bourbon whiskey with unmatched volume pull across global retail.",
        description: "Distilled since 1795 with family traditions spanning seven generations. Aged for four years in newly charred American white oak barrels.",
        tagline: "Made from Bourbon Tradition",
        category: "Spirits",
        categoryFit: ["Bourbon", "American Whiskey"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["bourbon"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "suntory-global-spirits",
            name: "Suntory Global Spirits",
            logo: "/brands/suntory.png"
        },
        products: [
            {
                name: "Jim Beam White Label Bourbon",
                image: "/products/Johnnie Walker Red Label Scotch Whisky.webp",
                abv: "40%",
                size: "6 x 70cl • 100 cs / Pallet",
                description: "The classic Kentucky straight bourbon with vanilla, toasted oak, and spicy caramel notes."
            }
        ],
        portfolioRanges: [
            {
                id: "jb-white",
                rangeName: "White & Black Commercial Cases",
                categoryPath: "Spirits → Bourbon",
                tradePositioning: "Core High-Volume Bourbon",
                commonTradeUse: ["Off-trade grocery", "High-volume on-trade", "FCL export"],
                typicalFormats: ["6 x 70cl", "12 x 1L", "Pallet Loads (100 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Bonded Dispatch (Loendersloot)", "Container Loads FCL"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "hibiki",
        name: "Hibiki",
        country: "Japan",
        countryCode: "JP",
        positioning: "Harmonious Japanese blended whisky celebrated globally for nuanced elegance and luxury craft.",
        description: "A blend of numerous malt and grain whiskies meticulously chosen from Suntory distilleries Yamazaki, Hakushu, and Chita. A global symbol of Japanese craftsmanship.",
        tagline: "Japanese Harmony",
        category: "Spirits",
        categoryFit: ["Japanese Whisky", "Prestige Blended Whisky"],
        tier1Ids: ["spirits"],
        tier2Ids: ["whisky"],
        tier3Ids: ["japanese-whisky"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "suntory-global-spirits",
            name: "Suntory Global Spirits",
            logo: "/brands/suntory.png"
        },
        products: [
            {
                name: "Hibiki Japanese Harmony",
                image: "/products/Johnnie Walker Black  Label Scotch Whisky.webp",
                abv: "43%",
                size: "6 x 70cl • 80 cs / Pallet",
                description: "Delicate honey, orange peel, and white chocolate notes with Mizunara oak finish."
            }
        ],
        portfolioRanges: [
            {
                id: "hibiki-harmony",
                rangeName: "Prestige Allocations",
                categoryPath: "Spirits → Japanese Whisky",
                tradePositioning: "Luxury On-Trade / Travel Retail",
                commonTradeUse: ["Luxury bars", "Bonded collectors", "High-end retail"],
                typicalFormats: ["6 x 70cl Gift Box", "Export Air & Ocean Freight"],
                relevantFor: ["export-portfolio"]
            }
        ],
        marketConsiderations: ["Allocated Supply", "Bonded Export Only"],
        tradeIntents: ["export-portfolio"]
    },
    {
        id: "yellow-tail",
        name: "Yellow Tail",
        country: "Australia",
        countryCode: "AU",
        positioning: "A globally dominant wine brand with phenomenal volume turnover across worldwide retail markets.",
        description: "Created in Yenda, Australia by Casella Family Brands. Yellow Tail revolutionized modern wine retail with approachable flavor, iconic kangaroo packaging, and mass-market accessibility.",
        tagline: "Great Wine for Everyone",
        category: "Wine & Champagne",
        categoryFit: ["Shiraz", "Cabernet Sauvignon", "Chardonnay", "Pinot Grigio"],
        tier1Ids: ["wine"],
        tier2Ids: ["red-wine", "white-wine"],
        tier3Ids: ["commercial-wine"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: false,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "casella-family-brands",
            name: "Casella Family Brands",
            logo: "/brands/casella.png"
        },
        products: [
            {
                name: "Yellow Tail Shiraz / Cabernet Sauvignon",
                image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
                abv: "13.5%",
                size: "6 x 750ml • 105 cs / Pallet",
                description: "Rich Australian Shiraz with ripe red berry flavors, subtle spice, and soft oak finish."
            },
            {
                name: "Yellow Tail Pinot Grigio / Chardonnay",
                image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600",
                abv: "12.0%",
                size: "6 x 750ml • 105 cs / Pallet",
                description: "Crisp, lively white wine bursting with passionfruit, citrus, and green apple."
            }
        ],
        portfolioRanges: [
            {
                id: "yt-core",
                rangeName: "Commercial Case & Container Lots",
                categoryPath: "Wine & Champagne → Australian Wine",
                tradePositioning: "High-Volume Core",
                commonTradeUse: ["Supermarket chains", "Wholesale cash & carry", "Ocean container FCL"],
                typicalFormats: ["6 x 750ml", "Pallet Loads (105 cs)", "20ft FCL (1,500 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded Dispatch", "Temperature Controlled Reefer", "Pallet & Container Ready"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "moet-chandon",
        name: "Moët & Chandon",
        country: "France",
        countryCode: "FR",
        positioning: "The world's leading Champagne house, synonymous with celebration and global luxury recognition.",
        description: "Founded in 1743 in Épernay, France. Moët & Chandon produces the most celebrated Champagne in the world, combining Pinot Noir, Meunier, and Chardonnay grapes with centuries of cellar mastery.",
        tagline: "The World's Most Loved Champagne",
        category: "Wine & Champagne",
        categoryFit: ["Brut Impérial", "Rosé Impérial", "Vintage Champagne"],
        tier1Ids: ["wine"],
        tier2Ids: ["champagne"],
        tier3Ids: ["prestige-champagne"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "lvmh",
            name: "Moët Hennessy • LVMH",
            logo: "/brands/lvmh.png"
        },
        products: [
            {
                name: "Moët & Chandon Brut Impérial NV",
                image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=600",
                abv: "12.0%",
                size: "6 x 75cl • 80 cs / Pallet",
                description: "The iconic blend of over 100 different wines reflecting diversity and complementary qualities."
            }
        ],
        portfolioRanges: [
            {
                id: "moet-cases",
                rangeName: "Brut Impérial Commercial Cases",
                categoryPath: "Wine & Champagne → Champagne → Brut",
                tradePositioning: "Prestige High-Rotation",
                commonTradeUse: ["Luxury hotel & club supply", "Bonded duty-free trade", "High-end corporate gifting"],
                typicalFormats: ["6 x 75cl Standard Box", "Pallet Allocations (80 cs)"],
                relevantFor: ["export-portfolio", "volume-strategic"]
            }
        ],
        marketConsiderations: ["Bonded European Dispatch (Rotterdam / Antwerp)", "Strict Temperature Controlled Reefer"],
        tradeIntents: ["export-portfolio", "volume-strategic"]
    },
    {
        id: "veuve-clicquot",
        name: "Veuve Clicquot",
        country: "France",
        countryCode: "FR",
        positioning: "A prestigious Champagne maison renowned for its iconic Yellow Label and audacious heritage.",
        description: "Founded in 1772, Veuve Clicquot stands for excellence, bold spirit, and distinctive pinot noir structure. Recognized globally as an indispensable fixture in upscale nightlife and luxury retail.",
        tagline: "Live More Clicquot",
        category: "Wine & Champagne",
        categoryFit: ["Yellow Label", "Luxury Champagne"],
        tier1Ids: ["wine"],
        tier2Ids: ["champagne"],
        tier3Ids: ["prestige-champagne"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "lvmh",
            name: "Moët Hennessy • LVMH",
            logo: "/brands/lvmh.png"
        },
        products: [
            {
                name: "Veuve Clicquot Yellow Label Brut",
                image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&q=80&w=600",
                abv: "12.0%",
                size: "6 x 75cl • 80 cs / Pallet",
                description: "Signature cuvée with predominance of Pinot Noir offering structure, elegance, and silky vanilla finish."
            }
        ],
        portfolioRanges: [
            {
                id: "vc-yellow",
                rangeName: "Yellow Label Pallet Lots",
                categoryPath: "Wine & Champagne → Champagne",
                tradePositioning: "Luxury Nightlife / Retail",
                commonTradeUse: ["Nightclub & VIP hospitality", "Fine wine merchants", "Duty-free export"],
                typicalFormats: ["6 x 75cl", "Pallet Lots (80 cs)"],
                relevantFor: ["export-portfolio"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded Dispatch", "Temperature Controlled"],
        tradeIntents: ["export-portfolio"]
    },
    {
        id: "whispering-angel",
        name: "Whispering Angel",
        country: "France",
        countryCode: "FR",
        positioning: "The worldwide benchmark for luxury Provence rosé, commanding high-volume summer demand.",
        description: "Crafted at Château d'Esclans in Provence, Whispering Angel is the global standard for premium dry rosé. Light, refreshing, with red berry and citrus notes.",
        tagline: "The World's Most Iconic Rosé",
        category: "Wine & Champagne",
        categoryFit: ["Côtes de Provence Rosé", "Luxury Still Wine"],
        tier1Ids: ["wine"],
        tier2Ids: ["rose"],
        tier3Ids: ["provence-rose"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "lvmh",
            name: "Château d'Esclans • LVMH",
            logo: "/brands/lvmh.png"
        },
        products: [
            {
                name: "Whispering Angel Côtes de Provence Rosé",
                image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=600",
                abv: "13.0%",
                size: "6 x 75cl • 96 cs / Pallet",
                description: "A blend of Grenache, Cinsault, and Vermentino with dry, crisp, and fresh floral notes."
            }
        ],
        portfolioRanges: [
            {
                id: "wa-cases",
                rangeName: "Standard Cases & Magnums",
                categoryPath: "Wine & Champagne → Rosé",
                tradePositioning: "Super-Premium Rosé",
                commonTradeUse: ["Beach clubs & summer venues", "Yacht provisioning", "Fine wine retail"],
                typicalFormats: ["6 x 75cl", "Pallet Loads (96 cs)"],
                relevantFor: ["export-portfolio", "volume-strategic"]
            }
        ],
        marketConsiderations: ["Fast Moving Seasonality", "Reefer Shipping Recommended"],
        tradeIntents: ["export-portfolio", "volume-strategic"]
    },
    {
        id: "corona",
        name: "Corona Extra",
        country: "Mexico",
        countryCode: "MX",
        positioning: "The quintessential Mexican sun-and-beach lager, driving exceptional year-round consumer rotation.",
        description: "Golden Mexican lager brewed with fine barley, yeast, and water. Famously served with a lime wedge and recognized across five continents.",
        tagline: "La Cerveza Más Fina",
        category: "Beers & Craft",
        categoryFit: ["Mexican Lager", "Import Beer"],
        tier1Ids: ["beer"],
        tier2Ids: ["lager"],
        tier3Ids: ["international-lager"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1608270119299-4458b09b30c5?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "ab-inbev",
            name: "AB InBev",
            logo: "/brands/abinbev.png"
        },
        products: [
            {
                name: "Corona Extra 330ml Glass Bottles",
                image: "https://images.unsplash.com/photo-1608270119299-4458b09b30c5?auto=format&fit=crop&q=80&w=600",
                abv: "4.5%",
                size: "24 x 330ml • 63 cs / Pallet",
                description: "Clean, crisp, and refreshingly balanced Mexican pale lager."
            }
        ],
        portfolioRanges: [
            {
                id: "corona-core",
                rangeName: "24x330ml Bottles Full Truckloads",
                categoryPath: "Beers & Craft → Lager",
                tradePositioning: "High-Volume Volume Driver",
                commonTradeUse: ["On-trade bars & dining", "Supermarket retail", "Export distribution"],
                typicalFormats: ["24 x 330ml", "Pallet Loads (63 cs)", "FTL Truckloads (26 Pallets)"],
                relevantFor: ["volume-strategic"]
            }
        ],
        marketConsiderations: ["Under-Bond Bonded Dispatch", "Pallet & Container Loads Only"],
        tradeIntents: ["volume-strategic"]
    },
    {
        id: "buzzballz",
        name: "BuzzBallz",
        country: "United States",
        countryCode: "US",
        positioning: "The viral, high-velocity single-serve ready-to-drink (RTD) cocktail revolutionizing impulse retail.",
        description: "Packed in shatterproof, spherical spherical containers with 100% real juice and premium spirits. Fast turnover in impulse retail, events, and festival venues.",
        tagline: "Shake Up The Party",
        category: "Speciality Beverages",
        categoryFit: ["Ready-To-Drink (RTD)", "Premixed Cocktails", "Impulse Beverage"],
        tier1Ids: ["cocktails"],
        tier2Ids: ["rtd"],
        tier3Ids: ["premixed-cocktails"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "sazerac",
            name: "Sazerac Company",
            logo: "/brands/sazerac.png"
        },
        products: [
            {
                name: "BuzzBallz Cocktails 200ml Round Can (Choc Tease / Tequila Rita)",
                image: "/products/Aperol Flavoured Liqueurs.webp",
                abv: "13.5%",
                size: "24 x 200ml • 80 cs / Pallet",
                description: "Premixed single-serve cocktail made with premium spirits and real fruit flavors."
            }
        ],
        portfolioRanges: [
            {
                id: "buzzballz-lots",
                rangeName: "24x200ml Impulse Packs",
                categoryPath: "Speciality Beverages → RTD Cocktails",
                tradePositioning: "High-Margin Impulse RTD",
                commonTradeUse: ["Convenience store chains", "Cash & carry wholesalers", "Outdoor venues"],
                typicalFormats: ["24 x 200ml", "Pallet Loads (80 cs)"],
                relevantFor: ["volume-strategic", "export-portfolio"]
            }
        ],
        marketConsiderations: ["Pallet & Container Available", "Long Shelf Life"],
        tradeIntents: ["volume-strategic", "export-portfolio"]
    },
    {
        id: "red-bull",
        name: "Red Bull",
        country: "Austria",
        countryCode: "AT",
        positioning: "The world's undisputed leading energy drink and essential nightlife / cocktail highball mixer.",
        description: "Vitalizes body and mind. Appreciated worldwide by top athletes, busy professionals, and as an essential back-bar mixer across every nightclub and bar globally.",
        tagline: "Gives You Wings",
        category: "Speciality Beverages",
        categoryFit: ["Energy Drinks", "Bar Mixers"],
        tier1Ids: ["cocktails"],
        tier2Ids: ["mixers"],
        tier3Ids: ["energy-mixers"],
        tradeCapabilities: {
            exportAvailable: true,
            privateLabel: false,
            ukDistribution: true,
            euDistribution: true,
            onTradeFocused: true,
            offTradeFocused: true,
        },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
        owner: {
            id: "red-bull-gmbh",
            name: "Red Bull GmbH",
            logo: "/brands/redbull.png"
        },
        products: [
            {
                name: "Red Bull Energy Drink 250ml Regular & Sugarfree",
                image: "/products/Aperol Flavoured Liqueurs.webp",
                abv: "0%",
                size: "24 x 250ml • 108 cs / Pallet",
                description: "The global benchmark 250ml slim can with caffeine, taurine, and B-group vitamins."
            }
        ],
        portfolioRanges: [
            {
                id: "rb-standard",
                rangeName: "24x250ml Shrink Trays FTL",
                categoryPath: "Speciality Beverages → Mixers",
                tradePositioning: "Mass-Market Velocity Anchor",
                commonTradeUse: ["Bar & nightlife accounts", "Retail grocery", "Export container FCL"],
                typicalFormats: ["24 x 250ml", "Pallet Loads (108 cs)", "Full Truckload (FTL 30 Pallets)"],
                relevantFor: ["volume-strategic"]
            }
        ],
        marketConsiderations: ["High Liquidity SKU", "Under-Bond & Duty-Paid Available"],
        tradeIntents: ["volume-strategic"]
    }
];
