"use client";

import { motion } from 'motion/react';
import { CtaCard } from '@/components/ui/call-to-action-cta';

export function ConversationCTA() {
    return (
        <section className="relative bg-background pb-16 md:pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Start a Conversation
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <CtaCard
                        title="Ready to Explore Trade Opportunities?"
                        description="Connect with our team to discuss how we can support your FMCG and spirits trade partnerships. Whether you're a brand owner seeking distribution or a distributor looking for portfolio access, let's start the conversation."
                        buttonText="Get in Touch"
                        inputPlaceholder="Your email address"
                        imageSrc="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2NzExOTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                        onButtonClick={(email) => {
                            console.log('Contact form submitted:', email);
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
