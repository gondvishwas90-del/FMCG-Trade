export interface CarouselCard {
    id: number;
    title: string;
    subtitle?: string;
    cta?: string;
    layout: 'norman' | 'found' | 'measured' | 'centered';
    image: string;
}

export const carouselData: CarouselCard[] = [
    {
        id: 1,
        title: 'Global FMCG Supply. Built for Trade.',
        subtitle: 'Commercial trade partner for established FMCG brands, volume sourcing, and international trade supply.',
        cta: 'Request Commercial Pricing →',
        layout: 'found',
        image: 'https://images.unsplash.com/photo-1646913508331-5ef3f22ba677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGRvY3RvcnxlbnwxfHx8fDE3NzA0NTQyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 2,
        title: 'Commercial FMCG Supply & Trade.',
        subtitle: 'Built exclusively for commercial buyers seeking FMCG products for distribution and resale. We do not operate as a retail store.',
        cta: 'Explore Trade Capabilities →',
        layout: 'norman',
        image: 'https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDM2MDcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 3,
        title: 'Duty-Free & Commercial Pallet Allocations.',
        subtitle: 'Supplying bulk pallets and container shipments of premium spirits, beverages, and FMCG lines across international trade corridors.',
        cta: 'Enquire About Availability →',
        layout: 'measured',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwNDUyMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 4,
        title: 'FMCG Sourcing & Supply Coordination.',
        subtitle: 'A structured commercial workflow from requirement submission to compliance, proforma terms, and under-bond bonded dispatch.',
        cta: 'View Trade Process →',
        layout: 'centered',
        image: 'https://images.unsplash.com/photo-1567943183748-3a7542120c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA0NTQyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 5,
        title: 'Global FMCG Distribution & Trade Hubs.',
        subtitle: 'Efficient commercial movement across established bonded warehouses, free-trade zones, and major international transit lanes.',
        cta: 'Explore Trade Corridors →',
        layout: 'norman',
        image: 'https://images.unsplash.com/photo-1759972524905-6f5d3be92e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMGRlc2lnbnxlbnwxfHx8fDE3NzA0NTQyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 6,
        title: 'Trusted Partner for Commercial Trade.',
        subtitle: 'Serving verified importers, regional distributors, and volume procurement teams with authentic brands and transparent terms.',
        cta: 'Submit Trade Requirements →',
        layout: 'found',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzNjk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
];
