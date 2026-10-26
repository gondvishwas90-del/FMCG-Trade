import type { TradeOpportunityCard } from '../types/trade-opportunity.types';

/**
 * Trade opportunities data - Live Site Opportunities
 */
export const tradeOpportunities: TradeOpportunityCard[] = [
    {
        id: 1,
        title: 'UK Market Entry — Premium Gin Portfolio',
        tags: ['Gin', 'Spirits', 'On-Trade'],
        region: 'UK · EU',
        status: 'Limited Window',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1080',
    },
    {
        id: 2,
        title: 'Bulk Clearance — Mixed Spirits Pallets',
        tags: ['Vodka', 'Rum', 'Whisky'],
        region: 'EU · Export',
        status: 'Time-Sensitive',
        image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=1080',
    },
    {
        id: 3,
        title: 'Duty-Free — Premium Wine Selection',
        tags: ['Wine', 'Red Wine', 'White Wine'],
        region: 'Duty-Free · Airport Retail',
        status: 'Limited Window',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1080',
    },
];
