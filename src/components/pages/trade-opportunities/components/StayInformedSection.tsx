import { useState } from 'react';
import { Bell, ArrowUpRight, Check, Mail, MessageSquare as Message } from 'lucide-react';
import { motion } from 'motion/react';

export function StayInformedSection() {
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

    // Add WhatsApp icon manually since MessageSqwuare might be a typo in my thought import or just using a generic icon for now if needed, 
    // actually let's use MessageCircle for WhatsApp usually, but I'll stick to generic or just use svg if needed. 
    // Using MessageCircle for now as it's cleaner.
    // Wait, I'll just use the Lucide icons available.

    const handlePreferenceToggle = (value: string) => {
        if (selectedPreferences.includes(value)) {
            setSelectedPreferences(selectedPreferences.filter(p => p !== value));
        } else {
            setSelectedPreferences([...selectedPreferences, value]);
        }
    };

    const handleOptIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // We can just use the state for the mailto link construction
        const subject = encodeURIComponent('Trade Opportunities — Update Preferences');
        const body = encodeURIComponent(
            `I would like to receive updates about new trade opportunities.\n\n` +
            `Preferences: ${selectedPreferences.join(', ') || 'None selected'}\n\n` +
            `Page Context: Trade Offers V2`
        );
        window.location.href = `mailto:sales@globaltradepartners.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="bg-background py-24 px-4 md:px-6 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 mb-8 border border-emerald-100 dark:border-emerald-800/20 shadow-lg shadow-emerald-500/10"
                    >
                        <Bell className="w-8 h-8 text-emerald-600" />
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        Stay <span className="text-emerald-600">Informed</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Receive curated intelligence on new trade mandates. Strictly trade-only updates, no spam.
                    </p>
                </div>

                <form onSubmit={handleOptIn} className="max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* Email Option */}
                        <div
                            onClick={() => handlePreferenceToggle('Email updates')}
                            className={`
                                relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 group
                                ${selectedPreferences.includes('Email updates')
                                    ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
                                    : 'border-border bg-card hover:border-emerald-500/30 hover:bg-muted/30'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedPreferences.includes('Email updates') ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPreferences.includes('Email updates') ? 'border-emerald-500 bg-emerald-500 scale-110' : 'border-muted-foreground/30'}`}>
                                    {selectedPreferences.includes('Email updates') && <Check className="w-3 h-3 text-white stroke-[4]" />}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Email Updates</h3>
                            <p className="text-muted-foreground">Weekly digest of verified opportunities directly to your inbox.</p>
                        </div>

                        {/* WhatsApp Option */}
                        <div
                            onClick={() => handlePreferenceToggle('WhatsApp Alerts')}
                            className={`
                                relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 group
                                ${selectedPreferences.includes('WhatsApp Alerts')
                                    ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
                                    : 'border-border bg-card hover:border-emerald-500/30 hover:bg-muted/30'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedPreferences.includes('WhatsApp Alerts') ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPreferences.includes('WhatsApp Alerts') ? 'border-emerald-500 bg-emerald-500 scale-110' : 'border-muted-foreground/30'}`}>
                                    {selectedPreferences.includes('WhatsApp Alerts') && <Check className="w-3 h-3 text-white stroke-[4]" />}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp Alerts</h3>
                            <p className="text-muted-foreground">Real-time instant alerts for high-priority & time-sensitive deals.</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-foreground text-background px-12 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/20 flex items-center gap-3"
                        >
                            Update Preferences
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </form>
            </div>
        </section>
    );
}
