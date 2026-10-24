import type { TradeOpportunityCard } from '../types/trade-opportunity.types';

/**
 * Trade opportunities data - Commercial FMCG Trade & Allocations
 */
export const tradeOpportunities: TradeOpportunityCard[] = [
    {
        id: 1,
        title: 'UK Domestic Allocation — Premium Gin (Pallet Quantities)',
        tags: ['FMCG Supply', 'Pallet Lots', 'Commercial Trade'],
        region: 'UK · Bonded & Duty-Paid',
        status: 'Trade Allocation',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1080',
    },
    {
        id: 2,
        title: 'Export Stock Lot — Mixed Spirits (Bonded Pallets)',
        tags: ['FMCG Distribution', 'Container Load', 'Under-Bond'],
        region: 'EU · Export Transit',
        status: 'Commercial Volume',
        image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=1080',
    },
    {
        id: 3,
        title: 'Duty-Free Allocation — Premium Wine Selection',
        tags: ['FMCG Sourcing', 'Duty-Free', 'Case Minimums'],
        region: 'Duty-Free · Bonded Port',
        status: 'B2B Allocation',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1080',
    },
];
