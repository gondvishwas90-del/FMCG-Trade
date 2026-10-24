import type { Office } from '../types/office.types';

/**
 * Global office locations data
 */
export const offices: Office[] = [
    {
        city: 'New York',
        country: 'United States',
        address: '350 Fifth Avenue, Suite 7680, New York, NY 10118',
        phone: '+1 (212) 555-0123',
        email: 'newyork@company.com',
        image: 'https://images.unsplash.com/photo-1738533377488-28175de68c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG9mZmljZXxlbnwxfHx8fDE3NjcwMDY5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        timezone: 'EST (UTC-5)',
    },
    {
        city: 'London',
        country: 'United Kingdom',
        address: '1 Canada Square, Canary Wharf, London E14 5AB',
        phone: '+44 20 7946 0958',
        email: 'london@company.com',
        image: 'https://images.unsplash.com/photo-1560922604-d08a31f8f7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NzEwNTA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
        timezone: 'GMT (UTC+0)',
    },
    {
        city: 'Singapore',
        country: 'Singapore',
        address: '1 Marina Boulevard, #20-01, Singapore 018989',
        phone: '+65 6789 0123',
        email: 'singapore@company.com',
        image: 'https://images.unsplash.com/photo-1621953789264-0734777ee76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjByZWNlcHRpb258ZW58MXx8fHwxNjcwMjI2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        timezone: 'SGT (UTC+8)',
    },
];
