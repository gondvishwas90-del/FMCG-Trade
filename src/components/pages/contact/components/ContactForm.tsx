"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { PremiumSelect } from '@/components/ui/premium-select';
import { subjectOptions } from '../data/form-options.data';
import { customEasing } from '../constants/animations';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactSchema } from '../schemas/contact.schemas';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            phone: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactSchema) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/enquire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    templateId: "general-contact",
                    contactPerson: data.name,
                    companyName: data.company
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                reset();
                // After success, don't auto-reset 'submitted' state too quickly so user can see it
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Contact Form Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: any) => {
        console.error("Contact Form Validation Errors:", errors);
    };

    return (
        <div className="lg:col-span-3 bg-background p-6 md:p-12 lg:p-20 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        Let's start a <span className="text-emerald-600">Project.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Fill in the details below and we'll get back to you within 24 hours.
                    </p>
                </div>

                {submitted ? (
                    <motion.div
                        className="py-24 text-center border-2 border-dashed border-emerald-500/20 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: customEasing }}
                    >
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-3xl font-bold text-foreground mb-2">Message Received!</h4>
                        <p className="text-lg text-muted-foreground">We'll be in touch shortly.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="group">
                                <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                                    Your Name
                                </label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    className={cn(
                                        "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                        errors.name
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-border focus:border-emerald-500"
                                    )}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                                    Email Address
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={cn(
                                        "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                        errors.email
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-border focus:border-emerald-500"
                                    )}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="group">
                                <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                                    Company
                                </label>
                                <input
                                    {...register('company')}
                                    type="text"
                                    className={cn(
                                        "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                        errors.company
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-border focus:border-emerald-500"
                                    )}
                                    placeholder="Acme Inc."
                                />
                                {errors.company && (
                                    <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                                )}
                            </div>

                            <div className="group">
                                <Controller
                                    name="subject"
                                    control={control}
                                    render={({ field }) => (
                                        <PremiumSelect
                                            label="Subject"
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={subjectOptions}
                                            placeholder="Select a topic"
                                        // Pass onBlur to ensure "touched" state is handled if PremiumSelect supports it (or just for completeness)
                                        />
                                    )}
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="group pt-4">
                            <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                                Tell us about your project
                            </label>
                            <textarea
                                {...register('message')}
                                rows={4}
                                className={cn(
                                    "w-full px-0 py-4 bg-transparent border-b-2 transition-colors text-xl leading-relaxed font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none resize-none",
                                    errors.message
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-border focus:border-emerald-500"
                                )}
                                placeholder="We're looking to build..."
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                            )}
                        </div>

                        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                            <p className="text-sm text-muted-foreground text-center md:text-left">
                                By submitting this form, you agree to our <Link href="/privacy-policy" className="underline hover:text-emerald-600">Privacy Policy</Link>.
                            </p>
                            <motion.button
                                disabled={isSubmitting}
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full md:w-auto bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 shrink-0 disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
