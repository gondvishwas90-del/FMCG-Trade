"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PremiumSelect } from '@/components/ui/premium-select';
import { categoryOptions, volumeOptions, timelineOptions } from '../data/form-options.data';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tradeRequirementSchema, type TradeRequirementSchema } from '../schemas/trade.schemas';
import { cn } from '@/lib/utils';

export function TradeRequirementSection() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TradeRequirementSchema>({
        resolver: zodResolver(tradeRequirementSchema),
        defaultValues: {
            category: '',
            market: '',
            volume: '',
            timeline: '',
            notes: ''
        },
    });

    const onSubmit = (data: TradeRequirementSchema) => {
        const subject = encodeURIComponent('Custom Trade Requirement');
        const body = encodeURIComponent(
            `Custom Trade Requirement:\n\n` +
            `Category: ${data.category}\n` +
            `Market/Region: ${data.market}\n` +
            `Volume Band: ${data.volume}\n` +
            `Timeline: ${data.timeline}\n` +
            `Notes: ${data.notes || 'N/A'}\n\n` +
            `Page Context: Trade Offers V2`
        );
        window.location.href = `mailto:sales@globaltradepartners.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="relative py-24 px-4 md:px-6 overflow-hidden">
            {/* Decorative Background - Subtle Gradient Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                        Can't Find What You're <span className="text-emerald-600">Looking For?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Submit a specific mandate. If a suitable opportunity exists or becomes available,
                        our trading desk will follow up directly.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-12"
                >
                    <div className="grid md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-12">
                        <div className='group'>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <PremiumSelect
                                        label="Category of Interest"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={categoryOptions}
                                        placeholder="Select category..."
                                    />
                                )}
                            />
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="market" className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                                Target Market
                            </label>
                            <input
                                {...register('market')}
                                type="text"
                                id="market"
                                placeholder="e.g., UK, EU, Middle East"
                                className={cn(
                                    "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                    errors.market
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-border focus:border-emerald-500"
                                )}
                            />
                            {errors.market && (
                                <p className="mt-1 text-sm text-red-500">{errors.market.message}</p>
                            )}
                        </div>

                        <div className='group'>
                            <Controller
                                name="volume"
                                control={control}
                                render={({ field }) => (
                                    <PremiumSelect
                                        label="Volume Band"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={volumeOptions}
                                        placeholder="Select volume..."
                                    />
                                )}
                            />
                            {errors.volume && (
                                <p className="mt-1 text-sm text-red-500">{errors.volume.message}</p>
                            )}
                        </div>

                        <div className='group'>
                            <Controller
                                name="timeline"
                                control={control}
                                render={({ field }) => (
                                    <PremiumSelect
                                        label="Timeline"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={timelineOptions}
                                        placeholder="Select timeline..."
                                    />
                                )}
                            />
                            {errors.timeline && (
                                <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="group">
                        <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                            Additional Notes
                        </label>
                        <textarea
                            {...register('notes')}
                            id="notes"
                            rows={3}
                            placeholder="Specific brands, price targets, or logistic requirements..."
                            className={cn(
                                "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl leading-relaxed font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none resize-none",
                                errors.notes
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                        />
                        {errors.notes && (
                            <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>
                        )}
                    </div>

                    <div className="flex justify-center pt-8">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 shrink-0"
                        >
                            Submit Trade Requirement
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
