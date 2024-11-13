import { Drawer } from 'vaul';

import { ShoppingCartDrawerHeader } from './shopping-cart-drawer-header';
import { ShoppingCartDrawerProductList } from './shopping-cart-drawer-product-list/shopping-cart-drawer-product-list';
import { ShoppingCartSummary } from './shopping-cart-summary/shopping-cart-summary';

export const ShoppingCartDrawerContent: React.FC = props => (
	<Drawer.Content
		className="fixed inset-y-0 right-0 z-110 flex w-shopping-cart-drawer flex-col bg-background text-white"
		{...props}
	>
		<ShoppingCartDrawerHeader />
		<ShoppingCartDrawerProductList />
		<ShoppingCartSummary />
	</Drawer.Content>
);
