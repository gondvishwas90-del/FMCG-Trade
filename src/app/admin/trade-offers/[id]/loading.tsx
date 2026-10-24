import { TradeOfferFormSkeleton } from "../../_components/trade-offers/TradeOfferFormSkeleton";

export default function EditTradeOfferLoading() {
    return (
        <div className="flex-1 space-y-4">
            <TradeOfferFormSkeleton />
        </div>
    );
}
