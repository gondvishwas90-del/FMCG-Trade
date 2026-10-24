/**
 * Type definitions for journey wizard
 */

export interface JourneyOption {
    id: string;
    label: string;
    description: string;
    icon: 'Building2' | 'Globe2' | 'Package' | 'Truck' | 'TrendingUp' | 'Store'; // String icon name
    value: string;
    nextStepId?: string;
    isTerminal?: boolean;
    recommendedStages: number[];
}

export interface JourneyStep {
    id: string;
    title: string;
    description: string;
    options: JourneyOption[];
}
