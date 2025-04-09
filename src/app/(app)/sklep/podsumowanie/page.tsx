import { ShopEmbeddedCheckout } from '@/components/shop/shop-embedded-checkout/shop-embedded-checkout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sklep | Podsumowanie',
};

const CheckoutPage = () => (
	<main className="pt-24">
		<ShopEmbeddedCheckout />
	</main>
);

export default CheckoutPage;
