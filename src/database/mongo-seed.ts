import { pricingRule } from "./pricing-rule.schema.js";


export const seedData = async () => {
    try {
        await pricingRule.insertMany([
            {
                sku: 'A',
                unitPrice: 50,
                specialPrice: { quantity: 3, totalPrice: 130 },
            },
            {
                sku: 'B',
                unitPrice: 40,
                specialPrice: { quantity: 2, totalPrice: 70 },
            }, {
                sku: 'C',
                unitPrice: 10,
            },
        ]);
    } catch (error) {
        console.error(error);
    }
}
