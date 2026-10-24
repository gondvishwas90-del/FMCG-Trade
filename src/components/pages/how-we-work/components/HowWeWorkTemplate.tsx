"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveRight, RefreshCcw } from "lucide-react";
import type { JourneyMode, JourneyState } from "../types/journey.types";
import JourneyWizard from "./JourneyWizard";
import RoadmapAccordion from "./RoadmapAccordion";
import { HowWeWorkHero } from "./HowWeWorkHero";


export default function HowWeWorkTemplate() {
    const [mode, setMode] = useState<JourneyMode>('explore');
    const [journeyState, setJourneyState] = useState<JourneyState>({
        productStatus: null,
        currentNeed: null,
        recommendedStages: []
    });

    const handleModeChange = (newMode: JourneyMode) => {
        setMode(newMode);
        if (newMode === 'explore') {
            setJourneyState({
                productStatus: null,
                currentNeed: null,
                recommendedStages: []
            });
        }
    };

    const isWizardComplete = journeyState.recommendedStages.length > 0;

    return (
        <main className="min-h-screen bg-background">

            {/* --- HEADER --- */}
            <HowWeWorkHero />

            {/* --- ROADMAP SECTION --- */}
            <section id="roadmap" className="relative bg-background">
                <RoadmapAccordion
                    recommendedStages={journeyState.recommendedStages}
                    header={
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-0 pt-8 md:pt-2 max-w-[1800px] mx-auto">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-2">The Process</h2>
                                <p className="text-sm md:text-base text-muted-foreground">Five stages of comprehensive trade support.</p>
                            </div>

                            {/* Action Buttons: Find My Stage / Restart Wizard */}
                            <div className="flex gap-4 self-end md:self-auto">
                                {mode === 'explore' && (
                                    <button
                                        onClick={() => handleModeChange('guided')}
                                        className="w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-background/50 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-foreground text-sm font-medium transition-all hover:scale-105 active:scale-[0.98] touch-manipulation"
                                    >
                                        Find My Stage <MoveRight className="w-4 h-4 ml-1" />
                                    </button>
                                )}

                                {mode === 'guided' && isWizardComplete && (
                                    <button
                                        onClick={() => {
                                            setJourneyState({
                                                productStatus: null,
                                                currentNeed: null,
                                                recommendedStages: []
                                            });
                                            setMode('guided');
                                        }}
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-muted-foreground text-sm font-bold hover:border-border/80 hover:text-foreground active:scale-[0.98] transition-all shadow-sm hover:shadow-md touch-manipulation"
                                    >
                                        <RefreshCcw className="w-4 h-4" /> Restart Wizard
                                    </button>
                                )}
                            </div>
                        </div>
                    }
                >
                    {/* --- WIZARD (Embedded) --- */}
                    {mode === 'guided' && (
                        <div className="pt-4 max-w-[1800px] mx-auto">
                            <JourneyWizard
                                journeyState={journeyState}
                                setJourneyState={setJourneyState}
                                onComplete={() => { }}
                                isCompleted={isWizardComplete}
                            />
                        </div>
                    )}
                </RoadmapAccordion>
            </section>

            {/* --- BOTTOM CTA --- */}
            < section className="py-16 md:py-24 lg:py-32 bg-background" >
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 md:mb-8 tracking-tighter">
                        Ready to Start?
                    </h2>
                    <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
                        Whether you're just starting out or ready to scale across the continent, our infrastructure is ready for you.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="w-full md:w-auto bg-foreground text-background px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold hover:bg-foreground/90 hover:scale-105 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 touch-manipulation">
                            Start Your Journey
                            <MoveRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full md:w-auto flex items-center justify-center bg-muted text-muted-foreground px-8 py-4 md:px-10 md:py-5 rounded-full font-bold hover:bg-muted/80 hover:text-foreground active:scale-[0.98] transition-colors touch-manipulation"
                        >
                            Talk to an Expert
                        </Link>
                    </div>
                </div>
            </section >

        </main >
    );
}
