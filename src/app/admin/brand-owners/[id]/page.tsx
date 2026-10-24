import { getAdminBrandOwnerById } from "@/app/actions/brand-owner.actions";
import BrandOwnerEditor from "../_components/BrandOwnerEditor";
import { notFound } from "next/navigation";

export default async function BrandOwnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isNew = id === "create";
    
    let initialData = {
        id: "",
        name: "",
        logo: "",
        description: "",
        website: "",
        country: "",
        countryCode: "",
        status: "active" as const
    };

    if (!isNew) {
        const response = await getAdminBrandOwnerById(id);
        if (!response.success || !response.data) {
            notFound();
        }
        initialData = response.data;
    }

    return (
        <div className="-m-4 flex-1 w-[calc(100%+2rem)] flex flex-col bg-background">
            <BrandOwnerEditor initialData={initialData} isNew={isNew} />
        </div>
    );
}
