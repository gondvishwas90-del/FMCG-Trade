import type { EcosystemRole } from '../types/ecosystem-role.types';

/**
 * Ecosystem role cards data
 */
export const ecosystemRoles: EcosystemRole[] = [
    {
        id: 1,
        title: "Coordinator",
        description: "We coordinate access to portfolios, facilitate communication between partners, and support the alignment of trade requirements across markets and stakeholders.",
        icon: 'Box',
        span: 'double'
    },
    {
        id: 2,
        title: "Connector",
        description: "We introduce qualified partners to brand owners and distributors, providing structured access to networks.",
        icon: 'Settings',
        span: 'single'
    },
    {
        id: 3,
        title: "Portfolio Access",
        description: "Direct access to exclusive FMCG and spirits brands seeking market expansion and distribution partnerships.",
        icon: 'Sparkles',
        span: 'double'
    },
    {
        id: 4,
        title: "Facilitation",
        description: "Supporting ongoing trade relationships by maintaining engagement and facilitating documentation.",
        icon: 'Lock',
        span: 'single'
    }
];
