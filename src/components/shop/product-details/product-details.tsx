import { ProductDetailsAddToCartForm } from './product-details-add-to-cart-form/product-details-add-to-cart-form';

import { formatPrice } from '@/utils/shop.utils';

import type { Product } from '@/lib/shop';

type ProductDetailsProps = Readonly<{
	product: Product;
}>;

export const ProductDetails = ({ product }: ProductDetailsProps) => (
	<div className="flex w-full flex-col gap-6">
		<h2 className="relative pb-4 font-bebas-neue text-5xl text-white before:absolute before:bottom-0 before:h-px before:w-12 before:bg-white lg:text-6xl lg:before:w-20 xl:text-7xl xl:before:w-24">
			{product.name}
		</h2>
		<p className="text-4xl font-bold text-primary lg:text-5xl">
			{formatPrice(product.default_price.unit_amount)}zł
		</p>
		<p className="text-white lg:text-lg">{product.description}</p>
		<ProductDetailsAddToCartForm product={product} />
	</div>
);
