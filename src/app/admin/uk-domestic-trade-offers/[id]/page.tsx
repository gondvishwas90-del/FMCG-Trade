import { UKDomesticTradeOfferForm } from "../../_components/uk-domestic-trade-offers/UKDomesticTradeOfferForm";
import { getAdminUKDomesticTradeOfferById } from "@/app/actions/uk-domestic-trade-offers";

export default async function EditUKDomesticTradeOfferPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const response = await getAdminUKDomesticTradeOfferById(id);
    const tradeOffer = response.success ? response.data : null;

    if (!tradeOffer) {
        return <div>Offer not found</div>;
    }

    return (
        <div className="flex-1 space-y-4">
            <UKDomesticTradeOfferForm initialData={tradeOffer} />
        </div>
    );
}
