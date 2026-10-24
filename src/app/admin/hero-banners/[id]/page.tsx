import { HeroBannerForm } from "../../_components/hero-banners/HeroBannerForm";
import { getCarouselItemById } from "@/app/actions/carousel";
import { notFound } from "next/navigation";

export default async function EditHeroBannerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const response = await getCarouselItemById(id);

    if (!response.success || !response.data) {
        return notFound();
    }

    return (
        <div className="flex-1 space-y-4 h-fit">
            <HeroBannerForm initialData={response.data as any} />
        </div>
    );
}
