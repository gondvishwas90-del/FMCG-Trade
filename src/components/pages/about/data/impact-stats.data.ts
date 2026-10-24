import type { ImpactStat } from '../types/impact-stat.types';

/**
 * Impact statistics data
 */
export const impactStats: ImpactStat[] = [
    {
        icon: 'TrendingUp',
        value: "$50M+",
        label: "Trade Volume",
        description: "Facilitating substantial business growth across global markets annually.",
        area: "md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/7]"
    },
    {
        icon: 'Users',
        value: "10k+",
        label: "Jobs Created",
        description: "Empowering local economies through successful trade partnerships.",
        area: "md:[grid-area:1/7/2/13] lg:[grid-area:1/7/2/13]"
    },
    {
        icon: 'Globe',
        value: "50+",
        label: "Countries",
        description: "Active trade presence with local expertise in key markets.",
        area: "md:[grid-area:2/1/3/7] lg:[grid-area:2/1/3/7]"
    },
    {
        icon: 'Award',
        value: "98%",
        label: "Satisfaction",
        description: "Partner approval rate reflecting our commitment to long-term success.",
        area: "md:[grid-area:2/7/3/13] lg:[grid-area:2/7/3/13]"
    }
];
