"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";
import { createTradeOffer, updateTradeOffer } from "@/app/actions/trade-offers";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TagsInput } from "@/components/ui/tags-input";

import MediaImageField from "../MediaImageField";
import { tradeOfferSchema, TradeOfferFormValues } from "./schema";
import { PageHeader, type BreadcrumbItem } from "../PageHeader";

interface TradeOfferFormProps {
    initialData?: TradeOfferFormValues & { _id?: string };
}

export function TradeOfferForm({ initialData }: TradeOfferFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const toArray = (val: string | string[] | undefined): string[] => {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    };

    const defaultValues: TradeOfferFormValues = initialData ? {
        title: initialData.title || "",
        sizes: toArray(initialData.sizes),
        category: toArray(initialData.category),
        market: toArray(initialData.market),
        notes: toArray(initialData.notes),
        availability: initialData.availability || "Ongoing",
        image: initialData.image || "",
        types: toArray(initialData.types),
        status: initialData.status as "active" | "draft" || "draft",
    } : {
        title: "",
        sizes: [],
        category: [],
        market: [],
        notes: [],
        availability: "Ongoing",
        image: "",
        types: [],
        status: "draft",
    };

    const form = useForm<TradeOfferFormValues>({
        resolver: zodResolver(tradeOfferSchema) as any,
        defaultValues,
    });

    const { formState: { isDirty } } = form;

    const onSubmit = async (data: TradeOfferFormValues) => {
        try {
            setLoading(true);

            const payload = {
                ...data,
            };

            let result;
            if (initialData?._id) {
                result = await updateTradeOffer(initialData._id, payload);
            } else {
                result = await createTradeOffer(payload);
            }

            if (result.success) {
                toast.success(initialData ? "Trade offer updated" : "Trade offer created");
                if (initialData?._id) {
                    router.push(`/admin/trade-offers?updated=${initialData._id}`);
                } else {
                    router.push("/admin/trade-offers");
                }
                router.refresh();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { label: "Admin", onClick: () => router.push("/admin") },
        { label: "Trade Offers", onClick: () => router.push("/admin/trade-offers") },
        { label: initialData ? "Edit Offer" : "Create Offer", active: true }
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
                onKeyDown={(e) => {
                    if (
                        e.key === "Enter" &&
                        (e.target as HTMLElement).tagName !== "BUTTON"
                    ) {
                        e.preventDefault();
                    }
                }}
            >
                <PageHeader
                    title={initialData ? "Edit Trade Offer" : "Create Trade Offer"}
                    subtitle={initialData ? "Update existing trade offer details." : "Add a new trade offer to the catalog."}
                    breadcrumbs={breadcrumbs}
                    onBack={() => router.push("/admin/trade-offers")}
                    actions={
                        isDirty ? (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push("/admin/trade-offers")}
                                    type="button"
                                    disabled={loading}
                                    className="h-9 sm:h-10 px-3 sm:px-4"
                                >
                                    <X className="sm:mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Cancel</span>
                                </Button>
                                <Button type="submit" size="sm" disabled={loading} className="h-9 sm:h-10 px-3 sm:px-4">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Save className="sm:mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Save</span>
                                </Button>
                            </>
                        ) : null
                    }
                />

                <div className="px-4 sm:px-6 pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Main Content (66%) */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Title</FormLabel>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {field.value?.length || 0}/200
                                                    </span>
                                                </div>
                                                <FormControl>
                                                    <Input placeholder="Product title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <MediaImageField
                                                        label="Offer Image"
                                                        value={field.value || ""}
                                                        onChange={(url) => field.onChange(url)}
                                                        folder="/trade-offers"
                                                        aspectRatio={16 / 9}
                                                        fileName={form.watch("title")}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Upload or provide a URL for the offer image. Recommended aspect ratio is 16:9.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notes</FormLabel>
                                                <FormControl>
                                                    <TagsInput
                                                        value={Array.isArray(field.value) ? field.value : (field.value ? [field.value] : [])}
                                                        onChange={field.onChange}
                                                        placeholder="Add note (e.g. Special Discount)"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Additional details about the offer.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Classification & Specs</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Categories</FormLabel>
                                                    <FormControl>
                                                        <TagsInput
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="Add category"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="types"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Types</FormLabel>
                                                    <FormControl>
                                                        <TagsInput
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="Add type"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="sizes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sizes</FormLabel>
                                                <FormControl>
                                                    <TagsInput
                                                        value={Array.isArray(field.value) ? field.value : (field.value ? [field.value] : [])}
                                                        onChange={field.onChange}
                                                        placeholder="Add size (e.g. 70cl)"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Sidebar (33%) */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status & Availability</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Availability</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select availability" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                        <SelectItem value="Available">Available</SelectItem>
                                                        <SelectItem value="Sold Out">Sold Out</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Market & Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="market"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Markets</FormLabel>
                                                <FormControl>
                                                    <TagsInput
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Add market"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
