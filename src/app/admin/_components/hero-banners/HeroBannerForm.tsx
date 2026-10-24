"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";
import { createCarouselItem, updateCarouselItem } from "@/app/actions/carousel";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MediaImageField from "../MediaImageField";
import { heroBannerSchema, HeroBannerFormValues } from "./schema";
import { PageHeader, BreadcrumbItem } from "../PageHeader";

interface HeroBannerFormProps {
    initialData?: HeroBannerFormValues & { _id?: string };
}

export function HeroBannerForm({ initialData }: HeroBannerFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const defaultValues: HeroBannerFormValues = initialData ? {
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        cta: initialData.cta || "",
        layout: initialData.layout as 'norman' | 'found' | 'measured' | 'centered',
        image: initialData.image || "",
        mobileImage: initialData.mobileImage || "",
        order: initialData.order ?? 0,
        status: initialData.status as "active" | "draft" || "draft",
    } : {
        title: "",
        subtitle: "",
        cta: "",
        layout: "found",
        image: "",
        mobileImage: "",
        order: 0,
        status: "draft",
    };

    const form = useForm<HeroBannerFormValues>({
        resolver: zodResolver(heroBannerSchema) as any,
        defaultValues,
    });

    const { formState: { isDirty } } = form;

    const onSubmit = async (data: HeroBannerFormValues) => {
        try {
            setLoading(true);

            let result;
            if (initialData?._id) {
                result = await updateCarouselItem(initialData._id, data);
            } else {
                result = await createCarouselItem(data);
            }

            if (result.success) {
                toast.success(initialData ? "Hero banner updated" : "Hero banner created");
                if (initialData?._id) {
                    router.push(`/admin/hero-banners?updated=${initialData._id}`);
                } else {
                    router.push("/admin/hero-banners");
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
        { label: "Hero Banners", onClick: () => router.push("/admin/hero-banners") },
        { label: initialData ? "Edit Banner" : "Create Banner", active: true }
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
                    title={initialData ? "Edit Hero Banner" : "Create Hero Banner"}
                    subtitle={initialData ? "Update existing hero banner details." : "Add a new hero banner to the carousel."}
                    breadcrumbs={breadcrumbs}
                    onBack={() => router.push("/admin/hero-banners")}
                    actions={
                        isDirty ? (
                            <>
                                <Button
                                     variant="outline"
                                     onClick={() => router.push("/admin/hero-banners")}
                                     type="button"
                                     disabled={loading}
                                     className="h-8 sm:h-10 px-2 sm:px-4"
                                 >
                                     <X className="sm:mr-2 h-4 w-4" /> 
                                     <span className="hidden sm:inline">Cancel</span>
                                 </Button>
                                 <Button type="submit" disabled={loading} className="h-8 sm:h-10 px-2 sm:px-4">
                                     {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                     <Save className="sm:mr-2 h-4 w-4" /> 
                                     <span className="hidden sm:inline">Save</span>
                                 </Button>
                            </>
                        ) : null
                    }
                />

                <div className="px-0 sm:px-6 pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Main Content (66%) */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Banner Details</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Title</FormLabel>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {field.value?.length || 0}/100
                                                    </span>
                                                </div>
                                                <FormControl>
                                                    <Input placeholder="Main heading text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subtitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Subtitle (Optional)</FormLabel>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {field.value?.length || 0}/300
                                                    </span>
                                                </div>
                                                <FormControl>
                                                    <Input placeholder="Smaller description text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="cta"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Call to Action (Optional)</FormLabel>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {field.value?.length || 0}/50
                                                    </span>
                                                </div>
                                                <FormControl>
                                                    <Input placeholder="Button text (e.g. Shop Now)" {...field} />
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
                                                        label="Desktop Background Image"
                                                        value={field.value || ""}
                                                        onChange={(url) => field.onChange(url)}
                                                        folder="/hero-banners"
                                                        aspectRatio={2/1}
                                                        fileName={form.watch("title") ? `${form.watch("title")}-desktop` : "desktop"}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Upload or provide a URL for the desktop banner image. Recommended aspect ratio is 2:1 (e.g. 1800x900px).
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mobileImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <MediaImageField 
                                                        label="Mobile Background Image (Optional)"
                                                        value={field.value || ""}
                                                        onChange={(url) => field.onChange(url)}
                                                        folder="/hero-banners"
                                                        aspectRatio={4/5}
                                                        fileName={form.watch("title") ? `${form.watch("title")}-mobile` : "mobile"}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Upload or provide a URL for a mobile-specific banner image. Recommended aspect ratio is 4:5 (e.g. 800x1000px).
                                                </FormDescription>
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
                                    <CardTitle>Layout & Status</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 space-y-4">
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
                                        name="layout"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Layout Design</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select layout" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="found">Found (Left)</SelectItem>
                                                        <SelectItem value="norman">Norman (Alternate)</SelectItem>
                                                        <SelectItem value="measured">Measured (Grid)</SelectItem>
                                                        <SelectItem value="centered">Centered</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="order"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Display Order</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            field.onChange(val === "" ? 0 : parseInt(val));
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Lower numbers appear first.
                                                </FormDescription>
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
