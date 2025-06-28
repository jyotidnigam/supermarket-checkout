import { pricingRuleService } from '../service/pricing-rule-service'; // adjust path as needed
import { pricingRule } from '../database/pricing-rule.schema';
import { connectDB } from '../database/mongo.config';

jest.mock('../database/mongo.config')
jest.mock('../database/pricing-rule.schema')

describe('pricingRuleService', () => {
    it('should fetch pricing rule for a given SKU', async () => {
        (pricingRule.findOne as jest.Mock).mockResolvedValueOnce({
            sku: 'A',
            unitPrice: 50,
            specialPrice: { quantity: 3, totalPrice: 130 },
        });

        const result = await pricingRuleService.getPricingRule('A');

        expect(connectDB).toHaveBeenCalled();
        expect(pricingRule.findOne).toHaveBeenCalledWith({ sku: 'A' });
        expect(result?.unitPrice).toBe(50);
    });

    it('should return null for unknown SKU', async () => {
        (pricingRule.findOne as jest.Mock).mockResolvedValueOnce(null);

        const result = await pricingRuleService.getPricingRule('Z');
        expect(result).toBeNull();
    });
});