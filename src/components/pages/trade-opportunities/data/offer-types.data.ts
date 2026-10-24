import type { FilterOption } from '../types/filter.types';

/**
 * Offer type filter options
 */
export const offerTypes: FilterOption[] = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'bulk-clearance', label: 'Bulk Clearance' },
    { id: 'duty-free', label: 'Duty-Free' },
    { id: 'market-entry', label: 'Market Entry' },
    { id: 'short-dated', label: 'Short-Dated' },
    { id: 'private-label', label: 'Private Label' }
];
