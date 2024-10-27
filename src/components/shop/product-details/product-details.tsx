import { generateSelectAmountOptions } from './product-details.utils';

import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';
import { Select } from '@/components/ui/select/select';

import type { Product } from '@/types/shop.types';

type ProductDetailsProps = Readonly<{
	product: Product;
}>;

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const selectAmountOptions = generateSelectAmountOptions();

	return (
		<div className="flex w-full flex-col gap-6">
			<h2 className="relative pb-4 font-bebas-neue text-5xl text-white before:absolute before:bottom-0 before:h-px before:w-12 before:bg-white lg:text-6xl lg:before:w-20 xl:text-7xl xl:before:w-24">
				{product.name}
			</h2>
			<p className="text-4xl font-bold text-primary lg:text-5xl">
				{product.price}zł
			</p>
			<p className="text-white lg:text-lg">{product.description}</p>
			<Select placeholder="Ilość" options={selectAmountOptions} />
			<div className="w-full lg:w-fit">
				<Button icon={ArrowRight} moveIcon fullWidth>
					Dodaj do koszyka
				</Button>
			</div>
		</div>
	);
};
