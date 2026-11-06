'use server';

import dbConnect from "@/lib/db";
import Brand from "@/models/Brand";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

function getNormalizedOwnerId(ownerId?: string): string | undefined {
    if (!ownerId) return ownerId;
    if (ownerId === 'ab-inbev-budweiser-brewing-group-uk') return 'ab-inbev';
    if (ownerId === 'heineken-uk') return 'heineken';
    if (ownerId === 'bacardi-ltd.') return 'bacardi';
    if (ownerId === 'carlsberg-marstons-brewing-company') return 'carlsberg-marstons';
    if (ownerId === 'lvmh-(moet-hennessy)') return 'lvmh-moet-hennessy';
    return ownerId;
}

import { fallbackBrands } from "@/components/pages/brands/data/brands.data";
import { FEATURED_BRAND_LOGOS } from "@/components/pages/brands/data/brand-directory.data";

const BRAND_HOUSE_EXTRA_PRODUCTS: Record<string, any[]> = {
    "coca-cola": [
        {
            name: "Coca-Cola Original Taste 330ml Can",
            image: "/products/coca-cola-can-330ml.jpg",
            abv: "0%",
            size: "24 x 330ml • 99 cs / Pallet",
            description: "The world's favourite soft drink. Crisp, refreshing cola flavor in wholesale shrink trays."
        },
        {
            name: "Coca-Cola Zero Sugar 330ml Can",
            image: "/products/coca-cola-can-330ml.jpg",
            abv: "0%",
            size: "24 x 330ml • 99 cs / Pallet",
            description: "Zero sugar, zero calories with the legendary Coca-Cola taste profile."
        },
        {
            name: "Sprite Regular 330ml Can",
            image: "/products/coca-cola-can-330ml.jpg",
            abv: "0%",
            size: "24 x 330ml • 99 cs / Pallet",
            description: "Crisp lemon-lime refreshment in standard export cans."
        }
    ],
    "pepsico": [
        {
            name: "PEPSI Regular Flavour Carbonated Drink 1L",
            image: "/products/pepsi-regular-1l.png",
            abv: "0%",
            size: "6 x 1L • 125 cs / Pallet",
            description: "PEPSI regular flavour is a refreshing carbonated drink in the cola category, made with plant extracts, sugar and sweeteners."
        },
        {
            name: "Pepsi Max 330ml Can",
            image: "/products/pepsi-regular-1l.png",
            abv: "0%",
            size: "24 x 330ml • 99 cs / Pallet",
            description: "Maximum cola taste with no sugar. High-rotation export pack."
        }
    ],
    "bacardi": [
        {
            name: "Bacardi Carta Blanca Superior White Rum",
            image: "/products/bacardi-carta-blanca.jpg",
            abv: "37.5%",
            size: "6 x 70cl • 100 cs / Pallet",
            description: "The world's most awarded rum with light vanilla and fresh apricot notes."
        },
        {
            name: "Bacardi Spiced Premium Spirit Drink",
            image: "/products/bacardi-carta-blanca.jpg",
            abv: "35%",
            size: "6 x 70cl • 100 cs / Pallet",
            description: "Aged in charred American oak with honey and spice undertones."
        }
    ],
    "campari": [
        {
            name: "Campari Bitter Aperitivo 70cl",
            image: "/products/campari-bitter.jpg",
            abv: "25%",
            size: "6 x 70cl • 100 cs / Pallet",
            description: "Iconic red Italian aperitif infused with bitter herbs, aromatic plants, and fruit."
        },
        {
            name: "Aperol Aperitivo Liqueur 70cl",
            image: "/products/Aperol Flavoured Liqueurs.webp",
            abv: "11%",
            size: "6 x 70cl • 100 cs / Pallet",
            description: "The quintessential Spritz ingredient with bitter-sweet orange and gentian profile."
        }
    ],
    "kraft-heinz": [
        {
            name: "Heinz Tomato Ketchup Top-Down 400ml",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
            abv: "0%",
            size: "10 x 400ml • 96 cs / Pallet",
            description: "The unmistakable taste of sun-ripened tomatoes in convenient top-down bottles."
        },
        {
            name: "Heinz Baked Beans in Rich Tomato Sauce 415g",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
            abv: "0%",
            size: "24 x 415g • 72 cs / Pallet",
            description: "High-protein haricot beans stewed in thick tomato gravy for retail and catering."
        }
    ],
    "unilever": [
        {
            name: "Hellmann's Real Mayonnaise Squeezy 430ml",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
            abv: "0%",
            size: "8 x 430ml • 120 cs / Pallet",
            description: "Made with 100% free-range eggs and quality oils for creaminess and rich flavor."
        },
        {
            name: "Knorr Aromat All-Purpose Seasoning 90g",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
            abv: "0%",
            size: "6 x 90g • 180 cs / Pallet",
            description: "Finely balanced blend of herbs and spices for commercial pantry enhancement."
        }
    ],
    "asahi": [
        {
            name: "Asahi Super Dry 330ml Glass Bottle",
            image: "/products/heineken-bottle.jpg",
            abv: "5.0%",
            size: "24 x 330ml • 63 cs / Pallet",
            description: "Japan's #1 beer, renowned for its crisp, clean Karakuchi dry finish."
        },
        {
            name: "Peroni Nastro Azzurro 330ml Bottle",
            image: "/products/heineken-bottle.jpg",
            abv: "5.0%",
            size: "24 x 330ml • 63 cs / Pallet",
            description: "Premium Italian lager brewed with Nostrano dell'Isola maize."
        }
    ],
    "carlsberg": [
        {
            name: "Carlsberg Danish Pilsner 330ml Bottle",
            image: "/products/heineken-bottle.jpg",
            abv: "3.8%",
            size: "24 x 330ml • 63 cs / Pallet",
            description: "Crisp and refreshing with a full malty body and pleasant hop bitterness."
        },
        {
            name: "Kronenbourg 1664 Blanc 330ml Bottle",
            image: "/products/heineken-bottle.jpg",
            abv: "5.0%",
            size: "24 x 330ml • 63 cs / Pallet",
            description: "Modern French wheat beer with subtle citrus and coriander notes."
        }
    ],
    "kelloggs": [
        {
            name: "Kellogg's Corn Flakes 450g",
            image: "/products/mcvities-digestives.jpg",
            abv: "0%",
            size: "14 x 450g • 48 cs / Pallet",
            description: "The original toasted golden corn cereal for commercial grocery distribution."
        },
        {
            name: "Pringles Original & Sour Cream 165g",
            image: "/products/mcvities-digestives.jpg",
            abv: "0%",
            size: "19 x 165g • 56 cs / Pallet",
            description: "Iconic hyperbolic paraboloid potato snacks in resealable protective tubes."
        }
    ],
    "william-grant": [
        {
            name: "Glenfiddich 12 Year Old Single Malt Scotch",
            image: "/products/Singleton 12 Year Old Single Malt Scotch Whisky.webp",
            abv: "40%",
            size: "6 x 70cl • 80 cs / Pallet",
            description: "The pioneer single malt matured in fine American and European oak casks."
        },
        {
            name: "Hendrick's Distilled Scottish Gin",
            image: "/products/Hendricks London Dry Gin.webp",
            abv: "41.4%",
            size: "6 x 70cl • 100 cs / Pallet",
            description: "Distilled with cucumber and Bulgarian rose for quintessential freshness."
        }
    ],
    "remy-cointreau": [
        {
            name: "Rémy Martin VSOP Fine Champagne Cognac",
            image: "/products/hennessy-vs-cognac.jpg",
            abv: "40%",
            size: "6 x 70cl • 80 cs / Pallet",
            description: "Epitome of elegance blending grapes from Grande and Petite Champagne."
        },
        {
            name: "Cointreau Triple Sec Orange Liqueur",
            image: "/products/Jägermeister Orange Liqueur.jpg",
            abv: "40%",
            size: "6 x 70cl • 90 cs / Pallet",
            description: "Clear orange liqueur crafted with sweet and bitter orange peels."
        }
    ],
    "edrington": [
        {
            name: "The Macallan Double Cask 12YO Single Malt",
            image: "/products/macallan-12.png",
            abv: "40%",
            size: "6 x 70cl • 60 cs / Pallet",
            description: "Prestige Speyside single malt aged in sherry seasoned American and European oak."
        },
        {
            name: "Highland Park 12YO Viking Honour",
            image: "/products/macallan-12.png",
            abv: "40%",
            size: "6 x 70cl • 80 cs / Pallet",
            description: "Orkney single malt with heather honey sweetness and aromatic peat smoke."
        }
    ]
};

function resolveBrandOrHouse(id: string) {
    // 1. Direct match in fallbackBrands
    const directBrand = fallbackBrands.find(b => b.id === id);
    if (directBrand) return directBrand;

    // 2. Check if id matches any directory brand house (e.g. 'nestle', 'diageo', 'coca-cola', 'pernod-ricard')
    const dirItem = FEATURED_BRAND_LOGOS.find(item => item.id === id || item.searchQuery.toLowerCase() === id.toLowerCase());
    
    // Find all brands in fallbackBrands belonging to this house
    const matchingBrands = fallbackBrands.filter(b => {
        const query = dirItem ? dirItem.searchQuery.toLowerCase() : id.toLowerCase();
        const ownerName = b.owner?.name?.toLowerCase() || '';
        const ownerId = b.owner?.id?.toLowerCase() || '';
        const brandName = b.name?.toLowerCase() || '';
        return ownerName.includes(query) || ownerId.includes(query) || brandName.includes(query);
    });

    const extraProducts = BRAND_HOUSE_EXTRA_PRODUCTS[id] || [];

    if (matchingBrands.length > 0 || extraProducts.length > 0) {
        const houseName = dirItem?.name || matchingBrands[0]?.owner?.name || id;
        const allProducts = [
            ...matchingBrands.flatMap(b => b.products || []),
            ...extraProducts
        ];

        return {
            id: id,
            name: houseName,
            country: dirItem?.country || matchingBrands[0]?.country || 'Global',
            countryCode: matchingBrands[0]?.countryCode || 'GB',
            positioning: `Commercial FMCG wholesale portfolio for ${houseName}. Direct factory allocations and verified case formats.`,
            description: `Inspect official wholesale specifications, pallet capacities, and export terms for ${houseName} products.`,
            tagline: `Official Wholesale Portfolio`,
            category: dirItem?.category || matchingBrands[0]?.category || 'General',
            categoryFit: Array.from(new Set(matchingBrands.flatMap(b => b.categoryFit || []))),
            image: dirItem?.logo || matchingBrands[0]?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
            backgroundImage: matchingBrands[0]?.backgroundImage || matchingBrands[0]?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600',
            owner: {
                id: id,
                name: houseName,
                logo: dirItem?.logo || matchingBrands[0]?.owner?.logo
            },
            products: allProducts,
            portfolioRanges: matchingBrands.flatMap(b => b.portfolioRanges || []),
            tradeCapabilities: matchingBrands[0]?.tradeCapabilities || {
                exportAvailable: true,
                privateLabel: false,
                ukDistribution: true,
                euDistribution: true,
                onTradeFocused: true,
                offTradeFocused: true,
            },
            marketConsiderations: ["Under-Bond Bonded Dispatch", "Full Pallets (Mixed lots permitted) & FCL Containers", "Direct Commercial Dispatch"],
            tradeIntents: ["volume-strategic", "export-portfolio"]
        };
    }

    if (dirItem) {
        return {
            id: id,
            name: dirItem.name,
            country: dirItem.country || 'Global',
            countryCode: 'GB',
            positioning: `Commercial wholesale supply for ${dirItem.name}.`,
            description: `Inspect official specifications and trade availability for ${dirItem.name}.`,
            tagline: `Official Wholesale Portfolio`,
            category: dirItem.category,
            categoryFit: [dirItem.category],
            image: dirItem.logo,
            backgroundImage: dirItem.logo,
            owner: {
                id: id,
                name: dirItem.name,
                logo: dirItem.logo
            },
            products: [
                {
                    name: `${dirItem.name} Standard Commercial Wholesale Lot`,
                    image: dirItem.logo,
                    abv: dirItem.category === 'Spirits' ? '40%' : dirItem.category === 'Beer & Cider' ? '5.0%' : '0%',
                    size: "Standard Master Case • Wholesale Pallet",
                    description: `Standardized commercial cases of ${dirItem.name} for international B2B procurement.`
                }
            ],
            tradeCapabilities: {
                exportAvailable: true,
                privateLabel: false,
                ukDistribution: true,
                euDistribution: true,
                onTradeFocused: true,
                offTradeFocused: true,
            },
            marketConsiderations: ["Commercial Export Supply", "Full Pallets & Containers FCL"],
            tradeIntents: ["volume-strategic", "export-portfolio"]
        };
    }

    return null;
}

export async function getBrands() {
    try {
        await dbConnect();
        const brands = await Brand.find({ status: 'active' }).lean();
        
        // Fetch categories to resolve names for display
        const Category = (await import("@/models/Category")).default;
        const allCategories = await Category.find({ status: 'active' }).select('id name tier2').lean();
        
        // Create a map for quick lookup
        const categoryMap = new Map();
        allCategories.forEach((cat: any) => {
            categoryMap.set(cat.id, cat.name);
            cat.tier2?.forEach((t2: any) => {
                categoryMap.set(t2.id, t2.name);
                t2.tier3?.forEach((t3: any) => {
                    categoryMap.set(t3.id, t3.name);
                });
            });
        });
        
        // Fetch Brand Owners to resolve names for display
        const BrandOwner = (await import("@/models/BrandOwner")).default;
        const allOwners = await BrandOwner.find({ status: 'active' }).select('id name logo category').lean();
        const ownerMap = new Map();
        allOwners.forEach((owner: any) => {
            ownerMap.set(owner.id, { name: owner.name, logo: owner.logo, category: owner.category });
        });

        // Attach display names to brands
        const enhancedBrands = brands.map((b: any) => {
            const t2Id = b.tier2Ids?.[0];
            const t1Id = b.tier1Ids?.[0];
            return {
                ...b,
                category: categoryMap.get(t2Id) || categoryMap.get(t1Id) || 'General',
                categoryFit: (b.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
                owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
            };
        });

        if (enhancedBrands.length === 0) {
            return { success: true, data: serializeList(fallbackBrands) };
        }

        return { success: true, data: serializeList(enhancedBrands) };
    } catch (error: any) {
        console.error("Error in getBrands, falling back to structured catalogue:", error);
        return { success: true, data: serializeList(fallbackBrands) };
    }
}

export async function getAllBrands() {
    try {
        await requireAdmin();
        await dbConnect();
        const brands = await Brand.find({}).lean();

        
        // Fetch categories to resolve names for display
        const Category = (await import("@/models/Category")).default;
        const allCategories = await Category.find({}).select('id name tier2').lean();
        
        // Create a map for quick lookup
        const categoryMap = new Map();
        allCategories.forEach((cat: any) => {
            categoryMap.set(cat.id, cat.name);
            cat.tier2?.forEach((t2: any) => {
                categoryMap.set(t2.id, t2.name);
                t2.tier3?.forEach((t3: any) => {
                    categoryMap.set(t3.id, t3.name);
                });
            });
        });
        
        // Fetch Brand Owners to resolve names for display
        const BrandOwner = (await import("@/models/BrandOwner")).default;
        const allOwners = await BrandOwner.find({}).select('id name logo').lean();
        const ownerMap = new Map();
        allOwners.forEach((owner: any) => {
            ownerMap.set(owner.id, { name: owner.name, logo: owner.logo });
        });

        // Attach display names to brands
        const enhancedBrands = brands.map((b: any) => {
            const t2Id = b.tier2Ids?.[0];
            const t1Id = b.tier1Ids?.[0];
            return {
                ...b,
                category: categoryMap.get(t2Id) || categoryMap.get(t1Id) || 'General',
                categoryFit: (b.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
                owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
            };
        });

        return { success: true, data: serializeList(enhancedBrands) };
    } catch (error: any) {
        console.error("Error in getAllBrands:", error);
        return { success: false, error: error.message };
    }
}
 
export async function getAdminBrandById(id: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const brand = await Brand.findOne({ id }).lean();
        if (!brand) return { success: false, error: 'Brand not found' };
 
        // Fetch categories to resolve names for display
        const Category = (await import("@/models/Category")).default;
        const allCategories = await Category.find({}).select('id name tier2').lean();
        
        // Create a map for quick lookup
        const categoryMap = new Map();
        allCategories.forEach((cat: any) => {
            categoryMap.set(cat.id, cat.name);
            cat.tier2?.forEach((t2: any) => {
                categoryMap.set(t2.id, t2.name);
                t2.tier3?.forEach((t3: any) => {
                    categoryMap.set(t3.id, t3.name);
                });
            });
        });
 
        // Fetch Brand Owner
        const BrandOwner = (await import("@/models/BrandOwner")).default;
        const normalizedOwnerId = getNormalizedOwnerId(brand.brandOwnerId);
        const owner = normalizedOwnerId ? await BrandOwner.findOne({ id: normalizedOwnerId }).select('id name logo').lean() : null;
 
        const enhancedBrand = {
            ...brand,
            category: categoryMap.get(brand.tier2Ids?.[0]) || categoryMap.get(brand.tier1Ids?.[0]) || 'General',
            categoryFit: (brand.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
            owner: owner ? { name: owner.name, logo: owner.logo, id: owner.id } : null
        };
        return { success: true, data: serializeDocument(enhancedBrand) };
    } catch (error: any) {
        console.error(`Error in getAdminBrandById (${id}):`, error);
        return { success: false, error: error.message };
    }
}

export async function getBrandById(id: string) {
    try {
        await dbConnect();
        const brand = await Brand.findOne({ id, status: 'active' }).lean();
        if (!brand) {
            const fallback = resolveBrandOrHouse(id);
            if (fallback) {
                return { success: true, data: serializeDocument(fallback) };
            }
            return { success: false, error: 'Brand not found' };
        }

        // Fetch categories to resolve names for display
        const Category = (await import("@/models/Category")).default;
        const allCategories = await Category.find({ status: 'active' }).select('id name tier2').lean();
        
        // Create a map for quick lookup
        const categoryMap = new Map();
        allCategories.forEach((cat: any) => {
            categoryMap.set(cat.id, cat.name);
            cat.tier2?.forEach((t2: any) => {
                categoryMap.set(t2.id, t2.name);
                t2.tier3?.forEach((t3: any) => {
                    categoryMap.set(t3.id, t3.name);
                });
            });
        });

        // Fetch Brand Owner
        const BrandOwner = (await import("@/models/BrandOwner")).default;
        const normalizedOwnerId = getNormalizedOwnerId(brand.brandOwnerId);
        const owner = normalizedOwnerId ? await BrandOwner.findOne({ id: normalizedOwnerId, status: 'active' }).select('id name logo').lean() : null;

        const enhancedBrand = {
            ...brand,
            category: categoryMap.get(brand.tier2Ids?.[0]) || categoryMap.get(brand.tier1Ids?.[0]) || 'General',
            categoryFit: (brand.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
            owner: owner ? { name: owner.name, logo: owner.logo, id: owner.id } : null
        };
        return { success: true, data: serializeDocument(enhancedBrand) };
    } catch (error: any) {
        console.error(`Error in getBrandById (${id}):`, error);
        const fallback = resolveBrandOrHouse(id);
        if (fallback) {
            return { success: true, data: serializeDocument(fallback) };
        }
        return { success: false, error: error.message };
    }
}

export const getBrandsByTier1 = unstable_cache(
    async (tier1Id: string) => {
        try {
            await dbConnect();
            const brands = await Brand.find({ tier1Ids: tier1Id, status: 'active' }).lean();
            
            // Fetch categories to resolve names for display
            const Category = (await import("@/models/Category")).default;
            const allCategories = await Category.find({ status: 'active' }).select('id name tier2').lean();
            
            // Create a map for quick lookup
            const categoryMap = new Map();
            allCategories.forEach((cat: any) => {
                categoryMap.set(cat.id, cat.name);
                cat.tier2?.forEach((t2: any) => {
                    categoryMap.set(t2.id, t2.name);
                    t2.tier3?.forEach((t3: any) => {
                        categoryMap.set(t3.id, t3.name);
                    });
                });
            });
            
            // Resolve owners
            const BrandOwner = (await import("@/models/BrandOwner")).default;
            const allOwners = await BrandOwner.find({ status: 'active' }).select('id name logo category').lean();
            const ownerMap = new Map();
            allOwners.forEach((owner: any) => {
                ownerMap.set(owner.id, { name: owner.name, logo: owner.logo, category: owner.category });
            });

            const enhancedBrands = brands.map((b: any) => {
                const t2Id = b.tier2Ids?.[0];
                const t1Id = b.tier1Ids?.[0];
                return {
                    ...b,
                    category: categoryMap.get(t2Id) || categoryMap.get(t1Id) || 'General',
                    categoryFit: (b.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
                    owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
                };
            });
            if (enhancedBrands.length === 0) {
                const matchingFallback = fallbackBrands.filter(b => b.tier1Ids?.includes(tier1Id));
                return { success: true, data: serializeList(matchingFallback.length > 0 ? matchingFallback : fallbackBrands) };
            }

            return { success: true, data: serializeList(enhancedBrands) };
        } catch (error: any) {
            console.error(`Error in getBrandsByTier1 (${tier1Id}), using fallback:`, error);
            const matchingFallback = fallbackBrands.filter(b => b.tier1Ids?.includes(tier1Id));
            return { success: true, data: serializeList(matchingFallback.length > 0 ? matchingFallback : fallbackBrands) };
        }
    },
    ['brands-by-tier1'],
    { revalidate: 3600, tags: ['brands'] }
);

export const getBrandsByTier2 = unstable_cache(
    async (tier2Id: string) => {
        try {
            await dbConnect();
            const brands = await Brand.find({ tier2Ids: tier2Id, status: 'active' }).lean();
            
            // Resolve owners
            const BrandOwner = (await import("@/models/BrandOwner")).default;
            const allOwners = await BrandOwner.find({ status: 'active' }).select('id name logo category').lean();
            const ownerMap = new Map();
            allOwners.forEach((owner: any) => {
                ownerMap.set(owner.id, { name: owner.name, logo: owner.logo, category: owner.category });
            });

            const enhancedBrands = brands.map((b: any) => ({
                ...b,
                owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
            }));
            return { success: true, data: serializeList(enhancedBrands) };
        } catch (error: any) {
            console.error(`Error in getBrandsByTier2 (${tier2Id}):`, error);
            return { success: false, error: error.message };
        }
    },
    ['brands-by-tier2'],
    { revalidate: 3600, tags: ['brands'] }
);

export const getBrandsByTier3 = unstable_cache(
    async (tier3Id: string) => {
        try {
            await dbConnect();
            const brands = await Brand.find({ tier3Ids: tier3Id, status: 'active' }).lean();
            
            // Resolve owners
            const BrandOwner = (await import("@/models/BrandOwner")).default;
            const allOwners = await BrandOwner.find({ status: 'active' }).select('id name logo category').lean();
            const ownerMap = new Map();
            allOwners.forEach((owner: any) => {
                ownerMap.set(owner.id, { name: owner.name, logo: owner.logo, category: owner.category });
            });

            const enhancedBrands = brands.map((b: any) => ({
                ...b,
                owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
            }));
            return { success: true, data: serializeList(enhancedBrands) };
        } catch (error: any) {
            console.error(`Error in getBrandsByTier3 (${tier3Id}):`, error);
            return { success: false, error: error.message };
        }
    },
    ['brands-by-tier3'],
    { revalidate: 3600, tags: ['brands'] }
);

export const getBrandsByBrandOwner = unstable_cache(
    async (brandOwnerId: string) => {
        try {
            await dbConnect();
            const possibleOwnerIds = [brandOwnerId];
            if (brandOwnerId === 'ab-inbev-budweiser-brewing-group-uk') {
                possibleOwnerIds.push('ab-inbev');
            } else if (brandOwnerId === 'ab-inbev') {
                possibleOwnerIds.push('ab-inbev-budweiser-brewing-group-uk');
            }
            if (brandOwnerId === 'heineken-uk') {
                possibleOwnerIds.push('heineken');
            } else if (brandOwnerId === 'heineken') {
                possibleOwnerIds.push('heineken-uk');
            }

            const brands = await Brand.find({ brandOwnerId: { $in: possibleOwnerIds }, status: 'active' }).lean();
            
            // Fetch categories to resolve names for display
            const Category = (await import("@/models/Category")).default;
            const allCategories = await Category.find({ status: 'active' }).select('id name tier2').lean();
            
            // Create a map for quick lookup
            const categoryMap = new Map();
            allCategories.forEach((cat: any) => {
                categoryMap.set(cat.id, cat.name);
                cat.tier2?.forEach((t2: any) => {
                    categoryMap.set(t2.id, t2.name);
                    t2.tier3?.forEach((t3: any) => {
                        categoryMap.set(t3.id, t3.name);
                    });
                });
            });
            
            // Resolve owners
            const BrandOwner = (await import("@/models/BrandOwner")).default;
            const allOwners = await BrandOwner.find({ status: 'active' }).select('id name logo category').lean();
            const ownerMap = new Map();
            allOwners.forEach((owner: any) => {
                ownerMap.set(owner.id, { name: owner.name, logo: owner.logo, category: owner.category });
            });

            const enhancedBrands = brands.map((b: any) => {
                const t2Id = b.tier2Ids?.[0];
                const t1Id = b.tier1Ids?.[0];
                return {
                    ...b,
                    category: categoryMap.get(t2Id) || categoryMap.get(t1Id) || 'General',
                    categoryFit: (b.tier2Ids || []).map((id: string) => categoryMap.get(id)).filter(Boolean),
                    owner: ownerMap.get(getNormalizedOwnerId(b.brandOwnerId)) || null
                };
            });
            return { success: true, data: serializeList(enhancedBrands) };
        } catch (error: any) {
            console.error(`Error in getBrandsByBrandOwner (${brandOwnerId}):`, error);
            return { success: false, error: error.message };
        }
    },
    ['brands-by-brand-owner'],
    { revalidate: 3600, tags: ['brands'] }
);

export async function createBrand(data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        const newBrand = new Brand(data);

        await newBrand.save();
        revalidateTag('brands', 'max');
        revalidatePath('/brands');
        revalidatePath('/admin/brands');
        return { success: true, data: serializeDocument(newBrand) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBrand(id: string, data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        const updated = await Brand.findOneAndUpdate({ id }, data, { new: true }).lean();

        if (!updated) return { success: false, error: 'Brand not found' };
        revalidateTag('brands', 'max');
        revalidatePath('/brands');
        revalidatePath('/admin/brands');
        revalidatePath(`/brands/${id}`);
        revalidatePath(`/admin/brands/${id}`);
        return { success: true, data: serializeDocument(updated) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBrand(id: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const deleted = await Brand.findOneAndDelete({ id }).lean();

        if (!deleted) return { success: false, error: 'Brand not found' };
        revalidateTag('brands', 'max');
        revalidatePath('/brands');
        revalidatePath('/admin/brands');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
