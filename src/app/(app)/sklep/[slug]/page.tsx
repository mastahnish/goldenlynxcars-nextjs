import { notFound } from 'next/navigation';

import { ContactSection } from '@/components/common/contact-section/contact-section';
import { Container } from '@/components/common/container';
import { ProductDetails } from '@/components/shop/product-details/product-details';
import { ProductGallery } from '@/components/shop/product-gallery/product-gallery';

import * as shop from '@/lib/shop';

import type { Params } from '@/types/next.types';

type ShopProductPageProps = Readonly<{
	params: Params<'slug'>;
}>;

const ShopProductPage = async ({ params }: ShopProductPageProps) => {
	const { slug } = await params;
	const product = await shop.getProductBySlug(slug);

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
