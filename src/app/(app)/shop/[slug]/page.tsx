import { notFound } from 'next/navigation';

import { ContactSection } from '@/components/common/contact-section/contact-section';
import { Container } from '@/components/common/container';
import { ProductDetails } from '@/components/shop/product-details/product-details';
import { ProductGallery } from '@/components/shop/product-gallery/product-gallery';

import { getCachedGlobal } from '@/lib/get-cached-global';

import type { Params } from '@/types/next.types';

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const { products } = await getCachedGlobal('shop')();

	return products.map(({ slug }) => ({
		slug,
	}));
};

type ShopProductPageProps = Readonly<{
	params: Params<'slug'>;
}>;

const ShopProductPage = async ({ params: { slug } }: ShopProductPageProps) => {
	const shop = await getCachedGlobal('shop')();
	const product = shop.products.find(product => product.slug === slug);

	if (!product) {
		notFound();
	}

	return (
		<>
			<Container className="flex flex-col gap-10 pb-24 pt-20 sm:pt-32 md:flex-row lg:pt-44">
				<ProductGallery product={product} />
				<ProductDetails product={product} />
			</Container>
			<ContactSection />
		</>
	);
};

export default ShopProductPage;
