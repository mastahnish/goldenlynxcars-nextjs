import { toast } from 'react-hot-toast';

import { generateSelectAmountOptions } from '../product-details.utils';
import { productDetailsAddToCartFormSchema } from './product-details-add-to-cart-form.schema';

import { useCart } from '@/hooks/use-cart';
import { useZodForm } from '@/hooks/use-zod-form';

import type { Product } from '@/lib/shop';

interface UseProductDetailsAddToCartFormParams {
	product: Product;
}

export const useProductDetailsAddToCartForm = ({
	product,
}: UseProductDetailsAddToCartFormParams) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useZodForm(productDetailsAddToCartFormSchema);
	const { addToCart } = useCart();

	const selectAmountOptions = generateSelectAmountOptions();

	const onSubmit = handleSubmit(({ amount }) => {
		addToCart(product, Number(amount));
		toast.success('Produkt został dodany do koszyka', {
			position: 'bottom-right',
		});
	});

	return { control, errors, selectAmountOptions, onSubmit };
};
