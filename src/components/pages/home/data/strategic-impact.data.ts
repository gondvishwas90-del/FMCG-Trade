import type { GridItemProps } from '../types/strategic-impact.types';

/**
 * Strategic impact grid items data
 */
export const strategicImpactItems: Omit<GridItemProps, 'area'>[] = [
    {
        icon: 'ShoppingBasket',
        title: "Food & Grocery",
        description: [
            "Dry goods and pantry staples",
            "Sweeteners and natural sugar alternatives",
            "Travel‑retail and duty‑free compliant SKUs"
        ],
        bgClass: "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100/50 dark:border-emerald-800/30",
    },
    {
        icon: 'Beer',
        title: "Beers & Craft",
        description: [
            "Lager",
            "Ale",
            "Craft beer"
        ],
        bgClass: "bg-amber-50/50 dark:bg-amber-900/10 border-amber-100/50 dark:border-amber-800/30",
    },
    {
        icon: 'CupSoda',
        title: "Speciality Beverages",
        description: [
            "Soft drinks, juices and functional beverages",
            "Mixers, tonics and soda waters",
            "Energy drinks and hydration products",
            "Alcohol‑free spirits, wines and beers"
        ],
        bgClass: "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-800/30",
    },
    {
        icon: 'Wine',
        title: "Wines & Champagnes",
        description: [
            "Red, white and rosé wines",
            "Sparkling wines and Prosecco",
            "Champagne and premium cuvées",
            "Private‑label and bespoke bottlings"
        ],
        bgClass: "bg-rose-50/50 dark:bg-rose-900/10 border-rose-100/50 dark:border-rose-800/30",
    },
    {
        icon: 'Candy',
        title: "Spirits & Liquors",
        description: [
            "Whisky, vodka, gin, rum and tequila",
            "Liqueurs, aperitifs and ready‑to‑drink formats",
            "Premium, craft and private‑label spirits"
        ],
        bgClass: "bg-purple-50/50 dark:bg-purple-900/10 border-purple-100/50 dark:border-purple-800/30",
    },
];

/**
 * Grid area configurations for strategic impact items
 */
export const gridAreas = [
    "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
];
