export type FilterType = 'country' | 'use' | 'access' | 'category' | 'owner';

export interface FilterOption {
    label: string;
    type: FilterType;
    options: string[];
}
