"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Building2, Globe2, Package, Truck, TrendingUp, Store } from "lucide-react";
import type { JourneyState } from "../types/journey.types";
import { journeySteps } from "../data/journey-steps.data";
import type { JourneyOption } from '../types/wizard.types';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Icon map for dynamic rendering
const iconMap = {
    Building2,
    Globe2,
    Package,
    Truck,
    TrendingUp,
    Store
};


interface JourneyWizardProps {
    journeyState: JourneyState;
    setJourneyState: (state: JourneyState) => void;
    onComplete: () => void;
    isCompleted?: boolean;
}

export default function JourneyWizard({
    journeyState,
    setJourneyState,
    onComplete,
    isCompleted = false,
}: JourneyWizardProps) {
    const [openItem, setOpenItem] = useState<string>("productStatus");

    // Auto-collapse when completed
    useEffect(() => {
        if (isCompleted) {
            setOpenItem("");
        }
    }, [isCompleted]);

    const handleOptionSelect = (stepId: string, option: JourneyOption) => {
        let newState = { ...journeyState };

        if (stepId === "productStatus") {
            newState.productStatus = option.value as any;
            newState.currentNeed = null;
            newState.recommendedStages = [];
        } else if (stepId === "currentNeed") {
            newState.currentNeed = option.value as any;
        }

        if (option.isTerminal) {
            newState.recommendedStages = option.recommendedStages;
            setJourneyState(newState);
            setTimeout(onComplete, 500);
        } else {
            setJourneyState(newState);
            if (option.nextStepId) {
                setOpenItem(option.nextStepId);
            }
        }
    };

    const isOptionSelected = (stepId: string, optionValue: string) => {
        if (stepId === "productStatus") return journeyState.productStatus === optionValue;
        if (stepId === "currentNeed") return journeyState.currentNeed === optionValue;
        return false;
    };

    const getSelectedOption = (stepId: string) => {
        if (stepId === "productStatus" && journeyState.productStatus) {
            return journeySteps.find(s => s.id === "productStatus")?.options.find(o => o.value === journeyState.productStatus);
        }
        if (stepId === "currentNeed" && journeyState.currentNeed) {
            return journeySteps.find(s => s.id === "currentNeed")?.options.find(o => o.value === journeyState.currentNeed);
        }
        return null;
    };

    return (
        <div className="w-full">
            <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className="space-y-3"
            >
                {journeySteps.map((step) => {
                    const isVisible =
                        step.id === "productStatus" ||
                        (step.id === "currentNeed" && journeyState.productStatus === "trading");

                    if (!isVisible) return null;

                    const selectedOption = getSelectedOption(step.id);
                    const isCompleted = !!selectedOption;

                    return (
                        <AccordionItem
                            key={step.id}
                            value={step.id}
                            className="bg-card border text-left border-border rounded-2xl overflow-hidden shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-emerald-500/10 transition-all duration-300"
                        >
                            <AccordionTrigger className="px-4 py-3 md:px-6 md:py-4 hover:no-underline hover:bg-muted/50">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-base md:text-lg font-semibold text-foreground">
                                    <span className={`
                                        flex items-center justify-center w-6 h-6 rounded-full text-xs
                                        ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'}
                                    `}>
                                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : (journeySteps.indexOf(step) + 1)}
                                    </span>
                                    <span>{step.title}</span>
                                    {isCompleted && selectedOption && (() => {
                                        const IconComponent = iconMap[selectedOption.icon];
                                        return (
                                            <span className="flex items-center gap-1.5 text-xs md:text-sm font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                                                <IconComponent className="w-3.5 h-3.5" />
                                                {selectedOption.label}
                                            </span>
                                        );
                                    })()}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-1 md:px-6 md:pb-6">
                                <p className="text-muted-foreground mb-3 md:mb-4 text-xs md:text-sm">
                                    {step.description}
                                </p>
                                <div className={`grid gap-3 ${step.options.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                    step.options.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                                        step.options.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    }`}>
                                    {step.options.map((option) => {
                                        const IconComponent = iconMap[option.icon];
                                        const isSelected = isOptionSelected(step.id, option.value);
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleOptionSelect(step.id, option)}
                                                className={`
                                                    relative group p-3 md:p-4 rounded-xl border text-left transition-all duration-200 min-h-[60px] active:scale-[0.98] touch-manipulation
                                                    ${isSelected
                                                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500'
                                                        : 'bg-card border-border hover:border-emerald-500/50 hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground group-hover:text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30'}`}>
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                                                </div>
                                                <h4 className={`font-semibold mb-0.5 text-sm ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                                                    {option.label}
                                                </h4>
                                                <p className={`text-xs leading-relaxed ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                                                    {option.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
