"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatMessage {
    id: string;
    sender: 'user' | 'admin';
    text: string;
    timestamp: number;
}

interface WhatsAppWidgetProps {
    defaultMessage?: string;
}

export const WhatsAppWidget = ({
    defaultMessage = "Hello! How can we help you today?",
}: WhatsAppWidgetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isSending, setIsSending] = useState(false);
    
    // Lead Form States
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [contactMode, setContactMode] = useState<'phone' | 'email'>('phone');
    const [isIdentified, setIsIdentified] = useState(false);
    
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize/Load default message
    const initializeDefaultMessage = useCallback(() => {
        const welcomeMsg: ChatMessage = {
            id: "welcome",
            sender: "admin",
            text: defaultMessage,
            timestamp: Date.now(),
        };
        setMessages([welcomeMsg]);
        localStorage.setItem("whatsapp_chat_history", JSON.stringify([welcomeMsg]));
    }, [defaultMessage]);

    // Load user info and chat history from localStorage on mount
    useEffect(() => {
        const savedName = localStorage.getItem("whatsapp_user_name");
        const savedPhone = localStorage.getItem("whatsapp_user_phone");
        const savedEmail = localStorage.getItem("whatsapp_user_email");
        const savedMode = localStorage.getItem("whatsapp_contact_mode") as 'phone' | 'email' | null;
        if (savedName && (savedPhone || savedEmail)) {
            setUserName(savedName);
            if (savedPhone) setUserPhone(savedPhone);
            if (savedEmail) setUserEmail(savedEmail);
            if (savedMode) setContactMode(savedMode);
            setIsIdentified(true);
        }

        const savedHistory = localStorage.getItem("whatsapp_chat_history");
        if (savedHistory) {
            try {
                setMessages(JSON.parse(savedHistory));
            } catch (err) {
                console.error("Failed to parse chat history", err);
                initializeDefaultMessage();
            }
        } else {
            initializeDefaultMessage();
        }
        
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, [initializeDefaultMessage]);

    // Focus input when opening
    useEffect(() => {
        if (isOpen && isIdentified && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isIdentified]);

    // Scroll to bottom when messages update or chat window is opened
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isOpen]);

    // Custom Event listener to open widget programmatically
    useEffect(() => {
        const handleOpenWhatsApp = (e: Event) => {
            const customEvent = e as CustomEvent;
            setIsOpen(true);
            if (customEvent.detail?.message) {
                setMessage(customEvent.detail.message);
            }
        };
        window.addEventListener('open-whatsapp', handleOpenWhatsApp);
        return () => window.removeEventListener('open-whatsapp', handleOpenWhatsApp);
    }, []);

    const handleIdentify = (e: React.FormEvent) => {
        e.preventDefault();
        const hasContact = contactMode === 'phone' ? userPhone.trim() : userEmail.trim();
        if (userName.trim() && hasContact) {
            localStorage.setItem("whatsapp_user_name", userName.trim());
            localStorage.setItem("whatsapp_user_phone", userPhone.trim());
            localStorage.setItem("whatsapp_user_email", userEmail.trim());
            localStorage.setItem("whatsapp_contact_mode", contactMode);
            setIsIdentified(true);
        }
    };

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsgText = message.trim();
        const userMsg: ChatMessage = {
            id: Math.random().toString(36).substring(7),
            sender: 'user',
            text: userMsgText,
            timestamp: Date.now(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        localStorage.setItem("whatsapp_chat_history", JSON.stringify(updatedMessages));
        setMessage("");

        setIsSending(true);
        try {
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: userMsgText,
                    name: userName,
                    userPhone: userPhone,
                    userEmail: userEmail,
                }),
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                throw new Error("Invalid server response");
            }

            if (response.ok && data.success) {
                const botReplyText = data.whatsappSent
                    ? "Inquiry received — our team will respond on WhatsApp shortly. ✓"
                    : "Inquiry received — we have saved your message and will contact you soon. ✓";
                const botReply: ChatMessage = {
                    id: Math.random().toString(36).substring(7),
                    sender: 'admin',
                    text: botReplyText,
                    timestamp: Date.now(),
                };
                const finalMessages = [...updatedMessages, botReply];
                setMessages(finalMessages);
                localStorage.setItem("whatsapp_chat_history", JSON.stringify(finalMessages));

                toast.success("Your inquiry has been received!", {
                    description: data.whatsappSent
                        ? "Our team will respond on WhatsApp shortly."
                        : "We've saved your message and will contact you soon.",
                });
            } else {
                toast.error(data?.error || "Could not send message. Please try again.");
                const errorReply: ChatMessage = {
                    id: Math.random().toString(36).substring(7),
                    sender: 'admin',
                    text: "Sorry, there was an issue sending your message. Please try again later.",
                    timestamp: Date.now(),
                };
                const finalMessages = [...updatedMessages, errorReply];
                setMessages(finalMessages);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Connection error. Please check your internet and try again.");
            const errorReply: ChatMessage = {
                id: Math.random().toString(36).substring(7),
                sender: 'admin',
                text: "Connection error. Please try again later.",
                timestamp: Date.now(),
            };
            const finalMessages = [...updatedMessages, errorReply];
            setMessages(finalMessages);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

                    {/* Chat Window */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="pointer-events-auto w-[320px] sm:w-[400px] bg-background/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
                                data-lenis-prevent
                            >
                                {/* Header */}
                                <div className="bg-emerald-600/10 p-6 flex items-center justify-between border-b border-white/5">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                            <h3 className="font-bold text-xs tracking-[0.3em] uppercase text-emerald-500">Support Hub</h3>
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground mt-1">FMCG Exchange</h4>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div 
                                    className="flex-1 p-6 min-h-[350px] max-h-[450px] overflow-y-auto flex flex-col gap-6 relative custom-scrollbar"
                                    data-lenis-prevent
                                >
                                    {/* Grain Overlay for texture */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                                    {!isIdentified ? (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8 z-10"
                                        >
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Identify yourself to initiate a secure connection with our strategy team.
                                                </p>
                                            </div>
                                            
                                            <form onSubmit={handleIdentify} className="space-y-6">
                                                <div className="group relative">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block transition-colors group-focus-within:text-emerald-500">
                                                        Full Name
                                                    </label>
                                                    <input 
                                                        required
                                                        type="text" 
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        placeholder="Your Name"
                                                        className="w-full bg-transparent border-b border-border/50 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-muted-foreground/20"
                                                    />
                                                </div>

                                                {/* Contact Mode Toggle */}
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">
                                                        Preferred Contact
                                                    </label>
                                                    <div className="flex bg-muted/30 rounded-full p-1 border border-border/30">
                                                        <button
                                                            type="button"
                                                            onClick={() => setContactMode('phone')}
                                                            className={cn(
                                                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                                                                contactMode === 'phone'
                                                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                                                    : "text-muted-foreground hover:text-foreground"
                                                            )}
                                                        >
                                                            <Phone className="w-3.5 h-3.5" />
                                                            Phone
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setContactMode('email')}
                                                            className={cn(
                                                                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                                                                contactMode === 'email'
                                                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                                                    : "text-muted-foreground hover:text-foreground"
                                                            )}
                                                        >
                                                            <Mail className="w-3.5 h-3.5" />
                                                            Email
                                                        </button>
                                                    </div>

                                                    {/* Conditional Input */}
                                                    <div className="group relative">
                                                        {contactMode === 'phone' ? (
                                                            <input 
                                                                required
                                                                type="tel" 
                                                                value={userPhone}
                                                                onChange={(e) => setUserPhone(e.target.value)}
                                                                placeholder="+44 7895 840 565"
                                                                className="w-full bg-transparent border-b border-border/50 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-muted-foreground/20"
                                                            />
                                                        ) : (
                                                            <input 
                                                                required
                                                                type="email" 
                                                                value={userEmail}
                                                                onChange={(e) => setUserEmail(e.target.value)}
                                                                placeholder="you@company.com"
                                                                className="w-full bg-transparent border-b border-border/50 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-muted-foreground/20"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <button 
                                                    type="submit"
                                                    className="w-full bg-emerald-600 text-white rounded-full py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-[0_10px_20px_rgba(5,150,105,0.2)] active:scale-[0.98]"
                                                >
                                                    Initialize Chat
                                                </button>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <>
                                            {messages.map((msg) => (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={cn(
                                                        "max-w-[85%] rounded-2xl p-4 z-10 text-sm leading-relaxed",
                                                        msg.sender === 'user'
                                                            ? "bg-emerald-600 text-white self-end rounded-tr-none shadow-lg shadow-emerald-500/10"
                                                            : "bg-muted/30 text-foreground/80 self-start rounded-tl-none border border-white/5"
                                                    )}
                                                >
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                    <span className="text-[9px] opacity-40 block mt-1 text-right">
                                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </motion.div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </>
                                    )}
                                </div>

                                {/* input Area */}
                                {isIdentified && (
                                    <div className="p-4 md:p-6 bg-muted/20 border-t border-white/5 flex items-end gap-3">
                                        <textarea
                                            ref={inputRef}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            placeholder="Describe your requirement..."
                                            className="flex-1 bg-transparent py-3 text-sm focus:outline-none transition-all placeholder:text-muted-foreground/30 resize-none min-h-[44px] max-h-[120px] custom-scrollbar"
                                            rows={message.length > 40 ? 3 : 1}
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!message.trim() || isSending}
                                            className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                                message.trim()
                                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:scale-110"
                                                    : "text-muted-foreground/30 cursor-not-allowed",
                                                isSending && "opacity-70 cursor-wait"
                                            )}
                                        >
                                            {isSending ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Action Button */}
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="pointer-events-auto w-16 h-16 bg-foreground rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center text-background relative group"
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {isHovered && !isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -5 }}
                                    className="absolute right-[120%] top-1/2 -translate-y-1/2 bg-background border border-white/10 text-foreground text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-2xl shadow-2xl whitespace-nowrap"
                                >
                                    Strategic Support
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Connection Ring */}
                        <span className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></span>

                        {isOpen ? (
                            <X className="w-7 h-7" />
                        ) : (
                            <div className="relative">
                                <MessageCircle className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />
                                {!isOpen && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-foreground rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                )}
                            </div>
                        )}
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
};
