import { Suspense } from "react";
import { getCarouselItems } from "@/app/actions/carousel";
import HeroBannersClient from "./client";
import { HeroBannerFormSkeleton } from "../_components/hero-banners/HeroBannerFormSkeleton";

async function HeroBannersContent() {
    // Fetch all banners including drafts for the admin dashboard
    const banners = await getCarouselItems(true);

    return <HeroBannersClient initialData={banners} />;
}

export default function HeroBannersPage() {
    return (
        <Suspense fallback={<HeroBannerFormSkeleton />}>
            <HeroBannersContent />
        </Suspense>
    );
}
