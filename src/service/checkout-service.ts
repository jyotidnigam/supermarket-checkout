import { PricingRule } from "../model/index.js";

interface PricingRuleService {
    getPricingRule: (sku: string) => Promise<PricingRule | null>;
}
export class Checkout {
    private items: string[] = [];
    constructor(private pricingRuleService: PricingRuleService) { }

    async getPricingRule(sku: string) {
        return await this.pricingRuleService.getPricingRule(sku)
    }

    scan(sku: string) {
        this.items.push(sku)
    }

    async total(): Promise<number> {
        let total: number = 0;
        const itemCounts: Record<string, number> = {};
        for (const item of this.items) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }
        for (const item of Object.keys(itemCounts)) {
            const rule = await this.getPricingRule(item);
            if (!rule) {
                continue;
            }
            if (rule?.specialPrice && itemCounts[item] === rule.specialPrice.quantity) {
                total += rule.specialPrice.totalPrice;
            } else {
                total += itemCounts[item] * rule.unitPrice
            }
        }
        return total;
    }

}