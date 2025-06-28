import { Checkout } from "./service/checkout-service.js"
import { pricingRuleService } from "./service/pricing-rule-service.js"

async function superMarketCheckout() {
    console.log('function called')
    const checkout = new Checkout(pricingRuleService)
    checkout.scan('A')
    checkout.scan('A')
    checkout.scan('A')
    checkout.scan('B')
    checkout.scan('B')
    checkout.scan('C')
    const itemsTotal = await checkout.total();
    console.log('Scanned Items Total:', itemsTotal)
}

superMarketCheckout()