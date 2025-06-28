import { Checkout } from '../service/checkout-service';
import { PricingRule } from '../model/index.js';

describe('Checkout with pricing rule service', () => {
    const mockPricingRules: Record<string, PricingRule> = {
        A: {
            sku: 'A',
            unitPrice: 50,
            specialPrice: { quantity: 3, totalPrice: 130 },
        },
        B: {
            sku: 'B',
            unitPrice: 40,
            specialPrice: { quantity: 2, totalPrice: 70 },
        },
        C: {
            sku: 'C',
            unitPrice: 10,
        },
    };

    const mockPricingRuleService = {
        getPricingRule: jest.fn((sku: string): Promise<PricingRule | null> => {
            return Promise.resolve(mockPricingRules[sku] || null);
        }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calculates total with special prices applied', async () => {
        const checkout = new Checkout(mockPricingRuleService);
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');

        const total = await checkout.total();
        expect(total).toBe(130);
    });

    it('calculates total without special price', async () => {
        const checkout = new Checkout(mockPricingRuleService);
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('C');

        const total = await checkout.total();
        expect(total).toBe(110);
    });

    it('calculates mixed items with and without discount', async () => {
        const checkout = new Checkout(mockPricingRuleService);
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('A');
        checkout.scan('B');
        checkout.scan('B');
        checkout.scan('C');

        const total = await checkout.total();
        expect(total).toBe(210);
    });

    it('skips skus which are not found, without error', async () => {
        const checkout = new Checkout(mockPricingRuleService);
        checkout.scan('X');
        const total = await checkout.total();
        expect(total).toBe(0);
    });
});