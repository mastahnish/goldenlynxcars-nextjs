import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';
import { ShopProductList } from '@/components/shop/shop-product-list/shop-product-list';

import * as shop from '@/lib/shop';

const ShopPage = async () => {
	const products = await shop.getAllProducts();

	return (
		<>
			<PageHeader global="shop-header" />
			<ShopProductList products={products} />
			<ContactSection />
		</>
	);
};

export default ShopPage;
