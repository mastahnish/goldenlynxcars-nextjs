import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';
import { ShopProductList } from '@/components/shop/shop-product-list/shop-product-list';

import { getCachedGlobal } from '@/lib/get-cached-global';

const ShopPage = async () => {
	const { header, products } = await getCachedGlobal('shop')();

	return (
		<>
			<PageHeader
				title={header.title}
				label={header.label}
				content={header.content}
				subContent={header.subContent}
			/>
			<ShopProductList products={products} />
			<ContactSection />
		</>
	);
};

export default ShopPage;
