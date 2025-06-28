import mongoose from 'mongoose';
import { PricingRule } from '../model/index.js'
const Schema = mongoose.Schema;


const pricingRuleSchema = new Schema<PricingRule>({
    sku: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    specialPrice: {
        type: {
            quantity: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        },
        required: false,
    }

})
export const pricingRule = mongoose.model<PricingRule>('PricingRule', pricingRuleSchema)