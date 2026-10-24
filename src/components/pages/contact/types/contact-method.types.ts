/**
 * Type definition for contact methods
 */
export interface ContactMethod {
    icon: 'MessageSquare' | 'Phone' | 'Mail' | 'Calendar';
    title: string;
    description: string;
    action: string;
    gradient: string;
}
