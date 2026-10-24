import type { PackageCard } from '../types/package.types';

/**
 * Showcase packages data - Balanced Commercial Sourcing & Trade Terms
 */
export const packages: PackageCard[] = [
    {
        id: 1,
        title: 'FMCG Brand Sourcing',
        tagline: 'Commercial FMCG supply of leading global spirits & FMCG brands.',
        bodyText: 'We supply high-volume commercial quantities of internationally recognised spirits and FMCG brands for verified business buyers, including distributors, bonded warehouses, and travel‑retail operators.\n\nAll commercial stock is sourced through authorised channels—available in case, pallet, and container volumes. Pricing, allocation, and minimum order terms are confirmed directly through our trade desk.',
        features: ['Commercial FMCG Supply', 'Case & Pallet Volumes', 'Authorised Trade Channels'],
        image: '/section-2/supplying-leading-global-spirits-portfolios.png',
        color: 'bg-amber-600',
        showCTA: true,
        href: "/categories",
        templateId: 'global-trade',
    },
    {
        id: 2,
        title: 'International Trade Lanes',
        tagline: 'Cross-border FMCG distribution across major commercial corridors.',
        bodyText: 'We operate across the Middle East, Asia, Europe, South America, and the CIS region, supplying duty‑free zones, bonded warehouses, travel‑retail operators, and regional trade distributors.\n\nOur understanding of local trade compliance, volume demand, and customs routing enables efficient product movement into high‑growth commercial markets with full provenance.',
        features: ['Global Trade Lanes', 'Duty-Free & Free Zones', 'FMCG Distribution Access'],
        image: '/section-2/strong-presence-across-key-global-trade-lanes.png',
        color: 'bg-blue-600',
        showCTA: true,
        templateId: 'global-trade',
    },
    {
        id: 3,
        title: 'Bonded Warehousing & Logistics',
        tagline: 'Trusted bonded warehousing, pallet consolidation & export handling.',
        bodyText: 'We operate through established bonded warehouses and logistics partners—including Loendersloot, Newcorp, PLG, and Reftrans—maintaining active accounts to support secure storage, consolidation, and export preparation.\n\nFrom mixed commercial pallets to full‑container loads, every consignment is managed with strict regulatory compliance, authentic documentation, and coordinated dispatch across international trade routes.',
        features: ['Under-Bond Storage', 'Pallet & Container Loads', 'Strict Export Compliance'],
        image: '/section-2/trusted-bonded-warehouses-and-efficient-export-handling.png',
        color: 'bg-emerald-600',
        showCTA: true,
        templateId: 'logistics',
    },
    {
        id: 4,
        title: 'Trade Assurance & Verification',
        tagline: 'Verified commercial counterparties, secure transactions, transparent documentation.',
        bodyText: 'FMCG Exchange operates strictly on a commercial B2B model. We verify every trade counterparty, manage all regulatory documentation, and ensure duty‑free and export requirements are met without compromise.\n\nOur structured approach to trade risk management, proforma invoicing, and document verification gives commercial partners complete confidence in every commercial trade.',
        features: ['Verified Commercial Counterparties', 'Secure B2B Payment Terms', 'Full Trade Documentation'],
        image: '/section-2/verified-partners-secure-payments-transparent-documentation.png',
        color: 'bg-indigo-600',
        showCTA: true,
        templateId: 'compliance',
    },
];
