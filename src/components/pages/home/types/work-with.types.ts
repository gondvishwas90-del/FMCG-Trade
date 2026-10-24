/**
 * Type definition for Who We Work With cards
 */
export interface WorkWithCard {
    id: number;
    icon: 'Store' | 'Warehouse' | 'Globe' | 'Package';
    title: string;
    description: string;
}
