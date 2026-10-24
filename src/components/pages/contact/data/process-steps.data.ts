import type { ProcessStep } from '../types/process-step.types';

/**
 * Process workflow steps data with string icon names
 */
export const processSteps: ProcessStep[] = [
    {
        id: "01",
        title: "Discovery",
        subtitle: "The Foundation",
        description: "We dive deep into your brand's DNA, understanding your goals, audience, and unique challenges to build a solid strategic foundation.",
        features: ["Market Analysis", "User Research", "Goal Definition"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
        icon: 'Search',
        color: "bg-emerald-500"
    },
    {
        id: "02",
        title: "Strategy",
        subtitle: "The Roadmap",
        description: "Our team crafts a tailored roadmap, selecting the right technologies and design approaches to ensure scalability and impact.",
        features: ["Tech Stack Selection", "UX Strategy", "Project Planning"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
        icon: 'Lightbulb',
        color: "bg-teal-500"
    },
    {
        id: "03",
        title: "Execution",
        subtitle: "The Build",
        description: "We bring the vision to life with pixel-perfect design and clean, efficient code, keeping you in the loop at every sprint.",
        features: ["Agile Development", "UI/UX Design", "Code Reviews"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
        icon: 'PenTool',
        color: "bg-cyan-500"
    },
    {
        id: "04",
        title: "Launch",
        subtitle: "The Liftoff",
        description: "A seamless deployment process ensures your product hits the market with momentum, ready to capture and convert.",
        features: ["QA Testing", "Deployment", "Post-Launch Support"],
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
        icon: 'Rocket',
        color: "bg-blue-500"
    }
];
