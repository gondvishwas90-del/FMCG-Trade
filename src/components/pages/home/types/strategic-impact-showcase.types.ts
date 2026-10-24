export interface ImpactShowcaseItem {
    id: string;
    title: string;
    subtitle: string;
    description: string[];
    image: string;
    stats?: {
        label: string;
        value: string;
    }[];
    tags?: string[];
    link?: string;
}
