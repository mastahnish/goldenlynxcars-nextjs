'use client';

import { Controller } from 'react-hook-form';

import { useProductDetailsAddToCartForm } from './use-product-details-add-to-cart-form';

import { SelectField } from '@/components/form/select-field';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { Product } from '@/lib/shop';

type ProductDetailsAddToCartFormProps = Readonly<{
	product: Product;
}>;

export const ProductDetailsAddToCartForm = ({
	product,
}: ProductDetailsAddToCartFormProps) => {
	const { control, errors, selectAmountOptions, onSubmit } =
		useProductDetailsAddToCartForm({ product });

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<Controller
				name="amount"
				control={control}
				render={({ field: { onChange, ...field } }) => (
					<SelectField
						placeholder="Ilość"
						options={selectAmountOptions}
						onValueChange={onChange}
						error={errors.amount?.message}
						{...field}
					/>
				)}
			/>
			<div className="w-full lg:w-fit">
				<Button type="submit" icon={ArrowRight} moveIcon fullWidth>
					Dodaj do koszyka
				</Button>
			</div>
		</form>
	);
};
