import type { JourneyStep } from '../types/wizard.types';

/**
 * Journey wizard steps data with string icon names
 */
export const journeySteps: JourneyStep[] = [
    {
        id: "productStatus",
        title: "Where are you in your journey?",
        description: "Select the option that best describes your current position.",
        options: [
            {
                id: "building",
                label: "Building a New Brand",
                description: "I am creating a new product line or brand from scratch.",
                icon: 'Building2',
                value: "building",
                isTerminal: true,
                recommendedStages: [0], // Stage 01
            },
            {
                id: "trading",
                label: "Already Trading",
                description: "I am an active distributor, wholesaler, or brand owner.",
                icon: 'Store',
                value: "trading",
                nextStepId: "currentNeed",
                recommendedStages: [],
            },
        ],
    },
    {
        id: "currentNeed",
        title: "What is your primary focus?",
        description: "Help us understand your immediate requirements.",
        options: [
            {
                id: "sourcing",
                label: "Sourcing Products",
                description: "Looking for new brands and SKUs.",
                icon: 'Package',
                value: "sourcing",
                isTerminal: true,
                recommendedStages: [1], // Stage 02
            },
            {
                id: "logistics",
                label: "Logistics & Supply",
                description: "Moving, storing, or consolidating stock.",
                icon: 'Truck',
                value: "logistics",
                isTerminal: true,
                recommendedStages: [2], // Stage 03
            },
            {
                id: "market-entry",
                label: "Entering UK/EU Market",
                description: "Need support with market entry & distribution.",
                icon: 'Globe2',
                value: "market-entry",
                isTerminal: true,
                recommendedStages: [3], // Stage 04
            },
            {
                id: "expansion",
                label: "Expanding Trade",
                description: "Growing existing volume and relationships.",
                icon: 'TrendingUp',
                value: "expansion",
                isTerminal: true,
                recommendedStages: [4], // Stage 05
            },
        ],
    },
];
