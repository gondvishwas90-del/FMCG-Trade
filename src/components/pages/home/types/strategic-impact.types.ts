/**
 * Type definitions for Strategic Impact component grid items
 */
export interface GridItemProps {
    area: string;
    icon: 'ShoppingBasket' | 'Wine' | 'Beer' | 'CupSoda' | 'Candy';
    title: string;
    description: string[];
    bgClass: string;
}
