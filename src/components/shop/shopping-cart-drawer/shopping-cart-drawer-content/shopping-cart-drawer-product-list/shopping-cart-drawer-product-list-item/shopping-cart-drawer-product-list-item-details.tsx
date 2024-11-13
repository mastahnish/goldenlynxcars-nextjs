import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemDetailsProps = Readonly<{
	product: Product;
	amount: number;
}>;

export const ShoppingCartDrawerProductListItemDetails = ({
	product,
	amount,
}: ShoppingCartDrawerProductListItemDetailsProps) => (
	<div>
		<h3 className="text-lg">{product.name}</h3>
		<p className="mt-1 text-primary">x{amount}</p>
	</div>
);
