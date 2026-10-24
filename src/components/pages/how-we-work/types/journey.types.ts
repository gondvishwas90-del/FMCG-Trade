/**
 * Type definitions for journey workflow
 */

export type JourneyMode = 'explore' | 'guided';

export interface JourneyState {
    productStatus: 'building' | 'trading' | null;
    currentNeed: 'sourcing' | 'logistics' | 'market-entry' | 'expansion' | null;
    recommendedStages: number[];
}
