export interface SpecialPrice {
    quantity: number;
    totalPrice: number;
}

export interface PricingRule {
    sku: string;
    unitPrice: number;
    specialPrice?: SpecialPrice;
}