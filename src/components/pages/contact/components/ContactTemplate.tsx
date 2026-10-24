
import dynamic from 'next/dynamic';
import { ContactHero } from './ContactHero';
import { ContactMethods } from './ContactMethods';
import { OfficeCarousel } from './OfficeCarousel';
import { ContactForm } from './ContactForm';

const HowItWorksSection = dynamic(() => import('./HowItWorksSection').then(mod => mod.HowItWorksSection));

export function ContactTemplate() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section with Kinetic Typography */}
            <ContactHero />

            {/* Main Content Area - Overlapping the Hero */}
            <div className="relative z-10 -mt-20 px-4 md:px-8 pb-12 md:pb-32">
                <div id='contact-form' className="max-w-[1800px] mx-auto bg-card rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-border/50">
                    <div className="grid lg:grid-cols-5 min-h-[800px]">
                        {/* Left Side - Contact Methods & Info */}
                        <div className="lg:col-span-2 bg-muted/30 p-6 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden group">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                    Contact Information
                                </h3>
                                <p className="text-muted-foreground text-lg mb-12">
                                    Choose your preferred way to connect with us.
                                </p>

                                <ContactMethods />
                            </div>

                            <OfficeCarousel />
                        </div>

                        {/* Right Side - Creative Form */}
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* How It Works Section - Sticky Horizontal Scroll */}
            <HowItWorksSection />
        </main>
    );
}
