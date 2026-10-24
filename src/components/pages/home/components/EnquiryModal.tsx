"use client";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PackageCard } from "../types/package.types";

import { ENQUIRY_TEMPLATES } from "@/lib/email/enquiry-config";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required"),
  // Dynamic fields catch-all for zod
}).catchall(z.string().optional());

type FormValues = z.infer<typeof formSchema> & Record<string, any>;

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageCard | null;
  brandName?: string;
  opportunityName?: string;
  opportunityRef?: string;
}

export function EnquiryModal({ isOpen, onClose, pkg, brandName, opportunityName, opportunityRef }: EnquiryModalProps) {
  const lenis = useLenis();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const template = pkg?.templateId ? ENQUIRY_TEMPLATES[pkg.templateId] : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
    },
  });

  const watchedValues = form.watch();

  // Inject context into watched values for template generation
  const effectiveValues = {
    ...watchedValues,
    brandName: brandName || pkg?.title || "",
    opportunityName: opportunityName || pkg?.title || "",
    opportunityRef: opportunityRef || ""
  };

  // Handle body scroll locking and Lenis control
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  const getPreviewMessage = () => {
    if (!template) return "Select a service to see the template.";
    return template.generateText(effectiveValues);
  };

  const onSubmit = async (data: FormValues) => {
    if (!pkg) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          templateId: pkg.templateId,
          brandName: effectiveValues.brandName,
          opportunityName: effectiveValues.opportunityName,
          opportunityRef: effectiveValues.opportunityRef,
          subject: pkg.templateId === "brand-enquiry"
            ? `${effectiveValues.brandName} & Portfolio Enquiry`
            : pkg.templateId === "trade-opportunity"
              ? `Trade Enquiry – ${effectiveValues.opportunityName}`
              : template?.subject
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success("Enquiry sent successfully!");
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          form.reset();
        }, 3000);
      } else {
        toast.error(result.message || "Failed to send enquiry");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] bg-background/80 backdrop-blur-2xl border-emerald-500/20 max-h-[90vh] overflow-hidden p-0 gap-0">
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Form Section */}
          <div className="lg:w-[55%] p-6 lg:p-10 overflow-y-auto border-r border-emerald-500/10 custom-scrollbar" data-lenis-prevent>
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-bold tracking-tight">
                Commercial Trade Enquiry — <span className="text-emerald-500">{pkg?.title}</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-lg">
                Commercial B2B enquiries only. Complete the form to request supply specifications and trade terms.
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Submission Received!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. Our trade specialists will review your enquiry and contact you within 24 hours.
                  </p>
                  <Button onClick={onClose} variant="outline" className="mt-8 border-emerald-500/20 hover:bg-emerald-500/5">
                    Close Window
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-emerald-500 font-bold text-sm uppercase tracking-widest">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">01</span>
                        Contact Information
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company" {...field} className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contactPerson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Contact Person</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 234 567 890" {...field} className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-emerald-500 font-bold text-sm uppercase tracking-widest">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">02</span>
                        Service Details
                      </div>

                      <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10 space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          {template?.fields.map((field) => (
                            <FormField
                              key={field.name}
                              control={form.control}
                              name={field.name as any}
                              render={({ field: inputProps }) => (
                                <FormItem>
                                  <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    {field.label}
                                  </FormLabel>
                                  <FormControl>
                                    {field.type === "textarea" ? (
                                      <Textarea
                                        placeholder={field.placeholder}
                                        {...inputProps}
                                        className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30 min-h-[80px]"
                                      />
                                    ) : (
                                      <Input
                                        placeholder={field.placeholder}
                                        {...inputProps}
                                        className="bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/30"
                                      />
                                    )}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          Processing Enquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Trade Enquiry
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </AnimatePresence>
          </div>

          {/* Preview Section */}
          <div className="hidden lg:flex lg:w-[45%] bg-emerald-950/20 p-10 flex-col">
            <div className="flex items-center gap-3 text-muted-foreground font-bold text-sm uppercase tracking-widest mb-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Live Email Preview
            </div>

            <div className="flex-1 bg-background/40 backdrop-blur-md rounded-3xl border border-emerald-500/10 p-8 shadow-inner overflow-y-auto custom-scrollbar" data-lenis-prevent>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/30">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                  S
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold">To: Sales Team</div>
                  <div className="text-sm font-semibold truncate max-w-[200px]">enquiry@fmcg-exchange.com</div>
                </div>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/80 italic">
                  {getPreviewMessage()}
                </pre>
              </div>
            </div>

            <div className="mt-8 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <p className="text-[10px] uppercase tracking-wider text-center text-muted-foreground font-bold leading-relaxed">
                This enquiry will be delivered securely to our trade desk. Your data is protected by our professional compliance standards.
              </p>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(16, 185, 129, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(16, 185, 129, 0.4);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
