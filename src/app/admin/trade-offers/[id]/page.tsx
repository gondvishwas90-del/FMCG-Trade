import { TradeOfferForm } from "../../_components/trade-offers/TradeOfferForm";
import { getAdminTradeOfferById } from "@/app/actions/trade-offers";

export default async function EditTradeOfferPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const response = await getAdminTradeOfferById(id);
    const tradeOffer = response.success ? response.data : null;

    if (!tradeOffer) {
        return <div>Offer not found</div>;
    }

    return (
        <div className="flex-1 space-y-4">
            <TradeOfferForm initialData={tradeOffer} />
        </div>
    );
}

