import { Drawer } from 'vaul';

import { ShoppingCartDrawerContent } from './shopping-cart-drawer-content/shopping-cart-drawer-content';

type ShoppingCartDrawerProps = Readonly<{
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}>;

export const ShoppingCartDrawer = ({
	isOpen,
	onOpenChange,
}: ShoppingCartDrawerProps) => (
	<Drawer.Root direction="right" open={isOpen} onOpenChange={onOpenChange}>
		<Drawer.Portal>
			<Drawer.Overlay className="fixed inset-0 bg-black/40" />
			<ShoppingCartDrawerContent />
		</Drawer.Portal>
	</Drawer.Root>
);
