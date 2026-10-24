import type { ExpertiseItem } from '../types/expertise.types';

/**
 * Expertise accordion items data
 */
export const expertiseItems: ExpertiseItem[] = [
    {
        id: 1,
        title: 'Product Availability & Market Inquiry',
        subtitle: 'Inquiry',
        image: '/our-process/product-availability-market-inquiry.png',
        description: [
            "Buyers submit their requirements (SKUs, volumes, destinations).",
            "We confirm stock availability, pricing, and lead times.",
            "Market restrictions and duty‑free eligibility are checked upfront."
        ]
    },
    {
        id: 2,
        title: 'Offer & Compliance Verification',
        subtitle: 'Verification',
        image: '/our-process/offer-compliance-verification.png',
        description: [
            "A formal offer is issued with full product details and commercial terms.",
            "Buyer credentials are verified through trade references and documentation.",
            "Compliance packs (certificates, registrations, company documents) are exchanged."
        ]
    },
    {
        id: 3,
        title: 'Order Confirmation & Payment Terms',
        subtitle: 'Confirmation',
        image: '/our-process/order-confirmation-payment-terms.png',
        description: [
            "Final quantities, prices, and delivery terms are agreed.",
            "Proforma invoice is issued.",
            "Payment is secured via deposit, escrow, or agreed method with sales manager."
        ]
    },
    {
        id: 4,
        title: 'Logistics, Handling & Documentation',
        subtitle: 'Logistics',
        image: '/our-process/logistics-handling-documentation.png',
        description: [
            "Goods are prepared, inspected, and packed according to destination requirements.",
            "Export documents (invoice, packing list, COO, health certificates, etc.) are arranged.",
            "Shipment is booked and tracked until departure."
        ]
    },
    {
        id: 5,
        title: 'Delivery & Post‑Trade Support',
        subtitle: 'Support',
        image: '/our-process/delivery-post-trade-support.png',
        description: [
            "Buyer receives all shipping documents for customs clearance.",
            "Delivery is monitored until goods arrive safely.",
            "After‑sales support is provided for future orders, availability updates, and long‑term cooperation."
        ]
    },
];
