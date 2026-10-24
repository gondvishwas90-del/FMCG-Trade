import { getAdminBrandById } from "@/app/actions/brand.actions";
import { getAllCategories } from "@/app/actions/category.actions";
import { getAllBrandOwners } from "@/app/actions/brand-owner.actions";
import { notFound } from "next/navigation";
import BrandEditor from "../_components/BrandEditor";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const isNew = resolvedParams.id === "create";

    let initialData = {
        id: "",
        name: "",
        country: "",
        countryCode: "",
        image: "",
        description: "",
        tagline: "",
        storyTitle: "The Story",
        storyHeadline: "",
        storyDescription: "",
        tradeAnalystVerdict: "",
        positioning: "",
        tier1Ids: [],
        tier2Ids: [],
        tier3Ids: [],
        tradeCapabilities: {
            exportAvailable: false,
            privateLabel: false,
            ukDistribution: false,
            euDistribution: false,
            onTradeFocused: false,
            offTradeFocused: false
        },
        products: [],
        portfolioRanges: [],
        marketConsiderations: [],
        tradeIntents: [],
        brandOwnerId: "",
        status: "active"
    };

    if (!isNew) {
        const response = await getAdminBrandById(resolvedParams.id);
        if (!response.success || !response.data) {
            return notFound();
        }
        initialData = response.data;
    }

    // Fetch master category relationships for dropdown selections
    const [categoriesResponse, ownersResponse] = await Promise.all([
        getAllCategories(),
        getAllBrandOwners()
    ]);
    const categories = categoriesResponse.success && categoriesResponse.data ? categoriesResponse.data : [];
    const owners = ownersResponse.success && ownersResponse.data ? ownersResponse.data : [];


    return (
        <div className="-m-4 flex-1 w-[calc(100%+2rem)] flex flex-col   bg-background">
            <BrandEditor initialData={initialData as any} categories={categories} owners={owners} isNew={isNew} />
        </div>
    );
}
