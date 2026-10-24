import mongoose, { Schema, model, models } from 'mongoose';

export interface IUKDomesticTradeOffer {
    _id?: string;
    title: string;
    sizes: string[];
    category: string[];
    market: string[];
    notes: string[];
    availability: string;
    image: string;
    types: string[];
    status: 'active' | 'draft';
    createdAt?: Date;
    updatedAt?: Date;
}

const UKDomesticTradeOfferSchema = new Schema<IUKDomesticTradeOffer>(
    {
        title: { type: String, required: true },
        sizes: { type: [String], default: [] },
        category: { type: [String], default: [] },
        market: { type: [String], default: [] },
        notes: { type: [String], default: [] },
        availability: { type: String, required: true },
        image: { type: String, required: true },
        types: { type: [String], default: [] },
        status: { type: String, enum: ['active', 'draft'], default: 'draft' },
    },
    { timestamps: true }
);

const UKDomesticTradeOffer = models.UKDomesticTradeOffer || model<IUKDomesticTradeOffer>('UKDomesticTradeOffer', UKDomesticTradeOfferSchema);

export default UKDomesticTradeOffer;
