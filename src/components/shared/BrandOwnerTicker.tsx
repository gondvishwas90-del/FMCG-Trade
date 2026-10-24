"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export interface BrandOwnerItem {
    id?: string;
    name: string;
    logo?: string;
    logoDark?: string;
    logoLight?: string;
    category?: string;
    website?: string;
}

interface BrandOwnerTickerProps {
    brandOwners?: BrandOwnerItem[];
    brands?: any[];
    category?: string;
}

const CATEGORY_ORDER: Record<string, number> = {
    "Spirits": 1,
    "Beers & Cider": 2,
    "Food & Grocery": 3,
    "Wine & Champagne": 4,
    "Cocktails & Mixers": 5,
};

function resolveThemedLogo(
    _ownerName: string,
    isLightMode: boolean,
    dbDark?: string,
    dbLight?: string,
    dbLogo?: string
): string {
    // Use only database-stored logo URLs (S3/MinIO). No local public-folder fallbacks.
    if (isLightMode) {
        return dbLight?.trim() || dbLogo?.trim() || '';
    }
    return dbDark?.trim() || dbLogo?.trim() || '';
}

function matchesCategory(ownerCat?: string, targetCat?: string): boolean {
    if (!ownerCat || !targetCat) return false;
    const cleanOwner = ownerCat.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTarget = targetCat.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanOwner === cleanTarget) return true;
    if (cleanOwner.includes(cleanTarget) || cleanTarget.includes(cleanOwner)) return true;

    // Synonym matching
    if (cleanTarget.includes('spirit') && cleanOwner.includes('spirit')) return true;
    if ((cleanTarget.includes('beer') || cleanTarget.includes('cider')) && (cleanOwner.includes('beer') || cleanOwner.includes('cider'))) return true;
    if ((cleanTarget.includes('food') || cleanTarget.includes('grocery')) && (cleanOwner.includes('food') || cleanOwner.includes('grocery'))) return true;
    if ((cleanTarget.includes('wine') || cleanTarget.includes('champagne')) && (cleanOwner.includes('wine') || cleanOwner.includes('champagne'))) return true;
    if ((cleanTarget.includes('cocktail') || cleanTarget.includes('mixer')) && (cleanOwner.includes('cocktail') || cleanOwner.includes('mixer'))) return true;

    return false;
}

function isValidLogoUrl(url?: string): boolean {
    if (!url || typeof url !== 'string') return false;
    const clean = url.trim().toLowerCase();
    if (!clean || clean === 'null' || clean === 'undefined' || clean === 'none' || clean === 'false') return false;

    // Ignore common placeholder image string patterns
    const placeholders = [
        'placeholder',
        'no-logo',
        'nologo',
        'default-logo',
        'default_logo',
        'dummy',
        'blank',
        'temp-logo',
        'gray-square',
        'grey-square',
        'placehold.co',
        'via.placeholder'
    ];

    return !placeholders.some((p) => clean.includes(p));
}

export function BrandOwnerTicker({
    brandOwners = [],
    brands = [],
    category,
}: BrandOwnerTickerProps) {
    // Combine owners from database and brand list, filtering strictly for items with valid logos
    const combinedOwners = useMemo(() => {
        const map = new Map<string, BrandOwnerItem>();

        // 1. Add active brand owners from DB that have a valid logo or theme logo
        brandOwners.forEach((owner) => {
            const hasLogo = isValidLogoUrl(owner.logo) || isValidLogoUrl(owner.logoDark) || isValidLogoUrl(owner.logoLight);
            if (owner.name && hasLogo) {
                map.set(owner.name.toLowerCase().trim(), {
                    id: owner.id,
                    name: owner.name,
                    logo: owner.logo?.trim(),
                    logoDark: owner.logoDark?.trim(),
                    logoLight: owner.logoLight?.trim(),
                    category: owner.category,
                    website: owner.website,
                });
            }
        });

        // 2. Add owners attached to category brands if they have a logo
        brands.forEach((brand) => {
            const owner = brand.owner;
            if (owner?.name) {
                const hasLogo = isValidLogoUrl(owner.logo) || isValidLogoUrl(owner.logoDark) || isValidLogoUrl(owner.logoLight);
                if (hasLogo) {
                    const key = owner.name.toLowerCase().trim();
                    const existing = map.get(key);
                    if (!existing || (!existing.logo && !existing.logoDark && !existing.logoLight)) {
                        map.set(key, {
                            id: existing?.id,
                            name: owner.name,
                            logo: owner.logo?.trim() || existing?.logo,
                            logoDark: owner.logoDark?.trim() || existing?.logoDark,
                            logoLight: owner.logoLight?.trim() || existing?.logoLight,
                            category: existing?.category || owner.category,
                            website: existing?.website || owner.website,
                        });
                    }
                }
            }
        });

        const list = Array.from(map.values());

        // Filter strictly by category if a target category is specified
        if (category) {
            const matchingCategoryOwners = list.filter(o => matchesCategory(o.category, category));

            // Return ONLY brand owners that match the current category page
            if (matchingCategoryOwners.length > 0) {
                matchingCategoryOwners.sort((a, b) => a.name.localeCompare(b.name));
                return matchingCategoryOwners;
            }
        }

        // Default: Sort by Category Priority Order (Spirits -> Beers & Cider -> Food & Grocery -> Wine & Champagne -> Cocktails & Mixers) then Name
        return list.sort((a, b) => {
            const orderA = CATEGORY_ORDER[a.category || ""] || 99;
            const orderB = CATEGORY_ORDER[b.category || ""] || 99;
            if (orderA !== orderB) return orderA - orderB;
            return a.name.localeCompare(b.name);
        });
    }, [brandOwners, brands, category]);

    // Duplicate list enough times for seamless infinite looping
    const tickerItems = useMemo(() => {
        if (combinedOwners.length === 0) return [];
        const repeatCount = Math.max(4, Math.ceil(24 / combinedOwners.length));
        const repeated: BrandOwnerItem[] = [];
        for (let i = 0; i < repeatCount; i++) {
            repeated.push(...combinedOwners);
        }
        return repeated;
    }, [combinedOwners]);

    if (combinedOwners.length === 0) {
        return null;
    }

    const isMarquee = combinedOwners.length >= 5;

    return (
        <div className="w-full py-2 overflow-hidden relative select-none">
            <style>{`
                @keyframes ticker-ltr {
                    0% { transform: translate3d(-50%, 0, 0); }
                    100% { transform: translate3d(0, 0, 0); }
                }
                .animate-ticker-single {
                    animation: ticker-ltr 140s linear infinite;
                    will-change: transform;
                }
                .animate-ticker-single:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="w-full relative z-10">
                {isMarquee ? (
                    /* Single Row Infinite Marquee Container (5+ logos) */
                    <div className="overflow-hidden relative w-full py-1">
                        <div className="flex items-center gap-4 md:gap-6 w-max animate-ticker-single">
                            {tickerItems.map((owner, idx) => (
                                <LogoPill key={`row1-${owner.name}-${idx}`} owner={owner} />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Centered Static Row Container (<5 logos) */
                    <div className="w-full py-1 flex items-center justify-center flex-wrap gap-4 md:gap-8">
                        {combinedOwners.map((owner, idx) => (
                            <LogoPill key={`static-${owner.name}-${idx}`} owner={owner} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function LogoPill({ owner }: { owner: BrandOwnerItem }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isLightMode = mounted && resolvedTheme === "light";
    
    // Select theme-specific logo with priority given to custom themed mapping & DB fields
    const currentLogo = resolveThemedLogo(
        owner.name,
        isLightMode,
        owner.logoDark,
        owner.logoLight,
        owner.logo
    );

    if (!isValidLogoUrl(currentLogo) || imgFailed) {
        return null;
    }

    const content = (
        <div className="shrink-0 flex items-center justify-center h-32 md:h-44 px-3 md:px-5 transition-transform duration-300 group cursor-pointer select-none">
            <img
                key={currentLogo}
                src={currentLogo}
                alt={owner.name}
                className="max-h-28 md:max-h-40 max-w-[300px] md:max-w-[450px] object-contain opacity-100 transition-all duration-300 transform group-hover:scale-105"
                onError={() => setImgFailed(true)}
                onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth <= 10 || img.naturalHeight <= 10) {
                        setImgFailed(true);
                        return;
                    }

                    // Perform image pixel analysis to hide solid dark-grey box placeholders
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = 16;
                        canvas.height = 16;
                        const ctx = canvas.getContext('2d', { willReadFrequently: true });
                        if (ctx) {
                            ctx.drawImage(img, 0, 0, 16, 16);
                            const pixels = ctx.getImageData(0, 0, 16, 16).data;
                            let minR = 255, maxR = 0;
                            let minG = 255, maxG = 0;
                            let minB = 255, maxB = 0;
                            let opaqueCount = 0;

                            for (let i = 0; i < pixels.length; i += 4) {
                                const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2], a = pixels[i + 3];
                                if (a > 30) {
                                    opaqueCount++;
                                    if (r < minR) minR = r;
                                    if (r > maxR) maxR = r;
                                    if (g < minG) minG = g;
                                    if (g > maxG) maxG = g;
                                    if (b < minB) minB = b;
                                    if (b > maxB) maxB = b;
                                }
                            }

                            // If pixel variance is negligible across all pixels, it's a solid monochrome box placeholder
                            const totalVariance = (maxR - minR) + (maxG - minG) + (maxB - minB);
                            if (opaqueCount > 100 && totalVariance < 25) {
                                setImgFailed(true);
                            }
                        }
                    } catch {
                        // Ignore canvas CORS restrictions for external images safely
                    }
                }}
            />
        </div>
    );

    if (owner.id) {
        return (
            <Link href={`/brand-owners/${owner.id}`} title={`View ${owner.name} profile and portfolio`}>
                {content}
            </Link>
        );
    }

    return content;
}
