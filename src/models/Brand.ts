import mongoose, { Schema, model, models } from 'mongoose';

export interface IBrandProduct {
    name: string;
    image: string;
    abv: string;
    size: string;
    description: string;
}

export interface ITradeCapabilities {
    exportAvailable: boolean;
    privateLabel: boolean;
    ukDistribution: boolean;
    euDistribution: boolean;
    onTradeFocused: boolean;
    offTradeFocused: boolean;
}

export interface IBrand {
    _id?: string;
    id: string; // slug
    name: string;
    country: string;
    countryCode: string;
    image: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string;
    description: string;
    tagline: string;
    storyTitle: string;
    storyHeadline: string;
    storyDescription: string;
    tradeAnalystVerdict: string;
    positioning: string;
    tier1Ids: string[];
    tier2Ids: string[];
    tier3Ids: string[];
    tradeCapabilities: ITradeCapabilities;
    products: IBrandProduct[];
    marketConsiderations: string[];
    tradeIntents: string[];
    brandOwnerId?: string;
    status: 'active' | 'draft';
    createdAt?: Date;
    updatedAt?: Date;
}

const BrandProductSchema = new Schema<IBrandProduct>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    abv: { type: String, default: '' },
    size: { type: String, default: '' },
    description: { type: String, default: '' }
}, { _id: false });

const TradeCapabilitiesSchema = new Schema<ITradeCapabilities>({
    exportAvailable: { type: Boolean, default: false },
    privateLabel: { type: Boolean, default: false },
    ukDistribution: { type: Boolean, default: false },
    euDistribution: { type: Boolean, default: false },
    onTradeFocused: { type: Boolean, default: false },
    offTradeFocused: { type: Boolean, default: false },
}, { _id: false });

const BrandSchema = new Schema<IBrand>(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        country: { type: String, default: '' },
        countryCode: { type: String, default: '' },
        image: { type: String, required: true },
        backgroundImage: { type: String, default: '' },
        mobileBackgroundImage: { type: String, default: '' },
        description: { type: String, default: '' },
        tagline: { type: String, default: '' },
        storyTitle: { type: String, default: 'The Story' },
        storyHeadline: { type: String, default: '' },
        storyDescription: { type: String, default: '' },
        tradeAnalystVerdict: { type: String, default: '' },
        positioning: { type: String, default: '' },
        tier1Ids: { type: [String], default: [] },
        tier2Ids: { type: [String], default: [] },
        tier3Ids: { type: [String], default: [] },
        tradeCapabilities: { type: TradeCapabilitiesSchema, required: true },
        products: { type: [BrandProductSchema], default: [] },
        marketConsiderations: { type: [String], default: [] },
        tradeIntents: { type: [String], default: [] },
        brandOwnerId: { type: String, default: '' },
        status: { type: String, enum: ['active', 'draft'], default: 'active' },
    },
    { timestamps: true }
);

if (mongoose.models.Brand) {
    delete mongoose.models.Brand;
}
const Brand = model<IBrand>('Brand', BrandSchema);

export default Brand;
