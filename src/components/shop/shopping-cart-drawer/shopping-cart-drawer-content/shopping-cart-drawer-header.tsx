import { Drawer } from 'vaul';

import { Close } from '@/components/ui/icons';

export const ShoppingCartDrawerHeader = () => (
	<div className="flex items-center justify-between p-5">
		<Drawer.Title className="text-2xl font-semibold">Koszyk</Drawer.Title>
		<Drawer.Close>
			<Close size={24} />
		</Drawer.Close>
	</div>
);
