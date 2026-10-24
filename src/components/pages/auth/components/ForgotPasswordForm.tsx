"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordSchema } from '../schemas/auth.schemas';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const emailValue = watch('email');

    const onSubmit = async (data: ForgotPasswordSchema) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setIsSent(true);
    };

    if (isSent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto text-center"
            >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Check your email</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    We've sent a password reset link to <br />
                    <span className="text-foreground font-medium">{emailValue}</span>
                </p>
                <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="mb-10">
                <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-emerald-500 uppercase tracking-widest mb-6 transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                    Forgot <span className="text-emerald-500">Password?</span>
                </h2>
                <p className="text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            {...register('email')}
                            type="email"
                            className={cn(
                                "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                            placeholder="name@company.com"
                        />
                        <Mail className={cn(
                            "absolute right-2 top-3 w-5 h-5 transition-colors",
                            errors.email ? "text-red-500" : "text-muted-foreground/50 group-focus-within:text-emerald-500"
                        )} />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="pt-4">
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Send Reset Link
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
