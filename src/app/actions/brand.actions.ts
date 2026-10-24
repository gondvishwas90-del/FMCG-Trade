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

        return { success: true, data: serializeList(enhancedBrands) };
    } catch (error: any) {
        console.error("Error in getBrands:", error);
        return { success: false, error: error.message };
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
        if (!brand) return { success: false, error: 'Brand not found' };

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
            return { success: true, data: serializeList(enhancedBrands) };
        } catch (error: any) {
            console.error(`Error in getBrandsByTier1 (${tier1Id}):`, error);
            return { success: false, error: error.message };
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
