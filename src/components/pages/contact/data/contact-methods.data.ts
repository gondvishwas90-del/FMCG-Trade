import type { ContactMethod } from '../types/contact-method.types';

/**
 * Contact methods data with string icon names
 */
export const contactMethods: ContactMethod[] = [
    {
        icon: 'MessageSquare',
        title: 'Live Chat',
        description: 'Chat with our team in real-time',
        action: 'Start Chat',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        icon: 'Phone',
        title: 'Phone Support',
        description: 'Speak directly with our experts',
        action: 'Call Now',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
        icon: 'Mail',
        title: 'Email Us',
        description: 'Send us a detailed message',
        action: 'Send Email',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        icon: 'Calendar',
        title: 'Book Meeting',
        description: 'Schedule a consultation call',
        action: 'Book Now',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
];
