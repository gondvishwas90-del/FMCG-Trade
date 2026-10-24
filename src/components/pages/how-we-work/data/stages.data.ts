import type { StageData } from '../types/stage.types';

/**
 * Roadmap workflow stages data
 */
export const stages: StageData[] = [
    {
        id: 0,
        number: '01',
        title: 'Brand & Product Foundation',
        description: 'For partners building a new product or brand.',
        idealFor: 'Ideal for new brands and early-stage founders',
        bullets: [
            'White-label manufacturing support',
            'Private label & OEM development',
            'Liquid sourcing and packaging coordination',
            'Portfolio structuring for trade readiness'
        ],
        typicallyNext: [
            { stage: 1, label: 'Portfolio Sourcing & Trade Setup', type: 'most' },
            { stage: 2, label: 'Logistics & Supply Coordination', type: 'some' }
        ],
        templateId: 'brand-dev'
    },
    {
        id: 1,
        number: '02',
        title: 'Portfolio Sourcing & Trade Setup',
        description: 'For buyers and sellers already active in the market.',
        idealFor: 'Ideal for distributors, wholesalers, and active traders',
        bullets: [
            'Brand and SKU sourcing on request',
            'Multi-brand portfolio access',
            'Duty-free and export-focused trade',
            'Bulk and pallet-level supply'
        ],
        typicallyNext: [
            { stage: 2, label: 'Logistics & Supply Coordination', type: 'most' },
            { stage: 3, label: 'Market Entry & Distribution Support', type: 'some' }
        ],
        templateId: 'portfolio-sourcing'
    },
    {
        id: 2,
        number: '03',
        title: 'Logistics & Supply Chain Coordination',
        description: 'For execution-focused trade support.',
        idealFor: 'Ideal for execution-focused logistics and supply needs',
        bullets: [
            'Bonded and duty-free warehouse coordination',
            'Export/import logistics support via partners',
            'Order consolidation and split shipments',
            'Multi-market stock handling'
        ],
        typicallyNext: [
            { stage: 3, label: 'Market Entry & Distribution Support', type: 'most' },
            { stage: 4, label: 'Trade Growth & Ongoing Opportunities', type: 'some' }
        ],
        templateId: 'logistics-coord'
    },
    {
        id: 3,
        number: '04',
        title: 'Market Entry & Distribution Support',
        description: 'For brands entering or expanding into the UK/EU.',
        idealFor: 'Ideal for brands entering or expanding into the UK/EU',
        bullets: [
            'UK & EU market entry support',
            'Distribution partner introductions',
            'Trade relationship facilitation',
            'Go-to-market coordination'
        ],
        typicallyNext: [
            { stage: 4, label: 'Trade Growth & Ongoing Opportunities', type: 'most' },
            { stage: 2, label: 'Logistics & Supply Coordination', type: 'some' }
        ],
        templateId: 'market-entry'
    },
    {
        id: 4,
        number: '05',
        title: 'Trade Growth & Ongoing Opportunities',
        description: 'For long-term and repeat trade relationships.',
        idealFor: 'Ideal for long-term and repeat trade relationships',
        bullets: [
            'Stock clearance opportunities',
            'Portfolio expansion support',
            'Ongoing buyer–seller facilitation',
            'Relationship-driven trade growth'
        ],
        typicallyNext: [
            { stage: 1, label: 'Portfolio Sourcing & Trade Setup', type: 'most' },
            { stage: 3, label: 'Market Entry & Distribution Support', type: 'some' }
        ],
        templateId: 'ongoing-partnership'
    }
];
