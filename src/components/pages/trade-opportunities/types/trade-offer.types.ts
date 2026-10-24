/**
 * Type definitions for trade offers and offer categories
 */

export type OfferType = 'all' | 'bulk-clearance' | 'duty-free' | 'market-entry' | 'short-dated' | 'private-label';

export interface TradeOffer {
    id: string;
    title: string;
    sizes: string[];
    market: string[];
    category: string[];
    // Restoring fields that were accidentally removed or are still needed
    availability: 'Time-Sensitive' | 'Limited Window' | 'Ongoing';
    image: string;
    types: OfferType[];
    price?: string;
    // Notes are now optional or used for general product info
    notes?: string[];
}
