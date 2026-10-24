/**
 * Type definitions for form data
 */

export interface TradeRequirementFormData {
    category: string;
    market: string;
    volume: string;
    timeline: string;
    notes: string;
}

export interface FormOption {
    value: string;
    label: string;
}

export interface ProcessStep {
    icon: 'Search' | 'ShieldCheck' | 'Handshake';
    title: string;
    description: string;
}
