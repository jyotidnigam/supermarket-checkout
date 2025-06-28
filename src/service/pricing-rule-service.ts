import { connectDB } from "../database/mongo.config.js";
import { pricingRule } from '../database/pricing-rule.schema.js';
import { PricingRule } from "../model/index.js";

export const pricingRuleService = {
    getPricingRule: async (sku: string): Promise<PricingRule | null> => {
        await connectDB();
        const pricingRuleForItem = await pricingRule.findOne({ sku: sku });
        return pricingRuleForItem;
    }
}
