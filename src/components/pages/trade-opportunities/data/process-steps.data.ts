import type { ProcessStep } from '../types/form-data.types';

/**
 * Process workflow steps data with string icon names
 */
export const processSteps: ProcessStep[] = [
    {
        icon: 'Search',
        title: "Discovery & Inquiry",
        description: "Browse verified opportunities curated by our trading desk. Availability reflects live market data."
    },
    {
        icon: 'ShieldCheck',
        title: "Verification & Compliance",
        description: "We validate supplier credentials, stock authenticity, and logistics feasibility before engagement."
    },
    {
        icon: 'Handshake',
        title: "Partnership & Execution",
        description: "Direct negotiation facilitation, contract support, and secure transaction management."
    }
];
