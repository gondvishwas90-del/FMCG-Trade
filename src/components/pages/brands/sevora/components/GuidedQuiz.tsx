"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { ArrowRight, MessageCircle, RefreshCcw, X } from "lucide-react";
import { createPortal } from "react-dom";

interface GuidedQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuidedQuiz({ isOpen, onClose }: GuidedQuizProps) {
  const { quiz } = SEVORA_DATA;
  const [currentStepId, setCurrentStepId] = useState<string>("q1");
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset quiz when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStepId("q1");
      setDirection(1);
    }
  }, [isOpen]);

  const currentQuestion = quiz.questions.find(q => q.id === currentStepId);
  const currentResult = (quiz.results as any)[currentStepId];

  const handleOptionSelect = (nextId: string) => {
    setDirection(1);
    setCurrentStepId(nextId);
  };

  const handleReset = () => {
    setDirection(-1);
    setCurrentStepId("q1");
  };

  const handleWhatsAppOpen = (message: string) => {
    onClose();
    setTimeout(() => {
        const event = new CustomEvent('open-whatsapp', {
          detail: { message }
        });
        window.dispatchEvent(event);
    }, 300);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#020504] border border-emerald-100 dark:border-emerald-900/30 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header / Close Button */}
            <div className="flex justify-end p-4 absolute top-0 right-0 z-20">
                <button 
                    onClick={onClose}
                    className="p-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full transition-colors text-foreground"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight mb-2 text-foreground">
                        {quiz.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base italic max-w-lg mx-auto">
                        {quiz.subtitle}
                    </p>
                </div>

                <div className="relative min-h-[350px] w-full flex items-center justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentQuestion && (
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col w-full h-full"
                            >
                                <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground leading-snug text-center">
                                    {currentQuestion.question}
                                </h3>
                                <div className="flex flex-col gap-3 mt-auto">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(option.next)}
                                            className="group text-left p-4 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 flex items-center justify-between"
                                        >
                                            <span className="text-foreground font-medium text-sm md:text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                                {option.label}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {currentResult && (
                            <motion.div
                                key={currentStepId}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col h-full items-center justify-center text-center py-4 w-full"
                            >
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                                    <MessageCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-foreground">
                                    {currentResult.title}
                                </h3>
                                <p className="text-muted-foreground text-base mb-8 max-w-sm mx-auto leading-relaxed">
                                    {currentResult.message}
                                </p>
                                
                                <div className="flex flex-col gap-3 w-full max-w-sm">
                                    <button
                                        onClick={() => handleWhatsAppOpen(currentResult.whatsappMessage)}
                                        className="inline-flex items-center justify-center gap-3 w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-500 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.3)] active:scale-95"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center justify-center gap-2 w-full bg-transparent border border-zinc-200 dark:border-white/10 text-foreground px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95"
                                    >
                                        <RefreshCcw className="w-3 h-3" /> Start Over
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
