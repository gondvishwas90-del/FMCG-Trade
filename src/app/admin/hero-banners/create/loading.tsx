import { HeroBannerFormSkeleton } from "../../_components/hero-banners/HeroBannerFormSkeleton";

export default function CreateHeroBannerLoading() {
    return (
        <div className="flex-1 space-y-4">
            <HeroBannerFormSkeleton />
        </div>
    );
}
