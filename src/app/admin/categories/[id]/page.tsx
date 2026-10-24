import { getAdminCategoryBySlug } from "@/app/actions/category.actions";
import { notFound } from "next/navigation";
import TierEditor from "../_components/TierEditor";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const isNew = resolvedParams.id === "create";

    let initialData = {
        id: "",
        name: "",
        tradeGuidance: "",
        image: "",
        status: "active",
        tier2: []
    };

    if (!isNew) {
        const response = await getAdminCategoryBySlug(resolvedParams.id);
        if (!response.success || !response.data) {
            return notFound();
        }
        initialData = response.data;
    }

    return (
        <div className="-m-4 flex-1 w-[calc(100%+2rem)] flex flex-col bg-background">
            <TierEditor initialData={initialData as any} isNew={isNew} />
        </div>
    );
}
