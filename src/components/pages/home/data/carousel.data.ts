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
        title: 'A Global Trading House.',
        subtitle: 'FMCG Exchange Ltd connects international brands with high‑growth markets through compliance‑first, relationship‑driven trade.',
        cta: 'Explore Trade Portfolio →',
        layout: 'found',
        image: 'https://images.unsplash.com/photo-1646913508331-5ef3f22ba677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGRvY3RvcnxlbnwxfHx8fDE3NzA0NTQyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 2,
        title: 'Source Global Products For The UK Market',
        subtitle: 'Helping UK wholesalers, distributors, retailers and hospitality businesses import with confidence.',
        cta: 'Explore UK Trade →',
        layout: 'norman',
        image: 'https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDM2MDcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 3,
        title: 'Trusted Trade. Global Reach.',
        subtitle: 'Delivering duty‑free spirits with precision and reliability.',
        cta: 'View Spirits Portfolio →',
        layout: 'measured',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwNDUyMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 4,
        title: 'Specialists in Duty‑Free.',
        subtitle: 'We supply premium whisky, vodka, gin, and global FMCG brands across the Middle East, Asia, Europe, South America and CIS.',
        cta: 'Explore Duty-Free →',
        layout: 'centered',
        image: 'https://images.unsplash.com/photo-1567943183748-3a7542120c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA0NTQyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 5,
        title: 'A Seamless Workflow.',
        subtitle: 'From inquiry to delivery, our 6‑step process ensures reliability, transparency, and on‑time execution.',
        cta: 'View Our Process →',
        layout: 'norman',
        image: 'https://images.unsplash.com/photo-1759972524905-6f5d3be92e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMGRlc2lnbnxlbnwxfHx8fDE3NzA0NTQyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 6,
        title: 'Operating Across Key Lanes.',
        subtitle: 'We move goods efficiently through established networks spanning duty‑free zones, bonded warehouses, and major logistics hubs.',
        cta: 'Explore Trade Corridors →',
        layout: 'found',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzNjk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 7,
        title: 'Your Dependable Partner.',
        subtitle: 'Trusted by distributors worldwide for consistent availability, competitive pricing, and compliance‑driven operations.',
        cta: 'Contact Trade Desk →',
        layout: 'measured',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    }
];
