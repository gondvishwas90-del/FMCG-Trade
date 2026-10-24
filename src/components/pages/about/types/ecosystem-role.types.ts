/**
 * Type definitions for ecosystem role cards
 */
export interface EcosystemRole {
    id: number;
    title: string;
    description: string;
    icon: 'Box' | 'Settings' | 'Sparkles' | 'Lock';
    span: 'single' | 'double';
}
