import { HeaderShoppingCartButtonBadge } from './header-shopping-cart-button-badge';

import { ShoppingCart } from '@/components/ui/icons';

import { useCart } from '@/hooks/use-cart';

type HeaderShoppingCartButtonProps = Readonly<{
	onClick: () => void;
}>;

export const HeaderShoppingCartButton = ({
	onClick,
}: HeaderShoppingCartButtonProps) => {
	const { cartItemsAmount } = useCart();

	return (
		<button type="button" className="relative" onClick={onClick}>
			<span className="sr-only">Koszyk</span>
			<ShoppingCart size={32} aria-hidden />
			{!!cartItemsAmount && (
				<>
					<span className="sr-only">ilość dodanych przedmiotów:</span>
					<HeaderShoppingCartButtonBadge value={cartItemsAmount} />
				</>
			)}
		</button>
	);
};
