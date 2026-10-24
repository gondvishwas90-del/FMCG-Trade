

import dynamic from 'next/dynamic';
import { WhoWeAreSection } from './WhoWeAreSection';
import { AboutHero } from './AboutHero';

const RoleInEcosystemSection = dynamic(() => import('./RoleInEcosystemSection').then(mod => mod.RoleInEcosystemSection));
const PhilosophyCards = dynamic(() => import('./PhilosophyCards').then(mod => mod.PhilosophyCards));
const GlobalReachSection = dynamic(() => import('./GlobalReachSection').then(mod => mod.GlobalReachSection));
const ImpactStatsSection = dynamic(() => import('./ImpactStatsSection').then(mod => mod.ImpactStatsSection));
const ConversationCTA = dynamic(() => import('./ConversationCTA').then(mod => mod.ConversationCTA));
const ProcessWorkflow = dynamic(() => import('../../home/components/ProcessWorkflow').then(mod => mod.ProcessWorkflow));

export default function AboutTemplate() {
    return (
        <main className="min-h-screen bg-background relative">
            {/* Hero Section */}
            <AboutHero />

            {/* Who We Are Section */}
            <WhoWeAreSection />

            {/* Role in Trade Ecosystem */}
            <RoleInEcosystemSection />

            {/* Process Workflow */}
            <ProcessWorkflow />

            {/* Values Section */}
            <section className="min-h-screen bg-background py-16 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-7xl mx-auto pt-5">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Operating Philosophy
                        </h2>
                    </div>

                    <div className="pt-8">
                        <PhilosophyCards />
                    </div>
                </div>
            </section>

            {/* Global Reach Section */}
            <GlobalReachSection />

            {/* Impact Stats Section */}
            <ImpactStatsSection />

            {/* Start a Conversation Section */}
            <ConversationCTA />
        </main>
    );
}
