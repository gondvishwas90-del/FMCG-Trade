import type { PackageCard } from '../types/package.types';

/**
 * Showcase packages data - Original Live Site Content
 */
export const packages: PackageCard[] = [
    {
        id: 1,
        title: 'Global Spirits Portfolios',
        tagline: 'Supplying leading global spirits portfolios.',
        bodyText: 'We supply a wide range of internationally recognised spirits from major global portfolios, including lines from Diageo, Pernod Ricard, Bacardi, Beam Suntory, Brown‑Forman, Rémy Cointreau, and LVMH (Hennessy). Our focus is on high‑rotation duty‑free SKUs such as premium whisky, vodka, gin, rum, and cognac. All products are sourced through authorised channels, ensuring authenticity, competitive pricing, and consistent availability for distributors, bonded warehouses, and travel‑retail operators.',
        features: ['Global Spirits Portfolios', 'Duty-Free High Rotation', 'Authorised Channels'],
        image: '/section-2/supplying-leading-global-spirits-portfolios.png',
        color: 'bg-amber-600',
        showCTA: true,
        href: "/categories",
        templateId: 'global-trade',
    },
    {
        id: 2,
        title: 'Global Trade Lanes',
        tagline: 'Strong presence across key global trade lanes.',
        bodyText: 'We operate across the Middle East, Asia, Europe, South America and the CIS region, supplying duty‑free zones, bonded warehouses, travel‑retail operators, and regional wholesalers. Our understanding of local regulations, demand patterns, and logistics routes allows us to move products efficiently into high‑growth markets. Whether supporting established distribution networks or opening new channels, we ensure smooth access to regions with strong demand for premium spirits.',
        features: ['Middle East & Asia', 'Europe & South America', 'CIS & Duty-Free Zones'],
        image: '/section-2/strong-presence-across-key-global-trade-lanes.png',
        color: 'bg-blue-600',
        showCTA: true,
        templateId: 'global-trade',
    },
    {
        id: 3,
        title: 'Bonded Warehouses',
        tagline: 'Trusted bonded warehouses and efficient export handling.',
        bodyText: 'We operate through established bonded warehouses and logistics partners, including Loendersloot, Newcorp, PLG, Reftrans & many more where we maintain active accounts to support secure storage, consolidation, and export preparation. These facilities enable us to handle duty‑free spirits with precision — from mixed pallets to full‑container loads. Every movement is managed with strict compliance, accurate documentation, and coordinated dispatch, ensuring goods flow smoothly and reliably across international trade lanes.',
        features: ['Loendersloot & Newcorp', 'PLG & Reftrans Accounts', 'Secure Export Preparation'],
        image: '/section-2/trusted-bonded-warehouses-and-efficient-export-handling.png',
        color: 'bg-emerald-600',
        showCTA: true,
        templateId: 'logistics',
    },
    {
        id: 4,
        title: 'Verified Partners',
        tagline: 'Verified partners, secure payments, transparent documentation.',
        bodyText: 'Compliance is central to our trading model. We verify every buyer and supplier, manage all regulatory documentation, and ensure duty‑free and export requirements are met without compromise. Our structured approach to risk management, payment security, and document accuracy gives partners complete confidence in every transaction. With FMCG Exchange Ltd, every trade is protected, transparent, and professionally executed.',
        features: ['Counterparty Verification', 'Transparent Documentation', 'Strict Compliance'],
        image: '/section-2/verified-partners-secure-payments-transparent-documentation.png',
        color: 'bg-indigo-600',
        showCTA: true,
        templateId: 'compliance',
    },
];
