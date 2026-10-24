/**
 * Type definition for roadmap stages
 */

export interface StageData {
    id: number;
    number: string;
    title: string;
    description: string;
    idealFor: string;
    bullets: string[];
    typicallyNext: {
        stage: number;
        label: string;
        type: 'most' | 'some';
    }[];
    templateId?: string;
}
