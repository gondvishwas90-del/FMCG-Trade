/**
 * Type definition for process workflow steps
 */
export interface ProcessStep {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
    icon: 'Search' | 'Lightbulb' | 'PenTool' | 'Rocket';
    color: string;
}
